window.DSE_READING = {
  overview: {
    format: "Paper 1（Reading）佔英文科總分 20%，全卷 1 小時 30 分鐘，分為 Part A 及 Part B。Part A 必答；Part B 則在 B1 與 B2 之間二選一，兩份都做不會加分。",
    partA: "Part A 是必答部分，文章一般較短，題目較直接，主要考基本理解：找資料、段落大意、字詞意思。這部分是你的「保命分」，Level 1–2 的同學要在這裡盡量拿分。",
    b1b2: "B1 是較淺的版本，文章較短、題型較直接；B2 是較深版本，文章較長，抽象詞彙和推論題較多。最重要的一條規則：選 B1 的考生最高只可獲 Level 4；選 B2 則沒有這個上限。如果你目前是 Level 1–2，B1 的 Level 4 上限其實不是你的限制，因為你距離 Level 4 還很遠。選 B1 可以讓你在較短、較直接的文章裡穩定取分，先拿到 Level 2–3；選 B2 只會因為做不完或看不懂而連基本分都失去。",
    timing: "建議分配：Part A 約 35 分鐘，B1 約 45 分鐘，最後留 10 分鐘檢查。遇到不確定的題目先做記號跳過，不要在一題上死守超過兩分鐘。",
    goldenRules: [
      "先讀題目，再讀文章：用 60–90 秒掃一次題目，圈出關鍵詞，之後讀文章時就知道要留意什麼，不用每個字都讀。",
      "Level 1–2 的同學一定選 B1：B1 最高只封頂 Level 4，但你現在的分數距離 Level 4 很遠；選 B2 只會令你連基本分都拿不到，目標是先穩拿 Level 2–3。",
      "Part A 是保命分：Part A 必答，題目較直接，要盡量在這裡拿足分，不要略過它就直接做 B1。",
      "時間一到就轉部分：建議 Part A 用 35 分鐘，B1 用 45 分鐘，最後留 10 分鐘檢查，不要被一兩題拖死。",
      "每一題都要填：DSE 沒有倒扣，空白一定是零分；不肯定就刪去明顯錯的選項，再從剩下的猜一個。",
      "答案一定要來自文章：不要用常識或自己的意見作答，尤其 TFNG，文章沒有說就是 Not Given。",
      "留意字數限制：ONE word 就只寫一個字，NO MORE THAN THREE WORDS 就最多三個字，超字數通常不給分。",
      "抄原文拼寫：填充和短答盡量直接抄文章的字，檢查單複數、時態和串法，串錯字可能失分。"
    ]
  },
  questionTypes: [
    {
      id: "mc",
      name: "Multiple Choice",
      zh: "多項選擇題。四個選項只有一個正確，其餘三個是似是而非的干擾項。",
      tactic: "先讀題幹，圈出 who、what、why、how many 等關鍵詞，再回文章定位。正確答案通常是原文的改寫，不會一字不漏，所以不要只找相同的字。用刪除法先去掉明顯錯誤或文章沒提的選項。最後把選中的答案放回題目讀一次，確保意思通順。",
      example: {
        q: "A notice says: 'The new library opens on Monday at 9 a.m.' According to the notice, when does the library open?",
        options: ["On Monday", "On Tuesday", "On Wednesday", "On Thursday"],
        a: 0,
        why: "告示明確寫 'opens on Monday'，所以 A 正確。其餘三個日子告示完全沒有提及，屬於無中生有，不要因為它們看起來合理就選。"
      }
    },
    {
      id: "tfng",
      name: "True / False / Not Given",
      zh: "判斷題。True 代表文章明確支持；False 代表文章明確反對；Not Given 代表文章沒有足夠資料判斷。最易錯的是把「文章無提」當成 False。",
      tactic: "先找出題目中的關鍵詞或數字，回到文章定位。只有當文章明確說出相反意思時才選 False；如果文章完全沒有提，或只提了一部分，就選 Not Given。小心絕對詞（all、never、only）和被偷改的數字。每題都要在文中畫出證據句，不要靠印象。",
      example: {
        q: "Text: 'Only Form 6 students may use the study room.' Statement: Form 5 students may use the study room.",
        options: ["True", "False", "Not Given"],
        a: 1,
        why: "原文說只有中六學生可以使用自修室，即中五學生不可以，文章明確反對題目的說法，所以是 False，不是 Not Given。"
      }
    },
    {
      id: "short",
      name: "Short Answer",
      zh: "短答題。用文章的字詞回答，通常有字數限制，例如 NO MORE THAN THREE WORDS。",
      tactic: "先看題目問什麼（人物、地點、原因、數字），再定位相關句子。答案要精簡，只寫所需資料，不要整句抄。留意字數限制，冠詞和介詞都計算在內。抄寫時保留原文拼寫，並檢查單複數和時態。",
      example: {
        q: "Question: 'Where does the school hold its weekly assembly?' Text: 'The weekly assembly takes place in the school hall every Friday.' Which answer is best?",
        options: ["In the school hall", "Every Friday", "The students", "It takes place"],
        a: 0,
        why: "題目問 Where（地點），所以答案是 in the school hall。'Every Friday' 回答的是 When；其餘兩個選項沒有回答地點。短答題要對準疑問詞。"
      }
    },
    {
      id: "cloze",
      name: "Summary Cloze",
      zh: "摘要填充。一篇與原文相關的短文留有空格，多數要求每個空格填一個字。",
      tactic: "先通讀整段摘要，掌握大意，不要一開始就逐格填。利用文法線索：冠詞後多數填名詞，be 動詞後可能填形容詞，to 後面填動詞原形。返回原文找相同意思的句子，抄出正確的字。填完後把整句讀一次，檢查詞性和單複數。",
      example: {
        q: "Complete the summary with ONE word: 'The club meets every ____ in the school hall.' (Passage: 'The club meets every Friday in the school hall.')",
        options: ["Friday", "week", "hall", "meeting"],
        a: 0,
        why: "原文是 'every Friday'，所以填 Friday。'week' 和 'hall' 雖然在句中出現，但意思不通；'meeting' 不能放在 every 後面表示時間。"
      }
    },
    {
      id: "matching",
      name: "Matching",
      zh: "配對題。把人物、段落、標題或例子與選項配對，選項通常多過題目，可能有選項用不上。",
      tactic: "先讀所有選項，了解有哪幾類答案。配對段落大意時，先看每段首句和尾句，通常已包含主旨。做人物與觀點配對時，在文中人名旁寫下關鍵詞，再逐一對應。已用過的選項要劃掉，並留意題目是否允許重複使用。",
      example: {
        q: "Which heading best fits a paragraph that describes how a school placed three colour-coded bins in every corridor?",
        options: ["A costly mistake", "A simple solution", "A famous visitor", "A change of principal"],
        a: 1,
        why: "該段重點是用三色回收桶解決垃圾分類問題，屬於解決方法，所以選 A simple solution。其餘標題與段落內容無關。"
      }
    },
    {
      id: "sequence",
      name: "Sequencing",
      zh: "排序題。把事件、步驟或段落按時間或邏輯順序排列。",
      tactic: "先找出明顯的時間標記：first、then、after that、finally、in 2019、the following week。也可以先確定最早和最後的兩項，再排中間。注意因果關係不一定等於時間順序。排好後由頭讀一次，看是否通順合理。",
      example: {
        q: "Text: 'Amy joined the club in March. She became captain in June, and led the team to victory in August.' Which happened first?",
        options: ["She became captain.", "She joined the club.", "She led the team to victory.", "She left the club."],
        a: 1,
        why: "時間線是三月加入、六月做隊長、八月奪冠，所以最早是 joined the club。其餘事件都在其後；'left the club' 文中沒有提及。"
      }
    },
    {
      id: "vocab",
      name: "Vocabulary in Context",
      zh: "詞義猜測。問某個字在文中的意思，答案必須配合上下文，而不是字典的第一個解釋。",
      tactic: "先回到該字所在的句子，判斷詞性（名詞、動詞、形容詞）。用前後句的線索推測：例子、對比、因果、定義句（which means、that is）。把每個選項代入原句，讀一次，看哪個最通順。小心一詞多義和字面陷阱，例如 divided 在文中指意見分歧，不是「分開」。",
      example: {
        q: "In the sentence 'The shop discards food that is still safe to eat', what does 'discards' mean?",
        options: ["Sells quickly", "Throws away", "Cooks slowly", "Puts on a shelf"],
        a: 1,
        why: "句子說食物仍然安全可吃卻被丟棄，配合上下文 discards 是「丟掉」。'Sells quickly' 與「仍可安全食用」的可惜語氣不合；其餘選項放回句中都不通順。"
      }
    }
  ],
  passages: [
    {
      id: "p1-recycling",
      level: 1,
      title: "Second Chance",
      blurb: "A Form 3 class discovers how much good food and paper their school throws away, and decides to do something about it.",
      text: "Last September, a group of Form 3 students at a secondary school in Tin Shui Wai noticed something embarrassing. Every lunchtime, the bins outside the tuck shop were full, but not with rubbish. They were full of unopened cartons of milk, half-eaten sandwiches and clean sheets of paper. 'We throw away things we could still use,' said Amy Chan, the group's leader.\n\nThe students decided to start a campaign called Second Chance. Their first step was a waste audit. For five school days, they wore gloves and sorted the rubbish from one covered bin area. The results surprised everyone. In a single week, the school threw away 41 kilograms of food and more than 900 sheets of paper that had only one side printed. The group put the numbers on a large board in the playground so that students could see them. They also spoke to twenty students and discovered that most of them had never been taught how to sort waste at home.\n\nNext, they placed three new bins in each corridor: blue for paper, yellow for plastic bottles and green for food waste. Each bin had a picture of the correct item on the lid, because the group learned that people sort rubbish more carefully when the instructions are visual rather than just words.\n\nThe campaign also had a reward system. Classes that kept their bins clean for a whole month earned a Green Star on the classroom door. At the end of the term, the class with the most stars won a free visit to the Hong Kong Wetland Park. The competition was close, and 3A won by only two stars.\n\nBy March, the school's food waste had fallen by 38 per cent, and paper use had dropped by almost half. However, Amy says the biggest change was not in the numbers. 'Students now stop and think before they throw something away,' she said. 'That habit will stay with them longer than any competition.' The school plans to add a small garden next year, using compost made from its own food waste.",
      wordCount: 345,
      questions: [
        {
          n: 1,
          type: "mc",
          q: "What did the students find in the bins outside the tuck shop?",
          options: ["Only plastic bottles", "Usable food and clean paper", "Broken furniture from classrooms", "Old textbooks from the library"],
          a: 1,
          why: "第一段指出垃圾桶裡有未開封的牛奶、吃了一半的三文治和乾淨的紙張，這些都是仍可使用的東西，所以答案是 B。A 錯在文中沒有說只有膠樽；C 和 D 完全沒有提及。"
        },
        {
          n: 2,
          type: "mc",
          q: "How long did the waste audit last?",
          options: ["One school day", "Three school days", "Five school days", "One month"],
          a: 2,
          why: "第二段說 'For five school days, they wore gloves and sorted the rubbish'，所以是五個上課日，答案 C。一個月是 Green Star 獎勵計劃的長度，不是審計；其餘選項文中沒有支持。"
        },
        {
          n: 3,
          type: "mc",
          q: "Why did the group put pictures on the lids of the new bins?",
          options: ["To make the corridor look more colourful", "Because students sort rubbish more carefully with visual instructions", "Because younger students cannot read any words", "To hide the school logo on the bins"],
          a: 1,
          why: "第三段說 'people sort rubbish more carefully when the instructions are visual rather than just words'，圖片就是視覺指示，所以 B 正確。A 和 D 文中沒提；C 過度推論，文中只說視覺指示比純文字有效，並沒有說低年級學生完全不識字。"
        },
        {
          n: 4,
          type: "tfng",
          q: "In one week, the school threw away more than 900 sheets of paper that had only one side printed.",
          options: ["True", "False", "Not Given"],
          a: 0,
          why: "第二段明確寫 'more than 900 sheets of paper that had only one side printed'，與題目一致，所以是 True。題目沒有說「全部紙張」，只是指出其中 900 多張，數字和描述都吻合。"
        },
        {
          n: 5,
          type: "tfng",
          q: "Class 3A won the Green Star competition by more than ten stars.",
          options: ["True", "False", "Not Given"],
          a: 1,
          why: "第四段說 '3A won by only two stars'，即只贏了兩顆星，不是十顆以上，所以是 False。這是典型的數字陷阱：文章有提到比賽和 3A，但數字被改大了。"
        },
        {
          n: 6,
          type: "tfng",
          q: "The school principal actively supported the recycling campaign.",
          options: ["True", "False", "Not Given"],
          a: 2,
          why: "全文沒有提到校長對計劃的態度，也沒有說校長有沒有參與。雖然計劃最終成功，但「校長支持」這一點文章既無確認也無否定，所以是 Not Given。不要因為事情發生在學校，就假設校長一定支持。"
        },
        {
          n: 7,
          type: "short",
          q: "How many kilograms of food did the school throw away in a single week?",
          a: "41 kilograms",
          accept: ["41 kilograms", "41 kg", "forty-one kilograms"],
          why: "第二段寫 'In a single week, the school threw away 41 kilograms of food'，直接抄數字和單位即可。數字和單位都要寫清楚，只寫 41 可能不夠完整。"
        },
        {
          n: 8,
          type: "cloze",
          q: "Complete the sentence with ONE word from the passage: People sort rubbish more carefully when the instructions are ____ rather than just words.",
          a: "visual",
          why: "第三段最後一句是 'when the instructions are visual rather than just words'，空格要填 visual。題目要求 ONE word，所以不能寫 'more visual' 或 'visual instructions'。"
        }
      ]
    },
    {
      id: "p2-sleep",
      level: 1,
      title: "Why Ken Stopped Scrolling at Midnight",
      blurb: "A Form 4 student tracks his sleep for a school project and discovers a pattern he cannot ignore.",
      text: "Ken Wong, a Form 4 student in Kwun Tong, used to be proud of how little sleep he needed. He would finish his homework at eleven, watch videos until one in the morning, and wake up at six thirty for school. On the MTR he would fall asleep standing up. 'I thought I was fine,' he says. 'Everyone in my class does the same.'\n\nThen his biology teacher gave the class a simple task: record your sleep for two weeks. Ken wrote down his bedtime, his wake-up time, and how he felt each morning on a scale of one to five. The results were not pretty. On the nights he slept less than six hours, his morning score was usually a two. On the nights he slept eight hours, it was a four or five. 'I could see the pattern with my own eyes,' he says. 'It was not a lecture from a teacher. It was my own handwriting.'\n\nTeenagers need more sleep than adults, about eight to ten hours a night. During sleep, the body repairs itself and the brain sorts and stores what was learned during the day. Too little sleep makes it harder to concentrate, remember and control emotions. It can also weaken the immune system, which is why some students get sick more often during exam periods.\n\nKen made three changes. First, he set an alarm for 10:30 p.m. It was not to wake up, but to remind himself to stop using his phone. Second, he put the phone on a shelf across the room so he could not reach it without getting out of bed. Third, he stopped drinking milk tea after six in the evening, because the caffeine stayed in his body for hours.\n\nThe first week was hard. Ken often lay awake, thinking about messages he had not answered. By the third week, however, he was falling asleep within twenty minutes. His morning score went up to four, and he stopped dozing on the MTR. His advice to other students is simple: 'Do not try to change everything in one night. Pick one habit and keep it for a month. Sleep is not wasted time. It is when your body does its quiet work.'",
      wordCount: 371,
      questions: [
        {
          n: 1,
          type: "mc",
          q: "What did Ken use to do before he changed his sleeping habits?",
          options: ["He went to bed at 10:30 p.m.", "He watched videos until one in the morning.", "He did his homework on the MTR.", "He woke up at eight every day."],
          a: 1,
          why: "第一段說 Ken 'watch videos until one in the morning'，所以 B 正確。A 的 10:30 是他後來設的電話提醒時間；C 錯，他在 MTR 是睡覺，不是做功課；D 錯，他六時半起床。"
        },
        {
          n: 2,
          type: "mc",
          q: "What task did Ken's biology teacher give the class?",
          options: ["To interview a doctor about sleep", "To record their sleep for two weeks", "To write an essay about the brain", "To design a poster about caffeine"],
          a: 1,
          why: "第二段說 'record your sleep for two weeks'，答案 B。其餘三項文中都沒有出現，是用來混淆的看似合理選項。"
        },
        {
          n: 3,
          type: "mc",
          q: "According to the passage, why may some students get sick more often during exam periods?",
          options: ["They eat fewer vegetables.", "They sleep too little, which weakens the immune system.", "They spend more time outdoors.", "They drink too much milk tea."],
          a: 1,
          why: "第三段說 'It can also weaken the immune system, which is why some students get sick more often during exam periods'，句中的 It 指上一句的 too little sleep，所以 B 正確。A、C 無提及；D 是 Ken 的個人習慣，不是文中對考試期生病的解釋。"
        },
        {
          n: 4,
          type: "tfng",
          q: "Ken set his 10:30 p.m. alarm to wake himself up in the morning.",
          options: ["True", "False", "Not Given"],
          a: 1,
          why: "第四段說 'It was not to wake up, but to remind himself to stop using his phone'，題目剛好相反，所以是 False。"
        },
        {
          n: 5,
          type: "tfng",
          q: "Ken gave up milk tea in the evening because it contains caffeine.",
          options: ["True", "False", "Not Given"],
          a: 0,
          why: "第四段說 'he stopped drinking milk tea after six in the evening, because the caffeine stayed in his body for hours'，原因正是咖啡因，所以是 True。"
        },
        {
          n: 6,
          type: "tfng",
          q: "Ken's parents bought him a new phone to help him sleep better.",
          options: ["True", "False", "Not Given"],
          a: 2,
          why: "文章只說 Ken 把電話放在房間另一邊的架上，沒有提過父母買新電話，也沒有提過父母的態度。這個說法既未被確認，也未被否定，所以是 Not Given。"
        },
        {
          n: 7,
          type: "short",
          q: "How many hours of sleep does the passage say teenagers need each night?",
          a: "eight to ten hours",
          accept: ["eight to ten hours", "8 to 10 hours", "8-10 hours"],
          why: "第三段第一句說 'Teenagers need more sleep than adults, about eight to ten hours a night'，答案就是 eight to ten hours。寫 8 to 10 hours 也可以，但不要只寫 ten hours，因為那只是上限。"
        },
        {
          n: 8,
          type: "cloze",
          q: "Complete the sentence with ONE word from the passage: Ken put his phone on a ____ across the room.",
          a: "shelf",
          why: "第四段說 'he put the phone on a shelf across the room'，所以填 shelf。注意是單數，不要寫 shelves。"
        }
      ]
    },
    {
      id: "p3-foodwaste",
      level: 2,
      title: "The App That Sells Yesterday's Bread",
      blurb: "Two Hong Kong graduates try to change how the city thinks about food that is one day old.",
      text: "Every evening, bakeries in Hong Kong throw away bread that is still perfectly good to eat. The bread is not spoiled; it is simply a day old, and many customers will not buy it at full price. Restaurants, supermarkets and hotels face the same problem. Hong Kong discards around 3,600 tonnes of food waste every day, and less than a tenth of it is recycled. Most of it ends up in landfills, where it produces methane, a gas far more powerful than carbon dioxide at trapping heat.\n\nThree years ago, two graduates from a Hong Kong university decided to attack this problem with a phone. Their app, LastBite, lets shops list unsold food at a discount in the late afternoon. Customers open the app, see what is available nearby, pay in the app, and collect their food before closing time. The shops recover part of their cost, the customers pay less, and the food is eaten instead of dumped. 'We are not asking people to eat rubbish,' says co-founder Nathan Ho. 'We are asking them to eat the same food, one day later, at half the price.'\n\nThe idea is not new. Similar apps exist in Europe and North America. But Ho and his partner believed Hong Kong needed a local version, because the city's food culture is different. Hongkongers care about freshness, and many people are suspicious of food that has passed its best-before date. The team therefore built trust in small ways. Every listing shows the time the food was made and the exact collection window. Shops are checked before they join. Customers can also read reviews from other users, just as they would for a restaurant.\n\nThe business has grown slowly but steadily. LastBite now works with more than 300 shops, from small family bakeries in Sham Shui Po to hotel buffets in Tsim Sha Tsui. It has saved an estimated 120 tonnes of food from landfills, a small fraction of the city's waste, but enough to prove that the model can work. The company takes a commission of 15 per cent on each sale, which keeps the service free for customers.\n\nNot everyone is convinced. Some shop owners say the discount teaches customers to wait for cheap food instead of paying full price. Others worry that the app makes people feel good about waste without reducing it. Ho accepts these criticisms, but he points to a larger prize: changing habits. 'If a family tries LastBite once and enjoys the bread,' he says, 'they may start asking why so much good food is thrown away in the first place. That question is worth more than any single sale.'",
      wordCount: 441,
      questions: [
        {
          n: 1,
          type: "mc",
          q: "In paragraph 1, what does 'discards' most nearly mean?",
          options: ["Cooks", "Throws away", "Buys", "Recycles"],
          a: 1,
          why: "'Hong Kong discards around 3,600 tonnes of food waste every day' 之後說 'Most of it ends up in landfills'，可見 discards 是指丟棄，所以選 B。A 和 C 放回句中意思不通；D 錯，因為下一句說只有不足十分之一被回收，discards 不是回收。"
        },
        {
          n: 2,
          type: "mc",
          q: "Why did the founders make a Hong Kong version of the app instead of copying the European one?",
          options: ["The European apps were too expensive to use.", "Hong Kong's food culture and attitudes to freshness are different.", "The Hong Kong government asked them to.", "Smartphones are not common in Europe."],
          a: 1,
          why: "第三段說 'Hong Kong needed a local version, because the city's food culture is different. Hongkongers care about freshness...'，所以 B 正確。A、C、D 文中完全沒有提；D 更是與文章相反的假選項，文章只說歐洲有類似 app。"
        },
        {
          n: 3,
          type: "mc",
          q: "What criticism of LastBite is mentioned in paragraph 5?",
          options: ["It sells food that is not safe to eat.", "It may teach customers to wait for discounts instead of paying full price.", "It charges shops too much commission.", "It only works in Sham Shui Po."],
          a: 1,
          why: "第五段說 'the discount teaches customers to wait for cheap food instead of paying full price'，正是 B。A 錯，文章反而強調食物仍然安全；C 無提及佣金過高；D 錯，文章說商戶遍及深水埗和尖沙咀。"
        },
        {
          n: 4,
          type: "tfng",
          q: "Less than one tenth of Hong Kong's food waste is recycled.",
          options: ["True", "False", "Not Given"],
          a: 0,
          why: "第一段說 'less than a tenth of it is recycled'，與題目完全一致，所以是 True。'less than a tenth' 就是少於十分之一。"
        },
        {
          n: 5,
          type: "tfng",
          q: "Customers pay a fee to use the LastBite app.",
          options: ["True", "False", "Not Given"],
          a: 1,
          why: "第四段說公司向每宗交易收取 15% 佣金，'which keeps the service free for customers'，即顧客免費使用，所以題目是 False。付費的是商戶，不是顧客。"
        },
        {
          n: 6,
          type: "tfng",
          q: "Nathan Ho studied business at university.",
          options: ["True", "False", "Not Given"],
          a: 2,
          why: "第二段只說他和拍檔是 'two graduates from a Hong Kong university'，沒有說主修什麼。「讀商科」這一點文章既無確認也無否定，所以是 Not Given。不要因為他是初創創辦人就假設他讀商科。"
        },
        {
          n: 7,
          type: "short",
          q: "How many tonnes of food has LastBite saved from landfills?",
          a: "120 tonnes",
          accept: ["120 tonnes", "120 tons", "an estimated 120 tonnes"],
          why: "第四段說 'It has saved an estimated 120 tonnes of food from landfills'，答案是 120 tonnes。'an estimated' 是「估計」的意思，不影響數字。"
        },
        {
          n: 8,
          type: "cloze",
          q: "Complete the sentence with ONE word from the passage: Most of Hong Kong's food waste ends up in ____, where it produces methane.",
          a: "landfills",
          why: "第一段說 'Most of it ends up in landfills, where it produces methane'，所以填 landfills。注意用複數，因為文中是 landfills。"
        }
      ]
    },
    {
      id: "p4-esports",
      level: 2,
      title: "Are Gamers Athletes? A School Decides",
      blurb: "When an e-sports club asks for the same training time as the football team, one school has to rethink what a sport is.",
      text: "At a secondary school in Sha Tin, the argument began with a timetable. The school's sports teams were allowed to miss the last lesson on Fridays for training. The e-sports club, which had just won a regional tournament, asked for the same arrangement. The principal said no. 'Sport means physical activity,' she explained. 'Sitting in front of a screen is not the same thing.' The club's captain, Jason Lee, disagreed. 'We train four evenings a week,' he said. 'We analyse matches, practise together and follow a coach's plan. How is that not training?'\n\nThe disagreement is spreading. E-sports, or competitive video gaming, is now a medal event at the Asian Games, and professional players earn salaries that would make many office workers jealous. Universities in Hong Kong and elsewhere offer scholarships to skilled players. Yet schools remain divided. Supporters argue that e-sports teaches teamwork, quick decision-making and discipline. Critics reply that these skills can be learned in a debate club or a basketball team, and that the health costs are different.\n\nThe health question is at the centre of the debate. A basketball player who trains hard may get injured, but the sport also builds stamina, strength and bone density. A gamer who practises for six hours a day may develop eye strain, back pain and wrist injuries. Sleep can suffer too, especially if practice runs late into the night. Dr Winnie Lau, a physiotherapist, sees both sides. 'I have treated teenage gamers with serious wrist problems,' she says. 'But I have also treated swimmers with shoulder injuries. The difference is not the activity itself. It is how it is organised.'\n\nThat last point may offer a way forward. A school that treats e-sports like any other team sport would set limits: a maximum of two hours of practice a day, a coach who watches for signs of strain, regular breaks, and no training after nine in the evening. It would also require players to take part in some physical exercise. Under those conditions, the risks shrink, and the benefits become easier to defend. These include teamwork, strategy, and a sense of belonging for students who dislike traditional sports.\n\nIn the end, the Sha Tin school reached a compromise. The e-sports club can use the computer room on Friday afternoons, but only after a thirty-minute fitness session. Players must also keep their grades above a certain level. Jason is satisfied, though he notes that the arrangement is stricter than the one given to the football team. 'We are still proving ourselves,' he says. 'But at least now we are on the timetable.'",
      wordCount: 432,
      questions: [
        {
          n: 1,
          type: "mc",
          q: "Why did the principal first refuse the e-sports club's request?",
          options: ["The club had never won a tournament.", "She did not accept that sitting in front of a screen is a sport.", "The computer room was being repaired.", "The club had too many members."],
          a: 1,
          why: "第一段引述校長的話：'Sport means physical activity... Sitting in front of a screen is not the same thing.' 她認為電競不算運動，所以 B 正確。A 錯，文中說 club 剛贏了地區比賽；C、D 無提及。"
        },
        {
          n: 2,
          type: "mc",
          q: "In paragraph 2, what does 'schools remain divided' suggest?",
          options: ["Schools have stopped teaching e-sports.", "Schools still disagree strongly about e-sports.", "Schools are divided into morning and afternoon sessions.", "Schools have joined together to support e-sports."],
          a: 1,
          why: "'Yet schools remain divided. Supporters argue... Critics reply...' 前後列出支持和反對兩派，可見 divided 是指意見分歧，所以 B 正確。A 和 D 與上下文相反；C 把 divided 誤解為分班或分時段，是字面陷阱。"
        },
        {
          n: 3,
          type: "mc",
          q: "What is Dr Winnie Lau's main point?",
          options: ["Gaming is more dangerous than swimming.", "All teenage gamers will develop wrist injuries.", "The risk depends on how the activity is organised.", "Schools should ban e-sports completely."],
          a: 2,
          why: "第三段 Dr Lau 說 'The difference is not the activity itself. It is how it is organised.' 她認為關鍵在於安排方式，所以 C 正確。A 錯，她同時醫治游泳選手；B 用 all 太絕對；D 她沒有主張全面禁止。"
        },
        {
          n: 4,
          type: "tfng",
          q: "The e-sports club trains four evenings a week.",
          options: ["True", "False", "Not Given"],
          a: 0,
          why: "第一段 Jason 說 'We train four evenings a week'，與題目一致，所以是 True。"
        },
        {
          n: 5,
          type: "tfng",
          q: "Under the compromise, players can use the computer room without doing any physical exercise.",
          options: ["True", "False", "Not Given"],
          a: 1,
          why: "第五段說 'The e-sports club can use the computer room on Friday afternoons, but only after a thirty-minute fitness session'，即必須先做三十分鐘體能活動，所以題目是 False。"
        },
        {
          n: 6,
          type: "tfng",
          q: "Jason's parents support his e-sports training.",
          options: ["True", "False", "Not Given"],
          a: 2,
          why: "全文沒有提及 Jason 父母的看法。文章有提校長、教練和 Dr Lau，但沒有提他的家人，所以是 Not Given。不要因為 Jason 可以繼續訓練就推論父母支持。"
        },
        {
          n: 7,
          type: "short",
          q: "How long must players exercise before they can use the computer room?",
          a: "thirty minutes",
          accept: ["thirty minutes", "30 minutes", "30 min"],
          why: "第五段說 'only after a thirty-minute fitness session'，即三十分鐘。題目問 How long，答時間長度即可，不需要抄整句。"
        },
        {
          n: 8,
          type: "cloze",
          q: "Complete the sentence with ONE word from the passage: Dr Lau believes the difference is not the activity itself but how it is ____.",
          a: "organised",
          why: "第三段最後一句是 'It is how it is organised.' 所以填 organised。英式拼法 organised 與文中一致；美式 organized 在 DSE 一般不扣分，但最好跟原文。"
        }
      ]
    }
  ]
};

window.DSE_READING.examTips = [
  {
    title: "開考前：確認自己做 Part A + B1",
    zh: "試卷派發後，先在封面確認自己只需要做 Part A 和 B1，並檢查頁數有沒有缺漏。不要翻去 B2 看一眼，那只會浪費時間，也會動搖你選 B1 的決定。"
  },
  {
    title: "把時間寫在紙上",
    zh: "開考後立即寫下三個時間點：開始做 B1 的時間、停止作答的時間、最後檢查的時間。例如開考 9:00，就寫 9:35 轉 B1、10:20 停筆、10:30 完卷。"
  },
  {
    title: "讀題目時圈關鍵詞",
    zh: "每題圈出疑問詞（who、what、why、how many）和限制詞（NOT、EXCEPT、only、first）。很多失分不是因為看不懂文章，而是因為看漏了題目問什麼。"
  },
  {
    title: "TFNG 一定要畫證據",
    zh: "每做一題 True / False / Not Given，都在文章用鉛筆畫出支持或反對的句子，並在題號旁寫 T、F 或 NG。沒有證據句的題目，多數是 Not Given，不要憑感覺選 False。"
  },
  {
    title: "B1 選了就不要回頭",
    zh: "B1 的封頂是 Level 4，但對 Level 1–2 的同學來說，先拿到 Level 2–3 才是最實際的目標。選了 B1 就專心把它做完，不要做了一半才後悔，因為你沒有時間再做 B2。"
  },
  {
    title: "不會的題目：先跳，後猜",
    zh: "一道題想了超過兩分鐘就做記號跳過，先做後面的題目。全部做完後，回到記號題，用刪除法去掉一至兩個明顯錯的選項，剩下的就猜，千萬不要留空。"
  },
  {
    title: "抄字時檢查串法",
    zh: "填充和短答最好直接從文章抄字，不要自己改寫。抄完逐字對一次，特別留意單複數（shelf / shelves）、時態（organised）和容易串錯的字（receive、environment）。"
  },
  {
    title: "最後十分鐘的三個檢查",
    zh: "第一，檢查有沒有漏答或填錯題號；第二，檢查字數限制和串法；第三，檢查 TFNG 有沒有把 Not Given 寫成 False。改答案前要有文章證據，不要臨尾亂改。"
  }
];
