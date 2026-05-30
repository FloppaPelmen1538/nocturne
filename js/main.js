(function () {
  'use strict';

  console.log(
    '%c NOCTURNE · 2026 ',
    'background:#0a0a12;color:#ffb547;font-family:monospace;padding:6px 10px;font-size:11px;letter-spacing:.2em'
  );
  console.log(
    'viewport: ' + window.innerWidth + ' × ' + window.innerHeight +
    ' · path: ' + window.location.pathname
  );

  var hero = document.getElementById('hero');
  if (hero) {
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--mx', x + '%');
      hero.style.setProperty('--my', y + '%');
    });

    hero.addEventListener('mouseleave', function () {
      hero.style.setProperty('--mx', '50%');
      hero.style.setProperty('--my', '50%');
    });

    var heroTitle = hero.querySelector('h1');
    if (heroTitle) {
      hero.addEventListener('mousemove', function (e) {
        var dx = (e.clientX / window.innerWidth - 0.5) * 14;
        var dy = (e.clientY / window.innerHeight - 0.5) * 8;
        heroTitle.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
      });
    }
  }

  var cursorDot = document.getElementById('cursorDot');
  if (cursorDot) {
    document.addEventListener('mousemove', function (e) {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top  = e.clientY + 'px';
    });

    document.addEventListener('mouseover', function (e) {
      var t = e.target;
      if (t.closest('a, button, .gallery-item, .picker, .acc-head')) {
        cursorDot.classList.add('is-big');
      }
    });
    document.addEventListener('mouseout', function (e) {
      var t = e.target;
      if (t.closest('a, button, .gallery-item, .picker, .acc-head')) {
        cursorDot.classList.remove('is-big');
      }
    });
  }


  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  document.addEventListener('keydown', function (e) {
    var inField = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (inField) return;
    if (e.key === 'g' || e.key === 'G') window.location.href = 'index.html';
    if (e.key === 'p' || e.key === 'P') window.location.href = 'program.html';
    if (e.key === 'r' || e.key === 'R') window.location.href = 'reservations.html';
  });


  function updateNavMeta() {
  }
  window.addEventListener('resize', updateNavMeta);

})();
