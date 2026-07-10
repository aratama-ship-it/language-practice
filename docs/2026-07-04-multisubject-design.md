# 教科切替化＋TOEIC上級セット＋フランス語版 設計書

作成日: 2026-07-04
承認: ユーザー承認済み（2026-07-04）
前提: `2026-07-03-toeic-webapp-design.md` / `2026-07-04-half-mode-design.md` のアプリへの拡張

## 目的

1. TOEIC に上級セット（Vol.7）を新作追加する。
2. アプリを「教科切替式」に汎用化し、フランス語（仏検風・初級）を第2教科として追加する。

作業順序: ①Vol.7 → ②汎用化（エンジン改修） → ③フランス語コンテンツ。
各段階でアプリは動作可能な状態を保つ。

---

## ① TOEIC 上級セット Vol.7

- ラベル: 「Vol.7 総合（上級・800点目標）」
- 構成: 既存踏襲。Part 5×20 + Part 6×4（1文書）+ Part 7×8（2文書）= 32問。10分版も自動付与される。
- 上級要素:
  - Part 5: 上級語彙（remuneration, stipulate, contingent, deferential 等）、仮定法、倒置、分詞構文、語法の細部
  - Part 6: 接続副詞・文脈依存の語彙選択、文挿入
  - Part 7: 推測型（NOT問題・言い換え・意図問題）中心
- カテゴリは既存7分類（前置詞・慣用表現／動詞の形・時制／品詞判断／構文・接続詞／語彙／文脈把握／読解）を流用。
- 問題・解答・解説はすべて新規作成（日本語解説）。過去問は使わない。
- 既存の `tests/run-tests.js` の EXPECTED_COUNTS に `7: 32` を追加し、190→222問で全整合を確認。

---

## ② アプリの汎用化（教科切替エンジン）

### 2-1. 教科レジストリ `js/subjects.js`

各教科の設定を1オブジェクトに集約する。エンジンはこれを読むだけにする。

```js
var SUBJECTS = {
  toeic: {
    id: "toeic",
    label: "TOEIC",
    storageKey: "toeic-app-data",   // 既存キーを維持 → 移行不要
    categories: ["前置詞・慣用表現", ...7分類],
    // vols は各 data ファイルが SUBJECTS.toeic.vols に登録
    vols: {},
    // 10分版の分割ラベル（Part 5=文法, それ以外=読解）は既定ルール
    halfMode: "part5split"
  },
  french: {
    id: "french",
    label: "フランス語",
    storageKey: "french-app-data",
    categories: ["動詞の活用", "冠詞・限定詞", "性数一致", "代名詞",
                 "前置詞", "語彙・会話表現", "読解"],
    vols: {},
    halfMode: "sectionsplit"        // section 1(文法20) / section 2+3(読解12)
  }
};
```

### 2-2. データ構造の変更

現行 `TOEIC_DATA` を教科横断の `BANK` に置き換える。各 vol データファイルは
自分の教科の vols に登録する。

```js
// js/data/bank.js（旧 index.js を置換）
var BANK = {
  subjects: SUBJECTS,
  activeId: "toeic",
  active: function () { return this.subjects[this.activeId]; },
  setActive: function (id) { this.activeId = id; },
  // 以下は「現在アクティブな教科」に対して働く
  categories: function () { return this.active().categories; },
  vols: function () { return this.active().vols; },
  allQuestions: function () { /* active().vols を平坦化 */ },
  getQuestion: function (qid) { /* active から検索。見つからなければ全教科横断で検索 */ },
  getPassage: function (pid) { /* 同上 */ }
};
```

- 後方互換のため、旧名 `TOEIC_DATA` はエイリアスにしない（全面的に BANK へ移行）。
  ただし各 vol データファイルの登録先を `SUBJECTS.toeic.vols[n] = {...}` に書き換える。
- 問題ID: TOEIC は既存の `v{n}-q{m}`（保存データ互換のため変更しない）。
  フランス語は `f{n}-q{m}` / 文書 `f{n}-p{m}`。教科プレフィックスで衝突回避。
- `getQuestion` は保存レコード（qid のみ保持）を解決できるよう、まずアクティブ教科、
  なければ全教科を横断検索する（教科をまたいでも解説表示が壊れない保険）。

### 2-3. 各モジュールの改修

- **storage.js**: `Storage2.KEY` を固定値から `BANK.active().storageKey` を返す動的取得に変更。
  教科切替で保存先が自動的に切り替わる。既存 TOEIC データはキー不変で維持。
- **quiz.js**: `TOEIC_DATA` 参照を `BANK` に置換。`halfSets` は `BANK.active().halfMode` で
  分割方式を決定（part5split / sectionsplit いずれも「Part5相当=文法／残り=読解」で同じロジックに帰着するため実装は共通化）。
- **analysis.js**: `TOEIC_DATA` 参照を `BANK` に置換。カテゴリは `BANK.categories()`。
  `sessionLabel` は教科非依存（vol.label と halfKey から生成）。
- **app.js**: ホーム上部に教科タブを追加。タブ切替で `BANK.setActive(id)` → `renderHome()`。
  カード・分析・復習はすべてアクティブ教科のデータで描画。

### 2-4. スクリプト読み込み順（index.html）

```
subjects.js → data/bank.js →
data/toeic/vol1..7.js → data/french/vol1..2.js →
storage.js → quiz.js → analysis.js → app.js
```

既存 `js/data/volN.js` は `js/data/toeic/volN.js` に移動し、登録先を
`SUBJECTS.toeic.vols[n]` に変更する。

### 2-5. テストの拡張

`tests/run-tests.js` を教科ループ化する。

```js
for (const subjId of ["toeic", "french"]) {
  BANK.setActive(subjId);
  // 問題数・ID形式・カテゴリ・解説・part 等の整合性を各教科で検証
}
```

- TOEIC 側の期待値は現状維持（222問）。フランス語は F1/F2 = 各32問 = 64問。
- ロジックテスト（quiz/analysis/storage/half）は教科切替を挟んで両教科で通ることを確認。

---

## ③ フランス語コンテンツ（仏検4級〜3級 / CEFR A2目安）

### 構成（TOEICと同じリズム）

各 Vol = 32問:
- 第1部「文法・語彙」短文4択 × 20（TOEIC Part 5 相当、10分版の「文法」）
- 第2部「文章穴埋め」× 4（1文書、Part 6 相当）
- 第3部「読解」× 8（2文書、Part 7 相当。10分版では第2部+第3部が「読解」）

part フィールドは仕組み流用のため 5/6/7 の数値をそのまま使う（内部的なセクション番号）。
UI 表示のセクション名は「第1部 文法・語彙」等に読み替える（subjects に表示名を持たせる）。

### レベル方針

- 軸は仏検4級、3級要素を混ぜる: 複合過去 vs 半過去、目的語人称代名詞（le/la/les/lui/leur）、
  近接未来・近接過去、疑問文の作り方、部分冠詞、比較級、代名動詞など。
- 選択肢は4つ。並べ替え・書き取りは4択に翻案（例: 正しい活用形を選ぶ、正しい語順の文を選ぶ）。
- リスニングは初期スコープ外。

### カテゴリ（弱点分析用・7分類）

動詞の活用 / 冠詞・限定詞 / 性数一致 / 代名詞 / 前置詞 / 語彙・会話表現 / 読解

### 初期コンテンツ

- Vol.F1「基礎総合」、Vol.F2「基礎総合」の2冊（64問）。
- 問題・解答・解説はすべて新規作成。解説は日本語。フランス語本文にはアクサン等を正しく付与。

---

## リスクと対処

- **最大リスク: 汎用化で TOEIC 側を壊す。** → 既存テストを全 green に保ったまま改修。
  TOEIC の保存キー・問題ID・カテゴリを一切変更しない。改修後にブラウザ通し検証。
- **仏検の「級」対応は近似。** 本番の合否予測には使えない旨を UI かドキュメントに明記。
- **フランス語の正確性**（活用・アクサン・冠詞）。→ 各問の解説で根拠を示し、自己レビューを1問ずつ行う。

## テスト方針（全体）

1. `node tests/run-tests.js` が両教科で ALL TESTS PASSED。
2. ブラウザ検証: 教科タブ切替、各教科の出題→採点→解説→分析→復習、10分版、
   TOEIC 既存データが切替後も保持されること、書き出し/読み込みが教科ごとに機能すること。
3. file:// で直接開いて動作すること（ES modules 不使用の維持）。
