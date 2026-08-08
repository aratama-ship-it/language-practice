// ディクテーション画面・TTS・記録
var DictationUI = {
  subjectId: "toeic",
  setId: null,
  mode: "blanks",       // "blanks" | "sentence"
  items: [],
  index: 0,
  answers: [],          // 各文の採点結果を貯める
  el: function () { return App.el.apply(App, arguments); },

  _autofocusEnabled: function () {
    try {
      var saved = localStorage.getItem("dictation-autofocus");
      if (saved === "1") return true;
      if (saved === "0") return false;
    } catch (e) {}
    if (!window.matchMedia) return true;
    return !window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  },
  _saveAutofocus: function (enabled) {
    try { localStorage.setItem("dictation-autofocus", enabled ? "1" : "0"); }
    catch (e) {}
  },

  // ---- 記録 ----
  _load: function (subjectId) {
    try {
      var raw = localStorage.getItem(DICT[subjectId].storageKey);
      if (!raw) return { version: 1, subject: subjectId, results: [] };
      var d = JSON.parse(raw);
      if (!d || d.version !== 1 || !Array.isArray(d.results)) return { version: 1, subject: subjectId, results: [] };
      return d;
    } catch (e) { return { version: 1, subject: subjectId, results: [] }; }
  },
  _save: function (subjectId, data) {
    try { localStorage.setItem(DICT[subjectId].storageKey, JSON.stringify(data)); return true; }
    catch (e) { return false; }
  },

  // ---- TTS ----
  _pickVoice: function (lang) {
    if (!window.speechSynthesis) return null;
    var voices = window.speechSynthesis.getVoices();
    var bad = /Bad News|Bahh|Boing|Bubbles|Cellos|Trinoids|Zarvox|Wobble|Whisper|Organ|Jester|Superstar|Good News|Pipe|Albert/i;
    var base = lang.slice(0, 2);
    var cands = voices.filter(function (v) { return v.lang && v.lang.slice(0, 2) === base; });
    var good = cands.filter(function (v) { return !bad.test(v.name); });
    return (good[0] || cands[0] || null);
  },
  speak: function (text, slow) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = DICT[this.subjectId].lang;
    var v = this._pickVoice(u.lang);
    if (v) u.voice = v;
    u.rate = slow ? 0.6 : 1.0;
    window.speechSynthesis.speak(u);
  },

  // ---- セット選択画面 ----
  open: function (subjectId) {
    this.subjectId = subjectId || "toeic";
    this.renderSetList();
    App.showScreen("dictation");
  },
  renderSetList: function () {
    var self = this;
    var root = document.getElementById("screen-dictation");
    App.clear(root);
    var subj = DICT[this.subjectId];
    var store = this._load(this.subjectId);

    // 教科タブ
    var tabs = this.el("div", { class: "subject-tabs" });
    DICT.ids().forEach(function (id) {
      tabs.appendChild(self.el("button", {
        class: "subject-tab" + (id === self.subjectId ? " active" : ""),
        text: DICT[id].label,
        onclick: function () { self.open(id); }
      }));
    });
    root.appendChild(tabs);
    root.appendChild(this.el("h1", { text: "ディクテーション" }));

    var autofocus = this.el("input", { type: "checkbox" });
    autofocus.checked = this._autofocusEnabled();
    autofocus.addEventListener("change", function () {
      self._saveAutofocus(autofocus.checked);
    });
    root.appendChild(this.el("div", { class: "card" }, [
      this.el("div", { class: "row" }, [
        this.el("label", null, [autofocus, " 入力欄に自動でカーソルを合わせる"]),
        this.el("span", { class: "meta", text: "オフにすると、キーボードは自分でタップしたときだけ出ます" })
      ])
    ]));

    if (!window.speechSynthesis) {
      root.appendChild(this.el("p", { class: "subtitle",
        text: "⚠ この環境では音声が使えません。答えを見る機能は使えます。" }));
    } else if (window.speechSynthesis.getVoices().length === 0) {
      // 音声は非同期で読み込まれることがある。読み込まれたら一覧を再描画。
      var self2 = this;
      window.speechSynthesis.onvoiceschanged = function () {
        window.speechSynthesis.onvoiceschanged = null;
        if (!document.getElementById("screen-dictation").classList.contains("hidden")) self2.renderSetList();
      };
    }

    Object.keys(subj.sets).map(Number).sort(function (a, b) { return a - b; }).forEach(function (sid) {
      var set = subj.sets[sid];
      var runs = store.results.filter(function (r) { return r.setId === sid; });
      var best = runs.reduce(function (mx, r) { return Math.max(mx, Math.round(r.rate * 100)); }, 0);
      var meta = set.items.length + "文 ・ 受験 " + runs.length + "回" + (runs.length ? " ・ 最高 " + best + "%" : "");
      root.appendChild(self.el("div", { class: "card" }, [
        self.el("h3", { text: set.label }),
        self.el("div", { class: "meta", text: meta }),
        self.el("div", { class: "row" }, [
          "モード：",
          self.el("button", { text: "空欄埋め", onclick: function () { self.start(sid, "blanks"); } }),
          self.el("button", { text: "全文タイプ", onclick: function () { self.start(sid, "sentence"); } })
        ])
      ]));
    });

    var importInput = this.el("input", {
      type: "file", accept: ".json,application/json", class: "hidden",
      onchange: function (e) {
        if (e.target.files && e.target.files[0]) self.importData(e.target.files[0]);
        e.target.value = "";
      }
    });
    root.appendChild(this.el("div", { class: "toolbar" }, [
      this.el("button", { text: "苦手分析", onclick: function () { self.renderAnalysis(); } }),
      this.el("button", { text: "データ書き出し", onclick: function () { self.exportData(); } }),
      this.el("button", { text: "データ読み込み", onclick: function () { importInput.click(); } }),
      importInput,
      this.el("button", { text: "メニューに戻る", onclick: function () { App.goHome(); } })
    ]));
  },

  // ---- 書き出し / 読み込み ----
  exportData: function () {
    var d = new Date();
    var name = this.subjectId + "-dictation-" + d.getFullYear() + "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + ".json";
    var data = this._load(this.subjectId);
    data.subject = this.subjectId;
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
  },
  importData: function (file) {
    var self = this;
    if (!confirm("現在のディクテーション成績を、読み込んだ内容で置き換えます。よろしいですか？")) return;
    var reader = new FileReader();
    reader.onload = function () {
      var res = self._importJSON(String(reader.result));
      if (res.ok) { alert("読み込みました"); self.renderSetList(); }
      else alert("読み込めませんでした: " + res.error);
    };
    reader.readAsText(file);
  },
  _importJSON: function (str) {
    var data;
    try { data = JSON.parse(str); }
    catch (e) { return { ok: false, error: "JSONとして読み込めませんでした" }; }
    if (!data || data.version !== 1 || !Array.isArray(data.results)) {
      return { ok: false, error: "データ形式が不正です" };
    }
    if (data.subject && data.subject !== this.subjectId) {
      return { ok: false, error: "この教科用のデータではありません（" + data.subject + "）。教科を切り替えてから読み込んでください。" };
    }
    if (!this._save(this.subjectId, data)) return { ok: false, error: "保存に失敗しました" };
    return { ok: true };
  },

  // ---- セッション ----
  start: function (setId, mode) {
    this.setId = setId; this.mode = mode;
    this.items = DICT[this.subjectId].sets[setId].items.slice();
    this.index = 0; this.answers = [];
    this.renderItem();
  },
  renderItem: function () {
    var self = this;
    var root = document.getElementById("screen-dictation");
    App.clear(root);
    var item = this.items[this.index];

    root.appendChild(this.el("div", { class: "test-header" }, [
      this.el("span", { class: "progress", text: (this.index + 1) + " / " + this.items.length }),
      this.el("button", { text: "やめる", onclick: function () { self.renderSetList(); } })
    ]));

    root.appendChild(this.el("div", { class: "row" }, [
      this.el("button", { class: "primary", text: "▶ 再生", onclick: function () { self.speak(item.text, false); } }),
      this.el("button", { text: "🐢 ゆっくり", onclick: function () { self.speak(item.text, true); } })
    ]));

    var inputArea = this.el("div", { id: "dict-input" });
    if (this.mode === "blanks") {
      var words = Dictation.tokenize(item.text);
      var line = this.el("div", { class: "dict-blank-line" });
      words.forEach(function (w, i) {
        if (item.blanks.indexOf(i) >= 0) {
          line.appendChild(self.el("input", { type: "text", class: "dict-blank", "data-idx": i, autocomplete: "off" }));
        } else {
          line.appendChild(self.el("span", { class: "dict-word", text: w + " " }));
        }
      });
      inputArea.appendChild(line);
    } else {
      inputArea.appendChild(this.el("textarea", { id: "dict-sentence", rows: "2", placeholder: "聞こえた文を入力" }));
    }
    root.appendChild(inputArea);

    root.appendChild(this.el("div", { id: "dict-feedback" }));

    root.appendChild(this.el("div", { class: "test-footer" }, [
      this.el("button", { text: "答えを見る", onclick: function () { self.reveal(item); } }),
      this.el("button", { class: "primary", text: "答え合わせ", onclick: function () { self.check(item); } })
    ]));

    // 最初の入力欄にフォーカス（キーボードだけで進められるように）
    var firstInput = this.mode === "blanks"
      ? inputArea.querySelector(".dict-blank")
      : document.getElementById("dict-sentence");
    if (firstInput && this._autofocusEnabled()) firstInput.focus();

    // 自動で1回再生
    this.speak(item.text, false);
  },
  // Enter で「答え合わせ → 次へ」を進める（フッターの primary ボタンを押す）
  onEnter: function () {
    var scr = document.getElementById("screen-dictation");
    if (!scr || scr.classList.contains("hidden")) return false;
    var btn = scr.querySelector(".test-footer .primary");
    if (!btn) return false;
    btn.click();
    return true;
  },
  reveal: function (item) {
    var fb = document.getElementById("dict-feedback");
    App.clear(fb);
    fb.appendChild(this.el("div", { class: "explanation" }, [
      this.el("div", { text: item.text }),
      this.el("div", { class: "subtitle", text: item.translation })
    ]));
  },
  check: function (item) {
    var self = this;
    var graded, missedWords, rate;
    if (this.mode === "blanks") {
      var answers = {};
      document.querySelectorAll("#dict-input .dict-blank").forEach(function (inp) {
        answers[Number(inp.getAttribute("data-idx"))] = inp.value;
      });
      graded = Dictation.gradeBlanks(item, answers);
      rate = graded.rate; missedWords = graded.missedWords;
    } else {
      var typed = (document.getElementById("dict-sentence").value || "");
      graded = Dictation.gradeSentence(item.text, typed);
      rate = graded.score; missedWords = graded.missedWords;
    }
    var correct = rate >= 0.8;
    this.answers.push({ itemId: item.id, category: item.category, correct: correct, missedWords: missedWords });

    // フィードバック表示（正解文を語ごとに色分け）
    var fb = document.getElementById("dict-feedback");
    App.clear(fb);
    var line = this.el("div", { class: "dict-result-line" });
    if (this.mode === "sentence") {
      graded.targetTokens.forEach(function (t) {
        var cls = t.status === "exact" ? "correct" : (t.status === "close" ? "dict-close" : "wrong");
        line.appendChild(self.el("span", { class: "dict-word " + cls, text: t.text + " " }));
      });
    } else {
      var words = Dictation.tokenize(item.text);
      var byIdx = {};
      graded.results.forEach(function (r) { byIdx[r.index] = r.status; });
      words.forEach(function (w, i) {
        var cls = "dict-word";
        if (byIdx.hasOwnProperty(i)) cls += byIdx[i] === "exact" ? " correct" : (byIdx[i] === "close" ? " dict-close" : " wrong");
        line.appendChild(self.el("span", { class: cls, text: w + " " }));
      });
    }
    fb.appendChild(line);
    fb.appendChild(this.el("div", { class: "score-line " + (correct ? "correct" : "wrong"),
      text: (correct ? "○ " : "× ") + Math.round(rate * 100) + "%" }));
    fb.appendChild(this.el("div", { class: "subtitle", text: "訳: " + item.translation }));

    // フッターを「次へ」に差し替え
    var footer = document.querySelector("#screen-dictation .test-footer");
    App.clear(footer);
    var isLast = this.index === this.items.length - 1;
    footer.appendChild(this.el("button", { class: "primary", text: isLast ? "結果を見る" : "次へ →",
      onclick: function () { self.next(); } }));
  },
  next: function () {
    if (this.index < this.items.length - 1) { this.index++; this.renderItem(); }
    else { this.finish(); }
  },
  finish: function () {
    var total = this.answers.length;
    var correct = this.answers.filter(function (a) { return a.correct; }).length;
    var iso = new Date().toISOString();
    var record = { id: iso, date: iso, setId: this.setId, mode: this.mode,
      total: total, correct: correct, rate: total ? correct / total : 0, items: this.answers };
    var store = this._load(this.subjectId);
    store.results.push(record);
    this._save(this.subjectId, store);
    this.renderResult(record);
  },
  renderResult: function (record) {
    var self = this;
    var root = document.getElementById("screen-dictation");
    App.clear(root);
    root.appendChild(this.el("h1", { text: "結果" }));
    root.appendChild(this.el("div", { class: "card" }, [
      this.el("div", { class: "score-big", text: record.correct + " / " + record.total + "文 聞き取れました（" + Math.round(record.rate * 100) + "%）" })
    ]));
    root.appendChild(this.el("div", { class: "toolbar" }, [
      this.el("button", { class: "primary", text: "もう一度", onclick: function () { self.start(record.setId, record.mode); } }),
      this.el("button", { text: "セット一覧へ", onclick: function () { self.renderSetList(); } })
    ]));
  },

  // ---- 苦手分析 ----
  renderAnalysis: function () {
    var self = this;
    var root = document.getElementById("screen-dictation");
    App.clear(root);
    var store = this._load(this.subjectId);
    root.appendChild(this.el("h1", { text: "苦手分析（" + DICT[this.subjectId].label + "）" }));

    if (store.results.length === 0) {
      root.appendChild(this.el("div", { class: "card" }, [this.el("p", { text: "まだ記録がありません。" })]));
    } else {
      var cs = Dictation.categoryStats(store.results, this.subjectId)
        .filter(function (c) { return c.attempts > 0; })
        .sort(function (a, b) { return a.rate - b.rate; });
      var catCard = this.el("div", { class: "card" }, [this.el("h2", { text: "カテゴリ別正答率（苦手順）" })]);
      cs.forEach(function (c) {
        var pct = Math.round(c.rate * 100);
        var fill = self.el("span", { class: "bar-fill" });
        fill.style.width = pct + "%";
        catCard.appendChild(self.el("div", { class: "bar-row" }, [
          self.el("span", { class: "bar-label", text: c.category }),
          self.el("span", { class: "bar-track" }, [fill]),
          self.el("span", { class: "bar-value", text: c.correct + "/" + c.attempts + " " + pct + "%" })
        ]));
      });
      root.appendChild(catCard);

      var tw = Dictation.troubleWords(store.results, 20);
      var twCard = this.el("div", { class: "card" }, [this.el("h2", { text: "よくつまずく語" })]);
      if (tw.length === 0) twCard.appendChild(this.el("p", { class: "subtitle", text: "なし" }));
      tw.forEach(function (t) {
        twCard.appendChild(self.el("div", { class: "bar-row" }, [
          self.el("span", { class: "bar-label", text: t.word }),
          self.el("span", { class: "bar-value", text: t.count + "回" })
        ]));
      });
      root.appendChild(twCard);
    }
    root.appendChild(this.el("div", { class: "toolbar" }, [
      this.el("button", { text: "セット一覧へ", onclick: function () { self.renderSetList(); } })
    ]));
  }
};

// Enter で「答え合わせ → 次へ」を進める（Shift+Enter は通常改行のまま）
document.addEventListener("keydown", function (e) {
  if (e.key !== "Enter" || e.shiftKey || e.isComposing) return;
  if (DictationUI.onEnter()) e.preventDefault();
});
