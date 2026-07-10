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
    return [
      { key: "grammar", label: "文法", qids: p5 },
      { key: "reading", label: "読解", qids: rest }
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
      order: qids, answers: answers
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
    var iso = new Date(now).toISOString();
    return {
      id: iso, date: iso, mode: session.mode, volId: session.volId,
      category: session.category, halfKey: session.halfKey || null,
      timeLimitSec: session.timeLimitSec, timeUsedSec: used,
      answers: session.order.map(function (qid) {
        var chosen = session.answers[qid];
        var q = BANK.getQuestion(qid);
        return { qid: qid, chosen: chosen, correct: chosen !== null && chosen === q.answer };
      })
    };
  }
};
