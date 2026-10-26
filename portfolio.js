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

// ===== Filter + search + load more =====
const cards = [...document.querySelectorAll('.pf-card')];
const chips = document.querySelectorAll('.pf-chip');
const searchInput = document.getElementById('searchInput');
const loadMoreBtn = document.getElementById('loadMore');
const emptyMsg = document.getElementById('pfEmpty');

const FIRST_PAGE = 8;   // cards shown at first
const PAGE_STEP = 4;    // cards added per "Load More" click
let activeFilter = 'all';
let visibleCount = FIRST_PAGE;

function render() {
  const q = searchInput.value.trim().toLowerCase();
  const matches = cards.filter(c => {
    const catOk = activeFilter === 'all' || c.dataset.cat.split(' ').includes(activeFilter);
    const textOk = !q || c.dataset.name.toLowerCase().includes(q) || c.textContent.toLowerCase().includes(q);
    return catOk && textOk;
  });

  cards.forEach(c => c.classList.add('hide'));
  matches.slice(0, visibleCount).forEach(c => c.classList.remove('hide'));

  emptyMsg.classList.toggle('show', matches.length === 0);
  loadMoreBtn.parentElement.style.display = matches.length > visibleCount ? '' : 'none';
}

chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  activeFilter = chip.dataset.filter;
  visibleCount = FIRST_PAGE;
  render();
}));

searchInput.addEventListener('input', () => {
  visibleCount = FIRST_PAGE;
  render();
});

loadMoreBtn.addEventListener('click', () => {
  visibleCount += PAGE_STEP;
  render();
});

render();

// ===== Counter animation =====
const runCounter = el => {
  const target = +el.dataset.target;
  const step = Math.max(1, Math.ceil(target / 60));
  let n = 0;
  const timer = setInterval(() => {
    n += step;
    if (n >= target) { n = target; clearInterval(timer); }
    el.textContent = n;
  }, 25);
};
const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) { runCounter(e.target); obs.unobserve(e.target); }
  });
}, { threshold: 0.6 });
document.querySelectorAll('.count').forEach(c => counterObserver.observe(c));

// ===== Scroll reveal =====
const revealItems = document.querySelectorAll('.pf-card, .pf-step');
revealItems.forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); obs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
revealItems.forEach(el => revealObserver.observe(el));