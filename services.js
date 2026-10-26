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

// Scroll reveal
const items = document.querySelectorAll('.svc-card, .flow-step, .mat-card, .commit-card');
items.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); obs.unobserve(e.target); }
  });
}, { threshold: 0.15 });
items.forEach(el => io.observe(el));