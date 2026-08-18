/**
 * BRS hub collapsible blocks: PM links always visible on FM rows; button toggles panel.
 * Also used for ADHD implication panels on BRS hub pages.
 */

function setHubCollapsibleOpen(item: HTMLElement, open: boolean): void {
  const shell = item.querySelector<HTMLElement>(':scope > .brs-fm-hub-shell');
  if (!shell) return;

  const toggle =
    shell.querySelector<HTMLButtonElement>(':scope > .brs-fm-hub-summary') ??
    shell.querySelector<HTMLButtonElement>(':scope > .brs-fm-hub-summary-row .brs-fm-hub-toggle') ??
    shell.querySelector<HTMLButtonElement>(':scope > .brs-fm-hub-group-summary-row .brs-fm-hub-toggle');
  const panel = shell.querySelector<HTMLElement>(':scope > .brs-fm-hub-panel');
  if (!toggle || !panel) return;

  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  panel.hidden = !open;
  item.classList.toggle('brs-fm-hub-item--open', open);
}

function focusGroupChild(groupItem: HTMLElement, childIndex: number): void {
  setHubCollapsibleOpen(groupItem, true);

  const child = groupItem.querySelector<HTMLElement>(
    `:scope .brs-fm-hub-group-children > [data-brs-fm-hub-group-index="${childIndex}"]`,
  );
  if (!child) return;

  setHubCollapsibleOpen(child, true);
  child.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function bindGroupOpenActions(root: ParentNode): void {
  root.querySelectorAll<HTMLButtonElement>('[data-brs-hub-focus-child]:not([data-brs-hub-focus-init])').forEach((button) => {
    button.dataset.brsHubFocusInit = 'true';
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const childIndex = Number(button.getAttribute('data-brs-hub-focus-child'));
      if (Number.isNaN(childIndex)) return;

      const groupItem = button.closest<HTMLElement>('.brs-fm-hub-group[data-brs-fm-hub]');
      if (!groupItem) return;

      focusGroupChild(groupItem, childIndex);
    });
  });
}

function bindExpandOpenActions(root: ParentNode): void {
  root.querySelectorAll<HTMLButtonElement>('.brs-fm-hub-open--action:not([data-brs-hub-open-init])').forEach((button) => {
    button.dataset.brsHubOpenInit = 'true';
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const item = button.closest<HTMLElement>('[data-brs-fm-hub]');
      if (!item) return;

      const parentGroup = item.parentElement?.closest<HTMLElement>('.brs-fm-hub-group[data-brs-fm-hub]');
      if (parentGroup) {
        setHubCollapsibleOpen(parentGroup, true);
      }

      setHubCollapsibleOpen(item, true);
      item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
  });
}

function isSystemOptimisationPracticesItem(item: HTMLElement): boolean {
  const title = item
    .querySelector<HTMLElement>(':scope > .brs-fm-hub-shell > .brs-fm-hub-summary strong')
    ?.textContent?.trim();
  return title === 'System Optimisation Practices';
}

function openDefaultSopCategory(sopItem: HTMLElement): void {
  const foodPrep =
    sopItem.querySelector<HTMLElement>(
      ':scope [data-brs-sop-category="food_prep"]',
    ) ??
    sopItem.querySelector<HTMLElement>(
      ':scope .brs-hub-sop-categories > .brs-hub-sop-category',
    );
  if (foodPrep) {
    setHubCollapsibleOpen(foodPrep, true);
  }

  // Conditional Supplementation expands when KC Emerging Biological Supports (or curated overrides) are present.
  const conditional = sopItem.querySelector<HTMLElement>(
    ':scope [data-brs-sop-category="conditional_supplementation"][data-brs-sop-populated="true"]',
  );
  if (conditional) {
    setHubCollapsibleOpen(conditional, true);
  }
}

function readLocationHash(): string {
  if (typeof window === 'undefined') return '';
  const raw = window.location.hash.replace(/^#/, '');
  if (!raw) return '';
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function escapeSelectorValue(value: string): string {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
    return CSS.escape(value);
  }
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function headingSlug(text: string): string {
  return text
    .replace(/\s*\{#[^}]+\}\s*$/, '')
    .trim()
    .toLowerCase()
    .replace(/[:.,()/]+/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function findHashTarget(hash: string, root: ParentNode = document): HTMLElement | null {
  try {
    const byId = root.querySelector<HTMLElement>(`#${escapeSelectorValue(hash)}`);
    if (byId) return byId;
  } catch {
    // Invalid selector; fall through to getElementById / text slug.
  }
  const byDocumentId = document.getElementById(hash);
  if (byDocumentId) return byDocumentId;

  const emerging = root.querySelector<HTMLElement>(
    `[data-brs-emerging-support="${escapeSelectorValue(hash)}"]`,
  );
  if (emerging) return emerging;

  const headings = root.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6');
  for (const heading of headings) {
    if (heading.id === hash || headingSlug(heading.textContent || '') === hash) {
      return heading;
    }
  }

  return root.querySelector<HTMLElement>(
    `[data-brs-hub-hash="${escapeSelectorValue(hash)}"]`,
  );
}

function openHubAncestors(target: HTMLElement): void {
  const chain: HTMLElement[] = [];
  let node: HTMLElement | null = target;

  while (node) {
    const hub = node.closest<HTMLElement>('[data-brs-fm-hub]');
    if (!hub) break;
    chain.push(hub);
    node = hub.parentElement;
  }

  for (let i = chain.length - 1; i >= 0; i -= 1) {
    const item = chain[i];
    setHubCollapsibleOpen(item, true);
    if (isSystemOptimisationPracticesItem(item)) {
      openDefaultSopCategory(item);
    }
  }
}

function resolveScrollTarget(target: HTMLElement, hash: string): HTMLElement {
  const innerHeading = [...target.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6')].find(
    (heading) => heading.id === hash || headingSlug(heading.textContent || '') === hash,
  );
  return innerHeading ?? target;
}

function scrollHashTargetIntoView(target: HTMLElement): void {
  const scroll = () => {
    target.scrollIntoView({ block: 'start', behavior: 'auto' });
  };
  requestAnimationFrame(() => {
    requestAnimationFrame(scroll);
  });
}

let lastPathname = '';
let lastAutoOpenedHash = '';
let dismissedHash = '';

function itemContainsHashTarget(item: HTMLElement, hash: string): boolean {
  if (!hash) return false;
  if (item.id === hash) return true;
  if (item.getAttribute('data-brs-hub-hash') === hash) return true;
  if (item.getAttribute('data-brs-emerging-support') === hash) return true;
  try {
    if (item.querySelector(`#${escapeSelectorValue(hash)}`)) return true;
  } catch {
    // Invalid selector; fall through to heading-text match.
  }
  return [...item.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6')].some(
    (heading) => heading.id === hash || headingSlug(heading.textContent || '') === hash,
  );
}

function clearLocationHash(): void {
  if (typeof window === 'undefined' || !window.location.hash) return;
  const url = `${window.location.pathname}${window.location.search}`;
  window.history.replaceState(window.history.state, '', url);
}

function resetHashStateForPathname(): void {
  if (typeof window === 'undefined') return;
  const pathname = window.location.pathname;
  if (pathname === lastPathname) return;
  lastPathname = pathname;
  lastAutoOpenedHash = '';
  dismissedHash = '';
}

function dismissHashForItem(item: HTMLElement): void {
  const hash = readLocationHash();
  if (!hash || !itemContainsHashTarget(item, hash)) return;
  dismissedHash = hash;
  lastAutoOpenedHash = '';
  clearLocationHash();
}

function openHubTargetFromHash(
  root: ParentNode = document,
  options: { force?: boolean } = {},
): void {
  if (typeof window === 'undefined') return;
  const hash = readLocationHash();
  if (!hash) {
    lastAutoOpenedHash = '';
    return;
  }
  if (!options.force && (hash === dismissedHash || hash === lastAutoOpenedHash)) {
    return;
  }

  const target = findHashTarget(hash, root);
  if (!target) return;

  openHubAncestors(target);
  lastAutoOpenedHash = hash;
  dismissedHash = '';
  scrollHashTargetIntoView(resolveScrollTarget(target, hash));
}

function initBrsFmHubDropdowns(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-brs-fm-hub]:not([data-brs-fm-hub-init])').forEach((item) => {
    item.dataset.brsFmHubInit = 'true';

    const shell = item.querySelector<HTMLElement>(':scope > .brs-fm-hub-shell');
    if (!shell) return;

    const toggle =
      shell.querySelector<HTMLButtonElement>(':scope > .brs-fm-hub-summary') ??
      shell.querySelector<HTMLButtonElement>(':scope > .brs-fm-hub-summary-row .brs-fm-hub-toggle') ??
      shell.querySelector<HTMLButtonElement>(':scope > .brs-fm-hub-group-summary-row .brs-fm-hub-toggle');
    const panel = shell.querySelector<HTMLElement>(':scope > .brs-fm-hub-panel');
    if (!toggle || !panel) return;

    setHubCollapsibleOpen(item, false);

    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      setHubCollapsibleOpen(item, open);
      if (open && isSystemOptimisationPracticesItem(item)) {
        openDefaultSopCategory(item);
      }
      if (!open) {
        dismissHashForItem(item);
      }
    });
  });

  bindGroupOpenActions(root);
  bindExpandOpenActions(root);
  bindHashListener();
  resetHashStateForPathname();
  openHubTargetFromHash(root);
}

let hashListenerBound = false;

function bindHashListener(): void {
  if (hashListenerBound || typeof window === 'undefined') return;
  hashListenerBound = true;
  window.addEventListener('hashchange', () => openHubTargetFromHash(document, { force: true }));
}

export function onRouteDidUpdate(): void {
  if (typeof document === 'undefined') return;
  resetHashStateForPathname();
  initBrsFmHubDropdowns();
  openHubTargetFromHash();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initBrsFmHubDropdowns());
  } else {
    initBrsFmHubDropdowns();
  }
}
