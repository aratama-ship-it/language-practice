# リスニングセクション 設計書

作成日: 2026-07-11
承認: ユーザー承認済み（2026-07-11）
前提: 教科切替アプリ（`2026-07-04-multisubject-design.md`）＋ディクテーション（`2026-07-04-dictation-design.md`）への機能追加

## 目的

TOEIC Part2/3/4 風のリスニング練習を、英語・フランス語で行えるようにする。
「聞いて内容を理解し、設問に答える」実践力を鍛える。本番の半分を占めるリスニング領域を埋める。

## 全体方針

- 既存のクイズ（BANK/Quiz/Analysis/Storage2）・ディクテーション（DICT/Dictation/DictationUI）には
  一切触れない**独立モジュール**として追加する（回帰リスク最小化）。
- 音声はブラウザ TTS（`speechSynthesis`）。追加音声ファイル・ネット・マイクは不要。
- ディクテーションと同じ作法（教科タブ・教科別 localStorage・JSON書き出し/読み込み）を踏襲する。
- 位置づけ: TTS会話は生音声ほど自然でないため「内容理解・設問対応の練習」と割り切る
  （生音のリンキング等はシャドーイング側で補完）。

## ファイル構成

- Create `js/data/listening/index.js` — リスニング教科レジストリ `LISTEN`
- Create `js/data/listening/en.js` — 英語 Set を `LISTEN.toeic.sets` に登録
- Create `js/data/listening/fr.js` — 仏語 Set を `LISTEN.french.sets` に登録
- Create `js/listening.js` — 採点・集計ロジック（純粋関数）`Listening`
- Create `js/listening-ui.js` — 画面制御 `ListeningUI`（TTS順次再生・解答・記録）
- Modify `index.html` — `#screen-listening` セクション＋script 追加
- Modify `js/app.js` — ホームのツールバーに「リスニング」ボタン（`ListeningUI.open(BANK.activeId)`）
- Modify `css/style.css` — スクリプト/話者表示など

## データモデル

```js
// js/data/listening/index.js
var LISTEN = {
  toeic:  { id: "toeic",  label: "TOEIC（英語）", lang: "en-US",
            storageKey: "toeic-listening-data",  categories: [...6], sets: {} },
  french: { id: "french", label: "フランス語",   lang: "fr-FR",
            storageKey: "french-listening-data", categories: [...6], sets: {} }
};
```

パッセージ（＝1つの音声のかたまり）を単位にする。type で3形式を表す。

```js
LISTEN.toeic.sets[1] = {
  id: 1, label: "Set 1（基礎）",
  passages: [
    {
      id: "l1-p1",
      type: "qa",             // "qa"(Part2) | "conversation"(Part3) | "talk"(Part4)
      lines: [ { speaker: "M", text: "Where did you put the quarterly report?" } ],
      questions: [
        { id: "l1-p1-q1", q: "最も適切な応答を選んでください。",
          choices: [
            "It's on your desk.",
            "At three o'clock.",
            "Yes, I reported it."
          ],
          answer: 0, category: "応答選択" }
      ]
    },
    {
      id: "l1-p2",
      type: "conversation",
      lines: [
        { speaker: "W", text: "Hi, I'd like to return this jacket. It's too small." },
        { speaker: "M", text: "Of course. Do you have the receipt with you?" },
        { speaker: "W", text: "Yes, here it is. Can I exchange it for a larger size?" }
      ],
      questions: [
        { id: "l1-p2-q1", q: "Why is the woman at the store?",
          choices: ["To buy a new jacket", "To return an item", "To apply for a job", "To get a refund on shoes"],
          answer: 1, category: "目的・概要" },
        { id: "l1-p2-q2", q: "What does the man ask for?",
          choices: ["A credit card", "A receipt", "A membership card", "An ID"],
          answer: 1, category: "詳細" }
      ]
    }
    // talk（Part4）も同形式で lines は単一話者の複数行
  ]
};
```

- `type`: `qa`=Part2（応答選択・選択肢3つ・設問1つ）、`conversation`=Part3（複数話者・四択・2〜3問）、
  `talk`=Part4（単一話者モノローグ・四択・2〜3問）。
- `lines`: 読み上げる台詞。`speaker` は話者ラベル（例 "M"/"W"/"A"/"B"、単一話者は "N"）。
- `questions[].choices`: qa は3つ、conversation/talk は4つ。`answer` は 0 始まりの正解インデックス。
- `category`: 苦手分析用。各教科 6 カテゴリのいずれか。
- 問題ID: `l{set}-p{passage}-q{n}`（教科プレフィックスは付けない。教科は保存キーで分離）。

### カテゴリ（苦手分析用・6種）

英語・仏語とも共通の観点でよい（言語非依存の聞き取り観点）:
`応答選択 / 目的・概要 / 詳細 / 言い換え・推測 / 次の行動・依頼 / 話し手・場面`

## 音声再生（TTS 順次再生・話者切替）

- `ListeningUI.playPassage(passage, slow)`:
  - `speechSynthesis.cancel()` 後、`lines` を先頭から順に読み上げる。各 utterance の `onend` で次の行へ連鎖。
  - 話者ラベル → 声のマッピング: その言語の非ノベルティ音声から最大2声を選び、ラベルごとに割り当てる
    （2話者なら別々の声、単一話者は1声）。取得できなければ既定音声。
  - `slow` のとき全 utterance の `rate = 0.7`、通常は `1.0`。
  - 再生は何度でも可（学習優先）。
- 音声が使えない環境（`speechSynthesis` 不在）は警告を出し、スクリプト表示中心で使えるようにする。

## 出題フロー（1パッセージずつ）

1. スクリプト非表示。「▶ 再生 / 🐢 ゆっくり」（開いたら自動で1回再生）。
2. そのパッセージの設問を表示（Part3/4 は2〜3問を同一画面）。各設問は文字ボタン（qa は3択、他は4択）。
3. 「答え合わせ」→ パッセージ内の全設問を採点。
   スクリプト（話者ラベル＋原文＋日本語訳）と、各設問の正誤・簡単な解説を表示。
4. 「次へ」→ 次のパッセージ。最後は「結果を見る」。

## 採点・記録・苦手分析

- 採点は四択/三択の完全一致。`Listening.gradeQuestions(questions, answers)` → `{ results, correct, total, rate }`。
- セット完了で記録を保存:
  ```js
  { version: 1, subject: "toeic",
    results: [ { id: ISO, date: ISO, setId: 1, total: 18, correct: 14, rate: 0.78,
                 items: [ { questionId: "l1-p1-q1", category: "応答選択", correct: true } ] } ] }
  ```
- `Listening.categoryStats(results, subjectId)` → 6カテゴリの `{ category, attempts, correct, rate }`（attempts 0 は rate null）。
  分析画面で正答率の低い順（苦手順）に表示＋セッション履歴。
- 教科別 localStorage キー（`toeic-listening-data` / `french-listening-data`）で分離保存。
  JSON 書き出し/読み込み（教科スタンプ付きガード）をディクテーションと同じ作法で用意。

## 画面（`#screen-listening`）

- **セット選択**: 教科タブ＋Set 一覧（受験回数・最高正答率）＋「苦手分析」「データ書き出し/読み込み」「メニューに戻る」。
- **出題**: 再生コントロール＋設問（ボタン）＋答え合わせ／次へ。
- **結果**: 総合スコア＋カテゴリ別バー＋「もう一度」「セット一覧へ」。
- **苦手分析**: カテゴリ別正答率（苦手順）＋セッション履歴。

## 初期コンテンツ（β）

- 英語 Set 1: `qa`×6 ＋ `conversation`×2（計6問）＋ `talk`×2（計6問）= 10パッセージ・18問。
- 仏語 Set 1: 同構成（Part2/3/4 風）で18問。仏文はアクサン正確に。
- 各設問にカテゴリを付与し、6カテゴリを偏りなく配分。解説は日本語。

## テスト

- `Listening` 純粋関数を Node ハーネスで単体テスト:
  - `gradeQuestions`: 全問正解=rate 1、一部誤り<1、未回答は不正解。
  - `categoryStats`: 擬似 results から attempts/correct/rate を集計、未挑戦は rate null。
- データ整合（各教科）:
  - Set の総設問数が期待どおり（en/fr 各18）。
  - type が qa/conversation/talk のいずれか。qa は choices 3・設問1、他は choices 4。
  - answer が選択肢数の範囲内、category が規定6種、lines が1つ以上、q/choices が存在。
  - questionId 形式 `l\d+-p\d+-q\d+`。
- TTS 順次再生・話者切替・ゆっくり再生はブラウザで実機確認（音の最終確認は実機）。

## リスク

- **TTS会話は生音声ほど自然でない**。内容理解の練習と割り切る（UI/位置づけで明示）。
- **声の割り当てはOS依存**。2声取れない環境では単一声にフォールバック。
- 既存 MCQ・ディクテーションを壊さないよう、共有は教科ID文字列・`App.el`・画面枠のみ。
  データ・保存・ロジックは独立。
