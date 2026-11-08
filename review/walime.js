// 和萊姆共用繪圖庫：素體、表情、配件與角色資料。由 walime-five.html 抽出。

const S = 'fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"';
const SW = w => `fill="none" stroke="var(--ink)" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
let uid = 0;

// ===== 素體外型 =====
const SHAPES = {
  egg:   { d: 'M100,44 C142,44 166,84 166,122 C166,158 138,178 100,178 C62,178 34,158 34,122 C34,84 58,44 100,44 Z', face: 104, arms: [[36, 132, 30], [164, 132, -30]], feet: [[78, 184], [122, 184]] },
  drop:  { d: 'M100,30 C118,48 150,78 154,118 C158,156 134,178 100,178 C66,178 42,156 46,118 C50,78 82,48 100,30 Z', face: 110, arms: [[47, 134, 25], [153, 134, -25]], feet: [[82, 184], [118, 184]] },
  round: { d: 'M100,66 C148,66 172,100 172,132 C172,162 142,180 100,180 C58,180 28,162 28,132 C28,100 52,66 100,66 Z', face: 122, arms: [[30, 140, 35], [170, 140, -35]], feet: [[74, 186], [126, 186]] },
  cloud: { d: 'M100,46 C140,46 164,82 164,118 C164,140 160,152 156,160 C150,172 138,166 132,172 C124,182 112,172 100,178 C88,172 76,182 68,172 C62,166 50,172 44,160 C40,152 36,140 36,118 C36,82 60,46 100,46 Z', face: 106, arms: [[38, 126, 30], [162, 126, -30]], feet: null },
};

// 每種外型的高光錨點（左上方、離外框有距離的位置）
const GLOSS = { egg: [66, 80], drop: [76, 96], round: [62, 100], cloud: [66, 82] };

// ===== 顏文字臉（以 100,104 為中心）=====
const eyes = (r = 4.6) => `<g class="blink"><circle cx="85" cy="102" r="${r}" fill="var(--ink)"/><circle cx="115" cy="102" r="${r}" fill="var(--ink)"/></g>`;
const OMEGA = `<path d="M93,112 q3.5,5 7,0 q3.5,5 7,0" ${S}/>`;
const FACE = {
  base: eyes() + OMEGA,
  smile: `<path d="M78,104 q7,-8 14,0 M108,104 q7,-8 14,0" ${S}/>`,
  smileW: `<path d="M78,104 q7,-8 14,0 M108,104 q7,-8 14,0" ${S}/>${OMEGA}`,
  honne: `<path d="M77,98 h16 l-8,8 Z M107,98 h16 l-8,8 Z" fill="var(--ink)" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/><path d="M75,94 h20 M105,94 h20 M95,116 h10" ${S}/>`,
  open: `<path d="M78,104 q7,-8 14,0 M108,104 q7,-8 14,0" ${S}/><path d="M91,111 L109,111 L100,122 Z" fill="var(--ink)" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>`,
  shock: `<circle cx="85" cy="101" r="5.5" ${SW(3)}/><circle cx="115" cy="101" r="5.5" ${SW(3)}/><path d="M92,110 h16 l2,10 h-20 Z" fill="var(--ink)" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>`,
  pixel: `<g class="blink"><rect x="79" y="95" width="11" height="13" rx="2" fill="var(--ink)"/><rect x="110" y="95" width="11" height="13" rx="2" fill="var(--ink)"/></g><path d="M95,115 h10" ${S}/>`,
  error: `<path d="M79,96 l11,11 M90,96 l-11,11 M110,96 l11,11 M121,96 l-11,11" ${S}/><path d="M92,116 q4,-4 8,0 q4,4 8,0" ${S}/>`,
  calm: `<path d="M78,100 q7,7 14,0 M108,100 q7,7 14,0" ${S}/>${OMEGA}`,
  sweat: eyes(4.2) + `<path d="M94,114 q6,-4 12,0" ${S}/>`,
  serious: `<path d="M75,90 l14,6 M125,90 l-14,6" ${S}/>${eyes(4.3)}${OMEGA}`,
  tired: `<path d="M78,101 h14 M108,101 h14" ${S}/><path d="M93,113 q3.5,4 7,0 q3.5,4 7,0" ${S}/>`,
};

// ===== 表情庫擴充（2026-11-08 使用者從顏文字卡 50 個裡評選）=====
// 規則：和萊姆本來就有手，顏文字裡的手（ヽノ、人、٩۶）不另外畫；符號（Σ、Zz）用黑色粗線畫，不用細字。
// FACE_TIER.like＝喜歡能多用，FACE_TIER.some＝偶爾用。沒採用的 27 個不收錄（見 reference/lessons.md）。
(() => {
  const L = (d, w = 3.5) => `<path d="${d}" ${SW(w)}/>`;
  const F = d => `<path d="${d}" fill="var(--ink)" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>`;
  const dot = (x, y, r = 4.4) => `<circle cx="${x}" cy="${y}" r="${r}" fill="var(--ink)"/>`;
  const ring = (x, y, r = 4.2) => `<circle cx="${x}" cy="${y}" r="${r}" ${SW(3)}/>`;
  const DOTS = (y = 102, r = 4.4) => `<g class="blink">${dot(85, y, r)}${dot(115, y, r)}</g>`;
  const RINGS = (y = 101, r = 4.2) => ring(85, y, r) + ring(115, y, r);
  const SLANT = L('M81,105 L91,98 M109,98 L119,105');
  const TRI = (y = 110, h = 10) => F(`M92,${y} L108,${y} L100,${y + h} Z`) + `<ellipse cx="100" cy="${y + h * .58}" rx="3.2" ry="2" fill="#f28aa0"/>`;
  const DE = (y = 110) => F(`M95,${y} h10 l1.5,7 h-13 Z`);
  const FLATM = L('M95,114 h10');
  const PINK = '#f19aae';
  const cheeks = `<ellipse cx="70" cy="112" rx="8" ry="4.5" fill="${PINK}" opacity=".75"/><ellipse cx="130" cy="112" rx="8" ry="4.5" fill="${PINK}" opacity=".75"/>`;
  const drop = (x, y) => `<path d="M${x},${y - 8} C${x - 5},${y - 1} ${x - 5},${y + 4} ${x},${y + 4} C${x + 5},${y + 4} ${x + 5},${y - 1} ${x},${y - 8} Z" fill="#9fd3ef" stroke="var(--ink)" stroke-width="1.8"/>`;
  Object.assign(FACE, {
    // 喜歡能多用
    excited: L('M80,98 l11,6 l-11,6 M120,98 l-11,6 l11,6') + TRI(110, 11),                      // (≧▽≦)
    shobon: L('M78,97 L91,92 M122,97 L109,92') + DOTS(104, 4) + OMEGA,                            // (´・ω・`)
    flip: L('M80,96 L91,102 M109,102 L120,96') + F('M93,111 L107,111 L109,120 L91,120 Z'),        // ヽ(`Д´)ノ
    pout: DOTS() + L('M101,108 q-6,2 0,5 q-6,2 0,5'),                                             // (・ε・)
    gloom: `<path d="M74,80 v12 M81,78 v15 M88,80 v12" stroke="#6b8fb8" stroke-width="3" stroke-linecap="round"/>` + RINGS(103) + DE(112), // (|||ﾟдﾟ)
    coldsweat: RINGS() + DE() + drop(130, 92),                                                    // (;ﾟдﾟ)
    blush: DOTS() + OMEGA + `<path d="M70,110 l-3,6 M77,110 l-3,6 M126,110 l-3,6 M133,110 l-3,6" stroke="${PINK}" stroke-width="3" stroke-linecap="round"/>`, // (,,・ω・,,)
    grumpy: L('M80,97 L91,103 M120,97 L109,103', 4) + L('M93,116 l7,-6 l7,6'),                    // (`へ´)
    sleep: L('M80,102 h10 M110,102 h10') + OMEGA + L('M166,64 h12 l-12,13 h12 M182,46 h8 l-8,9 h8', 3.4), // Zz(´-ω-`*)（放在身體外框外，避免和外框疊在一起）
    // 偶爾用
    chill: SLANT + TRI(),                                                                         // (´∀`)
    kiss: SLANT + L('M99,108 q6,2 0,5 q6,2 0,5'),                                                 // (*´з`)
    hinata: L('M85,98 v7 M115,98 v7', 4.4) + L('M94,111 q6,6 12,0') + cheeks,                     // (๑╹◡╹๑)
    wink: L('M79,98 l11,4 l-11,4') + dot(115, 102) + TRI(),                                       // (ゝ∀･)
    smug: L('M79,101 h12 M109,101 h12') + TRI(),                                                  // (๑¯∀¯๑)
    mukashi: L('M80,104 L90,100 M110,100 L120,104') + L('M92,115 h9 M104,110 q5,2 0,6'),          // (´_ゝ`)
    sigh: L('M80,102 h10 M110,102 h10 M75,99 l3,-4 M125,99 l-3,-4') + OMEGA,                      // (´-ω-`)
    grievance: dot(85, 104, 3.8) + dot(115, 104, 3.8) + L('M79,96 q6,4 12,0 M109,96 q6,4 12,0', 2.8) + FLATM, // (｡ŏ_ŏ)
    confused: L('M78,96 L90,92 M122,96 L110,92') + dot(85, 103, 3.4) + dot(115, 103, 3.4) + FLATM, // (´･_･`)
    sigma: RINGS() + DE() + L('M30,44 H14 L24,56 L14,68 H30', 3.4),                               // Σ(ﾟдﾟ)（放在身體外框外）
    flushed: ring(85, 98, 3.2) + ring(115, 98, 3.2) + OMEGA + `<path d="M64,108 v7 M69,107 v8 M74,108 v7 M126,108 v7 M131,107 v8 M136,108 v7" stroke="#e0607a" stroke-width="2.6" stroke-linecap="round"/>`, // (灬ºωº灬)
    glad: DOTS() + TRI(),                                                                         // ( ・∀・)
    please: L('M76,97 l9,-4 M124,97 l-9,-4') + RINGS(103, 3.6) + OMEGA + drop(132, 90),           // (；´ﾟωﾟ｀人)
    coax: L('M80,98 l10,5 l-10,5 M120,98 l-10,5 l10,5') + L('M99,109 q5,2 0,4.5 q5,2 0,4.5', 2.8) + cheeks, // ε٩(๑> ₃ <)۶з
  });
})();
const FACE_TIER = {
  like: ['excited', 'shobon', 'flip', 'pout', 'gloom', 'coldsweat', 'blush', 'grumpy', 'sleep'],
  some: ['chill', 'kiss', 'hinata', 'wink', 'smug', 'mukashi', 'sigh', 'grievance', 'confused', 'sigma', 'flushed', 'glad', 'please', 'coax'],
};
const FACE_KAO = { excited: '(≧▽≦)', shobon: '(´・ω・`)', flip: 'ヽ(`Д´)ノ', pout: '(・ε・)', gloom: '(|||ﾟдﾟ)', coldsweat: '(;ﾟдﾟ)', blush: '(,,・ω・,,)', grumpy: '(`へ´)', sleep: 'Zz(´-ω-`*)',
  chill: '(´∀`)', kiss: '(*´з`)', hinata: '(๑╹◡╹๑)', wink: '(ゝ∀･)', smug: '(๑¯∀¯๑)', mukashi: '(´_ゝ`)', sigh: '(´-ω-`)', grievance: '(｡ŏ_ŏ)', confused: '(´･_･`)', sigma: 'Σ(ﾟдﾟ)', flushed: '(灬ºωº灬)', glad: '( ・∀・)', please: '(；´ﾟωﾟ｀人)', coax: 'ε٩(๑> ₃ <)۶з' };

// ===== 小工具 =====
const pt = (cx, cy, r, deg) => [cx + r * Math.cos(deg * Math.PI / 180), cy + r * Math.sin(deg * Math.PI / 180)];
function fan(cx, cy, r, a0, a1, color = '#8db06a') {
  const [x0, y0] = pt(cx, cy, r, a0), [x1, y1] = pt(cx, cy, r, a1);
  const ribs = Array.from({ length: 6 }, (_, i) => { const [x, y] = pt(cx, cy, r * .92, a0 + (a1 - a0) * (i + .5) / 6); return `M${cx},${cy} L${x.toFixed(1)},${y.toFixed(1)}`; }).join(' ');
  const [g0x, g0y] = pt(cx, cy, r * .82, a0), [g1x, g1y] = pt(cx, cy, r * .82, a1);
  return `<path d="M${cx},${cy} L${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 0,1 ${x1.toFixed(1)},${y1.toFixed(1)} Z" fill="${color}" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
    <path d="M${g0x.toFixed(1)},${g0y.toFixed(1)} A${r * .82},${r * .82} 0 0,1 ${g1x.toFixed(1)},${g1y.toFixed(1)}" fill="none" stroke="#e1bf55" stroke-width="3"/>
    <path d="${ribs}" stroke="#5f7d45" stroke-width="1.5" fill="none"/><circle cx="${cx}" cy="${cy}" r="3" fill="#e1bf55" stroke="var(--ink)" stroke-width="2"/>`;
}
const STAR = (cx, cy, r) => { const p = Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; return `${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`; }).join(' '); return `<polygon points="${p}" fill="#d8463c" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>`; };

// ===== 素體繪製 =====
function slime(o) {
  const sh = SHAPES[o.shape], id = 'g' + (uid++), dy = sh.face - 104;
  const stops = o.grad.map(([off, c]) => `<stop offset="${off}" stop-color="${c}"/>`).join('');
  const arms = sh.arms.map(([x, y, rot], i) => {
    if (o.armUp && i === 1) return `<ellipse cx="${x + 6}" cy="${y - 26}" rx="9" ry="15" transform="rotate(${rot - 30} ${x + 6} ${y - 26})" fill="${o.limb}" stroke="var(--ink)" stroke-width="3.5"/>`;
    return `<ellipse cx="${x}" cy="${y}" rx="9" ry="14" transform="rotate(${rot} ${x} ${y})" fill="${o.limb}" stroke="var(--ink)" stroke-width="3.5"/>`;
  }).join('');
  const feet = sh.feet ? sh.feet.filter((_, i) => !(o.kick && i === 1)).map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="15" ry="9" fill="${o.foot || o.limb}" stroke="var(--ink)" stroke-width="3.5"/>`).join('') : '';
  const shadow = sh.feet ? '<ellipse cx="100" cy="194" rx="62" ry="7" fill="#000" opacity=".08"/>' : '<ellipse cx="100" cy="200" rx="44" ry="5" fill="#000" opacity=".07"/>';
  // 高光依外型的錨點擺放，並裁切在身體內，外框最後才畫
  const [gx, gy] = GLOSS[o.shape];
  const glossArt = o.gloss === 'sharp'
    ? '<path d="M60,84 C66,70 78,62 90,58" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/><circle cx="58" cy="98" r="3.5" fill="#fff"/>'
    : o.gloss === 'none' ? '' : '<ellipse cx="66" cy="80" rx="12" ry="6.5" transform="rotate(-35 66 80)" fill="#fff" opacity=".9"/><circle cx="58" cy="95" r="3.2" fill="#fff" opacity=".9"/>';
  const gloss = `<g transform="translate(${gx - 66} ${gy - 80})">${glossArt}</g>`;
  const face = `<g transform="translate(0 ${dy})">${FACE[o.face || 'base']}</g>`;
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops}</linearGradient><clipPath id="c${id}"><path d="${sh.d}"/></clipPath></defs>
    <g class="${sh.feet ? 'bob' : 'float'}">${o.back || ''}<g class="${o.cls || ''}">
      ${shadow}${feet}${arms}
      <path d="${sh.d}" fill="url(#${id})"/>
      <g clip-path="url(#c${id})">${o.deco || ''}${gloss}</g>
      <path d="${sh.d}" fill="none" stroke="var(--ink)" stroke-width="4.5"/>
      ${o.kick ? `<g transform="rotate(-22 130 166)"><ellipse cx="130" cy="166" rx="14" ry="11" fill="${o.sole || '#e6cd96'}" stroke="var(--ink)" stroke-width="3.5"/><path d="M121,163 h18 M121,169 h18" stroke="#b48a3c" stroke-width="2" stroke-linecap="round"/></g>` : ''}
      ${face}${o.front || ''}${o.head || ''}${o.extra || ''}
    </g></g>`;
}

// 貼合身體的帶子（頭巾、鉢卷）：用身體外框裁切，上下緣畫線，邊界自然和身體貼齊
function bodyArea(shape, area, edge, fill, more = '') {
  const id = 'bb' + (uid++);
  return `<defs><clipPath id="${id}"><path d="${SHAPES[shape].d}"/></clipPath><clipPath id="${id}o"><path d="${area}" transform="translate(0 -2)"/><path d="${area}" transform="translate(0 2)"/></clipPath></defs>
    <g clip-path="url(#${id})"><path d="${area}" fill="${fill}"/>${more}<path d="${edge}" fill="none" stroke="var(--ink)" stroke-width="2.6"/></g>
    <g clip-path="url(#${id}o)"><path d="${SHAPES[shape].d}" fill="none" stroke="var(--ink)" stroke-width="4.5"/></g>`;
}
function bodyBand(shape, a, b, h, fill, more = '') {
  const top = `M0,${a} Q100,${b} 200,${a}`, bot = `M0,${a + h} Q100,${b + h} 200,${a + h}`;
  return bodyArea(shape, `${top} V${a + h} Q100,${b + h} 0,${a + h} Z`, `${top} ${bot}`, fill, more);
}

// ===== 角色 =====
const CHARS = [];

// --- 京都府 ---
const phoenixPin = `<g class="swing" style="transform-origin:124px 62px">
  <path d="M120,66 L138,30" stroke="#c9a23e" stroke-width="4" stroke-linecap="round"/>
  <path d="M136,32 C140,20 154,16 162,22 C156,22 152,26 152,30 C160,28 168,32 170,40 C160,34 150,38 136,32 Z" fill="#e1bf55" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M140,34 l-4,14 M146,35 l-1,12" stroke="#c9a23e" stroke-width="1.6"/><circle cx="136" cy="49" r="2.5" fill="#e1bf55"/><circle cx="145" cy="48" r="2.5" fill="#e1bf55"/></g>`;
const goldLeaf = '<g fill="#e1bf55" opacity=".85"><rect x="72" y="140" width="5" height="5" transform="rotate(20 74 142)"/><rect x="126" y="150" width="4" height="4" transform="rotate(-15 128 152)"/><rect x="104" y="160" width="3.5" height="3.5"/><rect x="60" y="120" width="3" height="3"/></g>';

// --- 沖繩縣 ---
// 花笠：簡化成五片紅瓣（後二、中一、前三），花瓣底部藏在藍色笠沿後面，看起來是從笠沿長出來的
function hanagasa() {
  const petal = (x, base, w, h, rot) => `<path transform="translate(${x} ${base}) rotate(${rot})" d="M${-w / 2},0 C${-w / 2},${-h * .88} ${-w * .36},${-h} 0,${-h} C${w * .36},${-h} ${w / 2},${-h * .88} ${w / 2},0 Z" fill="#d8323a" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>`;
  return `<g>
    <ellipse cx="100" cy="84" rx="64" ry="13" fill="#2f6fb5" stroke="var(--ink)" stroke-width="2.4"/>
    ${petal(80, 84, 36, 28, -10)}${petal(120, 84, 36, 28, 10)}
    ${petal(100, 84, 38, 34, 0)}
    ${petal(64, 95, 40, 28, -14)}${petal(136, 95, 40, 28, 14)}${petal(100, 97, 40, 30, 0)}
    <path d="M34,84 A66,15 0 0,0 166,84 L160,82 A60,9 0 0,1 40,82 Z" fill="#2f6fb5" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M42,86 A58,10 0 0,0 158,86" fill="none" stroke="#e8bd4a" stroke-width="2"/>
    ${[[64, 93], [100, 96], [136, 93]].map(([x, y]) => `<path d="M${x - 4},${y} q2,-3 4,0 q2,3 4,0" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>`).join('')}
    <circle cx="100" cy="49" r="5.5" fill="#d8323a" stroke="var(--ink)" stroke-width="2.4"/>
  </g>`;
}
// 三線：照實物，蛇皮琴身（金褐色不規則鱗紋）、黑色長棹、往後彎的天、三根糸卷、黃黑胴卷
function sanshin() {
  const skin = '<g fill="#6b5530">' + [[146, 142, 5, 3, 20], [160, 140, 6, 3.5, -15], [170, 148, 4, 2.5, 40], [150, 154, 6, 3, -30], [164, 156, 5, 3, 10], [156, 147, 3, 2, 0], [146, 162, 4, 2.5, 25], [168, 164, 4, 2.4, -20]]
    .map(([x, y, a, b, r]) => `<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" transform="rotate(${r} ${x} ${y})"/>`).join('') + '</g>';
  return `<g transform="translate(8 0) rotate(-12 156 150)">
    <defs><clipPath id="sk${uid++}"><rect x="140" y="136" width="32" height="28" rx="7"/></clipPath><clipPath id="so${uid}"><rect x="137" y="133" width="38" height="36" rx="9"/></clipPath></defs>
    <rect x="153" y="58" width="7" height="82" rx="2" fill="#262224" stroke="var(--ink)" stroke-width="2.5"/>
    <path d="M153,60 C152,48 150,40 156,34 C162,30 168,34 163,38 C159,42 159,50 160,60 Z" fill="#262224" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>
    <g stroke="var(--ink)" stroke-width="3.2" stroke-linecap="round"><path d="M154,46 L141,42 M159,52 L172,49 M154,56 L141,54"/></g>
    <g fill="#f2d16b" stroke="var(--ink)" stroke-width="1.8"><rect x="134" y="38.5" width="8" height="6" rx="2" transform="rotate(17 138 41.5)"/><rect x="171" y="45.5" width="8" height="6" rx="2" transform="rotate(-13 175 48.5)"/><rect x="134" y="51" width="8" height="6" rx="2" transform="rotate(8 138 54)"/></g>
    <rect x="137" y="133" width="38" height="36" rx="9" fill="#262224" stroke="var(--ink)" stroke-width="3"/>
    <rect x="140" y="136" width="32" height="28" rx="7" fill="#c8ac6a"/>
    <g clip-path="url(#sk${uid - 1})">${skin}</g>
    <g clip-path="url(#so${uid})"><rect x="137" y="163" width="38" height="8" fill="#e8c23a"/>
    <g fill="#262224"><circle cx="145" cy="166" r="1.6"/><circle cx="156" cy="166" r="1.6"/><circle cx="167" cy="166" r="1.6"/></g></g>
    <rect x="137" y="133" width="38" height="36" rx="9" fill="none" stroke="var(--ink)" stroke-width="3"/>
    <rect x="150" y="150" width="13" height="3" rx="1" fill="#f4ecd8" stroke="var(--ink)" stroke-width="1.2"/>
    <path d="M155,40 V160 M156.5,40 V160 M158,40 V160" stroke="#f4ecd8" stroke-width=".8"/>
  </g>`;
}

// --- 東京都 ---
const antenna = `<g><path d="M100,46 V16" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round"/>
  <g class="swing" style="transform-origin:100px 16px"><path d="M100,16 v5" stroke="var(--ink)" stroke-width="2"/>
  <rect x="85" y="24" width="30" height="34" rx="12" fill="#d23b33" stroke="var(--ink)" stroke-width="3"/>
  <path d="M92,27 C90,36 90,46 92,55 M108,27 C110,36 110,46 108,55" fill="none" stroke="#a82a24" stroke-width="1.5"/>
  <rect x="88" y="20" width="24" height="6" rx="2" fill="#2b2626" stroke="var(--ink)" stroke-width="2"/>
  <rect x="88" y="56" width="24" height="6" rx="2" fill="#2b2626" stroke="var(--ink)" stroke-width="2"/>
  <text x="100" y="47" text-anchor="middle" font-family="Noto Sans TC, sans-serif" font-weight="700" font-size="17" fill="#2b2626">雷</text></g></g>`;
// 23 區晶片：不寫字，用顏色區分地區（下町紅、流行粉、動漫黃、商務藍）
const CHIP = { asakusa: '#d23b33', shibuya: '#f08bb0', akiba: '#f2c230', marunouchi: '#2a5ea0' };
// 插入式晶片：插槽貼在身體表面，晶片沿表面法線插進去，插槽以下的部分裁掉
const chipIn = (x, y, rot, color) => { const id = 'ci' + (uid++); return `<g transform="translate(${x} ${y}) rotate(${rot})">
  <defs><clipPath id="${id}"><rect x="-30" y="-60" width="60" height="58"/></clipPath></defs>
  <g clip-path="url(#${id})">
    <g stroke="#c9a23e" stroke-width="2.4" stroke-linecap="round">${[-24, -16, -8].map(o => `<path d="M-12,${o} h-5 M12,${o} h5"/>`).join('')}</g>
    <rect x="-12" y="-30" width="24" height="44" rx="3.5" fill="${color}" stroke="var(--ink)" stroke-width="2.6"/>
    <rect x="-5.5" y="-23" width="11" height="11" rx="2" fill="#f1d27a" stroke="var(--ink)" stroke-width="1.6"/>
    <path d="M-12,-6 h24" stroke="#000" stroke-opacity=".18" stroke-width="5"/></g>
  <rect x="-16" y="-3" width="32" height="7" rx="3.5" fill="#2b2626" stroke="var(--ink)" stroke-width="2"/>
  <path d="M-13,5.5 h26" stroke="#f4f6f8" stroke-width="2" stroke-linecap="round"/></g>`; };
const chip = (x, y, color, rot = 0, s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
  <g stroke="#c9a23e" stroke-width="2.4" stroke-linecap="round">${[-7, 0, 7].map(o => `<path d="M${o},-13 v-5 M${o},13 v5 M-13,${o} h-5 M13,${o} h5"/>`).join('')}</g>
  <rect x="-13" y="-13" width="26" height="26" rx="4" fill="${color}" stroke="var(--ink)" stroke-width="2.6"/>
  <rect x="-6" y="-6" width="12" height="12" rx="2" fill="#f1d27a" stroke="var(--ink)" stroke-width="1.6"/></g>`;
const ringBack = '<path d="M12,132 A88,20 0 0,1 188,132" fill="none" stroke="var(--ink)" stroke-width="11"/><path d="M12,132 A88,20 0 0,1 188,132" fill="none" stroke="#80c241" stroke-width="6"/>';
const ringFront = '<path d="M12,132 A88,20 0 0,0 188,132" fill="none" stroke="var(--ink)" stroke-width="11"/><path d="M12,132 A88,20 0 0,0 188,132" fill="none" stroke="#80c241" stroke-width="6"/>'
  + [[-60], [-25], [10]].map(([deg]) => { const [x, y] = pt(100, 132, 88, 90 + deg); const yy = 132 + (y - 132) * 20 / 88; return `<rect x="${(x - 7).toFixed(1)}" y="${(yy - 4).toFixed(1)}" width="14" height="8" rx="2.5" fill="#d9dee3" stroke="var(--ink)" stroke-width="2"/>`; }).join('');
const seams = '<path d="M38,116 C70,124 130,124 162,116" fill="none" stroke="#8d97a3" stroke-width="2"/><g fill="#8d97a3"><circle cx="52" cy="148" r="2.6"/><circle cx="148" cy="148" r="2.6"/><circle cx="100" cy="166" r="2.6"/></g>';

// --- 出雲國 ---
const ROPE = 'M42,86 C66,66 134,66 158,86';
const shimenawa = `<g>
  <path d="${ROPE}" fill="none" stroke="var(--ink)" stroke-width="19" stroke-linecap="round"/>
  <path d="${ROPE}" fill="none" stroke="#d6b36a" stroke-width="13" stroke-linecap="round"/>
  <path d="${ROPE}" fill="none" stroke="#a9853d" stroke-width="9" stroke-dasharray="2.5 7" stroke-dashoffset="2"/>
  <path d="M46,80 C70,64 130,64 154,80" fill="none" stroke="#efd79a" stroke-width="2" stroke-linecap="round" opacity=".8"/>
  ${[50, 150].map(x => `<path d="M${x - 5},84 h10 l-4,8 h8 l-4,8 h8 l-4,8 h-10 l4,-8 h-8 l4,-8 h-8 Z" fill="#fff" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>`).join('')}
</g>`;
const bow = (x, y, c = '#d23b3b') => `<g transform="translate(${x} ${y})" fill="none" stroke="${c}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
  <path d="M0,0 C-6,-9 -15,-7 -14,-1 C-13,4 -5,3 0,0 Z"/><path d="M0,0 C6,-9 15,-7 14,-1 C13,4 5,3 0,0 Z"/>
  <path d="M0,0 C-3,5 -6,8 -9,12 M0,0 C3,5 7,8 9,13"/><circle r="2.6" fill="${c}"/></g>`;
const redThread = '<path d="M166,124 C188,116 194,146 178,152 C166,157 172,168 184,170" fill="none" stroke="#d23b3b" stroke-width="2.6" stroke-linecap="round"/>' + bow(186, 170);

// --- 東海道 ---
const HAT = 'M14,76 Q100,26 186,76 Q100,92 14,76 Z';
function sandogasa() {
  const id = 'hat' + (uid++);
  return `<g transform="translate(100 58) scale(.86) rotate(-7) translate(-100 -70)">
    <defs><clipPath id="${id}"><path d="${HAT}"/></clipPath></defs>
    <path d="${HAT}" fill="#d8b56d"/>
    <g clip-path="url(#${id})" fill="none" stroke="#b48a3c" stroke-width="2"><path d="M20,74 Q100,40 180,74 M38,70 Q100,46 162,70 M60,64 Q100,50 140,64"/><path d="M100,30 L100,90 M70,40 L60,90 M130,40 L140,90"/></g>
    <path d="${HAT}" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linejoin="round"/></g>`;
}
const bundle = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <ellipse cx="0" cy="-19" rx="5.5" ry="4.5" fill="none" stroke="var(--ink)" stroke-width="5.5"/>
  <ellipse cx="0" cy="-19" rx="5.5" ry="4.5" fill="none" stroke="#9b6b43" stroke-width="2.5"/>
  <rect x="-18" y="-16" width="36" height="32" rx="9" fill="#2f5d8e"/>
  <rect x="-18" y="-16" width="36" height="32" rx="9" fill="url(#mame)"/>
  <rect x="-18" y="-16" width="36" height="32" rx="9" fill="none" stroke="var(--ink)" stroke-width="3"/></g>`;
const cord = d => `<path d="${d}" fill="none" stroke="var(--ink)" stroke-width="6" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#9b6b43" stroke-width="3" stroke-linecap="round"/>`;
const SHINKANSEN = `<g>
  <path d="M110,86 h96 M150,140 h56 M96,146 h40" stroke="#b9c3cf" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M-8,132 L-8,108 C10,108 28,98 60,96 L212,96 L212,132 Z" fill="#f7f8fa" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
  <path d="M14,106 C24,101 36,99 46,99 L48,106 Z" fill="#2b3a55"/>
  ${Array.from({ length: 10 }, (_, i) => `<rect x="${66 + i * 14}" y="102" width="8" height="7" rx="2" fill="#2b3a55"/>`).join('')}
  <path d="M-6,122 H212" stroke="#1f4fa0" stroke-width="5"/><path d="M-6,128 H212" stroke="#1f4fa0" stroke-width="1.8"/>
</g>`;


// ===== 北海道君 =====
FACE.flat = `<path d="M80,103 h10 M110,103 h10" ${S}/><path d="M96,114 h8" ${S}/>`;
FACE.puzzled = eyes() + `<path d="M95,114 h10" ${S}/>`;
// 毛蟹：mood = calm / wave / angry / still；以頭頂 (100,46) 為基準
function crab(mood = 'calm') {
  const clawL = `<g class="${mood === 'wave' ? 'wave-l' : ''}"><path d="M80,40 C70,34 66,24 70,16" ${SW(3)}/><path d="M70,18 C62,14 60,6 66,2 C70,8 76,8 78,4 C82,10 78,18 70,18 Z" fill="#c9573f" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/></g>`;
  const clawR = `<g class="${mood === 'wave' ? 'wave-r' : ''}"><path d="M120,40 C130,34 134,24 130,16" ${SW(3)}/><path d="M130,18 C138,14 140,6 134,2 C130,8 124,8 122,4 C118,10 122,18 130,18 Z" fill="#c9573f" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/></g>`;
  const clawsDown = `<path d="M80,44 C70,44 64,40 62,34" ${SW(3)}/><circle cx="61" cy="32" r="6" fill="#c9573f" stroke="var(--ink)" stroke-width="3"/><path d="M120,44 C130,44 136,40 138,34" ${SW(3)}/><circle cx="139" cy="32" r="6" fill="#c9573f" stroke="var(--ink)" stroke-width="3"/>`;
  const claws = mood === 'still' ? '' : mood === 'calm' ? clawsDown : clawL + clawR;
  const legs = `<path d="M80,48 l-12,6 M80,52 l-11,9 M120,48 l12,6 M120,52 l11,9" ${SW(3)}/>`;
  const shell = `<ellipse cx="100" cy="46" rx="22" ry="13" fill="#c9573f" stroke="var(--ink)" stroke-width="3.5"/>
    <g stroke="#9e3f2c" stroke-width="2" stroke-linecap="round"><path d="M88,42 l-2,-3 M96,38 l-1,-3 M104,38 l1,-3 M112,42 l2,-3 M92,48 l-2,-2 M108,48 l2,-2 M100,44 v-3"/></g>
    <path d="M93,34 v-6 M107,34 v-6" ${SW(2.5)}/><circle cx="93" cy="27" r="3" fill="var(--ink)"/><circle cx="107" cy="27" r="3" fill="var(--ink)"/>`;
  const vein = mood === 'angry' ? '<path d="M126,22 q4,3 0,6 M136,22 q-4,3 0,6 M128,19 q3,4 6,0 M128,31 q3,-4 6,0" fill="none" stroke="#d9503f" stroke-width="2.5" stroke-linecap="round"/>' : '';
  return `<g class="${mood === 'angry' ? 'shake' : ''}">${legs}${claws}${shell}${vein}</g>`;
}
// 圍巾兩端沿蛋形身體的曲線包覆
const EGG_EDGE = (() => {
  const seg = [[100, 44], [142, 44], [166, 84], [166, 122], [166, 158], [138, 178], [100, 178]], pts = [];
  for (let k = 0; k < 2; k++) { const [p0, p1, p2, p3] = seg.slice(k * 3, k * 3 + 4);
    for (let i = 0; i <= 60; i++) { const t = i / 60, u = 1 - t;
      pts.push([u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0], u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1]]); } }
  return y => pts.reduce((b, p) => Math.abs(p[1] - y) < Math.abs(b[1] - y) ? p : b)[0];
})();
function hkScarf() {
  const top = 117, bot = 137, off = 2.5, R = y => EGG_EDGE(y) + off, L = y => 200 - EGG_EDGE(y) - off;
  const ys = Array.from({ length: 6 }, (_, i) => top + (bot - top) * i / 5);
  const band = `M${L(top).toFixed(1)},${top} Q100,${top + 22} ${R(top).toFixed(1)},${top} ${ys.map(y => `L${R(y).toFixed(1)},${y.toFixed(1)}`).join(' ')} Q100,${bot + 22} ${L(bot).toFixed(1)},${bot} ${ys.slice().reverse().map(y => `L${L(y).toFixed(1)},${y.toFixed(1)}`).join(' ')} Z`;
  const mid = (top + bot) / 2;
  return `<path d="M134,132 l5,36 l16,-2 l-7,-35 Z" fill="#f3e3c3" stroke="var(--ink)" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M140,168 l1,6 M145,167 l1,6 M150,167 l1,6" ${SW(2.5)}/>
    <path d="${band}" fill="#f3e3c3" stroke="var(--ink)" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M${(L(mid) + 6).toFixed(1)},${mid} Q100,${mid + 22} ${(R(mid) - 6).toFixed(1)},${mid}" fill="none" stroke="#e2cfa8" stroke-width="2.5"/>${STAR(124, 137, 9)}`;
}

// ===== 東北六縣 =====
// --- 青森縣 ---
// 蘋果：葉子是情緒機關（平常斜伸、じょっぱり時豎直、沉穩時垂下），以莖頂 (103,12) 為轉軸
function apple(mood = 'calm') {
  const leaf = { calm: '', stand: 'rotate(-55 103 12)', droop: 'rotate(60 103 12)' }[mood];
  return `<g class="${mood === 'stand' ? 'shake' : ''}">
    <path d="M100,24 C100,16 102,10 106,5" ${SW(3)}/>
    <path transform="${leaf}" d="M103,12 C108,2 122,2 128,8 C120,15 110,16 103,12 Z" fill="#6aa84f" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M100,24 C91,13 70,15 70,34 C70,50 84,58 100,56 C116,58 130,50 130,34 C130,15 109,13 100,24 Z" fill="#d2343a" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
    <path d="M80,28 C78,32 78,38 80,42" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".85"/></g>`;
}
// 金魚ねぷた：弘前的金魚燈籠。紅背白腹、墨線、大眼、扇形尾；右手握短竹竿，燈籠從竿頭垂下（提著才像燈籠，不像抱著玩偶）
function kingyo(still) {
  const id = 'kg' + (uid++);
  const B = 'M-18,0 C-18,-10 -8,-13 2,-13 C12,-13 18,-7 18,0 C18,7 12,13 2,13 C-8,13 -18,10 -18,0 Z';
  return `<path d="M158,140 L180,110" stroke="var(--ink)" stroke-width="5.5" stroke-linecap="round"/><path d="M158,140 L180,110" stroke="#c9a46a" stroke-width="2.6" stroke-linecap="round"/>
    <g class="${still ? '' : 'swing'}"><path d="M180,111 L176,141" stroke="var(--ink)" stroke-width="2"/>
    <g transform="translate(176 154) scale(-1.05 1.05)">
      <defs><clipPath id="${id}"><path d="${B}"/></clipPath><radialGradient id="${id}g" cx=".45" cy=".6" r=".6"><stop offset="0" stop-color="#fff3c4"/><stop offset="1" stop-color="#fbf3e6"/></radialGradient></defs>
      <path d="M17,0 C22,-12 32,-14 30,-4 C29,-1 29,1 30,4 C32,14 22,12 17,0 Z" fill="#d8323a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M21,-2 L27,-8 M21,2 L27,8" stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M-2,-12 C2,-20 10,-19 10,-11" fill="#d8323a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="${B}" fill="url(#${id}g)"/>
      <g clip-path="url(#${id})"><path d="M-20,3 C-8,-2 8,-2 20,4 V-16 H-20 Z" fill="#d8323a"/>
        <path d="M0,-9 a3,3 0 0,1 6,0 M6,-9 a3,3 0 0,1 6,0 M3,-4 a3,3 0 0,1 6,0" fill="none" stroke="var(--ink)" stroke-width="1.3"/></g>
      <path d="M-4,-11 C0,-4 0,4 -4,11" fill="none" stroke="var(--ink)" stroke-width="1.8"/>
      <path d="${B}" fill="none" stroke="var(--ink)" stroke-width="2.4"/>
      <circle cx="-10" cy="-3" r="4.6" fill="#fff" stroke="var(--ink)" stroke-width="2"/><circle cx="-10.5" cy="-3" r="2.2" fill="var(--ink)"/></g></g>`;
}
// ママさんダンプ：雪國的大型塑膠雪鏟。側面看是楔形鏟斗（前低後高），鐵管把手從後壁往上斜到手邊
const DUMP = `<g><path d="M60,162 L37,121" stroke="var(--ink)" stroke-width="6" stroke-linecap="round"/><path d="M60,162 L37,121" stroke="#c9ced4" stroke-width="3" stroke-linecap="round"/>
  <path d="M30,124 L44,117" stroke="var(--ink)" stroke-width="7" stroke-linecap="round"/><path d="M30,124 L44,117" stroke="#ef7d2b" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M8,184 C8,166 24,158 34,166 C38,148 56,144 62,160 Z" fill="#fff" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M5,183 Q5,192 16,192 L61,192 L63,157 Z" fill="#ef7d2b" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
  <path d="M16,186 L59,186" stroke="#c45f1c" stroke-width="2"/></g>`;

// --- 岩手縣 ---
// 南部鐵瓶：黑色鑄鐵、霰紋（凸點）、提把（鉉）、短嘴、小蓋。mood：calm 無蒸氣、warm 一縷、boil 沸騰
function tetsubin(mood = 'warm') {
  const id = 'tb' + (uid++), body = 'M78,47 C70,41 70,27 82,22 C90,19 110,19 118,22 C130,27 130,41 122,47 Z';
  const dots = []; for (let y = 27, r = 0; y <= 44; y += 4.5, r++) for (let x = 72 + (r % 2) * 2.5; x <= 128; x += 5) dots.push(`<circle cx="${x}" cy="${y}" r="1.4"/>`);
  const steam = mood === 'boil'
    ? '<g fill="#fff" stroke="var(--ink)" stroke-width="2"><circle cx="148" cy="12" r="6"/><circle cx="158" cy="7" r="5"/><circle cx="162" cy="17" r="4.5"/><circle cx="87" cy="11" r="4.5"/></g>'
    : mood === 'warm' ? '<path d="M143,12 q-4,-5 0,-10 q4,-5 0,-10" fill="none" stroke="#b9b4aa" stroke-width="2.4" stroke-linecap="round"/>' : '';
  return `<g class="${mood === 'boil' ? 'shake' : ''}">
    <path d="M85,23 C85,2 115,2 115,23" fill="none" stroke="var(--ink)" stroke-width="7" stroke-linecap="round"/><path d="M85,23 C85,2 115,2 115,23" fill="none" stroke="#4a4644" stroke-width="3" stroke-linecap="round"/>
    <path d="M121,31 C130,29 135,22 139,15 L143,18 C140,27 133,36 124,41 Z" fill="#2e2b2b" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>
    <defs><clipPath id="${id}"><path d="${body}"/></clipPath></defs>
    <path d="${body}" fill="#2e2b2b"/><g clip-path="url(#${id})" fill="#57514d">${dots.join('')}</g>
    <path d="${body}" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
    <path d="M80,30 C79,35 80,40 82,43" fill="none" stroke="#8a847f" stroke-width="2" stroke-linecap="round"/>
    <g transform="translate(0 ${mood === 'boil' ? -3 : 0})"><ellipse cx="100" cy="20" rx="13" ry="4" fill="#2e2b2b" stroke="var(--ink)" stroke-width="2.5"/><circle cx="100" cy="15" r="3.2" fill="#2e2b2b" stroke="var(--ink)" stroke-width="2"/></g>
    ${steam}</g>`;
}
// わんこそば的小碗：外黑內朱的漆碗，裝一口份的蕎麥麵
const wanko = (x, y, s = 1, noodle = true) => `<g transform="translate(${x} ${y}) scale(${s})">
  <rect x="-6" y="13" width="12" height="4" rx="1.5" fill="#2b2626" stroke="var(--ink)" stroke-width="2"/>
  <path d="M-14,0 C-14,10 -7,15 0,15 C7,15 14,10 14,0 Z" fill="#2b2626" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>
  <ellipse cx="0" cy="0" rx="14" ry="3.6" fill="#c8352c" stroke="var(--ink)" stroke-width="2.5"/>
  ${noodle ? '<path d="M-10,0 C-9,-7 -3,-8 0,-5 C3,-9 9,-7 10,0 Z" fill="#cdbf9f" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/><path d="M-6,-2 C-4,-5 -1,-5 1,-3 M2,-3 C4,-6 6,-5 7,-2" fill="none" stroke="#9c8d6d" stroke-width="1.2"/>' : ''}</g>`;

// === 表情輔助符號 ===
// 以場景或主題命名的表情，在身旁加一個說明主題的符號（審核清單「表情缺少輔助」）。
// 預設放在左上方空處（x 10～56、y 30～90），那裡通常沒有頭飾和手上配件。
const AUX_TXT = 'font-weight="700" text-anchor="middle" fill="var(--ink)" font-family="\'Noto Sans JP\',\'Noto Sans TC\',sans-serif"';
const auxW = t => Math.max(22, t.length * 10 + 10);
// 寫錯的名字打上紅叉：「不是 X」
// 紅叉蓋住字會看不清，改成一條紅色斜線劃掉
const wrongCard = (t, x = 30, y = 56) => { const w = Math.max(26, t.length * 12 + 10), h = w / 2;
  return `<g transform="translate(${x} ${y}) rotate(-6)"><rect x="${-h}" y="-11" width="${w}" height="22" rx="3" fill="#fff" stroke="var(--ink)" stroke-width="2.2"/><text y="4.6" font-size="12.5" ${AUX_TXT}>${t}</text>
  <path d="M${-h - 3},9 L${h + 3},-9" stroke="#d23b33" stroke-width="2.6" stroke-linecap="round" opacity=".9"/></g>`; };
// 立牌：自己主張的名字
const signPost = (t, x = 30, y = 50) => { const w = auxW(t), h = w / 2;
  return `<g transform="translate(${x} ${y})"><path d="M0,10 V44" stroke="var(--ink)" stroke-width="4.4" stroke-linecap="round"/><path d="M0,10 V44" stroke="#a8743e" stroke-width="2" stroke-linecap="round"/>
  <rect x="${-h}" y="-10" width="${w}" height="20" rx="3" fill="#fbf3dc" stroke="var(--ink)" stroke-width="2.2"/><text y="4.4" font-size="11" ${AUX_TXT}>${t}</text></g>`; };
// 箭頭牌：dir 1 指右、-1 指左
const arrowBoard = (t, dir = 1) => { const w = auxW(t), h = w / 2;
  return `<path d="M${-h * dir},-9 H${h * dir} L${(h + 8) * dir},0 L${h * dir},9 H${-h * dir} Z" fill="#fbf3dc" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/><text x="${4 * dir}" y="4.2" font-size="10.5" ${AUX_TXT}>${t}</text>`; };
const arrowSign = (t, dir = 1, x = 30, y = 50) => `<g transform="translate(${x} ${y})"><path d="M0,9 V44" stroke="var(--ink)" stroke-width="4.4" stroke-linecap="round"/><path d="M0,9 V44" stroke="#a8743e" stroke-width="2" stroke-linecap="round"/>${arrowBoard(t, dir)}</g>`;
// 岔路牌：兩個方向，拿不定主意
const forkSign = (a, b, x = 30, y = 42) => `<g transform="translate(${x} ${y})"><path d="M0,-12 V52" stroke="var(--ink)" stroke-width="4.4" stroke-linecap="round"/><path d="M0,-12 V52" stroke="#a8743e" stroke-width="2" stroke-linecap="round"/>
  <g transform="translate(-2 0)">${arrowBoard(a, -1)}</g><g transform="translate(2 22)">${arrowBoard(b, 1)}</g></g>`;
// 對話框：尾巴朝右下指向角色
const bubble = (t, x = 34, y = 50, fs = 10.5) => { const w = Math.max(28, t.length * fs + 12), h = w / 2;
  return `<g transform="translate(${x} ${y})"><path d="M${-h},-11 H${h} Q${h + 4},-11 ${h + 4},-7 V7 Q${h + 4},11 ${h},11 H${h - 6} L${h + 6},20 L${h - 14},11 H${-h} Q${-h - 4},11 ${-h - 4},7 V-7 Q${-h - 4},-11 ${-h},-11 Z" fill="#fff" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <text y="${fs * .38}" font-size="${fs}" ${AUX_TXT}>${t}</text></g>`; };
// 地圖釘：「這裡」
const mapPin = (t, x = 30, y = 46) => `<g transform="translate(${x} ${y})"><path d="M0,22 C-4,14 -12,8 -12,-1 C-12,-8 -6,-13 0,-13 C6,-13 12,-8 12,-1 C12,8 4,14 0,22 Z" fill="#d23b33" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/><circle cy="-1" r="4" fill="#fff" stroke="var(--ink)" stroke-width="1.6"/>
  <rect x="${-auxW(t) / 2}" y="26" width="${auxW(t)}" height="17" rx="3" fill="#fff" stroke="var(--ink)" stroke-width="2"/><text y="38.6" font-size="10" ${AUX_TXT}>${t}</text></g>`;
// VS 爆炸框
const vsBadge = (x = 30, y = 54) => `<g transform="translate(${x} ${y})"><path d="M0,-17 L5,-9 L15,-12 L11,-3 L19,3 L9,6 L10,16 L2,10 L-6,17 L-7,7 L-17,6 L-10,-1 L-15,-10 L-5,-9 Z" fill="#f6c445" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/><text y="4.4" font-size="11" ${AUX_TXT} fill="#c8323a">VS</text></g>`;
// 雪花
const flake = (x, y, r = 6) => `<g transform="translate(${x} ${y})" stroke="#fff" stroke-width="2" stroke-linecap="round"><g stroke="var(--ink)" stroke-width="4">${[0, 60, 120].map(a => `<path d="M0,${-r} V${r}" transform="rotate(${a})"/>`).join('')}</g>${[0, 60, 120].map(a => `<path d="M0,${-r} V${r}" transform="rotate(${a})"/>`).join('')}</g>`;
const SNOWFALL = flake(24, 46) + flake(46, 80, 5) + flake(20, 100, 4.6) + flake(178, 70, 5) + flake(184, 104, 4.2);
// 時鐘（性子急）
const CLOCK = `<g transform="translate(28 56)"><circle r="15" fill="#fff" stroke="var(--ink)" stroke-width="2.6"/><path d="M0,-11 V-9 M11,0 H9 M0,11 V9 M-11,0 H-9" stroke="var(--ink)" stroke-width="1.8"/><path d="M0,0 V-8 M0,0 L6,3" stroke="#d23b33" stroke-width="2.4" stroke-linecap="round"/><rect x="-3" y="-21" width="6" height="5" rx="1" fill="#c9ced6" stroke="var(--ink)" stroke-width="1.6"/></g>`;
// 蝸牛（日向時間）
const SNAIL = `<g transform="translate(30 186)"><path d="M-16,4 C-16,0 -10,-1 -4,-1 H12 C16,-1 18,2 18,4 Z" fill="#e8d6a8" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/><path d="M12,-1 L14,-8 M16,-1 L19,-7" stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round"/>
  <circle cx="-2" cy="-8" r="9" fill="#c98a4a" stroke="var(--ink)" stroke-width="2.2"/><path d="M-2,-8 m0,-5 a5,5 0 1 1 -5,5 a3,3 0 1 1 3,3" fill="none" stroke="#8a5a2a" stroke-width="1.6"/></g>`;
// 擴音器（自虐宣傳）
const MEGAPHONE = `<g transform="translate(30 58) rotate(-20)"><path d="M-12,-5 L8,-13 V13 L-12,5 Z" fill="#f6c445" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/><rect x="-18" y="-5" width="7" height="10" rx="2" fill="#e8673a" stroke="var(--ink)" stroke-width="2"/><path d="M-14,5 V12" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>
  <path d="M13,-8 q4,8 0,16 M18,-12 q6,12 0,24" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/></g>`;
// 地面的震動線（小地震）
const QUAKE = `<path d="M40,206 q4,-4 8,0 t8,0 t8,0 M136,206 q4,-4 8,0 t8,0 t8,0 M24,196 l-6,-4 M176,196 l6,-4" fill="none" stroke="var(--ink)" stroke-width="2.4" stroke-linecap="round"/>`;
// 獎牌（數量第一）
const medal = (t, x = 30, y = 50) => `<g transform="translate(${x} ${y})"><path d="M-8,-20 L-3,-6 M8,-20 L3,-6" stroke="#2c4f9e" stroke-width="5" stroke-linecap="round"/><circle cy="4" r="12" fill="#e1bf55" stroke="var(--ink)" stroke-width="2.4"/><text y="8.6" font-size="13" ${AUX_TXT} fill="#7a5a12">${t}</text></g>`;
// 日出（朝）
const SUNRISE = `<g transform="translate(30 70)"><path d="M-16,0 A16,16 0 0 1 16,0 Z" fill="#f6b13a" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/><path d="M-22,0 H22" stroke="var(--ink)" stroke-width="2.6" stroke-linecap="round"/>
  <g stroke="#e8962a" stroke-width="2.6" stroke-linecap="round"><path d="M0,-21 V-26"/><path d="M-15,-15 l-4,-4"/><path d="M15,-15 l4,-4"/></g></g>`;
// 大蒜
const GARLIC = `<g transform="translate(30 168)"><path d="M0,-16 C2,-12 4,-10 8,-8 C15,-4 15,9 6,12 C3,13 -3,13 -6,12 C-15,9 -15,-4 -8,-8 C-4,-10 -2,-12 0,-16 Z" fill="#f7f1e2" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M0,-10 C-2,-2 -2,6 0,12 M-6,-6 C-9,0 -8,7 -5,11 M6,-6 C9,0 8,7 5,11" fill="none" stroke="#c9bfa4" stroke-width="1.4"/><path d="M-2,12 l-2,4 M2,12 l2,4" stroke="#a89a7a" stroke-width="1.4"/></g>`;
// 回敬的酒杯
const HENPAI_CUP = `<g transform="translate(30 60)"><path d="M-14,-4 H2 L-1,6 H-11 Z" fill="#fff" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/><path d="M-12,-1 H0" stroke="#d23b33" stroke-width="2"/>
  <path d="M-4,-12 C4,-20 16,-16 16,-6" fill="none" stroke="var(--ink)" stroke-width="2.2" stroke-linecap="round"/><path d="M12,-9 L16,-4 L19,-10" fill="none" stroke="var(--ink)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></g>`;
// 屋台（背景）
const YATAI = `<g transform="translate(26 120)"><rect x="-20" y="18" width="40" height="40" fill="#a8743e" stroke="var(--ink)" stroke-width="2.4"/><path d="M-24,-2 H24 L20,10 H-20 Z" fill="#c8463a" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M-18,10 V26 M-6,10 V26 M6,10 V26 M18,10 V26" stroke="#fbf8f0" stroke-width="7"/><path d="M-20,10 H20" stroke="var(--ink)" stroke-width="2"/><path d="M-20,26 H20" stroke="var(--ink)" stroke-width="1.6"/>
  <ellipse cx="0" cy="-12" rx="6" ry="8" fill="#e8673a" stroke="var(--ink)" stroke-width="2"/><path d="M0,-20 V-24 M0,-2 V2" stroke="var(--ink)" stroke-width="2"/></g>`;
// 坡道與石階（背景）
const SLOPE = `<path d="M0,212 L0,150 L18,150 L18,164 L36,164 L36,178 L54,178 L54,192 L72,192 L72,212 Z" fill="#d8d2c2" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>`;
// 一杯水
const WATER = `<g transform="translate(30 166)"><path d="M-10,-14 H10 L7,14 H-7 Z" fill="#dff0fa" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/><path d="M-8.6,-4 H8.6" stroke="#6bb6e0" stroke-width="2"/><path d="M-4,0 V9" stroke="#fff" stroke-width="2" stroke-linecap="round"/></g>`;
// 溫泉符號打叉
const NO_ONSEN = `<g transform="translate(30 56)"><path d="M-12,6 A12,6 0 0 0 12,6" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/><path d="M-6,0 q-4,-5 0,-10 t0,-8 M0,0 q-4,-5 0,-10 t0,-8 M6,0 q-4,-5 0,-10 t0,-8" fill="none" stroke="#d23b33" stroke-width="2.6" stroke-linecap="round"/>
  <circle cy="-3" r="19" fill="none" stroke="#d23b33" stroke-width="3"/><path d="M-13,-16 L13,10" stroke="#d23b33" stroke-width="3" stroke-linecap="round"/></g>`;
// 小狗（西郷さん的愛犬）
const DOG = `<g transform="translate(30 178)"><path d="M-12,14 V2 C-12,-4 -6,-6 0,-6 H8 V14" fill="#c98a4a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/><path d="M-12,4 C-18,2 -20,-4 -18,-8" fill="none" stroke="var(--ink)" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M2,-4 C2,-14 8,-18 14,-16 C18,-14 20,-10 18,-6 C16,-2 8,-1 2,-4 Z" fill="#c98a4a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/><path d="M8,-17 L9,-23 L13,-17 M14,-16 L17,-21 L18,-13" fill="#c98a4a" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
  <circle cx="13" cy="-10" r="1.6" fill="var(--ink)"/><circle cx="18.4" cy="-8" r="1.4" fill="var(--ink)"/><path d="M-4,14 V6 M4,14 V6" stroke="var(--ink)" stroke-width="1.6"/></g>`;
// 堤防與河水（信玄堤）
const LEVEE = `<g transform="translate(-4 -54) scale(1.25)"><path d="M0,206 C10,202 20,210 30,206 C40,202 50,210 60,206 V214 H0 Z" fill="#9fd3ef" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/><path d="M4,192 L22,178 H46 L64,192 Z" fill="#a8874a" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/><path d="M14,186 H54" stroke="#7a5a2a" stroke-width="1.4"/></g>`;
// 排成一列的「和邇」（鯊魚背鰭）
const WANI = `<g><path d="M0,198 q8,-4 16,0 t16,0 t16,0 t16,0" fill="none" stroke="#3f8fc8" stroke-width="2.6" stroke-linecap="round"/>${[6, 22, 38, 54].map(x => `<path d="M${x},198 L${x + 6},184 L${x + 10},198 Z" fill="#7a8794" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>`).join('')}</g>`;
// 源平的紅白旗（壇之浦）
const GENPEI = `<g transform="translate(30 50)"><path d="M-6,0 V40 M6,4 V40" stroke="var(--ink)" stroke-width="2.6" stroke-linecap="round"/><path d="M-6,0 L-22,3 L-6,14 Z" fill="#d23b33" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/><path d="M6,4 L22,7 L6,18 Z" fill="#fff" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
  <path d="M-24,44 q6,-4 12,0 t12,0 t12,0 t12,0" fill="none" stroke="#3f8fc8" stroke-width="2.6" stroke-linecap="round"/></g>`;
// 小船（渡海）
const BOAT = `<g transform="translate(30 190)"><path d="M-22,0 H22 L16,10 H-16 Z" fill="#a8743e" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/><path d="M0,0 V-24" stroke="var(--ink)" stroke-width="2.4"/><path d="M1,-22 L14,-4 H1 Z" fill="#fbf8f0" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
  <path d="M-28,14 q7,-4 14,0 t14,0 t14,0 t14,0" fill="none" stroke="#3f8fc8" stroke-width="2.6" stroke-linecap="round"/></g>`;
// 撕成兩半的紙（內部分裂）
const TORN = `<g transform="translate(30 56)"><path d="M-18,-12 H-1 L-4,-6 L1,0 L-3,6 L0,12 H-18 Z" fill="#fff" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round" transform="rotate(-8) translate(-2 0)"/><path d="M4,-12 H20 V12 H5 L2,6 L6,0 L1,-6 Z" fill="#fff" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round" transform="rotate(8) translate(3 0)"/>
  <text x="-10" y="4" font-size="9" ${AUX_TXT} transform="rotate(-8)">神奈</text><text x="13" y="4" font-size="9" ${AUX_TXT} transform="rotate(8)">川</text></g>`;
// 分成三塊的縣（會津・中通・濱通）
const THREE_AREAS = `<g transform="translate(30 56)"><rect x="-21" y="-13" width="14" height="26" fill="#c8463a" stroke="var(--ink)" stroke-width="2"/><rect x="-7" y="-13" width="14" height="26" fill="#f6c445" stroke="var(--ink)" stroke-width="2"/><rect x="7" y="-13" width="14" height="26" fill="#3f8fc8" stroke="var(--ink)" stroke-width="2"/>
  <g font-size="9" ${AUX_TXT}><text x="-14" y="3.4" fill="#fff">会</text><text y="3.4">中</text><text x="14" y="3.4" fill="#fff">浜</text></g></g>`;
// 電車（只知道自己的沿線）：側面的通勤電車加一段鐵軌
const ROUTE = `<g transform="translate(28 64)"><path d="M-22,12 H22" stroke="var(--ink)" stroke-width="2.4" stroke-linecap="round"/><path d="M-18,12 v3 M-8,12 v3 M2,12 v3 M12,12 v3" stroke="var(--ink)" stroke-width="2"/>
  <rect x="-20" y="-12" width="40" height="20" rx="4" fill="#eef0f2" stroke="var(--ink)" stroke-width="2.2"/><path d="M-20,2 H20" stroke="#e8673a" stroke-width="3"/>
  ${[-14, -4, 6].map(x => `<rect x="${x}" y="-8" width="7" height="6" rx="1" fill="#9fd3ef" stroke="var(--ink)" stroke-width="1.4"/>`).join('')}<path d="M0,-12 L-4,-18 H4 Z" fill="none" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/></g>`;
// 兩碗芋煮：醬油牛肉 vs 味噌豬肉
const IMONI_VS = `<g transform="translate(30 58)">${[[-11, '#8a5a32'], [11, '#d9a04a']].map(([x, c]) => `<path d="M${x - 9},-2 H${x + 9} C${x + 8},6 ${x + 4},9 ${x},9 C${x - 4},9 ${x - 8},6 ${x - 9},-2 Z" fill="#fbf8f0" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/><ellipse cx="${x}" cy="-2" rx="9" ry="3" fill="${c}" stroke="var(--ink)" stroke-width="1.8"/>`).join('')}
  <text y="-10" font-size="10" ${AUX_TXT} fill="#c8323a">VS</text></g>`;
// 生氣的青筋符號（三ぽい：氣一下就忘）
const VEIN = `<g transform="translate(40 50)" fill="none" stroke="#d23b33" stroke-width="2.8" stroke-linecap="round"><path d="M-8,-3 C-3,-3 -3,-8 -3,-8 M3,-8 C3,-3 8,-3 8,-3 M8,3 C3,3 3,8 3,8 M-3,8 C-3,3 -8,3 -8,3"/></g>`;
// 「無盡」的信封（朋友聚會固定存錢）
const MUJIN = `<g transform="translate(30 58) rotate(-8)"><rect x="-16" y="-11" width="32" height="22" rx="2" fill="#fbf3dc" stroke="var(--ink)" stroke-width="2.2"/><path d="M-16,-11 L0,2 L16,-11" fill="none" stroke="var(--ink)" stroke-width="1.8"/><text y="9" font-size="8.5" ${AUX_TXT} fill="#c8323a">無尽</text></g>`;

// 靜岡：插在富士山上的小旗
const FUJI_FLAG = `<g transform="translate(124 34)"><path d="M0,0 V-24" stroke="var(--ink)" stroke-width="2.6" stroke-linecap="round"/><path d="M1,-24 H17 V-12 H1 Z" fill="#fff" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/><text x="9" y="-14.6" font-size="8.5" ${AUX_TXT}>静</text></g>`;
// 愛媛：水龍頭滴下來的是水（藍色），不是蜜柑汁
const BLUE_DROP = '<path d="M119,20.5 C115.5,25 115.5,28.5 119,30 C122.5,28.5 122.5,25 119,20.5 Z" fill="#9fd3ef" stroke="var(--ink)" stroke-width="1.4"/>';
// 土佐國：鯨魚噴出高高的水柱
const BIG_SPOUT = '<path d="M92,26 C90,14 84,4 78,2 M92,26 C92,12 94,2 98,-2 M92,26 C96,14 104,8 110,8" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><path d="M92,26 C90,14 84,4 78,2 M92,26 C92,12 94,2 98,-2 M92,26 C96,14 104,8 110,8" fill="none" stroke="#7fc0e8" stroke-width="2.8" stroke-linecap="round"/>';
// 越後國：毘沙門天像背後的火焰光背
const HALO = `<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M28,118 A72,72 0 0 1 172,118" stroke="var(--ink)" stroke-width="7"/><path d="M28,118 A72,72 0 0 1 172,118" stroke="#e8962a" stroke-width="4"/>
  ${[200, 225, 250, 270, 290, 315, 340].map(a => { const [x, y] = pt(100, 118, 72, a), [x2, y2] = pt(100, 118, 84, a + 4); return `<path d="M${x.toFixed(1)},${y.toFixed(1)} Q${((x + x2) / 2 - 3).toFixed(1)},${((y + y2) / 2).toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}" stroke="#e8962a" stroke-width="3.6"/>`; }).join('')}</g>`;

// --- 宮城縣 ---
// 伊達政宗的弦月前立：金色細長的新月，右側較長；用黑色頭帶固定在額上
const MBAND = 'M48,82 C70,62 130,62 152,82';
const dateMoon = `<g>
  <path d="${MBAND}" fill="none" stroke="var(--ink)" stroke-width="12" stroke-linecap="round"/><path d="${MBAND}" fill="none" stroke="#2b2a33" stroke-width="7" stroke-linecap="round"/>
  <path d="M44,22 Q96,96 166,8 Q100,70 44,22 Z" fill="#e1bf55" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M58,34 Q98,72 150,22" fill="none" stroke="#f4dc8a" stroke-width="2" stroke-linecap="round"/>
  <rect x="93" y="56" width="14" height="12" rx="2" fill="#c9a23e" stroke="var(--ink)" stroke-width="2.4"/></g>`;
// 仙台七夕的吹き流し：上面是彩球（くす玉），下面垂著長條紙帶
function fukinagashi(still) {
  // 紙帶顏色不照彩虹順序排，避免被看成彩虹旗；長短交錯，像和紙一條條垂下
  const cols = ['#f39ab8', '#fff4d6', '#f6c445', '#9fd3ef', '#f39ab8', '#c9a6e0', '#fff4d6'], lens = [58, 64, 60, 66, 61, 57, 63];
  const d = i => { const x = -10.5 + i * 3.5; return `M${x},6 C${x - 2},${lens[i] * .4} ${x + 2},${lens[i] * .7} ${x},${lens[i]}`; };
  const strips = cols.map((c, i) => `<path d="${d(i)}" fill="none" stroke="var(--ink)" stroke-width="5.4" stroke-linecap="round"/>`).join('') + cols.map((c, i) => `<path d="${d(i)}" fill="none" stroke="${c}" stroke-width="3.4" stroke-linecap="round"/>`).join('');
  return `<path d="M166,128 L176,66" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><path d="M166,128 L176,66" stroke="#c9a46a" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M176,58 C168,46 160,44 153,46 C159,53 167,57 176,58 Z M178,56 C184,44 192,40 198,42 C194,50 186,55 178,56 Z" fill="#6aa84f" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
    <g class="${still ? '' : 'swing'}"><g transform="translate(176 62)">${strips}
      <path d="${Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2, b = (i + .5) / 12 * Math.PI * 2; return `${i ? 'L' : 'M'}${(Math.cos(a) * 11).toFixed(1)},${(Math.sin(a) * 11).toFixed(1)} L${(Math.cos(b) * 12.6).toFixed(1)},${(Math.sin(b) * 12.6).toFixed(1)}`; }).join(' ')} Z" fill="#f08bb0" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/></g></g>`;
}
const GYUTAN = `<g transform="translate(32 158)"><ellipse rx="27" ry="9" fill="#fff" stroke="var(--ink)" stroke-width="2.5"/>
  ${[[-10, -3, -12], [2, -4, 8], [12, 0, -6]].map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="10" ry="5.5" fill="#b8664a" stroke="var(--ink)" stroke-width="2"/><path d="M-5,-2 l3,4 M0,-3 l3,5 M5,-2 l2,3" stroke="#6b3a2a" stroke-width="1.4"/></g>`).join('')}
  <path d="M-20,2 q4,-3 7,0" stroke="#5f8f3a" stroke-width="3" stroke-linecap="round" fill="none"/></g>`;

// --- 秋田縣 ---
// 生剝鬼（なまはげ）面具：紅臉、雙角、金色凸眼、粗眉、露牙，四周是稻草（ケデ）色的亂髮
function namahage(x, y, rot = 0, s = 1) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <path d="M-22,-6 C-28,-20 -14,-30 0,-27 C14,-30 28,-20 22,-6 C27,2 25,14 20,18 L-20,18 C-25,14 -27,2 -22,-6 Z" fill="#b89452" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M-11,-17 C-16,-28 -14,-36 -8,-40 C-8,-32 -6,-24 -4,-18 Z M11,-17 C16,-28 14,-36 8,-40 C8,-32 6,-24 4,-18 Z" fill="#efe2b8" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M-16,-16 C-16,-22 16,-22 16,-16 L18,8 C18,20 8,24 0,24 C-8,24 -18,20 -18,8 Z" fill="#c8323a" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M-14,-11 L-3,-6 M14,-11 L3,-6" stroke="var(--ink)" stroke-width="3.6" stroke-linecap="round"/>
    <circle cx="-7" cy="-1" r="4.3" fill="#f0c330" stroke="var(--ink)" stroke-width="2"/><circle cx="7" cy="-1" r="4.3" fill="#f0c330" stroke="var(--ink)" stroke-width="2"/>
    <circle cx="-7" cy="-1" r="1.8" fill="var(--ink)"/><circle cx="7" cy="-1" r="1.8" fill="var(--ink)"/>
    <path d="M-3,5 C-3,9 3,9 3,5" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/>
    <path d="M-11,12 C-6,10 6,10 11,12 L9,18 C4,20 -4,20 -9,18 Z" fill="#2b2626" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
    <path d="M-8,12.5 H8 V15 H-8 Z" fill="#fff"/><path d="M-10,12 l2,-5 l2,5 Z M10,12 l-2,-5 l-2,5 Z" fill="#fff" stroke="var(--ink)" stroke-width="1.2" stroke-linejoin="round"/></g>`;
}
// きりたんぽ：秋田杉的籤子插著搗過的米飯烤成圓筒，表面有烤痕
function kiritanpo(x, y, rot) {
  const id = 'kt' + (uid++);
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-2.2" y="-36" width="4.4" height="72" rx="2" fill="#e2c58f" stroke="var(--ink)" stroke-width="2"/>
    <defs><clipPath id="${id}"><rect x="-7.5" y="-22" width="15" height="42" rx="7"/></clipPath></defs>
    <rect x="-7.5" y="-22" width="15" height="42" rx="7" fill="#f1dca6"/>
    <g clip-path="url(#${id})" fill="#c4823e" opacity=".85"><ellipse cx="-3" cy="-16" rx="4.5" ry="2.8"/><ellipse cx="4" cy="-9" rx="4" ry="2.6"/><ellipse cx="-4" cy="-2" rx="4.5" ry="2.8"/><ellipse cx="4" cy="5" rx="4" ry="2.6"/><ellipse cx="-3" cy="12" rx="4.5" ry="2.8"/><ellipse cx="4" cy="17" rx="3.5" ry="2.2"/></g>
    <rect x="-7.5" y="-22" width="15" height="42" rx="7" fill="none" stroke="var(--ink)" stroke-width="2.6"/></g>`;
}
// 竿燈：一根長竿加上幾排橫竹，掛滿燈籠，用手掌撐起來
function kanto(x, y) {
  const rows = [[8, 3], [22, 4], [36, 5], [50, 5]];
  const lan = rows.map(([yy, n]) => `<path d="M${x - (n - 1) * 4 - 4},${yy - 7} H${x + (n - 1) * 4 + 4}" stroke="#a9853d" stroke-width="2"/>` +
    Array.from({ length: n }, (_, i) => { const cx = x - (n - 1) * 4 + i * 8; return `<g><rect x="${cx - 3.6}" y="${yy - 5}" width="7.2" height="10" rx="3" fill="#f6e3a4" stroke="var(--ink)" stroke-width="1.5"/><path d="M${cx - 3},${yy - 4} h6 M${cx - 3},${yy + 4} h6" stroke="#d2343a" stroke-width="1.6"/></g>`; }).join('')).join('');
  return `<path d="M${x},${y} V-2" stroke="var(--ink)" stroke-width="4.5" stroke-linecap="round"/><path d="M${x},${y} V-2" stroke="#c9a46a" stroke-width="2" stroke-linecap="round"/>${lan}`;
}

// --- 山形縣 ---
// 櫻桃：兩顆佐藤錦，莖頂相連、帶一片葉子，掛在頭上會晃
const cherries = still => `<g class="${still ? '' : 'swing'}">
  <path d="M112,12 C104,16 100,24 100,32 M112,12 C118,18 124,28 126,36" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/>
  <path d="M112,12 C104,16 100,24 100,32 M112,12 C118,18 124,28 126,36" fill="none" stroke="#6d8f34" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M112,12 C118,3 132,3 137,9 C129,16 119,16 112,12 Z" fill="#6aa84f" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  ${[[100, 41], [126, 45]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10.5" fill="#c8243c" stroke="var(--ink)" stroke-width="2.8"/><path d="M${x - 5},${y - 3} q1,-4 4,-5" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".9"/>`).join('')}</g>`;
// 天童將棋駒：五角形木駒，刻「王将」
const koma = (x, y, rot = 0, s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
  <path d="M0,-26 L15,-17 L19,24 L-19,24 L-15,-17 Z" fill="#e9c98a" stroke="var(--ink)" stroke-width="2.8" stroke-linejoin="round"/>
  <path d="M-10,-12 C-8,0 -9,12 -11,20 M9,-10 C11,2 10,12 12,20" fill="none" stroke="#cfa964" stroke-width="1.2"/>
  <text x="0" y="-1" text-anchor="middle" font-family="'Noto Serif JP','Noto Serif TC',serif" font-weight="700" font-size="15" fill="#2b2626">王</text>
  <text x="0" y="17" text-anchor="middle" font-family="'Noto Serif JP','Noto Serif TC',serif" font-weight="700" font-size="15" fill="#2b2626">将</text></g>`;
// 芋煮鍋：鐵鍋裡有醬油湯、芋頭、牛肉、蔥，配一支湯勺
const IMONI = `<g><path d="M48,150 L64,118" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><path d="M48,150 L64,118" stroke="#c9a46a" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M6,152 H62 L58,176 C56,184 48,186 34,186 C20,186 12,184 10,176 Z" fill="#4a4644" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
  <ellipse cx="34" cy="152" rx="28" ry="7" fill="#8a5a32" stroke="var(--ink)" stroke-width="2.6"/>
  <g stroke="var(--ink)" stroke-width="1.6"><ellipse cx="22" cy="151" rx="6" ry="3.6" fill="#ece5d6"/><ellipse cx="38" cy="149" rx="6" ry="3.4" fill="#ece5d6"/><ellipse cx="48" cy="153" rx="5" ry="3" fill="#ece5d6"/>
  <path d="M28,154 q4,-3 8,0" fill="#9a4a3a"/></g><circle cx="31" cy="149" r="2" fill="#7fb04a"/><circle cx="43" cy="155" r="2" fill="#7fb04a"/></g>`;

// --- 福島縣 ---
// 赤べこ：會津的紅色張子牛，身上有黑色圓紋，頭會點（以頸部為轉軸）。mood：nod 點頭、shake 搖晃、still 不動
function akabeko(mood = 'nod') {
  // 以軀幹中心為原點畫，再移到頭頂 (106,30)。頭比例放大、垂在前下方，四腳也是紅色，才像張子牛而不像甲蟲
  return `<g transform="translate(106 30)"><g class="${mood === 'shake' ? 'shake' : ''}">
    <g fill="#c8323a" stroke="var(--ink)" stroke-width="2.4"><rect x="-22" y="6" width="9" height="15" rx="3"/><rect x="-8" y="8" width="8" height="11" rx="3"/><rect x="5" y="8" width="8" height="11" rx="3"/><rect x="16" y="6" width="9" height="15" rx="3"/></g>
    <path d="M28,-6 C35,-4 37,4 33,9" fill="none" stroke="var(--ink)" stroke-width="2.8" stroke-linecap="round"/>
    <path d="M-26,-12 C-10,-19 14,-19 26,-12 C33,-8 33,8 26,12 C10,16 -10,16 -26,12 C-33,8 -33,-8 -26,-12 Z" fill="#c8323a" stroke="var(--ink)" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="M-20,-13 C-6,-17 10,-17 22,-13" fill="none" stroke="#fff" stroke-width="1.8" stroke-dasharray="3 3" opacity=".85"/>
    <g stroke="#e1bf55" stroke-width="2" fill="#2b2626"><circle cx="-6" cy="-3" r="5"/><circle cx="12" cy="2" r="4.2"/><circle cx="2" cy="8" r="2.6"/></g>
    <path d="M-25,-11 C-28,-4 -28,4 -25,11" fill="none" stroke="#2b2626" stroke-width="4"/>
    <g class="${mood === 'nod' ? 'nod' : ''}">
      <path d="M-34,-14 l-3,-7 M-27,-15 l2,-7" stroke="var(--ink)" stroke-width="2.8" stroke-linecap="round"/>
      <ellipse cx="-23" cy="-12" rx="6" ry="3.5" transform="rotate(-30 -23 -12)" fill="#c8323a" stroke="var(--ink)" stroke-width="2.2"/>
      <path d="M-24,-8 C-32,-17 -48,-15 -52,-3 C-56,9 -50,19 -40,21 C-31,22 -24,15 -22,4 Z" fill="#c8323a" stroke="var(--ink)" stroke-width="2.8" stroke-linejoin="round"/>
      <ellipse cx="-47" cy="13" rx="7.5" ry="6.5" fill="#2b2626"/><circle cx="-50" cy="12" r="1.4" fill="#fff"/><circle cx="-45" cy="12" r="1.4" fill="#fff"/>
      <path d="M-43,-6 q4,-4 9,0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="-38" cy="0" r="3" fill="var(--ink)"/><circle cx="-37" cy="-1" r="1" fill="#fff"/></g>
  </g></g>`;
}
// 桃：福島縣北的「あかつき」，粉橘色、有一條縫線，頂上兩片葉
function peach(x, y, s = 1) {
  const id = 'pc' + (uid++);
  return `<g transform="translate(${x} ${y}) scale(${s})"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbd9c0"/><stop offset=".6" stop-color="#f6a593"/><stop offset="1" stop-color="#e8786a"/></linearGradient></defs>
    <path d="M0,-13 C10,-14 16,-4 15,4 C14,12 7,15 0,15 C-7,15 -14,12 -15,4 C-16,-4 -10,-14 0,-13 Z" fill="url(#${id})" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M0,-12 C-4,-2 -3,8 0,14" fill="none" stroke="#d96b5e" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M0,-13 C4,-22 14,-22 17,-16 C11,-12 5,-12 0,-13 Z M0,-13 C-3,-20 -11,-21 -13,-16 C-8,-13 -4,-12 0,-13 Z" fill="#6aa84f" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/></g>`;
}

// ===== 關東 =====
// --- 茨城縣 ---
// 藁苞納豆：稻草捆成紡錘形、兩端綁繩、中間開口露出納豆；拉絲是情緒機關
function warazuto(mood = 'calm') {
  const id = 'wz' + (uid++), B = 'M62,40 C74,22 126,22 138,40 C126,54 74,54 62,40 Z';
  const beans = [[90, 35], [97, 32], [104, 34], [111, 33], [94, 39], [102, 39], [109, 38]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="#b5793a" stroke="var(--ink)" stroke-width="1.3"/>`).join('');
  // 激動時整包搖晃（筷子拉絲縮小後看不出來，只留搖晃）
  return `<g class="${mood === 'sticky' ? 'shake' : ''}">
    <path d="M64,40 L48,30 M63,40 L45,40 M64,41 L48,50 M136,40 L152,30 M137,40 L155,40 M136,41 L152,50" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/>
    <path d="M64,40 L48,30 M63,40 L45,40 M64,41 L48,50 M136,40 L152,30 M137,40 L155,40 M136,41 L152,50" stroke="#d9c07a" stroke-width="2.6" stroke-linecap="round"/>
    <defs><clipPath id="${id}"><path d="${B}"/></clipPath></defs>
    <path d="${B}" fill="#e3cc86"/><g clip-path="url(#${id})" stroke="#bfa257" stroke-width="1.4" fill="none"><path d="M60,32 C90,26 110,26 140,32 M60,46 C90,52 110,52 140,46 M60,41 H140"/></g>
    <path d="${B}" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
    <path d="M72,29 C68,35 68,45 72,51 M128,29 C132,35 132,45 128,51" fill="none" stroke="#8a6a2a" stroke-width="3.4" stroke-linecap="round"/>
    <ellipse cx="100" cy="36" rx="19" ry="8" fill="#6b4a22" stroke="var(--ink)" stroke-width="2.4"/>${beans}</g>`;
}
// 哈密瓜：網紋、T 字形瓜梗
function melon(x, y, s = 1) {
  const id = 'ml' + (uid++);
  return `<g transform="translate(${x} ${y}) scale(${s})"><defs><clipPath id="${id}"><circle r="16"/></clipPath><radialGradient id="${id}g" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#d7e8a2"/><stop offset="1" stop-color="#8fb85a"/></radialGradient></defs>
    <circle r="16" fill="url(#${id}g)"/>
    <g clip-path="url(#${id})" fill="none" stroke="#f1f5df" stroke-width="1.5" stroke-linecap="round"><path d="M-16,-8 C-6,-12 4,-4 16,-9 M-16,2 C-6,-3 6,5 16,0 M-16,11 C-6,6 6,13 16,9 M-9,-16 C-12,-4 -4,6 -9,16 M1,-16 C-3,-4 5,6 1,16 M10,-16 C6,-4 13,6 9,16"/></g>
    <circle r="16" fill="none" stroke="var(--ink)" stroke-width="2.6"/>
    <path d="M0,-16 V-22 M-6,-22 H6" stroke="var(--ink)" stroke-width="4.4" stroke-linecap="round"/><path d="M0,-16 V-22 M-6,-22 H6" stroke="#7d8f3e" stroke-width="2" stroke-linecap="round"/></g>`;
}
// 「き」牌：被念成「いばらぎ」時舉起來糾正。（原本用水戶黃門的印籠，但黑底金色三葉紋縮小後像輻射標誌）
const KI_SIGN = `<g transform="translate(172 74) rotate(8)"><path d="M0,40 V8" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><path d="M0,40 V8" stroke="#c9a46a" stroke-width="2.4" stroke-linecap="round"/>
  <rect x="-18" y="-24" width="36" height="34" rx="4" fill="#fbf8f0" stroke="var(--ink)" stroke-width="2.6"/>
  <circle cy="-7" r="12" fill="none" stroke="#d23b3b" stroke-width="2.4"/>
  <text x="0" y="-1" text-anchor="middle" font-family="'Noto Sans JP','Noto Sans TC',sans-serif" font-weight="700" font-size="17" fill="#2b2626">き</text></g>`;

// --- 栃木縣 ---
// 草莓：尖端朝下坐在頭上，綠色花萼在上；害羞時花萼葉片下垂
function strawberry(mood = 'calm') {
  const seeds = [[86, 28], [96, 24], [106, 25], [116, 29], [90, 38], [100, 35], [110, 38], [95, 47], [105, 47], [100, 54], [82, 34], [119, 37]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="1.3" ry="2" fill="#f6dc6a"/>`).join('');
  const sepal = mood === 'droop' ? 'M100,18 C92,22 84,24 78,30 M100,18 C108,22 116,24 122,30 M100,18 C96,22 92,28 90,32 M100,18 C104,22 108,28 110,32' : 'M100,18 C92,14 84,14 78,18 M100,18 C108,14 116,14 122,18 M100,18 C94,22 88,26 86,30 M100,18 C106,22 112,26 114,30';
  return `<g><path d="M100,60 C84,54 70,40 72,28 C74,18 88,14 100,19 C112,14 126,18 128,28 C130,40 116,54 100,60 Z" fill="#d9364a" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>${seeds}
    <path d="M80,30 C79,35 80,40 83,44" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>
    <path d="${sepal}" fill="none" stroke="var(--ink)" stroke-width="6.5" stroke-linecap="round"/><path d="${sepal}" fill="none" stroke="#5f9b3c" stroke-width="3.6" stroke-linecap="round"/>
    <path d="M100,18 C100,12 102,8 105,5" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><path d="M100,18 C100,12 102,8 105,5" fill="none" stroke="#5f9b3c" stroke-width="2.4" stroke-linecap="round"/></g>`;
}
// 煎餃：胖胖的半月形，頂上一條波浪褶邊，底部平、煎得焦黃（褶畫成放射線會像扇子）
const gyoza = (x, y, rot = 0, s = 1) => { const id = 'gz' + (uid++); const G = 'M-21,8 C-22,-2 -14,-10 0,-10 C14,-10 22,-2 21,8 Z'; return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
  <defs><clipPath id="${id}"><path d="${G}"/></clipPath></defs><path d="${G}" fill="#f6ecd2"/>
  <g clip-path="url(#${id})"><path d="M-24,3 C-10,6 10,6 24,3 V12 H-24 Z" fill="#d9993e"/><path d="M-18,0 C-8,-4 8,-4 18,0" fill="none" stroke="#e6d6ad" stroke-width="1.6"/></g>
  <path d="${G}" fill="none" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M-18,-2 q3,-7 6,-1 q3,-7 6,-1 q3,-6 6,0 q3,-6 6,0 q3,-7 6,1 q3,-7 6,1 Z" fill="#f6ecd2" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/></g>`; };
const BLUSH = '<g fill="#f08b9a" opacity=".55"><ellipse cx="72" cy="114" rx="7" ry="4"/><ellipse cx="128" cy="114" rx="7" ry="4"/></g>';

// --- 群馬縣 ---
// 高崎達摩：紅身、白臉、眉是鶴、鬍子是龜；目標達成前只點一隻眼
function daruma(mood = 'one') {
  return `<g transform="translate(100 30)"><g class="${mood === 'shake' ? 'shake' : ''}">
    <path d="M0,-24 C17,-24 24,-10 24,4 C24,18 14,25 0,25 C-14,25 -24,18 -24,4 C-24,-10 -17,-24 0,-24 Z" fill="#c8323a" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="0" cy="-5" rx="14" ry="11.5" fill="#fbf5ea" stroke="var(--ink)" stroke-width="2.2"/>
    <path d="M-12,-12 C-9,-16 -4,-15 -2,-12 M12,-12 C9,-16 4,-15 2,-12" fill="none" stroke="var(--ink)" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="-6" cy="-6" r="3.6" fill="#fff" stroke="var(--ink)" stroke-width="1.8"/><circle cx="6" cy="-6" r="3.6" fill="#fff" stroke="var(--ink)" stroke-width="1.8"/>
    ${mood !== 'none' ? '<circle cx="-6" cy="-6" r="2" fill="var(--ink)"/>' : ''}
    <path d="M-1,2 C-4,0 -8,1 -11,5 M1,2 C4,0 8,1 11,5" fill="none" stroke="var(--ink)" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M-15,12 C-8,16 8,16 15,12" fill="none" stroke="#e1bf55" stroke-width="2.4" stroke-linecap="round"/><path d="M-10,18 h20" stroke="#e1bf55" stroke-width="2" stroke-linecap="round"/></g></g>`;
}
// 上毛かるた的「つ」札：紅圈裡的假名，下面是展翅的鶴（「鶴舞う形の群馬県」）
const karuta = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <rect x="-14" y="-19" width="28" height="38" rx="3" fill="#fbf5e6" stroke="var(--ink)" stroke-width="2.6"/>
  <circle cx="-5" cy="-10" r="6.5" fill="#fff" stroke="#c8323a" stroke-width="2"/>
  <text x="-5" y="-6.5" text-anchor="middle" font-family="'Noto Serif JP','Noto Serif TC',serif" font-weight="700" font-size="10" fill="#2b2626">つ</text>
  <g>
  <path d="M-4,9.4 L-13,11.4" stroke="var(--ink)" stroke-width="1.3" stroke-linecap="round"/><path d="M-5,7 L-9,5.6 L-7.6,9.4 Z" fill="var(--ink)"/>
  <ellipse cx="-1" cy="8" rx="5.6" ry="2.6" fill="#fff" stroke="var(--ink)" stroke-width="1.2"/>
  <path d="M3,7.4 L9.4,4" stroke="var(--ink)" stroke-width="1.8" stroke-linecap="round"/><circle cx="10" cy="3.6" r="1.6" fill="#fff" stroke="var(--ink)" stroke-width="1"/><circle cx="10.2" cy="2.7" r=".8" fill="#c8323a"/>
  <path d="M11.4,3.9 L13.6,4.6" stroke="var(--ink)" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M-5,7 C-6,2 -3,-2 3,-4 C2.4,-2 3.4,-1 2.4,1 C3.6,2 2.6,4 2.6,7 Z" fill="#fff" stroke="var(--ink)" stroke-width="1.2" stroke-linejoin="round"/>
  <path d="M3,-4 C1,-3.4 -.4,-2 -1,0 L1.6,-.6 Z" fill="var(--ink)"/></g></g>`;
// 焼きまんじゅう：竹籤串四顆，刷上甜味噌醬
const YAKIMAN = `<g transform="translate(38 150) rotate(-20)"><path d="M0,-34 V30" stroke="var(--ink)" stroke-width="4.5" stroke-linecap="round"/><path d="M0,-34 V30" stroke="#d9c07a" stroke-width="2" stroke-linecap="round"/>
  ${[-22, -8, 6, 20].map(y => `<ellipse cx="0" cy="${y}" rx="11" ry="7.5" fill="#c9782f" stroke="var(--ink)" stroke-width="2.3"/><path d="M-6,${y - 3} q6,-3 12,0" fill="none" stroke="#e9a35a" stroke-width="2" stroke-linecap="round"/>`).join('')}</g>`;

// --- 埼玉縣 ---
// 川越「時の鐘」：三層木造鐘樓，最上層掛著鐘；開心時鐘會擺動
// 屋簷：兩端上翹
const eave = (y, w, c = '#3a3838') => `<path d="M${100 - w + 7},${y - 5} H${100 + w - 7} Q${100 + w - 3},${y - 1} ${100 + w + 1},${y - 3} L${100 + w - 1},${y + 1} Q100,${y + 4} ${100 - w + 1},${y + 1} L${100 - w - 1},${y - 3} Q${100 - w + 3},${y - 1} ${100 - w + 7},${y - 5} Z" fill="${c}" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>`;
function tokinokane(mood = 'calm') {
  // 照川越的時の鐘：下段是直條木板的高塔身，中間一圈大屋簷，上面是看得到鐘的開放鐘樓，頂上寶形屋頂
  return `<g transform="translate(0 2)">
    <path d="M88,56 L89,30 H111 L112,56 Z" fill="#6b4a32" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M93,32 V56 M97,32 V56 M101,32 V56 M105,32 V56 M109,32 V56" stroke="#4a3222" stroke-width="1.2"/><path d="M88.6,42 H111.4" stroke="#4a3222" stroke-width="1.6"/>
    ${eave(30, 20)}
    <rect x="89" y="21" width="22" height="5" fill="#6b4a32" stroke="var(--ink)" stroke-width="2"/><path d="M93,21 V26 M97,21 V26 M101,21 V26 M105,21 V26 M109,21 V26" stroke="#4a3222" stroke-width="1"/>
    <path d="M91,21 V9 M109,21 V9" stroke="var(--ink)" stroke-width="4.4" stroke-linecap="round"/><path d="M91,21 V9 M109,21 V9" stroke="#6b4a32" stroke-width="2" stroke-linecap="round"/>
    <g class="${mood === 'ring' ? 'swing' : ''}"><path d="M100,9 V11 M96,14 C96,10 104,10 104,14 L105,20 H95 Z" fill="#8a8a7a" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/></g>
    ${eave(9, 17)}<path d="M94,4 L100,0 L106,4 Z" fill="#3a3838" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/><path d="M100,0 V-3" stroke="var(--ink)" stroke-width="2.4" stroke-linecap="round"/>
    ${mood === 'ring' ? '<path d="M122,12 q5,5 0,10 M128,8 q8,9 0,18 M78,12 q-5,5 0,10 M72,8 q-8,9 0,18" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/>' : ''}</g>`;
}
// 深谷蔥：下段白、上段綠，葉尖分兩股
const negi = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M-5,40 C-5,44 5,44 5,40 V-4 H-5 Z" fill="#f7f6ee" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M-4,42 l-2,4 M0,43 v5 M4,42 l2,4" stroke="var(--ink)" stroke-width="1.4" stroke-linecap="round"/>
  <path d="M-5,-4 C-6,-20 -12,-34 -16,-44 C-8,-36 -2,-28 0,-20 C2,-30 6,-40 12,-48 C8,-34 6,-20 5,-4 Z" fill="#6aa84f" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M-5,-4 H5 V6 H-5 Z" fill="#c9e2a6"/><path d="M-5,-4 V6 M5,-4 V6" stroke="var(--ink)" stroke-width="2.4"/></g>`;

// --- 千葉縣 ---
// 落花生：殼有兩個鼓起、網狀紋；生氣時整顆抖起來
function rakkasei(mood = 'calm') {
  const id = 'rk' + (uid++), P = 'M66,38 C66,24 82,22 88,28 C94,32 106,32 112,28 C118,22 134,24 134,38 C134,52 118,54 112,48 C106,44 94,44 88,48 C82,54 66,52 66,38 Z';
  return `<g class="${mood === 'shake' ? 'shake' : ''}"><g transform="rotate(-6 100 38)"><defs><clipPath id="${id}"><path d="${P}"/></clipPath></defs>
    <path d="${P}" fill="#dcbf8a"/>
    <g clip-path="url(#${id})" fill="none" stroke="#b8945a" stroke-width="1.5"><path d="M64,32 H136 M64,40 H136 M64,48 H136 M74,20 V56 M82,20 V56 M118,20 V56 M126,20 V56 M100,20 V56"/></g>
    <path d="${P}" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/></g></g>`;
}
// 水煮落花生：一碗帶殼的煮花生，冒著熱氣
const YUDE = `<g transform="translate(34 160)"><path d="M-22,-4 H22 C22,8 12,14 0,14 C-12,14 -22,8 -22,-4 Z" fill="#f4efe4" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>
  ${[[-12, -6, -20], [0, -8, 10], [11, -5, -8], [-5, -11, 30], [7, -12, -30]].map(([x, y, r]) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-7,0 C-7,-4 -3,-4 -1,-2 C1,-4 7,-4 7,0 C7,4 1,4 -1,2 C-3,4 -7,4 -7,0 Z" fill="#d6b77e" stroke="var(--ink)" stroke-width="1.6"/></g>`).join('')}
  <path d="M-6,-18 q-4,-5 0,-10 M8,-18 q-4,-5 0,-10" fill="none" stroke="#b9b4aa" stroke-width="2" stroke-linecap="round"/></g>`;
// 飛機：白色客機，藍色窗帶；代表成田機場
const plane = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M-4,-2 L-18,-18 L-12,-18 L4,-2 Z M-4,2 L-18,18 L-12,18 L4,2 Z" fill="#dfe6ee" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M-20,-1 L-26,-9 L-22,-9 L-14,-1 Z M-20,1 L-26,9 L-22,9 L-14,1 Z" fill="#dfe6ee" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
  <path d="M-26,-3.5 H14 C22,-3.5 26,0 26,0 C26,0 22,3.5 14,3.5 H-26 Z" fill="#fff" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M-20,0 H16" stroke="#2f6fb5" stroke-width="1.6"/></g>`;

// --- 神奈川縣 ---
// 港都水手帽：白帽頂、深藍帽帶、黑帽簷、金色錨
const marineCap = `<g>
  <path d="M70,46 C66,30 82,20 100,20 C118,20 134,30 130,46 Z" fill="#fff" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
  <path d="M70,46 L71,38 C88,35 112,35 129,38 L130,46 Z" fill="#23497e" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M72,46 Q100,60 128,46 Q100,52 72,46 Z" fill="#2b2626" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <g transform="translate(100 30)" fill="none" stroke="#e1bf55" stroke-width="2.2" stroke-linecap="round"><path d="M0,-5 V5 M-5,-1 H5 M-5,2 Q0,8 5,2"/><circle cy="-6.5" r="1.8"/></g></g>`;
// 燒賣：圓筒、上緣有褶、頂上露出肉餡，三顆擺在經木盒蓋上
const SHUMAI = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M-22,6 L22,6 L19,13 L-19,13 Z" fill="#e8d3a8" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  ${[-12, 0, 12].map(dx => `<g transform="translate(${dx} 0)"><path d="M-6,6 V-4 C-6,-8 6,-8 6,-4 V6 Z" fill="#f6e7b8" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/><ellipse cy="-5" rx="5" ry="2.4" fill="#d98a72" stroke="var(--ink)" stroke-width="1.5"/><circle cy="-5.2" r="1.6" fill="#5f9b3c" stroke="var(--ink)" stroke-width=".8"/><path d="M-4,-1 v4 M0,-1 v4 M4,-1 v4" stroke="#e0c98a" stroke-width="1.2"/></g>`).join('')}</g>`;
// 黑蛋：一顆拿在手上
const KUROTAMAGO = `<g transform="translate(168 136) rotate(12)"><path d="M0,-13 C7,-13 10,-4 10,2 C10,9 6,13 0,13 C-6,13 -10,9 -10,2 C-10,-4 -7,-13 0,-13 Z" fill="#2b2626" stroke="var(--ink)" stroke-width="2.2"/>
  <path d="M-5,-6 q2,-3 5,-3.6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".8"/></g>`;

// ===== 中部 =====
// --- 新潟縣 ---
// 越光米飯糰：圓角三角形、海苔帶；新米時冒熱氣
function onigiri(mood = 'calm') {
  // 飯糰長出黑色的手腳站在頭上；新米時舉起雙手
  const arms = mood === 'steam' ? 'M75,40 L62,26 M125,40 L138,26' : 'M75,44 L64,54 M125,44 L136,54';
  return `<g transform="translate(0 -18) translate(100 60) scale(.85) translate(-100 -60)">
    <path d="${arms} M93,58 V67 M107,58 V67" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/><path d="M87,68 h9 M104,68 h9" stroke="var(--ink)" stroke-width="4.4" stroke-linecap="round"/>
    <path d="M100,8 C110,8 134,44 130,52 C126,60 74,60 70,52 C66,44 90,8 100,8 Z" fill="#fdfcf6" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
    <path d="M90,22 l2,1 M104,18 l2,-1 M84,36 l2,1 M112,30 l1,2 M98,30 l2,0 M118,42 l2,1 M80,46 l1,-2" stroke="#d9d4c4" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M88,40 H112 L113,58 C104,60 96,60 87,58 Z" fill="#2c3a2c" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  </g>`;
}
// 一升瓶：褐色玻璃瓶、白標籤寫「酒」
const ISSHO = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M-10,34 V-6 C-10,-12 -4,-14 -4,-20 V-30 H4 V-20 C4,-14 10,-12 10,-6 V34 C10,38 -10,38 -10,34 Z" fill="#6b4426" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <rect x="-5" y="-34" width="10" height="6" rx="1.5" fill="#e1bf55" stroke="var(--ink)" stroke-width="2"/>
  <rect x="-8" y="2" width="16" height="22" rx="1.5" fill="#fbf7ec" stroke="var(--ink)" stroke-width="1.6"/>
  <text x="0" y="18" text-anchor="middle" font-family="'Noto Serif JP','Noto Serif TC',serif" font-weight="700" font-size="11" fill="#2b2626">酒</text>
  <path d="M-7,-4 V0 M-7,26 V30" stroke="#a5784e" stroke-width="2" stroke-linecap="round" opacity=".7"/></g>`;

// --- 富山縣 ---
// 螢烏賊：紅褐色外套膜朝上、鰭在頂端、腳搭在頭上，身上有藍色發光點；開心時整隻發光
function hotaruika(mood = 'calm') {
  const dots = [[100, 18], [95, 26], [105, 26], [100, 33], [92, 36], [108, 36]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#5fd0ff" stroke="#2a7fb0" stroke-width=".8"/>`).join('');
  const glow = mood === 'glow' ? '<ellipse cx="100" cy="30" rx="34" ry="30" fill="#9fe6ff" opacity=".35"/><ellipse cx="100" cy="30" rx="24" ry="22" fill="#c9f2ff" opacity=".45"/>' : '';
  const legs = 'M94,40 C86,48 78,52 70,50 M96,42 C92,50 86,56 80,56 M104,42 C108,50 114,56 120,56 M106,40 C114,48 122,52 130,50 M99,43 C98,51 95,57 92,58 M101,43 C102,51 105,57 108,58';
  return `<g>${glow}
    <path d="${legs}" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><path d="${legs}" fill="none" stroke="#c97f7f" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M100,2 C94,8 88,16 88,26 C88,36 92,44 100,46 C108,44 112,36 112,26 C112,16 106,8 100,2 Z" fill="#c97f7f" stroke="var(--ink)" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="M100,2 C94,4 88,6 84,12 C90,14 94,12 96,9 Z M100,2 C106,4 112,6 116,12 C110,14 106,12 104,9 Z" fill="#c97f7f" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
    ${dots}<circle cx="93" cy="41" r="3" fill="var(--ink)"/><circle cx="107" cy="41" r="3" fill="var(--ink)"/></g>`;
}
// 鱒壽司：木製圓盒（わっぱ）、竹葉鋪底，上面是粉紅色的鱒魚
const masuzushi = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M-20,0 V10 C-20,17 20,17 20,10 V0 Z" fill="#dcbc84" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M-20,6 C-20,12 20,12 20,6" fill="none" stroke="#b8935a" stroke-width="1.6"/>
  <ellipse rx="20" ry="7.5" fill="#6aa84f" stroke="var(--ink)" stroke-width="2.4"/>
  <ellipse rx="14.5" ry="5" fill="#f0907f" stroke="var(--ink)" stroke-width="1.6"/><path d="M-10,1 L-6,-3 M-5,3 L0,-3.4 M1,3.4 L6,-3 M6,2.6 L10,-1" fill="none" stroke="#fbd0c4" stroke-width="1.4" stroke-linecap="round"/></g>`;
// 存錢：一疊硬幣和一枚立著的「円」幣
const CHOKIN = `<g transform="translate(32 158)">${[10, 5, 0, -5].map(y => `<ellipse cy="${y}" rx="11" ry="4" fill="#e1bf55" stroke="var(--ink)" stroke-width="2"/>`).join('')}
  <g transform="translate(14 -14)"><circle r="9" fill="#e1bf55" stroke="var(--ink)" stroke-width="2.2"/><circle r="6.4" fill="none" stroke="#b8942e" stroke-width="1.2"/><text y="3.6" text-anchor="middle" font-size="9.5" font-weight="700" fill="#7a5a1a">円</text></g></g>`;

// --- 石川縣 ---
// 兼六園的雪吊：中央一根竹竿，頂端放射出多條繩子拉住松枝；參考圖的關鍵是又高又尖的繩索圓錐（設定/參考卡.md）
function yukitsuri() {
  const tips = Array.from({ length: 13 }, (_, i) => 76 + i * 4).map(x => [x, 40 - (1 - ((x - 100) / 24) ** 2) * 6]);
  return `<g>
    <path d="M66,44 C62,38 70,33 77,35 C80,29 90,29 93,33 C97,28 105,28 108,33 C112,29 122,29 124,35 C131,33 138,38 134,44 C128,50 72,50 66,44 Z" fill="#2f6a40" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M80,30 C78,24 86,21 91,23 C94,18 106,18 109,23 C114,21 122,24 120,30 C112,33 88,33 80,30 Z" fill="#3f7a4e" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M72,41 c4,-3 8,-3 11,0 M94,38 c4,-3 8,-3 11,0 M116,41 c4,-3 8,-3 11,0 M90,27 c3,-3 7,-3 10,0" fill="none" stroke="#5f9b6c" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M100,46 V-1" stroke="var(--ink)" stroke-width="4.4" stroke-linecap="round"/><path d="M100,46 V-1" stroke="#d9c07a" stroke-width="2" stroke-linecap="round"/>
    <path d="${tips.map(([x, y]) => `M100,0 L${x.toFixed(1)},${y.toFixed(1)}`).join(' ')}" stroke="#8a6a3a" stroke-width="1.3"/>
    <circle cx="100" cy="0" r="2.6" fill="#e1bf55" stroke="var(--ink)" stroke-width="1.6"/></g>`;
}
// 收起來的和傘：紅色傘面、竹骨、白色綁帶
const wagasa = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M0,0 V-14" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><path d="M0,0 V-14" stroke="#a5683a" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M0,-74 C3,-62 8,-34 6,-14 L-6,-14 C-8,-34 -3,-62 0,-74 Z" fill="#b8322e" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M-3,-18 C-4,-34 -2,-56 0,-70 M3,-18 C4,-34 2,-56 0,-70" fill="none" stroke="#8a2420" stroke-width="1.2"/>
  <path d="M-6,-40 H6" stroke="#fff" stroke-width="2.4"/><path d="M0,-74 V-80" stroke="var(--ink)" stroke-width="2.6" stroke-linecap="round"/></g>`;
// 打開的和傘：紅色傘面、竹骨放射、白色圈
const WAGASA_OPEN = `<g><path d="M160,112 L163,44" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><path d="M160,112 L163,44" stroke="#a5683a" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M130,48 L163,16 L196,48 Q187,44 179,48 Q171,44 163,48 Q155,44 147,48 Q139,44 130,48 Z" fill="#b8322e" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M163,16 L139,46 M163,16 L151,46 M163,16 V47 M163,16 L175,46 M163,16 L187,46" stroke="#8a2420" stroke-width="1.3"/>
  <path d="M152,27 Q163,23 174,27" fill="none" stroke="#fff" stroke-width="2.6"/><path d="M163,16 V10" stroke="var(--ink)" stroke-width="2.8" stroke-linecap="round"/></g>`;
const GOLDLEAF = '<g fill="#e1bf55" stroke="#b8942e" stroke-width=".8">' + [[30, 70, 20], [44, 50, -15], [168, 58, 30], [176, 84, -10], [26, 100, 40], [158, 36, 10]].map(([x, y, r]) => `<rect x="${x - 4}" y="${y - 4}" width="8" height="8" transform="rotate(${r} ${x} ${y})"/>`).join('') + '</g>';

// --- 福井縣 ---
// 小恐龍：福井盜龍風格，綠色、長尾巴、小前肢，坐在頭上；吼叫時張嘴並抖動
function dino(mood = 'calm') {
  return `<g class="${mood === 'roar' ? 'shake' : ''}">
    <path d="M110,40 C124,40 132,30 138,14 C140,24 136,40 120,48 Z" fill="#6fae5c" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M94,44 v10 M108,44 v10 M91,40 L84,45" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><path d="M94,44 v10 M108,44 v10 M91,40 L84,45" stroke="#6fae5c" stroke-width="2.6" stroke-linecap="round"/>
    <ellipse cx="102" cy="40" rx="16" ry="11" fill="#6fae5c" stroke="var(--ink)" stroke-width="2.8"/>
    <path d="M94,45 C99,48 107,48 112,45" fill="none" stroke="#b9dca0" stroke-width="3" stroke-linecap="round"/>
    <path d="M90,34 C86,24 80,16 74,14 C66,12 60,18 62,24 C64,28 70,28 74,27 C78,28 82,32 86,38 Z" fill="#6fae5c" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
    ${mood === 'roar' ? '<path d="M62,23 L70,27 L62,29 Z" fill="#c8323a" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/>' : '<path d="M63,24 C66,25 70,25 72,24" fill="none" stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round"/>'}
    <circle cx="72" cy="19" r="2.2" fill="var(--ink)"/>
    <path d="M82,16 l3,-3 M88,22 l4,-2 M96,30 l4,-1" stroke="#4f8f3e" stroke-width="2" stroke-linecap="round"/></g>`;
}
// 鯖江眼鏡：細框圓眼鏡，戴在臉上，鏡片範圍包住眼睛
const MEGANE = '<g><circle cx="85" cy="102" r="12" fill="#dff1ff" fill-opacity=".25" stroke="var(--ink)" stroke-width="2.6"/><circle cx="115" cy="102" r="12" fill="#dff1ff" fill-opacity=".25" stroke="var(--ink)" stroke-width="2.6"/><path d="M97,100 q3,-3 6,0 M73,100 L60,96 M127,100 L140,96" fill="none" stroke="var(--ink)" stroke-width="2.6" stroke-linecap="round"/></g>';
// 冬天的水羊羹：扁平紙盒裡一整片黑糖羊羹，附一支小刮板
// 右手拿紙盒，左手拿一端削尖的竹籤
const MIZUYOKAN = `<g transform="translate(166 146) rotate(-8)"><rect x="-20" y="-9" width="40" height="18" rx="2" fill="#f4e7c8" stroke="var(--ink)" stroke-width="2.4"/>
  <rect x="-16" y="-5.5" width="32" height="11" rx="1.5" fill="#5a3322" stroke="var(--ink)" stroke-width="1.6"/><path d="M-12,-2.5 H6" stroke="#8a5a40" stroke-width="1.6" stroke-linecap="round"/></g>
  <g transform="translate(30 146) rotate(-24)"><path d="M-2.2,8 L-2.2,-24 L0,-32 L2.2,-24 L2.2,8 Z" fill="#e8d3a8" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/></g>`;

// --- 山梨縣 ---
// 巨峰葡萄：倒三角形的一串，紫色，頂上有梗和一片葉
function grapes() {
  const pts = [[82, 16], [94, 14], [106, 14], [118, 16], [88, 27], [100, 26], [112, 27], [94, 38], [106, 38], [100, 48]];
  return `<g transform="translate(0 6)"><path d="M100,10 C100,4 104,0 108,-1" fill="none" stroke="var(--ink)" stroke-width="4.6" stroke-linecap="round"/><path d="M100,10 C100,4 104,0 108,-1" fill="none" stroke="#7d6a3e" stroke-width="2" stroke-linecap="round"/>
    <path d="M104,4 C110,-4 124,-4 130,2 C124,10 112,10 104,4 Z" fill="#7fb04a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
    ${pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7.4" fill="#5e3a86" stroke="var(--ink)" stroke-width="2.2"/><circle cx="${x - 2.5}" cy="${y - 2.5}" r="1.8" fill="#fff" opacity=".75"/>`).join('')}</g>`;
}
// 風林火山旗：深藍底、金字
const furinkazan = (x, y) => `<g transform="translate(${x} ${y})">
  <path d="M0,0 V-92" stroke="var(--ink)" stroke-width="4.6" stroke-linecap="round"/><path d="M0,0 V-92" stroke="#a5683a" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M0,-88 H22" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>
  <rect x="2" y="-86" width="20" height="52" fill="#1f2f55" stroke="var(--ink)" stroke-width="2.4"/>
  ${['風', '林', '火', '山'].map((c, i) => `<text x="12" y="${-73 + i * 12}" text-anchor="middle" font-family="'Noto Serif JP','Noto Serif TC',serif" font-weight="700" font-size="10.5" fill="#e1bf55">${c}</text>`).join('')}</g>`;
// 富士山要比葡萄高，平頂和雪頂才露得出來
const FUJI_BACK = '<path d="M-70,190 C10,120 48,40 66,-1 H134 C152,40 190,120 270,190 Z" fill="#6c86b8" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/><path d="M66,-1 H134 C139,10 144,22 150,34 L142,30 L134,40 L124,31 L112,41 L100,33 L88,41 L76,31 L66,40 L58,30 L50,34 C56,22 61,10 66,-1 Z" fill="#fff" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>';

// --- 長野縣 ---
// 雪猴：地獄谷的日本獼猴，灰褐毛、粉紅臉，頭頂積雪
function snowMonkey(face = 'base') {
  const dots = '<circle cx="95" cy="23" r="1.8" fill="var(--ink)"/><circle cx="105" cy="23" r="1.8" fill="var(--ink)"/>';
  const arcs = '<path d="M93,24 q2,-2.6 4,0 M103,24 q2,-2.6 4,0" fill="none" stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round"/>';
  const F = {
    serious: dots + '<path d="M92,18.5 l4,2 M108,18.5 l-4,2 M97,30 h6" fill="none" stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round"/>',
    open: arcs + '<path d="M97,28.5 h6 l-3,3.6 Z" fill="var(--ink)" stroke="var(--ink)" stroke-width="1" stroke-linejoin="round"/>',
    smileW: arcs + '<path d="M97,29.5 q3,2.4 6,0" fill="none" stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round"/>',
    flat: dots + '<path d="M97,30 h6" fill="none" stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round"/>',
  };
  const mf = F[face] || dots + '<path d="M97,30 q3,2 6,0" fill="none" stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round"/>';
  return `<g>
    <ellipse cx="100" cy="44" rx="20" ry="12" fill="#a89b8a" stroke="var(--ink)" stroke-width="2.8"/>
    <circle cx="84" cy="23" r="5" fill="#a89b8a" stroke="var(--ink)" stroke-width="2.4"/><circle cx="116" cy="23" r="5" fill="#a89b8a" stroke="var(--ink)" stroke-width="2.4"/>
    <circle cx="100" cy="24" r="15" fill="#a89b8a" stroke="var(--ink)" stroke-width="2.8"/>
    <path d="M100,16 C94,12 86,16 88,24 C89,32 96,36 100,36 C104,36 111,32 112,24 C114,16 106,12 100,16 Z" fill="#e9958c" stroke="var(--ink)" stroke-width="2"/>
    ${mf}
    <path d="M88,10 C90,4 110,4 112,10 C108,12 92,12 88,10 Z" fill="#fff" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/></g>`;
}
// 冰斧：登山用，金屬斧頭（一邊尖鎬、一邊扁鏟）
const pickel = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M0,0 V-70" stroke="var(--ink)" stroke-width="5.4" stroke-linecap="round"/><path d="M0,0 V-70" stroke="#d98a3a" stroke-width="2.8" stroke-linecap="round"/>
  <path d="M-3,-68 C-10,-70 -18,-66 -24,-58 C-16,-62 -10,-64 -3,-62 Z M3,-72 H14 L15,-64 H3 Z" fill="#c9d0d8" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <rect x="-3.5" y="-74" width="7" height="14" rx="1.5" fill="#9aa4ae" stroke="var(--ink)" stroke-width="2"/></g>`;
const NOTES = '<g fill="var(--ink)" stroke="var(--ink)" stroke-width="2.2" stroke-linecap="round"><ellipse cx="162" cy="58" rx="5" ry="3.8" transform="rotate(-20 162 58)"/><path d="M166,57 V36 l8,4" fill="none"/><ellipse cx="34" cy="78" rx="5" ry="3.8" transform="rotate(-20 34 78)"/><ellipse cx="48" cy="74" rx="5" ry="3.8" transform="rotate(-20 48 74)"/><path d="M38,77 V58 L52,54 V73" fill="none"/></g>';

// --- 岐阜縣 ---
// 白川鄉合掌造：陡峭的茅草三角屋頂，正面山牆有窗
function gassho() {
  const id = 'gs' + (uid++), R = 'M62,58 L100,2 L138,58 Z';
  return `<g><defs><clipPath id="${id}"><path d="${R}"/></clipPath></defs>
    <path d="${R}" fill="#c9a35a"/><g clip-path="url(#${id})" stroke="#a9853d" stroke-width="1.4"><path d="M60,20 H140 M60,32 H140 M60,44 H140 M60,54 H140"/></g>
    <path d="M84,58 L100,30 L116,58 Z" fill="#7a5a3a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
    <rect x="94" y="40" width="12" height="7" fill="#f6e3a4" stroke="var(--ink)" stroke-width="1.4"/><rect x="90" y="50" width="20" height="6" fill="#f6e3a4" stroke="var(--ink)" stroke-width="1.4"/>
    <path d="M100,46 V40 M100,56 V50 M95,53 H105" stroke="#7a5a3a" stroke-width="1"/>
    <path d="${R}" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/><path d="M94,10 L100,2 L106,10" fill="none" stroke="#5a4636" stroke-width="4" stroke-linejoin="round"/></g>`;
}
// 富有柿：扁圓、橘色、四瓣綠色花萼
const kaki = (x, y, s = 1) => { const id = 'kk' + (uid++); return `<g transform="translate(${x} ${y}) scale(${s})"><defs><radialGradient id="${id}" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#f6b46a"/><stop offset="1" stop-color="#e2722c"/></radialGradient></defs>
  <path d="M0,-11 C12,-12 18,-4 17,3 C16,11 8,14 0,14 C-8,14 -16,11 -17,3 C-18,-4 -12,-12 0,-11 Z" fill="url(#${id})" stroke="var(--ink)" stroke-width="2.6"/>
  <path d="M0,-11 C-4,-16 -10,-15 -12,-11 C-8,-9 -4,-9 0,-11 Z M0,-11 C4,-16 10,-15 12,-11 C8,-9 4,-9 0,-11 Z M0,-11 C-3,-7 -2,-4 0,-3 C2,-4 3,-7 0,-11 Z" fill="#5f8f3a" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M0,-12 V-17" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/></g>`; };

// --- 靜岡縣 ---
// 富士山：藍色山體、白色雪頂（邊緣鋸齒）
const FUJI_HAT = `<g><path d="M60,56 L88,14 Q100,8 112,14 L140,56 Z" fill="#3e5c9a" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
  <path d="M88,14 Q100,8 112,14 L120,26 L113,23 L107,29 L100,23 L93,29 L87,23 L80,26 Z" fill="#fff" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/></g>`;
// 湯吞：陶杯裡的綠茶，冒熱氣
const yunomi = (x, y, steam = true) => `<g transform="translate(${x} ${y})">
  ${steam ? '<path d="M-4,-16 q-4,-5 0,-10 M5,-16 q-4,-5 0,-10" fill="none" stroke="#b9b4aa" stroke-width="2.2" stroke-linecap="round"/>' : ''}
  <path d="M-12,-10 H12 L10,10 C10,14 -10,14 -10,10 Z" fill="#e8e0cc" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M-11,0 H11" stroke="#7a9a6a" stroke-width="2"/><ellipse cy="-10" rx="12" ry="3.5" fill="#a5c25a" stroke="var(--ink)" stroke-width="2.2"/></g>`;

// --- 愛知縣 ---
// 金鯱：名古屋城屋頂的金色鯱，魚身拱起、尾巴朝天、頭像虎
function kinshachi(mood = 'calm') {
  const id = 'ks' + (uid++), B = 'M72,50 C66,40 70,28 82,26 C90,25 96,30 102,32 C112,34 118,28 120,18 L126,12 C128,24 126,36 116,44 C104,54 84,56 72,50 Z';
  return `<g class="${mood === 'shake' ? 'shake' : ''}"><defs><clipPath id="${id}"><path d="${B}"/></clipPath><linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6d66a"/><stop offset="1" stop-color="#d49a2a"/></linearGradient></defs>
    <path d="M120,18 C116,6 118,-2 122,-4 C124,4 128,6 132,4 C134,10 130,16 126,16 Z M120,18 C124,6 132,0 138,2 C134,8 132,14 126,16 Z" fill="#e8b84a" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M84,31 L82,18 L88,23 L90,14 L95,23 L100,17 L101,34 Z" fill="#e8b84a" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/><path d="M88,51 L85,61 L94,55 Z M101,51 L102,61 L110,54 Z" fill="#e8b84a" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="${B}" fill="url(#${id}g)"/>
    <g clip-path="url(#${id})" fill="none" stroke="#b07a1e" stroke-width="1.3">${[[86, 40], [96, 42], [106, 40], [92, 48], [102, 48], [112, 44], [114, 34], [118, 26]].map(([x, y]) => `<path d="M${x - 4},${y} a4,4 0 0,0 8,0"/>`).join('')}</g>
    <path d="${B}" fill="none" stroke="var(--ink)" stroke-width="2.8" stroke-linejoin="round"/>
    <circle cx="78" cy="34" r="3.6" fill="#fff" stroke="var(--ink)" stroke-width="1.6"/><circle cx="77" cy="34" r="1.8" fill="var(--ink)"/>
    <path d="M70,44 C74,46 78,46 80,44" fill="none" stroke="var(--ink)" stroke-width="1.8" stroke-linecap="round"/><path d="M73,45 l1,3 l2,-3" fill="#fff" stroke="var(--ink)" stroke-width="1"/>
    <path d="M71,28.5 C74,25 80,24.5 85,28" fill="none" stroke="var(--ink)" stroke-width="3.6" stroke-linecap="round"/></g>`;
}
// 味噌豬排：筷子夾著一塊淋了赤味噌醬的炸豬排
// 味噌豬排：盤子上切成四塊，淋赤味噌醬
const misokatsu = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <ellipse cy="4" rx="22" ry="8" fill="#fbfbf8" stroke="var(--ink)" stroke-width="2.4"/>
  ${[-12, -4, 4, 12].map((dx, i) => `<g transform="translate(${dx} ${-1 - (i % 2)})"><rect x="-3.6" y="-6" width="7.2" height="12" rx="2" fill="#d9993e" stroke="var(--ink)" stroke-width="1.8"/><path d="M-3.6,-3.6 h7.2" stroke="#5a2a1a" stroke-width="4.4"/><path d="M-1.6,3 h1.4" stroke="#f2c47a" stroke-width="1.4" stroke-linecap="round"/></g>`).join('')}</g>`;
const EBIFRY = `<g transform="translate(36 152) rotate(-30)"><path d="M-22,-6 C-10,-10 12,-9 18,-4 C20,0 18,4 14,5 C4,7 -12,7 -22,5 C-26,3 -26,-4 -22,-6 Z" fill="#e2a64a" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <g fill="#f2c47a"><circle cx="-14" cy="-2" r="1.6"/><circle cx="-6" cy="1" r="1.6"/><circle cx="2" cy="-3" r="1.6"/><circle cx="9" cy="1" r="1.6"/></g>
  <path d="M17,-3 L28,-10 L26,0 L30,6 L17,3 Z" fill="#d8463c" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/></g>`;

// ===== 近畿 =====
// --- 三重縣 ---
// 伊勢神宮的神明鳥居：不上漆的白木、筆直的笠木（兩端不翹）、一根貫
const SHINMEI = `<g>
  <path d="M80,56 V18 M120,56 V18" stroke="var(--ink)" stroke-width="9" stroke-linecap="round"/><path d="M80,56 V18 M120,56 V18" stroke="#e2c897" stroke-width="5.4" stroke-linecap="round"/>
  <rect x="74" y="26" width="52" height="6" rx="1.5" fill="#e2c897" stroke="var(--ink)" stroke-width="2.4"/>
  <rect x="64" y="10" width="72" height="9" rx="2" fill="#e2c897" stroke="var(--ink)" stroke-width="2.6"/>
  <path d="M70,14.5 H130 M80,40 V50 M120,40 V50" stroke="#c4a46a" stroke-width="1.2"/></g>`;
// 珍珠項鍊：從手上垂下一圈珍珠，中間一顆大的（貝殼畫成圓形加中間一顆珠，會像寶可夢球）
const pearl = (x, y) => `<g>
  ${Array.from({ length: 13 }, (_, i) => { const a = Math.PI * 2 * i / 13; return `<circle cx="${(x - 2 + 17 * Math.sin(a)).toFixed(1)}" cy="${(y + 14 - 17 * Math.cos(a)).toFixed(1)}" r="4" fill="#fbf8f2" stroke="var(--ink)" stroke-width="1.5"/>`; }).join('')}
  <circle cx="${x - 2}" cy="${y + 33}" r="6" fill="#fbf8f2" stroke="var(--ink)" stroke-width="1.8"/><circle cx="${x - 4}" cy="${y + 31}" r="1.8" fill="#fff"/></g>`;
// 手裏剣：伊賀忍者
const SHURIKEN = '<g transform="translate(30 70) rotate(15)"><path d="M0,-14 L4,-4 L14,0 L4,4 L0,14 L-4,4 L-14,0 L-4,-4 Z" fill="#6b7480" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/><circle r="3" fill="#fff" stroke="var(--ink)" stroke-width="1.6"/></g><path d="M44,62 l10,-4 M46,70 l12,0" stroke="#b9b4aa" stroke-width="2" stroke-linecap="round"/>';

// --- 滋賀縣 ---
// 琵琶湖徽章：肚子上一枚圓形徽章，裡面是湖形（北湖大、南湖小）。直接把湖形畫在身上會像眼淚或打翻的水
// 琵琶湖：照實際湖形，北湖寬、往西南收窄成細長的南湖；只加黑色描邊，不加外圈
const BIWAKO = '<g transform="translate(100 146) scale(1.15) translate(-23.5 -33.5)"><path d="M30,11 C33,13 36,19 37,24 C38,29 35,33 30,35 C26,37 22,38 20,41 C18,44 17,49 15,53 C14,55 12,56 11,54 C10,51 12,46 13,42 C13,37 14,33 16,30 C19,25 24,19 27,14 C28,12 29,11 30,11 Z" fill="#5aa6d8" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/></g>';
// 信樂燒狸貓：斗笠、大肚子、手提酒壺
const tanuki = (mood = 'calm') => `<g transform="translate(100 32)"><g class="${mood === 'shake' ? 'shake' : ''}">
  <ellipse cy="12" rx="16" ry="14" fill="#8a5a3b" stroke="var(--ink)" stroke-width="2.6"/><ellipse cy="15" rx="10" ry="9" fill="#e9d2a8" stroke="var(--ink)" stroke-width="1.8"/>
  <circle cy="-6" r="11" fill="#8a5a3b" stroke="var(--ink)" stroke-width="2.6"/><ellipse cy="-3" rx="8" ry="5.5" fill="#e9d2a8"/>
  <ellipse cx="-4" cy="-6" rx="3.4" ry="2.6" fill="#4a3022"/><ellipse cx="4" cy="-6" rx="3.4" ry="2.6" fill="#4a3022"/><circle cx="-4" cy="-6" r="1.2" fill="#fff"/><circle cx="4" cy="-6" r="1.2" fill="#fff"/><path d="M-2.8,2.6 L0,-.6 L2.8,2.6" fill="none" stroke="var(--ink)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><circle cy="-1" r="1.8" fill="var(--ink)"/>
  <path d="M-16,-13 Q0,-26 16,-13 Q0,-10 -16,-13 Z" fill="#d9c07a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <g transform="translate(18 10)"><path d="M-2,-6 h4 v3 c4,1 5,4 5,8 c0,4 -3,6 -7,6 c-4,0 -7,-2 -7,-6 c0,-4 1,-7 5,-8 Z" fill="#f4ecd8" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/></g></g></g>`;
// 飛び出しぼうや：滋賀發源的「小孩衝出來」注意看板，紅衣藍褲、往前跑的姿勢，釘在木樁上
// 照實際的看板：大頭、黑色妹妹頭、圓眼、紅上衣、橘褲子跨步、咖啡色鞋，釘在柱子上
const tobidashi = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M0,24 V0" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><path d="M0,24 V0" stroke="#d98a3a" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M-2,0 L-10,10 M2,0 L9,11" stroke="var(--ink)" stroke-width="7.6" stroke-linecap="round"/><path d="M-2,0 L-10,10 M2,0 L9,11" stroke="#f0a030" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="-12" cy="11" rx="4" ry="3" fill="#5a3322" stroke="var(--ink)" stroke-width="1.6"/><ellipse cx="11" cy="13" rx="4" ry="3" fill="#5a3322" stroke="var(--ink)" stroke-width="1.6"/>
  <path d="M-4,-10 L-13,-5 M4,-10 L13,-12" stroke="var(--ink)" stroke-width="5.6" stroke-linecap="round"/><path d="M-4,-10 L-13,-5 M4,-10 L13,-12" stroke="#f2b8b8" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M-6,-13 H6 L5,1 H-5 Z" fill="#d23b33" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
  <circle cx="1" cy="-23" r="9" fill="#f6c3c0" stroke="var(--ink)" stroke-width="2"/>
  <path d="M-8,-21 C-10,-30 -4,-33 2,-33 C7,-33 10,-30 10,-27 C6,-29 2,-29 -1,-27 C-3,-25 -4,-21 -8,-21 Z" fill="#2b2626" stroke="var(--ink)" stroke-width="1.4" stroke-linejoin="round"/>
  <ellipse cx="2" cy="-23" rx="1.6" ry="2.2" fill="var(--ink)"/><ellipse cx="7" cy="-23" rx="1.6" ry="2.2" fill="var(--ink)"/>
  <path d="M5,-20 l1,1.2 M3.4,-17.4 q1.8,-1.2 3.6,0" fill="none" stroke="var(--ink)" stroke-width="1.1" stroke-linecap="round"/></g>`;

// --- 大阪府 ---
// 章魚燒：舟形紙盤上六顆，醬汁、美乃滋、青海苔，柴魚片會跟著晃
function takoyaki(still) {
  const balls = [[84, 40], [100, 38], [116, 40], [90, 30], [110, 30], [100, 24]];
  return `<g>
    ${balls.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="#c98a3e" stroke="var(--ink)" stroke-width="2.2"/><path d="M${x - 7},${y - 2} C${x - 5},${y - 8} ${x + 5},${y - 8} ${x + 7},${y - 2} C${x + 4},${y} ${x - 4},${y} ${x - 7},${y - 2} Z" fill="#5a2a1a"/>`).join('')}
    <path d="M78,34 l4,-3 l4,3 l4,-3 l4,3 M96,24 l4,-3 l4,3 l4,-3 l4,3 M106,36 l4,-3 l4,3 l4,-3" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="#5f9b3c"><circle cx="88" cy="38" r="1"/><circle cx="104" cy="28" r="1"/><circle cx="112" cy="40" r="1"/><circle cx="94" cy="30" r="1"/></g>
    <path d="M62,44 L138,44 L132,53 L68,53 Z" fill="#f4ecd8" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
    <g class="${still ? '' : 'swing'}">${[[88, 23, -40], [100, 15, -30], [112, 23, -45]].map(([fx, fy, a]) => `<path transform="translate(${fx} ${fy}) rotate(${a})" d="M-6,-1.6 C-2,-3.6 2,-.4 6,-2 L6,1.6 C2,3.2 -2,0 -6,2 Z" fill="#e8c08a" stroke="var(--ink)" stroke-width="1.3" stroke-linejoin="round"/>`).join('')}</g>
    <path d="M120,24 L132,6" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/><path d="M120,24 L132,6" stroke="#e2c897" stroke-width="1.4" stroke-linecap="round"/></g>`;
}
// ハリセン：紙摺成的吐槽扇，一端綁起來當握把
const harisen = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M-4,0 L-16,-56 L16,-56 L4,0 Z" fill="#fbf8f0" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M-2,0 L-11,-56 M0,0 L-5,-56 M0,0 L1,-56 M1,0 L6,-56 M2,0 L11,-56" stroke="#cfc8b8" stroke-width="1.3"/>
  <rect x="-5.5" y="-10" width="11" height="14" rx="2" fill="#e8509a" stroke="var(--ink)" stroke-width="2.2"/></g>`;
// 串炸：竹籤上的炸物，旁邊是共用的醬汁盆（二度づけ禁止）
const KUSHIKATSU = `<g transform="translate(34 156)"><rect x="-22" y="-2" width="44" height="16" rx="3" fill="#c0c6cc" stroke="var(--ink)" stroke-width="2.4"/><rect x="-18" y="1" width="36" height="6" rx="2" fill="#4a2a1a"/>
  <g transform="translate(4 -14) rotate(20)"><path d="M0,24 V-18" stroke="var(--ink)" stroke-width="3.6" stroke-linecap="round"/><path d="M0,24 V-18" stroke="#e2c897" stroke-width="1.6" stroke-linecap="round"/>
  <rect x="-6" y="-14" width="12" height="22" rx="5" fill="#d9993e" stroke="var(--ink)" stroke-width="2.2"/><g fill="#f2c47a"><circle cx="-2" cy="-8" r="1.2"/><circle cx="2" cy="-2" r="1.2"/><circle cx="-2" cy="4" r="1.2"/></g></g></g>`;

// --- 兵庫縣 ---
// 姬路城：白漆喰牆、灰瓦屋頂層層疊起、千鳥破風，頂上一對小鯱
// 照姬路城：屋簷兩端上翹、中層有三角的千鳥破風和弧形的唐破風
const HIMEJI = `<g>
  <path d="M74,58 L78,50 H122 L126,58 Z" fill="#9aa0a6" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <rect x="80" y="40" width="40" height="10" fill="#fbfaf6" stroke="var(--ink)" stroke-width="2.2"/>
  <rect x="85" y="28" width="30" height="10" fill="#fbfaf6" stroke="var(--ink)" stroke-width="2.2"/>
  ${eave(40, 27, '#6b7480')}
  <path d="M91,38 L100,30 L109,38 Z" fill="#fbfaf6" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/><path d="M89,39 L100,29 L111,39" fill="none" stroke="var(--ink)" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M89,39 L100,29 L111,39" fill="none" stroke="#6b7480" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="90" y="16" width="20" height="10" fill="#fbfaf6" stroke="var(--ink)" stroke-width="2.2"/>
  ${eave(28, 22, '#6b7480')}
  <path d="M93,26 Q100,19 107,26" fill="none" stroke="var(--ink)" stroke-width="4.4" stroke-linecap="round"/><path d="M93,26 Q100,19 107,26" fill="none" stroke="#6b7480" stroke-width="2.2" stroke-linecap="round"/>
  ${eave(16, 17, '#6b7480')}
  <path d="M83,12 l-2,-5 M117,12 l2,-5" stroke="#e1bf55" stroke-width="2.6" stroke-linecap="round"/>
  <g fill="#2b2626"><rect x="84" y="44" width="4" height="4"/><rect x="112" y="44" width="4" height="4"/><rect x="88" y="31" width="3" height="4"/><rect x="109" y="31" width="3" height="4"/><rect x="98" y="19" width="4" height="4"/></g></g>`;
// 常春藤：完整的五裂葉，一小串別在頭的左側
const ivyLeaf = (x, y, s, a) => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><path d="M0,-11 C2,-7 3,-5 5,-4 L10,-5 C8,-2 7,0 7,2 L9,7 C5,6 3,6 0,8 C-3,6 -5,6 -9,7 L-7,2 C-7,0 -8,-2 -10,-5 L-5,-4 C-3,-5 -2,-7 0,-11 Z" fill="#5f9b3c" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/><path d="M0,7 V-7 M0,3 L6,-2 M0,3 L-6,-2" stroke="#9fcf7a" stroke-width="1.1" fill="none"/></g>`;
const IVY = `<path d="M66,74 C58,70 52,64 48,56" fill="none" stroke="var(--ink)" stroke-width="3.6" stroke-linecap="round"/><path d="M66,74 C58,70 52,64 48,56" fill="none" stroke="#7d6a3e" stroke-width="1.6" stroke-linecap="round"/>${ivyLeaf(48, 56, .95, -25)}${ivyLeaf(60, 66, .8, 35)}${ivyLeaf(50, 72, .7, -60)}`;
// 甲子園的球：白色硬式棒球、紅色縫線，帶一片爬牆虎葉（甲子園外牆的常春藤）
const koshienBall = (x, y) => `<g transform="translate(${x} ${y})">
  <circle r="13" fill="#fbfaf6" stroke="var(--ink)" stroke-width="2.6"/>
  <path d="M-8,-10 C-3,-4 -3,4 -8,10 M8,-10 C3,-4 3,4 8,10" fill="none" stroke="#d23b33" stroke-width="1.6"/>
  <path d="M-7,-6 l3,-1 M-6,-2 l3,0 M-6,2 l3,0 M-7,6 l3,1 M7,-6 l-3,-1 M6,-2 l-3,0 M6,2 l-3,0 M7,6 l-3,1" stroke="#d23b33" stroke-width="1.2"/></g>`;

// --- 奈良縣 ---
// 奈良鹿：棕色帶白斑、短角、白色尾巴，站在頭上；會像真的奈良鹿一樣鞠躬
function naraDeer(mood = 'bow') {
  return `<g>
    <path d="M86,64 V52 M94,64 V54 M112,64 V54 M120,64 V52" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><path d="M86,64 V52 M94,64 V54 M112,64 V54 M120,64 V52" stroke="#b07a46" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M124,40 C130,38 132,44 128,46" fill="#fff" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
    <ellipse cx="104" cy="46" rx="22" ry="11" fill="#b07a46" stroke="var(--ink)" stroke-width="2.8"/>
    <g fill="#fbf3e6"><circle cx="98" cy="42" r="1.8"/><circle cx="106" cy="40" r="1.8"/><circle cx="114" cy="43" r="1.8"/><circle cx="102" cy="48" r="1.6"/><circle cx="110" cy="49" r="1.6"/></g>
    <g class="${mood === 'bow' ? 'nod' : ''}">
      <path d="M84,44 C80,36 78,30 78,26 L86,26 C88,32 90,38 92,42 Z" fill="#b07a46" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M76,16 l-3,-8 M76,12 l-5,-2 M84,16 l2,-8 M84,12 l5,-3" stroke="var(--ink)" stroke-width="4.8" stroke-linecap="round"/><path d="M76,16 l-3,-8 M76,12 l-5,-2 M84,16 l2,-8 M84,12 l5,-3" stroke="#e8d3a8" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M72,22 C70,16 76,14 82,16 C86,18 88,24 84,28 C80,32 72,32 70,30 C68,28 70,24 72,22 Z" fill="#b07a46" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
      <path d="M86,20 C92,16 96,18 94,22 C92,24 88,23 86,22 Z" fill="#b07a46" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="69" cy="29" r="2.4" fill="var(--ink)"/><circle cx="77" cy="22" r="2" fill="var(--ink)"/></g></g>`;
}
// 鹿仙貝：圓形淡褐色餅乾，中間有烙印，用紙條捆成一疊
const senbei = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <circle r="14" fill="#d9b77e" stroke="var(--ink)" stroke-width="2.6"/><circle r="10" fill="none" stroke="#b8935a" stroke-width="1.4"/>
  <path d="M-4,-4 h8 v8 h-8 Z" fill="none" stroke="#9b6b3e" stroke-width="1.6"/><path d="M-14,-3 H14 V3 H-14 Z" fill="#fbf8f0" stroke="var(--ink)" stroke-width="1.6"/></g>`;

// --- 和歌山縣 ---
// 蜜柑：橘色、表面細點、頂上梗和兩片葉
const MIKAN = `<g><circle cx="100" cy="36" r="19" fill="#f28a1e" stroke="var(--ink)" stroke-width="3"/>
  <g fill="#e07612"><circle cx="92" cy="30" r="1"/><circle cx="104" cy="28" r="1"/><circle cx="110" cy="38" r="1"/><circle cx="96" cy="42" r="1"/><circle cx="88" cy="40" r="1"/><circle cx="106" cy="46" r="1"/></g>
  <path d="M88,28 C87,32 87,36 89,40" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>
  <circle cx="100" cy="18" r="3" fill="#6d8f34" stroke="var(--ink)" stroke-width="1.6"/>
  <path d="M100,17 C104,8 116,6 122,10 C116,16 106,18 100,17 Z M100,17 C96,9 86,8 82,12 C88,17 95,18 100,17 Z" fill="#5f9b3c" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/></g>`;
// 梅干：南高梅放在小白碟上，紅色、表面深色皺摺、帶一點鹽粒
// 梅干：小白碟上疊五顆（下三上二），沒有高光
const ume1 = (x, y) => `<g transform="translate(${x} ${y})"><path d="M0,-6 C5,-6.5 7.5,-3 7.5,.5 C7.5,4.5 4,6 0,6 C-4,6 -7.5,4.5 -7.5,.5 C-7.5,-3 -5,-6.5 0,-6 Z" fill="#d64a5a" stroke="var(--ink)" stroke-width="1.9"/><path d="M-4.5,-1 q2,1.6 4,0 M1,2.6 q2,1.4 4,0" fill="none" stroke="#9a2a38" stroke-width="1.3" stroke-linecap="round"/></g>`;
const umeboshi = (x, y) => `<g transform="translate(${x} ${y})"><ellipse cy="9" rx="19" ry="5.5" fill="#fbfaf6" stroke="var(--ink)" stroke-width="2.2"/>
  ${ume1(-11, 4)}${ume1(0, 5)}${ume1(11, 4)}${ume1(-5.5, -5)}${ume1(5.5, -5)}</g>`;
// 白濱的熊貓寶寶
const PANDA = `<g transform="translate(36 160)"><ellipse cy="4" rx="16" ry="12" fill="#fff" stroke="var(--ink)" stroke-width="2.4"/>
  <ellipse cx="-10" cy="12" rx="6" ry="4" fill="#2b2626"/><ellipse cx="10" cy="12" rx="6" ry="4" fill="#2b2626"/>
  <circle cx="-9" cy="-14" r="4.4" fill="#2b2626"/><circle cx="9" cy="-14" r="4.4" fill="#2b2626"/>
  <circle cy="-6" r="11" fill="#fff" stroke="var(--ink)" stroke-width="2.4"/>
  <ellipse cx="-4.5" cy="-6" rx="3" ry="3.6" transform="rotate(20 -4.5 -6)" fill="#2b2626"/><ellipse cx="4.5" cy="-6" rx="3" ry="3.6" transform="rotate(-20 4.5 -6)" fill="#2b2626"/>
  <circle cx="-4" cy="-6.5" r="1" fill="#fff"/><circle cx="4" cy="-6.5" r="1" fill="#fff"/><ellipse cy="-1" rx="1.8" ry="1.2" fill="#2b2626"/></g>`;
FACE.sour = `<path d="M78,97 L90,102 L78,107 M122,97 L110,102 L122,107" ${S}/><path d="M92,116 q2,-3 4,0 q2,3 4,0 q2,-3 4,0 q2,3 4,0" ${S}/>`;

// ===== 中國 =====
// --- 鳥取縣 ---
// 二十世紀梨：黃綠色、表面細小的褐色果點、筆直的梗（沒有葉子，和青森的蘋果區分）
const NASHI = `<g><path d="M100,19 C100,13 101,9 104,4" stroke="var(--ink)" stroke-width="4.4" stroke-linecap="round"/><path d="M100,19 C100,13 101,9 104,4" stroke="#8a5a3b" stroke-width="2" stroke-linecap="round"/>
  <path d="M100,19 C111,19 117,26 119,34 C121,44 114,55 100,55 C86,55 79,44 81,34 C83,26 89,19 100,19 Z" fill="#e2e68a" stroke="var(--ink)" stroke-width="3"/>
  <g fill="#a08a3a">${[[90, 28], [98, 24], [108, 27], [114, 34], [86, 38], [94, 34], [104, 33], [110, 42], [92, 45], [100, 42], [106, 49], [96, 51], [116, 44], [88, 47]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.3"/>`).join('')}</g>
  <path d="M87,30 C85,35 85,40 87,44" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/></g>`;
// 牛乳瓶：鳥取人從小喝大山的牛乳。玻璃瓶、紙蓋、藍色標籤上是大山的山形
// 牛乳盒：紅色屋頂、紅帶、「牛乳」字，下面藍色波紋和綠色的大山，山上一個深綠的牛頭（不畫品牌標誌）
const milk = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <rect x="-5" y="-25" width="10" height="4" fill="#fbfbf8" stroke="var(--ink)" stroke-width="1.6"/>
  <path d="M-10,-13 L-7,-21 H7 L10,-13 Z" fill="#d8323a" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
  <rect x="-10" y="-13" width="20" height="35" fill="#fbfbf8"/><rect x="-10" y="-13" width="20" height="5" fill="#d8323a"/>
  <text y="-.5" text-anchor="middle" font-size="7.4" font-weight="700" fill="#d8323a">牛乳</text>
  <path d="M-10,5 q2.5,-2 5,0 t5,0 t5,0 t5,0 M-10,8.4 q2.5,-2 5,0 t5,0 t5,0 t5,0" fill="none" stroke="#3a7fc8" stroke-width="1.5"/>
  <path d="M-10,22 V14 Q-5,12 0,5 Q5,11 10,12 V22 Z" fill="#6aa84f"/>
  <g fill="#2f6a2f"><ellipse cx="2" cy="17.4" rx="2.8" ry="3.4"/><ellipse cx="-1.8" cy="15" rx="2" ry="1.1" transform="rotate(25 -1.8 15)"/><ellipse cx="5.8" cy="15" rx="2" ry="1.1" transform="rotate(-25 5.8 15)"/><path d="M0,14 l-1,-2.4 M4,14 l1,-2.4" stroke="#2f6a2f" stroke-width="1.2" stroke-linecap="round"/></g>
  <rect x="-10" y="-13" width="20" height="35" fill="none" stroke="var(--ink)" stroke-width="2.4"/></g>`;
// 指路牌：島根在左邊（西邊）
const SHIMANE_SIGN = `<g transform="translate(32 150)"><path d="M0,30 V-6" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><path d="M0,30 V-6" stroke="#c9a46a" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M-16,-18 H18 V-4 H-16 L-22,-11 Z" fill="#fbf8f0" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/><text x="0" y="-7" font-size="10" text-anchor="middle" fill="var(--ink)" font-weight="700">島根</text></g>`;
// 砂丘和駱駝：觀光客的印象
const SAKYU = `<g transform="translate(36 166)"><path d="M-26,10 C-16,-4 8,-8 26,10 Z" fill="#e6c98a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/><path d="M-14,4 q4,-3 8,0 M2,2 q4,-3 8,0" fill="none" stroke="#c9a462" stroke-width="1.4" stroke-linecap="round"/>
  <g transform="translate(2 -10)"><path d="M-8,6 V12 M-4,6 V12 M5,6 V12 M8,6 V12" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/><path d="M-10,6 C-11,0 -8,-2 -6,-4 C-4,-7 -1,-6 0,-3 C1,-6 4,-7 6,-4 C8,-2 9,1 10,0 L12,-6 L15,-6 L14,2 C12,6 8,7 0,7 C-6,7 -9,7 -10,6 Z" fill="#c9965a" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/></g></g>`;

// --- 島根縣 ---
// 豆絞り手ぬぐい：安來節どじょうすくい的頰かむり，白底藍點，結打在頭頂右側
// 手ぬぐい用身體外框裁切，邊界和頭頂貼齊
const HOKKAMURI_DOTS = `<g fill="#2f5fa8">${[60, 74, 88, 102, 116, 130, 144].flatMap((x, i) => [68, 80, 92].map((y, j) => `<circle cx="${x + (j % 2) * 7}" cy="${y}" r="2.2"/>`)).join('')}</g>`;
const HOKKAMURI = `<g>
  <g transform="translate(200 0) scale(-1 1)"><path d="M136,72 L148,56 L154,64 Z M138,74 L158,70 L155,79 Z" fill="#fdfcf8" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/><circle cx="148" cy="62" r="1.8" fill="#2f5fa8"/><circle cx="153" cy="74" r="1.8" fill="#2f5fa8"/>
  <circle cx="139" cy="73" r="5" fill="#fdfcf8" stroke="var(--ink)" stroke-width="2.4"/></g></g>`;
// 竹ざる：撈泥鰍用的淺籃，上面跳著一條泥鰍
// 竹ざる：又大又淺的圓竹籃，斜拿著露出內面的編紋
const zaru = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M-22,0 C-20,10 20,10 22,0 Z" fill="#c49a50" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <ellipse rx="22" ry="11" fill="#e2c584" stroke="var(--ink)" stroke-width="2.6"/><ellipse rx="18" ry="8.4" fill="none" stroke="#b8904a" stroke-width="1.4"/>
  <ellipse rx="12" ry="5.6" fill="none" stroke="#b8904a" stroke-width="1.2"/><ellipse rx="6" ry="2.8" fill="none" stroke="#b8904a" stroke-width="1.1"/>
  <path d="M0,-8.4 V8.4 M-18,0 H18 M-12.7,-6 L12.7,6 M12.7,-6 L-12.7,6" stroke="#b8904a" stroke-width="1"/></g>`;
// びく：腰上裝泥鰍的小竹簍
const BIKU = `<g transform="translate(30 160)"><path d="M3,-9 C6,-14 10,-18 14,-20" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/>
  <path d="M-9,-3 C-13,4 -10,12 0,12 C10,12 13,4 9,-3 Z" fill="#d8b46a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M-10,3 H10 M-9,8 H9 M-5,-3 L-6,12 M0,-3 V12 M5,-3 L6,12" stroke="#a87e3a" stroke-width="1"/>
  <rect x="-6" y="-8" width="12" height="5" rx="1.5" fill="#c49a50" stroke="var(--ink)" stroke-width="1.8"/></g>`;
// 紅豆湯雜煮
const ZENZAI = `<g transform="translate(34 160)"><path d="M-18,-4 L18,-4 C17,8 9,12 0,12 C-9,12 -17,8 -18,-4 Z" fill="#c8463a" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/><ellipse cy="-4" rx="18" ry="5" fill="#6b2a26" stroke="var(--ink)" stroke-width="2.4"/>
  <rect x="-7" y="-10" width="14" height="8" rx="3" fill="#fbf8f0" stroke="var(--ink)" stroke-width="1.8"/><g fill="#9b3b30"><circle cx="-12" cy="-4" r="1.4"/><circle cx="11" cy="-3" r="1.4"/><circle cx="8" cy="-6" r="1.2"/></g></g>`;
// 安來節：鼻上的五圓硬幣
FACE.dojo = `<path d="M78,104 q7,-8 14,0 M108,104 q7,-8 14,0" ${S}/><circle cx="100" cy="110" r="5" fill="#e1bf55" stroke="var(--ink)" stroke-width="2"/><circle cx="100" cy="110" r="1.6" fill="#fff"/><path d="M94,119 q6,4 12,0" ${S}/>`;

// --- 岡山縣 ---
// 桃太郎的鉢卷：白布條綁在頭上，正面是桃子紋
// 鉢卷用身體外框裁切；頭頂是桃太郎的髷
const MOMOTARO = `<g><path d="M48,77 L30,67 L29,76 Z M48,81 L30,86 L34,93 Z" fill="#fdfcf8" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M97,40 C93,30 95,18 103,10 L104,17 L110,8 L110,17 L118,12 L114,21 L121,20 C116,28 109,35 104,40 Z" fill="#2b2626" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
  <path d="M101,36 C103,28 106,22 110,17" fill="none" stroke="#55505a" stroke-width="1.4" stroke-linecap="round"/>
  <ellipse cx="100" cy="45" rx="10" ry="4.6" fill="#2b2626" stroke="var(--ink)" stroke-width="2"/>
  <rect x="94.5" y="35" width="11" height="6" rx="1.5" fill="#fdfcf8" stroke="var(--ink)" stroke-width="1.6" transform="rotate(-14 100 38)"/><path d="M95.5,38.6 L105,36.2" stroke="#d23b33" stroke-width="1.4" transform="rotate(0)"/>
  <g transform="translate(0 6)"><path d="M100,62 C94,57 87,62 89,69 C91,75 97,78 100,78 C103,78 109,75 111,69 C113,62 106,57 100,62 Z" fill="#f7b0b8" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
  <path d="M100,63 C98,68 99,73 100,77" fill="none" stroke="#e08890" stroke-width="1.4"/><path d="M100,62 C104,55 110,55 112,57 C108,61 104,62 100,62 Z" fill="#5f9b3c" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/></g></g>`;
// 吉備糰子的小布袋：牛仔藍巾着，袋口露出三顆
const kibi = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <circle cx="-5" cy="-9" r="5" fill="#f1e3c0" stroke="var(--ink)" stroke-width="1.8"/><circle cx="5" cy="-9" r="5" fill="#f1e3c0" stroke="var(--ink)" stroke-width="1.8"/><circle cy="-13" r="5" fill="#f1e3c0" stroke="var(--ink)" stroke-width="1.8"/>
  <path d="M-12,-5 C-15,8 -10,16 0,16 C10,16 15,8 12,-5 C6,-8 -6,-8 -12,-5 Z" fill="#34528a" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M-12,-5 C-6,-1 6,-1 12,-5" fill="none" stroke="#d23b33" stroke-width="2"/><path d="M-12,-5 l-4,6 M12,-5 l4,6" stroke="#d23b33" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M0,4 C-3,2 -6,4 -5,7 C-4,10 -1,11 0,11 C1,11 4,10 5,7 C6,4 3,2 0,4 Z" fill="#f7b0b8"/><path d="M-6,0 V14 M6,0 V14" stroke="#5a78b0" stroke-width="1" stroke-dasharray="2 2"/></g>`;
// 晴天之國的太陽
const HARE = `<g transform="translate(34 58)"><circle r="10" fill="#f5b335" stroke="var(--ink)" stroke-width="2.4"/>${Array.from({ length: 8 }, (_, i) => { const [x0, y0] = pt(0, 0, 14, i * 45), [x1, y1] = pt(0, 0, 19, i * 45); return `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}" stroke="#e8962a" stroke-width="2.6" stroke-linecap="round"/>`; }).join('')}</g>`;

// --- 廣島縣 ---
// 嚴島神社的大鳥居：朱紅柱子、黑色上翹的笠木，立在海裡
const ITSUKUSHIMA = `<g transform="translate(0 6)">
  <path d="M80,56 V18 M120,56 V18" stroke="var(--ink)" stroke-width="10" stroke-linecap="round"/><path d="M80,56 V18 M120,56 V18" stroke="#d8432f" stroke-width="6.4" stroke-linecap="round"/>
  <rect x="72" y="28" width="56" height="6" rx="1.5" fill="#d8432f" stroke="var(--ink)" stroke-width="2.4"/><rect x="96" y="18" width="8" height="10" fill="#d8432f" stroke="var(--ink)" stroke-width="2"/>
  <path d="M68,14 H132 V20 H68 Z" fill="#d8432f" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M64,14 Q100,16 136,14 Q145,12 150,3 Q141,8 132,7 Q100,5 68,7 Q59,8 50,3 Q55,12 64,14 Z" fill="#2b2626" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/></g>`;
// 廣島燒：鏟子上的一塊，看得到一層層的麵糊、高麗菜、麵、蛋、醬汁
// 廣島燒：盤子上一整塊，邊緣不整齊，側面露出麵條，上面是醬汁、蔥花和紅薑
const okonomi = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <ellipse cy="5" rx="23" ry="8" fill="#fbfbf8" stroke="var(--ink)" stroke-width="2.4"/>
  <path d="M-18,3 C-20,-2 -16,-8 -8,-10 C0,-13 10,-11 16,-7 C21,-3 20,2 17,4 C10,8 -10,8 -18,3 Z" fill="#ecc46a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M-16,2 q2,-2 4,0 t4,0 t4,0 t4,0 t4,0 t4,0 t4,0 M-14,5 q2,-2 4,0 t4,0 t4,0 t4,0 t4,0 t4,0" fill="none" stroke="#c9963a" stroke-width="1.1"/>
  <path d="M-15,-3 C-14,-8 -6,-11 2,-11 C10,-11 16,-7 16,-3 C13,-1 10,-4 8,-1 C6,1 3,-3 0,-1 C-3,1 -6,-3 -9,-1 C-11,0 -13,-2 -15,-3 Z" fill="#6b2e1a" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/>
  <g fill="#8cc04a"><circle cx="-8" cy="-6" r="1.4"/><circle cx="-2" cy="-9" r="1.4"/><circle cx="6" cy="-8" r="1.4"/><circle cx="10" cy="-5" r="1.4"/><circle cx="-4" cy="-4" r="1.2"/><circle cx="4" cy="-4" r="1.2"/></g>
  <path d="M0,-7 l3,-2 M1,-5 l3,-1.6 M-1,-8.6 l2.6,-1.4" stroke="#e8604a" stroke-width="1.6" stroke-linecap="round"/></g>`;
// 牡蠣
const KAKI_SHELL = `<g transform="translate(34 160) rotate(-15)"><path d="M-18,0 C-18,-10 -6,-14 4,-12 C14,-10 20,-4 18,4 C16,12 4,14 -6,12 C-14,10 -18,6 -18,0 Z" fill="#9a958c" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M-13,0 C-13,-6 -4,-9 4,-8 C11,-6 14,-2 13,3 C11,8 3,9 -4,8 C-10,7 -13,4 -13,0 Z" fill="#eeeae0"/><ellipse cx="1" cy="0" rx="8" ry="5" fill="#d9cdb4" stroke="#a89878" stroke-width="1.2"/></g>`;

// --- 山口縣 ---
// 河豚：下關叫「ふく」（福）。生氣時整隻鼓起來、刺豎起來
function fugu(mood = 'calm') {
  const p = mood === 'puff', s = p ? 1.25 : 1;
  const spines = p ? Array.from({ length: 14 }, (_, i) => { const a = i * 360 / 14, [x0, y0] = pt(0, 0, 18, a), [x1, y1] = pt(0, 0, 24, a); return `M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}`; }).join(' ') : 'M-6,12 l-1,4 M0,13 v4 M6,12 l1,4 M11,10 l2,3';
  // 平常是虎河豚的側面：大頭、身體往尾巴收細、白肚子（胸鰭後的黑斑畫出來會像第二隻眼睛，省略）
  if (!p) return `<g transform="translate(100 36)">
    <path d="M-20,0 L-31,-8 C-33,-3 -33,3 -31,8 Z" fill="#7d7468" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M-2,-14 C2,-20 8,-20 10,-14 Z" fill="#7d7468" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M-21,0 C-15,-10 -2,-15 8,-14 C18,-13 25,-6 25,1 C25,8 18,13 8,13 C-2,13 -15,9 -21,0 Z" fill="#7d7468" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M-19,2 C-12,9 -2,12 8,12 C16,12 22,9 24,4 C14,6 -4,6 -19,2 Z" fill="#f4f2ec"/>
    <path d="M-21,0 C-15,-10 -2,-15 8,-14 C18,-13 25,-6 25,1 C25,8 18,13 8,13 C-2,13 -15,9 -21,0 Z" fill="none" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
    <g fill="#55504a"><circle cx="-10" cy="-6" r="1.3"/><circle cx="6" cy="-8" r="1.3"/><circle cx="-14" cy="-1" r="1.1"/></g>
    <path d="M6,2 C9,0 12,2 11,6 C9,6 7,5 6,2 Z" fill="#7d7468" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/>
    <circle cx="15" cy="-5" r="3.6" fill="#fff" stroke="var(--ink)" stroke-width="1.6"/><circle cx="16" cy="-5" r="1.8" fill="var(--ink)"/>
    <path d="M22,3 q2.6,0 3,-1.4" fill="none" stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round"/></g>`;
  return `<g transform="translate(100 ${p ? 30 : 34}) scale(${s})">
    <path d="M-18,0 L-30,-9 L-27,0 L-30,9 Z" fill="#8f9aa6" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="${spines}" stroke="var(--ink)" stroke-width="1.8" stroke-linecap="round"/>
    <ellipse rx="${p ? 20 : 20}" ry="${p ? 19 : 17}" fill="#8f9aa6" stroke="var(--ink)" stroke-width="2.6"/>
    <path d="M${p ? -18 : -19},${p ? 4 : 3} C-10,${p ? 18 : 14} 12,${p ? 18 : 14} ${p ? 18 : 19},${p ? 4 : 3} Z" fill="#f4f2ec"/>
    <g fill="#55606c"><circle cx="-8" cy="-8" r="1.8"/><circle cx="0" cy="-10" r="1.8"/><circle cx="-12" cy="-2" r="1.6"/><circle cx="-4" cy="-3" r="1.6"/></g>
    <path d="M-2,-14 L4,-21 L8,-13 Z" fill="#8f9aa6" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="10" cy="-4" r="3.6" fill="#fff" stroke="var(--ink)" stroke-width="1.6"/><circle cx="11" cy="-4" r="1.8" fill="var(--ink)"/>
    <ellipse cx="${p ? 20 : 21}" cy="2" rx="2" ry="2.4" fill="#e8a0a0" stroke="var(--ink)" stroke-width="1.4"/></g>`;
}
// 瓦片蕎麥：燒燙的瓦片上鋪茶蕎麥、蛋絲、牛肉、檸檬片
// 瓦片蕎麥：深灰的瓦片（一側捲起的邊是辨識點）上鋪綠色茶蕎麥、黃色蛋絲、海苔、檸檬片和紅葉泥
const kawara = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(1.35)">
  <path d="M-24,-4 L14,-10 C20,-12 25,-8 24,-1 L22,8 L-21,12 Z" fill="#3a3d42" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M14,-10 C20,-12 25,-8 24,-1 L22,8 L19,8 L21,-1 C22,-6 18,-9 14,-8 Z" fill="#62676e"/>
  <path d="M-19,2 q4,-3 8,-1 t8,-1 t8,-1 t6,-1 M-19,6 q4,-3 8,-1 t8,-1 t8,-1 t6,-1 M-18,9.4 q4,-3 8,-1 t8,-1 t8,-1 t4,-1" fill="none" stroke="#7f9a3c" stroke-width="2" stroke-linecap="round"/>
  <path d="M-12,0 l7,-1 M-9,3 l8,-1.2 M-3,-1 l7,-1" stroke="#f2d55a" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M-2,-6 L8,-8 L9,-1 L-1,1 Z" fill="#26304a" stroke="var(--ink)" stroke-width="1.2" stroke-linejoin="round"/>
  <circle cx="4" cy="-5" r="4.2" fill="#f7e46a" stroke="var(--ink)" stroke-width="1.6"/><circle cx="4" cy="-5" r="1.6" fill="#e8673a"/></g>`;

// ===== 四國 =====
// --- 德島縣 ---
// 阿波舞女踊的編み笠：對折成半月形的斗笠，紅色綁繩；跳舞時跟著晃
// 女踊的編み笠：半圓形、直邊朝下深深戴在頭上（頭頂藏在笠裡）；草編放射紋、靠近外緣一圈藍邊、兩端紅結、白色綁繩
const amigasa = () => `<g transform="translate(0 12) rotate(-6 100 54)"><g>
  <defs><pattern id="amime" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="5" height="5" fill="#d9c08a"/><path d="M0,2.5 H5 M2.5,0 V5" stroke="#b8964a" stroke-width=".9"/></pattern></defs>
  <path d="M52,54 A48,48 0 0 1 148,54 Z" fill="url(#amime)" stroke="var(--ink)" stroke-width="2.8" stroke-linejoin="round"/>
  <path d="M57,54 A43,43 0 0 1 143,54" fill="none" stroke="#2c4f9e" stroke-width="4.4"/><path d="M57,54 A43,43 0 0 1 143,54" fill="none" stroke="#fbf8f0" stroke-width="1" stroke-dasharray="1.6 4"/>
  <path d="M52,54 H148" stroke="var(--ink)" stroke-width="2.8" stroke-linecap="round"/>
  <circle cx="53" cy="53" r="3" fill="#d23b33" stroke="var(--ink)" stroke-width="1.6"/><circle cx="147" cy="53" r="3" fill="#d23b33" stroke="var(--ink)" stroke-width="1.6"/></g></g>`;
// 酸橘：一顆完整的綠色、一顆切半露出果肉
const sudachi = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <circle cx="-6" cy="-2" r="9.5" fill="#5f9b3c" stroke="var(--ink)" stroke-width="2.4"/><g fill="#4a7f2c"><circle cx="-9" cy="-5" r=".9"/><circle cx="-3" cy="-6" r=".9"/><circle cx="-6" cy="2" r=".9"/></g><path d="M-6,-11.5 l1,-3" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/>
  <circle cx="8" cy="5" r="9.5" fill="#6aa84f" stroke="var(--ink)" stroke-width="2.4"/><circle cx="8" cy="5" r="7.2" fill="#dfe9a6"/>
  ${Array.from({ length: 8 }, (_, i) => { const [x1, y1] = pt(8, 5, 6.6, i * 45); return `M8,5 L${x1.toFixed(1)},${y1.toFixed(1)}`; }).reduce((a, b) => a + ' ' + b, '<path d="') + '" stroke="#b9cc6a" stroke-width="1.2"/>'}<circle cx="8" cy="5" r="1.4" fill="#f4f6d8"/></g>`;
// 算盤：商売人
const SOROBAN = `<g transform="translate(32 152) rotate(-12)"><rect x="-16" y="-10" width="32" height="20" rx="2" fill="#8a5a3b" stroke="var(--ink)" stroke-width="2.2"/><rect x="-13" y="-7" width="26" height="14" fill="#f4e7c8"/>
  <path d="M-13,-2.6 H13" stroke="#8a5a3b" stroke-width="1.8"/>${[-10, -5, 0, 5, 10].map((x, i) => `<path d="M${x},-7 V7" stroke="#8a5a3b" stroke-width=".9"/><ellipse cx="${x}" cy="-5" rx="2.2" ry="1.4" fill="#3a2a22"/>${[1.6, 4.2].map(y => `<ellipse cx="${x}" cy="${y + (i % 2) * .8}" rx="2.2" ry="1.4" fill="#3a2a22"/>`).join('')}`).join('')}</g>`;
// 什麼都淋酸橘：好幾顆酸橘浮在身邊
const SUDACHI_RAIN = `<g class="float">${[[28, 74, 6.4], [170, 64, 6], [20, 118, 5.4], [182, 112, 6.4], [44, 48, 5]].map(([x, y, rr]) => `<circle cx="${x}" cy="${y}" r="${rr}" fill="#5f9b3c" stroke="var(--ink)" stroke-width="2"/><path d="M${x},${y - rr} l1,-2.6" stroke="var(--ink)" stroke-width="1.8" stroke-linecap="round"/><circle cx="${x - rr * .35}" cy="${y - rr * .3}" r=".8" fill="#4a7f2c"/>`).join('')}</g>`;
// 德島說的「汽車」是柴油車：沒有集電弓、車頂有排氣口，停在背景的鐵軌上
const KISHA = `<g><path d="M0,152 H200" stroke="#8a7a6a" stroke-width="3"/>
  <rect x="-8" y="98" width="216" height="46" rx="10" fill="#e8eef4" stroke="var(--ink)" stroke-width="3"/><rect x="-8" y="124" width="216" height="7" fill="#2f7fc1"/>
  ${[2, 24, 156, 178].map(x => `<rect x="${x}" y="105" width="18" height="13" rx="2" fill="#8fb4d6" stroke="var(--ink)" stroke-width="2"/>`).join('')}
  <rect x="150" y="91" width="10" height="7" rx="1.5" fill="#6b7480" stroke="var(--ink)" stroke-width="2"/>
  ${[18, 40, 160, 182].map(x => `<circle cx="${x}" cy="146" r="6" fill="#3a3a3a" stroke="var(--ink)" stroke-width="2"/>`).join('')}</g>`;

// --- 香川縣 ---
// 讚岐烏龍麵：碗裡粗粗的白麵、蔥花、竹輪天
const UDON = `<g>
  <path d="M64,40 L136,40 C134,56 120,62 100,62 C80,62 66,56 64,40 Z" fill="#3a4f7a" stroke="var(--ink)" stroke-width="2.8" stroke-linejoin="round"/>
  <path d="M70,50 q6,4 12,0 t12,0 t12,0 t12,0 t12,0" fill="none" stroke="#e8e2d0" stroke-width="1.6"/>
  <ellipse cx="100" cy="40" rx="36" ry="8" fill="#e8c98a" stroke="var(--ink)" stroke-width="2.6"/>
  <path d="M74,40 C80,30 90,32 92,40 M86,40 C92,28 104,28 106,40 M100,40 C106,30 118,30 120,40 M80,42 C86,34 96,34 98,42" fill="none" stroke="var(--ink)" stroke-width="6" stroke-linecap="round"/>
  <path d="M74,40 C80,30 90,32 92,40 M86,40 C92,28 104,28 106,40 M100,40 C106,30 118,30 120,40 M80,42 C86,34 96,34 98,42" fill="none" stroke="#fbf8f0" stroke-width="3.6" stroke-linecap="round"/>
  <rect x="112" y="32" width="18" height="8" rx="4" fill="#d9a85a" stroke="var(--ink)" stroke-width="2"/><ellipse cx="129" cy="36" rx="2" ry="3" fill="#f4ecd8" stroke="var(--ink)" stroke-width="1.2"/>
  <g fill="#6aa84f"><circle cx="92" cy="36" r="1.6"/><circle cx="104" cy="34" r="1.6"/><circle cx="84" cy="42" r="1.6"/><circle cx="110" cy="42" r="1.6"/></g></g>`;
// 小豆島的橄欖枝：細長的銀綠色葉子和橢圓的果實
const olive = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M0,8 C-2,-6 2,-20 8,-32" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/><path d="M0,8 C-2,-6 2,-20 8,-32" fill="none" stroke="#8a6a3e" stroke-width="2" stroke-linecap="round"/>
  ${[[0, -4, -60], [1, -14, 50], [3, -22, -50], [6, -29, 40], [-1, 2, 60]].map(([lx, ly, a]) => `<ellipse cx="${lx}" cy="${ly}" rx="10" ry="3" transform="rotate(${a} ${lx} ${ly}) translate(${a > 0 ? 8 : -8} 0)" fill="#8fa86a" stroke="var(--ink)" stroke-width="1.6"/>`).join('')}
  <ellipse cx="9" cy="-10" rx="4" ry="5.4" fill="#6d8a2e" stroke="var(--ink)" stroke-width="1.8"/><ellipse cx="-7" cy="-17" rx="4" ry="5.4" fill="#4a3a5a" stroke="var(--ink)" stroke-width="1.8"/><ellipse cx="12" cy="-24" rx="3.6" ry="5" fill="#6d8a2e" stroke="var(--ink)" stroke-width="1.8"/>
  <circle cx="7.8" cy="-12" r="1.2" fill="#fff" opacity=".7"/></g>`;

// --- 愛媛縣 ---
// 蜜柑加水龍頭：「打開水龍頭會流出蜜柑汁」是外縣市的玩笑，機場真的有
const MIKAN_TAP = `<g>
  <circle cx="100" cy="40" r="18" fill="#f28a1e" stroke="var(--ink)" stroke-width="3"/>
  <g fill="#e07612"><circle cx="92" cy="36" r="1"/><circle cx="106" cy="34" r="1"/><circle cx="110" cy="44" r="1"/><circle cx="96" cy="48" r="1"/></g>
  <path d="M88,32 C86,37 86,42 88,46" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>
  <rect x="95" y="10" width="10" height="13" fill="#c0c6cc" stroke="var(--ink)" stroke-width="2.2"/>
  <path d="M105,11 H118 C121,11 122,13 122,15 V19 H116 V16 H105 Z" fill="#c0c6cc" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M100,10 V4 M93,4 H107" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><path d="M100,10 V4 M93,4 H107" stroke="#c0c6cc" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M119,22 C117,25 117,27 119,28 C121,27 121,25 119,22 Z" fill="#f2a23a" stroke="var(--ink)" stroke-width="1.4"/></g>`;
// 少爺糰子：抹茶綠、蛋黃、紅豆三色
const botchan = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M0,14 V-34" stroke="var(--ink)" stroke-width="3.6" stroke-linecap="round"/><path d="M0,14 V-34" stroke="#e2c897" stroke-width="1.6" stroke-linecap="round"/>
  <circle cy="-26" r="7" fill="#8bb05a" stroke="var(--ink)" stroke-width="2.2"/><circle cy="-13" r="7" fill="#f2d25a" stroke="var(--ink)" stroke-width="2.2"/><circle cy="0" r="7" fill="#8a4a3a" stroke="var(--ink)" stroke-width="2.2"/>
  <circle cx="-2.5" cy="-28" r="1.6" fill="#fff" opacity=".7"/></g>`;
// 今治毛巾
const TOWEL = `<g transform="translate(34 160)"><path d="M-18,-10 H18 V12 H-18 Z" fill="#fbfbf8" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/><path d="M-18,4 H18 M-18,7 H18" stroke="#2f6ea3" stroke-width="1.6"/>
  <path d="M-14,-6 v6 M-8,-6 v6 M-2,-6 v6 M4,-6 v6 M10,-6 v6" stroke="#e2e2dc" stroke-width="1.4"/><path d="M-18,12 l2,3 l2,-3 l2,3 l2,-3 l2,3 l2,-3 l2,3 l2,-3 l2,3 l2,-3 l2,3 l2,-3 l2,3 l2,-3 l2,3 l2,-3 l2,3 l2,-3" fill="none" stroke="var(--ink)" stroke-width="1.2"/></g>`;

// --- 高知縣 ---
// 鰹魚：深藍的背、銀白的肚子上有幾條黑色縱紋，尾巴分叉
const KATSUO = `<g>
  <path d="M68,38 L54,26 L58,38 L54,50 Z" fill="#2d3e5c" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M66,38 C78,22 118,20 136,32 C140,35 140,40 136,42 C118,52 80,52 66,38 Z" fill="#c9d3dc" stroke="var(--ink)" stroke-width="2.8" stroke-linejoin="round"/>
  <path d="M66,38 C78,22 118,20 136,32 C126,34 110,34 90,36 C80,37 72,38 66,38 Z" fill="#2d3e5c"/>
  <path d="M84,42 C98,43 114,42 128,39 M82,46 C96,47 112,46 124,43 M86,49 C98,50 108,49 118,47" fill="none" stroke="#4a5568" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M114,24 C110,19 104,15 95,13 C98,17 99,21 99,26 Z M76,32 l3,-4 l2,4 M82,30 l3,-4 l2,4" fill="#2d3e5c" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M66,38 C78,22 118,20 136,32 C140,35 140,40 136,42 C118,52 80,52 66,38 Z" fill="none" stroke="var(--ink)" stroke-width="2.8" stroke-linejoin="round"/>
  <circle cx="128" cy="34" r="3" fill="#fff" stroke="var(--ink)" stroke-width="1.4"/><circle cx="128.6" cy="34" r="1.5" fill="var(--ink)"/><path d="M120,32 C118,36 118,40 121,43" fill="none" stroke="var(--ink)" stroke-width="1.6"/></g>`;
// 鳴子：夜來祭的響板，木頭握把，紅黑黃三色板子
// 鳴子：紅色木板連著長握把（尾端有孔），上面是黑、黃、黑直條的拍子
const naruko = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M-10,-44 H10 V-16 C10,-12 4,-10 3,-6 V8 C3,10 -3,10 -3,8 V-6 C-4,-10 -10,-12 -10,-16 Z" fill="#d8322e" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <circle cy="5" r="1.4" fill="#fbf8f0" stroke="var(--ink)" stroke-width="1"/>
  <rect x="-8" y="-40" width="16" height="17" rx="1" fill="#2b2626" stroke="var(--ink)" stroke-width="1.8"/><rect x="-2" y="-40" width="4" height="17" fill="#f2c33a"/>
  <path d="M-10,-30 H10" stroke="var(--ink)" stroke-width="1.6"/></g>`;
// 返杯：朱漆盃和德利
const HENPAI = `<g transform="translate(34 158)"><path d="M-4,-14 h8 v4 c6,2 8,8 8,14 c0,7 -5,10 -12,10 c-7,0 -12,-3 -12,-10 c0,-6 2,-12 8,-14 Z" fill="#fbf8f0" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round" transform="translate(-6 0)"/>
  <path d="M6,10 C6,15 22,15 22,10 Z" fill="#c8352b" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/><ellipse cx="14" cy="10" rx="8" ry="2.4" fill="#f2c33a" stroke="var(--ink)" stroke-width="1.6"/></g>`;
CHARS.push({
  id: 'kochi', name: '高知君', kind: '都道府縣・高知縣', tagColor: '#2d3e5c', motto: '「杯子空了喔！まっこと！」',
  colors: [['柚子黃', '#F2D25A'], ['黑潮藍', '#2D3E5C']],
  look: f => slime({ shape: 'egg', grad: [[0, '#fffdf0'], [.55, '#fbf0bc'], [1, '#efd56a']], limb: '#2d3e5c', face: f.face || 'base', armUp: f.armUp,
    head: KATSUO, front: f.armUp ? naruko(172, 100, 16) : naruko(164, 150, 10), extra: f.extra }),
  faces: [
    { face: 'open', name: '酒飲み', k: '( ´▽`)', q: '縣民自己選的特質：酒飲み', extra: HENPAI },
    { face: 'smileW', armUp: true, name: 'よさこい', k: '( ^ω^ )ノ', q: '運動會的舞蹈是夜來祭' },
    { face: 'serious', extra: GARLIC, name: '配大蒜', k: '(｀・ω・´)', q: '「鰹魚半敲燒要配大蒜片，剛烤好溫溫的最好吃！」' },
    { face: 'calm', extra: HENPAI_CUP, name: '返杯', k: '( ˘ω˘ )', q: '酒席上被倒酒，要喝乾再回敬一杯' },
    { face: 'flat', name: '沉穩模式', k: '( ・_・)', q: '嚴肅主題專用' },
  ],
  acc: [['鰹魚', '高知的靈魂食物是鰹魚半敲燒。縣民說要配大蒜，剛炙烤好的比冰的好吃。畫成整條鰹魚，肚子上的縱紋是辨識點。'], ['鳴子', '夜來祭（よさこい祭り）手上拿的響板。高知的運動會也跳夜來祭。']],
  persona: '豪爽的酒豪。いごっそう（固執又豪爽），熱愛宴會；獻杯、返杯是他表達熱情的方式。',
  diff: '四國裡香川講效率、愛媛溫和，高知是野性和熱情的代表。和鹿兒島、山口、佐賀爭誰才是維新第一功臣。',
  points: ['（怪癖）酒席上返杯是基本。', '（怪癖）鰹魚半敲燒配大蒜。', '（怪癖）以為皿鉢料理到處都有。', '（口頭禪）「まっこと」（真的）。'],
  power: '變形「四萬十川」：變成透明的清流。技能「夜來祭・總舞」：搖響鳴子，讓周圍的人一起跳。分裂採歷史殘響：土佐藩；交通不便的幡多更野性。',
  why: '草稿的坂本龍馬髮型是真實人物，不畫；一升瓶和新潟撞，降成需要時的酒杯。頭上換成鰹魚：觀光客和縣民都認的靈魂食物。手上拿夜來祭的鳴子，縣民在運動會也跳。身體用柚子的黃，手腳用黑潮的深藍。',
});

// ===== 九州 =====
// --- 福岡縣 ---
// 辛子明太子：盤子上一對連在一起的紅色卵囊，表面細點
const MENTAIKO = `<g>
  <ellipse cx="100" cy="50" rx="34" ry="8" fill="#fbfbf8" stroke="var(--ink)" stroke-width="2.6"/><ellipse cx="100" cy="49" rx="26" ry="5" fill="none" stroke="#7aa0c8" stroke-width="1.4"/>
  <path d="M100,46 C112,38 130,37 144,42 C130,47 114,49 100,46 Z M94,48 C106,46 124,47 140,53 C122,54 106,52 94,48 Z" fill="#3f7a3a" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/>
  <path d="M104,45 C116,42 130,41 142,42 M98,48 C110,48 124,50 138,53" fill="none" stroke="#6aa84f" stroke-width="1"/>
  <path d="M72,47 C82,39 108,35 126,37 C133,38 133,44 126,45 C108,47 84,51 72,47 Z" fill="#d9444e" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M73,45 C82,34 102,24 118,20 C125,18 128,25 122,28 C108,34 88,43 73,45 Z" fill="#e3565e" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <g fill="#f6aab0">${[[84, 36], [92, 32], [100, 29], [108, 26], [115, 24], [88, 39], [97, 35], [106, 31], [86, 46], [96, 44], [106, 42], [116, 41], [124, 41]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1"/>`).join('')}</g>
  <g fill="#9b2a2a"><circle cx="94" cy="43" r=".8"/><circle cx="112" cy="40" r=".8"/><circle cx="102" cy="30" r=".8"/></g></g>`;
// 豚骨拉麵：白湯、叉燒、紅薑、蔥，筷子夾起細麵
const ramen = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M-17,0 L17,0 C16,11 9,15 0,15 C-9,15 -16,11 -17,0 Z" fill="#fbfbf8" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M-14,5 h4 v3 h-4 M-6,5 h4 v3 h-4 M2,5 h4 v3 h-4 M10,5 h3" fill="none" stroke="#d23b33" stroke-width="1.3"/>
  <ellipse rx="17" ry="4.4" fill="#f2e6cc" stroke="var(--ink)" stroke-width="2.2"/>
  <path d="M-13,.6 q2,-1.6 4,0 t4,0 t4,0 t4,0 t4,0 t4,0 M-11,2.4 q2,-1.6 4,0 t4,0 t4,0 t4,0 t4,0" fill="none" stroke="#e8c45a" stroke-width="1.1"/>
  <circle cx="-7" cy="-0.5" r="4" fill="#d9a07a" stroke="var(--ink)" stroke-width="1.4"/><path d="M-2,-1 l3,1 l-2,1 M0,1 l3,0" stroke="#d23b33" stroke-width="1.6" stroke-linecap="round"/><g fill="#6aa84f"><circle cx="4" cy="-1.5" r="1"/><circle cx="-12" cy="1" r="1"/><circle cx="10" cy="1" r="1"/></g></g>`;
CHARS.push({
  id: 'fukuoka', name: '福岡君', kind: '都道府縣・福岡縣', tagColor: '#d9444e', motto: '「福岡的大小剛剛好けん！」',
  colors: [['豚骨白', '#F7F1E3'], ['明太子紅', '#D9444E']],
  look: f => slime({ shape: 'egg', grad: [[0, '#fffefb'], [.55, '#f9f1e0'], [1, '#ead9b4']], limb: '#d9444e', face: f.face || 'base', armUp: f.armUp,
    back: f.back, head: MENTAIKO, front: f.armUp ? ramen(174, 96, 8) : ramen(164, 146, 4), extra: f.extra }),
  faces: [
    { face: 'serious', name: '熱い', k: '(｀・ω・´)', q: '縣民自己選的特質：熱い，愛祭典' },
    { face: 'smileW', armUp: true, name: '替え玉', k: '( ^ω^ )', q: '「硬麵，再來一球替玉！」' },
    { face: 'sweat', extra: forkSign('博多', '福岡'), name: '博多還是福岡', k: '(・ω・;)', q: '被問「你是博多君還是福岡君？」會當機' },
    { face: 'calm', back: YATAI, name: '屋台', k: '( ˘ω˘ )', q: '「中洲的屋台？那是觀光客去的。」' },
    { face: 'flat', name: '沉穩模式', k: '( ・_・)', q: '嚴肅主題專用' },
  ],
  acc: [['辛子明太子', '博多的代表名產，盤子上墊兩片葉子，上面一對連在一起的紅色卵囊。'], ['豚骨拉麵', '白濁的湯裡的細麵、叉燒、紅薑。麵的硬度和「替玉」（加麵）是福岡人的日常。']],
  persona: '九州的領導者。自信、熱情、愛祭典，不排外；覺得福岡「大小剛剛好」，討厭被拿來和東京、大阪比。',
  diff: '和大阪比，大阪講 CP 值，福岡講生活享受。九州裡鹿兒島是沉默的剛毅，福岡是都會的熱情。',
  points: ['（怪癖）雞肉叫「かしわ」。', '（怪癖）肉包沾醋醬油。', '（怪癖）運動會起立坐下要喊「ヤー！」', '（雷點）博多和福岡的差別很複雜。'],
  power: '變形「博多祇園山笠」：變成裝飾山笠全速衝刺。技能「屋台・開店」：讓周圍的人坐下吃拉麵，化解敵意。分裂採國會模式：福岡市（博多）、北九州（小倉、八幡）、筑後（久留米）。',
  why: '草稿的仁和加面具外地人不熟，球衣是球團品牌，都拿掉。頭上換成明太子，手上拿豚骨拉麵：兩樣觀光客和縣民都認。拉麵畫細麵、白湯，和香川的粗烏龍麵區分。縣民說中洲屋台是觀光客去的，做成表情。',
});

// --- 佐賀縣 ---
// 熱氣球：直條紋的氣球和吊籃，飄在頭上
const BALLOON = `<g><g class="swing">
  <path d="M100,2 C114,2 122,12 122,22 C122,32 110,38 106,42 H94 C90,38 78,32 78,22 C78,12 86,2 100,2 Z" fill="#d23b33" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M100,2 C108,4 112,12 112,22 C112,32 106,38 104,42 H96 C94,38 88,32 88,22 C88,12 92,4 100,2 Z" fill="#f2c33a"/>
  <path d="M100,2 C103,6 104,14 104,22 C104,32 101,38 100,42 C99,38 96,32 96,22 C96,14 97,6 100,2 Z" fill="#3d7ea6"/>
  <path d="M100,2 C114,2 122,12 122,22 C122,32 110,38 106,42 H94 C90,38 78,32 78,22 C78,12 86,2 100,2 Z" fill="none" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M95,42 L96,48 M105,42 L104,48" stroke="var(--ink)" stroke-width="1.4"/>
  <rect x="94" y="47" width="12" height="8" rx="1.5" fill="#a8743e" stroke="var(--ink)" stroke-width="2"/></g></g>`;
// 有田燒的盤子：白瓷、青花（染付）
const arita = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <ellipse rx="17" ry="13" fill="#fbfbf8" stroke="var(--ink)" stroke-width="2.4"/><ellipse rx="13" ry="9.6" fill="none" stroke="#2f5fa8" stroke-width="1.6"/>
  <path d="M-15,-3 l2,-2 M-15,3 l2,2 M15,-3 l-2,-2 M15,3 l-2,2 M-5,-12 l1,2 M5,-12 l-1,2 M-5,12 l1,-2 M5,12 l-1,-2" stroke="#2f5fa8" stroke-width="1.4" stroke-linecap="round"/>
  <g fill="#2f5fa8">${[0, 72, 144, 216, 288].map(a => { const [px, py] = pt(0, 0, 3.6, a - 90); return `<ellipse cx="${px.toFixed(1)}" cy="${(py * .75).toFixed(1)}" rx="2.6" ry="2"/>`; }).join('')}</g><circle r="1.6" fill="#f2c33a"/></g>`;
CHARS.push({
  id: 'saga', name: '佐賀君', kind: '都道府縣・佐賀縣', tagColor: '#2f5fa8', motto: '「反正佐賀什麼都沒有……你不准同意！」',
  colors: [['有田白瓷', '#F7F8FA'], ['染付藍', '#2F5FA8']],
  look: f => slime({ shape: 'egg', grad: [[0, '#ffffff'], [.55, '#eef2f8'], [1, '#c4d2e8']], limb: '#2f5fa8', face: f.face || 'flat', armUp: f.armUp,
    head: BALLOON, front: f.armUp ? arita(176, 92, -14) : arita(166, 144, -10), extra: f.extra }),
  faces: [
    { face: 'tired', name: '什麼都沒有', k: '(￣ω￣)', q: '「反正佐賀什麼都沒有啦……」' },
    { face: 'serious', name: 'がばい', k: '(｀・ω・´)', q: '真的被同意就生氣：「有熱氣球、有田燒，がばいあるっちゃん！」' },
    { face: 'puzzled', armUp: true, name: '看盤底', k: '(・_・)?', q: '吃完飯會翻過盤子看底下的窯印' },
    { face: 'sweat', extra: arrowSign('福岡', -1), name: '鳥栖市民', k: '(・ω・;)', q: '鳥栖的人說自己是「鳥栖市民」，去福岡比較快' },
    { face: 'flat', name: '沉穩模式', k: '( ・_・)', q: '嚴肅主題專用' },
  ],
  acc: [['熱氣球', '每年秋天的佐賀國際熱氣球節，上百顆熱氣球一起升空。縣民的自慢之一。'], ['有田燒', '日本最早的白瓷，青花紋樣。佐賀人吃完飯會翻盤子看窯印，喜宴回禮也送陶瓷。']],
  persona: '隱藏的職人。平常低調、自嘲「什麼都沒有」，其實握著日本最早的瓷器和彌生時代的遺跡；別人真的同意他什麼都沒有時，他會生氣。',
  diff: '和福岡比，福岡張揚，佐賀是「裡」的存在。和長崎同屬肥前，新幹線的事情吵不完。',
  points: ['（口頭禪）「反正佐賀什麼都沒有……」', '（怪癖）吃完飯翻盤子看窯印。', '（怪癖）運動會跳面浮立。', '（口頭禪）「がばい」（非常）。'],
  power: '變形「有田燒」：變成堅硬華麗的白瓷。技能「熱氣球・一齊升空」：召喚上百顆熱氣球擋住或載運。分裂採歷史殘響：佐賀之亂；鳥栖殘響則偏向福岡。',
  why: '草稿的有田燒頭盔太複雜，拆成兩件：頭上的熱氣球、手上的有田燒盤子，縣民的自慢裡兩樣都有。殭屍動畫是別人的作品，不用。熱氣球會輕輕晃。預設臉用沉穩的平淡臉，表現低調。',
});

// --- 長崎縣 ---
// 長崎蛋糕：黃色海綿、深褐色的上層、底部的紙和粗糖
// 長崎蛋糕：上下兩面都是咖啡色；側面變淺，整塊壓低坐在頭頂上
const CASTELLA = `<g>
  <path d="M68,32 L74,26 H130 L124,32 Z" fill="#7a4220" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M124,32 L130,26 V52 L124,58 Z" fill="#e8c650"/><path d="M124,32 L130,26 V30 L124,37 Z M124,54 L130,48 V52 L124,58 Z" fill="#6a3818"/>
  <path d="M124,32 L130,26 V52 L124,58 Z" fill="none" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <rect x="68" y="32" width="56" height="26" fill="#f6d86a"/><rect x="68" y="32" width="56" height="6" fill="#7a4220"/><rect x="68" y="54" width="56" height="4" fill="#7a4220"/>
  <rect x="68" y="32" width="56" height="26" fill="none" stroke="var(--ink)" stroke-width="2.6"/></g>`;
// 角煮饅頭：參考圖的關鍵是蓬鬆的白饅頭從左邊對折（像蛤蜊），右邊露出厚厚一塊帶肥肉層的滷五花肉。
// 不畫生菜、肉不畫成薄片，避免上下平行的層次像漢堡
const kakuniman = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M-18,3 C-20,11 -6,14 6,13 C13,12 18,9 16,4 Z" fill="#fbf8f0" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M-4,-7 C4,-9 14,-8 21,-5 C23,-1 22,4 19,6 C10,7 1,6 -6,4 Z" fill="#8a3a22" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
  <path d="M0,-4 C7,-6 14,-5 21,-3 M-2,0 C6,-1 14,-1 21,1" fill="none" stroke="#f0d2a8" stroke-width="1.8" stroke-linecap="round"/><path d="M8,-6.6 C12,-7 16,-6.6 19,-5.4" fill="none" stroke="#c8704a" stroke-width="1.4" stroke-linecap="round"/>
  <path d="M-18,3 C-21,-7 -12,-15 0,-15 C10,-15 17,-11 16,-5 C10,-6 2,-6 -4,-4 C-10,-2 -15,1 -18,3 Z" fill="#fbf8f0" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M-12,-9 C-8,-12 -2,-13 3,-12" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></g>`;
// 伍斯特醬
const SAUCE = `<g transform="translate(36 160) rotate(-10)"><path d="M-3,-18 h6 v5 c5,2 7,6 7,10 v15 h-20 v-15 c0,-4 2,-8 7,-10 Z" fill="#3a2418" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/><rect x="-6" y="-4" width="12" height="10" fill="#f2c33a"/><rect x="-3.5" y="-22" width="7" height="5" fill="#d23b33" stroke="var(--ink)" stroke-width="1.6"/></g>`;

// --- 熊本縣 ---
// 熊本城：黑色下見板的牆、灰瓦屋頂，底下是往外彎的「武者返し」石牆
const KUMAMON_HAT = '';
const KUMAMOTO_JO = `<g>
  <path d="M68,60 C76,56 80,50 82,42 H118 C120,50 124,56 132,60 Z" fill="#a39d90" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M78,56 C84,53 86,49 87,45 M122,56 C116,53 114,49 113,45 M84,50 H116 M88,46 H112 M80,54 H120" fill="none" stroke="#7d776b" stroke-width="1.2"/>
  <rect x="84" y="32" width="32" height="10" fill="#2b2626" stroke="var(--ink)" stroke-width="2"/><path d="M84,34 H116" stroke="#fbfaf6" stroke-width="1.6"/>
  <path d="M74,34 Q100,24 126,34 L122,30 Q100,22 78,30 Z" fill="#59606a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <rect x="90" y="18" width="20" height="10" fill="#2b2626" stroke="var(--ink)" stroke-width="2"/><path d="M90,20 H110" stroke="#fbfaf6" stroke-width="1.6"/>
  <path d="M93,22 L100,16 L107,22 Z" fill="#fbfaf6" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M82,20 Q100,8 118,20 L114,16 Q100,8 86,16 Z" fill="#59606a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M86,14 l-2,-5 M114,14 l2,-5" stroke="#e1bf55" stroke-width="2.6" stroke-linecap="round"/></g>`;
// 辛子蓮根：蓮藕切片，洞裡塞滿黃色芥末味噌，外層炸得金黃
const renkon = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M2,-13 H-16 C-22,-13 -24,-6 -24,0 C-24,6 -22,13 -16,13 H2 Z" fill="#e3ad3a" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M-8,-12 C-10,-4 -10,4 -8,12 M-16,-12 C-18,-4 -18,4 -16,12" fill="none" stroke="#c48a22" stroke-width="1.3"/>
  <ellipse cx="2" rx="10" ry="13" fill="#e3ad3a" stroke="var(--ink)" stroke-width="2.4"/><ellipse cx="2" rx="7.6" ry="10.4" fill="#f7f1e0"/>
  <g fill="#f0c020" stroke="#a87e12" stroke-width="1">${Array.from({ length: 6 }, (_, i) => { const a = (i * 60 - 90) * Math.PI / 180; return `<ellipse cx="${(2 + 4.6 * Math.cos(a)).toFixed(1)}" cy="${(6.4 * Math.sin(a)).toFixed(1)}" rx="2.2" ry="2.6"/>`; }).join('')}<ellipse cx="2" rx="1.8" ry="2.2"/></g></g>`;
// 絆創膏（熊本叫「リバテープ」）
const BANDAGE = '<g transform="rotate(-25 62 142)"><rect x="50" y="137" width="26" height="10" rx="5" fill="#e8c8a0" stroke="var(--ink)" stroke-width="1.8"/><rect x="58" y="138.5" width="10" height="7" fill="#f4e4cc"/><g fill="#c9a47a"><circle cx="54" cy="140" r=".7"/><circle cx="54" cy="144" r=".7"/><circle cx="72" cy="140" r=".7"/><circle cx="72" cy="144" r=".7"/></g></g>';

// --- 大分縣 ---
// 溫泉：木製湯桶冒出溫泉記號般的三道熱氣
const onsen = (strong) => `<g>
  <g transform="translate(0 -3) translate(100 13) scale(.75) translate(-100 -13)"><g class="${strong ? 'shake' : ''}"><path d="M86,24 C82,18 90,14 86,6 M100,22 C96,16 104,12 100,2 M114,24 C110,18 118,14 114,6" fill="none" stroke="var(--ink)" stroke-width="${strong ? 7.4 : 6.4}" stroke-linecap="round"/>
  <path d="M86,24 C82,18 90,14 86,6 M100,22 C96,16 104,12 100,2 M114,24 C110,18 118,14 114,6" fill="none" stroke="#e05a4a" stroke-width="${strong ? 4.4 : 3.6}" stroke-linecap="round"/></g></g>
  <path d="M76,30 H124 L119,56 H81 Z" fill="#d9b27a" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M77,36 H123 M80,50 H120" stroke="#8a5a3b" stroke-width="2.6"/><path d="M90,30 L88,56 M100,30 V56 M110,30 L112,56" stroke="#b88a52" stroke-width="1.2"/>
  <ellipse cx="100" cy="30" rx="24" ry="5" fill="#9fd4e0" stroke="var(--ink)" stroke-width="2.4"/></g>`;
// 雞肉天婦羅：盤子上幾塊麵衣金黃的雞肉，旁邊一瓣臭橙
// 雞肉天婦羅：細長、麵衣邊緣皺皺的條狀，每塊各自描邊，從後往前疊
const toriPiece = (x, y, a) => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M-9,-2 q2,-3 4,0 q2,-3 4,0 q2,-3 4,0 q2,-3 4,0 q3,1 1,4 q-2,3 -4,0 q-2,3 -4,0 q-2,3 -4,0 q-2,3 -4,0 q-3,-1 -1,-4 Z" fill="#f0c86a" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/><g fill="#d9993a"><circle cx="-4" cy="0" r=".8"/><circle cx="2" cy="-.6" r=".8"/></g></g>`;
const toriten = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <ellipse rx="22" ry="9" fill="#fbfbf8" stroke="var(--ink)" stroke-width="2.4"/>
  ${toriPiece(-6, -6, -14)}${toriPiece(7, -6, 18)}${toriPiece(-11, -1, 8)}${toriPiece(3, -1, -8)}${toriPiece(-3, 3, 4)}
  <path d="M10,4 A7,7 0 0 1 22,-2 Z" fill="#dfe9a6" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/><path d="M11,3.4 A6,6 0 0 1 21,-1.4" fill="none" stroke="#5f9b3c" stroke-width="1.6"/></g>`;

// --- 宮崎縣 ---
// 加那利海棗（フェニックス）：粗壯有菱紋的樹幹、往外垂的羽狀葉
const PHOENIX = `<g>
  <path d="M94,70 C94,56 95,44 97,32 H103 C105,44 106,56 106,70 Z" fill="#a8743e" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M95,62 l11,-6 M95,54 l11,-6 M96,46 l9,-5 M105,62 l-10,-6 M105,54 l-10,-6 M104,46 l-8,-5" stroke="#7d5428" stroke-width="1.2"/>
  <path d="M91,46 C87,40 92,33 100,33 C108,33 113,40 109,46 C106,51 94,51 91,46 Z" fill="#6e9a3a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M94,40 l2,2 M100,43 l2,2 M105,39 l2,2 M96,46 l2,1.4 M104,46 l2,1.4" stroke="#4d7a2a" stroke-width="1.2" stroke-linecap="round"/>
  ${[[-160, 30], [-130, 34], [-100, 30], [-80, 30], [-50, 34], [-20, 30], [170, 26], [10, 26]].map(([a, r]) => { const [ex, ey] = pt(100, 30, r, a), [cx, cy] = pt(100, 30, r * .6, a - 18); return `<path d="M100,30 Q${cx.toFixed(1)},${cy.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}" fill="none" stroke="var(--ink)" stroke-width="6" stroke-linecap="round"/><path d="M100,30 Q${cx.toFixed(1)},${cy.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}" fill="none" stroke="#5f9b3c" stroke-width="3.6" stroke-linecap="round" stroke-dasharray="3 1.4"/>`; }).join('')}
  <circle cx="100" cy="31" r="4" fill="#4d8a30" stroke="var(--ink)" stroke-width="2"/></g>`;
// 芒果（太陽のタマゴ）：紅到橙的漸層、不對稱的腰果形
const mango = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(1.3)">
  <path d="M-12,4 C-15,-8 -3,-17 7,-13 C16,-9 15,6 6,12 C-1,17 -10,14 -12,4 Z" fill="#e8483a" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M-4,8 C2,10 8,6 10,0 C11,6 6,11 0,12 C-3,12 -5,10 -4,8 Z" fill="#f2a03a"/><path d="M-8,-4 C-7,-8 -3,-11 1,-11" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>
  <ellipse cx="3" cy="-2" rx="5.6" ry="3.8" fill="#2b2626" stroke="#e1bf55" stroke-width="1.3"/><path d="M.4,-1 L.8,-4 L2,-2.6 L3,-4.6 L4,-2.6 L5.2,-4 L5.6,-1 Z" fill="#e1bf55"/></g>`;
// 南蠻雞：炸雞淋甜醋、蓋上塔塔醬
const NANBAN = `<g transform="translate(34 162)"><ellipse rx="20" ry="9" fill="#fbfbf8" stroke="var(--ink)" stroke-width="2.4"/>
  <path d="M-14,-2 C-14,-10 12,-12 14,-3 C14,3 -12,4 -14,-2 Z" fill="#d9993e" stroke="var(--ink)" stroke-width="1.8"/><path d="M-6,-7 V0 M2,-8 V0" stroke="#a8692a" stroke-width="1.2"/>
  <path d="M-8,-6 C-10,-12 2,-14 6,-10 C10,-6 4,-2 -2,-3 C-6,-3 -8,-4 -8,-6 Z" fill="#fbf8e8" stroke="var(--ink)" stroke-width="1.6"/><g fill="#6aa84f"><circle cx="-3" cy="-8" r=".8"/><circle cx="2" cy="-7" r=".8"/></g></g>`;

// --- 鹿兒島縣 ---
// 櫻島：雙峰的火山，平常冒一點煙；生氣時大噴發、落下火山灰
function sakurajima(mood = 'calm') {
  const big = mood === 'erupt';
  // 火山灰一團一團分開，往右上飄
  const smoke = big
    ? [[104, 8, 5], [115, 2, 4], [126, 6, 3.4], [93, 3, 3.8]]
    : [[110, 9, 3.6], [119, 4, 3], [128, 1, 2.4]];
  return `<g>
    <g fill="#c4bfb4" stroke="var(--ink)" stroke-width="2">${smoke.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>
    ${big ? '<g fill="#8a857b"><circle cx="70" cy="30" r="1.4"/><circle cx="80" cy="22" r="1.2"/><circle cx="126" cy="26" r="1.4"/><circle cx="134" cy="36" r="1.2"/><circle cx="76" cy="40" r="1.2"/><circle cx="124" cy="42" r="1.2"/></g>' : ''}
    <path d="M64,55.5 C72,44 82,30 90,22 L96,24 L104,16 C116,24 128,40 136,55.5 Q100,32.5 64,55.5 Z" fill="#6b7f8a"/>
    <path d="M90,22 L96,24 L104,16 L108,20 C100,26 94,28 86,26 Z" fill="#8a7a6a"/>
    <path d="M64,55.5 C72,44 82,30 90,22 L96,24 L104,16 C116,24 128,40 136,55.5 Q100,32.5 64,55.5 Z" fill="none" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/></g>`;
}
// 克灰袋：鹿兒島市發給市民裝火山灰的黃色袋子
// 白熊：碗裡的煉乳刨冰，上面的水果排成熊臉
const shirokuma = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M-14,2 H14 L10,15 H-10 Z" fill="#dfeef6" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M-16,3 C-16,-14 16,-14 16,3 Z" fill="#fbfbf8" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <ellipse cx="-10" cy="-6" rx="3" ry="2.4" fill="#f2a03a" stroke="var(--ink)" stroke-width="1"/><ellipse cx="10" cy="-6" rx="3" ry="2.4" fill="#f2a03a" stroke="var(--ink)" stroke-width="1"/>
  <circle cx="-4.6" cy="-5" r="1.6" fill="#4a2a22"/><circle cx="4.6" cy="-5" r="1.6" fill="#4a2a22"/><circle cy="-1" r="2.6" fill="#d8242a" stroke="var(--ink)" stroke-width="1"/>
  <path d="M-8,0 l3,1 M8,0 l-3,1" stroke="#6aa84f" stroke-width="1.8" stroke-linecap="round"/></g>`;
const kokuhai = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M-12,-10 L12,-10 L13,14 C13,16 11,17 9,17 H-9 C-11,17 -13,16 -13,14 Z" fill="#f2c33a" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M-12,-10 C-8,-14 -4,-12 -3,-16 C-1,-20 1,-20 3,-16 C4,-12 8,-14 12,-10" fill="#f2c33a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <rect x="-9" y="-6" width="18" height="10" fill="#fbf8f0" stroke="var(--ink)" stroke-width="1.4"/><text x="0" y="1.8" font-size="6.6" text-anchor="middle" fill="var(--ink)" font-weight="700">克灰袋</text>
  <g fill="#8a857b"><circle cx="-6" cy="10" r="1"/><circle cx="1" cy="12" r="1"/><circle cx="6" cy="9" r="1"/></g></g>`;

// ===== 五畿七道（續）=====
// 七道共用：蛋形、上緣是該道代表色的浮世繪「一文字暈染」，和東海道一致
const kidoGrad = (band, light, dark) => [[0, band], [.24, band], [.42, light], [1, dark]];

// --- 畿內 ---
// 立烏帽子：宮廷貴族的黑色高帽，頂端微彎
const EBOSHI = `<g><path d="M86,50 C84,32 88,14 102,4 C108,8 112,14 110,20 C116,30 118,42 116,50 Z" fill="#2b2626" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M90,40 C98,38 106,38 114,40 M90,32 C98,30 104,30 113,32 M92,24 C98,22 104,22 110,24 M96,16 C100,14 104,14 107,16" fill="none" stroke="#5a5454" stroke-width="1.3"/>
  <ellipse cx="101" cy="51" rx="18" ry="4.4" fill="#2b2626" stroke="var(--ink)" stroke-width="2.4"/>
  <path d="M84,52 C78,60 76,66 78,70 M118,52 C124,60 126,66 124,70" fill="none" stroke="#fbfbf8" stroke-width="2" stroke-linecap="round"/></g>`;
// 笏：貴族上朝時拿的細長木板
const shaku = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M-4.5,10 V-26 C-4.5,-31 4.5,-31 4.5,-26 V10 C4.5,12 -4.5,12 -4.5,10 Z" fill="#e2c897" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M-1.5,-24 V6" stroke="#c4a46a" stroke-width="1.2"/></g>`;
// 條坊制的都城：棋盤狀的道路
const JOBO = `<g transform="translate(34 156)"><rect x="-20" y="-18" width="40" height="34" fill="#f3ead6" stroke="var(--ink)" stroke-width="2.2"/>
  <path d="M-20,-10 H20 M-20,-2 H20 M-20,6 H20 M-12,-18 V16 M-4,-18 V16 M4,-18 V16 M12,-18 V16" stroke="#c4a46a" stroke-width="1"/><path d="M0,-18 V16" stroke="#c8463a" stroke-width="2.4"/><rect x="-6" y="-18" width="12" height="6" fill="#4a3a78" stroke="var(--ink)" stroke-width="1.4"/></g>`;

// --- 東山道 ---
// 山路：三座雪山，中間一條之字形的路
const YAMAJI = `<g><path d="M60,54 L80,24 L92,38 L106,10 L124,38 L132,30 L142,54 Z" fill="#6b8a5a" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M74,33 L80,24 L86,32 L83,30 L80,33 L77,31 Z M98,22 L106,10 L114,22 L110,20 L106,24 L102,20 Z" fill="#fbfbf8" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M104,54 L94,48 L108,42 L98,36 L106,28" fill="none" stroke="#e2c897" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></g>`;
// 過所：律令時代通過關所用的木簡
const kasho = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <rect x="-6" y="-30" width="12" height="40" rx="1.5" fill="#e8d4a8" stroke="var(--ink)" stroke-width="2.4"/>
  <text x="0" y="-18" font-size="9" text-anchor="middle" fill="var(--ink)" font-weight="700">過</text><text x="0" y="-7" font-size="9" text-anchor="middle" fill="var(--ink)" font-weight="700">所</text>
  <path d="M-3,0 h6 M-3,4 h6" stroke="#8a6a3e" stroke-width="1.2"/></g>`;

// --- 北陸道 ---
// 積雪的菅笠：圓錐形斗笠上堆著厚厚的雪（笠沿下的冰柱像牙齒，已拿掉）
const YUKIGASA = `<g><path d="M58,52 L100,24 L142,52 Q100,58 58,52 Z" fill="#d8b56d" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M68,48 L100,28 L132,48 M80,50 L100,30 M120,50 L100,30" fill="none" stroke="#b48a3c" stroke-width="1.3"/>
  <path d="M70,46 C70,36 82,28 92,26 C96,16 110,14 114,24 C126,26 134,36 132,46 C118,42 84,42 70,46 Z" fill="#fbfdff" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/></g>`;
// かんじき：雪地用的木圈雪鞋。參考圖的關鍵是水滴形木環，中間用繩子編成網，成對（設定/參考卡.md）
const kanjiki1 = `<path d="M0,-18 C9,-18 11,-6 10,4 C9,12 5,17 0,17 C-5,17 -9,12 -10,4 C-11,-6 -9,-18 0,-18 Z" fill="none" stroke="var(--ink)" stroke-width="5.4"/>
  <path d="M0,-18 C9,-18 11,-6 10,4 C9,12 5,17 0,17 C-5,17 -9,12 -10,4 C-11,-6 -9,-18 0,-18 Z" fill="none" stroke="#a8743e" stroke-width="3"/>
  <path d="M-9,-7 H9 M-9,9 H9" stroke="#a8743e" stroke-width="2.4"/>
  <path d="M-9,-7 L-4,9 L0,-7 L4,9 L9,-7 M-9,9 L-4,-7 M4,-7 L9,9 M-6,1 H6" fill="none" stroke="#d8763a" stroke-width="1.5" stroke-linejoin="round"/>`;
const kanjiki = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><g transform="translate(15 4) rotate(12)">${kanjiki1}</g>${kanjiki1}</g>`;

// --- 山陰道 ---
// 山陰的雲：頭上一朵灰雲，飄著細雨
const KUMORI = `<g><path d="M70,40 C64,40 62,30 70,28 C70,18 84,14 90,22 C94,12 112,12 114,24 C124,20 136,28 130,38 C134,42 130,46 124,46 H76 C70,46 66,44 70,40 Z" fill="#c6cad4" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M80,24 C84,20 90,20 92,24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/>
  <path d="M82,50 l-2,5 M96,50 l-2,5 M110,50 l-2,5 M124,50 l-2,5" stroke="#6b8fb8" stroke-width="2" stroke-linecap="round"/></g>`;
// 丁銀：石見銀山的細長銀塊；參考圖的關鍵是凹凸不平、像海參的長條，表面散布方形極印（設定/參考卡.md）
// 極印位置錯開、大小不一，避免三個並排被看成臉
const chogin = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M-24,0 C-25,-6 -20,-9 -14,-8 C-10,-11 -3,-11 1,-8 C6,-11 13,-11 18,-7 C23,-6 26,-1 24,3 C23,8 17,10 11,8 C6,11 -1,11 -6,8 C-11,11 -19,10 -22,6 C-24,4 -24,2 -24,0 Z" fill="#c9ced6" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M-17,-5 C-12,-7 -6,-7 -2,-6 M6,-7 C10,-8 14,-7 17,-5" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".85"/>
  <path d="M-7,4 c2,2 5,2 7,0 M14,3 c1,2 3,2 5,1" fill="none" stroke="#9aa2ad" stroke-width="1.2" stroke-linecap="round"/>
  <g fill="#b4bac4" stroke="#6b7480" stroke-width="1.2"><rect x="-19" y="-4" width="8" height="8" rx="1" transform="rotate(-8 -15 0)"/><rect x="3" y="-5" width="6" height="6" rx="1" transform="rotate(10 6 -2)"/><rect x="12" y="0" width="5" height="5" rx="1"/></g>
  <text x="-15" y="2.4" font-size="6" text-anchor="middle" fill="#4f5763" font-weight="700" transform="rotate(-8 -15 0)">寳</text></g>`;

// --- 山陽道 ---
// 太陽：山的南側、陽光燦爛
const HINATA = `<g><g stroke="#e8962a" stroke-width="3" stroke-linecap="round">${Array.from({ length: 10 }, (_, i) => { const a = 180 + i * 20, [x0, y0] = pt(100, 34, 21, a), [x1, y1] = pt(100, 34, 28, a); return `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}"/>`; }).join('')}</g>
  <circle cx="100" cy="34" r="16" fill="#f5b335" stroke="var(--ink)" stroke-width="2.8"/><path d="M90,28 C92,24 96,22 100,22" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".7"/></g>`;
// 驛鈴：律令的使者帶著驛鈴，到驛家換馬
// 參考圖（隱岐的驛鈴）的關鍵是深色青銅、切角的方形鈴身，頂上一個大圓環，繫紅繩（設定/參考卡.md）
const ekirei = (x, y, rot = 0, ring = false) => `<g transform="translate(${x} ${y}) rotate(${rot})"><g class="${ring ? 'swing' : ''}">
  <path d="M2,-24 C10,-22 14,-14 12,-6 M12,-6 l-3,8 M12,-6 l1,9 M12,-6 l4,7" fill="none" stroke="#c8463a" stroke-width="2" stroke-linecap="round"/>
  <circle cy="-24" r="5.5" fill="none" stroke="var(--ink)" stroke-width="5"/><circle cy="-24" r="5.5" fill="none" stroke="#5a5444" stroke-width="2.4"/>
  <path d="M-11,-14 L-7,-18 H7 L11,-14 V8 L7,12 H-7 L-11,8 Z" fill="#4a4638" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M-8,-14 L-5,-16 H5" fill="none" stroke="#7a7460" stroke-width="1.6" stroke-linecap="round"/>
  <rect x="-6" y="-11" width="12" height="18" rx="1" fill="none" stroke="#8a8266" stroke-width="1.2"/>
  <g font-size="6.4" font-weight="700" fill="#b8ad88" text-anchor="middle"><text y="-3.6">驛</text><text y="4.4">鈴</text></g></g>
  ${ring ? '<path d="M14,-14 q4,2 4,6 M18,-20 q6,4 6,10" fill="none" stroke="var(--ink)" stroke-width="1.8" stroke-linecap="round"/>' : ''}</g>`;

// --- 南海道 ---
// 遍路的菅笠：圓錐形斗笠，寫著「同行二人」
const HENRO_GASA = `<g><path d="M56,50 L100,16 L144,50 Q100,58 56,50 Z" fill="#efe4c4" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M66,46 L100,20 L134,46 M82,49 L100,22 M118,49 L100,22" fill="none" stroke="#cdbb8a" stroke-width="1.2"/>
  <text x="100" y="45" font-size="7" text-anchor="middle" fill="var(--ink)" font-weight="700">同行二人</text></g>`;
// 金剛杖：遍路的白木杖，頂上包著布、掛著小鈴
const kongozue = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M0,18 V-44" stroke="var(--ink)" stroke-width="7" stroke-linecap="round"/><path d="M0,18 V-44" stroke="#f1e8d0" stroke-width="4.4" stroke-linecap="round"/>
  <path d="M-3.5,-44 h7 M-3.5,-40 h7 M-3.5,-36 h7" stroke="#b8a878" stroke-width="1.2"/>
  <path d="M-5,-32 h10 l-1,10 h-8 Z" fill="#7a4a8a" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/><circle cx="7" cy="-22" r="3" fill="#e1bf55" stroke="var(--ink)" stroke-width="1.6"/></g>`;

// --- 西海道 ---
// 遣唐使船：木造船身，兩面網代帆
const KENTOSHI = `<g><path d="M60,42 C70,52 130,52 142,40 L136,36 H66 Z" fill="#8a5a3b" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M70,42 H132" stroke="#c8463a" stroke-width="2.4"/>
  <path d="M86,36 V8 M114,36 V12" stroke="var(--ink)" stroke-width="2.4" stroke-linecap="round"/>
  <rect x="76" y="10" width="20" height="22" rx="1.5" fill="#e8d4a0" stroke="var(--ink)" stroke-width="2.2"/><rect x="105" y="14" width="18" height="19" rx="1.5" fill="#e8d4a0" stroke="var(--ink)" stroke-width="2.2"/>
  <path d="M76,16 H96 M76,22 H96 M76,28 H96 M105,20 H123 M105,26 H123" stroke="#b8a070" stroke-width="1.2"/>
  <path d="M86,8 l8,2 l-8,2 Z" fill="#c8463a"/></g>`;
// 金印：志賀島出土的「漢委奴國王」金印，方形印台上蹲著一條蛇
const kinin = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <rect x="-24" y="-4" width="12" height="12" fill="#fbf8f0" stroke="#d23b33" stroke-width="1.6"/><path d="M-22,-1 h8 M-22,3 h8 M-18,-2 v9" stroke="#d23b33" stroke-width="1.4"/>
  <rect x="-8" y="-6" width="20" height="14" fill="#e8c04a" stroke="var(--ink)" stroke-width="2.4"/><path d="M-6,-3 V5" stroke="#fff4c4" stroke-width="2" stroke-linecap="round" opacity=".8"/>
  <ellipse cx="2" cy="-8" rx="9" ry="4" fill="#d9ac2a" stroke="var(--ink)" stroke-width="2"/><ellipse cx="2" cy="-12" rx="6.4" ry="3.4" fill="#e8c04a" stroke="var(--ink)" stroke-width="2"/>
  <path d="M6,-13 C10,-18 14,-18 15,-15 C15,-12 12,-12 9,-12" fill="#e8c04a" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/><circle cx="12.6" cy="-15.4" r=".9" fill="var(--ink)"/></g>`;

// ===== 律令國（續）=====
// 律令國共用：和出雲國一樣是浮空的雲形、沒有腳，表示它們是現代縣切換出來的歷史殘響
const ryoSlime = (o) => slime(Object.assign({ shape: 'cloud' }, o));

// --- 大和國 ---
// 前方後圓墳：從上空看的鑰匙孔形，直立擺放（圓的後圓部在上、往下變寬的前方部在下），
// 墳丘畫出三段築成的段差線，外圍一圈同形的周濠。橫放時不容易認出是鑰匙孔（2026-11-09 使用者回饋）
const keyhole = (cy, r, yj, hw, yb) => { const a = Math.sqrt(r * r - (yj - cy) ** 2).toFixed(1);
  return `M${100 - a},${yj} L${100 - hw},${yb} H${100 + hw} L${100 + +a},${yj} A${r},${r} 0 1,0 ${100 - a},${yj} Z`; };
// 直立後變高，往下多蓋住頭頂一些來放大（圖鑑 viewBox 上緣是 -4，最高只能到 -2）
const KOFUN = `<g transform="translate(100 70) scale(1.24) translate(-100 -58)"><path d="${keyhole(20, 20, 34, 29, 58)}" fill="#a8d4ea" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="${keyhole(20, 14, 31, 21, 52)}" fill="#6b9a4a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="${keyhole(20, 8.5, 28, 14, 46)}" fill="none" stroke="#4f7a34" stroke-width="1.3" stroke-linejoin="round"/>
  <g fill="#4f7a34">${[[95, 14], [104, 17], [99, 24], [93, 42], [106, 40], [100, 34]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.7"/>`).join('')}</g>
  <path d="M73,52 q3,-2 6,0 M121,52 q3,-2 6,0" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/></g>`;
// 銅鏡：背面朝外的青銅鏡，中央鈕和同心紋
const dokyo = (x, y) => `<g transform="translate(${x} ${y})"><circle r="15" fill="#5f9a8a" stroke="var(--ink)" stroke-width="2.6"/>
  <circle r="11" fill="none" stroke="#3f7a6a" stroke-width="1.6"/><circle r="7" fill="none" stroke="#3f7a6a" stroke-width="1.2" stroke-dasharray="2 1.6"/>
  <circle r="3.4" fill="#8fc2b0" stroke="var(--ink)" stroke-width="1.6"/><path d="M-12,-5 A13,13 0 0 1 -4,-12" fill="none" stroke="#bfe2d4" stroke-width="2" stroke-linecap="round"/></g>`;
CHARS.push({
  id: 'yamato', name: '大和國', kind: '律令國・大和國（今奈良縣）', tagColor: '#5f8a4a', motto: '「『やまと』，原本就是我的名字。」',
  colors: [['古墳綠', '#6B9A4A'], ['青銅', '#5F9A8A'], ['土師', '#E6D8B8']],
  look: f => ryoSlime({ grad: [[0, '#fbfaf3'], [.6, '#efe9d6'], [1, '#d8cca8']], limb: '#efe9d6', face: f.face || 'calm', armUp: f.armUp,
    head: KOFUN, front: f.armUp ? dokyo(174, 86) : dokyo(166, 138), extra: f.extra }),
  faces: [
    { face: 'calm', name: '常態', k: '( ˘ω˘ )', q: '古老、從容' },
    { face: 'smileW', name: 'やまと', k: '( ^ω^ )', q: '「大和」後來成了整個日本的稱呼' },
    { face: 'serious', armUp: true, name: '銅鏡', k: '(｀・ω・´)', q: '古墳裡陪葬的銅鏡，背面才是有花紋的那面' },
    { face: 'flat', name: '沉穩模式', k: '( ・_・)', q: '嚴肅主題專用' },
  ],
  acc: [['前方後圓墳', '從上空看像鑰匙孔的古墳，周圍有護城河。大和是這種古墳最集中的地方之一。'], ['銅鏡', '古墳時代的青銅鏡，背面中央有鈕、繞著同心紋。']],
  persona: '一切的起點。古老、從容，說話像在講神話；看大家都像晚輩。',
  diff: '奈良君的歷史殘響。奈良君平常悠哉餵鹿，切換成大和國時變成「國家起源」的長輩。和出雲國同樣古老：出雲講神話，大和講朝廷。',
  points: ['（口頭禪）「やまと，原本是我的名字。」', '（怪癖）看到小山會說「那是古墳」。', '（雷點）「飛鳥、藤原、平城，都城都在我這裡。」'],
  power: '變形「前方後圓墳」：變成巨大的鑰匙孔形古墳，防禦力最高。技能「銅鏡反射」：用銅鏡把對手的技能反射回去。',
  why: '律令國沒有草稿，照 SOP 設成奈良君切換出來的歷史殘響，外型沿用出雲國的雲形浮空。奈良君已經有鹿，大和國改用古墳時代的東西：從上空看的前方後圓墳、手上的銅鏡，一看就是「更古老」。',
});

// --- 武藏國 ---
// 武藏野的月：沒有山的原野，月亮從芒草裡升起。
// 芒草畫成一叢蓬鬆的穗擋住月亮下半，不畫細莖圍著圓月（會像蜘蛛）
const plume = (x0, x1, y1) => { const r = Math.atan2(x1 - x0, 52 - y1) * 180 / Math.PI;
  return `<path d="M${x0},52 Q${x0},${(52 + y1) / 2} ${x1},${y1}" fill="none" stroke="#8a7a40" stroke-width="2"/>
  <g transform="translate(${x1} ${y1}) rotate(${r.toFixed(1)})"><path d="M0,4 C-6,-2 -6,-14 1,-22 C7,-14 6,-2 0,4 Z" fill="#efe2c0" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/><path d="M0,0 L0,-14 M0,-6 l-3,-4 M0,-10 l3,-4" stroke="#c9b27a" stroke-width="1.1" stroke-linecap="round"/></g>`; };
const MUSASHINO = `<g><circle cx="108" cy="22" r="19" fill="#f6e7a8" stroke="var(--ink)" stroke-width="2.6"/>
  <path d="M98,12 C100,8 104,6 108,6" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".7"/>
  <path d="M86,52 C78,46 70,44 62,46 M110,52 C118,46 126,46 134,48" fill="none" stroke="var(--ink)" stroke-width="4.2" stroke-linecap="round"/><path d="M86,52 C78,46 70,44 62,46 M110,52 C118,46 126,46 134,48" fill="none" stroke="#7a9a4a" stroke-width="2.2" stroke-linecap="round"/>
  ${[[86, 66, 32], [92, 78, 26], [98, 92, 34], [104, 98, 28], [110, 112, 36]].map(([a, b, c]) => plume(a, b, c)).join('')}</g>`;
// 和同開珎：708 年的錢幣，原料是武藏國秩父採到的自然銅（年號也因此改成和銅）
const wadokaichin = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><circle r="13" fill="#b4673e" stroke="var(--ink)" stroke-width="2.6"/><circle r="10.4" fill="none" stroke="#8e4a2a" stroke-width="1.2"/>
  <circle cx="-7" cy="7" r="2.4" fill="#6fa08a" opacity=".8"/><circle cx="8" cy="-8" r="1.6" fill="#6fa08a" opacity=".8"/>
  <rect x="-3.4" y="-3.4" width="6.8" height="6.8" fill="var(--bg, #fff)" stroke="var(--ink)" stroke-width="1.8"/>
  <g font-size="5.6" font-weight="700" fill="#4a2410" text-anchor="middle"><text y="-5">和</text><text y="9.4">同</text><text x="7.2" y="2">開</text><text x="-7.2" y="2">珎</text></g></g>`;

// --- 尾張國 ---
// 千成瓢簞：一串葫蘆，出身尾張的豐臣秀吉的馬印
const HYOTAN = `<g><path d="M100,6 V16" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/><path d="M84,16 H116" stroke="#c8463a" stroke-width="3.4" stroke-linecap="round"/>
  ${[[82, 0], [94, 6], [106, 6], [118, 0], [100, -6]].map(([x, dy], i) => { const y = 32 + dy; return `<g transform="translate(${x} ${y})"><path d="M0,-14 C-4,-14 -5,-10 -3,-7 C-8,-5 -9,2 -7,6 C-5,10 5,10 7,6 C9,2 8,-5 3,-7 C5,-10 4,-14 0,-14 Z" fill="#e8b84a" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/><path d="M0,-14 V${-16 - dy}" stroke="#8a5a3b" stroke-width="1.4"/><path d="M-4,-2 C-4,2 -3,4 -1,5" fill="none" stroke="#fff4c4" stroke-width="1.6" stroke-linecap="round"/></g>`; }).join('')}</g>`;
// 永樂通寶：織田信長旗印上的銅錢
const eiraku = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><circle r="14" fill="#c9a24a" stroke="var(--ink)" stroke-width="2.6"/><circle r="11" fill="none" stroke="#a8822a" stroke-width="1.2"/>
  <rect x="-3.6" y="-3.6" width="7.2" height="7.2" fill="var(--bg, #fff)" stroke="var(--ink)" stroke-width="1.8"/>
  <g font-size="6" font-weight="700" fill="#5a3e12" text-anchor="middle"><text y="-5.4">永</text><text y="10">樂</text><text x="7.6" y="2.2">通</text><text x="-7.6" y="2.2">寶</text></g></g>`;

// --- 甲斐國 ---
// 武田菱：四個菱形組成的家紋，畫在黑漆陣笠的正面（原本畫在插在頭上的圓牌，像棒棒糖）
const TAKEDABISHI = `<g><ellipse cx="100" cy="54" rx="46" ry="8" fill="#2b2626" stroke="var(--ink)" stroke-width="2.6"/>
  <path d="M62,54 C70,40 86,28 100,26 C114,28 130,40 138,54 C124,59 76,59 62,54 Z" fill="#2b2626" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M74,48 C82,38 90,33 98,31" fill="none" stroke="#5a5560" stroke-width="2" stroke-linecap="round"/><circle cx="100" cy="27" r="2.6" fill="#e1bf55" stroke="var(--ink)" stroke-width="1.4"/>
  <g fill="#c8323a" stroke="#e1bf55" stroke-width="1.2" stroke-linejoin="round">${[[0, -5], [-5, 0], [5, 0], [0, 5]].map(([dx, dy]) => `<path d="M${100 + dx},${44 + dy - 4.6} l4.6,4.6 l-4.6,4.6 l-4.6,-4.6 Z"/>`).join('')}</g></g>`;
// 軍配：武將指揮用的團扇，傳說信玄在川中島用它擋下謙信的太刀
const gunbai = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <rect x="-2.5" y="-4" width="5" height="20" rx="2" fill="#8a5a3b" stroke="var(--ink)" stroke-width="1.8"/><path d="M0,16 c-3,4 -3,8 0,10 c3,-2 3,-6 0,-10" fill="#c8323a" stroke="var(--ink)" stroke-width="1.2"/>
  <path d="M0,-4 C-4,-6 -5,-9 -5,-11 C-15,-13 -18,-24 -15,-32 C-11,-42 11,-42 15,-32 C18,-24 15,-13 5,-11 C5,-9 4,-6 0,-4 Z" fill="#2b2626" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <circle cy="-26" r="6.4" fill="#d23b33"/><path d="M-11,-18 C-6,-15 6,-15 11,-18" fill="none" stroke="#e1bf55" stroke-width="1.6"/><path d="M-9,-34 C-5,-38 5,-38 9,-34" fill="none" stroke="#e1bf55" stroke-width="1.6"/></g>`;
// 越後送來的鹽
const SHIO_RECV = `<g transform="translate(34 158)"><path d="M-16,-8 C-18,-2 -18,4 -16,10 H16 C18,4 18,-2 16,-8 Z" fill="#d9c07a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/><path d="M-17,-4 H17 M-17,6 H17" stroke="#a8874a" stroke-width="1.6"/>
  <rect x="-7" y="-6" width="14" height="10" fill="#fbfbf8" stroke="var(--ink)" stroke-width="1.4"/><text y="2.4" font-size="7.5" text-anchor="middle" fill="var(--ink)" font-weight="700">塩</text></g>`;

// --- 越後國 ---
// 「毘」字旗：毘沙門天的毘，左手握著旗竿（原本從背後冒出來，看不出怎麼插）；旗面在竿的左側，不擋身體
const BI_FLAG = `<g><path d="M31,160 L37,10" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><path d="M31,160 L37,10" stroke="#8a5a3b" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M36,14 H10 L11,58 H35 Z" fill="#fbfbf8" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/><text x="23" y="42" font-size="17" text-anchor="middle" fill="var(--ink)" font-weight="700">毘</text></g>`;
// 鹽俵：要送給宿敵的鹽
const shiodawara = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M-15,-9 C-17,-3 -17,3 -15,9 H15 C17,3 17,-3 15,-9 Z" fill="#d9c07a" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <ellipse cx="-15" rx="3" ry="9" fill="#c9a862" stroke="var(--ink)" stroke-width="2"/><path d="M-8,-9 V9 M8,-9 V9" stroke="#a8874a" stroke-width="2"/>
  <rect x="-5.5" y="-5" width="11" height="10" fill="#fbfbf8" stroke="var(--ink)" stroke-width="1.4"/><text y="3" font-size="7.5" text-anchor="middle" fill="var(--ink)" font-weight="700">塩</text></g>`;

// --- 陸奧國 ---
// 金色堂：中尊寺的金色小堂，寶形屋頂、頂上寶珠
const KONJIKIDO = `<g><path d="M100,6 C96,6 95,10 97,12 H103 C105,10 104,6 100,6 Z" fill="#f2d25a" stroke="var(--ink)" stroke-width="1.8"/>
  <path d="M100,12 L66,32 H134 Z" fill="#e8b830" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/><path d="M100,12 L84,32 M100,12 L116,32" stroke="#c99a1a" stroke-width="1.3"/>
  <rect x="76" y="32" width="48" height="18" fill="#f2cc4a" stroke="var(--ink)" stroke-width="2.4"/>
  <path d="M88,32 V50 M100,32 V50 M112,32 V50" stroke="#c99a1a" stroke-width="1.6"/><rect x="94" y="38" width="12" height="12" fill="#c99a1a" stroke="var(--ink)" stroke-width="1.6"/>
  <path d="M70,52 H130" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/><path d="M70,52 H130" stroke="#c99a1a" stroke-width="2" stroke-linecap="round"/></g>`;
// 砂金袋：束口布袋。袋口收緊、上面皺褶散開、繩子垂下，才看得出是袋子（原本像陶壺）
const sakin = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M-3,-6 C-7,-4 -12,-1 -13,5 C-14,13 -7,17 0,17 C7,17 14,13 13,5 C12,-1 7,-4 3,-6 Z" fill="#a8743e" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M-3,-6 C-8,-9 -9,-14 -5,-14 C-3,-17 3,-17 5,-14 C9,-14 8,-9 3,-6 Z" fill="#a8743e" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <ellipse cy="-12.6" rx="3.6" ry="1.6" fill="#f2d25a" stroke="var(--ink)" stroke-width="1.2"/>
  <path d="M-4,-6 H4" stroke="#d23b33" stroke-width="2.6" stroke-linecap="round"/><path d="M3,-6 C6,-2 6,2 4,5 M3,-6 C8,-3 9,1 8,4" fill="none" stroke="#d23b33" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M-8,4 C-8,9 -5,12 -2,13" fill="none" stroke="#c8925a" stroke-width="1.6" stroke-linecap="round"/></g>`;

// --- 因幡國 ---
// 因幡的白兔：坐著的白兔，紅眼睛、長耳朵
const SHIROUSAGI = `<g><ellipse cx="104" cy="42" rx="17" ry="12" fill="#fbfbf8" stroke="var(--ink)" stroke-width="2.6"/>
  <circle cx="120" cy="44" r="4" fill="#fbfbf8" stroke="var(--ink)" stroke-width="2"/>
  <path d="M84,24 C80,12 82,2 86,2 C90,2 92,12 90,22 Z" fill="#fbfbf8" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/><path d="M85,20 C84,12 85,6 86,5" fill="none" stroke="#f2b8c4" stroke-width="2" stroke-linecap="round"/>
  <path d="M92,24 C94,12 98,4 102,6 C105,8 100,18 96,24 Z" fill="#fbfbf8" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/><path d="M95,21 C97,14 99,9 101,8" fill="none" stroke="#f2b8c4" stroke-width="2" stroke-linecap="round"/>
  <circle cx="88" cy="32" r="11" fill="#fbfbf8" stroke="var(--ink)" stroke-width="2.6"/>
  <circle cx="84" cy="31" r="2.2" fill="#d23b3b"/><circle cx="78" cy="35" r="1.2" fill="#f2a0b0"/><path d="M80,37 l-6,-1 M80,38 l-6,2" stroke="#9aa0a6" stroke-width="1" stroke-linecap="round"/>
  <path d="M96,52 C98,48 104,48 106,52" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/></g>`;
// 蒲の穂：神話裡治好白兔的香蒲
const gama = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M0,12 V-40 M5,12 C5,-4 7,-18 10,-30" fill="none" stroke="var(--ink)" stroke-width="3.6" stroke-linecap="round"/><path d="M0,12 V-40 M5,12 C5,-4 7,-18 10,-30" fill="none" stroke="#7a9a4a" stroke-width="1.6" stroke-linecap="round"/>
  <rect x="-3.6" y="-30" width="7.2" height="18" rx="3.6" fill="#8a5a3b" stroke="var(--ink)" stroke-width="2"/><rect x="5.6" y="-22" width="6.4" height="15" rx="3.2" fill="#8a5a3b" stroke="var(--ink)" stroke-width="2" transform="rotate(10 9 -14)"/>
  <path d="M-2,-12 C-8,-6 -10,2 -10,10" fill="none" stroke="#7a9a4a" stroke-width="2.4" stroke-linecap="round"/></g>`;

// --- 長門國 ---
// 水天門：赤間神宮的龍宮造樓門，白牆、朱柱、綠屋頂
const SUITENMON = `<g><path d="M72,54 V36 H128 V54 Z" fill="#fbfaf6" stroke="var(--ink)" stroke-width="2.4"/>
  <path d="M90,54 V44 C90,38 110,38 110,44 V54 Z" fill="#3a3030"/>
  <rect x="82" y="24" width="36" height="12" fill="#d8432f" stroke="var(--ink)" stroke-width="2.2"/><path d="M90,24 V36 M100,24 V36 M110,24 V36" stroke="#a8301f" stroke-width="1.4"/>
  <path d="M66,38 Q100,30 134,38 L130,34 Q100,28 70,34 Z" fill="#5f9a7a" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
  <path d="M76,24 Q100,10 124,24 L118,18 Q100,8 82,18 Z" fill="#5f9a7a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M100,10 V4" stroke="#e1bf55" stroke-width="2.6" stroke-linecap="round"/></g>`;
// 碇
const ikari = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <circle cy="-26" r="4.4" fill="none" stroke="var(--ink)" stroke-width="5"/><circle cy="-26" r="4.4" fill="none" stroke="#6b7480" stroke-width="2.6"/>
  <path d="M0,-21 V12 M-8,-14 H8 M-14,2 C-12,10 -6,14 0,14 C6,14 12,10 14,2" fill="none" stroke="var(--ink)" stroke-width="6" stroke-linecap="round"/>
  <path d="M0,-21 V12 M-8,-14 H8 M-14,2 C-12,10 -6,14 0,14 C6,14 12,10 14,2" fill="none" stroke="#6b7480" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M-14,2 l-3,-5 l6,0 Z M14,2 l3,-5 l-6,0 Z" fill="#6b7480" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/></g>`;

// --- 土佐國 ---
// 鯨：土佐灣的鯨魚，頭頂噴水
const KUJIRA = `<g><path d="M66,44 C66,30 84,24 106,26 C124,28 134,36 134,44 C134,52 118,56 100,56 C84,56 66,54 66,44 Z" fill="#3a5a7a" stroke="var(--ink)" stroke-width="2.6"/>
  <path d="M70,48 C80,54 120,54 132,46 C130,52 118,56 100,56 C84,56 72,54 70,48 Z" fill="#dfe6ec"/>
  <path d="M134,42 L146,32 L144,42 L148,52 Z" fill="#3a5a7a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <circle cx="78" cy="42" r="2" fill="var(--ink)"/><path d="M72,48 C76,50 80,50 84,48" fill="none" stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M92,26 C90,18 86,14 82,14 M92,26 C92,16 94,10 98,8 M92,26 C96,18 102,16 106,18" fill="none" stroke="#7fc0e8" stroke-width="2.6" stroke-linecap="round"/></g>`;
// 卷物：《土佐日記》
const makimono = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <rect x="-8" y="-24" width="16" height="36" fill="#f6efdc" stroke="var(--ink)" stroke-width="2.2"/>
  <path d="M-4,-18 V6 M0,-18 V2 M4,-18 V6" stroke="#8a7a5a" stroke-width="1.2" stroke-dasharray="2 1.4"/>
  <rect x="-11" y="-28" width="22" height="5" rx="2.5" fill="#8a5a3b" stroke="var(--ink)" stroke-width="2"/><rect x="-11" y="11" width="22" height="5" rx="2.5" fill="#8a5a3b" stroke="var(--ink)" stroke-width="2"/>
  <path d="M8,-10 h8 l-2,3 l2,3 h-8" fill="#c8463a" stroke="var(--ink)" stroke-width="1.4" stroke-linejoin="round"/></g>`;

// --- 薩摩國 ---
// 薩摩芋：紅紫色的地瓜，外地叫「薩摩芋」、鹿兒島叫「唐芋」
const SATSUMAIMO = `<g transform="rotate(-12 100 30)"><path d="M58,32 C66,22 84,18 102,18 C118,18 130,22 136,28 L136,40 C128,44 116,46 100,46 C82,46 66,42 58,32 Z" fill="#a8385a" stroke="var(--ink)" stroke-width="2.8" stroke-linejoin="round"/>
  <ellipse cx="136" cy="34" rx="5" ry="6.4" fill="#f2d478" stroke="var(--ink)" stroke-width="2.4"/><circle cx="135" cy="33" r="1.6" fill="#e8b84a"/>
  <path d="M78,26 C80,30 80,34 78,38 M98,22 C100,28 100,34 98,42 M116,24 C118,30 118,36 116,42" fill="none" stroke="#7a2440" stroke-width="1.4" stroke-linecap="round"/>
  <path d="M58,32 C52,32 48,30 44,26 M70,40 l-4,6 M108,45 l-1,6" fill="none" stroke="#7a5a3a" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M72,26 C80,22 92,21 102,21" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".5"/></g>`;
// 薩摩切子：紅色玻璃杯，切出的格紋從紅漸變到透明
const kiriko = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <path d="M-11,-14 H11 L8,12 H-8 Z" fill="#d23b4a" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M-9,-4 L-4,2 L-9,8 M-4,2 L2,-4 L8,2 L2,8 Z M-6,-12 L0,-6 L6,-12" fill="#f4c4cc" stroke="#9a2030" stroke-width="1"/>
  <path d="M-11,-14 H11" stroke="var(--ink)" stroke-width="2.4"/><path d="M-8,-11 V6" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".7"/></g>`;

// ===== 都城 =====
// 時代名稱＝政權所在地，所以歷史角色以都城為單位。都城是所在縣切換出來的歷史殘響，外型沿用律令國的雲形浮空。
// 設定與參考卡：設定/都城.md

// 都城共用的輔助符號
const MOVING_BOX = `<g transform="translate(30 172)"><path d="M-16,-8 H16 V14 H-16 Z" fill="#d9b27a" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/><path d="M-16,-8 L-12,-16 H12 L16,-8" fill="#c9a06a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M0,-16 V-2" stroke="#b08a50" stroke-width="3"/><path d="M-10,4 H10" stroke="#8a6a3a" stroke-width="1.6"/></g>`;
// 東大寺大佛殿：深色的大屋頂、兩端金色鴟尾、正面的唐破風拱窗（放在左上角，背景會被身體擋住）
const DAIBUTSUDEN = `<g transform="translate(30 62)"><path d="M-26,8 L-18,0 H18 L26,8 Q0,5 -26,8 Z" fill="#4a4e56" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
  <path d="M-18,0 L-12,-8 H12 L18,0 Z" fill="#5a5f66" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
  <path d="M-12,-8 C-13,-14 -9,-14 -9,-9 Z M12,-8 C13,-14 9,-14 9,-9 Z" fill="#e1bf55" stroke="var(--ink)" stroke-width="1.4" stroke-linejoin="round"/>
  <path d="M-6,0 Q0,-6 6,0 Z" fill="#a8743e" stroke="var(--ink)" stroke-width="1.4" stroke-linejoin="round"/>
  <rect x="-20" y="8" width="40" height="14" fill="#f3ead6" stroke="var(--ink)" stroke-width="2"/><path d="M-14,8 V22 M-5,8 V22 M5,8 V22 M14,8 V22" stroke="#8a5a3b" stroke-width="2.4"/></g>`;
// 滿月（背景）
const FULLMOON = `<circle cx="160" cy="44" r="24" fill="#f6e7a8" stroke="var(--ink)" stroke-width="2.6"/><path d="M146,34 C148,28 154,24 160,23" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>`;
// 骰子
const DICE = `<g transform="translate(30 60) rotate(-12)"><rect x="-11" y="-11" width="22" height="22" rx="4" fill="#fff" stroke="var(--ink)" stroke-width="2.4"/><circle cx="-5" cy="-5" r="2.2" fill="var(--ink)"/><circle cx="5" cy="5" r="2.2" fill="var(--ink)"/><circle cx="0" cy="0" r="2.6" fill="#d23b33"/></g>`;

// --- 藤原京 ---
// 大和三山（畝傍山、耳成山、香具山）圍著宮跡；宮跡上立著標示柱位的朱色短柱。參考：設定/都城.md
const hill = (x0, x1, top, c, dots) => { const m = (x0 + x1) / 2;
  return `<path d="M${x0},52 C${x0 + 2},${top + 14} ${m - 10},${top} ${m},${top} C${m + 10},${top} ${x1 - 2},${top + 14} ${x1},52 Z" fill="${c}" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <g fill="#3f6a34" opacity=".55">${dots.map(([dx, dy]) => `<circle cx="${m + dx}" cy="${top + dy}" r="2"/>`).join('')}</g>`; };
const SANZAN = `<g>${hill(82, 118, 4, '#5f8a4a', [[-4, 10], [5, 16], [-6, 24]])}${hill(52, 98, 14, '#7fa463', [[-8, 12], [6, 10], [0, 22], [-12, 26]])}${hill(102, 148, 18, '#6e9a5a', [[-6, 10], [8, 14], [2, 22]])}
  <path d="M60,30 C64,24 70,20 74,20 M114,32 C118,27 122,25 126,25" fill="none" stroke="#b8d49a" stroke-width="2" stroke-linecap="round"/>
  <path d="M50,52 Q100,42 150,52 Q100,60 50,52 Z" fill="#e3ecb8" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  ${[72, 86, 100, 114, 128].map(x => `<rect x="${x - 2.6}" y="${38 + Math.abs(x - 100) * .1}" width="5.2" height="12" rx="1" fill="#c8463a" stroke="var(--ink)" stroke-width="1.5"/>`).join('')}</g>`;
// 大寶律令：捲起來綁好的法典，貼著題簽
const ritsuryo = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <rect x="-19" y="-7" width="38" height="14" rx="3" fill="#f3ead6" stroke="var(--ink)" stroke-width="2.4"/><path d="M-19,-3 H19" stroke="#ddd0b0" stroke-width="1.2"/>
  <rect x="-23" y="-5" width="4" height="10" rx="1.5" fill="#8a5a3b" stroke="var(--ink)" stroke-width="1.6"/><rect x="19" y="-5" width="4" height="10" rx="1.5" fill="#8a5a3b" stroke="var(--ink)" stroke-width="1.6"/>
  <path d="M8,-7 V7" stroke="#7a5a9a" stroke-width="2.6"/><path d="M8,7 c-1,4 -3,6 -5,7 M8,7 c1,4 3,6 5,7" fill="none" stroke="#7a5a9a" stroke-width="1.6" stroke-linecap="round"/>
  <rect x="-14" y="-5.5" width="16" height="11" fill="#fff" stroke="var(--ink)" stroke-width="1.2"/><text x="-6" y="2.6" font-size="7" ${AUX_TXT}>律令</text></g>`;

// --- 平城京 ---
// 朱雀門：平城宮正門，兩層灰瓦屋頂、朱色柱子、白牆、屋脊兩端金色鴟尾。參考：設定/都城.md
const SUZAKU = `<g><rect x="70" y="40" width="60" height="14" fill="#f7f3e8" stroke="var(--ink)" stroke-width="2.2"/>
  ${[73, 84, 95, 105, 116, 127].map(x => `<rect x="${x - 1.8}" y="40" width="3.6" height="14" fill="#c8463a"/>`).join('')}
  <path d="M60,42 Q64,40 68,36 L76,30 H124 L132,36 Q136,40 140,42 Q100,38 60,42 Z" fill="#5a5f66" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <rect x="80" y="22" width="40" height="9" fill="#f7f3e8" stroke="var(--ink)" stroke-width="2"/>${[83, 93, 107, 117].map(x => `<rect x="${x - 1.6}" y="22" width="3.2" height="9" fill="#c8463a"/>`).join('')}
  <path d="M68,24 Q72,22 76,18 L86,10 H114 L124,18 Q128,22 132,24 Q100,20 68,24 Z" fill="#5a5f66" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M86,10 C85,4 89,2 91,6 Z M114,10 C115,4 111,2 109,6 Z" fill="#e1bf55" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M72,40 H128 M84,22 H116" stroke="var(--ink)" stroke-width="1.2"/></g>`;
// 條坊地圖：仿長安的棋盤都城，宮殿在北端，朱雀大路直通南邊
const jobomap = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <rect x="-15" y="-19" width="30" height="38" rx="1.5" fill="#f6efdc" stroke="var(--ink)" stroke-width="2.4"/>
  <path d="M-15,-9 H15 M-15,0 H15 M-15,9 H15 M-7.5,-19 V19 M7.5,-19 V19" stroke="#c9b48a" stroke-width="1.2"/>
  <path d="M0,-12 V19" stroke="#c8463a" stroke-width="2.6"/><rect x="-6" y="-17" width="12" height="7" fill="#c8463a" stroke="var(--ink)" stroke-width="1.4"/></g>`;
CHARS.push({
  id: 'heijokyo', name: '平城京', kind: '都城・平城京（710–784，今奈良縣奈良市）', tagColor: '#6b8e7a', motto: '「あをによし，奈良的都城。」',
  colors: [['青丹', '#6B8E7A'], ['朱雀朱', '#C8463A'], ['甍灰', '#5A5F66']],
  look: f => ryoSlime({ grad: [[0, '#f8fbf9'], [.6, '#e3ece6'], [1, '#a9c2b4']], limb: '#e3ece6', face: f.face || 'calm', armUp: f.armUp, back: f.back,
    head: SUZAKU, front: f.armUp ? jobomap(172, 88, -10) : jobomap(164, 140, -6), extra: f.extra }),
  faces: [
    { face: 'calm', name: 'あをによし', k: '( ˘ω˘ )', q: '青丹色的瓦、朱色的柱子，《萬葉集》說奈良的都城像花一樣盛開' },
    { face: 'smileW', armUp: true, name: '照長安蓋的', k: '( ^ω^ )', q: '照唐朝長安規劃的棋盤都城，宮殿在北端，朱雀大路直通南邊' },
    { face: 'open', extra: DAIBUTSUDEN, name: '大佛開眼', k: '( ´∀`)', q: '752 年東大寺大佛開眼，聖武天皇想靠佛法護國' },
    { face: 'sweat', extra: MOVING_BOX, name: '寺院太強', k: '(・ω・;)', q: '寺院勢力越來越大，桓武天皇決定搬走：784 年先到長岡京，794 年再到平安京' },
    { face: 'flat', name: '沉穩模式', k: '( ・_・)', q: '嚴肅主題專用' },
  ],
  acc: [['朱雀門', '平城宮的正門，現在已經在平城宮跡復原。兩層灰瓦屋頂、朱色柱子，屋脊兩端是金色的鴟尾。'], ['條坊地圖', '平城京照唐朝長安規劃：街道是棋盤格，宮殿在最北端，寬約七十公尺的朱雀大路從朱雀門一路通到南端。']],
  persona: '正統派的模範生。照長安一比一學、什麼都規規矩矩；國家大力扶植佛教，結果被寺院纏住，只好讓出都城的位置。',
  diff: '奈良君（奈良市）的歷史殘響。奈良君平常餵鹿，切換成平城京時變成奈良時代的都城。和藤原京比，藤原京的宮殿在中央，平城京照長安放在北端。和平安京比，平城京是被寺院逼走的那一個。',
  points: ['（口頭禪）「あをによし。」', '（雷點）「奈良時代從 710 年我遷都算起，不是從 701 年的大寶律令。」', '（怪癖）走路一定沿著棋盤的直線，不斜切。', '（怪癖）宮跡挖出的木簡多到數不完，上面寫著各地送來的稅物。'],
  power: '變形「朱雀大路」：拉出一條寬七十公尺的大路。技能「國分寺」：在各地立起寺院，守護國家。',
  why: '平城宮跡是第 3 課旅遊連結裡的景點，總複習時也是漏選的那一個，所以頭上直接放復原的朱雀門。手上的條坊地圖對應「仿長安的棋盤都城」，宮殿畫在北端，和藤原京區分。東大寺大佛是奈良時代最重要的景點，但大佛像不適合拿在手上，改成「大佛開眼」表情旁邊的大佛殿。奈良君的鹿、大和國的古墳不重複。身體用「あをによし」的青丹色。',
});

// --- 平安京 ---
// 垂纓冠：平安貴族的黑漆冠，後面突起的巾子，長長的纓從後面翹起再垂下。參考：設定/都城.md
const KANMURI_TAIL = `<path d="M98,24 C100,10 112,2 126,4 C132,5 136,9 136,13 C130,10 122,9 114,12 C108,15 106,20 106,26 Z" fill="#2b2626" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/><path d="M106,12 C112,7 120,6 128,7" fill="none" stroke="#5a5560" stroke-width="1.6" stroke-linecap="round"/>`;
const KANMURI = `<g><path d="M90,34 C90,20 96,16 100,16 C104,16 110,20 110,34 Z" fill="#2b2626" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M74,54 C74,38 86,30 100,30 C114,30 126,38 126,54 Q100,50 74,54 Z" fill="#2b2626" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M82,46 C84,40 90,36 96,35" fill="none" stroke="#5a5560" stroke-width="2" stroke-linecap="round"/><path d="M74,54 Q100,50 126,54" fill="none" stroke="#5a5560" stroke-width="1.4"/></g>`;
// 短冊：寫和歌的細長色紙，用假名寫「いろは」
const tanzaku = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})">
  <rect x="-7" y="-26" width="14" height="44" rx="1" fill="#cfe3f0" stroke="var(--ink)" stroke-width="2.2"/>
  <g fill="#e1bf55"><circle cx="-3" cy="-22" r="1"/><circle cx="4" cy="-18" r="1.2"/><circle cx="-4" cy="12" r="1"/><circle cx="3" cy="15" r="1"/></g>
  <g font-size="8" ${AUX_TXT}><text y="-10">い</text><text y="-1">ろ</text><text y="8">は</text></g></g>`;
CHARS.push({
  id: 'heiankyo', name: '平安京', kind: '都城・平安京（794–，今京都府京都市）', tagColor: '#7a5a9a', motto: '「千年來，天皇都住在我這裡。」',
  colors: [['冠黑', '#2B2626'], ['平安紫', '#8A6AB0'], ['短冊淡藍', '#CFE3F0']],
  look: f => ryoSlime({ grad: [[0, '#fcfaff'], [.6, '#ece4f4'], [1, '#c4b0dc']], limb: '#ece4f4', face: f.face || 'calm', armUp: f.armUp, back: KANMURI_TAIL + (f.back || ''),
    head: KANMURI, front: f.armUp ? tanzaku(172, 86, 10) : tanzaku(164, 140, 8), extra: f.extra }),
  faces: [
    { face: 'calm', name: '雅', k: '( ˘ω˘ )', q: '宮廷文化越來越精緻，世界也越來越只剩京都' },
    { face: 'smileW', back: FULLMOON, name: '望月', k: '( ^ω^ )', q: '藤原道長把自己的權勢比作沒有缺角的滿月，攝關政治的頂峰' },
    { face: 'open', armUp: true, name: '假名', k: '( ´▽`)', q: '894 年停派遣唐使，用假名寫出《源氏物語》《枕草子》' },
    { face: 'tired', extra: wrongCard('軍團'), name: '軍隊呢？', k: '(￣ω￣)', q: '792 年廢掉地方軍團，出事只能找武士' },
    { face: 'sweat', extra: DICE, name: '管不住', k: '(・ω・;)', q: '鴨川的水、骰子的點數、比叡山的僧兵：白河上皇說管不了的三件事' },
    { face: 'flat', name: '沉穩模式', k: '( ・_・)', q: '嚴肅主題專用' },
  ],
  acc: [['垂纓冠', '平安貴族上朝戴的黑漆冠，後面突起的部分叫巾子，長長的纓從後面翹起再垂下。'], ['短冊', '寫和歌用的細長色紙。停派遣唐使以後，貴族把漢字簡化成假名，宮廷女性用假名寫出《源氏物語》。']],
  persona: '優雅的貴族。住在宮裡寫和歌、辦儀式，文化越來越精緻；國家的軍隊和土地一點一點不見，他沒怎麼放在心上，回過神來，決定勝負的已經是武士。',
  diff: '京都君的歷史殘響。京都君用扇子分場面話和本音，平安京是那套格調剛形成的時候。和平城京比，平城京被寺院逼走才遷來，平安京後來也被比叡山的僧兵困擾。',
  points: ['（口頭禪）「千年來，天皇都住在我這裡。」', '（雷點）「奈良到我這裡是搬家，主人沒換。換主人的是鎌倉那次。」', '（怪癖）街道到今天還是棋盤格，京都人報地址會說「上ル」「下ル」「西入ル」。', '（怪癖）沒發現地方的地和兵都被拿走了，還在寫和歌。'],
  power: '變形「國風」：把學來的漢字化成假名。技能「和歌」：寫一首和歌，讓吵架的人停下來。',
  why: '平安京是京都君的歷史殘響，所以避開京都君的扇子和鳳凰簪。頭上的垂纓冠代表「貴族的時代」，第 4 課的主角就是朝廷貴族；手上的短冊用假名寫「いろは」，對應國風文化。表情對應第 4 課的三條主線：攝關政治（望月）、失去武力（軍隊呢？）、寺院與僧兵（管不住）。',
});

// --- 鎌倉 ---
// 鎌倉武士的兜：深色的鉢、金色的鍬形往上分開、兩側紅色的吹返往外翻。參考：設定/都城.md
const KABUTO = `<g><path d="M66,48 C56,42 48,46 48,56 C55,53 61,53 67,55 Z M134,48 C144,42 152,46 152,56 C145,53 139,53 133,55 Z" fill="#c8463a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M66,54 C66,32 82,22 100,22 C118,22 134,32 134,54 Q100,48 66,54 Z" fill="#3a3f4a" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M84,26 C80,34 79,44 80,51 M100,22 V49 M116,26 C120,34 121,44 120,51" fill="none" stroke="#5a606c" stroke-width="1.6"/>
  <path d="M96,42 C88,30 80,14 76,0 C84,8 94,24 100,38 Z M104,42 C112,30 120,14 124,0 C116,8 106,24 100,38 Z" fill="#e1bf55" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
  <rect x="93" y="38" width="14" height="8" rx="2" fill="#e1bf55" stroke="var(--ink)" stroke-width="1.8"/></g>`;
// 弓：鶴岡八幡宮的流鏑馬，武士以騎射為本
const yumi = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M0,-44 C14,-26 14,26 0,44" fill="none" stroke="var(--ink)" stroke-width="6" stroke-linecap="round"/><path d="M0,-44 C14,-26 14,26 0,44" fill="none" stroke="#7a4a2a" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M0,-44 V44" stroke="#9a8a70" stroke-width="1.2"/><rect x="7" y="-6" width="6" height="12" rx="1.5" fill="#fbf8f0" stroke="var(--ink)" stroke-width="1.4"/></g>`;
CHARS.push({
  id: 'kamakura', name: '鎌倉', kind: '都城・鎌倉（1185–1333，今神奈川縣鎌倉市）', tagColor: '#3a4a6a', motto: '「從今天起，政事由鎌倉處理。」',
  colors: [['武士紺', '#3A4A6A'], ['鍬形金', '#E1BF55'], ['吹返紅', '#C8463A']],
  look: f => ryoSlime({ grad: [[0, '#f8f9fc'], [.6, '#e2e6ef'], [1, '#aab4c8']], limb: '#e2e6ef', face: f.face || 'serious', armUp: f.armUp,
    head: KABUTO, front: f.armUp ? yumi(172, 92, 14) : yumi(164, 142, 8), extra: f.extra }),
  faces: [
    { face: 'serious', name: '常態', k: '(｀・ω・´)', q: '第一個武士政府' },
    { face: 'smileW', armUp: true, name: '第一個幕府', k: '( ^ω^ )', q: '武士在鎌倉開了幕府，政治從此由武士處理' },
    { face: 'puzzled', name: '天皇還在京都', k: '(・_・)?', q: '天皇沒有被趕走，朝廷一直留在京都' },
    { face: 'flat', name: '沉穩模式', k: '( ・_・)', q: '嚴肅主題專用' },
  ],
  acc: [['鍬形兜', '鎌倉武士的兜，金色的鍬形往上分開，兩側紅色的吹返往外翻。'], ['弓', '武士以騎馬射箭為本。鶴岡八幡宮到今天還在舉行流鏑馬。']],
  persona: '剛毅的第一代武士。說話短、做事直，不想學京都貴族那一套，所以留在自己的根據地另起爐灶。',
  diff: '神奈川君的歷史殘響。神奈川君時髦又內鬥，切換成鎌倉時變成樸實剛硬的武士。和平安京比，平安京是貴族的朝廷，鎌倉是武士的幕府。',
  points: ['（口頭禪）「從今天起，政事由鎌倉處理。」', '（雷點）「我沒有搶天皇的位子。」', '（怪癖）不太想去京都，覺得去了會被貴族同化。'],
  power: '變形「切通」：在山上切出一條窄路，只放自己人進來。技能「流鏑馬」：騎馬一邊跑一邊射中三個靶。',
  why: '第 1 課「平安 → 鎌倉」是第一次權力大轉移：從貴族換成武士，所以鎌倉頭上是武士的兜。手上的弓對應騎射，也連到鶴岡八幡宮的流鏑馬。',
});

// --- 室町 ---
// 金閣：一層是木頭與白牆，二、三層貼金箔，屋頂上一隻金鳳凰。足利義滿在室町時代建造
const KINKAKU = `<g><rect x="74" y="40" width="52" height="14" fill="#efe4c8" stroke="var(--ink)" stroke-width="2.2"/><path d="M83,40 V54 M100,40 V54 M117,40 V54" stroke="#8a5a3b" stroke-width="2"/>
  <path d="M62,41 Q68,40 74,34 H126 Q132,40 138,41 Q100,38 62,41 Z" fill="#4a3a2e" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <rect x="79" y="24" width="42" height="10" fill="#e8b830" stroke="var(--ink)" stroke-width="2"/><path d="M90,24 V34 M110,24 V34" stroke="#c99a1a" stroke-width="1.6"/>
  <path d="M68,25 Q73,24 79,19 H121 Q127,24 132,25 Q100,22 68,25 Z" fill="#4a3a2e" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <rect x="88" y="11" width="24" height="8" fill="#e8b830" stroke="var(--ink)" stroke-width="2"/>
  <path d="M80,12 L100,3 L120,12 Z" fill="#4a3a2e" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M100,3 V-1 M96,-1 C98,-4 102,-4 104,-1 L106,-3 L105,1 L95,1 Z" fill="#e1bf55" stroke="var(--ink)" stroke-width="1.4" stroke-linejoin="round"/></g>`;
// 天目茶碗：茶道從室町時代開始成形
const chawan = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M-15,-6 H15 C14,7 8,11 0,11 C-8,11 -14,7 -15,-6 Z" fill="#3a2a22" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/>
  <ellipse cy="-6" rx="15" ry="4" fill="#7a9a4a" stroke="var(--ink)" stroke-width="2"/><path d="M-12,-1 C-10,4 -6,7 -2,8" fill="none" stroke="#8a6a4a" stroke-width="1.6" stroke-linecap="round"/><rect x="-5" y="10" width="10" height="3" rx="1" fill="#3a2a22" stroke="var(--ink)" stroke-width="1.4"/></g>`;
// 群雄割據：各地插起的小旗
const WARLORDS = `<g>${[[26, 60, '#c8463a'], [46, 88, '#2c4f9e'], [18, 112, '#e1bf55'], [176, 64, '#3f7a4e'], [184, 100, '#7a5a9a']].map(([x, y, c]) => `<g transform="translate(${x} ${y})"><path d="M0,16 V-14" stroke="var(--ink)" stroke-width="2.4" stroke-linecap="round"/><path d="M1,-14 H13 V2 H1 Z" fill="${c}" stroke="var(--ink)" stroke-width="1.8" stroke-linejoin="round"/></g>`).join('')}</g>`;
CHARS.push({
  id: 'muromachi', name: '室町', kind: '都城・室町（1336–1573，今京都府京都市）', tagColor: '#c99a1a', motto: '「幕府在京都的室町……地方的事，有點管不動。」',
  colors: [['金閣金', '#E8B830'], ['檜皮茶', '#4A3A2E'], ['抹茶綠', '#7A9A4A']],
  look: f => ryoSlime({ grad: [[0, '#fdfbf4'], [.6, '#f3ead2'], [1, '#d8c48c']], limb: '#f3ead2', face: f.face || 'calm', armUp: f.armUp,
    head: KINKAKU, front: f.armUp ? chawan(172, 92, -8) : chawan(164, 144, -6), extra: f.extra }),
  faces: [
    { face: 'calm', name: '常態', k: '( ˘ω˘ )', q: '幕府搬回京都，開在室町這條街' },
    { face: 'sweat', extra: WARLORDS, name: '管不動', k: '(・ω・;)', q: '對全國的控制很弱，各地勢力開始混戰' },
    { face: 'flat', name: '沉穩模式', k: '( ・_・)', q: '嚴肅主題專用' },
  ],
  acc: [['金閣', '室町幕府的將軍足利義滿建造，二、三層貼滿金箔，屋頂上有金鳳凰。'], ['天目茶碗', '喝茶的規矩在室町時代慢慢成形，後來發展成茶道。']],
  persona: '有品味的將軍家。蓋金閣、喝茶、看能劇，文化很講究；可是對地方的控制很弱，各地勢力不太聽他的。',
  diff: '京都君的歷史殘響，和平安京同在京都。平安京是天皇的朝廷，室町是武士的幕府搬進京都。和鎌倉比，鎌倉留在東國，室町搬回京都。',
  points: ['（口頭禪）「室町是京都的一條街名喔。」', '（雷點）「戰國亂世開始以後，我名義上還撐了一百年。」', '（怪癖）一緊張就泡茶。'],
  power: '變形「金閣」：整隻變成金色，倒映在鏡湖池上。技能「茶の湯」：泡一碗茶，讓對手冷靜下來。',
  why: '第 1 課的表格寫「室町（京都的一條街）」，幕府從鎌倉搬回京都。頭上的金閣是室町時代最有名的景點；手上的天目茶碗代表文化的講究，和「管不動地方」形成對比。「管不動」的表情旁邊插滿各地的小旗，接到戰國。',
});

// --- 安土 ---
// 安土城天主（復元想像）：石垣上疊著黑瓦的樓層，上面是朱紅的八角層，最頂層貼金。參考：設定/都城.md
const AZUCHI = `<g><path d="M66,54 L72,44 H128 L134,54 Z" fill="#a8a49a" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/><path d="M76,49 H90 M96,47 H112 M118,50 H128" stroke="#7a766c" stroke-width="1.4"/>
  <rect x="78" y="35" width="44" height="9" fill="#f7f3e8" stroke="var(--ink)" stroke-width="2"/>
  <path d="M68,36 Q73,35 78,31 H122 Q127,35 132,36 Q100,33 68,36 Z" fill="#2b2626" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M85,22 H115 L118,31 H82 Z" fill="#c8323a" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
  <path d="M76,23 Q80,22 85,18 H115 Q120,22 124,23 Q100,20 76,23 Z" fill="#2b2626" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <rect x="90" y="8" width="20" height="10" fill="#e1bf55" stroke="var(--ink)" stroke-width="2"/><path d="M95,8 V18 M105,8 V18" stroke="#b8942e" stroke-width="1.4"/>
  <path d="M84,9 Q88,8 92,4 H108 Q112,8 116,9 Q100,6 84,9 Z" fill="#2b2626" stroke="var(--ink)" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M92,4 C91,0 93,-1 94,2 M108,4 C109,0 107,-1 106,2" fill="none" stroke="#e1bf55" stroke-width="2" stroke-linecap="round"/></g>`;
// 鐵砲：葡萄牙人傳來的火繩槍，統一天下的新武器
const teppo = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M-34,-2 H6" stroke="var(--ink)" stroke-width="5.4" stroke-linecap="round"/><path d="M-34,-2 H6" stroke="#55565c" stroke-width="3" stroke-linecap="round"/>
  <path d="M-6,-4 H20 L30,6 H20 L16,2 H-6 Z" fill="#8a5a3b" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/><rect x="2" y="-7" width="7" height="4" rx="1" fill="#c9a24a" stroke="var(--ink)" stroke-width="1.2"/>
  <path d="M8,2 C8,8 4,12 0,12" fill="none" stroke="#c8463a" stroke-width="1.6" stroke-linecap="round"/></g>`;
CHARS.push({
  id: 'azuchi', name: '安土', kind: '都城・安土（1573–1603，今滋賀縣近江八幡市）', tagColor: '#c8323a', motto: '「亂世，我來收拾。」',
  colors: [['天主朱', '#C8323A'], ['金箔', '#E1BF55'], ['黑瓦', '#2B2626']],
  look: f => ryoSlime({ grad: [[0, '#fdfaf8'], [.6, '#f4e6e2'], [1, '#d8aaa4']], limb: '#f4e6e2', face: f.face || 'serious', armUp: f.armUp,
    head: AZUCHI, front: f.armUp ? teppo(162, 92, -24) : teppo(160, 150, -10), extra: f.extra }),
  faces: [
    { face: 'serious', name: '常態', k: '(｀・ω・´)', q: '把混戰的各地一個一個收進來' },
    { face: 'smileW', armUp: true, name: '統一', k: '( ^ω^ )', q: '1568 到 1598 年間，武將逐步統一天下' },
    { face: 'flat', name: '沉穩模式', k: '( ・_・)', q: '嚴肅主題專用' },
  ],
  acc: [['安土城天主', '織田信長在琵琶湖畔蓋的城，天主有朱紅的八角層和貼金的頂層。城已經不在，形狀依復元想像。'], ['鐵砲', '葡萄牙人傳來的火繩槍，統一天下的新武器。']],
  persona: '急著收拾亂局的新人。動作快、愛新東西，蓋了誰都沒看過的華麗天主；做完統一的大半就退場，成果交給下一位。',
  diff: '滋賀君的歷史殘響。滋賀君低調守著水源，切換成安土時變成華麗、急性子的天下人之城。「安土桃山」的桃山在京都伏見，這裡只做安土。',
  points: ['（口頭禪）「亂世，我來收拾。」', '（雷點）「是安土桃山，不是安室桃山。」', '（怪癖）新東西一到就要先試，鐵砲、地球儀、洋式斗篷都是。'],
  power: '變形「天主」：疊起五層樓高的華麗高塔。技能「樂市樂座」：開一座誰都能做生意的自由市場。',
  why: '第 1 課的表格寫「安土桃山：安土城、伏見（桃山）」，掌權的是統一天下的武將。頭上放安土城天主：城已不存在，依復元圖畫出朱紅八角層和金色頂層。手上的鐵砲是那個時代最有代表性的新東西。使用者之前把安土桃山記成「安室桃山」，寫進雷點。',
});

// --- 江戶 ---
// 日本橋：江戶的五街道從這座木造拱橋出發，欄杆柱頭有擬寶珠。參考：設定/都城.md
const NIHONBASHI = `<g><path d="M56,54 Q100,28 144,54" fill="none" stroke="var(--ink)" stroke-width="11" stroke-linecap="round"/><path d="M56,54 Q100,28 144,54" fill="none" stroke="#b8844a" stroke-width="7" stroke-linecap="round"/>
  <path d="M60,42 Q100,18 140,42" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/><path d="M60,42 Q100,18 140,42" fill="none" stroke="#c99a5a" stroke-width="2.6" stroke-linecap="round"/>
  ${[74, 88, 100, 112, 126].map(x => { const t = (x - 56) / 88, yb = 54 - 52 * t * (1 - t), yt = 42 - 48 * ((x - 60) / 80) * (1 - (x - 60) / 80); return `<path d="M${x},${yb.toFixed(1)} V${yt.toFixed(1)}" stroke="#8a5a3b" stroke-width="2.4"/>`; }).join('')}
  ${[[60, 44], [140, 44]].map(([x, y]) => `<path d="M${x},${y + 10} V${y - 4}" stroke="var(--ink)" stroke-width="5"/><path d="M${x},${y + 10} V${y - 4}" stroke="#8a5a3b" stroke-width="2.6"/><path d="M${x},${y - 14} C${x + 5},${y - 9} ${x + 5},${y - 4} ${x},${y - 4} C${x - 5},${y - 4} ${x - 5},${y - 9} ${x},${y - 14} Z" fill="#6a7a6a" stroke="var(--ink)" stroke-width="1.6"/>`).join('')}</g>`;
// 千兩箱
const senryo = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-16" y="-11" width="32" height="22" rx="2" fill="#5a3a2a" stroke="var(--ink)" stroke-width="2.4"/>
  <path d="M-16,-4 H16" stroke="var(--ink)" stroke-width="1.6"/><path d="M-16,-11 h5 v5 M16,-11 h-5 v5 M-16,11 h5 v-5 M16,11 h-5 v-5" fill="none" stroke="#c9a24a" stroke-width="2"/>
  <rect x="-7" y="-1" width="14" height="9" fill="#fbf8f0" stroke="var(--ink)" stroke-width="1.2"/><text y="6" font-size="6.4" ${AUX_TXT}>千両</text></g>`;
// 黑船：蒸汽船，黑色船身、明輪、冒煙的煙囪
const KUROFUNE = `<g><path d="M-38,0 H38 L30,14 H-32 Z" fill="#2b2626" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/><path d="M-34,4 H34" stroke="#fbf8f0" stroke-width="1.6" stroke-dasharray="3 4"/>
  <circle cx="4" cy="2" r="10" fill="#5a4a3a" stroke="var(--ink)" stroke-width="2"/><path d="M4,-8 V12 M-6,2 H14" stroke="#8a7a6a" stroke-width="1.6"/>
  <rect x="-6" y="-22" width="8" height="22" fill="#3a3a3a" stroke="var(--ink)" stroke-width="2"/><path d="M-22,0 V-30 M24,0 V-30" stroke="var(--ink)" stroke-width="2.4"/>
  <path d="M-2,-24 C-8,-30 -2,-36 -8,-42 C0,-40 6,-34 2,-26 Z" fill="#9a9aa0" opacity=".8"/></g>`;
CHARS.push({
  id: 'edo', name: '江戶', kind: '都城・江戶（1603–1868，今東京都）', tagColor: '#5a3a2a', motto: '「天下太平，大家慢慢來。」',
  colors: [['日本橋木', '#B8844A'], ['千兩箱茶', '#5A3A2A'], ['擬寶珠青銅', '#6A7A6A']],
  look: f => ryoSlime({ grad: [[0, '#fdfbf7'], [.6, '#f2e8dc'], [1, '#d4bca0']], limb: '#f2e8dc', face: f.face || 'calm', armUp: f.armUp,
    head: NIHONBASHI, front: f.armUp ? senryo(172, 90, -8) : senryo(164, 144, -6), extra: f.extra }),
  faces: [
    { face: 'calm', name: '常態', k: '( ˘ω˘ )', q: '德川家的幕府，約 250 年的和平' },
    { face: 'shock', extra: `<g transform="translate(36 74) scale(.7)">${KUROFUNE}</g>`, name: '黑船來了', k: '(；ﾟДﾟ)', q: '1853 年美國的黑船來航，幕府應付不了' },
    { face: 'flat', name: '沉穩模式', k: '( ・_・)', q: '嚴肅主題專用' },
  ],
  acc: [['日本橋', '江戶的五條大路都從這座木橋出發。欄杆柱頭上的蔥頭形裝飾叫擬寶珠。'], ['千兩箱', '裝金幣的木箱。和平維持得久，江戶成了熱鬧的商業大城。']],
  persona: '悠閒的太平之主。規矩訂得很細，大家照著過日子，很久沒打仗；面對海外的變化反應慢了一拍。',
  diff: '東京君的歷史殘響。東京君是資料中心般的現代系統，切換成江戶時變成慢條斯理的城下町。和室町比，室町管不動地方，江戶把各地管得很緊。',
  points: ['（口頭禪）「天下太平，大家慢慢來。」', '（雷點）「江戶就是現在的東京，不是另一個地方。」', '（怪癖）看到黑色的大船會嚇一跳。'],
  power: '變形「五街道」：從日本橋拉出五條路通往各地。技能「參勤交代」：叫各地的大名定期來江戶報到。',
  why: '第 1 課說「江戶（今東京）」，所以江戶是東京君的歷史殘響。頭上的日本橋是江戶的起點，也是現在東京看得到的地名；手上的千兩箱代表長期和平帶來的商業繁榮。「黑船來了」表情對應江戶 → 明治的交替。',
});

// --- 東京（明治）---
// 明治以後的東京。現代的東京君是資料中心般的系統，歷史場景改用這個「文明開化」時期的殘響：
// 頭上是絲質高帽（シルクハット），手上是手杖，代表改穿洋服、學西方的新政府
const SILKHAT = `<g><ellipse cx="100" cy="52" rx="34" ry="6" fill="#2b2626" stroke="var(--ink)" stroke-width="2.6"/>
  <path d="M80,50 L82,14 C82,10 118,10 118,14 L120,50 Z" fill="#2b2626" stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M81,40 H119 L120,48 H80 Z" fill="#9a3a32" stroke="var(--ink)" stroke-width="2"/><path d="M88,16 C87,24 87,32 88,38" fill="none" stroke="#55505a" stroke-width="2.4" stroke-linecap="round"/></g>`;
const stick = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M0,44 V-30" stroke="var(--ink)" stroke-width="5.4" stroke-linecap="round"/><path d="M0,44 V-30" stroke="#6a4a32" stroke-width="3" stroke-linecap="round"/>
  <path d="M0,-30 C0,-40 12,-40 12,-32" fill="none" stroke="var(--ink)" stroke-width="5.4" stroke-linecap="round"/><path d="M0,-30 C0,-40 12,-40 12,-32" fill="none" stroke="#6a4a32" stroke-width="3" stroke-linecap="round"/><path d="M-2,42 H2" stroke="#c9a24a" stroke-width="3"/></g>`;
CHARS.push({
  id: 'meiji', name: '東京（明治）', kind: '都城・東京（1868–，明治以後）', tagColor: '#9a3a32', motto: '「這就是明治政府。」',
  colors: [['煉瓦紅', '#B0584A'], ['高帽黑', '#2B2626']],
  look: f => ryoSlime({ grad: [[0, '#fdf9f7'], [.6, '#f2e2dc'], [1, '#d4a89c']], limb: '#f2e2dc', face: f.face || 'serious', armUp: f.armUp,
    head: SILKHAT, front: f.armUp ? stick(170, 96, 8) : stick(164, 146, 4), extra: f.extra }),
  faces: [
    { face: 'serious', name: '常態', k: '(｀・ω・´)', q: '以天皇為名的新政府' },
    { face: 'smileW', armUp: true, name: '文明開化', k: '( ^ω^ )', q: '改穿洋服、蓋煉瓦街，全面學西方' },
    { face: 'flat', name: '沉穩模式', k: '( ・_・)', q: '嚴肅主題專用' },
  ],
  acc: [['絲質高帽', '明治初年的「文明開化」，官員和有錢人改穿洋服、戴高帽。'], ['手杖', '和高帽一起流行的西式紳士打扮。']],
  persona: '急著追上西方的新政府。從江戶改名東京，以天皇為名推動改革，什麼都想一口氣學會。',
  diff: '東京君的歷史殘響，但只用在明治以後的歷史場景。現代的東京君是資料中心般的系統，和古代風的都城放在一起太突兀，所以歷史動畫改用這個。和江戶比，江戶是慢條斯理的城下町，明治的東京急著改造自己。',
  points: ['（口頭禪）「這就是明治政府。」', '（怪癖）新東西一到就要穿上、用上。', '（雷點）「東京是改名，不是搬到別的地方。」'],
  power: '變形「煉瓦街」：變成一整排紅磚洋房。技能「文明開化」：讓周圍的東西一夜之間換成西式。',
  why: '使用者指出現代的東京君（機器人形象）接在古代風的都城後面很奇怪，所以補一個明治的東京。頭上的絲質高帽和手杖是「文明開化」最容易認的打扮，不用真實人物。',
});

// --- 台萊姆君 ---
// 讀者代理人（SOP 1.5）：台灣來的旅人，負責替觀眾發問、偶爾踩雷。
// 頭上是鳳梨（旺來），手上是珍珠奶茶；不用國旗、地圖等政治符號
const PINEAPPLE = `<g><path d="M100,18 L92,-2 L98,10 L100,-4 L102,10 L108,-2 Z M100,20 L86,6 L96,16 Z M100,20 L114,6 L104,16 Z" fill="#5f9a4a" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
  <ellipse cx="100" cy="37" rx="16" ry="18" fill="#f2b632" stroke="var(--ink)" stroke-width="2.6"/>
  <g stroke="#c98a1a" stroke-width="1.4" fill="none"><path d="M88,26 L110,52 M86,36 L102,55 M94,20 L114,44 M112,26 L90,52 M114,36 L98,55 M106,20 L86,44"/></g>
  <path d="M90,28 C89,32 89,36 90,40" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".6"/></g>`;
const boba = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M2,-16 L8,-34" stroke="var(--ink)" stroke-width="5.6" stroke-linecap="round"/><path d="M2,-16 L8,-34" stroke="#e9768d" stroke-width="3.4" stroke-linecap="round"/>
  <path d="M-11,-16 H11 L8,16 H-8 Z" fill="#e2c49a" stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round"/><path d="M-12,-17 H12" stroke="var(--ink)" stroke-width="3.4" stroke-linecap="round"/>
  <g fill="#3a2a22">${[[-5, 11], [0, 12], [5, 11], [-3, 7], [3, 7]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.2"/>`).join('')}</g><path d="M-8,-10 L-6,6" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".6"/></g>`;
CHARS.push({
  id: 'tailime', name: '台萊姆君', kind: '讀者代理人・台灣來的旅人', tagColor: '#d9a43a', motto: '「欸，那這個是什麼？」',
  colors: [['奶茶', '#E2C49A'], ['珍珠黑', '#3A2A22'], ['鳳梨黃', '#F2B632']],
  look: f => slime({ shape: 'egg', grad: [[0, '#fffaf2'], [.55, '#f6e6cc'], [1, '#e2c49a']], limb: '#3a2a22', face: f.face || 'base', armUp: f.armUp,
    head: PINEAPPLE, front: f.armUp ? boba(174, 92, 10) : boba(166, 144, 6), extra: f.extra }),
  faces: [
    { face: 'puzzled', name: '好奇', k: '(・_・)?', q: '替讀者問出「為什麼」' },
    { face: 'sweat', name: '踩雷', k: '(・ω・;)', q: '不小心說錯地名，被當地的和萊姆糾正' },
    { face: 'smileW', armUp: true, name: '懂了', k: '( ^ω^ )', q: '「原來是這樣！」' },
    { face: 'flat', name: '沉穩模式', k: '( ・_・)', q: '嚴肅主題專用' },
  ],
  acc: [['鳳梨', '台語叫「旺來」，鳳梨酥也是日本遊客最常買的台灣伴手禮之一。'], ['珍珠奶茶', '台灣的代表飲料，在日本也流行過好幾波。']],
  persona: '好奇的旅人。看到什麼都想問，常常一開口就踩到雷（把地名搞錯、把名產記混），被糾正後會認真記下來。',
  diff: '和萊姆都是當地主人，台萊姆君是外來的訪客，所以外型是蛋形素體但配件全是台灣的東西。依 SOP 1.5，他會隨登場次數慢慢成長。',
  points: ['（口頭禪）「欸，那這個是什麼？」', '（怪癖）走到哪都拿著珍奶。', '（特殊體質）踩雷的時候，頭上的鳳梨葉會豎起來。'],
  power: '技能「旺來」：讓周圍的氣氛變熱鬧。技能「發問」：問出一個問題，讓和萊姆把知識講清楚。',
  why: 'SOP 一直保留著台萊姆君（讀者代理人）的位置，第一次做動畫時需要一個替觀眾發問的角色，所以補上。台灣的象徵刻意選食物：鳳梨（旺來）和珍珠奶茶，避開國旗、地圖這類政治符號。',
});

// ===== 分類 =====
const META = {
  kamakura: { cat: 'miyako' }, muromachi: { cat: 'miyako' }, azuchi: { cat: 'miyako' }, edo: { cat: 'miyako' }, meiji: { cat: 'miyako' }, tailime: { cat: 'guide' },
  fujiwarakyo: { cat: 'miyako' }, heijokyo: { cat: 'miyako' }, heiankyo: { cat: 'miyako' },
  hokkaido: { cat: 'pref', region: '北海道・東北' }, tokyo: { cat: 'pref', region: '關東' }, kyoto: { cat: 'pref', region: '近畿' },
  okinawa: { cat: 'pref', region: '九州・沖繩' }, izumo: { cat: 'ryo' }, tokaido: { cat: 'kido' },
  kinai: { cat: 'kido' }, tosando: { cat: 'kido' }, hokurikudo: { cat: 'kido' }, sanindo: { cat: 'kido' }, sanyodo: { cat: 'kido' }, nankaido: { cat: 'kido' }, saikaido: { cat: 'kido' },
  yamato: { cat: 'ryo' }, musashi: { cat: 'ryo' }, owari: { cat: 'ryo' }, kai: { cat: 'ryo' }, echigo: { cat: 'ryo' }, mutsu: { cat: 'ryo' }, inaba: { cat: 'ryo' }, nagato: { cat: 'ryo' }, tosa: { cat: 'ryo' }, satsuma: { cat: 'ryo' },
  aomori: { cat: 'pref', region: '北海道・東北' }, iwate: { cat: 'pref', region: '北海道・東北' }, miyagi: { cat: 'pref', region: '北海道・東北' },
  akita: { cat: 'pref', region: '北海道・東北' }, yamagata: { cat: 'pref', region: '北海道・東北' }, fukushima: { cat: 'pref', region: '北海道・東北' },
};
['ibaraki', 'tochigi', 'gunma', 'saitama', 'chiba', 'kanagawa'].forEach(id => META[id] = { cat: 'pref', region: '關東' });
['niigata', 'toyama', 'ishikawa', 'fukui', 'yamanashi', 'nagano', 'gifu', 'shizuoka', 'aichi'].forEach(id => META[id] = { cat: 'pref', region: '中部' });
['mie', 'shiga', 'osaka', 'hyogo', 'nara', 'wakayama'].forEach(id => META[id] = { cat: 'pref', region: '近畿' });
['tottori', 'shimane', 'okayama', 'hiroshima', 'yamaguchi'].forEach(id => META[id] = { cat: 'pref', region: '中國' });
['tokushima', 'kagawa', 'ehime', 'kochi'].forEach(id => META[id] = { cat: 'pref', region: '四國' });
['fukuoka', 'saga', 'nagasaki', 'kumamoto', 'oita', 'miyazaki', 'kagoshima'].forEach(id => META[id] = { cat: 'pref', region: '九州・沖繩' });
CHARS.forEach(c => Object.assign(c, META[c.id] || {}));
const REGIONS = [
  ['北海道・東北', ['北海道', '青森', '岩手', '宮城', '秋田', '山形', '福島']],
  ['關東', ['茨城', '栃木', '群馬', '埼玉', '千葉', '東京', '神奈川']],
  ['中部', ['新潟', '富山', '石川', '福井', '山梨', '長野', '岐阜', '靜岡', '愛知']],
  ['近畿', ['三重', '滋賀', '京都', '大阪', '兵庫', '奈良', '和歌山']],
  ['中國', ['鳥取', '島根', '岡山', '廣島', '山口']],
  ['四國', ['德島', '香川', '愛媛', '高知']],
  ['九州・沖繩', ['福岡', '佐賀', '長崎', '熊本', '大分', '宮崎', '鹿兒島', '沖繩']],
];
const PREF_OF = { hokkaido: '北海道', tokyo: '東京', kyoto: '京都', okinawa: '沖繩', aomori: '青森', iwate: '岩手', miyagi: '宮城', akita: '秋田', yamagata: '山形', fukushima: '福島',
  ibaraki: '茨城', tochigi: '栃木', gunma: '群馬', saitama: '埼玉', chiba: '千葉', kanagawa: '神奈川',
  niigata: '新潟', toyama: '富山', ishikawa: '石川', fukui: '福井', yamanashi: '山梨', nagano: '長野', gifu: '岐阜', shizuoka: '靜岡', aichi: '愛知',
  mie: '三重', shiga: '滋賀', osaka: '大阪', hyogo: '兵庫', nara: '奈良', wakayama: '和歌山',
  tottori: '鳥取', shimane: '島根', okayama: '岡山', hiroshima: '廣島', yamaguchi: '山口', tokushima: '德島', kagawa: '香川', ehime: '愛媛', kochi: '高知',
  fukuoka: '福岡', saga: '佐賀', nagasaki: '長崎', kumamoto: '熊本', oita: '大分', miyazaki: '宮崎', kagoshima: '鹿兒島' };
const KIDO = ['畿內', '東海道', '東山道', '北陸道', '山陰道', '山陽道', '南海道', '西海道'];
const KIDO_OF = { tokaido: '東海道', kinai: '畿內', tosando: '東山道', hokurikudo: '北陸道', sanindo: '山陰道', sanyodo: '山陽道', nankaido: '南海道', saikaido: '西海道' };
