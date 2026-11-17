/* 課程頁的學習工具（skin.js 自動載入，樣式在 study.css）
   - 每一頁：右下角回頂端按鈕
   - 課程頁（lessons/ 底下、不含診斷）：右側隨堂筆記（存在這台裝置，可匯出成文字、Word、PDF）、
     頁首依外觀加裝飾、段落依序編號（data-n 數字、data-k 國字）、路線圖的路線軌道 */
(function () {
  var root = document.documentElement;
  var main = document.querySelector('main');
  if (!main) return;

  var PENCIL = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1-5L16 4l4 4L9 19z"/><path d="M14 6l4 4"/></svg>';
  // 像素鉛筆：粉紅橡皮擦、銀圈、黃筆身、木頭、筆芯
  var PX_PENCIL = (function () {
    var m = ['.........kk.', '........kppk', '.......kpppk', '......ksppk.', '.....ksssk..', '....kyysk...', '...kyyYk....', '..kyyYk.....', '.kwyYk......', '.kwwk.......', 'kgwk........', 'kkk.........'];
    var c = { k: '#000', p: '#f08fbc', s: '#c9ccd6', y: '#ffd76a', Y: '#e0a63a', w: '#e8c49a', g: '#3a3a48' }, r = '';
    m.forEach(function (row, y) { for (var x = 0; x < row.length; x++) if (row[x] !== '.') r += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="' + c[row[x]] + '"/>'; });
    return '<svg width="24" height="24" viewBox="0 0 12 12" shape-rendering="crispEdges" aria-hidden="true">' + r + '</svg>';
  })();

  /* ---------- 回頂端（每一頁） ---------- */
  var totop = document.createElement('button');
  totop.type = 'button'; totop.className = 'totop'; totop.setAttribute('aria-label', '回到頁首');
  totop.innerHTML =
    '<svg class="only-route" width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4 12h5v9h6v-9h5z" fill="currentColor"/></svg><small class="only-route">上へ</small>' +
    '<svg class="only-wa" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 4 13h5v7h6v-7h5z" fill="currentColor"/></svg><small class="only-wa">上へ</small>' +
    '<svg class="only-pixel" width="24" height="24" viewBox="0 0 8 8" shape-rendering="crispEdges" aria-hidden="true"><path d="M3 1h2v1h1v1h1v1H5v3H3V4H1V3h1V2h1z" fill="currentColor"/></svg>' +
    '<span class="only-plain" aria-hidden="true">↑</span>';
  document.body.appendChild(totop);
  totop.onclick = function () {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  var m = location.pathname.match(/\/([a-z]+)\/lessons\/([^\/]+)\.html$/);
  var isLesson = m && m[1] !== 'news' && !/diagnostic/.test(m[2]);
  var h2s = [], current = null, rail = null, railFill = null;

  if (isLesson) {
    root.classList.add('study');
    var sticky = document.querySelector('.sticky');
    var navLinks = document.querySelectorAll('nav.site-nav a');
    var topicName = navLinks[1] ? navLinks[1].textContent.trim() : '';
    var stamp = getComputedStyle(root).getPropertyValue('--stamp').replace(/["'\s]/g, '') || topicName.charAt(0);
    var lessonTitle = '';

    /* 頁首：依外觀加裝飾（另外兩種用 CSS 藏起來） */
    if (sticky && sticky.firstElementChild && sticky.firstElementChild.id !== 'progress') {
      var t = sticky.firstElementChild;
      lessonTitle = t.textContent.trim();
      var no = (lessonTitle.match(/第\s*(\d+)\s*課/) || [])[1];
      var lt = document.createElement('span'); lt.className = 'lt';
      lt.innerHTML = '<span class="st-pic only-route" aria-hidden="true">' + stamp + '</span>' +
        '<span class="st-mon only-wa" aria-hidden="true">' + stamp + '</span>' +
        (no ? '<span class="st-lv only-pixel" aria-hidden="true">LV' + no + '</span>' : '') +
        '<span class="st-exp only-pixel" aria-hidden="true"><i>EXP</i><b><u></u></b></span>';
      sticky.insertBefore(lt, t);
      t.classList.add('st-title');
      lt.insertBefore(t, lt.querySelector('.st-exp'));
    }
    var h1 = main.querySelector('h1');
    if (!lessonTitle && h1) lessonTitle = h1.textContent.trim();

    /* 段落：數字前綴包起來，依序編號 */
    function kanji(n) { var d = '〇一二三四五六七八九'; return n <= 10 ? (n === 10 ? '十' : d[n]) : (n < 20 ? '十' : d[Math.floor(n / 10)] + '十') + (n % 10 ? d[n % 10] : ''); }
    h2s = [].slice.call(main.querySelectorAll('h2'));
    h2s.forEach(function (h, i) {
      var f = h.firstChild;
      if (f && f.nodeType === 3) {
        var mm = f.nodeValue.match(/^\s*(\d+)\.\s*/);
        if (mm) { var s = document.createElement('span'); s.className = 'h-num'; s.textContent = mm[1] + '. '; f.nodeValue = f.nodeValue.slice(mm[0].length); h.insertBefore(s, f); }
      }
      h.setAttribute('data-n', String(i + 1));
      h.setAttribute('data-k', kanji(i + 1));
    });
    function title(h) {
      if (!h) return '開頭';
      return h.textContent.replace(/\s+/g, ' ').trim();
    }

    /* 路線圖的路線軌道 */
    rail = document.createElement('div'); rail.className = 'rail only-route'; rail.setAttribute('aria-hidden', 'true');
    rail.innerHTML = '<i></i>'; railFill = rail.firstChild;
    main.insertBefore(rail, main.firstChild);

    /* 版面：main 和筆記並排 */
    var page = document.createElement('div'); page.className = 'page';
    main.parentNode.insertBefore(page, main); page.appendChild(main);

    var key = 'jp-notes:' + m[1] + '/' + m[2];
    var panel = document.createElement('aside');
    panel.className = 'notes'; panel.id = 'notes'; panel.setAttribute('aria-label', '隨堂筆記');
    panel.innerHTML =
      '<div class="n-head"><span class="n-pic only-route" aria-hidden="true">' + PENCIL + '</span>' +
      '<b class="n-title">隨堂筆記</b><span class="n-sub only-route">伝言板</span><span class="n-sub only-wa">かわら版</span><span class="n-sub only-pixel">MEMO</span>' +
      '<button type="button" class="n-close" aria-label="收起筆記">×</button></div>' +
      '<div class="n-body"><div class="n-where">記在：<b class="n-at">開頭</b></div>' +
      '<textarea class="n-input" id="notes-input" aria-label="筆記內容" placeholder="學到一半想到的問題，打在這裡"></textarea>' +
      '<div class="n-addrow"><small>Ctrl＋Enter 也可以記下</small><button type="button" class="n-btn main n-add">記下</button></div>' +
      '<ol class="n-list"></ol>' +
      '<div class="n-export"><span>匯出</span><button type="button" class="n-btn" data-x="copy">複製文字</button><button type="button" class="n-btn" data-x="word">Word</button><button type="button" class="n-btn" data-x="pdf">PDF</button></div>' +
      '<p class="n-status" role="status"></p></div>';
    page.appendChild(panel);

    var fab = document.createElement('button');
    fab.type = 'button'; fab.className = 'notes-fab'; fab.setAttribute('aria-controls', 'notes'); fab.setAttribute('aria-expanded', 'false');
    fab.innerHTML = '<span class="fp only-route" aria-hidden="true">' + PENCIL + '</span><span class="fp only-wa" aria-hidden="true">筆</span>' +
      '<span class="fp only-pixel" aria-hidden="true">' + PX_PENCIL + '</span><span class="ft">筆記<span class="cnt"></span></span>';
    document.body.appendChild(fab);

    var printBox = document.createElement('div'); printBox.id = 'print-notes';
    document.body.appendChild(printBox);

    var list = panel.querySelector('.n-list'), input = panel.querySelector('.n-input'), status = panel.querySelector('.n-status'), at = panel.querySelector('.n-at');
    var notes = [];
    try { notes = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { notes = []; }
    if (!Array.isArray(notes)) notes = [];
    function save() { try { localStorage.setItem(key, JSON.stringify(notes)); } catch (e) {} }
    function say(s) { status.textContent = s; clearTimeout(say.t); say.t = setTimeout(function () { status.textContent = ''; }, 4000); }
    function render() {
      list.innerHTML = '';
      if (!notes.length) { var e = document.createElement('li'); e.className = 'n-empty'; e.textContent = '還沒有筆記。'; list.appendChild(e); }
      notes.forEach(function (n, i) {
        var li = document.createElement('li');
        var s = document.createElement('span'); s.className = 'n-sec'; s.textContent = n.sec; s.title = n.title;
        var p = document.createElement('p'); p.textContent = n.text;
        var d = document.createElement('button'); d.type = 'button'; d.className = 'n-del'; d.textContent = '×'; d.setAttribute('aria-label', '刪除這則筆記');
        d.onclick = function () { notes.splice(i, 1); save(); render(); };
        li.appendChild(s); li.appendChild(p); li.appendChild(d); list.appendChild(li);
      });
      fab.querySelector('.cnt').textContent = notes.length ? notes.length : '';
    }
    function add() {
      var v = input.value.trim(); if (!v) { input.focus(); return; }
      notes.push({ sec: current ? current.getAttribute('data-n') : '–', title: title(current), text: v });
      save(); render(); input.value = ''; list.scrollTop = list.scrollHeight; say('已記下。');
    }
    panel.querySelector('.n-add').onclick = add;
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); add(); } });
    function openPanel(o) { panel.classList.toggle('open', o); fab.setAttribute('aria-expanded', String(o)); if (o) input.focus({ preventScroll: true }); }
    fab.onclick = function () { openPanel(!panel.classList.contains('open')); };
    panel.querySelector('.n-close').onclick = function () { openPanel(false); fab.focus(); };
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && panel.classList.contains('open')) { openPanel(false); fab.focus(); } });

    /* 匯出 */
    function groups() {
      var order = h2s.map(title), g = [];
      notes.slice().sort(function (a, b) { return order.indexOf(a.title) - order.indexOf(b.title); }).forEach(function (n) {
        var last = g[g.length - 1];
        if (last && last.title === n.title) last.items.push(n.text); else g.push({ title: n.title, items: [n.text] });
      });
      return g;
    }
    function heading() { return (topicName ? topicName + ' ' : '') + lessonTitle + '　隨堂筆記'; }
    function today() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
    function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    function asText() {
      return heading() + '\n' + today() + '\n' + groups().map(function (g) {
        return '\n［' + g.title + '］\n' + g.items.map(function (x) { return '・' + x.replace(/\n/g, '\n　'); }).join('\n');
      }).join('\n') + '\n';
    }
    function asHTML() {
      return '<h1>' + esc(heading()) + '</h1><p>' + today() + '</p>' + groups().map(function (g) {
        return '<h2>' + esc(g.title) + '</h2>' + g.items.map(function (x) { return '<p>・' + esc(x).replace(/\n/g, '<br>') + '</p>'; }).join('');
      }).join('');
    }
    function fileName(ext) { return ((topicName || '') + '-' + lessonTitle + '-筆記.' + ext).replace(/[\\\/:*?"<>|\s]+/g, ''); }
    panel.querySelector('.n-export').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-x]'); if (!b) return;
      if (!notes.length) { say('還沒有筆記可以匯出。'); return; }
      var x = b.getAttribute('data-x');
      if (x === 'copy') {
        var txt = asText();
        var fallback = function () { input.value = txt; input.select(); say('瀏覽器不讓自動複製，文字已放進輸入框並選取，請按複製。'); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function () { say('已複製，可以貼到任何地方。'); }, fallback);
        else fallback();
      } else if (x === 'word') {
        var doc = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>' + esc(heading()) +
          '</title><style>body{font-family:"Microsoft JhengHei",sans-serif;font-size:12pt}h1{font-size:16pt}h2{font-size:13pt;border-bottom:1px solid #999}</style></head><body>' + asHTML() + '</body></html>';
        var url = URL.createObjectURL(new Blob(['﻿', doc], { type: 'application/msword' }));
        var a = document.createElement('a'); a.href = url; a.download = fileName('doc');
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
        say('已下載 Word 檔（.doc）。');
      } else if (x === 'pdf') {
        printBox.innerHTML = asHTML();
        root.classList.add('print-notes');
        var done = function () { root.classList.remove('print-notes'); window.removeEventListener('afterprint', done); };
        window.addEventListener('afterprint', done);
        say('在列印視窗的印表機選「另存為 PDF」。');
        window.print();
      }
    });
    render();
  }

  /* ---------- 捲動：目前段落、軌道、回頂端、讀到哪 ---------- */
  function layoutRail() {
    if (!rail || !h2s.length) return;
    var top = h2s[0].offsetTop + 14, bottom = h2s[h2s.length - 1].offsetTop + 14;
    rail.style.top = top + 'px'; rail.style.height = Math.max(0, bottom - top) + 'px';
  }
  function onScroll() {
    totop.classList.toggle('show', window.scrollY > 500);
    if (!isLesson) return;
    var line = 120, cur = null;
    h2s.forEach(function (h) { var y = h.getBoundingClientRect().top; if (y < line) cur = h; h.classList.toggle('passed', y < line); });
    current = cur;
    var atEl = document.querySelector('.notes .n-at');
    if (atEl) atEl.textContent = cur ? cur.textContent.replace(/\s+/g, ' ').trim() : '開頭';
    if (railFill && rail.offsetHeight) {
      var r = rail.getBoundingClientRect();
      railFill.style.height = Math.max(0, Math.min(r.height, line - r.top)) + 'px';
    }
    root.style.setProperty('--read', Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)).toFixed(3));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { layoutRail(); onScroll(); });
  window.addEventListener('load', function () { layoutRail(); onScroll(); });
  document.addEventListener('skinchange', function () { setTimeout(function () { layoutRail(); onScroll(); }, 50); });
  layoutRail(); onScroll();
})();
