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
  // 1問あたりの時間の集計。目安＝制限時間÷問題数、平均＝開いた問題にかけた時間の合計÷開いた問題数
  // （途中で採点しても、見ていない問題で平均が薄まらないように）。計測の無い古い記録（timeSec が無い）は null を返す
  paceStats: function (record) {
    var n = record.answers.length;
    if (!n || record.answers.some(function (a) { return typeof a.timeSec !== "number"; })) return null;
    var timed = record.answers.map(function (a) { return { qid: a.qid, timeSec: a.timeSec, correct: a.correct }; });
    var seen = timed.filter(function (a) { return a.timeSec > 0; });
    var slowest = seen.slice().sort(function (x, y) { return y.timeSec - x.timeSec; }).slice(0, 3);
    var sum = seen.reduce(function (s, a) { return s + a.timeSec; }, 0);
    return {
      targetSec: record.timeLimitSec / n,
      averageSec: seen.length ? sum / seen.length : 0,
      seenCount: seen.length,
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
