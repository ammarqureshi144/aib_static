// AIB Communications — static site interactions
(function () {
  // Year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

function toggleMenu() {
  var m = document.getElementById('mobile-menu');
  if (m) m.classList.toggle('open');
}

function toggleFaq(btn) {
  var item = btn.closest('.faq-item');
  if (!item) return;
  item.classList.toggle('open');
  var icon = item.querySelector('.faq-icon');
  if (icon) icon.textContent = item.classList.contains('open') ? '–' : '+';
}

// Contact form validation
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var success = document.getElementById('form-success');

  function showErr(name, msg) {
    var input = form.querySelector('[name="' + name + '"]');
    if (!input) return;
    var err = name === 'consent'
      ? form.querySelector('.err-consent')
      : input.parentElement.querySelector('.err');
    if (err) err.textContent = msg || '';
  }

  function clearErrs() {
    form.querySelectorAll('.err').forEach(function (e) { e.textContent = ''; });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrs();
    var data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      company: form.company.value.trim(),
      message: form.message.value.trim(),
      consent: form.consent.checked
    };
    var ok = true;
    if (!data.name) { showErr('name', 'Name is required'); ok = false; }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { showErr('email', 'Valid email required'); ok = false; }
    if (!data.company) { showErr('company', 'Company is required'); ok = false; }
    if (!data.message) { showErr('message', 'Message is required'); ok = false; }
    if (!data.consent) { showErr('consent', 'You must agree to be contacted'); ok = false; }
    if (!ok) return;
    form.style.display = 'none';
    if (success) success.hidden = false;
  });
})();
