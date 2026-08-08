# 教科切替化＋TOEIC上級セット＋フランス語版 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans（または subagent-driven-development）でタスク単位に実装する。ステップは checkbox（`- [ ]`）で追跡する。

**Goal:** TOEICにVol.7（上級）を追加し、アプリを教科切替式に汎用化して、フランス語（仏検風・初級）を第2教科として追加する。

**Architecture:** 現行の単一教科構造（`TOEIC_DATA` グローバル）を、教科レジストリ `SUBJECTS` ＋教科横断バンク `BANK`（アクティブ教科に対して働く）に置き換える。エンジン（quiz/analysis/storage/app）は `BANK` 経由で「現在アクティブな教科」のデータを読む。成績は教科ごとに別 localStorage キーへ保存する。

**Tech Stack:** Vanilla HTML/CSS/JS（ES modules・npm 不使用、file:// で動作）。テストは `node tests/run-tests.js`。

**Spec:** `../2026-07-04-multisubject-design.md`

## Global Constraints

- 配置先: `apps/language-app/toeic-webapp/`（パスはここからの相対）
- **gitリポジトリではない**。コミットの代わりに各タスク末尾で `node tests/run-tests.js` が `ALL TESTS PASSED` になることを確認する
- ES modules・fetch・npm依存・ビルド禁止（file:// 動作を維持）
- UI文言は日本語。フランス語本文はアクサン（é, è, à, ç 等）を正しく付与
- **TOEIC の保存キー `toeic-app-data`・問題ID `v{n}-q{m}`・7カテゴリを一切変更しない**（既存成績データの互換維持）
- フランス語の問題ID: `f{n}-q{m}`、文書ID: `f{n}-p{m}`
- 作業順序を守る: フェーズ1（Vol.7）→ フェーズ2（汎用化）→ フェーズ3（仏語）→ フェーズ4（総合検証）。各フェーズ終了時にアプリは動作可能
- TOEIC データファイルは現在の場所（`js/data/volN.js`）に留め置き、登録先だけ変更する（大きなファイルを移動しない方針。仕様書のディレクトリ案からの意図的な逸脱）
- 教科カテゴリ: TOEIC=`前置詞・慣用表現 / 動詞の形・時制 / 品詞判断 / 構文・接続詞 / 語彙 / 文脈把握 / 読解`、フランス語=`動詞の活用 / 冠詞・限定詞 / 性数一致 / 代名詞 / 前置詞 / 語彙・会話表現 / 読解`

---

## フェーズ1: TOEIC 上級セット Vol.7

### Task 1: Vol.7（上級・32問）を現行構造に追加

**Files:**
- Create: `js/data/vol7.js`
- Modify: `index.html`（script追加）, `tests/run-tests.js`（EXPECTED_COUNTS と合計）
- Read: 既存 `js/data/vol1.js`（形式の参照）

**Interfaces:**
- Consumes: 現行 `TOEIC_DATA`（`js/data/index.js`）
- Produces: `TOEIC_DATA.vols[7] = { label: "Vol.7 総合（上級・800点目標）", passages: [3件], questions: [32問] }`

- [ ] **Step 1: 現行ハーネスの合計チェックを堅牢化する**

`tests/run-tests.js` の Vol別チェック箇所を、合計をハードコード（190）から EXPECTED_COUNTS の総和に変更する。

変更前:
```js
const EXPECTED_COUNTS = { 1: 32, 2: 32, 3: 32, 4: 30, 5: 32, 6: 32 };
```
変更後:
```js
const EXPECTED_COUNTS = { 1: 32, 2: 32, 3: 32, 4: 30, 5: 32, 6: 32, 7: 32 };
```
さらに合計アサーションを変更する。変更前:
```js
if (D) {
  const all = D.allQuestions();
  assert(all.length === 190, `全体で190問（実際: ${all.length}）`);
}
```
変更後:
```js
if (D) {
  const all = D.allQuestions();
  const expectedTotal = Object.values(EXPECTED_COUNTS).reduce((a, b) => a + b, 0);
  assert(all.length === expectedTotal, `全体で${expectedTotal}問（実際: ${all.length}）`);
}
```

- [ ] **Step 2: 実行して失敗を確認**

Run: `node tests/run-tests.js`
Expected: `FAIL [data-counts] Vol.7 が存在する` と `全体で222問（実際: 190）` が出て exit 1

- [ ] **Step 3: `js/data/vol7.js` を作成する（上級32問）**

形式は `js/data/vol1.js` と同一。`TOEIC_DATA.vols[7] = { label, passages, questions }`。
- Part 5×20（id `v7-q1`〜`v7-q20`, part 5, passageId null）
- Part 6×4（1文書 `v7-p1`, part 6, id `v7-q21`〜`v7-q24`。うち1問は文挿入でカテゴリ `文脈把握`）
- Part 7×8（2文書 `v7-p2`/`v7-p3`, part 7, id `v7-q25`〜`v7-q32`, カテゴリ `読解`）

上級要素を必ず含める:
- Part 5 に 仮定法（If it were not for / Had the team…）、倒置、分詞構文、上級語彙（remuneration, stipulate, contingent, deferential, prudent, waive 等）、語法の細部
- Part 7 に NOT問題（"What is NOT mentioned…"）・言い換え・意図問題を最低3問

各問オブジェクトの例（実データで作成すること）:
```js
{
  id: "v7-q1", vol: 7, part: 5, passageId: null, number: 1,
  question: "------- the board approved the merger, the two firms would have merged by now.",
  choices: ["Had", "If", "Would", "Should"],
  answer: 0,
  explanation: "仮定法過去完了の倒置。Had + S + p.p.（= If the board had approved）で「もし承認していたら」。",
  category: "構文・接続詞"
}
```
カテゴリは既存7分類のみ使用。answer は正解の 0〜3。

- [ ] **Step 4: index.html に script を追加する**

`<script src="js/data/vol6.js"></script>` の直後に追加:
```html
  <script src="js/data/vol7.js"></script>
```

- [ ] **Step 5: テスト実行**

Run: `node tests/run-tests.js`
Expected: `ALL TESTS PASSED`（222問で全整合）

- [ ] **Step 6: 自己レビュー**

Vol.7 の全32問について、選んだ answer で文法・文脈が成立するか、Part 7 は本文の根拠箇所を再読して1問ずつ確認する。

---

## フェーズ2: 教科切替エンジンへの汎用化

### Task 2: 教科レジストリ `subjects.js` と教科バンク `bank.js`

**Files:**
- Create: `js/subjects.js`, `js/data/bank.js`
- Delete: `js/data/index.js`（`bank.js` が役割を継ぐ）

**Interfaces:**
- Produces（グローバル）:
  - `SUBJECTS`: `{ toeic: {...}, french: {...} }`。各教科 = `{ id, label, storageKey, idPrefix, categories: string[7], sectionLabels: {5,6,7→string}, vols: {} }`
  - `BANK`:
    - `BANK.activeId`（既定 `"toeic"`）, `BANK.active()`, `BANK.setActive(id)`, `BANK.ids()`
    - `BANK.categories()` → アクティブ教科の categories 配列
    - `BANK.vols()` → アクティブ教科の vols オブジェクト
    - `BANK.allQuestions()` → アクティブ教科の全問（vol昇順→登録順）
    - `BANK.getQuestion(qid)` → アクティブ教科優先、無ければ全教科横断で検索
    - `BANK.getPassage(pid)` → 全教科横断で検索

- [ ] **Step 1: `js/subjects.js` を作成する**

```js
// 教科レジストリ。bank.js・各 data ファイルより先に読み込む。
var SUBJECTS = {
  toeic: {
    id: "toeic",
    label: "TOEIC",
    storageKey: "toeic-app-data",
    idPrefix: "v",
    categories: ["前置詞・慣用表現", "動詞の形・時制", "品詞判断",
      "構文・接続詞", "語彙", "文脈把握", "読解"],
    sectionLabels: { 5: "Part 5", 6: "Part 6", 7: "Part 7" },
    vols: {}
  },
  french: {
    id: "french",
    label: "フランス語",
    storageKey: "french-app-data",
    idPrefix: "f",
    categories: ["動詞の活用", "冠詞・限定詞", "性数一致", "代名詞",
      "前置詞", "語彙・会話表現", "読解"],
    sectionLabels: { 5: "第1部 文法・語彙", 6: "第2部 穴埋め", 7: "第3部 読解" },
    vols: {}
  }
};
```

- [ ] **Step 2: `js/data/bank.js` を作成する**

```js
// 教科横断の問題バンク。subjects.js の後、各 data ファイルより前に読み込む。
var BANK = {
  subjects: SUBJECTS,
  activeId: "toeic",
  active: function () { return this.subjects[this.activeId]; },
  setActive: function (id) { if (this.subjects[id]) this.activeId = id; },
  ids: function () { var out = []; for (var k in this.subjects) out.push(k); return out; },
  categories: function () { return this.active().categories; },
  vols: function () { return this.active().vols; },
  _questionsOf: function (subj) {
    var out = [];
    var ids = Object.keys(subj.vols).map(Number).sort(function (a, b) { return a - b; });
    for (var i = 0; i < ids.length; i++) out = out.concat(subj.vols[ids[i]].questions);
    return out;
  },
  allQuestions: function () { return this._questionsOf(this.active()); },
  _find: function (subj, qid) {
    var all = this._questionsOf(subj);
    for (var i = 0; i < all.length; i++) if (all[i].id === qid) return all[i];
    return null;
  },
  getQuestion: function (qid) {
    var q = this._find(this.active(), qid);
    if (q) return q;
    for (var k in this.subjects) {
      if (k === this.activeId) continue;
      q = this._find(this.subjects[k], qid);
      if (q) return q;
    }
    return null;
  },
  getPassage: function (pid) {
    for (var k in this.subjects) {
      var subj = this.subjects[k];
      for (var v in subj.vols) {
        var ps = subj.vols[v].passages;
        for (var i = 0; i < ps.length; i++) if (ps[i].id === pid) return ps[i];
      }
    }
    return null;
  }
};
```

- [ ] **Step 3: `js/data/index.js` を削除する**

Run: `rm "js/data/index.js"`
（`bank.js` が役割を継ぐ。以降どのファイルも `TOEIC_DATA` を参照しない）

- [ ] **Step 4: TOEIC データ7ファイルの登録先を変更する**

`js/data/vol1.js`〜`vol7.js` それぞれ先頭の登録行を変更する（各ファイル1箇所）:
- 変更前: `TOEIC_DATA.vols[1] = {`
- 変更後: `SUBJECTS.toeic.vols[1] = {`

（vol2 は `[2]`、… vol7 は `[7]`。番号はファイルに対応）

- [ ] **Step 5: この時点でテストは壊れる（想定内）**

エンジン各モジュールと harness がまだ `TOEIC_DATA` を参照しているため、次タスクまで赤のまま。ここでは実行しない。

### Task 3: エンジン3モジュールを BANK に載せ替える

**Files:**
- Modify: `js/quiz.js`, `js/analysis.js`, `js/storage.js`

**Interfaces:**
- Consumes: `BANK`（Task 2）
- Produces: 変更なし（外部シグネチャ維持）。ただし `Storage2.KEY`（文字列）を廃止し `Storage2.key()`（関数, アクティブ教科の storageKey を返す）に置換。`Storage2` に教科スタンプ（保存データに `subject` を付与）と、import時の教科不一致ガードを追加

- [ ] **Step 1: `js/quiz.js` の TOEIC_DATA 参照を置換する**

3箇所を変更:
- `halfSets`: `var qs = TOEIC_DATA.vols[volId].questions;` → `var qs = BANK.vols()[volId].questions;`
- `createSession`: `qids = TOEIC_DATA.vols[opts.volId].questions.map(...)` → `qids = BANK.vols()[opts.volId].questions.map(...)`
- `grade`: `var q = TOEIC_DATA.getQuestion(qid);` → `var q = BANK.getQuestion(qid);`

- [ ] **Step 2: `js/analysis.js` の TOEIC_DATA 参照を置換する**

- `categoryStats`: `TOEIC_DATA.categories.forEach` → `BANK.categories().forEach`、`TOEIC_DATA.getQuestion` → `BANK.getQuestion`、末尾 `TOEIC_DATA.categories.map` → `BANK.categories().map`
- `partStats`: `TOEIC_DATA.getQuestion` → `BANK.getQuestion`
- `sessionLabel`: `TOEIC_DATA.vols[s.volId]` の2箇所（vol分岐・half分岐）→ `BANK.vols()[s.volId]`
- `buildReviewSet`: `TOEIC_DATA.allQuestions()` → `BANK.allQuestions()`

- [ ] **Step 3: `js/storage.js` を教科対応にする**

変更1: 静的キーを動的キーに。
- 変更前: `  KEY: "toeic-app-data",`
- 変更後: `  key: function () { return BANK.active().storageKey; },`

変更2: `load` 内 `this._backend.getItem(this.KEY)` → `this._backend.getItem(this.key())`

変更3: `_save` を教科スタンプ付きに。
- 変更前:
```js
  _save: function (data) {
    if (!this._backend) return false;
    try {
      this._backend.setItem(this.KEY, JSON.stringify(data));
      return true;
    } catch (e) { return false; }
  },
```
- 変更後:
```js
  _save: function (data) {
    if (!this._backend) return false;
    try {
      data.subject = BANK.activeId;
      this._backend.setItem(this.key(), JSON.stringify(data));
      return true;
    } catch (e) { return false; }
  },
```

変更4: `exportJSON` に subject を必ず含める。
- 変更前:
```js
  exportJSON: function () {
    return JSON.stringify(this.load(), null, 2);
  },
```
- 変更後:
```js
  exportJSON: function () {
    var d = this.load();
    d.subject = BANK.activeId;
    return JSON.stringify(d, null, 2);
  },
```

変更5: `importJSON` に教科不一致ガードを追加（`_validate` 通過後、`_save` の直前）。
- 変更前:
```js
    var err = this._validate(data);
    if (err) return { ok: false, error: err };
    if (!this._save(data)) return { ok: false, error: "保存に失敗しました" };
    return { ok: true };
```
- 変更後:
```js
    var err = this._validate(data);
    if (err) return { ok: false, error: err };
    if (data.subject && data.subject !== BANK.activeId) {
      return { ok: false, error: "この教科用のデータではありません（" + data.subject + "）。教科を切り替えてから読み込んでください。" };
    }
    if (!this._save(data)) return { ok: false, error: "保存に失敗しました" };
    return { ok: true };
```

（`available()` 内のプローブ文字列はそのままでよい）

### Task 4: テストハーネスを教科ループ化する

**Files:**
- Modify: `tests/run-tests.js`

**Interfaces:**
- Consumes: `BANK`, `SUBJECTS`, `Quiz`, `Analysis`, `Storage2`

- [ ] **Step 1: データ読み込みと基盤参照を差し替える**

先頭の DATA_FILES と `const D = ctx.TOEIC_DATA;` を置換する。
- 変更前:
```js
const DATA_FILES = ["js/data/index.js", "js/data/vol1.js", "js/data/vol2.js",
  "js/data/vol3.js", "js/data/vol4.js", "js/data/vol5.js", "js/data/vol6.js"];
DATA_FILES.forEach(f => {
  if (fs.existsSync(path.join(root, f))) load(f);
});

const D = ctx.TOEIC_DATA;
section("data-base");
assert(D, "TOEIC_DATA が定義されている");
assert(D && D.categories.length === 7, "カテゴリは7つ");
```
- 変更後:
```js
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
```

- [ ] **Step 2: Vol別カウント＋整合性チェックを教科ループに置換する**

`const EXPECTED_COUNTS = {...}` から data-integrity ブロックの終わりまでを、次に置換する。
```js
// 教科ごとの期待問題数（フランス語は Task 6/7 で追加）
const EXPECTED = {
  toeic: { 1: 32, 2: 32, 3: 32, 4: 30, 5: 32, 6: 32, 7: 32 }
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
```

- [ ] **Step 3: ロジックテストの D 参照を確認する**

quiz/analysis/storage/half の各ブロックはメソッド呼び出し（`D.getQuestion` / `D.allQuestions()`）のみで `D` を使う。`const D = BANK;` を上で定義済みのため、これらは無修正で動く。storage ブロックの `mem[Storage2.KEY]` の1箇所のみ変更する。
- 変更前: `mem[Storage2.KEY] = "{broken";`
- 変更後: `mem[Storage2.key()] = "{broken";`

- [ ] **Step 4: storage テストに教科スタンプ／不一致ガードの検証を追加する**

storage ブロックの `assert(Storage2.importJSON(json).ok === true, "正常JSONは受理");` の直後に追加:
```js
  const exported = JSON.parse(Storage2.exportJSON());
  assert(exported.subject === "toeic", "書き出しに教科スタンプが付く");
  const foreign = JSON.stringify({ version: 1, subject: "french", sessions: [] });
  assert(Storage2.importJSON(foreign).ok === false, "別教科データは拒否");
```

- [ ] **Step 5: テスト実行**

Run: `node tests/run-tests.js`
Expected: `ALL TESTS PASSED`（toeic 222問＋全ロジックが BANK 上で緑。french はまだ EXPECTED になく検査対象外）

### Task 5: app.js を教科タブ対応にする＋UI配線を BANK に載せ替え

**Files:**
- Modify: `js/app.js`, `css/style.css`, `index.html`

**Interfaces:**
- Consumes: `BANK`, `Quiz`, `Analysis`, `Storage2`
- Produces: `App.switchSubject(id)`（タブ切替 → `BANK.setActive` → `renderHome`）

- [ ] **Step 1: `TOEIC_DATA` 参照を機械置換する**

`js/app.js` 内の以下を置換（対象箇所すべて）:
| 変更前 | 変更後 |
|--------|--------|
| `TOEIC_DATA.vols[` | `BANK.vols()[` |
| `Object.keys(TOEIC_DATA.vols)` | `Object.keys(BANK.vols())` |
| `TOEIC_DATA.categories` | `BANK.categories()` |
| `TOEIC_DATA.getPassage(` | `BANK.getPassage(` |
| `TOEIC_DATA.getQuestion(` | `BANK.getQuestion(` |
| `TOEIC_DATA.allQuestions()` | `BANK.allQuestions()` |

（`renderHome` の vol 反復、`buildReviewPanel` の catSelect、`buildPassage`、`renderQuestion`、`showResult` の getQuestion がすべて対象。grep で `TOEIC_DATA` が0件になること）

- [ ] **Step 2: `renderHome` 冒頭に教科タブとタイトルを追加する**

`renderHome` の既存 H1・subtitle 追加部を置換。
- 変更前:
```js
    root.appendChild(this.el("h1", { text: "TOEIC Reading 練習" }));
    root.appendChild(this.el("p", {
      class: "subtitle",
      text: "全190問 / セット全体の制限時間つき・終了後に解答解説と弱点分析"
    }));
```
- 変更後:
```js
    // 教科タブ
    var tabs = this.el("div", { class: "subject-tabs" });
    BANK.ids().forEach(function (id) {
      var cls = "subject-tab" + (id === BANK.activeId ? " active" : "");
      tabs.appendChild(self.el("button", {
        class: cls, text: BANK.subjects[id].label,
        onclick: function () { self.switchSubject(id); }
      }));
    });
    root.appendChild(tabs);

    root.appendChild(this.el("h1", { text: BANK.active().label + " 練習" }));

    var totalN = BANK.allQuestions().length;
    if (totalN === 0) {
      root.appendChild(this.el("p", { class: "subtitle", text: "この教科の問題は準備中です。" }));
      return;
    }
    root.appendChild(this.el("p", {
      class: "subtitle",
      text: "全" + totalN + "問 / セット全体の制限時間つき・終了後に解答解説と弱点分析"
    }));
```
（注: `renderHome` 内で既に `var sessions = ...` や `var self = this;` が定義されている前提。`self` 未定義なら先頭で `var self = this;` を確認する）

- [ ] **Step 3: `switchSubject` を追加する**

`startVol` の直前に追加:
```js
  switchSubject: function (id) {
    BANK.setActive(id);
    this.renderHome();
    this.showScreen("home");
  },
```

- [ ] **Step 4: 結果画面の Part 別ラベルを教科のセクション名にする**

`showResult` の Part別バー生成箇所を変更。
- 変更前:
```js
      this.buildBars(Analysis.partStats([record]).map(function (p) {
        return { label: "Part " + p.part, attempts: p.attempts, correct: p.correct, rate: p.rate };
      }))
```
- 変更後:
```js
      this.buildBars(Analysis.partStats([record]).map(function (p) {
        return { label: BANK.active().sectionLabels[p.part], attempts: p.attempts, correct: p.correct, rate: p.rate };
      }))
```

- [ ] **Step 5: 書き出しファイル名を教科別にする**

`exportData` のファイル名生成を変更。
- 変更前: `var name = "toeic-data-" + d.getFullYear() + "-" +`
- 変更後: `var name = BANK.activeId + "-data-" + d.getFullYear() + "-" +`

- [ ] **Step 6: CSS に教科タブを追加する**

`css/style.css` の `.toolbar {` の定義の前に追加:
```css
.subject-tabs { display: flex; gap: 8px; margin: 8px 0 4px; }
.subject-tab { border-radius: 999px; padding: 6px 18px; }
.subject-tab.active { background: var(--accent); border-color: var(--accent); color: #fff; }
```

- [ ] **Step 7: index.html の script 読み込み順を更新する**

`<script src="js/data/index.js"></script>` を削除し、先頭に subjects.js と bank.js を置く。変更後の data 読み込み部（storage.js より前）:
```html
  <script src="js/subjects.js"></script>
  <script src="js/data/bank.js"></script>
  <script src="js/data/vol1.js"></script>
  <script src="js/data/vol2.js"></script>
  <script src="js/data/vol3.js"></script>
  <script src="js/data/vol4.js"></script>
  <script src="js/data/vol5.js"></script>
  <script src="js/data/vol6.js"></script>
  <script src="js/data/vol7.js"></script>
```
（フランス語の script は Task 6/7 で追加する）

- [ ] **Step 8: 回帰テスト**

Run: `node tests/run-tests.js`
Expected: `ALL TESTS PASSED`

- [ ] **Step 9: 構文チェック**

Run: `node --check js/app.js`
Expected: 出力なし（exit 0）

- [ ] **Step 10: ブラウザ検証（TOEIC が従来通り動くこと）**

preview_start（`toeic-webapp`）→ 以下を preview_eval / preview_snapshot で確認:
- 教科タブ「TOEIC」「フランス語」が表示される
- TOEIC タブでVol.1〜7のカード（Vol.7含む）と10分版ボタンが出る
- 「フランス語」タブに切替 → 「この教科の問題は準備中です。」が出る（カードなし）
- TOEIC に戻り、Vol.7 を1問回答→採点→結果のPart別が「Part 5/6/7」表示、解説が出る
- preview_console_logs でエラーなし

---

## フェーズ3: フランス語コンテンツ

### Task 6: フランス語 Vol.F1（32問）

**Files:**
- Create: `js/data/french/vol1.js`
- Modify: `index.html`, `tests/run-tests.js`（EXPECTED に french 追加）

**Interfaces:**
- Consumes: `SUBJECTS`
- Produces: `SUBJECTS.french.vols[1] = { label: "Vol.F1 基礎総合", passages: [3件], questions: [32問] }`

- [ ] **Step 1: harness の EXPECTED に french を追加する**

`tests/run-tests.js` の EXPECTED を変更:
- 変更前: `const EXPECTED = { toeic: { 1: 32, 2: 32, 3: 32, 4: 30, 5: 32, 6: 32, 7: 32 } };`
- 変更後: `const EXPECTED = { toeic: { 1: 32, 2: 32, 3: 32, 4: 30, 5: 32, 6: 32, 7: 32 }, french: { 1: 32 } };`

- [ ] **Step 2: 実行して失敗を確認**

Run: `node tests/run-tests.js`
Expected: `FAIL [counts:french] french Vol.1 が存在する` で exit 1

- [ ] **Step 3: `js/data/french/vol1.js` を作成する（32問）**

構成（part 数値は仕組み流用のため 5/6/7 を使う。表示名は sectionLabels が担う）:
- 第1部 文法・語彙 短文4択 × 20（part 5, passageId null, id `f1-q1`〜`f1-q20`）
- 第2部 文章穴埋め × 4（1文書 `f1-p1`, part 6, id `f1-q21`〜`f1-q24`）
- 第3部 読解 × 8（2文書 `f1-p2`/`f1-p3`, part 7, id `f1-q25`〜`f1-q32`, カテゴリ `読解`）

レベル: 仏検4級軸＋3級要素（複合過去 vs 半過去、目的語人称代名詞 le/la/les/lui/leur、近接未来 aller+inf、部分冠詞 du/de la、疑問文、比較級、代名動詞 se lever 等）。
カテゴリは french の7分類のみ（`動詞の活用 / 冠詞・限定詞 / 性数一致 / 代名詞 / 前置詞 / 語彙・会話表現 / 読解`）。
解説は日本語。フランス語文にはアクサンを正しく付与。登録先は `SUBJECTS.french.vols[1]`（`vol` フィールドは 1）。

各問の例（実データで作成すること）:
```js
{
  id: "f1-q3", vol: 1, part: 5, passageId: null, number: 3,
  question: "Hier, nous ------- au cinéma avec des amis.",
  choices: ["allons", "sommes allés", "irons", "allions"],
  answer: 1,
  explanation: "Hier（昨日）＝過去の完了した動作なので複合過去。aller は être を助動詞にとり、主語 nous に一致して allés。→ sommes allés。",
  category: "動詞の活用"
}
```
文書オブジェクトの例:
```js
{ id: "f1-p1", vol: 1, part: 6, title: "Questions 21-24 : lisez le courriel suivant.",
  body: "Chère Marie,\n\nJe t'écris pour ..." }
```

- [ ] **Step 4: index.html に script を追加する**

`<script src="js/data/vol7.js"></script>` の直後に追加:
```html
  <script src="js/data/french/vol1.js"></script>
```

- [ ] **Step 5: テスト実行**

Run: `node tests/run-tests.js`
Expected: `ALL TESTS PASSED`（toeic 222 + french 32）

- [ ] **Step 6: 自己レビュー**

F1 の全32問について、活用・性数一致・冠詞・アクサンが正しいか、選んだ answer で成立するか1問ずつ確認する。第3部は本文の根拠箇所を再読する。

### Task 7: フランス語 Vol.F2（32問）

**Files:**
- Create: `js/data/french/vol2.js`
- Modify: `index.html`, `tests/run-tests.js`

**Interfaces:**
- Produces: `SUBJECTS.french.vols[2] = { label: "Vol.F2 基礎総合", passages: [3件], questions: [32問] }`

- [ ] **Step 1: harness の EXPECTED.french を更新する**

- 変更前: `french: { 1: 32 }`
- 変更後: `french: { 1: 32, 2: 32 }`

- [ ] **Step 2: 実行して失敗を確認**

Run: `node tests/run-tests.js`
Expected: `FAIL [counts:french] french Vol.2 が存在する` で exit 1

- [ ] **Step 3: `js/data/french/vol2.js` を作成する（32問）**

Task 6 と同一形式・同一レベル方針。登録先 `SUBJECTS.french.vols[2]`、id は `f2-q1`〜`f2-q32`、文書 `f2-p1`〜`f2-p3`。F1 と題材（文書のテーマ）を変える。

- [ ] **Step 4: index.html に script を追加する**

`<script src="js/data/french/vol1.js"></script>` の直後:
```html
  <script src="js/data/french/vol2.js"></script>
```

- [ ] **Step 5: テスト実行**

Run: `node tests/run-tests.js`
Expected: `ALL TESTS PASSED`（toeic 222 + french 64）

- [ ] **Step 6: 自己レビュー**

F2 の全32問を Task 6 Step 6 と同じ観点で1問ずつ確認する。

---

## フェーズ4: 総合検証

### Task 8: 全体ブラウザ検証と後片付け

**Files:** なし（検証のみ）＋ memory 更新

- [ ] **Step 1: 全テスト**

Run: `node tests/run-tests.js`
Expected: `ALL TESTS PASSED`

- [ ] **Step 2: ブラウザ通し検証**（preview ツール）
  1. TOEIC タブ: Vol.7 開始→採点→結果（上級解説表示）
  2. フランス語タブに切替: Vol.F1 開始→数問回答→採点→結果でセクション名「第1部 文法・語彙／第3部 読解」表示、仏語解説が出る
  3. フランス語で10分版「文法 20問」開始→20問・全 part5 であること
  4. フランス語の分析画面: カテゴリが仏語7分類で表示される
  5. **教科データ分離の確認**: フランス語で1セット実施後 TOEIC タブへ戻り、TOEIC の受験回数・履歴にフランス語のセッションが混ざらないこと。再度フランス語タブでフランス語履歴だけ見えること
  6. 書き出し: フランス語で書き出し→ファイル名が `french-data-...`。TOEIC タブに切替えてそのファイルを読み込み→「別教科用データ」で拒否されること
  7. preview_resize モバイル(375px)で教科タブが崩れない
  8. preview_console_logs でエラーゼロ

- [ ] **Step 3: file:// 動作確認**

Run: `open index.html`
確認: 教科タブが表示され、TOEIC/フランス語が切替可能（ES modules 不使用の維持）

- [ ] **Step 4: 検証データの消去**

preview_eval で `localStorage.removeItem('toeic-app-data'); localStorage.removeItem('french-app-data'); location.reload();`

- [ ] **Step 5: memory と設計書ステータスの更新**

`project_toeic_webapp.md` に「教科切替式（TOEIC/フランス語）に汎用化、Vol.7上級追加、仏語 F1/F2 追加（2026-07-04）」を追記する。

- [ ] **Step 6: 完了報告**

スクリーンショットを添え、教科切替の使い方、フランス語は仏検の合否予測用ではない旨、成績は教科ごと・ブラウザごとに保存される旨をユーザーに報告する。

---

## Self-Review メモ（計画作成者による確認）

- **Spec coverage**: ①Vol.7=Task1、②汎用化=Task2-5（subjects/bank・データ登録替え・エンジン・harness・app/tab）、③仏語=Task6-7、検証=Task8。仕様書の各節に対応タスクあり。
- **保存キー互換**: TOEIC は `toeic-app-data` 不変（subjects.js）。問題ID `v{n}` 不変。カテゴリ不変。→ 既存データ移行不要。
- **型整合**: `BANK.categories()`/`BANK.vols()` は関数（配列/オブジェクトを返す）で全モジュール・harness・app で統一。`Storage2.key()` は関数、旧 `Storage2.KEY` は全廃（harness も `key()` に更新）。`halfKey`/`sectionLabels`/`idPrefix` の綴りは全タスクで一致。
- **段階的グリーン**: Task2-3 の間だけ赤（同一フェーズ内の不可分改修）。Task4 末で緑に復帰。EXPECTED への french 追加は Task6/7 で段階投入するため各フェーズ末は緑。
