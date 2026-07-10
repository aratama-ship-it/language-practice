// フランス語ディクテーション Set 1（基礎・20文）。2026-07-04 新規作成。
// アクサンは正確に付与。blanks は0始まりの語index。
DICT.french.sets[1] = {
  id: 1, label: "Set 1（基礎）",
  items: [
    // --- 数字 (3) ---
    { id: "f1-1", text: "Il y a trois enfants.", translation: "子どもが3人います。",
      blanks: [3], category: "数字" },
    { id: "f1-2", text: "Le livre coûte douze euros.", translation: "その本は12ユーロです。",
      blanks: [3], category: "数字" },
    { id: "f1-3", text: "Nous sommes le quatorze juillet.", translation: "今日は7月14日です。",
      blanks: [3], category: "数字" },
    // --- リエゾン・アンシェヌマン (3) ---
    { id: "f1-4", text: "Nous allons au cinéma.", translation: "私たちは映画館へ行きます。",
      blanks: [1, 2], category: "リエゾン・アンシェヌマン" },
    { id: "f1-5", text: "Ils habitent aux États-Unis.", translation: "彼らはアメリカに住んでいます。",
      blanks: [1, 2], category: "リエゾン・アンシェヌマン" },
    { id: "f1-6", text: "Vous avez un petit ami.", translation: "あなたには恋人がいます。",
      blanks: [1, 3], category: "リエゾン・アンシェヌマン" },
    // --- 鼻母音 (3) ---
    { id: "f1-7", text: "Le pain est sur la table.", translation: "パンはテーブルの上にあります。",
      blanks: [1], category: "鼻母音" },
    { id: "f1-8", text: "Mon oncle habite à Lyon.", translation: "私のおじはリヨンに住んでいます。",
      blanks: [0, 1], category: "鼻母音" },
    { id: "f1-9", text: "Comment vas-tu ce matin ?", translation: "今朝は調子はどう？",
      blanks: [0, 4], category: "鼻母音" },
    // --- é/è/e の綴り (3) ---
    { id: "f1-10", text: "J'ai acheté un café.", translation: "私はコーヒーを一杯買いました。",
      blanks: [1, 3], category: "é/è/e の綴り" },
    { id: "f1-11", text: "Ma mère préfère le thé.", translation: "母は紅茶の方が好きです。",
      blanks: [2, 3], category: "é/è/e の綴り" },
    { id: "f1-12", text: "L'élève est très occupé.", translation: "その生徒はとても忙しい。",
      blanks: [0, 3], category: "é/è/e の綴り" },
    // --- 男性形・女性形の音差 (3) ---
    { id: "f1-13", text: "C'est une grande maison blanche.", translation: "これは大きな白い家です。",
      blanks: [2, 4], category: "男性形・女性形の音差" },
    { id: "f1-14", text: "Elle est une bonne étudiante.", translation: "彼女は良い学生です。",
      blanks: [3, 4], category: "男性形・女性形の音差" },
    { id: "f1-15", text: "La première question est facile.", translation: "最初の質問は簡単です。",
      blanks: [1], category: "男性形・女性形の音差" },
    // --- 文全体の聞き取り (5) ---
    { id: "f1-16", text: "Bonjour, comment allez-vous ?", translation: "こんにちは、お元気ですか。",
      blanks: [1, 2], category: "文全体の聞き取り" },
    { id: "f1-17", text: "Je voudrais un verre d'eau.", translation: "水を一杯ください。",
      blanks: [1, 4], category: "文全体の聞き取り" },
    { id: "f1-18", text: "Où est la gare, s'il vous plaît ?", translation: "駅はどこですか。",
      blanks: [0, 3], category: "文全体の聞き取り" },
    { id: "f1-19", text: "Nous partons en vacances demain.", translation: "私たちは明日バカンスに出発します。",
      blanks: [1, 3, 4], category: "文全体の聞き取り" },
    { id: "f1-20", text: "Merci beaucoup pour votre aide.", translation: "ご協力どうもありがとうございます。",
      blanks: [2, 4], category: "文全体の聞き取り" }
  ]
};
