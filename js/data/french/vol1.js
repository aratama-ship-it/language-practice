// Vol.F1 基礎総合（フランス語・仏検4級軸＋3級要素）。2026-07-04 新規作成。
// part 5/6/7 は仕組み流用のためのセクション番号（第1部/第2部/第3部）。
SUBJECTS.french.vols[1] = {
  label: "Vol.F1 基礎総合",
  passages: [
    {
      id: "f1-p1", vol: 1, part: 6,
      title: "第21〜24問：次のメールを読んでください。",
      body: "Chère Camille,\n\nMerci pour ton message. Je suis très content ---[Q21]--- venir à ta fête samedi prochain. C'est une très bonne idée !\n\nJe vais apporter un gâteau ---[Q22]--- chocolat, parce que je sais que tu adores ça. ---[Q23]--- tu as besoin d'autre chose, dis-le-moi.\n\nÀ samedi ! Je ---[Q24]--- appellerai vendredi soir pour confirmer l'heure.\n\nBises,\nLucas",
      translation: { ja: "親愛なるカミーユへ\n\nメッセージをありがとう。今度の土曜日、君のパーティーに行けてとてもうれしいよ。すごくいいアイデアだね！\n\nチョコレートケーキを持っていくね、君が大好きなのを知っているから。ほかに何か必要なものがあれば言ってね。\n\nじゃあ土曜日に！時間の確認のため、金曜の夜に電話するね。\n\nまたね（親しい相手への結び）\nリュカ", en: "Dear Camille,\n\nThanks for your message. I'm very happy to come to your party next Saturday. It's a really good idea!\n\nI'll bring a chocolate cake, because I know you love it. If you need anything else, let me know.\n\nSee you Saturday! I'll call you on Friday evening to confirm the time.\n\nLove,\nLucas" }
    },
    {
      id: "f1-p2", vol: 1, part: 7,
      title: "第25〜28問：次の広告を読んでください。",
      body: "CAFÉ DU MARCHÉ\n\nOuvert tous les jours sauf le lundi\nDe 8 h à 19 h\n\nNotre café vous propose :\n· Petit-déjeuner servi jusqu'à 11 h\n· Déjeuner du jour à 12 euros (plat + dessert)\n· Pâtisseries maison toute la journée\n\nTous les mercredis, un concert de jazz à partir de 18 h.\nEntrée gratuite pour les clients du restaurant.\n\nRéservation conseillée le week-end.\nTéléphone : 01 42 55 18 30\nAdresse : 14, rue des Lilas, Paris",
      translation: { ja: "カフェ・デュ・マルシェ\n\n月曜日を除き毎日営業\n8時〜19時\n\n当店のご案内：\n・朝食は11時まで\n・本日のランチ 12ユーロ（料理＋デザート）\n・自家製ケーキは終日\n\n毎週水曜日は18時からジャズコンサート。\nレストランのお客様は入場無料。\n\n週末はご予約をおすすめします。\n電話：01 42 55 18 30\n住所：パリ、リラ通り14番地", en: "CAFÉ DU MARCHÉ\n\nOpen every day except Monday\nFrom 8 a.m. to 7 p.m.\n\nWe offer:\n· Breakfast served until 11 a.m.\n· Lunch of the day for 12 euros (main course + dessert)\n· Homemade pastries all day\n\nEvery Wednesday, a jazz concert from 6 p.m.\nFree entry for restaurant customers.\n\nReservations recommended on weekends.\nPhone: 01 42 55 18 30\nAddress: 14 rue des Lilas, Paris" }
    },
    {
      id: "f1-p3", vol: 1, part: 7,
      title: "第29〜32問：次の文章を読んでください。",
      body: "Julie habite à Lyon depuis trois ans. Avant, elle habitait à Marseille, où elle est née. Elle travaille comme infirmière dans un grand hôpital du centre-ville.\n\nLe matin, elle prend son vélo pour aller au travail, parce que c'est plus rapide que le bus. Elle commence à sept heures et demie et finit vers dix-huit heures.\n\nLe week-end, Julie aime se promener au bord du fleuve avec son chien. Elle aime aussi cuisiner pour ses amis. Le mois prochain, elle va partir en vacances en Italie avec sa sœur.",
      translation: { ja: "ジュリーは3年前からリヨンに住んでいる。以前は、生まれ故郷のマルセイユに住んでいた。彼女は中心街の大きな病院で看護師として働いている。\n\n朝は自転車で通勤する。バスより速いからだ。7時半に仕事を始め、18時ごろに終える。\n\n週末、ジュリーは犬と一緒に川沿いを散歩するのが好きだ。友人のために料理をするのも好きだ。来月は姉（妹）と一緒にイタリアへバカンスに出かける予定だ。", en: "Julie has been living in Lyon for three years. Before that, she lived in Marseille, where she was born. She works as a nurse in a large hospital downtown.\n\nIn the morning, she rides her bike to work, because it's faster than the bus. She starts at 7:30 and finishes around 6 p.m.\n\nOn weekends, Julie likes to walk along the river with her dog. She also likes cooking for her friends. Next month, she's going on vacation to Italy with her sister." }
    }
  ],
  questions: [
    {
      id: "f1-q1", vol: 1, part: 5, passageId: null, number: 1,
      question: "Bonjour ! Je ------- Paul. Et toi, comment tu t'appelles ?",
      choices: ["s'appelle", "vous appelez", "m'appelle", "t'appelles"],
      answer: 2,
      explanation: "代名動詞 s'appeler（〜という名前である）の一人称単数。主語 Je に対応するのは me + appelle → m'appelle。",
      translation: { fr: "Bonjour ! Je m'appelle Paul. Et toi, comment tu t'appelles ?", ja: "こんにちは！僕はポールです。君の名前は？", en: "Hello! My name is Paul. And you, what's your name?" },
      category: "動詞の活用"
    },
    {
      id: "f1-q2", vol: 1, part: 5, passageId: null, number: 2,
      question: "Nous ------- des étudiants. Nous étudions le français.",
      choices: ["sommes", "êtes", "suis", "es"],
      answer: 0,
      explanation: "être の直説法現在。主語 Nous に対応するのは sommes。",
      translation: { fr: "Nous sommes des étudiants. Nous étudions le français.", ja: "私たちは学生です。フランス語を勉強しています。", en: "We are students. We study French." },
      category: "動詞の活用"
    },
    {
      id: "f1-q3", vol: 1, part: 5, passageId: null, number: 3,
      question: "Hier, nous ------- au cinéma avec des amis.",
      choices: ["irons", "allions", "allons", "sommes allés"],
      answer: 3,
      explanation: "Hier（昨日）＝過去の完了した動作なので複合過去。aller は助動詞に être をとり、主語 nous に一致して allés。→ sommes allés。",
      translation: { fr: "Hier, nous sommes allés au cinéma avec des amis.", ja: "昨日、私たちは友人たちと映画館へ行きました。", en: "Yesterday, we went to the movies with some friends." },
      category: "動詞の活用"
    },
    {
      id: "f1-q4", vol: 1, part: 5, passageId: null, number: 4,
      question: "Elle a acheté une ------- voiture rouge.",
      choices: ["bel", "belle", "beaux", "beau"],
      answer: 1,
      explanation: "voiture は女性名詞なので形容詞 beau は女性形 belle に一致。une belle voiture。",
      translation: { fr: "Elle a acheté une belle voiture rouge.", ja: "彼女はすてきな赤い車を買った。", en: "She bought a beautiful red car." },
      category: "性数一致"
    },
    {
      id: "f1-q5", vol: 1, part: 5, passageId: null, number: 5,
      question: "Je bois ------- café tous les matins.",
      choices: ["de l'", "du", "de la", "des"],
      answer: 1,
      explanation: "café は男性名詞で数えられない量を表すので部分冠詞 du（de + le）。「（いくらかの）コーヒーを飲む」。",
      translation: { fr: "Je bois du café tous les matins.", ja: "私は毎朝コーヒーを飲む。", en: "I drink coffee every morning." },
      category: "冠詞・限定詞"
    },
    {
      id: "f1-q6", vol: 1, part: 5, passageId: null, number: 6,
      question: "Ce livre est intéressant. Je vais ------- lire ce soir.",
      choices: ["la", "lui", "les", "le"],
      answer: 3,
      explanation: "直接目的語 ce livre（男性単数）を受ける代名詞は le。「それを読む」。lui は間接目的（人）。",
      translation: { fr: "Ce livre est intéressant. Je vais le lire ce soir.", ja: "この本はおもしろい。今晩それを読むつもりだ。", en: "This book is interesting. I'm going to read it tonight." },
      category: "代名詞"
    },
    {
      id: "f1-q7", vol: 1, part: 5, passageId: null, number: 7,
      question: "Nous habitons ------- Japon depuis deux ans.",
      choices: ["au", "aux", "à", "en"],
      answer: 0,
      explanation: "国名で男性名詞（le Japon）には「〜に住む」で au（à + le）を使う。en は女性名詞の国（en France）。",
      translation: { fr: "Nous habitons au Japon depuis deux ans.", ja: "私たちは2年前から日本に住んでいる。", en: "We have been living in Japan for two years." },
      category: "前置詞"
    },
    {
      id: "f1-q8", vol: 1, part: 5, passageId: null, number: 8,
      question: "— Tu as faim ? — Oui, je voudrais ------- à manger.",
      choices: ["quelqu'un", "rien", "quelque chose", "personne"],
      answer: 2,
      explanation: "quelque chose = 「何か」。quelque chose à manger =「何か食べるもの」→「何か食べたい」。rien は「何も〜ない」、quelqu'un/personne は「人」。",
      translation: { fr: "— Tu as faim ? — Oui, je voudrais quelque chose à manger.", ja: "お腹すいた？ — うん、何か食べたいな。", en: "Are you hungry? — Yes, I'd like something to eat." },
      category: "語彙・会話表現"
    },
    {
      id: "f1-q9", vol: 1, part: 5, passageId: null, number: 9,
      question: "Quand j'étais petit, je ------- souvent chez mes grands-parents.",
      choices: ["irai", "vais", "suis allé", "allais"],
      answer: 3,
      explanation: "「子どものころ、よく〜した」という過去の習慣は半過去。aller の半過去一人称 allais。実際の文では母音の前で je → j' となり j'allais と書く。",
      translation: { fr: "Quand j'étais petit, j'allais souvent chez mes grands-parents.", ja: "子どものころ、私はよく祖父母の家に行っていた。", en: "When I was little, I often went to my grandparents' house." },
      category: "動詞の活用"
    },
    {
      id: "f1-q10", vol: 1, part: 5, passageId: null, number: 10,
      question: "Voici Marie et sa sœur. ------- sont très gentilles.",
      choices: ["Ils", "Elles", "Il", "Elle"],
      answer: 1,
      explanation: "Marie と sa sœur は両方女性 → 女性複数の主語代名詞 Elles。形容詞も gentilles（女性複数）で一致。",
      translation: { fr: "Voici Marie et sa sœur. Elles sont très gentilles.", ja: "こちらはマリーとその姉（妹）です。彼女たちはとても親切です。", en: "This is Marie and her sister. They are very kind." },
      category: "代名詞"
    },
    {
      id: "f1-q11", vol: 1, part: 5, passageId: null, number: 11,
      question: "Il fait froid. ------- ton manteau !",
      choices: ["Mis", "Mettez-tu", "Mets", "Mettre"],
      answer: 2,
      explanation: "tu に対する命令法。mettre（着る・置く）の tu の命令形は Mets（-s は落ちない不規則）。「コートを着なさい」。",
      translation: { fr: "Il fait froid. Mets ton manteau !", ja: "寒いよ。コートを着なさい！", en: "It's cold. Put on your coat!" },
      category: "動詞の活用"
    },
    {
      id: "f1-q12", vol: 1, part: 5, passageId: null, number: 12,
      question: "Cette robe est plus jolie ------- l'autre.",
      choices: ["que", "comme", "aussi", "de"],
      answer: 0,
      explanation: "比較級 plus + 形容詞 + que 〜 =「〜より…」。plus jolie que l'autre。",
      translation: { fr: "Cette robe est plus jolie que l'autre.", ja: "このワンピースはもう一方よりかわいい。", en: "This dress is prettier than the other one." },
      category: "語彙・会話表現"
    },
    {
      id: "f1-q13", vol: 1, part: 5, passageId: null, number: 13,
      question: "— Est-ce que tu connais Pierre ? — Oui, je ------- connais bien.",
      choices: ["le", "lui", "y", "en"],
      answer: 0,
      explanation: "connaître は直接他動詞。Pierre（男性・人）を受ける直接目的代名詞は le。「彼を知っている」。",
      translation: { fr: "— Est-ce que tu connais Pierre ? — Oui, je le connais bien.", ja: "ピエールを知ってる？ — うん、よく知ってるよ。", en: "Do you know Pierre? — Yes, I know him well." },
      category: "代名詞"
    },
    {
      id: "f1-q14", vol: 1, part: 5, passageId: null, number: 14,
      question: "Le train part ------- huit heures précises.",
      choices: ["dans", "de", "à", "en"],
      answer: 2,
      explanation: "時刻の「〜時に」は à。à huit heures =「8時に」。",
      translation: { fr: "Le train part à huit heures précises.", ja: "列車は8時ちょうどに出発する。", en: "The train leaves at exactly eight o'clock." },
      category: "前置詞"
    },
    {
      id: "f1-q15", vol: 1, part: 5, passageId: null, number: 15,
      question: "Nous n'avons pas ------- pain. Il faut en acheter.",
      choices: ["du", "de", "le", "des"],
      answer: 1,
      explanation: "否定文では部分冠詞・不定冠詞は de になる。ne...pas de pain。",
      translation: { fr: "Nous n'avons pas de pain. Il faut en acheter.", ja: "パンがない。買わなくちゃ。", en: "We don't have any bread. We need to buy some." },
      category: "冠詞・限定詞"
    },
    {
      id: "f1-q16", vol: 1, part: 5, passageId: null, number: 16,
      question: "Ma mère ------- se lever tôt le dimanche.",
      choices: ["n'aimes pas", "aime pas ne", "ne aime pas", "n'aime pas"],
      answer: 3,
      explanation: "否定は ne + 動詞 + pas。主語 Ma mère（三人称単数）→ aime。母音の前で ne → n'。n'aime pas。",
      translation: { fr: "Ma mère n'aime pas se lever tôt le dimanche.", ja: "母は日曜日に早起きするのが好きではない。", en: "My mother doesn't like getting up early on Sundays." },
      category: "動詞の活用"
    },
    {
      id: "f1-q17", vol: 1, part: 5, passageId: null, number: 17,
      question: "Ces fleurs sont très ------- .",
      choices: ["beaux", "belle", "belles", "beau"],
      answer: 2,
      explanation: "fleurs は女性複数名詞。形容詞 beau の女性複数形は belles。",
      translation: { fr: "Ces fleurs sont très belles.", ja: "これらの花はとても美しい。", en: "These flowers are very beautiful." },
      category: "性数一致"
    },
    {
      id: "f1-q18", vol: 1, part: 5, passageId: null, number: 18,
      question: "------- est-ce que tu vas en vacances cet été ?",
      choices: ["Qui", "Combien", "Quel", "Où"],
      answer: 3,
      explanation: "「どこへ」＝場所を尋ねる疑問詞 Où。「この夏どこへバカンスに行くの？」。",
      translation: { fr: "Où est-ce que tu vas en vacances cet été ?", ja: "この夏はどこへバカンスに行くの？", en: "Where are you going on vacation this summer?" },
      category: "語彙・会話表現"
    },
    {
      id: "f1-q19", vol: 1, part: 5, passageId: null, number: 19,
      question: "Demain, je ------- rendre visite à ma tante.",
      choices: ["allons", "vais", "vas", "va"],
      answer: 1,
      explanation: "近接未来 aller + 不定詞（〜するつもり）。主語 je に対応する aller の現在は vais。「明日おばを訪ねる」。",
      translation: { fr: "Demain, je vais rendre visite à ma tante.", ja: "明日、おばを訪ねるつもりだ。", en: "Tomorrow, I'm going to visit my aunt." },
      category: "動詞の活用"
    },
    {
      id: "f1-q20", vol: 1, part: 5, passageId: null, number: 20,
      question: "Il travaille ------- son bureau du matin au soir.",
      choices: ["dans", "en", "sur", "à"],
      answer: 0,
      explanation: "「オフィスの中で」＝空間の内部は dans son bureau。à は所属や地点、sur は「〜の上」。",
      translation: { fr: "Il travaille dans son bureau du matin au soir.", ja: "彼は朝から晩まで自分のオフィスで働いている。", en: "He works in his office from morning till night." },
      category: "前置詞"
    },
    {
      id: "f1-q21", vol: 1, part: 6, passageId: "f1-p1", number: 21,
      question: "---[Q21]--- に入るものを選んでください。",
      choices: ["en", "de", "à", "pour"],
      answer: 1,
      explanation: "content de + 不定詞 =「〜して嬉しい」。être content de venir。感情の形容詞の後は前置詞 de。",
      translation: { fr: "Je suis très content de venir à ta fête samedi prochain.", ja: "今度の土曜日、君のパーティーに行けてとてもうれしい。", en: "I'm very happy to come to your party next Saturday." },
      category: "前置詞"
    },
    {
      id: "f1-q22", vol: 1, part: 6, passageId: "f1-p1", number: 22,
      question: "---[Q22]--- に入るものを選んでください。",
      choices: ["au", "à la", "en", "de"],
      answer: 0,
      explanation: "「〜入りの／〜味の」は à + 定冠詞。chocolat は男性名詞なので au（à + le）。un gâteau au chocolat =「チョコレートケーキ」。",
      translation: { fr: "Je vais apporter un gâteau au chocolat, parce que je sais que tu adores ça.", ja: "チョコレートケーキを持っていくよ、君が大好きなのを知っているから。", en: "I'll bring a chocolate cake, because I know you love it." },
      category: "冠詞・限定詞"
    },
    {
      id: "f1-q23", vol: 1, part: 6, passageId: "f1-p1", number: 23,
      question: "---[Q23]--- に入るものを選んでください。",
      choices: ["Que", "Quand", "Comme", "Si"],
      answer: 3,
      explanation: "Si + 直説法現在 =「もし〜なら」。Si tu as besoin d'autre chose =「もし他に必要なものがあれば」。",
      translation: { fr: "Si tu as besoin d'autre chose, dis-le-moi.", ja: "ほかに何か必要なものがあれば言ってね。", en: "If you need anything else, let me know." },
      category: "語彙・会話表現"
    },
    {
      id: "f1-q24", vol: 1, part: 6, passageId: "f1-p1", number: 24,
      question: "---[Q24]--- に入るものを選んでください。",
      choices: ["lui", "vous", "t'", "te"],
      answer: 2,
      explanation: "「君に電話する」téléphoner ではなく appeler は直接他動詞。tu を受ける直接目的代名詞 te が母音 a の前で t' に。Je t'appellerai。",
      translation: { fr: "Je t'appellerai vendredi soir pour confirmer l'heure.", ja: "時間の確認のため、金曜の夜に電話するね。", en: "I'll call you on Friday evening to confirm the time." },
      category: "代名詞"
    },
    {
      id: "f1-q25", vol: 1, part: 7, passageId: "f1-p2", number: 25,
      question: "Quel jour le café est-il fermé ?",
      choices: ["Le mercredi", "Le samedi", "Le dimanche", "Le lundi"],
      answer: 3,
      explanation: "本文：\"Ouvert tous les jours sauf le lundi\"（月曜以外毎日営業）→ 休みは月曜。sauf =「〜を除いて」。",
      translation: { ja: "カフェは何曜日が休みですか？", en: "Which day is the café closed?" },
      choiceTranslations: { "Le mercredi": { ja: "水曜日", en: "On Wednesdays" }, "Le samedi": { ja: "土曜日", en: "On Saturdays" }, "Le dimanche": { ja: "日曜日", en: "On Sundays" }, "Le lundi": { ja: "月曜日", en: "On Mondays" } },
      category: "読解"
    },
    {
      id: "f1-q26", vol: 1, part: 7, passageId: "f1-p2", number: 26,
      question: "Combien coûte le déjeuner du jour ?",
      choices: ["8 euros", "11 euros", "12 euros", "18 euros"],
      answer: 2,
      explanation: "本文：\"Déjeuner du jour à 12 euros\"（本日のランチ12ユーロ、料理＋デザート）。",
      translation: { ja: "本日のランチはいくらですか？", en: "How much is the lunch of the day?" },
      choiceTranslations: { "8 euros": { ja: "8ユーロ", en: "8 euros" }, "11 euros": { ja: "11ユーロ", en: "11 euros" }, "12 euros": { ja: "12ユーロ", en: "12 euros" }, "18 euros": { ja: "18ユーロ", en: "18 euros" } },
      category: "読解"
    },
    {
      id: "f1-q27", vol: 1, part: 7, passageId: "f1-p2", number: 27,
      question: "Qu'est-ce qu'il y a tous les mercredis ?",
      choices: ["Un concert de jazz", "Un menu spécial", "Une fermeture", "Un marché"],
      answer: 0,
      explanation: "本文：\"Tous les mercredis, un concert de jazz à partir de 18 h\"（毎週水曜18時からジャズコンサート）。",
      translation: { ja: "毎週水曜日には何がありますか？", en: "What happens every Wednesday?" },
      choiceTranslations: { "Un concert de jazz": { ja: "ジャズコンサート", en: "A jazz concert" }, "Un menu spécial": { ja: "特別メニュー", en: "A special menu" }, "Une fermeture": { ja: "休業", en: "A closure" }, "Un marché": { ja: "市場（マルシェ）", en: "A market" } },
      category: "読解"
    },
    {
      id: "f1-q28", vol: 1, part: 7, passageId: "f1-p2", number: 28,
      question: "D'après le texte, qu'est-ce qui est conseillé le week-end ?",
      choices: ["D'apporter un dessert", "De réserver une table", "De venir le matin", "De payer en espèces"],
      answer: 1,
      explanation: "本文：\"Réservation conseillée le week-end\"（週末は予約がおすすめ）。conseillé =「勧められている」。",
      translation: { ja: "本文によると、週末に勧められていることは何ですか？", en: "According to the text, what is recommended on weekends?" },
      choiceTranslations: { "D'apporter un dessert": { ja: "デザートを持参すること", en: "Bringing a dessert" }, "De réserver une table": { ja: "席を予約すること", en: "Booking a table" }, "De venir le matin": { ja: "朝に来ること", en: "Coming in the morning" }, "De payer en espèces": { ja: "現金で払うこと", en: "Paying in cash" } },
      category: "読解"
    },
    {
      id: "f1-q29", vol: 1, part: 7, passageId: "f1-p3", number: 29,
      question: "Où est née Julie ?",
      choices: ["À Marseille", "En Italie", "À Paris", "À Lyon"],
      answer: 0,
      explanation: "本文：\"à Marseille, où elle est née\"（マルセイユ、そこで生まれた）。今はリヨンに住んでいるが出生地はマルセイユ。",
      translation: { ja: "ジュリーはどこで生まれましたか？", en: "Where was Julie born?" },
      choiceTranslations: { "À Marseille": { ja: "マルセイユで", en: "In Marseille" }, "En Italie": { ja: "イタリアで", en: "In Italy" }, "À Paris": { ja: "パリで", en: "In Paris" }, "À Lyon": { ja: "リヨンで", en: "In Lyon" } },
      category: "読解"
    },
    {
      id: "f1-q30", vol: 1, part: 7, passageId: "f1-p3", number: 30,
      question: "Comment Julie va-t-elle au travail ?",
      choices: ["En voiture", "À vélo", "À pied", "En bus"],
      answer: 1,
      explanation: "本文：\"elle prend son vélo pour aller au travail\"（自転車で通勤、バスより速いから）。",
      translation: { ja: "ジュリーはどうやって通勤していますか？", en: "How does Julie get to work?" },
      choiceTranslations: { "En voiture": { ja: "車で", en: "By car" }, "À vélo": { ja: "自転車で", en: "By bike" }, "À pied": { ja: "歩いて", en: "On foot" }, "En bus": { ja: "バスで", en: "By bus" } },
      category: "読解"
    },
    {
      id: "f1-q31", vol: 1, part: 7, passageId: "f1-p3", number: 31,
      question: "Quel est le métier de Julie ?",
      choices: ["Cuisinière", "Médecin", "Infirmière", "Professeur"],
      answer: 2,
      explanation: "本文：\"Elle travaille comme infirmière\"（看護師として働いている）。",
      translation: { ja: "ジュリーの職業は何ですか？", en: "What is Julie's job?" },
      choiceTranslations: { "Cuisinière": { ja: "料理人", en: "Cook" }, "Médecin": { ja: "医師", en: "Doctor" }, "Infirmière": { ja: "看護師", en: "Nurse" }, "Professeur": { ja: "教師", en: "Teacher" } },
      category: "読解"
    },
    {
      id: "f1-q32", vol: 1, part: 7, passageId: "f1-p3", number: 32,
      question: "Qu'est-ce que Julie va faire le mois prochain ?",
      choices: ["Changer de travail", "Adopter un chien", "Déménager à Marseille", "Partir en vacances en Italie"],
      answer: 3,
      explanation: "本文：\"Le mois prochain, elle va partir en vacances en Italie avec sa sœur\"（来月、姉／妹とイタリアへバカンス）。",
      translation: { ja: "ジュリーは来月何をする予定ですか？", en: "What is Julie going to do next month?" },
      choiceTranslations: { "Changer de travail": { ja: "転職する", en: "Change jobs" }, "Adopter un chien": { ja: "犬を引き取って飼う", en: "Adopt a dog" }, "Déménager à Marseille": { ja: "マルセイユに引っ越す", en: "Move to Marseille" }, "Partir en vacances en Italie": { ja: "イタリアへバカンスに行く", en: "Go on vacation in Italy" } },
      category: "読解"
    }
  ]
};
