// 中国語（台湾華語）リスニング Set 1（入門〜基礎）。2026-11-07 新規作成。繁体字。
// 各行の pinyin は台本表示用（声調符号つき。一・不 は変調後の発音で書く）。
LISTEN.chinese.sets[1] = {
  id: 1, label: "Set 1（入門〜基礎）",
  passages: [
    // ---- 質問応答 ×6 ----
    {
      id: "l1-p1", type: "qa",
      lines: [{ speaker: "N", text: "請問，現在幾點？", pinyin: "Qǐngwèn, xiànzài jǐ diǎn?" }],
      translation: "すみません、今何時ですか？",
      questions: [
        { id: "l1-p1-q1", q: "最も適切な応答を選んでください。",
          choices: ["三點半。", "我是學生。", "在捷運站。"],
          answer: 0, category: "応答選択" }
      ]
    },
    {
      id: "l1-p2", type: "qa",
      lines: [{ speaker: "N", text: "你要喝什麼？", pinyin: "Nǐ yào hē shénme?" }],
      translation: "何を飲みますか？",
      questions: [
        { id: "l1-p2-q1", q: "最も適切な応答を選んでください。",
          choices: ["好久不見。", "我要一杯紅茶。", "我喜歡看書。"],
          answer: 1, category: "応答選択" }
      ]
    },
    {
      id: "l1-p3", type: "qa",
      lines: [{ speaker: "N", text: "你是哪國人？", pinyin: "Nǐ shì nǎ guó rén?" }],
      translation: "どこの国の方ですか？",
      questions: [
        { id: "l1-p3-q1", q: "最も適切な応答を選んでください。",
          choices: ["我很好，謝謝。", "我是日本人。", "我住在台北。"],
          answer: 1, category: "応答選択" }
      ]
    },
    {
      id: "l1-p4", type: "qa",
      lines: [{ speaker: "N", text: "這件衣服多少錢？", pinyin: "Zhè jiàn yīfú duōshǎo qián?" }],
      translation: "この服はいくらですか？",
      questions: [
        { id: "l1-p4-q1", q: "最も適切な応答を選んでください。",
          choices: ["很漂亮。", "我沒有錢包。", "四百五十塊。"],
          answer: 2, category: "応答選択" }
      ]
    },
    {
      id: "l1-p5", type: "qa",
      lines: [{ speaker: "N", text: "你明天有空嗎？", pinyin: "Nǐ míngtiān yǒu kòng ma?" }],
      translation: "明日は時間がありますか？",
      questions: [
        { id: "l1-p5-q1", q: "最も適切な応答を選んでください。",
          choices: ["有，什麼事？", "我昨天去了。", "不客氣。"],
          answer: 0, category: "応答選択" }
      ]
    },
    {
      id: "l1-p6", type: "qa",
      lines: [{ speaker: "N", text: "對不起，我來晚了。", pinyin: "Duìbuqǐ, wǒ lái wǎn le." }],
      translation: "遅れてすみません。",
      questions: [
        { id: "l1-p6-q1", q: "最も適切な応答を選んでください。",
          choices: ["謝謝你。", "我也想去。", "沒關係，請坐。"],
          answer: 2, category: "応答選択" }
      ]
    },
    // ---- 会話 ×2（各3問） ----
    {
      id: "l1-p7", type: "conversation",
      lines: [
        { speaker: "W", text: "歡迎光臨。", pinyin: "Huānyíng guānglín." },
        { speaker: "M", text: "你好，我要買一瓶水和兩個飯糰。", pinyin: "Nǐ hǎo, wǒ yào mǎi yì píng shuǐ hé liǎng ge fàntuán." },
        { speaker: "W", text: "一共八十五塊。要袋子嗎？", pinyin: "Yígòng bāshíwǔ kuài. Yào dàizi ma?" },
        { speaker: "M", text: "不用，謝謝。我可以用悠遊卡嗎？", pinyin: "Bú yòng, xièxie. Wǒ kěyǐ yòng Yōuyóukǎ ma?" },
        { speaker: "W", text: "可以。", pinyin: "Kěyǐ." }
      ],
      translation: "女性：いらっしゃいませ。／男性：こんにちは、水を1本とおにぎりを2つください。／女性：全部で85元です。袋はご利用ですか？／男性：いりません、ありがとう。悠遊カード（台湾の交通系 IC カード）は使えますか？／女性：使えます。",
      questions: [
        { id: "l1-p7-q1", q: "他們在哪裡？",
          choices: ["在學校", "在銀行", "在便利商店", "在捷運站"],
          answer: 2, category: "話し手・場面" },
        { id: "l1-p7-q2", q: "男的買了什麼？",
          choices: ["兩瓶水和一個飯糰", "一杯咖啡", "一個便當", "一瓶水和兩個飯糰"],
          answer: 3, category: "詳細" },
        { id: "l1-p7-q3", q: "男的要用什麼付錢？",
          choices: ["現金", "悠遊卡", "信用卡", "手機"],
          answer: 1, category: "詳細" }
      ]
    },
    {
      id: "l1-p8", type: "conversation",
      lines: [
        { speaker: "M", text: "喂，美玲，妳今天晚上有空嗎？", pinyin: "Wéi, Měilíng, nǐ jīntiān wǎnshàng yǒu kòng ma?" },
        { speaker: "W", text: "有啊，怎麼了？", pinyin: "Yǒu a, zěnme le?" },
        { speaker: "M", text: "我想去看電影，妳想不想一起去？", pinyin: "Wǒ xiǎng qù kàn diànyǐng, nǐ xiǎng bu xiǎng yìqǐ qù?" },
        { speaker: "W", text: "好啊！幾點？", pinyin: "Hǎo a! Jǐ diǎn?" },
        { speaker: "M", text: "七點在電影院門口見，好嗎？", pinyin: "Qī diǎn zài diànyǐngyuàn ménkǒu jiàn, hǎo ma?" },
        { speaker: "W", text: "好。不過我六點半才下班，可能會晚一點到。", pinyin: "Hǎo. Búguò wǒ liù diǎn bàn cái xiàbān, kěnéng huì wǎn yìdiǎn dào." }
      ],
      translation: "男性：もしもし、美玲（メイリン）、今晩時間ある？／女性：あるよ、どうしたの？／男性：映画を見に行きたいんだけど、一緒に行かない？／女性：いいよ！何時？／男性：7時に映画館の入口で待ち合わせでいい？／女性：うん。でも6時半にやっと仕事が終わるから、少し遅れるかもしれない。",
      questions: [
        { id: "l1-p8-q1", q: "男的想做什麼？",
          choices: ["請美玲吃晚飯", "跟美玲去看電影", "去美玲的公司", "在家看電視"],
          answer: 1, category: "目的・概要" },
        { id: "l1-p8-q2", q: "他們幾點見面？",
          choices: ["六點半", "八點", "七點半", "七點"],
          answer: 3, category: "詳細" },
        { id: "l1-p8-q3", q: "美玲可能會怎麼樣？",
          choices: ["晚一點到", "不能去", "早一點到", "先去買票"],
          answer: 0, category: "言い換え・推測" }
      ]
    },
    // ---- 説明文 ×2（各3問） ----
    {
      id: "l1-p9", type: "talk",
      lines: [
        { speaker: "N", text: "各位旅客您好，本列車即將抵達台北車站。要轉乘板南線的旅客，請在本站下車。下車時，請小心月台間隙。謝謝。", pinyin: "Gèwèi lǚkè nín hǎo, běn lièchē jíjiāng dǐdá Táiběi chēzhàn. Yào zhuǎnchéng Bǎnnán xiàn de lǚkè, qǐng zài běn zhàn xià chē. Xià chē shí, qǐng xiǎoxīn yuètái jiànxì. Xièxie." }
      ],
      translation: "乗客の皆様、この列車はまもなく台北駅に到着します。板南線（MRT の路線名）にお乗り換えのお客様は、この駅でお降りください。お降りの際は、ホームとの隙間にご注意ください。",
      questions: [
        { id: "l1-p9-q1", q: "這是在哪裡聽到的廣播？",
          choices: ["在飛機上", "在捷運上", "在百貨公司", "在學校"],
          answer: 1, category: "話し手・場面" },
        { id: "l1-p9-q2", q: "要轉乘板南線的人要怎麼做？",
          choices: ["坐到下一站", "換坐公車", "再買一張票", "在台北車站下車"],
          answer: 3, category: "次の行動・依頼" },
        { id: "l1-p9-q3", q: "下車的時候要小心什麼？",
          choices: ["月台間隙", "手機", "下雨", "行李"],
          answer: 0, category: "詳細" }
      ]
    },
    {
      id: "l1-p10", type: "talk",
      lines: [
        { speaker: "N", text: "明天的天氣預報：台北早上是晴天，下午會下雨，最高溫度三十二度。出門的時候，請記得帶雨傘。", pinyin: "Míngtiān de tiānqì yùbào: Táiběi zǎoshàng shì qíngtiān, xiàwǔ huì xià yǔ, zuì gāo wēndù sānshí'èr dù. Chūmén de shíhòu, qǐng jìdé dài yǔsǎn." }
      ],
      translation: "明日の天気予報です。台北は朝は晴れ、午後は雨、最高気温は32度です。お出かけの際は傘をお忘れなく。",
      questions: [
        { id: "l1-p10-q1", q: "明天下午的天氣怎麼樣？",
          choices: ["是晴天", "會下雪", "會下雨", "很冷"],
          answer: 2, category: "詳細" },
        { id: "l1-p10-q2", q: "明天最高溫度是幾度？",
          choices: ["二十三度", "三十二度", "三十度", "十二度"],
          answer: 1, category: "詳細" },
        { id: "l1-p10-q3", q: "出門的時候要記得做什麼？",
          choices: ["穿外套", "多喝水", "早點回家", "帶雨傘"],
          answer: 3, category: "次の行動・依頼" }
      ]
    }
  ]
};
