#!/usr/bin/env node
/**
 * Wrap BRS hub ADHD implication dropdowns in a Therapeutic Area Research section.
 * @see system/brs-hub-levers-schema.md
 */
import fs from "node:fs";
import path from "node:path";
import { renderTaResearchIntroHtml } from "./data/brs-hub-ta-research-intro.mjs";

export const TA_MARKERS = {
  start: "<!-- brs-hub-ta-research:start -->",
  end: "<!-- brs-hub-ta-research:end -->",
};

const TA_HUB_PAGES = [
  "docs/biological-targets/neurotransmitter-regulation.md",
  "docs/biological-targets/methylation-one-carbon-metabolism.md",
  "docs/biological-targets/inflammation-oxidative-stress.md",
  "docs/biological-targets/mitochondrial-function-bioenergetics.md",
  "docs/biological-targets/gut-brain-axis-enteric-nervous-system.md",
  "docs/biological-targets/metabolic-neuroendocrine-stress.md",
];

const ADHD_AFTER_AMBITION_RE =
  /(## Ambition\n\n[^\n#][\s\S]*?)\n\n(\s*<div class="brs-fm-hub-item" data-brs-fm-hub>[\s\S]*?<strong>ADHD:[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)/;

const TA_SECTION = (adhdBlock) => `## Therapeutic Area Research

${renderTaResearchIntroHtml()}

${TA_MARKERS.start}
<div class="brs-hub-ta-research">

${adhdBlock.trim()}

</div>
${TA_MARKERS.end}`;

export function patchTaResearchSection(content) {
  if (content.includes(TA_MARKERS.start)) {
    return content.replace(
      new RegExp(
        `## Therapeutic Area Research\\n\\n(?:<p class="brs-hub-ta-research-intro">[\\s\\S]*?<\\/p>\\n\\n)?${TA_MARKERS.start.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${TA_MARKERS.end.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
      ),
      (match) => {
        const inner = match.match(
          new RegExp(`${TA_MARKERS.start}[\\s\\S]*?${TA_MARKERS.end}`),
        )?.[0];
        if (!inner) return match;
        const adhd = inner
          .replace(TA_MARKERS.start, "")
          .replace(TA_MARKERS.end, "")
          .replace(/^<div class="brs-hub-ta-research">\n\n?/, "")
          .replace(/\n<\/div>\s*$/, "")
          .trim();
        return TA_SECTION(adhd);
      },
    );
  }

  if (!ADHD_AFTER_AMBITION_RE.test(content)) {
    return null;
  }

  return content.replace(
    ADHD_AFTER_AMBITION_RE,
    `$1\n\n${TA_SECTION("$2")}`,
  );
}

const ROOT = process.cwd();
let patched = 0;

for (const rel of TA_HUB_PAGES) {
  const full = path.join(ROOT, rel);
  const content = fs.readFileSync(full, "utf8");
  const next = patchTaResearchSection(content);
  if (!next) {
    console.warn(`Skip ${rel}: ADHD block not found`);
    continue;
  }
  fs.writeFileSync(full, next);
  patched++;
  console.log(`Patched ${rel}`);
}

console.log(`\nDone: ${patched} hub pages`);
