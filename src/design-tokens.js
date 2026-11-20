import { initializeLayout } from './layout.js';

initializeLayout();

const colors = [
  ['Primary', '--color-primary'],
  ['Secondary', '--color-secondary'],
  ['Background', '--color-background'],
  ['Surface', '--color-surface'],
  ['Section Card', '--color-card'],
  ['Background Glow / Blue', '--color-glow-blue'],
  ['Background Glow / Violet', '--color-glow-violet'],
  ['Text / Primary', '--color-text'],
  ['Text / Secondary', '--color-text-secondary'],
  ['Border', '--color-border'],
];

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

for (const list of document.querySelectorAll('[data-colors]')) {
  const theme = getComputedStyle(list.closest('.token-theme'));
  for (const [name, variable] of colors) {
    const row = element('li', 'color-token');
    const swatch = element('span', 'color-token__swatch');
    swatch.style.backgroundColor = `var(${variable})`;
    swatch.setAttribute('aria-hidden', 'true');
    const details = element('div', 'color-token__details');
    details.append(
      element('strong', '', name),
      element('code', '', variable),
      element('span', '', theme.getPropertyValue(variable).trim().toUpperCase()),
    );
    row.append(swatch, details);
    list.append(row);
  }
}

// Read the shared stylesheet so the catalogue uses the same tokens as the site.
const stylesheet = [...document.styleSheets].find(sheet => sheet.href?.endsWith('/src/styles.css'));
const declarations = [...stylesheet.cssRules].find(rule => rule.selectorText?.split(',')[0].trim() === ':root').style;
const variables = [...declarations];
const styles = getComputedStyle(document.documentElement);

function renderTypeTokens(prefix, target, property, sample) {
  const tokens = variables.filter(name => name.startsWith(prefix))
    .sort((a, b) => parseFloat(styles.getPropertyValue(a)) - parseFloat(styles.getPropertyValue(b)));
  for (const token of tokens) {
    const row = element('li', 'type-token');
    const value = styles.getPropertyValue(token).trim();
    const preview = element('p', 'type-token__sample', sample);
    preview.style[property] = `var(${token})`;
    row.append(element('p', 'type-token__label', `${value} · ${token}`), preview);
    document.querySelector(target).append(row);
  }
}

renderTypeTokens('--font-size-', '#font-sizes', 'fontSize', '가나다 Aa 0123');
renderTypeTokens('--font-weight-', '#font-weights', 'fontWeight', '함께 만드는 더 나은 경험 · Pretendard');

// Measure actual portfolio classes, including their responsive rules.
const examples = [
  ['헤더 타이틀', 'a', 'site-header__title'],
  ['인사', 'p', 'introduction__greeting'],
  ['소개 제목', 'h1', '', 'introduction'],
  ['직무 소개', 'p', 'introduction__role'],
  ['핵심 역량', 'li', '', 'introduction__strengths'],
  ['소개 본문', 'p', 'introduction__description'],
  ['연락처 링크', 'a', '', 'contact-links'],
  ['섹션 라벨', 'p', 'section-heading__eyebrow'],
  ['섹션 제목', 'h2', '', 'section-heading'],
  ['섹션 설명', 'p', '', 'section-heading'],
  ['기술 분류', 'h3', '', 'tech-stack__group'],
  ['기술 태그', 'li', '', 'tech-stack__list'],
  ['경력 기간', 'p', 'timeline__period'],
  ['경력 회사명', 'h3', 'timeline__company'],
  ['경력 팀·역할', 'p', 'timeline__role'],
  ['푸터', 'p', 'site-footer__inner'],
];

function renderTypeRoles() {
  const body = document.querySelector('#type-roles');
  body.replaceChildren();
  for (const [label, tag, className, parentClass] of examples) {
    const parent = element('div', parentClass);
    const sample = element(tag, className, 'Aa');
    parent.append(sample);
    parent.hidden = true;
    document.body.append(parent);
    const computed = getComputedStyle(sample);
    const row = element('tr');
    for (const text of [label, computed.fontSize, computed.fontWeight, computed.lineHeight, computed.letterSpacing]) {
      row.append(element('td', '', text));
    }
    body.append(row);
    parent.remove();
  }
}

renderTypeRoles();
window.addEventListener('resize', renderTypeRoles);
