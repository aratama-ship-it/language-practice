// Vol.F3 文法強化（フランス語・仏検4級〜3級：時制・関係代名詞・中性代名詞・否定）。2026-11-07 新規作成。
// 各問の translation（fr＝空欄を埋めた正解文）と choiceTranslations（選択肢の文字列がキー）は結果詳細で表示する。
SUBJECTS.french.vols[3] = {
  label: "Vol.F3 文法強化（時制・関係代名詞）",
  passages: [
    {
      id: "f3-p1", vol: 3, part: 6,
      title: "第21〜24問：次のメッセージを読んでください。",
      body: "Salut Léa,\n\nJe t'écris de Nice, où je passe une semaine ---[Q21]--- mes cousins. Il fait très beau et nous allons à la plage tous les jours.\n\nHier, nous ---[Q22]--- une excursion en bateau. C'était magnifique !\n\nJe rentre dimanche. ---[Q23]--- tu es libre lundi, on pourrait déjeuner ensemble ? J'ai plein de photos à te ---[Q24]---.\n\nGros bisous,\nEmma",
      translation: { ja: "やあ、レア\n\nニースから書いているよ。いとこたちと一緒に1週間ここで過ごしているの。とてもいい天気で、毎日ビーチに行っているよ。\n\n昨日は船の遠足に行ったの。すばらしかった！\n\n日曜日に帰るね。月曜日に空いていたら、一緒にお昼を食べない？ 見せたい写真がたくさんあるんだ。\n\nたくさんのキスを（親しい相手への結び）\nエマ", en: "Hi Léa,\n\nI'm writing to you from Nice, where I'm spending a week with my cousins. The weather is beautiful and we go to the beach every day.\n\nYesterday, we went on a boat trip. It was wonderful!\n\nI'm coming back on Sunday. If you're free on Monday, shall we have lunch together? I have lots of photos to show you.\n\nBig hugs,\nEmma" }
    },
    {
      id: "f3-p2", vol: 3, part: 7,
      title: "第25〜28問：次のお知らせを読んでください。",
      body: "PISCINE MUNICIPALE\n\nHoraires d'été (du 1er juillet au 31 août)\nDu lundi au vendredi : 10 h – 20 h\nSamedi et dimanche : 9 h – 18 h\n\nTarifs\nAdultes : 4 euros\nEnfants (moins de 12 ans) : 2 euros\nCarte de 10 entrées : 35 euros\n\nLe bonnet de bain est obligatoire.\nLes enfants de moins de 8 ans doivent être accompagnés d'un adulte.\nCours de natation pour enfants le mercredi matin (inscription à l'accueil).",
      translation: { ja: "市営プール\n\n夏季営業時間（7月1日〜8月31日）\n月曜〜金曜：10時〜20時\n土曜・日曜：9時〜18時\n\n料金\n大人：4ユーロ\n子ども（12歳未満）：2ユーロ\n10回券：35ユーロ\n\n水泳帽の着用は必須です。\n8歳未満のお子様は大人の付き添いが必要です。\n子ども向け水泳教室は水曜の午前（受付で申し込み）。", en: "MUNICIPAL SWIMMING POOL\n\nSummer hours (July 1 to August 31)\nMonday to Friday: 10 a.m. – 8 p.m.\nSaturday and Sunday: 9 a.m. – 6 p.m.\n\nPrices\nAdults: 4 euros\nChildren (under 12): 2 euros\n10-visit pass: 35 euros\n\nSwim caps are required.\nChildren under 8 must be accompanied by an adult.\nSwimming lessons for children on Wednesday mornings (sign up at the front desk)." }
    },
    {
      id: "f3-p3", vol: 3, part: 7,
      title: "第29〜32問：次の文章を読んでください。",
      body: "Sophie a trente-deux ans et elle travaille dans une banque à Toulouse. Il y a un an, elle a commencé à apprendre le japonais, parce qu'elle adore les mangas depuis qu'elle est petite.\n\nElle prend des cours deux soirs par semaine, le mardi et le jeudi. Ce n'est pas facile : pour elle, le plus difficile, ce sont les kanjis. Mais son professeur est très patient et elle fait des progrès.\n\nL'année prochaine, Sophie voudrait aller au Japon pour la première fois. Elle aimerait visiter Kyoto et goûter la vraie cuisine japonaise.",
      translation: { ja: "ソフィーは32歳で、トゥールーズの銀行で働いている。1年前、彼女は日本語を習い始めた。子どものころから漫画が大好きだからだ。\n\n週に2回、火曜と木曜の夜にレッスンを受けている。簡単ではない。彼女にとって一番難しいのは漢字だ。でも先生はとても辛抱強く、彼女は上達している。\n\n来年、ソフィーは初めて日本へ行きたいと思っている。京都を訪れて、本場の日本料理を味わってみたいそうだ。", en: "Sophie is thirty-two and works at a bank in Toulouse. A year ago, she started learning Japanese, because she has loved manga since she was little.\n\nShe takes classes two evenings a week, on Tuesdays and Thursdays. It isn't easy: for her, the hardest part is kanji. But her teacher is very patient and she is making progress.\n\nNext year, Sophie would like to go to Japan for the first time. She would like to visit Kyoto and taste real Japanese food." }
    }
  ],
  questions: [
    {
      id: "f3-q1", vol: 3, part: 5, passageId: null, number: 1,
      question: "Quand tu ------- à Paris l'année prochaine, tu m'appelleras ?",
      choices: ["es", "étais", "serais", "seras"],
      answer: 3,
      explanation: "未来のことを quand（〜するとき）で言うとき、フランス語では quand の後も単純未来にする（英語の when + 現在形とは違う）。être の単純未来 tu seras。",
      translation: { fr: "Quand tu seras à Paris l'année prochaine, tu m'appelleras ?", ja: "来年パリに来たら、電話してくれる？", en: "When you're in Paris next year, will you call me?" },
      category: "動詞の活用"
    },
    {
      id: "f3-q2", vol: 3, part: 5, passageId: null, number: 2,
      question: "Si j'avais le temps, je ------- plus souvent mes parents.",
      choices: ["vois", "voyais", "verrais", "verrai"],
      answer: 2,
      explanation: "Si + 半過去（もし〜なら）の帰結は条件法現在。voir の条件法 je verrais。単純未来 verrai と綴りが1字違いなので注意。",
      translation: { fr: "Si j'avais le temps, je verrais plus souvent mes parents.", ja: "時間があれば、もっと頻繁に両親に会うのに。", en: "If I had time, I would see my parents more often." },
      category: "動詞の活用"
    },
    {
      id: "f3-q3", vol: 3, part: 5, passageId: null, number: 3,
      question: "Elle est ------- en France il y a trois ans.",
      choices: ["arrivé", "arrivées", "arriver", "arrivée"],
      answer: 3,
      explanation: "arriver は助動詞 être をとる動詞。être を使う複合過去では過去分詞が主語に性数一致する。主語 Elle（女性単数）→ arrivée。",
      translation: { fr: "Elle est arrivée en France il y a trois ans.", ja: "彼女は3年前にフランスに来た。", en: "She arrived in France three years ago." },
      category: "性数一致"
    },
    {
      id: "f3-q4", vol: 3, part: 5, passageId: null, number: 4,
      question: "Les lettres que j'ai ------- hier sont arrivées.",
      choices: ["écrite", "écrites", "écrit", "écrits"],
      answer: 1,
      explanation: "助動詞 avoir の過去分詞は、直接目的語が動詞より前にあるときだけそれに一致する。ここでは関係代名詞 que（= les lettres、女性複数）が前にあるので écrites。",
      translation: { fr: "Les lettres que j'ai écrites hier sont arrivées.", ja: "昨日私が書いた手紙は届いた。", en: "The letters I wrote yesterday have arrived." },
      category: "性数一致"
    },
    {
      id: "f3-q5", vol: 3, part: 5, passageId: null, number: 5,
      question: "C'est le restaurant ------- nous avons dîné samedi.",
      choices: ["où", "que", "qui", "dont"],
      answer: 0,
      explanation: "場所を表す先行詞（le restaurant）に続き、関係節の中で「そこで」の役割をするので関係代名詞 où。dîner は直接目的語をとらないので que は入らない。",
      translation: { fr: "C'est le restaurant où nous avons dîné samedi.", ja: "ここが土曜日に私たちが夕食をとったレストランです。", en: "This is the restaurant where we had dinner on Saturday." },
      category: "代名詞"
    },
    {
      id: "f3-q6", vol: 3, part: 5, passageId: null, number: 6,
      question: "Le garçon ------- parle avec Marie est mon frère.",
      choices: ["dont", "qui", "que", "où"],
      answer: 1,
      explanation: "関係節の中で主語の役割（le garçon が parle する）をするので qui。que は関係節の中の直接目的語。",
      translation: { fr: "Le garçon qui parle avec Marie est mon frère.", ja: "マリーと話している男の子は私の兄（弟）です。", en: "The boy who is talking with Marie is my brother." },
      category: "代名詞"
    },
    {
      id: "f3-q7", vol: 3, part: 5, passageId: null, number: 7,
      question: "Le film ------- tu m'as parlé était excellent.",
      choices: ["dont", "que", "qui", "où"],
      answer: 0,
      explanation: "parler de 〜（〜について話す）の de を含む関係代名詞は dont。le film dont tu m'as parlé =「君が話してくれた映画」。",
      translation: { fr: "Le film dont tu m'as parlé était excellent.", ja: "君が話してくれた映画はすばらしかった。", en: "The movie you told me about was excellent." },
      category: "代名詞"
    },
    {
      id: "f3-q8", vol: 3, part: 5, passageId: null, number: 8,
      question: "— Tu vas à la piscine ? — Oui, j'------- vais cet après-midi.",
      choices: ["en", "le", "lui", "y"],
      answer: 3,
      explanation: "à + 場所（à la piscine）を受ける中性代名詞は y。j'y vais =「そこへ行く」。en は de + 名詞を受ける。",
      translation: { fr: "— Tu vas à la piscine ? — Oui, j'y vais cet après-midi.", ja: "プールに行くの？ — うん、今日の午後行くよ。", en: "Are you going to the pool? — Yes, I'm going there this afternoon." },
      category: "代名詞"
    },
    {
      id: "f3-q9", vol: 3, part: 5, passageId: null, number: 9,
      question: "— Tu veux du fromage ? — Non merci, je n'------- veux pas.",
      choices: ["le", "la", "en", "y"],
      answer: 2,
      explanation: "部分冠詞つきの名詞（du fromage）を受ける中性代名詞は en。je n'en veux pas =「（それを）要らない」。le・la を使うなら je ne le veux pas の形になり、空欄の前の n' とはつながらない。",
      translation: { fr: "— Tu veux du fromage ? — Non merci, je n'en veux pas.", ja: "チーズはいかが？ — いいえ、結構です。", en: "Would you like some cheese? — No thanks, I don't want any." },
      category: "代名詞"
    },
    {
      id: "f3-q10", vol: 3, part: 5, passageId: null, number: 10,
      question: "Ce livre ? ------- , s'il te plaît !",
      choices: ["Donne-moi-le", "Me le donne", "Le me donne", "Donne-le-moi"],
      answer: 3,
      explanation: "肯定命令文では目的語代名詞を動詞の後にハイフンでつなぎ、直接目的（le）→ 間接目的（moi）の順。Donne-le-moi =「それを私にちょうだい」。",
      translation: { fr: "Ce livre ? Donne-le-moi, s'il te plaît !", ja: "その本？ 私にちょうだい。", en: "That book? Give it to me, please!" },
      category: "代名詞"
    },
    {
      id: "f3-q11", vol: 3, part: 5, passageId: null, number: 11,
      question: "J'ai frappé à la porte, mais ------- n'a répondu.",
      choices: ["jamais", "aucun", "personne", "rien"],
      answer: 2,
      explanation: "personne ne 〜 =「誰も〜ない」。主語の位置に置き、動詞の前に ne を置く（pas は付けない）。rien は物、aucun は後に名詞が要る。",
      translation: { fr: "J'ai frappé à la porte, mais personne n'a répondu.", ja: "ドアをノックしたが、誰も答えなかった。", en: "I knocked on the door, but nobody answered." },
      category: "語彙・会話表現"
    },
    {
      id: "f3-q12", vol: 3, part: 5, passageId: null, number: 12,
      question: "Il ne fume ------- : il a arrêté l'année dernière.",
      choices: ["plus", "jamais", "rien", "personne"],
      answer: 0,
      explanation: "ne ... plus =「もう〜ない」。以前は吸っていたが今はやめた、という文脈なので plus。jamais（一度も〜ない）だと「去年やめた」と矛盾する。",
      translation: { fr: "Il ne fume plus : il a arrêté l'année dernière.", ja: "彼はもうタバコを吸わない。去年やめたのだ。", en: "He doesn't smoke anymore: he quit last year." },
      category: "語彙・会話表現"
    },
    {
      id: "f3-q13", vol: 3, part: 5, passageId: null, number: 13,
      question: "Paris est la ------- grande ville de France.",
      choices: ["meilleure", "plus", "très", "mieux"],
      answer: 1,
      explanation: "最上級は定冠詞 + plus + 形容詞（+ de + 範囲）。la plus grande ville de France =「フランスで最も大きな都市」。meilleure は bon の比較級・最上級で、grande の前には置けない。",
      translation: { fr: "Paris est la plus grande ville de France.", ja: "パリはフランスで最も大きな都市だ。", en: "Paris is the largest city in France." },
      category: "語彙・会話表現"
    },
    {
      id: "f3-q14", vol: 3, part: 5, passageId: null, number: 14,
      question: "Mon frère chante ------- que moi.",
      choices: ["mieux", "meilleur", "bien", "plus bon"],
      answer: 0,
      explanation: "動詞 chanter を修飾する副詞 bien の比較級は mieux（plus bien とは言わない）。meilleur は形容詞 bon の比較級なので、名詞を修飾するときに使う。",
      translation: { fr: "Mon frère chante mieux que moi.", ja: "兄（弟）は私より歌がうまい。", en: "My brother sings better than I do." },
      category: "語彙・会話表現"
    },
    {
      id: "f3-q15", vol: 3, part: 5, passageId: null, number: 15,
      question: "J'écoute de la musique ------- je fais la cuisine.",
      choices: ["avant", "pendant que", "pendant", "depuis"],
      answer: 1,
      explanation: "後ろに「主語 + 動詞」（je fais）が続くので接続詞句 pendant que（〜している間）。pendant だけなら後ろは名詞（pendant le repas）。",
      translation: { fr: "J'écoute de la musique pendant que je fais la cuisine.", ja: "料理をしている間、音楽を聞く。", en: "I listen to music while I cook." },
      category: "前置詞"
    },
    {
      id: "f3-q16", vol: 3, part: 5, passageId: null, number: 16,
      question: "Nous allons ------- États-Unis cet été.",
      choices: ["en", "à", "aux", "au"],
      answer: 2,
      explanation: "国名が複数形（les États-Unis）のときは aux（à + les）。男性単数の国は au、女性単数の国は en。",
      translation: { fr: "Nous allons aux États-Unis cet été.", ja: "この夏、私たちはアメリカへ行く。", en: "We're going to the United States this summer." },
      category: "前置詞"
    },
    {
      id: "f3-q17", vol: 3, part: 5, passageId: null, number: 17,
      question: "Je suis né ------- 1995.",
      choices: ["à", "dans", "au", "en"],
      answer: 3,
      explanation: "年号の「〜年に」は en。en 1995。月も en（en mai）。時刻は à。",
      translation: { fr: "Je suis né en 1995.", ja: "私は1995年に生まれた。", en: "I was born in 1995." },
      category: "前置詞"
    },
    {
      id: "f3-q18", vol: 3, part: 5, passageId: null, number: 18,
      question: "Quand je suis rentré, les enfants ------- déjà.",
      choices: ["dorment", "dormiront", "dormaient", "ont dormi"],
      answer: 2,
      explanation: "「帰宅したとき（複合過去）、すでに眠っていた」のように、過去のある時点で続いていた状態は半過去。dormir の半過去 ils dormaient。",
      translation: { fr: "Quand je suis rentré, les enfants dormaient déjà.", ja: "私が帰宅したとき、子どもたちはもう眠っていた。", en: "When I got home, the children were already asleep." },
      category: "動詞の活用"
    },
    {
      id: "f3-q19", vol: 3, part: 5, passageId: null, number: 19,
      question: "------- tu ne viens pas avec nous ? — Parce que je suis fatigué.",
      choices: ["Pourquoi", "Comment", "Quand", "Combien"],
      answer: 0,
      explanation: "答えが Parce que（なぜなら）なので、理由を尋ねる疑問詞 Pourquoi。",
      translation: { fr: "Pourquoi tu ne viens pas avec nous ? — Parce que je suis fatigué.", ja: "どうして一緒に来ないの？ — 疲れているから。", en: "Why aren't you coming with us? — Because I'm tired." },
      category: "語彙・会話表現"
    },
    {
      id: "f3-q20", vol: 3, part: 5, passageId: null, number: 20,
      question: "Ces chaussures sont trop chères. Je préfère -------.",
      choices: ["ceux-là", "celle-là", "celui-là", "celles-là"],
      answer: 3,
      explanation: "chaussures（女性複数）を受ける指示代名詞は celles。-là を付けて「あっちのもの」。ceux は男性複数、celle は女性単数、celui は男性単数。",
      translation: { fr: "Ces chaussures sont trop chères. Je préfère celles-là.", ja: "この靴は高すぎる。あっちの方がいい。", en: "These shoes are too expensive. I prefer those ones." },
      category: "代名詞"
    },
    {
      id: "f3-q21", vol: 3, part: 6, passageId: "f3-p1", number: 21,
      question: "---[Q21]--- に入るものを選んでください。",
      choices: ["entre", "avec", "contre", "sous"],
      answer: 1,
      explanation: "passer une semaine avec 〜 =「〜と一緒に1週間過ごす」。contre（〜に反対して）、sous（〜の下に）、entre（〜の間に）では意味が通らない。",
      translation: { fr: "Je t'écris de Nice, où je passe une semaine avec mes cousins.", ja: "いとこたちと一緒に1週間過ごしているニースから書いているよ。", en: "I'm writing to you from Nice, where I'm spending a week with my cousins." },
      category: "前置詞"
    },
    {
      id: "f3-q22", vol: 3, part: 6, passageId: "f3-p1", number: 22,
      question: "---[Q22]--- に入るものを選んでください。",
      choices: ["faisions", "avons fait", "faisons", "ferons"],
      answer: 1,
      explanation: "Hier（昨日）の1回きりで完了した出来事なので複合過去。faire の複合過去 nous avons fait。続く C'était magnifique は感想・描写なので半過去。",
      translation: { fr: "Hier, nous avons fait une excursion en bateau.", ja: "昨日は船の遠足に行った。", en: "Yesterday, we went on a boat trip." },
      category: "動詞の活用"
    },
    {
      id: "f3-q23", vol: 3, part: 6, passageId: "f3-p1", number: 23,
      question: "---[Q23]--- に入るものを選んでください。",
      choices: ["Que", "Où", "Parce que", "Si"],
      answer: 3,
      explanation: "Si + 直説法現在 =「もし〜なら」。Si tu es libre lundi =「月曜日に空いていたら」。後半 on pourrait（条件法）は控えめな提案。",
      translation: { fr: "Si tu es libre lundi, on pourrait déjeuner ensemble ?", ja: "月曜日に空いていたら、一緒にお昼を食べない？", en: "If you're free on Monday, shall we have lunch together?" },
      category: "語彙・会話表現"
    },
    {
      id: "f3-q24", vol: 3, part: 6, passageId: "f3-p1", number: 24,
      question: "---[Q24]--- に入るものを選んでください。",
      choices: ["montrer", "montre", "montré", "montrais"],
      answer: 0,
      explanation: "avoir 〜 à + 不定詞 =「〜すべき…がある」。前置詞 à の後なので不定詞 montrer。J'ai plein de photos à te montrer。",
      translation: { fr: "J'ai plein de photos à te montrer.", ja: "見せたい写真がたくさんあるんだ。", en: "I have lots of photos to show you." },
      category: "動詞の活用"
    },
    {
      id: "f3-q25", vol: 3, part: 7, passageId: "f3-p2", number: 25,
      question: "À quelle heure la piscine ferme-t-elle le samedi ?",
      choices: ["À 9 h", "À 10 h", "À 18 h", "À 20 h"],
      answer: 2,
      explanation: "本文：\"Samedi et dimanche : 9 h – 18 h\"（土日は9時〜18時）。20時は平日の閉館時刻。",
      translation: { ja: "土曜日、プールは何時に閉まりますか？", en: "What time does the pool close on Saturdays?" },
      choiceTranslations: { "À 18 h": { ja: "18時", en: "At 6 p.m." }, "À 20 h": { ja: "20時", en: "At 8 p.m." }, "À 9 h": { ja: "9時", en: "At 9 a.m." }, "À 10 h": { ja: "10時", en: "At 10 a.m." } },
      category: "読解"
    },
    {
      id: "f3-q26", vol: 3, part: 7, passageId: "f3-p2", number: 26,
      question: "Combien paie un enfant de 10 ans ?",
      choices: ["4 euros", "35 euros", "Rien", "2 euros"],
      answer: 3,
      explanation: "本文：\"Enfants (moins de 12 ans) : 2 euros\"。10歳は12歳未満なので子ども料金の2ユーロ。",
      translation: { ja: "10歳の子どもはいくら払いますか？", en: "How much does a 10-year-old child pay?" },
      choiceTranslations: { "2 euros": { ja: "2ユーロ", en: "2 euros" }, "4 euros": { ja: "4ユーロ", en: "4 euros" }, "35 euros": { ja: "35ユーロ", en: "35 euros" }, "Rien": { ja: "無料", en: "Nothing" } },
      category: "読解"
    },
    {
      id: "f3-q27", vol: 3, part: 7, passageId: "f3-p2", number: 27,
      question: "Qu'est-ce qui est obligatoire ?",
      choices: ["Une serviette", "Le bonnet de bain", "La carte de 10 entrées", "L'inscription à l'accueil"],
      answer: 1,
      explanation: "本文：\"Le bonnet de bain est obligatoire\"（水泳帽は必須）。受付での申し込みは水泳教室に参加する場合だけ。",
      translation: { ja: "必須のものは何ですか？", en: "What is required?" },
      choiceTranslations: { "Le bonnet de bain": { ja: "水泳帽", en: "A swim cap" }, "La carte de 10 entrées": { ja: "10回券", en: "The 10-visit pass" }, "L'inscription à l'accueil": { ja: "受付での申し込み", en: "Signing up at the front desk" }, "Une serviette": { ja: "タオル", en: "A towel" } },
      category: "読解"
    },
    {
      id: "f3-q28", vol: 3, part: 7, passageId: "f3-p2", number: 28,
      question: "Que faut-il faire pour suivre un cours de natation ?",
      choices: ["Acheter une carte de 10 entrées", "Téléphoner le mercredi", "S'inscrire à l'accueil", "Venir avec un adulte"],
      answer: 2,
      explanation: "本文：\"Cours de natation ... (inscription à l'accueil)\"（受付で申し込み）。大人の付き添いは8歳未満の子どもの入場条件で、教室の申し込み方法ではない。",
      translation: { ja: "水泳教室に参加するには何をしなければなりませんか？", en: "What do you have to do to take a swimming lesson?" },
      choiceTranslations: { "S'inscrire à l'accueil": { ja: "受付で申し込む", en: "Sign up at the front desk" }, "Venir avec un adulte": { ja: "大人と一緒に来る", en: "Come with an adult" }, "Acheter une carte de 10 entrées": { ja: "10回券を買う", en: "Buy a 10-visit pass" }, "Téléphoner le mercredi": { ja: "水曜日に電話する", en: "Call on Wednesday" } },
      category: "読解"
    },
    {
      id: "f3-q29", vol: 3, part: 7, passageId: "f3-p3", number: 29,
      question: "Pourquoi Sophie apprend-elle le japonais ?",
      choices: ["Parce qu'elle aime les mangas", "Pour son travail à la banque", "Parce que son professeur est japonais", "Pour habiter à Kyoto"],
      answer: 0,
      explanation: "本文：\"parce qu'elle adore les mangas depuis qu'elle est petite\"（子どものころから漫画が大好きだから）。",
      translation: { ja: "ソフィーはなぜ日本語を学んでいますか？", en: "Why is Sophie learning Japanese?" },
      choiceTranslations: { "Parce qu'elle aime les mangas": { ja: "漫画が好きだから", en: "Because she loves manga" }, "Pour son travail à la banque": { ja: "銀行の仕事のため", en: "For her job at the bank" }, "Parce que son professeur est japonais": { ja: "先生が日本人だから", en: "Because her teacher is Japanese" }, "Pour habiter à Kyoto": { ja: "京都に住むため", en: "To live in Kyoto" } },
      category: "読解"
    },
    {
      id: "f3-q30", vol: 3, part: 7, passageId: "f3-p3", number: 30,
      question: "Quand Sophie a-t-elle ses cours ?",
      choices: ["Le mardi et le jeudi soir", "Le samedi et le dimanche", "Tous les matins", "Le lundi et le mercredi"],
      answer: 0,
      explanation: "本文：\"deux soirs par semaine, le mardi et le jeudi\"（週2回、火曜と木曜の夜）。",
      translation: { ja: "ソフィーのレッスンはいつですか？", en: "When does Sophie have her classes?" },
      choiceTranslations: { "Le mardi et le jeudi soir": { ja: "火曜と木曜の夜", en: "On Tuesday and Thursday evenings" }, "Le samedi et le dimanche": { ja: "土曜と日曜", en: "On Saturdays and Sundays" }, "Tous les matins": { ja: "毎朝", en: "Every morning" }, "Le lundi et le mercredi": { ja: "月曜と水曜", en: "On Mondays and Wednesdays" } },
      category: "読解"
    },
    {
      id: "f3-q31", vol: 3, part: 7, passageId: "f3-p3", number: 31,
      question: "Qu'est-ce qui est le plus difficile pour Sophie ?",
      choices: ["La grammaire", "Parler avec son professeur", "Les kanjis", "La prononciation"],
      answer: 2,
      explanation: "本文：\"pour elle, le plus difficile, ce sont les kanjis\"（彼女にとって一番難しいのは漢字）。",
      translation: { ja: "ソフィーにとって一番難しいのは何ですか？", en: "What is the hardest thing for Sophie?" },
      choiceTranslations: { "Les kanjis": { ja: "漢字", en: "Kanji" }, "La prononciation": { ja: "発音", en: "Pronunciation" }, "La grammaire": { ja: "文法", en: "Grammar" }, "Parler avec son professeur": { ja: "先生と話すこと", en: "Talking with her teacher" } },
      category: "読解"
    },
    {
      id: "f3-q32", vol: 3, part: 7, passageId: "f3-p3", number: 32,
      question: "Qu'est-ce que Sophie voudrait faire l'année prochaine ?",
      choices: ["Apprendre le chinois", "Aller au Japon pour la première fois", "Retourner à Kyoto", "Changer de travail"],
      answer: 1,
      explanation: "本文：\"Sophie voudrait aller au Japon pour la première fois\"（初めて日本へ行きたい）。初めてなので「京都を再訪する」は誤り。",
      translation: { ja: "ソフィーは来年何をしたいと思っていますか？", en: "What would Sophie like to do next year?" },
      choiceTranslations: { "Aller au Japon pour la première fois": { ja: "初めて日本へ行く", en: "Go to Japan for the first time" }, "Retourner à Kyoto": { ja: "京都を再訪する", en: "Go back to Kyoto" }, "Changer de travail": { ja: "転職する", en: "Change jobs" }, "Apprendre le chinois": { ja: "中国語を学ぶ", en: "Learn Chinese" } },
      category: "読解"
    }
  ]
};
