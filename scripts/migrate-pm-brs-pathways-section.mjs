#!/usr/bin/env node
/**
 * PM §6 → BRS Pathways and Connections (6.1 pathways, 6.2 cross-BRS, 6.3 same-FM PMs).
 * Retires standalone §7 Connected Mechanisms; renumbers §8–§11 → §7–§10.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";
import { readMechanismPage, listMechanismMdxFiles } from "./lib/mechanism-page-validation.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const HOMOCYSTEINE_PATHWAY = `[BRS2-FM1-PM1 — Folate/B12-Dependent Homocysteine Remethylation](/docs/biological-targets/brs2/fm1/brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation)
↓
[BRS2-FM3-PM7 — Phospholipid Methylation](/docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phospholipid-methylation)
↓
[BRS1-FM3-PM6 — Neuronal Membrane DHA Incorporation](/docs/biological-targets/brs1/fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation)`;

const FM1_MONOAMINERGIC_PATHWAY = `[BRS1-FM1-PM1 — Amino-Acid Availability & Prioritisation](/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation)
↓
[BRS1-FM1-PM2 — LAT1 Competitive Transport Modulation](/docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation)
↓
[BRS1-FM1-PM3 — Noradrenergic Signalling (Attention & Executive Modulation)](/docs/biological-targets/brs1/fm1/brs1-fm1-pm3-noradrenergic-signalling-attention-executive-modulation)
[BRS1-FM1-PM4 — Serotonergic Signalling Regulation](/docs/biological-targets/brs1/fm1/brs1-fm1-pm4-serotonergic-signalling-regulation)`;

const PATHWAYS_BY_PM_ID = {
  "BRS2-FM1-PM1": HOMOCYSTEINE_PATHWAY,
  "BRS2-FM3-PM7": HOMOCYSTEINE_PATHWAY,
  "BRS1-FM3-PM6": HOMOCYSTEINE_PATHWAY,
  "BRS1-FM1-PM1": FM1_MONOAMINERGIC_PATHWAY,
  "BRS1-FM1-PM2": FM1_MONOAMINERGIC_PATHWAY,
  "BRS1-FM1-PM3": FM1_MONOAMINERGIC_PATHWAY,
  "BRS1-FM1-PM4": FM1_MONOAMINERGIC_PATHWAY,
};

function extractSectionBody(content, headingRe) {
  const m = content.match(new RegExp(`${headingRe.source}\\s*\\n([\\s\\S]*?)(?=\\n## \\d+\\. |$)`));
  return m ? m[1].trim() : "";
}

function extractSubsection(block, pattern) {
  const m = block.match(new RegExp(`### \\d+\\.\\d+\\s+${pattern}\\s*\\n([\\s\\S]*?)(?=\\n### |\\n## |$)`));
  return m ? m[1].trim() : "";
}

function mergePrimaryMechanisms(fmBody, pmBody) {
  const parts = [fmBody, pmBody].filter((p) => p && !/^-?\s*None listed\s*$/i.test(p));
  return parts.length ? parts.join("\n\n") : "- None listed";
}

function renumberTailSections(content) {
  let out = content;
  out = out.replace(/^## (\d+)\. /gm, (_, n) => {
    const level = parseInt(n, 10);
    return level >= 8 ? `## ${level - 1}. ` : `## ${n}. `;
  });
  out = out.replace(/^### (\d+)\.(\d+) /gm, (_, major, minor) => {
    const m = parseInt(major, 10);
    return m >= 8 ? `### ${m - 1}.${minor} ` : `### ${major}.${minor} `;
  });
  return out;
}

function migratePm(filePath) {
  const { data, content } = readMechanismPage(filePath);
  const connectedRe = /## 6\. (?:Connected BRS[\w()-]+ Mechanisms|BRS Pathways and Connections)/;
  if (!connectedRe.test(content)) return null;

  const connectedBlock = extractSectionBody(content, connectedRe);
  const fmBody =
    extractSubsection(connectedBlock, "Overarching Functional Mechanism") || "- None listed";
  const pmBody =
    extractSubsection(connectedBlock, "Connected Primary Mechanisms") || "- None listed";
  const brsMechBody =
    extractSectionBody(content, /## 7\. Connected Mechanisms/) || "- None listed";

  const pathwaysBody = PATHWAYS_BY_PM_ID[data.pm_id] || "- None listed";
  const primaryMechBody = mergePrimaryMechanisms(fmBody, pmBody);

  const beforeConnected = content.replace(
    /\n## 6\. (?:Connected BRS[\w()-]+ Mechanisms|BRS Pathways and Connections)[\s\S]*?(?=\n## 8\. |\n## 7\. Dietary|\n## 7\. References|$)/,
    "",
  );
  const withoutSection7 = beforeConnected.replace(/\n## 7\. Connected Mechanisms[\s\S]*?(?=\n## 8\. |$)/, "");

  const insertionPoint = withoutSection7.search(/\n## 8\. /);
  if (insertionPoint === -1) return null;

  const head = withoutSection7.slice(0, insertionPoint).trimEnd();
  const tail = withoutSection7.slice(insertionPoint);

  const section6 = `

## 6. BRS Pathways and Connections

### 6.1 BRS Pathways

${pathwaysBody}

### 6.2 Connected BRS Mechanisms

${brsMechBody}

### 6.3 Connected Primary Mechanisms

${primaryMechBody}
`;

  const renumberedTail = renumberTailSections(tail);
  return matter.stringify(head + section6 + renumberedTail, data, { lineWidth: 9999 });
}

let changed = 0;
for (const filePath of listMechanismMdxFiles(root, "pm")) {
  const original = fs.readFileSync(filePath, "utf8");
  const updated = migratePm(filePath);
  if (updated && updated !== original) {
    fs.writeFileSync(filePath, updated);
    console.log("updated", path.relative(root, filePath));
    changed++;
  }
}
console.log(`Done. ${changed} PM file(s) updated.`);
