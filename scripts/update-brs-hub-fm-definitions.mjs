#!/usr/bin/env node
/**
 * Replace repeated FM titles on BRS hub pages with FM summary/definition text.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BRS_BASE = path.join(process.cwd(), "docs/biological-targets");

const HUB_FILES = {
  1: "neurotransmitter-regulation.md",
  2: "methylation-one-carbon-metabolism.md",
  3: "inflammation-oxidative-stress.md",
  4: "mitochondrial-function-bioenergetics.md",
  5: "gut-brain-axis-enteric-nervous-system.md",
  6: "metabolic-neuroendocrine-stress.md",
};

function listFmFiles(brs) {
  const brsDir = path.join(BRS_BASE, `brs${brs}`);
  const files = [];
  for (const entry of fs.readdirSync(brsDir)) {
    const m = entry.match(/^fm(\d+)$/i);
    if (!m) continue;
    const fmDir = path.join(brsDir, entry);
    for (const f of fs.readdirSync(fmDir)) {
      if (/^brs\d+-fm\d+-/.test(f) && !/-pm\d+-/.test(f) && /\.mdx?$/.test(f)) {
        files.push({ fm: Number(m[1]), path: path.join(fmDir, f) });
      }
    }
  }
  return files.sort((a, b) => a.fm - b.fm);
}

function fmUrl(filePath) {
  const rel = path.relative(BRS_BASE, filePath).replace(/\\/g, "/").replace(/\.mdx?$/, "");
  return `/docs/biological-targets/${rel}`;
}

function buildFmSection(brs) {
  const fms = listFmFiles(brs);
  let section = `## Functional Mechanisms\n\nFunctional Mechanisms (FMs) are the primary navigational layer of the BRAIN Framework. Each FM represents an integrated biological function supported by one or more Primary Mechanisms (PMs) beneath it.\n\n`;

  for (const { path: filePath } of fms) {
    const { data } = matter(fs.readFileSync(filePath, "utf8"));
    const fmId = data.fm_id;
    const title = data.title;
    const definition = String(data.summary || "").trim();
    const url = fmUrl(filePath);

    section += `### [${fmId} — ${title}](${url})\n\n`;
    section += `${definition}\n\n`;

    const pms = Array.isArray(data.mechanisms_covered) ? data.mechanisms_covered : [];
    if (pms.length) {
      section += `**Mechanisms:**\n\n`;
      for (const pm of pms) {
        section += `- [${pm.id} — ${pm.name}](${pm.href})\n`;
      }
      section += `\n`;
    }
  }
  return section;
}

function updateHub(brs) {
  const hubPath = path.join(BRS_BASE, HUB_FILES[brs]);
  let content = fs.readFileSync(hubPath, "utf8");
  const fmSection = buildFmSection(brs);
  content = content.replace(
    /## Functional Mechanisms[\s\S]*?\n---\n\n## Requirements/,
    `${fmSection}---\n\n## Requirements`,
  );
  fs.writeFileSync(hubPath, content);
  console.log(`Updated ${HUB_FILES[brs]}`);
}

for (let brs = 1; brs <= 6; brs++) updateHub(brs);
