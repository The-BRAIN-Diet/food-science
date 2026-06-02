function clearStoredSidebarState(storage: Storage): void {
  const keysToRemove: string[] = [];

  for (let i = 0; i < storage.length; i += 1) {
    const key = storage.key(i);
    if (!key) continue;

    // Docusaurus stores sidebar expansion state in browser storage.
    // Clear any sidebar-related entries so each visit starts from defaults.
    if (/docusaurus/i.test(key) && /sidebar|collapsed|collapsible/i.test(key)) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach((key) => storage.removeItem(key));
}

if (typeof window !== 'undefined') {
  try {
    clearStoredSidebarState(window.localStorage);
    clearStoredSidebarState(window.sessionStorage);
  } catch {
    // Ignore storage access errors (private mode / blocked storage).
  }
}
