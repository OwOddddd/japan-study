// 日本都道府縣地圖元件。需要先載入 d3 v7 與 topojson-client。
// 資料：dataofjapan/land（properties: id 1-47, nam_ja）
window.JapanMap = (function () {
  const DATA_URL = 'https://cdn.jsdelivr.net/gh/dataofjapan/land@master/japan.topojson';
  const VIEWS = {
    all:  [[128.5, 30.5], [146.0, 45.8]],
    west: [[129.8, 32.4], [137.6, 36.6]],
  };
  let cache;

  function load() {
    if (!cache) {
      cache = fetch(DATA_URL)
        .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(t => topojson.feature(t, t.objects.japan).features);
    }
    return cache;
  }

  // 都道府縣 id → 繁體名稱（県→縣）
  async function nameOf(id) {
    const f = (await load()).find(f => f.properties.id === id);
    return f ? f.properties.nam_ja.replace('県', '縣') : '?';
  }

  // opts: view ('all' | 'west' | [[lon,lat],[lon,lat]]), highlight [id], answer [id],
  //       points, lines, labels（格式見下方）, selected id, onClick(id)
  async function render(el, opts = {}) {
    let features;
    try { features = await load(); }
    catch (e) { el.innerHTML = '<div class="maperr">地圖載入失敗（需要網路連線）：' + e.message + '</div>'; return null; }

    const W = 600, H = 560;
    const view = typeof opts.view === 'string' ? VIEWS[opts.view] : (opts.view || VIEWS.all);
    const proj = d3.geoMercator().fitExtent([[8, 8], [W - 8, H - 8]], { type: 'MultiPoint', coordinates: view });
    const path = d3.geoPath(proj);
    const hl = new Set(opts.highlight || []);
    const ans = new Set(opts.answer || []);

    el.innerHTML = '';
    const svg = d3.select(el).append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('class', 'jmap');
    const prefs = svg.append('g').selectAll('path').data(features).join('path')
      .attr('d', path)
      .attr('class', 'pref')
      .classed('hl', d => hl.has(d.properties.id))
      .classed('ans', d => ans.has(d.properties.id))
      .classed('sel', d => d.properties.id === opts.selected && !ans.has(d.properties.id));

    // choropleth: id => 級距 0–4（塗 .c0–.c4）；tooltip: id => HTML
    if (opts.choropleth) prefs.attr('class', d => 'pref c' + opts.choropleth(d.properties.id));
    if (opts.tooltip) {
      const tip = d3.select(el).append('div').attr('class', 'cc-tip').property('hidden', true);
      prefs.on('mousemove', (e, d) => {
        const box = el.getBoundingClientRect();
        tip.property('hidden', false).html(opts.tooltip(d.properties.id))
          .style('left', Math.min(e.clientX - box.left + 12, box.width - 150) + 'px')
          .style('top', (e.clientY - box.top - 48) + 'px');
      }).on('mouseleave', () => tip.property('hidden', true));
    }

    if (opts.onClick) {
      svg.classed('clickable', true);
      prefs.on('click', (e, d) => {
        prefs.classed('sel', p => p === d);
        opts.onClick(d.properties.id);
      });
    }

    // lines: [{coords: [[lon,lat],...], cls, label, labelAt: index, arrow: true}]
    svg.append('defs').html('<marker id="jm-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0L10,5L0,10z" fill="context-stroke"/></marker>');
    const lines = svg.append('g').selectAll('g').data(opts.lines || []).join('g').attr('class', d => 'ln ' + (d.cls || ''));
    lines.append('path').attr('d', d => d3.line()(d.coords.map(c => proj(c))))
      .attr('marker-end', d => d.arrow ? 'url(#jm-arrow)' : null);
    lines.filter(d => d.label).append('text')
      .attr('transform', d => `translate(${proj(d.coords[d.labelAt || 0])})`).attr('x', 6).attr('y', 4).text(d => d.label);

    // labels: [{text, lon, lat}]（板塊、海域等大字標籤）
    svg.append('g').selectAll('text').data(opts.labels || []).join('text').attr('class', 'plate')
      .attr('text-anchor', 'middle').attr('transform', d => `translate(${proj([d.lon, d.lat])})`).text(d => d.text);

    // points: [{label, lon, lat, shape: 'tri' | undefined}]
    const pts = svg.append('g').selectAll('g').data(opts.points || []).join('g').attr('class', d => 'pt ' + (d.shape || ''))
      .attr('transform', d => `translate(${proj([d.lon, d.lat])})`);
    pts.filter(d => d.shape !== 'tri').append('circle').attr('r', 6);
    pts.filter(d => d.shape === 'tri').append('path').attr('d', 'M0,-7L6,4L-6,4Z');
    pts.append('text').attr('x', 9).attr('y', -7).text(d => d.label || '');

    return svg;
  }

  return { load, render, nameOf };
})();
