// 成績集計・弱点解析・復習セット生成
var Analysis = {
  // 全セッションの解答を (qid, correct) の平坦リストにする
  _flatAnswers: function (sessions) {
    var out = [];
    sessions.forEach(function (s) {
      (s.answers || []).forEach(function (a) { out.push(a); });
    });
    return out;
  },
  categoryStats: function (sessions) {
    var stats = {};
    BANK.categories().forEach(function (c) {
      stats[c] = { category: c, attempts: 0, correct: 0, rate: null };
    });
    this._flatAnswers(sessions).forEach(function (a) {
      var q = BANK.getQuestion(a.qid);
      if (!q) return;
      var st = stats[q.category];
      st.attempts++;
      if (a.correct) st.correct++;
    });
    return BANK.categories().map(function (c) {
      var st = stats[c];
      if (st.attempts > 0) st.rate = st.correct / st.attempts;
      return st;
    });
  },
  partStats: function (sessions) {
    var stats = { 5: { part: 5, attempts: 0, correct: 0, rate: null },
                  6: { part: 6, attempts: 0, correct: 0, rate: null },
                  7: { part: 7, attempts: 0, correct: 0, rate: null } };
    this._flatAnswers(sessions).forEach(function (a) {
      var q = BANK.getQuestion(a.qid);
      if (!q) return;
      var st = stats[q.part];
      st.attempts++;
      if (a.correct) st.correct++;
    });
    return [5, 6, 7].map(function (p) {
      var st = stats[p];
      if (st.attempts > 0) st.rate = st.correct / st.attempts;
      return st;
    });
  },
  weakestCategories: function (sessions, minAttempts) {
    if (minAttempts === undefined) minAttempts = 5;
    return this.categoryStats(sessions)
      .filter(function (c) { return c.attempts >= minAttempts; })
      .sort(function (a, b) { return a.rate - b.rate; });
  },
  // 「最新の解答が誤答」の問題ID一覧
  wrongQuestionIds: function (sessions) {
    var latest = {}; // qid -> { date, correct }
    sessions.forEach(function (s) {
      (s.answers || []).forEach(function (a) {
        if (!latest[a.qid] || s.date >= latest[a.qid].date) {
          latest[a.qid] = { date: s.date, correct: a.correct };
        }
      });
    });
    var out = [];
    for (var qid in latest) if (!latest[qid].correct) out.push(qid);
    return out;
  },
  sessionLabel: function (s) {
    if (s.mode === "vol") {
      var v = BANK.vols()[s.volId];
      return v ? v.label : "Vol." + s.volId;
    }
    if (s.mode === "half") {
      var name = null;
      if (typeof Quiz !== "undefined" && BANK.vols()[s.volId]) {
        var set = Quiz.halfSets(s.volId).filter(function (h) { return h.key === s.halfKey; })[0];
        if (set) name = set.label;
      }
      return "Vol." + s.volId + " " + (name ? name + "10分" : "10分版");
    }
    if (s.mode === "review-category") return "弱点復習（" + s.category + "）";
    return "弱点復習（間違えた問題）";
  },
  sessionSummaries: function (sessions) {
    var self = this;
    return sessions.slice()
      .sort(function (a, b) { return a.date < b.date ? 1 : -1; })
      .map(function (s) {
        var total = (s.answers || []).length;
        var score = (s.answers || []).filter(function (a) { return a.correct; }).length;
        return { id: s.id, date: s.date, label: self.sessionLabel(s),
                 score: score, total: total, rate: total > 0 ? score / total : null };
      });
  },
  _shuffle: function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  },
  buildReviewSet: function (sessions, opts) {
    var pool;
    if (opts.source === "wrong") {
      pool = this.wrongQuestionIds(sessions);
    } else {
      pool = BANK.allQuestions()
        .filter(function (q) { return q.category === opts.category; })
        .map(function (q) { return q.id; });
    }
    this._shuffle(pool);
    if (opts.count === "all" || pool.length <= opts.count) return pool;
    return pool.slice(0, opts.count);
  }
};
