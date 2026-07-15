#!/usr/bin/env node
/**
 * Generate BRS Dependency interpretation pages from brs-cross-integration-evidence.json.
 * @see system/brs-hub-levers-schema.md § BRS Dependency pages
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

let written = 0;
for (const integration of listAllIntegrations()) {
  const filePath = path.join(outDir, `${dependencySlug(integration.id)}.md`);
  const content = `${renderDependencyPageMarkdown(integration)}\n`;
  fs.writeFileSync(filePath, content);
  written++;
  console.log(path.relative(ROOT, filePath));
}

console.log(`\nWrote ${written} BRS dependency page(s).`);
