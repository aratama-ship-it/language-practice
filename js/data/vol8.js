// Vol.8 Part 5・6 特訓。2026-08-08 新規作成。
// 第431回（Total 790 / R375）の結果で Part 5=67%・Part 6=63% が最も低かったため、
// 読解（Part 7）を一切入れず、文法・語法・語彙の精度と、文脈をつなぐ判断に絞っている。
// Part 6 は3パッセージとも文挿入問題を1問ずつ含む（Part 6固有で最も差がつくため）。
SUBJECTS.toeic.vols[8] = {
  label: "Vol.8 Part 5・6 特訓（弱点集中）",
  halfLabels: { grammar: "Part 5", reading: "Part 6" },  // ボタン側で「 20問」が自動で付く
  passages: [
    {
      id: "v8-p1", vol: 8, part: 6,
      title: "Questions 21-24 refer to the following memo.",
      body: "To: All Staff\nFrom: Finance Department\nSubject: New Expense Reporting Platform\n\nBeginning on 1 October, all travel and entertainment expenses must be submitted through Ledgerly, our new online reporting platform. Paper forms received after that date will be returned without ---[Q21]---.\n\nThe change is intended to shorten reimbursement times, which currently average three weeks. ---[Q22]--- staff who submit complete documentation should expect payment within five business days.\n\nEvery employee must complete a short online tutorial before the system goes live. ---[Q23]--- Anyone who has not finished it by 25 September will be unable to log in.\n\nWe ---[Q24]--- your patience during the transition. Questions may be directed to the Finance Department at extension 4120."
    },
    {
      id: "v8-p2", vol: 8, part: 6,
      title: "Questions 25-28 refer to the following notice.",
      body: "NOTICE TO CUSTOMERS\n\nHarbourview Stationery will relocate to 42 Kingsley Road on 15 November. Our current shop on Meade Street will close at 6:00 P.M. on 12 November so that our staff can prepare the new premises.\n\nThe new location offers nearly twice the floor space of our present shop, ---[Q25]--- us to expand our range of imported paper and bookbinding supplies. Parking is available directly behind the building.\n\nOrders placed online during the move will still be dispatched on schedule. ---[Q26]---, customers who have arranged in-store collection will be contacted individually to confirm a new pickup date.\n\n---[Q27]---\n\nWe thank you for your continued ---[Q28]--- and look forward to welcoming you to Kingsley Road."
    },
    {
      id: "v8-p3", vol: 8, part: 6,
      title: "Questions 29-32 refer to the following e-mail.",
      body: "From: Dana Whitfield, Facilities Manager\nTo: All Building Occupants\nSubject: Elevator Modernization — Revised Timeline\n\nThe elevator modernization originally scheduled to begin in January has been moved forward to 4 December. The contractor was able to secure the required components ---[Q29]--- than expected.\n\nDuring the work, the north elevator will be out of service for approximately six weeks. The south elevator will operate normally, though ---[Q30]--- during peak hours should be anticipated.\n\n---[Q31]--- Occupants on floors above the tenth may wish to allow extra time in the morning.\n\nWe regret any inconvenience and will post weekly progress updates in the lobby. By the end of January, the north elevator ---[Q32]--- back into service."
    }
  ],
  questions: [
    // ---- Part 5: 語彙（意味で選ぶ。4択とも文法的には成立させてある） ----
    {
      id: "v8-q1", vol: 8, part: 5, passageId: null, number: 1,
      question: "Because the supplier repeatedly failed to meet the agreed deadlines, the manufacturer decided to ------- the contract.",
      choices: ["expire", "withdraw", "terminate", "conclude"],
      answer: 2,
      explanation: "terminate the contract =「契約を打ち切る」。※ conclude a contract は「契約を締結する」で逆の意味。expire は「（契約が）失効する」という自動詞で、目的語を取れない。withdraw は withdraw from ~ の形で使い、契約そのものを目的語に取るのは不自然。",
      category: "語彙"
    },
    {
      id: "v8-q2", vol: 8, part: 5, passageId: null, number: 2,
      question: "Attendance at the workshop was ------- lower than the organizers had anticipated, prompting a review of the promotion strategy.",
      choices: ["considerably", "thoroughly", "densely", "heavily"],
      answer: 0,
      explanation: "比較級 lower を強める程度の副詞は considerably（かなり）。※ thoroughly（徹底的に）・densely（密に）・heavily（重く・激しく）はいずれも比較級を修飾して「差の大きさ」を表す用法がない。比較級の前に置ける副詞（considerably / significantly / substantially / far / much）をまとめて覚える。",
      category: "語彙"
    },
    {
      id: "v8-q3", vol: 8, part: 5, passageId: null, number: 3,
      question: "The consultant's report was praised for its ------- analysis, which examined every supplier in the region, however small.",
      choices: ["approximate", "tentative", "preliminary", "thorough"],
      answer: 3,
      explanation: "「どんなに小さな業者も残らず調べた」という後半から、thorough（徹底した）。※ approximate（おおよその）・tentative（暫定的な）・preliminary（予備的な）はいずれも「網羅的に調べた」という後半と矛盾する。空所の根拠が後ろにある型。",
      category: "語彙"
    },
    {
      id: "v8-q4", vol: 8, part: 5, passageId: null, number: 4,
      question: "Although the two proposals appear similar at first glance, they differ ------- in how costs are allocated.",
      choices: ["narrowly", "substantially", "approximately", "relatively"],
      answer: 1,
      explanation: "differ substantially =「大きく異なる」。冒頭の Although（一見似ているが）と呼応して「実は大きく違う」となる。※ approximately は数量の前に置く語。relatively は比較の基準が必要。narrowly は「かろうじて・僅差で」で differ とは結びつかない。",
      category: "語彙"
    },
    {
      id: "v8-q5", vol: 8, part: 5, passageId: null, number: 5,
      question: "Ms. Tan ------- her decision to relocate the office to the difficulty of hiring qualified staff in the current area.",
      choices: ["devoted", "attributed", "contributed", "dedicated"],
      answer: 1,
      explanation: "attribute A to B =「AをBのせいだとする・AをBに帰する」。ここでは「移転の決断は人材確保の難しさが理由だとした」。※ contribute to は「〜に貢献する」で目的語 A を取らない。dedicate A to B / devote A to B は「AをBに捧げる」で意味が合わない。同じ to を取る動詞でも意味が違う点が狙われる。",
      category: "語彙"
    },
    {
      id: "v8-q6", vol: 8, part: 5, passageId: null, number: 6,
      question: "The updated policy is intended to ------- confusion about which department handles customer refunds.",
      choices: ["exclude", "omit", "dismiss", "eliminate"],
      answer: 3,
      explanation: "eliminate confusion =「混乱をなくす」。※ exclude（除外する）は対象を集合から外す語で、confusion とは結びつかない。omit（省略する）は記載を落とすこと。dismiss（退ける・解雇する）も不可。動詞と名詞の相性（コロケーション）で決める問題。",
      category: "語彙"
    },
    // ---- Part 5: 前置詞・語法 ----
    {
      id: "v8-q7", vol: 8, part: 5, passageId: null, number: 7,
      question: "All contractors must ------- with the safety regulations posted at the entrance to the site.",
      choices: ["comply", "adhere", "observe", "follow"],
      answer: 0,
      explanation: "comply with ~ =「〜に従う」。空所の後ろに with があることが決め手。※ adhere は adhere to ~ と to を取る。observe・follow は他動詞で前置詞を挟まず regulations を直接目的語にする。意味はどれも「従う」なので、後ろの前置詞だけで判断する。",
      category: "前置詞・慣用表現"
    },
    {
      id: "v8-q8", vol: 8, part: 5, passageId: null, number: 8,
      question: "The finance team compiled the report ------- the direction of the chief financial officer.",
      choices: ["by", "with", "under", "on"],
      answer: 2,
      explanation: "under the direction of ~ =「〜の指揮のもとで」。under は「支配・監督の下」を表す（under the supervision of / under new management も同様）。",
      category: "前置詞・慣用表現"
    },
    {
      id: "v8-q9", vol: 8, part: 5, passageId: null, number: 9,
      question: "Applicants must submit their portfolios ------- 31 May in order to be considered for the fellowship.",
      choices: ["as late as", "not until", "by the time", "no later than"],
      answer: 3,
      explanation: "no later than ~ =「〜までに（遅くとも）」。締切を示す定番表現。※ not until 31 May だと「5月31日までは提出しない」と逆の意味になる。by the time は後ろに節（S+V）が必要。as late as は「〜もの遅くに」で締切の指定にならない。",
      category: "前置詞・慣用表現"
    },
    {
      id: "v8-q10", vol: 8, part: 5, passageId: null, number: 10,
      question: "The seminar has been postponed ------- further notice after the keynote speaker canceled.",
      choices: ["during", "until", "since", "for"],
      answer: 1,
      explanation: "until further notice =「追って通知があるまで」。掲示や案内で頻出の固定表現。postpone と「期限の終点」を表す until の組み合わせで覚える。",
      category: "前置詞・慣用表現"
    },
    {
      id: "v8-q11", vol: 8, part: 5, passageId: null, number: 11,
      question: "Employees who wish to work remotely must obtain written approval ------- advance from their department head.",
      choices: ["at", "by", "in", "on"],
      answer: 2,
      explanation: "in advance =「事前に」。無冠詞の advance と結びつく前置詞は in。※ in advance of ~ なら「〜に先立って」。",
      category: "前置詞・慣用表現"
    },
    // ---- Part 5: 品詞判断（紛らわしい語形） ----
    {
      id: "v8-q12", vol: 8, part: 5, passageId: null, number: 12,
      question: "The engineering team found the results of the stress test deeply -------.",
      choices: ["concerning", "concerned", "concern", "concernedly"],
      answer: 0,
      explanation: "find + O + C の C に入る形容詞。-ing は「（物事が）人に〜させる」、-ed は「（人が）〜と感じる」。ここは results（物）が主語相当なので concerning（懸念させる＝憂慮すべき）。※ concerned は人を主語にして The team was concerned のように使う。interesting / interested、surprising / surprised と同じ区別。",
      category: "品詞判断"
    },
    {
      id: "v8-q13", vol: 8, part: 5, passageId: null, number: 13,
      question: "Management credited the turnaround to the ------- efforts of the entire logistics department.",
      choices: ["combined", "combining", "combination", "combine"],
      answer: 0,
      explanation: "名詞 efforts を前から修飾する形容詞的な語が必要。combined efforts =「（皆の）力を合わせた努力」。※ combining は「〜を組み合わせている」という能動の意味になり efforts と合わない。combination は名詞なので the combination efforts とは並べられない。",
      category: "品詞判断"
    },
    {
      id: "v8-q14", vol: 8, part: 5, passageId: null, number: 14,
      question: "Response times improved markedly after the support team was granted ------- to the customer database.",
      choices: ["accessing", "accessed", "access", "accessible"],
      answer: 2,
      explanation: "grant A B（AにBを与える）の受動態 be granted ------- なので、空所には名詞が入る。access to ~ =「〜への利用権限」。※ accessible は形容詞で、be accessible to ~ なら可能だが be granted accessible とは言えない。",
      category: "品詞判断"
    },
    {
      id: "v8-q15", vol: 8, part: 5, passageId: null, number: 15,
      question: "The vendor's quote was ------- higher than we had expected, but the delivery terms were more favorable.",
      choices: ["somehow", "somewhat", "some", "something"],
      answer: 1,
      explanation: "比較級 higher を修飾できるのは副詞 somewhat（いくらか）。※ some は形容詞・代名詞で比較級を修飾しない。something は名詞。somehow は「どういうわけか・なんとかして」で程度を表さない。q2 と同じ「比較級を修飾できる語」の判断。",
      category: "品詞判断"
    },
    // ---- Part 5: 構文・接続詞（接続詞 / 前置詞 / 接続副詞の識別） ----
    {
      id: "v8-q16", vol: 8, part: 5, passageId: null, number: 16,
      question: "------- the recent increase in raw material costs, the company has chosen not to raise its prices.",
      choices: ["Although", "However", "Whereas", "Despite"],
      answer: 3,
      explanation: "空所の後ろは the recent increase ~ という名詞句なので、前置詞 Despite（〜にもかかわらず）。※ Although・Whereas は接続詞で後ろに S+V の節が必要。However は接続副詞で、節と節をつなぐことはできない（; however, ~ のように使う）。意味ではなく「後ろが名詞句か節か」で決める。",
      category: "構文・接続詞"
    },
    {
      id: "v8-q17", vol: 8, part: 5, passageId: null, number: 17,
      question: "The factory will be closed for maintenance next week; -------, deliveries scheduled for that period will be made from the regional warehouse.",
      choices: ["otherwise", "likewise", "accordingly", "nevertheless"],
      answer: 2,
      explanation: "「工場が閉まる」→「だからその期間の配送は地域倉庫から行う」という因果関係。accordingly =「それに応じて・したがって」。※ nevertheless は逆接、otherwise は「さもなければ」、likewise は「同様に」で、前後の論理関係に合わない。接続副詞は意味ではなく前後の論理（因果・逆接・追加・対比）で選ぶ。",
      category: "構文・接続詞"
    },
    {
      id: "v8-q18", vol: 8, part: 5, passageId: null, number: 18,
      question: "------- the merger is finalized, the two companies will continue to operate as separate legal entities.",
      choices: ["Unless", "Since", "Whether", "Until"],
      answer: 3,
      explanation: "「合併が完了するまでは、2社は別法人として運営を続ける」。時の起点・終点を示す Until。※ Unless（〜でない限り）だと「合併が完了しないなら別法人」となり、完了後にどうなるかが示されず文意が通らない。Since は「〜以来／〜だから」。Whether は「〜かどうか」で主節との関係が成立しない。",
      category: "構文・接続詞"
    },
    // ---- Part 5: 動詞の形・時制 ----
    {
      id: "v8-q19", vol: 8, part: 5, passageId: null, number: 19,
      question: "The board recommended that the proposal ------- to the finance committee for further review.",
      choices: ["referring", "be referred", "is referred", "will be referred"],
      answer: 1,
      explanation: "提案・要求・命令を表す動詞（recommend / suggest / request / insist / demand など）に続く that 節では、主語の人称・時制にかかわらず動詞は原形（仮定法現在）。受動なので be referred。※ 現在形 is referred や未来形 will be referred は不可。TOEIC頻出。",
      category: "動詞の形・時制"
    },
    {
      id: "v8-q20", vol: 8, part: 5, passageId: null, number: 20,
      question: "By the time the auditors arrive next Monday, the accounting team ------- all of the supporting documents.",
      choices: ["will have compiled", "will compile", "has compiled", "compiled"],
      answer: 0,
      explanation: "By the time + 現在形（未来の時を表す副詞節）に対し、主節は「その時点までに完了している」ので未来完了 will have compiled。※ By the time が「〜する時までに（完了）」を示す点が決め手。単なる未来 will compile では「完了している」が表せない。",
      category: "動詞の形・時制"
    },
    // ---- Part 6-1: 経費精算システムのメモ ----
    {
      id: "v8-q21", vol: 8, part: 6, passageId: "v8-p1", number: 21,
      question: "---[Q21]--- に入る語句を選んでください。",
      choices: ["processor", "processing", "processed", "process"],
      answer: 1,
      explanation: "前置詞 without の後ろなので動名詞 processing =「処理されずに（返却される）」。※ processed は過去分詞、process は動詞原形または可算名詞（a process が必要）、processor は「処理する人・装置」で意味が合わない。",
      category: "品詞判断"
    },
    {
      id: "v8-q22", vol: 8, part: 6, passageId: "v8-p1", number: 22,
      question: "---[Q22]--- に入る語句を選んでください。",
      choices: ["Under the new system,", "In spite of this,", "On the contrary,", "By comparison,"],
      answer: 0,
      explanation: "前文「精算期間の短縮が目的で、現在は平均3週間」→ 空所後「書類が揃っていれば5営業日で支払われる」。前文の目的が新制度で実現される話なので Under the new system（新制度のもとでは）。※ In spite of this は逆接、On the contrary は前言の否定、By comparison は別のものとの比較で、いずれも前後関係に合わない。Part 6 は空所の前後2文を必ず読んでから選ぶ。",
      category: "構文・接続詞"
    },
    {
      id: "v8-q23", vol: 8, part: 6, passageId: "v8-p1", number: 23,
      question: "---[Q23]--- に入る文を選んでください。",
      choices: [
        "The tutorial is optional for staff who travel infrequently.",
        "Paper forms will remain available at the reception desk.",
        "Reimbursement will continue to take approximately three weeks.",
        "A link to the tutorial will be sent to your work e-mail this week."
      ],
      answer: 3,
      explanation: "前文「全員が事前にチュートリアルを受ける必要がある」、後文「9月25日までに終えていない人はログインできない」。その間には「どうやって受けるか」の情報が入るのが自然。※「希望者のみ（optional）」は前文の must と矛盾。「紙の様式は受付に置いてある」は第1段落（紙の様式は返却される）と矛盾。「精算は3週間かかり続ける」は第2段落（期間短縮が目的）と矛盾。文挿入問題は、前後の文と矛盾する選択肢を消していくのが最短。",
      category: "文脈把握"
    },
    {
      id: "v8-q24", vol: 8, part: 6, passageId: "v8-p1", number: 24,
      question: "---[Q24]--- に入る語句を選んでください。",
      choices: ["approve", "acknowledge", "appreciate", "admire"],
      answer: 2,
      explanation: "We appreciate your patience =「ご辛抱に感謝します」。移行期間の案内文の締めとして定番。※ admire（称賛する）・approve（承認する）・acknowledge（認める・受領を知らせる）はいずれも patience とは結びつかない。",
      category: "語彙"
    },
    // ---- Part 6-2: 店舗移転の告知 ----
    {
      id: "v8-q25", vol: 8, part: 6, passageId: "v8-p2", number: 25,
      question: "---[Q25]--- に入る語句を選んでください。",
      choices: ["allows", "allow", "allowed", "allowing"],
      answer: 3,
      explanation: "カンマの前で文が完成しているため、後半は分詞構文になる。「（その結果）品揃えを広げられる」という結果を表す現在分詞 allowing。※ allows・allow は接続詞なしでは2つ目の述語動詞になれない。allowed（過去分詞）だと受動の意味になり、us を目的語に取れない。",
      category: "動詞の形・時制"
    },
    {
      id: "v8-q26", vol: 8, part: 6, passageId: "v8-p2", number: 26,
      question: "---[Q26]--- に入る語句を選んでください。",
      choices: ["In addition", "Instead", "However", "Similarly"],
      answer: 2,
      explanation: "前文「オンライン注文は予定どおり発送される（影響なし）」に対し、空所後は「店頭受取の客には個別連絡して日程を変更する（影響あり）」。対照なので However。※ Similarly・In addition は同種の情報を並べるときの語で、影響の有無が逆になっている点を捉えられない。Instead は前の内容を置き換えるときに使う。",
      category: "構文・接続詞"
    },
    {
      id: "v8-q27", vol: 8, part: 6, passageId: "v8-p2", number: 27,
      question: "---[Q27]--- に入る文を選んでください。",
      choices: [
        "A limited selection of discontinued items will be offered at reduced prices during our final week on Meade Street.",
        "The Meade Street shop will remain open through the end of the year.",
        "Online orders will be suspended until the move is complete.",
        "The new premises offer considerably less space than our current location."
      ],
      answer: 0,
      explanation: "閉店前の最終週に関する案内として自然に加わる情報。※「年末まで営業を続ける」は第1段落「11月12日に閉店」と矛盾。「オンライン注文は停止する」は前段落「予定どおり発送」と矛盾。「新店舗はかなり手狭」は第2段落「現店舗のほぼ2倍の広さ」と矛盾。挿入文の問題は、本文中の具体的な数字・日付と突き合わせると決まる。",
      category: "文脈把握"
    },
    {
      id: "v8-q28", vol: 8, part: 6, passageId: "v8-p2", number: 28,
      question: "---[Q28]--- に入る語句を選んでください。",
      choices: ["patronizing", "patronage", "patron", "patronize"],
      answer: 1,
      explanation: "your continued ------- と所有格＋形容詞の後なので名詞。patronage =「ご愛顧」。Thank you for your continued patronage は店舗の告知文の定番。※ patron は「常連客」という可算名詞で、your continued patron では意味が通らない。",
      category: "品詞判断"
    },
    // ---- Part 6-3: エレベーター工事の連絡 ----
    {
      id: "v8-q29", vol: 8, part: 6, passageId: "v8-p3", number: 29,
      question: "---[Q29]--- に入る語句を選んでください。",
      choices: ["sooner", "soon", "soonest", "as soon"],
      answer: 0,
      explanation: "直後に than があるので比較級 sooner。「予想より早く部品を確保できた」。※ 空所の後ろの than を見つけられるかだけの問題だが、長文の中では見落としやすい。第1文「1月開始の予定が12月4日に前倒し」とも整合する。",
      category: "品詞判断"
    },
    {
      id: "v8-q30", vol: 8, part: 6, passageId: "v8-p3", number: 30,
      question: "---[Q30]--- に入る語句を選んでください。",
      choices: ["concentration", "congestion", "compression", "constriction"],
      answer: 1,
      explanation: "「南側は通常運転だが、ピーク時間帯には ------- が予想される」。エレベーターが1基止まる状況なので congestion（混雑）。※ compression（圧縮）・constriction（収縮）・concentration（集中・濃度）はいずれも人の混み具合を表さない。似た語形に惑わされず、状況から意味を決める。",
      category: "語彙"
    },
    {
      id: "v8-q31", vol: 8, part: 6, passageId: "v8-p3", number: 31,
      question: "---[Q31]--- に入る文を選んでください。",
      choices: [
        "The work is expected to begin in January as originally planned.",
        "The south elevator will also be taken out of service in December.",
        "Wait times are therefore likely to be longer than usual.",
        "Both elevators will remain fully available throughout the project."
      ],
      answer: 2,
      explanation: "前段落「北側が約6週間停止、南側はピーク時に混雑」を受け、後文「10階より上の入居者は朝に余裕を持つとよい」への橋渡しになる。※「2基とも通常どおり使える」は前段落（北側は停止）と矛盾。「1月開始の予定どおり」は第1段落（12月4日に前倒し）と矛盾。「南側も12月に停止する」は前段落（南側は通常運転）と矛盾。挿入文は前後の両方とつながるかを確認する。",
      category: "文脈把握"
    },
    {
      id: "v8-q32", vol: 8, part: 6, passageId: "v8-p3", number: 32,
      question: "---[Q32]--- に入る語句を選んでください。",
      choices: ["will be returning", "has been returned", "was returned", "will have been returned"],
      answer: 3,
      explanation: "By the end of January（1月末までに）という未来の期限があり、エレベーターは「戻される」側なので未来完了の受動態 will have been returned。※ will be returning は能動で意味が逆。has been returned・was returned は現在完了・過去で、未来の期限と合わない。q20 と同じ「By + 期限 → 未来完了」の型。",
      category: "動詞の形・時制"
    }
  ]
};
