// ディクテーションの採点・差分・集計（純粋関数）
var Dictation = {
  normalize: function (s) {
    return String(s).toLowerCase().normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^0-9a-z]/g, "");
  },
  levenshtein: function (a, b) {
    var m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    var prev = [], cur = [], i, j;
    for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++) {
      cur[0] = i;
      for (j = 1; j <= n; j++) {
        var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      }
      for (j = 0; j <= n; j++) prev[j] = cur[j];
    }
    return prev[n];
  },
  wordMatch: function (target, typed) {
    var nt = this.normalize(target), np = this.normalize(typed);
    if (nt === np) return (String(target) === String(typed)) ? "exact" : "close";
    if (nt.length === 0) return "wrong";
    var tol = nt.length <= 4 ? 1 : 2;
    return this.levenshtein(nt, np) <= tol ? "close" : "wrong";
  },
  tokenize: function (s) {
    return String(s).trim().split(/\s+/).filter(function (w) { return w.length > 0; });
  },
  gradeBlanks: function (item, answers) {
    var self = this;
    var words = this.tokenize(item.text);
    var results = [], correct = 0, missed = [];
    item.blanks.forEach(function (idx) {
      var target = words[idx];
      var typed = (answers[idx] || "").trim();
      var status = self.wordMatch(target, typed);
      if (status === "exact" || status === "close") correct++;
      else missed.push(target);
      results.push({ index: idx, target: target, typed: typed, status: status });
    });
    var total = item.blanks.length;
    return { results: results, correct: correct, total: total,
      rate: total ? correct / total : 0, missedWords: missed };
  },
  // 正規化トークンで LCS を取り、正解語ごとに exact/close/missed を割り当てる
  gradeSentence: function (targetText, typedText) {
    var self = this;
    var T = this.tokenize(targetText), P = this.tokenize(typedText);
    var m = T.length, n = P.length, i, j;
    var dp = [];
    for (i = 0; i <= m; i++) { dp[i] = []; for (j = 0; j <= n; j++) dp[i][j] = 0; }
    function eq(a, b) { return self.wordMatch(a, b) !== "wrong"; }
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) {
      dp[i][j] = eq(T[i - 1], P[j - 1])
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
    var matchedT = {}, matchedP = {};
    i = m; j = n;
    while (i > 0 && j > 0) {
      if (eq(T[i - 1], P[j - 1]) && dp[i][j] === dp[i - 1][j - 1] + 1) {
        matchedT[i - 1] = P[j - 1]; matchedP[j - 1] = true; i--; j--;
      } else if (dp[i - 1][j] >= dp[i][j - 1]) { i--; } else { j--; }
    }
    var targetTokens = [], missed = [], correctCount = 0;
    for (i = 0; i < m; i++) {
      if (matchedT.hasOwnProperty(i)) {
        var st = self.wordMatch(T[i], matchedT[i]); // exact または close
        targetTokens.push({ text: T[i], status: st });
        correctCount++;
      } else {
        targetTokens.push({ text: T[i], status: "missed" });
        missed.push(T[i]);
      }
    }
    var extras = [];
    for (j = 0; j < n; j++) if (!matchedP[j]) extras.push(P[j]);
    return { score: m ? correctCount / m : 0, targetTokens: targetTokens,
      typedExtras: extras, missedWords: missed };
  },
  categoryStats: function (results, subjectId) {
    var cats = DICT[subjectId].categories;
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
  },
  troubleWords: function (results, topN) {
    if (topN === undefined) topN = 20;
    var counts = {};
    results.forEach(function (r) {
      (r.items || []).forEach(function (it) {
        (it.missedWords || []).forEach(function (w) {
          counts[w] = (counts[w] || 0) + 1;
        });
      });
    });
    var arr = [];
    for (var w in counts) arr.push({ word: w, count: counts[w] });
    arr.sort(function (a, b) { return b.count - a.count; });
    return arr.slice(0, topN);
  }
};
