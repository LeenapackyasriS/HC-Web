// Sticky header shadow
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const closeMenu = () => {
  nav.classList.remove('open');
  menuToggle.innerHTML = '<i class="bi bi-list"></i>';
};
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuToggle.innerHTML = nav.classList.contains('open')
    ? '<i class="bi bi-x"></i>' : '<i class="bi bi-list"></i>';
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// ===== FAQ accordion (one open at a time) =====
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  const ans = item.querySelector('.faq-a');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      ans.style.maxHeight = ans.scrollHeight + 'px';
    }
  });
});

// ===== Form validation =====
const form = document.getElementById('enquiryForm');
const success = document.getElementById('formSuccess');
const fileInput = document.getElementById('files');
const MAX_SIZE = 10 * 1024 * 1024; // 10MB per file

const rules = {
  name:    v => v.trim().length >= 2,
  email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  phone:   v => /^[+\d][\d\s\-()]{7,}$/.test(v.trim()),
  subject: v => v.trim().length >= 3,
  details: v => v.trim().length >= 10
};

function checkField(id) {
  const el = document.getElementById(id);
  const group = el.closest('.f-group');
  const ok = rules[id](el.value);
  group.classList.toggle('invalid', !ok);
  return ok;
}

function checkFiles() {
  const group = fileInput.closest('.f-group');
  const tooBig = [...fileInput.files].some(f => f.size > MAX_SIZE);
  group.classList.toggle('invalid', tooBig);
  return !tooBig;
}

Object.keys(rules).forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener('blur', () => checkField(id));
  el.addEventListener('input', () => {
    if (el.closest('.f-group').classList.contains('invalid')) checkField(id);
  });
});
fileInput.addEventListener('change', checkFiles);

form.addEventListener('submit', async e => {
  e.preventDefault();
  success.classList.remove('show');

  const results = Object.keys(rules).map(checkField);
  const filesOk = checkFiles();
  if (results.includes(false) || !filesOk) {
    form.querySelector('.invalid input, .invalid textarea')?.focus();
    return;
  }

  const btn = form.querySelector('.f-submit');
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = 'Sending...';

  try {
    const data = new FormData(form);

    // TODO: connect your backend here. Examples:
    //   await fetch('send-enquiry.php', { method: 'POST', body: data });
    //   await fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: data, headers: { Accept: 'application/json' } });
    await new Promise(r => setTimeout(r, 800)); // demo delay, remove when connected

    form.reset();
    success.classList.add('show');
  } catch (err) {
    alert('Sorry, something went wrong. Please try again or contact us directly.');
  } finally {
    btn.disabled = false;
    btn.innerHTML = original;
  }
});

// ===== Scroll reveal =====
const items = document.querySelectorAll('.ct-card, .ct-cta');
items.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); obs.unobserve(e.target); }
  });
}, { threshold: 0.1 });
items.forEach(el => io.observe(el));