# 拆解所 — HKDSE 數學 Level 1 → 3

一個以繁體中文編寫的 HKDSE 數學（必修部分）自學網站，目標程度為 **Level 1–3**。
內容涵蓋數與代數、度量圖形與空間、數據處理三大範疇，共有 19 個課題、426 條連步驟題目，
以及因式分解 10 招、無限操練、全科模擬卷、錯題簿和公式大全。

## 網站特色

- **19 個課題**：由正負數、指數、百分比，到二次方程、三角學、圓形性質、統計與概率。
- **426 題題庫**：每題都有答案、逐步解法，以及可自行打開的「公式」提示。
- **因式分解專題**：10 個方法教室、242 條自動生成題目，由抽公因數到十字相乘。
- **DSE 試卷樣式**：題號、分數、分項 (a)(b)、選擇題 A–D 排法，模擬 Paper 1 / Paper 2。
- **無限操練**：因式分解選擇題、解二次方程選擇題、全科自評練習。
- **全科模擬卷**：Paper 1（12 題 50 分）與 Paper 2（20 題選擇題），另有兩份因式分解專項卷。
- **錯題簿**：自動收集做錯的題目，可重複溫習。
- **公式大全**：可按關鍵字搜尋，亦可列印成 PDF。
- **深色模式、進度儲存**：進度只存在瀏覽器 `localStorage`，不上傳任何資料。

## 本機預覽

```bash
cd HKDSE_2027
python3 -m http.server 4173
```

然後開啟 `http://127.0.0.1:4173/`。

## 部署

本網站是純靜態 HTML/CSS/JavaScript，沒有建置步驟，也沒有外部依賴。
可直接部署到 GitHub Pages、Netlify、Vercel 或任何靜態檔案伺服器。

英文版網站（同一 repo）：<https://chanchingcarlos.github.io/HKDSE_2027/>

GitHub Pages 網址：<https://chanchingcarlos.github.io/HKDSE_2027/maths/>

## 檔案結構

```
index.html
assets/
  css/style.css
  js/
    app.js                 # 路由、畫面、互動、進度
    gen.js                 # 因式分解題目生成器
    data/
      site.js              # 範疇、DSE 資訊、因式分解專題資料
      factorisation.js     # 10 個因式分解方法、專項模擬卷
      topics-*.js          # 19 個課題的教學內容
      questions-*.js       # 各課題題庫（每題有 formula 欄位）
      mocks.js             # 全科 Paper 1 / Paper 2 模擬卷
```

## 備註

- 課程依照 HKDSE 數學必修部分編排；「Level 1–3」是目標難度，並非考評局官方分級。
- 模擬卷為原創擬真題，並非考評局官方試題。官方試題請到 HKEAA 或學校索取。
- 題目答案經獨立驗算，但如有錯漏，歡迎開 issue 指正。
