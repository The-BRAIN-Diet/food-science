/**
 * Populate PM §4.2 System Optimisation Practices from dietary levers, food context, and lifestyle reclassification.
 */
import {
  PM_LEVER_HEADINGS,
  classifyLifestyleBullet,
  extractHubItemBlock,
  extractHubPanelBullets,
  setHubPanelBullets,
} from "./pm-section-4-levers.mjs";
import {
  buildFoodContextIndex,
  foodContextLink,
  resolveFoodSlugs,
} from "./food-context-index.mjs";
import { isSubstanceFoodBullet } from "./substance-food-mapping.mjs";

const DIETARY_HEADING = "4.1 Dietary Levers";
const DIRECT_HEADING = "4.1.1 Direct Dietary Levers";
const KC_HEADING = "4.1.3 KCs (Key Constraints)";

const PATTERN_LEVER_RE =
  /\b(cooking|patterning|pairing|distribution|exposure|matrix|timing|handling|preparation|fermentation|heating|charring|frequency|delivery|bolus|roasting|frying|processed|gentle|stable|complementary|distributed|repeated)\b/i;

/** Mechanism-framed optimisation bullets; excludes copied food-attribute prep notes. */
const MECHANISM_FRAMED_PREP_RE =
  /\b(helps|help|limit|preserve|reduce|support|prefer|gentle|lower-heat|pair|prepare|minimise|avoid|maintain|stable|repeated|consistent|distribute)\b/i;

const IRRELEVANT_FOOD_PREP_RE = [
  /^Higher taurine/i,
  /^Cook mussels thoroughly/i,
  /Grate or slice.*controlled portions/i,
  /melting in sauces changes texture/i,
];

const OPTIMISATION_THEMES = [
  {
    id: "marine_pufa",
    match: /\b(omega-3|epa|dha|oily.?fish|marine|pufa|membrane|phospholipid|eicosanoid|spm|astaxanthin)\b/i,
    slugs: ["salmon", "sardines", "mackerel", "extra-virgin-olive-oil"],
    text: (links) =>
      `Gentle cooking of marine-fat sources helps limit oxidative degradation of PUFA-rich meal matrices — see ${links}.`,
    section: "preparation",
  },
  {
    id: "oxidative_cooking",
    match: /\b(ros|oxidative|redox|lipid peroxid|age|ale|antioxidant|nrf2|glycation|charring|frying)\b/i,
    slugs: ["salmon", "extra-virgin-olive-oil", "blueberries", "spinach"],
    text: (links) =>
      `Prefer gentler cooking and stable fat handling to limit exogenous AGE/ALE and oxidised-lipid load — see ${links}.`,
    section: "preparation",
  },
  {
    id: "crucifer",
    match: /\b(nrf2|sulforaphane|crucifer|glucoraphanin|myrosinase|glutathione)\b/i,
    slugs: ["broccoli", "broccoli-sprouts", "cauliflower"],
    text: (links) =>
      `Prepare cruciferous vegetables to support myrosinase-dependent sulforaphane yield — see ${links}.`,
    section: "preparation",
  },
  {
    id: "heat_sensitive_antioxidant",
    match: /\b(polyphenol|vitamin c|antioxidant network|berry|berries|flavonoid|quercetin)\b/i,
    slugs: ["spinach", "blueberries", "extra-virgin-olive-oil"],
    text: (links) =>
      `Preserve heat-sensitive antioxidant and polyphenol delivery through lower-heat preparation where practical — see ${links}.`,
    section: "preparation",
  },
  {
    id: "fermentation_gut",
    match: /\b(ferment|scfa|gut|microbiome|endotoxin|lps|barrier|probiotic)\b/i,
    slugs: ["lentils", "sauerkraut", "kimchi", "chickpeas"],
    text: (links) =>
      `Prepare fermentable staples and include traditionally fermented foods where tolerated — see ${links}.`,
    section: "preparation",
  },
  {
    id: "iron_pairing",
    match: /\b(iron|non-heme|heme|ferritin|absorption)\b/i,
    slugs: ["spinach", "lentils", "chickpeas"],
    text: (links) =>
      `Pair iron-containing foods with vitamin C and meal-context enhancers to support absorption — see ${links}.`,
    section: "synergies",
  },
  {
    id: "protein_pairing",
    match: /\b(complementary|protein pairing|amino.?acid|eaa|lat1|tryptophan|tyrosine|protein distribution)\b/i,
    slugs: ["lentils", "chickpeas", "oats", "brown-rice", "eggs"],
    text: (links) =>
      `Use complementary protein pairing and distributed protein across meals to support amino-acid availability — see ${links}.`,
    section: "synergies",
  },
  {
    id: "fat_soluble",
    match: /\b(carotenoid|lutein|zeaxanthin|fat-soluble|vitamin a|vitamin k)\b/i,
    slugs: ["spinach", "kale", "sweet-potatoes", "avocado"],
    text: (links) =>
      `Pair fat-soluble compounds with dietary fat to support absorption — see ${links}.`,
    section: "synergies",
  },
];

function normalizeBulletKey(bullet) {
  return bullet
    .toLowerCase()
    .replace(/\(evidence:[^)]+\)/gi, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 72);
}

function isNearDuplicate(existing, candidate) {
  const key = normalizeBulletKey(candidate);
  if (!key) return true;
  return existing.some((bullet) => {
    const ek = normalizeBulletKey(bullet);
    return ek.includes(key.slice(0, 36)) || key.includes(ek.slice(0, 36));
  });
}

function extractSectionBullets(content, heading) {
  const entry = extractHubItemBlock(content, heading);
  if (!entry) return [];
  return extractHubPanelBullets(entry.block);
}

function collectDietaryFoodTokens(content) {
  const tokens = new Set();
  for (const heading of [DIRECT_HEADING, KC_HEADING]) {
    for (const bullet of extractSectionBullets(content, heading)) {
      if (!bullet.startsWith("-")) continue;
      const line = bullet.replace(/^- /, "");
      if (isSubstanceFoodBullet(line)) {
        const foods = line.split("←")[1] || "";
        for (const part of foods.split(/[,;/+]|(?:\s+and\s+)/)) {
          const token = part.trim();
          if (token && !token.startsWith("[")) tokens.add(token);
        }
      } else if (line.includes("←")) {
        const foods = line.split("←")[1] || "";
        for (const part of foods.split(/[,;/+]|(?:\s+and\s+)/)) {
          const token = part.trim();
          if (token) tokens.add(token);
        }
      }
    }
  }
  return [...tokens];
}

function collectPatternLeverBullets(content) {
  const bullets = [];
  for (const line of extractSectionBullets(content, DIRECT_HEADING)) {
    const trimmed = line.replace(/^- /, "").trim();
    const m = trimmed.match(/^(.+?)\s*←\s*(.+)$/);
    if (!m) continue;
    const [left, right] = [m[1].trim(), m[2].trim()];
    if (!PATTERN_LEVER_RE.test(left)) continue;
    if (isSubstanceFoodBullet(trimmed) && !PATTERN_LEVER_RE.test(left.split("(")[0])) continue;
    const examples = right.length > 120 ? `${right.slice(0, 117)}…` : right;
    const lead = /^(prefer|minimise|avoid|include|maintain|support|reduce|limit)/i.test(left)
      ? left
      : `Prefer ${left.charAt(0).toLowerCase()}${left.slice(1)}`;
    bullets.push(`${lead} — ${examples}.`);
  }
  return bullets;
}

function collectThemeSignals(content, pmId = "", fileSlug = "") {
  const leversBlock =
    content.match(/## 4\. Levers[\s\S]*?(?=\n## 5\.|\n## [2-9]\. Mechanistic)/)?.[0] || "";
  const summaryBlock =
    content.match(/## 5\. Mechanistic Basis[\s\S]*?#### \(/)?.[0] ||
    content.match(/### Summary[\s\S]*?(?=\n#### |\n## )/)?.[0] ||
    "";
  const slugText = fileSlug.replace(/-/g, " ");
  return `${pmId} ${slugText} ${leversBlock} ${summaryBlock}`;
}

function resolveThemeFoods(theme, dietaryTokens, foodIndex) {
  const fromDietary = new Set();
  for (const token of dietaryTokens) {
    for (const slug of resolveFoodSlugs(token, foodIndex)) fromDietary.add(slug);
  }

  const candidates = [...fromDietary].filter((slug) => theme.slugs.includes(slug));
  const pool = candidates.length ? candidates : theme.slugs;
  return pool
    .filter((slug) => {
      const entry = foodIndex.bySlug.get(slug);
      if (!entry) return false;
      return theme.section === "synergies" ? entry.hasSynergies : entry.hasPreparation;
    })
    .slice(0, 2);
}

function buildThemeBullets(signals, dietaryTokens, foodIndex) {
  const bullets = [];
  for (const theme of OPTIMISATION_THEMES) {
    if (!theme.match.test(signals)) continue;
    const slugs = resolveThemeFoods(theme, dietaryTokens, foodIndex);
    if (!slugs.length) continue;
    const links = slugs
      .map((slug) => foodContextLink(foodIndex.bySlug.get(slug), theme.section))
      .join(", ");
    bullets.push(theme.text(links));
  }
  return bullets;
}

function linkedFoodSlugs(bullets) {
  const slugs = new Set();
  for (const bullet of bullets) {
    for (const match of bullet.matchAll(/\/docs\/foods\/([a-z0-9-]+)#/g)) {
      slugs.add(match[1]);
    }
  }
  return slugs;
}

function isIrrelevantFoodPrepBullet(bullet) {
  const text = bullet.replace(/^- /, "").trim();
  if (!text.includes("#preparation")) return false;
  if (IRRELEVANT_FOOD_PREP_RE.some((re) => re.test(text))) return true;
  if (MECHANISM_FRAMED_PREP_RE.test(text)) return false;
  // Copied food-page prep line without mechanism framing.
  return /^[^—]+ — see \[[^\]]+ — Preparation\]/.test(text);
}

function filterOptimisationBullets(bullets) {
  return bullets.filter((bullet) => !isIrrelevantFoodPrepBullet(bullet));
}

function createOptimisationHubBlock(bullets) {
  return `<div class="brs-fm-hub-item" data-brs-fm-hub>
<div class="brs-fm-hub-shell">
<button type="button" class="brs-fm-hub-summary" aria-expanded="false">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
<strong>${PM_LEVER_HEADINGS.optimisation}</strong>
</button>
<div class="brs-fm-hub-panel" hidden>

${bullets.join("\n")}

</div>
</div>
</div>`;
}

function insertAfterDietary(content, block) {
  const dietary = extractHubItemBlock(content, DIETARY_HEADING);
  if (!dietary) {
    const leversIdx = content.indexOf("## 4. Levers");
    const insertAt = leversIdx >= 0 ? leversIdx : content.length;
    return `${content.slice(0, insertAt)}\n\n\n${block}\n\n\n${content.slice(insertAt)}`;
  }
  const lifestyle = extractHubItemBlock(content, PM_LEVER_HEADINGS.lifestyle);
  if (lifestyle && lifestyle.index > dietary.index) {
    return `${content.slice(0, lifestyle.index)}\n\n\n${block}\n\n\n${content.slice(lifestyle.index)}`;
  }
  const insertAt = dietary.index + dietary.block.length;
  return `${content.slice(0, insertAt)}\n\n\n${block}\n\n\n${content.slice(insertAt)}`;
}

function upsertOptimisationPanel(content, bullets) {
  if (!bullets.length) return { content, changed: false };

  const existing = extractHubItemBlock(content, PM_LEVER_HEADINGS.optimisation);
  if (existing) {
    const updated = setHubPanelBullets(existing.block, bullets);
    return { content: content.replace(existing.block, updated), changed: true };
  }

  const block = createOptimisationHubBlock(bullets);
  return { content: insertAfterDietary(content, block), changed: true };
}

function splitLifestyleForOptimisation(content) {
  const lifestyleEntry = extractHubItemBlock(content, PM_LEVER_HEADINGS.lifestyle);
  if (!lifestyleEntry) return { moved: [], lifestyle: [] };

  const lifestyleBullets = extractHubPanelBullets(lifestyleEntry.block);
  const moved = [];
  const lifestyle = [];
  for (const bullet of lifestyleBullets) {
    if (classifyLifestyleBullet(bullet) === "optimisation") moved.push(bullet);
    else lifestyle.push(bullet);
  }
  return { moved, lifestyle, lifestyleEntry };
}

/**
 * @param {string} content
 * @param {{ foodIndex?: ReturnType<typeof buildFoodContextIndex>, pmId?: string }} [options]
 */
export function populatePmOptimisationLevers(content, options = {}) {
  const foodIndex = options.foodIndex || buildFoodContextIndex();
  const pmId = options.pmId || "";
  const fileSlug = options.fileSlug || "";
  const signals = collectThemeSignals(content, pmId, fileSlug);
  const dietaryTokens = collectDietaryFoodTokens(content);

  const existingOpt = extractHubItemBlock(content, PM_LEVER_HEADINGS.optimisation);
  const rawExistingBullets = existingOpt ? extractHubPanelBullets(existingOpt.block) : [];
  const existingBullets = filterOptimisationBullets(rawExistingBullets);
  const removedIrrelevant = rawExistingBullets.some((bullet) =>
    isIrrelevantFoodPrepBullet(bullet),
  );

  const { moved: fromLifestyle } = splitLifestyleForOptimisation(content);
  const themeBullets = buildThemeBullets(signals, dietaryTokens, foodIndex);
  const patternBullets = collectPatternLeverBullets(content);

  const candidates = [
    ...existingBullets,
    ...fromLifestyle,
    ...themeBullets,
    ...patternBullets.filter((bullet) => {
      if (!themeBullets.length) return true;
      return !isNearDuplicate(themeBullets, bullet);
    }),
  ];

  const merged = [];
  for (const bullet of candidates) {
    const normalized = bullet.startsWith("- ") ? bullet : `- ${bullet}`;
    if (isIrrelevantFoodPrepBullet(normalized)) continue;
    if (isNearDuplicate(merged, normalized)) continue;

    const slugLinks = [...linkedFoodSlugs([normalized])];
    if (
      slugLinks.length &&
      (normalized.includes("#preparation") || normalized.includes("#synergies")) &&
      merged.some((existing) => slugLinks.some((slug) => linkedFoodSlugs([existing]).has(slug)))
    ) {
      continue;
    }

    merged.push(normalized);
    if (merged.length >= 6) break;
  }

  if (!merged.length) return { content, changed: false };

  const hasNew = merged.some((b) => !isNearDuplicate(existingBullets, b));
  if (!hasNew && !removedIrrelevant && existingBullets.length === merged.length) {
    return { content, changed: false };
  }

  return upsertOptimisationPanel(content, merged);
}

export {
  OPTIMISATION_THEMES,
  collectDietaryFoodTokens,
  collectPatternLeverBullets,
  isIrrelevantFoodPrepBullet,
  filterOptimisationBullets,
};
