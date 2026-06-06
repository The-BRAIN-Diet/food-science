/**
 * Build FM §4 Mechanistic Basis (Integrated FM Narrative) from front matter + linked PM/KC pages.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const FM_OVERRIDES = {
  "BRS4(FM1)": `## 4. Mechanistic Basis (Integrated FM Narrative)

Cellular bioenergetics emerges from the coordinated interaction of several primary mechanisms and supporting biological pools.

### 4.1 Core Primary Mechanisms

- [BRS4(PM1) — Electron Transport Chain Function](/docs/biological-targets/brs4/pm/brs4-pm1-electron-transport-chain-function)
  Generates ATP through mitochondrial electron transfer and oxidative phosphorylation.

- [BRS4(PM4) — NAD⁺ Metabolism](/docs/biological-targets/brs4/pm/brs4-pm4-nad-metabolism)
  Maintains redox-carrier availability required for mitochondrial energy production and metabolic flux.

- [BRS4(PM6) — Creatine / Phosphocreatine Buffer](/docs/biological-targets/brs4/pm/brs4-pm6-creatine-phosphocreatine-buffer)
  Provides rapid ATP buffering during periods of fluctuating or high energy demand.

### 4.2 Supporting Biological Pools (Key Constraints)

- [BRS4(KC1) — Macronutrient Substrate Availability](/docs/biological-targets/brs4/kc/brs4-kc1-macronutrient-substrate-availability)
  Supplies the glucose, fatty acids, and amino-acid-derived substrates required to fuel mitochondrial ATP production.

- [BRS4(KC2) — Mitochondrial Cofactor Sufficiency](/docs/biological-targets/brs4/kc/brs4-kc2-mitochondrial-cofactor-sufficiency)
  Maintains the micronutrient context required for mitochondrial enzymes, electron carriers, and ATP-generating pathways.

### 4.3 Integrated Functional Narrative

Together, these mechanisms enable ATP production, ATP buffering, and redox regulation to operate as a coordinated energy-delivery system. Cellular bioenergetic performance therefore depends not only on the effectiveness of individual PMs, but also on whether sufficient fuel substrates and mitochondrial cofactor context are available to support mitochondrial energy metabolism.

At the FM level, dysfunction may arise when ATP demand exceeds the combined capacity of substrate availability, electron transport, redox support, or rapid phosphocreatine buffering [1][2][3].`,
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

function fmOpeningLine(fmData) {
  const title = fmData.title || "This functional state";
  const theme = title.replace(/\([^)]*\)/g, "").trim().toLowerCase();
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

function defaultIntegratedNarrative(fmData, pms, kcs, legacy) {
  if (legacy) return legacy.replace(/^\n/, "");
  const pmNames = pms.map((p) => p.name).join(", ");
  const kcPart = kcs?.length
    ? " Supporting key constraint pools must also remain sufficient for these PMs to operate effectively."
    : "";
  return `Together, the core primary mechanisms (${pmNames}) operationalise ${fmData.fm_id} as an integrated functional state.${kcPart}

At the FM level, performance depends on whether constituent PMs and shared constraint pools remain adequate rather than chronically constrained.`;
}

function extractEvidenceHighlights(oldSection4) {
  const m = oldSection4.match(/(### 4\.1 Evidence Highlights[\s\S]*?)(?=\n## 5\.|\n## 6\.|\n## 7\.|$)/);
  if (!m) return "";
  return m[1].replace("### 4.1 Evidence Highlights", "### 4.4 Evidence Highlights").trim() + "\n\n";
}

export function buildIntegratedMechanisticBasis(fmData, oldSection4, rootDir) {
  if (FM_OVERRIDES[fmData.fm_id]) {
    const evidence = extractEvidenceHighlights(oldSection4);
    return FM_OVERRIDES[fmData.fm_id] + (evidence ? `\n\n${evidence}` : "");
  }

  const pms = fmData.mechanisms_covered || [];
  const kcs = fmData.key_constraints || [];
  const evidence = extractEvidenceHighlights(oldSection4);
  const legacy = extractLegacyNarrative(oldSection4);

  return `## 4. Mechanistic Basis (Integrated FM Narrative)

${fmOpeningLine(fmData)}

### 4.1 Core Primary Mechanisms

${buildPmBullets(rootDir, pms)}

### 4.2 Supporting Biological Pools (Key Constraints)

${buildKcBullets(rootDir, kcs)}

### 4.3 Integrated Functional Narrative

${defaultIntegratedNarrative(fmData, pms, kcs, legacy)}
${evidence ? `\n${evidence}` : ""}`.trim();
}

export function replaceFmSection4(content, fmData, rootDir) {
  const oldMatch = content.match(/## 4\. Mechanistic Basis[^\n]*\n([\s\S]*?)(?=\n## 5\. Cross BRS Links)/);
  const oldSection4 = oldMatch ? oldMatch[0] : "";
  const newSection4 = buildIntegratedMechanisticBasis(fmData, oldSection4, rootDir);
  if (!oldMatch) return content;
  return content.replace(
    /## 4\. Mechanistic Basis[^\n]*\n[\s\S]*?(?=\n## 5\. Cross BRS Links)/,
    `${newSection4}\n\n`,
  );
}

export function fixFmTailFormatting(content) {
  return content
    .replace(/(\n- \[[^\n]+\]\([^)]+\))\n## 6\. References/g, "$1\n\n## 6. References")
    .replace(/(## 6\. References)\n(?!\n)/g, "$1\n\n");
}
