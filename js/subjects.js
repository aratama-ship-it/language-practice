// 教科レジストリ。bank.js・各 data ファイルより先に読み込む。
var SUBJECTS = {
  toeic: {
    id: "toeic",
    label: "TOEIC",
    storageKey: "toeic-app-data",
    idPrefix: "v",
    categories: ["前置詞・慣用表現", "動詞の形・時制", "品詞判断",
      "構文・接続詞", "語彙", "文脈把握", "読解"],
    sectionLabels: { 5: "Part 5", 6: "Part 6", 7: "Part 7" },
    // 本番ペース（1問あたりの秒数）。リーディングは75分・100問（公式）。部ごとの配分は受験対策で広く使われる目安
    // （Part 5 約10分・30問、Part 6 約10分・16問、Part 7 約55分・54問）。2026-11-09 TAC ほかで確認
    pace: { 5: 20, 6: 37.5, 7: 61, label: "本番ペース" },
    vols: {}
  },
  french: {
    id: "french",
    label: "フランス語",
    storageKey: "french-app-data",
    idPrefix: "f",
    categories: ["動詞の活用", "冠詞・限定詞", "性数一致", "代名詞",
      "前置詞", "語彙・会話表現", "読解"],
    sectionLabels: { 5: "第1部 文法・語彙", 6: "第2部 穴埋め", 7: "第3部 読解" },
    vols: {}
  },
  // 中国語は台湾華語（繁体字・zh-TW の声）。2026-11-07 追加
  chinese: {
    id: "chinese",
    label: "中国語",
    storageKey: "chinese-app-data",
    idPrefix: "c",
    categories: ["量詞", "語順・文型", "助詞（了・過・著・的）", "副詞・接続詞",
      "疑問・否定", "語彙・会話表現", "読解"],
    sectionLabels: { 5: "第1部 文法・語彙", 6: "第2部 穴埋め", 7: "第3部 読解" },
    vols: {}
  }
};
