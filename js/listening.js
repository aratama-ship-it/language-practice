// リスニングの採点・集計（純粋関数）
var Listening = {
  gradeQuestions: function (questions, answers) {
    var results = [], correct = 0;
    questions.forEach(function (q) {
      var chosen = (answers && answers[q.id] !== undefined) ? answers[q.id] : null;
      var ok = chosen !== null && chosen === q.answer;
      if (ok) correct++;
      results.push({ questionId: q.id, category: q.category, chosen: chosen, correct: ok });
    });
    var total = questions.length;
    return { results: results, correct: correct, total: total, rate: total ? correct / total : 0 };
  },
  categoryStats: function (results, subjectId) {
    var cats = LISTEN[subjectId].categories;
    var map = {};
    cats.forEach(function (c) { map[c] = { category: c, attempts: 0, correct: 0, rate: null }; });
    results.forEach(function (r) {
      (r.items || []).forEach(function (it) {
        var st = map[it.category];
        if (!st) return;
        st.attempts++;
        if (it.correct) st.correct++;
      });
    });
    return cats.map(function (c) {
      var st = map[c];
      if (st.attempts > 0) st.rate = st.correct / st.attempts;
      return st;
    });
  }
};
