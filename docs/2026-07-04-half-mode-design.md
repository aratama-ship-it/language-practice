# 10分版（ハーフモード）設計書

作成日: 2026-07-04
承認: ユーザー承認済み（2026-07-04）
前提: `2026-07-03-toeic-webapp-design.md` のアプリに対する追加機能

## 目的

各Volを約10分で終わらせられる短縮バージョンを追加する。すきま時間での学習を可能にする。

## 分割ルール

| Vol | ハーフ1 | ハーフ2 |
|-----|--------|--------|
| 1〜3, 5, 6 | 文法（Part 5の20問） | 読解（Part 6+7の12問） |
| 4（前置詞30問） | 前半15問 | 後半15問 |

- 制限時間は各**10分（600秒）固定**（時間選択なし。TOEIC本番ペース Part5≒30秒/問・読解≒50秒/問 に基づく）
- 全問がどちらかのハーフに必ず属する（重複・漏れなし）

## 実装

### quiz.js
- `Quiz.halfSets(volId)` → `[{ key, label, qids }]` を返す
  - Part 5 以外の問題があるVol → `[{key:"grammar", label:"文法"}, {key:"reading", label:"読解"}]`
  - Part 5 のみのVol（Vol.4）→ `[{key:"first", label:"前半"}, {key:"second", label:"後半"}]`（前から半分ずつ）
- `createSession` / `grade` に `halfKey` を追加（mode は新値 `"half"`。問題リストは既存の questionIds 機構を使用）

### analysis.js
- `sessionLabel` が mode `"half"` に対応: 「Vol.1 文法10分」「Vol.4 後半10分」の形式。halfKey が解決できない場合は「Vol.N 10分版」

### app.js
- 各Volカードに「10分版：」行を追加し、halfSets の各セットをボタン表示（例: 文法 20問 / 読解 12問）
- ボタン → `startTest({mode:"half", volId, halfKey, questionIds, timeLimitSec: 600})`
- カードの「最高/前回」統計は従来どおり通常版（mode "vol"）のみ集計。10分版の結果は履歴・カテゴリ分析・弱点復習には含まれる

### 互換性
- 既存の保存データはそのまま有効（新モードが増えるだけ）
- 「もう一度挑戦」は既存の lastOpts 機構でそのまま動作

## テスト（tests/run-tests.js に追加）

1. halfSets(1): 2セット、文法=20問すべてPart5、読解=12問すべてPart6/7、合算32問・重複なし
2. halfSets(4): 前半15問・後半15問、合算30問・重複なし
3. mode "half" のセッション生成と採点レコードに halfKey が保持される
4. sessionLabel: 「Vol.1 文法10分」「Vol.4 後半10分」
