export function renderFooter(target) {
  const template = document.createElement('template');
  template.innerHTML = `
    <div class="container site-footer__inner">
      <p>© 2026 chb. All rights reserved.</p>
    </div>
  `;
  target.replaceChildren(template.content.cloneNode(true));
}
