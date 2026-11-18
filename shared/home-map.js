/* 首頁「路線圖」外觀的地鐵路線圖（只有根目錄 index.html 引用，由 home.js 呼叫）。
   - 每個主題一條線，起點站是主題本身（寫簡稱，例如「歷史線」，連到目錄頁），之後每一課一站；圖下的對照表寫完整主題名。學完的課站點塗滿。整張圖只顯示各線起點的主題名；滑鼠移到某條線（手機上點一下）時，其他線變淡、這條線移到最上層、顯示全部站名。
   - 線的走向寫在 ROUTES：起點平均分在四邊，用水平、垂直、45 度斜線組成。站點沿線等距排列，課數變了不用改座標。
   - 站名用 SHORT 的縮寫；沒有列在 SHORT 的課名，取「：」或「，」前面的部分，超過 6 字截斷。新增課程時請總管在 SHORT 補一筆。 */
(function () {
  var W = 1000, H = 720;
  // side：起點的主題名寫在哪一側（n 上、s 下、e 右、w 左）
  var ROUTES = {
    H: { side: 'n', pts: [[150, 90], [150, 140], [400, 390], [650, 390], [730, 470]] },
    G: { side: 'n', pts: [[420, 90], [420, 250], [300, 370], [300, 520], [240, 580]] },
    J: { side: 'n', pts: [[700, 90], [700, 180], [560, 320], [560, 480], [500, 540]] },
    R: { side: 'e', pts: [[870, 200], [760, 200], [640, 320], [470, 320], [370, 420], [370, 500]] },
    A: { side: 'e', pts: [[870, 470], [800, 470], [660, 330], [660, 230], [600, 170]] },
    F: { side: 's', pts: [[720, 640], [720, 560], [540, 380], [340, 380], [240, 280]] },
    T: { side: 's', pts: [[460, 640], [460, 450], [360, 350], [360, 210], [300, 150]] },
    M: { side: 's', pts: [[190, 640], [300, 530], [620, 530], [760, 390], [760, 300]] },
    S: { side: 'w', pts: [[130, 470], [240, 470], [430, 280], [560, 280], [600, 240]] },
    C: { side: 'w', pts: [[130, 220], [260, 220], [470, 430], [640, 430], [690, 380]] }
  };
  var SHORT = {
    '時代與掌權者': '時代掌權者', '稻米和國家的誕生': '稻米與國家', '飛鳥到奈良的改革': '飛鳥奈良', '貴族的時代為何鬆動': '貴族鬆動', '鎌倉幕府': '鎌倉幕府', '室町到戰國': '室町戰國', '三英傑的統一': '三英傑', '江戶幕府的統治': '江戶統治', '江戶的經濟與町人': '江戶經濟', '開國與明治維新': '明治維新', '近代化與戰爭': '近代戰爭', '戰後的日本': '戰後日本',
    '第一個幕府': '第一個幕府', '室町與戰國': '室町戰國', '統一與江戶': '統一江戶', '黑船與明治': '黑船明治', '近代到戰後': '近代戰後',
    '板塊、地震與火山': '板塊地震', '日本的屋脊': '日本屋脊', '季風與氣候': '季風氣候', '太平洋側的帶狀走廊': '太平洋走廊', '平原、盆地與河川': '平原盆地', '海流與海岸': '海流海岸', '新幹線路網': '新幹線網', '橋與隧道': '橋與隧道', '工業地帶與能源': '工業能源', '過疏與高齡化': '過疏高齡',
    '新幹線路網': '新幹線網', '橋與隧道': '橋與隧道', '過疏與高齡化': '過疏高齡', '工業地帶與能源': '工業能源',
    '程度診斷': '程度診斷', '小字與長音': '小字長音', '動詞的兩種臉': '動詞兩臉', '〜ない': '〜ない', '〜た 與 〜て': '〜た〜て', '〜てる・〜ちゃう': '〜てる', '助詞': '助詞',
    '神社還是寺院': '神社寺院', '神道的世界觀': '神道世界觀', '神社的種類': '神社種類', '佛教的前半段': '佛教前半', '鎌倉新佛教': '鎌倉新佛教',
    '佛像怎麼看': '佛像', '神佛習合與神佛分離': '神佛習合', '參拜規矩與信仰用品': '參拜規矩', '日本人的宗教生活': '宗教生活',
    '木頭、雨水與地震': '木雨地震', '寺院的配置': '寺院配置', '寺院的三種樣式': '寺院樣式', '神社建築': '神社建築',
    '和室的由來': '和室由來', '傳統街區類型': '傳統街區', '日本庭園': '日本庭園', '明治的洋風建築': '洋風建築',
    '和食的骨架': '和食骨架', '昆布與柴魚': '昆布柴魚', '醬油、味噌、清酒': '醬油味噌', '壽司': '壽司', '江戶的外食': '江戶外食',
    '洋食與拉麵': '洋食拉麵', '地方料理': '地方料理', '日本用餐禮儀': '用餐禮儀',
    '鐵道大國的成因': '鐵道大國', '從國鐵到 JR': '國鐵到JR', '私鐵怎麼賺錢': '私鐵', '東京與大阪的路網': '東京大阪',
    '車站的使用方法': '車站使用', '票價與周遊券': '票價周遊券', '新幹線': '新幹線', '其他交通工具': '其他交通',
    '日曆換過一次': '日曆', '正月到雛祭': '正月到雛祭', '花見到梅雨': '花見到梅雨', '七夕到煙火': '七夕到煙火',
    '祭典的結構': '祭典結構', '月見到除夕': '月見到除夕', '季節感和旺季': '季節感旺季',
    '市町村制度': '市町村', '住址的寫法': '住址', '垃圾分類': '垃圾分類', '超商&販賣機': '超商販賣機',
    '錢湯與溫泉': '錢湯溫泉', '日本的學校': '學校', '職場制度': '職場',
    '住宅': '住宅', '什麼是迷惑？': '迷惑',
    '怎麼看一座城？': '看一座城', '什麼是繩張？': '繩張', '堅硬的石垣': '石垣', '有名的天守': '天守', '城的一生': '城的一生',
    '城下町的配置': '城下町配置', '今日的城下町': '今日城下町'
  };
  function short(n) {
    if (SHORT[n]) return SHORT[n];
    var s = n.split(/[：，]/)[0];
    return s.length > 6 ? s.slice(0, 6) + '…' : s;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // 折線：總長、依距離取點、取一段子折線
  function poly(pts) {
    var segs = [], L = 0;
    for (var i = 1; i < pts.length; i++) {
      var a = pts[i - 1], b = pts[i], len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      segs.push({ a: a, b: b, d0: L, len: len }); L += len;
    }
    function at(d) {
      d = Math.max(0, Math.min(L, d));
      for (var i = 0; i < segs.length; i++) {
        var s = segs[i];
        if (d <= s.d0 + s.len + 1e-6 || i === segs.length - 1) {
          var t = s.len ? (d - s.d0) / s.len : 0, dx = (s.b[0] - s.a[0]) / s.len, dy = (s.b[1] - s.a[1]) / s.len;
          return { x: s.a[0] + (s.b[0] - s.a[0]) * t, y: s.a[1] + (s.b[1] - s.a[1]) * t, dx: dx, dy: dy };
        }
      }
    }
    function sub(d0, d1) {
      var out = [at(d0)];
      segs.forEach(function (s) { var e = s.d0 + s.len; if (e > d0 && e < d1) out.push({ x: s.b[0], y: s.b[1] }); });
      out.push(at(d1));
      return 'M' + out.map(function (p) { return p.x.toFixed(1) + ' ' + p.y.toFixed(1); }).join('L');
    }
    return { L: L, at: at, sub: sub };
  }

  // 站名的位置：水平段上下交錯（避免相鄰站名重疊），其他寫在線的右側
  function labelPos(p, i) {
    if (Math.abs(p.dy) < 0.1) return { x: p.x, y: p.y + (i % 2 ? 17 : -15), a: 'middle' };
    var nx = -p.dy, ny = p.dx;
    if (nx < 0) { nx = -nx; ny = -ny; }
    return { x: p.x + nx * 13 + 2, y: p.y + ny * 13, a: 'start' };
  }
  var TERM = { n: [0, -22, 'middle'], s: [0, 32, 'middle'], e: [22, 5, 'start'], w: [-22, 5, 'end'] };

  function svg(data) {
    var lines = data.map(function (t) {
      var r = ROUTES[t.code]; if (!r) return '';
      var g = poly(r.pts), st = t.stations, n = st.length;
      // 起點是主題本身（連到目錄頁），課從第二個位置開始排
      var gap = n ? g.L / n : 0, open = st.filter(function (s) { return s.href; }).length;
      var dOpen = gap * open;
      var path = '<path class="hit" d="' + g.sub(0, g.L) + '"/>' +
        (open < n ? '<path class="track plan" d="' + g.sub(dOpen, g.L) + '"/>' : '') +
        (open > 0 ? '<path class="track" d="' + g.sub(0, open < n ? dOpen : g.L) + '"/>' : '');
      var stops = st.map(function (s, i) {
        var p = g.at(gap * (i + 1)), code = t.code + String(i + 1).padStart(2, '0'), lp = labelPos(p, i);
        var name = esc(short(s.n));
        var mark = '<circle class="mk" cx="' + p.x + '" cy="' + p.y + '" r="6"/>';
        var lbl = '<g class="lbl"><rect class="box"/><text x="' + lp.x + '" y="' + lp.y + '" text-anchor="' + lp.a + '" dominant-baseline="middle"><tspan class="cd">' + code + '</tspan> ' + name + '</text></g>';
        var inner = '<circle class="near" cx="' + p.x + '" cy="' + p.y + '" r="17"/>' + mark + lbl;
        return s.href ? '<a class="st' + (s.done ? ' done' : '') + '" href="' + s.href + '" aria-label="' + esc(t.name) + '線 ' + code + ' ' + esc(s.n) + '">' + inner + '</a>'
                      : '<g class="st p">' + inner + '</g>';
      }).join('');
      var p0 = g.at(0), tm = TERM[r.side];
      var term = '<a class="tname" href="' + t.id + '/index.html" aria-label="' + esc(t.name) + '線 目錄"><circle class="near" cx="' + p0.x + '" cy="' + p0.y + '" r="17"/>' +
        '<rect class="mk term" x="' + (p0.x - 13) + '" y="' + (p0.y - 13) + '" width="26" height="26" rx="5"/><text class="mk-t" x="' + p0.x + '" y="' + (p0.y + 5) + '">' + t.code + '</text>' +
        '<g class="tl"><rect class="box"/><text class="tn" x="' + (p0.x + tm[0]) + '" y="' + (p0.y + tm[1]) + '" text-anchor="' + tm[2] + '">' + esc(t.line || t.name) + '線</text></g></a>';
      return '<g class="ln" data-c="' + t.code + '" style="--c: var(--' + t.code + ')">' + path + stops + term + '</g>';
    }).join('');
    var legend = data.map(function (t) {
      return '<button type="button" data-c="' + t.code + '" style="--c: var(--' + t.code + ')"><i>' + t.code + '</i>' + esc(t.name) + '</button>';
    }).join('');
    return '<section class="metro"><div class="metro-head"><h2>路線圖</h2><span>ROUTE MAP</span></div>' +
      '<div class="metro-scroll"><svg viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="各主題路線圖">' + lines + '</svg></div>' +
      '<div class="metro-legend">' + legend + '</div></section>';
  }

  function bind(box) {
    var map = box.querySelector('.metro'); if (!map) return;
    var s = map.querySelector('svg'), holder = s;
    // 站名的白框：依文字大小算一次
    s.querySelectorAll('.lbl, .tl').forEach(function (l) {
      var b = l.querySelector('text').getBBox(), r = l.querySelector('.box');
      r.setAttribute('x', b.x - 5); r.setAttribute('y', b.y - 3); r.setAttribute('width', b.width + 10); r.setAttribute('height', b.height + 6); r.setAttribute('rx', 3);
    });
    function focus(code) {
      s.classList.toggle('focus', !!code);
      s.querySelectorAll('.ln').forEach(function (g) {
        var on = g.getAttribute('data-c') === code;
        g.classList.toggle('on', on);
        if (on && g !== holder.lastElementChild) holder.appendChild(g);
      });
      map.querySelectorAll('.metro-legend button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-c') === code)); });
    }
    function lineOf(el) { var g = el.closest && el.closest('.ln'); return g ? g.getAttribute('data-c') : null; }
    s.addEventListener('pointerover', function (e) {
      if (e.pointerType !== 'mouse') return;
      var c = lineOf(e.target); if (c) focus(c);
      var st = e.target.closest('.st'); s.querySelectorAll('.st.hot').forEach(function (x) { if (x !== st) x.classList.remove('hot'); });
      if (st) st.classList.add('hot');
    });
    s.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { focus(null); s.querySelectorAll('.st.hot').forEach(function (x) { x.classList.remove('hot'); }); } });
    // 手機：先點一下選線，選中後再點站名才進入
    s.addEventListener('click', function (e) {
      var c = lineOf(e.target);
      if (!c) { focus(null); return; }
      var g = e.target.closest('.ln');
      if (!g.classList.contains('on')) { e.preventDefault(); focus(c); }
    });
    s.addEventListener('focusin', function (e) { var c = lineOf(e.target); if (c) focus(c); });
    map.querySelector('.metro-legend').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      var c = b.getAttribute('data-c'); focus(b.getAttribute('aria-pressed') === 'true' ? null : c);
    });
    var sc = map.querySelector('.metro-scroll');
    if (sc.scrollWidth > sc.clientWidth) sc.scrollLeft = (sc.scrollWidth - sc.clientWidth) / 2;
  }

  window.HomeMap = { svg: svg, bind: bind };
})();
