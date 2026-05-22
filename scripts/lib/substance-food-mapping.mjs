/**
 * Substance ← food canonical mapping (KC §3, FM/PM/SM Dietary Levers).
 * @see system/substance-food-mapping-format.md
 */

export const SUBSTANCE_FOOD_ARROW = "←";
export const MAX_FOOD_EXAMPLES = 3;

const OUTCOME_MARKERS =
  /\b(may |reduced |improved |support context|throughput|volatility|entrainment|pressure|signalling|inflammatory load|stability\.|pattern →|meals →|composition →|per \[|aligned with)\b/i;

const NARRATIVE_MEAL_PREFIX =
  /^(Anti-inflammatory|Low-glycaemic|Regular |Consistent |Fibre-rich|Stable |Higher |Lower |Mediterranean|Distributed |Balanced |PM\d|Slow,|mixed |Post-meal|Resistance |Lower ultra)/i;

const NARRATIVE_SUBSTANCE_SUFFIX =
  /\b(support context|membrane support|NMDA modulation|signalling|throughput|volatility|entrainment|one-carbon throughput|GABA-active context|LNAA transport context|precursor context)\b/i;

/** @param {string} line */
export function isLegacyFoodToSubstanceLine(line) {
  if (!line.trim().startsWith("-")) return false;
  if (line.includes(SUBSTANCE_FOOD_ARROW)) return false;
  const m = line.match(/^-\s*(.+?)\s*→\s*(.+?)\.?\s*$/);
  if (!m) return false;
  const [, foods, subs] = m;
  if (OUTCOME_MARKERS.test(subs) || OUTCOME_MARKERS.test(foods)) return false;
  if (NARRATIVE_MEAL_PREFIX.test(foods.trim())) return false;
  if (NARRATIVE_SUBSTANCE_SUFFIX.test(subs)) return false;
  if (subs.length > 90) return false;
  return true;
}

/** @param {string} line */
export function isSubstanceFoodBullet(line) {
  return /^-\s*.+\s←\s*.+/.test(line.trim());
}

/** @param {string} raw */
function splitFoods(raw) {
  return raw
    .split(/[/,+]/)
    .map((s) => s.replace(/\band\b/gi, "").trim())
    .filter(Boolean);
}

/**
 * @param {string} raw e.g. "choline,B12" or "protein (tyrosine)"
 * @returns {string[]}
 */
function parseSubstanceTokens(raw) {
  const out = [];
  const paren = [...raw.matchAll(/\(([^)]+)\)/g)].map((m) => m[1].trim());
  for (const p of paren) {
    for (const t of p.split(/[,/]/)) {
      const x = t.trim();
      if (x) out.push(x);
    }
  }
  let rest = raw.replace(/\([^)]*\)/g, "");
  for (const t of rest.split(/[,/]/)) {
    const x = t.trim();
    if (x && !/^protein$/i.test(x)) out.push(x);
  }
  return [...new Set(out.map(normalizeSubstanceLabel))];
}

/** @param {string} s */
function normalizeSubstanceLabel(s) {
  const t = s.trim();
  if (/^b12$/i.test(t)) return "B12";
  if (/^b6$/i.test(t)) return "B6";
  if (/^b2$/i.test(t)) return "B2";
  if (/^epa\/dha$/i.test(t) || /^dha\/epa$/i.test(t)) return "EPA/DHA";
  if (/^dha$/i.test(t)) return "DHA";
  if (/^ala$/i.test(t)) return "ALA";
  if (/^sam>e?$/i.test(t)) return "SAMe";
  if (t.length <= 4) return t.toUpperCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/**
 * @param {string[]} lines
 * @returns {{ map: Map<string, Set<string>>, narrative: string[], substanceOnly: string[] }}
 */
export function collectSubstanceFoodMap(lines) {
  /** @type {Map<string, Set<string>>} */
  const map = new Map();
  const narrative = [];
  const substanceOnly = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("-")) continue;

    if (isLegacyFoodToSubstanceLine(trimmed)) {
      const m = trimmed.match(/^-\s*(.+?)\s*→\s*(.+?)\.?\s*$/);
      const foods = splitFoods(m[1]);
      const subs = parseSubstanceTokens(m[2]);
      for (const sub of subs) {
        if (!map.has(sub)) map.set(sub, new Set());
        for (const f of foods) map.get(sub).add(f);
      }
      continue;
    }

    if (isSubstanceFoodBullet(trimmed)) {
      const m = trimmed.match(/^-\s*(.+?)\s←\s*(.+?)\.?\s*$/);
      const sub = normalizeSubstanceLabel(m[1].replace(/\[|\]/g, "").trim());
      const foods = m[2].split(/,/).map((f) => f.trim()).filter(Boolean);
      if (!map.has(sub)) map.set(sub, new Set());
      for (const f of foods) map.get(sub).add(f);
      continue;
    }

    const bare = trimmed.match(/^-\s*([A-Za-z0-9/+\- ]+?)\s*$/);
    if (bare && !trimmed.includes("→") && !trimmed.includes("←")) {
      substanceOnly.push(normalizeSubstanceLabel(bare[1]));
      continue;
    }

    narrative.push(trimmed);
  }

  for (const sub of substanceOnly) {
    if (!map.has(sub)) map.set(sub, new Set());
  }

  return { map, narrative, substanceOnly };
}

/**
 * @param {Map<string, Set<string>>} map
 * @param {{ maxFoods?: number }} [opts]
 */
export function formatSubstanceFoodBullets(map, { maxFoods = MAX_FOOD_EXAMPLES } = {}) {
  const lines = [];
  for (const sub of [...map.keys()].sort((a, b) => a.localeCompare(b))) {
    const foods = [...map.get(sub)];
    const shown = foods.slice(0, maxFoods);
    if (shown.length === 0) {
      lines.push(`- ${sub}`);
    } else {
      lines.push(`- ${sub} ${SUBSTANCE_FOOD_ARROW} ${shown.join(", ")}`);
    }
  }
  return lines;
}

/**
 * Transform a block of dietary/substrate bullets.
 * @param {string} block
 */
export function transformSubstanceFoodBlock(block) {
  const lines = block.split("\n");
  const { map, narrative } = collectSubstanceFoodMap(lines);
  const hasMappable = [...lines].some(isLegacyFoodToSubstanceLine);
  const hasBareSubs = lines.some((l) => {
    const t = l.trim();
    return t.startsWith("-") && !t.includes("→") && !t.includes("←") && /^-\s*[A-Za-z0-9/+\- ]+\s*$/.test(t);
  });
  if (!hasMappable && !hasBareSubs) return { block, changed: false };

  const formatted = formatSubstanceFoodBullets(map);
  const out = [...formatted, ...narrative.filter((n) => !formatted.includes(n))];
  const newBlock = out.length ? `${out.join("\n")}\n` : "";
  return { block: newBlock, changed: newBlock !== block };
}

/**
 * @param {string} content full MDX body
 * @param {"kc"|"diet"} mode
 */
export function migrateSubstanceFoodSections(content, mode) {
  let next = content;
  let changed = false;

  if (mode === "kc") {
    const re =
      /(### 3\. Supporting Inputs\/Substrates\s*\n)([\s\S]*?)(?=\n### 4\. )/m;
    next = next.replace(re, (_m, head, body) => {
      const { block, changed: c } = transformSubstanceFoodBlock(body);
      if (c) changed = true;
      return `${head}${block}`;
    });
  }

  if (mode === "diet") {
    next = next.replace(
      /(<summary><strong>Diet<\/strong><\/summary>\s*\n)([\s\S]*?)(\n<\/details>)/g,
      (_m, open, body, close) => {
        let inner = body;
        inner = inner.replace(
          /\n<details>\s*\n<summary><strong>Food sources \(examples\)<\/strong><\/summary>\s*\n([\s\S]*?)\n<\/details>/g,
          (_m2, foodBlock) => {
            changed = true;
            return `\n${foodBlock}`;
          },
        );
        const { block, changed: c } = transformSubstanceFoodBlock(inner);
        if (c) changed = true;
        return `${open}${block}${close}`;
      },
    );

    next = next.replace(
      /(## \d+\. Dietary Levers\s*\n)([\s\S]*?)(?=\n## \d+\. )/g,
      (_m, head, section) => {
        if (section.includes("<summary><strong>Diet</strong>")) return _m;
        const { block, changed: c } = transformSubstanceFoodBlock(section);
        if (!c) return _m;
        changed = true;
        return `${head}<details>\n<summary><strong>Diet</strong></summary>\n\n${block}\n</details>\n`;
      },
    );
  }

  return { content: next, changed };
}
