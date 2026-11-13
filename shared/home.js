/* 網站首頁：依外觀畫出不同版型。
   已出的課從各主題 index.html「課程」區自動讀取（各主題對話照規則把新課加進目錄頁，首頁就會跟著更新）。
   預定的課：目錄頁有 li.todo 就用它，沒有就用下面的 PLANNED。PLANNED 和 FUTURE 由課程總管對照 CURRICULUM.md 與各主題 NOTES.md 維護。 */
(function () {
  var TOPICS = [
    { id: 'history', code: 'H', name: '日本歷史', icon: 'scroll', stamp: '史', pat: 'ichimatsu',
      desc: '因果主線：每個時代為什麼開始、為什麼結束',
      planned: ['第一個幕府', '室町與戰國', '統一與江戶', '黑船與明治', '近代到戰後'] },
    { id: 'geography', code: 'G', name: '日本地理', icon: 'fuji', stamp: '地', pat: 'seigaiha',
      desc: '山、海、氣候、人口與交通為什麼長這樣', planned: [] },
    { id: 'japanese', code: 'J', name: '日文', icon: 'bubble', stamp: '語', pat: 'yagasuri',
      desc: '以文法為主幹，看懂日常的動畫、日劇和書籍',
      planned: ['動詞的兩種臉', '〜ない', '〜た 與 〜て', '〜てる・〜ちゃう', '助詞'] },
    { id: 'religion', code: 'R', name: '宗教與信仰', icon: 'torii', stamp: '宗', pat: 'seigaiha',
      desc: '神社和寺院怎麼分、佛像怎麼看、參拜的規矩從哪來',
      planned: ['神社和寺院怎麼分', '神道的世界觀', '神社的種類', '奈良與平安的佛教', '鎌倉新佛教', '佛像怎麼看', '神佛習合與分離', '參拜規矩與信仰用品', '日本人的宗教生活'] },
    { id: 'architecture', code: 'A', name: '建築', icon: 'pagoda', stamp: '建', pat: 'ichimatsu',
      desc: '寺院、神社、城和老街，樣式與構造為什麼長這樣',
      planned: ['木造建築的共同條件', '寺院的配置', '寺院樣式', '神社建築', '住宅與茶室', '城的構造', '城下町與町家', '庭園', '明治的洋風建築'] },
    { id: 'food', code: 'F', name: '飲食文化', icon: 'onigiri', stamp: '食', pat: 'yagasuri',
      desc: '和食的結構、地方料理的成因、外食怎麼點',
      planned: ['和食的骨架', '高湯與昆布之路', '醬油、味噌、清酒', '壽司', '江戶的外食', '洋食與拉麵', '地方料理的地理成因', '外食的形式與規矩'] },
    { id: 'railways', code: 'T', name: '鐵道與交通', icon: 'shinkansen', stamp: '鐵', pat: 'ichimatsu',
      desc: 'JR 與私鐵的由來、路網、車站與票價的邏輯',
      planned: ['日本為什麼是鐵道大國', '從國鐵到 JR', '私鐵的經營模式', '東京與大阪的路網', '看懂車站', '票價結構', '新幹線', '鐵道以外的交通'] },
    { id: 'festivals', code: 'M', name: '年中行事與祭典', icon: 'lantern', stamp: '祭', pat: 'seigaiha',
      desc: '節令和祭典在做什麼、從哪裡來，季節感怎麼表現',
      planned: ['新曆舊曆與五節句', '冬到春', '春到夏', '夏', '祭典的結構', '秋到冬', '季節感'] },
    { id: 'society', code: 'S', name: '社會與生活', icon: 'vending', stamp: '社', pat: 'yagasuri',
      desc: '住址、垃圾、便利商店、學校與職場，生活規則的成因',
      planned: ['生活規則的根源', '住址', '垃圾', '便利商店與自動販賣機', '錢湯與溫泉', '學校', '職場', '住宅'] },
    { id: 'castles', code: 'C', name: '城與城下町', icon: 'castle', stamp: '城', pat: 'ichimatsu',
      desc: '城為什麼蓋在那裡、怎麼防守，城下町的街道與今天的城市',
      planned: ['怎麼看任何一座城', '繩張：曲輪、虎口、堀', '石垣的砌法與年代', '天守：現存、復元、模擬', '城的一生：築城到廢城', '城下町的設計', '今天的城下町怎麼看'] }
  ];
  var FUTURE = [];
  var NOTE = '地圖需要網路連線。測驗的作答紀錄只存在你目前使用的瀏覽器裡。';
  var data = null, news = null;
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
      (todo.length ? todo : t.planned).forEach(function (n) { st.push({ n: n }); });
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
      '<p class="small">' + NOTE + '</p>';
  };
  R.route = function () {
    var lines = data.map(function (t) {
      var c = counts(t);
      var stops = t.stations.map(function (s, i) {
        var code = t.code + String(i + 1).padStart(2, '0');
        var nm = s.href ? '<a href="' + s.href + '">' + esc(s.n) + '</a>' : esc(s.n);
        return '<li class="' + (s.href ? 'open' : 'plan') + '"><span class="dot"></span><span class="code">' + code + '</span><span class="name">' + nm + '</span></li>';
      }).join('');
      return '<article class="route" style="--c: var(--' + t.code + ')"><div class="route-head"><span class="badge">' + t.code + '</span>' +
        '<div><a href="' + t.id + '/index.html">' + t.name + '線</a>' +
        '<div class="meta">' + c[0] + ' 站開通・預定 ' + c[1] + ' 站</div></div></div><p class="desc">' + t.desc + '</p><ul class="stops">' + stops + '</ul></article>';
    }).join('');
    return '<header class="sign"><div class="sign-top"></div><div class="sign-body"><div class="sign-no"><span>JP<big>00</big></span></div>' +
      '<div class="sign-name"><div class="kana">にほんがくしゅう</div><h1>日本學習</h1><div class="roman">Nihon Gakushū</div></div>' +
      '<div></div></div><div class="sign-bottom"><span>← 台灣</span><span>日本 →</span></div></header>' +
      '<p class="lede">為了去日本旅行時看得懂眼前的東西。每個主題是一條路線，每一課是一個車站。</p>' +
      '<section><h2>路線圖 <small>實心站是已經出好的課，空心站是預定的課</small></h2><div class="lines">' + lines + '</div></section>' +
      (FUTURE.length ? '<section><h2>建設中的路線</h2><div class="future">' + FUTURE.map(function (f) { return '<span>' + f[0] + '線</span>'; }).join('') + '</div></section>' : '') +
      '<section><h2>本日告示</h2><div class="board"><span class="lbl">睡前日本新聞</span>' + newsList('news3') + '</div></section><p class="small">' + NOTE + '</p>';
  };
  R.wa = function () {
    var cards = data.map(function (t) {
      var c = counts(t);
      var ls = t.stations.map(function (s) { return s.href ? '<li><a href="' + s.href + '">' + esc(s.n) + '</a></li>' : '<li class="plan">' + esc(s.n) + '</li>'; }).join('');
      return '<article class="topic" style="--pc: var(--' + t.code + ')"><div class="pat ' + t.pat + '"></div><div class="body"><h3><a href="' + t.id + '/index.html">' + t.name + '</a></h3>' +
        '<p>' + t.desc + '</p><ul class="lessons">' + ls + '</ul><div class="count">已開 ' + c[0] + ' 課・預定 ' + c[1] + ' 課</div></div>' +
        '<div class="stamp"><span class="hanko">' + t.stamp + '</span></div></article>';
    }).join('');
    return '<header class="hero seigaiha"><div class="tanzaku"><div><h1>日本學習</h1><p>為了去日本旅行時，看得懂眼前的東西。</p></div><div class="hanko big">學以致用</div></div></header>' +
      '<section><h2>主題</h2><div class="topics">' + cards + '</div></section>' +
      (FUTURE.length ? '<section><h2>之後會開的主題</h2><div class="future">' + FUTURE.map(function (f) { return '<div><span class="hanko">' + f[1] + '</span>' + f[0] + '</div>'; }).join('') + '</div></section>' : '') +
      '<section><h2>睡前日本新聞</h2><div class="news koushi"><div class="card">' + newsList('news3') + '</div></div></section>' +
      '<p class="small">' + NOTE + '</p>';
  };
  R.pixel = function () {
    var quests = data.map(function (t) {
      var c = counts(t);
      var bar = t.stations.map(function (s) { return '<i class="' + (s.href ? 'on' : '') + '"></i>'; }).join('');
      var st = t.stations.map(function (s) { return s.href ? '<li class="on"><a href="' + s.href + '">' + esc(s.n) + '</a></li>' : '<li class="plan">' + esc(s.n) + '</li>'; }).join('');
      return '<div class="quest" style="--c: var(--' + t.code + ')"><div class="q-head"><canvas data-sprite="' + t.icon + '"></canvas><div><a href="' + t.id + '/index.html">' + t.name + '</a>' +
        '<div class="lv">' + c[0] + ' / ' + t.stations.length + ' 關開放</div></div></div><p>' + t.desc + '</p><div class="bar">' + bar + '</div><ul class="stages">' + st + '</ul></div>';
    }).join('');
    return '<header class="scene"><div class="title"><h1>日本學習</h1><p>去日本之前的冒險日誌</p></div><div class="props">' +
      '<canvas data-sprite="torii"></canvas><canvas class="big" data-sprite="castle"></canvas><canvas class="big" data-sprite="fuji"></canvas>' +
      '<canvas data-sprite="lantern"></canvas><canvas data-sprite="shinkansen"></canvas></div><div class="ground"></div></header>' +
      '<section class="window"><h2>進行中的任務</h2><div class="quests">' + quests + '</div></section>' +
      (FUTURE.length ? '<section class="window"><h2>尚未開放的地區</h2><div class="locked">' + FUTURE.map(function (f) { return '<div>？？？<small>' + f[0] + '</small></div>'; }).join('') + '</div></section>' : '') +
      '<section class="window"><h2>今日情報</h2><div class="news"><canvas data-sprite="lantern"></canvas><div>' + newsList('news3') + '</div></div></section>' +
      '<p class="small">' + NOTE + '</p>';
  };

  function render() {
    if (!data) return;
    var skin = document.documentElement.getAttribute('data-skin');
    box.className = 'home home-' + skin;
    box.innerHTML = warn() + (R[skin] || R.plain)();
    if (window.drawSprites) window.drawSprites(box);
  }
  Promise.all([Promise.all(TOPICS.map(load)), loadNews()]).then(function (res) { data = res[0]; news = res[1]; render(); });
  document.addEventListener('skinchange', render);
})();
