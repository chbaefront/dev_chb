export function renderHeader(target) {
  const template = document.createElement('template');
  template.innerHTML = `
    <div class="site-header__inner container">
      <a class="site-header__title" href="./" aria-label="dev_chb 홈">dev_chb</a>
      <nav class="site-header__actions" aria-label="페이지 및 테마">
        <a class="tokens-link" href="./design-tokens.html">디자인 토큰</a>
        <button class="theme-toggle" type="button" aria-label="다크 모드로 전환" aria-pressed="false">
          <svg class="theme-toggle__moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20.9 13.1A9 9 0 0 1 10.9 3.1a9 9 0 1 0 10 10Z" />
          </svg>
          <svg class="theme-toggle__sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42m0-14.14-1.42 1.42M6.35 17.65l-1.42 1.42" />
          </svg>
        </button>
      </nav>
    </div>
  `;

  const content = template.content.cloneNode(true);
  const tokensLink = content.querySelector('.tokens-link');
  const tokensUrl = new URL(tokensLink.getAttribute('href'), window.location.href);
  if (tokensUrl.pathname === window.location.pathname) {
    tokensLink.setAttribute('aria-current', 'page');
  }
  target.replaceChildren(content);
}
