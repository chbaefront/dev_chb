import { get, set } from './storage/index.js';
import { THEME } from './storage/keys.js';

export function initializeTheme() {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  let selectedTheme = get(THEME);

  function applyTheme(theme) {
    const dark = theme === 'dark';
    root.dataset.theme = theme;
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? '라이트 모드로 전환' : '다크 모드로 전환');
    toggle.title = toggle.getAttribute('aria-label');
  }

  const initialTheme = selectedTheme === 'light' || selectedTheme === 'dark'
    ? selectedTheme
    : systemTheme.matches ? 'dark' : 'light';

  applyTheme(initialTheme);

  toggle.addEventListener('click', () => {
    selectedTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(selectedTheme);
    set(THEME, selectedTheme);
  });

  systemTheme.addEventListener('change', (event) => {
    if (selectedTheme !== 'light' && selectedTheme !== 'dark') {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  });
}
