// Vol.F1 基礎総合（フランス語・仏検4級軸＋3級要素）。2026-07-04 新規作成。
// part 5/6/7 は仕組み流用のためのセクション番号（第1部/第2部/第3部）。
SUBJECTS.french.vols[1] = {
  label: "Vol.F1 基礎総合",
  passages: [
    {
      id: "f1-p1", vol: 1, part: 6,
      title: "第21〜24問：次のメールを読んでください。",
      body: "Chère Camille,\n\nMerci pour ton message. Je suis très content ---[Q21]--- venir à ta fête samedi prochain. C'est une très bonne idée !\n\nJe vais apporter un gâteau ---[Q22]--- chocolat, parce que je sais que tu adores ça. ---[Q23]--- tu as besoin d'autre chose, dis-le-moi.\n\nÀ samedi ! Je ---[Q24]--- appellerai vendredi soir pour confirmer l'heure.\n\nBises,\nLucas"
    },
    {
      id: "f1-p2", vol: 1, part: 7,
      title: "第25〜28問：次の広告を読んでください。",
      body: "CAFÉ DU MARCHÉ\n\nOuvert tous les jours sauf le lundi\nDe 8 h à 19 h\n\nNotre café vous propose :\n· Petit-déjeuner servi jusqu'à 11 h\n· Déjeuner du jour à 12 euros (plat + dessert)\n· Pâtisseries maison toute la journée\n\nTous les mercredis, un concert de jazz à partir de 18 h.\nEntrée gratuite pour les clients du restaurant.\n\nRéservation conseillée le week-end.\nTéléphone : 01 42 55 18 30\nAdresse : 14, rue des Lilas, Paris"
    },
    {
      id: "f1-p3", vol: 1, part: 7,
      title: "第29〜32問：次の文章を読んでください。",
      body: "Julie habite à Lyon depuis trois ans. Avant, elle habitait à Marseille, où elle est née. Elle travaille comme infirmière dans un grand hôpital du centre-ville.\n\nLe matin, elle prend son vélo pour aller au travail, parce que c'est plus rapide que le bus. Elle commence à sept heures et demie et finit vers dix-huit heures.\n\nLe week-end, Julie aime se promener au bord du fleuve avec son chien. Elle aime aussi cuisiner pour ses amis. Le mois prochain, elle va partir en vacances en Italie avec sa sœur."
    }
  ],
  questions: [
    {
      id: "f1-q1", vol: 1, part: 5, passageId: null, number: 1,
      question: "Bonjour ! Je ------- Paul. Et toi, comment tu t'appelles ?",
      choices: ["m'appelle", "t'appelles", "s'appelle", "vous appelez"],
      answer: 0,
      explanation: "代名動詞 s'appeler（〜という名前である）の一人称単数。主語 Je に対応するのは me + appelle → m'appelle。",
      category: "動詞の活用"
    },
    {
      id: "f1-q2", vol: 1, part: 5, passageId: null, number: 2,
      question: "Nous ------- des étudiants. Nous étudions le français.",
      choices: ["suis", "es", "sommes", "êtes"],
      answer: 2,
      explanation: "être の直説法現在。主語 Nous に対応するのは sommes。",
      category: "動詞の活用"
    },
    {
      id: "f1-q3", vol: 1, part: 5, passageId: null, number: 3,
      question: "Hier, nous ------- au cinéma avec des amis.",
      choices: ["allons", "sommes allés", "irons", "allions"],
      answer: 1,
      explanation: "Hier（昨日）＝過去の完了した動作なので複合過去。aller は助動詞に être をとり、主語 nous に一致して allés。→ sommes allés。",
      category: "動詞の活用"
    },
    {
      id: "f1-q4", vol: 1, part: 5, passageId: null, number: 4,
      question: "Elle a acheté une ------- voiture rouge.",
      choices: ["beau", "bel", "belle", "beaux"],
      answer: 2,
      explanation: "voiture は女性名詞なので形容詞 beau は女性形 belle に一致。une belle voiture。",
      category: "性数一致"
    },
    {
      id: "f1-q5", vol: 1, part: 5, passageId: null, number: 5,
      question: "Je bois ------- café tous les matins.",
      choices: ["du", "de la", "des", "de l'"],
      answer: 0,
      explanation: "café は男性名詞で数えられない量を表すので部分冠詞 du（de + le）。「（いくらかの）コーヒーを飲む」。",
      category: "冠詞・限定詞"
    },
    {
      id: "f1-q6", vol: 1, part: 5, passageId: null, number: 6,
      question: "Ce livre est intéressant. Je vais ------- lire ce soir.",
      choices: ["le", "la", "lui", "les"],
      answer: 0,
      explanation: "直接目的語 ce livre（男性単数）を受ける代名詞は le。「それを読む」。lui は間接目的（人）。",
      category: "代名詞"
    },
    {
      id: "f1-q7", vol: 1, part: 5, passageId: null, number: 7,
      question: "Nous habitons ------- Japon depuis deux ans.",
      choices: ["à", "en", "au", "aux"],
      answer: 2,
      explanation: "国名で男性名詞（le Japon）には「〜に住む」で au（à + le）を使う。en は女性名詞の国（en France）。",
      category: "前置詞"
    },
    {
      id: "f1-q8", vol: 1, part: 5, passageId: null, number: 8,
      question: "— Tu as faim ? — Oui, je voudrais ------- manger.",
      choices: ["rien", "quelque chose", "personne", "quelqu'un"],
      answer: 1,
      explanation: "quelque chose = 「何か」。「何か食べたい」。rien は「何も〜ない」、quelqu'un/personne は「人」。",
      category: "語彙・会話表現"
    },
    {
      id: "f1-q9", vol: 1, part: 5, passageId: null, number: 9,
      question: "Quand j'étais petit, je ------- souvent chez mes grands-parents.",
      choices: ["vais", "suis allé", "allais", "irai"],
      answer: 2,
      explanation: "「子どものころ、よく〜した」という過去の習慣は半過去。aller の半過去一人称 allais。",
      category: "動詞の活用"
    },
    {
      id: "f1-q10", vol: 1, part: 5, passageId: null, number: 10,
      question: "Voici Marie et sa sœur. ------- sont très gentilles.",
      choices: ["Il", "Elle", "Ils", "Elles"],
      answer: 3,
      explanation: "Marie と sa sœur は両方女性 → 女性複数の主語代名詞 Elles。形容詞も gentilles（女性複数）で一致。",
      category: "代名詞"
    },
    {
      id: "f1-q11", vol: 1, part: 5, passageId: null, number: 11,
      question: "Il fait froid. ------- ton manteau !",
      choices: ["Mets", "Mettre", "Mis", "Mettez-tu"],
      answer: 0,
      explanation: "tu に対する命令法。mettre（着る・置く）の tu の命令形は Mets（-s は落ちない不規則）。「コートを着なさい」。",
      category: "動詞の活用"
    },
    {
      id: "f1-q12", vol: 1, part: 5, passageId: null, number: 12,
      question: "Cette robe est plus jolie ------- l'autre.",
      choices: ["de", "que", "comme", "aussi"],
      answer: 1,
      explanation: "比較級 plus + 形容詞 + que 〜 =「〜より…」。plus jolie que l'autre。",
      category: "語彙・会話表現"
    },
    {
      id: "f1-q13", vol: 1, part: 5, passageId: null, number: 13,
      question: "— Est-ce que tu connais Pierre ? — Oui, je ------- connais bien.",
      choices: ["le", "lui", "y", "en"],
      answer: 0,
      explanation: "connaître は直接他動詞。Pierre（男性・人）を受ける直接目的代名詞は le。「彼を知っている」。",
      category: "代名詞"
    },
    {
      id: "f1-q14", vol: 1, part: 5, passageId: null, number: 14,
      question: "Le train part ------- huit heures précises.",
      choices: ["à", "en", "dans", "de"],
      answer: 0,
      explanation: "時刻の「〜時に」は à。à huit heures =「8時に」。",
      category: "前置詞"
    },
    {
      id: "f1-q15", vol: 1, part: 5, passageId: null, number: 15,
      question: "Nous n'avons pas ------- pain. Il faut en acheter.",
      choices: ["du", "de", "le", "des"],
      answer: 1,
      explanation: "否定文では部分冠詞・不定冠詞は de になる。ne...pas de pain。",
      category: "冠詞・限定詞"
    },
    {
      id: "f1-q16", vol: 1, part: 5, passageId: null, number: 16,
      question: "Ma mère ------- se lever tôt le dimanche.",
      choices: ["n'aime pas", "n'aimes pas", "aime pas ne", "ne aime pas"],
      answer: 0,
      explanation: "否定は ne + 動詞 + pas。主語 Ma mère（三人称単数）→ aime。母音の前で ne → n'。n'aime pas。",
      category: "動詞の活用"
    },
    {
      id: "f1-q17", vol: 1, part: 5, passageId: null, number: 17,
      question: "Ces fleurs sont très ------- .",
      choices: ["beau", "beaux", "belle", "belles"],
      answer: 3,
      explanation: "fleurs は女性複数名詞。形容詞 beau の女性複数形は belles。",
      category: "性数一致"
    },
    {
      id: "f1-q18", vol: 1, part: 5, passageId: null, number: 18,
      question: "------- est-ce que tu vas en vacances cet été ?",
      choices: ["Où", "Qui", "Combien", "Quel"],
      answer: 0,
      explanation: "「どこへ」＝場所を尋ねる疑問詞 Où。「この夏どこへバカンスに行くの？」。",
      category: "語彙・会話表現"
    },
    {
      id: "f1-q19", vol: 1, part: 5, passageId: null, number: 19,
      question: "Demain, je ------- rendre visite à ma tante.",
      choices: ["vais", "vas", "va", "allons"],
      answer: 0,
      explanation: "近接未来 aller + 不定詞（〜するつもり）。主語 je に対応する aller の現在は vais。「明日おばを訪ねる」。",
      category: "動詞の活用"
    },
    {
      id: "f1-q20", vol: 1, part: 5, passageId: null, number: 20,
      question: "Il travaille ------- son bureau du matin au soir.",
      choices: ["à", "dans", "en", "sur"],
      answer: 1,
      explanation: "「オフィスの中で」＝空間の内部は dans son bureau。à は所属や地点、sur は「〜の上」。",
      category: "前置詞"
    },
    {
      id: "f1-q21", vol: 1, part: 6, passageId: "f1-p1", number: 21,
      question: "---[Q21]--- に入るものを選んでください。",
      choices: ["de", "à", "pour", "en"],
      answer: 0,
      explanation: "content de + 不定詞 =「〜して嬉しい」。être content de venir。感情の形容詞の後は前置詞 de。",
      category: "前置詞"
    },
    {
      id: "f1-q22", vol: 1, part: 6, passageId: "f1-p1", number: 22,
      question: "---[Q22]--- に入るものを選んでください。",
      choices: ["au", "à la", "en", "de"],
      answer: 0,
      explanation: "「〜入りの／〜味の」は à + 定冠詞。chocolat は男性名詞なので au（à + le）。un gâteau au chocolat =「チョコレートケーキ」。",
      category: "冠詞・限定詞"
    },
    {
      id: "f1-q23", vol: 1, part: 6, passageId: "f1-p1", number: 23,
      question: "---[Q23]--- に入るものを選んでください。",
      choices: ["Si", "Que", "Quand", "Comme"],
      answer: 0,
      explanation: "Si + 直説法現在 =「もし〜なら」。Si tu as besoin d'autre chose =「もし他に必要なものがあれば」。",
      category: "語彙・会話表現"
    },
    {
      id: "f1-q24", vol: 1, part: 6, passageId: "f1-p1", number: 24,
      question: "---[Q24]--- に入るものを選んでください。",
      choices: ["t'", "te", "lui", "vous"],
      answer: 0,
      explanation: "「君に電話する」téléphoner ではなく appeler は直接他動詞。tu を受ける直接目的代名詞 te が母音 a の前で t' に。Je t'appellerai。",
      category: "代名詞"
    },
    {
      id: "f1-q25", vol: 1, part: 7, passageId: "f1-p2", number: 25,
      question: "Quel jour le café est-il fermé ?",
      choices: ["Le dimanche", "Le lundi", "Le mercredi", "Le samedi"],
      answer: 1,
      explanation: "本文：\"Ouvert tous les jours sauf le lundi\"（月曜以外毎日営業）→ 休みは月曜。sauf =「〜を除いて」。",
      category: "読解"
    },
    {
      id: "f1-q26", vol: 1, part: 7, passageId: "f1-p2", number: 26,
      question: "Combien coûte le déjeuner du jour ?",
      choices: ["8 euros", "11 euros", "12 euros", "18 euros"],
      answer: 2,
      explanation: "本文：\"Déjeuner du jour à 12 euros\"（本日のランチ12ユーロ、料理＋デザート）。",
      category: "読解"
    },
    {
      id: "f1-q27", vol: 1, part: 7, passageId: "f1-p2", number: 27,
      question: "Qu'est-ce qu'il y a tous les mercredis ?",
      choices: ["Un marché", "Un concert de jazz", "Un menu spécial", "Une fermeture"],
      answer: 1,
      explanation: "本文：\"Tous les mercredis, un concert de jazz à partir de 18 h\"（毎週水曜18時からジャズコンサート）。",
      category: "読解"
    },
    {
      id: "f1-q28", vol: 1, part: 7, passageId: "f1-p2", number: 28,
      question: "D'après le texte, qu'est-ce qui est conseillé le week-end ?",
      choices: ["De réserver une table", "De venir le matin", "De payer en espèces", "D'apporter un dessert"],
      answer: 0,
      explanation: "本文：\"Réservation conseillée le week-end\"（週末は予約がおすすめ）。conseillé =「勧められている」。",
      category: "読解"
    },
    {
      id: "f1-q29", vol: 1, part: 7, passageId: "f1-p3", number: 29,
      question: "Où est née Julie ?",
      choices: ["À Lyon", "À Marseille", "En Italie", "À Paris"],
      answer: 1,
      explanation: "本文：\"à Marseille, où elle est née\"（マルセイユ、そこで生まれた）。今はリヨンに住んでいるが出生地はマルセイユ。",
      category: "読解"
    },
    {
      id: "f1-q30", vol: 1, part: 7, passageId: "f1-p3", number: 30,
      question: "Comment Julie va-t-elle au travail ?",
      choices: ["En bus", "En voiture", "À vélo", "À pied"],
      answer: 2,
      explanation: "本文：\"elle prend son vélo pour aller au travail\"（自転車で通勤、バスより速いから）。",
      category: "読解"
    },
    {
      id: "f1-q31", vol: 1, part: 7, passageId: "f1-p3", number: 31,
      question: "Quel est le métier de Julie ?",
      choices: ["Médecin", "Infirmière", "Professeur", "Cuisinière"],
      answer: 1,
      explanation: "本文：\"Elle travaille comme infirmière\"（看護師として働いている）。",
      category: "読解"
    },
    {
      id: "f1-q32", vol: 1, part: 7, passageId: "f1-p3", number: 32,
      question: "Qu'est-ce que Julie va faire le mois prochain ?",
      choices: ["Déménager à Marseille", "Partir en vacances en Italie", "Changer de travail", "Adopter un chien"],
      answer: 1,
      explanation: "本文：\"Le mois prochain, elle va partir en vacances en Italie avec sa sœur\"（来月、姉／妹とイタリアへバカンス）。",
      category: "読解"
    }
  ]
};
