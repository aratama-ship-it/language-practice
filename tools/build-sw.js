// Service Worker 生成スクリプト: node tools/build-sw.js
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

function collectFiles(dir, prefix) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;

    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (["docs", "tests", "tools"].includes(rel)) continue;
      files.push(...collectFiles(full, rel));
      continue;
    }

    if (!entry.isFile()) continue;
    if (rel === "icons/_preview.png") continue;
    if (rel === "index.html" || rel === "manifest.json" ||
        rel.startsWith("css/") || rel.startsWith("js/") || rel.startsWith("icons/")) {
      files.push(rel);
    }
  }

  return files;
}

// js/version.js は自身がこのスクリプトの生成物なので、ハッシュの対象から外す
// （含めると、採番を書き込むたびにハッシュが変わって永久に落ち着かない）。
const VERSION_FILE = "js/version.js";
const assets = collectFiles(root, "").filter(a => a !== VERSION_FILE).sort();

const hash = crypto.createHash("sha256");
for (const asset of assets) hash.update(fs.readFileSync(path.join(root, asset)));
const digest = hash.digest("hex").slice(0, 10);
const version = `v-${digest}`;

// ---- 画面に出す通し番号 ----
// 内容が変わったときだけ +1 する。変わっていなければ何度実行しても同じ結果になる
// （テストが build-sw.js を実行して生成物を突き合わせるため、冪等でないと落ちる）。
const versionJsonPath = path.join(root, "version.json");
let info = { build: 0, hash: "", date: "" };
if (fs.existsSync(versionJsonPath)) {
  try { info = JSON.parse(fs.readFileSync(versionJsonPath, "utf8")); } catch (e) { /* 壊れていたら作り直す */ }
}
let bumped = false;
if (info.hash !== digest) {
  const d = new Date();
  const pad = n => String(n).padStart(2, "0");
  info = {
    build: (Number(info.build) || 0) + 1,
    hash: digest,
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
  };
  fs.writeFileSync(versionJsonPath, JSON.stringify(info, null, 2) + "\n");
  bumped = true;
}

fs.writeFileSync(path.join(root, VERSION_FILE),
  "// このファイルは tools/build-sw.js の生成物。直接編集しないこと。\n" +
  `var APP_VERSION = ${JSON.stringify({ build: info.build, date: info.date, hash: info.hash })};\n`);

// 配信・キャッシュ対象には含める（画面に出すため）
assets.push(VERSION_FILE);
assets.sort();

const source = `// このファイルは tools/build-sw.js の生成物。直接編集しないこと。
const CACHE = ${JSON.stringify(`lang-practice-${version}`)};
const ASSETS = ${JSON.stringify(assets, null, 2)};

self.addEventListener("install", function (event) {
  // cache:"reload" を付けないと、ブラウザのHTTPキャッシュにある古いファイルを
  // そのままプリキャッシュしてしまい、更新したはずの内容が反映されない。
  event.waitUntil(caches.open(CACHE).then(function (cache) {
    return Promise.all(ASSETS.map(function (url) {
      return fetch(new Request(url, { cache: "reload" })).then(function (response) {
        if (!response.ok) throw new Error("precache failed: " + url);
        return cache.put(url, response);
      });
    }));
  }));
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key.startsWith("lang-practice-") && key !== CACHE) {
          return caches.delete(key);
        }
      }));
    }).then(function () {
      return clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      caches.open(CACHE).then(function (cache) {
        return cache.match("index.html");
      }).then(function (cached) {
        return cached || fetch(request);
      })
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE).then(function (cache) {
      return cache.match(request).then(function (cached) {
        if (cached) return cached;
        return fetch(request).then(function (response) {
          if (!response.ok) return response;
          return cache.put(request, response.clone()).then(function () {
            return response;
          });
        });
      });
    })
  );
});

self.addEventListener("message", function (event) {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});
`;

fs.writeFileSync(path.join(root, "sw.js"), source);
console.log(`PWA assets: ${assets.length}`);
console.log(`PWA cache version: ${version}`);
console.log(`表示バージョン: ver.${info.build} (${info.date})${bumped ? "  ← 内容が変わったので採番を上げた" : "  ← 内容に変更なし"}`);
