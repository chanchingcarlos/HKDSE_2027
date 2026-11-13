window.DSE_PP_LISTENING = {
  tasks: [
    {
      id: "pp-l1-sportsday",
      level: 1,
      paper: "Paper 3 Part A",
      title: "School Sports Day announcement",
      instructions: "You will hear a school announcement about Sports Day. Listen and answer the questions. You have 30 seconds to look at the questions first.",
      transcript: "Good morning, everyone. This is Mr Chan from the PE Department with an important announcement about Sports Day. Sports Day will be held on Friday, the twelfth of March this year. That is the second Friday of the month, not the first Friday as we said last week. Please write the new date in your student handbook. The event will take place at the Happy Valley Sports Ground. Buses will leave school at eight fifteen in the morning, so please arrive at the school gate by eight o'clock. Do not be late, because the buses will not wait for anyone. Students must wear their house colours: red, blue, green or yellow. If you do not have a house T-shirt, you can buy one from the school office. The normal price is sixty dollars, but if you pay before Friday, you only need to pay forty-five dollars. Lunch will not be provided. Please bring your own water bottle and a packed lunch. There is a small shop at the ground, but the queues are very long. Finally, the deadline for signing up for the one-hundred-metre race is next Wednesday. The long jump and the relay are already full. Thank you.",
      estimateSeconds: 85,
      questions: [
        { n: 1, q: "Sports Day will be held on ____.", a: "12 March", accept: ["12 March", "March 12", "12/3", "the twelfth of March"], why: "錄音講 'on Friday, the twelfth of March this year'，所以答案是 12 March。" },
        { n: 2, q: "Sports Day is on which day of the week?", a: "Friday", accept: ["Friday", "Fri"], why: "錄音一開始已講 'on Friday, the twelfth of March'，清楚指出是星期五。" },
        { n: 3, q: "The event will take place at the ____.", a: "Happy Valley Sports Ground", accept: ["Happy Valley Sports Ground", "Happy Valley"], why: "錄音講 'The event will take place at the Happy Valley Sports Ground'。" },
        { n: 4, q: "Buses will leave school at ____.", a: "8:15", accept: ["8:15", "8.15", "eight fifteen", "8:15 a.m."], why: "錄音講 'Buses will leave school at eight fifteen in the morning'，不是八點。" },
        { n: 5, q: "Students should arrive at the school gate by ____.", a: "8:00", accept: ["8:00", "8.00", "eight o'clock", "8 a.m."], why: "錄音講 'please arrive at the school gate by eight o'clock'，這是集合時間，不是開車時間。" },
        { n: 6, q: "A house T-shirt costs ____ if students pay before Friday.", a: "$45", accept: ["$45", "45", "forty-five dollars", "45 dollars"], why: "錄音講 'The normal price is sixty dollars, but if you pay before Friday, you only need to pay forty-five dollars'，所以是優惠價 45 元。" },
        { n: 7, q: "What two things should students bring? ____ and ____.", a: "a water bottle and a packed lunch", accept: ["a water bottle and a packed lunch", "water bottle and packed lunch", "water bottle and lunch"], why: "錄音講 'Please bring your own water bottle and a packed lunch'，因為午餐不會提供。" },
        { n: 8, q: "The deadline for joining the 100-metre race is ____.", a: "next Wednesday", accept: ["next Wednesday", "Wednesday"], why: "錄音最後講 'the deadline for signing up for the one-hundred-metre race is next Wednesday'。" },
        { n: 9, q: "Which event can students still sign up for?", options: ["The 100-metre race", "The long jump", "The relay", "The high jump"], a: "The 100-metre race", accept: ["The 100-metre race"], why: "錄音講 'The long jump and the relay are already full'，而 100 米賽跑仍可報名，所以選第一項。'high jump' 完全沒有提及，是干擾項。" },
        { n: 10, q: "What does Mr Chan say about lunch?", options: ["The school will provide lunch.", "Students should bring a packed lunch.", "The shop sells free lunches.", "Lunch will be at twelve o'clock."], a: "Students should bring a packed lunch.", accept: ["Students should bring a packed lunch."], why: "錄音講 'Lunch will not be provided. Please bring your own water bottle and a packed lunch'，否定句是關鍵。" }
      ]
    },
    {
      id: "pp-l1-phone",
      level: 1,
      paper: "Paper 3 Part A",
      title: "Phone message about a museum visit",
      instructions: "You will hear a phone message from a teacher. Listen and complete the notes. You have 30 seconds to look at the questions first.",
      transcript: "Hello, this is Miss Wong calling for Jason. Sorry I missed you. This is about the Science Museum visit next Tuesday. Please note that the meeting point has changed. We will not meet at the school hall. We will meet outside the main library at nine o'clock, and the coach will pick us up there at nine fifteen. The coach cannot stop on Nathan Road, so please do not wait at the school gate. Your group leader is a student from Class 5B. Her name is Chloe Tam. That is T-A-M, Tam. She will give you your worksheet and a name badge. If you have any questions, her phone number is nine eight seven six, five four three two. That is 9876 5432. Please bring a pencil case and a jacket, because the air-conditioning in the museum is very cold. You do not need to bring lunch, as the museum café will provide a sandwich and a drink for every student. However, you must bring ten dollars for the lockers. Also, the museum shop will be open, but please do not buy any food there. One more thing: the permission form must be returned to me by this Friday. If I do not receive it, you cannot join the trip. Thank you, and please call me back.",
      estimateSeconds: 95,
      questions: [
        { n: 1, q: "The museum visit is on ____.", a: "next Tuesday", accept: ["next Tuesday", "Tuesday"], why: "錄音講 'This is about the Science Museum visit next Tuesday'，一開始已交代日期。" },
        { n: 2, q: "The group will meet outside the ____.", a: "main library", accept: ["main library", "library", "outside the main library"], why: "錄音講 'We will meet outside the main library at nine o'clock'，並強調 'We will not meet at the school hall'。" },
        { n: 3, q: "The coach will pick the group up at ____.", a: "9:15", accept: ["9:15", "9.15", "nine fifteen", "9:15 a.m."], why: "錄音講 'the coach will pick us up there at nine fifteen'，九點是集合時間，九點十五分才是上車時間。" },
        { n: 4, q: "The group leader's full name is ____.", a: "Chloe Tam", accept: ["Chloe Tam", "Tam Chloe"], why: "錄音講 'Her name is Chloe Tam. That is T-A-M, Tam'，姓氏串法要小心。" },
        { n: 5, q: "The group leader's phone number is ____.", a: "9876 5432", accept: ["9876 5432", "98765432", "9876-5432"], why: "錄音逐個數字讀出 'nine eight seven six, five four three two. That is 9876 5432'。" },
        { n: 6, q: "Students must bring a pencil case and a ____.", a: "jacket", accept: ["jacket", "a jacket"], why: "錄音講 'Please bring a pencil case and a jacket, because the air-conditioning in the museum is very cold'。" },
        { n: 7, q: "Students should bring ____ for the lockers.", a: "$10", accept: ["$10", "10", "ten dollars", "10 dollars"], why: "錄音講 'you must bring ten dollars for the lockers'，午餐免費，但儲物櫃要收費。" },
        { n: 8, q: "What will the museum café provide?", options: ["Nothing at all", "A sandwich and a drink", "Only a drink", "Lunch money"], a: "A sandwich and a drink", accept: ["A sandwich and a drink"], why: "錄音講 'the museum café will provide a sandwich and a drink for every student'，所以選第二項。" },
        { n: 9, q: "What must students do by Friday?", options: ["Pay for the trip", "Return the permission form", "Buy a worksheet", "Call Chloe Tam"], a: "Return the permission form", accept: ["Return the permission form"], why: "錄音講 'the permission form must be returned to me by this Friday'，其他選項都是干擾。" }
      ]
    },
    {
      id: "pp-l1-swimclub",
      level: 1,
      paper: "Paper 3 Part A",
      title: "Swimming club term notice",
      instructions: "You will hear a notice from a swimming coach. Listen and complete the table. You have 30 seconds to look at the questions first.",
      transcript: "Good afternoon, swimmers. This is Coach Daniel speaking with a notice for the new term. First, the training times have changed. From next month, the junior group will train on Wednesday and Saturday, not on Tuesday as before. Wednesday sessions start at five thirty in the afternoon, and Saturday sessions start at nine in the morning. Each session lasts one hour and fifteen minutes. Second, the pool will be closed for cleaning from the third to the fifth of April. There will be no training on those three days. We will add one extra session on Sunday, the sixth of April, at ten in the morning to make up for it. Third, the club competition is on the twenty-fourth of May. The fee is one hundred and twenty dollars, and that includes a club T-shirt and a light snack. Please pay at the office before the fifteenth of May. If you pay after that date, the fee goes up to one hundred and fifty dollars. Finally, please remember to bring your own goggles and a towel. The club can lend you a swimming cap, but we do not lend goggles for hygiene reasons. That is all. See you in the pool.",
      estimateSeconds: 85,
      questions: [
        { n: 1, q: "From next month, the junior group will train on ____ and ____.", a: "Wednesday and Saturday", accept: ["Wednesday and Saturday", "Saturday and Wednesday"], why: "錄音講 'the junior group will train on Wednesday and Saturday, not on Tuesday as before'，星期二已被取消。" },
        { n: 2, q: "Wednesday sessions start at ____.", a: "5:30 pm", accept: ["5:30 pm", "5:30", "5.30 pm", "five thirty"], why: "錄音講 'Wednesday sessions start at five thirty in the afternoon'。" },
        { n: 3, q: "Saturday sessions start at ____.", a: "9:00 am", accept: ["9:00 am", "9:00", "9 am", "nine in the morning"], why: "錄音講 'Saturday sessions start at nine in the morning'，不要與星期三的時間混淆。" },
        { n: 4, q: "Each session lasts ____.", a: "one hour and fifteen minutes", accept: ["one hour and fifteen minutes", "1 hour 15 minutes", "75 minutes", "an hour and fifteen minutes"], why: "錄音講 'Each session lasts one hour and fifteen minutes'，即 75 分鐘。" },
        { n: 5, q: "The pool will be closed from ____ to ____.", a: "3 April to 5 April", accept: ["3 April to 5 April", "3-5 April", "the third to the fifth of April", "April 3 to April 5"], why: "錄音講 'the pool will be closed for cleaning from the third to the fifth of April'。" },
        { n: 6, q: "The extra session is on ____.", a: "Sunday, 6 April", accept: ["Sunday, 6 April", "6 April", "Sunday 6 April", "the sixth of April"], why: "錄音講 'We will add one extra session on Sunday, the sixth of April, at ten in the morning'。" },
        { n: 7, q: "The club competition is on ____.", a: "24 May", accept: ["24 May", "May 24", "24/5", "the twenty-fourth of May"], why: "錄音講 'the club competition is on the twenty-fourth of May'。" },
        { n: 8, q: "Students pay ____ if they pay before 15 May.", a: "$120", accept: ["$120", "120", "one hundred and twenty dollars", "120 dollars"], why: "錄音講 'The fee is one hundred and twenty dollars'，並提醒 'Please pay at the office before the fifteenth of May'。" },
        { n: 9, q: "What can the club lend to swimmers?", options: ["Goggles", "Towels", "Swimming caps", "Nothing"], a: "Swimming caps", accept: ["Swimming caps"], why: "錄音講 'The club can lend you a swimming cap, but we do not lend goggles'，所以帽子可以借，泳鏡不可以。" },
        { n: 10, q: "What happens if a student pays after 15 May?", options: ["They cannot join the competition.", "The fee becomes $150.", "They get two T-shirts.", "They must pay at the pool."], a: "The fee becomes $150.", accept: ["The fee becomes $150."], why: "錄音講 'If you pay after that date, the fee goes up to one hundred and fifty dollars'。" }
      ]
    },
    {
      id: "pp-l2-radio",
      level: 2,
      paper: "Paper 3 Part A",
      title: "Radio interview with a food app founder",
      instructions: "You will hear a radio interview. Listen and answer the questions. You have 45 seconds to look at the questions first.",
      transcript: "Host: Welcome back to Hong Kong Today. My guest this morning is Jamie Liu, the founder of a small app called ShareaMeal. Jamie, welcome. Guest: Thank you for having me, Anna. Host: So, what exactly does your app do? Guest: It connects restaurants with people who want to buy good food at the end of the day. Restaurants often throw away food that is still safe to eat. We sell it at a big discount, usually half price, and the customer collects it between nine and ten at night. Host: How did you start? Guest: I was a student at City University. In my final year, I did a project on food waste. I interviewed forty restaurant owners, well, thirty-eight in the end, because two of them closed before we met. Almost all of them said they hated throwing food away. Host: And how many restaurants are with you now? Guest: We started with six restaurants in Sham Shui Po in March last year. Now we have one hundred and forty across Hong Kong. We had planned to reach two hundred by December, but we changed that target to one hundred and eighty, because we want to check every restaurant carefully before we add it. Host: What is the biggest problem? Guest: Trust, honestly. Some customers think the food is old. So we now put the cooking time on every order. Since we added that, our complaints have fallen by about sixty per cent. Host: And what is next? Guest: A school programme. We want students to visit restaurants and learn how food is prepared. The first workshop is on Saturday, the eighteenth of October, not the eleventh, as we first announced. It is free for secondary school students. Host: Thank you, Jamie.",
      estimateSeconds: 125,
      questions: [
        { n: 1, q: "The app is called ____.", a: "ShareaMeal", accept: ["ShareaMeal", "Share a Meal", "Sharea Meal"], why: "主持講 'a small app called ShareaMeal'，名字是兩個字連在一起。" },
        { n: 2, q: "Restaurants usually sell their food at ____.", a: "half price", accept: ["half price", "50% off", "half the price"], why: "嘉賓講 'We sell it at a big discount, usually half price'，即半價。" },
        { n: 3, q: "Customers collect their food between ____ and ____.", a: "9 pm and 10 pm", accept: ["9 pm and 10 pm", "9 and 10 pm", "9:00 pm and 10:00 pm", "nine and ten"], why: "嘉賓講 'the customer collects it between nine and ten at night'，答案是晚上九時至十時。" },
        { n: 4, q: "Jamie interviewed ____ restaurant owners.", a: "38", accept: ["38", "thirty-eight", "38 owners"], why: "嘉賓先講 'forty restaurant owners'，隨即更正 'well, thirty-eight in the end, because two of them closed'，所以要填 38。" },
        { n: 5, q: "The app now works with ____ restaurants.", a: "140", accept: ["140", "one hundred and forty", "140 restaurants"], why: "嘉賓講 'Now we have one hundred and forty across Hong Kong'。" },
        { n: 6, q: "The new target for December is ____ restaurants.", a: "180", accept: ["180", "one hundred and eighty", "180 restaurants"], why: "嘉賓講 'We had planned to reach two hundred by December, but we changed that target to one hundred and eighty'，200 是舊目標，是陷阱。" },
        { n: 7, q: "Complaints have fallen because the app now shows the ____ on every order.", a: "cooking time", accept: ["cooking time", "cooking times", "time the food was cooked"], why: "嘉賓講 'we now put the cooking time on every order. Since we added that, our complaints have fallen'。" },
        { n: 8, q: "The first workshop is on Saturday, ____.", a: "18 October", accept: ["18 October", "October 18", "18/10", "the eighteenth of October"], why: "嘉賓講 'The first workshop is on Saturday, the eighteenth of October, not the eleventh'，11 號是舊資料。" },
        { n: 9, q: "Who can join the workshop for free?", options: ["All restaurant owners", "Secondary school students", "University students", "Only app customers"], a: "Secondary school students", accept: ["Secondary school students"], why: "嘉賓講 'It is free for secondary school students'，其他對象都沒有提及。" },
        { n: 10, q: "What is the biggest problem for the app?", options: ["Finding restaurants to join", "Some customers think the food is old", "The price of the food", "Too few students"], a: "Some customers think the food is old", accept: ["Some customers think the food is old"], why: "嘉賓講 'Trust, honestly. Some customers think the food is old'，之後才講補救方法。" }
      ]
    },
    {
      id: "pp-l2-museum",
      level: 2,
      paper: "Paper 3 Part A",
      title: "Guided tour of a heritage museum",
      instructions: "You will hear a museum guide. Listen and complete the notes. You have 45 seconds to look at the questions first.",
      transcript: "Good afternoon, ladies and gentlemen, and welcome to the Hong Kong Coastal Heritage Museum. My name is Ryan, and I will be your guide for the next hour. Before we begin, a few practical points. The tour normally starts at two o'clock, but today we are starting fifteen minutes late, at a quarter past two, because the upper floor was very busy this morning. We will still finish by four o'clock. Photography is allowed in most of the galleries, but please do not use a flash in the room with the old maps. The light can damage the paper. We will visit three galleries. First, the fishing village gallery, where you can see a full-size model of a wooden boat. Second, the trade gallery, which explains how salt was made and sold. The third stop would be the family life gallery on the second floor, but I am afraid it is closed today for repairs. We will spend more time in the trade gallery instead, and you can visit the family life gallery free of charge next month if you keep your ticket. The tour is included in your entrance ticket, so you do not need to pay extra. However, the special exhibition on tea is not included. Tickets for that exhibition cost forty dollars, but groups of five or more pay only thirty dollars each. If you would like to join, please tell me before three thirty. Finally, the museum café is on the ground floor, next to the shop. It closes at five, and the last order is at four thirty. Are there any questions before we set off?",
      estimateSeconds: 115,
      questions: [
        { n: 1, q: "Today's tour starts at ____.", a: "2:15 pm", accept: ["2:15 pm", "2:15", "2.15 pm", "a quarter past two"], why: "導遊講 'The tour normally starts at two o'clock, but today we are starting fifteen minutes late, at a quarter past two'，所以是 2:15。" },
        { n: 2, q: "The tour will finish by ____.", a: "4:00 pm", accept: ["4:00 pm", "4:00", "4 pm", "four o'clock"], why: "導遊講 'We will still finish by four o'clock'，即使遲了開始，結束時間不變。" },
        { n: 3, q: "Visitors must not use a flash in the room with the ____.", a: "old maps", accept: ["old maps", "maps", "old map"], why: "導遊講 'please do not use a flash in the room with the old maps. The light can damage the paper'。" },
        { n: 4, q: "Which gallery is closed today?", a: "the family life gallery", accept: ["the family life gallery", "family life gallery", "the family gallery"], why: "導遊講 'the family life gallery on the second floor, but I am afraid it is closed today for repairs'。" },
        { n: 5, q: "Visitors can visit that gallery free next month if they keep their ____.", a: "ticket", accept: ["ticket", "entrance ticket"], why: "導遊講 'you can visit the family life gallery free of charge next month if you keep your ticket'。" },
        { n: 6, q: "The special exhibition is about ____.", a: "tea", accept: ["tea", "the history of tea"], why: "導遊講 'the special exhibition on tea is not included'，主題是茶。" },
        { n: 7, q: "Groups of five or more pay ____ each for the special exhibition.", a: "$30", accept: ["$30", "30", "thirty dollars", "30 dollars"], why: "導遊講 'Tickets for that exhibition cost forty dollars, but groups of five or more pay only thirty dollars each'，40 元是個人票價，是陷阱。" },
        { n: 8, q: "Visitors should tell the guide before ____ if they want to join the exhibition.", a: "3:30 pm", accept: ["3:30 pm", "3:30", "3.30 pm", "three thirty"], why: "導遊講 'If you would like to join, please tell me before three thirty'。" },
        { n: 9, q: "What is included in the entrance ticket?", options: ["The special exhibition", "The guided tour", "The museum café", "The museum shop"], a: "The guided tour", accept: ["The guided tour"], why: "導遊講 'The tour is included in your entrance ticket, so you do not need to pay extra'，而茶展 'is not included'。" },
        { n: 10, q: "When does the museum café close?", options: ["4:30 pm", "5:00 pm", "3:30 pm", "6:00 pm"], a: "5:00 pm", accept: ["5:00 pm"], why: "導遊講 'It closes at five, and the last order is at four thirty'，4:30 是最後點餐時間，不是關門時間。" }
      ]
    },
    {
      id: "pp-l2-news",
      level: 2,
      paper: "Paper 3 Part A",
      title: "News report on a new night bus route",
      instructions: "You will hear a news report. Listen and answer the questions. You have 45 seconds to look at the questions first.",
      transcript: "Good evening. You are listening to the six o'clock news on Radio Harbour. Our top story tonight is the new night bus service in the New Territories. The route, number N42, will begin operating on the first of September. It will run between Yuen Long and Tsuen Wan every night, from eleven in the evening until five in the morning. The bus will come every thirty minutes, not every twenty minutes as the Transport Department first suggested, because there are not enough drivers. A single journey will cost eighteen dollars. Passengers who use an Octopus card will pay fourteen dollars, and students will pay seven dollars after midnight. The route was tested for six weeks, not two months as originally planned. During the test, about nine hundred passengers used the service each night. The department had expected six hundred. Mr Raymond Kwok, the chairman of the residents' association in Yuen Long, welcomed the new service. He said that many people who work in Tsuen Wan finish late and cannot afford a taxi. However, he added that the bus should also stop near the hospital. A spokeswoman for the department, Ms Elaine Chiu, said the results were encouraging. She said the department will review the route after one year. If passenger numbers remain high, it may add a second route between Tuen Mun and Kwai Fong. In other news, the public library in Sha Tin will close early tomorrow for staff training. And now, the weather.",
      estimateSeconds: 105,
      questions: [
        { n: 1, q: "The new bus route is number ____.", a: "N42", accept: ["N42", "n42", "N 42"], why: "報道講 'The route, number N42, will begin operating'。" },
        { n: 2, q: "The service will begin on ____.", a: "1 September", accept: ["1 September", "September 1", "1/9", "the first of September"], why: "報道講 'will begin operating on the first of September'。" },
        { n: 3, q: "The route runs between Yuen Long and ____.", a: "Tsuen Wan", accept: ["Tsuen Wan", "TsuenWan"], why: "報道講 'It will run between Yuen Long and Tsuen Wan every night'。" },
        { n: 4, q: "The bus will come every ____ minutes.", a: "30", accept: ["30", "thirty", "30 minutes"], why: "報道講 'The bus will come every thirty minutes, not every twenty minutes as the Transport Department first suggested'，20 分鐘是舊建議。" },
        { n: 5, q: "A single journey costs ____.", a: "$18", accept: ["$18", "18", "eighteen dollars", "18 dollars"], why: "報道講 'A single journey will cost eighteen dollars'。" },
        { n: 6, q: "Passengers using an Octopus card pay ____.", a: "$14", accept: ["$14", "14", "fourteen dollars", "14 dollars"], why: "報道講 'Passengers who use an Octopus card will pay fourteen dollars'，與現金票價不同。" },
        { n: 7, q: "The route was tested for ____.", a: "six weeks", accept: ["six weeks", "6 weeks"], why: "報道講 'The route was tested for six weeks, not two months as originally planned'，兩個月是原本計劃，是陷阱。" },
        { n: 8, q: "About ____ passengers used the service each night during the test.", a: "900", accept: ["900", "nine hundred", "about 900"], why: "報道講 'about nine hundred passengers used the service each night'，而政府原本預計六百人。" },
        { n: 9, q: "What does Mr Kwok want the department to do?", options: ["Lower the fare", "Add a stop near the hospital", "Hire more drivers", "Start a second route"], a: "Add a stop near the hospital", accept: ["Add a stop near the hospital"], why: "報道講 'he added that the bus should also stop near the hospital'，其他建議都是報道後段由部門提出或沒有提及。" },
        { n: 10, q: "What will the department do after one year?", options: ["Close the route", "Review the route", "Raise the fare", "Buy more buses"], a: "Review the route", accept: ["Review the route"], why: "報道講 'the department will review the route after one year'，之後才講可能加開第二條路線。" }
      ]
    }
  ],
  integrated: [
    {
      id: "pp-int-l1-email",
      level: 1,
      paper: "Paper 3 Part B",
      title: "Beach clean-up email",
      situation: "You are Chris Wong, the secretary of the Green Club at Maplewood Secondary School. The club is holding a beach clean-up next month. Your teacher has asked you to send an email to all club members with the details.",
      task: "Write an email to all Green Club members about the beach clean-up. Use the information in the data file. Do not include any information that is not needed.",
      role: "Chris Wong, secretary of the Green Club",
      audience: "Green Club members",
      dataFile: [
        { heading: "Event details", points: ["Date: Saturday, 8 November", "Time: 9:00 a.m. to 12:30 p.m.", "Meeting point: outside the school gym", "Beach: Silver Bay Beach", "The club's last clean-up was in September, when 40 members joined."] },
        { heading: "What to bring", points: ["A hat and sunscreen", "A reusable water bottle", "Comfortable shoes", "The club will provide gloves and rubbish bags"] },
        { heading: "Cost and deadline", points: ["$20 per member for the bus", "Pay at the school office by Wednesday, 5 November", "No payment on the day"] },
        { heading: "After the clean-up", points: ["Free lunch at the beach café from 12:45 p.m.", "A certificate for every volunteer", "A group photo on the beach at 12:30 p.m."] }
      ],
      requirements: [
        "State the date, time, meeting point and name of the beach.",
        "Tell members at least two things they should bring.",
        "Explain the cost and the payment deadline.",
        "Mention what members will get after the clean-up.",
        "End with a polite closing and your name and role.",
        "Do not mention the September clean-up or other irrelevant details."
      ],
      model: "Dear Green Club members,\n\nI am writing to invite you to our beach clean-up at Silver Bay Beach on Saturday, 8 November. We will meet outside the school gym at 9:00 a.m. and finish at 12:30 p.m.\n\nPlease bring a hat, sunscreen, a reusable water bottle and comfortable shoes. The club will provide gloves and rubbish bags, so you do not need to buy anything.\n\nThe bus costs $20 per member. Please pay at the school office by Wednesday, 5 November. We cannot take payment on the day, so remember to pay early.\n\nAfter the clean-up, we will have a free lunch at the beach café from 12:45 p.m. Every volunteer will also receive a certificate.\n\nThis is a great chance to help the environment and meet other members. Thank you for your support, and I hope to see you at Silver Bay Beach on 8 November.\n\nBest regards,\nChris Wong\nSecretary, Green Club",
      checklist: [
        "第一段有清楚主旨，說明寫信目的",
        "已寫出日期、時間、集合地點和沙灘名稱",
        "已列出至少兩樣要帶的物品",
        "已說明車費 $20 及 11 月 5 日或之前在校務處繳費",
        "已提及免費午餐和證書",
        "沒有提及九月那次清潔活動等無關資料",
        "有稱呼、結尾和簽名，格式正確",
        "語氣友善，指示清楚，沒有抄寫整段資料"
      ]
    },
    {
      id: "pp-int-l1-notice",
      level: 1,
      paper: "Paper 3 Part B",
      title: "Library study skills workshop notice",
      situation: "You are Kelly Lam, a library assistant at Riverside Community Library. The library is running a free study skills workshop for secondary school students. Your manager has asked you to write a notice to put on the library noticeboard.",
      task: "Write a notice about the study skills workshop for secondary school students. Use the information in the data file. Do not include any information that is not needed.",
      role: "Kelly Lam, library assistant",
      audience: "Secondary school students who use the library",
      dataFile: [
        { heading: "Workshop details", points: ["Saturday, 22 March", "10:00 a.m. to 12:00 p.m.", "Activity Room 2, Riverside Community Library", "For secondary school students only", "The workshop will be held in English"] },
        { heading: "What you will learn", points: ["How to make a study timetable", "How to take notes quickly", "How to remember new words", "The tutor, Miss Cheng, has ten years of experience."] },
        { heading: "What to bring", points: ["A notebook and two pens", "One past test paper from any subject", "A reusable bag for handouts"] },
        { heading: "Signing up", points: ["Free of charge, but only 20 places", "Places are given on a first-come, first-served basis", "Call 2345 6789 or ask at the front desk", "Deadline: Friday, 14 March", "A certificate for every participant"] }
      ],
      requirements: [
        "Give the workshop date, time and place.",
        "Say who the workshop is for.",
        "List at least two skills students will learn.",
        "Say what students should bring.",
        "Explain how to sign up, give the deadline, and say that it is free with limited places.",
        "Do not mention Miss Cheng's experience."
      ],
      model: "FREE STUDY SKILLS WORKSHOP\n\nDo you want to study better and remember more? Come to our free study skills workshop!\n\nDate: Saturday, 22 March\nTime: 10:00 a.m. to 12:00 p.m.\nPlace: Activity Room 2, Riverside Community Library\n\nThe workshop is for secondary school students only, and it will be held in English. You will learn how to make a study timetable, how to take notes quickly and how to remember new words.\n\nPlease bring a notebook, two pens, one past test paper from any subject and a reusable bag for handouts.\n\nThe workshop is free, but there are only 20 places. Places are given on a first-come, first-served basis. To sign up, call 2345 6789 or ask at the front desk. The deadline is Friday, 14 March. Every participant will receive a certificate.\n\nDo not miss this chance to improve your study skills. We hope to see you there!\n\nKelly Lam\nLibrary Assistant",
      checklist: [
        "有明確標題，讓人一看知道是工作坊通知",
        "已寫出 3 月 22 日、上午 10 時至中午 12 時及活動室 2",
        "已說明只供中學生參加，並以英語進行",
        "已列出至少兩項學習內容",
        "已說明要帶 notebook、兩支筆及一份舊試卷",
        "已寫出報名電話、截止日期 3 月 14 日及只有 20 個名額",
        "有提及費用全免和證書",
        "沒有提及 Miss Cheng 的教學年資等無關資料"
      ]
    },
    {
      id: "pp-int-l2-report",
      level: 2,
      paper: "Paper 3 Part B",
      title: "Report on the school canteen survey",
      situation: "You are the chairperson of the Student Council at Kingsway Secondary School. The council surveyed students about the school canteen. The principal has asked for a short report on the findings and the council's recommendations.",
      task: "Write a report for the principal about the school canteen survey. Use the information in the data file. Do not include any information that is not needed.",
      role: "Chairperson of the Student Council",
      audience: "The Principal",
      dataFile: [
        { heading: "About the survey", points: ["300 students from Form 1 to Form 6", "Paper questionnaires, 4 to 8 March", "288 questionnaires returned"] },
        { heading: "Main findings", points: ["68% want more vegetarian dishes", "54% say the queues are too long at 12:30 p.m.", "41% think the food is too expensive", "Only 12% are happy with the current menu"] },
        { heading: "Student comments", points: ["'The noodles are always cold.' (Form 2 student)", "'There are no healthy snacks.' (Form 4 student)", "'I would like more soup choices.' (Form 1 student)"] },
        { heading: "Canteen facts", points: ["Open from 11:30 a.m. to 1:45 p.m.", "Two serving counters; one is closed on Fridays", "Average waiting time at 12:30 p.m.: 14 minutes", "The canteen manager, Mr Ho, has worked at the school for 10 years."] },
        { heading: "Council recommendations", points: ["Open the second counter every day", "Add two vegetarian dishes each week", "Introduce a $5 healthy snack box"] }
      ],
      requirements: [
        "State the purpose of the report and how the survey was carried out.",
        "Summarise at least three main findings with figures.",
        "Include one student comment.",
        "Give one canteen fact that helps explain a problem.",
        "Make three recommendations.",
        "Do not mention how long the canteen manager has worked at the school."
      ],
      model: "To: The Principal\nFrom: Chairperson, Student Council\nTitle: Report on the School Canteen Survey\n\nIntroduction\nThis report presents the results of a survey on the school canteen. The Student Council surveyed 300 students from Form 1 to Form 6 between 4 and 8 March. We received 288 completed questionnaires.\n\nFindings\n68% of students want more vegetarian dishes, and 41% think the food is too expensive. More than half, 54%, say the queues are too long at 12:30 p.m. Only 12% are happy with the current menu. One Form 2 student commented, 'The noodles are always cold.'\n\nThe canteen has two serving counters, but one is closed on Fridays. At 12:30 p.m., students wait for about 14 minutes on average.\n\nRecommendations\n1. Open the second counter every day.\n2. Add two vegetarian dishes each week.\n3. Introduce a $5 healthy snack box.\n\nWe believe these changes will make the canteen better for all students.\n\nChairperson, Student Council",
      checklist: [
        "有報告格式：收件人、發件人、標題",
        "引言已說明調查目的、人數、日期和回收問卷數目",
        "已列出至少三項調查結果，並附百分比",
        "已引用一位學生的意見",
        "已用食堂事實（兩個櫃位、星期五關閉一個、等候 14 分鐘）解釋問題",
        "已寫出三項建議，與調查結果呼應",
        "沒有提及食堂經理的工作年資",
        "語氣正式客觀，沒有加入個人的情緒化字眼"
      ]
    },
    {
      id: "pp-int-l2-letter",
      level: 2,
      paper: "Paper 3 Part B",
      title: "Letter to the editor about a bicycle lane",
      situation: "You are Alex Cheng, a Form 5 student who cycles to school. The Harbour Daily recently published an article supporting a plan to close part of Harbour Road to private cars and build a bicycle lane. You support the plan and want to respond to the article.",
      task: "Write a letter to the editor of the Harbour Daily giving your views on the plan. Use the information in the data file. Do not include any information that is not needed.",
      role: "Alex Cheng, a Form 5 student and cyclist",
      audience: "The editor of the Harbour Daily",
      dataFile: [
        { heading: "The newspaper article", points: ["'A Greener Harbour', published 3 May", "Supports closing part of Harbour Road to private cars", "Says the plan will make the harbour more attractive"] },
        { heading: "The proposal", points: ["Close a 1.2 km section of Harbour Road to private cars", "Build a two-way bicycle lane and a walkway", "Trial period: 1 June to 31 August", "Cost: $2.4 million"] },
        { heading: "Current situation", points: ["About 18,000 cars use Harbour Road each day", "Cyclists currently share the road with buses", "Three accidents involving cyclists in the past year", "The harbour ferry carries about 9,000 passengers a day."] },
        { heading: "Pilot in another district", points: ["Tseung Kwan O trial in 2024", "Cyclist numbers rose by 35%", "Traffic on nearby roads rose by 8%", "Air quality improved slightly"] },
        { heading: "Residents' views", points: ["62% of 500 residents support the trial", "Shop owners worry about deliveries", "The residents' association wants more parking"] }
      ],
      requirements: [
        "Say which article you are responding to and state your view clearly.",
        "Use at least two figures about the current situation.",
        "Mention one result from the pilot in another district.",
        "Respond to one concern raised by shop owners or residents.",
        "Suggest one change to the plan.",
        "Do not mention the ferry passenger numbers."
      ],
      model: "Dear Editor,\n\nI am writing in response to your article 'A Greener Harbour' on 3 May, which supported the plan to close part of Harbour Road to private cars. I strongly support this plan.\n\nAbout 18,000 cars use Harbour Road every day, and cyclists currently share the road with buses. In the past year, there have been three accidents involving cyclists. A separate bicycle lane would make the road much safer for everyone.\n\nThe pilot in Tseung Kwan O shows that these plans can work. During the 2024 trial, cyclist numbers rose by 35%, and air quality improved slightly. Traffic on nearby roads rose by 8%, but I believe this is a small price to pay for safer streets.\n\nSome shop owners worry about deliveries. I suggest that delivery vehicles be allowed to enter before 10 a.m. and after 8 p.m. This would keep shops supplied while keeping the lane clear during the day.\n\n62% of 500 residents already support the trial. I hope the council will listen to them and begin the trial on 1 June as planned.\n\nYours faithfully,\nAlex Cheng",
      checklist: [
        "有信件格式：Dear Editor 及 Yours faithfully",
        "第一段已交代回應哪篇文章、日期和自己的立場",
        "已用至少兩個現況數字（18,000 架車、三宗意外）",
        "已提及將軍澳試行的一項結果（單車人數升 35% 或交通升 8%）",
        "已回應店主的送貨憂慮，並提出具體建議",
        "建議沒有離題，仍然圍繞單車徑計劃",
        "沒有提及渡輪每日載客量",
        "語氣有禮但立場清晰，沒有抄寫整份資料"
      ]
    }
  ]
};

window.DSE_PP_LISTENING.examTips = [
  { title: "先讀題目，預測答案", zh: "錄音播放前會有時間看題目。先留意每題問甚麼：人名、時間、價錢還是原因？在空格旁邊寫上提示，例如 'time' 或 '$'，聽的時候就更容易捕捉答案。" },
  { title: "邊聽邊寫，不要等", zh: "Paper 3 Part A 錄音只播一次（以校內練習為準）。聽到答案就立即寫下，可用縮寫，例如 'Wed'、'15 min'，聽完再寫完整句子。" },
  { title: "小心錄音中的更正", zh: "DSE 風格錄音常有 'not ... as we said'、'well, actually'、'I mean' 等更正。最後聽到的數字或日期才是答案，之前的通常是陷阱。" },
  { title: "人名與串法要寫清楚", zh: "錄音有時會逐個字母讀出姓名。聽到 'T-A-M' 就要立即寫下，不要只寫讀音；專有名詞即使是普通字，也要照錄音的串法。" },
  { title: "價錢與折扣分清楚", zh: "留意 'normal price'、'discount'、'if you pay before' 等字眼。題目問哪一個價錢，就填哪一個，不要把原價和優惠價調亂。" },
  { title: "否定句是常見陷阱", zh: "聽到 'not provided'、'do not need to bring'、'cannot' 要特別小心。題目可能問「學生要帶甚麼」，答案往往與否定句相反。" },
  { title: "Part B 只用資料檔案的重點", zh: "Part B 不需要把資料檔案全部抄進文章。先圈出與任務要求有關的點，每段最少回應一個要求；明顯無關的資料（例如其他活動消息）不要寫。" },
  { title: "預留時間檢查格式與拼寫", zh: "完成 Part B 後，快速檢查三樣：文體格式（email、notice、report、letter）、時態與主謂一致、以及抄寫的數字和名字。預留約 5 分鐘，不要最後一刻才停筆。" }
];
