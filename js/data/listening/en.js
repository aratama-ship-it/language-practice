// 英語リスニング Set 1（基礎）。2026-07-11 新規作成。
// type: qa(Part2/3択1問) / conversation(Part3/4択・複数話者) / talk(Part4/4択・単一話者)
LISTEN.toeic.sets[1] = {
  id: 1, label: "Set 1（基礎）",
  passages: [
    // ---- Part2 質問応答 ×6 ----
    {
      id: "l1-p1", type: "qa",
      lines: [{ speaker: "N", text: "Where did you put the quarterly report?" }],
      translation: "四半期報告書はどこに置きましたか？",
      questions: [
        { id: "l1-p1-q1", q: "最も適切な応答を選んでください。",
          choices: ["It's on your desk.", "At three o'clock.", "Yes, I reported it."],
          answer: 0, category: "応答選択" }
      ]
    },
    {
      id: "l1-p2", type: "qa",
      lines: [{ speaker: "N", text: "When does the next train leave?" }],
      translation: "次の電車はいつ出発しますか？",
      questions: [
        { id: "l1-p2-q1", q: "最も適切な応答を選んでください。",
          choices: ["From platform two.", "In about ten minutes.", "It was very crowded."],
          answer: 1, category: "応答選択" }
      ]
    },
    {
      id: "l1-p3", type: "qa",
      lines: [{ speaker: "N", text: "Would you like some coffee or tea?" }],
      translation: "コーヒーか紅茶はいかがですか？",
      questions: [
        { id: "l1-p3-q1", q: "最も適切な応答を選んでください。",
          choices: ["Tea would be nice, thanks.", "I like the coffee shop.", "No, it's not too far."],
          answer: 0, category: "応答選択" }
      ]
    },
    {
      id: "l1-p4", type: "qa",
      lines: [{ speaker: "N", text: "Why is the meeting being postponed?" }],
      translation: "会議はなぜ延期されるのですか？",
      questions: [
        { id: "l1-p4-q1", q: "最も適切な応答を選んでください。",
          choices: ["In the main conference room.", "Because the manager is sick.", "Let's meet at noon."],
          answer: 1, category: "応答選択" }
      ]
    },
    {
      id: "l1-p5", type: "qa",
      lines: [{ speaker: "N", text: "You've already finished the presentation, haven't you?" }],
      translation: "もうプレゼンは終わらせましたよね？",
      questions: [
        { id: "l1-p5-q1", q: "最も適切な応答を選んでください。",
          choices: ["It's a great presentation.", "Not yet, I need one more hour.", "Yes, please present it."],
          answer: 1, category: "応答選択" }
      ]
    },
    {
      id: "l1-p6", type: "qa",
      lines: [{ speaker: "N", text: "How about having lunch together tomorrow?" }],
      translation: "明日一緒にランチはどうですか？",
      questions: [
        { id: "l1-p6-q1", q: "最も適切な応答を選んでください。",
          choices: ["It was delicious.", "Sure, that sounds good.", "About twelve dollars."],
          answer: 1, category: "応答選択" }
      ]
    },
    // ---- Part3 会話 ×2（各3問） ----
    {
      id: "l1-p7", type: "conversation",
      lines: [
        { speaker: "W", text: "Hi, I'd like to return this jacket. It's too small." },
        { speaker: "M", text: "Of course. Do you have the receipt with you?" },
        { speaker: "W", text: "Yes, here it is. Can I exchange it for a larger size instead?" }
      ],
      translation: "女性：このジャケットを返品したいのですが、小さすぎて。／男性：かしこまりました。レシートはお持ちですか？／女性：はい、これです。代わりに大きいサイズに交換できますか？",
      questions: [
        { id: "l1-p7-q1", q: "Why is the woman at the store?",
          choices: ["To buy a new jacket", "To return an item", "To apply for a job", "To pick up a package"],
          answer: 1, category: "目的・概要" },
        { id: "l1-p7-q2", q: "What does the man ask the woman for?",
          choices: ["A credit card", "A receipt", "A membership card", "A phone number"],
          answer: 1, category: "詳細" },
        { id: "l1-p7-q3", q: "What does the woman want to do?",
          choices: ["Get a full refund", "Exchange for a larger size", "Speak to a manager", "Buy a second jacket"],
          answer: 1, category: "次の行動・依頼" }
      ]
    },
    {
      id: "l1-p8", type: "conversation",
      lines: [
        { speaker: "M", text: "Good morning. I have a meeting with Ms. Carter at ten." },
        { speaker: "W", text: "Welcome. She's running a little late. Could you wait in the lobby?" },
        { speaker: "M", text: "No problem. Is there somewhere I can get a coffee?" },
        { speaker: "W", text: "Yes, there's a café just around the corner on the first floor." }
      ],
      translation: "男性：おはようございます。10時にカーターさんと打ち合わせです。／女性：ようこそ。彼女は少し遅れています。ロビーでお待ちいただけますか？／男性：問題ありません。コーヒーを買える場所はありますか？／女性：はい、1階の角にカフェがあります。",
      questions: [
        { id: "l1-p8-q1", q: "Where does this conversation most likely take place?",
          choices: ["At a café", "At an office reception", "At a train station", "At a hotel restaurant"],
          answer: 1, category: "話し手・場面" },
        { id: "l1-p8-q2", q: "What is the problem?",
          choices: ["The man is late", "Ms. Carter is delayed", "The meeting is canceled", "The lobby is closed"],
          answer: 1, category: "詳細" },
        { id: "l1-p8-q3", q: "What does the man ask about?",
          choices: ["Where to park", "Where to get a coffee", "How to find the tenth floor", "When the meeting starts"],
          answer: 1, category: "言い換え・推測" }
      ]
    },
    // ---- Part4 説明文 ×2（各3問） ----
    {
      id: "l1-p9", type: "talk",
      lines: [
        { speaker: "N", text: "Attention passengers. The nine-thirty train to Boston has been delayed by approximately twenty minutes due to a signal problem. We apologize for the inconvenience. Passengers may wait in the heated waiting area on the second floor. Updated departure information will be announced shortly." }
      ],
      translation: "乗客の皆様にお知らせします。9時30分発ボストン行きの電車は、信号の問題により約20分遅れています。ご不便をおかけして申し訳ありません。乗客の方は2階の暖房の効いた待合室でお待ちいただけます。最新の出発情報は間もなくお知らせします。",
      questions: [
        { id: "l1-p9-q1", q: "Where is this announcement being made?",
          choices: ["On an airplane", "At a train station", "In a shopping mall", "At a bus terminal"],
          answer: 1, category: "話し手・場面" },
        { id: "l1-p9-q2", q: "Why is the train delayed?",
          choices: ["Bad weather", "A signal problem", "A staff shortage", "Too many passengers"],
          answer: 1, category: "詳細" },
        { id: "l1-p9-q3", q: "What are passengers encouraged to do?",
          choices: ["Change their tickets", "Wait in the waiting area", "Take a different train", "Contact customer service"],
          answer: 1, category: "次の行動・依頼" }
      ]
    },
    {
      id: "l1-p10", type: "talk",
      lines: [
        { speaker: "N", text: "Hello, this is a message for Mr. Reynolds from Dr. Kim's dental office. We're calling to confirm your appointment scheduled for Thursday, June fifth, at two o'clock in the afternoon. If you need to reschedule, please call us back at 555-0182 before Wednesday. Thank you, and have a great day." }
      ],
      translation: "こんにちは、キム歯科医院からレイノルズ様へのメッセージです。6月5日木曜日の午後2時のご予約を確認するためお電話しました。日程を変更する必要がある場合は、水曜日までに555-0182までお電話ください。ありがとうございます、よい一日を。",
      questions: [
        { id: "l1-p10-q1", q: "What is the purpose of the message?",
          choices: ["To cancel an appointment", "To confirm an appointment", "To offer a discount", "To advertise a clinic"],
          answer: 1, category: "目的・概要" },
        { id: "l1-p10-q2", q: "When is the appointment scheduled?",
          choices: ["Wednesday morning", "Thursday afternoon", "Friday evening", "Monday noon"],
          answer: 1, category: "詳細" },
        { id: "l1-p10-q3", q: "What should Mr. Reynolds do if he wants to reschedule?",
          choices: ["Visit the office in person", "Call back before Wednesday", "Send an email", "Wait for another call"],
          answer: 1, category: "次の行動・依頼" }
      ]
    }
  ]
};
