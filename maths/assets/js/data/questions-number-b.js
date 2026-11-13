/* ============================================================
   HKDSE 2027 — Question bank, Number strand part B
   Topics: quadratic equations, functions & graphs, indices & logarithms,
           sequences, coordinate geometry
   ============================================================ */
(function () {
  "use strict";

  window.TOPIC_QUESTIONS = window.TOPIC_QUESTIONS || {};

  window.TOPIC_QUESTIONS["quadratic-equations"] = [
    {
      lv: 1,
      kind: "計算",
      formula: "x<sup>2</sup> + (p + q)x + pq = (x + p)(x + q)",
      q: "解 x<sup>2</sup> − 7x + 12 = 0。",
      a: "x = 3 或 x = 4",
      steps: [
        "因式分解：x<sup>2</sup> − 7x + 12 = (x − 3)(x − 4)。",
        "令每個因式等於 0：x − 3 = 0 或 x − 4 = 0。",
        "所以 x = 3 或 x = 4。"
      ]
    },
    {
      lv: 1,
      kind: "計算",
      formula: "acx<sup>2</sup> + (ad + bc)x + bd = (ax + b)(cx + d)",
      q: "解 2x<sup>2</sup> + 5x − 3 = 0。",
      a: "x = 1/2 或 x = −3",
      steps: [
        "十字相乘：2x<sup>2</sup> + 5x − 3 = (2x − 1)(x + 3)。",
        "2x − 1 = 0 或 x + 3 = 0。",
        "x = 1/2 或 x = −3。"
      ]
    },
    {
      lv: 1,
      kind: "計算",
      formula: "(x − a)<sup>2</sup> = b ⇒ x = a ± √b",
      q: "解 (x − 3)<sup>2</sup> = 16。",
      a: "x = 7 或 x = −1",
      steps: [
        "兩邊開方：x − 3 = 4 或 x − 3 = −4。",
        "x = 7 或 x = −1。"
      ]
    },
    {
      lv: 1,
      kind: "計算",
      formula: "Δ = b<sup>2</sup> − 4ac；Δ > 0 有兩個相異實根",
      q: "求 3x<sup>2</sup> − 4x + 1 = 0 的判別式，並判斷根的性質。",
      a: "Δ = 4；有兩個相異實根",
      steps: [
        "a = 3，b = −4，c = 1。",
        "Δ = b<sup>2</sup> − 4ac = (−4)<sup>2</sup> − 4(3)(1) = 16 − 12 = 4。",
        "Δ > 0，所以有兩個相異實根。"
      ]
    },
    {
      lv: 2,
      kind: "計算",
      formula: "x = (−b ± √(b<sup>2</sup> − 4ac)) / (2a)",
      q: "用二次公式解 x<sup>2</sup> − 6x + 2 = 0，答案以根式表示。",
      a: "x = 3 ± √7",
      steps: [
        "a = 1，b = −6，c = 2。",
        "x = [−(−6) ± √((−6)<sup>2</sup> − 4(1)(2))] / 2 = (6 ± √28)/2。",
        "√28 = 2√7，所以 x = 3 ± √7。"
      ]
    },
    {
      lv: 2,
      kind: "計算",
      formula: "y = a(x − h)<sup>2</sup> + k；頂點 (h, k)",
      q: "將 y = 2x<sup>2</sup> − 8x + 5 寫成 y = a(x − h)<sup>2</sup> + k 的形式，並寫出頂點及最小值。",
      a: "y = 2(x − 2)<sup>2</sup> − 3；頂點 (2, −3)，最小值 −3",
      steps: [
        "y = 2(x<sup>2</sup> − 4x) + 5 = 2[(x − 2)<sup>2</sup> − 4] + 5。",
        "= 2(x − 2)<sup>2</sup> − 8 + 5 = 2(x − 2)<sup>2</sup> − 3。",
        "頂點是 (2, −3)；a = 2 > 0，所以最小值是 −3。"
      ]
    },
    {
      lv: 2,
      kind: "計算",
      formula: "α + β = −b/a；αβ = c/a",
      q: "設 α、β 是 3x<sup>2</sup> + 5x − 2 = 0 的兩根。求 α + β、αβ 及 α<sup>2</sup> + β<sup>2</sup>。",
      a: "α + β = −5/3，αβ = −2/3，α<sup>2</sup> + β<sup>2</sup> = 37/9",
      steps: [
        "α + β = −b/a = −5/3，αβ = c/a = −2/3。",
        "α<sup>2</sup> + β<sup>2</sup> = (α + β)<sup>2</sup> − 2αβ = 25/9 + 4/3。",
        "= 25/9 + 12/9 = 37/9。"
      ]
    },
    {
      lv: 2,
      kind: "應用",
      formula: "面積 = 長 × 闊；周界 = 2(長 + 闊)",
      q: "一個長方形的周界是 36 m，面積是 80 m<sup>2</sup>。求它的長和闊。",
      a: "長 10 m，闊 8 m",
      steps: [
        "設闊是 x m，則長是 (18 − x) m。",
        "x(18 − x) = 80，整理得 x<sup>2</sup> − 18x + 80 = 0。",
        "(x − 8)(x − 10) = 0，x = 8 或 10；所以長 10 m、闊 8 m。"
      ]
    },
    {
      lv: 3,
      kind: "計算",
      formula: "Δ = b<sup>2</sup> − 4ac = 0（重根）",
      q: "若 x<sup>2</sup> + (k + 2)x + 9 = 0 有重根，求 k 的所有可能值。",
      a: "k = 4 或 k = −8",
      steps: [
        "重根表示 Δ = 0。",
        "(k + 2)<sup>2</sup> − 4(1)(9) = 0，即 (k + 2)<sup>2</sup> = 36。",
        "k + 2 = ±6，所以 k = 4 或 k = −8。"
      ]
    },
    {
      lv: 3,
      kind: "應用",
      formula: "y = a(x − h)<sup>2</sup> + k；頂點 (h, k)",
      q: "一個球被踢起，離地高度 h m 與時間 t s 的關係是 h = −5t<sup>2</sup> + 20t。(a) 求球到達的最高點。(b) 求球高度為 15 m 的兩個時間。",
      a: "(a) 20 m（t = 2 s）；(b) t = 1 s 或 t = 3 s",
      steps: [
        "配方：h = −5(t<sup>2</sup> − 4t) = −5[(t − 2)<sup>2</sup> − 4] = −5(t − 2)<sup>2</sup> + 20。",
        "頂點是 (2, 20)，所以 t = 2 s 時最高，高度 20 m。",
        "令 −5t<sup>2</sup> + 20t = 15，得 t<sup>2</sup> − 4t + 3 = 0，(t − 1)(t − 3) = 0，t = 1 或 3。"
      ]
    }
  ];

  window.TOPIC_QUESTIONS["functions-graphs"] = [
    {
      lv: 1,
      kind: "計算",
      formula: "f(a)：將 x = a 代入 f(x)",
      q: "設 f(x) = 3x<sup>2</sup> − 2x + 1，求 f(−1)。",
      a: "6",
      steps: [
        "f(−1) = 3(−1)<sup>2</sup> − 2(−1) + 1。",
        "= 3 + 2 + 1 = 6。"
      ]
    },
    {
      lv: 1,
      kind: "計算",
      formula: "f(a) = k ⇒ 將 x = a 代入並解方程",
      q: "設 f(x) = 2x + 5。若 f(a) = 1，求 a。",
      a: "a = −2",
      steps: [
        "2a + 5 = 1。",
        "2a = −4，所以 a = −2。"
      ]
    },
    {
      lv: 1,
      kind: "計算",
      formula: "y = mx + c；m 是斜率，c 是 y 軸截距",
      q: "寫出直線 y = 4 − 3x 的斜率及 y 軸截距。",
      a: "斜率 = −3，y 軸截距 = 4",
      steps: [
        "將方程寫成 y = mx + c：y = −3x + 4。",
        "所以斜率 m = −3，y 軸截距 c = 4。"
      ]
    },
    {
      lv: 1,
      kind: "圖形",
      formula: "y = a(x − h)<sup>2</sup> + k；頂點 (h, k)，對稱軸 x = h",
      q: "對 y = (x − 2)<sup>2</sup> − 5，寫出頂點、對稱軸及最小值。",
      a: "頂點 (2, −5)，對稱軸 x = 2，最小值 −5",
      steps: [
        "頂點式 y = a(x − h)<sup>2</sup> + k 中，h = 2、k = −5。",
        "a = 1 > 0，圖像開口向上，所以最小值是 −5。"
      ]
    },
    {
      lv: 2,
      kind: "計算",
      formula: "m = (y<sub>2</sub> − y<sub>1</sub>) / (x<sub>2</sub> − x<sub>1</sub>)",
      q: "求經過 A(1, 3) 和 B(4, 9) 的直線方程。",
      a: "y = 2x + 1",
      steps: [
        "斜率 m = (9 − 3)/(4 − 1) = 6/3 = 2。",
        "用點斜式：y − 3 = 2(x − 1)。",
        "整理得 y = 2x + 1。"
      ]
    },
    {
      lv: 2,
      kind: "圖形",
      formula: "y = a(x − h)<sup>2</sup> + k；頂點 (h, k)",
      q: "已知 y = x<sup>2</sup> + 6x + 5。求圖像的 x 軸截距及頂點。",
      a: "x 軸截距 −1 和 −5；頂點 (−3, −4)",
      steps: [
        "令 y = 0：x<sup>2</sup> + 6x + 5 = (x + 1)(x + 5) = 0，所以 x = −1 或 −5。",
        "配方：y = (x + 3)<sup>2</sup> − 9 + 5 = (x + 3)<sup>2</sup> − 4。",
        "頂點是 (−3, −4)。"
      ]
    },
    {
      lv: 2,
      kind: "圖形",
      formula: "y = f(x − h) + k：點 (x, y) → (x + h, y + k)",
      q: "已知 y = f(x) 的圖像經過點 (2, −3)。求 y = f(x + 1) − 2 的圖像上對應點的坐標。",
      a: "(1, −5)",
      steps: [
        "令 x + 1 = 2，得 x = 1。",
        "y = f(2) − 2 = −3 − 2 = −5。",
        "對應點是 (1, −5)。"
      ]
    },
    {
      lv: 2,
      kind: "應用",
      formula: "V = V<sub>0</sub> + rt；r 是固定速率",
      q: "一個水箱起初有 200 L 水，然後以固定速率注水。5 分鐘後有 700 L。(a) 求注水速率。(b) 寫出水量 V（L）與時間 t（分鐘）的關係。(c) 何時水量達 1000 L？",
      a: "(a) 100 L/min；(b) V = 200 + 100t；(c) t = 8 分鐘",
      steps: [
        "速率 = (700 − 200) ÷ 5 = 100 L/min。",
        "V = 200 + 100t。",
        "1000 = 200 + 100t，所以 t = 8。"
      ]
    },
    {
      lv: 3,
      kind: "計算",
      formula: "y = a(x − h)<sup>2</sup> + k",
      q: "一個二次函數的圖像頂點是 (3, −4)，且經過 (0, 5)。求該函數的方程。",
      a: "y = (x − 3)<sup>2</sup> − 4（即 y = x<sup>2</sup> − 6x + 5）",
      steps: [
        "設 y = a(x − 3)<sup>2</sup> − 4。",
        "代入 (0, 5)：5 = a(0 − 3)<sup>2</sup> − 4 = 9a − 4。",
        "9a = 9，a = 1；所以 y = (x − 3)<sup>2</sup> − 4。"
      ]
    },
    {
      lv: 3,
      kind: "應用",
      formula: "A = x(40 − 2x)；最大值在頂點",
      q: "用 40 m 圍欄靠牆圍出一個長方形。若與牆平行的邊不需圍欄，求最大面積。",
      a: "200 m<sup>2</sup>",
      steps: [
        "設垂直於牆的邊長 x m，則平行於牆的邊長 (40 − 2x) m。",
        "面積 A = x(40 − 2x) = −2x<sup>2</sup> + 40x = −2(x − 10)<sup>2</sup> + 200。",
        "所以 x = 10 m 時面積最大，最大面積是 200 m<sup>2</sup>。"
      ]
    }
  ];

  window.TOPIC_QUESTIONS["indices-log"] = [
    {
      lv: 1,
      kind: "計算",
      formula: "(a<sup>m</sup>)<sup>n</sup> = a<sup>mn</sup>；a<sup>m</sup> × a<sup>n</sup> = a<sup>m+n</sup>",
      q: "化簡 (a<sup>3</sup>)<sup>2</sup> × a<sup>−4</sup>。",
      a: "a<sup>2</sup>",
      steps: [
        "(a<sup>3</sup>)<sup>2</sup> = a<sup>6</sup>。",
        "a<sup>6</sup> × a<sup>−4</sup> = a<sup>6−4</sup> = a<sup>2</sup>。"
      ]
    },
    {
      lv: 1,
      kind: "計算",
      formula: "log<sub>a</sub> x = y ⇔ a<sup>y</sup> = x",
      q: "求 log<sub>2</sub> 16 及 log<sub>3</sub> (1/9)。",
      a: "4 及 −2",
      steps: [
        "2<sup>4</sup> = 16，所以 log<sub>2</sub> 16 = 4。",
        "3<sup>−2</sup> = 1/9，所以 log<sub>3</sub>(1/9) = −2。"
      ]
    },
    {
      lv: 1,
      kind: "計算",
      formula: "a<sup>x</sup> = a<sup>y</sup> ⇒ x = y",
      q: "解 2<sup>x</sup> = 32。",
      a: "x = 5",
      steps: [
        "32 = 2<sup>5</sup>。",
        "所以 x = 5。"
      ]
    },
    {
      lv: 1,
      kind: "計算",
      formula: "log<sub>a</sub> x = y ⇔ x = a<sup>y</sup>",
      q: "解 log<sub>5</sub> x = 2。",
      a: "x = 25",
      steps: [
        "由定義，x = 5<sup>2</sup>。",
        "x = 25。"
      ]
    },
    {
      lv: 2,
      kind: "計算",
      formula: "log<sub>a</sub> b = log b / log a",
      q: "用換底公式求 log<sub>8</sub> 32。",
      a: "5/3",
      steps: [
        "log<sub>8</sub> 32 = log<sub>2</sub> 32 / log<sub>2</sub> 8。",
        "= 5/3。"
      ]
    },
    {
      lv: 2,
      kind: "計算",
      formula: "a<sup>M</sup> = a<sup>N</sup> ⇒ M = N",
      q: "解 3<sup>2x+1</sup> = 81。",
      a: "x = 3/2",
      steps: [
        "81 = 3<sup>4</sup>。",
        "所以 2x + 1 = 4。",
        "2x = 3，x = 3/2。"
      ]
    },
    {
      lv: 2,
      kind: "計算",
      formula: "log<sub>a</sub> M + log<sub>a</sub> N = log<sub>a</sub>(MN)",
      q: "解 log<sub>3</sub>(x + 2) + log<sub>3</sub> x = 1。",
      a: "x = 1",
      steps: [
        "合併：log<sub>3</sub>[x(x + 2)] = 1，所以 x(x + 2) = 3。",
        "x<sup>2</sup> + 2x − 3 = 0，(x + 3)(x − 1) = 0，x = −3 或 1。",
        "對數的定義域要求 x > 0，所以捨去 −3，x = 1。"
      ]
    },
    {
      lv: 2,
      kind: "應用",
      formula: "A = P(1 + r)<sup>n</sup>",
      q: "志明將 $10,000 存入銀行，年利率 5%，每年複利一次。(a) 求 4 年後的本利和。(b) 最少要多少年，本利和才超過 $12,000？",
      a: "(a) $12,155.06；(b) 4 年",
      steps: [
        "本利和 = 10000(1.05)<sup>4</sup> = 12155.06，即 $12,155.06。",
        "3 年後是 10000(1.05)<sup>3</sup> = $11,576.25，未超過 $12,000。",
        "4 年後是 $12,155.06 > $12,000，所以最少 4 年。"
      ]
    },
    {
      lv: 3,
      kind: "計算",
      formula: "a<sup>x</sup> = b ⇒ x = log b / log a",
      q: "解 3<sup>x+1</sup> = 20，答案準確至三位有效數字。",
      a: "x ≈ 1.73",
      steps: [
        "兩邊取對數：(x + 1) log 3 = log 20。",
        "x + 1 = log 20 / log 3 ≈ 2.7268。",
        "x ≈ 1.73。"
      ]
    },
    {
      lv: 3,
      kind: "應用",
      formula: "pH = −log[H<sup>+</sup>]",
      q: "溶液的 pH 值定義為 pH = −log[H<sup>+</sup>]，其中 [H<sup>+</sup>] 是氫離子濃度（mol/L）。若 [H<sup>+</sup>] = 2.5 × 10<sup>−5</sup> mol/L，求 pH（準確至一位小數）。",
      a: "pH ≈ 4.6",
      steps: [
        "pH = −log(2.5 × 10<sup>−5</sup>)。",
        "= −(log 2.5 − 5) = 5 − log 2.5。",
        "≈ 5 − 0.3979 = 4.602，即 4.6。"
      ]
    }
  ];

  window.TOPIC_QUESTIONS["sequences"] = [
    {
      lv: 1,
      kind: "計算",
      formula: "T(n) = a + (n − 1)d",
      q: "等差數列 5, 9, 13, … 求公差 d 及第 10 項。",
      a: "d = 4，T(10) = 41",
      steps: [
        "d = 9 − 5 = 4。",
        "T(10) = 5 + (10 − 1)(4) = 5 + 36 = 41。"
      ]
    },
    {
      lv: 1,
      kind: "計算",
      formula: "S(n) = n/2 [2a + (n − 1)d]",
      q: "等差數列 3, 7, 11, … 求首 12 項之和。",
      a: "300",
      steps: [
        "a = 3，d = 4，n = 12。",
        "S(12) = 12/2 [2(3) + 11(4)] = 6(6 + 44)。",
        "= 6 × 50 = 300。"
      ]
    },
    {
      lv: 1,
      kind: "計算",
      formula: "T(n) = ar<sup>n−1</sup>",
      q: "等比數列 2, 6, 18, … 求公比 r 及第 6 項。",
      a: "r = 3，T(6) = 486",
      steps: [
        "r = 6 ÷ 2 = 3。",
        "T(6) = 2 × 3<sup>5</sup> = 2 × 243 = 486。"
      ]
    },
    {
      lv: 1,
      kind: "計算",
      formula: "S(n) = a(1 − r<sup>n</sup>) / (1 − r)",
      q: "等比數列 16, 8, 4, … 求首 5 項之和。",
      a: "31",
      steps: [
        "a = 16，r = 1/2。",
        "S(5) = 16(1 − (1/2)<sup>5</sup>) / (1 − 1/2)。",
        "= 16(31/32) ÷ (1/2) = 31。"
      ]
    },
    {
      lv: 2,
      kind: "計算",
      formula: "T(n) = a + (n − 1)d",
      q: "等差數列的第 5 項是 17，第 10 項是 37。求首項 a 及公差 d。",
      a: "a = 1，d = 4",
      steps: [
        "T(5) = a + 4d = 17，T(10) = a + 9d = 37。",
        "兩式相減：5d = 20，d = 4。",
        "代回 a + 16 = 17，a = 1。"
      ]
    },
    {
      lv: 2,
      kind: "計算",
      formula: "T(n) = ar<sup>n−1</sup>；T(m)/T(n) = r<sup>m−n</sup>",
      q: "等比數列的第 3 項是 12，第 6 項是 96。求公比 r 及首項 a。",
      a: "r = 2，a = 3",
      steps: [
        "T(3) = ar<sup>2</sup> = 12，T(6) = ar<sup>5</sup> = 96。",
        "相除：r<sup>3</sup> = 8，r = 2。",
        "代回 4a = 12，a = 3。"
      ]
    },
    {
      lv: 2,
      kind: "應用",
      formula: "S(n) = n/2 [2a + (n − 1)d]",
      q: "家寶第一個月儲 $500，之後每個月比上月多儲 $40。(a) 第 12 個月儲多少？(b) 首 12 個月共儲多少？",
      a: "(a) $940；(b) $8,640",
      steps: [
        "這是等差數列，a = 500，d = 40。",
        "T(12) = 500 + 11(40) = 940。",
        "S(12) = 12/2 (500 + 940) = 6 × 1440 = 8640。"
      ]
    },
    {
      lv: 2,
      kind: "應用",
      formula: "V = P(1 − r)<sup>n</sup>",
      q: "一輛車價值 $240,000，每年折舊 20%。(a) 3 年後價值多少？(b) 最少多少年後價值低於 $100,000？",
      a: "(a) $122,880；(b) 4 年",
      steps: [
        "每年乘 0.8，3 年後 = 240000(0.8)<sup>3</sup> = 122880。",
        "4 年後 = 240000(0.8)<sup>4</sup> = 98,304 < 100,000。",
        "所以最少 4 年。"
      ]
    },
    {
      lv: 3,
      kind: "增潤",
      formula: "S∞ = a / (1 − r)，|r| < 1",
      q: "求無限等比級數 18 + 12 + 8 + … 的和。",
      a: "54",
      steps: [
        "a = 18，r = 12/18 = 2/3。",
        "因為 |r| < 1，S∞ = a/(1 − r)。",
        "S∞ = 18/(1 − 2/3) = 18 ÷ (1/3) = 54。"
      ]
    },
    {
      lv: 3,
      kind: "應用",
      formula: "T(n) = ar<sup>n−1</sup>；S(n) = a(r<sup>n</sup> − 1) / (r − 1)",
      q: "某公司第一年利潤是 $2,000,000，之後每年增加 8%。(a) 求第 10 年的利潤。(b) 求首 10 年的總利潤。（答案準確至千元）",
      a: "(a) $3,998,000；(b) $28,973,000",
      steps: [
        "這是等比數列，a = 2,000,000，r = 1.08。",
        "T(10) = 2,000,000 × 1.08<sup>9</sup> ≈ 3,998,009。",
        "S(10) = 2,000,000(1.08<sup>10</sup> − 1)/(1.08 − 1) ≈ 28,973,125。"
      ]
    }
  ];

  window.TOPIC_QUESTIONS["coordinate-geometry"] = [
    {
      lv: 1,
      kind: "計算",
      formula: "d = √[(x<sub>2</sub> − x<sub>1</sub>)<sup>2</sup> + (y<sub>2</sub> − y<sub>1</sub>)<sup>2</sup>]",
      q: "求 A(1, 2) 與 B(4, 6) 的距離。",
      a: "5",
      steps: [
        "AB = √[(4 − 1)<sup>2</sup> + (6 − 2)<sup>2</sup>]。",
        "= √(9 + 16) = √25 = 5。"
      ]
    },
    {
      lv: 1,
      kind: "計算",
      formula: "M = ((x<sub>1</sub> + x<sub>2</sub>)/2, (y<sub>1</sub> + y<sub>2</sub>)/2)",
      q: "求 A(−3, 5) 與 B(7, −1) 的中點。",
      a: "(2, 2)",
      steps: [
        "x 坐標 = (−3 + 7)/2 = 2。",
        "y 坐標 = (5 + (−1))/2 = 2。",
        "中點是 (2, 2)。"
      ]
    },
    {
      lv: 1,
      kind: "計算",
      formula: "m = (y<sub>2</sub> − y<sub>1</sub>) / (x<sub>2</sub> − x<sub>1</sub>)",
      q: "求經過 (2, −1) 和 (6, 7) 的直線的斜率。",
      a: "2",
      steps: [
        "m = (7 − (−1))/(6 − 2)。",
        "= 8/4 = 2。"
      ]
    },
    {
      lv: 1,
      kind: "計算",
      formula: "平行：m<sub>1</sub> = m<sub>2</sub>；垂直：m<sub>1</sub>m<sub>2</sub> = −1",
      q: "直線 L 的方程是 y = −2x + 5。寫出與 L 平行的直線的斜率，以及與 L 垂直的直線的斜率。",
      a: "平行：−2；垂直：1/2",
      steps: [
        "L 的斜率是 −2。",
        "平行線斜率相同，所以是 −2。",
        "垂直線斜率是負倒數：−1/(−2) = 1/2。"
      ]
    },
    {
      lv: 2,
      kind: "計算",
      formula: "y − y<sub>1</sub> = m(x − x<sub>1</sub>)",
      q: "求經過 (3, −2) 且斜率為 3/4 的直線方程，答案以一般式表示。",
      a: "3x − 4y − 17 = 0",
      steps: [
        "y + 2 = (3/4)(x − 3)。",
        "4y + 8 = 3x − 9。",
        "整理得 3x − 4y − 17 = 0。"
      ]
    },
    {
      lv: 2,
      kind: "計算",
      formula: "垂直平分線：過 AB 中點，斜率 = −1/m<sub>AB</sub>",
      q: "求 A(1, 2) 與 B(5, 4) 的垂直平分線方程。",
      a: "2x + y − 9 = 0",
      steps: [
        "AB 的中點是 (3, 3)，斜率是 (4 − 2)/(5 − 1) = 1/2。",
        "垂直平分線的斜率是 −2。",
        "y − 3 = −2(x − 3)，整理得 2x + y − 9 = 0。"
      ]
    },
    {
      lv: 2,
      kind: "計算",
      formula: "交點 (x, y)：同時滿足兩條直線方程",
      q: "求直線 2x + y = 7 與 x − y = 2 的交點。",
      a: "(3, 1)",
      steps: [
        "兩式相加：3x = 9，x = 3。",
        "代入 x − y = 2：3 − y = 2，y = 1。",
        "交點是 (3, 1)。"
      ]
    },
    {
      lv: 2,
      kind: "應用",
      formula: "圓心 = AB 的中點；半徑 = AB / 2",
      q: "A(1, 1) 與 B(7, 9) 是一個圓的直徑的兩端。求圓心和半徑。",
      a: "圓心 (4, 5)，半徑 5",
      steps: [
        "圓心是 AB 的中點：(4, 5)。",
        "直徑 AB = √[(7 − 1)<sup>2</sup> + (9 − 1)<sup>2</sup>] = √(36 + 64) = 10。",
        "半徑 = 10 ÷ 2 = 5。"
      ]
    },
    {
      lv: 3,
      kind: "軌跡",
      formula: "與 A、B 等距的軌跡是 AB 的垂直平分線",
      q: "點 P 移動時，與 A(2, 1) 和 B(6, 5) 的距離相等。描述 P 的軌跡，並求其方程。",
      a: "P 的軌跡是 AB 的垂直平分線；方程 x + y − 7 = 0",
      steps: [
        "與兩定點等距的點在它們的垂直平分線上。",
        "AB 的中點是 (4, 3)，AB 的斜率是 (5 − 1)/(6 − 2) = 1。",
        "垂直平分線斜率 −1：y − 3 = −(x − 4)，即 x + y − 7 = 0。"
      ]
    },
    {
      lv: 3,
      kind: "應用",
      formula: "m<sub>1</sub>m<sub>2</sub> = −1；面積 = 1/2 × 底 × 高",
      q: "三角形 ABC 的頂點是 A(1, 2)、B(5, 6)、C(9, 2)。(a) 證明 ∠ABC = 90°。(b) 求三角形 ABC 的面積。",
      a: "(a) AB 的斜率 × BC 的斜率 = −1，所以 ∠ABC = 90°；(b) 16 平方單位",
      steps: [
        "AB 的斜率 = (6 − 2)/(5 − 1) = 1；BC 的斜率 = (2 − 6)/(9 − 5) = −1。",
        "1 × (−1) = −1，所以 AB ⊥ BC，∠ABC = 90°。",
        "AB = √(4<sup>2</sup> + 4<sup>2</sup>) = 4√2，BC = 4√2；面積 = 1/2 × 4√2 × 4√2 = 16。"
      ]
    }
  ];
})();
