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
    brsId: "BRS1",
    fmPaths: () => listFmFilesForBrs(1),
    replace: (content, section) =>
      content.replace(/## Functional Mechanisms[\s\S]*?(?=\n## )/, section),
  },
  {
    file: "methylation-one-carbon-metabolism.md",
    brsId: "BRS2",
    fmPaths: () => listFmFilesForBrs(2),
    replace: (content, section) =>
      content.replace(/## Functional Mechanisms[\s\S]*?(?=\n## )/, section),
  },
  {
    file: "inflammation-oxidative-stress.md",
    brsId: "BRS3",
    fmPaths: () => listFmFilesForBrs(3),
    replace: (content, section) =>
      content.replace(/## Functional Mechanisms[\s\S]*?(?=\n## )/, section),
  },
  {
    file: "mitochondrial-function-bioenergetics.md",
    brsId: "BRS4",
    fmPaths: () => listFmFilesForBrs(4),
    replace: (content, section) =>
      content.replace(/## Functional Mechanisms[\s\S]*?(?=\n## )/, section),
  },
  {
    file: "gut-brain-axis-enteric-nervous-system.md",
    brsId: "BRS5",
    fmPaths: () => listFmFilesForBrs(5),
    replace: (content, section) =>
      content.replace(/## Functional Mechanisms[\s\S]*?(?=\n## )/, section),
  },
  {
    file: "metabolic-neuroendocrine-stress.md",
    brsId: "BRS6",
    fmPaths: () => listFmFilesForBrs(6),
    replace: (content, section) =>
      content.replace(/## Functional Mechanisms[\s\S]*?(?=\n## )/, section),
  },
  {
    file: "brs-x/ecs/endocannabinoid-system.md",
    brsId: "BRS-X-ECS",
    fmPaths: () => listFmFilesForBrsX("ecs"),
    replace: (content, section) =>
      content.replace(
        /## Functional Mechanisms[\s\S]*?\n---\n+## Specific Mechanisms/,
        `${section.trimEnd()}\n\n---\n\n## Specific Mechanisms`,
      ),
  },
  {
    file: "brs-x/hormones/hormone-signalling-regulation.md",
    brsId: "BRS-X-HORMONES",
    fmPaths: () => listFmFilesForBrsX("hormones"),
    replace: (content, section) =>
      content.replace(
        /## Functional Mechanisms[\s\S]*?\n---\n\nProposed future integrated states/,
        `${section}---\n\nProposed future integrated states`,
      ),
  },
];

const HUB_NUM_BY_FILE = {
  "neurotransmitter-regulation.md": "1",
  "methylation-one-carbon-metabolism.md": "2",
  "inflammation-oxidative-stress.md": "3",
  "mitochondrial-function-bioenergetics.md": "4",
  "gut-brain-axis-enteric-nervous-system.md": "5",
  "metabolic-neuroendocrine-stress.md": "6",
};

const brsFilter = process.argv.find((a) => a.startsWith("--brs="))?.split("=")[1];

for (const hub of HUB_CONFIGS) {
  if (brsFilter) {
    const hubNum = HUB_NUM_BY_FILE[path.basename(hub.file)];
    if (hubNum !== brsFilter) continue;
  }
  const hubPath = path.join(BRS_BASE, hub.file);
  const fmPaths = hub.fmPaths();
  const section = buildFunctionalMechanismsSection(fmPaths, hub.brsId);
  let content = fs.readFileSync(hubPath, "utf8");
  const next = hub.replace(content, section);
  if (next === content) {
    console.warn(`No change: ${hub.file}`);
    continue;
  }
  fs.writeFileSync(hubPath, next);
  console.log(`Updated ${hub.file} (${fmPaths.length} FM dropdowns)`);
}
