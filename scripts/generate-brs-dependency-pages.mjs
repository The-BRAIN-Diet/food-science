#!/usr/bin/env node
/**
 * Generate BRS Dependency interpretation pages from brs-cross-integration-evidence.json.
 * @see system/cross-brs-dependency-page-schema.md
 *
 * Do not run until each integration has dependency, routes, network_interpretation
 * and boundary_and_evidence fields. extra_markdown is required for page-specific
 * blocks such as Cascade 6.
 */
import fs from "node:fs";
import path from "node:path";
import {
  dependencySlug,
  listAllIntegrations,
  renderDependencyPageMarkdown,
} from "./lib/brs-dependency-pages.mjs";

const ROOT = process.cwd();
const outDir = path.join(ROOT, "docs/biological-targets/dependencies");

fs.mkdirSync(outDir, { recursive: true });

const missing = [];
for (const integration of listAllIntegrations()) {
  if (
    !integration.dependency ||
    !Array.isArray(integration.routes) ||
    !integration.network_interpretation ||
    !integration.boundary_and_evidence
  ) {
    missing.push(integration.id);
  }
}

if (missing.length) {
  console.error(
    "Refusing to overwrite Cross-BRS pages. Populate canonical page fields first:\n" +
      missing.map((id) => `  - ${id}`).join("\n") +
      "\nSee system/cross-brs-dependency-page-schema.md",
  );
  process.exit(1);
}

let written = 0;
for (const integration of listAllIntegrations()) {
  const filePath = path.join(outDir, `${dependencySlug(integration.id)}.md`);
  const content = `${renderDependencyPageMarkdown(integration)}\n`;
  fs.writeFileSync(filePath, content);
  written++;
  console.log(path.relative(ROOT, filePath));
}

console.log(`\nWrote ${written} BRS dependency page(s).`);
