/**
 * Build FM §4 Mechanistic Basis (Integrated FM Narrative) from front matter + linked PM/KC pages.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  buildFailureModesSection,
  extractEvidenceHighlightsBlock,
  insertFailureModesInSection4,
} from "./fm-failure-modes.mjs";

const FM_OVERRIDES = {
  "BRS1(FM3)": `## 4. Mechanistic Basis (Integrated FM Narrative)

Membrane composition, fluidity, and structural lipid integrity represents a framework-relevant biological state anchored principally by neuronal membrane DHA incorporation.

### 4.1 Core Primary Mechanisms

- [BRS1-FM3-PM6 — Neuronal Membrane DHA Incorporation](/docs/biological-targets/brs1/fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation)
  Brain DHA accretion and incorporation into neuronal membrane phospholipids, supporting membrane fluidity and the structural lipid environment within which neural signalling occurs.

### 4.2 Integrated Functional Narrative

Although BRS1(FM3) is principally operationalised through [BRS1-FM3-PM6 — Neuronal Membrane DHA Incorporation](/docs/biological-targets/brs1/fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation), the FM represents the broader membrane structural environment within which neuronal communication occurs. Membrane composition influences receptor function, ion-channel behaviour, synaptic transmission, and network signalling competence while interacting with phospholipid metabolism, lipid protection, inflammatory regulation, and downstream lipid-signalling systems.

At the FM level, signalling competence depends on whether phospholipid-carrier delivery, MFSD2A-mediated transport, and habitual membrane enrichment remain adequate over weeks to months—not from isolated bolus exposure or dose alone.`,
  "BRS4(FM1)": `## 4. Mechanistic Basis (Integrated FM Narrative)

Cellular bioenergetics emerges from the coordinated interaction of several primary mechanisms and supporting biological pools.

### 4.1 Core Primary Mechanisms

- [BRS4-FM1-PM1 — Electron Transport Chain Function](/docs/biological-targets/brs4/fm1/brs4-fm1-pm1-electron-transport-chain-function)
  Generates ATP through mitochondrial electron transfer and oxidative phosphorylation.

- [BRS4-FM1-PM2 — NAD⁺ Metabolism](/docs/biological-targets/brs4/fm1/brs4-fm1-pm2-nad-metabolism)
  Maintains redox-carrier availability required for mitochondrial energy production and metabolic flux.

- [BRS4-FM1-PM3 — Creatine / Phosphocreatine Buffer](/docs/biological-targets/brs4/fm1/brs4-fm1-pm3-creatine-phosphocreatine-buffer)
  Provides rapid ATP buffering during periods of fluctuating or high energy demand.

### 4.2 Integrated Functional Narrative

Together, these mechanisms enable ATP production, ATP buffering, and redox regulation to operate as a coordinated energy-delivery system. Cellular bioenergetic performance therefore depends not only on the effectiveness of individual PMs, but also on whether sufficient fuel substrates and mitochondrial cofactor context are available to support mitochondrial energy metabolism.

At the FM level, dysfunction may arise when ATP demand exceeds the combined capacity of substrate availability, electron transport, redox support, or rapid phosphocreatine buffering.`,
};

function repoPath(rootDir, href) {
  if (!href?.startsWith("/docs/biological-targets/")) return null;
  const rel = href.replace("/docs/biological-targets/", "").replace(/\.mdx?$/, "");
  return path.join(rootDir, "docs/biological-targets", `${rel}.mdx`);
}

function readLinkedEntity(rootDir, href) {
  const filePath = repoPath(rootDir, href);
  if (!filePath || !fs.existsSync(filePath)) return null;
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  return { data, content };
}

function pmContribution(rootDir, pm) {
  const linked = readLinkedEntity(rootDir, pm.href);
  if (!linked) return sentenceCase(pm.name) + ".";
  const def =
    linked.content.match(/## 1\. Definition\s*\n+\s*([^\n]+)/)?.[1]?.trim() ||
    linked.data.summary?.trim();
  if (!def) return sentenceCase(pm.name) + ".";
  return ensurePeriod(capitalizeFirst(def.split(/\.\s+/)[0]));
}

function kcContribution(rootDir, kc) {
  const linked = readLinkedEntity(rootDir, kc.href);
  if (!linked) return sentenceCase(kc.name) + ".";
  const role =
    linked.content.match(/### 2\. Constraint Role\s*\n+\s*([^\n]+)/)?.[1]?.trim() ||
    linked.data.summary?.trim();
  if (!role) return sentenceCase(kc.name) + ".";
  return ensurePeriod(capitalizeFirst(role.split(/\.\s+/)[0]));
}

function capitalizeFirst(s) {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function ensurePeriod(s) {
  return s.endsWith(".") ? s : `${s}.`;
}

function sentenceCase(s) {
  return capitalizeFirst(String(s).trim());
}

function fmOpeningLine(fmData, pmCount = 0) {
  const title = fmData.title || "This functional state";
  const theme = title.replace(/\([^)]*\)/g, "").trim().toLowerCase();
  if (pmCount === 1) {
    return `${capitalizeFirst(theme)} represents a framework-relevant biological state anchored principally by its sole primary mechanism.`;
  }
  return `${capitalizeFirst(theme)} emerges from the coordinated interaction of several primary mechanisms and supporting biological pools.`;
}

function buildPmBullets(rootDir, pms) {
  return pms
    .map((pm) => {
      const line = `- [${pm.id} — ${pm.name}](${pm.href})\n  ${pmContribution(rootDir, pm)}`;
      return line;
    })
    .join("\n\n");
}

function buildKcBullets(rootDir, kcs) {
  if (!kcs?.length) {
    return "- None listed";
  }
  return kcs
    .map((kc) => {
      const line = `- [${kc.id} — ${kc.name}](${kc.href})\n  ${kcContribution(rootDir, kc)}`;
      return line;
    })
    .join("\n\n");
}

function extractLegacyNarrative(oldSection4) {
  const together = oldSection4.match(/\nTogether,[^\n]+(?:\n[^\n#][^\n]*)*/)?.[0]?.trim();
  const atFm = oldSection4.match(/\nAt the integrated FM level,[^\n]+(?:\n[^\n#][^\n]*)*/)?.[0]?.trim();
  const parts = [together, atFm].filter(Boolean);
  return parts.length ? parts.join("\n\n") : null;
}

function stripTogetherForSinglePm(text, pmCount) {
  if (pmCount !== 1 || !text) return text;
  return text.replace(/^Together,\s*/i, "");
}

function defaultIntegratedNarrative(fmData, pms, kcs, legacy) {
  if (legacy) return stripTogetherForSinglePm(legacy.replace(/^\n/, ""), pms.length);

  if (pms.length === 1) {
    const pm = pms[0];
    const pmLink = `[${pm.id} — ${pm.name}](${pm.href})`;
    const kcPart = kcs?.length
      ? " Shared constraint pools and connected systems also shape whether this state remains adequate."
      : " Connected systems, shared constraints, and downstream consequences extend the FM beyond the PM alone.";
    return `Although operationalised primarily through ${pmLink}, ${fmData.fm_id} represents a broader biological state extending beyond the mechanism alone.${kcPart}

At the FM level, performance depends on whether this mechanism, connected systems, and any shared constraint pools remain adequate rather than chronically constrained.`;
  }

  const pmNames = pms.map((p) => p.name).join(", ");
  const kcPart = kcs?.length
    ? " Supporting key constraint pools must also remain sufficient for these PMs to operate effectively."
    : "";
  return `Together, the core primary mechanisms (${pmNames}) operationalise ${fmData.fm_id} as an integrated functional state.${kcPart}

At the FM level, performance depends on whether constituent PMs and shared constraint pools remain adequate rather than chronically constrained.`;
}

export function buildIntegratedMechanisticBasis(fmData, oldSection4, rootDir, kcStressorMap = {}) {
  if (FM_OVERRIDES[fmData.fm_id]) {
    const evidence = extractEvidenceHighlightsBlock(oldSection4);
    const failure =
      fmData.fm_id === "BRS1(FM3)" ? null : buildFailureModesSection(fmData, kcStressorMap);
    const base = FM_OVERRIDES[fmData.fm_id];
    return insertFailureModesInSection4(base, failure, evidence);
  }

  const pms = fmData.mechanisms_covered || [];
  const kcs = fmData.key_constraints || [];
  const evidence = extractEvidenceHighlightsBlock(oldSection4);
  const legacy = extractLegacyNarrative(oldSection4);
  const failure = buildFailureModesSection(fmData, kcStressorMap);

  const core = `## 4. Mechanistic Basis (Integrated FM Narrative)

${fmOpeningLine(fmData, pms.length)}

### 4.1 Core Primary Mechanisms

${buildPmBullets(rootDir, pms)}

### 4.2 Integrated Functional Narrative

${defaultIntegratedNarrative(fmData, pms, kcs, legacy)}`.trim();

  return insertFailureModesInSection4(core, failure, evidence);
}

export function replaceFmSection4(content, fmData, rootDir) {
  const oldMatch = content.match(/## 4\. Mechanistic Basis[^\n]*\n([\s\S]*?)(?=\n## 5\. Connected Mechanisms)/);
  const oldSection4 = oldMatch ? oldMatch[0] : "";
  const newSection4 = buildIntegratedMechanisticBasis(fmData, oldSection4, rootDir);
  if (!oldMatch) return content;
  return content.replace(
    /## 4\. Mechanistic Basis[^\n]*\n[\s\S]*?(?=\n## 5\. Connected Mechanisms)/,
    `${newSection4}\n\n`,
  );
}

export function fixFmTailFormatting(content) {
  return content
    .replace(/(\n- \[[^\n]+\]\([^)]+\))\n## 6\. References/g, "$1\n\n## 6. References")
    .replace(/(## 6\. References)\n(?!\n)/g, "$1\n\n");
}
