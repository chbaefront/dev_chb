import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { initializeTheme } from './theme.js';

export function initializeLayout() {
  renderHeader(document.querySelector('[data-site-header]'));
  renderFooter(document.querySelector('[data-site-footer]'));
  initializeTheme();
}
