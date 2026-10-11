const BUTTON_CLASS = 'az-expand-all';

function findAzItem(): HTMLElement | null {
  const links = document.querySelectorAll('a.menu__link');
  for (const link of links) {
    if (link.textContent?.trim() !== 'A–Z') continue;
    const item = link.closest('li.theme-doc-sidebar-item-category');
    if (item instanceof HTMLElement) return item;
  }
  return null;
}

function categoryToggle(item: HTMLElement): HTMLElement | null {
  const toggle = item.querySelector(':scope > .menu__list-item-collapsible > a.menu__link');
  return toggle instanceof HTMLElement ? toggle : null;
}

function expandLetterGroups(azItem: HTMLElement): void {
  const letters = azItem.querySelectorAll(':scope > ul.menu__list > li.menu__list-item--collapsed');
  letters.forEach((letter) => {
    if (!(letter instanceof HTMLElement)) return;
    categoryToggle(letter)?.click();
  });
}

function expandAllSubstances(azItem: HTMLElement): void {
  if (azItem.classList.contains('menu__list-item--collapsed')) {
    categoryToggle(azItem)?.click();
    window.setTimeout(() => expandLetterGroups(azItem), 0);
    return;
  }
  expandLetterGroups(azItem);
}

function mountExpandAllButton(): void {
  const azItem = findAzItem();
  const row = azItem?.querySelector(':scope > .menu__list-item-collapsible');
  if (!(row instanceof HTMLElement) || row.querySelector(`.${BUTTON_CLASS}`)) return;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = BUTTON_CLASS;
  button.textContent = 'Expand all';
  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const current = findAzItem();
    if (current) expandAllSubstances(current);
  });
  row.appendChild(button);
}

function watchSidebar(): void {
  mountExpandAllButton();
  const observer = new MutationObserver(() => mountExpandAllButton());
  observer.observe(document.body, { childList: true, subtree: true });
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', watchSidebar, { once: true });
  } else {
    watchSidebar();
  }
}
