

(function () {
  'use strict';

  var stage = document.getElementById('carouselStage');
  if (!stage) return;

  var films = [
    {
      year: '1976 / 35MM RESTORATION',
      title: 'Холодный свет',
      director: 'Андрей Семёнов',
      runtime: '94 мин',
      country: 'СССР · СФРЮ',
      description: 'Реставрированная версия культовой ленты о ночном поезде из Москвы в Загреб. Впервые на большом экране за 40 лет.',
      bg: '#1c1830',
      fg: '#ffb547'
    },
    {
      year: '2026 / WORLD PREMIERE',
      title: 'Сирень',
      director: 'Тамара Лурье',
      runtime: '112 мин',
      country: 'Грузия · Германия',
      description: 'Дебют года: молчаливая девушка-садовник в провинциальном Тбилиси выращивает поле сирени для женщины, которую никогда не видела.',
      bg: '#2a1e1e',
      fg: '#e8dcc1'
    },
    {
      year: '2025 / DOCUMENTARY',
      title: 'Пять часов утра',
      director: 'Жан Боде',
      runtime: '78 мин',
      country: 'Франция · Марокко',
      description: 'Четыре пекаря, четыре города, одна смена. Документ о тех, кто работает, пока спит остальной мир.',
      bg: '#2a2510',
      fg: '#ffb547'
    },
    {
      year: '2026 / EXPERIMENTAL',
      title: 'Антенна / Антитеза',
      director: 'Mira Köhler',
      runtime: '46 мин',
      country: 'Австрия',
      description: 'Эксперимент с архивными радиозаписями 1950-х: коллаж из голосов, перепутанных частот и нерасшифрованных сигналов.',
      bg: '#1a2326',
      fg: '#e63946'
    },
    {
      year: '2024 / SHORT PROGRAM',
      title: 'Шесть короткометражек',
      director: 'разные авторы',
      runtime: '88 мин',
      country: 'Балтия',
      description: 'Сборник дебютных работ Балтийской киношколы. Каждая короче пятнадцати минут, каждая — пощёчина.',
      bg: '#21171a',
      fg: '#e8dcc1'
    }
  ];


  films.forEach(function (f, i) {
    var slide = document.createElement('div');
    slide.className = 'slide' + (i === 0 ? ' is-active' : '');
    slide.setAttribute('data-idx', i);
    slide.innerHTML =
      '<div class="slide-media" style="background:' + f.bg + '">' +
        makePosterSVG(f) +
      '</div>' +
      '<div class="slide-body">' +
        '<div>' +
          '<div class="year">' + f.year + '</div>' +
          '<h3>' + f.title + '</h3>' +
          '<div class="credits">' +
            'РЕЖИССЁР &nbsp;&nbsp;&nbsp; <b>' + f.director + '</b><br>' +
            'ХРОНОМЕТРАЖ &nbsp; <b>' + f.runtime + '</b><br>' +
            'СТРАНА &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>' + f.country + '</b>' +
          '</div>' +
        '</div>' +
        '<p>' + f.description + '</p>' +
      '</div>';
    stage.appendChild(slide);
  });


  function makePosterSVG(f) {
    var safeTitle = f.title.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    return '<svg viewBox="0 0 600 520" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
        '<radialGradient id="g' + safeTitle.length + '" cx="50%" cy="40%" r="60%">' +
          '<stop offset="0%" stop-color="' + f.fg + '" stop-opacity=".25"/>' +
          '<stop offset="100%" stop-color="' + f.bg + '" stop-opacity="0"/>' +
        '</radialGradient>' +
      '</defs>' +
      '<rect width="600" height="520" fill="' + f.bg + '"/>' +
      '<rect width="600" height="520" fill="url(#g' + safeTitle.length + ')"/>' +
      '<circle cx="300" cy="220" r="130" fill="none" stroke="' + f.fg + '" stroke-width="1" opacity=".4"/>' +
      '<circle cx="300" cy="220" r="90" fill="' + f.fg + '" opacity=".18"/>' +
      '<circle cx="300" cy="220" r="46" fill="' + f.fg + '"/>' +
      '<line x1="40" y1="380" x2="560" y2="380" stroke="' + f.fg + '" stroke-width="1" opacity=".3"/>' +
      '<text x="40" y="430" font-family="Fraunces, serif" font-style="italic" font-weight="300" font-size="44" fill="' + f.fg + '">' + safeTitle + '</text>' +
      '<text x="40" y="475" font-family="JetBrains Mono, monospace" font-size="11" letter-spacing="2" fill="' + f.fg + '" opacity=".7">' + f.year + '</text>' +
      '</svg>';
  }

  var dotsHost = document.getElementById('carouselDots');
  films.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', function () { goTo(i); });
    dotsHost.appendChild(dot);
  });

  var current = 0;
  var slides = stage.querySelectorAll('.slide');
  var dots   = dotsHost.querySelectorAll('button');

  function goTo(i) {
    current = (i + films.length) % films.length;
    slides.forEach(function (s, idx) { s.classList.toggle('is-active', idx === current); });
    dots.forEach(function (d, idx) { d.classList.toggle('is-active', idx === current); });
  }
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  document.querySelectorAll('.carousel-arrows button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.getAttribute('data-dir') === 'next') next();
      else prev();
      restartAuto();
    });
  });

  document.addEventListener('keydown', function (e) {
    var inField = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (inField) return;
    if (e.key === 'ArrowRight') { next(); restartAuto(); }
    if (e.key === 'ArrowLeft')  { prev(); restartAuto(); }
  });

  var auto = setInterval(next, 6500);
  function restartAuto() { clearInterval(auto); auto = setInterval(next, 6500); }

  stage.addEventListener('mouseenter', function () { clearInterval(auto); });
  stage.addEventListener('mouseleave', restartAuto);

})();
