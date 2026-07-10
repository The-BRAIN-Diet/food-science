/**
 * BRS hub collapsible blocks: PM links always visible on FM rows; button toggles panel.
 * Also used for ADHD implication panels on BRS hub pages.
 */

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

    const setOpen = (open: boolean) => {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.hidden = !open;
      item.classList.toggle('brs-fm-hub-item--open', open);
    };

    setOpen(false);

    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
  });
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
