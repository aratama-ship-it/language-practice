// 成績データの保存（localStorage）・書き出し・読み込み
// ※ ブラウザ組み込みの Storage と衝突しないよう Storage2 という名前にしている
var Storage2 = {
  key: function () { return BANK.active().storageKey; },
  _backend: (function () {
    try {
      if (typeof window !== "undefined" && window.localStorage) return window.localStorage;
    } catch (e) { /* アクセス不可（プライベートモード等） */ }
    return null;
  })(),
  available: function () {
    if (!this._backend) return false;
    try {
      this._backend.setItem("toeic-app-probe", "1");
      this._backend.removeItem("toeic-app-probe");
      return true;
    } catch (e) { return false; }
  },
  _default: function () { return { version: 1, sessions: [] }; },
  load: function () {
    if (!this._backend) return this._default();
    try {
      var raw = this._backend.getItem(this.key());
      if (!raw) return this._default();
      var data = JSON.parse(raw);
      if (!data || data.version !== 1 || !Array.isArray(data.sessions)) return this._default();
      return data;
    } catch (e) { return this._default(); }
  },
  _save: function (data) {
    if (!this._backend) return false;
    try {
      data.subject = BANK.activeId;
      this._backend.setItem(this.key(), JSON.stringify(data));
      return true;
    } catch (e) { return false; }
  },
  addSession: function (record) {
    var data = this.load();
    data.sessions.push(record);
    return this._save(data);
  },
  exportJSON: function () {
    var d = this.load();
    d.subject = BANK.activeId;
    return JSON.stringify(d, null, 2);
  },
  _validate: function (data) {
    if (!data || typeof data !== "object") return "データ形式が不正です";
    if (data.version !== 1) return "対応していないバージョンです（version: " + data.version + "）";
    if (!Array.isArray(data.sessions)) return "sessions が配列ではありません";
    for (var i = 0; i < data.sessions.length; i++) {
      var s = data.sessions[i];
      if (!s || !s.id || !s.date || !Array.isArray(s.answers)) {
        return "セッション " + (i + 1) + " 件目の形式が不正です";
      }
    }
    return null;
  },
  importJSON: function (str) {
    var data;
    try { data = JSON.parse(str); }
    catch (e) { return { ok: false, error: "JSONとして読み込めませんでした" }; }
    var err = this._validate(data);
    if (err) return { ok: false, error: err };
    if (data.subject && data.subject !== BANK.activeId) {
      return { ok: false, error: "この教科用のデータではありません（" + data.subject + "）。教科を切り替えてから読み込んでください。" };
    }
    if (!this._save(data)) return { ok: false, error: "保存に失敗しました" };
    return { ok: true };
  }
};
