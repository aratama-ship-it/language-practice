# リスニングセクション Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans でタスク単位に実装する。ステップは checkbox（`- [ ]`）で追跡する。

**Goal:** TOEIC Part2/3/4 風のリスニング練習（英語・仏語、TTS順次再生・話者切替、四択/三択採点、カテゴリ別苦手分析、教科別保存＋JSON入出力）を、既存アプリに独立モジュールとして追加する。

**Architecture:** 純粋ロジック（採点・集計）を `js/listening.js` の `Listening` に、UI・TTS・記録を `js/listening-ui.js` の `ListeningUI` に分離。問題データは `js/data/listening/` に教科別登録。既存の MCQ／ディクテーションには触れず、共有は教科ID文字列・`App.el`／`App.clear`／`App.showScreen`／`App.goHome`・画面枠のみ。ディクテーション（DICT/DictationUI）の実装パターンを踏襲する。

**Tech Stack:** Vanilla HTML/CSS/JS（ES modules・npm 不使用、file:// でも可・音声は要ブラウザ）。音声は `speechSynthesis`。テストは `node tests/run-tests.js`。

**Spec:** `../2026-07-11-listening-design.md`

## Global Constraints

- 配置先: `apps/language-app/toeic-webapp/`（パスはここからの相対）
- **gitリポジトリ**（`apps/language-app/toeic-webapp` 自体がリポジトリ、GitHub Pages公開中）。各タスク末尾で `node tests/run-tests.js` が `ALL TESTS PASSED` を確認。最後に commit/push で Pages 反映
- ES modules・fetch・npm依存・ビルド禁止。UI文言は日本語。仏語文はアクサンを正しく付与
- 既存 MCQ・ディクテーションの挙動・保存キー・テストを一切変えない
- リスニング保存キー: `toeic-listening-data` / `french-listening-data`。データ版: `1`
- 教科IDは `toeic` / `french`（既存と同じ文字列。データ・保存は別）
- 問題ID形式: `l{set}-p{passage}-q{n}`（例 `l1-p1-q1`）。教科プレフィックスは付けない
- カテゴリ（英仏共通6種）: `応答選択 / 目的・概要 / 詳細 / 言い換え・推測 / 次の行動・依頼 / 話し手・場面`
- type: `qa`（Part2・choices3・設問1）/ `conversation`（Part3・choices4・設問2〜3）/ `talk`（Part4・choices4・設問2〜3）
- 初期コンテンツ: 英語 Set1・仏語 Set1 = 各 qa×6 + conversation×2(6問) + talk×2(6問) = 各18問
- スクリプト読み込み順（index.html、ディクテーションのブロック直後・app.js より前）:
  `js/data/listening/index.js → listening/en.js → listening/fr.js → js/listening.js → js/listening-ui.js`

---

### Task 1: `Listening` 採点・集計ロジック（データ無しで単体テスト）

**Files:**
- Create: `js/listening.js`
- Modify: `tests/run-tests.js`（最終 console.log の前に追記）

**Interfaces:**
- Produces: グローバル `Listening`
  - `Listening.gradeQuestions(questions, answers)` → `{ results: [{ questionId, category, chosen, correct }], correct, total, rate }`。
    `questions` は `[{ id, answer, category, ... }]`、`answers` は `{ [questionId]: chosenIndex|null }`。未回答(null)は不正解。
  - `Listening.categoryStats(results, subjectId)` → `LISTEN[subjectId].categories` 各項目の `{ category, attempts, correct, rate }`（attempts 0 は rate null）。results は保存レコード配列（`{ items: [{ category, correct }] }` を含む）
  - Node 互換のため `LISTEN` を参照するが、categoryStats のテストは `LISTEN` 読込後（Task2以降）に緑化する設計。gradeQuestions は `LISTEN` 非依存で先に緑化できる。

- [ ] **Step 1: テストを追記（失敗確認）**

`tests/run-tests.js` の最終 `console.log(...)` の直前に追記:

```js
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
```

Run: `node tests/run-tests.js`
Expected: `FAIL [listening-logic] Listening が定義されている` で exit 1

- [ ] **Step 2: `js/listening.js` を実装**

```js
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
```

- [ ] **Step 3: テスト実行**

Run: `node tests/run-tests.js`
Expected: `ALL TESTS PASSED`

### Task 2: リスニング・データ基盤 `LISTEN` ＋整合性テスト

**Files:**
- Create: `js/data/listening/index.js`
- Modify: `tests/run-tests.js`（listening-logic の直後に追記）

**Interfaces:**
- Produces: グローバル `LISTEN`
  - `LISTEN.toeic` / `LISTEN.french` = `{ id, label, lang, storageKey, categories: string[6], sets: {} }`
  - `LISTEN.ids()` → `["toeic","french"]`
  - `LISTEN.passages(subjectId)` → その教科の全パッセージ平坦配列（set昇順→passage順）
  - `LISTEN.questions(subjectId)` → その教科の全設問平坦配列

- [ ] **Step 1: テストを追記（失敗確認）**

listening-logic ブロックの直後に追記:
```js
// ---- listening data ----
["js/data/listening/index.js", "js/data/listening/en.js", "js/data/listening/fr.js"]
  .forEach(f => { if (fs.existsSync(path.join(root, f))) load(f); });
const LISTEN = ctx.LISTEN;
section("listening-data");
assert(LISTEN, "LISTEN が定義されている");
const LIS_EXPECT = { toeic: 18, french: 18 }; // 各教科の総設問数
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
```

Run: `node tests/run-tests.js`
Expected: `FAIL [listening-data] LISTEN が定義されている` で exit 1（en/fr 未作成のため以後も赤）

- [ ] **Step 2: `js/data/listening/index.js` を実装**

```js
// リスニング教科レジストリ。listening/en.js・fr.js より先に読み込む。
var LISTEN = {
  toeic: {
    id: "toeic", label: "TOEIC（英語）", lang: "en-US", storageKey: "toeic-listening-data",
    categories: ["応答選択", "目的・概要", "詳細", "言い換え・推測", "次の行動・依頼", "話し手・場面"],
    sets: {}
  },
  french: {
    id: "french", label: "フランス語", lang: "fr-FR", storageKey: "french-listening-data",
    categories: ["応答選択", "目的・概要", "詳細", "言い換え・推測", "次の行動・依頼", "話し手・場面"],
    sets: {}
  },
  ids: function () { var o = []; for (var k in this) if (this[k] && this[k].sets) o.push(k); return o; },
  passages: function (subjectId) {
    var subj = this[subjectId], out = [];
    var sids = Object.keys(subj.sets).map(Number).sort(function (a, b) { return a - b; });
    for (var i = 0; i < sids.length; i++) out = out.concat(subj.sets[sids[i]].passages);
    return out;
  },
  questions: function (subjectId) {
    var out = [];
    this.passages(subjectId).forEach(function (p) { out = out.concat(p.questions); });
    return out;
  }
};
```

- [ ] **Step 3: テスト実行（データ本体は次タスクなので赤のまま確認）**

Run: `node tests/run-tests.js`
Expected: `FAIL [listening-data] toeic は18問（実際: 0）` 等。`LISTEN が定義されている` は消える。

### Task 3: 英語リスニング Set 1（18問）

**Files:**
- Create: `js/data/listening/en.js`

**Interfaces:**
- Consumes: `LISTEN`
- Produces: `LISTEN.toeic.sets[1] = { id: 1, label: "Set 1（基礎）", passages: [10件] }`

- [ ] **Step 1: `js/data/listening/en.js` を作成する**

構成: `qa`×6（設問各1・計6問）＋ `conversation`×2（設問各3・計6問）＋ `talk`×2（設問各3・計6問）= 10パッセージ・18問。
- passage id は `l1-p1`〜`l1-p10`、設問 id は `l1-p{n}-q{m}`。
- qa は choices3・answer 0〜2、conversation/talk は choices4・answer 0〜3。
- 話者ラベル: qa/talk は `"N"`（単一）、conversation は `"M"`/`"W"`（2話者）。
- category は6種を偏りなく配分（応答選択は主に qa、他は会話/説明文に散らす）。
- 平易で聞き取りやすい短文。設問文 `q` と選択肢は英語、`translation` は各 line と設問の日本語訳を持たせるため、line に `ja` は付けず、パッセージに `translation`（全文訳）を持たせる。
  → **データ形式に `translation`（パッセージ全体の和訳・スクリプト表示用）を各 passage に追加する。**

各 passage の例（実データで作成）:
```js
{
  id: "l1-p1", type: "qa",
  lines: [ { speaker: "N", text: "Where did you put the quarterly report?" } ],
  translation: "四半期報告書はどこに置きましたか？",
  questions: [
    { id: "l1-p1-q1", q: "最も適切な応答を選んでください。",
      choices: ["It's on your desk.", "At three o'clock.", "Yes, I reported it."],
      answer: 0, category: "応答選択" }
  ]
}
```
conversation の例:
```js
{
  id: "l1-p7", type: "conversation",
  lines: [
    { speaker: "W", text: "Hi, I'd like to return this jacket. It's too small." },
    { speaker: "M", text: "Of course. Do you have the receipt with you?" },
    { speaker: "W", text: "Yes, here it is. Can I exchange it for a larger size?" }
  ],
  translation: "女性：このジャケットを返品したいのですが、小さすぎて。／男性：かしこまりました。レシートはお持ちですか？／女性：はい、これです。大きいサイズに交換できますか？",
  questions: [
    { id: "l1-p7-q1", q: "Why is the woman at the store?",
      choices: ["To buy a new jacket", "To return an item", "To apply for a job", "To pick up a package"],
      answer: 1, category: "目的・概要" },
    { id: "l1-p7-q2", q: "What does the man ask for?",
      choices: ["A credit card", "A receipt", "A membership card", "An ID"],
      answer: 1, category: "詳細" },
    { id: "l1-p7-q3", q: "What will the woman probably do next?",
      choices: ["Leave the store", "Exchange the jacket", "Call a manager", "Get a refund"],
      answer: 1, category: "次の行動・依頼" }
  ]
}
```
（Task2 の整合テストは `translation` を必須にしていないが、UI表示に使うため全 passage に付けること）

- [ ] **Step 2: テスト実行**

Run: `node tests/run-tests.js`
Expected: `FAIL [listening-data] french は18問（実際: 0）` のみ残る（toeic 側は緑）。

### Task 4: フランス語リスニング Set 1（18問）

**Files:**
- Create: `js/data/listening/fr.js`

**Interfaces:**
- Produces: `LISTEN.french.sets[1] = { id: 1, label: "Set 1（基礎）", passages: [10件] }`

- [ ] **Step 1: `js/data/listening/fr.js` を作成する**

Task 3 と同一形式・同一配分（qa×6 + conversation×2 + talk×2 = 18問）。
- passage id `l1-p1`〜`l1-p10`、設問 id `l1-p{n}-q{m}`。
- 仏文はアクサン正確に。設問文 `q` と選択肢も仏語、`translation` は日本語全文訳。
- 話者ラベルは qa/talk = `"N"`、conversation = `"M"`/`"W"`。
- 平易な日常会話・案内（駅・カフェ・店・電話メッセージ等）。カテゴリ6種を配分。

- [ ] **Step 2: テスト実行**

Run: `node tests/run-tests.js`
Expected: `ALL TESTS PASSED`（英仏 各18問で整合）

### Task 5: `ListeningUI`（画面・TTS順次再生・記録）

**Files:**
- Create: `js/listening-ui.js`
- Modify: `index.html`（`#screen-listening` セクション＋script追加）, `js/app.js`（ホームにボタン）, `css/style.css`

**Interfaces:**
- Consumes: `LISTEN`, `Listening`, `App.el`, `App.clear`, `App.showScreen`, `App.goHome`
- Produces: グローバル `ListeningUI`
  - `ListeningUI.open(subjectId)` → セット選択画面を描画し `App.showScreen("listening")`
  - 内部: `_load/_save/exportData/importData/_importJSON`（ディクテーションと同型・キーは `LISTEN[subj].storageKey`）、`playPassage`（順次再生・話者切替・slow）, セッション進行, 結果保存, 苦手分析画面

- [ ] **Step 1: index.html に screen と script を追加する**

`<section id="screen-dictation" class="screen hidden"></section>` の直後に追加:
```html
    <section id="screen-listening" class="screen hidden"></section>
```
`<script src="js/dictation-ui.js"></script>` の直後（app.js より前）に追加:
```html
  <script src="js/data/listening/index.js"></script>
  <script src="js/data/listening/en.js"></script>
  <script src="js/data/listening/fr.js"></script>
  <script src="js/listening.js"></script>
  <script src="js/listening-ui.js"></script>
```

- [ ] **Step 2: `js/listening-ui.js` を実装**

```js
// リスニング画面・TTS順次再生・記録
var ListeningUI = {
  subjectId: "toeic",
  setId: null,
  passages: [],
  index: 0,          // 現在のパッセージ
  answers: {},       // { questionId: chosenIndex } 全パッセージ通し
  results: [],       // 各パッセージの採点結果を貯める
  el: function () { return App.el.apply(App, arguments); },

  // ---- 記録（ディクテーションと同型・キーだけ別） ----
  _load: function (subjectId) {
    try {
      var raw = localStorage.getItem(LISTEN[subjectId].storageKey);
      if (!raw) return { version: 1, subject: subjectId, results: [] };
      var d = JSON.parse(raw);
      if (!d || d.version !== 1 || !Array.isArray(d.results)) return { version: 1, subject: subjectId, results: [] };
      return d;
    } catch (e) { return { version: 1, subject: subjectId, results: [] }; }
  },
  _save: function (subjectId, data) {
    try { localStorage.setItem(LISTEN[subjectId].storageKey, JSON.stringify(data)); return true; }
    catch (e) { return false; }
  },
  exportData: function () {
    var d = new Date();
    var name = this.subjectId + "-listening-" + d.getFullYear() + "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + ".json";
    var data = this._load(this.subjectId); data.subject = this.subjectId;
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = name; a.click();
    URL.revokeObjectURL(a.href);
  },
  importData: function (file) {
    var self = this;
    if (!confirm("現在のリスニング成績を、読み込んだ内容で置き換えます。よろしいですか？")) return;
    var reader = new FileReader();
    reader.onload = function () {
      var res = self._importJSON(String(reader.result));
      if (res.ok) { alert("読み込みました"); self.renderSetList(); }
      else alert("読み込めませんでした: " + res.error);
    };
    reader.readAsText(file);
  },
  _importJSON: function (str) {
    var data;
    try { data = JSON.parse(str); } catch (e) { return { ok: false, error: "JSONとして読み込めませんでした" }; }
    if (!data || data.version !== 1 || !Array.isArray(data.results)) return { ok: false, error: "データ形式が不正です" };
    if (data.subject && data.subject !== this.subjectId) {
      return { ok: false, error: "この教科用のデータではありません（" + data.subject + "）。教科を切り替えてから読み込んでください。" };
    }
    if (!this._save(this.subjectId, data)) return { ok: false, error: "保存に失敗しました" };
    return { ok: true };
  },

  // ---- TTS 順次再生・話者切替 ----
  _voiceMap: function (lang, speakers) {
    var map = {};
    if (!window.speechSynthesis) return map;
    var voices = window.speechSynthesis.getVoices();
    var bad = /Bad News|Bahh|Boing|Bubbles|Cellos|Trinoids|Zarvox|Wobble|Whisper|Organ|Jester|Superstar|Good News|Pipe|Albert/i;
    var base = lang.slice(0, 2);
    var cands = voices.filter(function (v) { return v.lang && v.lang.slice(0, 2) === base && !bad.test(v.name); });
    if (cands.length === 0) cands = voices.filter(function (v) { return v.lang && v.lang.slice(0, 2) === base; });
    speakers.forEach(function (sp, i) { map[sp] = cands.length ? cands[i % cands.length] : null; });
    return map;
  },
  playPassage: function (passage, slow) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    var lang = LISTEN[this.subjectId].lang;
    var speakers = [];
    passage.lines.forEach(function (ln) { if (speakers.indexOf(ln.speaker) < 0) speakers.push(ln.speaker); });
    var vmap = this._voiceMap(lang, speakers);
    var i = 0;
    function next() {
      if (i >= passage.lines.length) return;
      var ln = passage.lines[i++];
      var u = new SpeechSynthesisUtterance(ln.text);
      u.lang = lang;
      if (vmap[ln.speaker]) u.voice = vmap[ln.speaker];
      u.rate = slow ? 0.7 : 1.0;
      u.onend = next;
      window.speechSynthesis.speak(u);
    }
    next();
  },

  // ---- セット選択 ----
  open: function (subjectId) {
    this.subjectId = subjectId || "toeic";
    this.renderSetList();
    App.showScreen("listening");
  },
  renderSetList: function () {
    var self = this;
    var root = document.getElementById("screen-listening");
    App.clear(root);
    var subj = LISTEN[this.subjectId];
    var store = this._load(this.subjectId);

    var tabs = this.el("div", { class: "subject-tabs" });
    LISTEN.ids().forEach(function (id) {
      tabs.appendChild(self.el("button", {
        class: "subject-tab" + (id === self.subjectId ? " active" : ""),
        text: LISTEN[id].label, onclick: function () { self.open(id); }
      }));
    });
    root.appendChild(tabs);
    root.appendChild(this.el("h1", { text: "リスニング" }));
    if (!window.speechSynthesis) {
      root.appendChild(this.el("p", { class: "subtitle", text: "⚠ この環境では音声が使えません。スクリプト表示で確認できます。" }));
    }

    Object.keys(subj.sets).map(Number).sort(function (a, b) { return a - b; }).forEach(function (sid) {
      var set = subj.sets[sid];
      var qCount = set.passages.reduce(function (n, p) { return n + p.questions.length; }, 0);
      var runs = store.results.filter(function (r) { return r.setId === sid; });
      var best = runs.reduce(function (mx, r) { return Math.max(mx, Math.round(r.rate * 100)); }, 0);
      var meta = qCount + "問 ・ 受験 " + runs.length + "回" + (runs.length ? " ・ 最高 " + best + "%" : "");
      root.appendChild(self.el("div", { class: "card" }, [
        self.el("h3", { text: set.label }),
        self.el("div", { class: "meta", text: meta }),
        self.el("div", { class: "row" }, [
          self.el("button", { class: "primary", text: "はじめる", onclick: function () { self.start(sid); } })
        ])
      ]));
    });

    var importInput = this.el("input", {
      type: "file", accept: ".json,application/json", class: "hidden",
      onchange: function (e) { if (e.target.files && e.target.files[0]) self.importData(e.target.files[0]); e.target.value = ""; }
    });
    root.appendChild(this.el("div", { class: "toolbar" }, [
      this.el("button", { text: "苦手分析", onclick: function () { self.renderAnalysis(); } }),
      this.el("button", { text: "データ書き出し", onclick: function () { self.exportData(); } }),
      this.el("button", { text: "データ読み込み", onclick: function () { importInput.click(); } }),
      importInput,
      this.el("button", { text: "メニューに戻る", onclick: function () { App.goHome(); } })
    ]));
  },

  // ---- セッション ----
  start: function (setId) {
    this.setId = setId;
    this.passages = LISTEN[this.subjectId].sets[setId].passages.slice();
    this.index = 0; this.answers = {}; this.results = [];
    this.renderPassage();
  },
  renderPassage: function () {
    var self = this;
    var root = document.getElementById("screen-listening");
    App.clear(root);
    var p = this.passages[this.index];

    root.appendChild(this.el("div", { class: "test-header" }, [
      this.el("span", { class: "progress", text: (this.index + 1) + " / " + this.passages.length }),
      this.el("button", { text: "やめる", onclick: function () { self.renderSetList(); } })
    ]));
    var typeLabel = p.type === "qa" ? "質問応答" : (p.type === "conversation" ? "会話" : "説明文");
    root.appendChild(this.el("div", { class: "subtitle", text: typeLabel }));
    root.appendChild(this.el("div", { class: "row" }, [
      this.el("button", { class: "primary", text: "▶ 再生", onclick: function () { self.playPassage(p, false); } }),
      this.el("button", { text: "🐢 ゆっくり", onclick: function () { self.playPassage(p, true); } })
    ]));

    var qBox = this.el("div", { id: "lis-questions" });
    p.questions.forEach(function (q, qi) {
      var block = self.el("div", { class: "lis-qblock" });
      if (q.q) block.appendChild(self.el("div", { class: "question-text", text: (p.questions.length > 1 ? (qi + 1) + ". " : "") + q.q }));
      var labels = ["A", "B", "C", "D"];
      var choices = self.el("div", { class: "choices" });
      q.choices.forEach(function (c, ci) {
        choices.appendChild(self.el("button", {
          class: "choice-btn", "data-qid": q.id, "data-ci": ci,
          onclick: function () { self.choose(q.id, ci); }
        }, [ self.el("span", { class: "choice-label", text: "(" + labels[ci] + ")" }), c ]));
      });
      block.appendChild(choices);
      qBox.appendChild(block);
    });
    root.appendChild(qBox);
    root.appendChild(this.el("div", { id: "lis-feedback" }));
    root.appendChild(this.el("div", { class: "test-footer" }, [
      this.el("button", { class: "primary", text: "答え合わせ", onclick: function () { self.check(p); } })
    ]));

    this.playPassage(p, false); // 自動で1回再生
  },
  choose: function (qid, ci) {
    this.answers[qid] = ci;
    var btns = document.querySelectorAll('#lis-questions .choice-btn[data-qid="' + qid + '"]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle("selected", Number(btns[i].getAttribute("data-ci")) === ci);
    }
  },
  check: function (p) {
    var self = this;
    var graded = Listening.gradeQuestions(p.questions, this.answers);
    graded.results.forEach(function (r) {
      self.results.push({ questionId: r.questionId, category: r.category, correct: r.correct });
    });

    var fb = document.getElementById("lis-feedback");
    App.clear(fb);
    // スクリプト
    var script = this.el("div", { class: "explanation" });
    p.lines.forEach(function (ln) {
      var who = ln.speaker && ln.speaker !== "N" ? ln.speaker + ": " : "";
      script.appendChild(self.el("div", { text: who + ln.text }));
    });
    script.appendChild(this.el("div", { class: "subtitle", text: "訳: " + p.translation }));
    fb.appendChild(script);
    // 各設問の正誤
    var labels = ["A", "B", "C", "D"];
    p.questions.forEach(function (q) {
      var res = graded.results.find(function (r) { return r.questionId === q.id; });
      var line = self.el("div", { class: "lis-result " + (res.correct ? "correct" : "wrong") });
      line.appendChild(self.el("span", { text: (res.correct ? "○ " : "× ") + "正解: (" + labels[q.answer] + ") " + q.choices[q.answer] }));
      fb.appendChild(line);
    });

    // フッターを次へに
    var footer = document.querySelector("#screen-listening .test-footer");
    App.clear(footer);
    var isLast = this.index === this.passages.length - 1;
    footer.appendChild(this.el("button", { class: "primary", text: isLast ? "結果を見る" : "次へ →",
      onclick: function () { self.next(); } }));
  },
  next: function () {
    if (this.index < this.passages.length - 1) { this.index++; this.renderPassage(); }
    else { this.finish(); }
  },
  finish: function () {
    var total = this.results.length;
    var correct = this.results.filter(function (r) { return r.correct; }).length;
    var iso = new Date().toISOString();
    var record = { id: iso, date: iso, setId: this.setId, total: total, correct: correct,
      rate: total ? correct / total : 0, items: this.results };
    var store = this._load(this.subjectId);
    store.results.push(record);
    this._save(this.subjectId, store);
    this.renderResult(record);
  },
  renderResult: function (record) {
    var self = this;
    var root = document.getElementById("screen-listening");
    App.clear(root);
    root.appendChild(this.el("h1", { text: "結果" }));
    root.appendChild(this.el("div", { class: "card" }, [
      this.el("div", { class: "score-big", text: record.correct + " / " + record.total + "問正解（" + Math.round(record.rate * 100) + "%）" })
    ]));
    root.appendChild(this.el("div", { class: "toolbar" }, [
      this.el("button", { class: "primary", text: "もう一度", onclick: function () { self.start(record.setId); } }),
      this.el("button", { text: "セット一覧へ", onclick: function () { self.renderSetList(); } })
    ]));
  },

  // ---- 苦手分析 ----
  renderAnalysis: function () {
    var self = this;
    var root = document.getElementById("screen-listening");
    App.clear(root);
    var store = this._load(this.subjectId);
    root.appendChild(this.el("h1", { text: "苦手分析（" + LISTEN[this.subjectId].label + "）" }));
    if (store.results.length === 0) {
      root.appendChild(this.el("div", { class: "card" }, [this.el("p", { text: "まだ記録がありません。" })]));
    } else {
      var cs = Listening.categoryStats(store.results, this.subjectId)
        .filter(function (c) { return c.attempts > 0; })
        .sort(function (a, b) { return a.rate - b.rate; });
      var card = this.el("div", { class: "card" }, [this.el("h2", { text: "カテゴリ別正答率（苦手順）" })]);
      cs.forEach(function (c) {
        var pct = Math.round(c.rate * 100);
        var fill = self.el("span", { class: "bar-fill" });
        fill.style.width = pct + "%";
        card.appendChild(self.el("div", { class: "bar-row" }, [
          self.el("span", { class: "bar-label", text: c.category }),
          self.el("span", { class: "bar-track" }, [fill]),
          self.el("span", { class: "bar-value", text: c.correct + "/" + c.attempts + " " + pct + "%" })
        ]));
      });
      root.appendChild(card);
    }
    root.appendChild(this.el("div", { class: "toolbar" }, [
      this.el("button", { text: "セット一覧へ", onclick: function () { self.renderSetList(); } })
    ]));
  }
};
```

- [ ] **Step 3: ホームに「リスニング」ボタンを追加する**

`js/app.js` の renderHome ツールバー、既存「ディクテーション練習」ボタンの直後に追加。
- 変更前:
```js
      this.el("button", { text: "ディクテーション練習", onclick: function () { DictationUI.open(BANK.activeId); } }),
```
- 変更後:
```js
      this.el("button", { text: "ディクテーション練習", onclick: function () { DictationUI.open(BANK.activeId); } }),
      this.el("button", { text: "リスニング", onclick: function () { ListeningUI.open(BANK.activeId); } }),
```

- [ ] **Step 4: CSS を追加する**

`css/style.css` の「/* ディクテーション */」ブロックの直後に追加:
```css
/* リスニング */
.lis-qblock { margin: 14px 0; }
.lis-result { padding: 6px 10px; border-radius: 8px; margin: 6px 0; font-size: 14px; }
```

- [ ] **Step 5: 回帰テストと構文チェック**

Run: `node tests/run-tests.js`
Expected: `ALL TESTS PASSED`

Run: `node --check js/listening-ui.js && node --check js/listening.js && node --check js/app.js`
Expected: 出力なし（exit 0）

### Task 6: ブラウザ検証・非回帰・公開

**Files:** なし（検証＋ commit/push）＋ memory 更新

- [ ] **Step 1: 全テスト**

Run: `node tests/run-tests.js`
Expected: `ALL TESTS PASSED`

- [ ] **Step 2: ブラウザ検証**（preview ツール）
  1. ホーム（TOEIC）→「リスニング」→ セット一覧（教科タブ・Set1・18問表示）
  2. 「はじめる」→ 最初のパッセージで `speechSynthesis.speaking` になる（preview_eval）、🐢で `rate` 低下
  3. qa（Part2）で応答3択、選択→「答え合わせ」→ スクリプト＋訳＋正誤表示、フッターが「次へ」に
  4. conversation（Part3）で複数話者が順に再生される（`getVoices` から2声割当。単一環境なら1声フォールバック）、四択×3を解答
  5. 最後まで進み「結果を見る」→ 記録保存、セット一覧の受験回数が増える
  6. 「苦手分析」→ カテゴリ別バーが出る
  7. 教科タブでフランス語へ → 仏語セットが出て同様に動く。記録が英語と別キーで分離
  8. データ書き出し→（別教科で読み込み拒否）→ 同教科で往復、を preview_eval で確認
  9. preview_console_logs でエラーゼロ、preview_resize モバイル(375px)で崩れない

- [ ] **Step 3: 既存 MCQ・ディクテーションの非回帰確認**

TOEIC Vol 採点・ディクテーション1問が従来通り動き、各々別キーで保存されることを確認。

- [ ] **Step 4: 検証データの消去**

preview_eval: `["toeic-app-data","french-app-data","toeic-dictation-data","french-dictation-data","toeic-listening-data","french-listening-data"].forEach(k=>localStorage.removeItem(k)); location.reload();`

- [ ] **Step 5: commit / push（Pages反映）**

```bash
git -C "<APP>" add -A
git -C "<APP>" commit -m "feat: リスニングセクション（英仏・Part2/3/4風）を追加"
git -C "<APP>" push origin main
```
（コミット末尾に `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`）
Pages ビルド完了を待ち、公開URLでリスニングが動くことを1点確認。

- [ ] **Step 6: memory 更新と完了報告**

`project_toeic_webapp.md` に「リスニングセクション（英仏Set1各18問・Part2/3/4風・TTS順次再生話者切替・カテゴリ別苦手分析・*-listening-dataで別保存）追加（2026-07-11）」を追記。
スクリーンショットを添え、使い方と公開URL反映を報告。

---

## Self-Review メモ（計画作成者による確認）

- **Spec coverage**: 採点=Task1、データ基盤=Task2、英仏コンテンツ=Task3-4、UI/TTS/記録/分析=Task5、検証・公開=Task6。仕様書の各節に対応。
- **型整合**: `gradeQuestions`→`{results:[{questionId,category,chosen,correct}],correct,total,rate}`、記録 item=`{questionId,category,correct}`、`categoryStats` の入力（results[].items[]）が一貫。保存形式・キー・ID形式（`l\d+-p\d+-q\d+`）・カテゴリ6種・type3種が全タスクで一致。
- **spec との差分**: passage に `translation`（全文和訳）フィールドを追加（スクリプト表示用）。Task3/4 で全 passage に付与、Task5 UI で使用。整合テスト（Task2）では translation を必須にしていないが、UIが参照するため作成時に必須とする旨を明記済み。
- **非回帰**: 既存 MCQ・ディクテーションのファイルは不変。app.js は renderHome にボタン1つ追加のみ。index.html は screen とscript追加のみ。CSS は追記のみ。
- **Placeholder scan**: 各コード・テストは実体記載。データ本文（18問×2）は Task3/4 執筆内容だが、形式・件数・配分・例を明示。
