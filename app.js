// Theme toggle to vary backdrop wash (purely visual)
const root = document.documentElement;
const btn = document.querySelector('#toggle-theme');
btn?.addEventListener('click', () => {
  const dark = root.dataset.theme !== 'alt';
  root.dataset.theme = dark ? 'alt' : 'default';
  if (dark){
    root.style.setProperty('--bg', '#0b0e14');
  } else {
    root.style.setProperty('--bg', '#0d1016');
    root.style.setProperty('--bg2', '#121524');
  }
});

// ---------- Left-rail TOC behavior (mobile collapse + active highlight) ----------
(function initTOC(){
  const toc = document.querySelector('.toc');
  const toggle = toc?.querySelector('.toc__toggle');
  const list = toc?.querySelector('#toc-list');
  const links = Array.from(toc?.querySelectorAll('a') ?? []);
  if (!toc || !list) return;

  // Mobile collapse/expand
  toggle?.addEventListener('click', () => {
    const open = list.hasAttribute('hidden');
    list.toggleAttribute('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Active highlight while scrolling
  const sections = ['#intro','#chapter-1','#chapter-2','#chapter-3','#outro']
    .map(sel => document.querySelector(sel))
    .filter(Boolean);

  const byId = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));

  const io = new IntersectionObserver((entries) => {
    let topMost = null;
    for (const e of entries){
      if (!e.isIntersecting) continue;
      if (!topMost || e.intersectionRatio > topMost.intersectionRatio){
        topMost = e;
      }
    }
    if (!topMost) return;
    const id = topMost.target.id;
    links.forEach(a => a.classList.toggle('is-active', a === byId.get(id)));
  }, {
    root: null,
    rootMargin: '0px 0px -45% 0px',
    threshold: [0.25, 0.45, 0.75]
  });

  sections.forEach(sec => io.observe(sec));
})();
