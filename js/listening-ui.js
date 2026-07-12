// リスニング画面・TTS順次再生・記録
var ListeningUI = {
  subjectId: "toeic",
  setId: null,
  passages: [],
  index: 0,          // 現在のパッセージ
  answers: {},       // { questionId: chosenIndex } 全パッセージ通し
  results: [],       // 各パッセージの採点結果を貯める
  el: function () { return App.el.apply(App, arguments); },

  // ---- 記録（ディクテーションと同型・キーだけ別） ----
  _load: function (subjectId) {
    try {
      var raw = localStorage.getItem(LISTEN[subjectId].storageKey);
      if (!raw) return { version: 1, subject: subjectId, results: [] };
      var d = JSON.parse(raw);
      if (!d || d.version !== 1 || !Array.isArray(d.results)) return { version: 1, subject: subjectId, results: [] };
      return d;
    } catch (e) { return { version: 1, subject: subjectId, results: [] }; }
  },
  _save: function (subjectId, data) {
    try { localStorage.setItem(LISTEN[subjectId].storageKey, JSON.stringify(data)); return true; }
    catch (e) { return false; }
  },
  exportData: function () {
    var d = new Date();
    var name = this.subjectId + "-listening-" + d.getFullYear() + "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + ".json";
    var data = this._load(this.subjectId); data.subject = this.subjectId;
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = name; a.click();
    URL.revokeObjectURL(a.href);
  },
  importData: function (file) {
    var self = this;
    if (!confirm("現在のリスニング成績を、読み込んだ内容で置き換えます。よろしいですか？")) return;
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
    try { data = JSON.parse(str); } catch (e) { return { ok: false, error: "JSONとして読み込めませんでした" }; }
    if (!data || data.version !== 1 || !Array.isArray(data.results)) return { ok: false, error: "データ形式が不正です" };
    if (data.subject && data.subject !== this.subjectId) {
      return { ok: false, error: "この教科用のデータではありません（" + data.subject + "）。教科を切り替えてから読み込んでください。" };
    }
    if (!this._save(this.subjectId, data)) return { ok: false, error: "保存に失敗しました" };
    return { ok: true };
  },

  // ---- TTS 順次再生・話者切替 ----
  _voiceMap: function (lang, speakers) {
    var map = {};
    if (!window.speechSynthesis) return map;
    var voices = window.speechSynthesis.getVoices();
    var bad = /Bad News|Bahh|Boing|Bubbles|Cellos|Trinoids|Zarvox|Wobble|Whisper|Organ|Jester|Superstar|Good News|Pipe|Albert/i;
    var base = lang.slice(0, 2);
    var cands = voices.filter(function (v) { return v.lang && v.lang.slice(0, 2) === base && !bad.test(v.name); });
    if (cands.length === 0) cands = voices.filter(function (v) { return v.lang && v.lang.slice(0, 2) === base; });
    speakers.forEach(function (sp, i) { map[sp] = cands.length ? cands[i % cands.length] : null; });
    return map;
  },
  playPassage: function (passage, slow) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    var lang = LISTEN[this.subjectId].lang;
    var speakers = [];
    passage.lines.forEach(function (ln) { if (speakers.indexOf(ln.speaker) < 0) speakers.push(ln.speaker); });
    var vmap = this._voiceMap(lang, speakers);
    var i = 0;
    function next() {
      if (i >= passage.lines.length) return;
      var ln = passage.lines[i++];
      var u = new SpeechSynthesisUtterance(ln.text);
      u.lang = lang;
      if (vmap[ln.speaker]) u.voice = vmap[ln.speaker];
      u.rate = slow ? 0.7 : 1.0;
      u.onend = next;
      window.speechSynthesis.speak(u);
    }
    next();
  },

  // ---- セット選択 ----
  open: function (subjectId) {
    this.subjectId = subjectId || "toeic";
    this.renderSetList();
    App.showScreen("listening");
  },
  renderSetList: function () {
    var self = this;
    var root = document.getElementById("screen-listening");
    App.clear(root);
    var subj = LISTEN[this.subjectId];
    var store = this._load(this.subjectId);

    var tabs = this.el("div", { class: "subject-tabs" });
    LISTEN.ids().forEach(function (id) {
      tabs.appendChild(self.el("button", {
        class: "subject-tab" + (id === self.subjectId ? " active" : ""),
        text: LISTEN[id].label, onclick: function () { self.open(id); }
      }));
    });
    root.appendChild(tabs);
    root.appendChild(this.el("h1", { text: "リスニング" }));
    if (!window.speechSynthesis) {
      root.appendChild(this.el("p", { class: "subtitle", text: "⚠ この環境では音声が使えません。スクリプト表示で確認できます。" }));
    }

    Object.keys(subj.sets).map(Number).sort(function (a, b) { return a - b; }).forEach(function (sid) {
      var set = subj.sets[sid];
      var qCount = set.passages.reduce(function (n, p) { return n + p.questions.length; }, 0);
      var runs = store.results.filter(function (r) { return r.setId === sid; });
      var best = runs.reduce(function (mx, r) { return Math.max(mx, Math.round(r.rate * 100)); }, 0);
      var meta = qCount + "問 ・ 受験 " + runs.length + "回" + (runs.length ? " ・ 最高 " + best + "%" : "");
      root.appendChild(self.el("div", { class: "card" }, [
        self.el("h3", { text: set.label }),
        self.el("div", { class: "meta", text: meta }),
        self.el("div", { class: "row" }, [
          self.el("button", { class: "primary", text: "はじめる", onclick: function () { self.start(sid); } })
        ])
      ]));
    });

    var importInput = this.el("input", {
      type: "file", accept: ".json,application/json", class: "hidden",
      onchange: function (e) { if (e.target.files && e.target.files[0]) self.importData(e.target.files[0]); e.target.value = ""; }
    });
    root.appendChild(this.el("div", { class: "toolbar" }, [
      this.el("button", { text: "苦手分析", onclick: function () { self.renderAnalysis(); } }),
      this.el("button", { text: "データ書き出し", onclick: function () { self.exportData(); } }),
      this.el("button", { text: "データ読み込み", onclick: function () { importInput.click(); } }),
      importInput,
      this.el("button", { text: "メニューに戻る", onclick: function () { App.goHome(); } })
    ]));
  },

  // ---- セッション ----
  start: function (setId) {
    this.setId = setId;
    this.passages = LISTEN[this.subjectId].sets[setId].passages.slice();
    this.index = 0; this.answers = {}; this.results = [];
    this.renderPassage();
  },
  renderPassage: function () {
    var self = this;
    var root = document.getElementById("screen-listening");
    App.clear(root);
    var p = this.passages[this.index];

    root.appendChild(this.el("div", { class: "test-header" }, [
      this.el("span", { class: "progress", text: (this.index + 1) + " / " + this.passages.length }),
      this.el("button", { text: "やめる", onclick: function () { self.renderSetList(); } })
    ]));
    var typeLabel = p.type === "qa" ? "質問応答" : (p.type === "conversation" ? "会話" : "説明文");
    root.appendChild(this.el("div", { class: "subtitle", text: typeLabel }));
    root.appendChild(this.el("div", { class: "row" }, [
      this.el("button", { class: "primary", text: "▶ 再生", onclick: function () { self.playPassage(p, false); } }),
      this.el("button", { text: "🐢 ゆっくり", onclick: function () { self.playPassage(p, true); } })
    ]));

    var qBox = this.el("div", { id: "lis-questions" });
    p.questions.forEach(function (q, qi) {
      var block = self.el("div", { class: "lis-qblock" });
      if (q.q) block.appendChild(self.el("div", { class: "question-text", text: (p.questions.length > 1 ? (qi + 1) + ". " : "") + q.q }));
      var labels = ["A", "B", "C", "D"];
      var choices = self.el("div", { class: "choices" });
      q.choices.forEach(function (c, ci) {
        choices.appendChild(self.el("button", {
          class: "choice-btn", "data-qid": q.id, "data-ci": ci,
          onclick: function () { self.choose(q.id, ci); }
        }, [ self.el("span", { class: "choice-label", text: "(" + labels[ci] + ")" }), c ]));
      });
      block.appendChild(choices);
      qBox.appendChild(block);
    });
    root.appendChild(qBox);
    root.appendChild(this.el("div", { id: "lis-feedback" }));
    root.appendChild(this.el("div", { class: "test-footer" }, [
      this.el("button", { class: "primary", text: "答え合わせ", onclick: function () { self.check(p); } })
    ]));

    this.playPassage(p, false); // 自動で1回再生
  },
  choose: function (qid, ci) {
    this.answers[qid] = ci;
    var btns = document.querySelectorAll('#lis-questions .choice-btn[data-qid="' + qid + '"]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle("selected", Number(btns[i].getAttribute("data-ci")) === ci);
    }
  },
  check: function (p) {
    var self = this;
    var graded = Listening.gradeQuestions(p.questions, this.answers);
    graded.results.forEach(function (r) {
      self.results.push({ questionId: r.questionId, category: r.category, correct: r.correct });
    });

    var fb = document.getElementById("lis-feedback");
    App.clear(fb);
    // スクリプト
    var script = this.el("div", { class: "explanation" });
    p.lines.forEach(function (ln) {
      var who = ln.speaker && ln.speaker !== "N" ? ln.speaker + ": " : "";
      script.appendChild(self.el("div", { text: who + ln.text }));
    });
    script.appendChild(this.el("div", { class: "subtitle", text: "訳: " + p.translation }));
    fb.appendChild(script);
    // 各設問の正誤
    var labels = ["A", "B", "C", "D"];
    p.questions.forEach(function (q) {
      var res = graded.results.find(function (r) { return r.questionId === q.id; });
      var line = self.el("div", { class: "lis-result " + (res.correct ? "correct" : "wrong") });
      line.appendChild(self.el("span", { text: (res.correct ? "○ " : "× ") + "正解: (" + labels[q.answer] + ") " + q.choices[q.answer] }));
      fb.appendChild(line);
    });

    // フッターを次へに
    var footer = document.querySelector("#screen-listening .test-footer");
    App.clear(footer);
    var isLast = this.index === this.passages.length - 1;
    footer.appendChild(this.el("button", { class: "primary", text: isLast ? "結果を見る" : "次へ →",
      onclick: function () { self.next(); } }));
  },
  next: function () {
    if (this.index < this.passages.length - 1) { this.index++; this.renderPassage(); }
    else { this.finish(); }
  },
  finish: function () {
    var total = this.results.length;
    var correct = this.results.filter(function (r) { return r.correct; }).length;
    var iso = new Date().toISOString();
    var record = { id: iso, date: iso, setId: this.setId, total: total, correct: correct,
      rate: total ? correct / total : 0, items: this.results };
    var store = this._load(this.subjectId);
    store.results.push(record);
    this._save(this.subjectId, store);
    this.renderResult(record);
  },
  renderResult: function (record) {
    var self = this;
    var root = document.getElementById("screen-listening");
    App.clear(root);
    root.appendChild(this.el("h1", { text: "結果" }));
    root.appendChild(this.el("div", { class: "card" }, [
      this.el("div", { class: "score-big", text: record.correct + " / " + record.total + "問正解（" + Math.round(record.rate * 100) + "%）" })
    ]));
    root.appendChild(this.el("div", { class: "toolbar" }, [
      this.el("button", { class: "primary", text: "もう一度", onclick: function () { self.start(record.setId); } }),
      this.el("button", { text: "セット一覧へ", onclick: function () { self.renderSetList(); } })
    ]));
  },

  // ---- 苦手分析 ----
  renderAnalysis: function () {
    var self = this;
    var root = document.getElementById("screen-listening");
    App.clear(root);
    var store = this._load(this.subjectId);
    root.appendChild(this.el("h1", { text: "苦手分析（" + LISTEN[this.subjectId].label + "）" }));
    if (store.results.length === 0) {
      root.appendChild(this.el("div", { class: "card" }, [this.el("p", { text: "まだ記録がありません。" })]));
    } else {
      var cs = Listening.categoryStats(store.results, this.subjectId)
        .filter(function (c) { return c.attempts > 0; })
        .sort(function (a, b) { return a.rate - b.rate; });
      var card = this.el("div", { class: "card" }, [this.el("h2", { text: "カテゴリ別正答率（苦手順）" })]);
      cs.forEach(function (c) {
        var pct = Math.round(c.rate * 100);
        var fill = self.el("span", { class: "bar-fill" });
        fill.style.width = pct + "%";
        card.appendChild(self.el("div", { class: "bar-row" }, [
          self.el("span", { class: "bar-label", text: c.category }),
          self.el("span", { class: "bar-track" }, [fill]),
          self.el("span", { class: "bar-value", text: c.correct + "/" + c.attempts + " " + pct + "%" })
        ]));
      });
      root.appendChild(card);
    }
    root.appendChild(this.el("div", { class: "toolbar" }, [
      this.el("button", { text: "セット一覧へ", onclick: function () { self.renderSetList(); } })
    ]));
  }
};
