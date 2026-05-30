(function () {
  'use strict';

  var host = document.getElementById('accordion');
  if (!host) return;

  var schedule = [
    {
      day: '14',
      month: 'СЕНТ',
      title: 'День 1 · Открытие',
      sub: 'Ретроспектива + welcome-сеанс',
      items: [
        { time: '23:00', title: 'Открытие фестиваля', sub: 'Слово директора', room: 'ЗАЛ A · большой', tag: '' },
        { time: '23:30', title: 'Холодный свет',     sub: '35мм реставрация · Семёнов · 1976', room: 'ЗАЛ A · большой', tag: 'hot', tagText: 'HOT' },
        { time: '01:20', title: 'Семь зеркал',       sub: 'ретроспектива · Орсини · 1972', room: 'ЗАЛ Б · средний', tag: '' },
        { time: '03:00', title: 'Ночной маршрут',    sub: 'ретроспектива · Тагер · 1965', room: 'ЗАЛ В · малый', tag: '' }
      ]
    },
    {
      day: '15',
      month: 'СЕНТ',
      title: 'День 2 · Дебюты',
      sub: 'Только первые полнометражные работы',
      items: [
        { time: '23:00', title: 'Сирень',            sub: 'дебют · Лурье · 2026', room: 'ЗАЛ A · большой', tag: 'new', tagText: 'NEW' },
        { time: '01:00', title: 'Q&A с Тамарой Лурье', sub: 'на грузинском с переводом', room: 'ЗАЛ A · большой', tag: '' },
        { time: '02:00', title: 'Свет в окне',       sub: 'дебют · Холодов · 2026', room: 'ЗАЛ Б · средний', tag: '' },
        { time: '04:00', title: 'Молочный путь',     sub: 'дебют · Айра · 2025', room: 'ЗАЛ В · малый', tag: '' }
      ]
    },
    {
      day: '16',
      month: 'СЕНТ',
      title: 'День 3 · Эксперимент',
      sub: 'Лента, шум, монтаж',
      items: [
        { time: '23:00', title: 'Антенна / Антитеза', sub: 'эксперимент · Köhler · 2026', room: 'ЗАЛ Б · средний', tag: 'new', tagText: 'NEW' },
        { time: '00:30', title: 'Шум',                sub: 'эксперимент · Перч · 2024', room: 'ЗАЛ В · малый', tag: '' },
        { time: '02:00', title: '12 кадров',          sub: 'эксперимент · Лей · 2025', room: 'ЗАЛ В · малый', tag: '' }
      ]
    },
    {
      day: '17',
      month: 'СЕНТ',
      title: 'День 4 · Документ',
      sub: 'Четыре длинные истории',
      items: [
        { time: '23:00', title: 'Пять часов утра',    sub: 'документ · Боде · 2025', room: 'ЗАЛ A · большой', tag: 'hot', tagText: 'HOT' },
        { time: '00:20', title: 'Бессонница',         sub: 'документ · Рамирес · 2024', room: 'ЗАЛ Б · средний', tag: '' },
        { time: '02:00', title: 'Маяк',               sub: 'документ · Сорочи · 2025', room: 'ЗАЛ В · малый', tag: '' },
        { time: '03:40', title: 'Долгая смена',       sub: 'документ · Калмыков · 2024', room: 'ЗАЛ В · малый', tag: '' }
      ]
    },
    {
      day: '18 — 20',
      month: 'СЕНТ',
      title: 'Дни 5–7 · Закрытие',
      sub: 'Короткий метр, повторные показы, церемония',
      items: [
        { time: '23:00', title: 'Шесть короткометражек',  sub: 'короткий метр · Балтия · 2024', room: 'ЗАЛ A · большой', tag: '' },
        { time: '01:00', title: 'Повторы по запросу',     sub: 'голосование зрителей в чате', room: 'ЗАЛ Б · средний', tag: '' },
        { time: '04:00', title: 'Церемония закрытия',     sub: '20 сентября · награждение', room: 'ЗАЛ A · большой', tag: 'hot', tagText: 'FIN' }
      ]
    }
  ];

  schedule.forEach(function (day, dIdx) {
    var item = document.createElement('div');
    item.className = 'acc-item';
    item.setAttribute('data-day', day.day);

    // Заголовок (кнопка)
    var head = document.createElement('button');
    head.className = 'acc-head';
    head.setAttribute('aria-expanded', 'false');
    head.innerHTML =
      '<span>' +
        '<span style="font-family:var(--mono);font-size:.7rem;letter-spacing:.18em;color:var(--amber);margin-right:1.5rem">' +
          day.day + ' ' + day.month +
        '</span>' +
        '<em>' + day.title + '</em>' +
        '<span style="font-family:var(--mono);font-style:normal;font-size:.72rem;letter-spacing:.12em;color:var(--muted);margin-left:1.5rem">· ' + day.sub + '</span>' +
      '</span>' +
      '<span class="plus">+</span>';

    // Тело
    var body = document.createElement('div');
    body.className = 'acc-body';
    var inner = document.createElement('div');
    inner.className = 'acc-body-inner';

    var sched = document.createElement('div');
    sched.className = 'schedule';
    day.items.forEach(function (it) {
      var row = document.createElement('div');
      row.className = 'sched-row';
      row.innerHTML =
        '<div class="sched-time">' + it.time + '</div>' +
        '<div class="sched-title">' + it.title + '<small>' + it.sub + '</small></div>' +
        '<div class="sched-room">' + it.room + '</div>' +
        '<div>' + (it.tag ? '<span class="sched-tag ' + it.tag + '">' + it.tagText + '</span>' : '') + '</div>';
      sched.appendChild(row);
    });
    inner.appendChild(sched);
    body.appendChild(inner);

    item.appendChild(head);
    item.appendChild(body);
    host.appendChild(item);

    head.addEventListener('click', function () {
      var isOpen = item.classList.toggle('is-open');
      head.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // высота — посчитаем после раскрытия
      if (isOpen) {
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        body.style.maxHeight = '0px';
      }


    });
  });

  var first = host.querySelector('.acc-item');
  if (first) {
    first.classList.add('is-open');
    first.querySelector('.acc-head').setAttribute('aria-expanded', 'true');
    var b = first.querySelector('.acc-body');
    setTimeout(function () { b.style.maxHeight = b.scrollHeight + 'px'; }, 50);
  }

  window.addEventListener('resize', function () {
    host.querySelectorAll('.acc-item.is-open .acc-body').forEach(function (b) {
      b.style.maxHeight = b.scrollHeight + 'px';
    });
  });

})();
