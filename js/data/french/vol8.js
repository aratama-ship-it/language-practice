// Vol.F8 場面別会話（フランス語・仏検4級〜3級：買い物・レストラン・駅・ホテル・電話・トラブル）。2026-11-07 新規作成。
// 各問の translation（fr＝空欄を埋めた正解文）と choiceTranslations（選択肢の文字列がキー）は結果詳細で表示する。
SUBJECTS.french.vols[8] = {
  label: "Vol.F8 場面別会話（買い物・食事・旅行）",
  passages: [
    {
      id: "f8-p1", vol: 8, part: 6,
      title: "第21〜24問：次のメールを読んでください。",
      body: "Bonjour,\n\nJ'ai passé deux nuits dans votre hôtel la semaine dernière. La chambre était propre et le personnel très ---[Q21]---.\n\nCependant, il y avait beaucoup de bruit la nuit, ---[Q22]--- je n'ai pas bien dormi. De plus, le petit-déjeuner n'était pas inclus dans le prix, ---[Q23]--- c'était écrit sur votre site Internet.\n\nPourriez-vous m'expliquer ---[Q24]--- ? Merci d'avance.\n\nCordialement,\nMarie Lambert",
      translation: { ja: "こんにちは。\n\n先週、貴ホテルに2泊しました。部屋は清潔で、スタッフの皆さんはとても親切でした。\n\nしかし、夜はとても騒がしく、よく眠れませんでした。さらに、ウェブサイトには書いてあったのに、朝食が料金に含まれていませんでした。\n\nなぜなのか説明していただけますか？ よろしくお願いいたします。\n\nマリー・ランベール", en: "Hello,\n\nI spent two nights at your hotel last week. The room was clean and the staff very friendly.\n\nHowever, it was very noisy at night, so I didn't sleep well. Also, breakfast wasn't included in the price, even though it said so on your website.\n\nCould you explain why? Thank you in advance.\n\nBest regards,\nMarie Lambert" }
    },
    {
      id: "f8-p2", vol: 8, part: 7,
      title: "第25〜28問：次のポスターを読んでください。",
      body: "FÊTE DE LA MUSIQUE\nSamedi 21 juin, dans tout le centre-ville\n\n· 15 h – 18 h : chorales d'enfants, place de la Mairie\n· 18 h – 21 h : groupes de rock, jardin public\n· 21 h – minuit : concert de jazz, devant la cathédrale\n\nTous les concerts sont gratuits.\nEn cas de pluie, les concerts de la place de la Mairie auront lieu dans la salle des fêtes.\nAttention : la rue principale sera fermée aux voitures de 14 h à 1 h du matin.\nBus et tramway gratuits toute la soirée.",
      translation: { ja: "音楽の日（フェット・ド・ラ・ミュジック）\n6月21日（土）、中心街全域で\n\n・15時〜18時：子どもの合唱、市役所前広場\n・18時〜21時：ロックバンド、市民公園\n・21時〜24時：ジャズコンサート、大聖堂前\n\nすべてのコンサートは無料です。\n雨天の場合、市役所前広場のコンサートは多目的ホールで行います。\nご注意：大通りは14時から翌1時まで車両通行止めです。\nバスと路面電車は夜通し無料です。", en: "MUSIC DAY FESTIVAL\nSaturday, June 21, throughout the city center\n\n· 3 – 6 p.m.: children's choirs, Town Hall square\n· 6 – 9 p.m.: rock bands, public garden\n· 9 p.m. – midnight: jazz concert, in front of the cathedral\n\nAll concerts are free.\nIf it rains, the concerts on the Town Hall square will take place in the community hall.\nPlease note: the main street will be closed to cars from 2 p.m. to 1 a.m.\nBuses and trams are free all evening." }
    },
    {
      id: "f8-p3", vol: 8, part: 7,
      title: "第29〜32問：次の文章を読んでください。",
      body: "Il y a cinq ans, Claire, une architecte parisienne, a eu une idée : transformer le toit de son immeuble en jardin. Les voisins étaient d'abord sceptiques, mais elle a fini par les convaincre.\n\nAujourd'hui, une vingtaine d'habitants y cultivent des tomates, des salades et des herbes aromatiques. Chacun vient quand il veut, mais tout le monde se retrouve le premier samedi du mois pour un grand repas.\n\n« Avant, on ne se parlait presque pas dans l'immeuble, explique Claire. Maintenant, on se connaît tous. » Elle aimerait que d'autres immeubles de la ville suivent cet exemple.",
      translation: { ja: "5年前、パリの建築家クレールはあることを思いついた。自分の住む建物の屋上を菜園に変えることだ。住人たちは最初は懐疑的だったが、彼女は最後には彼らを説得した。\n\n今では20人ほどの住人が、そこでトマトやレタス、ハーブを育てている。それぞれ好きなときに来るが、毎月第1土曜日には全員が集まって大きな食事会をする。\n\n「以前は、建物の中でほとんど話をしませんでした。今ではみんな知り合いです」とクレールは説明する。彼女は、街のほかの建物もこの例にならってほしいと思っている。", en: "Five years ago, Claire, a Parisian architect, had an idea: to turn the roof of her apartment building into a garden. The neighbors were skeptical at first, but she eventually convinced them.\n\nToday, about twenty residents grow tomatoes, lettuce and herbs there. Everyone comes whenever they like, but they all get together on the first Saturday of the month for a big meal.\n\n\"Before, we hardly spoke to each other in the building,\" Claire explains. \"Now we all know each other.\" She would like other buildings in the city to follow this example." }
    }
  ],
  questions: [
    {
      id: "f8-q1", vol: 8, part: 5, passageId: null, number: 1,
      question: "— Je peux vous aider ? — Oui, je ------- un pull pour mon fils.",
      choices: ["cherches", "cherchent", "cherchons", "cherche"],
      answer: 3,
      explanation: "主語 je に対応する -er 動詞の現在形の語尾は -e。chercher → je cherche。店で「〜を探しています」と言う定番。",
      translation: { fr: "— Je peux vous aider ? — Oui, je cherche un pull pour mon fils.", ja: "何かお探しですか？ — はい、息子にセーターを探しています。", en: "Can I help you? — Yes, I'm looking for a sweater for my son." },
      category: "動詞の活用"
    },
    {
      id: "f8-q2", vol: 8, part: 5, passageId: null, number: 2,
      question: "Cette veste vous ------- très bien.",
      choices: ["allez", "va", "vas", "vont"],
      answer: 1,
      explanation: "aller bien à 〜 =「（服などが）〜に似合う」。主語は Cette veste（三人称単数）なので va。vous は間接目的語（あなたに）。",
      translation: { fr: "Cette veste vous va très bien.", ja: "このジャケット、とてもよくお似合いです。", en: "This jacket really suits you." },
      category: "語彙・会話表現"
    },
    {
      id: "f8-q3", vol: 8, part: 5, passageId: null, number: 3,
      question: "— C'est combien ? — Ça ------- 25 euros.",
      choices: ["a", "coûtent", "fait", "est"],
      answer: 2,
      explanation: "値段の合計を言うときは Ça fait + 金額（全部で〜になります）。主語 Ça は単数なので coûtent（複数形）は合わない。",
      translation: { fr: "— C'est combien ? — Ça fait 25 euros.", ja: "いくらですか？ — 25ユーロになります。", en: "How much is it? — That's 25 euros." },
      category: "語彙・会話表現"
    },
    {
      id: "f8-q4", vol: 8, part: 5, passageId: null, number: 4,
      question: "Vous payez ------- carte ou en espèces ?",
      choices: ["par", "en", "avec", "à"],
      answer: 0,
      explanation: "支払い方法は payer par carte（カードで）/ en espèces（現金で）。avec を使うなら avec une carte と冠詞が要る。",
      translation: { fr: "Vous payez par carte ou en espèces ?", ja: "カードでお支払いですか、現金ですか？", en: "Are you paying by card or in cash?" },
      category: "前置詞"
    },
    {
      id: "f8-q5", vol: 8, part: 5, passageId: null, number: 5,
      question: "— Une table pour combien de personnes ? — Pour -------, s'il vous plaît.",
      choices: ["deux", "deuxième", "double", "second"],
      answer: 0,
      explanation: "人数は基数 deux（2）。deuxième・second は「2番目の」、double は「2倍の・二重の」。",
      translation: { fr: "— Une table pour combien de personnes ? — Pour deux, s'il vous plaît.", ja: "何名様ですか？ — 2人です。", en: "A table for how many? — For two, please." },
      category: "語彙・会話表現"
    },
    {
      id: "f8-q6", vol: 8, part: 5, passageId: null, number: 6,
      question: "Comme dessert, je ------- une tarte aux pommes.",
      choices: ["vas prendre", "allons prendre", "vais prendre", "va prendre"],
      answer: 2,
      explanation: "注文では近接未来 aller + 不定詞がよく使われる。主語 je → vais prendre（〜にします）。",
      translation: { fr: "Comme dessert, je vais prendre une tarte aux pommes.", ja: "デザートはリンゴのタルトにします。", en: "For dessert, I'll have an apple tart." },
      category: "動詞の活用"
    },
    {
      id: "f8-q7", vol: 8, part: 5, passageId: null, number: 7,
      question: "L'addition, s'il vous -------.",
      choices: ["plu", "plaît", "plaisez", "plaire"],
      answer: 1,
      explanation: "s'il vous plaît（お願いします）は plaire の三人称単数 plaît を使う決まった形。主語は il（それが）なので vous に合わせて活用しない。",
      translation: { fr: "L'addition, s'il vous plaît.", ja: "お会計をお願いします。", en: "The check, please." },
      category: "語彙・会話表現"
    },
    {
      id: "f8-q8", vol: 8, part: 5, passageId: null, number: 8,
      question: "— Excusez-moi, la gare est loin d'ici ? — Non, c'est à cinq minutes ------- pied.",
      choices: ["en", "de", "par", "à"],
      answer: 3,
      explanation: "「歩いて」は à pied。à cinq minutes à pied =「歩いて5分のところに」。乗り物なら en bus のように en。",
      translation: { fr: "— Excusez-moi, la gare est loin d'ici ? — Non, c'est à cinq minutes à pied.", ja: "すみません、駅はここから遠いですか？ — いいえ、歩いて5分です。", en: "Excuse me, is the station far from here? — No, it's five minutes on foot." },
      category: "前置詞"
    },
    {
      id: "f8-q9", vol: 8, part: 5, passageId: null, number: 9,
      question: "Un aller-retour ------- Marseille, s'il vous plaît.",
      choices: ["sur", "chez", "pour", "en"],
      answer: 2,
      explanation: "切符の行き先は pour + 地名（un billet pour Marseille）。aller-retour は「往復切符」、片道は aller simple。",
      translation: { fr: "Un aller-retour pour Marseille, s'il vous plaît.", ja: "マルセイユまで往復1枚お願いします。", en: "A round-trip ticket to Marseille, please." },
      category: "前置詞"
    },
    {
      id: "f8-q10", vol: 8, part: 5, passageId: null, number: 10,
      question: "Le train ------- de quel quai ?",
      choices: ["partent", "pars", "partez", "part"],
      answer: 3,
      explanation: "partir の現在：je pars, tu pars, il part, nous partons, vous partez, ils partent。主語 Le train（三人称単数）→ part。quai =「ホーム」。",
      translation: { fr: "Le train part de quel quai ?", ja: "電車はどのホームから出ますか？", en: "Which platform does the train leave from?" },
      category: "動詞の活用"
    },
    {
      id: "f8-q11", vol: 8, part: 5, passageId: null, number: 11,
      question: "J'ai réservé une chambre ------- nom de Tanaka.",
      choices: ["du", "au", "à", "en"],
      answer: 1,
      explanation: "au nom de 〜 =「〜の名前で」。à + le nom の縮約 au。ホテルやレストランの予約で使う決まった言い方。",
      translation: { fr: "J'ai réservé une chambre au nom de Tanaka.", ja: "田中の名前で部屋を予約しています。", en: "I booked a room under the name Tanaka." },
      category: "前置詞"
    },
    {
      id: "f8-q12", vol: 8, part: 5, passageId: null, number: 12,
      question: "— Allô, je pourrais parler à Julien ? — Ne quittez pas, je vous le -------.",
      choices: ["passe", "passes", "passons", "passent"],
      answer: 0,
      explanation: "電話を「つなぐ・代わる」は passer。主語 je → passe。je vous le passe =「（彼を）あなたにおつなぎします」。Ne quittez pas =「切らずにお待ちください」。",
      translation: { fr: "— Allô, je pourrais parler à Julien ? — Ne quittez pas, je vous le passe.", ja: "もしもし、ジュリアンさんとお話しできますか？ — 切らずにお待ちください、おつなぎします。", en: "Hello, could I speak to Julien? — Hold on, I'll put him on." },
      category: "動詞の活用"
    },
    {
      id: "f8-q13", vol: 8, part: 5, passageId: null, number: 13,
      question: "Je suis désolé, je me suis ------- de numéro.",
      choices: ["trompant", "trompé", "trompés", "tromper"],
      answer: 1,
      explanation: "se tromper de 〜 =「〜を間違える」。代名動詞の複合過去なので être + 過去分詞。話し手（je、désolé から男性）に一致して trompé。女性なら désolée / trompée。",
      translation: { fr: "Je suis désolé, je me suis trompé de numéro.", ja: "すみません、番号を間違えました。", en: "I'm sorry, I dialed the wrong number." },
      category: "性数一致"
    },
    {
      id: "f8-q14", vol: 8, part: 5, passageId: null, number: 14,
      question: "— Ça te dit d'aller au cinéma ce soir ? — Oui, bonne ------- !",
      choices: ["idée", "nuit", "chance", "année"],
      answer: 0,
      explanation: "誘いに賛成するときは Bonne idée !（いい考えだね）。Bonne nuit（おやすみ）、Bonne chance（がんばって）、Bonne année（あけましておめでとう）は場面が違う。Ça te dit de 〜 ? =「〜するのはどう？」。",
      translation: { fr: "— Ça te dit d'aller au cinéma ce soir ? — Oui, bonne idée !", ja: "今晩映画に行かない？ — うん、いいね！", en: "How about going to the movies tonight? — Yes, good idea!" },
      category: "語彙・会話表現"
    },
    {
      id: "f8-q15", vol: 8, part: 5, passageId: null, number: 15,
      question: "J'ai perdu mon passeport. Qu'est-ce que je dois ------- ?",
      choices: ["fais", "fait", "ferai", "faire"],
      answer: 3,
      explanation: "devoir + 不定詞 =「〜しなければならない」。devoir の後は不定詞 faire。",
      translation: { fr: "J'ai perdu mon passeport. Qu'est-ce que je dois faire ?", ja: "パスポートをなくした。どうすればいい？", en: "I've lost my passport. What should I do?" },
      category: "動詞の活用"
    },
    {
      id: "f8-q16", vol: 8, part: 5, passageId: null, number: 16,
      question: "— Il faut appeler la police tout de suite ! — D'accord, je ------- appelle.",
      choices: ["lui", "leur", "l'", "la"],
      answer: 2,
      explanation: "appeler は直接他動詞。la police を受ける直接目的代名詞 la は、母音 a の前で l' になる → je l'appelle。lui・leur は間接目的。",
      translation: { fr: "— Il faut appeler la police tout de suite ! — D'accord, je l'appelle.", ja: "すぐに警察を呼ばないと！ — わかった、呼ぶよ。", en: "We have to call the police right away! — OK, I'll call them." },
      category: "代名詞"
    },
    {
      id: "f8-q17", vol: 8, part: 5, passageId: null, number: 17,
      question: "— Ça vous dérange si j'ouvre la fenêtre ? — Non, pas du -------.",
      choices: ["rien", "jamais", "plus", "tout"],
      answer: 3,
      explanation: "pas du tout =「全然〜ない」。Ça vous dérange ?（ご迷惑ですか？）に Non, pas du tout と答えると「全然かまいません」。",
      translation: { fr: "— Ça vous dérange si j'ouvre la fenêtre ? — Non, pas du tout.", ja: "窓を開けてもかまいませんか？ — ええ、全然かまいませんよ。", en: "Do you mind if I open the window? — No, not at all." },
      category: "語彙・会話表現"
    },
    {
      id: "f8-q18", vol: 8, part: 5, passageId: null, number: 18,
      question: "Si j'étais toi, je ------- un taxi.",
      choices: ["prends", "prenais", "prendrais", "prendrai"],
      answer: 2,
      explanation: "Si j'étais toi（もし私が君なら）は Si + 半過去なので、帰結は条件法現在。prendre → je prendrais。助言によく使う言い方。",
      translation: { fr: "Si j'étais toi, je prendrais un taxi.", ja: "私が君なら、タクシーに乗るよ。", en: "If I were you, I'd take a taxi." },
      category: "動詞の活用"
    },
    {
      id: "f8-q19", vol: 8, part: 5, passageId: null, number: 19,
      question: "À quelle heure ------- le musée ?",
      choices: ["ferme", "fermes", "fermez", "fermons"],
      answer: 0,
      explanation: "疑問詞の後で主語（le musée）と動詞を倒置した形。主語は三人称単数なので fermer → ferme。",
      translation: { fr: "À quelle heure ferme le musée ?", ja: "美術館は何時に閉まりますか？", en: "What time does the museum close?" },
      category: "動詞の活用"
    },
    {
      id: "f8-q20", vol: 8, part: 5, passageId: null, number: 20,
      question: "Je vous ------- une bonne soirée !",
      choices: ["souhaitez", "souhaite", "souhaites", "souhaitent"],
      answer: 1,
      explanation: "souhaiter 〜 à 〜 =「〜に…を願う」。主語 Je → souhaite。Je vous souhaite une bonne soirée =「よい夜をお過ごしください」。",
      translation: { fr: "Je vous souhaite une bonne soirée !", ja: "よい夜をお過ごしください！", en: "Have a nice evening!" },
      category: "動詞の活用"
    },
    {
      id: "f8-q21", vol: 8, part: 6, passageId: "f8-p1", number: 21,
      question: "---[Q21]--- に入るものを選んでください。",
      choices: ["aimable", "aimables", "aimablement", "amabilité"],
      answer: 0,
      explanation: "le personnel（スタッフ全体を指す男性単数の集合名詞）を説明する形容詞なので単数の aimable（親切な）。aimablement は副詞、amabilité は名詞。",
      translation: { fr: "La chambre était propre et le personnel très aimable.", ja: "部屋は清潔で、スタッフの皆さんはとても親切でした。", en: "The room was clean and the staff very friendly." },
      category: "性数一致"
    },
    {
      id: "f8-q22", vol: 8, part: 6, passageId: "f8-p1", number: 22,
      question: "---[Q22]--- に入るものを選んでください。",
      choices: ["si", "donc", "mais", "parce que"],
      answer: 1,
      explanation: "前半（騒がしかった）が原因、後半（よく眠れなかった）が結果なので donc（だから）。parce que だと因果が逆になる。",
      translation: { fr: "Il y avait beaucoup de bruit la nuit, donc je n'ai pas bien dormi.", ja: "夜はとても騒がしく、よく眠れませんでした。", en: "It was very noisy at night, so I didn't sleep well." },
      category: "語彙・会話表現"
    },
    {
      id: "f8-q23", vol: 8, part: 6, passageId: "f8-p1", number: 23,
      question: "---[Q23]--- に入るものを選んでください。",
      choices: ["donc", "pour que", "alors que", "parce que"],
      answer: 2,
      explanation: "alors que =「〜なのに」（対立）。料金に含まれていなかった ↔ サイトには書いてあった、という食い違いを示す。",
      translation: { fr: "Le petit-déjeuner n'était pas inclus dans le prix, alors que c'était écrit sur votre site Internet.", ja: "ウェブサイトには書いてあったのに、朝食が料金に含まれていませんでした。", en: "Breakfast wasn't included in the price, even though it said so on your website." },
      category: "語彙・会話表現"
    },
    {
      id: "f8-q24", vol: 8, part: 6, passageId: "f8-p1", number: 24,
      question: "---[Q24]--- に入るものを選んでください。",
      choices: ["quand", "qui", "combien", "pourquoi"],
      answer: 3,
      explanation: "食い違いの理由を尋ねているので pourquoi（なぜ）。m'expliquer pourquoi =「なぜなのか説明する」。",
      translation: { fr: "Pourriez-vous m'expliquer pourquoi ?", ja: "なぜなのか説明していただけますか？", en: "Could you explain why?" },
      category: "語彙・会話表現"
    },
    {
      id: "f8-q25", vol: 8, part: 7, passageId: "f8-p2", number: 25,
      question: "Où peut-on écouter des chorales d'enfants ?",
      choices: ["Devant la cathédrale", "Dans la rue principale", "Sur la place de la Mairie", "Au jardin public"],
      answer: 2,
      explanation: "本文：\"15 h – 18 h : chorales d'enfants, place de la Mairie\"。公園はロック、大聖堂前はジャズ。",
      translation: { ja: "子どもの合唱はどこで聞けますか？", en: "Where can you hear the children's choirs?" },
      choiceTranslations: { "Sur la place de la Mairie": { ja: "市役所前広場で", en: "On the Town Hall square" }, "Au jardin public": { ja: "市民公園で", en: "In the public garden" }, "Devant la cathédrale": { ja: "大聖堂前で", en: "In front of the cathedral" }, "Dans la rue principale": { ja: "大通りで", en: "On the main street" } },
      category: "読解"
    },
    {
      id: "f8-q26", vol: 8, part: 7, passageId: "f8-p2", number: 26,
      question: "Que se passe-t-il s'il pleut ?",
      choices: ["Les chorales chantent dans la salle des fêtes", "Tous les concerts sont annulés", "Le jazz commence plus tôt", "Les concerts deviennent payants"],
      answer: 0,
      explanation: "本文：\"En cas de pluie, les concerts de la place de la Mairie auront lieu dans la salle des fêtes\"。広場で行われるのは子どもの合唱。",
      translation: { ja: "雨が降った場合はどうなりますか？", en: "What happens if it rains?" },
      choiceTranslations: { "Les chorales chantent dans la salle des fêtes": { ja: "合唱は多目的ホールで行われる", en: "The choirs sing in the community hall" }, "Tous les concerts sont annulés": { ja: "すべてのコンサートが中止になる", en: "All the concerts are canceled" }, "Le jazz commence plus tôt": { ja: "ジャズが早く始まる", en: "The jazz starts earlier" }, "Les concerts deviennent payants": { ja: "コンサートが有料になる", en: "The concerts are no longer free" } },
      category: "読解"
    },
    {
      id: "f8-q27", vol: 8, part: 7, passageId: "f8-p2", number: 27,
      question: "Jusqu'à quelle heure la rue principale est-elle fermée aux voitures ?",
      choices: ["Jusqu'à minuit", "Jusqu'à 21 h", "Jusqu'à 14 h", "Jusqu'à 1 h du matin"],
      answer: 3,
      explanation: "本文：\"fermée aux voitures de 14 h à 1 h du matin\"（14時から翌1時まで）。24時はジャズの終了時刻。",
      translation: { ja: "大通りは何時まで車両通行止めですか？", en: "Until what time is the main street closed to cars?" },
      choiceTranslations: { "Jusqu'à 1 h du matin": { ja: "翌1時まで", en: "Until 1 a.m." }, "Jusqu'à minuit": { ja: "24時まで", en: "Until midnight" }, "Jusqu'à 21 h": { ja: "21時まで", en: "Until 9 p.m." }, "Jusqu'à 14 h": { ja: "14時まで", en: "Until 2 p.m." } },
      category: "読解"
    },
    {
      id: "f8-q28", vol: 8, part: 7, passageId: "f8-p2", number: 28,
      question: "Comment sont les transports en commun ce soir-là ?",
      choices: ["Ils sont réservés aux musiciens", "Ils sont gratuits", "Ils ne circulent pas", "Ils sont plus chers"],
      answer: 1,
      explanation: "本文：\"Bus et tramway gratuits toute la soirée\"（バスと路面電車は夜通し無料）。transports en commun =「公共交通機関」。",
      translation: { ja: "その夜、公共交通機関はどうなっていますか？", en: "What about public transport that evening?" },
      choiceTranslations: { "Ils sont gratuits": { ja: "無料", en: "They are free" }, "Ils ne circulent pas": { ja: "運休する", en: "They don't run" }, "Ils sont plus chers": { ja: "いつもより高い", en: "They cost more" }, "Ils sont réservés aux musiciens": { ja: "演奏者専用", en: "They are only for musicians" } },
      category: "読解"
    },
    {
      id: "f8-q29", vol: 8, part: 7, passageId: "f8-p3", number: 29,
      question: "Quel est le métier de Claire ?",
      choices: ["Agricultrice", "Architecte", "Jardinière", "Cuisinière"],
      answer: 1,
      explanation: "本文：\"Claire, une architecte parisienne\"（パリの建築家）。屋上菜園は仕事ではなく住まいでの活動。",
      translation: { ja: "クレールの職業は何ですか？", en: "What is Claire's job?" },
      choiceTranslations: { "Architecte": { ja: "建築家", en: "Architect" }, "Jardinière": { ja: "庭師", en: "Gardener" }, "Cuisinière": { ja: "料理人", en: "Cook" }, "Agricultrice": { ja: "農家", en: "Farmer" } },
      category: "読解"
    },
    {
      id: "f8-q30", vol: 8, part: 7, passageId: "f8-p3", number: 30,
      question: "Comment les voisins ont-ils réagi au début ?",
      choices: ["Ils étaient tout de suite d'accord", "Ils ont aidé Claire à construire le jardin", "Ils ont déménagé", "Ils avaient des doutes"],
      answer: 3,
      explanation: "本文：\"Les voisins étaient d'abord sceptiques\"（最初は懐疑的だった）。sceptique =「疑わしく思う」を avoir des doutes と言い換えている。",
      translation: { ja: "住人たちは最初どう反応しましたか？", en: "How did the neighbors react at first?" },
      choiceTranslations: { "Ils avaient des doutes": { ja: "疑っていた", en: "They had doubts" }, "Ils étaient tout de suite d'accord": { ja: "すぐに賛成した", en: "They agreed right away" }, "Ils ont aidé Claire à construire le jardin": { ja: "クレールの菜園づくりを手伝った", en: "They helped Claire build the garden" }, "Ils ont déménagé": { ja: "引っ越した", en: "They moved out" } },
      category: "読解"
    },
    {
      id: "f8-q31", vol: 8, part: 7, passageId: "f8-p3", number: 31,
      question: "Que se passe-t-il le premier samedi du mois ?",
      choices: ["Les habitants mangent ensemble", "Claire donne un cours de jardinage", "Ils vendent leurs légumes", "Ils plantent des tomates"],
      answer: 0,
      explanation: "本文：\"tout le monde se retrouve le premier samedi du mois pour un grand repas\"（毎月第1土曜日に集まって大きな食事会）。",
      translation: { ja: "毎月第1土曜日には何がありますか？", en: "What happens on the first Saturday of the month?" },
      choiceTranslations: { "Les habitants mangent ensemble": { ja: "住人たちが一緒に食事をする", en: "The residents eat together" }, "Claire donne un cours de jardinage": { ja: "クレールが園芸教室を開く", en: "Claire gives a gardening class" }, "Ils vendent leurs légumes": { ja: "野菜を売る", en: "They sell their vegetables" }, "Ils plantent des tomates": { ja: "トマトを植える", en: "They plant tomatoes" } },
      category: "読解"
    },
    {
      id: "f8-q32", vol: 8, part: 7, passageId: "f8-p3", number: 32,
      question: "Qu'est-ce qui a changé grâce au jardin ?",
      choices: ["L'immeuble est plus grand", "Claire a changé de métier", "Les habitants se connaissent", "Le loyer a baissé"],
      answer: 2,
      explanation: "本文：\"Avant, on ne se parlait presque pas ... Maintenant, on se connaît tous\"（以前はほとんど話さなかったが、今はみんな知り合い）。",
      translation: { ja: "菜園のおかげで何が変わりましたか？", en: "What has changed thanks to the garden?" },
      choiceTranslations: { "Les habitants se connaissent": { ja: "住人どうしが知り合いになった", en: "The residents know each other" }, "Le loyer a baissé": { ja: "家賃が下がった", en: "The rent has gone down" }, "L'immeuble est plus grand": { ja: "建物が大きくなった", en: "The building is bigger" }, "Claire a changé de métier": { ja: "クレールが転職した", en: "Claire changed jobs" } },
      category: "読解"
    }
  ]
};
