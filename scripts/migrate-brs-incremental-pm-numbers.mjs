#!/usr/bin/env node
/**
 * Renumber PMs with BRS-wide incremental PM numbers (unique within each BRS).
 * BRS1-FM1-PM1, BRS1-FM1-PM2, BRS1-FM2-PM4, …
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const BRS_BASE = path.join(ROOT, "docs/biological-targets");
const DRY_RUN = process.argv.includes("--dry-run");
const REPORT_PATH = path.join(ROOT, "system/brs-incremental-pm-renumber-report.md");

function listPmEntries() {
  const entries = [];
  for (let brs = 1; brs <= 6; brs++) {
    const brsDir = path.join(BRS_BASE, `brs${brs}`);
    if (!fs.existsSync(brsDir)) continue;
    for (const dirName of fs.readdirSync(brsDir)) {
      const fmMatch = dirName.match(/^fm(\d+)$/i);
      if (!fmMatch) continue;
      const fm = Number(fmMatch[1]);
      const fmDir = path.join(brsDir, dirName);
      for (const filename of fs.readdirSync(fmDir)) {
        if (!/-fm\d+-pm\d+-/.test(filename)) continue;
        if (!filename.endsWith(".mdx") && !filename.endsWith(".md")) continue;
        const filePath = path.join(fmDir, filename);
        const { data } = matter(fs.readFileSync(filePath, "utf8"));
        const local = Number(filename.match(/-pm(\d+)-/)[1]);
        entries.push({ brs, fm, local, filePath, filename, data });
      }
    }
  }
  return entries;
}

function buildMapping(entries) {
  const byBrs = new Map();
  for (const e of entries) {
    if (!byBrs.has(e.brs)) byBrs.set(e.brs, []);
    byBrs.get(e.brs).push(e);
  }

  const mapping = [];
  for (const [brs, pms] of [...byBrs.entries()].sort((a, b) => a[0] - b[0])) {
    pms.sort((a, b) => a.fm - b.fm || a.local - b.local);
    let incremental = 1;
    for (const pm of pms) {
      const oldId = pm.data.pm_id;
      const newId = `BRS${brs}-FM${pm.fm}-PM${incremental}`;
      const slug = pm.filename.replace(/^brs\d+-fm\d+-pm\d+-/, "").replace(/\.mdx?$/, "");
      const newFilename = `brs${brs}-fm${pm.fm}-pm${incremental}-${slug}.mdx`;
      const oldRel = path.relative(BRS_BASE, pm.filePath).replace(/\\/g, "/");
      const newRel = `brs${brs}/fm${pm.fm}/${newFilename}`;
      const oldUrl = `/docs/biological-targets/${oldRel.replace(/\.mdx?$/, "")}`;
      const newUrl = `/docs/biological-targets/${newRel.replace(/\.mdx?$/, "")}`;

      mapping.push({
        brs,
        fm: pm.fm,
        incremental,
        oldId,
        newId,
        title: pm.data.title,
        oldPath: pm.filePath,
        newPath: path.join(BRS_BASE, newRel),
        oldFilename: pm.filename,
        newFilename,
        oldUrl,
        newUrl,
        oldRel,
        newRel,
        unchanged: oldId === newId && pm.filename === newFilename,
      });
      incremental++;
    }
  }
  return mapping;
}

function applyReplacements(text, mapping) {
  let out = text;
  const replacements = [];
  for (const m of mapping) {
    if (m.oldId !== m.newId) replacements.push([m.oldId, m.newId]);
    if (m.oldUrl !== m.newUrl) replacements.push([m.oldUrl, m.newUrl]);
    if (m.oldRel.replace(/\.mdx?$/, "") !== m.newRel.replace(/\.mdx?$/, "")) {
      replacements.push([
        m.oldRel.replace(/\.mdx?$/, ""),
        m.newRel.replace(/\.mdx?$/, ""),
      ]);
      replacements.push([
        m.oldFilename.replace(/\.mdx?$/, ""),
        m.newFilename.replace(/\.mdx?$/, ""),
      ]);
    }
  }
  replacements.sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of replacements) {
    if (from && from !== to) out = out.split(from).join(to);
  }
  return out;
}

function walkAndReplace(dir, mapping, skip = new Set(["node_modules", ".docusaurus", "build", ".git"])) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (skip.has(name)) continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walkAndReplace(full, mapping, skip);
      continue;
    }
    if (!/\.(mdx?|mjs|ts|json|mdc)$/.test(name)) continue;
    if (name.includes("migrate-brs-incremental-pm-numbers")) continue;
    const raw = fs.readFileSync(full, "utf8");
    const updated = applyReplacements(raw, mapping);
    if (updated !== raw && !DRY_RUN) fs.writeFileSync(full, updated);
  }
}

function updatePmFile(entry, mapping) {
  let raw = fs.readFileSync(entry.oldPath, "utf8");
  const parsed = matter(raw);
  parsed.data.pm_id = entry.newId;
  parsed.content = parsed.content.replace(
    /^##\s+BRS\d+-FM\d+-PM\d+\s*-/m,
    `## ${entry.newId} -`,
  );
  parsed.content = applyReplacements(parsed.content, mapping);
  raw = matter.stringify(parsed.content, parsed.data);
  if (!DRY_RUN) {
    fs.mkdirSync(path.dirname(entry.newPath), { recursive: true });
    fs.writeFileSync(entry.newPath, raw);
    if (entry.oldPath !== entry.newPath && fs.existsSync(entry.oldPath)) {
      fs.unlinkSync(entry.oldPath);
    }
  }
}

function appendRedirects(mapping) {
  const configPath = path.join(ROOT, "docusaurus.config.ts");
  let config = fs.readFileSync(configPath, "utf8");
  const lines = mapping
    .filter((m) => m.oldUrl !== m.newUrl)
    .map((m) => `          { to: '${m.newUrl}', from: '${m.oldUrl}' },`);
  const marker = "// BRS-wide incremental PM renumber";
  if (config.includes(marker) || lines.length === 0) return;
  const insert = `\n          ${marker}\n${lines.join("\n")}`;
  config = config.replace("        redirects: [", `        redirects: [${insert}`);
  if (!DRY_RUN) fs.writeFileSync(configPath, config);
}

function writeReport(mapping) {
  const changed = mapping.filter((m) => !m.unchanged);
  const lines = [
    "# BRS-Wide Incremental PM Renumber Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    `- Total PMs: ${mapping.length}`,
    `- Renumbered: ${changed.length}`,
    "",
    "| Old ID | New ID | Title |",
    "|--------|--------|-------|",
    ...changed.map((m) => `| ${m.oldId} | ${m.newId} | ${m.title} |`),
  ];
  if (!DRY_RUN) fs.writeFileSync(REPORT_PATH, `${lines.join("\n")}\n`);
}

function main() {
  const entries = listPmEntries();
  const mapping = buildMapping(entries);
  const changed = mapping.filter((m) => !m.unchanged);
  console.log(`${mapping.length} PMs, ${changed.length} need renumbering${DRY_RUN ? " (dry run)" : ""}`);
  for (const m of changed) {
    console.log(`  ${m.oldId} → ${m.newId}  ${m.oldFilename} → ${m.newFilename}`);
  }
  if (DRY_RUN) {
    writeReport(mapping);
    return;
  }
  for (const m of mapping) updatePmFile(m, mapping);
  walkAndReplace(path.join(ROOT, "docs"), mapping);
  walkAndReplace(path.join(ROOT, "system"), mapping);
  walkAndReplace(path.join(ROOT, "scripts"), mapping);
  appendRedirects(mapping);
  writeReport(mapping);
  console.log(`Done. Report: ${REPORT_PATH}`);
}

main();
