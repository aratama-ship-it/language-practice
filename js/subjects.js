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
  }
};
