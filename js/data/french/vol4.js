// Vol.F4 語彙・会話表現（フランス語・仏検4級軸＋3級要素：日常語彙・定型表現・場面会話）。2026-11-07 新規作成。
// 各問の translation（fr＝空欄を埋めた正解文）と choiceTranslations（選択肢の文字列がキー）は結果詳細で表示する。
SUBJECTS.french.vols[4] = {
  label: "Vol.F4 語彙・会話表現",
  passages: [
    {
      id: "f4-p1", vol: 4, part: 6,
      title: "第21〜24問：次の手紙を読んでください。",
      body: "Bonjour Monsieur Petit,\n\nJe pars en voyage lundi prochain ---[Q21]--- deux semaines. Est-ce que vous pourriez arroser mes plantes ---[Q22]--- mon absence ?\n\nJe vous laisse la clé de l'appartement dans votre boîte aux lettres. Les plantes sont sur le balcon et dans la cuisine. Il faut ---[Q23]--- arroser deux fois par semaine.\n\nMerci beaucoup ! Je vous rapporterai un petit cadeau.\n\n---[Q24]---,\nClaire Dubois",
      translation: { ja: "プティさん、こんにちは。\n\n来週の月曜日から2週間の予定で旅行に出かけます。留守の間、植物に水をやっていただけないでしょうか？\n\nアパートの鍵はお宅の郵便受けに入れておきます。植物はバルコニーと台所にあります。週に2回水をやる必要があります。\n\nどうもありがとうございます！ ちょっとしたお土産を買ってきますね。\n\nよろしくお願いいたします。\nクレール・デュボワ", en: "Hello Mr. Petit,\n\nI'm leaving on a trip next Monday for two weeks. Could you water my plants while I'm away?\n\nI'll leave the key to the apartment in your mailbox. The plants are on the balcony and in the kitchen. They need to be watered twice a week.\n\nThank you very much! I'll bring you back a little present.\n\nBest regards,\nClaire Dubois" }
    },
    {
      id: "f4-p2", vol: 4, part: 7,
      title: "第25〜28問：次の案内を読んでください。",
      body: "CINÉMA LE RIALTO\n\nProgramme de la semaine\n\n« Le Grand Voyage » (film italien, 1 h 50)\nTous les jours à 14 h et à 20 h 30\n\n« Les Petits Héros » (dessin animé, 1 h 20)\nMercredi, samedi et dimanche à 10 h 30\n\nTarif normal : 9 euros\nÉtudiants et moins de 18 ans : 6 euros\nLe lundi, toutes les places sont à 5 euros.\n\nAttention : la séance de 20 h 30 est en version originale sous-titrée.",
      translation: { ja: "映画館ル・リアルト\n\n今週の上映予定\n\n『ル・グラン・ヴォワイヤージュ（大いなる旅）』（イタリア映画、1時間50分）\n毎日14時と20時30分\n\n『レ・プティ・ゼロ（小さなヒーローたち）』（アニメ、1時間20分）\n水曜・土曜・日曜の10時30分\n\n一般料金：9ユーロ\n学生・18歳未満：6ユーロ\n月曜日は全席5ユーロ。\n\nご注意：20時30分の回は字幕付きの原語版です。", en: "LE RIALTO CINEMA\n\nThis week's program\n\n\"The Great Journey\" (Italian film, 1 h 50 min)\nEvery day at 2 p.m. and 8:30 p.m.\n\n\"The Little Heroes\" (animated film, 1 h 20 min)\nWednesday, Saturday and Sunday at 10:30 a.m.\n\nRegular price: 9 euros\nStudents and under 18: 6 euros\nOn Mondays, all seats are 5 euros.\n\nPlease note: the 8:30 p.m. showing is in the original language with subtitles." }
    },
    {
      id: "f4-p3", vol: 4, part: 7,
      title: "第29〜32問：次の文章を読んでください。",
      body: "L'année dernière, la famille Martin a quitté Paris pour s'installer dans un petit village de Bretagne. Les parents, Paul et Anne, en avaient assez du bruit et de la pollution de la capitale.\n\nAujourd'hui, Paul travaille à la maison grâce à Internet. Anne a ouvert une petite librairie au centre du village. Leurs deux enfants vont à l'école à pied et ont beaucoup d'amis.\n\nBien sûr, la vie n'est pas toujours facile : il n'y a pas de cinéma et le premier supermarché est à vingt kilomètres. Mais toute la famille est contente de son choix.",
      translation: { ja: "去年、マルタン一家はパリを離れ、ブルターニュの小さな村に移り住んだ。両親のポールとアンヌは、首都の騒音と大気汚染にうんざりしていたのだ。\n\n今、ポールはインターネットのおかげで在宅で働いている。アンヌは村の中心に小さな書店を開いた。2人の子どもは歩いて学校に通い、友だちもたくさんいる。\n\nもちろん、生活はいつも楽なわけではない。映画館はなく、一番近いスーパーは20キロ先だ。それでも家族全員がこの選択に満足している。", en: "Last year, the Martin family left Paris to settle in a small village in Brittany. The parents, Paul and Anne, were fed up with the noise and pollution of the capital.\n\nToday, Paul works from home thanks to the internet. Anne opened a small bookstore in the center of the village. Their two children walk to school and have lots of friends.\n\nOf course, life isn't always easy: there's no movie theater and the nearest supermarket is twenty kilometers away. But the whole family is happy with their choice." }
    }
  ],
  questions: [
    {
      id: "f4-q1", vol: 4, part: 5, passageId: null, number: 1,
      question: "— Comment allez-vous ? — Très bien, merci. ------- ?",
      choices: ["À bientôt", "Et vous", "Et toi", "De rien"],
      answer: 1,
      explanation: "相手は vous で話しかけているので、聞き返すときも Et vous ?（あなたは？）。Et toi ? は tu で話す相手に使う。",
      translation: { fr: "— Comment allez-vous ? — Très bien, merci. Et vous ?", ja: "お元気ですか？ — とても元気です、ありがとう。あなたは？", en: "How are you? — Very well, thank you. And you?" },
      category: "語彙・会話表現"
    },
    {
      id: "f4-q2", vol: 4, part: 5, passageId: null, number: 2,
      question: "J'ai mal ------- tête depuis ce matin.",
      choices: ["à la", "au", "aux", "de la"],
      answer: 0,
      explanation: "avoir mal à + 体の部位 =「〜が痛い」。tête は女性名詞なので à la tête。男性名詞なら au ventre、複数なら aux dents。",
      translation: { fr: "J'ai mal à la tête depuis ce matin.", ja: "今朝から頭が痛い。", en: "I've had a headache since this morning." },
      category: "前置詞"
    },
    {
      id: "f4-q3", vol: 4, part: 5, passageId: null, number: 3,
      question: "— Vous désirez ? — Je ------- un croissant, s'il vous plaît.",
      choices: ["voudrions", "voudraient", "voudrait", "voudrais"],
      answer: 3,
      explanation: "主語 Je に対応する vouloir の条件法現在は voudrais。Je voudrais 〜 は店で注文するときのていねいな定番表現。",
      translation: { fr: "— Vous désirez ? — Je voudrais un croissant, s'il vous plaît.", ja: "何になさいますか？ — クロワッサンを1つください。", en: "What would you like? — I'd like a croissant, please." },
      category: "動詞の活用"
    },
    {
      id: "f4-q4", vol: 4, part: 5, passageId: null, number: 4,
      question: "Il fait très chaud aujourd'hui : il fait trente -------.",
      choices: ["mètres", "euros", "degrés", "heures"],
      answer: 2,
      explanation: "気温は il fait + 数 + degrés。trente degrés =「30度」。",
      translation: { fr: "Il fait très chaud aujourd'hui : il fait trente degrés.", ja: "今日はとても暑い。30度だ。", en: "It's very hot today: it's thirty degrees." },
      category: "語彙・会話表現"
    },
    {
      id: "f4-q5", vol: 4, part: 5, passageId: null, number: 5,
      question: "Mon père est ------- : il travaille dans un hôpital et soigne les malades.",
      choices: ["boulanger", "avocat", "facteur", "médecin"],
      answer: 3,
      explanation: "病院で病人を治療する（soigner les malades）のは médecin（医師）。boulanger はパン屋、avocat は弁護士、facteur は郵便配達員。職業名は être の後で無冠詞。",
      translation: { fr: "Mon père est médecin : il travaille dans un hôpital et soigne les malades.", ja: "父は医者で、病院で働いて病人を治療している。", en: "My father is a doctor: he works in a hospital and treats patients." },
      category: "語彙・会話表現"
    },
    {
      id: "f4-q6", vol: 4, part: 5, passageId: null, number: 6,
      question: "Pour envoyer cette lettre, il faut acheter un -------.",
      choices: ["ticket", "plan", "timbre", "billet"],
      answer: 2,
      explanation: "手紙を送るのに必要なのは timbre（切手）。billet は（列車・映画の）切符・紙幣、ticket は（地下鉄・バスの）切符、plan は地図・計画。",
      translation: { fr: "Pour envoyer cette lettre, il faut acheter un timbre.", ja: "この手紙を送るには切手を買わないといけない。", en: "To send this letter, you need to buy a stamp." },
      category: "語彙・会話表現"
    },
    {
      id: "f4-q7", vol: 4, part: 5, passageId: null, number: 7,
      question: "La boulangerie est fermée ; elle ouvre ------- une heure.",
      choices: ["dans", "il y a", "depuis", "en"],
      answer: 0,
      explanation: "dans + 時間 =「（今から）〜後に」。elle ouvre dans une heure =「1時間後に開く」。il y a は「〜前に」、depuis は「〜前から」、en は「（所要時間）〜で」。",
      translation: { fr: "La boulangerie est fermée ; elle ouvre dans une heure.", ja: "パン屋は閉まっている。1時間後に開く。", en: "The bakery is closed; it opens in an hour." },
      category: "前置詞"
    },
    {
      id: "f4-q8", vol: 4, part: 5, passageId: null, number: 8,
      question: "— Je peux fermer la fenêtre ? — Oui, -------.",
      choices: ["enchanté", "bien sûr", "de rien", "pas du tout"],
      answer: 1,
      explanation: "許可を求められて「もちろん」と答えるのは bien sûr。de rien は礼への返事、pas du tout は「全然〜ない」、enchanté は初対面のあいさつ。",
      translation: { fr: "— Je peux fermer la fenêtre ? — Oui, bien sûr.", ja: "窓を閉めてもいい？ — うん、もちろん。", en: "Can I close the window? — Yes, of course." },
      category: "語彙・会話表現"
    },
    {
      id: "f4-q9", vol: 4, part: 5, passageId: null, number: 9,
      question: "Après mercredi, c'est -------.",
      choices: ["jeudi", "vendredi", "mardi", "dimanche"],
      answer: 0,
      explanation: "曜日の順は lundi（月）, mardi（火）, mercredi（水）, jeudi（木）, vendredi（金）, samedi（土）, dimanche（日）。水曜の次は jeudi。",
      translation: { fr: "Après mercredi, c'est jeudi.", ja: "水曜日の次は木曜日だ。", en: "After Wednesday comes Thursday." },
      category: "語彙・会話表現"
    },
    {
      id: "f4-q10", vol: 4, part: 5, passageId: null, number: 10,
      question: "Je n'ai pas compris. Vous pouvez parler plus -------, s'il vous plaît ?",
      choices: ["lentes", "lentement", "lent", "lente"],
      answer: 1,
      explanation: "動詞 parler を修飾するので副詞が必要。形容詞 lent の女性形 lente + -ment → 副詞 lentement（ゆっくり）。",
      translation: { fr: "Je n'ai pas compris. Vous pouvez parler plus lentement, s'il vous plaît ?", ja: "わかりませんでした。もっとゆっくり話していただけますか？", en: "I didn't understand. Could you speak more slowly, please?" },
      category: "語彙・会話表現"
    },
    {
      id: "f4-q11", vol: 4, part: 5, passageId: null, number: 11,
      question: "Nous ------- au restaurant ce soir pour l'anniversaire de ma mère.",
      choices: ["dînent", "dîne", "dînons", "dînez"],
      answer: 2,
      explanation: "主語 Nous に対応する -er 動詞の現在形の語尾は -ons。dîner → nous dînons。",
      translation: { fr: "Nous dînons au restaurant ce soir pour l'anniversaire de ma mère.", ja: "今晩、母の誕生日にレストランで夕食をとる。", en: "We're having dinner at a restaurant tonight for my mother's birthday." },
      category: "動詞の活用"
    },
    {
      id: "f4-q12", vol: 4, part: 5, passageId: null, number: 12,
      question: "------- anniversaire !",
      choices: ["Bonne", "Bons", "Bonnes", "Bon"],
      answer: 3,
      explanation: "anniversaire は男性単数名詞なので形容詞も男性単数 Bon。Bon anniversaire ! =「誕生日おめでとう！」（Joyeux anniversaire ! とも言う）。",
      translation: { fr: "Bon anniversaire !", ja: "誕生日おめでとう！", en: "Happy birthday!" },
      category: "性数一致"
    },
    {
      id: "f4-q13", vol: 4, part: 5, passageId: null, number: 13,
      question: "Ce ------- est très confortable : je dors très bien.",
      choices: ["table", "chaise", "lit", "chambre"],
      answer: 2,
      explanation: "指示形容詞 ce は男性単数名詞の前に置く。chambre・table・chaise は女性名詞（cette が必要）。意味の上でも「よく眠れる」のは lit（ベッド）。",
      translation: { fr: "Ce lit est très confortable : je dors très bien.", ja: "このベッドはとても寝心地がいい。よく眠れる。", en: "This bed is very comfortable: I sleep very well." },
      category: "性数一致"
    },
    {
      id: "f4-q14", vol: 4, part: 5, passageId: null, number: 14,
      question: "J'ai acheté un kilo ------- pommes.",
      choices: ["de", "des", "du", "les"],
      answer: 0,
      explanation: "分量の表現（un kilo de, une bouteille de, beaucoup de など）の後では名詞に冠詞を付けず de だけ。un kilo de pommes。",
      translation: { fr: "J'ai acheté un kilo de pommes.", ja: "リンゴを1キロ買った。", en: "I bought a kilo of apples." },
      category: "冠詞・限定詞"
    },
    {
      id: "f4-q15", vol: 4, part: 5, passageId: null, number: 15,
      question: "Il est midi : c'est l'heure du -------.",
      choices: ["coucher", "petit-déjeuner", "goûter", "déjeuner"],
      answer: 3,
      explanation: "正午（midi）の食事は déjeuner（昼食）。petit-déjeuner は朝食、goûter はおやつ、l'heure du coucher は「寝る時間」。",
      translation: { fr: "Il est midi : c'est l'heure du déjeuner.", ja: "正午だ。お昼ごはんの時間だ。", en: "It's noon: it's lunchtime." },
      category: "語彙・会話表現"
    },
    {
      id: "f4-q16", vol: 4, part: 5, passageId: null, number: 16,
      question: "— Tu viens avec nous ce soir ? — Désolé, je ne peux pas, je suis -------.",
      choices: ["libre", "occupé", "content", "prêt"],
      answer: 1,
      explanation: "「行けない」理由になるのは occupé（忙しい）。libre（空いている）、prêt（準備ができた）、content（うれしい）では断る理由にならない。",
      translation: { fr: "— Tu viens avec nous ce soir ? — Désolé, je ne peux pas, je suis occupé.", ja: "今晩一緒に来る？ — ごめん、行けない。忙しいんだ。", en: "Are you coming with us tonight? — Sorry, I can't, I'm busy." },
      category: "語彙・会話表現"
    },
    {
      id: "f4-q17", vol: 4, part: 5, passageId: null, number: 17,
      question: "Pour aller à la gare, prenez la deuxième rue ------- droite.",
      choices: ["sur", "à", "en", "de"],
      answer: 1,
      explanation: "「右に・左に」は à droite / à gauche。道案内の定番表現。",
      translation: { fr: "Pour aller à la gare, prenez la deuxième rue à droite.", ja: "駅へ行くには、2本目の通りを右に曲がってください。", en: "To get to the station, take the second street on the right." },
      category: "前置詞"
    },
    {
      id: "f4-q18", vol: 4, part: 5, passageId: null, number: 18,
      question: "— Vous avez l'heure ? — Oui, il est -------.",
      choices: ["dix ans", "dix euros", "dix kilomètres", "dix heures et quart"],
      answer: 3,
      explanation: "Vous avez l'heure ? は「今何時かわかりますか？」。時刻は il est + 数 + heures。et quart =「15分」。",
      translation: { fr: "— Vous avez l'heure ? — Oui, il est dix heures et quart.", ja: "今何時かわかりますか？ — はい、10時15分です。", en: "Do you have the time? — Yes, it's a quarter past ten." },
      category: "語彙・会話表現"
    },
    {
      id: "f4-q19", vol: 4, part: 5, passageId: null, number: 19,
      question: "Mes parents ------- en vacances la semaine dernière.",
      choices: ["sont partis", "ont parti", "sont parti", "partent"],
      answer: 0,
      explanation: "partir は助動詞 être をとり、過去分詞は主語に一致する。Mes parents（男性複数扱い）→ sont partis。la semaine dernière（先週）なので現在形 partent は合わない。",
      translation: { fr: "Mes parents sont partis en vacances la semaine dernière.", ja: "両親は先週バカンスに出かけた。", en: "My parents went on vacation last week." },
      category: "動詞の活用"
    },
    {
      id: "f4-q20", vol: 4, part: 5, passageId: null, number: 20,
      question: "Il ------- 20 ans aujourd'hui.",
      choices: ["fait", "va", "a", "est"],
      answer: 2,
      explanation: "年齢は avoir で言う。Il a 20 ans =「彼は20歳だ」。英語の be 動詞に引きずられて est にしないこと。",
      translation: { fr: "Il a 20 ans aujourd'hui.", ja: "彼は今日で20歳になる。", en: "He turns 20 today." },
      category: "語彙・会話表現"
    },
    {
      id: "f4-q21", vol: 4, part: 6, passageId: "f4-p1", number: 21,
      question: "---[Q21]--- に入るものを選んでください。",
      choices: ["depuis", "il y a", "dès", "pour"],
      answer: 3,
      explanation: "partir pour + 期間 =「（予定として）〜の間出かける」。partir pour deux semaines。depuis（〜前から）や il y a（〜前に）は過去と結びつき、未来の予定には使えない。",
      translation: { fr: "Je pars en voyage lundi prochain pour deux semaines.", ja: "来週の月曜日から2週間の予定で旅行に出かけます。", en: "I'm leaving on a trip next Monday for two weeks." },
      category: "前置詞"
    },
    {
      id: "f4-q22", vol: 4, part: 6, passageId: "f4-p1", number: 22,
      question: "---[Q22]--- に入るものを選んでください。",
      choices: ["dans", "pendant", "depuis", "pour"],
      answer: 1,
      explanation: "pendant + 名詞 =「〜の間」。pendant mon absence =「私の留守の間」。",
      translation: { fr: "Est-ce que vous pourriez arroser mes plantes pendant mon absence ?", ja: "留守の間、植物に水をやっていただけないでしょうか？", en: "Could you water my plants while I'm away?" },
      category: "前置詞"
    },
    {
      id: "f4-q23", vol: 4, part: 6, passageId: "f4-p1", number: 23,
      question: "---[Q23]--- に入るものを選んでください。",
      choices: ["la", "en", "les", "leur"],
      answer: 2,
      explanation: "arroser は直接他動詞。前文の les plantes（女性複数）を受ける直接目的代名詞は les。leur は間接目的（人に）なので入らない。",
      translation: { fr: "Il faut les arroser deux fois par semaine.", ja: "週に2回水をやる必要があります。", en: "They need to be watered twice a week." },
      category: "代名詞"
    },
    {
      id: "f4-q24", vol: 4, part: 6, passageId: "f4-p1", number: 24,
      question: "---[Q24]--- に入るものを選んでください。",
      choices: ["Cordialement", "Salut", "Bisous", "Bonjour"],
      answer: 0,
      explanation: "vous で書く改まった手紙・メールの結びは Cordialement（よろしくお願いします）。Salut・Bisous は親しい相手向け、Bonjour は書き出しのあいさつ。",
      translation: { fr: "Cordialement, Claire Dubois", ja: "よろしくお願いいたします。クレール・デュボワ", en: "Best regards, Claire Dubois" },
      category: "語彙・会話表現"
    },
    {
      id: "f4-q25", vol: 4, part: 7, passageId: "f4-p2", number: 25,
      question: "Combien de temps dure « Le Grand Voyage » ?",
      choices: ["1 h 50", "1 h 20", "2 h 30", "1 h 30"],
      answer: 0,
      explanation: "本文：\"« Le Grand Voyage » (film italien, 1 h 50)\"。1 h 20 はアニメの上映時間。",
      translation: { ja: "『ル・グラン・ヴォワイヤージュ』の上映時間はどのくらいですか？", en: "How long is \"The Great Journey\"?" },
      choiceTranslations: { "1 h 50": { ja: "1時間50分", en: "1 hour 50 minutes" }, "1 h 20": { ja: "1時間20分", en: "1 hour 20 minutes" }, "2 h 30": { ja: "2時間30分", en: "2 hours 30 minutes" }, "1 h 30": { ja: "1時間30分", en: "1 hour 30 minutes" } },
      category: "読解"
    },
    {
      id: "f4-q26", vol: 4, part: 7, passageId: "f4-p2", number: 26,
      question: "Quand peut-on voir « Les Petits Héros » ?",
      choices: ["Tous les jours à 14 h", "Le vendredi à 10 h 30", "Le samedi matin", "Le lundi soir"],
      answer: 2,
      explanation: "本文：\"Mercredi, samedi et dimanche à 10 h 30\"。土曜の10時30分＝土曜日の午前。毎日14時は別の映画。",
      translation: { ja: "『レ・プティ・ゼロ』はいつ見られますか？", en: "When can you see \"The Little Heroes\"?" },
      choiceTranslations: { "Le samedi matin": { ja: "土曜日の午前", en: "On Saturday morning" }, "Le lundi soir": { ja: "月曜日の夜", en: "On Monday evening" }, "Tous les jours à 14 h": { ja: "毎日14時", en: "Every day at 2 p.m." }, "Le vendredi à 10 h 30": { ja: "金曜日の10時30分", en: "On Friday at 10:30 a.m." } },
      category: "読解"
    },
    {
      id: "f4-q27", vol: 4, part: 7, passageId: "f4-p2", number: 27,
      question: "Combien paie un étudiant le mardi ?",
      choices: ["3 euros", "6 euros", "9 euros", "5 euros"],
      answer: 1,
      explanation: "本文：\"Étudiants et moins de 18 ans : 6 euros\"。全席5ユーロになるのは月曜日だけなので、火曜日の学生は6ユーロ。",
      translation: { ja: "学生は火曜日にいくら払いますか？", en: "How much does a student pay on Tuesday?" },
      choiceTranslations: { "6 euros": { ja: "6ユーロ", en: "6 euros" }, "9 euros": { ja: "9ユーロ", en: "9 euros" }, "5 euros": { ja: "5ユーロ", en: "5 euros" }, "3 euros": { ja: "3ユーロ", en: "3 euros" } },
      category: "読解"
    },
    {
      id: "f4-q28", vol: 4, part: 7, passageId: "f4-p2", number: 28,
      question: "Qu'est-ce qui est particulier à la séance de 20 h 30 ?",
      choices: ["Les places sont gratuites", "C'est un dessin animé", "Elle est réservée aux étudiants", "Le film est sous-titré"],
      answer: 3,
      explanation: "本文：\"la séance de 20 h 30 est en version originale sous-titrée\"（20時30分の回は字幕付き原語版）。",
      translation: { ja: "20時30分の回の特徴は何ですか？", en: "What is special about the 8:30 p.m. showing?" },
      choiceTranslations: { "Le film est sous-titré": { ja: "字幕付きである", en: "The film has subtitles" }, "Les places sont gratuites": { ja: "無料である", en: "Seats are free" }, "C'est un dessin animé": { ja: "アニメである", en: "It's an animated film" }, "Elle est réservée aux étudiants": { ja: "学生専用である", en: "It's for students only" } },
      category: "読解"
    },
    {
      id: "f4-q29", vol: 4, part: 7, passageId: "f4-p3", number: 29,
      question: "Pourquoi les Martin ont-ils quitté Paris ?",
      choices: ["Pour être près de la mer", "Parce que les enfants voulaient changer d'école", "À cause du bruit et de la pollution", "Pour trouver du travail"],
      answer: 2,
      explanation: "本文：\"en avaient assez du bruit et de la pollution de la capitale\"（首都の騒音と汚染にうんざりしていた）。en avoir assez de 〜 =「〜にうんざりする」。海については本文に書かれていない。",
      translation: { ja: "マルタン一家はなぜパリを離れたのですか？", en: "Why did the Martins leave Paris?" },
      choiceTranslations: { "À cause du bruit et de la pollution": { ja: "騒音と大気汚染のため", en: "Because of the noise and pollution" }, "Pour trouver du travail": { ja: "仕事を見つけるため", en: "To find work" }, "Pour être près de la mer": { ja: "海の近くに住むため", en: "To be near the sea" }, "Parce que les enfants voulaient changer d'école": { ja: "子どもたちが転校したがったから", en: "Because the children wanted to change schools" } },
      category: "読解"
    },
    {
      id: "f4-q30", vol: 4, part: 7, passageId: "f4-p3", number: 30,
      question: "Que fait Anne maintenant ?",
      choices: ["Elle travaille à la maison", "Elle est institutrice", "Elle travaille dans un supermarché", "Elle tient une librairie"],
      answer: 3,
      explanation: "本文：\"Anne a ouvert une petite librairie\"（小さな書店を開いた）。在宅で働いているのは夫のポール。",
      translation: { ja: "アンヌは今何をしていますか？", en: "What does Anne do now?" },
      choiceTranslations: { "Elle tient une librairie": { ja: "書店を営んでいる", en: "She runs a bookstore" }, "Elle travaille à la maison": { ja: "在宅で働いている", en: "She works from home" }, "Elle est institutrice": { ja: "小学校の先生をしている", en: "She is a schoolteacher" }, "Elle travaille dans un supermarché": { ja: "スーパーで働いている", en: "She works in a supermarket" } },
      category: "読解"
    },
    {
      id: "f4-q31", vol: 4, part: 7, passageId: "f4-p3", number: 31,
      question: "Comment les enfants vont-ils à l'école ?",
      choices: ["À vélo", "À pied", "En bus", "En voiture"],
      answer: 1,
      explanation: "本文：\"Leurs deux enfants vont à l'école à pied\"（歩いて学校に通う）。",
      translation: { ja: "子どもたちはどうやって学校に行きますか？", en: "How do the children get to school?" },
      choiceTranslations: { "À pied": { ja: "歩いて", en: "On foot" }, "En bus": { ja: "バスで", en: "By bus" }, "En voiture": { ja: "車で", en: "By car" }, "À vélo": { ja: "自転車で", en: "By bike" } },
      category: "読解"
    },
    {
      id: "f4-q32", vol: 4, part: 7, passageId: "f4-p3", number: 32,
      question: "Quel est l'inconvénient de la vie au village ?",
      choices: ["Le supermarché est loin", "Il y a trop de bruit", "Les enfants n'ont pas d'amis", "Internet ne marche pas"],
      answer: 0,
      explanation: "本文：\"le premier supermarché est à vingt kilomètres\"（一番近いスーパーは20キロ先）。騒音はパリの問題で、子どもたちには友だちがたくさんいる。",
      translation: { ja: "村での生活の不便な点は何ですか？", en: "What is the drawback of village life?" },
      choiceTranslations: { "Le supermarché est loin": { ja: "スーパーが遠い", en: "The supermarket is far away" }, "Il y a trop de bruit": { ja: "騒音がひどい", en: "It's too noisy" }, "Les enfants n'ont pas d'amis": { ja: "子どもたちに友だちがいない", en: "The children have no friends" }, "Internet ne marche pas": { ja: "インターネットがつながらない", en: "The internet doesn't work" } },
      category: "読解"
    }
  ]
};
