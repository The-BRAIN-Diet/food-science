#!/usr/bin/env node
/**
 * Migrate BRS1–BRS3 FM, PM, and SM pages from §1 Definition to §1 Mission & Overview.
 * Uses mission + translational + bullets from translational data sources.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BRS1_UPDATES } from "./data/brs1-translational.mjs";
import { BRS1_3_MISSIONS } from "./data/brs1-3-missions.mjs";
import brs2Brsx from "./data/brs2-brsx-translational.json" with { type: "json" };
import brs3to6 from "./data/brs3-brs6-translational.json" with { type: "json" };

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docs = path.join(root, "docs/biological-targets");

/** @type {Record<string, { mission?: string, translational?: string, bullets?: string[] }>} */
const CONFIG = Object.fromEntries(
  [...Object.entries(BRS1_UPDATES), ...brs2Brsx, ...brs3to6].map((entry) => {
    const [pathKey, cfg] = Array.isArray(entry) ? entry : [entry.path, entry];
    return [pathKey, cfg];
  }),
);

const BRS_FILTER = process.argv
  .find((a) => a.startsWith("--brs="))
  ?.slice("--brs=".length)
  ?.split(",")
  .map((s) => s.trim().toLowerCase());

const KIND_FILTER = process.argv
  .find((a) => a.startsWith("--kind="))
  ?.slice("--kind=".length)
  ?.split(",")
  .map((s) => s.trim().toLowerCase());

function pageKind(rel) {
  if (/^brs[123]\/sm\//.test(rel)) return "sm";
  if (/-pm\d+-/.test(rel)) return "pm";
  if (/^brs[123]\/fm\d+\/brs[123]-fm\d+-[^/]+\.mdx$/.test(rel)) return "fm";
  return null;
}

function listTargetFiles() {
  const out = [];
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const st = fs.statSync(full);
      if (st.isDirectory()) walk(full);
      else if (/\.mdx$/.test(name)) out.push(full);
    }
  }
  for (const brs of ["brs1", "brs2", "brs3"]) {
    const dir = path.join(docs, brs);
    if (fs.existsSync(dir)) walk(dir);
  }
  return out.filter((f) => {
    const rel = path.relative(docs, f);
    const kind = pageKind(rel);
    if (!kind) return false;
    if (BRS_FILTER?.length && !BRS_FILTER.some((b) => rel.startsWith(`${b}/`))) {
      return false;
    }
    if (KIND_FILTER?.length && !KIND_FILTER.includes(kind)) return false;
    return true;
  });
}

function parseSection1Block(body) {
  const re =
    /(## 1\. (?:Definition|Mission & Overview)\s*\n\n)([\s\S]*?)(\n## 2\. )/m;
  const m = body.match(re);
  if (!m) return null;
  const block = m[2].trim();
  if (/^### Mission\s*\n/m.test(block)) return { alreadyMigrated: true };

  const lines = block.split("\n");
  const paragraphs = [];
  const bullets = [];
  for (const line of lines) {
    if (line.startsWith("* ")) bullets.push(line);
    else if (line.trim() && !line.startsWith("### ")) paragraphs.push(line.trim());
  }
  return { prefix: m[1], suffix: m[3], paragraphs, bullets, alreadyMigrated: false };
}

function normalizeBullets(bullets) {
  return bullets.map((b) => (b.startsWith("* ") ? b : `* ${b}`));
}

function buildMissionOverviewBlock({ mission, translational, bullets }) {
  const bulletBlock = normalizeBullets(bullets).join("\n");
  return `### Mission

${mission.trim()}

### Overview

${translational.trim()}

${bulletBlock}`;
}

function updateFrontMatter(fm, { mission, translational }) {
  let out = fm;
  const missionEscaped = mission.replace(/'/g, "''");
  if (/^mission:\s/m.test(out)) {
    out = out.replace(/^mission:\s.*\n/m, `mission: '${missionEscaped}'\n`);
  } else {
    out = out.replace(
      /^(parent_brs:\s*[^\n]+\n|pm_id:\s*[^\n]+\n|sm_id:\s*[^\n]+\n|fm_id:\s*[^\n]+\n)/m,
      `$1mission: '${missionEscaped}'\n`,
    );
  }
  if (/^summary:\s/m.test(out)) {
    const summaryEscaped = translational.replace(/'/g, "''");
    out = out.replace(
      /^summary:\s*>-\s*\n(?:\s+.*\n)*|^summary:\s*['"][^'"]*['"]\s*\n|^summary:\s*[^\n]+\n/m,
      `summary: '${summaryEscaped}'\n`,
    );
  }
  return out;
}

function deriveMissionFromTranslational(translational) {
  const first = translational.split(/(?<=[.!?])\s+/)[0]?.trim() || translational;
  if (first.length <= 180) return first;
  return `${first.slice(0, 177).replace(/\s+\S*$/, "")}…`;
}

function resolveMission(rel, cfg, translational) {
  return (
    cfg.mission?.trim() ||
    BRS1_3_MISSIONS[rel]?.trim() ||
    deriveMissionFromTranslational(translational)
  );
}

function migrateFile(absPath) {
  const rel = path.relative(docs, absPath);
  let raw = fs.readFileSync(absPath, "utf8");
  const fmEnd = raw.indexOf("---", 3);
  let fm = raw.slice(0, fmEnd + 3);
  let body = raw.slice(fmEnd + 3);

  const parsed = parseSection1Block(body);
  if (!parsed) return { rel, status: "no-section1-block" };
  if (parsed.alreadyMigrated) return { rel, status: "already-migrated" };

  const cfg = CONFIG[rel] ?? {};
  const translational =
    cfg.translational?.trim() ||
    parsed.paragraphs.join(" ") ||
    "";
  const bullets =
    cfg.bullets?.length > 0
      ? cfg.bullets
      : parsed.bullets.length > 0
        ? parsed.bullets
        : ["* Supports integrated biological function on this page — within primary BRS."];
  const mission = resolveMission(rel, cfg, translational);

  if (!mission || !translational) {
    return { rel, status: "missing-mission-or-overview" };
  }

  const newBlock = buildMissionOverviewBlock({ mission, translational, bullets });
  body = body.replace(
    /## 1\. (?:Definition|Mission & Overview)\s*\n\n[\s\S]*?\n## 2\. /m,
    `## 1. Mission & Overview\n\n${newBlock}\n\n## 2. `,
  );
  fm = updateFrontMatter(fm, { mission, translational });

  fs.writeFileSync(absPath, `${fm}${body}`, "utf8");
  return { rel, status: "updated" };
}

const files = listTargetFiles();
const results = files.map(migrateFile);
const updated = results.filter((r) => r.status === "updated");
const skipped = results.filter((r) => r.status !== "updated");

console.log(`Mission & Overview migration (BRS1–3 FM / PM / SM)`);
console.log(`Updated ${updated.length} file(s).`);
if (updated.length) {
  for (const r of updated) console.log(`  ✓ ${r.rel}`);
}
if (skipped.length) {
  console.log(
    "Skipped:",
    skipped.map((s) => `${s.rel} (${s.status})`).join(", "),
  );
}
