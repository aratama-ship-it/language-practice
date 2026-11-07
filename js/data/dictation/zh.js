// 中国語（台湾華語）ディクテーション Set 1（入門・20文）。2026-11-07 新規作成。繁体字。
// text は空欄の単位を示すため語の間を半角空白で区切る（表示・読み上げでは詰める）。句読点は前の語に付ける。
// blanks は0始まりの語 index。pinyin は声調符号つき（一・不 は変調後の発音で書く）。
DICT.chinese.sets[1] = {
  id: 1, label: "Set 1（入門）",
  items: [
    // --- 数字・時刻 (4) ---
    { id: "c1-1", text: "現在 三點 十五分。", pinyin: "Xiànzài sān diǎn shíwǔ fēn.", translation: "今は3時15分です。",
      blanks: [1, 2], category: "数字・時刻" },
    { id: "c1-2", text: "這個 一百二十 塊。", pinyin: "Zhège yìbǎi èrshí kuài.", translation: "これは120元です。",
      blanks: [1], category: "数字・時刻" },
    { id: "c1-3", text: "我 的 生日 是 五月 八號。", pinyin: "Wǒ de shēngrì shì wǔ yuè bā hào.", translation: "私の誕生日は5月8日です。",
      blanks: [4, 5], category: "数字・時刻" },
    { id: "c1-4", text: "火車 九點 半 出發。", pinyin: "Huǒchē jiǔ diǎn bàn chūfā.", translation: "列車は9時半に出発します。",
      blanks: [1, 2], category: "数字・時刻" },
    // --- 声調 (3) ---
    { id: "c1-5", text: "我 想 買 一 本 書。", pinyin: "Wǒ xiǎng mǎi yì běn shū.", translation: "本を1冊買いたいです。",
      blanks: [2], category: "声調" },
    { id: "c1-6", text: "他 在 賣 水果。", pinyin: "Tā zài mài shuǐguǒ.", translation: "彼は果物を売っています。",
      blanks: [2], category: "声調" },
    { id: "c1-7", text: "我 很 喜歡 喝 湯。", pinyin: "Wǒ hěn xǐhuān hē tāng.", translation: "スープを飲むのが好きです。",
      blanks: [4], category: "声調" },
    // --- 似た音 (3) ---
    { id: "c1-8", text: "她 是 我 的 老師。", pinyin: "Tā shì wǒ de lǎoshī.", translation: "彼女は私の先生です。",
      blanks: [1, 4], category: "似た音（zh/z・q/x など）" },
    { id: "c1-9", text: "我們 一起 去 吃 晚餐 吧。", pinyin: "Wǒmen yìqǐ qù chī wǎncān ba.", translation: "一緒に夕食を食べに行きましょう。",
      blanks: [1, 2], category: "似た音（zh/z・q/x など）" },
    { id: "c1-10", text: "這 是 誰 的 書？", pinyin: "Zhè shì shéi de shū?", translation: "これは誰の本ですか？",
      blanks: [0, 2], category: "似た音（zh/z・q/x など）" },
    // --- 量詞・助詞 (3) ---
    { id: "c1-11", text: "我 有 三 隻 貓。", pinyin: "Wǒ yǒu sān zhī māo.", translation: "猫を3匹飼っています。",
      blanks: [3], category: "量詞・助詞" },
    { id: "c1-12", text: "我 吃過 小籠包。", pinyin: "Wǒ chīguò xiǎolóngbāo.", translation: "小籠包を食べたことがあります。",
      blanks: [1], category: "量詞・助詞" },
    { id: "c1-13", text: "他 說 得 很 快。", pinyin: "Tā shuō de hěn kuài.", translation: "彼は話すのが速いです。",
      blanks: [2, 4], category: "量詞・助詞" },
    // --- よく使う語 (3) ---
    { id: "c1-14", text: "不好意思， 請問 捷運站 在 哪裡？", pinyin: "Bù hǎoyìsi, qǐngwèn jiéyùn zhàn zài nǎlǐ?", translation: "すみません、MRT の駅はどこですか？",
      blanks: [2, 4], category: "よく使う語" },
    { id: "c1-15", text: "謝謝 你 的 幫忙。", pinyin: "Xièxie nǐ de bāngmáng.", translation: "手伝ってくれてありがとう。",
      blanks: [0, 3], category: "よく使う語" },
    { id: "c1-16", text: "我 要 一 個 便當。", pinyin: "Wǒ yào yí ge biàndāng.", translation: "お弁当を1つください。",
      blanks: [4], category: "よく使う語" },
    // --- 文全体の聞き取り (4) ---
    { id: "c1-17", text: "我 每天 早上 七點 起床。", pinyin: "Wǒ měitiān zǎoshàng qī diǎn qǐchuáng.", translation: "私は毎朝7時に起きます。",
      blanks: [1, 4], category: "文全体の聞き取り" },
    { id: "c1-18", text: "今天 天氣 很 好， 我們 去 散步 吧。", pinyin: "Jīntiān tiānqì hěn hǎo, wǒmen qù sànbù ba.", translation: "今日はいい天気だから、散歩に行きましょう。",
      blanks: [1, 6], category: "文全体の聞き取り" },
    { id: "c1-19", text: "週末 你 有 空 嗎？", pinyin: "Zhōumò nǐ yǒu kòng ma?", translation: "週末、時間ありますか？",
      blanks: [0, 3], category: "文全体の聞き取り" },
    { id: "c1-20", text: "我 的 中文 還 不 太 好。", pinyin: "Wǒ de Zhōngwén hái bú tài hǎo.", translation: "私の中国語はまだあまり上手ではありません。",
      blanks: [2, 3], category: "文全体の聞き取り" }
  ]
};
