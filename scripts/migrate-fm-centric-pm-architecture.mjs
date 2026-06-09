#!/usr/bin/env node
/**
 * FM-centric PM architecture migration.
 * BRS{N}(PM{global}) → BRS{N}-FM{M}-PM{local}
 * Files: brs{N}/pm/ → brs{N}/fm{M}/ ; brs{N}/fm/ → brs{N}/fm{M}/
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const DOCS = path.join(ROOT, "docs");
const BRS_BASE = path.join(DOCS, "biological-targets");
const DRY_RUN = process.argv.includes("--dry-run");
const REPORT_PATH = path.join(ROOT, "system/fm-centric-pm-migration-report.md");

const HUB_FILES = {
  BRS1: "neurotransmitter-regulation.md",
  BRS2: "methylation-one-carbon-metabolism.md",
  BRS3: "inflammation-oxidative-stress.md",
  BRS4: "mitochondrial-function-bioenergetics.md",
  BRS5: "gut-brain-axis-enteric-nervous-system.md",
  BRS6: "metabolic-neuroendocrine-stress.md",
};

function parseFmNum(parentFm) {
  const m = String(parentFm).match(/BRS(\d+)\(FM(\d+)\)/i);
  if (!m) throw new Error(`Invalid parent_fm: ${parentFm}`);
  return { brs: Number(m[1]), fm: Number(m[2]) };
}

function parsePmNum(pmId) {
  const m = String(pmId).match(/BRS(\d+)\(PM(\d+)\)/i);
  if (!m) throw new Error(`Invalid pm_id: ${pmId}`);
  return { brs: Number(m[1]), pm: Number(m[2]) };
}

function extractSlug(filename, brs, globalPm) {
  const prefix = `brs${brs}-pm${globalPm}-`;
  if (!filename.startsWith(prefix)) {
    return filename.replace(/\.mdx?$/, "").replace(/^brs\d+-pm\d+-/, "");
  }
  return filename.slice(prefix.length).replace(/\.mdx?$/, "");
}

function listPmFiles() {
  const files = [];
  for (let brs = 1; brs <= 6; brs++) {
    const dir = path.join(BRS_BASE, `brs${brs}`, "pm");
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith(".mdx") || f.endsWith(".md")) files.push(path.join(dir, f));
    }
  }
  return files.sort();
}

function listFmFiles() {
  const files = [];
  for (let brs = 1; brs <= 6; brs++) {
    const dir = path.join(BRS_BASE, `brs${brs}`, "fm");
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith(".mdx") || f.endsWith(".md")) files.push(path.join(dir, f));
    }
  }
  return files.sort();
}

function buildMapping() {
  const pmFiles = listPmFiles();
  const byFm = new Map();

  for (const filePath of pmFiles) {
    const { data } = matter(fs.readFileSync(filePath, "utf8"));
    if (!data.pm_id || !data.parent_fm) {
      throw new Error(`Missing pm_id/parent_fm: ${filePath}`);
    }
    const key = data.parent_fm;
    if (!byFm.has(key)) byFm.set(key, []);
    byFm.get(key).push({ filePath, data, filename: path.basename(filePath) });
  }

  const pmMap = new Map();
  const fmMeta = new Map();

  for (const [parentFm, pms] of byFm.entries()) {
    const { brs, fm } = parseFmNum(parentFm);
    pms.sort((a, b) => parsePmNum(a.data.pm_id).pm - parsePmNum(b.data.pm_id).pm);
    let local = 1;
    for (const pm of pms) {
      const global = parsePmNum(pm.data.pm_id);
      const slug = extractSlug(pm.filename, brs, global.pm);
      const oldId = pm.data.pm_id;
      const newId = `BRS${brs}-FM${fm}-PM${local}`;
      const oldRel = path.relative(BRS_BASE, pm.filePath).replace(/\\/g, "/");
      const newFilename = `brs${brs}-fm${fm}-pm${local}-${slug}.mdx`;
      const newRel = `brs${brs}/fm${fm}/${newFilename}`;
      const oldUrl = `/docs/biological-targets/${oldRel.replace(/\.mdx?$/, "")}`;
      const newUrl = `/docs/biological-targets/${newRel.replace(/\.mdx?$/, "")}`;

      pmMap.set(oldId, {
        oldId,
        newId,
        title: pm.data.title,
        parentFm,
        brs,
        fm,
        local,
        globalPm: global.pm,
        slug,
        oldPath: pm.filePath,
        newPath: path.join(BRS_BASE, newRel),
        oldRel,
        newRel,
        oldUrl,
        newUrl,
        oldFilename: pm.filename,
        newFilename,
      });
      local++;
    }
    fmMeta.set(parentFm, { brs, fm, pms: [...pmMap.values()].filter((e) => e.parentFm === parentFm) });
  }

  const fmMoves = [];
  for (const filePath of listFmFiles()) {
    const { data } = matter(fs.readFileSync(filePath, "utf8"));
    if (!data.fm_id) continue;
    const { brs, fm } = parseFmNum(data.fm_id);
    const filename = path.basename(filePath);
    const oldRel = path.relative(BRS_BASE, filePath).replace(/\\/g, "/");
    const newRel = `brs${brs}/fm${fm}/${filename}`;
    fmMoves.push({
      fmId: data.fm_id,
      title: data.title,
      brs,
      fm,
      oldPath: filePath,
      newPath: path.join(BRS_BASE, newRel),
      oldUrl: `/docs/biological-targets/${oldRel.replace(/\.mdx?$/, "")}`,
      newUrl: `/docs/biological-targets/${newRel.replace(/\.mdx?$/, "")}`,
      oldRel,
      newRel,
      filename,
    });
  }

  return { pmMap, fmMoves, fmMeta };
}

function applyTextReplacements(text, pmMap, fmMoves) {
  let out = text;
  const replacements = [];

  for (const entry of pmMap.values()) {
    replacements.push([entry.oldUrl, entry.newUrl]);
    replacements.push([entry.oldRel.replace(/\.mdx?$/, ""), entry.newRel.replace(/\.mdx?$/, "")]);
    replacements.push([entry.oldFilename.replace(/\.mdx?$/, ""), entry.newFilename.replace(/\.mdx?$/, "")]);
    replacements.push([entry.oldId, entry.newId]);
    replacements.push([`BRS${entry.brs}(PM${entry.globalPm})`, entry.newId]);
    replacements.push([`BRS${entry.brs}-PM${entry.globalPm}`, entry.newId]);
  }

  for (const fm of fmMoves) {
    replacements.push([fm.oldUrl, fm.newUrl]);
    replacements.push([fm.oldRel.replace(/\.mdx?$/, ""), fm.newRel.replace(/\.mdx?$/, "")]);
    replacements.push([`/brs${fm.brs}/fm/`, `/brs${fm.brs}/fm${fm.fm}/`]);
    replacements.push([`brs${fm.brs}/fm/`, `brs${fm.brs}/fm${fm.fm}/`]);
  }

  replacements.sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of replacements) {
    if (from && from !== to) out = out.split(from).join(to);
  }
  return out;
}

function updatePmFrontmatter(raw, entry) {
  const parsed = matter(raw);
  parsed.data.pm_id = entry.newId;
  return matter.stringify(parsed.content, parsed.data);
}

function updateFmMechanismsCovered(raw, pmMap) {
  const parsed = matter(raw);
  if (Array.isArray(parsed.data.mechanisms_covered)) {
    parsed.data.mechanisms_covered = parsed.data.mechanisms_covered
      .filter((item) => {
        const mapped = pmMap.get(item.id);
        return !mapped || mapped.parentFm === parsed.data.fm_id;
      })
      .map((item) => {
        const mapped = pmMap.get(item.id);
        if (!mapped) return item;
        return { ...item, id: mapped.newId, href: mapped.newUrl };
      });
  }
  return matter.stringify(parsed.content, parsed.data);
}

function updatePmHeading(content, entry) {
  return content.replace(
    /^##\s+BRS\d+\(PM\d+\)\s*-/m,
    `## ${entry.newId} -`,
  ).replace(
    /^##\s+BRS\d+-PM\d+\s*-/m,
    `## ${entry.newId} -`,
  );
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writeCategoryJson(fmMove, pmMap) {
  const pms = [...pmMap.values()]
    .filter((p) => p.fm === fmMove.fm && p.brs === fmMove.brs)
    .sort((a, b) => a.local - b.local);
  const docId = `biological-targets/${fmMove.newRel.replace(/\.mdx?$/, "")}`;
  const category = {
    label: `${fmMove.fmId} - ${fmMove.title}`,
    position: fmMove.fm,
    link: { type: "doc", id: docId },
    collapsed: true,
    collapsible: true,
  };
  const catPath = path.join(path.dirname(fmMove.newPath), "_category_.json");
  if (!DRY_RUN) fs.writeFileSync(catPath, `${JSON.stringify(category, null, 2)}\n`);
  return catPath;
}

function generateHubFmSection(brsNum, fmMoves, pmMap) {
  const fms = fmMoves
    .filter((f) => f.brs === brsNum)
    .sort((a, b) => a.fm - b.fm);

  let section = `## Functional Mechanisms\n\nFunctional Mechanisms (FMs) are the primary navigational layer of the BRAIN Framework. Each FM represents an integrated biological function supported by one or more Primary Mechanisms (PMs) beneath it.\n\n`;

  for (const fm of fms) {
    const pms = [...pmMap.values()]
      .filter((p) => p.brs === brsNum && p.fm === fm.fm)
      .sort((a, b) => a.local - b.local);

    const { data: fmData } = matter(fs.readFileSync(fm.newPath, "utf8"));
    const definition = String(fmData.summary || fm.title).trim();
    section += `### [${fm.fmId} — ${fm.title}](${fm.newUrl})\n\n`;
    section += `${definition}\n\n`;
    if (pms.length) {
      section += `**Mechanisms:**\n\n`;
      for (const pm of pms) {
        section += `- [${pm.newId} — ${pm.title}](${pm.newUrl})\n`;
      }
      section += `\n`;
    }
  }
  return section;
}

function updateHubPage(brsNum, fmMoves, pmMap) {
  const hubFile = path.join(BRS_BASE, HUB_FILES[`BRS${brsNum}`]);
  if (!fs.existsSync(hubFile)) return;
  let content = fs.readFileSync(hubFile, "utf8");
  content = applyTextReplacements(content, pmMap, fmMoves);

  const fmSection = generateHubFmSection(brsNum, fmMoves, pmMap);
  content = content.replace(
    /## Functional Mechanisms[\s\S]*?(?=\n---\n\n## Requirements|\n---\n\n## Primary Mechanisms|\n## Requirements \(Key Constraints\))/,
    `${fmSection}---\n\n`,
  );

  content = content.replace(
    /\n## Primary Mechanisms[\s\S]*?(?=\n---\n\n## Specific Mechanisms|\n## Specific Mechanisms|\n*$)/,
    "\n",
  );

  if (!DRY_RUN) fs.writeFileSync(hubFile, content);
}

function appendRedirects(pmMap, fmMoves) {
  const configPath = path.join(ROOT, "docusaurus.config.ts");
  let config = fs.readFileSync(configPath, "utf8");
  const newRedirects = [];

  for (const entry of pmMap.values()) {
    newRedirects.push(`          { to: '${entry.newUrl}', from: '${entry.oldUrl}' },`);
  }
  for (const fm of fmMoves) {
    newRedirects.push(`          { to: '${fm.newUrl}', from: '${fm.oldUrl}' },`);
  }

  const marker = "        redirects: [";
  if (!config.includes(marker)) throw new Error("redirects block not found");
  const insert = `\n          // FM-centric PM architecture migration\n${newRedirects.join("\n")}`;
  if (!config.includes("FM-centric PM architecture migration")) {
    config = config.replace(marker, `${marker}${insert}`);
    if (!DRY_RUN) fs.writeFileSync(configPath, config);
  }
}

function removeEmptyDirs() {
  for (let brs = 1; brs <= 6; brs++) {
    for (const sub of ["pm", "fm"]) {
      const dir = path.join(BRS_BASE, `brs${brs}`, sub);
      if (!fs.existsSync(dir)) continue;
      for (const f of fs.readdirSync(dir)) {
        if (f === "_category_.json") {
          if (!DRY_RUN) fs.unlinkSync(path.join(dir, f));
        }
      }
      const remaining = fs.readdirSync(dir);
      if (remaining.length === 0 && !DRY_RUN) fs.rmdirSync(dir);
    }
  }
}

function walkAndReplace(dir, pmMap, fmMoves) {
  const skip = new Set(["node_modules", ".docusaurus", "build", ".git"]);
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (skip.has(name)) continue;
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walkAndReplace(full, pmMap, fmMoves);
      continue;
    }
    if (!/\.(mdx?|mjs|ts|json|mdc)$/.test(name)) continue;
    if (name === "migrate-fm-centric-pm-architecture.mjs") continue;
    const raw = fs.readFileSync(full, "utf8");
    const updated = applyTextReplacements(raw, pmMap, fmMoves);
    if (updated !== raw && !DRY_RUN) fs.writeFileSync(full, updated);
  }
}

function writeReport(pmMap, fmMoves) {
  const lines = [
    "# FM-Centric PM Architecture Migration Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Summary",
    "",
    `- PMs renumbered: ${pmMap.size}`,
    `- FM folders created: ${fmMoves.length}`,
    `- URL pattern: \`/docs/biological-targets/brs{N}/fm{M}/brs{N}-fm{M}-pm{local}-{slug}\``,
    "",
    "## Old ID → New ID",
    "",
    "| Old ID | New ID | Title |",
    "|--------|--------|-------|",
  ];

  for (const entry of [...pmMap.values()].sort((a, b) => {
    if (a.brs !== b.brs) return a.brs - b.brs;
    if (a.fm !== b.fm) return a.fm - b.fm;
    return a.local - b.local;
  })) {
    lines.push(`| ${entry.oldId} | ${entry.newId} | ${entry.title} |`);
  }

  lines.push("", "## URL Redirects", "", "| From | To |", "|------|-----|");
  for (const entry of pmMap.values()) {
    lines.push(`| ${entry.oldUrl} | ${entry.newUrl} |`);
  }
  for (const fm of fmMoves) {
    lines.push(`| ${fm.oldUrl} | ${fm.newUrl} |`);
  }

  if (!DRY_RUN) fs.writeFileSync(REPORT_PATH, `${lines.join("\n")}\n`);
  return REPORT_PATH;
}

function main() {
  const { pmMap, fmMoves } = buildMapping();
  console.log(`Mapping: ${pmMap.size} PMs, ${fmMoves.length} FMs${DRY_RUN ? " (dry run)" : ""}`);

  if (DRY_RUN) {
    for (const e of pmMap.values()) {
      console.log(`${e.oldId} → ${e.newId}  ${e.oldUrl} → ${e.newUrl}`);
    }
    writeReport(pmMap, fmMoves);
    return;
  }

  for (const fm of fmMoves) {
    ensureDir(path.dirname(fm.newPath));
    let raw = fs.readFileSync(fm.oldPath, "utf8");
    raw = updateFmMechanismsCovered(raw, pmMap);
    raw = applyTextReplacements(raw, pmMap, fmMoves);
    fs.writeFileSync(fm.newPath, raw);
    writeCategoryJson(fm, pmMap);
  }

  for (const entry of pmMap.values()) {
    ensureDir(path.dirname(entry.newPath));
    let raw = fs.readFileSync(entry.oldPath, "utf8");
    raw = updatePmFrontmatter(raw, entry);
    const parsed = matter(raw);
    parsed.content = updatePmHeading(parsed.content, entry);
    parsed.content = applyTextReplacements(parsed.content, pmMap, fmMoves);
    raw = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(entry.newPath, raw);
  }

  for (const brs of [1, 2, 3, 4, 5, 6]) {
    updateHubPage(brs, fmMoves, pmMap);
  }

  walkAndReplace(DOCS, pmMap, fmMoves);
  walkAndReplace(path.join(ROOT, "system"), pmMap, fmMoves);
  walkAndReplace(path.join(ROOT, "scripts"), pmMap, fmMoves);

  appendRedirects(pmMap, fmMoves);

  for (const entry of pmMap.values()) {
    if (fs.existsSync(entry.oldPath)) fs.unlinkSync(entry.oldPath);
  }
  for (const fm of fmMoves) {
    if (fs.existsSync(fm.oldPath)) fs.unlinkSync(fm.oldPath);
  }
  removeEmptyDirs();

  const report = writeReport(pmMap, fmMoves);
  console.log(`Migration complete. Report: ${report}`);
}

main();
