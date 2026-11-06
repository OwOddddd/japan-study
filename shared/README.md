# shared：日本學習網站的共用資源

所有主題的頁面都引用這裡的檔案，主題內不再各自放 style.css 或 quiz.js。

| 檔案 | 內容 |
|---|---|
| `style.css` | 唯一的樣式表。含深色模式（跟隨系統）與手機寬度。 |
| `quiz.js` | 單題選擇（`.exercise.quiz`，載入即啟用）＋整份測驗引擎 `Quiz.mount(root, cfg)` |
| `order.js` | 排序題（`.exercise.order`） |

只屬於單一主題的元件留在該主題的 `assets/`（例如日本地理的 `japan-map.js`、`climate-chart.js`），但樣式一律寫進這裡的 `style.css`。

## 網站結構

```
日本學習/
├── index.html            網站首頁，列出所有主題
├── shared/               共用樣式與元件（本資料夾）
└── <主題資料夾，英文小寫，例如 history、geography>/
    ├── index.html        主題目錄頁，列出所有課程與參考文件
    ├── lessons/          課程（0001-xxx.html …）
    ├── reference/        速查表、參考文件
    ├── assets/           只屬於本主題的元件（可省略）
    ├── MISSION.md、NOTES.md、learning-records/   私人檔案，不進 repo
```

## 開設新主題的清單

1. 在 `日本學習/` 下建立主題資料夾，裡面建 `lessons/`、`reference/`。
2. 課程與參考文件的 `<head>` 引用：
   ```html
   <link rel="stylesheet" href="../../shared/style.css">
   <!-- 有選擇題時 -->
   <script src="../../shared/quiz.js"></script>
   <!-- 有排序題時 -->
   <script src="../../shared/order.js"></script>
   ```
   單題選擇與排序題的 script 放在 `<head>` 或 `</body>` 前都可以。
3. 每頁 `<main>` 開頭放導覽：
   ```html
   <nav class="site-nav"><a href="../../index.html">日本學習</a> › <a href="../index.html">主題名</a></nav>
   ```
4. 建立主題的 `index.html`（可照抄 `history/index.html`），樣式引用 `../shared/style.css`，導覽寫 `<a href="../index.html">日本學習</a> › 主題名`。
5. 在網站首頁 `日本學習/index.html` 的「主題」列表加一行連結。
6. 在主題的 `NOTES.md`「工作筆記」寫入網站規則（可照抄 history/NOTES.md 的那一段，改主題名）。
7. 主題的 `.claude/launch.json` 用 `python -m http.server <埠號> --directory ..`，讓伺服器根目錄是 `日本學習/`，才讀得到 `shared/`。直接用 `file://` 開啟時 script 不會正常運作。

## 可用的 class

**版面**：`main`（一般寬度）、`main.wide`（寬圖表頁）、`.lede` / `.subtitle`（標題下的引言）、`.small`、`.muted`、`.tag`、`nav.crumbs`（課內麵包屑）、`nav.lesson-nav`（上一課 / 下一課）

**文章元件**：`.goal`（本課目標）、`.callout`（提示）、`.note`（補充）、`.source`（資料來源框）、`sup.cite`、`ol.chain`（編號因果鏈）、`ul.chain` + `.why`（圓點因果鏈）、`table` / `table.cmp`、`tr.band`、`figure` / `figcaption`、`.diagram`（SVG 示意圖，配 `.d-*`）、`.legend`

**互動練習**：
```html
<div class="exercise quiz" data-answer="b">
  <p class="q">題目</p>
  <div class="options"><button data-key="a">…</button><button data-key="b">…</button></div>
  <div class="explain" hidden>答對後顯示的說明</div>
</div>

<div class="exercise order" data-solution="奈良,平安,鎌倉">
  <p class="q">依時間先後點選：</p>
</div>

<div class="recall-box exercise">題目 <textarea></textarea> <details><summary>看答案</summary>…</details></div>
```

**測驗引擎**（整份小測驗、診斷考卷）：`Quiz.mount(root, { title, storageKey, facets, questions, resultsEl, progressEl, submitBtn })`，用法見 `quiz.js` 開頭註解與日本地理的課程。配套 class：`.sticky`（頂部進度列）、`.results`、`.btn`、`.btn.ghost`。

**目錄頁**：`ul.toc` > `li`（`a` + `.small` 說明），未完成的課程用 `li.todo`。
