// 共用測驗元件。包含兩種：
// 1) 單題選擇（嵌在課文中，載入即自動啟用）
//    <div class="exercise quiz" data-answer="b">
//      <p class="q">題目</p>
//      <div class="options"><button data-key="a">…</button>…</div>
//      <div class="explain" hidden>答對後顯示的說明</div>
//    </div>
// 2) 整份測驗引擎 Quiz.mount(root, cfg)（多題、交卷、計分、存進 localStorage）
//    題型：choice、mapId、mapPoints、mapClick、short。地圖題需要另外載入主題的 assets/japan-map.js。

(function () {
  function initInlineQuizzes() {
    document.querySelectorAll(".quiz").forEach((quiz) => {
      const answer = quiz.dataset.answer;
      const explain = quiz.querySelector(".explain");
      const feedback = document.createElement("div");
      feedback.className = "feedback";
      quiz.appendChild(feedback);

      quiz.querySelectorAll("button[data-key]").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (btn.dataset.key === answer) {
            btn.classList.add("correct");
            quiz.querySelectorAll("button[data-key]").forEach((b) => (b.disabled = true));
            feedback.className = "feedback ok";
            feedback.textContent = "答對了。" + (explain ? explain.textContent : "");
          } else {
            btn.classList.add("wrong");
            btn.disabled = true;
            feedback.className = "feedback no";
            feedback.textContent = "不對，再想一次。";
          }
        });
      });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initInlineQuizzes);
  else initInlineQuizzes();
})();

window.Quiz = (function () {
  const LETTERS = 'ABCDEFG';
  const TYPE_LABEL = { choice: '選擇', mapId: '看地圖', mapPoints: '看地圖', mapClick: '地圖點選', short: '簡答' };
  const STATUS_LABEL = { correct: '答對', partial: '部分正確', wrong: '答錯', idk: '不知道' };

  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const dots = n => '●'.repeat(n) + '○'.repeat(3 - n);

  function mount(root, cfg) {
    const { facets, questions, storageKey, resultsEl, progressEl, title } = cfg;
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(storageKey) || 'null'); } catch (e) {}
    const state = { answers: saved?.answers || {}, overrides: saved?.overrides || {}, submitted: !!saved?.submitted };

    questions.forEach(q => {
      const n = q.type === 'mapPoints' ? q.points.length : (q.options || []).length;
      if (n) q._order = saved?.orders?.[q.id] || shuffle([...Array(n).keys()]);
    });

    function save() {
      try {
        localStorage.setItem(storageKey, JSON.stringify({
          answers: state.answers, overrides: state.overrides, submitted: state.submitted,
          orders: Object.fromEntries(questions.filter(q => q._order).map(q => [q.id, q._order])),
        }));
      } catch (e) {}
    }

    // ---------- 計分 ----------
    function keywordHits(q, text) {
      const t = (text || '').toLowerCase();
      return q.keywords.filter(group => group.some(k => t.includes(k.toLowerCase())));
    }
    function grade(q) {
      const a = state.answers[q.id];
      if (!a || a.idk || (q.type === 'short' && !(a.text || '').trim())) return { score: 0, status: 'idk', unanswered: !a };
      if (q.type === 'short') {
        const auto = (() => { const h = keywordHits(q, a.text).length; return h >= q.need ? 1 : h >= 1 ? 0.5 : 0; })();
        const score = q.id in state.overrides ? state.overrides[q.id] : auto;
        return { score, auto, status: score === 1 ? 'correct' : score === 0.5 ? 'partial' : 'wrong' };
      }
      let ok;
      if (q.type === 'mapClick') ok = a.v === q.target;
      else if (q.type === 'mapPoints') ok = !!q.points[a.v].correct;
      else ok = a.v === 0;
      return { score: ok ? 1 : 0, status: ok ? 'correct' : 'wrong' };
    }
    function level(ratio) {
      if (ratio >= 0.75) return ['lvl-good', '已經會了'];
      if (ratio >= 0.4) return ['lvl-mid', '半懂'];
      return ['lvl-bad', '還不會'];
    }
    function summary() {
      return facets.map(f => {
        const qs = questions.filter(q => q.facet === f.id);
        const g = qs.map(grade);
        const pts = g.reduce((s, x) => s + x.score, 0);
        const count = st => g.filter(x => x.status === st).length;
        return { facet: f, n: qs.length, pts, ratio: pts / qs.length, correct: count('correct'), partial: count('partial'), wrong: count('wrong'), idk: count('idk') };
      });
    }

    // ---------- 繪製題目 ----------
    const cards = {};
    let num = 0;
    facets.forEach(f => {
      const sec = document.createElement('section');
      sec.innerHTML = `<h2>${esc(f.name)}</h2>${f.desc ? `<p class="small">${esc(f.desc)}</p>` : ''}`;
      root.appendChild(sec);
      questions.filter(q => q.facet === f.id).forEach(q => {
        num++;
        const el = document.createElement('div');
        el.className = 'q'; el.id = 'q-' + q.id;
        el.innerHTML = `<div><span class="num">${num}.</span><span class="tag">${TYPE_LABEL[q.type]}</span><span class="tag" title="難度">${dots(q.level)}</span></div>
          <div class="prompt">${q.prompt}</div>
          ${q.type.startsWith('map') ? '<div class="mapbox"></div>' : ''}
          <div class="opts"></div><div class="feedback" hidden></div>`;
        sec.appendChild(el);
        cards[q.id] = el;
        buildInputs(q, el);
      });
    });

    function setAnswer(q, a) { state.answers[q.id] = a; save(); refreshPressed(q); updateProgress(); }

    function buildInputs(q, el) {
      const opts = el.querySelector('.opts');
      const mapEl = el.querySelector('.mapbox');
      const a = state.answers[q.id];

      if (q.type === 'choice' || q.type === 'mapId' || q.type === 'mapPoints') {
        q._order.forEach((orig, k) => {
          const b = document.createElement('button');
          b.className = 'opt'; b.dataset.v = orig;
          b.textContent = q.type === 'mapPoints' ? `${LETTERS[k]} 點` : `${LETTERS[k]}. ${q.options[orig]}`;
          b.onclick = () => !state.submitted && setAnswer(q, { v: orig });
          opts.appendChild(b);
        });
      }
      if (q.type === 'mapClick') {
        const s = document.createElement('div');
        s.className = 'small click-status';
        opts.appendChild(s);
      }
      if (q.type === 'short') {
        const ta = document.createElement('textarea');
        ta.placeholder = '用自己的話寫，寫重點即可。';
        ta.value = a?.text || '';
        ta.oninput = () => { state.answers[q.id] = { text: ta.value }; save(); refreshPressed(q); updateProgress(); };
        opts.appendChild(ta);
      }
      const idk = document.createElement('button');
      idk.className = 'opt idk'; idk.dataset.idk = '1';
      idk.textContent = '我不知道';
      idk.onclick = () => {
        if (state.submitted) return;
        if (q.type === 'short' && state.answers[q.id]?.idk) setAnswer(q, { text: opts.querySelector('textarea').value });
        else setAnswer(q, { idk: true });
      };
      opts.appendChild(idk);

      if (mapEl) drawMap(q, mapEl);
      refreshPressed(q);
    }

    function drawMap(q, mapEl) {
      const a = state.answers[q.id];
      const o = { view: q.view };
      if (q.type === 'mapId') o.highlight = q.highlight;
      if (q.type === 'mapPoints') o.points = q._order.map((orig, k) => ({ ...q.points[orig], label: LETTERS[k] }));
      if (q.type === 'mapClick') {
        o.selected = a?.v;
        if (state.submitted) o.answer = [q.target];
        else o.onClick = id => setAnswer(q, { v: id });
      }
      JapanMap.render(mapEl, o);
    }

    function refreshPressed(q) {
      const el = cards[q.id], a = state.answers[q.id] || {};
      el.querySelectorAll('.opt').forEach(b => {
        const on = b.dataset.idk ? !!a.idk : (b.dataset.v !== undefined && +b.dataset.v === a.v);
        b.setAttribute('aria-pressed', on);
      });
      const ta = el.querySelector('textarea');
      if (ta) ta.disabled = !!a.idk || state.submitted;
      const cs = el.querySelector('.click-status');
      if (cs) cs.textContent = a.idk ? '' : a.v ? '已選了一個縣（名稱交卷後才顯示）。可以重新點選。' : '直接點地圖上的縣。';
      if (q.type === 'mapClick' && a.idk) el.querySelectorAll('.pref.sel').forEach(p => p.classList.remove('sel'));
    }

    function answered(q) {
      const a = state.answers[q.id];
      return !!a && (a.idk || a.v !== undefined || (a.text || '').trim().length > 0);
    }
    function updateProgress() {
      if (!progressEl) return;
      const done = questions.filter(answered).length;
      progressEl.textContent = state.submitted ? '已交卷' : `已作答 ${done} / ${questions.length}`;
    }

    // ---------- 交卷 ----------
    async function showFeedback(q) {
      const el = cards[q.id], g = grade(q), a = state.answers[q.id] || {};
      el.classList.remove('correct', 'partial', 'wrong', 'idk');
      el.classList.add(g.status);
      el.querySelectorAll('.opt').forEach(b => {
        if (b.dataset.v === undefined) return;
        const v = +b.dataset.v;
        const right = q.type === 'mapPoints' ? !!q.points[v].correct : v === 0;
        b.classList.toggle('is-answer', right);
        b.classList.toggle('is-wrong', !right && v === a.v);
      });
      const fb = el.querySelector('.feedback');
      let html = `<b>${STATUS_LABEL[g.status]}${g.unanswered ? '（未作答）' : ''}</b>　`;
      if (q.type === 'mapClick') {
        html += `正解：${esc(await JapanMap.nameOf(q.target))}（綠色）。` + (a.v ? `你點的是：${esc(await JapanMap.nameOf(a.v))}。` : '');
      }
      if (q.type === 'mapPoints') {
        const k = q._order.findIndex(orig => q.points[orig].correct);
        html += `正解：${LETTERS[k]} 點。各點分別是：` + q._order.map((orig, i) => `${LETTERS[i]} ${esc(q.points[orig].name)}`).join('、') + '。';
      }
      if (q.type === 'short') {
        html += `<div style="margin-top:6px"><b>參考答案</b>：${esc(q.answer)}</div>`;
        if (!a.idk && (a.text || '').trim()) {
          const hits = keywordHits(q, a.text).map(gp => gp[0]);
          html += `<div class="small">自動判定抓到的重點：${hits.length ? hits.map(esc).join('、') : '無'}（自動判定只看關鍵字，可能不準，請自己校正）</div>
            <div class="override">我覺得我：<button data-s="1">答對</button><button data-s="0.5">部分對</button><button data-s="0">答錯</button></div>`;
        }
      }
      if (q.explain) html += `<div style="margin-top:6px">${q.explain}</div>`;
      fb.innerHTML = html;
      fb.hidden = false;
      fb.querySelectorAll('.override button').forEach(b => {
        b.setAttribute('aria-pressed', state.overrides[q.id] === +b.dataset.s);
        b.onclick = () => { state.overrides[q.id] = +b.dataset.s; save(); showFeedback(q); renderResults(); };
      });
    }

    function renderResults() {
      if (!resultsEl) return;
      const s = summary();
      const tot = s.reduce((x, r) => x + r.pts, 0);
      resultsEl.hidden = false;
      resultsEl.innerHTML = `<h2 style="margin-top:0">診斷結果</h2>
        <p>總分 <b>${tot % 1 ? tot.toFixed(1) : tot}</b> / ${questions.length}　<span class="small">（簡答部分對算 0.5 分；「我不知道」與未答算 0 分）</span></p>
        <div class="bars">${s.map(r => {
          const [cls, lab] = level(r.ratio);
          return `<div>${esc(r.facet.name)}</div>
            <div class="bar" title="${Math.round(r.ratio * 100)}%"><span class="${cls}" style="width:${Math.max(r.ratio * 100, 2)}%"></span></div>
            <div><span class="${cls}"><b>${lab}</b></span> <span class="small">${r.pts % 1 ? r.pts.toFixed(1) : r.pts}/${r.n}・不知道 ${r.idk}</span></div>`;
        }).join('')}</div>
        <p class="small">判定規則：得分率 ≥ 75% 已經會了；40–74% 半懂；&lt; 40% 還不會。這是初步判定，老師會再看你的簡答原文調整。</p>
        <p><button class="btn" id="copy-res">複製結果，貼給老師</button> <button class="btn ghost" id="reset-res">清空重做</button> <span class="small" id="copy-msg"></span></p>`;
      resultsEl.querySelector('#copy-res').onclick = copyReport;
      resultsEl.querySelector('#reset-res').onclick = () => {
        if (!confirm('清空所有作答並重新開始？')) return;
        try { localStorage.removeItem(storageKey); } catch (e) {}
        location.reload();
      };
    }

    async function copyReport() {
      const s = summary();
      const lines = [`【${title}】${new Date().toLocaleDateString('zh-TW')}`, ''];
      lines.push('面向｜得分｜對/部分/錯/不知道｜初步判定');
      s.forEach(r => lines.push(`${r.facet.name}｜${r.pts}/${r.n}｜${r.correct}/${r.partial}/${r.wrong}/${r.idk}｜${level(r.ratio)[1]}`));
      lines.push('', '逐題：');
      let i = 0;
      for (const q of questions) {
        i++;
        const g = grade(q), a = state.answers[q.id] || {};
        let mine = '';
        if (a.idk || g.unanswered) mine = '不知道';
        else if (q.type === 'short') mine = `「${(a.text || '').trim().replace(/\s+/g, ' ')}」`;
        else if (q.type === 'mapClick') mine = await JapanMap.nameOf(a.v);
        else if (q.type === 'mapPoints') mine = q.points[a.v].name;
        else mine = q.options[a.v];
        const prompt = q.prompt.replace(/<[^>]+>/g, '');
        lines.push(`${i}. [${q.id}｜難度${q.level}｜${STATUS_LABEL[g.status]}${q.type === 'short' && q.id in state.overrides ? '（自評）' : ''}] ${prompt} → ${mine}`);
      }
      const text = lines.join('\n');
      const msg = resultsEl.querySelector('#copy-msg');
      try { await navigator.clipboard.writeText(text); msg.textContent = '已複製，直接貼到對話框即可。'; }
      catch (e) {
        const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
        msg.textContent = document.execCommand('copy') ? '已複製，直接貼到對話框即可。' : '複製失敗，請手動選取下方文字。';
        ta.remove();
      }
    }

    function submit() {
      const left = questions.filter(q => !answered(q)).length;
      if (left && !confirm(`還有 ${left} 題未作答，未作答會當作「我不知道」。確定交卷？`)) return;
      state.submitted = true; save();
      finish();
      resultsEl?.scrollIntoView({ behavior: 'smooth' });
    }
    function finish() {
      questions.forEach(q => {
        refreshPressed(q);
        showFeedback(q);
        if (q.type === 'mapClick') drawMap(q, cards[q.id].querySelector('.mapbox'));
      });
      renderResults();
      updateProgress();
      cfg.submitBtn && (cfg.submitBtn.hidden = true);
    }

    if (cfg.submitBtn) cfg.submitBtn.onclick = submit;
    updateProgress();
    if (state.submitted) finish();
    return { summary };
  }

  return { mount };
})();
