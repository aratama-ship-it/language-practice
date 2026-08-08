// 学習リマインダーの iCalendar 生成・連続日数計算
var Reminder = {
  _dayCodes: ["MO", "TU", "WE", "TH", "FR", "SA", "SU"],

  _pad2: function (n) { return ("0" + n).slice(-2); },

  _localDate: function (value) {
    if (value && typeof value.getTime === "function") {
      var copy = new Date(value.getTime());
      return isNaN(copy.getTime()) ? null : copy;
    }
    if (typeof value === "number") {
      var fromNumber = new Date(value);
      return isNaN(fromNumber.getTime()) ? null : fromNumber;
    }
    if (typeof value === "string") {
      var match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (match) {
        var year = Number(match[1]);
        var month = Number(match[2]);
        var day = Number(match[3]);
        var local = new Date(year, month - 1, day);
        if (local.getFullYear() === year && local.getMonth() === month - 1 && local.getDate() === day) return local;
        return null;
      }
      var parsed = new Date(value);
      return isNaN(parsed.getTime()) ? null : parsed;
    }
    return null;
  },

  _formatLocal: function (date) {
    return String(date.getFullYear()) + this._pad2(date.getMonth() + 1) + this._pad2(date.getDate()) +
      "T" + this._pad2(date.getHours()) + this._pad2(date.getMinutes()) + this._pad2(date.getSeconds());
  },

  _formatUTC: function (date) {
    return String(date.getUTCFullYear()) + this._pad2(date.getUTCMonth() + 1) + this._pad2(date.getUTCDate()) +
      "T" + this._pad2(date.getUTCHours()) + this._pad2(date.getUTCMinutes()) + this._pad2(date.getUTCSeconds()) + "Z";
  },

  _orderedDays: function (days) {
    var selected = Array.isArray(days) ? days : [];
    return this._dayCodes.filter(function (day) { return selected.indexOf(day) >= 0; });
  },

  _nextStart: function (days, hour, minute, now) {
    var jsDayToCode = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
    for (var offset = 0; offset <= 7; offset++) {
      var candidate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset, hour, minute, 0, 0);
      if (days.indexOf(jsDayToCode[candidate.getDay()]) >= 0 && candidate.getTime() >= now.getTime()) return candidate;
    }
    return null;
  },

  buildICS: function (settings, opts) {
    settings = settings || {};
    opts = opts || {};

    var days = this._orderedDays(settings.days);
    if (days.length === 0) throw new Error("曜日を1つ以上選んでください");

    var timeMatch = String(settings.time || "").match(/^(\d{2}):(\d{2})$/);
    if (!timeMatch) throw new Error("時刻の形式が不正です");
    var hour = Number(timeMatch[1]);
    var minute = Number(timeMatch[2]);
    if (hour > 23 || minute > 59) throw new Error("時刻の形式が不正です");

    var duration = Number(settings.duration);
    if ([10, 15, 20].indexOf(duration) < 0) throw new Error("練習時間が不正です");
    if (!opts.uid) throw new Error("UIDが必要です");

    var now = this._localDate(opts.now);
    if (!now) throw new Error("現在日時が必要です");

    var start = this._nextStart(days, hour, minute, now);
    if (!start) throw new Error("開始日時を決められませんでした");
    var end = new Date(start.getTime() + duration * 60 * 1000);

    var lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//ARATA URAWA//Language Practice//JA",
      "BEGIN:VEVENT",
      "UID:" + String(opts.uid).replace(/[\r\n]/g, ""),
      "DTSTAMP:" + this._formatUTC(now),
      "DTSTART:" + this._formatLocal(start),
      "DTEND:" + this._formatLocal(end),
      "RRULE:FREQ=WEEKLY;BYDAY=" + days.join(","),
      "SUMMARY:英仏練習",
      "DESCRIPTION:TOEIC・フランス語の練習。https://aratama-ship-it.github.io/language-practice/",
      "URL:https://aratama-ship-it.github.io/language-practice/",
      "BEGIN:VALARM",
      "TRIGGER:PT0M",
      "ACTION:DISPLAY",
      "DESCRIPTION:英仏練習の時間です",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ];
    return lines.join("\r\n") + "\r\n";
  },

  _dayNumber: function (value) {
    if (typeof value !== "string") return null;
    var match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;
    var year = Number(match[1]);
    var month = Number(match[2]);
    var day = Number(match[3]);
    var millis = Date.UTC(year, month - 1, day);
    var check = new Date(millis);
    if (check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) return null;
    return Math.floor(millis / 86400000);
  },

  streak: function (dates, today) {
    var todayNumber = this._dayNumber(today);
    if (todayNumber === null || !Array.isArray(dates)) return 0;

    var practiced = {};
    for (var i = 0; i < dates.length; i++) {
      var dayNumber = this._dayNumber(dates[i]);
      if (dayNumber !== null) practiced[dayNumber] = true;
    }

    var current = practiced[todayNumber] ? todayNumber : todayNumber - 1;
    if (!practiced[current]) return 0;

    var count = 0;
    while (practiced[current]) {
      count++;
      current--;
    }
    return count;
  }
};
