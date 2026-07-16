/**
 * Safe, surgical patches for migrated BRS hub Dietary and Lifestyle Levers sections.
 * @see scripts/patch-brs-hub-levers-section.mjs
 */
import {
  HUB_LEVERS_SECTION_INTRO,
  HUB_LEVERS_SECTION_TITLE,
} from "../data/brs-hub-levers-intro.mjs";
import { renderOptimisationLeversPanelHtml } from "./brs-hub-optimisation-render.mjs";

function renderSectionIntroBlock(brsId) {
  const intro =
    HUB_LEVERS_SECTION_INTRO[brsId] ||
    "Dietary patterns, food handling and behavioural levers shape how effectively this Biological Regulatory System can operate under daily demand.";
  return `## ${HUB_LEVERS_SECTION_TITLE}

<p class="brs-hub-levers-intro">${intro.replace(/</g, "&lt;")}</p>`;
}

export function patchSectionIntro(content, brsId) {
  // Migrated hubs already use manually authored two-paragraph intros — do not overwrite.
  if (
    /## Dietary and Lifestyle Levers\n\n<p class="brs-hub-levers-intro">[\s\S]*?<p class="brs-hub-levers-intro">/.test(
      content,
    )
  ) {
    return content;
  }
  if (
    /## Dietary and Lifestyle Levers\n\n<p class="brs-hub-levers-intro">[\s\S]*?<\/p>\n\n<!-- brs-hub-levers:start -->/.test(
      content,
    ) &&
    (content.match(/brs-hub-levers-intro/g) || []).length >= 1
  ) {
    // Leave single or multi intro blocks alone once Dietary Guidance architecture is present.
    if (/<!-- brs-hub-levers:start -->[\s\S]*?<strong>Dietary Guidance<\/strong>/.test(content)) {
      return content;
    }
  }
  const block = renderSectionIntroBlock(brsId);
  const existingRe =
    /## Dietary and Lifestyle Levers\n\n<p class="brs-hub-levers-intro">[\s\S]*?<\/p>\n\n<!-- brs-hub-levers:start -->/;
  if (existingRe.test(content)) {
    return content.replace(existingRe, `${block}\n\n<!-- brs-hub-levers:start -->`);
  }
  const insertAfterKc =
    /(<!-- brs-hub-key-constraints:end -->)\n\n<!-- brs-hub-levers:start -->/;
  if (insertAfterKc.test(content)) {
    return content.replace(insertAfterKc, `$1\n\n${block}\n\n<!-- brs-hub-levers:start -->`);
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

export function patchDietaryGuidanceLabel(content) {
  return content.replace(
    /<strong>Dietary Priorities<\/strong>/g,
    "<strong>Dietary Guidance</strong>",
  );
}

export function patchOptimisationPanel(content, brsId, rootDir) {
  const panelHtml = renderOptimisationLeversPanelHtml(brsId, rootDir);
  const panelRe =
    /(<strong>System Optimisation Practices<\/strong>\s*<\/button>\s*<div class="brs-fm-hub-panel" hidden>\s*\n)([\s\S]*?)(\n\s*<\/div>\s*<\/div>\s*<\/div>\s*\n\n<div class="brs-fm-hub-item" data-brs-fm-hub>[\s\S]*?<strong>Lifestyle Priorities<\/strong>)/;
  if (!panelRe.test(content)) {
    return content;
  }
  return content.replace(panelRe, `$1${panelHtml}$3`);
}

/** Remove lifestyle items moved to System Optimisation Practices (BRS3). */
export function dedupeBrs3Lifestyle(content) {
  return content
    .replace(
      /<li class="brs-hub-lifestyle-priority"><p class="brs-hub-lifestyle-text"><strong>Choose gentler cooking and limit heavily fried or oxidised fats<\/strong>[\s\S]*?<\/li>\n?/g,
      "",
    )
    .replace(
      /<li class="brs-hub-lifestyle-priority"><p class="brs-hub-lifestyle-text"><strong>Limit ultra-processed food exposure<\/strong>[\s\S]*?<\/li>\n?/g,
      "",
    );
}

/**
 * Apply all approved maintenance patches without touching Dietary Guidance body content.
 * @param {string} content
 * @param {string} brsId
 * @param {string} [rootDir]
 */
export function patchHubLeversSectionContent(content, brsId, rootDir = process.cwd()) {
  let next = patchSectionIntro(content, brsId);
  next = patchDietaryGuidanceLabel(next);
  next = patchOptimisationPanel(next, brsId, rootDir);
  if (brsId === "BRS3") next = dedupeBrs3Lifestyle(next);
  return next;
}
