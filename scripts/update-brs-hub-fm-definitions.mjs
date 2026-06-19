#!/usr/bin/env node
/**
 * Sync BRS hub ## Functional Mechanisms sections — one <details> dropdown per FM
 * with summary, PM/KC links, connected mechanisms, and modulation metadata.
 */

import fs from "node:fs";
import path from "node:path";
import {
  buildFunctionalMechanismsSection,
  listFmFilesForBrs,
  listFmFilesForBrsX,
} from "./lib/brs-hub-fm-section.mjs";

const BRS_BASE = path.join(process.cwd(), "docs/biological-targets");

const HUB_CONFIGS = [
  {
    file: "neurotransmitter-regulation.md",
    fmPaths: () => listFmFilesForBrs(1),
    replace: (content, section) =>
      content.replace(
        /## Functional Mechanisms[\s\S]*?\n---\n\n## Requirements/,
        `${section}---\n\n## Requirements`,
      ),
  },
  {
    file: "methylation-one-carbon-metabolism.md",
    fmPaths: () => listFmFilesForBrs(2),
    replace: (content, section) =>
      content.replace(
        /## Functional Mechanisms[\s\S]*?\n---\n\n## Requirements/,
        `${section}---\n\n## Requirements`,
      ),
  },
  {
    file: "inflammation-oxidative-stress.md",
    fmPaths: () => listFmFilesForBrs(3),
    replace: (content, section) =>
      content.replace(
        /## Functional Mechanisms[\s\S]*?\n---\n\n## Requirements/,
        `${section}---\n\n## Requirements`,
      ),
  },
  {
    file: "mitochondrial-function-bioenergetics.md",
    fmPaths: () => listFmFilesForBrs(4),
    replace: (content, section) =>
      content.replace(
        /## Functional Mechanisms[\s\S]*?\n---\n\n## Requirements/,
        `${section}---\n\n## Requirements`,
      ),
  },
  {
    file: "gut-brain-axis-enteric-nervous-system.md",
    fmPaths: () => listFmFilesForBrs(5),
    replace: (content, section) =>
      content.replace(
        /## Functional Mechanisms[\s\S]*?\n---\n\n## Requirements/,
        `${section}---\n\n## Requirements`,
      ),
  },
  {
    file: "metabolic-neuroendocrine-stress.md",
    fmPaths: () => listFmFilesForBrs(6),
    replace: (content, section) =>
      content.replace(
        /## Functional Mechanisms[\s\S]*?\n---\n\n## Requirements/,
        `${section}---\n\n## Requirements`,
      ),
  },
  {
    file: "brs-x/ecs/endocannabinoid-system.md",
    fmPaths: () => listFmFilesForBrsX("ecs"),
    replace: (content, section) =>
      content.replace(
        /## Functional Mechanisms[\s\S]*?\n---\n\n## Primary Mechanisms/,
        `${section}---\n\n## Primary Mechanisms`,
      ),
  },
  {
    file: "brs-x/hormones/hormone-signalling-regulation.md",
    fmPaths: () => listFmFilesForBrsX("hormones"),
    replace: (content, section) =>
      content.replace(
        /## Functional Mechanisms[\s\S]*?\n---\n\nProposed future integrated states/,
        `${section}---\n\nProposed future integrated states`,
      ),
  },
];

for (const hub of HUB_CONFIGS) {
  const hubPath = path.join(BRS_BASE, hub.file);
  const fmPaths = hub.fmPaths();
  const section = buildFunctionalMechanismsSection(fmPaths);
  let content = fs.readFileSync(hubPath, "utf8");
  const next = hub.replace(content, section);
  if (next === content) {
    console.warn(`No change: ${hub.file}`);
    continue;
  }
  fs.writeFileSync(hubPath, next);
  console.log(`Updated ${hub.file} (${fmPaths.length} FM dropdowns)`);
}
