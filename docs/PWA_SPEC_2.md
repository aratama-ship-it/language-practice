# 仕様書2: iPhone操作性の改善 と 学習リマインダー

前提: このアプリはPWA化済み（`docs/PWA_SPEC.md`）。公開先は
`https://aratama-ship-it.github.io/language-practice/`。

**共通の禁止事項**

- 既存の出題データ・成績データの保存キーや形式を変えない。
- ファイルの削除・移動をしない。git の commit / push をしない。
- 仕様書に書いていない機能追加・リファクタ・整理をしない。
- 作業の最後に `node tools/build-sw.js` → `node tests/run-tests.js` を実行し、
  `ALL TESTS PASSED` を確認する（`sw.js` の再生成を忘れると配信が壊れる）。

---

# A. ディクテーション入力まわり（iPhoneでの不満の解消）

## A-1. 入力欄フォーカス時の自動ズームを止める

**原因は特定済み**: `.dict-blank`（`input[type="text"]`）に `font-size` の指定が無く、
ブラウザ既定の約13pxになっている。iOSは**16px未満の入力欄にフォーカスすると自動でズームする**。

`css/style.css` を直す:

- `.dict-blank` と `#dict-sentence` の `font-size` を **16px以上**にする
  （`font: inherit` だけに頼らず、実効値が16px以上になることを保証する）。
- ついでに `input[type="text"]`, `input[type="number"]`, `textarea`, `select` 全般で
  実効フォントサイズが16px未満にならないようにする。
- デスクトップでの見た目を大きく変えないこと。`.dict-blank` の `width: 7em` などの
  既存レイアウトは維持する。

## A-2. 入力欄に自動でフォーカスしない（自分で選べるようにする）

現状 `js/dictation-ui.js:206` 付近で、問題を表示するたびに最初の入力欄へ
`focus()` している。iPhoneでは**問題を表示した瞬間にキーボードが出て画面が動く**ため、
これを設定で切り替えられるようにする。

- ディクテーションのセット選択画面に、チェックボックス
  **「入力欄に自動でカーソルを合わせる」** を1つ置く。
- 設定値は localStorage に保存する。キーは `dictation-autofocus`（新規。既存キーに相談しない）。
  値は `"1"` / `"0"` の文字列。
- **既定値は、タッチ端末では OFF、それ以外では ON** とする。
  判定は `window.matchMedia('(hover: none) and (pointer: coarse)').matches` を使う
  （iPhone/iPadでOFF、Mac/PCで従来どおりON）。
  ユーザーが一度でも切り替えたら、その選択を常に優先する。
- OFF のときは `focus()` を呼ばない。**自動再生（`this.speak(...)`）は今までどおり行う。**
- ON/OFF どちらでも、Enterキーで「答え合わせ→次へ」進める既存の挙動は壊さないこと。
- チェックボックスの横に短い説明を添える:
  「オフにすると、キーボードは自分でタップしたときだけ出ます」

## A-3. 拡大縮小をできないようにする

本人の明確な要望。ピンチ操作とダブルタップでの拡大を止める。

- `index.html` の viewport を
  `width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover`
  にする。
- `css/style.css` に `html { touch-action: manipulation; -webkit-text-size-adjust: 100%; }`
  を加える（ダブルタップ拡大の抑止と、iOSの勝手な文字サイズ調整の抑止）。
- `js/pwa.js` の末尾に、iOS特有のピンチ拡大を止める処理を足す:
  `gesturestart` / `gesturechange` / `gestureend` を `document` で
  `{ passive: false }` で受け、`preventDefault()` する。
- **注意**: iOS Safari は `user-scalable=no` を無視することがあるため、
  実際に効くのは主に `gesture*` の抑止と `touch-action` である。
  両方入れること（片方だけにしない）。

---

# B. 学習リマインダー（.ics 生成方式）

## B-0. 方式の前提（重要・変えないこと）

このアプリは静的サイトでサーバーが無く、iOSには「Webアプリが時刻を指定して
自前で通知を予約する」手段が存在しない（Notification Triggers API は Safari 未対応）。
したがって **Web Push は使わない**。代わりに、**iPhone標準のカレンダーに
繰り返しアラーム付きの予定を入れてもらう**方式にする。サーバー不要・オフラインで完結する。

## B-1. 画面

- `index.html` に `<section id="screen-reminder" class="screen hidden"></section>` を追加する
  （既存の screen 群と同じ書き方）。
- ホーム画面（`js/app.js` が描くトップ）の、既存の「ディクテーション練習」「リスニング」
  ボタンと同じ並びに **「学習リマインダー」** を追加する。
- 実装は `js/reminder.js`（ロジック・純粋関数）と `js/reminder-ui.js`（画面）に分ける。
  既存の `dictation.js` / `dictation-ui.js` の分け方と揃える。
  `index.html` の script 読み込みは `js/listening-ui.js` の後、`js/app.js` の前に入れる。

## B-2. 設定項目

- 曜日: 月〜日のトグル（複数選択）。既定は月〜金。
- 時刻: `<input type="time">`。既定は `20:00`。
- 1回の練習の想定時間: 10分 / 15分 / 20分 から選択。既定15分（予定の長さになる）。
- 設定は localStorage キー `reminder-settings` に JSON で保存し、次回開いたときに復元する。

## B-3. `js/reminder.js`（ロジック・テスト対象）

`Reminder.buildICS(settings, opts)` を実装する。純粋関数にすること
（`Date.now()` などの外部状態は引数で受け取る。テストできる形にする）。

- 出力は RFC 5545 準拠のテキスト。改行は **CRLF**。
- 構造: `BEGIN:VCALENDAR` / `VERSION:2.0` / `PRODID` / `BEGIN:VEVENT` … `END:VCALENDAR`
- `SUMMARY`: `英仏練習`
- `DESCRIPTION`: `TOEIC・フランス語の練習。https://aratama-ship-it.github.io/language-practice/`
- `URL`: 上記の公開URL
- `DTSTART` / `DTEND`: **タイムゾーン付きではなくローカル時刻（フローティング時刻）**で書く
  （`DTSTART:20260809T200000` の形式。`Z` を付けない）。
  こうすると端末のタイムゾーンでそのまま鳴り、旅行先でも意図どおりになる。
- `RRULE:FREQ=WEEKLY;BYDAY=` に選択された曜日を `MO,TU,WE,TH,FR` の形式で並べる。
- `BEGIN:VALARM` / `TRIGGER:PT0M` / `ACTION:DISPLAY` / `DESCRIPTION:英仏練習の時間です` / `END:VALARM`
- `UID` は引数で受け取る（テストで固定できるようにする）。
- 75オクテットを超える行の折り返し（line folding）は実装しなくてよいが、
  日本語を含む `SUMMARY` / `DESCRIPTION` が壊れないこと。

`Reminder.streak(dates, today)` も実装する。

- `dates` は `YYYY-MM-DD` の文字列配列（重複あり・順不同でよい）、`today` は `YYYY-MM-DD`。
- 今日または昨日を起点に、連続して練習した日数を返す。該当なしは0。
- 「今日やっていれば今日を含めて数える。今日まだでも昨日までの連続は途切れていない」
  という数え方にする。

## B-4. `js/reminder-ui.js`（画面）

- 上記の設定UIと、**「カレンダーに追加」ボタン**。
- 押したら `Reminder.buildICS` の結果を `.ics` として端末に渡す。
  iOSのスタンドアロンPWAでは Blob のダウンロードが効かない場合があるため、
  **次の順で試すフォールバックを実装する**:
  1. `Blob` + `URL.createObjectURL` + `<a download="eibutsu-renshu.ics">` のクリック
  2. 失敗または無反応に備え、同じ画面に
     `data:text/calendar;charset=utf-8,<encodeURIComponent した本文>` への
     通常リンク「うまくいかないときはこちら」を**最初から表示しておく**
     （押すとiOSがカレンダー追加シートを出す想定）
- ボタンの下に、この方式の説明を2〜3行で日本語で書く:
  - 「iPhoneのカレンダーに、繰り返しの予定とアラームとして登録されます」
  - 「通知はiPhone標準のカレンダーが出すので、このアプリを開いていなくても届きます」
  - 「やめたいときはカレンダーの予定を削除してください」
- 画面上部に**連続日数**を表示する: 「🔥 3日連続で練習中」。0日なら
  「今日から始めましょう」。
  日数は `Reminder.streak` に、**TOEIC・フランス語の全モード
  （通常の問題演習・ディクテーション・リスニング）の練習記録の日付**を渡して求める。
  各モジュールが localStorage に持っている結果配列の `date` を集めて
  `YYYY-MM-DD` に切り出すこと。読み取り専用で、**保存形式は一切変更しない**。

## B-5. テスト

`tests/` に追加する（既存ハーネスの書き方に合わせる）:

- `buildICS` が `BEGIN:VCALENDAR` で始まり `END:VCALENDAR` で終わること
- 選択した曜日が `RRULE` の `BYDAY` に正しい順序・記法で入ること
- `DTSTART` に指定した時刻が反映され、末尾に `Z` が付かないこと
- 改行が CRLF であること
- `VALARM` ブロックが含まれること
- `streak` の境界: 今日やった / 昨日まででまだ今日やっていない / 2日空いた / 空配列 / 重複日付
