// 教科横断の問題バンク。subjects.js の後、各 data ファイルより前に読み込む。
var BANK = {
  subjects: SUBJECTS,
  activeId: "toeic",
  active: function () { return this.subjects[this.activeId]; },
  setActive: function (id) { if (this.subjects[id]) this.activeId = id; },
  ids: function () { var out = []; for (var k in this.subjects) out.push(k); return out; },
  categories: function () { return this.active().categories; },
  vols: function () { return this.active().vols; },
  _questionsOf: function (subj) {
    var out = [];
    var ids = Object.keys(subj.vols).map(Number).sort(function (a, b) { return a - b; });
    for (var i = 0; i < ids.length; i++) out = out.concat(subj.vols[ids[i]].questions);
    return out;
  },
  allQuestions: function () { return this._questionsOf(this.active()); },
  _find: function (subj, qid) {
    var all = this._questionsOf(subj);
    for (var i = 0; i < all.length; i++) if (all[i].id === qid) return all[i];
    return null;
  },
  getQuestion: function (qid) {
    var q = this._find(this.active(), qid);
    if (q) return q;
    for (var k in this.subjects) {
      if (k === this.activeId) continue;
      q = this._find(this.subjects[k], qid);
      if (q) return q;
    }
    return null;
  },
  getPassage: function (pid) {
    for (var k in this.subjects) {
      var subj = this.subjects[k];
      for (var v in subj.vols) {
        var ps = subj.vols[v].passages;
        for (var i = 0; i < ps.length; i++) if (ps[i].id === pid) return ps[i];
      }
    }
    return null;
  }
};
