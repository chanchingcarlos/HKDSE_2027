# 拾級 · DSE 中文三級特訓

一個離線為主的 DSE 中國語文科訓練網站：Level 1–3、四個戰場、原創題目、範文詳解、答題框架、錯題簿與 14 日考前路線。

Live：<https://chanchingcarlos.github.io/HKDSE_2027/chinese/>

## 打開網站

最簡單：直接用瀏覽器打開 `index.html`。

如果想確保本機儲存（進度）穩定，喺呢個資料夾開一個本機伺服器：

```bash
cd "dse chinese"
python3 -m http.server 8766
```

然後去 `http://localhost:8766/`。

## 網站結構

- `index.html` — 外殼、導覽、載入資源
- `assets/css/style.css` — 紙、墨、印章視覺系統（含深色模式與響應式）
- `assets/js/app.js` — 狀態、路由、練習批改、進度、錯題簿、工具箱
- `assets/js/data/meta.js` — 2027 考試結構、三個 Level、14 日路線、12 組範文、6 類實用文、4 個寫作框架、名句
- `assets/js/data/reading.js` — 卷一閱讀 3 個訓練站
- `assets/js/data/fanwen-*.js` — 12 組指定文言範文逐篇詳解（背景、段意、字詞、句譯、手法、主旨、比較、DSE 題型、自測）
- `assets/js/data/practical.js` — 卷二甲部實用寫作 3 個訓練站
- `assets/js/data/composition.js` — 卷二乙部命題寫作 3 個訓練站
- `assets/js/data/sba.js` — SBA 閱讀匯報 3 個訓練站＋攻略

## 四個戰場（2024 起新制）

| 部分 | 全科比重 | 網站訓練 |
|---|---|---|
| 卷一 閱讀能力 | 40% | 3 個 Level、甲部範文＋乙部文白篇章；另設 12 組範文詳解與自測 |
| 卷二 甲部 實用寫作 | 13.5% | 3 個 Level、6 類格式、材料整合 |
| 卷二 乙部 命題寫作 | 31.5% | 3 個 Level、記敘／描寫／議論 |
| SBA 閱讀匯報 | 15% | 3 個 Level、文字報告＋口頭匯報 |

舊制卷三聆聽、卷四說話已取消；說話能力改為 SBA 口頭匯報。網站按最新制設計。

## 進度

進度只存喺瀏覽器 `localStorage`（key：`dse_chinese_shiji_v1`），不會上傳。工具箱可以匯出／匯入 JSON 備份。

## 版權

所有題目、篇章、範文、報告範例均為原創或公有領域材料，並非考評局官方試題。考試安排以 HKEAA 最新公布為準。
