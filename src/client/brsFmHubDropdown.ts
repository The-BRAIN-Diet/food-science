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
  if (!foodPrep) return;
  setHubCollapsibleOpen(foodPrep, true);
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
    });
  });

  bindGroupOpenActions(root);
  bindExpandOpenActions(root);
}

export function onRouteDidUpdate(): void {
  if (typeof document === 'undefined') return;
  initBrsFmHubDropdowns();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initBrsFmHubDropdowns());
  } else {
    initBrsFmHubDropdowns();
  }
}
