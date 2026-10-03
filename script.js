const header = document.querySelector('[data-header]');
const reveals = document.querySelectorAll('.reveal');

const setHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
};

setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add('is-visible'));
}

// Preserve a fast, predictable booking flow: every booking action exits to Booksy.
document.querySelectorAll('a[href*="booksy.com"]').forEach(link => {
  link.addEventListener('click', () => {
    try { sessionStorage.setItem('miles-booksy-click', new Date().toISOString()); } catch (_) {}
  });
});
