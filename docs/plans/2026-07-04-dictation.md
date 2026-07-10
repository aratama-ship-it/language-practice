# ディクテーション練習機能 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans でタスク単位に実装する。ステップは checkbox（`- [ ]`）で追跡する。

**Goal:** 音声を聞いて書き取るディクテーション練習（英語・仏語、空欄埋め／全文タイプ、寛容採点、カテゴリ別＋つまずいた語の苦手分析）を、既存アプリに独立モジュールとして追加する。

**Architecture:** 純粋ロジック（採点・差分・集計）を `js/dictation.js` の `Dictation` に、UI・TTS・記録を `js/dictation-ui.js` の `DictationUI` に分離。問題データは `js/data/dictation/` に教科別登録。既存の MCQ（BANK/Quiz/Analysis/Storage2）には触れず、共有するのは教科ID文字列・`App.el`・画面枠だけ。

**Tech Stack:** Vanilla HTML/CSS/JS（ES modules・npm 不使用、file:// でも可）。音声はブラウザ `speechSynthesis`。テストは `node tests/run-tests.js`。

**Spec:** `../2026-07-04-dictation-design.md`

## Global Constraints

- 配置先: `/Users/arataurawa/Library/Mobile Documents/com~apple~CloudDocs/claude code files/app-dev/toeic-webapp/`（パスはここからの相対）
- **gitリポジトリではない**。各タスク末尾で `node tests/run-tests.js` が `ALL TESTS PASSED` を確認
- ES modules・fetch・npm依存・ビルド禁止。UI文言は日本語。仏語文はアクサンを正しく付与
- 既存 MCQ の挙動・保存キー・テストを一切変えない
- ディクテーション保存キー: `toeic-dictation-data` / `french-dictation-data`。データ版: `1`
- 採点は寛容: アクサン違い・大小・句読点・軽微なタイプミス（編集距離）は正解扱い
- 教科IDは `toeic` / `french`（MCQ と同じ文字列。データ・保存は別）
- 文単位「聞き取れた」判定閾値: 語正答率 **0.8 以上**
- スクリプト読み込み順（index.html、既存 app.js の直前に挿入）:
  `js/data/dictation/index.js → dictation/en.js → dictation/fr.js → js/dictation.js → js/dictation-ui.js`（app.js より前）

---

### Task 1: `Dictation` 採点・差分ロジック（データ無しで単体テスト）

**Files:**
- Create: `js/dictation.js`
- Modify: `tests/run-tests.js`（storage テストの直後、最終 console.log の前に追記）

**Interfaces:**
- Produces: グローバル `Dictation`
  - `Dictation.normalize(s)` → 小文字化・NFDでアクサン除去・文字/数字以外除去した文字列
  - `Dictation.levenshtein(a, b)` → 編集距離（整数）
  - `Dictation.wordMatch(target, typed)` → `"exact" | "close" | "wrong"`
  - `Dictation.tokenize(s)` → 空白区切りの語配列（空要素除去）
  - `Dictation.gradeBlanks(item, answers)` → `{ results: [{ index, target, typed, status }], correct, total, rate, missedWords }`（answers は `{ index: typedString }`）
  - `Dictation.gradeSentence(targetText, typedText)` → `{ score, targetTokens: [{ text, status }], typedExtras: [string], missedWords: [string] }`（status: `exact|close|missed`）
  - すべて `wordMatch` の `exact`/`close` を正解、`wrong`/`missed` を不正解として扱う

- [ ] **Step 1: テストを追記（失敗確認）**

`tests/run-tests.js` の storage ブロックの後（`console.log(failures === 0 ...` の直前）に追記:

```js
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
  // 短い語は許容1文字
  assert(Dict.wordMatch("cat", "car") === "close", "3文字1ミス=close");
  assert(Dict.wordMatch("cat", "dog") === "wrong", "3文字2ミス以上=wrong");

  const item = { id: "t1", text: "The meeting starts at nine.", blanks: [1, 4] };
  const gb = Dict.gradeBlanks(item, { 1: "meeting", 4: "nine" });
  assert(gb.correct === 2 && gb.total === 2 && gb.rate === 1, "空欄全正解");
  const gb2 = Dict.gradeBlanks(item, { 1: "meating", 4: "five" });
  assert(gb2.correct === 1, "空欄: closeは正解, 無関係は不正解");
  assert(gb2.missedWords.length === 1 && gb2.missedWords[0] === "nine", "空欄の落とし語");

  const gs = Dict.gradeSentence("the cat is black", "the cat is black");
  assert(gs.score === 1, "全文一致 score 1");
  const gs2 = Dict.gradeSentence("the cat is black", "the dog is black");
  assert(gs2.score === 0.75, "1語誤り score 0.75");
  assert(gs2.missedWords.indexOf("cat") >= 0, "誤り語 cat が落とし語");
  // 語の抜け（typed に is が無い）でも他は整列一致
  const gs3 = Dict.gradeSentence("the cat is black", "the cat black");
  assert(gs3.targetTokens.filter(t => t.status !== "missed").length === 3, "抜けても3語は一致");
  assert(gs3.missedWords.indexOf("is") >= 0, "抜けた is が落とし語");
}
```

Run: `node tests/run-tests.js`
Expected: `FAIL [dictation-logic] Dictation が定義されている` で exit 1

- [ ] **Step 2: `js/dictation.js` を実装**

```js
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
    var nT = T.map(function (w) { return self.normalize(w); });
    var nP = P.map(function (w) { return self.normalize(w); });
    // LCS DP（等価 = wordMatch !== "wrong"）
    var m = T.length, n = P.length, i, j;
    var dp = [];
    for (i = 0; i <= m; i++) { dp[i] = []; for (j = 0; j <= n; j++) dp[i][j] = 0; }
    function eq(a, b) { return self.wordMatch(a, b) !== "wrong"; }
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) {
      dp[i][j] = eq(T[i - 1], P[j - 1])
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
    // バックトラックで対応を復元
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
        var st = self.wordMatch(T[i], matchedT[i]); // exact or close
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
  }
};
```

- [ ] **Step 3: テスト実行**

Run: `node tests/run-tests.js`
Expected: `ALL TESTS PASSED`

### Task 2: ディクテーション・データ基盤とテスト（`DICT` ＋整合性チェック）

**Files:**
- Create: `js/data/dictation/index.js`
- Modify: `tests/run-tests.js`（dictation-logic の直後に追記）

**Interfaces:**
- Consumes: なし
- Produces: グローバル `DICT`
  - `DICT.toeic` / `DICT.french` = `{ id, label, lang, storageKey, categories: string[6], sets: {} }`
  - `DICT.ids()` → `["toeic","french"]`
  - `DICT.allItems(subjectId)` → その教科の全 item を平坦配列で返す（set昇順→item順）

- [ ] **Step 1: テストを追記（失敗確認）**

dictation-logic ブロックの直後に追記:
```js
// ---- dictation data ----
["js/data/dictation/index.js", "js/data/dictation/en.js", "js/data/dictation/fr.js"]
  .forEach(f => { if (fs.existsSync(path.join(root, f))) load(f); });
const DICT = ctx.DICT;
section("dictation-data");
assert(DICT, "DICT が定義されている");
const DICT_EXPECT = { toeic: 20, french: 20 }; // 各教科の総item数（Set合計）
if (DICT) {
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
```

Run: `node tests/run-tests.js`
Expected: `FAIL [dictation-data] DICT が定義されている` で exit 1（en/fr 未作成のため以後も赤）

- [ ] **Step 2: `js/data/dictation/index.js` を実装**

```js
// ディクテーション教科レジストリ。dictation/en.js・fr.js より先に読み込む。
var DICT = {
  toeic: {
    id: "toeic", label: "TOEIC（英語）", lang: "en-US", storageKey: "toeic-dictation-data",
    categories: ["数字・時刻", "弱形・リンキング", "似た子音(l/r, b/v)",
      "前置詞・冠詞の聞き取り", "短母音・長母音", "文全体の聞き取り"],
    sets: {}
  },
  french: {
    id: "french", label: "フランス語", lang: "fr-FR", storageKey: "french-dictation-data",
    categories: ["リエゾン・アンシェヌマン", "鼻母音", "数字",
      "é/è/e の綴り", "男性形・女性形の音差", "文全体の聞き取り"],
    sets: {}
  },
  ids: function () { var o = []; for (var k in this) if (this[k] && this[k].sets) o.push(k); return o; },
  allItems: function (subjectId) {
    var subj = this[subjectId];
    var out = [];
    var sids = Object.keys(subj.sets).map(Number).sort(function (a, b) { return a - b; });
    for (var i = 0; i < sids.length; i++) out = out.concat(subj.sets[sids[i]].items);
    return out;
  }
};
```

- [ ] **Step 3: テスト実行（データ本体は次タスクなので赤のまま確認）**

Run: `node tests/run-tests.js`
Expected: `FAIL [dictation-data] toeic は20文（実際: 0）` 等。`DICT が定義されている` は消える。

### Task 3: 英語ディクテーション Set 1（20文）

**Files:**
- Create: `js/data/dictation/en.js`

**Interfaces:**
- Consumes: `DICT`
- Produces: `DICT.toeic.sets[1] = { id: 1, label: "Set 1（基礎）", items: [20件] }`

- [ ] **Step 1: `js/data/dictation/en.js` を作成する（20文）**

各 item: `{ id: "e1-N", text, translation, blanks: [語index], category }`。
- text は短めの平易な文（5〜10語程度）。translation は日本語訳。
- blanks は 1〜3語、聞き取りの要になる語（数字・前置詞・弱形など）を指定。
- category は `DICT.toeic.categories` の6種を偏りなく配分（各カテゴリ3〜4文）。

例:
```js
DICT.toeic.sets[1] = {
  id: 1, label: "Set 1（基礎）",
  items: [
    { id: "e1-1", text: "The meeting starts at nine.", translation: "会議は9時に始まります。",
      blanks: [4], category: "数字・時刻" },
    { id: "e1-2", text: "I would have called you earlier.", translation: "もっと早く電話すればよかった。",
      blanks: [1, 2], category: "弱形・リンキング" }
    // ... 計20文（各カテゴリを配分）
  ]
};
```

- [ ] **Step 2: テスト実行**

Run: `node tests/run-tests.js`
Expected: `FAIL [dictation-data] french は20文（実際: 0）` のみ残る（toeic 側は緑）。

### Task 4: フランス語ディクテーション Set 1（20文）

**Files:**
- Create: `js/data/dictation/fr.js`

**Interfaces:**
- Produces: `DICT.french.sets[1] = { id: 1, label: "Set 1（基礎）", items: [20件] }`

- [ ] **Step 1: `js/data/dictation/fr.js` を作成する（20文）**

形式は Task 3 と同一。id は `f1-N`。text は仏語（アクサン正確に）。category は `DICT.french.categories` の6種を配分。
例:
```js
DICT.french.sets[1] = {
  id: 1, label: "Set 1（基礎）",
  items: [
    { id: "f1-1", text: "Il y a trois enfants.", translation: "子どもが3人います。",
      blanks: [3], category: "数字" },
    { id: "f1-2", text: "Nous allons au cinéma.", translation: "私たちは映画館へ行きます。",
      blanks: [1, 2], category: "リエゾン・アンシェヌマン" }
    // ... 計20文
  ]
};
```

- [ ] **Step 2: テスト実行**

Run: `node tests/run-tests.js`
Expected: `ALL TESTS PASSED`（英仏 各20文で整合）

### Task 5: 苦手分析の集計関数 `categoryStats` / `troubleWords`

**Files:**
- Modify: `js/dictation.js`, `tests/run-tests.js`（dictation-data の直後に追記）

**Interfaces:**
- Consumes: `DICT`
- Produces:
  - `Dictation.categoryStats(results, subjectId)` → その教科の各カテゴリ `[{ category, attempts, correct, rate }]`（attempts 0 は rate null）。results は保存レコード配列（`{ items: [{ category, correct }] }` を含む）
  - `Dictation.troubleWords(results, topN)` → `[{ word, count }]`（全 results の `items[].missedWords` を頻度降順。既定 topN=20）

- [ ] **Step 1: テストを追記（失敗確認）**

dictation-data ブロックの直後に追記:
```js
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
```

Run: `node tests/run-tests.js`
Expected: `FAIL [dictation-stats] ...` で exit 1

- [ ] **Step 2: `js/dictation.js` に追記**

`Dictation` オブジェクトの末尾（`gradeSentence` の後、閉じ `}` の前）に追加:
```js
  ,
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
```

- [ ] **Step 3: テスト実行**

Run: `node tests/run-tests.js`
Expected: `ALL TESTS PASSED`

### Task 6: `DictationUI`（画面・TTS・記録）

**Files:**
- Create: `js/dictation-ui.js`
- Modify: `index.html`（`#screen-dictation` セクション＋script追加）, `js/app.js`（ホームにボタン）, `css/style.css`

**Interfaces:**
- Consumes: `DICT`, `Dictation`, `App.el`, `App.clear`, `App.showScreen`
- Produces: グローバル `DictationUI`
  - `DictationUI.open(subjectId)` → セット選択画面を描画し `App.showScreen("dictation")`
  - 内部: `_store(subjectId)`（load/save）, TTS 再生（通常/ゆっくり）, セッション進行, 結果保存, 苦手分析画面

- [ ] **Step 1: index.html に screen と script を追加する**

`<section id="screen-analysis" class="screen hidden"></section>` の直後に追加:
```html
    <section id="screen-dictation" class="screen hidden"></section>
```
`<script src="js/analysis.js"></script>` の直後（app.js より前）に追加:
```html
  <script src="js/data/dictation/index.js"></script>
  <script src="js/data/dictation/en.js"></script>
  <script src="js/data/dictation/fr.js"></script>
  <script src="js/dictation.js"></script>
  <script src="js/dictation-ui.js"></script>
```

- [ ] **Step 2: `js/dictation-ui.js` を実装**

```js
// ディクテーション画面・TTS・記録
var DictationUI = {
  subjectId: "toeic",
  setId: null,
  mode: "blanks",       // "blanks" | "sentence"
  items: [],
  index: 0,
  answers: [],          // 各文の採点結果を貯める
  el: function () { return App.el.apply(App, arguments); },

  // ---- 記録 ----
  _load: function (subjectId) {
    try {
      var raw = localStorage.getItem(DICT[subjectId].storageKey);
      if (!raw) return { version: 1, subject: subjectId, results: [] };
      var d = JSON.parse(raw);
      if (!d || d.version !== 1 || !Array.isArray(d.results)) return { version: 1, subject: subjectId, results: [] };
      return d;
    } catch (e) { return { version: 1, subject: subjectId, results: [] }; }
  },
  _save: function (subjectId, data) {
    try { localStorage.setItem(DICT[subjectId].storageKey, JSON.stringify(data)); return true; }
    catch (e) { return false; }
  },

  // ---- TTS ----
  _pickVoice: function (lang) {
    if (!window.speechSynthesis) return null;
    var voices = window.speechSynthesis.getVoices();
    var bad = /Bad News|Bahh|Boing|Bubbles|Cellos|Trinoids|Zarvox|Wobble|Whisper|Organ|Jester|Superstar|Good News|Pipe|Albert/i;
    var base = lang.slice(0, 2);
    var cands = voices.filter(function (v) { return v.lang && v.lang.slice(0, 2) === base; });
    var good = cands.filter(function (v) { return !bad.test(v.name); });
    return (good[0] || cands[0] || null);
  },
  speak: function (text, slow) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = DICT[this.subjectId].lang;
    var v = this._pickVoice(u.lang);
    if (v) u.voice = v;
    u.rate = slow ? 0.6 : 1.0;
    window.speechSynthesis.speak(u);
  },

  // ---- セット選択画面 ----
  open: function (subjectId) {
    this.subjectId = subjectId || "toeic";
    this.renderSetList();
    App.showScreen("dictation");
  },
  renderSetList: function () {
    var self = this;
    var root = document.getElementById("screen-dictation");
    App.clear(root);
    var subj = DICT[this.subjectId];
    var store = this._load(this.subjectId);

    // 教科タブ
    var tabs = this.el("div", { class: "subject-tabs" });
    DICT.ids().forEach(function (id) {
      tabs.appendChild(self.el("button", {
        class: "subject-tab" + (id === self.subjectId ? " active" : ""),
        text: DICT[id].label,
        onclick: function () { self.open(id); }
      }));
    });
    root.appendChild(tabs);
    root.appendChild(this.el("h1", { text: "ディクテーション" }));

    var ttsOff = !window.speechSynthesis || window.speechSynthesis.getVoices().length === 0;
    if (ttsOff) {
      root.appendChild(this.el("p", { class: "subtitle",
        text: "⚠ この環境では音声が使えないかもしれません。答えを見る機能は使えます。" }));
    }

    Object.keys(subj.sets).map(Number).sort(function (a, b) { return a - b; }).forEach(function (sid) {
      var set = subj.sets[sid];
      var runs = store.results.filter(function (r) { return r.setId === sid; });
      var best = runs.reduce(function (mx, r) { return Math.max(mx, Math.round(r.rate * 100)); }, 0);
      var meta = set.items.length + "文 ・ 受験 " + runs.length + "回" + (runs.length ? " ・ 最高 " + best + "%" : "");
      root.appendChild(self.el("div", { class: "card" }, [
        self.el("h3", { text: set.label }),
        self.el("div", { class: "meta", text: meta }),
        self.el("div", { class: "row" }, [
          "モード：",
          self.el("button", { text: "空欄埋め", onclick: function () { self.start(sid, "blanks"); } }),
          self.el("button", { text: "全文タイプ", onclick: function () { self.start(sid, "sentence"); } })
        ])
      ]));
    });

    root.appendChild(this.el("div", { class: "toolbar" }, [
      this.el("button", { text: "苦手分析", onclick: function () { self.renderAnalysis(); } }),
      this.el("button", { text: "メニューに戻る", onclick: function () { App.goHome(); } })
    ]));
  },

  // ---- セッション ----
  start: function (setId, mode) {
    this.setId = setId; this.mode = mode;
    this.items = DICT[this.subjectId].sets[setId].items.slice();
    this.index = 0; this.answers = [];
    this.renderItem();
  },
  renderItem: function () {
    var self = this;
    var root = document.getElementById("screen-dictation");
    App.clear(root);
    var item = this.items[this.index];

    root.appendChild(this.el("div", { class: "test-header" }, [
      this.el("span", { class: "progress", text: (this.index + 1) + " / " + this.items.length }),
      this.el("button", { text: "やめる", onclick: function () { self.renderSetList(); } })
    ]));

    root.appendChild(this.el("div", { class: "row" }, [
      this.el("button", { class: "primary", text: "▶ 再生", onclick: function () { self.speak(item.text, false); } }),
      this.el("button", { text: "🐢 ゆっくり", onclick: function () { self.speak(item.text, true); } })
    ]));

    var inputArea = this.el("div", { id: "dict-input" });
    if (this.mode === "blanks") {
      var words = Dictation.tokenize(item.text);
      var line = this.el("div", { class: "dict-blank-line" });
      words.forEach(function (w, i) {
        if (item.blanks.indexOf(i) >= 0) {
          line.appendChild(self.el("input", { type: "text", class: "dict-blank", "data-idx": i, autocomplete: "off" }));
        } else {
          line.appendChild(self.el("span", { class: "dict-word", text: w + " " }));
        }
      });
      inputArea.appendChild(line);
    } else {
      inputArea.appendChild(this.el("textarea", { id: "dict-sentence", rows: "2", placeholder: "聞こえた文を入力" }));
    }
    root.appendChild(inputArea);

    root.appendChild(this.el("div", { id: "dict-feedback" }));

    root.appendChild(this.el("div", { class: "test-footer" }, [
      this.el("button", { text: "答えを見る", onclick: function () { self.reveal(item); } }),
      this.el("button", { class: "primary", text: "答え合わせ", onclick: function () { self.check(item); } })
    ]));

    // 自動で1回再生
    this.speak(item.text, false);
  },
  reveal: function (item) {
    var fb = document.getElementById("dict-feedback");
    App.clear(fb);
    fb.appendChild(this.el("div", { class: "explanation" }, [
      this.el("div", { text: item.text }),
      this.el("div", { class: "subtitle", text: item.translation })
    ]));
  },
  check: function (item) {
    var self = this;
    var graded, missedWords, rate;
    if (this.mode === "blanks") {
      var answers = {};
      document.querySelectorAll("#dict-input .dict-blank").forEach(function (inp) {
        answers[Number(inp.getAttribute("data-idx"))] = inp.value;
      });
      graded = Dictation.gradeBlanks(item, answers);
      rate = graded.rate; missedWords = graded.missedWords;
    } else {
      var typed = (document.getElementById("dict-sentence").value || "");
      graded = Dictation.gradeSentence(item.text, typed);
      rate = graded.score; missedWords = graded.missedWords;
    }
    var correct = rate >= 0.8;
    this.answers.push({ itemId: item.id, category: item.category, correct: correct, missedWords: missedWords });

    // フィードバック表示（正解文を語ごとに色分け）
    var fb = document.getElementById("dict-feedback");
    App.clear(fb);
    var line = this.el("div", { class: "dict-result-line" });
    if (this.mode === "sentence") {
      graded.targetTokens.forEach(function (t) {
        var cls = t.status === "exact" ? "correct" : (t.status === "close" ? "dict-close" : "wrong");
        line.appendChild(self.el("span", { class: "dict-word " + cls, text: t.text + " " }));
      });
    } else {
      var words = Dictation.tokenize(item.text);
      var byIdx = {};
      graded.results.forEach(function (r) { byIdx[r.index] = r.status; });
      words.forEach(function (w, i) {
        var cls = "dict-word";
        if (byIdx.hasOwnProperty(i)) cls += byIdx[i] === "exact" ? " correct" : (byIdx[i] === "close" ? " dict-close" : " wrong");
        line.appendChild(self.el("span", { class: cls, text: w + " " }));
      });
    }
    fb.appendChild(line);
    fb.appendChild(this.el("div", { class: "score-line " + (correct ? "correct" : "wrong"),
      text: (correct ? "○ " : "× ") + Math.round(rate * 100) + "%" }));
    fb.appendChild(this.el("div", { class: "subtitle", text: "訳: " + item.translation }));

    // フッターを「次へ」に差し替え
    var footer = document.querySelector("#screen-dictation .test-footer");
    App.clear(footer);
    var isLast = this.index === this.items.length - 1;
    footer.appendChild(this.el("button", { class: "primary", text: isLast ? "結果を見る" : "次へ →",
      onclick: function () { self.next(); } }));
  },
  next: function () {
    if (this.index < this.items.length - 1) { this.index++; this.renderItem(); }
    else { this.finish(); }
  },
  finish: function () {
    var total = this.answers.length;
    var correct = this.answers.filter(function (a) { return a.correct; }).length;
    var iso = new Date().toISOString();
    var record = { id: iso, date: iso, setId: this.setId, mode: this.mode,
      total: total, correct: correct, rate: total ? correct / total : 0, items: this.answers };
    var store = this._load(this.subjectId);
    store.results.push(record);
    this._save(this.subjectId, store);
    this.renderResult(record);
  },
  renderResult: function (record) {
    var self = this;
    var root = document.getElementById("screen-dictation");
    App.clear(root);
    root.appendChild(this.el("h1", { text: "結果" }));
    root.appendChild(this.el("div", { class: "card" }, [
      this.el("div", { class: "score-big", text: record.correct + " / " + record.total + "文 聞き取れました（" + Math.round(record.rate * 100) + "%）" })
    ]));
    root.appendChild(this.el("div", { class: "toolbar" }, [
      this.el("button", { class: "primary", text: "もう一度", onclick: function () { self.start(record.setId, record.mode); } }),
      this.el("button", { text: "セット一覧へ", onclick: function () { self.renderSetList(); } })
    ]));
  },

  // ---- 苦手分析 ----
  renderAnalysis: function () {
    var self = this;
    var root = document.getElementById("screen-dictation");
    App.clear(root);
    var store = this._load(this.subjectId);
    root.appendChild(this.el("h1", { text: "苦手分析（" + DICT[this.subjectId].label + "）" }));

    if (store.results.length === 0) {
      root.appendChild(this.el("div", { class: "card" }, [this.el("p", { text: "まだ記録がありません。" })]));
    } else {
      var cs = Dictation.categoryStats(store.results, this.subjectId)
        .filter(function (c) { return c.attempts > 0; })
        .sort(function (a, b) { return a.rate - b.rate; });
      var catCard = this.el("div", { class: "card" }, [this.el("h2", { text: "カテゴリ別正答率（苦手順）" })]);
      cs.forEach(function (c) {
        var pct = Math.round(c.rate * 100);
        var fill = self.el("span", { class: "bar-fill" });
        fill.style.width = pct + "%";
        catCard.appendChild(self.el("div", { class: "bar-row" }, [
          self.el("span", { class: "bar-label", text: c.category }),
          self.el("span", { class: "bar-track" }, [fill]),
          self.el("span", { class: "bar-value", text: c.correct + "/" + c.attempts + " " + pct + "%" })
        ]));
      });
      root.appendChild(catCard);

      var tw = Dictation.troubleWords(store.results, 20);
      var twCard = this.el("div", { class: "card" }, [this.el("h2", { text: "よくつまずく語" })]);
      if (tw.length === 0) twCard.appendChild(this.el("p", { class: "subtitle", text: "なし" }));
      tw.forEach(function (t) {
        twCard.appendChild(self.el("div", { class: "bar-row" }, [
          self.el("span", { class: "bar-label", text: t.word }),
          self.el("span", { class: "bar-value", text: t.count + "回" })
        ]));
      });
      root.appendChild(twCard);
    }
    root.appendChild(this.el("div", { class: "toolbar" }, [
      this.el("button", { text: "セット一覧へ", onclick: function () { self.renderSetList(); } })
    ]));
  }
};
```

- [ ] **Step 3: ホームに「ディクテーション練習」ボタンを追加する**

`js/app.js` の renderHome のツールバー（既存の4ボタン）に1つ追加。
- 変更前:
```js
      this.el("button", { text: "成績分析", onclick: function () { self.openAnalysis(); } }),
```
- 変更後:
```js
      this.el("button", { text: "成績分析", onclick: function () { self.openAnalysis(); } }),
      this.el("button", { text: "ディクテーション練習", onclick: function () { DictationUI.open(BANK.activeId); } }),
```

- [ ] **Step 4: CSS を追加する**

`css/style.css` 末尾に追加:
```css
.dict-blank { width: 7em; margin: 0 4px; padding: 4px 6px; }
.dict-blank-line, .dict-result-line { line-height: 2.2; font-size: 16px; margin: 12px 0; }
.dict-word { white-space: pre; }
.dict-close { color: #b26a00; }          /* 惜しい（アクサン/軽微な違い） */
.score-line { font-size: 20px; font-weight: 700; margin: 8px 0; }
#dict-sentence { width: 100%; font: inherit; padding: 10px; border-radius: 8px; border: 1px solid var(--line); }
```

- [ ] **Step 5: 回帰テストと構文チェック**

Run: `node tests/run-tests.js`
Expected: `ALL TESTS PASSED`

Run: `node --check js/dictation-ui.js && node --check js/app.js`
Expected: 出力なし（exit 0）

### Task 7: ブラウザ検証と総合確認

**Files:** なし（検証のみ）＋ memory 更新

- [ ] **Step 1: 全テスト**

Run: `node tests/run-tests.js`
Expected: `ALL TESTS PASSED`

- [ ] **Step 2: ブラウザ検証**（preview ツール）
  1. ホーム（TOEIC）→「ディクテーション練習」→ セット一覧が出る（教科タブ・Set 1）
  2. 「空欄埋め」開始 → 空欄入力欄が出る、▶再生で `speechSynthesis` が発話状態になる（preview_eval で `speechSynthesis.speaking` を確認）、🐢ゆっくりで `rate` が下がることを確認
  3. 空欄に正解（一部わざとアクサン違い/1文字ミス）→「答え合わせ」→ close が緑系、正答率表示、「次へ」に切替
  4. 最後まで進み「結果を見る」→ 記録保存 → セット一覧の受験回数が増える
  5. 「全文タイプ」で1文、わざと1語違えて採点 → 語の色分けが出る
  6. 「苦手分析」→ カテゴリ別バーと「よくつまずく語」が出る
  7. 教科タブでフランス語へ → 仏語セットが出て同様に動く。フランス語の記録が英語と混ざらない（別キー）ことを preview_eval で確認
  8. preview_console_logs でエラーゼロ、preview_resize モバイル(375px)で崩れない

- [ ] **Step 3: 既存 MCQ の非回帰確認**

TOEIC/フランス語のクイズ（Vol選択→採点）が従来通り動き、ディクテーション用キーと別に保存されていることを確認。

- [ ] **Step 4: 検証データの消去**

preview_eval: `["toeic-app-data","french-app-data","toeic-dictation-data","french-dictation-data"].forEach(k=>localStorage.removeItem(k)); location.reload();`

- [ ] **Step 5: memory 更新**

`project_toeic_webapp.md` に「ディクテーション練習（英仏・空欄埋め/全文タイプ・寛容採点・カテゴリ別＋つまずいた語の苦手分析）追加。成績は *-dictation-data キーで別保存（2026-07-04）」を追記。

- [ ] **Step 6: 完了報告**

スクリーンショットを添え、使い方（ホーム→ディクテーション練習→モード選択）、音は Safari/Chrome で確認する旨、採点は寛容で正解文を併記する旨を報告。

---

## Self-Review メモ（計画作成者による確認）

- **Spec coverage**: 採点=Task1、データ基盤=Task2、英仏コンテンツ=Task3-4、苦手分析集計=Task5、UI/TTS/記録/分析画面=Task6、検証=Task7。仕様書の各節に対応。
- **Placeholder scan**: 各コード・テストは実体を記載。データ本文（20文×2）は Task3/4 で執筆する内容だが、形式・件数・カテゴリ配分・例を明示。
- **型整合**: `gradeSentence`→`{score,targetTokens,typedExtras,missedWords}`、`gradeBlanks`→`{results,correct,total,rate,missedWords}`、記録 item=`{itemId,category,correct,missedWords}`、`categoryStats`/`troubleWords` の入力（results[].items[]）が一貫。閾値0.8は check() と一致。DICT のキー・categories(6)・storageKey は全タスクで一致。
- **非回帰**: 既存 MCQ ファイル（BANK/Quiz/Analysis/Storage2）は不変。app.js は renderHome にボタン1つ追加のみ。index.html は screen とscript追加のみ。
