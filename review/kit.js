// 審閱用的畫筆標註。標註存在這台裝置的瀏覽器（localStorage），按「匯出」下載成 JSON 檔再傳出去。
// 課程頁在自己的播放器程式之後載入本檔，可以直接用播放器的 idx、paused、reset() 等變數。
const RV_KEY = 'walime-review-v1';
const RV_TITLES = { 1: '第 1 課', 2: '第 2 課', 3: '第 3 課' };
function rvLoad() {
  try { const d = JSON.parse(localStorage.getItem(RV_KEY)); if (d && Array.isArray(d.notes)) return d; } catch (e) {}
  return { name: '', notes: [] };
}
function rvSave(d) { try { localStorage.setItem(RV_KEY, JSON.stringify(d)); return true; } catch (e) { return false; } }
function rvExport() {
  const d = rvLoad();
  if (!d.notes.length) { alert('還沒有任何標註。'); return; }
  const day = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const body = JSON.stringify({ name: d.name, exported: new Date().toISOString(), notes: d.notes }, null, 1);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([body], { type: 'application/json' }));
  a.download = `和萊姆標註-${d.name || '未署名'}-${day}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
// 名字欄、匯出鈕、總數：首頁和課程頁共用
function rvFoot(root) {
  const name = root.querySelector('.rv-name'), count = root.querySelector('.rv-count');
  name.value = rvLoad().name;
  name.oninput = () => { const d = rvLoad(); d.name = name.value.trim(); rvSave(d); };
  root.querySelector('.rv-export').onclick = rvExport;
  const upd = () => { count.textContent = `三部合計 ${rvLoad().notes.length} 則`; };
  upd();
  return upd;
}
const RV_FOOT_HTML = `<div class="row foot"><label>你的名字 <input type="text" class="rv-name" maxlength="20" placeholder="例：小明"></label>
  <button class="rv-export">匯出標註</button><span class="hint rv-count"></span></div>`;

if (typeof RV_LESSON !== 'undefined') (() => {
  const wrap = document.querySelector('.wrap'), player = document.querySelector('.player');
  const stage = $('stage'), playBtn = $('play'), seekEl = $('seek');
  document.title = `${RV_TITLES[RV_LESSON]}・${document.title}`;

  // 上方切換列
  const nav = document.createElement('nav');
  nav.className = 'rv-nav';
  nav.innerHTML = `<a class="home" href="../">‹ 三部影片</a>` + [1, 2, 3].map(n => `<a href="../${n}/"${n === RV_LESSON ? ' aria-current="page"' : ''}>${RV_TITLES[n]}</a>`).join('');
  wrap.prepend(nav);

  // 影片下方的標註面板
  const box = document.createElement('section');
  box.className = 'rv';
  box.innerHTML = `<div class="row"><button class="mark rv-start">標註這個畫面</button><span class="hint">看到要改的地方就按，影片會暫停。</span></div>
    <div class="rv-edit" hidden>
      <p class="hint">在畫面上按住拖曳，圈出要改的位置（可以畫好幾筆），再寫下要怎麼改。</p>
      <textarea class="rv-note" placeholder="這裡要改什麼？"></textarea>
      <div class="row"><button class="rv-ok">儲存</button><button class="ghost rv-undo">復原一筆</button><button class="ghost rv-cancel">取消</button></div>
    </div>
    <h2 class="rv-h"></h2>
    <ul class="rv-list"></ul>` + RV_FOOT_HTML;
  player.after(box);
  const q = s => box.querySelector(s);
  const edit = q('.rv-edit'), note = q('.rv-note'), list = q('.rv-list'), startBtn = q('.rv-start');
  const updCount = rvFoot(box);

  // 畫筆圖層：放在舞台最上面
  const ink = el('g', { id: 'rv-ink', 'pointer-events': 'none' });
  stage.appendChild(ink);
  const pathD = pts => pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ',' + p[1]).join(' ');
  const drawStroke = (g, pts) => g.appendChild(el('g', {}, `<path d="${pathD(pts)}" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/><path d="${pathD(pts)}" fill="none" stroke="#e5322d" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`));
  const clearInk = () => { ink.innerHTML = ''; list.querySelectorAll('li.on').forEach(li => li.classList.remove('on')); };

  let drawing = false, strokes = [], curPts = null, jumped = null;
  const toStage = e => { const p = stage.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const s = p.matrixTransform(stage.getScreenCTM().inverse()); return [Math.round(s.x), Math.round(s.y)]; };
  stage.addEventListener('pointerdown', e => {
    if (!drawing) return;
    e.preventDefault(); stage.setPointerCapture(e.pointerId);
    curPts = [toStage(e)]; strokes.push(curPts);
    curPts.g = drawStroke(ink, curPts);
  });
  stage.addEventListener('pointermove', e => {
    if (!drawing || !curPts) return;
    const p = toStage(e), l = curPts[curPts.length - 1];
    if (Math.abs(p[0] - l[0]) + Math.abs(p[1] - l[1]) < 3) return;
    curPts.push(p);
    curPts.g.querySelectorAll('path').forEach(x => x.setAttribute('d', pathD(curPts)));
  });
  const endStroke = () => { curPts = null; };
  stage.addEventListener('pointerup', endStroke);
  stage.addEventListener('pointercancel', endStroke);

  function setDrawing(on) {
    drawing = on;
    stage.classList.toggle('rv-draw', on);
    edit.hidden = !on; startBtn.disabled = on;
    playBtn.disabled = on; seekEl.disabled = on;
  }
  startBtn.onclick = () => {
    if (started && !paused) playBtn.click(); // 播放中先暫停
    clearInk(); strokes = []; note.value = '';
    setDrawing(true); note.focus({ preventScroll: true });
  };
  q('.rv-undo').onclick = () => { const s = strokes.pop(); if (s) s.g.remove(); };
  q('.rv-cancel').onclick = () => { setDrawing(false); clearInk(); strokes = []; };
  q('.rv-ok').onclick = () => {
    const t = note.value.trim();
    if (!t && !strokes.length) { note.focus(); return; }
    const d = rvLoad();
    d.notes.push({
      id: Date.now().toString(36), lesson: RV_LESSON, line: idx + 1, who: $('who').textContent, sub: $('line').textContent,
      note: t, strokes: strokes.map(s => s.map(p => [p[0], p[1]])), at: new Date().toISOString(),
    });
    if (!rvSave(d)) alert('這個瀏覽器不能儲存（可能是無痕模式），標註會在關掉頁面後消失。');
    setDrawing(false); clearInk(); strokes = [];
    render(); updCount();
  };

  // 跳到某一句並停在該句畫面（動作瞬間跑完）
  function showLine(n) {
    reset(); started = true;
    instant = true; stage.classList.add('instant');
    for (let i = 0; i <= n; i++) SCRIPT[i].act && SCRIPT[i].act();
    instant = false; setTimeout(() => stage.classList.remove('instant'), 60);
    idx = n; paused = true; stage.classList.add('paused');
    const L = SCRIPT[n], sp = SPK[L.who];
    $('who').textContent = sp.name; $('who').style.background = sp.c; $('line').textContent = L.t;
    seekEl.value = n; $('pos').textContent = `${n + 1} / ${SCRIPT.length}`;
    playBtn.textContent = '從這句播放';
    stage.appendChild(ink);
    jumped = n;
  }
  // 跳句後按播放：從那一句開頭重播（含配音）
  document.querySelector('.controls').addEventListener('click', e => {
    if (e.target !== playBtn) return;
    if (jumped != null) { e.stopPropagation(); const n = jumped; jumped = null; clearInk(); seekTo(n); stage.appendChild(ink); return; }
    if (!drawing) clearInk();
  }, true);
  seekEl.addEventListener('change', () => { jumped = null; clearInk(); stage.appendChild(ink); });

  function render() {
    const mine = rvLoad().notes.filter(n => n.lesson === RV_LESSON).sort((a, b) => a.line - b.line || a.at.localeCompare(b.at));
    q('.rv-h').textContent = mine.length ? `這部的標註（${mine.length}）` : '';
    list.innerHTML = '';
    mine.forEach(n => {
      const li = document.createElement('li');
      li.innerHTML = `<div class="meta"></div><div class="txt"></div><div class="row"><button class="ghost">看畫面</button><button class="ghost">刪除</button></div>`;
      li.querySelector('.meta').textContent = `第 ${n.line} 句・${n.who ? n.who + '：' : ''}${n.sub}`;
      li.querySelector('.txt').textContent = n.note || '（只有圈選，沒有文字）';
      const [see, del] = li.querySelectorAll('button');
      see.onclick = () => {
        if (drawing) return;
        if (cur) { cur.pause(); }
        showLine(Math.min(n.line - 1, SCRIPT.length - 1));
        n.strokes.forEach(s => drawStroke(ink, s));
        li.classList.add('on');
        player.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      del.onclick = () => {
        if (!confirm('刪除這則標註？')) return;
        const d = rvLoad(); d.notes = d.notes.filter(x => x.id !== n.id); rvSave(d);
        clearInk(); render(); updCount();
      };
      list.appendChild(li);
    });
  }
  render();
})();
