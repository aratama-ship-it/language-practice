// リスニング教科レジストリ。listening/en.js・fr.js より先に読み込む。
var LISTEN = {
  toeic: {
    id: "toeic", label: "TOEIC（英語）", lang: "en-US", storageKey: "toeic-listening-data",
    categories: ["応答選択", "目的・概要", "詳細", "言い換え・推測", "次の行動・依頼", "話し手・場面"],
    sets: {}
  },
  french: {
    id: "french", label: "フランス語", lang: "fr-FR", storageKey: "french-listening-data",
    categories: ["応答選択", "目的・概要", "詳細", "言い換え・推測", "次の行動・依頼", "話し手・場面"],
    sets: {}
  },
  ids: function () { var o = []; for (var k in this) if (this[k] && this[k].sets) o.push(k); return o; },
  passages: function (subjectId) {
    var subj = this[subjectId], out = [];
    var sids = Object.keys(subj.sets).map(Number).sort(function (a, b) { return a - b; });
    for (var i = 0; i < sids.length; i++) out = out.concat(subj.sets[sids[i]].passages);
    return out;
  },
  questions: function (subjectId) {
    var out = [];
    this.passages(subjectId).forEach(function (p) { out = out.concat(p.questions); });
    return out;
  }
};
