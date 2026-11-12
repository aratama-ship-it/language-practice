// Adapted from mock-home-dashboard.html:171-298 (2026-11-12).
var Progress = (function () {
  var DAY = 86400000;
  var DEFAULTS = { n: 30, minN: 10, top: 3, k: 5, days: 7, weeks: 12, limit: 100 };
  function shiftDay(ms, n) { var d = new Date(ms); d.setDate(d.getDate() + n); return d.getTime(); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  // ★保存の date は UTC の ISO。日ごとの集計は必ず端末の時刻（日本時間）の日付に直す
  function localDay(iso) { var d = new Date(iso); if (!isFinite(d.getTime())) return null; return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function dayStart(ms) { var d = new Date(ms); d.setHours(0, 0, 0, 0); return d.getTime(); }
  function rate(c, n) { return n ? c / n : null; }

  // 通常問題のセッション → 1 問 1 行。lookup(qid) は {category, part} か null（消えた問題は捨てる）
  function flatten(sessions, lookup) {
    var out = [];
    sessions.forEach(function (s) {
      var t = Date.parse(s.date), day = localDay(s.date);
      if (!isFinite(t)) return;
      (s.answers || []).forEach(function (a) {
        var q = lookup(a.qid);
        if (!q) return;
        out.push({ t: t, day: day, qid: a.qid, category: q.category, part: q.part,
          correct: !!a.correct, answered: a.chosen !== null && a.chosen !== undefined,
          timeSec: (typeof a.timeSec === "number" && isFinite(a.timeSec) && a.timeSec > 0) ? a.timeSec : null });
      });
    });
    out.sort(function (x, y) { return x.t - y.t; });
    return out;
  }
  // カテゴリごと: 直近 n 問と、その前の n 問
  function categoryWindows(attempts, categories, n) {
    if (n === undefined) n = DEFAULTS.n;
    return categories.map(function (cat) {
      var rows = attempts.filter(function (a) { return a.category === cat; });
      var recent = rows.slice(-n), prev = rows.slice(-2 * n, -n);
      function agg(list) {
        var c = 0, ts = 0, tn = 0;
        list.forEach(function (a) { if (a.correct) c++; if (a.timeSec !== null) { ts += a.timeSec; tn++; } });
        return { n: list.length, rate: rate(c, list.length), sec: tn ? ts / tn : null };
      }
      var r = agg(recent), p = agg(prev);
      return { category: cat, total: rows.length, recent: r, prev: p,
        delta: (r.rate !== null && p.rate !== null && p.n >= 10) ? r.rate - p.rate : null };
    });
  }
  // 弱点: 直近の回答が minN 以上あるカテゴリを、正答率の低い順に
  function weakest(windows, minN, top) {
    if (minN === undefined) minN = DEFAULTS.minN;
    if (top === undefined) top = DEFAULTS.top;
    return windows.filter(function (w) { return w.recent.n >= minN; })
      .sort(function (a, b) { return a.recent.rate - b.recent.rate || b.total - a.total; }).slice(0, top);
  }
  // 最新の解答が誤りのままの問題
  function stillWrong(attempts) {
    var last = {};
    attempts.forEach(function (a) { last[a.qid] = a.correct; });
    return Object.keys(last).filter(function (q) { return !last[q]; });
  }
  // 1 回以上解いた問題数と、最新が正解の問題数
  function coverage(attempts, totalQuestions) {
    var last = {};
    attempts.forEach(function (a) { last[a.qid] = a.correct; });
    var ids = Object.keys(last);
    return { total: totalQuestions, seen: ids.length, solid: ids.filter(function (q) { return last[q]; }).length };
  }
  // 直近 days 日と、その前の days 日
  function periodStats(attempts, now, days) {
    if (days === undefined) days = DEFAULTS.days;
    var end = shiftDay(dayStart(now), 1), mid = shiftDay(end, -days), start = shiftDay(mid, -days);
    function agg(from, to) {
      var c = 0, n = 0, ts = 0, tn = 0, d = {};
      attempts.forEach(function (a) {
        if (a.t < from || a.t >= to) return;
        n++; if (a.correct) c++; d[a.day] = 1;
        if (a.timeSec !== null) { ts += a.timeSec; tn++; }
      });
      return { n: n, rate: rate(c, n), sec: tn ? ts / tn : null, days: Object.keys(d).length };
    }
    return { cur: agg(mid, end), prev: agg(start, mid) };
  }
  // 回ごとの正答率（5 問未満の回は外す）と、直近 k 回の移動平均
  function sessionSeries(sessions, k) {
    if (k === undefined) k = DEFAULTS.k;
    var pts = sessions.map(function (s) {
      var n = (s.answers || []).length, c = (s.answers || []).filter(function (a) { return a.correct; }).length;
      return { t: Date.parse(s.date), n: n, rate: rate(c, n) };
    }).filter(function (p) { return p.n >= 5 && isFinite(p.t); }).sort(function (a, b) { return a.t - b.t; });
    pts.forEach(function (p, i) {
      var from = Math.max(0, i - k + 1), c = 0, n = 0;
      for (var j = from; j <= i; j++) { c += pts[j].rate * pts[j].n; n += pts[j].n; }
      p.roll = (i - from + 1 >= 3) ? c / n : null;
    });
    return pts;
  }
  // 12 週ぶんの日ごとの問題数。月曜始まり。未来の日は future:true
  function calendar(dayCounts, now, weeks) {
    if (weeks === undefined) weeks = DEFAULTS.weeks;
    var today = dayStart(now), dow = (new Date(today).getDay() + 6) % 7; // 月=0
    var monday = shiftDay(today, -dow - (weeks - 1) * 7), cols = [];
    for (var w = 0; w < weeks; w++) {
      var col = [];
      for (var d = 0; d < 7; d++) {
        var ms = shiftDay(monday, w * 7 + d), key = localDay(new Date(ms).toISOString());
        col.push({ day: key, ms: ms, n: dayCounts[key] || 0, future: ms > today, today: ms === today });
      }
      cols.push(col);
    }
    return cols;
  }
  function level(n) { return n === 0 ? 0 : n < 20 ? 1 : n < 40 ? 2 : n < 80 ? 3 : 4; }
  // Part ごとの 1 問あたり秒（直近 limit 問）
  function paceByPart(attempts, parts, limit) {
    if (limit === undefined) limit = DEFAULTS.limit;
    return parts.map(function (p) {
      var rows = attempts.filter(function (a) { return a.part === p; }).slice(-limit).filter(function (a) { return a.timeSec !== null; });
      var s = 0; rows.forEach(function (a) { s += a.timeSec; });
      return { part: p, n: rows.length, sec: rows.length ? s / rows.length : null };
    });
  }
  // ディクテーション・リスニングの記録 → 直近 k 回の正答率
  function skillRecent(results, k) {
    if (k === undefined) k = DEFAULTS.k;
    var list = results.slice().sort(function (a, b) { return Date.parse(a.date) - Date.parse(b.date); });
    var recent = list.slice(-k), c = 0, n = 0;
    recent.forEach(function (r) { c += r.correct; n += r.total; });
    return { runs: list.length, rate: rate(c, n), series: list.map(function (r) { return { t: Date.parse(r.date), rate: rate(r.correct, r.total) }; }) };
  }
  return { localDay: localDay, flatten: flatten, categoryWindows: categoryWindows, weakest: weakest, stillWrong: stillWrong,
    coverage: coverage, periodStats: periodStats, sessionSeries: sessionSeries, calendar: calendar, level: level,
    paceByPart: paceByPart, skillRecent: skillRecent, DAY: DAY, DEFAULTS: DEFAULTS };
})();

