/* 網站首頁：依外觀畫出不同版型。
   已出的課從各主題 index.html「課程」區自動讀取（各主題對話照規則把新課加進目錄頁，首頁就會跟著更新）。
   預定的課：目錄頁有 li.todo 就用它，沒有就用下面的 PLANNED。PLANNED 和 FUTURE 由課程總管對照 CURRICULUM.md 與各主題 NOTES.md 維護。 */
(function () {
  var TOPICS = [
    { id: 'history', code: 'H', name: '日本歷史', icon: 'castle', stamp: '史', pat: 'ichimatsu',
      desc: '因果主線：每個時代為什麼開始、為什麼結束',
      planned: ['第一個幕府', '室町與戰國', '統一與江戶', '黑船與明治', '近代到戰後'] },
    { id: 'geography', code: 'G', name: '日本地理', icon: 'fuji', stamp: '地', pat: 'seigaiha',
      desc: '山、海、氣候、人口與交通為什麼長這樣', planned: [] },
    { id: 'japanese', code: 'J', name: '日文', icon: 'bubble', stamp: '語', pat: 'yagasuri',
      desc: '以文法為主幹，看懂日常的動畫、日劇和書籍',
      planned: ['動詞的兩種臉', '〜ない', '〜た 與 〜て', '〜てる・〜ちゃう', '助詞'] }
  ];
  var FUTURE = [['宗教與信仰', '宗'], ['建築', '建'], ['飲食文化', '食'], ['鐵道與交通', '鐵'], ['年中行事與祭典', '祭'], ['社會與生活', '社']];
  var NOTE = '地圖需要網路連線。測驗的作答紀錄只存在你目前使用的瀏覽器裡。';
  var data = null, news = null;
  var box = document.getElementById('home');

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function clean(t) { return t.replace(/^第\s*\d+\s*課\s*[・·]\s*/, '').trim(); }

  function load(t) {
    return fetch(t.id + '/index.html').then(function (r) { return r.text(); }).then(function (html) {
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
    }).catch(function () { return Object.assign({}, t, { stations: t.planned.map(function (n) { return { n: n }; }) }); });
  }
  function loadNews() {
    return fetch('news/index.html').then(function (r) { return r.text(); }).then(function (html) {
      var a = new DOMParser().parseFromString(html, 'text/html').querySelector('.toc li a');
      if (!a) return null;
      var parts = a.textContent.split('・');
      return { date: parts[0], title: parts.slice(1).join('・') || parts[0], href: 'news/' + a.getAttribute('href') };
    }).catch(function () { return null; });
  }
  function counts(t) { var o = t.stations.filter(function (s) { return s.href; }).length; return [o, t.stations.length - o]; }

  var R = {};
  R.plain = function () {
    return '<h1>日本學習</h1><p class="lede">為了去日本旅行時看得懂眼前的東西：歷史、地理、日文，之後還會加上其他主題。</p>' +
      '<h2>主題</h2><ul class="toc">' + data.map(function (t) {
        return '<li><a href="' + t.id + '/index.html">' + t.name + '</a><span class="small">' + t.desc + '</span></li>'; }).join('') + '</ul>' +
      '<h2>每日</h2><ul class="toc"><li><a href="news/index.html">睡前日本新聞</a><span class="small">' +
      (news ? esc(news.date + '・' + news.title) : '每天三到五則日本新聞，連到學過的課程') + '</span></li></ul>' +
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
      return '<article class="route" style="--c: var(--' + t.code + ')"><div class="route-head"><span class="icon"><canvas data-sprite="' + t.icon + '"></canvas></span>' +
        '<div><div class="nm"><span class="badge">' + t.code + '</span><a href="' + t.id + '/index.html">' + t.name + '線</a></div>' +
        '<div class="meta">' + c[0] + ' 站開通・預定 ' + c[1] + ' 站</div></div></div><p class="desc">' + t.desc + '</p><ul class="stops">' + stops + '</ul></article>';
    }).join('');
    return '<header class="sign"><div class="sign-top"></div><div class="sign-body"><div class="sign-no"><span>JP<big>00</big></span></div>' +
      '<div class="sign-name"><div class="kana">にほんがくしゅう</div><h1>日本學習</h1><div class="roman">Nihon Gakushū</div></div>' +
      '<div class="sign-fuji"><canvas data-sprite="fuji"></canvas></div></div><div class="sign-bottom"><span>← 台灣</span><span>日本 →</span></div></header>' +
      '<p class="lede">為了去日本旅行時看得懂眼前的東西。每個主題是一條路線，每一課是一個車站。</p>' +
      '<section><h2>路線圖 <small>實心站是已經出好的課，空心站是預定的課</small></h2><div class="lines">' + lines + '</div></section>' +
      '<section><h2>建設中的路線</h2><div class="future">' + FUTURE.map(function (f) { return '<span>' + f[0] + '線</span>'; }).join('') + '</div></section>' +
      '<section><h2>本日告示</h2><div class="board"><canvas data-sprite="lantern"></canvas><div><span class="lbl">睡前日本新聞</span>　' +
      (news ? esc(news.date) : '') + '</div><a href="' + (news ? news.href : 'news/index.html') + '">' + (news ? esc(news.title) : '每天三到五則日本新聞') +
      '</a><a class="all" href="news/index.html">所有日期 →</a></div></section><p class="small">' + NOTE + '</p>';
  };
  R.wa = function () {
    var cards = data.map(function (t) {
      var c = counts(t);
      var ls = t.stations.map(function (s) { return s.href ? '<li><a href="' + s.href + '">' + esc(s.n) + '</a></li>' : '<li class="plan">' + esc(s.n) + '</li>'; }).join('');
      return '<article class="topic t-' + t.id + '"><div class="pat ' + t.pat + '"></div><div class="body"><h3><a href="' + t.id + '/index.html">' + t.name + '</a></h3>' +
        '<p>' + t.desc + '</p><ul class="lessons">' + ls + '</ul><div class="count">已開 ' + c[0] + ' 課・預定 ' + c[1] + ' 課</div></div>' +
        '<div class="stamp"><span class="hanko">' + t.stamp + '</span></div></article>';
    }).join('');
    return '<header class="hero seigaiha"><div class="tanzaku"><div><h1>日本學習</h1><p>為了去日本旅行時，看得懂眼前的東西。</p></div><div class="hanko big">學以致用</div></div></header>' +
      '<section><h2>主題</h2><div class="topics">' + cards + '</div></section>' +
      '<section><h2>之後會開的主題</h2><div class="future">' + FUTURE.map(function (f) { return '<div><span class="hanko">' + f[1] + '</span>' + f[0] + '</div>'; }).join('') + '</div></section>' +
      '<section><h2>每日</h2><div class="news koushi"><div class="card"><div class="date">睡前日本新聞・' + (news ? esc(news.date) : '') + '</div>' +
      '<a class="t" href="' + (news ? news.href : 'news/index.html') + '">' + (news ? esc(news.title) : '每天三到五則日本新聞') + '</a><a class="all" href="news/index.html">所有日期 →</a></div></div></section>' +
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
      '<section class="window"><h2>尚未開放的地區</h2><div class="locked">' + FUTURE.map(function (f) { return '<div>？？？<small>' + f[0] + '</small></div>'; }).join('') + '</div></section>' +
      '<section class="window"><h2>今日情報</h2><div class="news"><canvas data-sprite="lantern"></canvas><div><div class="date">睡前日本新聞・' + (news ? esc(news.date) : '') + '</div>' +
      '<a class="t" href="' + (news ? news.href : 'news/index.html') + '">' + (news ? esc(news.title) : '每天三到五則日本新聞') + '</a><a class="all" href="news/index.html">所有日期 →</a></div></div></section>' +
      '<p class="small">' + NOTE + '</p>';
  };

  function render() {
    if (!data) return;
    var skin = document.documentElement.getAttribute('data-skin');
    box.className = 'home home-' + skin;
    box.innerHTML = (R[skin] || R.plain)();
    if (window.drawSprites) window.drawSprites(box);
  }
  Promise.all([Promise.all(TOPICS.map(load)), loadNews()]).then(function (res) { data = res[0]; news = res[1]; render(); });
  document.addEventListener('skinchange', render);
})();
