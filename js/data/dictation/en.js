// 英語ディクテーション Set 1（基礎・20文）。2026-07-04 新規作成。
// blanks は0始まりの語index（空白区切り、句読点は語に含む）。
DICT.toeic.sets[1] = {
  id: 1, label: "Set 1（基礎）",
  items: [
    // --- 数字・時刻 (3) ---
    { id: "e1-1", text: "The meeting starts at nine.", translation: "会議は9時に始まります。",
      blanks: [4], category: "数字・時刻" },
    { id: "e1-2", text: "There are thirty people in the room.", translation: "部屋に30人います。",
      blanks: [2], category: "数字・時刻" },
    { id: "e1-3", text: "The train leaves at a quarter past six.", translation: "電車は6時15分に出ます。",
      blanks: [4, 5, 7], category: "数字・時刻" },
    // --- 弱形・リンキング (3) ---
    { id: "e1-4", text: "I would have called you earlier.", translation: "もっと早く電話すればよかった。",
      blanks: [1, 2], category: "弱形・リンキング" },
    { id: "e1-5", text: "A cup of tea would be nice.", translation: "お茶を一杯いただけたら嬉しいです。",
      blanks: [1, 2], category: "弱形・リンキング" },
    { id: "e1-6", text: "She has been waiting for an hour.", translation: "彼女は1時間待っています。",
      blanks: [1, 2, 6], category: "弱形・リンキング" },
    // --- 似た子音(l/r, b/v) (3) ---
    { id: "e1-7", text: "Please collect the results by Friday.", translation: "金曜までに結果を集めてください。",
      blanks: [1, 3], category: "似た子音(l/r, b/v)" },
    { id: "e1-8", text: "The river is very close to the village.", translation: "その川は村のすぐ近くにあります。",
      blanks: [1, 7], category: "似た子音(l/r, b/v)" },
    { id: "e1-9", text: "We received a large box of vegetables.", translation: "大きな野菜の箱を受け取りました。",
      blanks: [1, 5], category: "似た子音(l/r, b/v)" },
    // --- 前置詞・冠詞の聞き取り (3) ---
    { id: "e1-10", text: "He put the report on the desk.", translation: "彼は報告書を机の上に置いた。",
      blanks: [4], category: "前置詞・冠詞の聞き取り" },
    { id: "e1-11", text: "She works at a bank in the city.", translation: "彼女は市内の銀行で働いています。",
      blanks: [2, 3, 5], category: "前置詞・冠詞の聞き取り" },
    { id: "e1-12", text: "The keys are under the newspaper.", translation: "鍵は新聞の下にあります。",
      blanks: [3], category: "前置詞・冠詞の聞き取り" },
    // --- 短母音・長母音 (3) ---
    { id: "e1-13", text: "He sat on the seat near the window.", translation: "彼は窓際の席に座った。",
      blanks: [1, 4], category: "短母音・長母音" },
    { id: "e1-14", text: "The ship will leave the port soon.", translation: "船はまもなく港を出ます。",
      blanks: [1, 3], category: "短母音・長母音" },
    { id: "e1-15", text: "I need a sheet of paper.", translation: "紙が一枚必要です。",
      blanks: [3], category: "短母音・長母音" },
    // --- 文全体の聞き取り (5) ---
    { id: "e1-16", text: "Thank you for your quick reply.", translation: "早いお返事をありがとうございます。",
      blanks: [3, 4, 5], category: "文全体の聞き取り" },
    { id: "e1-17", text: "Could you send me the file again?", translation: "もう一度ファイルを送ってもらえますか。",
      blanks: [0, 3, 5], category: "文全体の聞き取り" },
    { id: "e1-18", text: "The store is closed on Sundays.", translation: "その店は日曜は閉まっています。",
      blanks: [3, 5], category: "文全体の聞き取り" },
    { id: "e1-19", text: "We look forward to seeing you soon.", translation: "近いうちにお会いできるのを楽しみにしています。",
      blanks: [2, 4], category: "文全体の聞き取り" },
    { id: "e1-20", text: "Please let me know if you have any questions.", translation: "質問があればお知らせください。",
      blanks: [1, 3, 8], category: "文全体の聞き取り" }
  ]
};
