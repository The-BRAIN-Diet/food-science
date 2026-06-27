/**
 * Merge PM-level lifestyle notes into integrated BRS hub Lifestyle Priorities.
 * @see scripts/data/brs-hub-lifestyle-priorities.mjs
 * @see system/brs-hub-levers-schema.md
 */
import { HUB_LIFESTYLE_PRIORITIES } from "../data/brs-hub-lifestyle-priorities.mjs";

function pmRowMatchesPriority(row, priority) {
  if (priority.match_pm_ids?.includes(row.pmId)) return true;
  if (priority.match_pm_patterns?.some((re) => re.test(row.pmId))) return true;
  if (!priority.match_lifestyle?.length) return false;
  return row.lifestyle.some(({ text }) => priority.match_lifestyle.some((re) => re.test(text)));
}

/**
 * @param {string} brsId
 * @param {Array<{ pmId: string, pmHref: string, lifestyle: Array<{ text: string }> }>} pmRows
 * @returns {Array<{ action: string, explanation: string, label: string, source_pms: Array<{ id: string, href: string }> }>}
 */
export function buildIntegratedLifestylePriorities(brsId, pmRows) {
  const curated = HUB_LIFESTYLE_PRIORITIES[brsId];
  if (!curated?.length) return null;

  const priorities = [];

  for (const priority of curated) {
    const sourceMap = new Map();

    for (const row of pmRows) {
      if (!pmRowMatchesPriority(row, priority)) continue;
      sourceMap.set(row.pmId, { id: row.pmId, href: row.pmHref });
    }

    const source_pms = [...sourceMap.values()].sort((a, b) => a.id.localeCompare(b.id));
    if (!source_pms.length && priority.require_pm_match !== false) continue;

    priorities.push({
      action: priority.action,
      explanation: priority.explanation,
      label: `${priority.action} ${priority.explanation}`.replace(/\s+/g, " ").trim(),
      source_pms,
    });
  }

  return priorities;
}
