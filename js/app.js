// 画面制御・イベント配線
// XSS防止のため文字列HTMLは使わず、すべて createElement / textContent でDOMを構築する
var App = {
  session: null,
  lastRecord: null,
  lastOpts: null,
  timerId: null,
  currentIndex: 0,

  // ---------- DOM ヘルパー ----------
  el: function (tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        var v = attrs[k];
        if (typeof v === "function" && k.indexOf("on") === 0) {
          node.addEventListener(k.slice(2), v);
        } else if (k === "class") {
          node.className = v;
        } else if (k === "text") {
          node.textContent = v;
        } else if (v !== null && v !== undefined) {
          node.setAttribute(k, v);
        }
      }
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  },

  clear: function (node) { node.textContent = ""; },

  init: function () {
    if (!Storage2.available()) {
      document.getElementById("storage-warning").classList.remove("hidden");
    }
    this.renderHome();
    this.showScreen("home");
  },

  showScreen: function (name) {
    var screens = document.querySelectorAll(".screen");
    for (var i = 0; i < screens.length; i++) screens[i].classList.add("hidden");
    document.getElementById("screen-" + name).classList.remove("hidden");
    window.scrollTo(0, 0);
  },

  fmtDate: function (iso) {
    var d = new Date(iso);
    return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() +
      " " + d.getHours() + ":" + ("0" + d.getMinutes()).slice(-2);
  },

  // ---------- ホーム ----------
  volStats: function (volId, sessions) {
    var runs = sessions.filter(function (s) { return s.mode === "vol" && s.volId === volId; });
    var stats = { attempts: runs.length, best: null, last: null };
    runs.forEach(function (s) {
      var score = s.answers.filter(function (a) { return a.correct; }).length;
      if (stats.best === null || score > stats.best) stats.best = score;
      stats.last = score; // sessions は追加順なので最後が直近
    });
    return stats;
  },

  renderHome: function () {
    var self = this;
    var sessions = Storage2.load().sessions;
    var root = document.getElementById("screen-home");
    this.clear(root);

    // バージョン表示（端末のアプリが最新に入れ替わったかを目視で確認するため、一番上に出す）
    if (typeof APP_VERSION !== "undefined") {
      root.appendChild(this.el("div", { class: "app-version" }, [
        this.el("strong", { text: "ver." + APP_VERSION.build }),
        " ・ " + APP_VERSION.date + " ・ " + APP_VERSION.hash
      ]));
    }

    // 教科タブ
    var tabs = this.el("div", { class: "subject-tabs" });
    BANK.ids().forEach(function (id) {
      var cls = "subject-tab" + (id === BANK.activeId ? " active" : "");
      tabs.appendChild(self.el("button", {
        class: cls, text: BANK.subjects[id].label,
        onclick: function () { self.switchSubject(id); }
      }));
    });
    root.appendChild(tabs);

    root.appendChild(this.el("h1", { text: BANK.active().label + " 練習" }));

    var totalN = BANK.allQuestions().length;
    if (totalN === 0) {
      root.appendChild(this.el("p", { class: "subtitle", text: "この教科の問題は準備中です。" }));
      return;
    }
    root.appendChild(this.el("p", {
      class: "subtitle",
      text: "全" + totalN + "問 / セット全体の制限時間つき・終了後に解答解説と弱点分析"
    }));

    Object.keys(BANK.vols()).map(Number).sort(function (a, b) { return a - b; })
      .forEach(function (volId) {
        var v = BANK.vols()[volId];
        var n = v.questions.length;
        var st = self.volStats(volId, sessions);
        var defMin = Math.round(Quiz.defaultTimeLimitSec("vol", n) / 60);

        var meta = n + "問 ・ 受験 " + st.attempts + "回";
        if (st.best !== null) meta += " ・ 最高 " + st.best + "/" + n + " ・ 前回 " + st.last + "/" + n;

        var select = self.el("select", { id: "time-vol" + volId },
          [10, 15, 20, 25, 30, 35, 40].map(function (m) {
            var attrs = { value: m, text: m + "分" };
            if (m === defMin) attrs.selected = "";
            return self.el("option", attrs);
          }));

        var halfButtons = Quiz.halfSets(volId).map(function (set) {
          return self.el("button", {
            text: set.label + " " + set.qids.length + "問",
            onclick: function () { self.startHalf(volId, set.key); }
          });
        });

        root.appendChild(self.el("div", { class: "card" }, [
          self.el("h3", { text: v.label }),
          self.el("div", { class: "meta", text: meta }),
          self.el("div", { class: "row" }, [
            "制限時間 ", select,
            self.el("button", {
              class: "primary", text: "挑戦する",
              onclick: function () { self.startVol(volId); }
            })
          ]),
          self.el("div", { class: "row half-row" }, ["10分版： "].concat(halfButtons))
        ]));
      });

    var importInput = this.el("input", {
      type: "file", id: "import-file", accept: ".json,application/json", class: "hidden",
      onchange: function (e) {
        if (e.target.files && e.target.files[0]) self.importData(e.target.files[0]);
        e.target.value = "";
      }
    });

    root.appendChild(this.el("div", { class: "toolbar" }, [
      this.el("button", { text: "弱点復習", onclick: function () { self.toggleReviewPanel(); } }),
      this.el("button", { text: "成績分析", onclick: function () { self.openAnalysis(); } }),
      this.el("button", { text: "ディクテーション練習", onclick: function () { DictationUI.open(BANK.activeId); } }),
      this.el("button", { text: "リスニング", onclick: function () { ListeningUI.open(BANK.activeId); } }),
      this.el("button", { text: "学習リマインダー", onclick: function () { ReminderUI.open(); } }),
      this.el("button", { text: "データ書き出し", onclick: function () { self.exportData(); } }),
      this.el("button", { text: "データ読み込み", onclick: function () { importInput.click(); } }),
      importInput
    ]));

    root.appendChild(this.buildReviewPanel());
  },

  buildReviewPanel: function () {
    var self = this;
    var catSelect = this.el("select", { id: "rev-category" },
      BANK.categories().map(function (c) {
        return self.el("option", { value: c, text: c });
      }));

    function radio(name, value, label, checked) {
      var attrs = { type: "radio", name: name, value: value };
      if (checked) attrs.checked = "";
      return self.el("label", null, [self.el("input", attrs), " " + label]);
    }

    return this.el("div", { id: "review-panel", class: "card hidden" }, [
      this.el("h3", { text: "弱点復習" }),
      this.el("div", { class: "field" }, [
        "出題：",
        radio("rev-source", "wrong", "間違えた問題から", true),
        radio("rev-source", "category", "カテゴリを選ぶ", false),
        catSelect
      ]),
      this.el("div", { class: "field" }, [
        "問題数：",
        radio("rev-count", "10", "10問", true),
        radio("rev-count", "20", "20問", false),
        radio("rev-count", "all", "全部", false)
      ]),
      this.el("button", {
        class: "primary", text: "復習を開始",
        onclick: function () { self.startReviewFromPanel(); }
      })
    ]);
  },

  switchSubject: function (id) {
    BANK.setActive(id);
    this.renderHome();
    this.showScreen("home");
  },

  startVol: function (volId) {
    var min = Number(document.getElementById("time-vol" + volId).value);
    this.startTest({ mode: "vol", volId: volId, timeLimitSec: min * 60 });
  },

  startHalf: function (volId, halfKey) {
    var set = Quiz.halfSets(volId).filter(function (h) { return h.key === halfKey; })[0];
    if (!set) return;
    this.startTest({
      mode: "half", volId: volId, halfKey: halfKey,
      questionIds: set.qids, timeLimitSec: 600
    });
  },

  toggleReviewPanel: function () {
    document.getElementById("review-panel").classList.toggle("hidden");
  },

  startReviewFromPanel: function () {
    var source = document.querySelector('input[name="rev-source"]:checked').value;
    var countVal = document.querySelector('input[name="rev-count"]:checked').value;
    var count = countVal === "all" ? "all" : Number(countVal);
    var category = document.getElementById("rev-category").value;
    this.startReview({ source: source, category: category, count: count });
  },

  startReview: function (opts) {
    var sessions = Storage2.load().sessions;
    var qids = Analysis.buildReviewSet(sessions, opts);
    if (qids.length === 0) { alert("該当する問題がありません"); return; }
    var mode = opts.source === "wrong" ? "review-wrong" : "review-category";
    this.startTest({
      mode: mode,
      category: opts.source === "category" ? opts.category : null,
      questionIds: qids,
      timeLimitSec: Quiz.defaultTimeLimitSec(mode, qids.length)
    });
  },

  exportData: function () {
    var d = new Date();
    var name = BANK.activeId + "-data-" + d.getFullYear() + "-" +
      ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + ".json";
    var blob = new Blob([Storage2.exportJSON()], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
  },

  importData: function (file) {
    var self = this;
    if (!confirm("現在の成績データを読み込んだ内容で置き換えます。よろしいですか？")) return;
    var reader = new FileReader();
    reader.onload = function () {
      var result = Storage2.importJSON(String(reader.result));
      if (result.ok) {
        alert("読み込みました");
        self.renderHome();
      } else {
        alert("読み込めませんでした: " + result.error);
      }
    };
    reader.readAsText(file);
  },

  // ---------- テスト ----------
  startTest: function (opts) {
    this.lastOpts = opts;
    this.session = Quiz.createSession({
      mode: opts.mode, volId: opts.volId, category: opts.category,
      halfKey: opts.halfKey, questionIds: opts.questionIds,
      timeLimitSec: opts.timeLimitSec, now: Date.now()
    });
    this.currentIndex = 0;
    this.renderTest();
    this.startTimer();
    this.showScreen("test");
  },

  startTimer: function () {
    var self = this;
    this.stopTimer();
    this.updateTimer();
    this.timerId = setInterval(function () { self.updateTimer(); }, 250);
  },

  stopTimer: function () {
    if (this.timerId) { clearInterval(this.timerId); this.timerId = null; }
  },

  updateTimer: function () {
    if (!this.session) return;
    var remain = Quiz.remainingSec(this.session, Date.now());
    var el = document.getElementById("test-timer");
    if (el) {
      el.textContent = Math.floor(remain / 60) + ":" + ("0" + (remain % 60)).slice(-2);
      el.classList.toggle("warning", remain <= 180);
    }
    if (Quiz.isTimeUp(this.session, Date.now())) {
      this.finishTest(true);
    }
  },

  renderTest: function () {
    var self = this;
    var root = document.getElementById("screen-test");
    this.clear(root);
    var total = this.session.order.length;

    root.appendChild(this.el("div", { class: "test-header" }, [
      this.el("span", { class: "timer", id: "test-timer", text: "--:--" }),
      this.el("span", { class: "progress", id: "test-progress" }),
      this.el("button", { text: "中断", onclick: function () { self.abortTest(); } })
    ]));

    var nav = this.el("div", { class: "qnav" });
    for (var i = 0; i < total; i++) {
      (function (idx) {
        nav.appendChild(self.el("button", {
          class: "qnav-btn", id: "qnav-" + idx, text: String(idx + 1),
          onclick: function () { self.goTo(idx); }
        }));
      })(i);
    }
    root.appendChild(nav);

    root.appendChild(this.el("div", { id: "test-question" }));

    root.appendChild(this.el("div", { class: "test-footer" }, [
      this.el("button", {
        id: "btn-prev", text: "← 前へ",
        onclick: function () { self.goTo(self.currentIndex - 1); }
      }),
      this.el("button", {
        class: "primary", text: "採点する",
        onclick: function () { self.finishTest(false); }
      }),
      this.el("button", {
        id: "btn-next", text: "次へ →",
        onclick: function () { self.goTo(self.currentIndex + 1); }
      })
    ]));

    this.renderQuestion();
  },

  goTo: function (index) {
    if (index < 0 || index >= this.session.order.length) return;
    this.currentIndex = index;
    this.renderQuestion();
  },

  buildPassage: function (passageId) {
    var p = BANK.getPassage(passageId);
    return this.el("div", { class: "passage" }, [
      this.el("div", { class: "passage-title", text: p.title }),
      p.body
    ]);
  },

  renderQuestion: function () {
    var self = this;
    var s = this.session;
    var total = s.order.length;
    var qid = s.order[this.currentIndex];
    var q = BANK.getQuestion(qid);

    document.getElementById("test-progress").textContent =
      "Q" + (this.currentIndex + 1) + " / " + total;

    for (var i = 0; i < total; i++) {
      var btn = document.getElementById("qnav-" + i);
      btn.classList.toggle("answered", s.answers[s.order[i]] !== null);
      btn.classList.toggle("current", i === this.currentIndex);
    }

    var box = document.getElementById("test-question");
    this.clear(box);

    if (q.passageId) box.appendChild(this.buildPassage(q.passageId));

    box.appendChild(this.el("div", { class: "question-text" }, [
      this.el("strong", { text: "Q" + q.number + ". " }), q.question
    ]));

    var labels = ["A", "B", "C", "D"];
    var choices = this.el("div", { class: "choices" });
    for (var c = 0; c < 4; c++) {
      (function (idx) {
        var cls = "choice-btn" + (s.answers[qid] === idx ? " selected" : "");
        choices.appendChild(self.el("button", {
          class: cls,
          onclick: function () { self.choose(idx); }
        }, [
          self.el("span", { class: "choice-label", text: "(" + labels[idx] + ")" }),
          q.choices[idx]
        ]));
      })(c);
    }
    box.appendChild(choices);

    document.getElementById("btn-prev").disabled = this.currentIndex === 0;
    document.getElementById("btn-next").disabled = this.currentIndex === total - 1;
  },

  choose: function (choiceIndex) {
    var qid = this.session.order[this.currentIndex];
    Quiz.selectAnswer(this.session, qid, choiceIndex);
    this.renderQuestion();
  },

  abortTest: function () {
    if (!confirm("中断すると今回の解答は保存されません。中断しますか？")) return;
    this.stopTimer();
    this.session = null;
    this.goHome();
  },

  finishTest: function (auto) {
    if (!this.session) return;
    if (!auto) {
      var un = this.session.order.length - Quiz.answeredCount(this.session);
      if (un > 0 && !confirm("未回答が " + un + " 問あります。採点しますか？")) return;
    }
    this.stopTimer();
    var record = Quiz.grade(this.session, Date.now());
    this.session = null;
    if (!Storage2.addSession(record) && Storage2.available()) {
      alert("保存に失敗しました。ホーム画面から書き出しを行ってください。");
    }
    this.lastRecord = record;
    this.showResult(record);
  },

  // ---------- 結果 ----------
  showResult: function (record) {
    var self = this;
    var root = document.getElementById("screen-result");
    this.clear(root);

    var total = record.answers.length;
    var score = record.answers.filter(function (a) { return a.correct; }).length;
    var pct = Math.round((score / total) * 100);
    var usedMin = Math.floor(record.timeUsedSec / 60);
    var usedSec = record.timeUsedSec % 60;

    root.appendChild(this.el("h1", { text: "結果" }));
    root.appendChild(this.el("div", { class: "card" }, [
      this.el("div", { class: "score-big", text: score + " / " + total + "問正解（" + pct + "%）" }),
      this.el("div", {
        class: "meta",
        text: Analysis.sessionLabel(record) + " ・ 使用時間 " + usedMin + "分" + ("0" + usedSec).slice(-2) + "秒"
      })
    ]));

    root.appendChild(this.el("div", { class: "card" }, [
      this.el("h2", { text: "Part別" }),
      this.buildBars(Analysis.partStats([record]).map(function (p) {
        return { label: BANK.active().sectionLabels[p.part], attempts: p.attempts, correct: p.correct, rate: p.rate };
      }))
    ]));

    root.appendChild(this.el("div", { class: "card" }, [
      this.el("h2", { text: "カテゴリ別" }),
      this.buildBars(Analysis.categoryStats([record]).map(function (c) {
        return { label: c.category, attempts: c.attempts, correct: c.correct, rate: c.rate };
      }))
    ]));

    root.appendChild(this.el("h2", { text: "全問の解答と解説" }));
    record.answers.forEach(function (a) {
      var q = BANK.getQuestion(a.qid);
      var snippet = q.question.length > 40 ? q.question.slice(0, 40) + "…" : q.question;
      root.appendChild(self.el("details", { class: "result-item" }, [
        self.el("summary", null, [
          self.el("span", { class: "mark " + (a.correct ? "correct" : "wrong"), text: a.correct ? "○" : "×" }),
          self.el("strong", { text: "Q" + q.number }),
          self.el("span", { class: "snippet", text: snippet })
        ]),
        self.el("div", { class: "result-detail" }, self.buildQuestionDetail(q, a.chosen))
      ]));
    });

    root.appendChild(this.el("div", { class: "toolbar" }, [
      this.el("button", { class: "primary", text: "もう一度挑戦", onclick: function () { self.retry(); } }),
      this.el("button", { text: "ホームへ", onclick: function () { self.goHome(); } })
    ]));

    this.showScreen("result");
  },

  buildBars: function (rows) {
    var self = this;
    var box = this.el("div");
    var any = false;
    rows.forEach(function (r) {
      if (r.attempts === 0) return;
      any = true;
      var pct = Math.round(r.rate * 100);
      var fill = self.el("span", { class: "bar-fill" });
      fill.style.width = pct + "%";
      box.appendChild(self.el("div", { class: "bar-row" }, [
        self.el("span", { class: "bar-label", text: r.label }),
        self.el("span", { class: "bar-track" }, [fill]),
        self.el("span", { class: "bar-value", text: r.correct + "/" + r.attempts + "問 " + pct + "%" })
      ]));
    });
    if (!any) box.appendChild(this.el("p", { class: "subtitle", text: "データがありません" }));
    return box;
  },

  buildQuestionDetail: function (q, chosen) {
    var nodes = [];
    if (q.passageId) nodes.push(this.buildPassage(q.passageId));
    nodes.push(this.el("div", { class: "question-text", text: q.question }));

    var labels = ["A", "B", "C", "D"];
    for (var c = 0; c < 4; c++) {
      var cls = "result-choice";
      var children = ["(" + labels[c] + ") " + q.choices[c]];
      if (c === q.answer) {
        cls += " is-answer";
        children.push(this.el("span", { class: "badge badge-ok", text: "正解" }));
      }
      if (c === chosen && c !== q.answer) {
        cls += " is-chosen-wrong";
        children.push(this.el("span", { class: "badge badge-you", text: "あなたの解答" }));
      }
      if (c === chosen && c === q.answer) {
        children.push(this.el("span", { class: "badge badge-ok", text: "あなたの解答" }));
      }
      nodes.push(this.el("div", { class: cls }, children));
    }
    if (chosen === null) nodes.push(this.el("p", { class: "subtitle", text: "この問題は未回答でした" }));
    nodes.push(this.el("div", { class: "explanation", text: q.explanation }));
    nodes.push(this.el("div", { class: "subtitle", text: "カテゴリ: " + q.category }));
    return nodes;
  },

  retry: function () {
    if (this.lastOpts) this.startTest(this.lastOpts);
  },

  goHome: function () {
    this.renderHome();
    this.showScreen("home");
  },

  // ---------- 分析 ----------
  openAnalysis: function () {
    this.renderAnalysis();
    this.showScreen("analysis");
  },

  renderAnalysis: function () {
    var self = this;
    var root = document.getElementById("screen-analysis");
    this.clear(root);
    var sessions = Storage2.load().sessions;

    root.appendChild(this.el("h1", { text: "成績分析" }));

    var homeBtn = this.el("div", { class: "toolbar" }, [
      this.el("button", { text: "ホームへ", onclick: function () { self.goHome(); } })
    ]);

    if (sessions.length === 0) {
      root.appendChild(this.el("div", { class: "card" }, [
        this.el("p", { text: "まだ記録がありません。まずは1セット挑戦しましょう。" })
      ]));
      root.appendChild(homeBtn);
      return;
    }

    var cs = Analysis.categoryStats(sessions)
      .filter(function (c) { return c.attempts > 0; })
      .sort(function (a, b) { return a.rate - b.rate; });
    root.appendChild(this.el("div", { class: "card" }, [
      this.el("h2", { text: "カテゴリ別正答率（全期間）" }),
      this.buildBars(cs.map(function (c) {
        return { label: c.category, attempts: c.attempts, correct: c.correct, rate: c.rate };
      }))
    ]));

    var weakest = Analysis.weakestCategories(sessions, 5).slice(0, 3);
    if (weakest.length > 0) {
      root.appendChild(this.el("h2", { text: "苦手カテゴリ" }));
      weakest.forEach(function (c) {
        root.appendChild(self.el("div", { class: "card weak-card" }, [
          self.el("h3", { text: c.category }),
          self.el("div", {
            class: "meta",
            text: "正答率 " + Math.round(c.rate * 100) + "%（" + c.correct + "/" + c.attempts + "問）"
          }),
          self.el("button", {
            class: "primary", text: "このカテゴリを復習する",
            onclick: function () {
              self.startReview({ source: "category", category: c.category, count: 10 });
            }
          })
        ]));
      });
    }

    root.appendChild(this.el("h2", { text: "セッション履歴" }));
    var table = this.el("table", { class: "history" });
    table.appendChild(this.el("tr", null, [
      this.el("th", { text: "日時" }), this.el("th", { text: "内容" }),
      this.el("th", { text: "スコア" }), this.el("th", { text: "正答率" })
    ]));
    Analysis.sessionSummaries(sessions).forEach(function (s) {
      table.appendChild(self.el("tr", null, [
        self.el("td", { text: self.fmtDate(s.date) }),
        self.el("td", { text: s.label }),
        self.el("td", { text: s.score + "/" + s.total }),
        self.el("td", { text: Math.round(s.rate * 100) + "%" })
      ]));
    });
    root.appendChild(table);

    root.appendChild(homeBtn);
  }
};

App.init();
