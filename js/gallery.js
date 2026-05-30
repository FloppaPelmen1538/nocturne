(function () {
  'use strict';

  var programs = [
    { id: 'retro',    name: 'Ретроспектива',  count: 4, color: '#ffb547' },
    { id: 'debut',    name: 'Дебюты',         count: 4, color: '#e8dcc1' },
    { id: 'doc',      name: 'Документ',       count: 4, color: '#e63946' },
    { id: 'experim',  name: 'Эксперимент',    count: 4, color: '#7fa9b5' }
  ];

  var stills = {
    retro: [
      { t: 'Холодный свет',     s: '1976 · Семёнов',     h: 200 },
      { t: 'Полночь в Праге',   s: '1968 · Кафка',       h: 30 },
      { t: 'Семь зеркал',       s: '1972 · Орсини',      h: 280 },
      { t: 'Ночной маршрут',    s: '1965 · Тагер',       h: 120 }
    ],
    debut: [
      { t: 'Сирень',            s: '2026 · Лурье',       h: 340 },
      { t: 'Под Полярной',      s: '2026 · Виссарион',   h: 220 },
      { t: 'Молочный путь',     s: '2025 · Айра',        h: 50 },
      { t: 'Свет в окне',       s: '2026 · Холодов',     h: 160 }
    ],
    doc: [
      { t: 'Пять часов утра',   s: '2025 · Боде',        h: 25 },
      { t: 'Бессонница',        s: '2024 · Рамирес',     h: 0 },
      { t: 'Маяк',              s: '2025 · Сорочи',      h: 180 },
      { t: 'Долгая смена',      s: '2024 · Калмыков',    h: 240 }
    ],
    experim: [
      { t: 'Антенна / Антитеза', s: '2026 · Köhler',     h: 195 },
      { t: 'Шум',                s: '2024 · Перч',       h: 310 },
      { t: '12 кадров',          s: '2025 · Лей',        h: 80 },
      { t: 'Пустой зал',         s: '2026 · Цой',        h: 350 }
    ]
  };

  var picker = document.getElementById('picker');
  var grid   = document.getElementById('galleryGrid');

  programs.forEach(function (p, i) {
    var btn = document.createElement('button');
    btn.textContent = p.name;
    btn.dataset.id = p.id;
    if (i === 0) btn.classList.add('is-active');
    var small = document.createElement('small');
    small.textContent = p.count + ' фильма · программа № 0' + (i + 1);
    btn.appendChild(small);
    btn.addEventListener('click', function () { setProgram(p.id); });
    picker.appendChild(btn);
  });

  function buildStill(s, idx, programId) {
    var item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.idx = idx;
    item.dataset.program = programId;

    var bg = 'hsl(' + s.h + ' 25% 14%)';
    var fg = 'hsl(' + s.h + ' 60% 70%)';
    var ac = 'hsl(' + ((s.h + 40) % 360) + ' 70% 60%)';

    item.innerHTML =
      '<svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="400" height="500" fill="' + bg + '"/>' +
        '<circle cx="' + (80 + (idx * 47) % 240) + '" cy="' + (140 + (idx * 31) % 80) + '" r="' + (30 + (idx * 11) % 40) + '" fill="' + fg + '" opacity=".18"/>' +
        '<rect x="0" y="' + (300 + (idx * 7) % 80) + '" width="400" height="2" fill="' + fg + '" opacity=".4"/>' +
        '<rect x="0" y="' + (305 + (idx * 7) % 80) + '" width="' + (120 + (idx * 23) % 220) + '" height="1" fill="' + ac + '" opacity=".6"/>' +
        '<text x="20" y="460" font-family="JetBrains Mono, monospace" font-size="9" fill="' + fg + '" letter-spacing="1" opacity=".7">FRAME ' + String(idx + 1).padStart(3, '0') + ' / NOCT-26</text>' +
        '<text x="20" y="480" font-family="JetBrains Mono, monospace" font-size="9" fill="' + ac + '" letter-spacing="1" opacity=".9">' + s.s.toUpperCase() + '</text>' +
      '</svg>' +
      '<div class="ov"><b>' + s.t + '</b><span>' + s.s + '</span></div>';

    item.addEventListener('click', function () { openLightbox(programId, idx); });
    return item;
  }

  var currentProgram = 'retro';
  function setProgram(id) {
    currentProgram = id;
    picker.querySelectorAll('button').forEach(function (b) {
      b.classList.toggle('is-active', b.dataset.id === id);
    });

    while (grid.firstChild) grid.removeChild(grid.firstChild);

    stills[id].forEach(function (s, i) {
      var item = buildStill(s, i, id);
      grid.appendChild(item);
      setTimeout(function () { item.classList.add('is-in'); }, 80 * i);
    });
  }
  setProgram('retro');

  var lb        = document.getElementById('lightbox');
  var lbMedia   = document.getElementById('lightboxMedia');
  var lbCaption = document.getElementById('lightboxCaption');
  var lbClose   = document.getElementById('lightboxClose');
  var lbPrev    = document.getElementById('lightboxPrev');
  var lbNext    = document.getElementById('lightboxNext');

  var lbIdx = 0;

  function openLightbox(programId, idx) {
    currentProgram = programId;
    lbIdx = idx;
    showLightboxFrame();
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function showLightboxFrame() {
    var s = stills[currentProgram][lbIdx];
    var bg = 'hsl(' + s.h + ' 25% 14%)';
    var fg = 'hsl(' + s.h + ' 60% 70%)';
    var ac = 'hsl(' + ((s.h + 40) % 360) + ' 70% 60%)';

    lbMedia.innerHTML =
      '<svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">' +
        '<defs>' +
          '<radialGradient id="lbg" cx="50%" cy="40%" r="70%">' +
            '<stop offset="0%" stop-color="' + fg + '" stop-opacity=".22"/>' +
            '<stop offset="100%" stop-color="' + bg + '" stop-opacity="0"/>' +
          '</radialGradient>' +
        '</defs>' +
        '<rect width="800" height="1000" fill="' + bg + '"/>' +
        '<rect width="800" height="1000" fill="url(#lbg)"/>' +
        '<circle cx="400" cy="380" r="220" fill="none" stroke="' + fg + '" stroke-width="1" opacity=".35"/>' +
        '<circle cx="400" cy="380" r="150" fill="' + fg + '" opacity=".12"/>' +
        '<circle cx="400" cy="380" r="80" fill="' + fg + '"/>' +
        '<line x1="60" y1="700" x2="740" y2="700" stroke="' + fg + '" stroke-width="1" opacity=".3"/>' +
        '<text x="60" y="800" font-family="Fraunces, serif" font-style="italic" font-weight="300" font-size="58" fill="' + fg + '">' + s.t + '</text>' +
        '<text x="60" y="850" font-family="JetBrains Mono, monospace" font-size="14" letter-spacing="2" fill="' + ac + '">' + s.s.toUpperCase() + '</text>' +
        '<text x="60" y="950" font-family="JetBrains Mono, monospace" font-size="11" letter-spacing="2" fill="' + fg + '" opacity=".6">FRAME ' + String(lbIdx + 1).padStart(3, '0') + ' / NOCT-26 / ' + currentProgram.toUpperCase() + '</text>' +
      '</svg>';

    lbCaption.innerHTML = s.t + '<small>' + s.s + ' · кадр ' + (lbIdx + 1) + ' из ' + stills[currentProgram].length + '</small>';
  }

  function closeLightbox() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function lbNextFrame() {
    lbIdx = (lbIdx + 1) % stills[currentProgram].length;
    showLightboxFrame();
  }
  function lbPrevFrame() {
    lbIdx = (lbIdx - 1 + stills[currentProgram].length) % stills[currentProgram].length;
    showLightboxFrame();
  }

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', lbPrevFrame);
  lbNext.addEventListener('click', lbNextFrame);

  lb.addEventListener('click', function (e) {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowRight') lbNextFrame();
    if (e.key === 'ArrowLeft')  lbPrevFrame();
  });

})();
