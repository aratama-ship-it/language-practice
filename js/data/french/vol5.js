// Vol.F5 3級チャレンジ（フランス語・仏検3級相当：関係代名詞・ジェロンディフ・過去分詞の一致・疑問代名詞）。2026-11-07 新規作成。
// 各問の translation（fr＝空欄を埋めた正解文）と choiceTranslations（選択肢の文字列がキー）は結果詳細で表示する。
SUBJECTS.french.vols[5] = {
  label: "Vol.F5 3級チャレンジ",
  passages: [
    {
      id: "f5-p1", vol: 5, part: 6,
      title: "第21〜24問：次のメールを読んでください。",
      body: "Madame, Monsieur,\n\nJe m'appelle Kenji Sato. Je suis japonais et j'habite à Lyon ---[Q21]--- six mois. Je voudrais m'inscrire à votre cours de français du soir.\n\nJ'ai déjà étudié le français au Japon, mais j'---[Q22]--- encore des difficultés à l'oral. Pourriez-vous me dire quel niveau ---[Q23]--- conviendrait ?\n\nJe suis disponible le lundi et le jeudi après 18 heures.\n\nJe vous remercie par avance de votre réponse et je vous prie d'agréer, Madame, Monsieur, l'expression de mes ---[Q24]--- distinguées.\n\nKenji Sato",
      translation: { ja: "ご担当者様\n\n佐藤健二と申します。日本人で、半年前からリヨンに住んでいます。貴校の夜間フランス語講座に申し込みたいと思っています。\n\n日本でフランス語を学んだことはありますが、話すことにはまだ苦労しています。私にはどのレベルが合うか教えていただけますか？\n\n月曜と木曜の18時以降なら都合がつきます。\n\nお返事をお待ちしております。敬具\n\n佐藤健二", en: "Dear Sir or Madam,\n\nMy name is Kenji Sato. I'm Japanese and I have been living in Lyon for six months. I would like to sign up for your evening French class.\n\nI have already studied French in Japan, but I still have difficulty speaking. Could you tell me which level would suit me?\n\nI am available on Mondays and Thursdays after 6 p.m.\n\nThank you in advance for your reply.\n\nYours faithfully,\nKenji Sato" }
    },
    {
      id: "f5-p2", vol: 5, part: 7,
      title: "第25〜28問：次の案内を読んでください。",
      body: "MUSÉE DES BEAUX-ARTS\n\nExposition « Couleurs de Provence »\nDu 15 mars au 30 juin\n\nOuvert du mardi au dimanche, de 10 h à 18 h\nNocturne le jeudi jusqu'à 21 h\nFermé le lundi et le 1er mai\n\nPlein tarif : 12 euros\nTarif réduit (étudiants, plus de 65 ans) : 8 euros\nGratuit pour les moins de 18 ans, et pour tous le premier dimanche du mois\n\nVisites guidées le samedi à 15 h (sans supplément, sur réservation)\nPhotos autorisées sans flash",
      translation: { ja: "美術館\n\n展覧会「プロヴァンスの色彩」\n3月15日〜6月30日\n\n火曜〜日曜、10時〜18時開館\n木曜は21時まで夜間開館\n月曜日と5月1日は休館\n\n一般料金：12ユーロ\n割引料金（学生・65歳以上）：8ユーロ\n18歳未満は無料。毎月第1日曜日は全員無料\n\nガイドツアーは土曜15時（追加料金なし・要予約）\nフラッシュなしの撮影可", en: "MUSEUM OF FINE ARTS\n\nExhibition \"Colors of Provence\"\nMarch 15 to June 30\n\nOpen Tuesday to Sunday, 10 a.m. to 6 p.m.\nLate opening on Thursdays until 9 p.m.\nClosed on Mondays and May 1\n\nFull price: 12 euros\nReduced price (students, over 65): 8 euros\nFree for under-18s, and for everyone on the first Sunday of the month\n\nGuided tours on Saturdays at 3 p.m. (no extra charge, reservation required)\nPhotos allowed without flash" }
    },
    {
      id: "f5-p3", vol: 5, part: 7,
      title: "第29〜32問：次の文章を読んでください。",
      body: "Après vingt ans dans une grande entreprise, Nathalie a décidé de changer de vie. À quarante-cinq ans, elle a quitté son poste de comptable pour devenir boulangère.\n\n« Je passais mes journées devant un ordinateur et je ne voyais jamais le soleil », explique-t-elle. Elle a suivi une formation de dix mois, puis elle a ouvert sa boulangerie dans son quartier.\n\nAujourd'hui, elle se lève à quatre heures du matin et travaille six jours sur sept. Elle gagne moins d'argent qu'avant, mais elle ne regrette rien. « Ce que j'aime le plus, c'est le contact avec les clients », dit-elle.",
      translation: { ja: "大企業で20年働いたあと、ナタリーは人生を変えることにした。45歳で経理の仕事を辞め、パン職人になったのだ。\n\n「一日中パソコンの前にいて、太陽を見ることがなかったんです」と彼女は説明する。10か月の研修を受けたあと、自分の住む地区にパン屋を開いた。\n\n今、彼女は朝4時に起き、週6日働いている。以前より収入は少ないが、まったく後悔していない。「一番好きなのは、お客さんとのふれあいです」と彼女は言う。", en: "After twenty years at a large company, Nathalie decided to change her life. At forty-five, she left her job as an accountant to become a baker.\n\n\"I spent my days in front of a computer and I never saw the sun,\" she explains. She did a ten-month training course, then opened her bakery in her neighborhood.\n\nToday, she gets up at four in the morning and works six days a week. She earns less money than before, but she has no regrets. \"What I like most is the contact with customers,\" she says." }
    }
  ],
  questions: [
    {
      id: "f5-q1", vol: 5, part: 5, passageId: null, number: 1,
      question: "Si tu pars maintenant, tu ------- le train de huit heures.",
      choices: ["prenais", "aies pris", "prendras", "prendrais"],
      answer: 2,
      explanation: "Si + 直説法現在（もし今出発すれば）の帰結は単純未来。prendre の単純未来 tu prendras。条件法 prendrais は Si + 半過去（もし〜だったら）と組む。",
      translation: { fr: "Si tu pars maintenant, tu prendras le train de huit heures.", ja: "今出発すれば、8時の電車に乗れるよ。", en: "If you leave now, you'll catch the eight o'clock train." },
      category: "動詞の活用"
    },
    {
      id: "f5-q2", vol: 5, part: 5, passageId: null, number: 2,
      question: "Je cherche quelqu'un ------- parle japonais.",
      choices: ["qui", "que", "dont", "où"],
      answer: 0,
      explanation: "関係節の中で主語（quelqu'un が parle する）の役割をするので qui。",
      translation: { fr: "Je cherche quelqu'un qui parle japonais.", ja: "日本語を話せる人を探しています。", en: "I'm looking for someone who speaks Japanese." },
      category: "代名詞"
    },
    {
      id: "f5-q3", vol: 5, part: 5, passageId: null, number: 3,
      question: "La maison ------- nous avons achetée est très ancienne.",
      choices: ["où", "que", "qui", "dont"],
      answer: 1,
      explanation: "関係節の中で acheter の直接目的語（la maison を買った）になるので que。過去分詞 achetée が女性形なのも、前に置かれた直接目的語 que（= la maison）に一致しているため。",
      translation: { fr: "La maison que nous avons achetée est très ancienne.", ja: "私たちが買った家はとても古い。", en: "The house we bought is very old." },
      category: "代名詞"
    },
    {
      id: "f5-q4", vol: 5, part: 5, passageId: null, number: 4,
      question: "En ------- le journal, j'ai appris la nouvelle.",
      choices: ["lisant", "lire", "lu", "lisait"],
      answer: 0,
      explanation: "ジェロンディフ en + 現在分詞 =「〜しながら・〜していて」。lire の現在分詞は lisant（nous lisons の語幹 lis- + -ant）。",
      translation: { fr: "En lisant le journal, j'ai appris la nouvelle.", ja: "新聞を読んでいて、そのニュースを知った。", en: "While reading the newspaper, I learned the news." },
      category: "動詞の活用"
    },
    {
      id: "f5-q5", vol: 5, part: 5, passageId: null, number: 5,
      question: "Ils se sont ------- à la gare.",
      choices: ["retrouver", "retrouvés", "retrouvé", "retrouvées"],
      answer: 1,
      explanation: "代名動詞の複合過去は助動詞 être。ここの se は直接目的（お互いを見つける＝落ち合う）なので、過去分詞は主語 Ils（男性複数）に一致して retrouvés。",
      translation: { fr: "Ils se sont retrouvés à la gare.", ja: "彼らは駅で落ち合った。", en: "They met up at the station." },
      category: "性数一致"
    },
    {
      id: "f5-q6", vol: 5, part: 5, passageId: null, number: 6,
      question: "Nous ------- ce film trois fois : nous le connaissons par cœur.",
      choices: ["verrons", "voyions", "avons vu", "voyons"],
      answer: 2,
      explanation: "trois fois（3回）と回数を区切った、完了した経験なので複合過去。voir → nous avons vu。半過去 voyions は回数を区切らない過去の習慣・状態に使う。",
      translation: { fr: "Nous avons vu ce film trois fois : nous le connaissons par cœur.", ja: "私たちはこの映画を3回見た。すっかり覚えている。", en: "We've seen this movie three times: we know it by heart." },
      category: "動詞の活用"
    },
    {
      id: "f5-q7", vol: 5, part: 5, passageId: null, number: 7,
      question: "Vous pourriez m'aider ? Je ne sais pas ------- utiliser cette machine.",
      choices: ["quoi", "que", "quel", "comment"],
      answer: 3,
      explanation: "savoir + comment + 不定詞 =「どのように〜するかわかる」。Je ne sais pas comment utiliser 〜 =「〜の使い方がわからない」。",
      translation: { fr: "Vous pourriez m'aider ? Je ne sais pas comment utiliser cette machine.", ja: "手伝っていただけますか？ この機械の使い方がわかりません。", en: "Could you help me? I don't know how to use this machine." },
      category: "語彙・会話表現"
    },
    {
      id: "f5-q8", vol: 5, part: 5, passageId: null, number: 8,
      question: "Il travaille ------- que son frère.",
      choices: ["tant", "même", "autant", "aussi"],
      answer: 2,
      explanation: "動詞（travailler）の量を比べる同等比較は autant que（〜と同じくらい）。aussi que は形容詞・副詞の比較（aussi grand que）に使う。",
      translation: { fr: "Il travaille autant que son frère.", ja: "彼は兄（弟）と同じくらい働く。", en: "He works as much as his brother." },
      category: "語彙・会話表現"
    },
    {
      id: "f5-q9", vol: 5, part: 5, passageId: null, number: 9,
      question: "Parmi ces deux robes, ------- préfères-tu ?",
      choices: ["laquelle", "lequel", "quelle", "lesquelles"],
      answer: 0,
      explanation: "選択肢の中から「どれ」を尋ねる疑問代名詞は lequel 系。robe（女性単数の1着）を指すので laquelle。quelle は後に名詞が要る疑問形容詞。",
      translation: { fr: "Parmi ces deux robes, laquelle préfères-tu ?", ja: "この2着のワンピースのうち、どちらが好き？", en: "Of these two dresses, which one do you prefer?" },
      category: "代名詞"
    },
    {
      id: "f5-q10", vol: 5, part: 5, passageId: null, number: 10,
      question: "Je n'ai ------- vu ce film : je ne le connais pas.",
      choices: ["plus", "rien", "personne", "jamais"],
      answer: 3,
      explanation: "ne ... jamais =「一度も〜ない」。「知らない」と続くので、一度も見たことがないの jamais。ne ... plus は「（以前はしたが）もう〜ない」。",
      translation: { fr: "Je n'ai jamais vu ce film : je ne le connais pas.", ja: "その映画は一度も見たことがない。知らない。", en: "I've never seen that movie: I don't know it." },
      category: "語彙・会話表現"
    },
    {
      id: "f5-q11", vol: 5, part: 5, passageId: null, number: 11,
      question: "Nous avons besoin ------- ton aide.",
      choices: ["en", "de", "à", "pour"],
      answer: 1,
      explanation: "avoir besoin de 〜 =「〜が必要だ」。前置詞は常に de。",
      translation: { fr: "Nous avons besoin de ton aide.", ja: "私たちには君の助けが必要だ。", en: "We need your help." },
      category: "前置詞"
    },
    {
      id: "f5-q12", vol: 5, part: 5, passageId: null, number: 12,
      question: "Il s'intéresse ------- la peinture moderne.",
      choices: ["sur", "à", "de", "pour"],
      answer: 1,
      explanation: "s'intéresser à 〜 =「〜に興味を持つ」。名詞形 un intérêt pour 〜 と前置詞が違うので注意。",
      translation: { fr: "Il s'intéresse à la peinture moderne.", ja: "彼は現代絵画に興味がある。", en: "He's interested in modern painting." },
      category: "前置詞"
    },
    {
      id: "f5-q13", vol: 5, part: 5, passageId: null, number: 13,
      question: "— Tu penses à tes vacances ? — Oui, j'------- pense tout le temps.",
      choices: ["en", "le", "lui", "y"],
      answer: 3,
      explanation: "penser à + 物・事柄（à tes vacances）を受ける中性代名詞は y。j'y pense =「それについて考える」。人なら à lui / à elle を使う（je pense à lui）。",
      translation: { fr: "— Tu penses à tes vacances ? — Oui, j'y pense tout le temps.", ja: "休暇のこと考えてる？ — うん、ずっと考えてるよ。", en: "Are you thinking about your vacation? — Yes, I think about it all the time." },
      category: "代名詞"
    },
    {
      id: "f5-q14", vol: 5, part: 5, passageId: null, number: 14,
      question: "Je te téléphonerai dès que je ------- à Tokyo.",
      choices: ["serai", "suis", "serais", "étais"],
      answer: 0,
      explanation: "dès que（〜するとすぐに）で未来のことを言うときは、quand と同じく後ろも単純未来。être → je serai。",
      translation: { fr: "Je te téléphonerai dès que je serai à Tokyo.", ja: "東京に着いたらすぐ電話するね。", en: "I'll call you as soon as I'm in Tokyo." },
      category: "動詞の活用"
    },
    {
      id: "f5-q15", vol: 5, part: 5, passageId: null, number: 15,
      question: "Ce sont des amis ------- je passe mes vacances.",
      choices: ["qui", "dont", "avec qui", "que"],
      answer: 2,
      explanation: "passer ses vacances avec 〜（〜と休暇を過ごす）の avec を残し、人を受ける qui を続けて avec qui。前置詞の後で人を受けるときは qui。",
      translation: { fr: "Ce sont des amis avec qui je passe mes vacances.", ja: "彼らは私が一緒に休暇を過ごす友人たちです。", en: "They're the friends I spend my vacations with." },
      category: "代名詞"
    },
    {
      id: "f5-q16", vol: 5, part: 5, passageId: null, number: 16,
      question: "Les clés ? Je les ai ------- sur la table.",
      choices: ["posé", "posés", "posée", "posées"],
      answer: 3,
      explanation: "助動詞 avoir でも、直接目的語の代名詞が前にあれば過去分詞が一致する。les = les clés（女性複数）なので posées。",
      translation: { fr: "Les clés ? Je les ai posées sur la table.", ja: "鍵？ テーブルの上に置いたよ。", en: "The keys? I put them on the table." },
      category: "性数一致"
    },
    {
      id: "f5-q17", vol: 5, part: 5, passageId: null, number: 17,
      question: "Il est interdit ------- fumer dans ce bâtiment.",
      choices: ["en", "de", "à", "pour"],
      answer: 1,
      explanation: "Il est + 形容詞 + de + 不定詞 =「〜することは…だ」。Il est interdit de fumer =「喫煙は禁止されている」。",
      translation: { fr: "Il est interdit de fumer dans ce bâtiment.", ja: "この建物内は禁煙です。", en: "Smoking is prohibited in this building." },
      category: "前置詞"
    },
    {
      id: "f5-q18", vol: 5, part: 5, passageId: null, number: 18,
      question: "C'était ------- facile que je l'ai fait en dix minutes.",
      choices: ["trop", "aussi", "si", "très"],
      answer: 2,
      explanation: "si + 形容詞 + que 〜 =「とても…なので〜」（結果）。très や trop は que と組んでこの意味にならない。",
      translation: { fr: "C'était si facile que je l'ai fait en dix minutes.", ja: "とても簡単だったので10分でできた。", en: "It was so easy that I did it in ten minutes." },
      category: "語彙・会話表現"
    },
    {
      id: "f5-q19", vol: 5, part: 5, passageId: null, number: 19,
      question: "Je me suis couché tard ; c'est pourquoi je suis ------- ce matin.",
      choices: ["fatigué", "reposé", "en forme", "content"],
      answer: 0,
      explanation: "c'est pourquoi =「だから」。遅く寝た結果として自然なのは fatigué（疲れている）。reposé（休まった）や en forme（元気）は逆の意味。",
      translation: { fr: "Je me suis couché tard ; c'est pourquoi je suis fatigué ce matin.", ja: "遅く寝た。だから今朝は疲れている。", en: "I went to bed late; that's why I'm tired this morning." },
      category: "語彙・会話表現"
    },
    {
      id: "f5-q20", vol: 5, part: 5, passageId: null, number: 20,
      question: "Les enfants ont ------- pendant tout le voyage.",
      choices: ["dormi", "dormis", "dormaient", "dormir"],
      answer: 0,
      explanation: "助動詞 avoir の過去分詞は、前に直接目的語がなければ主語に一致しない。dormir の過去分詞 dormi のまま。",
      translation: { fr: "Les enfants ont dormi pendant tout le voyage.", ja: "子どもたちは旅行中ずっと眠っていた。", en: "The children slept during the whole trip." },
      category: "動詞の活用"
    },
    {
      id: "f5-q21", vol: 5, part: 6, passageId: "f5-p1", number: 21,
      question: "---[Q21]--- に入るものを選んでください。",
      choices: ["pendant", "dans", "depuis", "il y a"],
      answer: 2,
      explanation: "現在も続いている状態の「〜前から」は depuis + 期間。j'habite à Lyon depuis six mois =「半年前からリヨンに住んでいる（今も住んでいる）」。il y a は完了した過去の時点（je suis arrivé il y a six mois）に使う。",
      translation: { fr: "Je suis japonais et j'habite à Lyon depuis six mois.", ja: "日本人で、半年前からリヨンに住んでいます。", en: "I'm Japanese and I have been living in Lyon for six months." },
      category: "前置詞"
    },
    {
      id: "f5-q22", vol: 5, part: 6, passageId: "f5-p1", number: 22,
      question: "---[Q22]--- に入るものを選んでください。",
      choices: ["avons", "ai", "as", "a"],
      answer: 1,
      explanation: "avoir des difficultés à 〜 =「〜に苦労する」。主語 je に対応する avoir の現在形は ai（j' の形で空欄の前に書かれている）。",
      translation: { fr: "J'ai déjà étudié le français au Japon, mais j'ai encore des difficultés à l'oral.", ja: "日本でフランス語を学んだことはありますが、話すことにはまだ苦労しています。", en: "I have already studied French in Japan, but I still have difficulty speaking." },
      category: "動詞の活用"
    },
    {
      id: "f5-q23", vol: 5, part: 6, passageId: "f5-p1", number: 23,
      question: "---[Q23]--- に入るものを選んでください。",
      choices: ["moi", "je", "mon", "me"],
      answer: 3,
      explanation: "convenir à 〜（〜に合う）の間接目的「私に」は代名詞 me にして動詞の前に置く。quel niveau me conviendrait =「どのレベルが私に合うか」。moi は前置詞の後や肯定命令文で使う形。",
      translation: { fr: "Pourriez-vous me dire quel niveau me conviendrait ?", ja: "私にはどのレベルが合うか教えていただけますか？", en: "Could you tell me which level would suit me?" },
      category: "代名詞"
    },
    {
      id: "f5-q24", vol: 5, part: 6, passageId: "f5-p1", number: 24,
      question: "---[Q24]--- に入るものを選んでください。",
      choices: ["saluts", "salut", "salutations", "salutation"],
      answer: 2,
      explanation: "改まった手紙の結びの定型 l'expression de mes salutations distinguées（敬具）。distinguées が女性複数なので、名詞も女性複数の salutations。",
      translation: { fr: "Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.", ja: "敬具", en: "Yours faithfully." },
      category: "語彙・会話表現"
    },
    {
      id: "f5-q25", vol: 5, part: 7, passageId: "f5-p2", number: 25,
      question: "Jusqu'à quelle heure peut-on visiter le jeudi ?",
      choices: ["Jusqu'à 18 h", "Jusqu'à 15 h", "Jusqu'à 10 h", "Jusqu'à 21 h"],
      answer: 3,
      explanation: "本文：\"Nocturne le jeudi jusqu'à 21 h\"（木曜は21時まで夜間開館）。nocturne =「夜間開館」。",
      translation: { ja: "木曜日は何時まで見学できますか？", en: "Until what time can you visit on Thursdays?" },
      choiceTranslations: { "Jusqu'à 21 h": { ja: "21時まで", en: "Until 9 p.m." }, "Jusqu'à 18 h": { ja: "18時まで", en: "Until 6 p.m." }, "Jusqu'à 15 h": { ja: "15時まで", en: "Until 3 p.m." }, "Jusqu'à 10 h": { ja: "10時まで", en: "Until 10 a.m." } },
      category: "読解"
    },
    {
      id: "f5-q26", vol: 5, part: 7, passageId: "f5-p2", number: 26,
      question: "Combien paie une étudiante de 20 ans un mardi ?",
      choices: ["15 euros", "8 euros", "12 euros", "Rien"],
      answer: 1,
      explanation: "本文：\"Tarif réduit (étudiants, plus de 65 ans) : 8 euros\"。20歳なので18歳未満の無料には当たらず、学生の割引料金8ユーロ。",
      translation: { ja: "20歳の女子学生は火曜日にいくら払いますか？", en: "How much does a 20-year-old student pay on a Tuesday?" },
      choiceTranslations: { "8 euros": { ja: "8ユーロ", en: "8 euros" }, "12 euros": { ja: "12ユーロ", en: "12 euros" }, "Rien": { ja: "無料", en: "Nothing" }, "15 euros": { ja: "15ユーロ", en: "15 euros" } },
      category: "読解"
    },
    {
      id: "f5-q27", vol: 5, part: 7, passageId: "f5-p2", number: 27,
      question: "Qui peut entrer gratuitement tous les jours ?",
      choices: ["Les moins de 18 ans", "Les étudiants", "Les plus de 65 ans", "Tout le monde"],
      answer: 0,
      explanation: "本文：\"Gratuit pour les moins de 18 ans, et pour tous le premier dimanche du mois\"。全員が無料なのは毎月第1日曜だけなので、毎日無料なのは18歳未満。学生と65歳以上は割引料金。",
      translation: { ja: "毎日無料で入れるのは誰ですか？", en: "Who can get in for free every day?" },
      choiceTranslations: { "Les moins de 18 ans": { ja: "18歳未満の人", en: "People under 18" }, "Les étudiants": { ja: "学生", en: "Students" }, "Les plus de 65 ans": { ja: "65歳以上の人", en: "People over 65" }, "Tout le monde": { ja: "誰でも", en: "Everyone" } },
      category: "読解"
    },
    {
      id: "f5-q28", vol: 5, part: 7, passageId: "f5-p2", number: 28,
      question: "Que faut-il faire pour participer à une visite guidée ?",
      choices: ["Être étudiant", "Réserver", "Payer un supplément", "Venir le dimanche"],
      answer: 1,
      explanation: "本文：\"Visites guidées le samedi à 15 h (sans supplément, sur réservation)\"。sur réservation =「要予約」、sans supplément =「追加料金なし」。",
      translation: { ja: "ガイドツアーに参加するには何をしなければなりませんか？", en: "What do you have to do to join a guided tour?" },
      choiceTranslations: { "Réserver": { ja: "予約する", en: "Make a reservation" }, "Payer un supplément": { ja: "追加料金を払う", en: "Pay an extra charge" }, "Venir le dimanche": { ja: "日曜日に来る", en: "Come on Sunday" }, "Être étudiant": { ja: "学生である", en: "Be a student" } },
      category: "読解"
    },
    {
      id: "f5-q29", vol: 5, part: 7, passageId: "f5-p3", number: 29,
      question: "Quel était l'ancien métier de Nathalie ?",
      choices: ["Comptable", "Boulangère", "Informaticienne", "Vendeuse"],
      answer: 0,
      explanation: "本文：\"elle a quitté son poste de comptable pour devenir boulangère\"（経理の仕事を辞めてパン職人に）。パン職人は今の仕事。",
      translation: { ja: "ナタリーの以前の職業は何でしたか？", en: "What was Nathalie's former job?" },
      choiceTranslations: { "Comptable": { ja: "経理担当者", en: "Accountant" }, "Boulangère": { ja: "パン職人", en: "Baker" }, "Informaticienne": { ja: "IT技術者", en: "Computer engineer" }, "Vendeuse": { ja: "販売員", en: "Salesperson" } },
      category: "読解"
    },
    {
      id: "f5-q30", vol: 5, part: 7, passageId: "f5-p3", number: 30,
      question: "Combien de temps a duré sa formation ?",
      choices: ["Vingt ans", "Quatre mois", "Six mois", "Dix mois"],
      answer: 3,
      explanation: "本文：\"Elle a suivi une formation de dix mois\"（10か月の研修）。20年は会社に勤めた期間。",
      translation: { ja: "研修はどのくらいの期間でしたか？", en: "How long did her training last?" },
      choiceTranslations: { "Dix mois": { ja: "10か月", en: "Ten months" }, "Vingt ans": { ja: "20年", en: "Twenty years" }, "Quatre mois": { ja: "4か月", en: "Four months" }, "Six mois": { ja: "6か月", en: "Six months" } },
      category: "読解"
    },
    {
      id: "f5-q31", vol: 5, part: 7, passageId: "f5-p3", number: 31,
      question: "Qu'est-ce qui est vrai à propos de sa vie actuelle ?",
      choices: ["Elle se lève à six heures", "Elle regrette son ancien travail", "Elle gagne moins qu'avant", "Elle travaille cinq jours par semaine"],
      answer: 2,
      explanation: "本文：\"Elle gagne moins d'argent qu'avant, mais elle ne regrette rien\"。働くのは週6日（six jours sur sept）、起きるのは4時。",
      translation: { ja: "今の生活について正しいのはどれですか？", en: "What is true about her life now?" },
      choiceTranslations: { "Elle gagne moins qu'avant": { ja: "以前より収入が少ない", en: "She earns less than before" }, "Elle travaille cinq jours par semaine": { ja: "週5日働いている", en: "She works five days a week" }, "Elle se lève à six heures": { ja: "6時に起きる", en: "She gets up at six" }, "Elle regrette son ancien travail": { ja: "前の仕事を後悔している", en: "She misses her old job" } },
      category: "読解"
    },
    {
      id: "f5-q32", vol: 5, part: 7, passageId: "f5-p3", number: 32,
      question: "Qu'est-ce que Nathalie aime le plus dans son nouveau métier ?",
      choices: ["Se lever tôt", "Gagner beaucoup d'argent", "Travailler seule", "Le contact avec les clients"],
      answer: 3,
      explanation: "本文：\"Ce que j'aime le plus, c'est le contact avec les clients\"（一番好きなのはお客さんとのふれあい）。",
      translation: { ja: "ナタリーが新しい仕事で一番好きなことは何ですか？", en: "What does Nathalie like most about her new job?" },
      choiceTranslations: { "Le contact avec les clients": { ja: "お客さんとのふれあい", en: "The contact with customers" }, "Se lever tôt": { ja: "早起きすること", en: "Getting up early" }, "Gagner beaucoup d'argent": { ja: "たくさん稼ぐこと", en: "Earning a lot of money" }, "Travailler seule": { ja: "一人で働くこと", en: "Working alone" } },
      category: "読解"
    }
  ]
};
