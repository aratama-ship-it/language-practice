// フランス語リスニング Set 1（基礎）。2026-07-11 新規作成。アクサン正確に。
LISTEN.french.sets[1] = {
  id: 1, label: "Set 1（基礎）",
  passages: [
    // ---- Part2風 質問応答 ×6 ----
    {
      id: "l1-p1", type: "qa",
      lines: [{ speaker: "N", text: "Où est la gare, s'il vous plaît ?" }],
      translation: "すみません、駅はどこですか？",
      questions: [
        { id: "l1-p1-q1", q: "最も適切な応答を選んでください。",
          choices: ["Tout droit, à gauche après la banque.", "À huit heures du matin.", "Oui, j'aime le train."],
          answer: 0, category: "応答選択" }
      ]
    },
    {
      id: "l1-p2", type: "qa",
      lines: [{ speaker: "N", text: "À quelle heure ouvre le magasin ?" }],
      translation: "お店は何時に開きますか？",
      questions: [
        { id: "l1-p2-q1", q: "最も適切な応答を選んでください。",
          choices: ["Dans la rue principale.", "À neuf heures.", "C'est très cher."],
          answer: 1, category: "応答選択" }
      ]
    },
    {
      id: "l1-p3", type: "qa",
      lines: [{ speaker: "N", text: "Vous voulez un café ou un thé ?" }],
      translation: "コーヒーか紅茶はいかがですか？",
      questions: [
        { id: "l1-p3-q1", q: "最も適切な応答を選んでください。",
          choices: ["Un café, merci.", "Il fait beau aujourd'hui.", "Non, ce n'est pas loin."],
          answer: 0, category: "応答選択" }
      ]
    },
    {
      id: "l1-p4", type: "qa",
      lines: [{ speaker: "N", text: "Pourquoi es-tu en retard ?" }],
      translation: "どうして遅れたの？",
      questions: [
        { id: "l1-p4-q1", q: "最も適切な応答を選んでください。",
          choices: ["Dans le bureau.", "Parce que j'ai raté le bus.", "À demain !"],
          answer: 1, category: "応答選択" }
      ]
    },
    {
      id: "l1-p5", type: "qa",
      lines: [{ speaker: "N", text: "Tu as déjà fini tes devoirs, n'est-ce pas ?" }],
      translation: "もう宿題は終わらせたよね？",
      questions: [
        { id: "l1-p5-q1", q: "最も適切な応答を選んでください。",
          choices: ["Les devoirs sont difficiles.", "Pas encore, il me faut une heure.", "Oui, fais tes devoirs."],
          answer: 1, category: "応答選択" }
      ]
    },
    {
      id: "l1-p6", type: "qa",
      lines: [{ speaker: "N", text: "On déjeune ensemble demain ?" }],
      translation: "明日一緒にお昼を食べる？",
      questions: [
        { id: "l1-p6-q1", q: "最も適切な応答を選んでください。",
          choices: ["C'était délicieux.", "Oui, avec plaisir.", "Environ douze euros."],
          answer: 1, category: "応答選択" }
      ]
    },
    // ---- Part3風 会話 ×2（各3問） ----
    {
      id: "l1-p7", type: "conversation",
      lines: [
        { speaker: "W", text: "Bonjour, je voudrais retourner cette veste. Elle est trop petite." },
        { speaker: "M", text: "Bien sûr. Vous avez le ticket de caisse ?" },
        { speaker: "W", text: "Oui, le voici. Je peux l'échanger contre une taille plus grande ?" }
      ],
      translation: "女性：こんにちは、このジャケットを返品したいのですが。小さすぎて。／男性：かしこまりました。レシートはお持ちですか？／女性：はい、これです。大きいサイズに交換できますか？",
      questions: [
        { id: "l1-p7-q1", q: "Pourquoi la femme est-elle au magasin ?",
          choices: ["Pour acheter une veste", "Pour retourner un article", "Pour chercher un emploi", "Pour payer une facture"],
          answer: 1, category: "目的・概要" },
        { id: "l1-p7-q2", q: "Que demande l'homme ?",
          choices: ["Une carte de crédit", "Le ticket de caisse", "Une pièce d'identité", "Un numéro de téléphone"],
          answer: 1, category: "詳細" },
        { id: "l1-p7-q3", q: "Que veut faire la femme ?",
          choices: ["Se faire rembourser", "Échanger contre une taille plus grande", "Parler au responsable", "Acheter une deuxième veste"],
          answer: 1, category: "次の行動・依頼" }
      ]
    },
    {
      id: "l1-p8", type: "conversation",
      lines: [
        { speaker: "M", text: "Bonjour, j'ai rendez-vous avec Madame Leroy à dix heures." },
        { speaker: "W", text: "Bienvenue. Elle est un peu en retard. Pouvez-vous patienter dans le hall ?" },
        { speaker: "M", text: "Pas de problème. Il y a un endroit pour prendre un café ?" },
        { speaker: "W", text: "Oui, il y a un café au coin, au rez-de-chaussée." }
      ],
      translation: "男性：こんにちは、10時にルロワさんと約束があります。／女性：ようこそ。彼女は少し遅れています。ホールでお待ちいただけますか？／男性：問題ありません。コーヒーを飲める場所はありますか？／女性：はい、1階の角にカフェがあります。",
      questions: [
        { id: "l1-p8-q1", q: "Où se passe probablement cette conversation ?",
          choices: ["Dans un café", "À l'accueil d'un bureau", "À la gare", "Dans un restaurant"],
          answer: 1, category: "話し手・場面" },
        { id: "l1-p8-q2", q: "Quel est le problème ?",
          choices: ["L'homme est en retard", "Madame Leroy est en retard", "Le rendez-vous est annulé", "Le hall est fermé"],
          answer: 1, category: "詳細" },
        { id: "l1-p8-q3", q: "Que demande l'homme ?",
          choices: ["Où se garer", "Où prendre un café", "Comment trouver le dixième étage", "Quand commence la réunion"],
          answer: 1, category: "言い換え・推測" }
      ]
    },
    // ---- Part4風 説明文 ×2（各3問） ----
    {
      id: "l1-p9", type: "talk",
      lines: [
        { speaker: "N", text: "Mesdames et messieurs, votre attention s'il vous plaît. Le train de neuf heures trente à destination de Lyon a un retard d'environ vingt minutes en raison d'un problème technique. Nous vous prions de nous excuser. Les voyageurs peuvent attendre dans la salle d'attente chauffée au premier étage. De nouvelles informations seront annoncées bientôt." }
      ],
      translation: "皆様、ご注目ください。9時30分発リヨン行きの電車は、技術的な問題により約20分遅れています。お詫び申し上げます。乗客の方は1階（※日本の2階に相当）の暖房の効いた待合室でお待ちいただけます。新しい情報は間もなくお知らせします。",
      questions: [
        { id: "l1-p9-q1", q: "Où cette annonce est-elle faite ?",
          choices: ["Dans un avion", "À la gare", "Dans un centre commercial", "À l'aéroport"],
          answer: 1, category: "話し手・場面" },
        { id: "l1-p9-q2", q: "Pourquoi le train est-il en retard ?",
          choices: ["À cause du mauvais temps", "À cause d'un problème technique", "Par manque de personnel", "Trop de voyageurs"],
          answer: 1, category: "詳細" },
        { id: "l1-p9-q3", q: "Que peuvent faire les voyageurs ?",
          choices: ["Changer de billet", "Attendre dans la salle d'attente", "Prendre un autre train", "Appeler le service client"],
          answer: 1, category: "次の行動・依頼" }
      ]
    },
    {
      id: "l1-p10", type: "talk",
      lines: [
        { speaker: "N", text: "Bonjour, ceci est un message pour Monsieur Bernard de la part du cabinet du docteur Martin. Nous appelons pour confirmer votre rendez-vous prévu jeudi cinq juin à quatorze heures. Si vous devez le reporter, merci de nous rappeler au zéro un, quarante-cinq, soixante-sept, avant mercredi. Bonne journée." }
      ],
      translation: "こんにちは、マルタン医師の診療所からベルナール様へのメッセージです。6月5日木曜日14時のご予約を確認するためお電話しました。変更が必要な場合は、水曜日までに01-45-67までお電話ください。よい一日を。",
      questions: [
        { id: "l1-p10-q1", q: "Quel est le but du message ?",
          choices: ["Annuler un rendez-vous", "Confirmer un rendez-vous", "Proposer une réduction", "Faire de la publicité"],
          answer: 1, category: "目的・概要" },
        { id: "l1-p10-q2", q: "Quand est prévu le rendez-vous ?",
          choices: ["Mercredi matin", "Jeudi après-midi", "Vendredi soir", "Lundi midi"],
          answer: 1, category: "詳細" },
        { id: "l1-p10-q3", q: "Que doit faire Monsieur Bernard pour reporter ?",
          choices: ["Venir au cabinet", "Rappeler avant mercredi", "Envoyer un courriel", "Attendre un autre appel"],
          answer: 1, category: "次の行動・依頼" }
      ]
    }
  ]
};
