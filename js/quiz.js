// セッション管理・タイマー計算・採点
var Quiz = {
  defaultTimeLimitSec: function (mode, count) {
    if (mode === "vol") {
      if (count === 32) return 1200;
      if (count === 30) return 900;
      return Math.round(count * 37);
    }
    return count * 40;
  },
  // 制限時間（分）から出題数を決める。その Vol の標準の時間（32問なら20分）で全問、のペースを保つ
  // （10分なら半分、40分なら倍）
  countForTime: function (volId, minutes) {
    var n = BANK.vols()[volId].questions.length;
    var baseMin = this.defaultTimeLimitSec("vol", n) / 60;
    return Math.max(1, Math.round(n * minutes / baseMin));
  },
  // 問題を「出題の単位」に分ける。第1部は1問ずつ、第2・3部は文章ごと（同じ文章の問題はまとめて出す）
  _units: function (questions) {
    var units = [], byPassage = {};
    questions.forEach(function (q) {
      if (!q.passageId) { units.push({ part5: true, qs: [q] }); return; }
      if (!byPassage[q.passageId]) { byPassage[q.passageId] = { part5: false, qs: [] }; units.push(byPassage[q.passageId]); }
      byPassage[q.passageId].qs.push(q);
    });
    return units;
  },
  // 単位の集まりから、文法と読解の比率を保ってだいたい target 問を無作為に選ぶ（文章は分けない）
  _pickUnits: function (units, target, rand) {
    function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rand() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
    var singles = shuffle(units.filter(function (u) { return u.part5; }));
    var groups = shuffle(units.filter(function (u) { return !u.part5; }));
    var total = 0; units.forEach(function (u) { total += u.qs.length; });
    if (target >= total) return units.slice();
    var groupQs = total - singles.length;
    var readingWant = Math.round(target * groupQs / total);
    var picked = [], got = 0;
    for (var i = 0; i < groups.length && got < readingWant; i++) {
      // 次の文章を入れると目標から遠ざかるなら入れない（少なくとも読解が欲しいときは1つは入れる）
      var size = groups[i].qs.length;
      if (got > 0 && Math.abs(readingWant - (got + size)) > Math.abs(readingWant - got)) break;
      picked.push(groups[i]); got += size;
    }
    var need = Math.max(0, target - got);
    picked = picked.concat(singles.slice(0, need));
    return picked;
  },
  // 時間に合わせた出題セット。少ないときはこの Vol から、多いときはこの Vol 全問＋同じ教科の他の Vol から足す。
  // 並びは 第1部 → 第2部 → 第3部、同じ部の中は Vol 順・問題番号順（文章の問題は続けて並ぶ）。rand は 0〜1 の乱数関数
  scaledSet: function (volId, minutes, rand) {
    rand = rand || Math.random;
    var vols = BANK.vols();
    var own = vols[volId].questions;
    var target = this.countForTime(volId, minutes);
    var chosen;
    if (target <= own.length) {
      chosen = this._pickUnits(this._units(own), target, rand);
    } else {
      var others = [];
      Object.keys(vols).map(Number).filter(function (v) { return v !== volId; })
        .forEach(function (v) { others = others.concat(vols[v].questions); });
      chosen = this._units(own).concat(this._pickUnits(this._units(others), target - own.length, rand));
    }
    var qs = [];
    chosen.forEach(function (u) { qs = qs.concat(u.qs); });
    qs.sort(function (a, b) { return a.part - b.part || a.vol - b.vol || a.number - b.number; });
    return qs.map(function (q) { return q.id; });
  },
  // 10分版の分割セット。Part 5 以外を含むVolは文法/読解、Part 5 のみのVolは前半/後半
  halfSets: function (volId) {
    var qs = BANK.vols()[volId].questions;
    var p5 = [], rest = [];
    qs.forEach(function (q) { (q.part === 5 ? p5 : rest).push(q.id); });
    if (rest.length === 0) {
      var half = Math.ceil(qs.length / 2);
      var ids = qs.map(function (q) { return q.id; });
      return [
        { key: "first", label: "前半", qids: ids.slice(0, half) },
        { key: "second", label: "後半", qids: ids.slice(half) }
      ];
    }
    // Vol側で halfLabels を持っていればそれを使う（Part 5・6 特訓など、文法/読解では実態に合わないVol用）
    var labels = BANK.vols()[volId].halfLabels || {};
    return [
      { key: "grammar", label: labels.grammar || "文法", qids: p5 },
      { key: "reading", label: labels.reading || "読解", qids: rest }
    ];
  },
  createSession: function (opts) {
    var qids;
    if (opts.mode === "vol") {
      qids = BANK.vols()[opts.volId].questions.map(function (q) { return q.id; });
    } else {
      qids = opts.questionIds.slice();
    }
    var answers = {};
    qids.forEach(function (id) { answers[id] = null; });
    return {
      mode: opts.mode, volId: opts.volId || null, category: opts.category || null,
      halfKey: opts.halfKey || null,
      timeLimitSec: opts.timeLimitSec, startedAt: opts.now,
      order: qids, answers: answers,
      timeSpent: {},   // 問題ごとに画面に出していた時間（ミリ秒）。見直しで戻った分も足す
      viewing: null    // いま表示している問題 { qid, since }
    };
  },
  // 表示する問題が変わったときに呼ぶ。前の問題の表示時間を締めて、次の問題の計測を始める（qid が null なら締めるだけ）
  view: function (session, qid, now) {
    if (!session.timeSpent) session.timeSpent = {};
    var v = session.viewing;
    if (v) session.timeSpent[v.qid] = (session.timeSpent[v.qid] || 0) + Math.max(0, now - v.since);
    session.viewing = qid ? { qid: qid, since: now } : null;
  },
  // 1問あたりの時間の集計。平均＝開いた問題にかけた時間の合計÷開いた問題数（途中で採点しても薄まらないように）。
  // 目安＝教科に本番ペース（pace）があればその部の秒数で、無ければ制限時間÷問題数。計測の無い古い記録は null
  paceStats: function (record) {
    var n = record.answers.length;
    if (!n || record.answers.some(function (a) { return typeof a.timeSec !== "number"; })) return null;
    var timed = record.answers.map(function (a) { return { qid: a.qid, timeSec: a.timeSec, correct: a.correct }; });
    var seen = timed.filter(function (a) { return a.timeSec > 0; });
    var slowest = seen.slice().sort(function (x, y) { return y.timeSec - x.timeSec; }).slice(0, 3);
    var sum = seen.reduce(function (s, a) { return s + a.timeSec; }, 0);
    var pace = BANK.active().pace || null;
    function partOf(qid) { var q = BANK.getQuestion(qid); return q ? q.part : null; }
    function targetFor(list) {
      if (!pace) return record.timeLimitSec / n;
      var t = 0; list.forEach(function (a) { t += pace[partOf(a.qid)] || 0; });
      return list.length ? t / list.length : 0;
    }
    var parts = [5, 6, 7].map(function (p) {
      var all = timed.filter(function (a) { return partOf(a.qid) === p; });
      var s = all.filter(function (a) { return a.timeSec > 0; });
      return { part: p, count: s.length,
        averageSec: s.length ? s.reduce(function (x, a) { return x + a.timeSec; }, 0) / s.length : 0,
        targetSec: pace ? pace[p] : record.timeLimitSec / n };
    }).filter(function (r) { return r.count > 0; });
    return {
      targetSec: targetFor(seen.length ? seen : timed),
      targetLabel: pace ? pace.label : null,
      averageSec: seen.length ? sum / seen.length : 0,
      seenCount: seen.length,
      parts: parts,
      slowest: slowest
    };
  },
  selectAnswer: function (session, qid, idx) {
    session.answers[qid] = (session.answers[qid] === idx) ? null : idx;
  },
  remainingSec: function (session, now) {
    return Math.max(0, session.timeLimitSec - Math.floor((now - session.startedAt) / 1000));
  },
  isTimeUp: function (session, now) { return this.remainingSec(session, now) === 0; },
  answeredCount: function (session) {
    var n = 0;
    for (var k in session.answers) if (session.answers[k] !== null) n++;
    return n;
  },
  grade: function (session, now) {
    var used = Math.min(session.timeLimitSec, Math.round((now - session.startedAt) / 1000));
    // 表示中の問題の時間を締める。時間切れ後に画面を開いたままでも、制限時間を超えた分は数えない
    this.view(session, null, Math.min(now, session.startedAt + session.timeLimitSec * 1000));
    var spent = session.timeSpent || {};
    var iso = new Date(now).toISOString();
    return {
      id: iso, date: iso, mode: session.mode, volId: session.volId,
      category: session.category, halfKey: session.halfKey || null,
      timeLimitSec: session.timeLimitSec, timeUsedSec: used,
      answers: session.order.map(function (qid) {
        var chosen = session.answers[qid];
        var q = BANK.getQuestion(qid);
        return { qid: qid, chosen: chosen, correct: chosen !== null && chosen === q.answer,
          timeSec: Math.round((spent[qid] || 0) / 1000) };
      })
    };
  }
};
