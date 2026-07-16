import fs from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import test from "node:test";
import assert from "node:assert/strict";
import {
  PM6_ID,
  PM_LEVER_HEADINGS,
  assertCanonicalPmSection4,
  enforcePmSection4LeverOrder,
  extractHubItemBlock,
  extractHubPanelBullets,
  reclassifyLifestyleOptimisationBullets,
  transformPmSection4Levers,
  validatePmSection4Contract,
} from "./lib/pm-section-4-levers.mjs";
import { buildFoodContextIndex } from "./lib/food-context-index.mjs";
import { populatePmOptimisationLevers, isIrrelevantFoodPrepBullet } from "./lib/pm-optimisation-populate.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS = path.join(__dirname, "../docs/biological-targets");
const PM6_PATH = path.join(
  __dirname,
  "../docs/biological-targets/brs1/fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation.mdx",
);

const HUB_ITEM = (heading, bullets) => `<div class="brs-fm-hub-item" data-brs-fm-hub>
<div class="brs-fm-hub-shell">
<button type="button" class="brs-fm-hub-summary" aria-expanded="false">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
<strong>${heading}</strong>
</button>
<div class="brs-fm-hub-panel" hidden>

${Array.isArray(bullets) ? bullets.join("\n") : bullets}

</div>
</div>
</div>`;

test("lifestyle-only panel renames 4.2 → 4.3", () => {
  const input = HUB_ITEM(PM_LEVER_HEADINGS.legacyLifestyle, ["- Sleep regularity supports recovery."]);
  const { content, changed } = transformPmSection4Levers(input);
  assert.equal(changed, true);
  assert.match(content, /<strong>4\.3 Lifestyle Levers<\/strong>/);
  assert.doesNotMatch(content, /<strong>4\.2 Lifestyle Levers<\/strong>/);
});

test("dual panels reorder to optimisation before lifestyle", () => {
  const input = `${HUB_ITEM(PM_LEVER_HEADINGS.legacyLifestyle, ["- Stable sleep helps."])}


${HUB_ITEM(PM_LEVER_HEADINGS.legacyOptimisation, ["- Gentle cooking preserves fats."])}`;
  const { content } = transformPmSection4Levers(input);
  const optIndex = content.indexOf("<strong>4.2 System Optimisation Practices</strong>");
  const lifeIndex = content.indexOf("<strong>4.3 Lifestyle Levers</strong>");
  assert.ok(optIndex >= 0);
  assert.ok(lifeIndex > optIndex);
});

test("PM6 merges weekly oily-fish into optimisation and removes lifestyle panel", () => {
  const input = `${HUB_ITEM(PM_LEVER_HEADINGS.legacyLifestyle, [
    "- Repeated weekly oily-fish or phospholipid-DHA intake matters more than isolated high-dose episodes for membrane incorporation.",
  ])}


${HUB_ITEM(PM_LEVER_HEADINGS.legacyOptimisation, [
    "- Gentle cooking of marine-fat sources helps limit oxidative degradation of PUFA-rich meal matrices.",
  ])}`;
  const { content } = transformPmSection4Levers(input, { pmId: PM6_ID });
  const opt = extractHubItemBlock(content, PM_LEVER_HEADINGS.optimisation);
  assert.ok(opt);
  const bullets = extractHubPanelBullets(opt.block);
  assert.equal(bullets.length, 2);
  assert.match(bullets.join("\n"), /Repeated weekly oily-fish/);
  assert.match(bullets.join("\n"), /Gentle cooking/);
  assert.equal(extractHubItemBlock(content, PM_LEVER_HEADINGS.lifestyle), null);
});

test("live PM6 page is canonical after transform", async () => {
  const raw = await readFile(PM6_PATH, "utf8");
  const { content: body } = matter(raw);
  const { content } = transformPmSection4Levers(body, { pmId: PM6_ID });
  assertCanonicalPmSection4(content);
  assert.match(content, /<strong>4\.2 System Optimisation Practices<\/strong>/);
  assert.doesNotMatch(content, /<strong>4\.3 Lifestyle Levers<\/strong>/);
});

test("BRS3 PM5 moves frequency bullet to optimisation and drops empty lifestyle panel", () => {
  const input = `${HUB_ITEM(PM_LEVER_HEADINGS.optimisation, [
    "- Gentle cooking and lower frying load reduce oxidative stress on membrane-lipid protection.",
  ])}


${HUB_ITEM(PM_LEVER_HEADINGS.lifestyle, [
    "- Repeated weekly antioxidant pairing with dietary fats matters more than isolated high-dose episodes.",
  ])}`;
  const { content } = reclassifyLifestyleOptimisationBullets(input);
  const opt = extractHubItemBlock(content, PM_LEVER_HEADINGS.optimisation);
  assert.ok(opt);
  assert.match(extractHubPanelBullets(opt.block).join("\n"), /Repeated weekly antioxidant pairing/);
  assert.equal(extractHubItemBlock(content, PM_LEVER_HEADINGS.lifestyle), null);
});

test("BRS3 PM4 keeps smoke/sleep exposure in lifestyle and moves dietary patterning", () => {
  const input = `${HUB_ITEM(PM_LEVER_HEADINGS.optimisation, ["- Prefer gentler cooking."])}


${HUB_ITEM(PM_LEVER_HEADINGS.lifestyle, [
    "- Exposure reduction matters: smoke, pollution, alcohol excess, and sleep disruption can all add oxidative burden alongside dietary sources.",
    "- Consistent daily patterning is more relevant than occasional high-antioxidant meals.",
  ])}`;
  const { content } = reclassifyLifestyleOptimisationBullets(input);
  const life = extractHubItemBlock(content, PM_LEVER_HEADINGS.lifestyle);
  const opt = extractHubItemBlock(content, PM_LEVER_HEADINGS.optimisation);
  assert.match(extractHubPanelBullets(life.block).join("\n"), /Exposure reduction matters/);
  assert.match(extractHubPanelBullets(opt.block).join("\n"), /Consistent daily patterning/);
});

test("lifestyle-only page creates optimisation panel when needed", () => {
  const input = HUB_ITEM(PM_LEVER_HEADINGS.lifestyle, [
    "- Repeated dietary pattern quality matters more than isolated amino-acid emphasis.",
    "- Sleep, stress, and meal irregularity may indirectly worsen gut-side precursor context.",
  ]);
  const { content } = reclassifyLifestyleOptimisationBullets(input);
  const optIndex = content.indexOf("<strong>4.2 System Optimisation Practices</strong>");
  const lifeIndex = content.indexOf("<strong>4.3 Lifestyle Levers</strong>");
  assert.ok(optIndex >= 0 && optIndex < lifeIndex);
  assert.match(
    extractHubPanelBullets(extractHubItemBlock(content, PM_LEVER_HEADINGS.optimisation).block).join(
      "\n",
    ),
    /Repeated dietary pattern quality/,
  );
});

test("enforcePmSection4LeverOrder fixes legacy labels and panel order", () => {
  const input = `${HUB_ITEM(PM_LEVER_HEADINGS.legacyLifestyle, ["- Stable sleep helps."])}


${HUB_ITEM(PM_LEVER_HEADINGS.legacyOptimisation, ["- Gentle cooking preserves fats."])}`;
  const { content } = enforcePmSection4LeverOrder(input);
  const optIndex = content.indexOf("<strong>4.2 System Optimisation Practices</strong>");
  const lifeIndex = content.indexOf("<strong>4.3 Lifestyle Levers</strong>");
  assert.ok(optIndex >= 0 && lifeIndex > optIndex);
  assert.equal(validatePmSection4Contract(content).length, 0);
});

test("hoistOptimisationToTopLevel moves §4.2 out of §4.1 Dietary panel", () => {
  const dietaryInner = [
    HUB_ITEM("4.1.1 Direct Dietary Levers", ["- Magnesium ← leafy greens"]),
    HUB_ITEM(PM_LEVER_HEADINGS.optimisation, ["- Gentle cooking preserves fats."]),
    HUB_ITEM("4.1.2 Cofactors and Supporting Inputs", ["- B6, magnesium"]),
  ].join("\n\n\n");
  const input = `## 4. Levers

### Intervention Profile

**Intervention Dominance:** Diet-Supported

${HUB_ITEM("4.1 Dietary Levers", dietaryInner)}


${HUB_ITEM(PM_LEVER_HEADINGS.lifestyle, ["- Sleep regularity supports recovery."])}`;
  const { content, changed } = enforcePmSection4LeverOrder(input);
  assert.equal(changed, true);
  assert.equal(validatePmSection4Contract(content).length, 0);

  const dietary = extractHubItemBlock(content, "4.1 Dietary Levers");
  const optimisation = extractHubItemBlock(content, PM_LEVER_HEADINGS.optimisation);
  assert.ok(dietary);
  assert.ok(optimisation);
  assert.ok(optimisation.index > dietary.index + dietary.block.length - 1);
  assert.doesNotMatch(dietary.block, /<strong>4\.2 System Optimisation Practices<\/strong>/);

  const dietIdx = content.indexOf("<strong>4.1 Dietary Levers</strong>");
  const optIdx = content.indexOf("<strong>4.2 System Optimisation Practices</strong>");
  const lifeIdx = content.indexOf("<strong>4.3 Lifestyle Levers</strong>");
  assert.ok(dietIdx < optIdx && optIdx < lifeIdx);
});

function walkMechanismFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkMechanismFiles(full));
    else if (entry.isFile() && /-(pm|sm).*\.mdx$/i.test(entry.name)) out.push(full);
  }
  return out;
}

test("all PM/SM docs satisfy §4 lever contract", () => {
  const failures = [];
  for (const filePath of walkMechanismFiles(DOCS)) {
    const { content } = matter(fs.readFileSync(filePath, "utf8"));
    const rel = path.relative(DOCS, filePath);
    failures.push(...validatePmSection4Contract(content, { fileLabel: rel }));
  }
  assert.deepEqual(failures, []);
});

test("populate adds preparation links for ROS PM from dietary foods", () => {
  const input = `${HUB_ITEM("4.1.1 Direct Dietary Levers", [
    "- Lower-oxidative-load cooking patterns ← steaming, boiling, poaching",
    "- Fresh, stable fat sources ← extra-virgin olive oil, salmon",
  ])}


${HUB_ITEM(PM_LEVER_HEADINGS.lifestyle, [
  "- Exposure reduction matters: smoke, pollution, and sleep disruption can add oxidative burden.",
])}`;
  const foodIndex = buildFoodContextIndex(path.join(__dirname, ".."));
  const { content } = populatePmOptimisationLevers(input, {
    foodIndex,
    pmId: "BRS3-FM2-PM4",
    fileSlug: "brs3-fm2-pm4-ros-generation-vs-clearance-balance",
  });
  const opt = extractHubItemBlock(content, PM_LEVER_HEADINGS.optimisation);
  assert.ok(opt);
  const bullets = extractHubPanelBullets(opt.block).join("\n");
  assert.match(bullets, /#preparation/);
  assert.doesNotMatch(bullets, /Exposure reduction matters/);
});

test("irrelevant copied food prep notes are excluded from optimisation", () => {
  assert.equal(
    isIrrelevantFoodPrepBullet(
      "- Higher taurine than white meat — see [Dark-Meat Poultry — Preparation](/docs/foods/dark-meat-poultry#preparation).",
    ),
    true,
  );
  assert.equal(
    isIrrelevantFoodPrepBullet(
      "- Gentle cooking of marine-fat sources helps limit oxidative degradation — see [Salmon — Preparation](/docs/foods/salmon#preparation).",
    ),
    false,
  );
});

test("populate strips irrelevant food prep bullets from existing optimisation panel", () => {
  const input = HUB_ITEM(PM_LEVER_HEADINGS.optimisation, [
    "- Stable daily meal structure may help maintain substrate continuity.",
    "- Higher taurine than white meat — see [Dark-Meat Poultry — Preparation](/docs/foods/dark-meat-poultry#preparation).",
    "- Cook mussels thoroughly—for example by steaming until all shells have opened and discarding any t… — see [Mussels — Preparation](/docs/foods/mussels#preparation).",
    "- **Grate or slice** for controlled portions; melting in sauces changes texture, not the basic nutr… — see [Cheddar Cheese — Preparation](/docs/foods/cheddar-cheese#preparation).",
    "- Pair iron-containing foods with vitamin C and meal-context enhancers to support absorption — see [Lentils — Synergies](/docs/foods/lentils#synergies).",
  ]);
  const { content, changed } = populatePmOptimisationLevers(input, {
    pmId: "BRS4-FM1-PM1",
    fileSlug: "brs4-fm1-pm1-electron-transport-chain-function",
  });
  assert.equal(changed, true);
  const bullets = extractHubPanelBullets(
    extractHubItemBlock(content, PM_LEVER_HEADINGS.optimisation).block,
  ).join("\n");
  assert.doesNotMatch(bullets, /Higher taurine/);
  assert.doesNotMatch(bullets, /Cook mussels thoroughly/);
  assert.doesNotMatch(bullets, /Grate or slice/);
  assert.match(bullets, /Stable daily meal structure/);
  assert.match(bullets, /Pair iron-containing foods/);
});
