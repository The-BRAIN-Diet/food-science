#!/usr/bin/env node
/**
 * Patch BRS hub pages: Dietary and Lifestyle Levers section title + intro;
 * refresh Optimisation Levers panels from curated data.
 * @see scripts/data/brs-hub-levers-intro.mjs
 */
import fs from "node:fs";
import path from "node:path";
import {
  HUB_LEVERS_SECTION_INTRO,
  HUB_LEVERS_SECTION_TITLE,
} from "./data/brs-hub-levers-intro.mjs";
import { HUB_PAGES } from "./lib/brs-hub-levers.mjs";
import { renderOptimisationLeversPanelHtml } from "./lib/brs-hub-optimisation-render.mjs";

const ROOT = process.cwd();

function renderSectionIntroBlock(brsId) {
  const intro =
    HUB_LEVERS_SECTION_INTRO[brsId] ||
    "Dietary patterns, food handling and behavioural levers shape how effectively this Biological Regulatory System can operate under daily demand.";
  return `## ${HUB_LEVERS_SECTION_TITLE}

<p class="brs-hub-levers-intro">${intro.replace(/</g, "&lt;")}</p>`;
}

function patchSectionIntro(content, brsId) {
  const block = renderSectionIntroBlock(brsId);
  const existingRe =
    /## Dietary and Lifestyle Levers\n\n<p class="brs-hub-levers-intro">[\s\S]*?<\/p>\n\n<!-- brs-hub-levers:start -->/;
  if (existingRe.test(content)) {
    return content.replace(existingRe, `${block}\n\n<!-- brs-hub-levers:start -->`);
  }
  const insertAfterTa =
    /(<!-- brs-hub-ta-research:end -->)\n\n<!-- brs-hub-levers:start -->/;
  if (insertAfterTa.test(content)) {
    return content.replace(insertAfterTa, `$1\n\n${block}\n\n<!-- brs-hub-levers:start -->`);
  }
  const insertRe = /(## Ambition\n\n[^\n#][\s\S]*?)\n\n<!-- brs-hub-levers:start -->/;
  if (!insertRe.test(content)) {
    throw new Error(`${brsId}: could not find insertion point before brs-hub-levers markers`);
  }
  return content.replace(insertRe, `$1\n\n${block}\n\n<!-- brs-hub-levers:start -->`);
}

function patchDietaryGuidanceLabel(content) {
  return content.replace(/<strong>Dietary Priorities<\/strong>/g, "<strong>Dietary Guidance</strong>");
}

function patchOptimisationPanel(content, brsId, rootDir) {
  const panelHtml = renderOptimisationLeversPanelHtml(brsId, rootDir);
  const panelRe =
    /(<strong>Optimisation Levers<\/strong>\s*<\/button>\s*<div class="brs-fm-hub-panel" hidden>\s*\n)([\s\S]*?)(\n\s*<\/div>\s*<\/div>\s*<\/div>\s*\n\n<div class="brs-fm-hub-item" data-brs-fm-hub>[\s\S]*?<strong>Lifestyle Priorities<\/strong>)/;
  if (!panelRe.test(content)) {
    console.warn(`${brsId}: Optimisation Levers panel not found — skipped`);
    return content;
  }
  return content.replace(panelRe, `$1\n${panelHtml}\n$3`);
}

/** Remove lifestyle items moved to Optimisation Levers (BRS3). */
function dedupeBrs3Lifestyle(content) {
  return content.replace(
    /<li class="brs-hub-lifestyle-priority"><p class="brs-hub-lifestyle-text"><strong>Choose gentler cooking and limit heavily fried or oxidised fats<\/strong>[\s\S]*?<\/li>\n?/g,
    "",
  ).replace(
    /<li class="brs-hub-lifestyle-priority"><p class="brs-hub-lifestyle-text"><strong>Limit ultra-processed food exposure<\/strong>[\s\S]*?<\/li>\n?/g,
    "",
  );
}

let patched = 0;
for (const [brsId, hubPath] of Object.entries(HUB_PAGES)) {
  const full = path.join(ROOT, hubPath);
  let content = fs.readFileSync(full, "utf8");
  const before = content;
  content = patchSectionIntro(content, brsId);
  content = patchDietaryGuidanceLabel(content);
  content = patchOptimisationPanel(content, brsId, ROOT);
  if (brsId === "BRS3") content = dedupeBrs3Lifestyle(content);
  if (content === before) {
    console.warn(`No change: ${hubPath}`);
    continue;
  }
  fs.writeFileSync(full, content);
  patched++;
  console.log(`${brsId}: patched ${hubPath}`);
}

console.log(`\nPatched ${patched} hub page(s)`);
