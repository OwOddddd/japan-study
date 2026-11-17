/* 外觀切換（所有頁面在 <head> 引用，放在 style.css 後面）
   - 在 <html> 設定 data-skin（route 路線圖／wa 和柄／pixel 像素／plain 簡潔）與 data-topic（依網址判斷主題）
   - 在 nav.site-nav 最後放「外觀」選單；選擇存在這個瀏覽器（localStorage）
   - 內含像素圖示資料 SPRITES 與 drawSprites()，像素外觀和首頁會用到
   - 載入同資料夾的 study.js（隨堂筆記、回頂端、課程頁美術） */
(function () {
  var BASE = (document.currentScript && document.currentScript.src || '').replace(/[^\/]*$/, '');
  var SKINS = [['route', '路線圖'], ['wa', '和柄'], ['pixel', '像素'], ['plain', '簡潔']];
  var root = document.documentElement;
  var skin = 'route';
  try {
    var saved = localStorage.getItem('jp-skin');
    if (saved && SKINS.some(function (k) { return k[0] === saved; })) skin = saved;
  } catch (e) {}
  root.setAttribute('data-skin', skin);

  var topic = 'home';
  ['history', 'geography', 'japanese', 'news', 'religion', 'architecture', 'food', 'railways', 'festivals', 'society', 'castles'].forEach(function (k) {
    if (location.pathname.indexOf('/' + k + '/') >= 0) topic = k;
  });
  root.setAttribute('data-topic', topic);

  window.setSkin = function (v) {
    root.setAttribute('data-skin', v);
    try { localStorage.setItem('jp-skin', v); } catch (e) {}
    document.dispatchEvent(new CustomEvent('skinchange', { detail: v }));
  };

  // 16 格寬的像素圖示：每個字元一格，'.' 透明
  window.SPRITES = {
    castle: { pal: { k: '#2d2a33', w: '#f4f1ea', g: '#8a8f98', d: '#5c6068' }, rows: [
      '.......kk.......', '.....kkkkkk.....', '......wwww......', '......wkkw......',
      '...kkkkkkkkkk...', '....wwwwwwww....', '....wkkwwkkw....', '..kkkkkkkkkkkk..',
      '...wwwwwwwwww...', '...wkwwkkwwkw...', '...wwwwwwwwww...', '..gggggggggggg..',
      '.ggdggggggdgggg.', 'gggggggdgggggggg'] },
    fuji: { pal: { w: '#ffffff', c: '#c9d6ea', b: '#3d5a99', g: '#5f9e5a', G: '#3f7a3c' }, rows: [
      '................', '......wwww......', '.....wwwwww.....', '....wwcwwcww....',
      '...bbwbbbbwbb...', '..bbbbbbbbbbbb..', '.bbbbbbbbbbbbbb.', 'bbbbbbbbbbbbbbbb',
      'gggggggggggggggg', 'gGgggGgggggGgggg'] },
    torii: { pal: { k: '#2d2a33', r: '#d2442f' }, rows: [
      'kkkkkkkkkkkkkkkk', 'rrrrrrrrrrrrrrrr', '...rr......rr...', '...rr......rr...',
      '.rrrrrrrrrrrrrr.', '...rr......rr...', '...rr......rr...', '...rr......rr...',
      '...rr......rr...', '...rr......rr...', '...rr......rr...', '..kkkk....kkkk..'] },
    lantern: { pal: { k: '#2d2a33', r: '#d2442f', d: '#9c2a1c', y: '#ffd76a' }, rows: [
      '......kkkk......', '.....kkkkkk.....', '....rrrrrrrr....', '...dddddddddd...',
      '..rrrrrrrrrrrr..', '..dddddddddddd..', '..rrrryyyyrrrr..', '..ddddyyyydddd..',
      '..rrrrrrrrrrrr..', '...dddddddddd...', '....rrrrrrrr....', '.....kkkkkk.....',
      '......kkkk......', '.......kk.......'] },
    bubble: { pal: { k: '#2d2a33', w: '#ffffff', p: '#6a58b0' }, rows: [
      '..kkkkkkkkkkkk..', '.kwwwwwwwwwwwwk.', 'kwwwwwpwwwwwwwwk', 'kwwwwppppppwwwwk',
      'kwwwwwpwwwwwwwwk', 'kwwwwwppppwwwwwk', 'kwwwwppwpwpwwwwk', 'kwwwpwpwpwwpwwwk',
      'kwwwpwwpwwwpwwwk', 'kwwwwppwwwpwwwwk', '.kwwwwwwwwwwwwk.', '..kkkkwwkkkkkk..',
      '......kwk.......', '.......k........'] },
    shinkansen: { pal: { k: '#2d2a33', w: '#f4f6f8', b: '#2f5fa8', s: '#9fc3e8' }, rows: [
      '................', '........wwwwwwww', '.....wwwwwwwwwww', '...wwssswwswwsww',
      '..wwwwwwwwwwwwww', '.wwwwwwwwwwwwwww', 'bbbbbbbbbbbbbbbb', 'wwwwwwwwwwwwwwww',
      '..kk....kk...kk.'] },
    scroll: { pal: { b: '#7a4a2a', w: '#f4ead2', k: '#3a3330', r: '#c8432f' }, rows: [
      '.bb..........bb.', '.bbwwwwwwwwwwbb.', '.bbwkkkwwkkkwbb.', '.bbwwwwwwwwwwbb.',
      '.bbwkkwkkkkwwbb.', '.bbwwwwwwwwwwbb.', '.bbwkkkkwkkwwbb.', '.bbwwwwwwwwwwbb.',
      '.bbwwwwwwwrrwbb.', '.bbwwwwwwwrrwbb.', '.bb..........bb.'] },
    pagoda: { pal: { k: '#2d2a33', r: '#c8432f', w: '#f4f1ea', g: '#8a8f98' }, rows: [
      '.......kk.......', '.......kk.......', '....kkkkkkkk....', '......rwwr......',
      '...kkkkkkkkkk...', '......rwwr......', '..kkkkkkkkkkkk..', '.....rrwwrr.....',
      '.kkkkkkkkkkkkkk.', '.....rrwwrr.....', 'kkkkkkkkkkkkkkkk', '....rrrwwrrr....',
      '..gggggggggggg..'] },
    onigiri: { pal: { w: '#fdfbf5', s: '#d9d3c4', k: '#1f2a24' }, rows: [
      '.......ww.......', '......wwww......', '.....wwwwww.....', '....wwwwwwww....',
      '...wwwwwwwwww...', '..wwwwwwwwwwww..', '..wwwwwwwwwwsw..', '.wwwwkkkkkkwwww.',
      '.wwwwkkkkkkwwsw.', '.wwwwkkkkkkwwww.', '..wwwkkkkkkwww..'] },
    vending: { pal: { b: '#2f5fa8', w: '#e8eef6', r: '#d2442f', y: '#ffd76a', g: '#5f9e5a', k: '#1b1f2a' }, rows: [
      '..bbbbbbbbbbbb..', '..bwwwwwwwwwwb..', '..brywgrywgryb..', '..bwwwwwwwwwwb..',
      '..bgryrwygrwyb..', '..bwwwwwwwwwwb..', '..bbbbbbbbbbbb..', '..bbkkbbbbyybb..',
      '..bbbbbbbbbbbb..', '..bbkkkkkkkkbb..', '..bbbbbbbbbbbb..', '..kk........kk..'] }
  };
  window.drawSprites = function (scope) {
    (scope || document).querySelectorAll('canvas[data-sprite]').forEach(function (c) {
      var s = window.SPRITES[c.getAttribute('data-sprite')];
      if (!s) return;
      c.width = s.rows[0].length; c.height = s.rows.length;
      var ctx = c.getContext('2d');
      s.rows.forEach(function (r, y) {
        for (var x = 0; x < r.length; x++) {
          if (r[x] !== '.') { ctx.fillStyle = s.pal[r[x]]; ctx.fillRect(x, y, 1, 1); }
        }
      });
    });
  };

  var ICON = { history: 'scroll', geography: 'fuji', japanese: 'bubble', news: 'lantern',
    religion: 'torii', architecture: 'pagoda', food: 'onigiri', railways: 'shinkansen', festivals: 'lantern', society: 'vending', castles: 'castle' };

  function ui() {
    var label = document.createElement('label');
    label.className = 'skin-pick';
    label.innerHTML = '外觀 <select id="skin-select" aria-label="切換網站外觀">' +
      SKINS.map(function (k) { return '<option value="' + k[0] + '">' + k[1] + '</option>'; }).join('') +
      '</select>';
    var sel = label.querySelector('select');
    sel.value = root.getAttribute('data-skin');
    sel.addEventListener('change', function () { window.setSkin(sel.value); });
    var nav = document.querySelector('nav.site-nav');
    var main = document.querySelector('main');
    if (nav) nav.appendChild(label);
    else if (main) main.insertBefore(label, main.firstChild);

    // 像素外觀的頁首小風景（其他外觀用 CSS 隱藏）
    if (main && topic !== 'home') {
      var strip = document.createElement('div');
      strip.className = 'px-strip';
      strip.setAttribute('aria-hidden', 'true');
      strip.innerHTML = '<div class="px-props"><canvas data-sprite="' + ICON[topic] + '"></canvas>' +
        '<canvas data-sprite="torii"></canvas><canvas data-sprite="' + (topic === 'geography' ? 'shinkansen' : 'fuji') + '"></canvas></div><div class="px-ground"></div>';
      main.insertBefore(strip, main.firstChild);
      window.drawSprites(strip);
    }
    arrive(main);
    // 筆記、回頂端、課程頁美術（shared/study.js）
    var st = document.createElement('script');
    st.src = BASE + 'study.js';
    document.body.appendChild(st);
  }

  // 每課最下方的「到站確認」。選項記進這台裝置的瀏覽器（jp-done：1 學完了、0 還想多逛逛），首頁的發車看板和路線圖依此顯示進度
  function arrive(main) {
    var m = location.pathname.match(/\/([a-z]+)\/lessons\/([^\/]+\.html)$/);
    if (!main || !m || m[1] === 'news') return;
    var key = m[1] + '/lessons/' + m[2], done = {};
    try { done = JSON.parse(localStorage.getItem('jp-done') || '{}'); } catch (e) {}
    var box = document.createElement('section');
    box.className = 'arrive';
    box.innerHTML = '<p class="arrive-q">到站了嗎？</p><div class="arrive-btns">' +
      '<button type="button" data-v="1">我學完了</button><button type="button" data-v="0">我還想多逛逛</button></div>' +
      '<p class="arrive-note">進度只存在這台裝置的瀏覽器裡。</p>';
    function show() {
      box.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(done[key] === +b.getAttribute('data-v'))); });
    }
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      done[key] = +b.getAttribute('data-v');
      try { localStorage.setItem('jp-done', JSON.stringify(done)); } catch (e2) {}
      show();
    });
    show();
    var nav = main.querySelector('nav.lesson-nav');
    if (nav) nav.parentNode.insertBefore(box, nav); else main.appendChild(box);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ui);
  else ui();
})();
