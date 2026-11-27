/* 網站首頁：依外觀畫出不同版型。
   已出的課從各主題 index.html「課程」區自動讀取（各主題對話照規則把新課加進目錄頁，首頁就會跟著更新）。
   預定的課：目錄頁有 li.todo 就用它，沒有就用下面的 planned。主題的課全部做完時要把 planned 清成 []。PLANNED 和 FUTURE 由課程總管對照 CURRICULUM.md 與各主題 NOTES.md 維護。 */
(function () {
  var TOPICS = [
    { id: 'history', line: '歷史', code: 'H', name: '日本歷史', icon: 'scroll', stamp: '史', pat: 'ichimatsu',
      desc: '因果主線：每個時代為什麼開始、為什麼結束',
      planned: [] },
    { id: 'geography', line: '地理', code: 'G', name: '日本地理', icon: 'fuji', stamp: '地', pat: 'seigaiha',
      desc: '山、海、氣候、人口與交通為什麼長這樣', planned: [] },
    { id: 'japanese', line: '日文', code: 'J', name: '日文', icon: 'bubble', stamp: '語', pat: 'yagasuri',
      desc: '以文法為主幹，看懂日常的動畫、日劇和書籍',
      planned: [] },
    { id: 'religion', line: '宗教', code: 'R', name: '宗教與信仰', icon: 'torii', stamp: '宗', pat: 'seigaiha',
      desc: '神社和寺院怎麼分、佛像怎麼看、參拜的規矩從哪來',
      planned: [] },
    { id: 'architecture', line: '建築', code: 'A', name: '建築', icon: 'pagoda', stamp: '建', pat: 'ichimatsu',
      desc: '寺院、神社、城和老街，樣式與構造為什麼長這樣',
      planned: [] },
    { id: 'food', line: '飲食', code: 'F', name: '飲食文化', icon: 'onigiri', stamp: '食', pat: 'yagasuri',
      desc: '和食的結構、地方料理的成因、外食怎麼點',
      planned: [] },
    { id: 'railways', line: '鐵道', code: 'T', name: '鐵道與交通', icon: 'shinkansen', stamp: '鐵', pat: 'ichimatsu',
      desc: 'JR 與私鐵的由來、路網、車站與票價的邏輯',
      planned: [] },
    { id: 'festivals', line: '祭典', code: 'M', name: '年中行事與祭典', icon: 'lantern', stamp: '祭', pat: 'seigaiha',
      desc: '節令和祭典在做什麼、從哪裡來，季節感怎麼表現',
      planned: [] },
    { id: 'society', line: '社會', code: 'S', name: '社會與生活', icon: 'vending', stamp: '社', pat: 'yagasuri',
      desc: '住址、垃圾、便利商店、學校與職場，生活規則的成因',
      planned: [] },
    { id: 'castles', line: '城', code: 'C', name: '城與城下町', icon: 'castle', stamp: '城', pat: 'ichimatsu',
      desc: '城為什麼蓋在那裡、怎麼防守，城下町的街道與今天的城市',
      planned: [] }
  ];
  var FUTURE = [];
  var NOTE = '地圖需要網路連線。測驗的作答紀錄只存在你目前使用的瀏覽器裡。';
  var data = null, news = null;
  // 學習進度：每課最下方「到站了嗎？」的選項（skin.js 寫入，1＝學完了）
  var DONE = {};
  try { DONE = JSON.parse(localStorage.getItem('jp-done') || '{}'); } catch (e) {}
  var box = document.getElementById('home');

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function clean(t) { return t.replace(/^第\s*\d+\s*課\s*[・·]\s*/, '').trim(); }

  // 網站根目錄：從本檔的網址推回去，不受頁面網址有沒有結尾斜線影響
  var ROOT = ((document.currentScript && document.currentScript.src) || '').replace(/shared\/home\.js.*$/, '');
  var failed = 0;
  function get(path) {
    return fetch(ROOT + path).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); });
  }

  function load(t) {
    return get(t.id + '/index.html').then(function (html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var ul = null;
      doc.querySelectorAll('h2').forEach(function (h) {
        if (!ul && h.textContent.trim() === '課程') { var n = h.nextElementSibling; if (n && n.matches('ul.toc')) ul = n; }
      });
      var st = [], todo = [];
      if (ul) ul.querySelectorAll('li').forEach(function (li) {
        var a = li.querySelector('a');
        if (a) st.push({ n: clean(a.textContent), href: t.id + '/' + a.getAttribute('href') });
        else if (li.classList.contains('todo')) todo.push(clean(li.firstChild ? li.firstChild.textContent : li.textContent));
      });
      // 目錄頁沒有 li.todo 時才用 planned。主題的課全部做完時，planned 必須清成 []，否則會重複出現空心站（11/15 城主題出過一次）
      (todo.length ? todo : t.planned).forEach(function (n) { st.push({ n: n }); });
      st.forEach(function (s) { if (s.href && DONE[s.href] === 1) s.done = true; });
      return Object.assign({}, t, { stations: st });
    }).catch(function () { failed++; return Object.assign({}, t, { stations: t.planned.map(function (n) { return { n: n }; }) }); });
  }
  // 最近三期新聞
  function loadNews() {
    return get('news/index.html').then(function (html) {
      return [].slice.call(new DOMParser().parseFromString(html, 'text/html').querySelectorAll('.toc li a'), 0, 3).map(function (a) {
        var parts = a.textContent.split('・');
        return { date: parts[0], title: parts.slice(1).join('・') || parts[0], href: 'news/' + a.getAttribute('href') };
      });
    }).catch(function () { failed++; return []; });
  }
  // 新聞清單：三欄，最後一格是「更多」
  function newsList(cls) {
    var items = news.map(function (n) {
      return '<a class="ni" href="' + n.href + '"><span class="nd">' + esc(n.date) + '</span><span class="nt">' + esc(n.title) + '</span></a>';
    }).join('');
    return '<div class="' + cls + '">' + (items || '<span class="nt">每天三到五則日本新聞</span>') + '</div><a class="all" href="news/index.html">更多日期 →</a>';
  }
  // 現地索引入口，每種外觀放在 NOTE 前面
  var PLACES = '<p class="places-link"><a href="places/index.html">現地索引：依地點查學過的課 →</a></p>';
  function warn() {
    return failed ? '<p class="note">讀不到各主題的課程清單，下面只列出預定的課。用檔案直接開啟首頁時會這樣，請從網站網址開啟：https://owoddddd.github.io/japan-study/</p>' : '';
  }
  function counts(t) { var o = t.stations.filter(function (s) { return s.href; }).length; return [o, t.stations.length - o]; }

  var R = {};
  R.plain = function () {
    return '<h1>日本學習</h1><p class="lede">為了去日本旅行時看得懂眼前的東西：歷史、地理、日文，之後還會加上其他主題。</p>' +
      '<h2>主題</h2><ul class="toc">' + data.map(function (t) {
        return '<li><a href="' + t.id + '/index.html">' + t.name + '</a><span class="small">' + t.desc + '</span></li>'; }).join('') + '</ul>' +
      '<h2>睡前日本新聞</h2>' + newsList('news3') +
      PLACES + '<p class="small">' + NOTE + '</p>';
  };
  // 路線圖：車站大廳的發車看板。一行一條線，顯示學到哪一站；跳過沒學的站算「通過」，這條車就是快速。點一行展開全部站點
  R.route = function () {
    var rows = data.map(function (t, k) {
      var st = t.stations, cur = -1;
      var code = function (i) { return t.code + String(i + 1).padStart(2, '0'); };
      st.forEach(function (s, i) { if (s.done) cur = i; });
      var skip = st.filter(function (s, i) { return s.href && !s.done && i < cur; }).length;
      var ni = -1;
      st.forEach(function (s, i) { if (ni < 0 && i > cur && !s.done) ni = i; });
      var next = st[ni];
      var kind = cur < 0 ? ['idle', '未乘車'] : skip ? ['rapid', '快速'] : ['local', '各停'];
      var now = cur < 0 ? '起點' : '<b>' + code(cur) + '</b> ' + esc(st[cur].n);
      var nx = next ? code(ni) + ' ' + esc(next.n) + (next.href ? '' : ' <em>施工中</em>') : '<span class="end">終點到着</span>';
      var strip = st.map(function (s, i) {
        var c = s.done ? 'done' : !s.href ? 'p' : i < cur ? 'skip' : '';
        return '<li class="' + c + '"><code>' + code(i) + (c === 'skip' ? ' 通過' : '') + '</code>' + (s.href ? '<a href="' + s.href + '">' + esc(s.n) + '</a>' : esc(s.n)) + '</li>';
      }).join('');
      return '<button class="row" type="button" aria-expanded="false" style="--c: var(--' + t.code + ')">' +
        '<span class="no"><i>' + t.code + '</i> ' + (k + 1) + '</span>' +
        '<span class="kind ' + kind[0] + '">' + kind[1] + '</span>' +
        '<span class="dest"><small>' + esc(t.line) + '線</small>' + now + '</span>' +
        '<span class="next">' + nx + '</span></button>' +
        '<div class="strip" hidden style="--c: var(--' + t.code + ')"><a class="toline" href="' + t.id + '/index.html">' + esc(t.name) + ' 目錄 →</a>' +
        '<p class="desc">' + esc(t.desc) + '</p><ol>' + strip + '</ol></div>';
    }).join('');
    var tick = news.map(function (n) { return '<a href="' + n.href + '">【睡前日本新聞 ' + esc(n.date) + '】' + esc(n.title) + '</a>'; }).join('<span class="sep">◆</span>');
    return '<header class="hang"><div class="pic">学</div><div class="txt"><h1>日本學習</h1><span>のりば・PLATFORMS</span></div><div class="ex">⇦ 台灣　日本 ⇨</div></header>' +
      '<div class="board"><div class="bhead"><span>番線</span><span>種別</span><span>現在地</span><span>次の停車駅</span></div>' + rows + '</div>' +
      '<div class="ticker"><a class="tk-tag" href="news/index.html">告示</a><div class="run"><p>' + (tick || '每天三到五則日本新聞') + '</p></div></div>' +
      (window.HomeMap ? window.HomeMap.svg(data) : '') +
      PLACES + '<details class="booth"><summary><i>i</i>案內所</summary><p>每個主題是一條線，每一課是一站。每課最下方選「我學完了」，看板就會顯示你坐到哪一站；跳過沒學的站算「通過」，這條車就變成快速。下面的路線圖把滑鼠移到線上（手機點一下）會顯示站名。</p><p>' + NOTE + '</p></details>';
  };
  // 和柄：暖簾街。一個主題一家店，暖簾上的紋被中間的縫隙切成兩半；滑過會晃，點了往左右拉開，下方列出這家店的課
  function stOf(t) { return t.stations.map(function (s, i) { return { n: s.n, href: s.href, i: i, s: s.done ? 'done' : s.href ? 'open' : 'plan' }; }); }
  function doneN(t) { return t.stations.filter(function (s) { return s.done; }).length; }
  function code(t, i) { return t.code + String(i + 1).padStart(2, '0'); }
  function tcy(s) { return esc(s).replace(/\d+/g, function (d) { return '<span class="tcy">' + d + '</span>'; }); }
  R.wa = function () {
    var shops = data.map(function (t, k) {
      var c = counts(t), d = doneN(t);
      var face = '<span class="face"><span class="mon">' + t.stamp + '</span><small>' + esc(t.name) + '</small></span>';
      var half = function (side) { return '<span class="half ' + side + '"><span class="cloth pat-' + t.pat + '">' + face + '<span class="fold"></span></span></span>'; };
      return '<div class="shop" style="--c: var(--' + t.code + ')"><div class="roof"></div><div class="front"><span class="rod"></span><span class="cheer" lang="ja"></span>' +
        '<button class="noren" type="button" aria-expanded="false" data-k="' + k + '" aria-label="' + esc(t.name) + '">' + half('l') + half('r') + '</button></div>' +
        '<div class="sign">' + (d ? '學了 ' + d + '／' + c[0] + ' 課' : '營業中・' + c[0] + ' 課') + '</div></div>';
    }).join('');
    var kb = news.length ? news.map(function (n) { return '<a class="kb-item" href="' + n.href + '"><span class="kb-date">' + tcy(n.date) + '</span><br>' + tcy(n.title) + '</a>'; }).join('') : '<span class="kb-item">每天三到五則日本新聞</span>';
    return '<div class="sky"><div class="pole" aria-hidden="true"></div><div class="bignoren" role="img" aria-label="日本學習"><div>日</div><div>本</div><div>學習</div></div>' +
      '<p class="slogan">為了去日本旅行時，看得懂眼前的東西。</p></div>' +
      '<h1 class="vh">日本學習</h1><div class="street">' + shops + '</div><div class="wa-menu"></div>' +
      '<div class="kb"><div class="kb-roof" aria-hidden="true"></div><div class="kb-board"><div class="kb-paper"><a class="kb-title" href="news/index.html">瓦版</a><span class="kb-sub">睡前日本新聞・每晚一期</span>' + kb +
      '<span class="kb-wave" aria-hidden="true"></span><span class="kb-seal" aria-hidden="true">讀</span></div></div><div class="kb-posts" aria-hidden="true"><i></i><i></i></div></div>' +
      PLACES + '<p class="small">' + NOTE + '</p>';
  };
  var CHEER = ['がんばって', 'ファイト', 'お疲れさま', 'その調子', '一歩ずつ', 'よくやった', 'えらい！', 'いい感じ'];
  function bindWa(root) {
    var menu = root.querySelector('.wa-menu'), norens = root.querySelectorAll('.noren');
    function close() {
      menu.innerHTML = '<p class="hint">點一面暖簾，看這家店有哪些課；再點一次放下。</p>';
      norens.forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    }
    function open(k) {
      var t = data[k], c = counts(t);
      root.querySelectorAll('.cheer')[k].textContent = CHEER[Math.floor(Math.random() * CHEER.length)];
      menu.innerHTML = '<div class="menu" style="--c: var(--' + t.code + ')"><header><b>' + esc(t.name) + '</b><span>御品書き・' + c[0] + ' 課' + (c[1] ? '，另有 ' + c[1] + ' 課準備中' : '') + '</span><a href="' + t.id + '/index.html">進店 →</a></header><ol>' +
        stOf(t).map(function (s) {
          return '<li class="' + s.s + '"><code>' + code(t, s.i) + '</code>' + (s.href ? '<a href="' + s.href + '">' + esc(s.n) + '</a>' : esc(s.n)) + '<span class="dots"></span><span class="st ' + s.s + '">' + (s.s === 'done' ? '済' : s.s === 'plan' ? '近日' : '') + '</span></li>';
        }).join('') + '</ol></div>';
      norens.forEach(function (b) { b.setAttribute('aria-expanded', String(+b.dataset.k === k)); });
    }
    norens.forEach(function (b) {
      b.addEventListener('click', function () { if (b.getAttribute('aria-expanded') === 'true') close(); else open(+b.dataset.k); });
      // 滑過就晃一次，方向隨機；晃完才移除，所以從左滑到右會一面接一面晃
      b.addEventListener('mouseenter', function () { if (b.classList.contains('sway-a') || b.classList.contains('sway-b')) return; b.classList.add(Math.random() < .5 ? 'sway-a' : 'sway-b'); });
      b.addEventListener('animationend', function (e) { if (e.target.parentNode.classList.contains('r')) b.classList.remove('sway-a', 'sway-b'); });
    });
    close();
  }

  // 像素：世界地圖。十個主題是地圖上的十個地點，點了在下方顯示關卡；大標放在富士山與櫻花的背景帶中間
  var MAP_ORDER = ['castles', 'architecture', 'food', 'religion', 'railways', 'festivals', 'japanese', 'history', 'society', 'geography'];
  var MAP_P = [[33, 4], [30, 7.5], [26, 9.5], [23, 12], [19, 12.5], [15, 14.5], [11, 15.5], [8, 13], [6, 18], [14, 19.5]];
  R.pixel = function () {
    var nodes = MAP_ORDER.map(function (id, k) {
      var ti = data.findIndex(function (t) { return t.id === id; }), t = data[ti], p = MAP_P[k];
      return '<button class="node" type="button" data-k="' + ti + '" aria-pressed="false" style="left:' + (p[0] / 40 * 100) + '%;top:' + (p[1] / 22 * 100) + '%"><canvas data-sprite="' + t.icon + '"></canvas><span>' + esc(t.line) + '</span></button>';
    }).join('');
    var nw = news.length ? news.map(function (n) { return '<li><a href="' + n.href + '"><span>' + esc(n.date) + '</span>' + esc(n.title) + '</a></li>'; }).join('') : '<li>每天三到五則日本新聞</li>';
    return '<div class="band"><canvas class="band-c"></canvas><h1>日本學習</h1></div>' +
      '<div class="mapbox"><div class="mapin"><canvas class="map" width="320" height="176"></canvas>' + nodes + '</div></div>' +
      '<div class="side"><div class="win dialog"></div><div class="win pxnews"><h2><a href="news/index.html">今日情報</a></h2><ol>' + nw + '</ol></div></div>' +
      PLACES + '<p class="small">' + NOTE + '</p>';
  };
  function rnd(n) { var v = Math.sin(n * 12.9898) * 43758.5453; return v - Math.floor(v); }
  function drawMap(c) {
    var x = c.getContext('2d'), W = 40, H = 22;
    var isl = [[33, 4, 5, 3.2], [29, 8, 4, 2.6], [25, 11, 6, 3], [19, 13, 5, 2.6], [13, 15, 5, 2.4], [9, 13.5, 2.4, 1.6], [6, 18, 3.2, 2], [14, 19.5, 3, 1.4], [36, 1.5, 2.6, 1.4]];
    function land(i, j) { for (var k = 0; k < isl.length; k++) { var e = isl[k], dx = (i + .5 - e[0]) / e[2], dy = (j + .5 - e[1]) / e[3]; if (dx * dx + dy * dy <= 1) return 2 - (dx * dx + dy * dy > .62 ? 1 : 0); } return 0; }
    for (var j = 0; j < H; j++) for (var i = 0; i < W; i++) {
      var l = land(i, j);
      x.fillStyle = l === 0 ? ((i + j) % 2 ? '#1d3f8a' : '#24499a') : l === 1 ? '#e8d08a' : ((i * 7 + j * 3) % 5 ? '#4f9a4a' : '#3f8240'); x.fillRect(i * 8, j * 8, 8, 8);
      if (l === 0 && (i * 13 + j * 7) % 11 === 0) { x.fillStyle = '#6f8fd6'; x.fillRect(i * 8 + 2, j * 8 + 3, 4, 1); }
      if (l === 2 && (i * 5 + j * 11) % 17 === 0) { x.fillStyle = '#7d6a55'; x.fillRect(i * 8 + 1, j * 8 + 2, 6, 5); x.fillStyle = '#f3f1ea'; x.fillRect(i * 8 + 3, j * 8 + 2, 2, 1); }
    }
    function sea(i, j) { return land(Math.floor(i), Math.floor(j)) === 0; }
    function pix(px, py, rows, col) { x.fillStyle = col; rows.forEach(function (r, y) { for (var i = 0; i < r.length; i++) if (r[i] === 'x') x.fillRect(px + i, py + y, 1, 1); }); }
    [[4, 3], [12, 7], [20, 3], [3, 10], [34, 15], [28, 19], [22, 18], [38, 9], [16, 9], [2, 20]].forEach(function (p) { if (sea(p[0], p[1])) pix(p[0] * 8 + 1, p[1] * 8 + 3, ['.xx..', 'x..xx'], '#9db6ea'); });
    [[6, 6], [31, 18], [18, 6]].forEach(function (p, k) { if (sea(p[0], p[1])) pix(p[0] * 8, p[1] * 8 + 2, k % 2 ? ['.x.xx.', 'xxxxxx', '.x.xx.'] : ['.xx.x.', 'xxxxxx', '.xx.x.'], '#7f9fdc'); });
    [[8, 4], [33, 16], [22, 19]].forEach(function (p) { if (sea(p[0], p[1])) { pix(p[0] * 8 + 1, p[1] * 8 - 3, ['..x..', '.xx..', 'xxx..', '..x..'], '#e8ecf8'); pix(p[0] * 8, p[1] * 8 + 1, ['xxxxxx', '.xxxx.'], '#8a5a3a'); } });
    x.fillStyle = '#000';
    for (var k = 0; k < MAP_P.length - 1; k++) { var a = MAP_P[k], b = MAP_P[k + 1], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) * 2); for (var s = 1; s < n; s += 2) x.fillRect(Math.round((a[0] + (b[0] - a[0]) * s / n) * 8) - 1, Math.round((a[1] + (b[1] - a[1]) * s / n) * 8) - 1, 2, 2); }
  }
  // 背景帶：邏輯畫素寬依螢幕寬重算、每點放大 3 倍；左邊富士山，右邊一排櫻花，中間面板放標題
  function drawBand(c) {
    var x = c.getContext('2d'), H = 28, W = Math.max(110, Math.round(c.clientWidth / 3) || 320);
    c.width = W; c.height = H;
    var cx = Math.round(W / 2), pw = 58, pl = cx - pw / 2, pr = cx + pw / 2;
    ['#141a44', '#1c2257', '#272a68', '#382f74', '#4f3677'].forEach(function (col, i) { x.fillStyle = col; x.fillRect(0, i * 5, W, 5); });
    x.fillStyle = '#f3f1ea'; for (var i = 0; i < W / 6; i++) x.fillRect(Math.floor(rnd(i) * W), Math.floor(rnd(i + 99) * 14), 1, 1);
    function mtn(mx, top, base, half, col, snow) { for (var y = top; y < base; y++) { var w = Math.round((y - top) / (base - top) * half); x.fillStyle = (snow && y < top + (base - top) * .35) ? '#f3f1ea' : col; x.fillRect(mx - w, y, w * 2 + 1, 1); } }
    var fx = Math.round(pl * .55);
    mtn(fx, 4, 25, 18, '#3d5a99', true);
    for (var m = fx - 34; m > -20; m -= 30) mtn(m, 13, 25, 13, '#2d3f73', false);
    mtn(fx + 24, 15, 25, 10, '#2d3f73', false);
    x.fillStyle = '#24502c'; x.fillRect(0, 23, W, 5); x.fillStyle = '#2f6a38'; for (i = 0; i < W; i += 5) x.fillRect(i, 22 + (i % 10 ? 1 : 0), 3, 1);
    x.fillStyle = '#ffd76a'; x.fillRect(W - 12, 3, 4, 4); x.fillStyle = '#382f74'; x.fillRect(W - 11, 3, 3, 1);
    function tree(tx, ty, rx, ry) {
      x.fillStyle = '#4a2f22'; x.fillRect(tx, ty, 2, 24 - ty); x.fillRect(tx - 3, ty + 2, 3, 1); x.fillRect(tx + 2, ty + 1, 3, 1);
      for (var yy = -ry; yy <= ry; yy++) for (var xx = -rx; xx <= rx; xx++) {
        if (xx * xx / (rx * rx) + yy * yy / (ry * ry) > 1) continue; var r = rnd(tx * 31 + xx * 7 + yy * 13);
        x.fillStyle = yy > ry * .4 ? (r < .5 ? '#e58aa6' : '#f4a0b8') : (r < .33 ? '#ffd3de' : r < .75 ? '#f7b6c8' : '#f4a0b8'); x.fillRect(tx + xx, ty + yy - ry + 1, 1, 1);
      }
    }
    for (var t = pr + 8, k = 0; t < W + 8; t += 15, k++) tree(t, 9 + (k % 2) * 3, 7 - (k % 2), 5 - (k % 2));
    x.fillStyle = '#ffd3de'; for (i = 0; i < W / 10; i++) x.fillRect(pr + Math.floor(rnd(i + 7) * (W - pr)), 6 + Math.floor(rnd(i + 51) * 16), 1, 1);
    x.fillStyle = '#000'; x.fillRect(pl - 2, 2, pw + 4, H - 4); x.fillStyle = '#e9e6ff'; x.fillRect(pl - 1, 3, pw + 2, H - 6); x.fillStyle = '#0f1430'; x.fillRect(pl, 4, pw, H - 8);
  }
  function bindPx(root) {
    var dl = root.querySelector('.dialog'), band = root.querySelector('.band-c');
    drawMap(root.querySelector('canvas.map'));
    drawBand(band);
    function pick(k) {
      var t = data[k], st = stOf(t), c = counts(t), d = doneN(t);
      var nx = st.filter(function (s) { return s.s === 'open'; })[0];
      dl.innerHTML = '<div class="who"><canvas data-sprite="' + t.icon + '"></canvas><a href="' + t.id + '/index.html">' + esc(t.name) + '</a></div>' +
        '<p>已攻略 ' + d + '／' + c[0] + ' 關' + (nx ? '。下一關：' + esc(nx.n) : '') + (c[1] ? '。另有 ' + c[1] + ' 關還沒開放' : '') + '</p>' +
        '<ol style="--rows:' + Math.ceil(st.length / 2) + '">' + st.map(function (s) {
          return '<li class="' + s.s + '">' + (s.href ? '<a href="' + s.href + '">' + esc(s.n) + '</a>' : '？？？ ' + esc(s.n)) + '</li>';
        }).join('') + '</ol>';
      if (window.drawSprites) window.drawSprites(dl);
      root.querySelectorAll('.node').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.dataset.k === k)); });
    }
    // 關卡資訊與今日情報的框固定成最高那個主題的高度，換地點時不會變大變小
    function fixH() {
      var cur = +(root.querySelector('.node[aria-pressed="true"]') || { dataset: { k: 0 } }).dataset.k, m = 0;
      dl.style.minHeight = '';
      for (var k = 0; k < data.length; k++) { pick(k); m = Math.max(m, dl.offsetHeight); }
      dl.style.minHeight = m + 'px'; pick(cur);
    }
    root.querySelectorAll('.node').forEach(function (b) { b.addEventListener('click', function () { pick(+b.dataset.k); }); });
    pick(data.findIndex(function (t) { return t.id === 'history'; }));
    fixH();
    pxResize = function () { if (!root.isConnected) return; drawBand(band); fixH(); };
  }
  var pxResize = null;
  addEventListener('resize', function () { if (pxResize) pxResize(); });

  function render() {
    if (!data) return;
    var skin = document.documentElement.getAttribute('data-skin');
    box.className = 'home home-' + skin;
    box.innerHTML = warn() + (R[skin] || R.plain)();
    if (window.drawSprites) window.drawSprites(box);
    if (skin === 'route' && window.HomeMap) window.HomeMap.bind(box);
    pxResize = null;
    if (skin === 'wa') bindWa(box);
    if (skin === 'pixel') bindPx(box);
  }
  Promise.all([Promise.all(TOPICS.map(load)), loadNews()]).then(function (res) { data = res[0]; news = res[1]; render(); });
  document.addEventListener('skinchange', render);
  box.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('button.row');
    if (!b) return;
    var s = b.nextElementSibling; s.hidden = !s.hidden; b.setAttribute('aria-expanded', String(!s.hidden));
  });
})();
