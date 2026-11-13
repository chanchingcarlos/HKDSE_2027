window.DSE_LISTENING_TASKS_EXTRA = {
  tasks: [
    {
      id: "ppx-l1-library",
      level: 1,
      paper: "Paper 3 Part A",
      title: "School library reopening announcement",
      instructions: "You will hear a school announcement about the library. Listen and answer the questions. You have 30 seconds to look at the questions first.",
      transcript: "Good morning, students. This is Mrs Lau, the school librarian, with an announcement about the library. After three months of repairs, the library will reopen on Monday, the eighth of September. That is the second Monday of the term, not the first, as it says on the notice outside the office. The work took longer than we planned because of the heavy rain in August.\n\nThe library will open at half past seven in the morning and close at five o'clock. Before the repairs, we closed at four thirty, but many of you asked for more time to study after school, so we have added thirty minutes.\n\nThere are some new rules. First, you may borrow four books at a time, not three. Second, the borrowing period is now three weeks. Third, drinks are not allowed in the library, but you may bring a bottle of water. Please do not bring juice or milk, because they damage the books if they spill.\n\nWe are also starting a reading club. It will meet every Wednesday at lunchtime in the new reading corner. The club is free, and the first twenty students to sign up will receive a book bag. Please sign up at the front desk before Friday, the fifth of September.\n\nFinally, the old magazines have been moved to the second floor. If you need help finding anything, please ask me or my assistant, Mr Yip. That is Y-I-P. Thank you, and I hope to see you in the library on Monday.",
      estimateSeconds: 108,
      questions: [
        { n: 1, q: "The library will reopen on ____.", a: "8 September", accept: ["8 September", "September 8", "8/9", "the eighth of September"], why: "錄音講 'the library will reopen on Monday, the eighth of September'，並強調 'not the first'，所以是 9 月 8 日。" },
        { n: 2, q: "The repair work took longer because of ____.", a: "the heavy rain in August", accept: ["the heavy rain in August", "heavy rain", "the heavy rain", "rain in August"], why: "錄音講 'The work took longer than we planned because of the heavy rain in August'。" },
        { n: 3, q: "The library will close at ____.", a: "5:00 pm", accept: ["5:00 pm", "5:00", "5 pm", "five o'clock"], why: "錄音講 'close at five o'clock'，並比較 'Before the repairs, we closed at four thirty'，4:30 是舊時間。" },
        { n: 4, q: "Students may borrow ____ books at a time.", a: "four", accept: ["four", "4", "four books"], why: "錄音講 'you may borrow four books at a time, not three'，3 本是舊規矩。" },
        { n: 5, q: "The borrowing period is now ____.", a: "three weeks", accept: ["three weeks", "3 weeks"], why: "錄音講 'the borrowing period is now three weeks'。" },
        { n: 6, q: "Which drink are students allowed to bring into the library?", options: ["Juice", "Milk", "Water", "Coffee"], a: "Water", accept: ["Water"], why: "錄音講 'drinks are not allowed in the library, but you may bring a bottle of water'，之後明確講 'Please do not bring juice or milk'。" },
        { n: 7, q: "The reading club will meet every ____.", a: "Wednesday at lunchtime", accept: ["Wednesday at lunchtime", "Wednesday", "Wednesday lunchtime"], why: "錄音講 'It will meet every Wednesday at lunchtime in the new reading corner'。" },
        { n: 8, q: "The first ____ students to sign up will receive a book bag.", a: "20", accept: ["20", "twenty", "20 students"], why: "錄音講 'the first twenty students to sign up will receive a book bag'。" },
        { n: 9, q: "Students should sign up for the reading club by ____.", a: "5 September", accept: ["5 September", "September 5", "5/9", "the fifth of September"], why: "錄音講 'Please sign up at the front desk before Friday, the fifth of September'，不是圖書館重開的 9 月 8 日。" },
        { n: 10, q: "What does Mrs Lau say about the old magazines?", options: ["They have been thrown away.", "They are on the second floor.", "They are in the reading corner.", "They can be borrowed for three weeks."], a: "They are on the second floor.", accept: ["They are on the second floor."], why: "錄音講 'the old magazines have been moved to the second floor'，其他選項都是把錄音其他細節混淆而成的干擾項。" }
      ]
    },
    {
      id: "ppx-l1-lostphone",
      level: 1,
      paper: "Paper 3 Part A",
      title: "Lost-and-found phone message",
      instructions: "You will hear a phone message from the school office. Listen and complete the notes. You have 30 seconds to look at the questions first.",
      transcript: "Hello, this is Daniel Ho from the Student Services Office. I am calling for Michelle Chan in Class 3A. Michelle, someone handed in your lost phone this morning, and you can collect it from our office. I am calling your home number because your phone is with us, of course.\n\nThe phone was found in the girls' changing room after the PE lesson on Tuesday. A cleaner, Mrs Fung, found it under a bench and brought it to us at about ten past eleven. The screen is not broken, but the back cover is scratched. I am sorry about that.\n\nYou can collect it any day this week between eight in the morning and four in the afternoon. Please come to Room 104, not Room 140 as it says on the school website. Room 104 is next to the photocopying room on the ground floor. You must bring your student card, because we cannot return valuable items without it. If you have lost your card, please see the office first and we will help you.\n\nOne more thing: a small silver key was found with the phone. It is in a brown envelope with your name on it. Please check that it is yours when you collect the phone.\n\nIf you cannot come this week, please call me on 2765 4310. The office is closed during the lunch hour, from twelve thirty to one thirty, so please do not come then. Thank you.",
      estimateSeconds: 104,
      questions: [
        { n: 1, q: "The phone was found in the ____.", a: "girls' changing room", accept: ["girls' changing room", "girls changing room", "changing room"], why: "錄音講「The phone was found in the girls' changing room after the PE lesson」。" },
        { n: 2, q: "The phone was found on ____.", a: "Tuesday", accept: ["Tuesday", "Tues"], why: "錄音講 'after the PE lesson on Tuesday'，答案是星期二。" },
        { n: 3, q: "Mrs Fung brought the phone to the office at about ____.", a: "11:10", accept: ["11:10", "11.10", "ten past eleven", "11:10 am"], why: "錄音講 'brought it to us at about ten past eleven'，即 11 時 10 分。" },
        { n: 4, q: "Michelle should collect the phone from Room ____.", a: "104", accept: ["104", "Room 104"], why: "錄音講 'Please come to Room 104, not Room 140'，140 是網站上的錯誤資料，是陷阱。" },
        { n: 5, q: "What is damaged on the phone?", a: "the back cover", accept: ["the back cover", "back cover", "the back cover is scratched"], why: "錄音講 'The screen is not broken, but the back cover is scratched'，螢幕沒有壞，只有機背花損。" },
        { n: 6, q: "Michelle must bring her ____ to collect the phone.", a: "student card", accept: ["student card", "school card", "student ID card"], why: "錄音講 'You must bring your student card, because we cannot return valuable items without it'。" },
        { n: 7, q: "What was found with the phone?", options: ["A silver key", "A brown wallet", "A student card", "A pair of glasses"], a: "A silver key", accept: ["A silver key"], why: "錄音講 'a small silver key was found with the phone'，它放在 'a brown envelope' 內，棕色的是信封，不是銀包。" },
        { n: 8, q: "The office is closed from ____ to ____.", a: "12:30 pm to 1:30 pm", accept: ["12:30 pm to 1:30 pm", "12:30 to 1:30", "12.30 to 1.30", "twelve thirty to one thirty"], why: "錄音講 'The office is closed during the lunch hour, from twelve thirty to one thirty'。" },
        { n: 9, q: "If Michelle cannot come this week, she should call ____.", a: "2765 4310", accept: ["2765 4310", "27654310", "2765-4310"], why: "錄音講 'please call me on 2765 4310'，這是 Daniel 的電話號碼。" },
        { n: 10, q: "Which sentence about collecting the phone is true?", options: ["Michelle can collect it any day this week between 8 a.m. and 4 p.m., but not during lunch.", "She can collect it only on Tuesday morning.", "She can collect it every day at lunchtime.", "She can collect it only after 4 p.m."], a: "Michelle can collect it any day this week between 8 a.m. and 4 p.m., but not during lunch.", accept: ["Michelle can collect it any day this week between 8 a.m. and 4 p.m., but not during lunch."], why: "錄音講 'You can collect it any day this week between eight in the morning and four in the afternoon'，又講 'The office is closed during the lunch hour'，所以午飯時間不能領取。" }
      ]
    },
    {
      id: "ppx-l2-chef",
      level: 2,
      paper: "Paper 3 Part A",
      title: "Radio interview with a young chef",
      instructions: "You will hear a radio interview with a young chef. Listen and answer the questions. You have 45 seconds to look at the questions first.",
      transcript: "Welcome back to Youth Voices on Radio Harbour. I am Anna Yuen, and today my guest is Marco Lee, who became head chef at a small restaurant in Sai Ying Pun at the age of twenty-three. Marco, welcome.\n\nThank you, Anna. It is good to be here.\n\nMost chefs train for years. How did you start?\n\nI studied business at university for a year, then I left. My mother was ill, and I began cooking for my family. After that, I worked for free in a noodle shop for eight months. I had planned to stay for three months, but the owner, Mr Cheung, taught me so much that I stayed longer. That is C-H-E-U-N-G. Then I worked in a hotel kitchen for two years.\n\nYour restaurant is called Little Lantern. Why?\n\nMy grandmother made paper lanterns. Every Mid-Autumn Festival, she hung one outside our door. We have thirty seats. I wanted forty, but the room is small. We change the menu every two weeks, and I enjoy that because I get bored easily.\n\nIs it expensive?\n\nDinner is about two hundred dollars a person. The set lunch is eighty-eight dollars, and students pay twenty per cent less with a student card. On Friday and Saturday nights we do not take bookings, so people sometimes wait forty minutes.\n\nWhat is the hardest part of the job?\n\nThe hours, definitely. I start at nine in the morning and finish at about midnight.\n\nWhat advice do you have for young cooks?\n\nLearn the basics first. Do not try to be creative before you can make a simple soup well.",
      estimateSeconds: 114,
      questions: [
        { n: 1, q: "Marco became head chef at the age of ____.", a: "23", accept: ["23", "twenty-three", "twenty three"], why: "錄音講 'who became head chef at a small restaurant in Sai Ying Pun at the age of twenty-three'，年齡是 23 歲。" },
        { n: 2, q: "At university, Marco studied ____.", a: "business", accept: ["business", "business studies"], why: "錄音講 'I studied business at university for a year, then I left'。" },
        { n: 3, q: "Marco worked without pay in a noodle shop for ____.", a: "eight months", accept: ["eight months", "8 months"], why: "錄音講 'I worked for free in a noodle shop for eight months'，並更正 'I had planned to stay for three months'，3 個月是原本計劃。" },
        { n: 4, q: "The noodle shop owner was called Mr ____.", a: "Cheung", accept: ["Cheung", "Mr Cheung"], why: "錄音講 'the owner, Mr Cheung, taught me so much'，並串出 'C-H-E-U-N-G'。" },
        { n: 5, q: "Marco's restaurant is called ____.", a: "Little Lantern", accept: ["Little Lantern", "Little Lantern Restaurant"], why: "主持講 'Your restaurant is called Little Lantern'，名字來自祖母做的紙燈籠。" },
        { n: 6, q: "The restaurant has ____ seats.", a: "30", accept: ["30", "thirty", "30 seats"], why: "錄音講 'We have thirty seats. I wanted forty, but the room is small'，40 個是他想要的數目，不是現有數目。" },
        { n: 7, q: "The menu changes every ____.", a: "two weeks", accept: ["two weeks", "2 weeks", "fortnight"], why: "錄音講 'We change the menu every two weeks'。" },
        { n: 8, q: "Dinner costs about ____ per person.", a: "$200", accept: ["$200", "200", "two hundred dollars", "200 dollars"], why: "錄音講 'Dinner is about two hundred dollars a person'。" },
        { n: 9, q: "The set lunch costs $88. How much do students pay with a student card?", options: ["$70.40", "$68.00", "$80.00", "$88.00"], a: "$70.40", accept: ["$70.40"], why: "錄音講 'The set lunch is eighty-eight dollars, and students pay twenty per cent less with a student card'，88 元減 20% 即 70.40 元。" },
        { n: 10, q: "What does Marco say is the hardest part of his job?", options: ["The long hours", "Buying fresh food", "Training new staff", "Paying the rent"], a: "The long hours", accept: ["The long hours"], why: "錄音講 'The hours, definitely. I start at nine in the morning and finish at about midnight'，其他選項都沒有提及。" }
      ]
    },
    {
      id: "ppx-l2-museum",
      level: 2,
      paper: "Paper 3 Part A",
      title: "Museum audio guide about a Hong Kong exhibition",
      instructions: "You will hear a museum audio guide. Listen and complete the notes. You have 45 seconds to look at the questions first.",
      transcript: "Welcome to the Hong Kong Design Museum. This audio guide is for our exhibition, Bamboo and Concrete: Homes of Old Hong Kong. It lasts about twelve minutes, and you can pause it at any time by pressing the red button.\n\nThe exhibition is in Gallery 3 on the first floor. Please take the stairs or the lift behind the ticket desk. Food and drink are not allowed inside the gallery, but you may leave your bottle in a locker near the entrance. Lockers are free, but you need a five-dollar coin, and you get the coin back when you open the locker.\n\nThe exhibition looks at homes in Hong Kong between 1950 and 1980. We have more than one hundred and twenty photographs. We planned to show two hundred, but some were too damaged to display. There are also forty small models made by students from a local secondary school.\n\nThe first section, Building the City, explains how bamboo scaffolding helped workers build tall buildings quickly. The second section, Living Together, contains a full-size reconstruction of a 1960s flat. It is only eighteen square metres, and it shows how a family of six lived in that space. The third section, Rooftop Life, looks at rooftop schools and gardens.\n\nThe interactive area on the second floor is closed for maintenance until the twentieth of April. However, we offer a free guided tour every Saturday at two thirty. There are only twenty-five places, so please sign up at the ticket desk thirty minutes before the tour starts.\n\nPhotography is allowed, but please do not use a flash or a tripod. The exhibition was planned to close on the thirty-first of May, but we have extended it to the thirtieth of June. Thank you for listening, and enjoy your visit.",
      estimateSeconds: 127,
      questions: [
        { n: 1, q: "Gallery 3 is on the ____ floor.", a: "first", accept: ["first", "1st", "first floor"], why: "錄音講 'The exhibition is in Gallery 3 on the first floor'。" },
        { n: 2, q: "The exhibition now closes on ____.", a: "30 June", accept: ["30 June", "June 30", "30/6", "the thirtieth of June"], why: "錄音講 'planned to close on the thirty-first of May, but we have extended it to the thirtieth of June'，5 月 31 日是原本日期，是陷阱。" },
        { n: 3, q: "The exhibition looks at Hong Kong homes between ____ and ____.", a: "1950 and 1980", accept: ["1950 and 1980", "1950-1980", "1950 to 1980"], why: "錄音講 'homes in Hong Kong between 1950 and 1980'。" },
        { n: 4, q: "There are more than ____ photographs in the exhibition.", a: "120", accept: ["120", "one hundred and twenty", "120 photographs"], why: "錄音講 'We have more than one hundred and twenty photographs'，並補充 'We planned to show two hundred'，200 是原本計劃。" },
        { n: 5, q: "The full-size flat is ____ square metres.", a: "18", accept: ["18", "eighteen", "18 square metres"], why: "錄音講 'It is only eighteen square metres'。" },
        { n: 6, q: "The flat shows how a family of ____ lived.", a: "six", accept: ["six", "6", "six people"], why: "錄音講 'it shows how a family of six lived in that space'。" },
        { n: 7, q: "The interactive area is closed until ____.", a: "20 April", accept: ["20 April", "April 20", "20/4", "the twentieth of April"], why: "錄音講 'The interactive area on the second floor is closed for maintenance until the twentieth of April'。" },
        { n: 8, q: "The free guided tour is every Saturday at ____.", a: "2:30 pm", accept: ["2:30 pm", "2:30", "2.30 pm", "two thirty"], why: "錄音講 'we offer a free guided tour every Saturday at two thirty'。" },
        { n: 9, q: "How can visitors join the free guided tour?", options: ["Sign up at the ticket desk 30 minutes before the tour.", "Book online at least one week before.", "Pay $25 at the entrance.", "Wait at the main entrance for a guide."], a: "Sign up at the ticket desk 30 minutes before the tour.", accept: ["Sign up at the ticket desk 30 minutes before the tour."], why: "錄音講 'There are only twenty-five places, so please sign up at the ticket desk thirty minutes before the tour starts'，25 是名額，不是收費。" },
        { n: 10, q: "What does the guide say about photography?", options: ["Visitors may take photos without a flash.", "Visitors must not take any photos.", "Visitors must pay a photography fee.", "Visitors may use a tripod only in Gallery 3."], a: "Visitors may take photos without a flash.", accept: ["Visitors may take photos without a flash."], why: "錄音講 'Photography is allowed, but please do not use a flash or a tripod'，所以可以拍照，但不可用閃光燈或腳架。" }
      ]
    }
  ],
  integrated: [
    {
      id: "ppx-int-l1-readingday",
      level: 1,
      paper: "Paper 3 Part B",
      title: "Reading Day helpers email",
      situation: "You are Mandy Tse, secretary of the Reading Ambassadors Club at Evergreen Secondary School. The club will help at a Reading Day at Fairview Primary School. The teacher adviser has asked you to email all club members with the details and ask for helpers.",
      task: "Write an email to all Reading Ambassadors Club members about the Reading Day. Use the information in the data file. Do not include any information that is not needed.",
      role: "Mandy Tse, secretary of the Reading Ambassadors Club",
      audience: "Reading Ambassadors Club members",
      dataFile: [
        { heading: "Event details", points: ["Saturday, 18 April", "9:30 a.m. to 12:00 p.m.", "Fairview Primary School", "Meet at the school gate at 8:45 a.m.", "A school bus will take the group there"] },
        { heading: "What helpers will do", points: ["Read stories to Primary 1 to Primary 3 students in small groups", "Help at the book swap table", "Set up chairs before 9:15 a.m.", "The primary school teachers will choose the books"] },
        { heading: "What to bring", points: ["Your club T-shirt", "A bottle of water", "Storybooks will be provided", "The school will provide snacks, so a packed lunch is not needed"] },
        { heading: "Signing up", points: ["12 helpers needed", "Sign up on the club noticeboard", "Deadline: Wednesday, 8 April", "Training session: Thursday, 16 April, 4:00 p.m., Room 12", "All helpers must attend the training session"] },
        { heading: "Club news", points: ["Last year's Reading Day was cancelled because of heavy rain.", "The club now has 35 members.", "The next club meeting is in May."] }
      ],
      requirements: [
        "State the date, time, venue and meeting arrangements.",
        "Explain at least two jobs that helpers will do.",
        "Say what helpers should bring and what will be provided.",
        "Explain how to sign up, give the deadline and say how many helpers are needed.",
        "Mention the training session and say that attendance is required.",
        "Do not mention last year's Reading Day or any other Club news."
      ],
      model: "Dear Club Members,\n\nI am writing to ask for helpers for our Reading Day at Fairview Primary School on Saturday, 18 April. The event runs from 9:30 a.m. to 12:00 p.m. We will meet at our school gate at 8:45 a.m., and a school bus will take us there.\n\nHelpers will read stories to Primary 1 to Primary 3 students in small groups. You will also help at the book swap table and set up chairs before 9:15 a.m. You do not need to prepare any lessons, as the teachers at Fairview will choose the books.\n\nPlease wear your club T-shirt and bring a bottle of water. Storybooks will be provided, and the school will give us snacks, so you do not need to bring a packed lunch.\n\nWe need 12 helpers. If you would like to join, please sign up on the club noticeboard by Wednesday, 8 April. All helpers must attend a training session on Thursday, 16 April at 4:00 p.m. in Room 12.\n\nThis is a wonderful chance to share our love of reading with younger students. I hope you will join us.\n\nBest regards,\nMandy Tse\nSecretary, Reading Ambassadors Club",
      checklist: [
        "有稱呼、結尾和簽名，電郵格式正確",
        "已寫出 4 月 18 日、上午 9 時 30 分至中午 12 時及 Fairview Primary School",
        "已寫出上午 8 時 45 分在學校大門集合，並有校車接送",
        "已列出至少兩項工作，例如講故事、協助書本交換攤位、排椅子",
        "已說明要穿學會 T 恤、帶水，並由學校提供故事書和小食",
        "已寫出需要 12 名助手、4 月 8 日截止及在學會佈告板報名",
        "已提及 4 月 16 日下午 4 時在 12 號室的訓練，並說明必須出席",
        "沒有提及去年閱讀日因大雨取消，也沒有寫其他學會消息"
      ]
    },
    {
      id: "ppx-int-l2-recycling",
      level: 2,
      paper: "Paper 3 Part B",
      title: "Report on the school recycling programme",
      situation: "You are Jason Kwok, chairperson of the Environmental Committee at North Point Secondary School. The committee surveyed students about the school recycling programme. The Principal has asked for a short report on the findings and the committee's recommendations.",
      task: "Write a report for the Principal about the school recycling programme. Use the information in the data file. Do not include any information that is not needed.",
      role: "Jason Kwok, chairperson of the Environmental Committee",
      audience: "The Principal",
      dataFile: [
        { heading: "About the survey", points: ["240 students from Form 1 to Form 5", "Online questionnaire from 3 to 7 November", "226 completed responses"] },
        { heading: "Main findings", points: ["71% say the recycling bins are often full", "58% do not know which bin to use", "46% would like a recycling workshop", "Only 19% think the programme is working well"] },
        { heading: "Current arrangements", points: ["Six recycling bins around the school", "Paper and plastic only", "Collected every Tuesday and Friday", "The bins near the tuck shop often contain food waste", "The recycling room was opened by the previous principal before the current students joined the school."] },
        { heading: "Student comments", points: ["'The labels are too small.' (Form 1 student)", "'There is no bin on the top floor.' (Form 4 student)", "'The bins smell bad in summer.' (Form 3 student)"] },
        { heading: "Committee recommendations", points: ["Add four bins, including one on the top floor", "Use clear picture labels", "Hold a recycling workshop in January", "Start a clean-bin monitor scheme"] }
      ],
      requirements: [
        "State the purpose of the report and how the survey was carried out.",
        "Summarise at least three findings with figures.",
        "Include one student comment.",
        "Describe one current arrangement that helps explain a problem.",
        "Make three recommendations.",
        "Do not mention the previous principal or when the recycling room opened."
      ],
      model: "To: The Principal\nFrom: Jason Kwok, Chairperson, Environmental Committee\nTitle: Report on the School Recycling Programme\n\nIntroduction\nThis report presents the findings of a survey on the school recycling programme and recommends ways to improve it. The Environmental Committee surveyed 240 students from Form 1 to Form 5 through an online questionnaire between 3 and 7 November. We received 226 completed responses.\n\nFindings\n71% of students say the recycling bins are often full, and 58% do not know which bin to use. 46% would like a recycling workshop, while only 19% think the programme is working well.\n\nOne Form 1 student commented, 'The labels are too small.' Another student said, 'There is no bin on the top floor.'\n\nThe school has six recycling bins and collects paper and plastic every Tuesday and Friday. However, the bins near the tuck shop often contain food waste, which means useful materials cannot be recycled.\n\nRecommendations\n1. Add four bins, including one on the top floor.\n2. Replace the small labels with clear picture labels.\n3. Hold a recycling workshop in January.\n4. Start a clean-bin monitor scheme, with students checking the bins each week.\n\nWe believe these measures will make the programme easier to use and more successful.\n\nJason Kwok\nChairperson, Environmental Committee",
      checklist: [
        "有報告格式：收件人、發件人、標題",
        "引言已說明報告目的、調查對象、方式、日期和回應數目",
        "已列出至少三項調查結果，並附百分比",
        "已引用至少一位學生的意見",
        "已用現行安排解釋問題，例如六個回收箱、星期二及五收集、小食部附近混入廚餘",
        "已寫出三項或以上建議，並與調查結果呼應",
        "沒有提及前任校長或回收室何時啟用",
        "語氣正式客觀，標題和段落清楚"
      ]
    }
  ]
};
