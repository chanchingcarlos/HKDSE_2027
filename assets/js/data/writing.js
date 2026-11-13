window.DSE_WRITING = {
  overview: {
    partA: "Paper 2 Part A 通常係短題目，大約 200 字，例如電郵、通告、短報告或短文章。重點係格式正確、回應題目每一個要求、句子簡單而準確。唔好為咗用難字而寫錯文法，寧願用短句清楚交代。",
    partB: "Paper 2 Part B 係長題目，大約 400 字，多數係文章、建議書、報告或演講辭。要有清楚嘅引言、兩至三個正文重點同結論。每段只講一個中心思想，用 First、Second、Finally 等路標詞幫讀者跟住你嘅思路。",
    marking: [
      { name: "Content", zh: "內容：有冇回應題目所有要求？意念是否切題、清楚、有足夠細節？", tip: "落筆前用三分鐘圈出題目每個要求，寫一個簡單大綱，確保每一點都答到，唔好漏。" },
      { name: "Language", zh: "語言：文法、串字、標點同用詞是否準確？句式有冇變化？", tip: "與其用唔熟嘅難字，不如用簡單而準確嘅句子。預留五分鐘檢查動詞時態、單複數同串字。" },
      { name: "Organisation", zh: "組織：分段是否清楚？有冇連接詞？格式（稱呼、結尾、標題）是否正確？", tip: "每段一個重點，用 First、Second、However、In conclusion 等詞連接。書信、報告、建議書嘅格式一定要齊。" }
    ]
  },
  formats: [
    {
      id: "email",
      name: "Email 電郵",
      when: "Paper 2 Part A 最常出；Paper 3 Part B 綜合能力都常用。投訴、查詢、邀請、回覆朋友都係常見情境。",
      wordcount: "Part A 約 200 字；Part B 約 400 字",
      structure: [
        { part: "Subject line", note: "一句寫清楚目的，例如 Request for information about the sports day。正式電郵一定要有。" },
        { part: "Salutation", note: "Dear Sir/Madam（唔知對方名，正式）／Dear Mr Chan（知對方姓氏）／Hi Amy（朋友）。" },
        { part: "Opening", note: "第一句直接講明寫信目的：I am writing to complain about ...，唔好講太多天氣或客套話。" },
        { part: "Body paragraph 1", note: "交代事情背景或具體細節：幾時、邊度、發生咗咩事。" },
        { part: "Body paragraph 2", note: "解釋影響、提出要求或補充資料。每段一個重點。" },
        { part: "Closing", note: "清楚講出你想對方做咩：Please reply by Friday.／I look forward to hearing from you." },
        { part: "Sign-off", note: "Dear Sir/Madam 用 Yours faithfully；知道對方姓名用 Yours sincerely；朋友用 Best regards 或 Bye。" }
      ],
      phrases: [
        { fn: "開頭表明目的", en: "I am writing to ...", zh: "我寫信是想……", ex: "I am writing to ask about the summer sports camp." },
        { fn: "回覆對方", en: "Thank you for your email. I am glad to hear that ...", zh: "多謝你的電郵，很高興知道……", ex: "Thank you for your email. I am glad to hear that you are coming to Hong Kong." },
        { fn: "提供資料", en: "I would like to give you some details about ...", zh: "我想向你提供有關……的資料。", ex: "I would like to give you some details about the school trip." },
        { fn: "禮貌要求資料", en: "Could you please let me know ...?", zh: "可否請你告訴我……？", ex: "Could you please let me know the price of the ticket?" },
        { fn: "解釋原因", en: "The reason is that ...", zh: "原因是……", ex: "The reason is that I have a piano exam on that day." },
        { fn: "道歉", en: "I am sorry that ... / I apologise for ...", zh: "我很抱歉……", ex: "I am sorry that I cannot join your birthday party." },
        { fn: "提出請求", en: "I would be grateful if you could ...", zh: "如果你能……，我會非常感激。", ex: "I would be grateful if you could send me the form." },
        { fn: "結尾期待回覆", en: "I look forward to hearing from you.", zh: "期待你的回覆。", ex: "I look forward to hearing from you soon." }
      ],
      model: {
        title: "Model answer：投訴餐廳服務（Email）",
        task: "You visited a restaurant with your family and were unhappy with the service. Write an email to the manager.",
        text: "Dear Sir or Madam,\n\nI am writing to complain about my visit to your restaurant on 5th May. I came with my family to celebrate my mother's birthday, but the service was very poor. We have been customers of your restaurant for many years.\n\nFirst, we waited for 45 minutes before anyone took our order. When the food arrived, my father's steak was cold and my sister's soup was not hot. We told the waiter, but he did not say sorry. He only said that the kitchen was busy.\n\nSecond, the table next to us was very noisy. There were six children running around, and no member of staff asked them to stop. My grandmother could not hear our conversation.\n\nThird, when we paid the bill, we found that we had been charged for a dessert we did not order. The cashier corrected the mistake, but she did not apologise.\n\nI understand that restaurants can be busy. However, I think the service on that day was not acceptable. I would like to receive a reply from you. I also hope that you will train your staff so that other customers do not have the same experience.\n\nYours faithfully,\nChris Wong"
      },
      checklist: [
        "有冇寫 subject line？",
        "稱呼同結尾配唔配對（Dear Sir/Madam → Yours faithfully）？",
        "第一段有冇講清楚寫信目的？",
        "有冇回應題目每一個要求？",
        "段落之間有冇空行，每段是否只有一個重點？",
        "語氣啱唔啱？投訴要清楚但保持禮貌。",
        "有冇檢查時態、單複數同串字？"
      ]
    },
    {
      id: "letter-editor",
      name: "Letter to the Editor 投訴／意見信",
      when: "Paper 2 Part B 常見，尤其係社區問題、環保、交通、政策意見。對象係報紙編輯，其實係想講畀公眾聽。",
      wordcount: "約 350–400 字（Part B）",
      structure: [
        { part: "Salutation", note: "Dear Editor, 就夠，唔需要寫地址。部分題目要求寫日期，可以加喺左上角。" },
        { part: "Opening", note: "第一段講明關注咩問題同寫信目的：I am writing to express my concern about ..." },
        { part: "Background", note: "交代親身經歷或最近發生嘅事，令讀者明白問題有幾真實。" },
        { part: "Problems and effects", note: "用兩至三個問題說明影響：影響居民、環境、下一代。可以加數字或例子。" },
        { part: "Suggestions", note: "提出兩至三個可行建議，分別寫政府、學校或市民可以做咩。" },
        { part: "Closing appeal", note: "呼籲讀者支持或行動：I hope your readers will ..." },
        { part: "Sign-off", note: "Yours faithfully, 加姓名。寫信給編輯通常用全名。" }
      ],
      phrases: [
        { fn: "開頭點出問題", en: "I am writing to express my concern about ...", zh: "我寫信是想表達我對……的關注。", ex: "I am writing to express my concern about the rubbish on our beaches." },
        { fn: "引用親身經歷", en: "Last week, I ... and I was shocked to see ...", zh: "上星期我……，我很震驚看到……", ex: "Last week, I visited the beach and I was shocked to see plastic bags everywhere." },
        { fn: "指出影響", en: "This problem affects ...", zh: "這個問題影響……", ex: "This problem affects both residents and tourists." },
        { fn: "引用數據", en: "According to a recent survey, ...", zh: "根據最近一項調查……", ex: "According to a recent survey, 60 per cent of students sleep less than seven hours." },
        { fn: "讓步", en: "I understand that ..., but ...", zh: "我明白……，但是……", ex: "I understand that tourism brings money to Hong Kong, but it also causes problems." },
        { fn: "敦促政府", en: "I urge the government to ...", zh: "我敦促政府……", ex: "I urge the government to put more bins in the district." },
        { fn: "呼籲讀者", en: "I hope your readers will ...", zh: "我希望讀者會……", ex: "I hope your readers will think twice before using plastic bags." },
        { fn: "結尾", en: "Yours faithfully,", zh: "（正式結尾，配合 Dear Editor）", ex: "Yours faithfully, Mary Chan" }
      ],
      model: {
        title: "Model answer：海灘塑膠垃圾（Letter to the Editor）",
        task: "Your favourite beach is full of plastic waste. Write a letter to the editor of a newspaper about the problem and suggest what can be done.",
        text: "Dear Editor,\n\nI am writing to express my concern about the large amount of plastic waste on Hong Kong beaches. Last Sunday I visited Clear Water Bay with my friends, and we were shocked by what we saw.\n\nWhen we arrived, we found plastic bottles, bags and food containers on the sand. Some of them had come from the sea, but many had been left by visitors. We spent two hours picking up the rubbish, and we filled six large bags. This shows that the problem is serious.\n\nPlastic waste harms sea animals. Turtles and fish sometimes eat small pieces of plastic because they think it is food. In the end, these animals become sick and die. The plastic also makes the beach ugly, so fewer tourists want to visit.\n\nI think the government should do more. First, it should put more bins on the beach and collect the rubbish more often. Second, it should fine people who leave rubbish behind. Schools can also teach students to use fewer plastic products and to take their rubbish home.\n\nI hope your readers will think about this problem and help keep our beaches clean.\n\nYours faithfully,\nMary Chan"
      },
      checklist: [
        "有冇用 Dear Editor 開頭、Yours faithfully 結尾？",
        "第一段有冇清楚講出關注嘅問題？",
        "有冇用具體例子或數字支持？",
        "有冇解釋問題帶嚟嘅影響？",
        "建議是否具體、可行？",
        "有冇呼籲讀者行動？",
        "語氣是否禮貌而堅定，唔好鬧人？"
      ]
    },
    {
      id: "report",
      name: "Report 報告",
      when: "Paper 2 Part A 短報告；Part B 調查報告。Paper 3 綜合能力亦經常要寫報告。校園調查、活動檢討最常見。",
      wordcount: "Part A 約 200 字；Part B 約 400 字",
      structure: [
        { part: "Title", note: "寫清楚報告主題，例如 Report on the School Library Survey。" },
        { part: "Introduction", note: "交代目的、調查對象同方法：who、when、how many。唔需要寫背景故事。" },
        { part: "Findings", note: "用兩至三段報告發現，每段一個重點，盡量加數字：About 70 per cent of students said ..." },
        { part: "Conclusion", note: "用一兩句總結最重要嘅發現，唔好加入新資料。" },
        { part: "Recommendations", note: "提出兩至三個具體建議，用 We recommend that ... 開頭。" },
        { part: "Sign-off", note: "Reported by 加姓名或職位，例如 Reported by Chris Wong, Chairperson。" }
      ],
      phrases: [
        { fn: "交代目的", en: "The aim of this report is to ...", zh: "本報告的目的是……", ex: "The aim of this report is to find out how students use the library." },
        { fn: "交代方法", en: "We interviewed 100 students and asked them ...", zh: "我們訪問了 100 名學生，問他們……", ex: "We interviewed 100 students and asked them about their study habits." },
        { fn: "報告發現", en: "The survey shows that ...", zh: "調查顯示……", ex: "The survey shows that most students study after 10 p.m." },
        { fn: "大部分／少部分", en: "Most students said that ... / Only a few students ...", zh: "大部分學生說……／只有少數學生……", ex: "Most students said that the library is too noisy." },
        { fn: "引用百分比", en: "About 60 per cent of students ...", zh: "約六成學生……", ex: "About 60 per cent of students go to school by bus." },
        { fn: "總結", en: "In conclusion, ...", zh: "總結來說……", ex: "In conclusion, students want a longer opening time and more books." },
        { fn: "提出建議", en: "We recommend that ...", zh: "我們建議……", ex: "We recommend that the school should open the library earlier." },
        { fn: "署名", en: "Reported by ...", zh: "報告人：……", ex: "Reported by Chris Wong, Chairperson of the Students' Union." }
      ],
      model: {
        title: "Model answer：圖書館調查報告（Report）",
        task: "The Students' Union did a survey about the school library. Write a report for the Principal with the findings and your recommendations.",
        text: "Report on the School Library Survey\n\nIntroduction\n\nThe Students' Union carried out a survey about the school library in March. We asked 200 students from Form 1 to Form 6 for their views. This report presents the main findings and our recommendations.\n\nFindings\n\nFirst, about 70 per cent of students said that the library opens too late. Many students arrive at school before 8 a.m., but the library only opens at 8:30 a.m. They would like to read or study there before lessons.\n\nSecond, over half of the students said that there are not enough Chinese books. They think the library has many English novels, but the Chinese section is small. Some students also said that the books are old and not interesting.\n\nThird, most students were happy with the staff. They said the librarian is friendly and helpful. However, some students said that the library is too noisy after school because students talk and play games there.\n\nConclusion\n\nIn general, students like the library, but they would like longer opening hours, more Chinese books and a quieter study area.\n\nRecommendations\n\nWe recommend that the school should open the library at 7:45 a.m. We also suggest buying 200 new Chinese books every year and putting up signs to remind students to keep quiet. These changes are not expensive, but they would make the library a better place for learning.\n\nReported by Chris Wong, Chairperson of the Students' Union"
      },
      checklist: [
        "有冇寫報告標題？",
        "Introduction 有冇交代目的、對象同調查人數？",
        "Findings 有冇分段，每段一個重點？",
        "有冇用數字或百分比支持發現？",
        "Conclusion 有冇總結，而唔係加入新資料？",
        "Recommendations 是否具體可行？",
        "有冇寫 Reported by 同姓名？"
      ]
    },
    {
      id: "article",
      name: "Article 文章（校報／雜誌）",
      when: "Paper 2 Part B 校報或雜誌文章最常見；Part A 都可能出短文章。主題多數係校園生活、健康、科技或社會現象。",
      wordcount: "約 350–400 字（Part B）",
      structure: [
        { part: "Headline", note: "短而吸引，例如 Are You Spending Too Much Time Online? 唔好太長。" },
        { part: "Introduction", note: "用問題、數字或小故事吸引讀者，然後講明文章主題。" },
        { part: "Point 1", note: "第一個重點，通常係好處或背景，用例子支持。" },
        { part: "Point 2", note: "第二個重點，通常係問題或另一方意見，用 However 或 On the other hand 連接。" },
        { part: "Point 3 / advice", note: "提出建議或解決方法，具體、可行。" },
        { part: "Conclusion", note: "用一兩句總結，最好有一個行動呼籲或令人記得嘅句子。" },
        { part: "Byline", note: "文章結尾寫 By 加姓名同班別，例如 By Chris Wong, Form 5。" }
      ],
      phrases: [
        { fn: "吸引注意的開頭", en: "Have you ever ...?", zh: "你有沒有試過……？", ex: "Have you ever stayed up late to watch videos on your phone?" },
        { fn: "點出主題", en: "In this article, I will look at ...", zh: "在這篇文章，我會探討……", ex: "In this article, I will look at how students use social media." },
        { fn: "舉例", en: "For example, ...", zh: "例如……", ex: "For example, my brother spends four hours on his phone every day." },
        { fn: "轉折", en: "On the other hand, ...", zh: "另一方面……", ex: "On the other hand, social media helps us keep in touch with friends." },
        { fn: "引用數據", en: "According to ...", zh: "根據……", ex: "According to a recent survey, many students sleep less than seven hours." },
        { fn: "提出建議", en: "Here are a few simple tips.", zh: "以下是幾個簡單建議。", ex: "Here are a few simple tips to help you sleep better." },
        { fn: "結尾呼籲", en: "Let us ...", zh: "讓我們……", ex: "Let us work together to make our school greener." },
        { fn: "署名", en: "By ..., Form ...", zh: "作者：……（班別）", ex: "By Chris Wong, Form 5" }
      ],
      model: {
        title: "Model answer：社交媒體與學生（Article）",
        task: "The school magazine is running a special issue on social media. Write an article about how students use social media, including one good point, one problem and one piece of advice.",
        text: "Are You Spending Too Much Time Online?\n\nLast week, I asked thirty classmates how much time they spend on social media every day. The answer was surprising. Most of them spend more than three hours a day, and some spend over five hours. That is more time than they spend on homework.\n\nSocial media is not always bad. It helps us keep in touch with friends and family. We can also learn new things from short videos and posts. When I was sick at home, I used social media to talk to my classmates and I did not feel lonely.\n\nHowever, there are problems. First, spending too much time online can hurt our eyes and our sleep. Some students stay up late to watch videos, and then they cannot concentrate in class. Second, people sometimes compare their lives with the perfect photos of others. This can make them feel unhappy. Third, some information online is not true, and we may believe it.\n\nSo what should we do? We can set a time limit for each day. For example, we can use social media for only one hour after finishing our homework. We can also turn off notifications when we study, and spend more time on sports or with our family.\n\nSocial media is a tool. It is useful if we control it, but it can control us if we are not careful.\n\nBy Chris Wong, Form 5"
      },
      checklist: [
        "有冇一個短而吸引嘅標題？",
        "開頭有冇吸引讀者（問題、數字或故事）？",
        "有冇清楚講出文章主題？",
        "每個正文段落是否只有一個重點？",
        "有冇例子或數字支持？",
        "建議是否具體可行？",
        "結尾有冇總結或呼籲？有冇寫 Byline？"
      ]
    },
    {
      id: "blog",
      name: "Blog 網誌",
      when: "Paper 2 Part B 網誌；有時 Part A 短網誌。多數寫個人經歷、學習心得或校園活動，語氣可以輕鬆啲，但唔好太隨便。",
      wordcount: "約 350–400 字（Part B）",
      structure: [
        { part: "Catchy title", note: "可以用第一人稱，例如 My First Week as a Volunteer，令人想click。" },
        { part: "Greeting", note: "Hello everyone! 或者 Hi readers! 網誌可以直接稱呼讀者。" },
        { part: "Background", note: "交代時間、地點、你點解會做呢件事，帶讀者入故事。" },
        { part: "Experience", note: "用一兩段講具體經歷，最好有一個小故事或對話，唔好只講感受。" },
        { part: "What I learned", note: "講你學到咩、想法有咩改變，呢部分係網誌嘅重點。" },
        { part: "Advice", note: "給讀者一至兩個建議，用 If you are thinking about ..., I would say ..." },
        { part: "Closing", note: "輕鬆結尾，可以叫讀者留言：Tell me what you think in the comments below." }
      ],
      phrases: [
        { fn: "打招呼", en: "Hello everyone! Welcome back to my blog.", zh: "大家好！歡迎回到我的網誌。", ex: "Hello everyone! Welcome back to my blog." },
        { fn: "交代近況", en: "Sorry for not writing for a long time. I have been busy with ...", zh: "抱歉很久沒有更新，我一直在忙……", ex: "Sorry for not writing for a long time. I have been busy with my exams." },
        { fn: "開始講經歷", en: "Last week, I ...", zh: "上星期，我……", ex: "Last week, I joined a volunteer programme at an elderly centre." },
        { fn: "表達感受", en: "I felt ... because ...", zh: "我感到……因為……", ex: "I felt nervous because I did not know what to say." },
        { fn: "學到什麼", en: "I learned that ...", zh: "我學會了……", ex: "I learned that small actions can make a big difference." },
        { fn: "給讀者建議", en: "If you are thinking about ..., I would say ...", zh: "如果你正考慮……，我會說……", ex: "If you are thinking about volunteering, I would say just try it." },
        { fn: "邀請留言", en: "Tell me what you think in the comments below.", zh: "在下面留言告訴我你的想法。", ex: "Tell me what you think in the comments below." },
        { fn: "結尾", en: "See you next time!", zh: "下次見！", ex: "See you next time!" }
      ],
      model: {
        title: "Model answer：第一次做義工（Blog）",
        task: "You are writing a blog for your school website about your experience as a volunteer at an elderly centre. Write about what you did and what you learned.",
        text: "My First Month as a Volunteer\n\nHello everyone! This is my first blog post, and I want to share my experience as a volunteer.\n\nLast month, I joined a volunteer programme at an elderly centre near my home. I was nervous on the first day because I did not know what to say. The centre was small and quiet, and I was the youngest person there.\n\nMy job was simple. I talked with the old people, helped them use a smartphone, and played board games with them. At first, it was difficult. Mr Lee, who is 82 years old, did not want to talk. He only looked out of the window. I did not give up. I visited him every Saturday and told him about my school life. After three weeks, he started to smile and told me stories about his childhood.\n\nNow I understand that old people do not only need food and money. They also need someone to listen to them. When I saw Mr Lee laugh, I felt very happy. I learned that small actions can make a big difference.\n\nIf you are thinking about volunteering, I want to say: just try it. You do not need to be clever or rich. You only need to give your time. I am sure you will learn more than you give.\n\nSee you next time!"
      },
      checklist: [
        "有冇一個吸引嘅網誌標題？",
        "開頭有冇同讀者打招呼？",
        "有冇交代時間、地點同背景？",
        "有冇一個具體嘅小故事或例子？",
        "有冇講你學到咩或感受有咩改變？",
        "語氣是否輕鬆自然，但文法準確？",
        "結尾有冇回應讀者或邀請留言？"
      ]
    },
    {
      id: "speech",
      name: "Speech 演講辭",
      when: "Paper 2 Part B 演講辭；校園活動、環保、健康、義工主題常見。對象係全校師生，所以要有稱呼同多謝。",
      wordcount: "約 350–400 字（Part B）",
      structure: [
        { part: "Greeting", note: "Good morning, Principal, teachers and fellow students. 正式演講一定要有。" },
        { part: "Introduction", note: "自我介紹一兩句，然後直接講出演講主題，可以用問題引起注意。" },
        { part: "Problem or background", note: "用數字、觀察或新聞說明問題有幾嚴重，令聽眾覺得與自己有關。" },
        { part: "Personal example", note: "講一個親身經歷或校園例子，比抽象道理更有說服力。" },
        { part: "Suggestions", note: "提出兩至三個具體行動，用 First、Second、Finally 分開。" },
        { part: "Call to action", note: "用短句呼籲聽眾行動：I am not asking you to do something difficult. I am only asking you to ..." },
        { part: "Thank you", note: "Thank you for listening. 簡單有力，唔好突然停。" }
      ],
      phrases: [
        { fn: "稱呼聽眾", en: "Good morning, Principal, teachers and fellow students.", zh: "校長、各位老師、各位同學，早晨。", ex: "Good morning, Principal, teachers and fellow students." },
        { fn: "自我介紹", en: "I am ... from ...", zh: "我是……（班別）的……", ex: "I am Chris Wong from Form 5." },
        { fn: "點題", en: "Today I would like to talk about ...", zh: "今日我想談談……", ex: "Today I would like to talk about food waste in our school." },
        { fn: "引起共鳴", en: "I am sure you have all seen ...", zh: "我相信大家都見過……", ex: "I am sure you have all seen half-eaten rice boxes in the bins." },
        { fn: "引用觀察", en: "Last week, I ... and I was surprised to find ...", zh: "上星期我……，我很驚訝發現……", ex: "Last week, I checked the rubbish bins and I was surprised to find ten kilograms of food." },
        { fn: "提出建議", en: "First, ... Second, ... Finally, ...", zh: "第一……第二……最後……", ex: "First, we can take only the food we can finish. Second, we can ask the tuck shop to sell smaller portions." },
        { fn: "呼籲行動", en: "I ask you to ...", zh: "我請大家……", ex: "I ask you to think before you buy food." },
        { fn: "多謝", en: "Thank you for listening.", zh: "多謝大家聆聽。", ex: "Thank you for listening." }
      ],
      model: {
        title: "Model answer：校園廚餘（Speech）",
        task: "There is a lot of food waste in your school. Write a speech for the morning assembly to ask students to reduce food waste.",
        text: "Good morning, Principal, teachers and fellow students.\n\nI am Chris Wong from Form 5, and I am here to talk about a problem that we see every day: food waste.\n\nEvery day, our tuck shop throws away more than ten kilograms of food. Last week, I stood near the rubbish bins at lunchtime and counted. I saw half-eaten rice boxes, bread and fruit. Some students took too much food, and some bought food but did not eat it. This is a waste of money and a waste of resources.\n\nAt the same time, many people in Hong Kong do not have enough food. According to a local charity, over one million people live in poverty, and some of them do not have three meals a day. When we throw food away, we should think about them.\n\nWhat can we do? First, we can take only the food we can finish. Second, we can ask the tuck shop to sell smaller portions. Third, our school can work with a charity to give unused food to people in need. Finally, we can put up posters to remind everyone.\n\nI am not asking you to do something difficult. I am only asking you to think before you buy and before you throw.\n\nLet us start today. Let us make our school a place where no good food goes to waste. Thank you."
      },
      checklist: [
        "有冇稱呼校長、老師同同學？",
        "開頭有冇清楚講出演講主題？",
        "有冇用數字、觀察或例子支持？",
        "建議是否具體，聽眾一聽就明？",
        "有冇用 First、Second、Finally 等路標詞？",
        "結尾有冇呼籲行動同多謝？",
        "有冇讀一次，確保句子唔會太長、唔會透唔到氣？"
      ]
    },
    {
      id: "proposal",
      name: "Proposal 建議書",
      when: "Paper 2 Part B 建議書；校園改善、活動計劃、環保措施最常見。格式比文章正式，要有清晰標題同分項。",
      wordcount: "約 400 字（Part B）",
      structure: [
        { part: "Title", note: "Proposal: 加活動或計劃名稱，例如 A Proposal for a School Fitness Week。" },
        { part: "Introduction", note: "交代背景同問題：而家情況係點？點解需要改變？" },
        { part: "Aims", note: "用一兩句講清楚目的：The aims of this proposal are to ..." },
        { part: "Plan", note: "最長嘅一段：幾時、邊度、做咩、邊個負責。可以用 First、Second 分項。" },
        { part: "Resources", note: "講明需要咩資源：場地、器材、人手、金錢。要實際。" },
        { part: "Benefits", note: "解釋預期好處，扣返學校同學生。" },
        { part: "Conclusion", note: "禮貌請求支持：I hope the school will support this proposal." },
        { part: "Sign-off", note: "Submitted by 加姓名同職位。" }
      ],
      phrases: [
        { fn: "交代背景", en: "At present, ...", zh: "目前……", ex: "At present, many students do not exercise enough." },
        { fn: "講出目的", en: "The aims of this proposal are to ...", zh: "本建議書的目的是……", ex: "The aims of this proposal are to help students build a healthy habit." },
        { fn: "計劃內容", en: "We plan to hold ... on ... at ...", zh: "我們計劃於……在……舉行……", ex: "We plan to hold a Fitness Week from 12th to 16th May." },
        { fn: "所需資源", en: "We will need ...", zh: "我們需要……", ex: "We will need the school hall and some basic equipment." },
        { fn: "預期好處", en: "We believe that this plan will ...", zh: "我們相信這個計劃會……", ex: "We believe that this plan will help students become healthier." },
        { fn: "請求支持", en: "I hope the school will support this proposal.", zh: "我希望學校支持這份建議書。", ex: "I hope the school will support this proposal." },
        { fn: "署名", en: "Submitted by ...", zh: "提交人：……", ex: "Submitted by Chris Wong, Chairperson of the PE Club." }
      ],
      model: {
        title: "Model answer：校園健康周（Proposal）",
        task: "Many students in your school do not exercise enough. Write a proposal to the Principal suggesting a Fitness Week.",
        text: "Proposal: A Fitness Week for Our School\n\nIntroduction\n\nMany students in our school do not exercise enough. In a survey by the PE Department last year, about 40 per cent of students said they exercise less than once a week. Some students stay at home and play computer games after school. I would like to suggest a Fitness Week to encourage students to be more active.\n\nAims\n\nThe aims of the Fitness Week are to help students build a healthy habit, to let them try new sports, and to build team spirit between classes.\n\nPlan\n\nThe Fitness Week will be held from 12th to 16th May. Each day will have a different activity. On Monday, there will be a skipping competition. On Tuesday and Wednesday, teachers will lead morning jogging around the school. On Thursday, we will invite a coach to teach a dance class. On Friday, there will be a mini sports day with relay races and a tug-of-war.\n\nResources\n\nWe will need the school hall, the playground and some basic equipment, such as ropes and balls. We would also like to invite the PE teachers and two parents who are fitness coaches to help.\n\nBenefits\n\nStudents will become healthier and less stressed. They will also make new friends and learn to work as a team.\n\nConclusion\n\nI hope the school will support this proposal. If we work together, we can make our school a healthier place.\n\nSubmitted by Chris Wong, Chairperson of the PE Club"
      },
      checklist: [
        "有冇寫清楚建議書標題？",
        "Introduction 有冇交代背景同問題？",
        "Aims 是否清楚、簡短？",
        "Plan 有冇日期、地點、活動同負責人？",
        "Resources 是否實際（場地、器材、人手）？",
        "Benefits 有冇扣返學生同學校？",
        "結尾有冇禮貌請求支持同署名？"
      ]
    },
    {
      id: "notice",
      name: "Notice 通告／海報文字",
      when: "Paper 2 Part A 通告或海報文字；Paper 3 亦會寫短文。重點係資料齊、一眼睇得明，唔需要長篇大論。",
      wordcount: "約 200 字（Part A）",
      structure: [
        { part: "Heading", note: "用大字標題，例如 CHARITY WALK 2026，全部大寫都可以。" },
        { part: "Hook", note: "一句吸引讀者：Do you want to help others and get some exercise?" },
        { part: "Event details", note: "逐行列出日期、時間、地點、費用，用冒號對齊，唔好寫成一大段。" },
        { part: "Purpose", note: "講明活動目的同善款用途，一兩句就夠。" },
        { part: "Who can join / what to bring", note: "用點列式寫參加資格同注意事項。" },
        { part: "How to join", note: "清楚寫報名方法、地點、截止日期同聯絡人。" },
        { part: "Closing", note: "一句鼓勵參加：Come and walk for a good cause. We hope to see you there!" }
      ],
      phrases: [
        { fn: "吸引句", en: "Do you want to ...?", zh: "你想不想……？", ex: "Do you want to help others and get some exercise?" },
        { fn: "活動資料", en: "Date: ... Time: ... Place: ...", zh: "日期：…… 時間：…… 地點：……", ex: "Date: Sunday, 8th March 2026" },
        { fn: "講明目的", en: "All money will go to ...", zh: "所有款項將捐給……", ex: "All money will go to the Sunshine Children's Home." },
        { fn: "參加對象", en: "All students, parents and teachers are welcome.", zh: "歡迎所有學生、家長和老師參加。", ex: "All students, parents and teachers are welcome." },
        { fn: "注意事項", en: "What to bring: ...", zh: "請攜帶：……", ex: "What to bring: a water bottle, a cap and comfortable shoes." },
        { fn: "報名方法", en: "Pick up a form from ...", zh: "請到……索取報名表格。", ex: "Pick up a form from the school office." },
        { fn: "截止日期", en: "Please return the form before ...", zh: "請於……前交回表格。", ex: "Please return the form before 28th February." },
        { fn: "結尾", en: "We hope to see you there!", zh: "希望到時見到你！", ex: "We hope to see you there!" }
      ],
      model: {
        title: "Model answer：慈善步行通告（簡單短句示範：準確比花巧重要）",
        task: "Your school is holding a charity walk for a children's home. Write a notice for the school noticeboard with the details and how to join.",
        text: "CHARITY WALK 2026\n\nDo you want to help others and get some exercise? Come and join our charity walk!\n\nDate: Sunday, 8th March 2026\nTime: 9:00 a.m. to 12:00 noon\nPlace: Tai Po Waterfront Park\nDistance: 5 kilometres\nEntry fee: $50 per person\n\nAll money will go to the Sunshine Children's Home. The home helps children who do not have parents. Last year, we raised $20,000 and bought new beds and books for the children. This year, we hope to raise $30,000 for a new kitchen.\n\nWho can join?\nAll students, parents and teachers are welcome. Students under 12 must come with an adult.\n\nWhat to bring:\n- A water bottle\n- A cap and sunscreen\n- Comfortable shoes\n\nHow to join:\nPick up a form from the school office. Give the form and the fee to Miss Wong in the PE room before 28th February. You can also email Miss Wong at walk@sunshine.edu.hk.\n\nImportant: Please arrive 15 minutes early. Light rain will not stop the walk. If there is a typhoon, we will cancel the walk and put a message on the school website.\n\nCome and walk for a good cause. We hope to see you there!"
      },
      checklist: [
        "有冇一個清楚嘅大字標題？",
        "日期、時間、地點、費用是否齊全？",
        "有冇講明活動目的同善款用途？",
        "參加資格同注意事項是否清楚？",
        "報名方法、截止日期同聯絡人是否齊全？",
        "有冇用點列或短句，令讀者一眼睇明？",
        "有冇檢查所有數字同日期？"
      ]
    }
  ],
  sentenceBank: [
    { fn: "開頭（正式）", en: "I am writing to ...", zh: "我寫信是想……", ex: "I am writing to ask about the summer sports camp." },
    { fn: "開頭（報告）", en: "This report ...", zh: "本報告……", ex: "This report looks at how students use the school library." },
    { fn: "開頭（演講）", en: "Today I would like to talk about ...", zh: "今日我想談談……", ex: "Today I would like to talk about food waste in our school." },
    { fn: "讓步", en: "Although ... , ...", zh: "雖然……但是……", ex: "Although the school library is small, it is a comfortable place to study." },
    { fn: "讓步", en: "Even though ... , ...", zh: "即使……仍然……", ex: "Even though I was tired, I finished my homework before dinner." },
    { fn: "讓步（先認同後轉折）", en: "It is true that ... However, ...", zh: "……的確……但是……", ex: "It is true that social media is useful. However, we should not spend all day on it." },
    { fn: "原因", en: "because ...", zh: "因為……", ex: "I was late because the bus broke down." },
    { fn: "原因（主要）", en: "The main reason is that ...", zh: "主要原因是……", ex: "The main reason is that many students do not have enough time." },
    { fn: "原因（解釋前句）", en: "This is because ...", zh: "這是因為……", ex: "Plastic waste is a serious problem. This is because it takes hundreds of years to break down." },
    { fn: "結果", en: "As a result, ...", zh: "結果……", ex: "As a result, many sea animals die every year." },
    { fn: "結果（so）", en: "..., so ...", zh: "……所以……", ex: "The library was too noisy, so I went to the classroom to study." },
    { fn: "結果（導致）", en: "This leads to ...", zh: "這導致……", ex: "Eating too much fast food leads to health problems." },
    { fn: "例子", en: "For example, ...", zh: "例如……", ex: "For example, my brother spends four hours on his phone every day." },
    { fn: "例子（such as）", en: "..., such as ...", zh: "……例如……", ex: "We can do simple things such as turning off the lights and using less water." },
    { fn: "例子（one example）", en: "One example is ...", zh: "一個例子是……", ex: "One example is the plastic bags we get from supermarkets." },
    { fn: "比較（more than）", en: "A is more ... than B.", zh: "A 比 B 更……", ex: "Reading at home is more comfortable than reading in a busy cafe." },
    { fn: "比較（compared with）", en: "Compared with ..., ...", zh: "與……相比，……", ex: "Compared with last year, the number of members has doubled." },
    { fn: "比較（not as ... as）", en: "A is not as ... as B.", zh: "A 不及 B 那麼……", ex: "Online learning is not as effective as face-to-face lessons for some students." },
    { fn: "建議（suggest）", en: "I suggest that the school should ...", zh: "我建議學校應該……", ex: "I suggest that the school should open the library earlier." },
    { fn: "建議（we should）", en: "We should ...", zh: "我們應該……", ex: "We should bring our own water bottles instead of buying plastic ones." },
    { fn: "建議（it would be a good idea）", en: "It would be a good idea to ...", zh: "……會是一個好主意。", ex: "It would be a good idea to put more bins near the tuck shop." },
    { fn: "預測（if）", en: "If ..., ... will ...", zh: "如果……，就會……", ex: "If we start now, we will finish the project on time." },
    { fn: "預測（I believe）", en: "I believe that ... will ...", zh: "我相信……會……", ex: "I believe that e-sports will become more popular in the next few years." },
    { fn: "預測（is likely to）", en: "... is likely to ...", zh: "……很可能會……", ex: "The number of online shoppers is likely to grow." },
    { fn: "結論", en: "In conclusion, ...", zh: "總結來說……", ex: "In conclusion, the school should do more to help students relax." },
    { fn: "結論（to sum up）", en: "To sum up, ...", zh: "總括而言……", ex: "To sum up, volunteering is good for both the helper and the people in need." },
    { fn: "結論（I hope）", en: "I hope ...", zh: "我希望……", ex: "I hope these suggestions will make our school a better place." },
    { fn: "強調（important to）", en: "It is important to ...", zh: "……是很重要的。", ex: "It is important to check the information before we share it online." },
    { fn: "強調（most important）", en: "The most important thing is ...", zh: "最重要的事情是……", ex: "The most important thing is to stay calm during the exam." },
    { fn: "強調（must remember）", en: "We must remember that ...", zh: "我們必須記住……", ex: "We must remember that our actions can affect the environment." }
  ],
  prompts: [
    {
      type: "Part A",
      title: "A New School Year",
      task: "You are a Form 4 student at a new school. Write an email to your friend Ben about your new school life. Describe your subjects, your classmates and one thing that you find difficult. Ask Ben about his school too.",
      hints: [
        "用 email 格式：subject line、稱呼、結尾",
        "第一段：點解寫信＋整體感覺",
        "第二段：科目同同學（舉一個具體例子）",
        "第三段：一樣困難＋你點樣面對",
        "結尾：問候 Ben 嘅校園生活"
      ],
      targetWords: 200
    },
    {
      type: "Part A",
      title: "Sports Day Notice",
      task: "Your school will hold Sports Day next month. Write a notice for the school noticeboard. Give the date, time and place, list two events, and tell students how to join.",
      hints: [
        "大字標題＋一句吸引嘅開頭",
        "清楚列出日期、時間、地點",
        "兩項比賽項目",
        "報名方法同截止日期",
        "提醒學生要注意嘅事"
      ],
      targetWords: 200
    },
    {
      type: "Part A",
      title: "Social Media and Me",
      task: "The school magazine is running a special issue on social media. Write an article about how students use social media. Include one good point, one problem and one piece of advice.",
      hints: [
        "加一個吸引嘅標題",
        "用問題或數字開頭",
        "好處：保持聯絡／學新嘢",
        "問題：花太多時間／睡眠不足",
        "建議：設定每日時限"
      ],
      targetWords: 200
    },
    {
      type: "Part A",
      title: "An Environmental Club",
      task: "Your school wants to start an environmental club. Write an email to the Principal. Explain why the club is useful and suggest two activities. Ask for permission and support.",
      hints: [
        "正式 email：Dear Principal",
        "說明目的：想成立環保學會",
        "兩個活動例子（例如回收日、植樹）",
        "解釋對學校嘅好處",
        "禮貌地請求批准同支持"
      ],
      targetWords: 200
    },
    {
      type: "Part A",
      title: "Eat Well, Feel Well",
      task: "Write an article for the school newspaper about healthy eating. Describe one bad eating habit among students, explain why it is a problem, and give two simple suggestions.",
      hints: [
        "標題要吸引",
        "指出一個常見壞習慣（例如唔食早餐）",
        "講影響：精神差／容易病",
        "兩個簡單可行嘅建議",
        "結尾鼓勵讀者"
      ],
      targetWords: 200
    },
    {
      type: "Part A",
      title: "My First Part-time Job",
      task: "You worked at a bookshop during the summer holiday. Write an email to your cousin Amy about the experience. Say what you did, what you learned, and whether you would do it again.",
      hints: [
        "半正式 email：Hi Amy",
        "工作內容同工作時間",
        "一件難忘嘅事",
        "學到啲咩",
        "會唔會再做＋問候"
      ],
      targetWords: 200
    },
    {
      type: "Part A",
      title: "Join Our Volunteer Visit",
      task: "You are the chairperson of the Community Service Club. Write a speech for the morning assembly. Encourage students to join a visit to an elderly centre and explain what they will do.",
      hints: [
        "稱呼校長、老師同同學",
        "介紹活動日期同地點",
        "義工會做啲咩（談天、玩遊戲）",
        "為何有意義",
        "呼籲同學報名"
      ],
      targetWords: 200
    },
    {
      type: "Part A",
      title: "Smartphones in Our School",
      task: "Write a report on a survey about students' smartphone use. Say how many students were surveyed, present two findings, and give one recommendation.",
      hints: [
        "報告格式：Introduction、Findings、Recommendation",
        "交代調查人數同對象",
        "兩個發現（用數字）",
        "一個具體建議",
        "簡單總結"
      ],
      targetWords: 200
    },
    {
      type: "Part B",
      title: "Less Waste, More Care",
      task: "There is a lot of food waste in your school. Write a proposal to the Principal suggesting ways to reduce it. Explain the problem, describe your plan, and say what the school will need.",
      hints: [
        "建議書格式：背景、目的、計劃、資源、好處",
        "用數字或觀察描述浪費情況",
        "兩至三個具體措施",
        "需要嘅資源同人手",
        "禮貌請求支持"
      ],
      targetWords: 400
    },
    {
      type: "Part B",
      title: "Stress Before Exams",
      task: "Many students feel stressed before exams. Write an article for the school magazine. Discuss the causes of study stress, describe how it affects students, and suggest ways to deal with it.",
      hints: [
        "引言：用問題引起共鳴",
        "原因：功課多、比較、父母期望",
        "影響：失眠、冇胃口、唔專心",
        "建議：時間表、運動、傾訴",
        "結尾：正面信息"
      ],
      targetWords: 400
    },
    {
      type: "Part B",
      title: "Too Many Tourists?",
      task: "Tourism brings money to Hong Kong, but it also causes problems in some districts. Write a letter to the editor of a newspaper. Explain the problems and suggest what the government and tourists can do.",
      hints: [
        "Dear Editor 開頭",
        "好處：工作機會、收入",
        "問題：擠迫、垃圾、物價",
        "政府可以做嘅事",
        "遊客可以做嘅事＋呼籲"
      ],
      targetWords: 400
    },
    {
      type: "Part B",
      title: "Should E-sports Be a School Activity?",
      task: "Your school is thinking about starting an e-sports team. Write an article for the school magazine. Give arguments for and against, and give your own opinion.",
      hints: [
        "引言：講出爭議",
        "支持：團隊合作、反應快、有比賽",
        "反對：打機時間、健康、學業",
        "你嘅立場同原因",
        "結論：平衡嘅做法"
      ],
      targetWords: 400
    },
    {
      type: "Part B",
      title: "A Plastic-free School",
      task: "Write a proposal to the Principal about making the school use less plastic. Describe the current situation, suggest three actions, and explain the benefits.",
      hints: [
        "背景：校內即棄塑膠情況",
        "三個行動（飲水機、餐具、獎勵計劃）",
        "所需資源",
        "預期好處",
        "結尾請求批准"
      ],
      targetWords: 400
    },
    {
      type: "Part B",
      title: "Learning Online: What Students Think",
      task: "Your school wants to know what students think about online learning. Write a report based on a survey of 150 students. Present the findings and make recommendations.",
      hints: [
        "報告格式同標題",
        "調查方法：150 名學生",
        "優點：方便、可以重看",
        "缺點：分心、少互動",
        "建議：混合模式"
      ],
      targetWords: 400
    },
    {
      type: "Part B",
      title: "Making Our Library Better",
      task: "Write a proposal to the school librarian suggesting improvements to the library. Explain what is good now, what needs to change, and how your ideas can help students.",
      hints: [
        "先讚後建議",
        "兩個問題（書舊、座位少）",
        "具體改善方法",
        "所需資源",
        "結尾客氣請求考慮"
      ],
      targetWords: 400
    },
    {
      type: "Part B",
      title: "Walk for a Good Cause",
      task: "You are the chairperson of the Community Service Club. Write a proposal to the Principal about holding a charity walk for a children's home. Include the aims, plan, resources and benefits.",
      hints: [
        "背景：社區服務學會想籌款",
        "目的：幫助兒童之家",
        "路線、日期、參加者",
        "資源同安全安排",
        "預期成果＋請求批准"
      ],
      targetWords: 400
    }
  ]
};
