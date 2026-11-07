// Vol.F7 冠詞・前置詞（フランス語・仏検4級〜3級：縮約・国名の前置詞・部分冠詞・数量表現・場所と時の前置詞）。2026-11-07 新規作成。
// 各問の translation（fr＝空欄を埋めた正解文）と choiceTranslations（選択肢の文字列がキー）は結果詳細で表示する。
SUBJECTS.french.vols[7] = {
  label: "Vol.F7 冠詞・前置詞（小さな語の総まとめ）",
  passages: [
    {
      id: "f7-p1", vol: 7, part: 6,
      title: "第21〜24問：次のお知らせを読んでください。",
      body: "Chers clients,\n\nNotre magasin ---[Q21]--- fermé le dimanche 12 mai ---[Q22]--- inventaire.\n\nNous serons heureux de vous accueillir à nouveau ---[Q23]--- le lundi 13 mai, à 9 heures.\n\nPour toute commande urgente, vous pouvez nous écrire ---[Q24]--- l'adresse suivante : contact@epicerie-dupont.fr\n\nMerci de votre fidélité.\nL'équipe de l'Épicerie Dupont",
      translation: { ja: "お客様各位\n\n当店は5月12日（日）、棚卸しのため休業いたします。\n\n5月13日（月）9時より、またのご来店をお待ちしております。\n\nお急ぎのご注文は、次のアドレスまでメールでご連絡ください：contact@epicerie-dupont.fr\n\nいつもご愛顧いただきありがとうございます。\nデュポン食料品店 スタッフ一同", en: "Dear customers,\n\nOur store will be closed on Sunday, May 12 for inventory.\n\nWe will be happy to welcome you again from Monday, May 13, at 9 a.m.\n\nFor any urgent order, you can write to us at the following address: contact@epicerie-dupont.fr\n\nThank you for your loyalty.\nThe Épicerie Dupont team" }
    },
    {
      id: "f7-p2", vol: 7, part: 7,
      title: "第25〜28問：次の案内を読んでください。",
      body: "HÔTEL DES ALPES ★★★\n\nChambre simple : 85 euros la nuit\nChambre double : 110 euros la nuit\nPetit-déjeuner : 12 euros par personne (servi de 7 h à 10 h)\n\nArrivée à partir de 15 h, départ avant 11 h\nParking gratuit pour les clients\nWi-Fi gratuit dans tout l'hôtel\nAnimaux acceptés (supplément de 10 euros par nuit)\n\nÀ 5 minutes à pied de la gare et à 20 minutes en bus des pistes de ski.",
      translation: { ja: "オテル・デ・ザルプ ★★★\n\nシングルルーム：1泊85ユーロ\nダブルルーム：1泊110ユーロ\n朝食：1人12ユーロ（7時〜10時）\n\nチェックインは15時から、チェックアウトは11時まで\n宿泊者は駐車場無料\n館内全域で Wi-Fi 無料\nペット可（1泊10ユーロの追加料金）\n\n駅から徒歩5分、スキー場までバスで20分。", en: "HÔTEL DES ALPES ★★★\n\nSingle room: 85 euros per night\nDouble room: 110 euros per night\nBreakfast: 12 euros per person (served from 7 to 10 a.m.)\n\nCheck-in from 3 p.m., check-out before 11 a.m.\nFree parking for guests\nFree Wi-Fi throughout the hotel\nPets welcome (extra charge of 10 euros per night)\n\n5 minutes' walk from the station and 20 minutes by bus from the ski slopes." }
    },
    {
      id: "f7-p3", vol: 7, part: 7,
      title: "第29〜32問：次の文章を読んでください。",
      body: "Depuis deux ans, Madame Leblanc, soixante-dix-huit ans, va à la bibliothèque de son quartier tous les mardis après-midi. Elle y suit un atelier gratuit pour apprendre à utiliser un smartphone.\n\n« Au début, j'avais peur de faire des erreurs », raconte-t-elle. Maintenant, elle envoie des photos à ses petits-enfants, qui habitent au Canada, et elle les appelle en vidéo chaque dimanche.\n\nL'atelier est animé par des lycéens bénévoles. Pour eux aussi, c'est une belle expérience : ils apprennent à expliquer avec patience.",
      translation: { ja: "2年前から、78歳のルブランさんは毎週火曜日の午後、地元の図書館に通っている。そこでスマートフォンの使い方を学ぶ無料の講座を受けているのだ。\n\n「最初は間違えるのが怖かったんです」と彼女は話す。今ではカナダに住む孫たちに写真を送り、毎週日曜日にはビデオ通話をしている。\n\n講座を進めるのはボランティアの高校生たちだ。彼らにとってもよい経験になっている。辛抱強く説明することを学べるからだ。", en: "For two years, Mrs. Leblanc, aged seventy-eight, has been going to her local library every Tuesday afternoon. There, she attends a free workshop to learn how to use a smartphone.\n\n\"At first, I was afraid of making mistakes,\" she says. Now she sends photos to her grandchildren, who live in Canada, and video-calls them every Sunday.\n\nThe workshop is run by high school volunteers. It's a great experience for them too: they learn to explain things patiently." }
    }
  ],
  questions: [
    {
      id: "f7-q1", vol: 7, part: 5, passageId: null, number: 1,
      question: "Je vais ------- marché tous les samedis.",
      choices: ["en", "au", "à la", "aux"],
      answer: 1,
      explanation: "à + le は必ず縮約して au。marché は男性単数なので au marché（市場へ）。",
      translation: { fr: "Je vais au marché tous les samedis.", ja: "毎週土曜日に市場へ行く。", en: "I go to the market every Saturday." },
      category: "前置詞"
    },
    {
      id: "f7-q2", vol: 7, part: 5, passageId: null, number: 2,
      question: "Elle revient ------- États-Unis la semaine prochaine.",
      choices: ["d'", "des", "de", "du"],
      answer: 1,
      explanation: "「〜から」の de + les は縮約して des。les États-Unis（複数）→ des États-Unis。男性単数の国なら du Japon、女性単数の国なら de France。",
      translation: { fr: "Elle revient des États-Unis la semaine prochaine.", ja: "彼女は来週アメリカから帰ってくる。", en: "She's coming back from the United States next week." },
      category: "前置詞"
    },
    {
      id: "f7-q3", vol: 7, part: 5, passageId: null, number: 3,
      question: "Il habite ------- France depuis dix ans.",
      choices: ["au", "à", "dans", "en"],
      answer: 3,
      explanation: "女性名詞の国（la France）に「住む・行く」は en（冠詞は付けない）。男性名詞の国は au（au Japon）。",
      translation: { fr: "Il habite en France depuis dix ans.", ja: "彼は10年前からフランスに住んでいる。", en: "He has been living in France for ten years." },
      category: "前置詞"
    },
    {
      id: "f7-q4", vol: 7, part: 5, passageId: null, number: 4,
      question: "Nous allons ------- Portugal cet été.",
      choices: ["au", "en", "aux", "à"],
      answer: 0,
      explanation: "le Portugal は男性名詞の国なので au。-e で終わらない国名はたいてい男性名詞（le Japon, le Canada, le Portugal）。",
      translation: { fr: "Nous allons au Portugal cet été.", ja: "私たちはこの夏ポルトガルへ行く。", en: "We're going to Portugal this summer." },
      category: "前置詞"
    },
    {
      id: "f7-q5", vol: 7, part: 5, passageId: null, number: 5,
      question: "J'aime beaucoup ------- chocolat.",
      choices: ["de", "un", "le", "du"],
      answer: 2,
      explanation: "aimer・adorer・détester など好き嫌いの動詞の後では、「〜というもの全般」を表す定冠詞を使う。J'aime le chocolat。du（部分冠詞）は「いくらかの量」を食べる・買うときに使う。",
      translation: { fr: "J'aime beaucoup le chocolat.", ja: "チョコレートが大好きだ。", en: "I really love chocolate." },
      category: "冠詞・限定詞"
    },
    {
      id: "f7-q6", vol: 7, part: 5, passageId: null, number: 6,
      question: "Tu veux ------- eau ?",
      choices: ["du", "de la", "des", "de l'"],
      answer: 3,
      explanation: "数えられない量を表す部分冠詞。eau は女性名詞で母音で始まるので de la ではなく de l'。",
      translation: { fr: "Tu veux de l'eau ?", ja: "お水いる？", en: "Do you want some water?" },
      category: "冠詞・限定詞"
    },
    {
      id: "f7-q7", vol: 7, part: 5, passageId: null, number: 7,
      question: "Il n'y a plus ------- lait dans le frigo.",
      choices: ["des", "de", "du", "le"],
      answer: 1,
      explanation: "否定（ne ... plus も含む）の文では、部分冠詞 du は de になる。Il n'y a plus de lait =「もう牛乳がない」。",
      translation: { fr: "Il n'y a plus de lait dans le frigo.", ja: "冷蔵庫にもう牛乳がない。", en: "There's no more milk in the fridge." },
      category: "冠詞・限定詞"
    },
    {
      id: "f7-q8", vol: 7, part: 5, passageId: null, number: 8,
      question: "J'ai ------- chat et deux chiens.",
      choices: ["des", "du", "un", "une"],
      answer: 2,
      explanation: "chat は男性名詞で、1匹と数えられるので不定冠詞 un。des は複数、du は数えられない量に使う。",
      translation: { fr: "J'ai un chat et deux chiens.", ja: "猫を1匹と犬を2匹飼っている。", en: "I have a cat and two dogs." },
      category: "冠詞・限定詞"
    },
    {
      id: "f7-q9", vol: 7, part: 5, passageId: null, number: 9,
      question: "Combien ------- frères as-tu ?",
      choices: ["de", "des", "les", "du"],
      answer: 0,
      explanation: "combien de + 無冠詞名詞 =「いくつの〜」。Combien de frères ?（何人の兄弟）。",
      translation: { fr: "Combien de frères as-tu ?", ja: "兄弟は何人いるの？", en: "How many brothers do you have?" },
      category: "冠詞・限定詞"
    },
    {
      id: "f7-q10", vol: 7, part: 5, passageId: null, number: 10,
      question: "J'ai assez ------- temps pour finir.",
      choices: ["de", "du", "le", "des"],
      answer: 0,
      explanation: "数量の副詞 assez（十分に）・beaucoup・trop・peu の後は de + 無冠詞名詞。assez de temps =「十分な時間」。",
      translation: { fr: "J'ai assez de temps pour finir.", ja: "終わらせるのに十分な時間がある。", en: "I have enough time to finish." },
      category: "冠詞・限定詞"
    },
    {
      id: "f7-q11", vol: 7, part: 5, passageId: null, number: 11,
      question: "Le musée est fermé ------- lundi.",
      choices: ["en", "du", "le", "au"],
      answer: 2,
      explanation: "曜日に定冠詞 le を付けると「毎週〜曜日に」。fermé le lundi =「毎週月曜日は休み」。冠詞なしの lundi なら「今度の月曜日」。",
      translation: { fr: "Le musée est fermé le lundi.", ja: "美術館は毎週月曜日が休みだ。", en: "The museum is closed on Mondays." },
      category: "冠詞・限定詞"
    },
    {
      id: "f7-q12", vol: 7, part: 5, passageId: null, number: 12,
      question: "Je suis ------- Tokyo pour le travail.",
      choices: ["dans", "à", "en", "au"],
      answer: 1,
      explanation: "都市名の前は à（à Tokyo, à Paris）。国名のように en / au を使い分けることはない。",
      translation: { fr: "Je suis à Tokyo pour le travail.", ja: "仕事で東京にいる。", en: "I'm in Tokyo for work." },
      category: "前置詞"
    },
    {
      id: "f7-q13", vol: 7, part: 5, passageId: null, number: 13,
      question: "Nous partons ------- train.",
      choices: ["à", "sur", "dans", "en"],
      answer: 3,
      explanation: "乗り物で「〜で行く」は、中に乗り込むもの（train, voiture, bus, avion）は en。またがって乗るもの（vélo, moto）や徒歩は à（à vélo, à pied）。",
      translation: { fr: "Nous partons en train.", ja: "私たちは電車で出発する。", en: "We're leaving by train." },
      category: "前置詞"
    },
    {
      id: "f7-q14", vol: 7, part: 5, passageId: null, number: 14,
      question: "Je travaille ici ------- 2020.",
      choices: ["pendant", "en", "depuis", "il y a"],
      answer: 2,
      explanation: "現在も続いている状態の起点「〜から」は depuis。動詞が現在形なので、過去の一点を表す en 2020 とは合わない。",
      translation: { fr: "Je travaille ici depuis 2020.", ja: "2020年からここで働いている。", en: "I've been working here since 2020." },
      category: "前置詞"
    },
    {
      id: "f7-q15", vol: 7, part: 5, passageId: null, number: 15,
      question: "Le bureau est ------- la poste et la banque.",
      choices: ["parmi", "chez", "sous", "entre"],
      answer: 3,
      explanation: "2つのものの「間に」は entre A et B。parmi は3つ以上の「中に」。",
      translation: { fr: "Le bureau est entre la poste et la banque.", ja: "事務所は郵便局と銀行の間にある。", en: "The office is between the post office and the bank." },
      category: "前置詞"
    },
    {
      id: "f7-q16", vol: 7, part: 5, passageId: null, number: 16,
      question: "Je vais ------- le dentiste demain.",
      choices: ["en", "chez", "dans", "sur"],
      answer: 1,
      explanation: "人のところ（家・店・診療所）へ行くときは chez + 人。chez le dentiste =「歯医者に」。",
      translation: { fr: "Je vais chez le dentiste demain.", ja: "明日、歯医者に行く。", en: "I'm going to the dentist tomorrow." },
      category: "前置詞"
    },
    {
      id: "f7-q17", vol: 7, part: 5, passageId: null, number: 17,
      question: "C'est le livre ------- Pierre.",
      choices: ["de", "du", "des", "à la"],
      answer: 0,
      explanation: "所有「〜の」は de + 名詞。人名には冠詞が付かないので縮約せず de Pierre。",
      translation: { fr: "C'est le livre de Pierre.", ja: "これはピエールの本だ。", en: "This is Pierre's book." },
      category: "前置詞"
    },
    {
      id: "f7-q18", vol: 7, part: 5, passageId: null, number: 18,
      question: "Elle est partie ------- dire au revoir.",
      choices: ["après", "sans", "avant", "contre"],
      answer: 1,
      explanation: "sans + 不定詞 =「〜せずに」。avant は avant de + 不定詞、après は après avoir + 過去分詞の形になるので、ここには入らない。",
      translation: { fr: "Elle est partie sans dire au revoir.", ja: "彼女はさよならも言わずに出て行った。", en: "She left without saying goodbye." },
      category: "前置詞"
    },
    {
      id: "f7-q19", vol: 7, part: 5, passageId: null, number: 19,
      question: "Le chat dort ------- le lit.",
      choices: ["sous", "entre", "parmi", "chez"],
      answer: 0,
      explanation: "「〜の下に」は sous（反対は sur「〜の上に」）。entre は2つの間、parmi は複数の中、chez は人の家なので、le lit 1つにはつかない。",
      translation: { fr: "Le chat dort sous le lit.", ja: "猫はベッドの下で寝ている。", en: "The cat is sleeping under the bed." },
      category: "前置詞"
    },
    {
      id: "f7-q20", vol: 7, part: 5, passageId: null, number: 20,
      question: "Il est arrivé ------- retard à la réunion.",
      choices: ["de", "au", "dans", "en"],
      answer: 3,
      explanation: "être / arriver en retard =「遅れている・遅れて着く」の決まった言い方。反対は en avance（早めに）。",
      translation: { fr: "Il est arrivé en retard à la réunion.", ja: "彼は会議に遅れて着いた。", en: "He arrived late to the meeting." },
      category: "前置詞"
    },
    {
      id: "f7-q21", vol: 7, part: 6, passageId: "f7-p1", number: 21,
      question: "---[Q21]--- に入るものを選んでください。",
      choices: ["seront", "été", "sera", "serons"],
      answer: 2,
      explanation: "主語 Notre magasin（三人称単数）に合わせた être の単純未来 sera。sera fermé =「休業する（休業となる）」。",
      translation: { fr: "Notre magasin sera fermé le dimanche 12 mai pour inventaire.", ja: "当店は5月12日（日）、棚卸しのため休業いたします。", en: "Our store will be closed on Sunday, May 12 for inventory." },
      category: "動詞の活用"
    },
    {
      id: "f7-q22", vol: 7, part: 6, passageId: "f7-p1", number: 22,
      question: "---[Q22]--- に入るものを選んでください。",
      choices: ["par", "de", "à", "pour"],
      answer: 3,
      explanation: "理由・目的を表す pour。fermé pour inventaire（棚卸しのため休業）、fermé pour travaux（工事のため休業）は掲示の決まった言い方。",
      translation: { fr: "Notre magasin sera fermé le dimanche 12 mai pour inventaire.", ja: "当店は5月12日（日）、棚卸しのため休業いたします。", en: "Our store will be closed on Sunday, May 12 for inventory." },
      category: "前置詞"
    },
    {
      id: "f7-q23", vol: 7, part: 6, passageId: "f7-p1", number: 23,
      question: "---[Q23]--- に入るものを選んでください。",
      choices: ["pendant", "il y a", "dès", "depuis"],
      answer: 2,
      explanation: "dès + 時点 =「〜からすぐに」（未来の起点）。depuis は過去から今まで続く起点なので、未来の serons とは合わない。",
      translation: { fr: "Nous serons heureux de vous accueillir à nouveau dès le lundi 13 mai, à 9 heures.", ja: "5月13日（月）9時より、またのご来店をお待ちしております。", en: "We will be happy to welcome you again from Monday, May 13, at 9 a.m." },
      category: "前置詞"
    },
    {
      id: "f7-q24", vol: 7, part: 6, passageId: "f7-p1", number: 24,
      question: "---[Q24]--- に入るものを選んでください。",
      choices: ["à", "en", "sur", "chez"],
      answer: 0,
      explanation: "écrire à 〜 =「〜宛てに書く」。宛先（l'adresse suivante）の前は à。",
      translation: { fr: "Vous pouvez nous écrire à l'adresse suivante : contact@epicerie-dupont.fr", ja: "次のアドレスまでメールでご連絡ください：contact@epicerie-dupont.fr", en: "You can write to us at the following address: contact@epicerie-dupont.fr" },
      category: "前置詞"
    },
    {
      id: "f7-q25", vol: 7, part: 7, passageId: "f7-p2", number: 25,
      question: "Combien coûte une nuit en chambre double, sans petit-déjeuner ?",
      choices: ["12 euros", "110 euros", "85 euros", "122 euros"],
      answer: 1,
      explanation: "本文：\"Chambre double : 110 euros la nuit\"。朝食（12ユーロ）は別料金なので、朝食なしなら110ユーロ。",
      translation: { ja: "ダブルルームに朝食なしで1泊するといくらですか？", en: "How much is one night in a double room, without breakfast?" },
      choiceTranslations: { "110 euros": { ja: "110ユーロ", en: "110 euros" }, "85 euros": { ja: "85ユーロ", en: "85 euros" }, "122 euros": { ja: "122ユーロ", en: "122 euros" }, "12 euros": { ja: "12ユーロ", en: "12 euros" } },
      category: "読解"
    },
    {
      id: "f7-q26", vol: 7, part: 7, passageId: "f7-p2", number: 26,
      question: "À partir de quelle heure peut-on entrer dans sa chambre ?",
      choices: ["15 h", "11 h", "7 h", "10 h"],
      answer: 0,
      explanation: "本文：\"Arrivée à partir de 15 h\"（チェックインは15時から）。11時はチェックアウトの時刻。",
      translation: { ja: "何時から部屋に入れますか？", en: "From what time can you get into your room?" },
      choiceTranslations: { "15 h": { ja: "15時", en: "3 p.m." }, "11 h": { ja: "11時", en: "11 a.m." }, "7 h": { ja: "7時", en: "7 a.m." }, "10 h": { ja: "10時", en: "10 a.m." } },
      category: "読解"
    },
    {
      id: "f7-q27", vol: 7, part: 7, passageId: "f7-p2", number: 27,
      question: "Qu'est-ce qui est payant ?",
      choices: ["Arriver après 15 h", "Venir avec un animal", "Le parking", "Le Wi-Fi"],
      answer: 1,
      explanation: "本文：\"Animaux acceptés (supplément de 10 euros par nuit)\"。駐車場と Wi-Fi は gratuit（無料）。",
      translation: { ja: "有料のものはどれですか？", en: "What do you have to pay for?" },
      choiceTranslations: { "Venir avec un animal": { ja: "ペットを連れてくること", en: "Bringing a pet" }, "Le parking": { ja: "駐車場", en: "Parking" }, "Le Wi-Fi": { ja: "Wi-Fi", en: "Wi-Fi" }, "Arriver après 15 h": { ja: "15時以降に到着すること", en: "Arriving after 3 p.m." } },
      category: "読解"
    },
    {
      id: "f7-q28", vol: 7, part: 7, passageId: "f7-p2", number: 28,
      question: "Comment peut-on aller aux pistes de ski ?",
      choices: ["En train", "En téléphérique", "En bus", "À pied"],
      answer: 2,
      explanation: "本文：\"à 20 minutes en bus des pistes de ski\"（スキー場までバスで20分）。徒歩5分なのは駅。",
      translation: { ja: "スキー場へはどうやって行けますか？", en: "How can you get to the ski slopes?" },
      choiceTranslations: { "En bus": { ja: "バスで", en: "By bus" }, "À pied": { ja: "歩いて", en: "On foot" }, "En train": { ja: "電車で", en: "By train" }, "En téléphérique": { ja: "ロープウェーで", en: "By cable car" } },
      category: "読解"
    },
    {
      id: "f7-q29", vol: 7, part: 7, passageId: "f7-p3", number: 29,
      question: "Quand Madame Leblanc va-t-elle à l'atelier ?",
      choices: ["Le dimanche", "Tous les matins", "Le mardi matin", "Le mardi après-midi"],
      answer: 3,
      explanation: "本文：\"tous les mardis après-midi\"（毎週火曜日の午後）。日曜日は孫とビデオ通話をする日。",
      translation: { ja: "ルブランさんはいつ講座に行きますか？", en: "When does Mrs. Leblanc go to the workshop?" },
      choiceTranslations: { "Le mardi après-midi": { ja: "火曜日の午後", en: "On Tuesday afternoons" }, "Le dimanche": { ja: "日曜日", en: "On Sundays" }, "Tous les matins": { ja: "毎朝", en: "Every morning" }, "Le mardi matin": { ja: "火曜日の午前", en: "On Tuesday mornings" } },
      category: "読解"
    },
    {
      id: "f7-q30", vol: 7, part: 7, passageId: "f7-p3", number: 30,
      question: "Combien coûte l'atelier ?",
      choices: ["5 euros par mois", "Ses petits-enfants le paient", "Rien, il est gratuit", "10 euros"],
      answer: 2,
      explanation: "本文：\"un atelier gratuit\"（無料の講座）。",
      translation: { ja: "講座の料金はいくらですか？", en: "How much does the workshop cost?" },
      choiceTranslations: { "Rien, il est gratuit": { ja: "無料", en: "Nothing, it's free" }, "10 euros": { ja: "10ユーロ", en: "10 euros" }, "5 euros par mois": { ja: "月5ユーロ", en: "5 euros a month" }, "Ses petits-enfants le paient": { ja: "孫たちが払っている", en: "Her grandchildren pay for it" } },
      category: "読解"
    },
    {
      id: "f7-q31", vol: 7, part: 7, passageId: "f7-p3", number: 31,
      question: "Que fait-elle chaque dimanche ?",
      choices: ["Elle appelle ses petits-enfants en vidéo", "Elle va au Canada", "Elle va à la bibliothèque", "Elle prend des photos de son quartier"],
      answer: 0,
      explanation: "本文：\"elle les appelle en vidéo chaque dimanche\"（毎週日曜日にビデオ通話をする）。les = ses petits-enfants。",
      translation: { ja: "彼女は毎週日曜日に何をしますか？", en: "What does she do every Sunday?" },
      choiceTranslations: { "Elle appelle ses petits-enfants en vidéo": { ja: "孫たちとビデオ通話をする", en: "She video-calls her grandchildren" }, "Elle va au Canada": { ja: "カナダへ行く", en: "She goes to Canada" }, "Elle va à la bibliothèque": { ja: "図書館へ行く", en: "She goes to the library" }, "Elle prend des photos de son quartier": { ja: "近所の写真を撮る", en: "She takes photos of her neighborhood" } },
      category: "読解"
    },
    {
      id: "f7-q32", vol: 7, part: 7, passageId: "f7-p3", number: 32,
      question: "Qui anime l'atelier ?",
      choices: ["Des bibliothécaires", "Ses petits-enfants", "Un professeur d'informatique", "Des lycéens bénévoles"],
      answer: 3,
      explanation: "本文：\"L'atelier est animé par des lycéens bénévoles\"（ボランティアの高校生が進める）。lycéen =「高校生」。",
      translation: { ja: "講座を進めているのは誰ですか？", en: "Who runs the workshop?" },
      choiceTranslations: { "Des lycéens bénévoles": { ja: "ボランティアの高校生", en: "High school volunteers" }, "Des bibliothécaires": { ja: "図書館員", en: "Librarians" }, "Ses petits-enfants": { ja: "彼女の孫たち", en: "Her grandchildren" }, "Un professeur d'informatique": { ja: "情報科の先生", en: "A computer science teacher" } },
      category: "読解"
    }
  ]
};
