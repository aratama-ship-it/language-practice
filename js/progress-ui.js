// Adapted from mock-home-dashboard.html:351-592 (2026-11-12).
var ProgressUI = (function () {
"use strict";
function h() { return App.el.apply(App, arguments); }
function s(tag, attrs, kids) {
  var e = document.createElementNS("http://www.w3.org/2000/svg", tag);
  if (attrs) Object.keys(attrs).forEach(function (k) { if (k === "text") e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); });
  (kids || []).forEach(function (c) { if (c) e.appendChild(c); });
  return e;
}
function pct(r) { return r === null ? "—" : Math.round(r * 100) + "%"; }
function md(ms) { var d = new Date(ms); return (d.getMonth() + 1) + "/" + d.getDate(); }
function meter(r, em, tick) {
  var m = h("div", { class: "meter" + (em ? " em" : ""), role: "img", "aria-label": "正答率 " + pct(r) });
  var i = h("i"); i.style.width = Math.round((r || 0) * 100) + "%"; m.appendChild(i);
  if (tick !== null && tick !== undefined) { var b = h("b", { title: "前の30問 " + pct(tick) }); b.style.left = "calc(" + Math.round(tick * 100) + "% - 1px)"; m.appendChild(b); }
  return m;
}
// 折れ線（点＝1 回ごと・線＝移動平均）。series: [{name,color,points:[{t,rate,roll}]}]
function lineChart(box, series, opt) {
  box.textContent = "";
  box.style.setProperty("--prog-chart-height", (opt.h || 150) + "px");
  var W = Math.max(280, box.clientWidth || document.querySelector("main").clientWidth - 66), H = opt.h || 150, L = 34, R = opt.endLabel ? 40 : 10, T = 10, B = 28;
  var t0 = opt.t0, t1 = opt.t1, y0 = opt.y0, y1 = 1;
  function X(t) { return L + (t - t0) / (t1 - t0) * (W - L - R); }
  function Y(v) { return T + (1 - (v - y0) / (y1 - y0)) * (H - T - B); }
  var svg = s("svg", { viewBox: "0 0 " + W + " " + H, width: W, height: H, role: "img", "aria-label": opt.label });
  [y0, (y0 + y1) / 2, y1].forEach(function (v) {
    svg.appendChild(s("line", { x1: L, x2: W - R, y1: Y(v), y2: Y(v), stroke: "var(--line)", "stroke-width": 1 }));
    svg.appendChild(s("text", { x: L - 6, y: Y(v) + 4, "text-anchor": "end", text: Math.round(v * 100) + "%" }));
  });
  for (var w = 0; w <= opt.weeks; w += (opt.weeks > 8 ? 4 : 2)) {
    var t = t1 - w * 7 * Progress.DAY;
    svg.appendChild(s("text", { x: X(t), y: H - 4, "text-anchor": w === 0 ? "end" : "middle", text: w === 0 ? "今日" : w + "週前" }));
  }
  var hit = [];
  series.forEach(function (se) {
    var pts = se.points.filter(function (p) { return p.t >= t0 && p.t <= t1; });
    if (opt.dots) pts.forEach(function (p) {
      svg.appendChild(s("circle", { cx: X(p.t), cy: Y(Math.max(y0, p.rate)), r: 2.5, fill: "var(--viz-mute)" }));
      hit.push({ x: X(p.t), y: Y(Math.max(y0, p.rate)), txt: md(p.t) + "　" + pct(p.rate) + (p.n ? "（" + p.n + "問）" : "") });
    });
    var key = opt.dots ? "roll" : "rate", line = pts.filter(function (p) { return p[key] !== null && p[key] !== undefined; });
    if (line.length > 1) {
      svg.appendChild(s("path", { d: line.map(function (p, i) { return (i ? "L" : "M") + X(p.t).toFixed(1) + " " + Y(Math.max(y0, p[key])).toFixed(1); }).join(" "),
        fill: "none", stroke: se.color, "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round" }));
    }
    if (line.length) {
      var last = line[line.length - 1];
      svg.appendChild(s("circle", { cx: X(last.t), cy: Y(Math.max(y0, last[key])), r: 4, fill: se.color, stroke: "var(--card)", "stroke-width": 2 }));
      if (opt.endLabel) svg.appendChild(s("text", { x: X(last.t) + 8, y: Y(Math.max(y0, last[key])) + 4, class: "end", text: pct(last[key]) }));
      if (!opt.dots) line.forEach(function (p) { hit.push({ x: X(p.t), y: Y(Math.max(y0, p[key])), txt: se.name + "　" + md(p.t) + "　" + pct(p[key]) }); });
    }
  });
  box.appendChild(svg);
  var tip = h("div", { class: "tip" }); box.appendChild(tip);
  function show(ev) {
    var rect = svg.getBoundingClientRect(), k = W / rect.width, x = (ev.clientX - rect.left) * k, best = null, bd = 1e9;
    hit.forEach(function (p) { var d = Math.abs(p.x - x); if (d < bd) { bd = d; best = p; } });
    if (!best) return;
    tip.textContent = best.txt; tip.style.display = "block"; tip.style.left = Math.max(tip.offsetWidth / 2, Math.min(rect.width - tip.offsetWidth / 2, best.x / k)) + "px"; tip.style.top = (best.y / k) + "px";
  }
  svg.addEventListener("pointermove", show); svg.addEventListener("pointerdown", show);
  svg.addEventListener("pointerleave", function () { tip.style.display = "none"; });
}
function spark(points, color, w, hh) {
  var svg = s("svg", { viewBox: "0 0 " + w + " " + hh, width: w, height: hh, role: "img", "aria-label": "正答率の推移 " + points.map(pct).join("、") });
  var vals = points.filter(function (v) { return v !== null; });
  if (vals.length < 2) return svg;
  var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals); if (hi - lo < 0.1) { lo -= 0.05; hi += 0.05; }
  var d = vals.map(function (v, i) { return (i ? "L" : "M") + (2 + i / (vals.length - 1) * (w - 8)).toFixed(1) + " " + (3 + (1 - (v - lo) / (hi - lo)) * (hh - 6)).toFixed(1); }).join(" ");
  svg.appendChild(s("path", { d: d, fill: "none", stroke: color, "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round" }));
  var lv = vals[vals.length - 1];
  svg.appendChild(s("circle", { cx: w - 6, cy: 3 + (1 - (lv - lo) / (hi - lo)) * (hh - 6), r: 3, fill: color }));
  return svg;
}

function headRow(title) {
  return h("div", { class: "prog-head" }, [h("h2", { text: title }), h("button", { class: "prog-more", text: "くわしく ›", onclick: function () { App.openAnalysis(); } })]);
}
function emptyBlock(m) {
  var n = m.sessions.length, card = h("section", { class: "card prog" }, [headRow("これまでの成績")]);
  if (n === 0) {
    card.appendChild(h("p", { class: "empty" }, [h("b", { text: "まだ記録がありません。" }), " 1 回解くと、ここに結果が出ます。"]));
  } else {
    var a = m.attempts.length, c = m.attempts.filter(function (x) { return x.correct; }).length;
    card.appendChild(h("p", { class: "empty" }, [h("b", { text: n + " 回・" + a + " 問・正答率 " + pct(a ? c / a : null) }), "。弱点と推移は、もう少し記録がたまると出ます。"]));
  }
  card.appendChild(h("ul", { class: "empty-steps" }, [
    h("li", { text: "3 回解くと: 正答率の推移" }), h("li", { text: "同じカテゴリを 10 問解くと: そのカテゴリの弱点の判定" }), h("li", { text: "30 問を超えると: 前の 30 問との比較" })]));
  return card;
}
function weekLine(m) {
  var w = m.week, p = h("p", { class: "week-line" });
  p.appendChild(document.createTextNode("この 7 日　"));
  p.appendChild(h("b", { class: "num", text: w.cur.n + "問" }));
  p.appendChild(document.createTextNode("・正答率 ")); p.appendChild(h("b", { class: "num", text: pct(w.cur.rate) }));
  if (w.prev.rate !== null) p.appendChild(document.createTextNode("（前の 7 日 " + pct(w.prev.rate) + "）"));
  if (w.cur.sec !== null) { p.appendChild(document.createTextNode("・1 問 ")); p.appendChild(h("b", { class: "num", text: Math.round(w.cur.sec) + "秒" })); }
  return p;
}
function weakList(m, withGo) {
  var ul = h("ul", { class: "weak-list" });
  m.weak.forEach(function (w, i) {
    ul.appendChild(h("li", null, [
      h("span", { class: "prog-weak-rank", text: String(i + 1) }),
      h("span", { class: "prog-weak-name" }, [h("span", { text: w.category }), h("span", { class: "prog-weak-val num", text: pct(w.recent.rate) })]),
      withGo ? h("button", { class: "prog-weak-go", text: "10問" , "aria-label": w.category + "を 10 問", onclick: function () { App.startReview({source:"category", category:w.category, count:10, prefer:"weak"}); } }) : null,
      h("span", { class: "prog-weak-meter" }, [meter(w.recent.rate, i === 0, w.delta !== null ? w.prev.rate : null)]),
      h("span", { class: "delta", text: w.delta === null ? "比べる前の 30 問がまだありません" : "その前の 30 問は " + pct(w.prev.rate) + "（縦線）" })
    ]));
  });
  return ul;
}

// ---- 案 A: 次の一手 ----
function blockA(m) {
  var card = h("section", { class: "card prog" }, [headRow("これまでの成績")]);
  card.appendChild(h("p", { class: "prog-cap", text: "落としているところ（カテゴリごとの直近 30 問）" }));
  card.appendChild(m.weak.length ? weakList(m, true) : h("p", {class:"empty", text:"同じカテゴリを 10 問解くと: そのカテゴリの弱点の判定"}));
  if (m.wrong.length) card.appendChild(h("div", { class: "prog-sec redo" }, [
    h("span", null, ["間違えたままの問題 ", h("b", { class: "num", text: m.wrong.length + "問" })]), h("button", { text: "解き直す", onclick: function () { App.startReview({source:"wrong", count:10}); } })]));
  var sec = h("div", { class: "prog-sec" }, [weekLine(m)]);
  var box = h("div", { class: "chart" }); sec.appendChild(box);
  card.appendChild(sec);
  card._after = function () {
    if (m.series.length < 3) { box.textContent = "3 回解くと: 正答率の推移（5 問以上の回）"; return; }
    lineChart(box, [{ name: "正答率", color: "var(--viz-quiz)", points: m.series }], { h: 96, t0: m.now - 56 * Progress.DAY, t1: m.now, y0: 0.4, weeks: 8, dots: true, endLabel: true, label: "正答率の推移（8 週）。点は 1 回ごと、線は直近 5 回の平均" });
  };
  sec.appendChild(h("p", { class: "prog-cap", text: "点＝1 回ごと／線＝直近 5 回の平均（8 週）" }));
  return card;
}

// ---- 案 B: 計器盤 ----
function blockB(m) {
  var w = m.week, card = h("section", { class: "card prog" });
  function kpi(l, v, unit, d) { return h("div", { class: "kpi" }, [h("div", { class: "l", text: l }), h("div", { class: "v" }, [v, h("small", { text: unit })]), h("div", { class: "d", text: d })]); }
  var avg = m.paceDelta === null ? "" : "本番の目安より " + (m.paceDelta >= 0 ? "+" : "−") + Math.abs(Math.round(m.paceDelta)) + "秒";
  card.appendChild(h("div", { class: "kpis" }, [
    kpi("この 7 日の問題数", String(w.cur.n), "問", "前の 7 日 " + w.prev.n + "問・" + w.cur.days + "日"),
    kpi("この 7 日の正答率", (w.cur.rate === null ? "—" : String(Math.round(w.cur.rate * 100))), "%", "前の 7 日 " + pct(w.prev.rate)),
    kpi("1 問あたり", (w.cur.sec === null ? "—" : String(Math.round(w.cur.sec))), "秒", avg),
    kpi("最新が正解の問題", String(m.cover.solid), "/ " + m.cover.total, "解いたことがある " + m.cover.seen + "問")]));

  var s1 = h("div", { class: "prog-sec" }, [h("h3", { text: "正答率の推移（12 週）" })]);
  var box = h("div", { class: "chart" }); s1.appendChild(box);
  s1.appendChild(h("p", { class: "prog-cap", text: "点＝1 回ごと／線＝直近 5 回の平均" }));
  var det = h("details", { class: "as-table" }, [h("summary", { text: "表で見る（直近 6 回）" })]);
  var tb = h("table", { class: "pt" }, [h("thead", null, [h("tr", null, [h("th", { text: "日付" }), h("th", { class: "r", text: "問題数" }), h("th", { class: "r", text: "正答率" }), h("th", { class: "r", text: "5 回平均" })])])]);
  var body = h("tbody"); m.series.slice(-6).reverse().forEach(function (p) {
    body.appendChild(h("tr", null, [h("td", { text: md(p.t) }), h("td", { class: "r", text: String(p.n) }), h("td", { class: "r", text: pct(p.rate) }), h("td", { class: "r", text: pct(p.roll) })])); });
  tb.appendChild(body); det.appendChild(tb); s1.appendChild(det); card.appendChild(s1);

  var s2 = h("div", { class: "prog-sec" }, [h("h3", { text: "カテゴリ別（直近 30 問・低い順）" })]);
  var t2 = h("table", { class: "pt" }, [h("thead", null, [h("tr", null, [h("th", { text: "カテゴリ" }), h("th", { text: "正答率" }), h("th", { class: "r", text: "" }), h("th", { class: "r", text: "前との差" }), h("th", { class: "r opt", text: "1 問" })])])]);
  var b2 = h("tbody"), weakNames = m.weak.map(function (x) { return x.category; });
  m.wins.slice().sort(function (a, b) { return (a.recent.rate === null) - (b.recent.rate === null) || a.recent.rate - b.recent.rate; }).forEach(function (x) {
    var isWeak = weakNames.indexOf(x.category) === 0;
    b2.appendChild(h("tr", isWeak ? { class: "weak" } : null, [
      h("td", { class: "name", text: x.category }), h("td", { class: "bar" }, [meter(x.recent.rate, isWeak, x.delta !== null ? x.prev.rate : null)]),
      h("td", { class: "r", text: x.recent.n < 10 ? "あと" + (10 - x.recent.n) + "問" : pct(x.recent.rate) }),
      h("td", { class: "r", text: x.delta === null ? "—" : (Math.round(x.delta * 100) === 0 ? "±0" : (x.delta > 0 ? "+" : "−") + Math.round(Math.abs(x.delta) * 100)) }),
      h("td", { class: "r opt", text: x.recent.sec === null ? "—" : Math.round(x.recent.sec) + "秒" })]));
  });
  t2.appendChild(b2); s2.appendChild(t2);
  s2.appendChild(h("p", { class: "prog-cap", text: "棒の中の縦線＝その前の 30 問の正答率。10 問に満たないカテゴリは判定しません。" }));
  card.appendChild(s2);

  if (m.pace) {
    var s3 = h("div", { class: "prog-sec" }, [h("h3", { text: "Part ごとの速さ（直近 100 問・縦線＝本番の目安）" })]);
    m.pace.forEach(function (p) {
      var target = m.subj.pace[p.part], max = target * 1.8, row = h("div", { class: "pace-row" });
      var mt = h("div", { class: "meter" + (p.sec > target * 1.1 ? " em" : ""), role: "img", "aria-label": "Part " + p.part + " 1 問 " + (p.sec === null ? "—" : Math.round(p.sec)) + "秒、目安 " + target + "秒" });
      var i = h("i"); i.style.width = Math.min(100, p.sec / max * 100) + "%"; mt.appendChild(i);
      var b = h("b"); b.style.left = "calc(" + (target / max * 100) + "% - 1px)"; mt.appendChild(b);
      row.appendChild(h("span", { text: "Part " + p.part })); row.appendChild(mt);
      row.appendChild(h("span", { class: "v", text: (p.sec === null ? "—" : Math.round(p.sec)) + "秒 / 目安 " + target + "秒" }));
      s3.appendChild(row);
    });
    card.appendChild(s3);
  }
  var s4 = h("div", { class: "prog-sec" }, [h("h3", { text: "3 つの練習（直近 3 回の正答率）" })]);
  [["通常問題", "var(--viz-quiz)", m.quiz],
   ["ディクテーション", "var(--viz-dict)", m.dict], ["リスニング", "var(--viz-lis)", m.lis]].forEach(function (r) {
    var sw = h("span", { class: "swatch" }); sw.style.background = r[1];
    s4.appendChild(h("div", { class: "skill-row" }, [h("span", null, [sw, r[0]]),
      spark(r[2].series.slice(-10).map(function (p) { return p.rate; }), r[1], 110, 26),
      h("span", { class: "num" }, [h("b", { text: pct(r[2].rate) }), "　" + r[2].runs + "回"])]));
  });
  card.appendChild(s4);
  card._after = function () {
    if (m.series.length < 3) { box.textContent = "3 回解くと: 正答率の推移（5 問以上の回）"; return; }
    lineChart(box, [{ name: "正答率", color: "var(--viz-quiz)", points: m.series }], { h: 150, t0: m.now - 84 * Progress.DAY, t1: m.now, y0: 0.4, weeks: 12, dots: true, endLabel: true, label: "正答率の推移（12 週）" });
  };
  return card;
}

function blockC(m) {
  var card = h("section", { class: "card prog" }, [headRow("これまでの成績")]);
  var cols = Progress.calendar(m.dayCounts, m.now, 12), days = 0, qs = 0;
  cols.forEach(function (c) { c.forEach(function (d) { if (d.n) { days++; qs += d.n; } }); });
  card.appendChild(h("p", { class: "week-line" }, ["この 12 週　", h("b", { class: "num", text: days + "日" }), "・", h("b", { class: "num", text: qs.toLocaleString() + "問" })]));
  var cal = h("div", { class: "cal", role: "img", "aria-label": "12 週の記録。" + days + "日、" + qs + "問" });
  cal.appendChild(h("span")); var lastMo = -1;
  cols.forEach(function (c) { var mo = new Date(c[0].ms).getMonth(); cal.appendChild(h("span", { class: "mo", text: mo !== lastMo ? (mo + 1) + "月" : "" })); lastMo = mo; });
  ["月", "", "水", "", "金", "", "日"].forEach(function (wd, r) {
    cal.appendChild(h("span", { class: "wd", text: wd }));
    cols.forEach(function (c) { var d = c[r];
      cal.appendChild(h("span", { class: "c" + (d.future ? " future" : "") + (d.today ? " today" : ""), "data-l": String(Progress.level(d.n)), title: md(d.ms) + "　" + (d.future ? "" : d.n + "問") })); });
  });
  card.appendChild(cal);
  var key = h("div", { class: "cal-key" }, ["0"]);
  [0, 1, 2, 3, 4].forEach(function (l) { var i = h("i"); i.style.background = "var(--seq-" + l + ")"; key.appendChild(i); });
  key.appendChild(document.createTextNode("80問〜／日")); card.appendChild(key);

  return card;
}

function read(key, field) {
  try { var data = JSON.parse(localStorage.getItem(key)); return data && data.version === 1 && Array.isArray(data[field]) ? data[field] : []; }
  catch (e) { return []; }
}
function model(id) {
  var subj = BANK.subjects[id], questions = BANK._questionsOf(subj), lookup = Object.create(null), now = Date.now();
  questions.forEach(function (q) { lookup[q.id] = q; });
  var sessions = read(subj.storageKey, "sessions").filter(function (s) { return s && isFinite(Date.parse(s.date)); }).map(function (s) {
    return {date:s.date, answers:(s.answers || []).filter(function (a) { return a && lookup[a.qid]; })};
  });
  var attempts = Progress.flatten(sessions, function (id) { return lookup[id] || null; });
  var wins = Progress.categoryWindows(attempts, subj.categories), dayCounts = {};
  attempts.forEach(function (a) { dayCounts[a.day] = (dayCounts[a.day] || 0) + 1; });
  var start = new Date(now); start.setHours(0,0,0,0); start.setDate(start.getDate()-6);
  var delta = 0, timed = 0;
  if (subj.pace) attempts.forEach(function (a) {
    if (a.t >= start.getTime() && a.t <= now && a.timeSec !== null && subj.pace[a.part]) { delta += a.timeSec-subj.pace[a.part]; timed++; }
  });
  return {now:now, subj:subj, sessions:sessions, attempts:attempts, wins:wins, weak:Progress.weakest(wins),
    wrong:Progress.stillWrong(attempts), cover:Progress.coverage(attempts, questions.length), week:Progress.periodStats(attempts,now),
    series:Progress.sessionSeries(sessions), dayCounts:dayCounts, pace:subj.pace ? Progress.paceByPart(attempts,[5,6,7]) : null,
    paceDelta:timed ? delta/timed : null,
    quiz:Progress.skillRecent(sessions.map(function (s) { return {date:s.date,total:s.answers.length,correct:s.answers.filter(function(a){return a.correct;}).length}; }),3),
    dict:Progress.skillRecent(read(DICT[id].storageKey,"results"),3), lis:Progress.skillRecent(read(LISTEN[id].storageKey,"results"),3)};
}
function buildHomeBlock(id) {
  var m = model(id);
  return m.series.length < 3 ? emptyBlock(m) : blockA(m);
}
function buildAnalysisBlock(id) {
  var m = model(id), card = blockB(m), calendar = blockC(m);
  calendar.firstChild.remove();
  var section = h("div", {class:"prog-sec"}, [h("h3",{text:"12 週の記録"})]);
  while (calendar.firstChild) section.appendChild(calendar.firstChild);
  card.appendChild(section);
  return card;
}
function draw(card) { if (card && card._after) card._after(); }
window.addEventListener("resize", function () {
  var home = document.getElementById("screen-home");
  if (home && !home.classList.contains("hidden")) draw(home.querySelector(".prog"));
});
return {buildHomeBlock:buildHomeBlock, buildAnalysisBlock:buildAnalysisBlock, draw:draw};
})();
