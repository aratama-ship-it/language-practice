# PWA化 仕様書（英仏練習アプリ）

対象リポジトリ: `apps/language-app/toeic-webapp`（それ自体がgitリポジトリ。公開先は GitHub Pages
`https://aratama-ship-it.github.io/language-practice/`）

目的: iPhoneのホーム画面に追加して、Safariのアドレスバー無しの全画面で、**オフラインでも**
練習できるようにする。

アイコン（`icons/` 配下）は生成済み。**画像の作り直しは不要**。

---

## 1. `manifest.json`（リポジトリ直下に新規作成）

```json
{
  "name": "英仏練習 — TOEIC・フランス語",
  "short_name": "英仏練習",
  "lang": "ja",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#101f38",
  "theme_color": "#101f38",
  "description": "TOEIC（Part5/6/7）とフランス語の問題演習・ディクテーション・リスニングをまとめた練習アプリ。",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

`start_url` と `scope` は **相対パス** にすること。GitHub Pages ではサブパス
（`/language-practice/`）配下に置かれ、ローカルでは別パスになるため、絶対パスにすると壊れる。

---

## 2. `tools/build-sw.js`（Node製の生成スクリプト・新規作成）

**手作業でのバージョン番号の上げ忘れを構造的に防ぐことが目的。** 既存の別アプリで
「`?v=` を9箇所手で上げる」運用が事故のもとになっているため、同じ轍を踏まない。

仕様:

- `node tools/build-sw.js` で実行する。外部依存は入れない（Node標準モジュールのみ）。
- キャッシュ対象ファイルの一覧を、以下のルールで**自動収集**する。
  - リポジトリ直下から再帰的に走査する。
  - 含める: `index.html`, `manifest.json`, `css/**`, `js/**`, `icons/**`
  - 除外する: `docs/`, `tests/`, `tools/`, `.git/`, `.gitignore`, `README.md`,
    ドットで始まるファイル、`icons/_preview.png`（目視確認用のため配信不要）
- 収集した全ファイルの内容から SHA-256 を計算し、先頭10桁をバージョン文字列にする
  （例 `v-3f9a2c1b04`）。**内容が1バイトでも変われば自動で変わる**こと。
- 生成物 `sw.js` をリポジトリ直下に書き出す。`sw.js` は生成物なので、
  先頭に「このファイルは tools/build-sw.js の生成物。直接編集しないこと」と日本語コメントを入れる。
- 実行時に、収集ファイル数とバージョン文字列を標準出力に出す。

## 3. `sw.js`（`build-sw.js` が生成する内容の仕様）

- `const CACHE = 'lang-practice-<バージョン文字列>'`、`const ASSETS = [...]`（相対パスの配列）。
- `install`: `caches.open(CACHE)` して `ASSETS` を全件 `addAll`。**`self.skipWaiting()` は呼ばない**
  （練習中に勝手に切り替わるのを防ぐため。切替は後述のユーザー操作で行う）。
- `activate`: `lang-practice-` で始まる**別バージョンの**キャッシュを全削除し、`clients.claim()`。
- `fetch`:
  - `GET` 以外、および同一オリジン外のリクエストは何もしない（`respondWith` を呼ばず素通し）。
  - ナビゲーションリクエスト（`request.mode === 'navigate'`）は、キャッシュの `index.html`
    を返す。無ければネットワーク。
  - それ以外は **cache-first**（キャッシュヒットで即返す。無ければネットワークへ行き、
    成功したらキャッシュに入れてから返す。オフラインで両方失敗したらそのまま失敗させる）。
- `message`: `event.data === 'SKIP_WAITING'` を受け取ったら `self.skipWaiting()` する。

---

## 4. `index.html` の変更

`<head>` に追加（既存の `<meta name="viewport">` は差し替え）:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="theme-color" content="#101f38">
<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<link rel="icon" href="icons/favicon-32.png" sizes="32x32">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="英仏練習">
```

`<body>` の最後（`js/app.js` の読み込みより後）に、更新通知用の要素と登録スクリプトを追加する。
登録スクリプトは `js/pwa.js` として**別ファイル**に切り出し、`index.html` からは
`<script src="js/pwa.js"></script>` で読む（既存の他ファイルと同じ書き方に合わせる）。

`<body>` 内、`<main>` より前に更新バナーを置く:

```html
<div id="pwa-update" class="hidden">
  <span>新しいバージョンがあります</span>
  <button type="button" id="pwa-update-btn">更新する</button>
</div>
```

## 5. `js/pwa.js`（新規作成）

- `file://` で開かれている場合（`location.protocol === 'file:'`）は**何もしない**で終了する
  （このアプリは file:// でも動く前提を維持している。Service Worker は file:// で登録できない）。
- `'serviceWorker' in navigator` を確認してから `window.load` 後に `navigator.serviceWorker.register('sw.js')`
  を呼ぶ（相対パス。サブディレクトリ配信に対応するため）。
- 待機中の新バージョンを検出したら `#pwa-update` から `hidden` クラスを外す。
  検出は次の両方を見る:
  - 登録直後の `registration.waiting` が存在する場合
  - `registration.addEventListener('updatefound')` → 新 worker の `statechange` が
    `installed` かつ `navigator.serviceWorker.controller` が存在する場合
- `#pwa-update-btn` のクリックで、待機中の worker に `postMessage('SKIP_WAITING')` を送る。
- `navigator.serviceWorker.addEventListener('controllerchange')` で `window.location.reload()`。
  ただし多重リロードを防ぐため、リロード済みフラグを1つ持つこと。
- 例外は握りつぶしてよい（登録に失敗してもアプリ本体は従来どおり動くこと）。**最重要**。

## 6. `css/style.css` の変更

- `body`（またはレイアウトの外枠）に iPhone のノッチ／ホームインジケータを避ける余白を入れる。
  `padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);`
  相当を、既存の余白設計を壊さない形で加える（既存 padding がある場合は
  `max()` か、外側ラッパーへの追加で対応する）。
- `#pwa-update` のスタイルを追加する。画面下部に固定表示、既存の配色変数
  （`--ink` `--card` `--accent` `--line`）を使い、既存のボタンの見た目に合わせる。
  `hidden` クラスは既存のものを流用する。
- モバイルでの操作性として、`button` の最小タップ領域が44px以上になるよう
  既存の `@media (max-width: 480px)` ブロック内で調整する。
  **既存のデスクトップ表示の見た目は変えないこと。**

## 7. `.gitignore`

`icons/_preview.png` を無視対象に追加する（目視確認用の中間生成物のため）。

## 8. テスト

- 既存の `node tests/run-tests.js` が**引き続き全て通ること**。これが最優先。
- `tests/` に PWA 用のテストを追加する（既存のテストハーネスの書き方に合わせる）:
  - `manifest.json` が JSON として妥当で、`icons` に挙げた全ファイルが実在すること
  - `tools/build-sw.js` が生成した `sw.js` の `ASSETS` に、`index.html` が
    `<script src>` / `<link href>` で参照している全ファイルが含まれていること
    （参照漏れがあるとオフラインで壊れるため、ここは必ず突き合わせる）
  - `sw.js` がコミット済みの内容と一致すること（`build-sw.js` の再実行忘れの検出）

## 9. やらないこと

- 既存の出題データ・成績保存（localStorage）のキーや形式は**一切変更しない**。
- ファイルの削除・移動はしない。
- git の commit / push はしない（人間が確認してから行う）。
