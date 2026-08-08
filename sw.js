// このファイルは tools/build-sw.js の生成物。直接編集しないこと。
const CACHE = "lang-practice-v-01dbbda6cb";
const ASSETS = [
  "css/style.css",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "index.html",
  "js/analysis.js",
  "js/app.js",
  "js/data/bank.js",
  "js/data/dictation/en.js",
  "js/data/dictation/fr.js",
  "js/data/dictation/index.js",
  "js/data/french/vol1.js",
  "js/data/french/vol2.js",
  "js/data/listening/en.js",
  "js/data/listening/fr.js",
  "js/data/listening/index.js",
  "js/data/vol1.js",
  "js/data/vol2.js",
  "js/data/vol3.js",
  "js/data/vol4.js",
  "js/data/vol5.js",
  "js/data/vol6.js",
  "js/data/vol7.js",
  "js/data/vol8.js",
  "js/dictation-ui.js",
  "js/dictation.js",
  "js/listening-ui.js",
  "js/listening.js",
  "js/pwa.js",
  "js/quiz.js",
  "js/reminder-ui.js",
  "js/reminder.js",
  "js/storage.js",
  "js/subjects.js",
  "js/version.js",
  "manifest.json"
];

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
