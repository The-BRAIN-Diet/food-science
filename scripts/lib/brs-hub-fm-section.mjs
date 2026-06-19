/**
 * Build BRS hub ## Functional Mechanisms section with per-FM <details> dropdowns.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BRS_BASE = path.join(process.cwd(), "docs/biological-targets");

const FM_SECTION_INTRO =
  "Functional Mechanisms (FMs) are the primary navigational layer of the BRAIN Framework. Each FM represents an integrated biological function supported by one or more Primary Mechanisms (PMs) beneath it.";

export function fmUrlFromPath(filePath) {
  const rel = path
    .relative(BRS_BASE, filePath)
    .replace(/\\/g, "/")
    .replace(/\.mdx?$/, "");
  return `/docs/biological-targets/${rel}`;
}

export function listFmFilesInDir(brsDir) {
  const files = [];
  if (!fs.existsSync(brsDir)) return files;
  for (const entry of fs.readdirSync(brsDir)) {
    const m = entry.match(/^fm(\d+)$/i);
    if (!m) continue;
    const fmDir = path.join(brsDir, entry);
    for (const f of fs.readdirSync(fmDir)) {
      if (/^brs\d+-fm\d+-/.test(f) && !/-pm\d+-/.test(f) && /\.mdx?$/.test(f)) {
        files.push({ fm: Number(m[1]), path: path.join(fmDir, f) });
      }
      if (/^brs-x-[a-z]+-fm\d+-/.test(f) && !/-pm\d+-/.test(f) && /\.mdx?$/.test(f)) {
        files.push({ fm: Number(m[1]), path: path.join(fmDir, f) });
      }
    }
  }
  return files.sort((a, b) => a.fm - b.fm);
}

function extractPrimaryEffects(content) {
  return (
    content.match(/## 2\. Primary Biological Effects\s*\n+\s*([^\n]+)/)?.[1]?.trim() || ""
  );
}

function extractConnectedMechanisms(content) {
  const m = content.match(/## 5\. Connected Mechanisms\s*\n+([\s\S]*?)(?=\n## \d+\.|$)/);
  if (!m) return [];
  return m[1]
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("- ") && !/^- None listed$/i.test(l));
}

function buildModulationContext(data) {
  const parts = [];
  if (data.intervention_breakdown) parts.push(`Intervention: ${data.intervention_breakdown}`);
  if (data.timing_specific) parts.push(`Timing-specific: ${data.timing_specific}`);
  if (data.coverage_timing) parts.push(`Coverage: ${data.coverage_timing}`);
  return parts.length ? parts.join(" · ") : "";
}

function buildFmDropdown({ data, content, url }, pmsToShow) {
  const fmId = data.fm_id;
  const title = data.title;
  const summary = String(data.summary || "").trim();
  const effects = extractPrimaryEffects(content);
  const kcs = Array.isArray(data.key_constraints) ? data.key_constraints : [];
  const connected = extractConnectedMechanisms(content);
  const modulation = buildModulationContext(data);

  let block = `<details>\n<summary><strong>${fmId} — ${title}</strong></summary>\n\n`;
  block += `${summary}\n\n`;
  block += `**FM page:** [${fmId} — ${title}](${url})\n\n`;

  if (effects) {
    block += `**Primary biological effects:** ${effects}\n\n`;
  }
  if (modulation) {
    block += `**Modulation context:** ${modulation}\n\n`;
  }
  if (pmsToShow.length) {
    block += `**Primary mechanisms (PMs):**\n\n`;
    for (const pm of pmsToShow) {
      block += `- [${pm.id} — ${pm.name}](${pm.href})\n`;
    }
    block += `\n`;
  }
  if (kcs.length) {
    block += `**Key constraints:**\n\n`;
    for (const kc of kcs) {
      block += `- [${kc.id} — ${kc.name}](${kc.href})\n`;
    }
    block += `\n`;
  }
  if (connected.length) {
    block += `**Connected mechanisms:**\n\n`;
    for (const line of connected) {
      block += `${line}\n`;
    }
    block += `\n`;
  }

  block += `</details>\n\n`;
  return block;
}

export function buildFunctionalMechanismsSection(fmFilePaths) {
  let section = `## Functional Mechanisms\n\n${FM_SECTION_INTRO}\n\n`;
  const listedPmIds = new Set();

  for (const filePath of fmFilePaths) {
    const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
    const url = fmUrlFromPath(filePath);
    const pms = Array.isArray(data.mechanisms_covered) ? data.mechanisms_covered : [];
    const pmsToShow = pms.filter((pm) => !listedPmIds.has(pm.id));
    for (const pm of pmsToShow) listedPmIds.add(pm.id);

    if (!pmsToShow.length && pms.length) {
      section += buildFmDropdown({ data, content, url }, pms);
    } else {
      section += buildFmDropdown({ data, content, url }, pmsToShow);
    }
  }

  return section;
}

export function listFmFilesForBrs(brsNum) {
  return listFmFilesInDir(path.join(BRS_BASE, `brs${brsNum}`)).map((f) => f.path);
}

export function listFmFilesForBrsX(subdomain) {
  return listFmFilesInDir(path.join(BRS_BASE, "brs-x", subdomain)).map((f) => f.path);
}
