// ディクテーション教科レジストリ。dictation/en.js・fr.js より先に読み込む。
var DICT = {
  toeic: {
    id: "toeic", label: "TOEIC（英語）", lang: "en-US", storageKey: "toeic-dictation-data",
    categories: ["数字・時刻", "弱形・リンキング", "似た子音(l/r, b/v)",
      "前置詞・冠詞の聞き取り", "短母音・長母音", "文全体の聞き取り"],
    sets: {}
  },
  french: {
    id: "french", label: "フランス語", lang: "fr-FR", storageKey: "french-dictation-data",
    categories: ["リエゾン・アンシェヌマン", "鼻母音", "数字",
      "é/è/e の綴り", "男性形・女性形の音差", "文全体の聞き取り"],
    sets: {}
  },
  ids: function () { var o = []; for (var k in this) if (this[k] && this[k].sets) o.push(k); return o; },
  allItems: function (subjectId) {
    var subj = this[subjectId];
    var out = [];
    var sids = Object.keys(subj.sets).map(Number).sort(function (a, b) { return a - b; });
    for (var i = 0; i < sids.length; i++) out = out.concat(subj.sets[sids[i]].items);
    return out;
  }
};
