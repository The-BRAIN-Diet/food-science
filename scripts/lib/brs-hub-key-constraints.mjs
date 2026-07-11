/**
 * Condensed Key Constraints (Dietary Bottlenecks) block for BRS hub pages.
 * Aggregates deduplicated target foods from KC Shared Biological Pool sections.
 * @see system/brs-page-schema.md
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  FOOD_EXPANSIONS,
  HUB_PAGES,
  parseDietaryBullet,
  resolveFoodPageHref,
  titleCaseFood,
} from "./brs-hub-levers.mjs";

export const HUB_KC_MARKERS = {
  start: "<!-- brs-hub-key-constraints:start -->",
  end: "<!-- brs-hub-key-constraints:end -->",
};

/** Brief hub intro — why these substrates matter for the whole BRS. */
export const HUB_KC_SECTION_INTRO = {
  BRS1:
    "Neurotransmitter turnover draws on shared amino-acid pools that many signalling pathways compete for. The Key Constraints identify the nutritional resources — protein quality, LNAA balance, choline and membrane precursors — that constrain whether synthesis and transport keep pace with daily demand. Dietary Guidance then builds on these shared requirements by showing how foods, meal composition and eating patterns influence the wider biology of neurotransmitter regulation.",
  BRS2:
    "One-carbon metabolism is shaped long before homocysteine rises. The Key Constraints identify the shared methyl-donor and sulfur-amino-acid pools that remethylation, membrane renewal and glutathione formation all depend upon. Dietary Guidance then builds on these shared requirements by showing how foods, dietary patterns and eating behaviours influence the wider biology of one-carbon regulation.",
  BRS3:
    "Inflammation is shaped long before it becomes visible. The Key Constraints identify the shared nutritional resources that multiple inflammation-regulating mechanisms depend upon. Dietary Guidance then builds on these shared requirements by showing how foods, dietary patterns and eating behaviours influence the wider biology of inflammatory regulation.",
  BRS4:
    "Bioenergetic reserve is shaped long before ATP shortage becomes measurable. The Key Constraints identify the shared macronutrient fuels and mitochondrial cofactors that electron transport, substrate switching and oxidative resilience all depend upon. Dietary Guidance then builds on these shared requirements by showing how foods, dietary patterns and eating behaviours influence the wider biology of mitochondrial energy regulation.",
  BRS5:
    "Gut–brain communication is shaped long before dysbiosis becomes clinically obvious. The Key Constraints identify the shared fermentable fibres, polyphenols and barrier-supportive nutrients that microbial ecology, SCFA signalling and gut–brain interface stability all depend upon. Dietary Guidance then builds on these shared requirements by showing how foods, dietary patterns and eating behaviours influence the wider biology of enteric and neuroimmune regulation.",
  BRS6:
    "Stress adaptation is shaped long before cortisol dysregulation becomes obvious. The Key Constraints identify the shared energy substrates and stress-response micronutrients that glycaemic stability, HPA rhythm and metabolic recovery all depend upon. Dietary Guidance then builds on these shared requirements by showing how foods, dietary patterns and eating behaviours influence the wider biology of neuroendocrine and metabolic regulation.",
};

function escapeHtml(text) {
  return String(text || "").replace(/</g, "&lt;");
}

function normalizeFoodKey(label) {
  return String(label || "")
    .trim()
    .toLowerCase();
}

const KC_FOOD_EXPANSIONS = {
  fish: ["salmon", "sardines", "tuna", "cod", "mackerel"],
  dairy: ["greek yogurt", "milk", "cheddar cheese"],
  legumes: ["lentils", "chickpeas"],
  meat: ["beef", "chicken", "turkey"],
  cheese: ["cheddar cheese"],
  poultry: ["chicken", "turkey"],
};

function expandKcFoodToken(raw) {
  const key = normalizeFoodKey(raw);
  const expanded = KC_FOOD_EXPANSIONS[key] || FOOD_EXPANSIONS[key];
  if (expanded?.length) return expanded;
  return [raw.trim()];
}

export function parseKcSharedPoolFoods(content) {
  const sec =
    content.match(/### 2\. Shared Biological Pool\n([\s\S]*?)(?=\n### 3\.)/) ||
    content.match(/### 3\.[^\n]*\n([\s\S]*?)(?=\n### 4\.)/);
  if (!sec) return [];

  const foods = new Set();
  for (const line of sec[1].split("\n")) {
    if (!line.trim().startsWith("- ") || !line.includes("←")) continue;
    for (const food of parseDietaryBullet(line).foods) {
      for (const expanded of expandKcFoodToken(food)) foods.add(expanded);
    }
  }
  return [...foods];
}

function kcLabelFromMeta(data, fileName) {
  const kcId = data.kc_id || "";
  const title = data.title || fileName;
  if (kcId && title) return `${kcId} — ${title}`;
  return kcId || title;
}

function listKcPagesForBrs(brsId, rootDir = process.cwd()) {
  const brsNum = brsId.replace(/^BRS(\d+)$/, "$1");
  const kcDir = path.join(rootDir, "docs/biological-targets", `brs${brsNum}`, "kc");
  if (!fs.existsSync(kcDir)) return [];

  return fs
    .readdirSync(kcDir)
    .filter((name) => name.endsWith(".mdx"))
    .sort()
    .map((name) => {
      const filePath = path.join(kcDir, name);
      const content = fs.readFileSync(filePath, "utf8");
      const { data } = matter(content);
      const slug = name.replace(/\.mdx$/, "");
      return {
        label: kcLabelFromMeta(data, slug),
        href: `/docs/biological-targets/brs${brsNum}/kc/${slug}`,
        parent_brs: data.parent_brs || brsId,
        foods: parseKcSharedPoolFoods(content),
      };
    })
    .filter((kc) => kc.parent_brs === brsId);
}

function dedupeFoodLinks(foods, rootDir) {
  const byHref = new Map();
  for (const raw of foods) {
    const label = titleCaseFood(raw);
    const page = resolveFoodPageHref(label, undefined, rootDir);
    if (!page.href) continue;
    if (!byHref.has(page.href)) {
      byHref.set(page.href, { label, href: page.href });
    }
  }
  return [...byHref.values()].sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * @param {string} brsId
 * @param {string} [rootDir]
 */
export function buildHubKeyConstraintsData(brsId, rootDir = process.cwd()) {
  const kcs = listKcPagesForBrs(brsId, rootDir);
  const allFoods = kcs.flatMap((kc) => kc.foods);
  const intro =
    HUB_KC_SECTION_INTRO[brsId] ||
    `These target foods supply the shared substrate and precursor pools that constrain effective operation of multiple mechanisms within ${brsId}.`;

  return {
    intro,
    foods: dedupeFoodLinks(allFoods, rootDir),
    kcs: kcs.map(({ label, href }) => ({ label, href })),
  };
}

function renderFoodLinks(foods) {
  if (!foods.length) return "";
  const links = foods
    .map((food) => `<a href="${food.href}">${escapeHtml(food.label)}</a>`)
    .join(" • ");
  return `<p class="brs-hub-dietary-target-foods"><strong>Target foods:</strong> ${links}</p>`;
}

function renderKcLinks(kcs) {
  if (!kcs.length) return "";
  const items = kcs
    .map(
      (kc) =>
        `<li><a href="${kc.href}">${escapeHtml(kc.label.replace(/\s*-\s*/g, " — "))}</a></li>`,
    )
    .join("\n");
  return `<ul class="brs-hub-kc-links">\n${items}\n</ul>`;
}

/**
 * @param {string} brsId
 * @param {{ intro: string, foods: Array<{label:string,href:string}>, kcs: Array<{label:string,href:string}> }} data
 */
export function renderHubKeyConstraintsHtml(brsId, data) {
  if (!data.kcs.length) return "";

  return `${HUB_KC_MARKERS.start}
## Key Constraints (Dietary Bottlenecks)

<p>${escapeHtml(data.intro)}</p>

${renderFoodLinks(data.foods)}

${renderKcLinks(data.kcs)}
${HUB_KC_MARKERS.end}`;
}

function stripHrBeforeCrossBrs(content) {
  return content
    .replace(/\n---\s*\n+(?=<!-- brs-hub-cross-integration:start -->)/g, "\n\n")
    .replace(/\n---\s*\n+(?=## Cross-BRS Dependencies)/g, "\n\n")
    .replace(/\n{3,}(?=<!-- brs-hub-cross-integration:start -->)/g, "\n\n");
}

/**
 * @param {string} hubPath
 * @param {string} html
 * @param {string} [rootDir]
 */
export function patchHubKeyConstraints(hubPath, html, rootDir = process.cwd()) {
  const full = path.join(rootDir, hubPath);
  let content = fs.readFileSync(full, "utf8");
  const block = html.trimEnd();

  const blockRe = new RegExp(
    `\\n*${HUB_KC_MARKERS.start.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${HUB_KC_MARKERS.end.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\n*`,
  );
  content = content.replace(blockRe, "\n\n");

  // Remove legacy KC section (boilerplate + described links) — typically after Functional Mechanisms.
  content = content.replace(
    /\n## Key Constraints \(Dietary Bottlenecks\)\n[\s\S]*?(?=\n---\s*\n+(?:<!-- brs-hub-cross-integration|## Cross-BRS Dependencies)|\n<!-- brs-hub-cross-integration|\n## Cross-BRS Dependencies|\n## Specific Mechanisms|\n## Modulators)/,
    "\n",
  );
  content = stripHrBeforeCrossBrs(content);
  content = content.replace(/\n---\n\n## Specific Mechanisms/, "\n\n## Specific Mechanisms");

  const insertRe = /(<!-- brs-hub-levers:end -->)\n+(## Functional Mechanisms)/;
  if (!insertRe.test(content)) {
    throw new Error(`${hubPath}: could not find insertion point before Functional Mechanisms`);
  }
  content = content.replace(insertRe, `$1\n\n${block}\n\n$2`);

  fs.writeFileSync(full, content);
}

export { HUB_PAGES };
