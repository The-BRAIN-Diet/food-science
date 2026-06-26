#!/usr/bin/env node
/**
 * Generate docs/phenomes/details/*.mdx from phenome-registry.json.
 *
 * Usage: npm run phenome:generate-detail-pages
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadPhenomeRegistry } from "./lib/phenome-registry.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "docs/phenomes/details");

function phenomeDetailDocStem(phenomeId, slug) {
  return `${String(phenomeId).toLowerCase()}-${slug}`;
}

function sidebarLabel(id, name) {
  const short = name.length > 36 ? `${name.slice(0, 33)}…` : name;
  return `${id} — ${short}`;
}

function renderMdx(phenome) {
  const stem = phenomeDetailDocStem(phenome.id, phenome.slug);
  const title = `${phenome.id} — ${phenome.name}`;
  return `---
id: ${stem}
title: "${title.replace(/"/g, '\\"')}"
sidebar_label: "${sidebarLabel(phenome.id, phenome.name).replace(/"/g, '\\"')}"
description: ${JSON.stringify(phenome.publicSummary)}
hide_title: true
---

<PhenomeDetail phenomeId="${phenome.id}" />
`;
}

function main() {
  const registry = loadPhenomeRegistry(root);
  fs.mkdirSync(outDir, { recursive: true });

  const active = registry.phenomes.filter((p) => (p.status || "active") === "active");
  const expectedStems = new Set();

  for (const phenome of active) {
    const stem = phenomeDetailDocStem(phenome.id, phenome.slug);
    expectedStems.add(`${stem}.mdx`);
    const filePath = path.join(outDir, `${stem}.mdx`);
    fs.writeFileSync(filePath, renderMdx(phenome), "utf8");
    console.log(`wrote ${path.relative(root, filePath)}`);
  }

  for (const ent of fs.readdirSync(outDir, { withFileTypes: true })) {
    if (!ent.isFile() || !ent.name.endsWith(".mdx")) continue;
    if (!expectedStems.has(ent.name)) {
      fs.unlinkSync(path.join(outDir, ent.name));
      console.log(`removed stale ${ent.name}`);
    }
  }

  console.log(`\nGenerated ${active.length} phenome detail page(s).`);
}

main();
