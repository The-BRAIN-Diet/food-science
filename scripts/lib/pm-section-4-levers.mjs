/**
 * PM §4 lever panel transforms — canonical order:
 * 4.1 Dietary → 4.2 System Optimisation Practices → 4.3 Lifestyle
 */

export const PM6_ID = "BRS1-FM3-PM6";

export const PM_LEVER_HEADINGS = {
  optimisation: "4.2 System Optimisation Practices",
  lifestyle: "4.3 Lifestyle Levers",
  legacyLifestyle: "4.2 Lifestyle Levers",
  legacyOptimisation: "4.3 Optimisation Levers",
};

/** PM §4.2 covers Food Preparation & Delivery only; other SOP categories live on the BRS hub. */
export const PM_SOP_SCOPE_EXPLAINER =
  '<p class="brs-pm-sop-scope"><strong>1. Food Preparation &amp; Delivery ONLY</strong></p>';

export const PM_SOP_SCOPE_CLASS = "brs-pm-sop-scope";


function escapeRe(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const HUB_ITEM_OPEN = '<div class="brs-fm-hub-item" data-brs-fm-hub>';
const DIV_OPEN = "<div";
const DIV_CLOSE = "</div>";
const HUB_PANEL_OPEN = '<div class="brs-fm-hub-panel" hidden>';

function findBalancedDivEnd(content, startIdx) {
  let depth = 1;
  let pos = startIdx + DIV_OPEN.length;

  while (pos < content.length && depth > 0) {
    const nextOpen = content.indexOf(DIV_OPEN, pos);
    const nextClose = content.indexOf(DIV_CLOSE, pos);
    if (nextClose === -1) return -1;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      pos = nextOpen + DIV_OPEN.length;
    } else {
      depth -= 1;
      pos = nextClose + DIV_CLOSE.length;
    }
  }

  return depth === 0 ? pos : -1;
}

export function extractHubItemBlock(content, heading) {
  const escaped = escapeRe(heading);
  const headingRe = new RegExp(`<strong>${escaped}</strong>`);

  let searchFrom = 0;
  while (searchFrom < content.length) {
    const slice = content.slice(searchFrom);
    const headingMatch = slice.match(headingRe);
    if (!headingMatch) break;

    const headingIdx = searchFrom + headingMatch.index;
    const openIdx = content.lastIndexOf(HUB_ITEM_OPEN, headingIdx);
    if (openIdx === -1) {
      searchFrom = headingIdx + 1;
      continue;
    }

    const endIdx = findBalancedDivEnd(content, openIdx);
    if (endIdx === -1) {
      searchFrom = headingIdx + 1;
      continue;
    }

    const block = content.slice(openIdx, endIdx);
    const panelIdx = block.indexOf(HUB_PANEL_OPEN);
    const summaryArea = panelIdx === -1 ? block : block.slice(0, panelIdx);
    if (!headingRe.test(summaryArea)) {
      searchFrom = headingIdx + 1;
      continue;
    }

    return { block, index: openIdx };
  }

  return null;
}

export function extractHubPanelBullets(block) {
  const panelIdx = block.indexOf(HUB_PANEL_OPEN);
  if (panelIdx === -1) return [];
  const contentStart = panelIdx + HUB_PANEL_OPEN.length;
  const panelEnd = findBalancedDivEnd(block, panelIdx);
  if (panelEnd === -1) return [];
  const innerEnd = panelEnd - DIV_CLOSE.length;
  const inner = block.slice(contentStart, innerEnd).trim();
  return inner
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "));
}

export function setHubPanelBullets(block, bullets) {
  const body = bullets.length
    ? `\n\n${PM_SOP_SCOPE_EXPLAINER}\n\n${bullets.join("\n")}\n\n`
    : `\n\n${PM_SOP_SCOPE_EXPLAINER}\n\n`;
  const panelIdx = block.indexOf(HUB_PANEL_OPEN);
  if (panelIdx === -1) return block;
  const panelEnd = findBalancedDivEnd(block, panelIdx);
  if (panelEnd === -1) return block;
  const contentStart = panelIdx + HUB_PANEL_OPEN.length;
  const after = block.slice(panelEnd - DIV_CLOSE.length);
  return `${block.slice(0, contentStart)}${body}${after}`;
}

function renameHubItemHeading(block, heading) {
  return block.replace(/<strong>[^<]+<\/strong>/, `<strong>${heading}</strong>`);
}

function removeBlocks(content, blocks) {
  let out = content;
  for (const entry of [...blocks].sort((a, b) => b.index - a.index)) {
    out = out.slice(0, entry.index) + out.slice(entry.index + entry.block.length);
  }
  return out;
}

function insertAt(content, index, insertion) {
  if (!insertion) return content;
  return content.slice(0, index) + insertion + content.slice(index);
}

function isPm6OptimisationMergeBullet(bullet) {
  return /repeated weekly oily-fish|phospholipid-dha intake/i.test(bullet);
}

function buildHubOptimisationBlock(optimisationEntry, lifestyleEntry, { pmId } = {}) {
  if (!optimisationEntry) return null;
  let block = optimisationEntry.block;
  let bullets = extractHubPanelBullets(block);

  if (pmId === PM6_ID && lifestyleEntry) {
    for (const bullet of extractHubPanelBullets(lifestyleEntry.block)) {
      if (isPm6OptimisationMergeBullet(bullet) && !bullets.includes(bullet)) {
        bullets.push(bullet);
      }
    }
  }

  block = renameHubItemHeading(block, PM_LEVER_HEADINGS.optimisation);
  block = setHubPanelBullets(block, bullets);
  return block;
}

function buildHubLifestyleBlock(lifestyleEntry, { pmId } = {}) {
  if (!lifestyleEntry) return null;
  if (pmId === PM6_ID) return null;

  let block = renameHubItemHeading(lifestyleEntry.block, PM_LEVER_HEADINGS.lifestyle);
  return block;
}

function transformHubLeverPanels(content, { pmId } = {}) {
  const lifestyleEntry = extractHubItemBlock(content, PM_LEVER_HEADINGS.legacyLifestyle);
  const optimisationEntry = extractHubItemBlock(content, PM_LEVER_HEADINGS.legacyOptimisation);

  if (!lifestyleEntry && !optimisationEntry) {
    return { content, changed: false };
  }

  if (lifestyleEntry && !optimisationEntry) {
    const renamed = renameHubItemHeading(
      lifestyleEntry.block,
      PM_LEVER_HEADINGS.lifestyle,
    );
    return {
      content: content.replace(lifestyleEntry.block, renamed),
      changed: true,
    };
  }

  const insertAtIndex = Math.min(
    lifestyleEntry?.index ?? Number.POSITIVE_INFINITY,
    optimisationEntry?.index ?? Number.POSITIVE_INFINITY,
  );

  const newOptimisation = buildHubOptimisationBlock(optimisationEntry, lifestyleEntry, {
    pmId,
  });
  const newLifestyle = buildHubLifestyleBlock(lifestyleEntry, { pmId });
  const insertion = [newOptimisation, newLifestyle].filter(Boolean).join("\n\n\n");

  let out = removeBlocks(content, [lifestyleEntry, optimisationEntry].filter(Boolean));
  const adjustedIndex = Math.min(insertAtIndex, out.length);
  out = insertAt(out, adjustedIndex, insertion);

  return { content: out, changed: true };
}

function extractDetailsBlock(content, heading) {
  const escaped = escapeRe(heading);
  const re = new RegExp(
    `<details>\\s*<summary><strong>${escaped}</strong></summary>[\\s\\S]*?<\\/details>`,
  );
  const match = content.match(re);
  if (!match) return null;
  return { block: match[0], index: match.index };
}

function renameDetailsHeading(block, heading) {
  return block.replace(
    /<summary><strong>[^<]+<\/strong><\/summary>/,
    `<summary><strong>${heading}</strong></summary>`,
  );
}

function transformDetailsLeverPanels(content, { pmId } = {}) {
  const lifestyleEntry = extractDetailsBlock(content, PM_LEVER_HEADINGS.legacyLifestyle);
  const optimisationEntry = extractDetailsBlock(content, PM_LEVER_HEADINGS.legacyOptimisation);

  if (!lifestyleEntry && !optimisationEntry) {
    return { content, changed: false };
  }

  if (lifestyleEntry && !optimisationEntry) {
    const renamed = renameDetailsHeading(lifestyleEntry.block, PM_LEVER_HEADINGS.lifestyle);
    return {
      content: content.replace(lifestyleEntry.block, renamed),
      changed: true,
    };
  }

  const insertAtIndex = Math.min(
    lifestyleEntry?.index ?? Number.POSITIVE_INFINITY,
    optimisationEntry?.index ?? Number.POSITIVE_INFINITY,
  );

  let optimisationBlock = renameDetailsHeading(
    optimisationEntry.block,
    PM_LEVER_HEADINGS.optimisation,
  );
  let lifestyleBlock = lifestyleEntry
    ? renameDetailsHeading(lifestyleEntry.block, PM_LEVER_HEADINGS.lifestyle)
    : null;

  if (pmId === PM6_ID) {
    lifestyleBlock = null;
  }

  const insertion = [optimisationBlock, lifestyleBlock].filter(Boolean).join("\n\n");
  let out = removeBlocks(content, [lifestyleEntry, optimisationEntry].filter(Boolean));
  out = insertAt(out, Math.min(insertAtIndex, out.length), insertion);

  return { content: out, changed: true };
}

export function transformPmSection4Levers(content, { pmId } = {}) {
  let out = content;
  let changed = false;

  const hub = transformHubLeverPanels(out, { pmId });
  out = hub.content;
  changed = changed || hub.changed;

  const details = transformDetailsLeverPanels(out, { pmId });
  out = details.content;
  changed = changed || details.changed;

  return { content: out, changed };
}

export function assertCanonicalPmSection4(content) {
  if (content.includes(`<strong>${PM_LEVER_HEADINGS.legacyLifestyle}</strong>`)) {
    throw new Error(`legacy heading still present: ${PM_LEVER_HEADINGS.legacyLifestyle}`);
  }
  if (content.includes(`<strong>${PM_LEVER_HEADINGS.legacyOptimisation}</strong>`)) {
    throw new Error(`legacy heading still present: ${PM_LEVER_HEADINGS.legacyOptimisation}`);
  }
}

/** Dietary delivery / frequency / pattern bullets mis-filed under §4.3 Lifestyle. */
const MOVE_TO_OPTIMISATION_PATTERNS = [
  /\brepeated (weekly|daily)\b/i,
  /\bmatters more than isolated\b/i,
  /\bmatters more than (one-off|sporadic|occasional|short-term|intermittent)\b/i,
  /\bmatters more than\b.*\b(bolus|high-dose|supplement|episodes|bursts|attempts|additions|emphasis|use|ideas|meals|framing|reset|dosing)\b/i,
  /\bmore relevant than\b.*\b(sporadic|one-off|occasional|isolated)\b/i,
  /\brepeated (dietary )?pattern\b/i,
  /\brepeated exposure\b/i,
  /\brepeated daily\b/i,
  /\bsustained pattern quality\b/i,
  /\bconsistent (daily )?patterning\b/i,
  /\bstable daily dietary patterning\b/i,
  /\bregular meal timing\b/i,
  /\bconsistent daily meal timing\b/i,
  /\bstable daily meal structure\b/i,
  /\bdistributed protein intake\b/i,
  /\bcomplementary plant-protein pairing\b/i,
  /\bprotein-rich mixed meals\b/i,
  /\bultra-processed food exposure\b/i,
  /\breducing ultra-processed\b/i,
  /\bwhole-food antioxidant coverage\b/i,
  /\bpairing with dietary fats\b/i,
  /\binclusion of crucifer\b/i,
  /\bmarine-fat exposure matters more\b/i,
  /\bmeal regularity may\b/i,
  /\bconsistent meal timing may\b/i,
  /\blow-variety eating\b/i,
  /\blower alcohol and ultra-processed\b/i,
  /\bstructured time-restricted eating\b/i,
  /\bvaried whole-food meals\b/i,
  /\bfermentation continuity\b/i,
  /\bgentler cooking\b/i,
  /\bgentle cooking\b/i,
  /\bdaily pattern (quality|consistency) matters more\b/i,
  /\bdaily pattern quality matters more\b/i,
  /\bpattern quality matters more\b/i,
  /\bpattern consistency matters more\b/i,
  /\bsufficient protein at main meals\b/i,
  /\bstructured ketogenic\b/i,
];

/** Non-dietary behaviours and circadian / recovery levers — stay in §4.3. */
const KEEP_IN_LIFESTYLE_PATTERNS = [
  /\b(sleep|exercis|physical activity|aerobic activity|resistance training|breathwork|meditation|vagal|mindfulness|overtraining)\b/i,
  /\b(light exposure|artificial light|bed and wake|circadian phase|circadian alignment)\b/i,
  /\b(smoke|pollution|sympathetic|parasympathetic|hrv|stimulant load|visceral adiposity)\b/i,
  /\b(stress regulation|stress-load|stress overload|stress downshifting|stress-eating)\b/i,
  /\b(recovery walks|post-meal walking|post-meal walk)\b/i,
  /\bsleep disruption\b/i,
  /\bpoor sleep\b/i,
  /\bacute stress\b/i,
  /\bhighly erratic eating\b/i,
  /\bresponder variability\b/i,
  /\brelevance is highest in high-demand\b/i,
  /\bcontext matters more than universal\b/i,
  /\bexposure reduction matters:\b/i,
  /\blower (smoke|pollution)\b/i,
  /\blower ongoing oxidative exposure\b/i,
  /\blower overall toxic and oxidative burden\b/i,
  /\blower inflammatory load from broader diet and lifestyle context\b/i,
  /\bprioritise adequate sleep\b/i,
  /\btraining to raise energy demand\b/i,
  /\binclude regular aerobic\b/i,
  /\bmaintain healthy body composition\b/i,
];

export function classifyLifestyleBullet(bullet) {
  const keep = KEEP_IN_LIFESTYLE_PATTERNS.some((pattern) => pattern.test(bullet));
  const move = MOVE_TO_OPTIMISATION_PATTERNS.some((pattern) => pattern.test(bullet));

  if (move && !keep) return "optimisation";
  if (move && keep) {
    if (/\bcontext matters more than universal\b/i.test(bullet)) return "lifestyle";
    if (
      /\bmatters more than\b/i.test(bullet) &&
      /\b(repeated|pattern|dietary|weekly|daily|meal timing|whole-food|ultra-processed|fermentation|substrate|coverage|protein at main meals)\b/i.test(
        bullet,
      )
    ) {
      return "optimisation";
    }
    return "lifestyle";
  }
  return "lifestyle";
}

function createOptimisationHubBlock(bullets) {
  return `<div class="brs-fm-hub-item" data-brs-fm-hub>
<div class="brs-fm-hub-shell">
<button type="button" class="brs-fm-hub-summary" aria-expanded="false">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
<strong>${PM_LEVER_HEADINGS.optimisation}</strong>
</button>
<div class="brs-fm-hub-panel" hidden>

${PM_SOP_SCOPE_EXPLAINER}

${bullets.join("\n")}

</div>
</div>
</div>`;
}

export function reclassifyLifestyleOptimisationBullets(content) {
  const lifestyleEntry = extractHubItemBlock(content, PM_LEVER_HEADINGS.lifestyle);
  if (!lifestyleEntry) return { content, changed: false };

  const lifestyleBullets = extractHubPanelBullets(lifestyleEntry.block);
  const toOptimisation = [];
  const toLifestyle = [];

  for (const bullet of lifestyleBullets) {
    if (classifyLifestyleBullet(bullet) === "optimisation") {
      toOptimisation.push(bullet);
    } else {
      toLifestyle.push(bullet);
    }
  }

  if (!toOptimisation.length) return { content, changed: false };

  let out = content;
  const optimisationEntry = extractHubItemBlock(out, PM_LEVER_HEADINGS.optimisation);

  if (optimisationEntry) {
    const merged = [...extractHubPanelBullets(optimisationEntry.block)];
    for (const bullet of toOptimisation) {
      if (!merged.includes(bullet)) merged.push(bullet);
    }
    out = out.replace(
      optimisationEntry.block,
      setHubPanelBullets(optimisationEntry.block, merged),
    );
  } else {
    out = insertAt(out, lifestyleEntry.index, `${createOptimisationHubBlock(toOptimisation)}\n\n\n`);
  }

  const lifestyleAfter = extractHubItemBlock(out, PM_LEVER_HEADINGS.lifestyle);
  if (!lifestyleAfter) return { content: out, changed: true };

  if (!toLifestyle.length) {
    out = removeBlocks(out, [lifestyleAfter]);
  } else {
    out = out.replace(
      lifestyleAfter.block,
      setHubPanelBullets(lifestyleAfter.block, toLifestyle),
    );
  }

  return { content: out, changed: true };
}

function renameLegacyLeverHeadings(content) {
  let out = content;
  let changed = false;
  if (out.includes(`<strong>${PM_LEVER_HEADINGS.legacyLifestyle}</strong>`)) {
    out = out.replaceAll(
      `<strong>${PM_LEVER_HEADINGS.legacyLifestyle}</strong>`,
      `<strong>${PM_LEVER_HEADINGS.lifestyle}</strong>`,
    );
    changed = true;
  }
  if (out.includes(`<strong>${PM_LEVER_HEADINGS.legacyOptimisation}</strong>`)) {
    out = out.replaceAll(
      `<strong>${PM_LEVER_HEADINGS.legacyOptimisation}</strong>`,
      `<strong>${PM_LEVER_HEADINGS.optimisation}</strong>`,
    );
    changed = true;
  }
  return { content: out, changed };
}

const DIETARY_HEADING = "4.1 Dietary Levers";

function isOptimisationNestedInDietary(content) {
  const dietary = extractHubItemBlock(content, DIETARY_HEADING);
  const optimisation = extractHubItemBlock(content, PM_LEVER_HEADINGS.optimisation);
  if (!dietary || !optimisation) return false;
  const dietaryEnd = dietary.index + dietary.block.length;
  return optimisation.index >= dietary.index && optimisation.index + optimisation.block.length <= dietaryEnd;
}

/** Move §4.2 out of the §4.1 Dietary panel to a top-level sibling (schema: 4.1 → 4.2 → 4.3). */
export function hoistOptimisationToTopLevel(content) {
  if (!isOptimisationNestedInDietary(content)) return { content, changed: false };

  const dietary = extractHubItemBlock(content, DIETARY_HEADING);
  const optimisation = extractHubItemBlock(content, PM_LEVER_HEADINGS.optimisation);
  const cleanedDietaryBlock = dietary.block
    .replace(optimisation.block, "")
    .replace(/\n{4,}/g, "\n\n\n")
    .trimEnd();

  let out = content.replace(dietary.block, cleanedDietaryBlock);
  const dietaryAfter = extractHubItemBlock(out, DIETARY_HEADING);
  if (!dietaryAfter) return { content, changed: false };

  const insertAt = dietaryAfter.index + dietaryAfter.block.length;
  const insertion = `\n\n\n${optimisation.block}`;
  out = `${out.slice(0, insertAt)}${insertion}${out.slice(insertAt)}`;

  return { content: out, changed: true };
}

/** Ensure §4.2 Optimisation precedes §4.3 Lifestyle when both panels exist. */
export function enforcePmSection4LeverOrder(content) {
  let out = content;
  let changed = false;

  const renamed = renameLegacyLeverHeadings(out);
  out = renamed.content;
  changed = changed || renamed.changed;

  const hoisted = hoistOptimisationToTopLevel(out);
  out = hoisted.content;
  changed = changed || hoisted.changed;

  const optimisationEntry = extractHubItemBlock(out, PM_LEVER_HEADINGS.optimisation);
  const lifestyleEntry = extractHubItemBlock(out, PM_LEVER_HEADINGS.lifestyle);

  if (optimisationEntry && lifestyleEntry && lifestyleEntry.index < optimisationEntry.index) {
    const insertAtIndex = lifestyleEntry.index;
    out = removeBlocks(out, [optimisationEntry, lifestyleEntry]);
    const insertion = `${optimisationEntry.block}\n\n\n${lifestyleEntry.block}`;
    out = insertAt(out, Math.min(insertAtIndex, out.length), insertion);
    changed = true;
  }

  return { content: out, changed };
}

export function validatePmSection4Contract(content, { fileLabel = "page" } = {}) {
  const issues = [];
  if (content.includes(`<strong>${PM_LEVER_HEADINGS.legacyLifestyle}</strong>`)) {
    issues.push(`${fileLabel}: legacy heading ${PM_LEVER_HEADINGS.legacyLifestyle}`);
  }
  if (content.includes(`<strong>${PM_LEVER_HEADINGS.legacyOptimisation}</strong>`)) {
    issues.push(`${fileLabel}: legacy heading ${PM_LEVER_HEADINGS.legacyOptimisation}`);
  }

  const levers = content.match(/## 4\. Levers[\s\S]*?(?=\n## 5\.|\n## [2-9]\. Mechanistic)/);
  if (!levers) return issues;

  const block = levers[0];
  const optIndex = block.indexOf(`<strong>${PM_LEVER_HEADINGS.optimisation}</strong>`);
  const lifeIndex = block.indexOf(`<strong>${PM_LEVER_HEADINGS.lifestyle}</strong>`);
  if (optIndex >= 0 && lifeIndex >= 0 && lifeIndex < optIndex) {
    issues.push(`${fileLabel}: §4.3 Lifestyle appears before §4.2 Optimisation`);
  }
  if (isOptimisationNestedInDietary(block)) {
    issues.push(`${fileLabel}: §4.2 Optimisation must be a top-level lever, not nested inside §4.1 Dietary`);
  }
  return issues;
}
