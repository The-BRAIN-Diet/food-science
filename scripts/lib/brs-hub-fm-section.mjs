/**
 * Build BRS hub collapsible blocks (FM section + shared ADHD / hub panels).
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { isRetiredKc } from "./kc-registry.mjs";

const BRS_BASE = path.join(process.cwd(), "docs/biological-targets");

/** Brief hub intro — what the FMs in this BRS cover (two lines, no navigational boilerplate). */
export const HUB_FM_SECTION_INTRO = {
  BRS1:
    "Monoaminergic, cholinergic, membrane-lipid, and GABA–glutamate mechanisms jointly govern attention, drive, memory, and excitatory–inhibitory balance. Together they set whether precursor supply, receptor environments, and daily signalling tone can support stable function as demand and circadian timing shift.",
  BRS2:
    "Methylation-cycle efficiency, transsulfuration, and methylation–membrane coupling determine methyl-group throughput and sulfur-amino-acid routing. These capacities supply one-carbon chemistry for monoamine turnover, homocysteine handling, and redox-linked support across connected systems.",
  BRS3:
    "Anti-inflammatory tone, antioxidant defence, and inflammation resolution set the background conditions under which neurotransmission, metabolism, and recovery operate. These mechanisms determine whether immune and oxidative load stays proportionate or becomes a persistent constraint on downstream function.",
  BRS4:
    "Cellular bioenergetics, mitochondrial resilience, substrate flexibility, and adaptive capacity expansion supply the ATP and redox stability neurons need under sustained demand. Without adequate energetic reserve, neurotransmitter synthesis, clearance, and signalling become harder to sustain across the day.",
  BRS5:
    "Gut barrier integrity, microbial metabolite signalling, and vagal–enteric neuromodulation link the gut interface to brain chemistry, immune tone, and stress responses. These routes determine whether gut-derived signals support or strain neurotransmission, inflammation, and metabolic recovery.",
  BRS6:
    "Glycaemic–insulin stability, HPA rhythm, autonomic balance, and stress–inflammatory load allocation govern how energy and recovery are distributed under demand. Circadian-aligned cortisol, vagal recovery, and metabolic flexibility shape cognitive energy and cumulative allostatic load.",
  "BRS-X-ECS":
    "Endocannabinoidome signalling integrates lipid-mediated neuromodulation — NAE biosynthesis, preservation, and stress-buffering — that modulates synaptic activity and neuroimmune communication. These mechanisms sustain proportionate endogenous tone rather than relying on pharmacological receptor activation alone.",
  "BRS-X-HORMONES":
    "Reproductive hormone balance interacts with neurocognitive regulation through integrated endocrine–neural signalling. This mechanism set covers how hormone tone shapes attention, mood, and metabolic context across connected brain systems.",
};

function resolveFmSectionIntro(brsId, fmFilePaths) {
  if (brsId && HUB_FM_SECTION_INTRO[brsId]) return HUB_FM_SECTION_INTRO[brsId];
  const sample = String(fmFilePaths[0] || "");
  if (sample.includes("/brs-x/ecs/")) return HUB_FM_SECTION_INTRO["BRS-X-ECS"];
  if (sample.includes("/brs-x/hormones/")) return HUB_FM_SECTION_INTRO["BRS-X-HORMONES"];
  const m = sample.match(/\/brs(\d+)\//);
  if (m) return HUB_FM_SECTION_INTRO[`BRS${m[1]}`] || HUB_FM_SECTION_INTRO.BRS1;
  return "These integrated mechanisms describe the functional capacities within this Biological Regulatory System and the Primary Mechanisms that operationalise them.";
}

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

import { renderHubNestedGroup, HUB_COLLAPSIBLE_ATTR } from "./hub-collapsible.mjs";

export { renderHubCollapsible as buildHubCollapsibleBlock } from "./hub-collapsible.mjs";

function buildPmNavList(pms) {
  if (!pms.length) return "";
  let block = `<ul class="brs-fm-hub-pm-list">\n`;
  for (const pm of pms) {
    const href = String(pm.href || "").trim();
    const id = String(pm.id || "").trim();
    const name = String(pm.name || "").trim();
    if (!href || !id) continue;
    block += `  <li><a href="${href}">${id} — ${name}</a></li>\n`;
  }
  block += `</ul>\n`;
  return block;
}

function buildFmDropdown({ data, content, url }, pms) {
  const fmId = data.fm_id;
  const title = data.title;
  const summary = String(data.summary || "").trim();
  const effects = extractPrimaryEffects(content);
  const kcs = (Array.isArray(data.key_constraints) ? data.key_constraints : []).filter(
    (kc) => !isRetiredKc(kc),
  );
  const connected = extractConnectedMechanisms(content);
  const modulation = buildModulationContext(data);

  let block = `<div class="brs-fm-hub-item" ${HUB_COLLAPSIBLE_ATTR}>\n`;
  block += `<div class="brs-fm-hub-shell">\n`;
  block += `<div class="brs-fm-hub-summary-row">\n`;
  block += `<button type="button" class="brs-fm-hub-toggle" aria-expanded="false" aria-label="Expand ${fmId} summary">\n`;
  block += `<span class="brs-fm-hub-chevron" aria-hidden="true"></span>\n`;
  block += `</button>\n`;
  block += `<strong class="brs-fm-hub-title">${fmId} — ${title}</strong>\n`;
  block += `<a class="brs-fm-hub-open" href="${url}" aria-label="Open FM: ${fmId} — ${title}">\n`;
  block += `<span class="brs-fm-hub-open-label">Open FM →</span>\n`;
  block += `<span class="brs-fm-hub-open-compact" aria-hidden="true">→</span>\n`;
  block += `</a>\n`;
  block += `</div>\n\n`;
  block += buildPmNavList(pms);
  block += `<div class="brs-fm-hub-panel" hidden>\n\n`;
  block += `${summary}\n\n`;
  block += `**FM page:** [${fmId} — ${title}](${url})\n\n`;

  if (effects) {
    block += `**Primary biological effects:** ${effects}\n\n`;
  }
  if (modulation) {
    block += `**Modulation context:** ${modulation}\n\n`;
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

  block += `</div>\n`;
  block += `</div>\n`;
  block += `</div>\n\n`;
  return block;
}

function buildFmGroupWrapper(fmBlocks, fmEntries) {
  const titleItems = fmEntries.map(({ fmId, title, url }) => ({
    title: `${fmId} — ${title}`,
    openHref: url,
    openLabel: "Open FM →",
    openAriaLabel: `Open FM: ${fmId} — ${title}`,
  }));
  return `${renderHubNestedGroup(titleItems, fmBlocks)}\n\n`;
}

export function buildFunctionalMechanismsSection(fmFilePaths, brsId) {
  const intro = resolveFmSectionIntro(brsId, fmFilePaths);
  let section = `## Functional Mechanisms\n\n${intro}\n\n`;

  const fmBlocks = [];
  const fmEntries = [];

  for (const filePath of fmFilePaths) {
    const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
    const url = fmUrlFromPath(filePath);
    const pms = Array.isArray(data.mechanisms_covered) ? data.mechanisms_covered : [];
    fmBlocks.push(buildFmDropdown({ data, content, url }, pms));
    fmEntries.push({ fmId: data.fm_id, title: data.title, url });
  }

  if (fmBlocks.length) {
    section += buildFmGroupWrapper(fmBlocks.join(""), fmEntries);
  }

  return section;
}

export function listFmFilesForBrs(brsNum) {
  return listFmFilesInDir(path.join(BRS_BASE, `brs${brsNum}`)).map((f) => f.path);
}

export function listFmFilesForBrsX(subdomain) {
  return listFmFilesInDir(path.join(BRS_BASE, "brs-x", subdomain)).map((f) => f.path);
}
