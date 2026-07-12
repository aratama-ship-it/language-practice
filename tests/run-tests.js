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
let current = "";
function section(name) { current = name; }
function assert(cond, msg) {
  if (!cond) { failures++; console.error(`FAIL [${current}] ${msg}`); }
}

// ---- データ読み込み ----
const DATA_FILES = ["js/subjects.js", "js/data/bank.js",
  "js/data/vol1.js", "js/data/vol2.js", "js/data/vol3.js", "js/data/vol4.js",
  "js/data/vol5.js", "js/data/vol6.js", "js/data/vol7.js",
  "js/data/french/vol1.js", "js/data/french/vol2.js"];
DATA_FILES.forEach(f => {
  if (fs.existsSync(path.join(root, f))) load(f);
});

const BANK = ctx.BANK;
section("bank-base");
assert(BANK, "BANK が定義されている");

// ---- 教科ごとの問題数・整合性チェック ----
// 教科ごとの期待問題数（フランス語は Task 6/7 で追加）
const EXPECTED = {
  toeic: { 1: 32, 2: 32, 3: 32, 4: 30, 5: 32, 6: 32, 7: 32 },
  french: { 1: 32, 2: 32 }
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
["js/data/dictation/index.js", "js/data/dictation/en.js", "js/data/dictation/fr.js"]
  .forEach(f => { if (fs.existsSync(path.join(root, f))) load(f); });
const DICT = ctx.DICT;
section("dictation-data");
assert(DICT, "DICT が定義されている");
const DICT_EXPECT = { toeic: 20, french: 20 };
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
["js/data/listening/index.js", "js/data/listening/en.js", "js/data/listening/fr.js"]
  .forEach(f => { if (fs.existsSync(path.join(root, f))) load(f); });
const LISTEN = ctx.LISTEN;
section("listening-data");
assert(LISTEN, "LISTEN が定義されている");
const LIS_EXPECT = { toeic: 18, french: 18 };
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

console.log(failures === 0 ? "ALL TESTS PASSED" : `${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
