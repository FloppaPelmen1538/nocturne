(function () {
  'use strict';

  var form    = document.getElementById('bookForm');
  if (!form) return;

  var summary = document.getElementById('liveSummary');
  var popup   = document.getElementById('popup');
  var ticket  = document.getElementById('ticketInfo');
  var closeBtn = document.getElementById('popupClose');

  var validators = {
    name:  function (v) { return v.trim().length >= 2; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
    day:   function (v) { return v !== ''; },
    seats: function (v) { var n = Number(v); return n >= 1 && n <= 4; }
  };

  var fields = form.querySelectorAll('[data-validate]');

  function validateField(field) {
    var name = field.dataset.validate;
    var input = field.querySelector('input, select, textarea');
    var fn = validators[name];
    if (!fn) return true;

    var ok = fn(input.value);
    field.classList.toggle('is-invalid', !ok && input.value !== '');
    field.classList.toggle('is-valid', ok);
    return ok;
  }

  fields.forEach(function (field) {
    var input = field.querySelector('input, select, textarea');

    input.addEventListener('input',  function () { validateField(field); updateSummary(); });
    input.addEventListener('change', function () { validateField(field); updateSummary(); });
    input.addEventListener('blur',   function () { validateField(field); });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && input.tagName !== 'TEXTAREA') {
        e.preventDefault();
        var inputs = Array.from(form.querySelectorAll('input, select, textarea, button'));
        var idx = inputs.indexOf(input);
        var next = inputs[idx + 1];
        if (next) next.focus();
      }
    });
  });

  document.getElementById('interestGroup').addEventListener('change', updateSummary);
  document.getElementById('f-note').addEventListener('input', updateSummary);


  function getFormData() {
    var fd = new FormData(form);
    var interests = [];
    form.querySelectorAll('input[name="interest"]:checked').forEach(function (c) {
      interests.push(c.value);
    });
    return {
      name:      fd.get('name')  || '',
      email:     fd.get('email') || '',
      day:       fd.get('day')   || '',
      dayText:   form.querySelector('#f-day option:checked').textContent,
      seats:     fd.get('seats') || '',
      interests: interests,
      note:      fd.get('note')  || ''
    };
  }

  function updateSummary() {
    var d = getFormData();
    var parts = [];
    if (d.name)              parts.push('гость <b>' + escapeHtml(d.name) + '</b>');
    if (d.day && d.day !== '')   parts.push('день <b>' + escapeHtml(d.dayText) + '</b>');
    if (d.seats)             parts.push('<b>' + d.seats + '</b> мест');
    if (d.interests.length)  parts.push('интересы: <b>' + d.interests.join(', ') + '</b>');

    if (parts.length === 0) {
      summary.textContent = 'Заполняйте поля — здесь появится резюме вашей брони.';
    } else {
      summary.innerHTML = parts.join(' · ');
    }
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }


  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var allOk = true;
    fields.forEach(function (f) {
      var input = f.querySelector('input, select, textarea');
      // Принудительно показать ошибку для пустых required-полей
      if (input.value.trim() === '' && input.hasAttribute('required')) {
        f.classList.add('is-invalid');
        allOk = false;
      } else if (!validateField(f)) {
        allOk = false;
      }
    });

    if (!allOk) {
      var firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.querySelector('input, select, textarea').focus();
      return;
    }

    var d = getFormData();
    var bookingId = 'N' + Math.floor(Math.random() * 9000 + 1000) + '-26';

    ticket.innerHTML =
      '<b>НОМЕР БРОНИ</b><br>' +
      '<span style="color:var(--amber);font-size:1.1rem;letter-spacing:.2em">' + bookingId + '</span><br><br>' +
      '<b>ГОСТЬ</b> ' + escapeHtml(d.name) + '<br>' +
      '<b>EMAIL</b> ' + escapeHtml(d.email) + '<br>' +
      '<b>ДЕНЬ</b> ' + escapeHtml(d.dayText) + '<br>' +
      '<b>МЕСТ</b> ' + d.seats;

    openPopup();
  });

  function openPopup() {
    popup.classList.add('is-open');
    popup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function closePopup() {
    popup.classList.remove('is-open');
    popup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    form.reset();
    fields.forEach(function (f) { f.classList.remove('is-valid', 'is-invalid'); });
    updateSummary();
  }

  closeBtn.addEventListener('click', closePopup);
  popup.addEventListener('click', function (e) { if (e.target === popup) closePopup(); });

  document.addEventListener('keydown', function (e) {
    if (popup.classList.contains('is-open') && e.key === 'Escape') closePopup();
  });

})();
