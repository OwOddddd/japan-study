// 月降水量小圖（small multiples）。同一組圖共用 y 軸上限，方便比較。
// ClimateChart.render(el, { series: [{ name, sub, values: [12 個月], total }], unit: 'mm', max })
window.ClimateChart = (function () {
  const MONTHS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  function render(el, opts) {
    const max = opts.max || Math.max(...opts.series.flatMap(s => s.values));
    const W = 240, H = 170, L = 34, B = 22, T = 8, R = 4;
    const bw = (W - L - R) / 12;
    const y = v => T + (H - T - B) * (1 - v / max);
    const ticks = [0, 100, 200, 300, 400].filter(t => t <= max);

    el.classList.add('cc-grid');
    el.innerHTML = '';
    const tip = document.createElement('div');
    tip.className = 'cc-tip'; tip.hidden = true;
    el.appendChild(tip);

    opts.series.forEach(s => {
      // 平年值的年合計是另外統計的，和 12 個月相加可能差一點，有給 total 就用它
      const total = s.total ?? s.values.reduce((a, b) => a + b, 0);
      const fig = document.createElement('div');
      fig.className = 'cc-cell';
      fig.innerHTML = `<div class="cc-title">${s.name}<span>年 ${Math.round(total).toLocaleString()} ${opts.unit}</span></div>${s.sub ? `<div class="cc-sub">${s.sub}</div>` : ''}`;
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', `${s.name} 各月降水量`);
      let g = '';
      ticks.forEach(t => {
        g += `<line class="cc-grid-line" x1="${L}" x2="${W - R}" y1="${y(t)}" y2="${y(t)}"/>`;
        g += `<text class="cc-axis" x="${L - 5}" y="${y(t) + 4}" text-anchor="end">${t}</text>`;
      });
      s.values.forEach((v, i) => {
        const x = L + i * bw + 1, w = bw - 2, top = y(v), h = y(0) - top;
        const r = Math.min(3, h);
        // 頂端圓角、底部貼齊基線
        g += `<path class="cc-bar" d="M${x},${y(0)}V${top + r}Q${x},${top} ${x + r},${top}H${x + w - r}Q${x + w},${top} ${x + w},${top + r}V${y(0)}Z"/>`;
        g += `<rect class="cc-hit" x="${L + i * bw}" y="${T}" width="${bw}" height="${H - T - B}" data-i="${i}"/>`;
        if (i % 3 === 0 || i === 11) g += `<text class="cc-axis" x="${x + w / 2}" y="${H - 6}" text-anchor="middle">${MONTHS[i]}</text>`;
      });
      g += `<line class="cc-base" x1="${L}" x2="${W - R}" y1="${y(0)}" y2="${y(0)}"/>`;
      svg.innerHTML = g;
      svg.querySelectorAll('.cc-hit').forEach(hit => {
        const i = +hit.dataset.i;
        const show = e => {
          tip.hidden = false;
          tip.innerHTML = `<b>${s.name}・${i + 1} 月</b><br>${s.values[i]} ${opts.unit}`;
          const box = el.getBoundingClientRect();
          const p = e.touches ? e.touches[0] : e;
          tip.style.left = Math.min(p.clientX - box.left + 12, box.width - 120) + 'px';
          tip.style.top = (p.clientY - box.top - 44) + 'px';
          hit.previousElementSibling.classList.add('on');
        };
        hit.addEventListener('mousemove', show);
        hit.addEventListener('touchstart', show, { passive: true });
        hit.addEventListener('mouseleave', () => { tip.hidden = true; hit.previousElementSibling.classList.remove('on'); });
      });
      fig.appendChild(svg);
      el.appendChild(fig);
    });

    // 表格檢視
    const det = document.createElement('details');
    det.className = 'cc-table';
    det.innerHTML = `<summary>看數字表</summary><table class="cmp"><tr><th>月</th>${opts.series.map(s => `<th>${s.name}</th>`).join('')}</tr>` +
      MONTHS.map((m, i) => `<tr><td>${m}</td>${opts.series.map(s => `<td>${s.values[i]}</td>`).join('')}</tr>`).join('') + '</table>';
    el.appendChild(det);
  }

  return { render };
})();
