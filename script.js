// Sticky header shadow
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  menuToggle.innerHTML = nav.classList.contains('open')
    ? '<i class="bi bi-x"></i>' : '<i class="bi bi-list"></i>';
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.innerHTML = '<i class="bi bi-list"></i>';
}));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav a:not(.btn)');
window.addEventListener('scroll', () => {
  let current = 'home';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
});

// Project filter
const chips = document.querySelectorAll('.chip');
const projects = document.querySelectorAll('.project');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  const f = chip.dataset.filter;
  projects.forEach(p => {
    const show = f === 'all' || p.dataset.cat.split(' ').includes(f);
    p.classList.toggle('hide', !show);
  });
}));

// Counter animation
const counters = document.querySelectorAll('.count');
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
counters.forEach(c => counterObserver.observe(c));

// Testimonial arrows (scrolls the track on mobile)
const track = document.getElementById('tTrack');
document.getElementById('nextT').addEventListener('click', () => {
  track.scrollBy({ left: track.clientWidth * 0.85, behavior: 'smooth' });
});
document.getElementById('prevT').addEventListener('click', () => {
  track.scrollBy({ left: -track.clientWidth * 0.85, behavior: 'smooth' });
});

// Video modal
const modal = document.getElementById('videoModal');
const frame = document.getElementById('videoFrame');
const VIDEO_URL = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'; // replace with your video
document.getElementById('playBtn').addEventListener('click', () => {
  frame.src = VIDEO_URL;
  modal.classList.add('open');
});
const closeModal = () => { modal.classList.remove('open'); frame.src = ''; };
document.getElementById('closeModal').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Scroll reveal
document.querySelectorAll('.service-card, .project, .step, .t-card, .af')
  .forEach(el => el.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); obs.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));