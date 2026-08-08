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

const assets = collectFiles(root, "").sort();
const hash = crypto.createHash("sha256");
for (const asset of assets) hash.update(fs.readFileSync(path.join(root, asset)));
const version = `v-${hash.digest("hex").slice(0, 10)}`;

const source = `// このファイルは tools/build-sw.js の生成物。直接編集しないこと。
const CACHE = ${JSON.stringify(`lang-practice-${version}`)};
const ASSETS = ${JSON.stringify(assets, null, 2)};

self.addEventListener("install", function (event) {
  event.waitUntil(caches.open(CACHE).then(function (cache) {
    return cache.addAll(ASSETS);
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
