/** Retired Key Constraints — excluded from hub rollups, PM §4.1.3, and public pages. */
export const RETIRED_KC_IDS = new Set(["BRS3(KC3)"]);

export const RETIRED_KC_HREFS = new Set([
  "/docs/biological-targets/brs3/kc/brs3-kc3-essential-fatty-acid-balance",
]);

export function isRetiredKc({ id, href } = {}) {
  if (id && RETIRED_KC_IDS.has(id)) return true;
  if (href && RETIRED_KC_HREFS.has(href.split("#")[0])) return true;
  return false;
}

/** True when a KC page belongs to the host BRS (not cross-imported). */
export function isNativeKcForBrs(href, brsId) {
  if (!href || !brsId) return false;
  const brsNum = brsId.match(/^BRS(\d+)$/)?.[1];
  if (!brsNum) return false;
  return href.startsWith(`/docs/biological-targets/brs${brsNum}/kc/`);
}
