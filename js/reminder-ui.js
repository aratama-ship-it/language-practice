// 学習リマインダー設定画面・iCalendar受け渡し
var ReminderUI = {
  storageKey: "reminder-settings",
  icsText: "",
  el: function () { return App.el.apply(App, arguments); },

  _defaults: function () {
    return { days: ["MO", "TU", "WE", "TH", "FR"], time: "20:00", duration: 15 };
  },

  _loadSettings: function () {
    var defaults = this._defaults();
    try {
      var raw = localStorage.getItem(this.storageKey);
      if (!raw) return defaults;
      var data = JSON.parse(raw);
      var timeMatch = data && String(data.time).match(/^(\d{2}):(\d{2})$/);
      if (!data || !Array.isArray(data.days) || !timeMatch ||
          Number(timeMatch[1]) > 23 || Number(timeMatch[2]) > 59 ||
          [10, 15, 20].indexOf(Number(data.duration)) < 0) return defaults;
      var ordered = Reminder._orderedDays(data.days);
      return { days: ordered, time: data.time, duration: Number(data.duration) };
    } catch (e) { return defaults; }
  },

  _saveSettings: function (settings) {
    try { localStorage.setItem(this.storageKey, JSON.stringify(settings)); }
    catch (e) {}
  },

  _today: function (date) {
    return String(date.getFullYear()) + "-" + ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" + ("0" + date.getDate()).slice(-2);
  },

  _readDates: function (registry, arrayName) {
    var dates = [];
    for (var id in registry) {
      var subject = registry[id];
      if (!subject || !subject.storageKey) continue;
      try {
        var raw = localStorage.getItem(subject.storageKey);
        if (!raw) continue;
        var data = JSON.parse(raw);
        var records = data && Array.isArray(data[arrayName]) ? data[arrayName] : [];
        records.forEach(function (record) {
          if (record && typeof record.date === "string") dates.push(record.date.slice(0, 10));
        });
      } catch (e) {}
    }
    return dates;
  },

  _practiceDates: function () {
    return this._readDates(SUBJECTS, "sessions")
      .concat(this._readDates(DICT, "results"))
      .concat(this._readDates(LISTEN, "results"));
  },

  _buildForCurrentTime: function (settings) {
    var now = new Date();
    return Reminder.buildICS(settings, {
      now: now,
      uid: "eibutsu-renshu-" + now.getTime() + "@aratama-ship-it.github.io"
    });
  },

  open: function () {
    this.render();
    App.showScreen("reminder");
  },

  render: function () {
    var self = this;
    var root = document.getElementById("screen-reminder");
    App.clear(root);
    var settings = this._loadSettings();
    var now = new Date();
    var count = Reminder.streak(this._practiceDates(), this._today(now));

    root.appendChild(this.el("h1", { text: "学習リマインダー" }));
    root.appendChild(this.el("div", { class: "card" }, [
      this.el("div", {
        class: count > 0 ? "score-line" : "subtitle",
        text: count > 0 ? "🔥 " + count + "日連続で練習中" : "今日から始めましょう"
      })
    ]));

    var dayOptions = [
      { code: "MO", label: "月" }, { code: "TU", label: "火" },
      { code: "WE", label: "水" }, { code: "TH", label: "木" },
      { code: "FR", label: "金" }, { code: "SA", label: "土" },
      { code: "SU", label: "日" }
    ];
    var daysRow = this.el("div", { class: "reminder-days" });
    dayOptions.forEach(function (day) {
      var checkbox = self.el("input", { type: "checkbox", value: day.code, "data-reminder-day": day.code });
      checkbox.checked = settings.days.indexOf(day.code) >= 0;
      daysRow.appendChild(self.el("label", null, [checkbox, self.el("span", { text: day.label })]));
    });

    var timeInput = this.el("input", { type: "time", id: "reminder-time", value: settings.time });
    var durationSelect = this.el("select", { id: "reminder-duration" }, [10, 15, 20].map(function (minutes) {
      var option = self.el("option", { value: minutes, text: minutes + "分" });
      if (minutes === settings.duration) option.selected = true;
      return option;
    }));

    var settingsCard = this.el("div", { class: "card" }, [
      this.el("h3", { text: "曜日" }),
      daysRow,
      this.el("div", { class: "row" }, ["時刻：", timeInput]),
      this.el("div", { class: "row" }, ["1回の練習の想定時間：", durationSelect])
    ]);
    root.appendChild(settingsCard);

    var addButton = this.el("button", { class: "primary", text: "カレンダーに追加" });
    var fallbackLink = this.el("a", { text: "うまくいかないときはこちら", download: "eibutsu-renshu.ics" });
    root.appendChild(this.el("div", { class: "toolbar" }, [addButton, fallbackLink]));
    root.appendChild(this.el("p", { class: "subtitle" }, [
      "iPhoneのカレンダーに、繰り返しの予定とアラームとして登録されます。",
      this.el("br"),
      "通知はiPhone標準のカレンダーが出すので、このアプリを開いていなくても届きます。",
      this.el("br"),
      "やめたいときはカレンダーの予定を削除してください。",
      this.el("br"),
      "どちらを押しても反応しないときは、ホーム画面のアプリではなくSafariでこのページを開いて、もう一度押してください（登録は一度きりで済みます）。"
    ]));
    root.appendChild(this.el("div", { class: "toolbar" }, [
      this.el("button", { text: "ホームへ", onclick: function () { App.goHome(); } })
    ]));

    function readSettings() {
      var selected = [];
      var checks = root.querySelectorAll("[data-reminder-day]");
      for (var i = 0; i < checks.length; i++) if (checks[i].checked) selected.push(checks[i].value);
      return {
        days: Reminder._orderedDays(selected),
        time: timeInput.value,
        duration: Number(durationSelect.value)
      };
    }

    function updateCalendar() {
      settings = readSettings();
      self._saveSettings(settings);
      addButton.disabled = settings.days.length === 0;
      if (settings.days.length === 0) {
        self.icsText = "";
        fallbackLink.removeAttribute("href");
        return;
      }
      self.icsText = self._buildForCurrentTime(settings);
      fallbackLink.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(self.icsText);
    }

    var controls = settingsCard.querySelectorAll("input, select");
    for (var i = 0; i < controls.length; i++) controls[i].addEventListener("change", updateCalendar);
    addButton.addEventListener("click", function () { self.download(); });
    updateCalendar();
  },

  download: function () {
    if (!this.icsText) return;
    try {
      var blob = new Blob([this.icsText], { type: "text/calendar;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = url;
      link.download = "eibutsu-renshu.ics";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(function () { URL.revokeObjectURL(url); }, 0);
    } catch (e) {}
  }
};
