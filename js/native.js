// iPhone アプリ版（Capacitor）でだけ使う機能の窓口。読み上げは iPhone の音声合成、学習リマインダーは iPhone の通知。
// Web 版（ブラウザ・ホーム画面の PWA）では available が false になり、これまでどおりの動きになる。
// npm の @capacitor/core は同梱しない（ビルド手順を持たない静的サイトのため）。アプリが注入する window.Capacitor の
// Plugins（無ければ nativePromise）を直接使う。
var Native = (function () {
  var cap = typeof window !== "undefined" ? window.Capacitor : null;
  var isNative = !!(cap && typeof cap.isNativePlatform === "function" && cap.isNativePlatform());
  function plugin(name, methods) {
    if (!isNative) return null;
    if (typeof cap.registerPlugin === "function") return cap.registerPlugin(name);
    if (cap.Plugins && cap.Plugins[name] && typeof cap.Plugins[name][methods[0]] === "function") return cap.Plugins[name];
    if (typeof cap.nativePromise !== "function") return null;
    var p = {};
    methods.forEach(function (m) { p[m] = function (opts) { return cap.nativePromise(name, m, opts || {}); }; });
    return p;
  }
  var speech = plugin("NativeSpeech", ["speak", "cancel", "voices"]);
  var reminder = plugin("NativeReminder", ["schedule", "cancel", "status"]);
  return { available: !!(speech && reminder), speech: speech, reminder: reminder };
})();
