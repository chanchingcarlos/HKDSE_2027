/* ============================================================
   20+2 週作戰計劃
   由 2026-11-16 開始，預留最後緩衝至 2027-04 中。
   ============================================================ */
window.DSE_PLAN = {
  examDateDefault: "2027-04-23",
  examNote: "DSE 2027 英文科實際日期以考評局公布為準，你可以喺「工具箱」改倒數日期。",
  phases: [
    { id: "p1", name: "第一階段 · 補底", range: "第 1–6 週", dates: "11 月中 – 12 月底", zh: "唔急做卷。先將最易錯嘅文法同最常用嘅字執乾淨，同時建立每日習慣。" },
    { id: "p2", name: "第二階段 · 題型", range: "第 7–14 週", dates: "1 月 – 2 月中", zh: "逐份卷拆題型。每星期主攻一份卷，重點係知道考官要咩、點樣執分。" },
    { id: "p3", name: "第三階段 · 實戰", range: "第 15–20 週", dates: "2 月尾 – 3 月", zh: "開始計時做全卷，練習時間分配同臨場決定。弱項逐個回補。" },
    { id: "p4", name: "第四階段 · 衝刺", range: "第 21–22 週", dates: "4 月", zh: "唔再學新嘢。只重溫錯題、高頻字同模板，保持狀態。" }
  ],
  dailyHabits: [
    { id: "h1", t: "10 分鐘：溫 10 張單字卡", min: 10 },
    { id: "h2", t: "10 分鐘：聽英文（ podcast / 新聞 / 網站聽力）", min: 10 },
    { id: "h3", t: "5 分鐘：睇一次錯題簿，讀出正確版本", min: 5 }
  ],
  weeks: [
    {
      n: 1, phase: "p1", start: "2026-11-16", end: "2026-11-22",
      title: "認清戰場，建立習慣",
      focus: "診斷 + 習慣",
      goal: "知道自己邊份卷最弱，並且連續 5 日有學習記錄。",
      tasks: [
        { id: "w1t1", t: "喺首頁做一次自我診斷，睇清楚四份卷嘅佔分", min: 10 },
        { id: "w1t2", t: "學「主語動詞一致」，做 4 條 drill", min: 20 },
        { id: "w1t3", t: "背 20 個高頻字（每日 10 個，用學習卡）", min: 30 },
        { id: "w1t4", t: "聽 1 段 3 分鐘英文，跟讀 1 分鐘", min: 15 },
        { id: "w1t5", t: "寫 80 字自我介紹，存入錯題簿前先自己檢查一次", min: 25 }
      ],
      check: "連續 5 日有學習記錄；講得出自己最弱係邊份卷。"
    },
    {
      n: 2, phase: "p1", start: "2026-11-23", end: "2026-11-29",
      title: "動詞時態：最常見嘅失分位",
      focus: "現在式 / 過去式",
      goal: "寫 6 句句子，時態全部正確。",
      tasks: [
        { id: "w2t1", t: "學「現在式 simple vs continuous」+ drill", min: 25 },
        { id: "w2t2", t: "學「過去式與不規則動詞」+ drill", min: 25 },
        { id: "w2t3", t: "背 20 個字（優先動詞）", min: 30 },
        { id: "w2t4", t: "用 5 個不規則動詞各寫一句過去式句子", min: 20 },
        { id: "w2t5", t: "聽力數字 drill 10 題", min: 15 }
      ],
      check: "隨機抽 5 個動詞，你講得出過去式兼作句。"
    },
    {
      n: 3, phase: "p1", start: "2026-11-30", end: "2026-12-06",
      title: "名詞、冠詞、複數",
      focus: "a / an / the + 可數不可數",
      goal: "唔再寫錯 a / an / the，唔再寫 informations、advices。",
      tasks: [
        { id: "w3t1", t: "學「冠詞 a/an/the」+ drill", min: 25 },
        { id: "w3t2", t: "學「可數與不可數名詞」+ drill", min: 25 },
        { id: "w3t3", t: "背 20 個字（優先名詞）", min: 30 },
        { id: "w3t4", t: "抄低 10 個不可數名詞，每個寫一句", min: 20 },
        { id: "w3t5", t: "Paper 3 Part A 做 1 個 task（唔計時）", min: 25 }
      ],
      check: "你能夠解釋點解係 a university 但 an hour。"
    },
    {
      n: 4, phase: "p1", start: "2026-12-07", end: "2026-12-13",
      title: "句子結構：唔好再寫碎片句",
      focus: "完整句子 + 標點",
      goal: "每句都有主語和動詞，唔再一句逗號駁到尾。",
      tasks: [
        { id: "w4t1", t: "學「句子結構」+ drill", min: 25 },
        { id: "w4t2", t: "學「標點與大寫」+ drill", min: 20 },
        { id: "w4t3", t: "背 20 個字", min: 30 },
        { id: "w4t4", t: "將自己之前寫嘅 80 字自我介紹逐句檢查", min: 20 },
        { id: "w4t5", t: "閱讀 1 篇 Level 1 passage（唔計時）", min: 25 }
      ],
      check: "你能夠喺自己文章圈出所有完整句子。"
    },
    {
      n: 5, phase: "p1", start: "2026-12-14", end: "2026-12-20",
      title: "介詞、代詞、比較級",
      focus: "in/on/at + 指代清楚",
      goal: "時間介詞全對；文章入面嘅 it / they 指咩要清楚。",
      tasks: [
        { id: "w5t1", t: "學「時間介詞」+ drill", min: 20 },
        { id: "w5t2", t: "學「地方介詞」+ drill", min: 20 },
        { id: "w5t3", t: "學「代詞與指代」+ drill", min: 20 },
        { id: "w5t4", t: "學「比較級」+ drill", min: 20 },
        { id: "w5t5", t: "背 25 個字", min: 30 }
      ],
      check: "in / on / at 嘅 drill 正確率有 80%。"
    },
    {
      n: 6, phase: "p1", start: "2026-12-21", end: "2026-12-27",
      title: "第一階段驗收",
      focus: "總測 + 整理錯題",
      goal: "將第一階段所有文法 topic 重做一次，錯誤全部入錯題簿。",
      tasks: [
        { id: "w6t1", t: "重做第 1–5 週所有文法 drill，目標 80% 正確", min: 45 },
        { id: "w6t2", t: "錯題簿：逐條寫低錯咩、正確版本", min: 25 },
        { id: "w6t3", t: "寫 1 篇 150 字 email（唔計時）", min: 35 },
        { id: "w6t4", t: "聽 1 個完整 Paper 3 Part A task", min: 25 },
        { id: "w6t5", t: "背 25 個字，並重溫之前唔熟嘅卡", min: 30 }
      ],
      check: "文法 drill 總正確率達 75% 以上。"
    },
    {
      n: 7, phase: "p2", start: "2026-12-28", end: "2027-01-03",
      title: "Paper 3 Part A：聆聽執分",
      focus: "Paper 3（30%）",
      goal: "掌握數字、日期、串字三大陷阱。",
      tasks: [
        { id: "w7t1", t: "睇 Paper 3 概覽 + 10 個陷阱", min: 20 },
        { id: "w7t2", t: "數字 / 價錢 / 時間 drill 20 題", min: 20 },
        { id: "w7t3", t: "串字聽寫 20 個字", min: 20 },
        { id: "w7t4", t: "做 2 個 Past Paper 區 Level 1 listening task", min: 40 },
        { id: "w7t5", t: "背 25 個字", min: 30 }
      ],
      check: "數字 drill 20 題啱 16 題以上。"
    },
    {
      n: 8, phase: "p2", start: "2027-01-04", end: "2027-01-10",
      title: "Paper 3 Part B：綜合能力",
      focus: "Data file → 文章",
      goal: "識得由 data file 揀重點，寫出一篇格式正確嘅 email。",
      tasks: [
        { id: "w8t1", t: "睇綜合能力 7 步流程 + 6 種文體", min: 20 },
        { id: "w8t2", t: "做 1 個 Level 1 integrated task（唔計時）", min: 45 },
        { id: "w8t3", t: "對 model answer，圈出自己漏咗嘅 requirement", min: 20 },
        { id: "w8t4", t: "背 15 句綜合能力常用句式", min: 25 },
        { id: "w8t5", t: "背 25 個字", min: 30 }
      ],
      check: "你能夠講出 email 嘅 5 個必要部分。"
    },
    {
      n: 9, phase: "p2", start: "2027-01-11", end: "2027-01-17",
      title: "Paper 2 Part A：短寫作",
      focus: "Email / notice / blog",
      goal: "45 分鐘內寫完 200 字，格式齊全。",
      tasks: [
        { id: "w9t1", t: "睇寫作概覽 + 評分標準", min: 15 },
        { id: "w9t2", t: "背 email 模板（結構 + 8 句句式）", min: 25 },
        { id: "w9t3", t: "寫 1 篇 Part A，計時 45 分鐘", min: 50 },
        { id: "w9t4", t: "用 checklist 自己改，再對 model", min: 20 },
        { id: "w9t5", t: "背 25 個字（優先寫作動詞）", min: 30 }
      ],
      check: "Part A 有齊目的、細節、結尾，字數達標。"
    },
    {
      n: 10, phase: "p2", start: "2027-01-18", end: "2027-01-24",
      title: "Paper 2 Part B：長寫作",
      focus: "Article / report / letter to editor",
      goal: "75 分鐘內寫完 400 字，有清楚三段結構。",
      tasks: [
        { id: "w10t1", t: "背 report + article 模板", min: 30 },
        { id: "w10t2", t: "學 10 個萬用轉折句", min: 20 },
        { id: "w10t3", t: "寫 1 篇 Part B，計時 75 分鐘", min: 85 },
        { id: "w10t4", t: "大聲讀一次自己篇文，聽下有冇唔順", min: 15 },
        { id: "w10t5", t: "背 25 個字", min: 30 }
      ],
      check: "每段有一個清楚 topic sentence。"
    },
    {
      n: 11, phase: "p2", start: "2027-01-25", end: "2027-01-31",
      title: "Paper 1：B1 策略",
      focus: "閱讀（20%）",
      goal: "明白點解你要揀 B1，並且做一篇 Level 1 閱讀全對。",
      tasks: [
        { id: "w11t1", t: "睇閱讀概覽 + B1/B2 規則", min: 15 },
        { id: "w11t2", t: "學 True / False / Not Given 判斷法", min: 20 },
        { id: "w11t3", t: "做 1 篇 Level 1 passage，計時 20 分鐘", min: 30 },
        { id: "w11t4", t: "逐題寫低答案喺文中邊句", min: 20 },
        { id: "w11t5", t: "背 30 個字（優先閱讀高頻）", min: 35 }
      ],
      check: "TFNG 題目正確率 75% 以上。"
    },
    {
      n: 12, phase: "p2", start: "2027-02-01", end: "2027-02-07",
      title: "Paper 1：題型全拆解",
      focus: "MC / short / cloze / matching",
      goal: "每種題型都知第一步做咩。",
      tasks: [
        { id: "w12t1", t: "睇 7 種閱讀題型 + 策略", min: 25 },
        { id: "w12t2", t: "做 1 篇 Level 2 passage，計時 25 分鐘", min: 35 },
        { id: "w12t3", t: "Summary cloze 專項：做 10 題", min: 20 },
        { id: "w12t4", t: "錯題簿記低 5 個閱讀錯誤原因", min: 15 },
        { id: "w12t5", t: "背 30 個字", min: 35 }
      ],
      check: "你能夠講出 cloze 點樣靠詞性估答案。"
    },
    {
      n: 13, phase: "p2", start: "2027-02-08", end: "2027-02-14",
      title: "Paper 4：小組討論",
      focus: "說話（10%）",
      goal: "8 分鐘討論入面，你講到至少 6 次，並且回應別人 2 次。",
      tasks: [
        { id: "w13t1", t: "睇說話概覽 + 評分標準", min: 15 },
        { id: "w13t2", t: "背 20 句互動句式", min: 25 },
        { id: "w13t3", t: "用 1 個題目自己計時講 8 分鐘（錄音）", min: 30 },
        { id: "w13t4", t: "聽返錄音，數自己講咗幾多次、有冇離題", min: 15 },
        { id: "w13t5", t: "背 25 個字（優先說話形容詞）", min: 30 }
      ],
      check: "錄音入面冇超過 5 秒嘅dead air。"
    },
    {
      n: 14, phase: "p2", start: "2027-02-15", end: "2027-02-21",
      title: "Paper 4：個人回應 + 中期檢討",
      focus: "1 分鐘回應",
      goal: "1 分鐘內講到 3 個 point，有開頭有結尾。",
      tasks: [
        { id: "w14t1", t: "個人回應練習 5 題（每題 1 分鐘）", min: 30 },
        { id: "w14t2", t: "學 15 個常錯讀音", min: 20 },
        { id: "w14t3", t: "重做一次自我診斷，比較 11 月", min: 15 },
        { id: "w14t4", t: "揀最弱一份卷，寫 3 個改善動作", min: 15 },
        { id: "w14t5", t: "背 30 個字", min: 35 }
      ],
      check: "你講得出自己邊份卷進步最多、邊份最需要追。"
    },
    {
      n: 15, phase: "p3", start: "2027-02-22", end: "2027-02-28",
      title: "實戰：Paper 3 全卷",
      focus: "計時 + 時間分配",
      goal: "完整做一次 Paper 3，唔好留空。",
      tasks: [
        { id: "w15t1", t: "計時做 Paper 3 Part A（1 個 task）", min: 30 },
        { id: "w15t2", t: "計時做 Paper 3 Part B（1 個 integrated task）", min: 45 },
        { id: "w15t3", t: "對答案，計分，寫低失分原因", min: 25 },
        { id: "w15t4", t: "重聽一次最差嘅一段", min: 15 },
        { id: "w15t5", t: "背 30 個字", min: 35 }
      ],
      check: "Part A + Part B 總分達到 40%。"
    },
    {
      n: 16, phase: "p3", start: "2027-03-01", end: "2027-03-07",
      title: "實戰：Paper 1 全卷",
      focus: "B1 計時",
      goal: "30 分鐘內完成一篇 B1 級閱讀，正確率 60%。",
      tasks: [
        { id: "w16t1", t: "計時做 1 篇 Level 2 passage（30 分鐘）", min: 40 },
        { id: "w16t2", t: "檢討：每題錯因分類（唔識字／睇錯／推論錯）", min: 20 },
        { id: "w16t3", t: "重做之前錯嘅 10 題", min: 20 },
        { id: "w16t4", t: "背 30 個字", min: 35 },
        { id: "w16t5", t: "錯題簿重溫 10 條", min: 15 }
      ],
      check: "閱讀正確率 60% 以上。"
    },
    {
      n: 17, phase: "p3", start: "2027-03-08", end: "2027-03-14",
      title: "實戰：Paper 2 全卷",
      focus: "45 + 75 分鐘",
      goal: "限時內完成 Part A + Part B，字數達標。",
      tasks: [
        { id: "w17t1", t: "Part A 計時 45 分鐘", min: 50 },
        { id: "w17t2", t: "Part B 計時 75 分鐘", min: 80 },
        { id: "w17t3", t: "用 checklist 逐項檢查", min: 20 },
        { id: "w17t4", t: "抄低 5 句自己寫得最好嘅句子", min: 15 },
        { id: "w17t5", t: "背 30 個字", min: 35 }
      ],
      check: "兩篇都喺限時內完成，冇離題。"
    },
    {
      n: 18, phase: "p3", start: "2027-03-15", end: "2027-03-21",
      title: "說話模擬 + SBA 檢視",
      focus: "Paper 4 + SBA",
      goal: "完成一次 4 人模擬討論；SBA 進度清楚。",
      tasks: [
        { id: "w18t1", t: "同同學做一次完整小組討論（8 分鐘）", min: 30 },
        { id: "w18t2", t: "互相給 feedback：邊個壟斷、邊個太靜", min: 15 },
        { id: "w18t3", t: "個人回應 5 題，計時 1 分鐘", min: 20 },
        { id: "w18t4", t: "問老師 SBA 仲有咩未交 / 邊度可以補分", min: 15 },
        { id: "w18t5", t: "背 30 個字", min: 35 }
      ],
      check: "模擬討論入面你能夠帶動至少 1 次話題。"
    },
    {
      n: 19, phase: "p3", start: "2027-03-22", end: "2027-03-28",
      title: "弱項回補",
      focus: "針對最低分嘅一份卷",
      goal: "將最弱一份卷嘅練習正確率推高 10%。",
      tasks: [
        { id: "w19t1", t: "重做該卷 2 個 task，計時", min: 50 },
        { id: "w19t2", t: "錯題簿：只重溫該卷相關錯誤", min: 20 },
        { id: "w19t3", t: "問老師 / 同學 3 條你一直唔明嘅問題", min: 20 },
        { id: "w19t4", t: "背 30 個字", min: 35 },
        { id: "w19t5", t: "早睡，調整生理時鐘", min: 0 }
      ],
      check: "最弱卷嘅正確率比上星期高。"
    },
    {
      n: 20, phase: "p3", start: "2027-03-29", end: "2027-04-04",
      title: "全科模擬考",
      focus: "一次過做四份卷",
      goal: "模擬真實考試流程，知道自己總分大約喺邊。",
      tasks: [
        { id: "w20t1", t: "一日內完成 Paper 1 + Paper 2（計時）", min: 180 },
        { id: "w20t2", t: "另一日完成 Paper 3（計時）", min: 120 },
        { id: "w20t3", t: "說話：完整模擬一次", min: 40 },
        { id: "w20t4", t: "計總分，對比 11 月嘅自己", min: 30 },
        { id: "w20t5", t: "寫低最後三星期嘅 3 個目標", min: 15 }
      ],
      check: "四份卷都完成，並且知道每份卷失分最多嘅位置。"
    },
    {
      n: 21, phase: "p4", start: "2027-04-05", end: "2027-04-11",
      title: "錯題重溫週",
      focus: "唔學新嘢",
      goal: "錯題簿入面未修正嘅項目減到 10 條以下。",
      tasks: [
        { id: "w21t1", t: "錯題簿：逐條重做，識為止", min: 60 },
        { id: "w21t2", t: "高頻字最後一輪：只溫 Box 1–2", min: 40 },
        { id: "w21t3", t: "重溫 4 個寫作模板嘅開頭同結尾", min: 30 },
        { id: "w21t4", t: "說話：讀出 20 句互動句", min: 20 },
        { id: "w21t5", t: "輕量做 1 個 listening task，保持耳朵", min: 20 }
      ],
      check: "錯題簿未修正項目 < 10。"
    },
    {
      n: 22, phase: "p4", start: "2027-04-12", end: "2027-04-18",
      title: "保持狀態，唔好操勞",
      focus: "睡眠 + 輕練習",
      goal: "每日 30–45 分鐘，唔好熬夜。",
      tasks: [
        { id: "w22t1", t: "每日 10 分鐘單字卡", min: 10 },
        { id: "w22t2", t: "隔日 1 篇閱讀，只做 Level 1", min: 20 },
        { id: "w22t3", t: "睇一次考試流程同時間分配", min: 15 },
        { id: "w22t4", t: "準備文具、准考證、路線", min: 20 },
        { id: "w22t5", t: "早睡", min: 0 }
      ],
      check: "考試前一晚瞓夠 7 小時。"
    }
  ]
};
