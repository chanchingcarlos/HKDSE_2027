window.DSE_GRAMMAR_EXTRA = {
  "sv-agreement": [
    {
      q: "The news ____ very good today.",
      options: ["are", "is", "were", "have been"],
      a: 1,
      why: "news 睇落似眾數，但其實係單數名詞，所以用 is。"
    },
    {
      q: "One of my friends ____ in a bank.",
      options: ["works", "work", "working", "are working"],
      a: 0,
      why: "主語中心字係 One，當單數，所以用 works。"
    },
    {
      q: "My friend and I ____ to the same school.",
      options: ["goes", "is going", "go", "going"],
      a: 2,
      why: "My friend and I 係兩個主語，動詞用眾數原形 go。"
    },
    {
      q: "There ____ a few problems with the plan.",
      options: ["is", "was", "has", "are"],
      a: 3,
      why: "後面係眾數名詞 a few problems，所以用 There are。"
    },
    {
      q: "The students, as well as their teacher, ____ excited about the trip.",
      options: ["is", "was", "are", "has"],
      a: 2,
      why: "as well as 唔影響主語，主語 The students 係眾數，用 are。"
    }
  ],
  "present-tenses": [
    {
      q: "Water ____ at 100 degrees Celsius.",
      options: ["boil", "is boiling", "boils", "boiled"],
      a: 2,
      why: "講普遍真理用 simple present，Water 係不可數單數，動詞用 boils。"
    },
    {
      q: "Look! The baby ____.",
      options: ["cries", "cry", "is crying", "cried"],
      a: 2,
      why: "Look! 表示而家發生緊，用 is crying。"
    },
    {
      q: "She ____ the answer, so she can help you.",
      options: ["is knowing", "know", "knows", "knowing"],
      a: 2,
      why: "know 係狀態動詞，唔用進行式，主語 She 用 knows。"
    },
    {
      q: "The last bus ____ at 11:30 every night.",
      options: ["leave", "is leaving", "left", "leaves"],
      a: 3,
      why: "時間表用 simple present，主語 The last bus 係單數，用 leaves。"
    },
    {
      q: "They ____ fast food because they want to stay healthy.",
      options: ["never eat", "are never eating", "never eats", "never eating"],
      a: 0,
      why: "never 講習慣要配 simple present，主語 They 用原形 eat。"
    }
  ],
  "past-tense": [
    {
      q: "We ____ a great film last night.",
      options: ["see", "seen", "saw", "seed"],
      a: 2,
      why: "last night 係過去時間，see 嘅過去式係 saw。"
    },
    {
      q: "Did you ____ the notice on the board?",
      options: ["saw", "seen", "see", "seeing"],
      a: 2,
      why: "Did 後面一定用動詞原形 see。"
    },
    {
      q: "My mother ____ dinner for us an hour ago.",
      options: ["cooks", "cook", "cooking", "cooked"],
      a: 3,
      why: "an hour ago 係過去時間，動詞用過去式 cooked。"
    },
    {
      q: "He ____ to play football when he was young.",
      options: ["used", "use", "uses", "using"],
      a: 0,
      why: "used to + 原形講以前嘅習慣，所以用 used。"
    },
    {
      q: "They ____ the boxes upstairs this morning.",
      options: ["carry", "carried", "carrying", "carrys"],
      a: 1,
      why: "carry 係子音加 y 結尾，過去式轉 -ied 變成 carried。"
    }
  ],
  "perfect-tenses": [
    {
      q: "She has ____ her keys, so she cannot enter the flat.",
      options: ["lose", "lost", "losing", "loses"],
      a: 1,
      why: "present perfect 用 has + 過去分詞，lose 嘅過去分詞係 lost。"
    },
    {
      q: "She has not finished her project ____.",
      options: ["yet", "already", "still", "ever"],
      a: 0,
      why: "yet 用喺否定句，講到現在仍未完成。"
    },
    {
      q: "By the time we reached the cinema, the film ____.",
      options: ["has started", "starts", "is starting", "had started"],
      a: 3,
      why: "電影喺我哋到達之前已經開始，較早嘅過去事用 had started。"
    },
    {
      q: "She has worked here ____ 2019.",
      options: ["for", "since", "in", "from"],
      a: 1,
      why: "2019 係起點，since 後面接起點。"
    },
    {
      q: "Have you ____ your homework yet?",
      options: ["finish", "finishing", "finished", "finishes"],
      a: 2,
      why: "present perfect 用 have + 過去分詞，finish 嘅過去分詞係 finished。"
    }
  ],
  "future-forms": [
    {
      q: "I think it ____ sunny tomorrow.",
      options: ["is", "will be", "be", "is being"],
      a: 1,
      why: "I think 講將來預測，用 will + 原形 be。"
    },
    {
      q: "She ____ medicine at university next year.",
      options: ["is going to study", "is going to studies", "will studying", "going to study"],
      a: 0,
      why: "已計劃好嘅事用 be going to + 原形。"
    },
    {
      q: "We ____ my grandparents this weekend. We have already told them.",
      options: ["visit", "visited", "visiting", "are visiting"],
      a: 3,
      why: "已約好嘅將來活動用 present continuous are visiting。"
    },
    {
      q: "Don't worry. I ____ tell anyone your secret.",
      options: ["won't", "don't", "am not", "didn't"],
      a: 0,
      why: "will 嘅否定係 won't，講承諾用 won't + 原形。"
    },
    {
      q: "The course ____ next Monday.",
      options: ["begin", "is begin", "begins", "will beginning"],
      a: 2,
      why: "時間表用 simple present，主語 The course 係單數，用 begins。"
    }
  ],
  "articles": [
    {
      q: "It took me ____ hour to finish the report.",
      options: ["a", "the", "an", "no article"],
      a: 2,
      why: "hour 嘅 h 唔發音，響音開頭用 an。"
    },
    {
      q: "She bought a dress. ____ dress was too long.",
      options: ["A", "An", "No article", "The"],
      a: 3,
      why: "第二次提到同一件物件，用 The。"
    },
    {
      q: "We need to protect ____ environment.",
      options: ["a", "an", "the", "no article"],
      a: 2,
      why: "environment 係獨一無二嘅事物，前面用 the。"
    },
    {
      q: "This is ____ best solution we have.",
      options: ["the", "a", "an", "no article"],
      a: 0,
      why: "最高級 best 前面要加 the。"
    },
    {
      q: "My uncle is ____ engineer.",
      options: ["a", "an", "the", "no article"],
      a: 1,
      why: "engineer 以響音開頭，用 an。"
    }
  ],
  "countable": [
    {
      q: "How ____ time do we have before the exam?",
      options: ["many", "few", "several", "much"],
      a: 3,
      why: "time 係不可數名詞，用 much。"
    },
    {
      q: "There are only ____ chairs left in the room.",
      options: ["a few", "a little", "much", "a great deal of"],
      a: 0,
      why: "chairs 係可數眾數，用 a few。"
    },
    {
      q: "I did not see ____ students in the playground.",
      options: ["some", "any", "a little", "much"],
      a: 1,
      why: "否定句用 any。"
    },
    {
      q: "We bought ____ furniture for the new office.",
      options: ["many", "a few", "several", "a lot of"],
      a: 3,
      why: "furniture 係不可數名詞，用 a lot of，唔用 many / a few / several。"
    },
    {
      q: "Hurry up! We have very ____ time left.",
      options: ["few", "a few", "little", "a little"],
      a: 2,
      why: "time 不可數，very little 表示幾乎冇時間。"
    }
  ],
  "plurals": [
    {
      q: "We packed the books into three ____.",
      options: ["boxs", "boxes", "boxies", "box"],
      a: 1,
      why: "box 以 -x 結尾，複數加 -es 變成 boxes。"
    },
    {
      q: "The ____ are falling from the trees.",
      options: ["leafs", "leafes", "leaf", "leaves"],
      a: 3,
      why: "leaf 嘅複數轉 -ves，變成 leaves。"
    },
    {
      q: "Both ____ were hurt in the accident.",
      options: ["men", "mans", "mens", "man"],
      a: 0,
      why: "man 嘅複數係不規則嘅 men。"
    },
    {
      q: "The dentist checked all my ____.",
      options: ["tooths", "teeth", "toothes", "tooth"],
      a: 1,
      why: "tooth 嘅複數係不規則嘅 teeth。"
    },
    {
      q: "The ____ are cleaning the classroom.",
      options: ["womans", "womens", "women", "woman"],
      a: 2,
      why: "woman 嘅複數係不規則嘅 women。"
    }
  ],
  "prepositions-time": [
    {
      q: "We usually go swimming ____ summer.",
      options: ["on", "at", "in", "for"],
      a: 2,
      why: "季節前面用 in。"
    },
    {
      q: "The school sports day is ____ Friday.",
      options: ["in", "on", "at", "by"],
      a: 1,
      why: "星期前面用 on。"
    },
    {
      q: "I cannot sleep ____ night.",
      options: ["at", "in", "on", "during"],
      a: 0,
      why: "at night 係固定講法。"
    },
    {
      q: "We met ____ Monday morning.",
      options: ["in", "on", "at", "by"],
      a: 1,
      why: "有指定星期嘅早上用 on。"
    },
    {
      q: "She calls her grandmother ____ every Sunday.",
      options: ["on", "in", "at", "no preposition"],
      a: 3,
      why: "every 前面唔需要加介詞。"
    }
  ],
  "prepositions-place": [
    {
      q: "There is some milk ____ the fridge.",
      options: ["on", "in", "at", "to"],
      a: 1,
      why: "雪櫃係有範圍嘅空間，用 in。"
    },
    {
      q: "She hung a picture ____ the wall.",
      options: ["on", "in", "at", "under"],
      a: 0,
      why: "掛喺牆嘅表面用 on。"
    },
    {
      q: "They arrived ____ London at midnight.",
      options: ["at", "to", "on", "in"],
      a: 3,
      why: "大城市前面用 arrive in，唔用 arrive at 或 arrive to。"
    },
    {
      q: "She was the tallest ____ the four children.",
      options: ["among", "between", "in", "on"],
      a: 0,
      why: "四個之中用 among，between 只用於兩者。"
    },
    {
      q: "They arrived ____ the hotel at noon.",
      options: ["at", "to", "in", "on"],
      a: 0,
      why: "酒店係一個點，用 arrive at。"
    }
  ],
  "pronouns": [
    {
      q: "____ teacher is very kind to us.",
      options: ["Our", "Ours", "Us", "We"],
      a: 0,
      why: "teacher 前面要用物主形容詞 Our。"
    },
    {
      q: "My phone is newer than ____.",
      options: ["he", "him", "his", "himself"],
      a: 2,
      why: "比較嘅係電話，用物主代詞 his。"
    },
    {
      q: "The dog lost ____ collar.",
      options: ["it's", "its", "it", "itself"],
      a: 1,
      why: "its 係所有格，冇撇號；it's 即 it is。"
    },
    {
      q: "I made this cake ____.",
      options: ["meself", "my", "mine", "myself"],
      a: 3,
      why: "主語 I 嘅反身代詞係 myself。"
    },
    {
      q: "Between you and ____, the plan is too expensive.",
      options: ["I", "me", "myself", "mine"],
      a: 1,
      why: "介詞 between 後面用賓格 me。"
    }
  ],
  "comparatives": [
    {
      q: "My new phone is ____ than the old one.",
      options: ["heavy", "more heavy", "heavier", "heaviest"],
      a: 2,
      why: "heavy 係短形容詞，比較級轉 -ier 變成 heavier。"
    },
    {
      q: "This is ____ book I have ever read.",
      options: ["the most interesting", "most interesting", "more interesting", "the more interesting"],
      a: 0,
      why: "最高級前面要加 the，長形容詞用 the most interesting。"
    },
    {
      q: "The weather is getting ____.",
      options: ["more worse", "worst", "worse", "more bad"],
      a: 2,
      why: "bad 嘅比較級係 worse，唔可以再加 more。"
    },
    {
      q: "Today is ____ hotter than yesterday.",
      options: ["more", "much", "most", "very"],
      a: 1,
      why: "much 可以修飾比較級，more 會變成雙重比較。"
    },
    {
      q: "This road is not as ____ as that one.",
      options: ["longer", "longest", "more long", "long"],
      a: 3,
      why: "as ... as 中間用形容詞原形 long。"
    }
  ],
  "modals": [
    {
      q: "It ____ rain later, so bring an umbrella.",
      options: ["may", "mays", "may to", "is may"],
      a: 0,
      why: "may 後面用原形，唔加 -s 或 to。"
    },
    {
      q: "You ____ to apologise to her.",
      options: ["should", "must", "ought", "can"],
      a: 2,
      why: "ought to 係固定講法，ought 後面要有 to。"
    },
    {
      q: "____ you help me with this box, please?",
      options: ["Are", "Could", "Do", "Have"],
      a: 1,
      why: "Could 用嚟禮貌請求，後面用原形 help。"
    },
    {
      q: "Students ____ hand in their homework on time, or they will lose marks.",
      options: ["must", "mustn't", "don't have to", "needn't"],
      a: 0,
      why: "必須做用 must + 原形。"
    },
    {
      q: "She ____ speak three languages.",
      options: ["cans", "can to", "is can", "can"],
      a: 3,
      why: "can 後面直接加原形，唔加 -s 或 to。"
    }
  ],
  "conditionals": [
    {
      q: "If you freeze water, it ____ ice.",
      options: ["become", "becomes", "will becomes", "became"],
      a: 1,
      why: "zero conditional 講必然結果，主語 it 用 becomes。"
    },
    {
      q: "If you study hard, you ____ pass the exam.",
      options: ["are", "would", "did", "will"],
      a: 3,
      why: "first conditional 主要子句用 will + 原形。"
    },
    {
      q: "If I had more time, I ____ join the club.",
      options: ["will", "would", "am", "did"],
      a: 1,
      why: "second conditional 主要子句用 would + 原形。"
    },
    {
      q: "We will cancel the trip ____ the rain stops; we do not want to walk in the rain.",
      options: ["unless", "if", "because", "although"],
      a: 0,
      why: "unless 等於 if not，後面接肯定子句。"
    },
    {
      q: "Unless you hurry, you ____ be late.",
      options: ["are", "would", "will", "did"],
      a: 2,
      why: "unless 子句用 present，主要子句用 will + 原形。"
    }
  ],
  "passive": [
    {
      q: "The vase ____ by the cat last night.",
      options: ["was broke", "broke", "was broken", "is break"],
      a: 2,
      why: "過去被動用 was + 過去分詞 broken。"
    },
    {
      q: "This song ____ by a famous singer.",
      options: ["was wrote", "wrote", "is write", "was written"],
      a: 3,
      why: "過去被動用 was + 過去分詞 written。"
    },
    {
      q: "New rules ____ introduced next month.",
      options: ["will", "can", "has", "will be"],
      a: 3,
      why: "將來被動用 will be + 過去分詞。"
    },
    {
      q: "The accident ____ last night.",
      options: ["was happened", "happened", "is happened", "has happened"],
      a: 1,
      why: "happen 係不及物動詞，冇被動式，用過去式 happened。"
    },
    {
      q: "The results ____ yesterday.",
      options: ["were announced", "announced", "are announce", "announcing"],
      a: 0,
      why: "過去被動用 were + 過去分詞 announced。"
    }
  ],
  "relative-clauses": [
    {
      q: "This is the shop ____ sells traditional cakes.",
      options: ["which", "who", "whose", "where"],
      a: 0,
      why: "先行詞 the shop 係物件，用 which。"
    },
    {
      q: "My uncle, ____ lives in Canada, is visiting us.",
      options: ["that", "which", "who", "where"],
      a: 2,
      why: "非限定性子句指人用 who，唔用 that。"
    },
    {
      q: "This is the café ____ we first met.",
      options: ["which", "where", "that", "who"],
      a: 1,
      why: "先行詞係地方，子句完整，用 where。"
    },
    {
      q: "The students ____ I met were very friendly.",
      options: ["which", "whose", "where", "who"],
      a: 3,
      why: "先行詞 The students 係人，用 who。"
    },
    {
      q: "The novel ____ won the prize is about Hong Kong.",
      options: ["who", "whose", "which", "where"],
      a: 2,
      why: "先行詞 The novel 係物件，用 which。"
    }
  ],
  "gerund-infinitive": [
    {
      q: "He avoids ____ the busy roads during rush hour.",
      options: ["to use", "use", "used", "using"],
      a: 3,
      why: "avoid 後面要接動名詞 using。"
    },
    {
      q: "I hope ____ you again soon.",
      options: ["seeing", "see", "to see", "saw"],
      a: 2,
      why: "hope 後面接不定詞 to see。"
    },
    {
      q: "She is interested in ____ how people live in other countries.",
      options: ["understanding", "to understand", "understand", "understood"],
      a: 0,
      why: "介詞 in 後面動詞用 -ing，所以用 understanding。"
    },
    {
      q: "It is important ____ the instructions carefully.",
      options: ["read", "reading", "reads", "to read"],
      a: 3,
      why: "形容詞 important 後面用 to + 原形。"
    },
    {
      q: "We look forward to ____ you at the party.",
      options: ["see", "seeing", "saw", "to see"],
      a: 1,
      why: "look forward to 嘅 to 係介詞，後面用 -ing，所以用 seeing。"
    }
  ],
  "connectors": [
    {
      q: "____ the team played well, they lost the match.",
      options: ["Although", "But", "Because", "So"],
      a: 0,
      why: "讓步關係用 Although，後面接完整子句。"
    },
    {
      q: "He wanted to buy the jacket, ____ it was too expensive.",
      options: ["although", "because", "but", "so"],
      a: 2,
      why: "前後意思相反，用 but 連接。"
    },
    {
      q: "The plan is too expensive. ____, we should look for another one.",
      options: ["But", "Although", "Because", "Therefore"],
      a: 3,
      why: "therefore 係副詞，前面斷句，後面加逗號。"
    },
    {
      q: "The flight was cancelled ____ the snow was very heavy.",
      options: ["because of", "because", "although", "so"],
      a: 1,
      why: "後面係完整子句，用 because。"
    },
    {
      q: "It was raining heavily, ____ the match was cancelled.",
      options: ["but", "so", "because", "although"],
      a: 1,
      why: "因果關係用 so 連接結果。"
    }
  ],
  "chinglish": [
    {
      q: "____ my opinion, the plan is too expensive.",
      options: ["According to", "In", "On", "For"],
      a: 1,
      why: "in my opinion 係固定講法，唔講 according to my opinion。"
    },
    {
      q: "The class ____ the issue of waste in Hong Kong.",
      options: ["discussed about", "discussed", "talked", "discussed on"],
      a: 1,
      why: "discuss 係及物動詞，後面直接加賓語，唔加 about。"
    },
    {
      q: "The lesson was so ____ that I fell asleep.",
      options: ["bored", "bore", "boringly", "boring"],
      a: 3,
      why: "事物令人悶用 -ing 形容詞 boring。"
    },
    {
      q: "He ____ computer games every evening.",
      options: ["plays", "play", "playing", "is play"],
      a: 0,
      why: "打機係 play computer games，主語 He 用 plays。"
    },
    {
      q: "Reading can help us ____ knowledge about the world.",
      options: ["learn", "study", "gain", "take"],
      a: 2,
      why: "知識配 gain knowledge，唔用 learn knowledge。"
    }
  ],
  "sentence-structure": [
    {
      q: "The sentence 'After the long meeting.' is a ____.",
      options: ["fragment", "complete sentence", "comma splice", "complex sentence"],
      a: 0,
      why: "After the long meeting 只有短語，冇主語同動詞，所以係 fragment。"
    },
    {
      q: "He opened the window, ____ he turned on the fan.",
      options: ["and", "because", "although", "who"],
      a: 0,
      why: "兩個先後動作用 and 連接，第二個子句要有主語 he。"
    },
    {
      q: "____, so we stayed at home.",
      options: ["Was raining", "Raining", "Because it was raining", "It was raining"],
      a: 3,
      why: "so 前面要有完整子句，It was raining 有主語同動詞。"
    },
    {
      q: "The graph ____ a clear upward trend.",
      options: ["showing", "shown", "shows", "to show"],
      a: 2,
      why: "句子要有動詞，主語 The graph 用 shows。"
    },
    {
      q: "____ is very important for students.",
      options: ["Enough sleep", "Because enough sleep", "Although enough sleep", "When enough sleep"],
      a: 0,
      why: "Enough sleep 做主語，句子完整；其他選項只係子句開頭。"
    }
  ],
  "punctuation-capital": [
    {
      q: "My cousin and ____ visited the museum.",
      options: ["I", "i", "me", "myself"],
      a: 0,
      why: "呢個位置係主語，代詞 I 要大寫。"
    },
    {
      q: "We are studying ____ this term.",
      options: ["english", "ENGLISH", "English", "engLish"],
      a: 2,
      why: "語言名稱係專有名詞，要大寫 English。"
    },
    {
      q: "My brother has a new car. This is my ____ car. He bought it last week.",
      options: ["brother's", "brothers", "brothers'", "brother"],
      a: 0,
      why: "單數所有格要加 's，所以用 brother's。"
    },
    {
      q: "The ____ lockers are in the corridor. Each teacher has one.",
      options: ["teachers", "teacher's", "teachers's", "teachers'"],
      a: 3,
      why: "眾數所有格喺 -s 後面加撇號，用 teachers'。"
    },
    {
      q: "____ cold today, so wear a coat.",
      options: ["Its", "It's", "Its'", "It is'"],
      a: 1,
      why: "It's 即 It is，要有撇號。"
    }
  ]
};
