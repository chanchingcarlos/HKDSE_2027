# Level Up — DSE English 1 → 2

一個為香港 DSE 英文考生設計嘅**自學基地**，目標好簡單：由 Level 1 升到 Level 2 或以上。

唔需要安裝、唔需要帳號、唔需要上網（除咗第一次開網頁）。所有進度存在你部電腦嘅瀏覽器入面。

---

## 快速開始

### 方法一：直接開
雙擊 `index.html`。

### 方法二：本機伺服器（建議）
```bash
cd "dse english"
python3 -m http.server 8765
```
然後開 http://localhost:8765

### 方法三：GitHub Pages
https://chanchingcarlos.github.io/HKDSE_2027/

---

## 入面有咩

| 模組 | 內容 |
|---|---|
| **首頁** | 考試倒數、準備度環、今日任務、四卷進度、連續學習日數 |
| **22 週計劃** | 由 11 月中到考前，分四階段，110 個可勾選任務 |
| **文法診所** | 21 課 Level 1 最常錯文法，每課規則 + 正誤對照 + 4 條即時練習 |
| **單字庫** | 479 個 DSE 高頻字，學習卡（Leitner box）、10 題測驗、可搜尋字庫 |
| **寫作** | 8 個格式模板（email / letter / report / article / blog / speech / proposal / notice）、30 條句式、16 條題目、限時寫作 |
| **閱讀** | 7 種題型策略、B1 選擇策略、4 篇原創文章（Level 1–2）、32 題 |
| **聆聽 + 綜合** | 10 個陷阱、數字/串字/句子聽寫（瀏覽器 TTS）、7 步綜合流程、6 種文體 |
| **說話** | 10 組互動句式、14 條討論題、14 條個人回應、計時器、讀音與常錯 |
| **Past Paper 區** | 44 個**原創擬真題**，只出 Level 1–2：Paper 1/2/3/4 齊全，有計時、答案、解釋 |
| **錯題簿** | 新增/篩選/標記修正、隨機重溫 |
| **工具箱** | 考試倒數設定、番茄鐘、進度匯出/匯入、應考清單、列印版重點紙 |

### 進度系統
- XP、等級、連續學習日數
- 每個模組嘅完成度
- 按四份卷佔分加權嘅「準備度」（**唔係 DSE 預測等級**）
- 所有資料存在 `localStorage`，可以匯出 JSON 備份

---

## 技術

純靜態網站：HTML + CSS + 原生 JavaScript，冇 build step、冇框架、冇外部依賴。
可以直接放上 GitHub Pages、Netlify、任何靜態 hosting，或者用 `file://` 打開。

```
index.html
assets/
  css/style.css
  js/
    core.js              # 狀態、儲存、進度、UI helper
    drills.js            # 測驗、學習卡、聽寫、計時器引擎
    views-home.js        # 首頁、計劃、錯題簿、工具箱、列印版
    views-study.js       # 文法、單字、寫作
    views-skills.js      # 閱讀、聆聽、說話
    views-pastpaper.js   # Past Paper 區
    app.js               # router / shell
    data/                # 全部課程內容（JS 物件）
```

---

## 重要聲明

- 本網站係個人自學工具，**與香港考試及評核局（HKEAA）無關**。
- 「Past Paper 區」全部題目均為**原創擬真題**，模仿 DSE 題型及難度，並非官方試題，亦沒有複製任何官方試卷內容。官方 past paper 請經學校或考評局購買。
- 網站提供嘅分數、等級、準備度只供參考，唔構成任何考試成績預測。
- 學習內容為原創編寫；引用常見文法規則及公開試題型屬合理使用。

---

## 授權

個人學習用途。內容歡迎參考，但請勿直接當作商業教材轉售。
