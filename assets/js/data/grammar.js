window.DSE_GRAMMAR = [
  {
    id: "sv-agreement",
    title: "主語動詞一致 Subject-Verb Agreement",
    zh: "主語同動詞要夾，單數眾數唔好搞亂。",
    why: "DSE Paper 2 寫作同 Paper 3 綜合能力每一句都考。主語同動詞唔一致，考官一眼就見到，直接拉低 Language 分。",
    rules: [
      {
        h: "單數主語加 -s",
        p: "he / she / it / 人名 / 單數名詞後面，動詞要加 -s。眾數主語就用原形。",
        good: ["She works in a hospital.", "The report shows a clear trend."],
        bad: ["She work in a hospital.", "The report show a clear trend."]
      },
      {
        h: "眾數主語用原形",
        p: "two students / they / we 呢類眾數主語後面，動詞唔加 -s。",
        good: ["The students study hard every day.", "They live near the school."],
        bad: ["The students studies hard every day.", "They lives near the school."]
      },
      {
        h: "everyone / each / nobody 當單數",
        p: "呢啲字表面睇好似好多人，但文法上係單數，動詞要加 -s。",
        good: ["Everyone knows the answer.", "Each of the students has a locker."],
        bad: ["Everyone know the answer.", "Each of the students have a locker."]
      },
      {
        h: "There is / There are 睇後面名詞",
        p: "後面係單數或不可數名詞用 There is，眾數名詞用 There are。",
        good: ["There is a library near my home.", "There are two reasons for this."],
        bad: ["There are a library near my home.", "There is two reasons for this."]
      },
      {
        h: "together with / as well as 唔影響主語",
        p: "主語後面加 together with 或 as well as，動詞仍然跟第一個主語。",
        good: ["The teacher, together with her students, visits the museum.", "The manager, as well as the staff, was informed."],
        bad: ["The teacher, together with her students, visit the museum.", "The manager, as well as the staff, were informed."]
      }
    ],
    traps: [
      "見到 and 就當眾數：My friend and I goes to school 錯，應該用 go。",
      "The news are good 錯，news 係單數，用 is。",
      "One of the students are 錯，主語係 One，用 is。",
      "The number of visitors are 錯，主語係 The number，用 is。"
    ],
    drills: [
      {
        q: "The number of visitors ____ increased sharply.",
        options: ["have", "are", "were", "has"],
        a: 3,
        why: "The number 係單數主語，所以用 has。"
      },
      {
        q: "Each of the students ____ a locker.",
        options: ["has", "have", "are", "were"],
        a: 0,
        why: "Each 當單數，所以動詞用 has。"
      },
      {
        q: "There ____ two reasons for this.",
        options: ["is", "was", "are", "has"],
        a: 2,
        why: "後面係眾數名詞 two reasons，所以用 There are。"
      },
      {
        q: "The teacher, together with her students, ____ the museum every year.",
        options: ["visit", "visits", "are visiting", "have visited"],
        a: 1,
        why: "together with 唔影響主語，主語 The teacher 係單數，用 visits。"
      }
    ]
  },
  {
    id: "present-tenses",
    title: "現在式 Simple vs Continuous",
    zh: "現在式分習慣同進行中，唔好亂用。",
    why: "Paper 2 講日常、講數據、講趨勢都用現在式。時態亂，考官會覺得你連基本句子都未控制好。",
    rules: [
      {
        h: "習慣同事實用 simple present",
        p: "every day / usually / always 呢類字，講習慣或真理，用動詞原形或加 -s。",
        good: ["I go to school by bus every day.", "Water boils at 100 degrees."],
        bad: ["I am going to school by bus every day.", "Water is boiling at 100 degrees."]
      },
      {
        h: "此刻進行用 present continuous",
        p: "now / at the moment / Look! 呢類字，講而家發生緊嘅事，用 am / is / are + -ing。",
        good: ["The students are revising for their exam now.", "Look! It is raining."],
        bad: ["The students revise for their exam now.", "Look! It rains."]
      },
      {
        h: "狀態動詞唔用進行式",
        p: "know / like / want / belong / understand 呢類動詞講狀態，通常唔用 -ing。",
        good: ["I know the answer.", "She likes this song."],
        bad: ["I am knowing the answer.", "She is liking this song."]
      },
      {
        h: "時間表用 simple present",
        p: "班次、課程、活動時間表，用 simple present 講將來嘅固定安排。",
        good: ["The train leaves at 7:30 tomorrow morning.", "The film starts at 8 p.m."],
        bad: ["The train is leave at 7:30 tomorrow morning.", "The film is start at 8 p.m."]
      },
      {
        h: "頻率副詞配 simple present",
        p: "always / usually / often / sometimes / never 講習慣，配 simple present，唔配進行式。",
        good: ["He usually walks to school.", "They never eat fast food."],
        bad: ["He is usually walking to school.", "They are never eating fast food."]
      }
    ],
    traps: [
      "I am knowing the answer 錯，know 唔用進行式。",
      "Every day I am going to school 錯，習慣用 go。",
      "Look! 後面漏咗 is / are + -ing，寫成 Look! It rains。",
      "Present continuous 唔可以用來講一般事實。"
    ],
    drills: [
      {
        q: "She ____ to school by bus every day.",
        options: ["go", "is going", "going", "goes"],
        a: 3,
        why: "every day 講習慣，主語 She 係單數，用 goes。"
      },
      {
        q: "Listen! Someone ____ at the door.",
        options: ["knocks", "knock", "is knocking", "knocked"],
        a: 2,
        why: "Listen! 表示而家發生緊，用 is knocking。"
      },
      {
        q: "I ____ this song a lot.",
        options: ["am liking", "like", "likes", "am like"],
        a: 1,
        why: "like 係狀態動詞，唔用進行式，主語 I 用原形。"
      },
      {
        q: "The train ____ at 7:30 tomorrow morning.",
        options: ["leave", "is leave", "leaving", "leaves"],
        a: 3,
        why: "時間表用 simple present，主語 The train 係單數，用 leaves。"
      }
    ]
  },
  {
    id: "past-tense",
    title: "過去式與不規則動詞 Past Tense",
    zh: "講過去要用過去式，不規則動詞要背。",
    why: "Paper 2 講經歷、講活動最常用過去式。動詞唔變過去式，件事嘅時間就模糊，Content 同 Language 一齊扣分。",
    rules: [
      {
        h: "過去發生用 past simple",
        p: "yesterday / last week / two years ago 呢類過去時間，動詞要用過去式。",
        good: ["I visited my grandmother last Sunday.", "We watched a film two days ago."],
        bad: ["I visit my grandmother last Sunday.", "We watch a film two days ago."]
      },
      {
        h: "規則動詞加 -ed",
        p: "大部分動詞直接加 -ed；以 e 結尾加 -d；子音加 y 結尾轉 -ied。",
        good: ["She finished her homework.", "They carried the boxes upstairs."],
        bad: ["She finish her homework.", "They carryed the boxes upstairs."]
      },
      {
        h: "不規則動詞要記",
        p: "go-went / see-saw / buy-bought / take-took 呢類要逐個記，唔可以加 -ed。",
        good: ["He bought a new phone yesterday.", "I saw my teacher at the market."],
        bad: ["He buyed a new phone yesterday.", "I seed my teacher at the market."]
      },
      {
        h: "否定同疑問用 did + 原形",
        p: "did not / Did you 後面一定用動詞原形，唔用過去式。",
        good: ["He did not come to school yesterday.", "Did you see the notice?"],
        bad: ["He did not came to school yesterday.", "Did you saw the notice?"]
      },
      {
        h: "used to 講以前習慣",
        p: "used to + 原形，講以前經常做但而家唔再做嘅事。",
        good: ["We used to play football here.", "She used to live in Kowloon."],
        bad: ["We used to played football here.", "She used to lived in Kowloon."]
      }
    ],
    traps: [
      "I didn't went 錯，did 後面用原形 go。",
      "Yesterday I go to school 錯，yesterday 要配 went。",
      "把不規則動詞當規則：goed、buyed、teached 都錯。",
      "used to 後面唔加 -ed，用原形。"
    ],
    drills: [
      {
        q: "Yesterday, I ____ my homework before dinner.",
        options: ["finished", "finish", "have finished", "finishing"],
        a: 0,
        why: "Yesterday 係過去時間，用過去式 finished。"
      },
      {
        q: "She ____ the answer immediately.",
        options: ["know", "knowed", "knew", "known"],
        a: 2,
        why: "know 嘅過去式係不規則嘅 knew。"
      },
      {
        q: "They ____ to Japan last summer.",
        options: ["go", "gone", "went", "have gone"],
        a: 2,
        why: "last summer 係過去時間，go 嘅過去式係 went。"
      },
      {
        q: "He ____ not come to school yesterday.",
        options: ["does", "did", "was", "has"],
        a: 1,
        why: "過去式否定用 did not + 原形。"
      }
    ]
  },
  {
    id: "perfect-tenses",
    title: "完成式 Present / Past Perfect",
    zh: "完成式講過去同現在嘅關係。",
    why: "Paper 2 講經驗、講變化好有用。用錯就會同過去式混淆，考官睇唔出你邊句講緊邊個時間。",
    rules: [
      {
        h: "Present perfect: have / has + past participle",
        p: "講經驗，或者過去動作對現在有影響，用 have / has + 過去分詞。",
        good: ["I have finished my project.", "She has lost her keys, so she cannot enter."],
        bad: ["I have finish my project.", "She has lose her keys, so she cannot enter."]
      },
      {
        h: "since 同 for 分工",
        p: "since 後面接起點（2015 / last year），for 後面接一段時間（ten years）。",
        good: ["I have lived here since 2015.", "We have known each other for ten years."],
        bad: ["I have lived here for 2015.", "We have known each other since ten years."]
      },
      {
        h: "Past perfect: had + past participle",
        p: "兩件過去事之中，較早發生嗰件用 had + 過去分詞。",
        good: ["The bus had left before we arrived.", "She had finished the report before the meeting."],
        bad: ["The bus has left before we arrived.", "She has finished the report before the meeting."]
      },
      {
        h: "過去時間唔配 present perfect",
        p: "yesterday / last week / two days ago 呢類明確過去時間，要用 past simple。",
        good: ["I saw him yesterday.", "We finished the project last week."],
        bad: ["I have seen him yesterday.", "We have finished the project last week."]
      },
      {
        h: "already / yet / ever / never 配 present perfect",
        p: "呢啲字講到現在為止嘅經驗或進度，常用 present perfect。",
        good: ["Have you ever been to Japan?", "She has already finished her homework."],
        bad: ["Have you ever went to Japan?", "She has already finish her homework."]
      }
    ],
    traps: [
      "I have seen him yesterday 錯，yesterday 要用 saw。",
      "since 後面接時間長度：since ten years 錯，用 for ten years。",
      "past perfect 寫成 has + 過去分詞，會搞亂兩件過去事嘅先後。",
      "過去分詞唔好當過去式：have went 錯，用 have gone。"
    ],
    drills: [
      {
        q: "I ____ in Hong Kong since 2015.",
        options: ["live", "lived", "am living", "have lived"],
        a: 3,
        why: "since 2015 講由過去到現在，用 present perfect have lived。"
      },
      {
        q: "When I arrived, she ____ already left.",
        options: ["has", "was", "had", "did"],
        a: 2,
        why: "兩件過去事之中，較早發生嘅用 past perfect，所以用 had left。"
      },
      {
        q: "Have you ever ____ a horse?",
        options: ["ride", "rode", "riding", "ridden"],
        a: 3,
        why: "present perfect 用 have + 過去分詞，ride 嘅過去分詞係 ridden。"
      },
      {
        q: "We ____ each other for ten years.",
        options: ["know", "knew", "have known", "are knowing"],
        a: 2,
        why: "for ten years 講由過去到現在，用 have known。"
      }
    ]
  },
  {
    id: "future-forms",
    title: "將來式 Future Forms",
    zh: "將來式有幾種，要按情況揀。",
    why: "Paper 2 寫計劃同預測常用將來式。will 同 be going to 亂用，句子仲明，但準確度會被扣。",
    rules: [
      {
        h: "will + 原形",
        p: "即時決定、承諾、或者純預測，用 will + 動詞原形。",
        good: ["I will call you tonight.", "I think it will be sunny tomorrow."],
        bad: ["I will to call you tonight.", "She will goes to the party."]
      },
      {
        h: "be going to + 原形",
        p: "已經計劃好，或者有明顯跡象嘅預測，用 am / is / are going to + 原形。",
        good: ["She is going to study medicine.", "Look at the clouds. It is going to rain."],
        bad: ["She is going to studies medicine.", "Look at the clouds. It is going to raining."]
      },
      {
        h: "present continuous 講已安排",
        p: "同人約好、訂好咗嘅將來活動，用 present continuous。",
        good: ["We are meeting my aunt this Friday.", "They are flying to Tokyo tomorrow."],
        bad: ["We are meet my aunt this Friday.", "They are fly to Tokyo tomorrow."]
      },
      {
        h: "simple present 講時間表",
        p: "班次、戲院、課程時間表，用 simple present。",
        good: ["The plane takes off at 6 p.m.", "The course begins next Monday."],
        bad: ["The plane take off at 6 p.m.", "The course begin next Monday."]
      },
      {
        h: "未來式後面一定用原形",
        p: "will 同 be going to 後面都唔可以加 to、-s 或者 -ing。",
        good: ["He will help us.", "They are going to visit the museum."],
        bad: ["He will to help us.", "They are going to visiting the museum."]
      }
    ],
    traps: [
      "will 後面加 to：I will to go 錯，用 I will go。",
      "be going to 後面加 -ing 或 -s：going to studying 錯。",
      "已安排嘅活動用 will，會令語氣似即時決定。",
      "時間表用 will，會唔夠準確，例如 The train will leave at 7:30 不如 leaves。"
    ],
    drills: [
      {
        q: "Look at those clouds. It ____ rain.",
        options: ["is going", "will to", "is going to", "going to"],
        a: 2,
        why: "有明顯跡象（烏雲）嘅預測用 is going to。"
      },
      {
        q: "The plane ____ at 6 p.m. tomorrow.",
        options: ["take off", "is take off", "will taking off", "takes off"],
        a: 3,
        why: "時間表用 simple present，主語 The plane 係單數，用 takes off。"
      },
      {
        q: "I promise I ____ you tomorrow.",
        options: ["call", "am call", "will call", "called"],
        a: 2,
        why: "I promise 係承諾，用 will + 原形。"
      },
      {
        q: "We ____ dinner with my aunt this Friday. We have booked a table.",
        options: ["have", "are having", "had", "would have"],
        a: 1,
        why: "已訂枱係安排好嘅將來活動，用 present continuous are having。"
      }
    ]
  },
  {
    id: "articles",
    title: "冠詞 a / an / the",
    zh: "a / an / the 幾時用，幾時唔用。",
    why: "Paper 2 每段都會出現冠詞。漏 the 或者亂加 a，係考官最易見到嘅小錯，會累積成 Language 扣分。",
    rules: [
      {
        h: "a / an 講其中一個",
        p: "第一次提，或者講任何一個，用 a / an。響音開頭用 an。",
        good: ["She is an honest person.", "I saw a dog in the park."],
        bad: ["She is a honest person.", "I saw an dog in the park."]
      },
      {
        h: "the 講特定或獨一無二",
        p: "第二次提、雙方都知道係邊個，或者獨一無二嘅事物，用 the。",
        good: ["The sun rises in the east.", "I bought a book. The book is interesting."],
        bad: ["Sun rises in the east.", "I bought a book. A book is interesting."]
      },
      {
        h: "一般事物唔加冠詞",
        p: "眾數名詞或者不可數名詞講一般情況，前面唔加 a / an / the。",
        good: ["I like music, especially pop.", "She gave me advice."],
        bad: ["I like a music, especially pop.", "She gave me an advice."]
      },
      {
        h: "發音決定 a 定 an",
        p: "睇讀音唔係睇字母：an hour、a university、an honest man。",
        good: ["He waited for an hour.", "She studies at a university."],
        bad: ["He waited for a hour.", "She studies at an university."]
      },
      {
        h: "the + 最高級",
        p: "最高級講一個範圍入面最突出嘅一個，前面通常加 the。",
        good: ["This is the best film I have seen.", "He is the tallest boy in the class."],
        bad: ["This is best film I have seen.", "He is tallest boy in the class."]
      }
    ],
    traps: [
      "a hour 錯，hour 嘅 h 唔發音，用 an hour。",
      "an university 錯，university 讀 /juː/，用 a university。",
      "講一般事物亂加 the：I like the music 意思會變咗指定某啲音樂。",
      "最高級漏 the：She is tallest girl 錯。"
    ],
    drills: [
      {
        q: "She is ____ honest person.",
        options: ["a", "an", "the", "no article"],
        a: 1,
        why: "honest 嘅 h 唔發音，響音開頭用 an。"
      },
      {
        q: "____ sun rises in the east.",
        options: ["A", "An", "No article", "The"],
        a: 3,
        why: "太陽係獨一無二，用 The。"
      },
      {
        q: "He studies at ____ university in Hong Kong.",
        options: ["a", "an", "the", "no article"],
        a: 0,
        why: "university 讀音以 /j/ 開頭，唔係響音，用 a。"
      },
      {
        q: "I like ____ music, especially pop.",
        options: ["a", "an", "the", "no article"],
        a: 3,
        why: "music 係不可數名詞，講一般喜好唔加冠詞。"
      }
    ]
  },
  {
    id: "countable",
    title: "可數與不可數名詞 Quantifiers",
    zh: "可數同不可數名詞，配啱數量詞。",
    why: "Paper 2 講數據同建議時，many / much、advice / information 用錯好顯眼，直接影響準確度分。",
    rules: [
      {
        h: "可數名詞配 many / a few",
        p: "可數名詞有單眾數，配 many、a few、few、several。",
        good: ["There are many students in the hall.", "I have a few questions."],
        bad: ["There are much students in the hall.", "I have a little questions."]
      },
      {
        h: "不可數名詞配 much / a little",
        p: "不可數名詞冇眾數，配 much、a little、little。",
        good: ["I only have a little money left.", "She did not spend much time on it."],
        bad: ["I only have a few money left.", "She did not spend many time on it."]
      },
      {
        h: "some 同 any 分工",
        p: "some 用肯定句，any 用否定句同疑問句。",
        good: ["We have some information.", "Do you have any questions?"],
        bad: ["We have any information.", "She did not buy some milk."]
      },
      {
        h: "不可數名詞用單位量詞",
        p: "用 a piece of advice、an item of furniture、a bottle of water 呢類單位表達數量。",
        good: ["She gave me a piece of advice.", "We bought two items of furniture."],
        bad: ["She gave me an advice.", "We bought two furnitures."]
      },
      {
        h: "常見不可數名詞",
        p: "advice、information、furniture、equipment、news 都係不可數，唔加 -s。",
        good: ["The news is good.", "We need more equipment."],
        bad: ["The news are good.", "We need more equipments."]
      }
    ],
    traps: [
      "advices、informations、furnitures 都錯，呢啲字唔加 -s。",
      "many money 錯，money 不可數，用 much money。",
      "a few water 錯，水不可數，用 a little water。",
      "an advice 錯，用 a piece of advice。"
    ],
    drills: [
      {
        q: "There are ____ students in the hall.",
        options: ["much", "many", "a little", "a great deal of"],
        a: 1,
        why: "students 係可數眾數，用 many。"
      },
      {
        q: "I only have ____ money left.",
        options: ["a few", "many", "few", "a little"],
        a: 3,
        why: "money 係不可數，用 a little。"
      },
      {
        q: "She gave me some useful ____.",
        options: ["advices", "advice", "an advice", "many advice"],
        a: 1,
        why: "advice 係不可數，唔加 -s，亦唔加 an。"
      },
      {
        q: "We need ____ information before we decide.",
        options: ["many", "a few", "more", "several"],
        a: 2,
        why: "information 係不可數，用 more，唔用 many / a few / several。"
      }
    ]
  },
  {
    id: "plurals",
    title: "複數與拼寫規則 Plurals",
    zh: "複數唔止加 s，拼寫規則要記。",
    why: "Paper 2 寫作經常講數量。複數串錯，考官會當拼寫錯誤，Spelling 同 Language 都會扣。",
    rules: [
      {
        h: "一般加 -s，部分加 -es",
        p: "大部分名詞加 -s；以 -s、-x、-ch、-sh 結尾加 -es。",
        good: ["She bought two books.", "There are three boxes on the desk."],
        bad: ["She bought two book.", "There are three boxs on the desk."]
      },
      {
        h: "子音 + y 轉 -ies",
        p: "子音加 y 結尾轉 -ies；元音加 y 就直接加 -s。",
        good: ["The babies are sleeping.", "The boys are playing in the park."],
        bad: ["The babys are sleeping.", "The boies are playing in the park."]
      },
      {
        h: "部分 -f / -fe 轉 -ves",
        p: "leaf、loaf、knife、wife 呢類轉 -ves，但要逐個記。",
        good: ["She bought two loaves of bread.", "The leaves are falling."],
        bad: ["She bought two loafs of bread.", "The leafs are falling."]
      },
      {
        h: "不規則複數要背",
        p: "child-children、man-men、woman-women、tooth-teeth、foot-feet。",
        good: ["There are three children in the room.", "He brushed his teeth."],
        bad: ["There are three childs in the room.", "He brushed his tooths."]
      },
      {
        h: "不可數名詞唔加 -s",
        p: "information、advice、furniture、equipment 呢類不可數名詞，永遠唔加 -s。",
        good: ["We need more information.", "The furniture is new."],
        bad: ["We need more informations.", "The furnitures are new."]
      }
    ],
    traps: [
      "childs、mans、tooths 都錯，要用 children、men、teeth。",
      "information 同 advice 唔加 -s。",
      "元音 + y 唔轉 ies：boies 錯，用 boys。",
      "leafs 錯，用 leaves。"
    ],
    drills: [
      {
        q: "There are three ____ in the room.",
        options: ["childs", "children", "childes", "childrens"],
        a: 1,
        why: "child 嘅複數係不規則嘅 children。"
      },
      {
        q: "She bought two ____ of bread.",
        options: ["loaves", "loafs", "loafes", "loaf"],
        a: 0,
        why: "loaf 嘅複數轉 -ves，變成 loaves。"
      },
      {
        q: "The ____ are playing in the park.",
        options: ["boy", "boies", "boys", "boyes"],
        a: 2,
        why: "boy 係元音加 y，直接加 -s 變成 boys。"
      },
      {
        q: "We need more ____ for the meeting.",
        options: ["information", "informations", "few information", "an information"],
        a: 0,
        why: "information 係不可數名詞，唔加 -s。"
      }
    ]
  },
  {
    id: "prepositions-time",
    title: "時間介詞 in / on / at",
    zh: "in / on / at 講時間，各有固定用法。",
    why: "Paper 2 講活動時間好常見。介詞錯係小錯，但每段都出現就會拖低 Language 分。",
    rules: [
      {
        h: "in + 月份 / 年份 / 季節",
        p: "較長時間範圍用 in：in May、in 2026、in summer。",
        good: ["She was born in 2005.", "We often travel in summer."],
        bad: ["She was born on 2005.", "We often travel at summer."]
      },
      {
        h: "on + 星期 / 日期",
        p: "特定日子用 on：on Monday、on 12 May、on my birthday。",
        good: ["My birthday is on 12 May.", "We have a test on Monday."],
        bad: ["My birthday is in 12 May.", "We have a test at Monday."]
      },
      {
        h: "at + 鐘點 / night",
        p: "鐘點同某啲固定講法用 at：at 9 a.m.、at night、at the weekend。",
        good: ["The meeting starts at 9 a.m.", "I cannot sleep at night."],
        bad: ["The meeting starts in 9 a.m.", "I cannot sleep on night."]
      },
      {
        h: "next / last / every 前面唔加介詞",
        p: "next week、last year、every day 前面唔需要 in / on / at。",
        good: ["We will visit Japan next summer.", "She calls me every day."],
        bad: ["We will visit Japan in next summer.", "She calls me on every day."]
      },
      {
        h: "in the morning 但 on Monday morning",
        p: "一般早上用 in the morning；有指定星期就轉 on。",
        good: ["I study best in the morning.", "We met on Monday morning."],
        bad: ["I study best on the morning.", "We met in Monday morning."]
      }
    ],
    traps: [
      "in 9 a.m. 錯，鐘點用 at。",
      "on 2026 錯，年份用 in。",
      "in next week 錯，next 前面唔加介詞。",
      "on the morning 錯，一般早上用 in the morning。"
    ],
    drills: [
      {
        q: "The meeting starts ____ 9 a.m.",
        options: ["in", "on", "at", "for"],
        a: 2,
        why: "鐘點前面用 at。"
      },
      {
        q: "My birthday is ____ 12 May.",
        options: ["on", "in", "at", "by"],
        a: 0,
        why: "特定日期用 on。"
      },
      {
        q: "We will visit Japan ____ next summer.",
        options: ["in", "on", "at", "no preposition"],
        a: 3,
        why: "next summer 前面唔加介詞。"
      },
      {
        q: "She was born ____ 2005.",
        options: ["in", "on", "at", "since"],
        a: 0,
        why: "年份前面用 in。"
      }
    ]
  },
  {
    id: "prepositions-place",
    title: "地方介詞 Prepositions of Place",
    zh: "地方介詞睇空間關係，唔好亂用。",
    why: "Paper 2 描述地方同路線常用介詞。in / on / at 亂用，讀者跟唔到位置，Content 分都會受影響。",
    rules: [
      {
        h: "in 講有範圍嘅空間",
        p: "被包圍或者有界線嘅空間用 in：in the room、in Hong Kong、in the box。",
        good: ["The keys are in my bag.", "She lives in Hong Kong."],
        bad: ["The keys are on my bag.", "She lives at Hong Kong."]
      },
      {
        h: "on 講表面",
        p: "物件放喺另一個物件嘅表面，用 on：on the table、on the wall。",
        good: ["The book is on the table.", "There is a poster on the wall."],
        bad: ["The book is in the table.", "There is a poster at the wall."]
      },
      {
        h: "at 講一個點",
        p: "把地方看成一點或者特定場所，用 at：at the bus stop、at school、at the airport。",
        good: ["He is waiting at the bus stop.", "I will meet you at the entrance."],
        bad: ["He is waiting in the bus stop.", "I will meet you on the entrance."]
      },
      {
        h: "between 兩者，among 三者以上",
        p: "between 用於兩者之間；among 用於三個或以上之中。",
        good: ["The bank is between the post office and the school.", "The teacher stood among the crowd."],
        bad: ["The bank is among the post office and the school.", "The teacher stood between the crowd."]
      },
      {
        h: "arrive at / arrive in",
        p: "細地方用 arrive at，大城市或國家用 arrive in，唔用 arrive to。",
        good: ["We arrived at the airport on time.", "They arrived in Tokyo yesterday."],
        bad: ["We arrived to the airport on time.", "They arrived at Tokyo yesterday."]
      }
    ],
    traps: [
      "live at Hong Kong 錯，城市用 live in。",
      "in the table 錯，表面用 on the table。",
      "arrive to 錯，用 arrive at 或 arrive in。",
      "between 用喺三個以上嘅人或物係錯，要用 among。"
    ],
    drills: [
      {
        q: "The book is ____ the table.",
        options: ["in", "on", "at", "to"],
        a: 1,
        why: "書放喺枱面，用 on。"
      },
      {
        q: "She lives ____ Hong Kong.",
        options: ["at", "on", "in", "to"],
        a: 2,
        why: "城市係有範圍嘅地方，用 in。"
      },
      {
        q: "He is waiting ____ the bus stop.",
        options: ["in", "on", "at", "between"],
        a: 2,
        why: "bus stop 當一個點，用 at。"
      },
      {
        q: "The bank is ____ the post office and the school.",
        options: ["between", "among", "in", "on"],
        a: 0,
        why: "兩者之間用 between。"
      }
    ]
  },
  {
    id: "pronouns",
    title: "代詞與指代 Pronouns",
    zh: "代詞要指得清楚，主格賓格唔好亂。",
    why: "Paper 2 段落入面代詞用錯，讀者唔知你講邊個，影響 Coherence；主賓格錯就係直接 Language 扣分。",
    rules: [
      {
        h: "主格做主語，賓格做賓語",
        p: "I / he / she / we / they 做主語；me / him / her / us / them 做賓語或放介詞後。",
        good: ["My brother and I went to the cinema.", "Please give the book to him."],
        bad: ["My brother and me went to the cinema.", "Please give the book to he."]
      },
      {
        h: "物主形容詞後面要加名詞",
        p: "my / your / his / her / our / their 後面一定要有名詞。",
        good: ["This is my bag.", "Their teacher is very kind."],
        bad: ["This is my.", "Their is very kind."]
      },
      {
        h: "物主代詞後面唔加名詞",
        p: "mine / yours / his / hers / ours / theirs 本身已經代替名詞。",
        good: ["This bag is mine, not yours.", "Her answer was better than his."],
        bad: ["This bag is my, not your.", "Her answer was better than he."]
      },
      {
        h: "反身代詞指返主語",
        p: "myself / yourself / himself / herself / ourselves / themselves 用嚟指返句子主語。",
        good: ["The students cleaned the classroom themselves.", "I made this cake myself."],
        bad: ["The students cleaned the classroom theirselves.", "I made this cake meself."]
      },
      {
        h: "it / its 要分清楚",
        p: "its 係所有格，it's 係 it is 或 it has 嘅縮寫。",
        good: ["The dog lost its collar.", "It's raining outside."],
        bad: ["The dog lost it's collar.", "Its raining outside."]
      }
    ],
    traps: [
      "My friend and me went 錯，主語用 I。",
      "between you and I 錯，介詞後用 me。",
      "theirselves 錯，正確係 themselves。",
      "its 同 it's 唔分，寫作會當基本錯誤。"
    ],
    drills: [
      {
        q: "My brother and ____ went to the cinema.",
        options: ["me", "I", "myself", "mine"],
        a: 1,
        why: "呢個位置係主語，用主格 I。"
      },
      {
        q: "This bag is ____, not yours.",
        options: ["my", "me", "mine", "myself"],
        a: 2,
        why: "後面冇名詞，用物主代詞 mine。"
      },
      {
        q: "The students cleaned the classroom ____.",
        options: ["themself", "themselves", "theirselves", "itself"],
        a: 1,
        why: "主語係 The students，反身代詞用 themselves。"
      },
      {
        q: "Please give the book to ____.",
        options: ["I", "we", "he", "him"],
        a: 3,
        why: "介詞 to 後面用賓格 him。"
      }
    ]
  },
  {
    id: "comparatives",
    title: "比較級與最高級 Comparatives",
    zh: "比較級同最高級，句式要完整。",
    why: "Paper 2 講比較同趨勢一定會用。double comparative 或者漏 than，考官會即刻見到，影響 Language 分。",
    rules: [
      {
        h: "短形容詞加 -er / -est",
        p: "一個音節嘅形容詞通常加 -er（比較級）或 -est（最高級）。",
        good: ["This road is longer than that one.", "She is the tallest student in the class."],
        bad: ["This road is more long than that one.", "She is the most tall student in the class."]
      },
      {
        h: "長形容詞用 more / most",
        p: "兩個音節以上嘅形容詞，用 more / most + 原形。",
        good: ["Hong Kong is more crowded than Macau.", "This is the most interesting book."],
        bad: ["Hong Kong is crowdeder than Macau.", "This is the interestingest book."]
      },
      {
        h: "比較用 than，一樣用 as ... as",
        p: "比較兩樣用 than；講程度一樣用 as + 原形 + as。",
        good: ["He runs faster than his brother.", "He runs as fast as his brother."],
        bad: ["He runs faster that his brother.", "He runs as faster as his brother."]
      },
      {
        h: "最高級前面加 the",
        p: "最高級講一個範圍入面最突出嘅一個，前面通常加 the。",
        good: ["This is the best film of the year.", "She is the youngest in her class."],
        bad: ["This is best film of the year.", "She is youngest in her class."]
      },
      {
        h: "不規則比較要背",
        p: "good-better-best、bad-worse-worst、far-further-furthest。",
        good: ["The weather is getting worse.", "This is the best solution."],
        bad: ["The weather is getting more worse.", "This is the goodest solution."]
      }
    ],
    traps: [
      "double comparative：more easier、more taller 都錯。",
      "比較級漏 than：He is taller his brother 錯。",
      "最高級漏 the，係 Paper 2 常見扣分位。",
      "as faster as 錯，as ... as 中間用原形。"
    ],
    drills: [
      {
        q: "This test is ____ than the last one.",
        options: ["easier", "easy", "more easy", "easiest"],
        a: 0,
        why: "easy 係短形容詞，比較級用 easier。"
      },
      {
        q: "She is the ____ student in the class.",
        options: ["tall", "taller", "tallest", "most tall"],
        a: 2,
        why: "講全班之中最突出，用最高級 tallest。"
      },
      {
        q: "Hong Kong is ____ crowded than Macau.",
        options: ["much", "most", "more", "many"],
        a: 2,
        why: "crowded 係長形容詞，比較級用 more crowded。"
      },
      {
        q: "He runs as ____ as his brother.",
        options: ["fast", "faster", "fastest", "more fast"],
        a: 0,
        why: "as ... as 中間用形容詞原形。"
      }
    ]
  },
  {
    id: "modals",
    title: "情態動詞 Modals",
    zh: "情態動詞後面用原形，唔加 to 唔加 s。",
    why: "Paper 2 寫建議同規則常用 modal。加錯 to 或者 -s，係好基礎嘅錯，會令考官覺得句子未穩。",
    rules: [
      {
        h: "modal + 原形動詞",
        p: "can / could / should / must / may / might 後面一定用原形，唔加 to、-s 或 -ed。",
        good: ["You should see a doctor.", "It may rain later."],
        bad: ["You should to see a doctor.", "It may rains later."]
      },
      {
        h: "can / could 講能力",
        p: "現在能力用 can，過去能力用 could。",
        good: ["She can swim.", "He could swim when he was five."],
        bad: ["She can swims.", "He can swim when he was five."]
      },
      {
        h: "should 講建議",
        p: "should + 原形用嚟俾建議；ought to 意思相近，但要有 to。",
        good: ["You should revise tonight.", "You ought to apologise."],
        bad: ["You should revising tonight.", "You ought apologise."]
      },
      {
        h: "must / mustn't / don't have to",
        p: "must 係必須；mustn't 係禁止；don't have to 係唔需要。",
        good: ["Students must wear a uniform.", "You don't have to bring your own pen."],
        bad: ["Students must wearing a uniform.", "You don't have to bringing your own pen."]
      },
      {
        h: "may / might 講可能性",
        p: "may 同 might 後面用原形，講可能發生嘅事。",
        good: ["The plan may work.", "She might come later."],
        bad: ["The plan may works.", "She might comes later."]
      }
    ],
    traps: [
      "should to 錯，should 後面直接加原形。",
      "mustn't 同 don't have to 意思唔同：前者禁止，後者唔需要。",
      "can 後面加 -s 或 -ing 都錯。",
      "could 講過去能力，唔好用 can 講五歲時嘅能力。"
    ],
    drills: [
      {
        q: "You ____ see a doctor. You look sick.",
        options: ["should to", "shoulds", "are should", "should"],
        a: 3,
        why: "should 後面直接加原形，唔加 to 或 -s。"
      },
      {
        q: "Students ____ use their phones during the exam. It is against the rules.",
        options: ["mustn't", "don't have to", "needn't", "couldn't"],
        a: 0,
        why: "考試期間用手機會被禁止，用 mustn't。"
      },
      {
        q: "He ____ swim when he was five.",
        options: ["can", "could", "must", "should"],
        a: 1,
        why: "講過去能力用 could。"
      },
      {
        q: "You ____ bring your own pen; I have a spare one.",
        options: ["mustn't", "shouldn't", "don't have to", "can't"],
        a: 2,
        why: "唔需要帶筆，用 don't have to，唔係禁止。"
      }
    ]
  },
  {
    id: "conditionals",
    title: "條件句 Conditionals 0 / 1 / 2",
    zh: "條件句睇真假，0 / 1 / 2 型各有句式。",
    why: "Paper 2 寫建議同假設好用條件句。if 子句入面加 will，係典型錯誤，考官一眼睇出。",
    rules: [
      {
        h: "Zero conditional：if + present, present",
        p: "講普遍真理或者必然結果，兩邊都用 present。",
        good: ["If you heat ice, it melts.", "If you press this button, the machine starts."],
        bad: ["If you heat ice, it will melts.", "If you press this button, the machine start."]
      },
      {
        h: "First conditional：if + present, will + 原形",
        p: "講將來可能發生嘅事同結果。",
        good: ["If it rains tomorrow, we will stay home.", "If you study hard, you will pass."],
        bad: ["If it will rain tomorrow, we will stay home.", "If you will study hard, you will pass."]
      },
      {
        h: "Second conditional：if + past, would + 原形",
        p: "講現在唔真實或者想像嘅情況。",
        good: ["If I were you, I would apologise.", "She would come if you invited her."],
        bad: ["If I am you, I would apologise.", "She would come if you will invite her."]
      },
      {
        h: "if 子句唔用 will / would",
        p: "will 同 would 放喺主要子句，if 子句用 present 或 past。",
        good: ["If he arrives early, we will start.", "If I had more time, I would join."],
        bad: ["If he will arrive early, we will start.", "If I would have more time, I would join."]
      },
      {
        h: "unless = if not",
        p: "unless 後面直接接肯定子句，意思等於 if ... not。",
        good: ["Unless you hurry, you will be late.", "We will cancel unless the rain stops."],
        bad: ["Unless you will hurry, you will be late.", "Unless you do not hurry, you will be late."]
      }
    ],
    traps: [
      "if 子句加 will：If it will rain 錯。",
      "second conditional 用 am：If I am you 錯，正式寫作 use were。",
      "unless 後面再加 not，會變雙重否定。",
      "unless 後面漏主語：Unless hurry, you will be late 錯。"
    ],
    drills: [
      {
        q: "If you heat ice, it ____.",
        options: ["melt", "melts", "will melting", "melted"],
        a: 1,
        why: "zero conditional 講真理，主語 it 用 melts。"
      },
      {
        q: "If it ____ tomorrow, we will stay home.",
        options: ["rains", "will rain", "rained", "raining"],
        a: 0,
        why: "first conditional 嘅 if 子句用 present，唔用 will。"
      },
      {
        q: "If I ____ you, I would apologise.",
        options: ["am", "was", "be", "were"],
        a: 3,
        why: "second conditional 用 past，If I were you 係固定講法。"
      },
      {
        q: "She would come if you ____ her.",
        options: ["invite", "invited", "will invite", "have invited"],
        a: 1,
        why: "second conditional 嘅 if 子句用 past，配合 would come。"
      }
    ]
  },
  {
    id: "passive",
    title: "被動語態 Passive Voice",
    zh: "被動語態 be + 過去分詞，重點放動作承受者。",
    why: "Paper 2 同 Paper 3 報告常用被動。漏 be 或者用錯過去分詞，句子就唔完整，直接扣 Language。",
    rules: [
      {
        h: "基本結構 be + past participle",
        p: "被動語態由 be 動詞加過去分詞組成，be 要跟時態同主語變化。",
        good: ["The report is written in English.", "The window was broken by a ball."],
        bad: ["The report is write in English.", "The window was broke by a ball."]
      },
      {
        h: "時態放喺 be 上面",
        p: "現在被動用 is / are + p.p.；過去被動用 was / were + p.p.；將來被動用 will be + p.p.。",
        good: ["English is spoken in many countries.", "The bridge will be built next year."],
        bad: ["English is speak in many countries.", "The bridge will build next year."]
      },
      {
        h: "by 後面放執行者",
        p: "知道或者需要講出邊個做，用 by + 執行者；唔重要就省略。",
        good: ["The cake was made by my mother.", "The road was repaired last week."],
        bad: ["The cake was made from my mother.", "The road was repair last week."]
      },
      {
        h: "不及物動詞冇被動",
        p: "happen、arrive、die、come 呢類動詞冇賓語，所以冇被動式。",
        good: ["The accident happened last night.", "They arrived at noon."],
        bad: ["The accident was happened last night.", "They were arrived at noon."]
      },
      {
        h: "被動常用於報告同新聞",
        p: "唔想強調執行者，或者想語氣客觀，會用被動。",
        good: ["The results were announced yesterday.", "New rules have been introduced."],
        bad: ["The results announced yesterday.", "New rules have introduced."]
      }
    ],
    traps: [
      "was wrote 錯，過去分詞係 written。",
      "was happened 錯，happen 冇被動。",
      "漏 be：The report written by him 唔係完整句子。",
      "by 後面用錯介詞，執行者用 by，材料用 from。"
    ],
    drills: [
      {
        q: "The report ____ by the manager yesterday.",
        options: ["wrote", "was written", "is written", "has wrote"],
        a: 1,
        why: "過去被動用 was + 過去分詞 written。"
      },
      {
        q: "English ____ in many countries.",
        options: ["speaks", "spoke", "is spoken", "is speaking"],
        a: 2,
        why: "English 係被講嘅語言，用 is spoken。"
      },
      {
        q: "The new bridge ____ next year.",
        options: ["will be built", "will build", "is building", "builds"],
        a: 0,
        why: "將來被動用 will be + 過去分詞 built。"
      },
      {
        q: "The problem ____ at the moment.",
        options: ["is discussing", "is discussed", "discusses", "is being discussed"],
        a: 3,
        why: "問題而家正被討論，用 present continuous passive is being discussed。"
      }
    ]
  },
  {
    id: "relative-clauses",
    title: "關係子句 who / which / that",
    zh: "關係子句用 who 或 which 連接名詞。",
    why: "Paper 2 想寫長句攞分，關係子句好有用。用錯 who / which 或者重複賓語，句子就會亂。",
    rules: [
      {
        h: "who 指人，which 指物",
        p: "限定性關係子句入面，who 代替人，which 代替事物。",
        good: ["The man who lives next door is a doctor.", "This is the book which I bought."],
        bad: ["The man which lives next door is a doctor.", "This is the book who I bought."]
      },
      {
        h: "that 可以代替 who / which",
        p: "限定性子句可以用 that 代替 who 或 which，但非限定性唔可以。",
        good: ["The film that we watched was boring.", "The teacher that helped me was kind."],
        bad: ["The film who we watched was boring.", "The teacher which helped me was kind."]
      },
      {
        h: "whose 講擁有，where 講地方",
        p: "whose 後面接名詞；where 代替地方，後面接完整子句。",
        good: ["The girl whose father is a teacher won the prize.", "This is the house where I grew up."],
        bad: ["The girl who father is a teacher won the prize.", "This is the house which I grew up."]
      },
      {
        h: "子句入面唔重複賓語",
        p: "關係代詞已經代替咗個名詞，子句入面唔可以再加 it / them。",
        good: ["This is the book which I told you about.", "The students who I met were friendly."],
        bad: ["This is the book which I told you about it.", "The students who I met them were friendly."]
      },
      {
        h: "非限定性子句唔用 that",
        p: "逗號後面補充資料嘅非限定性子句，用 who / which，唔用 that。",
        good: ["My brother, who lives in London, is a doctor.", "The book, which I bought yesterday, is very useful."],
        bad: ["My brother, that lives in London, is a doctor.", "The book, that I bought yesterday, is very useful."]
      }
    ],
    traps: [
      "人物用 which、物件用 who，係最常見嘅混淆。",
      "which I told you about it 重複賓語，要刪 it。",
      "whose 寫成 who，後面直接加名詞就錯。",
      "非限定性子句用 that，正式寫作通常唔好。"
    ],
    drills: [
      {
        q: "The man ____ lives next door is a doctor.",
        options: ["which", "who", "whose", "where"],
        a: 1,
        why: "先行詞 The man 係人，用 who。"
      },
      {
        q: "This is the book ____ I told you about.",
        options: ["who", "whose", "which", "where"],
        a: 2,
        why: "先行詞 The book 係物件，用 which。"
      },
      {
        q: "The girl ____ father is a teacher won the prize.",
        options: ["who", "whose", "which", "that"],
        a: 1,
        why: "講擁有（她的父親），用 whose。"
      },
      {
        q: "This is the house ____ I grew up.",
        options: ["which", "that", "where", "who"],
        a: 2,
        why: "先行詞係地方，子句完整，用 where。"
      }
    ]
  },
  {
    id: "gerund-infinitive",
    title: "動名詞 vs 不定詞 Gerund / Infinitive",
    zh: "動名詞同不定詞，跟邊個動詞要用邊種。",
    why: "Paper 2 寫興趣同計劃常用呢兩類。enjoy to do、decide doing 係高頻錯，考官會當基礎文法錯。",
    rules: [
      {
        h: "enjoy / avoid / finish 後面用 -ing",
        p: "呢類動詞後面要接動名詞，唔可以接 to + 原形。",
        good: ["I enjoy listening to music.", "She avoids eating junk food."],
        bad: ["I enjoy to listen to music.", "She avoids to eat junk food."]
      },
      {
        h: "want / hope / decide / plan 後面用 to",
        p: "呢類動詞後面接不定詞 to + 原形。",
        good: ["She decided to take a new course.", "They plan to visit Japan."],
        bad: ["She decided taking a new course.", "They plan visiting Japan."]
      },
      {
        h: "介詞後面用 -ing",
        p: "in / at / of / about 等介詞後面，動詞要用 -ing 形式。",
        good: ["He is good at solving problems.", "I am interested in learning Japanese."],
        bad: ["He is good at solve problems.", "I am interested in learn Japanese."]
      },
      {
        h: "形容詞 + to + 原形",
        p: "happy / easy / difficult / important 後面常用 to + 原形。",
        good: ["I am happy to help you.", "It is difficult to understand him."],
        bad: ["I am happy helping you.", "It is difficult understanding him."]
      },
      {
        h: "to 做介詞時用 -ing",
        p: "look forward to / be used to 嘅 to 係介詞，後面動詞要用 -ing。",
        good: ["I look forward to hearing from you.", "She is used to working late."],
        bad: ["I look forward to hear from you.", "She is used to work late."]
      }
    ],
    traps: [
      "enjoy to do 錯，enjoy 後面用 doing。",
      "decide doing 錯，decide 後面用 to do。",
      "介詞後面用原形：good at solve 錯，用 good at solving。",
      "mind to do 錯，mind 後面用 doing。"
    ],
    drills: [
      {
        q: "I enjoy ____ music after school.",
        options: ["listen", "to listen", "listening", "listened"],
        a: 2,
        why: "enjoy 後面要接動名詞 listening。"
      },
      {
        q: "She decided ____ a new course.",
        options: ["take", "to take", "taking", "took"],
        a: 1,
        why: "decide 後面接不定詞 to take。"
      },
      {
        q: "He is good at ____ problems.",
        options: ["solve", "to solve", "solved", "solving"],
        a: 3,
        why: "at 係介詞，後面動詞用 -ing。"
      },
      {
        q: "They plan ____ Japan next year.",
        options: ["visit", "to visit", "visiting", "visited"],
        a: 1,
        why: "plan 後面接不定詞 to visit。"
      }
    ]
  },
  {
    id: "connectors",
    title: "連接詞與轉折 Connectors",
    zh: "連接詞要配啱句式，轉折詞要識用標點。",
    why: "Paper 2 靠連接詞串連段落，攞 Coherence 分。although 配 but、however 用逗號，係考官最常見嘅扣分位。",
    rules: [
      {
        h: "and / but / or / so 連接對等句子",
        p: "呢啲協調連接詞連接兩個完整子句，後面要有主語同動詞。",
        good: ["He studied hard, so he passed the exam.", "I called her, but she did not answer."],
        bad: ["He studied hard, so passed the exam.", "I called her, but did not answer."]
      },
      {
        h: "because / although / when 引導子句",
        p: "呢啲從屬連接詞帶出子句，子句唔可以獨立成句。",
        good: ["Because it was raining, we stayed home.", "Although it was late, we kept working."],
        bad: ["Because it was raining. We stayed home.", "Although it was late. We kept working."]
      },
      {
        h: "although 唔可以配 but",
        p: "although 同 but 都表轉折，同一個句子只用一個。",
        good: ["Although it was raining, we went out.", "It was raining, but we went out."],
        bad: ["Although it was raining, but we went out.", "Although it was raining, however we went out."]
      },
      {
        h: "however / therefore 前面要斷句",
        p: "however 同 therefore 係副詞，前面用句號或分號，後面加逗號。",
        good: ["She was tired. However, she finished the report.", "The plan is cheap. Therefore, we should try it."],
        bad: ["She was tired, however she finished the report.", "The plan is cheap, therefore we should try it."]
      },
      {
        h: "because of + 名詞，because + 句子",
        p: "because of 後面接名詞或名詞短語；because 後面接完整子句。",
        good: ["We stayed home because of the typhoon.", "We stayed home because the typhoon was close."],
        bad: ["We stayed home because of the typhoon was strong.", "We stayed home because the typhoon."]
      }
    ],
    traps: [
      "Although ... but ... 係雙重轉折，錯。",
      "however 前面用逗號連接兩個句子，會變成 comma splice。",
      "because of 後面加句子，錯；要用 because。",
      "so 後面漏主語，寫成 so passed the exam。"
    ],
    drills: [
      {
        q: "____ it was raining, we went out.",
        options: ["Although", "But", "Because", "So"],
        a: 0,
        why: "讓步關係用 Although，後面接完整子句。"
      },
      {
        q: "He studied hard, ____ he passed the exam.",
        options: ["although", "so", "because", "but"],
        a: 1,
        why: "因果關係用 so 連接結果。"
      },
      {
        q: "She was tired. ____, she finished the report.",
        options: ["But", "Although", "However", "Because"],
        a: 2,
        why: "however 係副詞，前面斷句，後面加逗號。"
      },
      {
        q: "We stayed home ____ the typhoon.",
        options: ["because", "because of", "although", "so"],
        a: 1,
        why: "後面係名詞 the typhoon，用 because of。"
      }
    ]
  },
  {
    id: "chinglish",
    title: "中式英文 Chinglish Traps",
    zh: "中式英文多數係逐字翻譯，配搭要重新記。",
    why: "Paper 2 考官最易認出中式配搭。句子明但唔自然，會壓住 Language 分，上唔到 Level 3。",
    rules: [
      {
        h: "very 唔可以直接修飾動詞",
        p: "I very like it 係逐字翻譯。正確講法係 I like it very much。",
        good: ["I like this movie very much.", "I really enjoyed the trip."],
        bad: ["I very like this movie.", "I very enjoyed the trip."]
      },
      {
        h: "動詞配搭要記",
        p: "開燈係 turn on the light，唔係 open the light；打機係 play computer games；學知識用 gain knowledge。",
        good: ["Please turn on the light.", "He plays computer games after school.", "We can gain knowledge from books."],
        bad: ["Please open the light.", "He plays computer after school.", "We can learn knowledge from books."]
      },
      {
        h: "discuss 後面唔加 about",
        p: "discuss 係及物動詞，直接加賓語；意見用 in my opinion。",
        good: ["We discussed the problem.", "In my opinion, the plan is too expensive."],
        bad: ["We discussed about the problem.", "According to my opinion, the plan is too expensive."]
      },
      {
        h: "-ed 講人，-ing 講事物",
        p: "I am bored 係我覺得悶；I am boring 係我令別人覺得悶。",
        good: ["I am bored with this game.", "The lesson is boring."],
        bad: ["I am boring with this game.", "The lesson is bored."]
      },
      {
        h: "不可數名詞唔加 -s",
        p: "staff、advice、information 都係不可數，唔加 -s。",
        good: ["The staff are helpful.", "She gave me some useful advice.", "We need more information."],
        bad: ["The staffs are helpful.", "She gave me some useful advices.", "We need more informations."]
      }
    ],
    traps: [
      "I have interest on music 錯，用 I am interested in music。",
      "play computer 錯，用 play computer games。",
      "learn knowledge 錯，用 gain knowledge 或 learn a lot。",
      "borrow me 錯，借出用 lend me。"
    ],
    drills: [
      {
        q: "I ____ this movie very much.",
        options: ["very like", "am like", "likes", "like"],
        a: 3,
        why: "very 唔可以直接修飾 like，用 like ... very much。"
      },
      {
        q: "Please ____ the light; it is dark.",
        options: ["open", "turn off", "put on", "turn on"],
        a: 3,
        why: "開燈嘅英文配搭係 turn on the light。"
      },
      {
        q: "She is ____ in learning Japanese.",
        options: ["interest", "interesting", "interested", "interests"],
        a: 2,
        why: "講人對某事有興趣用 be interested in。"
      },
      {
        q: "Could you ____ me your pen?",
        options: ["lend", "borrow", "lending", "borrowed"],
        a: 0,
        why: "借出畀人用 lend，borrow 係借入。"
      }
    ]
  },
  {
    id: "sentence-structure",
    title: "句子結構 Fragments & Run-ons",
    zh: "完整句子要有主語、動詞同完整意思。",
    why: "Paper 2 寫 fragments 或者 run-on，考官會讀唔明你嘅意思，Content 同 Language 一齊跌，係最傷嘅錯。",
    rules: [
      {
        h: "完整句子要有主語 + 動詞",
        p: "每個句子一定要有主語同動詞，仲要表達完整意思。",
        good: ["The report shows a clear trend.", "She works in a hospital."],
        bad: ["The report showing a clear trend.", "In a hospital."]
      },
      {
        h: "because / although 子句唔可以獨立",
        p: "呢啲字開頭嘅子句只係一半，要配主要子句先完整。",
        good: ["Because I was tired, I went to bed early.", "Although it was late, we kept working."],
        bad: ["Because I was tired.", "Although it was late."]
      },
      {
        h: "兩個完整句子唔可以只用逗號",
        p: "逗號唔夠力量連接兩個完整句子，呢個情況叫 comma splice。",
        good: ["She went to the shop. She bought milk.", "She went to the shop, and she bought milk."],
        bad: ["She went to the shop, she bought milk.", "I like it, it is good."]
      },
      {
        h: "Run-on 要用句號或連接詞分開",
        p: "兩句意思完整嘅句子連埋一齊，要用句號、分號或者 and / but / so 分開。",
        good: ["I like this song because it is good.", "The film was long. However, it was interesting."],
        bad: ["I like this song it is good.", "The film was long however it was interesting."]
      },
      {
        h: "每個子句都要有主語",
        p: "用 and / but 連接時，第二個子句都要有自己的主語，唔可以漏。",
        good: ["He finished his work and went home.", "She opened the door and switched on the light."],
        bad: ["Finished his work and went home.", "Opened the door and switched on the light."]
      }
    ],
    traps: [
      "見到 Because 開頭就當完整句子。",
      "用逗號連接兩個完整句子，變成 comma splice。",
      "長句入面漏主語，例如 Is very important。",
      "用 and 一直串落去，變成 run-on。"
    ],
    drills: [
      {
        q: "____ is a fragment, not a complete sentence.",
        options: ["Because I was tired", "I was tired", "She went home", "They are happy"],
        a: 0,
        why: "Because I was tired 只有從屬子句，冇主要子句，所以係 fragment。"
      },
      {
        q: "I like this song ____.",
        options: ["it is good because", "it is good", "because it is good", "and is good"],
        a: 2,
        why: "because 引出原因子句，整句先完整。"
      },
      {
        q: "The sentence 'She went to the shop, she bought milk.' is a ____.",
        options: ["fragment", "comma splice", "complete sentence", "complex sentence"],
        a: 1,
        why: "兩個完整句子只用逗號連接，係 comma splice。"
      },
      {
        q: "____ is my favourite subject.",
        options: ["English", "Because English", "Although English", "When English"],
        a: 0,
        why: "English 做主語，句子完整；其他選項只係子句開頭。"
      }
    ]
  },
  {
    id: "punctuation-capital",
    title: "標點與大寫 Punctuation & Capitals",
    zh: "大寫、句號、逗號同撇號，位置要準。",
    why: "Paper 2 格式分同 Language 分都睇標點。漏大寫、用逗號當句號，考官會覺得你未掌握基本書寫。",
    rules: [
      {
        h: "句子開頭同 I 要大寫",
        p: "每個句子第一個字要大寫；代詞 I 任何位置都要大寫。",
        good: ["I met Mary yesterday.", "My sister and I went shopping."],
        bad: ["i met Mary yesterday.", "My sister and i went shopping."]
      },
      {
        h: "專有名詞要大寫",
        p: "人名、地方、國家、語言、星期、月份、節日都要大寫。",
        good: ["She was born in January.", "We study English and Chinese.", "They moved to Canada last year."],
        bad: ["She was born in january.", "We study english and chinese.", "They moved to canada last year."]
      },
      {
        h: "完整句子結尾用句號",
        p: "一句意思完整嘅句子用句號結束，唔好一路用逗號連落去。",
        good: ["The lesson ended. We went home.", "He was tired, but he kept working."],
        bad: ["The lesson ended, we went home.", "He was tired, he kept working."]
      },
      {
        h: "所有格用撇號",
        p: "單數所有格加 's；以 -s 結尾嘅眾數所有格加 '。",
        good: ["This is my sister's bag.", "The students' books are on the desk."],
        bad: ["This is my sisters bag.", "The students books are on the desk."]
      },
      {
        h: "縮寫同 its 要分清",
        p: "don't / doesn't / it's 有撇號；its 係所有格，冇撇號。",
        good: ["He doesn't like it.", "It's raining outside."],
        bad: ["He doesnt like it.", "Its raining outside."]
      }
    ],
    traps: [
      "寫 i 而唔係 I，係 Paper 2 最顯眼嘅低級錯。",
      "月份同星期唔大寫：january、monday 都錯。",
      "用逗號連接兩個完整句子，變成 comma splice。",
      "its 同 it's 唔分，會影響意思同準確度。"
    ],
    drills: [
      {
        q: "I met ____ yesterday.",
        options: ["Mary", "mary", "MARY", "mARY"],
        a: 0,
        why: "人名係專有名詞，要大寫 Mary。"
      },
      {
        q: "She was born in ____.",
        options: ["January", "january", "JANUARY", "jaNuary"],
        a: 0,
        why: "月份要大寫，正常寫法係 January。"
      },
      {
        q: "He ____ like it.",
        options: ["doesnt", "don't", "doesn't", "doesn't likes"],
        a: 2,
        why: "doesn't 有撇號，後面用原形 like。"
      },
      {
        q: "The pronoun ____ must always be written as a capital letter.",
        options: ["i", "me", "my", "mine"],
        a: 0,
        why: "代詞 I 任何位置都要大寫。"
      }
    ]
  }
];
