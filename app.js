// Tiny helper: theme toggle to vary backdrop color wash (visual fun, no impact on scroll timelines)
const root = document.documentElement;
const btn = document.querySelector('#toggle-theme');

btn?.addEventListener('click', () => {
  const dark = root.dataset.theme !== 'alt';
  root.dataset.theme = dark ? 'alt' : 'default';
  // swap a couple CSS vars via data-theme hook
  if (dark){
    root.style.setProperty('--bg', '#0b0e14');
  } else {
    root.style.setProperty('--bg', '#0d1016');
    root.style.setProperty('--bg2', '#121524');
  }
});
