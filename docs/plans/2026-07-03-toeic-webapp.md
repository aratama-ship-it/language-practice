# TOEIC Reading 練習ウェブアプリ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 既存のTOEIC教材txt（6冊・190問）を、ボタン選択式・セット全体タイマー・解説表示・成績蓄積と弱点解析付きの静的ウェブアプリにする。

**Architecture:** ビルド不要の静的SPA。`index.html` が全スクリプトを `<script>` タグで読み込み（file:// で動くよう ES modules 不使用）。ロジック（quiz/analysis/storage）とUI（app.js）を分離し、ロジックは Node の `vm` で読み込んでテストする。問題データは `js/data/` 配下にVolごとのファイルとして格納。

**Tech Stack:** Vanilla HTML/CSS/JS。テストは `node tests/run-tests.js`（npm依存なし）。

**Spec:** `../2026-07-03-toeic-webapp-design.md`（同リポジトリ内。データ形式・画面仕様の正）

## Global Constraints

- 配置先: `apps/language-app/toeic-webapp/`（以下、パスはここからの相対）
- **gitリポジトリではない**（iCloudフォルダ）。コミットステップの代わりに各タスク末尾で `node tests/run-tests.js` を実行して全テスト green を確認する
- ES modules・fetch・npm依存・ビルドツール禁止（file:// で動作すること）
- UIの文言はすべて日本語
- カテゴリは次の7つの文字列に固定: `前置詞・慣用表現` `動詞の形・時制` `品詞判断` `構文・接続詞` `語彙` `文脈把握` `読解`
- 問題ID形式: `v{vol}-q{番号}`（例 `v1-q3`）、文書ID形式: `v{vol}-p{連番}`（例 `v1-p1`）
- localStorage キー: `toeic-app-data`、データバージョン: `1`
- 制限時間デフォルト: Volセット＝32問なら1200秒、Vol.4（30問）なら900秒。復習モード＝問題数×40秒
- 変換元教材: `../TOEIC_Practice/*.txt`（Vol.1〜4は解答解説あり、**Vol.5・6は解答なし→新規作成**）

## スクリプト読み込み順（index.html で固定）

```html
<script src="js/data/index.js"></script>
<script src="js/data/vol1.js"></script>
<script src="js/data/vol2.js"></script>
<script src="js/data/vol3.js"></script>
<script src="js/data/vol4.js"></script>
<script src="js/data/vol5.js"></script>
<script src="js/data/vol6.js"></script>
<script src="js/storage.js"></script>
<script src="js/quiz.js"></script>
<script src="js/analysis.js"></script>
<script src="js/app.js"></script>
```

## カテゴリ付与ルール（データ変換タスク共通）

原本の解説文の内容から判断して付与する:

- Part 7 の設問 → `読解`
- Part 6 の「文挿入」問題（選択肢が完全な文のもの） → `文脈把握`
- 前置詞の選択・慣用句（take effect / at least / in response to / as scheduled 等） → `前置詞・慣用表現`
- 時制・受動態・不定詞/動名詞・主述一致・使役（let/make）など動詞の形 → `動詞の形・時制`
- 同語幹の品詞違い（improve/improvement/improving 等）から選ぶ問題 → `品詞判断`
- 接続詞 vs 前置詞（Despite/Although）、関係詞、比較、those who 等の構文 → `構文・接続詞`
- 異なる単語から意味で選ぶ問題（object/objective/objection 等） → `語彙`

判断に迷ったら「その問題を間違えた人が次に何を勉強すべきか」で決める。

---

### Task 1: テストハーネスとデータ基盤（js/data/index.js）

**Files:**
- Create: `tests/run-tests.js`
- Create: `js/data/index.js`

**Interfaces:**
- Produces: グローバル `TOEIC_DATA`
  - `TOEIC_DATA.categories: string[]`（7カテゴリ、Global Constraints の順）
  - `TOEIC_DATA.vols: { [volId: number]: { label: string, questions: Question[], passages: Passage[] } }`
  - `TOEIC_DATA.allQuestions(): Question[]`（vol昇順→number昇順の平坦配列）
  - `TOEIC_DATA.getQuestion(qid): Question|null`
  - `TOEIC_DATA.getPassage(pid): Passage|null`
  - Question: `{ id, vol, part, passageId, number, question, choices, answer, explanation, category }`（choices は4要素、answer は 0〜3）
  - Passage: `{ id, vol, part, title, body }`
- Produces: テストハーネス関数 `assert(cond, msg)`, `section(name)`（run-tests.js 内部）

- [ ] **Step 1: テストハーネスを書く（データ検証込み・現時点では失敗する）**

`tests/run-tests.js`:

```js
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
const DATA_FILES = ["js/data/index.js", "js/data/vol1.js", "js/data/vol2.js",
  "js/data/vol3.js", "js/data/vol4.js", "js/data/vol5.js", "js/data/vol6.js"];
DATA_FILES.forEach(f => {
  if (fs.existsSync(path.join(root, f))) load(f);
});

const D = ctx.TOEIC_DATA;
section("data-base");
assert(D, "TOEIC_DATA が定義されている");
assert(D && D.categories.length === 7, "カテゴリは7つ");

// ---- Vol別の問題数チェック ----
const EXPECTED_COUNTS = { 1: 32, 2: 32, 3: 32, 4: 30, 5: 32, 6: 32 };
section("data-counts");
for (const [vol, count] of Object.entries(EXPECTED_COUNTS)) {
  const v = D && D.vols[vol];
  assert(v, `Vol.${vol} が存在する`);
  if (v) assert(v.questions.length === count,
    `Vol.${vol} は${count}問（実際: ${v.questions.length}）`);
}
if (D) {
  const all = D.allQuestions();
  assert(all.length === 190, `全体で190問（実際: ${all.length}）`);
}

// ---- 各問題の整合性チェック ----
section("data-integrity");
if (D) {
  for (const q of D.allQuestions()) {
    assert(/^v\d+-q\d+$/.test(q.id), `${q.id}: ID形式が正しい`);
    assert(q.choices.length === 4, `${q.id}: 選択肢が4つ`);
    assert(Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 3,
      `${q.id}: answer が 0〜3`);
    assert(q.explanation && q.explanation.length >= 5, `${q.id}: 解説がある`);
    assert(D.categories.includes(q.category), `${q.id}: カテゴリが規定の7種 (${q.category})`);
    assert([5, 6, 7].includes(q.part), `${q.id}: part が 5/6/7`);
    if (q.part === 5) assert(q.passageId === null, `${q.id}: Part5 は passageId null`);
    else assert(D.getPassage(q.passageId), `${q.id}: 文書 ${q.passageId} が存在する`);
    assert(D.getQuestion(q.id) === q, `${q.id}: getQuestion で引ける`);
  }
}

// ---- ロジックモジュールのテスト（後続タスクで追記） ----

console.log(failures === 0 ? "ALL TESTS PASSED" : `${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
```

- [ ] **Step 2: 実行して失敗を確認**

Run: `node tests/run-tests.js`
Expected: `FAIL [data-base] TOEIC_DATA が定義されている` などが出て exit 1

- [ ] **Step 3: js/data/index.js を実装**

```js
// TOEIC 問題データの共通基盤。全 data/volN.js より先に読み込むこと。
var TOEIC_DATA = {
  categories: ["前置詞・慣用表現", "動詞の形・時制", "品詞判断",
    "構文・接続詞", "語彙", "文脈把握", "読解"],
  vols: {},
  allQuestions: function () {
    var out = [];
    var ids = Object.keys(this.vols).map(Number).sort(function (a, b) { return a - b; });
    for (var i = 0; i < ids.length; i++) out = out.concat(this.vols[ids[i]].questions);
    return out;
  },
  getQuestion: function (qid) {
    var all = this.allQuestions();
    for (var i = 0; i < all.length; i++) if (all[i].id === qid) return all[i];
    return null;
  },
  getPassage: function (pid) {
    for (var k in this.vols) {
      var ps = this.vols[k].passages;
      for (var i = 0; i < ps.length; i++) if (ps[i].id === pid) return ps[i];
    }
    return null;
  }
};
```

- [ ] **Step 4: 再実行し、data-base セクションが通ることを確認**

Run: `node tests/run-tests.js`
Expected: `FAIL [data-counts] Vol.1 が存在する` 等のみ残る（data-base の FAIL が消える）。Vol データ未投入なので exit 1 のままで正しい。

### Task 2: Vol.1 データ変換

**Files:**
- Create: `js/data/vol1.js`
- Read: `../TOEIC_Practice/TOEIC_Reading_Practice.txt`（問題: 冒頭〜392行目、解答解説: 393行目〜末尾）

**Interfaces:**
- Consumes: `TOEIC_DATA`（Task 1）
- Produces: `TOEIC_DATA.vols[1] = { label: "Vol.1 総合", questions: [...32問], passages: [...3件] }`

- [ ] **Step 1: 原本を読み、全32問を変換する**

原本の【Q1】〜【Q32】と解答セクション（393行目以降）を突き合わせ、次の形式で `js/data/vol1.js` を作成する。変換例（Q3・実データ）:

```js
TOEIC_DATA.vols[1] = {
  label: "Vol.1 総合",
  passages: [
    {
      id: "v1-p1", vol: 1, part: 6,
      title: "Questions 21-24 refer to the following e-mail.",
      body: "To: All Staff\nFrom: Human Resources Department\nSubject: Updated Vacation Policy\n\nDear Team,\n\n（原本213〜220行の本文を改行を保って全文収録。空所は ---[Q21]--- の表記のまま残す）"
    }
    // v1-p2: Part7 記事（Q25-28）, v1-p3: Part7 広告（Q29-32）
  ],
  questions: [
    {
      id: "v1-q3", vol: 1, part: 5, passageId: null, number: 3,
      question: "The new policy will take ------- on January 1st of next year.",
      choices: ["effect", "affect", "effort", "offer"],
      answer: 0,
      explanation: "take effect = 「発効する・効力を持つ」慣用句。※ affect は動詞「影響を与える」",
      category: "前置詞・慣用表現"
    }
    // ... 全32問
  ]
};
```

変換ルール:
- `answer` は原本解答の (A)〜(D) を 0〜3 に変換
- `explanation` は原本の解説文をそのまま使用（複数行は `\n` 結合または1行に整形）
- `category` は冒頭の「カテゴリ付与ルール」で判定
- Part 6 の設問（Q21〜24）は `passageId: "v1-p1"`、question フィールドは「空所 [Q21] に入るもの」等の短い日本語ラベルではなく **原本どおり選択肢のみの問題は `question: "---[Q21]--- に入る語句を選んでください。"`** とする（文挿入問題 Q24 は `question: "---[Q24]--- に入る文を選んでください。"`）
- Part 7 の設問は原本の英文設問をそのまま `question` に入れる

- [ ] **Step 2: テスト実行**

Run: `node tests/run-tests.js`
Expected: `Vol.1 は32問` を含む data-counts の Vol.1 系 FAIL が消える。Vol.2〜6 の FAIL は残る。

- [ ] **Step 3: 解答キーの照合**

原本の解答セクション（`grep "正解" ../TOEIC_Practice/TOEIC_Reading_Practice.txt`）と `vol1.js` の answer を1問ずつ目視照合し、全32問一致を確認する。

### Task 3: Vol.2・Vol.3 データ変換

**Files:**
- Create: `js/data/vol2.js`, `js/data/vol3.js`
- Read: `../TOEIC_Practice/TOEIC_Reading_Practice_Vol2.txt`, `../TOEIC_Practice/TOEIC_Reading_Practice_Vol3.txt`

**Interfaces:**
- Consumes: `TOEIC_DATA`（Task 1）
- Produces: `TOEIC_DATA.vols[2]`（label: "Vol.2 総合"）、`TOEIC_DATA.vols[3]`（label: "Vol.3 総合"）各32問

- [ ] **Step 1: Vol.2 を Task 2 と同じ手順・同じ形式で変換**（ID は `v2-q1`〜`v2-q32`、`v2-p1`〜）
- [ ] **Step 2: Vol.3 を同様に変換**（`v3-...`）
- [ ] **Step 3: テスト実行**

Run: `node tests/run-tests.js`
Expected: Vol.2・Vol.3 の FAIL が消える

- [ ] **Step 4: 解答キー照合**（両ファイルの「正解」行と突き合わせ、計64問一致を確認）

### Task 4: Vol.4（前置詞特化30問）データ変換

**Files:**
- Create: `js/data/vol4.js`
- Read: `../TOEIC_Practice/TOEIC_Reading_Practice_Vol4_前置詞特化.txt`

**Interfaces:**
- Consumes: `TOEIC_DATA`（Task 1）
- Produces: `TOEIC_DATA.vols[4] = { label: "Vol.4 前置詞特化", questions: [30問全て part: 5, passageId: null], passages: [] }`

- [ ] **Step 1: 30問を変換**（ID は `v4-q1`〜`v4-q30`。カテゴリは大半が `前置詞・慣用表現` になるはずだが、解説を読んで個別判定する）
- [ ] **Step 2: テスト実行**

Run: `node tests/run-tests.js`
Expected: Vol.4 の FAIL が消える

- [ ] **Step 3: 解答キー照合**（30問一致を確認）

### Task 5: Vol.5・Vol.6 データ変換＋解答解説の新規作成

**Files:**
- Create: `js/data/vol5.js`, `js/data/vol6.js`
- Read: `../TOEIC_Practice/TOEIC_Reading_Practice_Vol5.txt`, `../TOEIC_Practice/TOEIC_Reading_Practice_Vol6.txt`

**Interfaces:**
- Consumes: `TOEIC_DATA`（Task 1）
- Produces: `TOEIC_DATA.vols[5]`（label: "Vol.5 総合（中〜中上級）"）、`TOEIC_DATA.vols[6]`（label: "Vol.6 総合"）各32問

**注意: この2冊には原本に解答・解説がない。** 実装者が各問題を解き、正解と日本語解説を書き下ろす。

- [ ] **Step 1: Vol.5 の問題・文書を変換**（形式は Task 2 と同じ。原本は選択肢が1行にまとまっている `(A) xxx  (B) yyy` 形式なので分解する）
- [ ] **Step 2: Vol.5 の全32問を解いて answer と explanation を作成**

解説の品質基準（原本 Vol.1〜3 の解説と同等にする）:
- なぜ正解かを1〜2文で（文法用語＋日本語訳）
- 紛らわしい誤答がある場合は「※ …」で一言補足
- Part 7 は根拠となる本文の該当箇所を引用する（例: `本文：\"opened in 2021\"`）

- [ ] **Step 3: Vol.6 を同様に変換・解答作成**
- [ ] **Step 4: テスト実行**

Run: `node tests/run-tests.js`
Expected: `ALL TESTS PASSED`（190問すべて投入済み・整合性チェック通過）

- [ ] **Step 5: 自己レビュー**

Vol.5・6 の全64問について、書いた answer で本当に文法・文脈が成立するか1問ずつ再確認する（特に Part 7 は本文の根拠箇所を再読する）。

### Task 6: quiz.js（セッション管理・採点・タイマー計算）

**Files:**
- Create: `js/quiz.js`
- Modify: `tests/run-tests.js`（「ロジックモジュールのテスト」の位置に追記）

**Interfaces:**
- Consumes: `TOEIC_DATA`
- Produces: グローバル `Quiz`
  - `Quiz.defaultTimeLimitSec(mode, questionCount)` → vol: 32問=1200 / 30問=900（それ以外は `questionCount * 37` を四捨五入）、review: `questionCount * 40`
  - `Quiz.createSession(opts)` → Session。opts = `{ mode: "vol"|"review-wrong"|"review-category", volId, category, questionIds, timeLimitSec, now }`（mode:"vol" は volId から全問、review系は questionIds を使用。now は ms）
  - Session = `{ mode, volId, category, timeLimitSec, startedAt, order: [qid...], answers: { [qid]: 0|1|2|3|null } }`（answers は全 qid を null で初期化）
  - `Quiz.selectAnswer(session, qid, idx)` → answers を更新（同じ idx を再選択したら選択解除で null）
  - `Quiz.remainingSec(session, now)` → `max(0, timeLimitSec - floor((now - startedAt)/1000))`
  - `Quiz.isTimeUp(session, now)` → boolean
  - `Quiz.answeredCount(session)` → number
  - `Quiz.grade(session, now)` → 保存用レコード `{ id, date, mode, volId, category, timeLimitSec, timeUsedSec, answers: [{qid, chosen, correct}] }`（id は ISO文字列、date は ISO文字列、chosen null は correct false、timeUsedSec は上限 timeLimitSec）
- Node 互換: ファイル末尾に `if (typeof module !== "undefined") module.exports = Quiz;` は**不要**（vm 読み込みのため）

- [ ] **Step 1: テストを追記（失敗確認）**

`tests/run-tests.js` の「ロジックモジュールのテスト」位置に追記:

```js
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
```

Run: `node tests/run-tests.js`
Expected: `FAIL [quiz] Quiz が定義されている` で exit 1

- [ ] **Step 2: js/quiz.js を実装**

```js
var Quiz = {
  defaultTimeLimitSec: function (mode, count) {
    if (mode === "vol") {
      if (count === 32) return 1200;
      if (count === 30) return 900;
      return Math.round(count * 37);
    }
    return count * 40;
  },
  createSession: function (opts) {
    var qids;
    if (opts.mode === "vol") {
      qids = TOEIC_DATA.vols[opts.volId].questions.map(function (q) { return q.id; });
    } else {
      qids = opts.questionIds.slice();
    }
    var answers = {};
    qids.forEach(function (id) { answers[id] = null; });
    return {
      mode: opts.mode, volId: opts.volId || null, category: opts.category || null,
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
      category: session.category, timeLimitSec: session.timeLimitSec, timeUsedSec: used,
      answers: session.order.map(function (qid) {
        var chosen = session.answers[qid];
        var q = TOEIC_DATA.getQuestion(qid);
        return { qid: qid, chosen: chosen, correct: chosen !== null && chosen === q.answer };
      })
    };
  }
};
```

- [ ] **Step 3: テスト実行**

Run: `node tests/run-tests.js`
Expected: `ALL TESTS PASSED`

### Task 7: analysis.js（集計・弱点解析・復習セット生成）

**Files:**
- Create: `js/analysis.js`
- Modify: `tests/run-tests.js`（quiz テストの直後に追記）

**Interfaces:**
- Consumes: `TOEIC_DATA`、セッションレコード（Task 6 の `Quiz.grade` の戻り値の配列）
- Produces: グローバル `Analysis`
  - `Analysis.categoryStats(sessions)` → `[{ category, attempts, correct, rate }]`（7カテゴリ全部。attempts 0 は rate null）
  - `Analysis.partStats(sessions)` → `[{ part: 5|6|7, attempts, correct, rate }]`
  - `Analysis.weakestCategories(sessions, minAttempts)` → attempts >= minAttempts のカテゴリを rate 昇順で返す（デフォルト minAttempts=5）
  - `Analysis.wrongQuestionIds(sessions)` → 「最新の解答が誤答」の qid 配列（全セッションを日付順に走査し、qid ごとの最後の correct が false のもの）
  - `Analysis.sessionSummaries(sessions)` → 新しい順の `[{ id, date, label, score, total, rate }]`（label は "Vol.1 総合" / "弱点復習（間違えた問題）" / "弱点復習（前置詞・慣用表現）"）
  - `Analysis.buildReviewSet(sessions, opts)` → qid 配列。opts = `{ source: "wrong"|"category", category, count }`（source:"wrong" は wrongQuestionIds から、"category" は該当カテゴリ全問からランダム抽出。count 超過分は Fisher–Yates シャッフルで切り詰め。count が "all" なら全件）

- [ ] **Step 1: テストを追記（失敗確認）**

```js
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

  const wrong = Analysis.wrongQuestionIds([s1, s2]);
  assert(wrong.includes("v1-q3"), "v1-q3 は誤答のまま");
  assert(!wrong.includes("v1-q2"), "v1-q2 は最新で正解済みなので含まない");
  assert(!wrong.includes("v1-q1"), "v1-q1 は正解なので含まない");

  const sums = Analysis.sessionSummaries([s1, s2]);
  assert(sums[0].id === "b", "新しい順");
  assert(sums[1].score === 1 && sums[1].total === 3, "スコア集計");

  const rv = Analysis.buildReviewSet([s1, s2], { source: "wrong", count: 10 });
  assert(rv.length === 1 && rv[0] === "v1-q3", "誤答復習セット");
  const rc = Analysis.buildReviewSet([], { source: "category", category: "読解", count: 5 });
  assert(rc.length === 5, "カテゴリ復習は5問抽出");
  rc.forEach(qid => assert(D.getQuestion(qid).category === "読解", "抽出問題のカテゴリ一致"));
  const rall = Analysis.buildReviewSet([], { source: "category", category: "読解", count: "all" });
  const allReading = D.allQuestions().filter(q => q.category === "読解").length;
  assert(rall.length === allReading, "all は全件");
}
```

Run: `node tests/run-tests.js`
Expected: `FAIL [analysis] Analysis が定義されている` で exit 1

- [ ] **Step 2: js/analysis.js を実装**（Interfaces どおり。カテゴリ/Part の紐付けは `TOEIC_DATA.getQuestion(qid)` 経由。rate は `correct/attempts`、attempts 0 なら null。シャッフルは Fisher–Yates）
- [ ] **Step 3: テスト実行**

Run: `node tests/run-tests.js`
Expected: `ALL TESTS PASSED`

### Task 8: storage.js（localStorage・書き出し/読み込み）

**Files:**
- Create: `js/storage.js`
- Modify: `tests/run-tests.js`（analysis テストの直後に追記）

**Interfaces:**
- Consumes: なし（独立モジュール）
- Produces: グローバル `Storage2`（※ブラウザ組み込みの `Storage` と衝突するため `Storage2` とする）
  - `Storage2.KEY = "toeic-app-data"`
  - `Storage2._backend` — 差し替え可能なバックエンド。ブラウザでは `window.localStorage`、未定義環境では null
  - `Storage2.available()` → backend が使えるか（setItem を試して true/false）
  - `Storage2.load()` → `{ version: 1, sessions: [] }`（未保存・破損時はこのデフォルトを返す）
  - `Storage2.addSession(record)` → load → sessions に push → save。保存失敗時は false を返す
  - `Storage2.exportJSON()` → 整形済みJSON文字列
  - `Storage2.importJSON(str)` → `{ ok: true }` か `{ ok: false, error: "メッセージ" }`。検証: JSONとしてパース可能、`version === 1`、`sessions` が配列、各要素に `id/date/answers` があり answers が配列。検証通過時のみ既存データを置き換える

- [ ] **Step 1: テストを追記（失敗確認）**

```js
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

  mem[Storage2.KEY] = "{broken";
  assert(Storage2.load().sessions.length === 0, "破損データはデフォルトに戻す");

  Storage2._backend = null;
  assert(Storage2.available() === false, "backend なしで available false");
  assert(Storage2.load().sessions.length === 0, "backend なしでもデフォルトを返す");
}
```

Run: `node tests/run-tests.js`
Expected: `FAIL [storage] Storage2 が定義されている` で exit 1

- [ ] **Step 2: js/storage.js を実装**（Interfaces どおり。`_backend` の初期化は `typeof window !== "undefined" && window.localStorage` を try/catch で）
- [ ] **Step 3: テスト実行**

Run: `node tests/run-tests.js`
Expected: `ALL TESTS PASSED`

### Task 9: UI基盤＋ホーム画面

**Files:**
- Create: `index.html`, `css/style.css`, `js/app.js`
- Create: `.claude/launch.json`（プロジェクトルート `toeic-webapp/` 直下）

**Interfaces:**
- Consumes: `TOEIC_DATA`, `Quiz`, `Analysis`, `Storage2`
- Produces: 画面切替関数 `App.showScreen(name)`（name: "home"|"test"|"result"|"analysis"）と各画面の描画関数。以降のタスクは `js/app.js` に追記していく

**index.html の骨子:**

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TOEIC Reading 練習</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div id="storage-warning" class="hidden">⚠ この環境ではブラウザ保存が使えません。成績は記録されません。</div>
  <main>
    <section id="screen-home" class="screen"></section>
    <section id="screen-test" class="screen hidden"></section>
    <section id="screen-result" class="screen hidden"></section>
    <section id="screen-analysis" class="screen hidden"></section>
  </main>
  <!-- スクリプト読み込み順は Global Constraints のとおり -->
</body>
</html>
```

**ホーム画面の要素（renderHome() が #screen-home に描画）:**
- 見出し「TOEIC Reading 練習」
- Vol カード×6: label、問題数、受験回数、最高スコア、前回スコア（`Storage2.load().sessions` から集計）、「挑戦する」ボタン
- 挑戦するボタン → 制限時間選択（`<select>`: 10/15/20/25/30/35/40分、デフォルトは `Quiz.defaultTimeLimitSec`）→「開始」でテスト画面へ
- 「弱点復習」ボタン → 復習設定パネル（Task 12 で実装。ここではボタンとパネル枠のみ置き、`hidden`）
- 「成績分析」ボタン → `App.showScreen("analysis")`（Task 12 で実装するまでは空画面で可）
- 「データ書き出し」ボタン → `Storage2.exportJSON()` を Blob にして `toeic-data-YYYY-MM-DD.json` でダウンロード
- 「データ読み込み」`<input type="file">` → 読んで `Storage2.importJSON`。実行前に `confirm("現在の成績データを読み込んだ内容で置き換えます。よろしいですか？")`。失敗時は `alert(結果.error)`
- 起動時 `Storage2.available()` が false なら `#storage-warning` の hidden を外す

**css/style.css:** モバイルでも使える最大幅 720px の中央寄せ。選択肢ボタンは大きめ（縦積み・全幅・padding 12px）。クラス: `.hidden { display: none; }`, `.choice-btn`, `.choice-btn.selected`, `.timer.warning { color: #d32f2f; }`, `.qnav-btn.answered`, `.correct { color: #2e7d32; }`, `.wrong { color: #d32f2f; }`

**.claude/launch.json（ブラウザ検証用）:**

```json
{
  "version": "0.0.1",
  "configurations": [
    { "name": "toeic-webapp", "runtimeExecutable": "python3",
      "runtimeArgs": ["-m", "http.server", "8765", "-d", "."], "port": 8765 }
  ]
}
```

- [ ] **Step 1: index.html / css/style.css / js/app.js（showScreen + renderHome + 書き出し/読み込み）を実装**
- [ ] **Step 2: `node tests/run-tests.js` で回帰がないことを確認**
- [ ] **Step 3: ブラウザ検証** — preview_start でサーバー起動、ホーム画面に6枚のVolカード・各ボタンが表示されることを preview_snapshot で確認。console にエラーがないことを preview_console_logs で確認

### Task 10: テスト画面（出題・タイマー・採点）

**Files:**
- Modify: `js/app.js`, `css/style.css`

**Interfaces:**
- Consumes: `Quiz`, `TOEIC_DATA`, `Storage2`
- Produces: `App.startTest(sessionOpts)`（ホーム/復習設定から呼ぶ）、`App.finishTest()`（採点→保存→結果画面へ）

**画面仕様:**
- ヘッダー: 残り時間 `MM:SS`（250msごとに `Quiz.remainingSec(session, Date.now())` で更新。180秒以下で `.warning` 付与、0で自動 `App.finishTest()`）、進捗「Q5 / 32」、中断ボタン（`confirm("中断すると今回の解答は保存されません。中断しますか？")` → ホームへ）
- 問題番号ナビ: 全問分の小ボタンを横並び（折返し）。回答済みは `.answered`。クリックでその問題へ移動
- 問題表示: Part 6/7 は `TOEIC_DATA.getPassage(q.passageId)` の title と body を `<pre>` 相当（改行保持・等幅でなく読みやすいフォント）で設問の上に表示。同じ文書が連続する間は文書を出し続ける
- 選択肢: (A)〜(D) の縦積みボタン。クリックで `Quiz.selectAnswer` → 選択中に `.selected`。もう一度押すと解除
- 「前へ」「次へ」ボタン（端では disabled）
- 最終問題まで行かなくても押せる「採点する」ボタン: 未回答が1問以上あれば `confirm("未回答が N 問あります。採点しますか？")`
- `App.finishTest()`: タイマー停止 → `Quiz.grade(session, Date.now())` → `Storage2.addSession(record)`（false なら `alert("保存に失敗しました。分析画面から書き出しを行ってください。")`）→ 結果画面へ

- [ ] **Step 1: 実装**
- [ ] **Step 2: `node tests/run-tests.js` で回帰なし確認**
- [ ] **Step 3: ブラウザ検証** — Vol.1 を開始し、(1) 選択肢のトグル、(2) 問題ナビの answered 表示、(3) Part 6 で文書が表示される、(4) 採点ボタン→確認ダイアログ→結果画面遷移、を preview_click / preview_snapshot で確認。タイマーは preview_eval で `session.startedAt` を過去に書き換えて時間切れ自動採点を確認

### Task 11: 結果画面（スコア・解説表示）

**Files:**
- Modify: `js/app.js`, `css/style.css`

**Interfaces:**
- Consumes: Task 10 の採点レコード、`TOEIC_DATA`, `Analysis`
- Produces: `App.showResult(record)`

**画面仕様:**
- 総合: 「24 / 32 問正解（75%）」＋使用時間表示
- Part別・カテゴリ別正答率: `Analysis.partStats([record])` / `Analysis.categoryStats([record])` を横バー（div の width %）で表示。attempts 0 のカテゴリは非表示
- 全問リスト: 1行 = 「Q番号 ○/× 問題文冒頭40字」。クリックで展開し、問題全文（Part 6/7 は文書も）、選択肢4つ（自分の解答に「あなたの解答」バッジ、正解に「正解」バッジ、色分け `.correct`/`.wrong`）、解説文を表示
- 「もう一度挑戦」（同じ設定で `App.startTest`）と「ホームへ」ボタン

- [ ] **Step 1: 実装**
- [ ] **Step 2: `node tests/run-tests.js` で回帰なし確認**
- [ ] **Step 3: ブラウザ検証** — 1セット採点し、○×リストの展開で解説・バッジ・色分けが出ることを確認

### Task 12: 分析画面＋弱点復習モード

**Files:**
- Modify: `js/app.js`, `css/style.css`

**Interfaces:**
- Consumes: `Analysis`, `Storage2`, `Quiz`
- Produces: `App.renderAnalysis()`、ホームの復習設定パネル（Task 9 で置いた枠に実装）

**分析画面の仕様:**
- カテゴリ別正答率: 全セッション集計の横バー＋「12/20問」表記。正答率昇順で並べ、attempts>0 のみ
- 苦手ランキング: `Analysis.weakestCategories(sessions, 5)` の上位3件をカード表示、各カードに「このカテゴリを復習する」ボタン → 復習を10問・カテゴリ指定で即開始
- セッション履歴: `Analysis.sessionSummaries` を新しい順にテーブル表示（日時・内容・スコア・正答率）
- データがない場合は「まだ記録がありません。まずは1セット挑戦しましょう」
- 「ホームへ」ボタン

**復習設定パネル（ホーム画面内）:**
- 出題ソース: ラジオ「間違えた問題から」「カテゴリを選ぶ」（カテゴリは `<select>` 7種）
- 問題数: ラジオ 10問 / 20問 / 全部
- 「開始」→ `Analysis.buildReviewSet(sessions, opts)` → 0問なら `alert("該当する問題がありません")`、あれば `Quiz.defaultTimeLimitSec("review-wrong", n)` で `App.startTest`
- 「間違えた問題から」は誤答プールが count 未満でもある分だけ出題

- [ ] **Step 1: 実装**
- [ ] **Step 2: `node tests/run-tests.js` で回帰なし確認**
- [ ] **Step 3: ブラウザ検証** — セッション記録がある状態で分析画面の各要素、復習モードの開始〜採点までを一巡確認

### Task 13: 総合検証

**Files:** なし（検証のみ）

- [ ] **Step 1: 全テスト実行** — `node tests/run-tests.js` → `ALL TESTS PASSED`
- [ ] **Step 2: ブラウザで通し検証**（preview ツール使用）:
  1. ホーム → Vol.5 開始 → 数問回答 → 採点 → 結果の解説表示（新規作成した解説が出る）
  2. 弱点復習「間違えた問題から」→ 直前の誤答が出題される
  3. 分析画面にカテゴリ別正答率と履歴が出る
  4. データ書き出し → 読み込みで往復できる
  5. preview_resize でモバイル幅(375px)でも崩れない
  6. preview_console_logs でエラーゼロ
- [ ] **Step 3: file:// 動作確認** — `open index.html` で Safari/Chrome から直接開き、ホーム画面が表示されることを確認（ES modules 不使用の確認）
- [ ] **Step 4: 完了報告** — スクリーンショットを添えて、使い方（index.html をダブルクリック）と成績データの注意（ブラウザごとに保存・書き出し推奨）をユーザーに報告
