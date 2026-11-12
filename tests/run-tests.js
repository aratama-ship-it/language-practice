// TOEIC webapp テストランナー: node tests/run-tests.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const ctx = vm.createContext({ console });
function load(rel) {
  vm.runInContext(fs.readFileSync(path.join(root, rel), "utf8"), ctx, { filename: rel });
}

let failures = 0;
let assertions = 0;
let current = "";
function section(name) { current = name; }
function assert(cond, msg) {
  assertions++;
  if (!cond) { failures++; console.error(`FAIL [${current}] ${msg}`); }
}

// ---- データ読み込み ----
const DATA_FILES = ["js/subjects.js", "js/data/bank.js",
  "js/data/vol1.js", "js/data/vol2.js", "js/data/vol3.js", "js/data/vol4.js",
  "js/data/vol5.js", "js/data/vol6.js", "js/data/vol7.js", "js/data/vol8.js",
  "js/data/french/vol1.js", "js/data/french/vol2.js",
  "js/data/french/vol3.js", "js/data/french/vol4.js", "js/data/french/vol5.js",
  "js/data/french/vol6.js", "js/data/french/vol7.js", "js/data/french/vol8.js",
  "js/data/chinese/vol1.js", "js/data/chinese/vol2.js"];
DATA_FILES.forEach(f => {
  if (fs.existsSync(path.join(root, f))) load(f);
});

const BANK = ctx.BANK;
section("bank-base");
assert(BANK, "BANK が定義されている");

// ---- 教科ごとの問題数・整合性チェック ----
// 教科ごとの期待問題数（フランス語は Task 6/7 で追加）
const EXPECTED = {
  toeic: { 1: 32, 2: 32, 3: 32, 4: 30, 5: 32, 6: 32, 7: 32, 8: 32 },
  french: { 1: 32, 2: 32, 3: 32, 4: 32, 5: 32, 6: 32, 7: 32, 8: 32 },
  chinese: { 1: 32, 2: 32 }
};

for (const subjId of Object.keys(EXPECTED)) {
  BANK.setActive(subjId);
  const subj = BANK.active();
  section("counts:" + subjId);
  assert(BANK.categories().length === 7, subjId + " カテゴリは7つ");
  let expectedTotal = 0;
  for (const [vol, count] of Object.entries(EXPECTED[subjId])) {
    expectedTotal += count;
    const v = BANK.vols()[vol];
    assert(v, `${subjId} Vol.${vol} が存在する`);
    if (v) assert(v.questions.length === count,
      `${subjId} Vol.${vol} は${count}問（実際: ${v.questions.length}）`);
  }
  assert(BANK.allQuestions().length === expectedTotal,
    `${subjId} 合計${expectedTotal}問（実際: ${BANK.allQuestions().length}）`);

  // ---- 正解位置の偏り ----
  // アプリは選択肢をシャッフルしないため、正解位置が偏っていると内容を理解しなくても
  // 位置で当てられてしまい練習にならない。均すには tools/rebalance-answers.js を使う。
  // 例外: TOEIC Vol.1〜6 は市販教材の原本から起こしたセットで、選択肢の並びは原本どおり。
  // 解説に「原本の【正解修正】により (B) が正しい」等、原本の記号を参照する注記があるため
  // 並べ替えられない（偏りが残っていることを承知のうえで対象外にしている）。
  const SKEW_EXEMPT = { toeic: [1, 2, 3, 4, 5, 6], french: [], chinese: [] };
  section("answer-balance:" + subjId);
  for (const [vol, v] of Object.entries(BANK.vols())) {
    if (SKEW_EXEMPT[subjId].includes(Number(vol))) continue;
    const dist = [0, 0, 0, 0];
    v.questions.forEach(q => dist[q.answer]++);
    const min = Math.min(...dist) / v.questions.length;
    assert(min >= 0.15,
      `${subjId} Vol.${vol}: 正解位置の偏りが許容内（分布 ${dist.join("/")}、最小 ${Math.round(min * 100)}% ≥ 15%）`);
  }

  section("integrity:" + subjId);
  const re = new RegExp("^" + subj.idPrefix + "\\d+-q\\d+$");
  for (const q of BANK.allQuestions()) {
    assert(re.test(q.id), `${q.id}: ID形式が正しい`);
    assert(q.choices.length === 4, `${q.id}: 選択肢が4つ`);
    assert(Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 3, `${q.id}: answer が 0〜3`);
    assert(q.explanation && q.explanation.length >= 5, `${q.id}: 解説がある`);
    assert(BANK.categories().includes(q.category), `${q.id}: カテゴリが規定の7種 (${q.category})`);
    assert([5, 6, 7].includes(q.part), `${q.id}: part が 5/6/7`);
    if (q.part === 5) assert(q.passageId === null, `${q.id}: part5 は passageId null`);
    else assert(BANK.getPassage(q.passageId), `${q.id}: 文書 ${q.passageId} が存在する`);
    assert(BANK.getQuestion(q.id) === q, `${q.id}: getQuestion で引ける`);
  }
}
// ---- フランス語の訳（結果詳細で表示する日本語訳・英語訳） ----
// part5/6 は空欄を埋めた正解文 fr を持ち、正解の選択肢を含む。part7 は設問の訳＋全選択肢の訳。
// choiceTranslations は選択肢の文字列をキーにする（rebalance-answers.js で並べ替えても対応が崩れない）。
BANK.setActive("french");
section("translation:french");
for (const q of BANK.allQuestions()) {
  const tr = q.translation;
  assert(tr && tr.ja && tr.en, `${q.id}: 日本語訳・英語訳がある`);
  if (!tr) continue;
  if (q.part === 7) {
    assert(!tr.fr, `${q.id}: part7 は正解文 fr を持たない`);
    const ct = q.choiceTranslations || {};
    q.choices.forEach(c => assert(ct[c] && ct[c].ja && ct[c].en, `${q.id}: 選択肢「${c}」の訳がある`));
    Object.keys(ct).forEach(k => assert(q.choices.includes(k), `${q.id}: 訳のキー「${k}」が選択肢にある`));
  } else {
    assert(tr.fr, `${q.id}: 正解文 fr がある`);
    if (tr.fr) assert(tr.fr.toLowerCase().includes(q.choices[q.answer].toLowerCase()),
      `${q.id}: 正解文に正解「${q.choices[q.answer]}」が入っている`);
  }
}
for (const v of Object.values(BANK.vols())) {
  v.passages.forEach(p => assert(p.translation && p.translation.ja && p.translation.en,
    `${p.id}: 本文の日本語訳・英語訳がある`));
}

// ---- 中国語の訳と読み ----
// part5/6 は正解文 full とピンイン py を持ち、正解の選択肢を含む。part7 は設問の読み・訳＋全選択肢の訳。本文は ja/en/py。
BANK.setActive("chinese");
section("translation:chinese");
for (const q of BANK.allQuestions()) {
  const tr = q.translation;
  assert(tr && tr.ja && tr.en && tr.py, `${q.id}: 日本語訳・英語訳・ピンインがある`);
  if (!tr) continue;
  assert(!/[a-z]/i.test(q.question.replace(/---\[Q\d+\]---/, "")) || q.part === 6, `${q.id}: 問題文に英字が混じっていない`);
  if (q.part === 7) {
    const ct = q.choiceTranslations || {};
    q.choices.forEach(c => assert(ct[c] && ct[c].ja && ct[c].en, `${q.id}: 選択肢「${c}」の訳がある`));
  } else {
    assert(tr.full && tr.full.includes(q.choices[q.answer]), `${q.id}: 正解文に正解「${q.choices[q.answer]}」が入っている`);
    if (q.part === 5) assert(tr.full === q.question.replace("＿＿＿", q.choices[q.answer]), `${q.id}: 空欄に正解を入れると正解文と一致する`);
  }
}
for (const v of Object.values(BANK.vols())) {
  v.passages.forEach(p => assert(p.translation && p.translation.ja && p.translation.en && p.translation.py,
    `${p.id}: 本文の訳と読みがある`));
}

BANK.setActive("toeic");
const D = BANK; // 以降のロジックテストは toeic をアクティブにして BANK 経由で行う

// ---- quiz.js ----
["js/quiz.js"].forEach(f => { if (fs.existsSync(path.join(root, f))) load(f); });
const Quiz = ctx.Quiz;
section("quiz");
assert(Quiz, "Quiz が定義されている");
if (Quiz && D) {
  assert(Quiz.defaultTimeLimitSec("vol", 32) === 1200, "32問=1200秒");
  assert(Quiz.defaultTimeLimitSec("vol", 30) === 900, "30問=900秒");
  assert(Quiz.defaultTimeLimitSec("review-wrong", 10) === 400, "復習10問=400秒");

  const t0 = 1000000;
  const s = Quiz.createSession({ mode: "vol", volId: 1, timeLimitSec: 1200, now: t0 });
  assert(s.order.length === 32, "Vol.1セッションは32問");
  assert(s.answers["v1-q1"] === null, "初期状態は未回答");

  Quiz.selectAnswer(s, "v1-q3", 0);
  assert(s.answers["v1-q3"] === 0, "回答が記録される");
  Quiz.selectAnswer(s, "v1-q3", 0);
  assert(s.answers["v1-q3"] === null, "同じ選択肢の再タップで解除");
  Quiz.selectAnswer(s, "v1-q3", 2);
  assert(Quiz.answeredCount(s) === 1, "回答数カウント");

  assert(Quiz.remainingSec(s, t0 + 5000) === 1195, "残り時間計算");
  assert(Quiz.isTimeUp(s, t0 + 1200 * 1000) === true, "時間切れ判定");
  assert(Quiz.remainingSec(s, t0 + 9999999) === 0, "残り時間は0未満にならない");

  const rec = Quiz.grade(s, t0 + 60000);
  assert(rec.timeUsedSec === 60, "使用時間");
  assert(rec.answers.length === 32, "全問分の解答レコード");
  const a3 = rec.answers.find(a => a.qid === "v1-q3");
  const q3 = D.getQuestion("v1-q3");
  assert(a3.correct === (q3.answer === 2), "正誤判定が answer と一致");
  const a1 = rec.answers.find(a => a.qid === "v1-q1");
  assert(a1.chosen === null && a1.correct === false, "未回答は不正解扱い");
}

// ---- 1問あたりの時間 ----
section("pace");
if (Quiz && D) {
  const t0 = 5000000;
  const s = Quiz.createSession({ mode: "vol", volId: 1, timeLimitSec: 1200, now: t0 });
  Quiz.view(s, "v1-q1", t0);
  Quiz.view(s, "v1-q2", t0 + 30000);   // Q1 を30秒
  Quiz.view(s, "v1-q1", t0 + 50000);   // Q2 を20秒、Q1 に戻る
  Quiz.view(s, "v1-q1", t0 + 55000);   // 同じ問題の描き直し（答えを選んだ等）は続けて数える
  const rec = Quiz.grade(s, t0 + 60000); // Q1 に戻ってから10秒
  const a1 = rec.answers.find(a => a.qid === "v1-q1"), a2 = rec.answers.find(a => a.qid === "v1-q2");
  assert(a1.timeSec === 40, `Q1 は合計40秒（実際: ${a1.timeSec}）`);
  assert(a2.timeSec === 20, `Q2 は20秒（実際: ${a2.timeSec}）`);
  assert(rec.answers.find(a => a.qid === "v1-q3").timeSec === 0, "開かなかった問題は0秒");
  const pace = Quiz.paceStats(rec);
  assert(pace && pace.targetLabel === "本番ペース", "TOEIC の目安は本番ペース");
  assert(Math.abs(pace.targetSec - 20) < 1e-9, `開いた2問は Part 5 なので目安は20秒（実際: ${pace.targetSec}）`);
  assert(pace.parts.length === 1 && pace.parts[0].part === 5 && pace.parts[0].targetSec === 20 && pace.parts[0].averageSec === 30, "部別の平均と目安");
  assert(pace.averageSec === 30 && pace.seenCount === 2, `平均は開いた問題だけで計算（(40+20)/2=30、実際: ${pace.averageSec}）`);
  assert(pace.slowest[0].qid === "v1-q1" && pace.slowest.length === 2, "時間がかかった順（開かなかった問題は入れない）");

  const s2 = Quiz.createSession({ mode: "vol", volId: 1, timeLimitSec: 600, now: t0 });
  Quiz.view(s2, "v1-q5", t0);
  const rec2 = Quiz.grade(s2, t0 + 900000); // 時間切れの後に採点
  assert(rec2.answers.find(a => a.qid === "v1-q5").timeSec === 600, "制限時間を超えた分は数えない");

  const old = { timeLimitSec: 1200, timeUsedSec: 600, answers: [{ qid: "v1-q1", chosen: 0, correct: true }] };
  assert(Quiz.paceStats(old) === null, "計測の無い古い記録は集計しない（表示しない）");
}

// ---- 制限時間で出題数を変える ----
section("time-scaled");
if (Quiz && D) {
  let seed = 7; const rand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  // TOEIC は本番ペース。Vol.1（Part5 20問・Part6 4問・Part7 8問）は 20×20+37.5×4+61×8=1038秒＝1問約32.4秒
  assert(Quiz.countForTime(1, 10) === 18 && Quiz.countForTime(1, 20) === 37 && Quiz.countForTime(1, 40) === 74,
    `TOEIC Vol.1 は本番ペース: 10分=18問、20分=37問、40分=74問（実際: ${[10,20,40].map(m => Quiz.countForTime(1, m))}）`);
  BANK.setActive("french");
  assert(Quiz.countForTime(1, 20) === 32 && Quiz.countForTime(1, 10) === 16 && Quiz.countForTime(1, 40) === 64,
    "本番ペースの無い教科（フランス語）は 20分=32問の比例");
  BANK.setActive("toeic");
  for (const min of [10, 15, 25, 30, 40]) {
    const ids = Quiz.scaledSet(1, min, rand);
    const want = Quiz.countForTime(1, min);
    assert(new Set(ids).size === ids.length, `${min}分: 重複がない`);
    assert(Math.abs(ids.length - want) <= 2, `${min}分: 出題数が目標 ${want} に近い（実際: ${ids.length}）`);
    const qs = ids.map(id => D.getQuestion(id));
    // 文章の問題は全部そろって出る
    const byP = {};
    qs.filter(q => q.passageId).forEach(q => { byP[q.passageId] = (byP[q.passageId] || 0) + 1; });
    for (const pid of Object.keys(byP)) {
      const all = D.allQuestions().filter(q => q.passageId === pid).length;
      assert(byP[pid] === all, `${min}分: 文章 ${pid} の問題がそろっている`);
    }
    // 並びは 部 → Vol → 番号
    for (let i = 1; i < qs.length; i++) {
      const a = qs[i - 1], b = qs[i];
      assert(a.part < b.part || (a.part === b.part && (a.vol < b.vol || (a.vol === b.vol && a.number < b.number))), `${min}分: 並び順`);
    }
    if (want > 32) assert(D.vols()[1].questions.every(q => ids.includes(q.id)), `${min}分: この Vol の全問を含む`);
    else assert(qs.every(q => q.vol === 1), `${min}分: この Vol の問題だけ`);
    if (min <= 15) {
      const p5 = qs.filter(q => q.part === 5).length;
      assert(p5 > 0 && p5 < qs.length, `${min}分: 文法と読解の両方が入る`);
    }
  }
  load("js/analysis.js"); const An = ctx.Analysis;
  const lbl = An.sessionLabel({ mode: "vol-time", volId: 1, timeLimitSec: 600, answers: new Array(16).fill({}) });
  assert(/10分・16問/.test(lbl), "時間に合わせた回の表示名");
  const sess = [{ date: "2026-11-09T00:00:00Z", mode: "vol", volId: 1, timeLimitSec: 1200, timeUsedSec: 100, answers: [
    { qid: "v1-q1", chosen: 0, correct: true, timeSec: 30 },
    { qid: "v1-q2", chosen: 1, correct: false, timeSec: 50 },
    { qid: "v1-q3", chosen: null, correct: false, timeSec: 0 },
    { qid: "v1-q4", chosen: 1, correct: true } ] }];
  const ts = An.timeStats(sess);
  assert(ts.samples === 2 && ts.correctAvg === 30 && ts.wrongAvg === 50, "時間の傾向: 記録のある問題だけで平均");
  const csv = An.timeCSV(sess, "toeic").trim().split("\n");
  assert(csv.length === 5 && csv[0].startsWith("date,subject,set"), "CSV: 見出し＋1問1行");
  assert(csv[4].endsWith(","), "CSV: 時間の記録が無い問題は time_sec が空");
}

// ---- 10分版（ハーフモード） ----
section("half");
if (Quiz && D) {
  assert(typeof Quiz.halfSets === "function", "Quiz.halfSets が定義されている");
  if (typeof Quiz.halfSets === "function") {
    const hs1 = Quiz.halfSets(1);
    assert(hs1.length === 2, "Vol.1 は2セット");
    assert(hs1[0].key === "grammar" && hs1[0].qids.length === 20, "文法ハーフは20問");
    assert(hs1[0].qids.every(id => D.getQuestion(id).part === 5), "文法ハーフはすべてPart5");
    assert(hs1[1].key === "reading" && hs1[1].qids.length === 12, "読解ハーフは12問");
    assert(hs1[1].qids.every(id => [6, 7].includes(D.getQuestion(id).part)), "読解ハーフはPart6/7のみ");
    const union1 = new Set(hs1[0].qids.concat(hs1[1].qids));
    assert(union1.size === 32, "Vol.1 全32問が重複なくカバーされる");

    const hs4 = Quiz.halfSets(4);
    assert(hs4[0].key === "first" && hs4[0].qids.length === 15, "Vol.4 前半は15問");
    assert(hs4[1].key === "second" && hs4[1].qids.length === 15, "Vol.4 後半は15問");
    const union4 = new Set(hs4[0].qids.concat(hs4[1].qids));
    assert(union4.size === 30, "Vol.4 全30問が重複なくカバーされる");

    const t1 = 2000000;
    const hsSession = Quiz.createSession({
      mode: "half", volId: 1, halfKey: "grammar",
      questionIds: hs1[0].qids, timeLimitSec: 600, now: t1
    });
    assert(hsSession.order.length === 20, "halfセッションは20問");
    assert(hsSession.halfKey === "grammar", "セッションに halfKey が入る");
    const hrec = Quiz.grade(hsSession, t1 + 1000);
    assert(hrec.mode === "half" && hrec.halfKey === "grammar", "採点レコードに halfKey が残る");
  }
}

// ---- analysis.js ----
["js/analysis.js"].forEach(f => { if (fs.existsSync(path.join(root, f))) load(f); });
const Analysis = ctx.Analysis;
section("analysis");
assert(Analysis, "Analysis が定義されている");
if (Analysis && D) {
  // 擬似セッション: v1-q1 正解, v1-q2 誤答 → 後のセッションで v1-q2 正解
  const s1 = { id: "a", date: "2026-07-01T00:00:00Z", mode: "vol", volId: 1,
    answers: [{ qid: "v1-q1", chosen: 0, correct: true },
              { qid: "v1-q2", chosen: 0, correct: false },
              { qid: "v1-q3", chosen: 3, correct: false }] };
  const s2 = { id: "b", date: "2026-07-02T00:00:00Z", mode: "vol", volId: 1,
    answers: [{ qid: "v1-q2", chosen: 1, correct: true }] };

  const cs = Analysis.categoryStats([s1, s2]);
  assert(cs.length === 7, "カテゴリ統計は7件");
  const total = cs.reduce((n, c) => n + c.attempts, 0);
  assert(total === 4, "試行合計4（実際: " + total + "）");

  const ps = Analysis.partStats([s1, s2]);
  assert(ps.length === 3, "Part統計は3件");
  assert(ps[0].part === 5 && ps[0].attempts === 4, "Part5 に4試行");

  const wrong = Analysis.wrongQuestionIds([s1, s2]);
  assert(wrong.includes("v1-q3"), "v1-q3 は誤答のまま");
  assert(!wrong.includes("v1-q2"), "v1-q2 は最新で正解済みなので含まない");
  assert(!wrong.includes("v1-q1"), "v1-q1 は正解なので含まない");

  const sums = Analysis.sessionSummaries([s1, s2]);
  assert(sums[0].id === "b", "新しい順");
  assert(sums[1].score === 1 && sums[1].total === 3, "スコア集計");
  assert(typeof sums[0].label === "string" && sums[0].label.length > 0, "ラベルがある");

  const weakest = Analysis.weakestCategories([s1, s2], 1);
  assert(weakest.length >= 1 && weakest[0].rate <= (weakest[1] ? weakest[1].rate : 1),
    "苦手カテゴリは正答率昇順");

  const rv = Analysis.buildReviewSet([s1, s2], { source: "wrong", count: 10 });
  assert(rv.length === 1 && rv[0] === "v1-q3", "誤答復習セット");
  const rc = Analysis.buildReviewSet([], { source: "category", category: "読解", count: 5 });
  assert(rc.length === 5, "カテゴリ復習は5問抽出");
  rc.forEach(qid => assert(D.getQuestion(qid).category === "読解", "抽出問題のカテゴリ一致"));
  const rall = Analysis.buildReviewSet([], { source: "category", category: "読解", count: "all" });
  const allReading = D.allQuestions().filter(q => q.category === "読解").length;
  assert(rall.length === allReading, "all は全件");

  // 10分版のラベル
  assert(Analysis.sessionLabel({ mode: "half", volId: 1, halfKey: "grammar" }) === "Vol.1 文法10分",
    "文法ハーフのラベル");
  assert(Analysis.sessionLabel({ mode: "half", volId: 4, halfKey: "second" }) === "Vol.4 後半10分",
    "Vol.4 後半のラベル");
}

// ---- Progress: local dates, windows and review ordering ----
load("js/progress.js");
section("progress");
{
  const P = ctx.Progress;
  const lookup = id => id === "gone" ? null : {category:"A",part:5};
  const session = (date, n, correct) => ({date, answers:Array.from({length:n}, (_,i) => ({qid:"q"+i,correct:i<correct,chosen:0,timeSec:i ? 20 : 0}))});
  const date = "2026-11-11T15:30:00.000Z";
  const oldTZ = process.env.TZ;
  process.env.TZ = "Asia/Tokyo";
  assert(P.localDay(date) === "2026-11-12", "UTC 15:30 は日本時間の翌日");
  assert(P.localDay("invalid") === null, "不正な日付を除く");
  assert(P.flatten([],lookup).length === 0, "空の記録");
  const s = session(date,40,10);
  s.answers.push({qid:"gone",correct:true});
  const before = JSON.stringify(s);
  const rows = P.flatten([s],lookup);
  assert(rows.length === 40 && rows[0].timeSec === null, "消えた qid と0秒を除く");
  const legacy = P.flatten([{date,answers:[{qid:"q1",correct:false,chosen:null}]}],lookup);
  assert(legacy[0].timeSec === null && !legacy[0].answered, "古い記録・未回答");
  const win = P.categoryWindows(rows,["A"])[0];
  assert(win.recent.n === 30 && win.prev.n === 10 && win.delta === -1, "40問を30+10へ、差を計算");
  const short = P.categoryWindows(rows.slice(0,25),["A"])[0];
  assert(short.prev.n === 0 && short.delta === null, "25問は前区間なし");
  assert(P.weakest(P.categoryWindows(rows.slice(0,9),["A"])).length === 0, "10問未満を判定しない");
  const changed = [{qid:"x",correct:false},{qid:"y",correct:true},{qid:"x",correct:true},{qid:"y",correct:false}];
  assert(JSON.stringify(P.stillWrong(changed)) === '["y"]', "最新正誤で復習対象を決める");
  const coverage = P.coverage(changed,10);
  assert(coverage.solid === 1 && coverage.seen === 2 && coverage.total === 10, "網羅率は重複せず最新正誤");
  const series = P.sessionSeries([session("2026-11-10",5,5),session("2026-11-11",10,0),session("2026-11-12",5,5),session("2026-11-13",4,4)]);
  assert(series.length === 3 && series[0].roll === null && series[1].roll === null && series[2].roll === .5, "5問未満除外・3回から問題数で加重平均");
  assert(P.sessionSeries([s])[0].roll === null, "1回の平均は非表示");
  const period = P.periodStats(P.flatten([{date:"2026-11-05T14:59:59Z",answers:s.answers},{date:"2026-11-05T15:00:00Z",answers:s.answers}],lookup), new Date("2026-11-12T01:00:00Z").getTime());
  assert(period.cur.n === 40 && period.prev.n === 40 && period.cur.days === 1, "7日の境界は現地0時");
  const cal = P.calendar({"2026-11-12":30},Date.parse(date));
  assert(cal.length === 12 && cal.every(c => c.length === 7) && new Date(cal[0][0].ms).getDay() === 1, "12週・月曜始まり");
  assert(cal.flat().filter(d => d.today).length === 1 && cal.flat().find(d => d.today).n === 30, "今日の数");
  assert(JSON.stringify([0,1,19,20,39,40,79,80].map(P.level)) === '[0,1,1,2,2,3,3,4]', "カレンダーの境界");
  assert(P.paceByPart(rows,[5],10)[0].sec === 20, "Partの直近平均");
  assert(P.paceByPart([{part:5,timeSec:99},{part:5,timeSec:null}],[5],1)[0].sec === null, "時間欠損でも直近問数の窓を伸ばさない");
  assert(P.skillRecent([{date,correct:1,total:2},{date,correct:9,total:10}],3).rate === 10/12, "スキルも問題数で加重平均");
  assert(P.skillRecent([],3).rate === null, "スキル記録なしは0%でなく未計測");
  assert(JSON.stringify(s) === before, "入力を変更しない");
  process.env.TZ = "America/New_York";
  const dst = P.calendar({},Date.parse("2026-11-03T12:00:00Z"),2).flat();
  assert(dst.every(d => new Date(d.ms).getHours() === 0) && new Set(dst.map(d => d.day)).size === 14, "夏時間終了をまたいでも現地0時・重複なし");
  if (oldTZ === undefined) delete process.env.TZ; else process.env.TZ = oldTZ;
  BANK.setActive("toeic");
  const qs = BANK.allQuestions().filter(q => q.category === "読解");
  const ss = [{date:"2026-11-10",answers:[{qid:qs[0].id,correct:false},{qid:qs[1].id,correct:true}]},{date:"2026-11-11",answers:[{qid:qs[0].id,correct:true},{qid:qs[2].id,correct:false}]}];
  const ordered = Analysis.buildReviewSet(ss,{source:"category",category:"読解",count:"all",prefer:"weak"});
  assert(ordered[0] === qs[2].id && ordered[1] === qs[3].id && ordered.at(-2) === qs[1].id && ordered.at(-1) === qs[0].id, "誤答→未回答→古い正解の順");
  const shuffle = Analysis._shuffle; let shuffled = false;
  Analysis._shuffle = a => {shuffled=true; return a;};
  Analysis.buildReviewSet(ss,{source:"category",category:"読解",count:10});
  assert(shuffled, "従来呼出しはシャッフルのまま");
  Analysis._shuffle = shuffle;
}

// ---- storage.js ----
["js/storage.js"].forEach(f => { if (fs.existsSync(path.join(root, f))) load(f); });
const Storage2 = ctx.Storage2;
section("storage");
assert(Storage2, "Storage2 が定義されている");
if (Storage2) {
  // フェイクバックエンド
  const mem = {};
  Storage2._backend = {
    getItem: k => (k in mem ? mem[k] : null),
    setItem: (k, v) => { mem[k] = String(v); },
    removeItem: k => { delete mem[k]; }
  };
  assert(Storage2.available() === true, "available");
  assert(Storage2.load().sessions.length === 0, "初期状態は空");

  Storage2.addSession({ id: "x", date: "2026-07-03T00:00:00Z", answers: [] });
  assert(Storage2.load().sessions.length === 1, "セッション追加");

  const json = Storage2.exportJSON();
  assert(JSON.parse(json).sessions.length === 1, "書き出し");

  assert(Storage2.importJSON("{oops").ok === false, "壊れたJSONは拒否");
  assert(Storage2.importJSON('{"version":99,"sessions":[]}').ok === false, "バージョン不一致は拒否");
  assert(Storage2.load().sessions.length === 1, "拒否時は既存データ保持");
  assert(Storage2.importJSON(json).ok === true, "正常JSONは受理");

  const exported = JSON.parse(Storage2.exportJSON());
  assert(exported.subject === "toeic", "書き出しに教科スタンプが付く");
  const foreign = JSON.stringify({ version: 1, subject: "french", sessions: [] });
  assert(Storage2.importJSON(foreign).ok === false, "別教科データは拒否");

  mem[Storage2.key()] = "{broken";
  assert(Storage2.load().sessions.length === 0, "破損データはデフォルトに戻す");

  Storage2._backend = null;
  assert(Storage2.available() === false, "backend なしで available false");
  assert(Storage2.load().sessions.length === 0, "backend なしでもデフォルトを返す");
}

// ---- dictation.js ----
["js/dictation.js"].forEach(f => { if (fs.existsSync(path.join(root, f))) load(f); });
const Dict = ctx.Dictation;
section("dictation-logic");
assert(Dict, "Dictation が定義されている");
if (Dict) {
  assert(Dict.normalize("Café!") === "cafe", "normalize がアクサン・句読点・大小を除去");
  assert(Dict.normalize("  Don't  ") === "dont", "normalize が空白と句読点を除去");
  assert(Dict.levenshtein("meeting", "meating") === 1, "編集距離1");

  assert(Dict.wordMatch("meeting", "meeting") === "exact", "完全一致=exact");
  assert(Dict.wordMatch("café", "cafe") === "close", "アクサン違い=close");
  assert(Dict.wordMatch("meeting", "meating") === "close", "1文字ミス=close");
  assert(Dict.wordMatch("dog", "elephant") === "wrong", "無関係=wrong");
  assert(Dict.wordMatch("cat", "car") === "close", "3文字1ミス=close");
  assert(Dict.wordMatch("cat", "dog") === "wrong", "3文字2ミス以上=wrong");

  const item = { id: "t1", text: "The meeting starts at nine.", blanks: [1, 4] };
  const gb = Dict.gradeBlanks(item, { 1: "meeting", 4: "nine" });
  assert(gb.correct === 2 && gb.total === 2 && gb.rate === 1, "空欄全正解");
  const gb2 = Dict.gradeBlanks(item, { 1: "meating", 4: "five" });
  assert(gb2.correct === 1, "空欄: closeは正解, 無関係は不正解");
  assert(gb2.missedWords.length === 1 && gb2.missedWords[0] === "nine.", "空欄の落とし語");

  const gs = Dict.gradeSentence("the cat is black", "the cat is black");
  assert(gs.score === 1, "全文一致 score 1");
  const gs2 = Dict.gradeSentence("the cat is black", "the dog is black");
  assert(gs2.score === 0.75, "1語誤り score 0.75");
  assert(gs2.missedWords.indexOf("cat") >= 0, "誤り語 cat が落とし語");
  const gs3 = Dict.gradeSentence("the cat is black", "the cat black");
  assert(gs3.targetTokens.filter(t => t.status !== "missed").length === 3, "抜けても3語は一致");
  assert(gs3.missedWords.indexOf("is") >= 0, "抜けた is が落とし語");
}

// ---- dictation data ----
["js/data/dictation/index.js", "js/data/dictation/en.js", "js/data/dictation/fr.js", "js/data/dictation/zh.js"]
  .forEach(f => { if (fs.existsSync(path.join(root, f))) load(f); });
const DICT = ctx.DICT;
section("dictation-data");
assert(DICT, "DICT が定義されている");
// ---- 漢字（中国語）の採点。英仏の採点結果は変えない ----
section("dictation-han");
if (Dict) {
  assert(Dict.normalize("Café !") === "cafe", "英仏の正規化は従来どおり");
  assert(Dict.normalize("我們，好！") === "我們好", "漢字は残り、句読点は消える");
  assert(Dict.plain("我 想 喝 咖啡 。") === "我想喝咖啡。", "表示・読み上げ用に語の間の空白を詰める");
  assert(Dict.plain("Il y a trois enfants.") === "Il y a trois enfants.", "英仏の文は空白を詰めない");
  assert(Dict.sep("咖啡") === "" && Dict.sep("café") === " ", "語のつなぎは漢字なら空白なし");
  assert(Dict.wordMatch("咖啡", "咖啡") === "exact", "漢字の完全一致");
  assert(Dict.wordMatch("咖啡", "咖非") === "wrong", "漢字は1字違いを正解にしない");
  assert(Dict.wordMatch("bonjour", "bonjur") === "close", "英仏の軽いタイプミスは従来どおり許す");
  const gb = Dict.gradeBlanks({ text: "我 想 喝 咖啡 。", blanks: [2, 3] }, { 2: "喝", 3: "咖啡" });
  assert(gb.correct === 2 && gb.rate === 1, "中国語の空欄（語単位）を採点できる");
  const gs = Dict.gradeSentence("我 想 喝 咖啡 。", "我想喝咖非");
  assert(gs.targetTokens.length === 5, "中国語の全文入力は1文字ずつ採点する（5字）");
  assert(Math.abs(gs.score - 0.8) < 1e-9 && gs.missedWords[0] === "啡", "1字違いだけが取りこぼしになる");
  const gsFr = Dict.gradeSentence("Il y a trois enfants.", "il y a trois enfant");
  assert(gsFr.targetTokens.length === 5 && gsFr.score === 1, "英仏の全文採点は語単位のまま");
}

const DICT_EXPECT = { toeic: 20, french: 20, chinese: 20 };
if (DICT && Dict) {
  for (const subjId of Object.keys(DICT_EXPECT)) {
    const subj = DICT[subjId];
    assert(subj, `${subjId} が存在する`);
    if (!subj) continue;
    assert(subj.lang && subj.storageKey, `${subjId} に lang/storageKey`);
    assert(subj.categories.length === 6, `${subjId} カテゴリ6つ`);
    const items = DICT.allItems(subjId);
    assert(items.length === DICT_EXPECT[subjId], `${subjId} は${DICT_EXPECT[subjId]}文（実際: ${items.length}）`);
    for (const it of items) {
      assert(it.id && it.text && it.translation, `${it.id}: text/translation がある`);
      assert(Array.isArray(it.blanks) && it.blanks.length >= 1, `${it.id}: blanks が1つ以上`);
      const wc = Dict.tokenize(it.text).length;
      assert(it.blanks.every(b => b >= 0 && b < wc), `${it.id}: blank index が語数内`);
      const toks = Dict.tokenize(it.text);
      it.blanks.forEach(b => assert(Dict.normalize(toks[b] || "").length > 0,
        `${it.id}: 空欄 ${b}（${toks[b]}）が句読点だけの語ではない`));
      assert(subj.categories.indexOf(it.category) >= 0, `${it.id}: category が規定内 (${it.category})`);
    }
  }
}

// ---- dictation 集計 ----
section("dictation-stats");
if (Dict && DICT) {
  const cat0 = DICT.toeic.categories[0], cat1 = DICT.toeic.categories[1];
  const results = [
    { items: [ { category: cat0, correct: true, missedWords: [] },
               { category: cat0, correct: false, missedWords: ["nine"] },
               { category: cat1, correct: true, missedWords: [] } ] },
    { items: [ { category: cat0, correct: false, missedWords: ["nine", "five"] } ] }
  ];
  const cs = Dict.categoryStats(results, "toeic");
  assert(cs.length === 6, "カテゴリ統計は6件");
  const c0 = cs.find(c => c.category === cat0);
  assert(c0.attempts === 3 && c0.correct === 1, "cat0 集計");
  const c1 = cs.find(c => c.category === cat1);
  assert(c1.attempts === 1 && c1.correct === 1 && c1.rate === 1, "cat1 集計");
  const cEmpty = cs.find(c => c.attempts === 0);
  assert(cEmpty && cEmpty.rate === null, "未挑戦カテゴリは rate null");

  const tw = Dict.troubleWords(results, 20);
  assert(tw[0].word === "nine" && tw[0].count === 2, "つまずいた語の頻度降順");
  assert(tw.length === 2, "つまずいた語は2種");
}

// ---- listening.js（採点ロジック） ----
["js/listening.js"].forEach(f => { if (fs.existsSync(path.join(root, f))) load(f); });
const Lis = ctx.Listening;
section("listening-logic");
assert(Lis, "Listening が定義されている");
if (Lis) {
  const qs = [
    { id: "l1-p1-q1", answer: 0, category: "応答選択" },
    { id: "l1-p2-q1", answer: 2, category: "目的・概要" },
    { id: "l1-p2-q2", answer: 1, category: "詳細" }
  ];
  const g = Lis.gradeQuestions(qs, { "l1-p1-q1": 0, "l1-p2-q1": 2, "l1-p2-q2": 3 });
  assert(g.total === 3 && g.correct === 2, "3問中2問正解");
  assert(g.rate === 2 / 3, "rate 集計");
  assert(g.results.find(r => r.questionId === "l1-p2-q2").correct === false, "誤答判定");
  const g2 = Lis.gradeQuestions(qs, { "l1-p1-q1": null });
  assert(g2.correct === 0, "未回答は不正解");
}

// ---- listening data ----
["js/data/listening/index.js", "js/data/listening/en.js", "js/data/listening/fr.js", "js/data/listening/zh.js"]
  .forEach(f => { if (fs.existsSync(path.join(root, f))) load(f); });
const LISTEN = ctx.LISTEN;
section("listening-data");
assert(LISTEN, "LISTEN が定義されている");
const LIS_EXPECT = { toeic: 18, french: 18, chinese: 18 };
const LIS_CATS = ["応答選択", "目的・概要", "詳細", "言い換え・推測", "次の行動・依頼", "話し手・場面"];
if (LISTEN) {
  for (const subjId of Object.keys(LIS_EXPECT)) {
    const subj = LISTEN[subjId];
    assert(subj, `${subjId} が存在する`);
    if (!subj) continue;
    assert(subj.lang && subj.storageKey, `${subjId} に lang/storageKey`);
    assert(subj.categories.length === 6, `${subjId} カテゴリ6つ`);
    subj.categories.forEach(c => assert(LIS_CATS.indexOf(c) >= 0, `${subjId} カテゴリ名 ${c} が規定内`));
    const passages = LISTEN.passages(subjId);
    const questions = LISTEN.questions(subjId);
    assert(questions.length === LIS_EXPECT[subjId], `${subjId} は${LIS_EXPECT[subjId]}問（実際: ${questions.length}）`);
    for (const p of passages) {
      assert(["qa", "conversation", "talk"].indexOf(p.type) >= 0, `${p.id}: type が規定内 (${p.type})`);
      assert(Array.isArray(p.lines) && p.lines.length >= 1, `${p.id}: lines が1つ以上`);
      p.lines.forEach(ln => assert(ln.speaker !== undefined && ln.text, `${p.id}: line に speaker/text`));
      assert(Array.isArray(p.questions) && p.questions.length >= 1, `${p.id}: questions が1つ以上`);
      if (p.type === "qa") assert(p.questions.length === 1, `${p.id}: qa は設問1つ`);
      p.questions.forEach(function (q) {
        assert(/^l\d+-p\d+-q\d+$/.test(q.id), `${q.id}: 設問ID形式`);
        var expectChoices = p.type === "qa" ? 3 : 4;
        assert(q.choices.length === expectChoices, `${q.id}: 選択肢が${expectChoices}つ`);
        assert(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < expectChoices, `${q.id}: answer 範囲内`);
        assert(subj.categories.indexOf(q.category) >= 0, `${q.id}: category 規定内 (${q.category})`);
        assert(q.q !== undefined, `${q.id}: 設問文 q がある`);
      });
    }
  }
}

// ---- reminder.js ----
["js/reminder.js"].forEach(f => { if (fs.existsSync(path.join(root, f))) load(f); });
const Reminder = ctx.Reminder;
section("reminder-ics");
assert(Reminder, "Reminder が定義されている");
if (Reminder) {
  const ics = Reminder.buildICS({
    days: ["FR", "MO", "WE"], time: "20:30", duration: 15
  }, {
    now: new Date(2026, 7, 10, 10, 0, 0).getTime(), uid: "fixed-test-uid"
  });
  assert(ics.indexOf("BEGIN:VCALENDAR\r\n") === 0, "BEGIN:VCALENDAR で始まる");
  assert(ics.trim().endsWith("END:VCALENDAR"), "END:VCALENDAR で終わる");
  assert(ics.includes("RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR\r\n"), "BYDAY が月〜日の順序と記法になる");
  assert(ics.includes("DTSTART:20260810T203000\r\n"), "DTSTART に指定時刻が入る");
  assert(!/DTSTART:[^\r\n]*Z/.test(ics), "DTSTART は Z なしのフローティング時刻");
  assert(ics.includes("DTEND:20260810T204500\r\n"), "DTEND は想定時間後になる");
  assert(ics.includes("\r\n") && ics.replace(/\r\n/g, "").indexOf("\n") < 0, "改行はすべて CRLF");
  assert(ics.includes("BEGIN:VALARM\r\nTRIGGER:PT0M\r\nACTION:DISPLAY\r\nDESCRIPTION:英仏練習の時間です\r\nEND:VALARM"),
    "VALARM ブロックを含む");
  assert(ics.includes("SUMMARY:英仏練習") && ics.includes("DESCRIPTION:TOEIC・フランス語の練習。"),
    "日本語の SUMMARY と DESCRIPTION が壊れない");

  section("reminder-streak");
  assert(Reminder.streak(["2026-08-08", "2026-08-07", "2026-08-06"], "2026-08-08") === 3,
    "今日やった連続日数");
  assert(Reminder.streak(["2026-08-07", "2026-08-06", "2026-08-05"], "2026-08-08") === 3,
    "今日未実施でも昨日までの連続を数える");
  assert(Reminder.streak(["2026-08-06", "2026-08-05"], "2026-08-08") === 0,
    "2日空いたら0日");
  assert(Reminder.streak([], "2026-08-08") === 0, "空配列は0日");
  assert(Reminder.streak(["2026-08-08", "2026-08-08", "2026-08-07"], "2026-08-08") === 2,
    "重複日付を二重に数えない");
}

// ---- PWA ----
section("pwa-manifest");
let manifest = null;
try {
  manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
} catch (error) {
  assert(false, "manifest.json が妥当な JSON である");
}
if (manifest) {
  assert(Array.isArray(manifest.icons) && manifest.icons.length > 0, "manifest に icons がある");
  if (Array.isArray(manifest.icons)) {
    manifest.icons.forEach(icon => {
      assert(icon.src && fs.existsSync(path.join(root, icon.src)), `${icon.src}: アイコンが存在する`);
    });
  }
}

section("pwa-assets");
const swPath = path.join(root, "sw.js");
const swBefore = fs.existsSync(swPath) ? fs.readFileSync(swPath, "utf8") : null;
try {
  require("child_process").execFileSync(process.execPath, [path.join(root, "tools/build-sw.js")]);
} catch (error) {
  assert(false, "tools/build-sw.js を実行できる");
}
const swAfter = fs.existsSync(swPath) ? fs.readFileSync(swPath, "utf8") : null;
assert(swBefore !== null && swBefore === swAfter, "sw.js が build-sw.js の生成内容と一致する");

if (swAfter) {
  const match = swAfter.match(/const ASSETS = (\[[\s\S]*?\]);/);
  assert(match, "sw.js に ASSETS がある");
  if (match) {
    let assets = [];
    try {
      assets = JSON.parse(match[1]);
    } catch (error) {
      assert(false, "sw.js の ASSETS が妥当な配列である");
    }

    const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
    const refs = [];
    const refPattern = /<(?:script\b[^>]*\bsrc|link\b[^>]*\bhref)=["']([^"']+)["']/gi;
    let refMatch;
    while ((refMatch = refPattern.exec(html)) !== null) refs.push(refMatch[1]);
    refs.forEach(ref => assert(assets.includes(ref), `${ref}: index.html の参照が ASSETS に含まれる`));
  }
}

console.log(assertions + " assertions");
console.log(failures === 0 ? "ALL TESTS PASSED" : `${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
