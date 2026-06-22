#!/usr/bin/env node
/**
 * Migrate mechanism pages to translational format:
 * - Public-facing subtitle under title (where provided)
 * - §1 Definition: plain-English paragraph + 3–5 bullets
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { BRS1_UPDATES } from "./data/brs1-translational.mjs";
import brs2Brsx from "./data/brs2-brsx-translational.json" with { type: "json" };
import brs3to6 from "./data/brs3-brs6-translational.json" with { type: "json" };

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docs = path.join(root, "docs/biological-targets");

/** @type {Record<string, { subtitle?: string, translational: string, scientific: string, bullets: string[] }>} */
const UPDATES = Object.fromEntries(
  [...Object.entries(BRS1_UPDATES), ...brs2Brsx, ...brs3to6].map((entry) => {
    const [pathKey, cfg] = Array.isArray(entry) ? entry : [entry.path, entry];
    return [pathKey, normalizeConfig(cfg)];
  }),
);

function normalizeConfig(cfg) {
  const translational = glossToParentheses(cfg.translational);
  const scientific = cfg.scientific?.trim() ?? "";
  const bullets = (cfg.bullets ?? []).map((b) =>
    b.startsWith("*") ? b : `* ${b}`,
  );
  let subtitle = cfg.subtitle?.trim();
  if (subtitle && !subtitle.startsWith("(")) {
    subtitle = `(${subtitle})`;
  }
  return { subtitle, translational, scientific, bullets };
}

function glossToParentheses(text) {
  return text.replace(/\[([^\]]+)\]/g, "($1)");
}

function listMechanismFiles() {
  const out = [];
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const st = fs.statSync(full);
      if (st.isDirectory()) walk(full);
      else if (/\.(mdx|md)$/.test(name)) out.push(full);
    }
  }
  walk(docs);
  return out.filter((f) => {
    const rel = path.relative(docs, f);
    if (
      !/(^|\/)(fm\d+|kc|sm)\//.test(rel) &&
      !rel.startsWith("brs-x/")
    ) {
      return false;
    }
    const body = fs.readFileSync(f, "utf8");
    return /^#{2,3} 1\. Definition/m.test(body);
  });
}

function headingLevel(body) {
  return /^### 1\. Definition/m.test(body) ? "###" : "##";
}

function parseDefinitionBlock(body, level) {
  const re = new RegExp(
    `(${level} 1\\. Definition\\s*\\n\\n)([\\s\\S]*?)(\\n${level} 2\\.)`,
    "m",
  );
  const m = body.match(re);
  if (!m) return null;
  const block = m[2].trim();
  const lines = block.split("\n");
  const paragraphs = [];
  const bullets = [];
  for (const line of lines) {
    if (line.startsWith("* ")) bullets.push(line);
    else if (line.trim()) paragraphs.push(line.trim());
  }
  return { prefix: m[1], suffix: m[3], paragraphs, bullets };
}

function gitScientific(relPath) {
  try {
    const raw = execSync(`git show HEAD:docs/biological-targets/${relPath}`, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    const parsed = parseDefinitionBlock(raw, headingLevel(raw));
    if (!parsed) return "";
    if (parsed.paragraphs.length >= 2) return parsed.paragraphs.slice(1).join(" ");
    if (parsed.bullets.length && parsed.paragraphs.length === 1) {
      return parsed.paragraphs[0];
    }
    return "";
  } catch {
    return "";
  }
}

function formatSubtitleLine(subtitle) {
  if (!subtitle) return "";
  return `\n\n${subtitle}\n`;
}

function buildDefinitionBlock(cfg, level) {
  const bulletBlock = cfg.bullets.join("\n");
  return `${cfg.translational}\n\n${bulletBlock}`;
}

function renumberSections(body, level) {
  const hash = level;
  const headings = [...body.matchAll(new RegExp(`^${hash} (\\d+)\\. `, "gm"))].map(
    (m) => Number(m[1]),
  );
  const max = Math.max(0, ...headings);
  let out = body;
  for (let n = max; n >= 2; n--) {
    out = out.replace(
      new RegExp(`^${hash} ${n}\\. `, "gm"),
      `${hash} ${n + 1}. `,
    );
  }
  // Subsections ### N.M under renumbered parents — bump first number when >=2
  out = out.replace(/^### (\d+)\.(\d+)/gm, (_, a, b) => {
    const na = Number(a);
    return na >= 2 ? `### ${na + 1}.${b}` : `### ${a}.${b}`;
  });
  // Inline § references (§2 → §3, etc.)
  out = out.replace(/§(\d+)(?:\.(\d+))?/g, (_, major, minor) => {
    const m = Number(major);
    if (m < 2) return `§${major}${minor ? `.${minor}` : ""}`;
    return minor ? `§${m + 1}.${minor}` : `§${m + 1}`;
  });
  return out;
}

function insertScientificDefinition(body, level, scientific) {
  const hash = level;
  const insert = `${hash} 2. Scientific Definition\n\n${scientific.trim()}\n\n`;
  return body.replace(new RegExp(`\\n${hash} 3\\. `), `\n\n${insert}${hash} 3. `);
}

function applyTitleSubtitle(body, subtitle) {
  if (!subtitle) return body;
  const titleRe = /^(#{2,3} [^\n]+)\n(?!\n*\()/m;
  if (/^\(/.test(body.split("\n").slice(1).find((l) => l.trim()) ?? "")) return body;
  return body.replace(titleRe, `$1${formatSubtitleLine(subtitle)}`);
}

function updateSummary(fm, translational) {
  if (!fm.includes("summary:")) return fm;
  const escaped = translational.replace(/'/g, "''");
  return fm.replace(
    /^summary:\s*>-\s*\n(?:\s+.*\n)*|^summary:\s*['"][^'"]*['"]\s*\n|^summary:\s*[^\n]+\n/m,
    `summary: '${escaped}'\n`,
  );
}

function migrateFile(absPath) {
  const rel = path.relative(docs, absPath);
  let raw = fs.readFileSync(absPath, "utf8");

  const fmEnd = raw.indexOf("---", 3);
  let fm = raw.slice(0, fmEnd + 3);
  let body = raw.slice(fmEnd + 3);
  const level = headingLevel(body);
  const parsed = parseDefinitionBlock(body, level);
  if (!parsed) return { rel, status: "no-definition-block" };

  const cfg = UPDATES[rel] ?? buildFallback(rel, parsed, body);
  if (!cfg.scientific) {
    cfg.scientific = gitScientific(rel) || parsed.paragraphs[0] || cfg.translational;
  }
  if (!cfg.bullets?.length) {
    cfg.bullets = parsed.bullets.length
      ? parsed.bullets
      : ["* Supports connected biological pathways — within primary BRS."];
  }

  body = applyTitleSubtitle(body, cfg.subtitle);
  const newDef = buildDefinitionBlock(cfg, level);
  body = body.replace(
    new RegExp(
      `(${level} 1\\. Definition\\s*\\n\\n)[\\s\\S]*?(\\n${level} 2\\.)`,
      "m",
    ),
    `$1${newDef}\n$2`,
  );
  fm = updateSummary(fm, cfg.translational.split("\n")[0]);

  fs.writeFileSync(absPath, `${fm}${body}`, "utf8");
  return { rel, status: "updated" };
}

function buildFallback(rel, parsed, body) {
  const brsMatch = body.match(/BRS(\d+|X)/);
  const brs = brsMatch ? `BRS${brsMatch[1]}` : "BRS";
  const translational =
    parsed.bullets.length > 0
      ? parsed.paragraphs.join(" ")
      : parsed.paragraphs[0] ?? "";
  const scientific =
    parsed.bullets.length > 0
      ? gitScientific(rel) || parsed.paragraphs.join(" ")
      : parsed.paragraphs.slice(1).join(" ") || parsed.paragraphs[0] || "";
  return {
    translational,
    scientific,
    bullets:
      parsed.bullets.length > 0
        ? parsed.bullets
        : [
            `* Supports core biological function represented on this page — within ${brs}.`,
            `* Connects dietary and lifestyle patterns to mechanism-level biology — within ${brs}.`,
            `* Links to wider cross-system regulation across the BRAIN Framework — Supporting connected BRSs.`,
          ],
  };
}

const files = listMechanismFiles();
const results = files.map(migrateFile);
const updated = results.filter((r) => r.status === "updated");
const skipped = results.filter((r) => r.status !== "updated");
console.log(`Updated ${updated.length} files.`);
if (skipped.length) {
  console.log(
    "Skipped:",
    skipped.map((s) => `${s.rel} (${s.status})`).join(", "),
  );
}
