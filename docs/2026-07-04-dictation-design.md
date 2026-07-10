# ディクテーション練習機能 設計書

作成日: 2026-07-04
承認: ユーザー承認済み（2026-07-04）
前提: `2026-07-04-multisubject-design.md` の教科切替アプリへの機能追加

## 目的

音声を聞いて書き取るディクテーション練習を、英語（TOEIC教科）とフランス語で行えるようにする。
発音・リスニング能力を鍛えることが目的。実践的な検定対策である必要はない。

## 全体方針

- 既存の教科切替アプリに**自己完結モジュールとして追加**する。既存のMCQクイズ（BANK/Quiz/Analysis）には手を触れない（回帰リスクの最小化）。
- 音声はブラウザ標準の TTS（`speechSynthesis`）を使う。追加の音声ファイル・ネット接続・マイクは不要。
- マイクを使わないため、発音採点のようなセキュアコンテキスト制約はない。ただし音を出すため Safari/Chrome で開く（file:// で音が出ない場合はローカルサーバー経由）。

## ファイル構成

- Create `js/data/dictation/index.js` — ディクテーション教科レジストリ `DICT`
- Create `js/data/dictation/en.js` — 英語 Set を `DICT.toeic.sets` に登録
- Create `js/data/dictation/fr.js` — 仏語 Set を `DICT.french.sets` に登録
- Create `js/dictation.js` — 採点・差分ロジック（純粋関数）`Dictation`
- Create `js/dictation-ui.js` — 画面制御 `DictationUI`（TTS再生・入力・記録）
- Modify `index.html` — `#screen-dictation` セクションと script 追加
- Modify `js/app.js` — ホームのツールバーに「ディクテーション練習」ボタン（`DictationUI.open(BANK.activeId)` を呼ぶ）
- Modify `css/style.css` — 差分ハイライト等のスタイル

## データモデル

```js
// js/data/dictation/index.js
var DICT = {
  toeic:  { id: "toeic",  label: "TOEIC（英語）", lang: "en-US",
            storageKey: "toeic-dictation-data",  sets: {} },
  french: { id: "french", label: "フランス語",   lang: "fr-FR",
            storageKey: "french-dictation-data", sets: {} }
};

// 各教科は聞き取り観点カテゴリを持つ（苦手分析用）
DICT.toeic.categories = ["数字・時刻", "弱形・リンキング", "似た子音(l/r, b/v)",
  "前置詞・冠詞の聞き取り", "短母音・長母音", "文全体の聞き取り"];
DICT.french.categories = ["リエゾン・アンシェヌマン", "鼻母音", "数字",
  "é/è/e の綴り", "男性形・女性形の音差", "文全体の聞き取り"];

// 各 set
DICT.toeic.sets[1] = {
  id: 1, label: "Set 1（基礎）",
  items: [
    {
      id: "e1-1",
      text: "The meeting starts at nine.",   // 読み上げ＆正解の全文
      translation: "会議は9時に始まります。",   // 日本語訳
      blanks: [3, 4],                         // 空欄埋めモードで空欄にする語のindex（0始まり・空白区切り）
      category: "数字・時刻"                    // 聞き取り観点カテゴリ（その教科の categories のいずれか）
    }
    // ...
  ]
};
```

- 教科IDは MCQ 側の `toeic`/`french` と揃える（UIの一貫性のため。ただしデータ・保存は完全別）。
- `blanks` は空欄埋めモード専用。全文タイプモードでは使わない。
- `category` は苦手分析用。各教科 6 カテゴリのいずれか。各 Set 内でカテゴリが偏らないよう配分する。

## 出題モード（セット開始時に選択）

1. **空欄埋め**: 全文を聞いたあと、`blanks` で指定された語だけが入力欄になっている。その語だけタイプ。
2. **全文タイプ**: 聞いた文を全部タイプ。単語ごとに照合して色分け表示。

## 採点ロジック（`js/dictation.js` の `Dictation`）

方針: **意味が大まかに合っていればほぼ正解**（寛容なあいまい一致）。
アクサン違い・大文字小文字・句読点・軽微なタイプミスは正解扱いにする。

- `Dictation.normalize(s)` → 小文字化 → アクサン除去（NFD 正規化＋結合文字除去）→ 文字/数字以外を除去。
  例: `normalize("Café!")` === `"cafe"`。
- `Dictation.levenshtein(a, b)` → 標準の編集距離（DP）。
- `Dictation.wordMatch(target, typed)` → `"exact" | "close" | "wrong"`
  - `normalize` 後が完全一致 → 元の文字列（大小・アクサン・句読点込み）も同一なら `"exact"`、そうでなければ `"close"`。
  - それ以外で `levenshtein(nt, np) <= (nt.length <= 4 ? 1 : 2)` なら `"close"`。
  - どちらでもなければ `"wrong"`。
  - **`exact` と `close` はどちらも「正解」として得点にカウント**（`wrong` のみ不正解）。UIでは `close` を「惜しい（アクサン/軽微な違い）」と控えめに表示。
- `Dictation.gradeBlanks(item, answers)` → 各空欄の `{ index, target, typed, status }` と `{ correct, total, rate }`。
- `Dictation.gradeSentence(targetText, typedText)` → 全文モードの採点。
  - 両者を空白区切りでトークン化。
  - トークンの「等価」を `wordMatch(...) !== "wrong"` と定義して **LCS で整列**（語の抜け・挿入に耐える）。
  - 戻り値: `{ score, targetTokens: [{ text, status }], typedExtras: [余分にタイプされた語] }`。
    `status` は `exact | close | missed`（`missed` = 対応が取れなかった正解語）。
  - `score` = （`exact`＋`close` の語数）/（正解の語数）。
- 得点は割合（%）で表示。合否のような厳格な線引きはせず、正解文を必ず併記して自己確認できるようにする。

## 画面（`#screen-dictation`）

- **セット選択**: 教科タブ（英語/仏語、初期値は開いたときの教科）＋その教科の Set 一覧（受験回数・最高正答率）。
- **モード選択**: セット開始時に「空欄埋め / 全文タイプ」をラジオで選ぶ。
- **出題画面**（1文ずつ）:
  - ▶ 再生（何度でも）、🐢 ゆっくり再生（`utterance.rate = 0.6`）
  - 入力欄（空欄埋めは該当語のみ、全文タイプは1つのテキスト欄）
  - 「答え合わせ」→ 採点結果を色分け表示（`exact`=緑、`close`=薄い緑＋注記、`wrong`/`missed`=赤）、正解文と日本語訳を表示
  - 「答えを見る（リビール）」→ 採点前でも正解文＋訳を表示
  - 「次へ」→ 次の文（自動で1回再生）
- **結果画面**: セットの正答率（語ベース）、各文の一覧（○×と自分の入力）、「もう一度」「セット一覧へ」。
- **苦手分析画面**（セット選択画面から「苦手分析」ボタン）: カテゴリ別正答率（苦手順のバー）＋つまずいた語リスト。教科ごと。

採点結果からの `missedWords` の作り方: 全文タイプは `gradeSentence` の `targetTokens` で `status` が `missed`/`wrong` の語、空欄埋めは `gradeBlanks` で `wrong` の空欄の正解語を集める（いずれも正規化前の表記）。

## 音声（TTS）

- `DictationUI` が `speechSynthesis` を使用。`utterance.lang = DICT[subj].lang`。
- 声は各言語の非ノベルティ音声を自動選択（`Bad News` / `Boing` 等の遊び用音声を除外）。取れなければ既定音声。
- ゆっくり再生は `rate = 0.6`。通常は `1.0`。
- 音声が使えない環境（`speechSynthesis` 不在・音声0件）ではその旨を表示し、リビール中心で使えるようにする。

## 記録・データ

- ディクテーション成績は教科ごとに専用キー（`toeic-dictation-data` / `french-dictation-data`）で localStorage 保存。MCQ の成績・分析とは完全分離。
- 保存形式（苦手分析のため、文ごとの正誤と間違えた語も保存する）:
  ```js
  { version: 1, subject: "toeic",
    results: [
      { id: ISO, date: ISO, setId: 1, mode: "blanks"|"sentence",
        total: 20, correct: 16, rate: 0.80,
        items: [
          { itemId: "e1-1", category: "数字・時刻", correct: true,
            missedWords: [] },                       // その文で落とした語（normalize前の正解語）
          { itemId: "e1-2", category: "弱形・リンキング", correct: false,
            missedWords: ["would", "have"] }
        ] }
    ] }
  ```
- 文の `correct` 判定: その文の語正答率が一定以上（既定 80%）なら「その文は聞き取れた」とみなす。
- セット一覧に受験回数・最高正答率を表示。書き出し/読み込みは初期スコープ外（YAGNI）。

## 苦手分析（`Dictation` の集計関数）

分析画面はカテゴリ別と「つまずいた語」の両方を表示する。

- `Dictation.categoryStats(results, subjectId)` → 教科の各カテゴリについて `{ category, attempts, correct, rate }`。
  - `attempts` = そのカテゴリの文を解いた延べ数、`correct` = 文単位で聞き取れた数、`rate` = correct/attempts。
  - 正答率の低い順に並べれば苦手カテゴリになる（MCQ の弱点分析と同じ見せ方）。
- `Dictation.troubleWords(results, topN)` → 全 results の `missedWords` を集計し、`[{ word, count }]` を頻度降順で返す（既定 topN=20）。
  - 「よく落とす語」リストとして表示。語は正解側の表記（正規化前）で集計。
- 分析画面: カテゴリ別正答率バー（苦手順）＋つまずいた語リスト（回数つき）。データが無ければ「まだ記録がありません」。

## テスト（苦手分析ぶんの追加）

- `categoryStats`: 擬似 results から各カテゴリの attempts/correct/rate が正しく集計される。文単位判定の閾値（80%）が効く。
- `troubleWords`: 複数 results をまたいで missedWords が頻度集計され、降順で返る。topN で切られる。

## 初期コンテンツ

- 英語 Set 1（20文）、フランス語 Set 1（20文）。聞き取りやすい短めの文＋日本語訳。
- 空欄埋め用の `blanks` を各文に1〜3語指定（難易度制御）。
- 好評なら Set 2 以降を追加。

## テスト

- `Dictation` の純粋関数を Node のテストハーネス（`tests/run-tests.js`）で単体テスト:
  - `normalize` がアクサン・句読点・大小を除去する。
  - `wordMatch`: 完全一致=exact、アクサン違い=close、1文字タイプミス=close、無関係語=wrong。
  - `gradeSentence`: 完全一致=score 1、1語誤り<1、語の抜けは該当語 missed で他は整列一致。
  - `gradeBlanks`: 空欄ごとの正誤と rate。
  - データ整合: 各 item に text/translation があり、blanks の index が語数の範囲内。
- TTS・入力・リビールはブラウザで実機確認（音が鳴るかは最終的に実機で確認）。

## リスク

- **TTS の音質・声はOS/ブラウザ依存**。学習用途には十分だが完璧な発音見本ではない旨を理解して使う。
- **あいまい採点は「意味の正しさ」を真に判定しているわけではない**（編集距離ベースの近似）。正解文を必ず併記して自己確認できるようにすることで補う。
- 既存 MCQ を壊さないよう、共有するのは教科ID（文字列）と画面遷移の枠組みだけにとどめ、データ・保存・ロジックは独立させる。
