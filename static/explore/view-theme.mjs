const THEME_KEY = 'brain-wheel-theme';
const ns = 'http://www.w3.org/2000/svg';

export function isDayMode() {
  return document.body.classList.contains('day-mode');
}

export function addViewControls({anchor, diagram, fileStem}) {
  const theme = document.createElement('button');
  theme.id = 'themeToggle';
  theme.type = 'button';
  const apply = day => {
    document.body.classList.toggle('day-mode', day);
    theme.textContent = day ? 'Night mode' : 'Day mode';
    theme.setAttribute('aria-label', day ? 'Switch to night mode' : 'Switch to day mode');
    localStorage.setItem(THEME_KEY, day ? 'day' : 'night');
  };
  theme.addEventListener('click', () => apply(!isDayMode()));
  const exp = document.createElement('button');
  exp.id = 'exportSvg';
  exp.type = 'button';
  exp.textContent = 'Export SVG';
  exp.addEventListener('click', () => {
    const root = diagram();
    if (!root) return;
    const day = isDayMode();
    const svg = diagramToSvg(root, day);
    const url = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], {type: 'image/svg+xml'}));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileStem}-${day ? 'day' : 'night'}.svg`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  anchor.append(theme, exp);
  apply(localStorage.getItem(THEME_KEY) === 'day');
}

function opaque(color, fallback) {
  const match = String(color || '').match(/rgba?\(([^)]+)\)/);
  if (!match) return color && color !== 'transparent' ? color : fallback;
  const parts = match[1].split(',').map(part => part.trim());
  const alpha = parts.length === 4 ? Number(parts[3]) : 1;
  return Number.isFinite(alpha) && alpha >= 0.5 ? `rgb(${parts[0]}, ${parts[1]}, ${parts[2]})` : fallback;
}

export function diagramToSvg(root, day) {
  const box = root.getBoundingClientRect();
  const width = Math.max(1, Math.ceil(box.width));
  const height = Math.max(1, Math.ceil(box.height));
  const fallback = day ? '#f5f7fb' : '#090d16';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('xmlns', ns);
  svg.setAttribute('width', String(width));
  svg.setAttribute('height', String(height));
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  const background = document.createElementNS(ns, 'rect');
  background.setAttribute('width', '100%');
  background.setAttribute('height', '100%');
  background.setAttribute('fill', opaque(getComputedStyle(root).backgroundColor, opaque(getComputedStyle(document.body).backgroundColor, fallback)));
  svg.appendChild(background);
  const source = root.querySelector('svg');
  if (source) {
    const paths = document.createElementNS(ns, 'g');
    for (const child of source.childNodes) paths.appendChild(child.cloneNode(true));
    svg.appendChild(paths);
  }
  for (const el of root.querySelectorAll('button, h2, h3, h4, .power, .level-label')) {
    if (el.closest('svg') || el.id === 'themeToggle' || el.id === 'exportSvg') continue;
    const rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) continue;
    if (rect.right < box.left || rect.left > box.right || rect.bottom < box.top || rect.top > box.bottom) continue;
    const style = getComputedStyle(el);
    const x = rect.left - box.left;
    const y = rect.top - box.top;
    const group = document.createElementNS(ns, 'g');
    group.setAttribute('opacity', style.opacity || '1');
    const fill = opaque(style.backgroundColor, '');
    if (fill) {
      const shape = document.createElementNS(ns, 'rect');
      shape.setAttribute('x', String(x));
      shape.setAttribute('y', String(y));
      shape.setAttribute('width', String(rect.width));
      shape.setAttribute('height', String(rect.height));
      shape.setAttribute('rx', '6');
      shape.setAttribute('fill', fill);
      shape.setAttribute('stroke', opaque(style.borderTopColor, fill));
      group.appendChild(shape);
    }
    const lines = el.innerText.split('\n').map(line => line.trim()).filter(Boolean).slice(0, 3);
    lines.forEach((line, index) => {
      const text = document.createElementNS(ns, 'text');
      text.setAttribute('x', String(x + 8));
      text.setAttribute('y', String(y + 16 + index * 14));
      text.setAttribute('fill', opaque(style.color, day ? '#172338' : '#e8edf7'));
      text.setAttribute('font-family', 'Arial, sans-serif');
      text.setAttribute('font-size', index === 0 ? '12' : '10');
      text.textContent = line;
      group.appendChild(text);
    });
    svg.appendChild(group);
  }
  return svg;
}
