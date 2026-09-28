#!/usr/bin/env node
/**
 * Migrate ADHD Category A rows from BRS1–BRS6 hub Therapeutic Area Research tables
 * into src/data/therapeutic-area-evidence.json and refresh TA001 page profile.
 */
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const evidencePath = path.join(root, "src/data/therapeutic-area-evidence.json");
const evidenceSeedPath = path.join(root, "src/data/therapeutic-area-evidence.other-ta.seed.json");
const pagesPath = path.join(root, "src/data/therapeutic-area-pages.json");
const reportPath = path.join(root, "ADHD-Therapeutic-Area-Migration-Report.md");
const bib = fs.readFileSync(path.join(root, "static/bibtex/BRAIN-diet.bib"), "utf8");

const HUBS = [
  {
    brsId: "BRS1",
    file: "docs/biological-targets/neurotransmitter-regulation.md",
    anchor: "adhd-evidence-and-connected-brs1-mechanisms",
    hubDoc: "/docs/biological-targets/neurotransmitter-regulation",
  },
  {
    brsId: "BRS2",
    file: "docs/biological-targets/methylation-one-carbon-metabolism.md",
    anchor: "adhd-evidence-and-connected-brs2-mechanisms",
    hubDoc: "/docs/biological-targets/methylation-one-carbon-metabolism",
  },
  {
    brsId: "BRS3",
    file: "docs/biological-targets/inflammation-oxidative-stress.md",
    anchor: "adhd-evidence-and-connected-brs3-mechanisms",
    hubDoc: "/docs/biological-targets/inflammation-oxidative-stress",
  },
  {
    brsId: "BRS4",
    file: "docs/biological-targets/mitochondrial-function-bioenergetics.md",
    anchor: "adhd-evidence-and-connected-brs4-mechanisms",
    hubDoc: "/docs/biological-targets/mitochondrial-function-bioenergetics",
  },
  {
    brsId: "BRS5",
    file: "docs/biological-targets/gut-brain-axis-enteric-nervous-system.md",
    anchor: "adhd-evidence-and-connected-brs5-mechanisms",
    hubDoc: "/docs/biological-targets/gut-brain-axis-enteric-nervous-system",
  },
  {
    brsId: "BRS6",
    file: "docs/biological-targets/metabolic-neuroendocrine-stress.md",
    anchor: "adhd-evidence-and-connected-brs6-mechanisms",
    hubDoc: "/docs/biological-targets/metabolic-neuroendocrine-stress",
  },
];

function parseTableRows(markdown, hub) {
  const anchorIdx = markdown.indexOf(`### ADHD evidence and connected ${hub.brsId} mechanisms`);
  if (anchorIdx === -1) return {rows: [], excluded: [{reason: "Section heading not found", hub: hub.brsId}]};
  const slice = markdown.slice(anchorIdx);
  const endMatch = slice.search(/\n### Current evidence limitations|\n### Framework expansion|\n<!-- brs-hub-ta-research:end -->/);
  const block = endMatch === -1 ? slice : slice.slice(0, endMatch);
  const lines = block.split("\n").filter((line) => line.startsWith("|") && !line.includes("---") && !line.includes("Evidence | Citation"));
  const rows = [];
  const excluded = [];
  for (const line of lines) {
    const parts = line.split("|").map((p) => p.trim()).filter(Boolean);
    if (parts.length < 3) continue;
    const [evidence, citationCell, mechanismsCell] = parts;
    if (/future evidence integration/i.test(citationCell) || /future evidence integration/i.test(evidence)) {
      excluded.push({hub: hub.brsId, evidence, reason: "Limitations placeholder row (not Category A evidence)"});
      continue;
    }
    const citationKeys = [...citationCell.matchAll(/BRAIN-Diet-References#([a-zA-Z0-9_.:-]+)/g)].map((m) => m[1]);
    const citationLabels = [...citationCell.matchAll(/\[([^\]]+)\]\(\/docs\/papers\/BRAIN-Diet-References#/g)].map((m) => m[1]);
    if (!citationKeys.length) {
      excluded.push({hub: hub.brsId, evidence, reason: "Missing bibliography citation key"});
      continue;
    }
    for (const key of citationKeys) {
      if (!bib.includes(`{${key},`)) {
        excluded.push({hub: hub.brsId, evidence, reason: `Bibliography key not found: ${key}`});
      }
    }
    rows.push({
      hub,
      evidence,
      citationKeys,
      citationLabel: citationLabels.join("; "),
      mechanismsCell,
    });
  }
  return {rows, excluded};
}

function parseMechanisms(cell) {
  const pmIds = [...new Set([...cell.matchAll(/\b(BRS[1-6]-FM\d+-PM\d+)\b/g)].map((m) => m[1]))];
  const fmIds = [
    ...new Set([
      ...[...cell.matchAll(/\b(BRS[1-6]\(FM\d+\))\b/g)].map((m) => m[1]),
      ...[...cell.matchAll(/\b(BRS[1-6]\(SM[^)]+\))\b/g)].map((m) => m[1]),
    ]),
  ];
  const phenomeIds = [
    ...new Set(
      [...cell.matchAll(/\/docs\/phenomes\/details\/ph(\d{3})-/gi)].map((m) => `PH${m[1]}`),
    ),
  ];
  const docPaths = [...cell.matchAll(/\]\((\/docs\/[^)]+)\)/g)].map((m) => m[1]);
  const pmPath = docPaths.find((p) => p.includes("/fm") && p.includes("-pm"));
  const fmPath = docPaths.find((p) => p.includes("/fm") && !p.includes("-pm"));
  return {pmIds, fmIds, phenomeIds, pmPath, fmPath};
}

function inferStudyDesign(text) {
  const t = text.toLowerCase();
  if (t.includes("meta-analysis")) return "Meta-analysis";
  if (t.includes("randomized") || t.includes("randomised") || t.includes("placebo-controlled")) return "Randomised controlled trial";
  if (t.includes("open-label") || t.includes("open trial")) return "Open-label intervention";
  if (t.includes("controlled trial")) return "Controlled intervention trial";
  if (t.includes("cybrid")) return "Ex vivo mechanistic study";
  if (t.includes("path analysis")) return "Observational path analysis";
  if (t.includes("case–control") || t.includes("case-control")) return "Case-control study";
  if (t.includes("pet study") || t.includes("gaba") || t.includes("imaging") || t.includes("mrs")) return "Human imaging study";
  if (t.includes("narrative review") || t.includes("review synthes")) return "Narrative review";
  if (t.includes("review of")) return "Review";
  if (t.includes("supplementation") && t.includes("studied")) return "Intervention study";
  return "Human observational or review evidence";
}

function inferDirection(text) {
  const t = text.toLowerCase();
  if (t.includes("does not support") || t.includes("not support sustained") || t.includes("disappeared")) return "null";
  if (t.includes("no consistent") || t.includes("heterogeneous") || t.includes("mixed")) return "mixed";
  if (t.includes("hypothesis-generating")) return "supportive";
  return "supportive";
}

function inferRelation(text, design) {
  const t = text.toLowerCase();
  if (design.includes("Review") && !t.includes("adhd cohort")) return "direct-condition";
  if (t.includes("children with adhd") || t.includes("adhd cohort") || t.includes("adults with adhd") || t.includes("youths with adhd")) {
    if (design.includes("trial") || design.includes("Intervention")) return "direct-condition";
    return "biomarker-association";
  }
  if (t.includes("neurodevelopmental")) return "extrapolated-population";
  return "direct-condition";
}

function inferCeiling(relation, design) {
  if (relation === "null") return "symptom-improvement";
  if (design.includes("trial") || design.includes("Intervention")) return "adjunctive-intervention";
  if (relation === "biomarker-association") return "biomarker-association";
  if (design.includes("Review")) return "mechanistic-plausibility";
  return "functional-association";
}

function displayTitle(evidence) {
  const trimmed = evidence.replace(/\.$/, "").trim();
  if (trimmed.length <= 90) return trimmed;
  const sentence = trimmed.split(/[.!?]/)[0];
  return sentence.length <= 100 ? sentence : `${sentence.slice(0, 97)}…`;
}

function limitationNote(evidence, design) {
  const t = evidence.toLowerCase();
  if (t.includes("replication remains limited")) return "Replication remains limited.";
  if (t.includes("heterogeneous")) return "Findings are heterogeneous across cohorts.";
  if (t.includes("hypothesis-generating")) return "Hypothesis-generating; not definitive efficacy evidence.";
  if (t.includes("does not support sustained")) return "Initial response was not sustained.";
  if (design.includes("Review")) return "Synthesis paper; not a new primary trial in this row.";
  if (t.includes("biomarker") || t.includes("gaba concentration") || t.includes("malondialdehyde")) {
    return "Biomarker association; does not by itself establish treatment effects.";
  }
  return "";
}

function buildSummary(evidence, citationLabel) {
  const base = evidence.trim().replace(/\s+/g, " ");
  if (base.length <= 220) return `${citationLabel} — ${base}`;
  const first = base.split(/(?<=[.!?])\s+/)[0];
  return `${citationLabel} — ${first}`;
}

function openEvidencePath(hub, mech) {
  if (mech.pmPath) return mech.pmPath;
  if (mech.fmPath) return mech.fmPath;
  return `${hub.hubDoc}#${hub.anchor}`;
}

const existing = fs.existsSync(evidencePath)
  ? JSON.parse(fs.readFileSync(evidencePath, "utf8"))
  : {meta: {version: 1}, evidenceRecords: [], claims: []};
const seed = fs.existsSync(evidenceSeedPath)
  ? JSON.parse(fs.readFileSync(evidenceSeedPath, "utf8"))
  : null;
if (seed && !fs.existsSync(evidencePath)) {
  existing.evidenceRecords = [...seed.evidenceRecords];
  existing.claims = [...seed.claims];
}
const otherClaims = [
  ...(seed?.claims.filter((c) => c.taId !== "TA001") || []),
  ...existing.claims.filter((c) => c.taId !== "TA001"),
].filter((claim, index, list) => list.findIndex((entry) => entry.id === claim.id) === index);
const otherRecordKeys = new Set(
  otherClaims.map((c) => {
    const fromExisting = existing.evidenceRecords.find((r) => r.id === c.evidenceId);
    const fromSeed = seed?.evidenceRecords.find((r) => r.id === c.evidenceId);
    return (fromExisting || fromSeed)?.citationKey;
  }).filter(Boolean),
);

const maxRecordNum = Math.max(0, ...existing.evidenceRecords.map((r) => parseInt(r.id.slice(2), 10)));
const maxClaimNum = Math.max(0, ...existing.claims.map((c) => parseInt(c.id.slice(2), 10)));
let recordCounter = maxRecordNum + 1;
let claimCounter = maxClaimNum + 1;

const recordsByKey = new Map();
for (const key of otherRecordKeys) {
  const old =
    seed?.evidenceRecords.find((r) => r.citationKey === key) ||
    existing.evidenceRecords.find((r) => r.citationKey === key);
  if (old) recordsByKey.set(key, {...old, provenance: [...(old.provenance || [])]});
}
const adhdClaims = [];
const audit = {byBrs: {}, excluded: [], rowsFound: 0, conflicts: []};

for (const hub of HUBS) {
  const markdown = fs.readFileSync(path.join(root, hub.file), "utf8");
  const {rows, excluded} = parseTableRows(markdown, hub);
  audit.byBrs[hub.brsId] = rows.length;
  audit.rowsFound += rows.length;
  audit.excluded.push(...excluded);

  for (const row of rows) {
    const mech = parseMechanisms(row.mechanismsCell);
    const primaryKey = row.citationKeys[0];
    const sourceOccurrence = `${hub.file}#${hub.anchor}`;
    const studyDesign = inferStudyDesign(row.evidence);
    const evidenceRelation = inferRelation(row.evidence, studyDesign);
    const resultDirection = inferDirection(row.evidence);
    const claimCeiling = inferCeiling(evidenceRelation, studyDesign);

    const existingRec = existing.evidenceRecords.find((r) => r.citationKey === primaryKey);
    if (!recordsByKey.has(primaryKey)) {
      recordsByKey.set(primaryKey, {
        id: existingRec?.id || `ER${String(recordCounter++).padStart(6, "0")}`,
        citationKey: primaryKey,
        citationKeys: row.citationKeys,
        citationLabel: row.citationLabel,
        population: "See hub table row; interpret with connected mechanism context.",
        lifeStage: "mixed",
        exposure: {
          level: studyDesign.includes("Intervention") || studyDesign.includes("trial") ? "supplement" : "non-intervention",
          label: "As described in hub Therapeutic Area Research table",
        },
        studyDesign,
        measuredOutcomes: ["As summarised in hub table evidence column"],
        targetEngagement: "See hub row and connected mechanism pages",
        functionalClinicalOutcome: "See hub row wording",
        resultDirection,
        limitations: [limitationNote(row.evidence, studyDesign) || "See hub row and mechanism pages for nuance."].filter(Boolean),
        provenance: [sourceOccurrence],
      });
    } else {
      const rec = recordsByKey.get(primaryKey);
      if (!rec.provenance.includes(sourceOccurrence)) rec.provenance.push(sourceOccurrence);
      if (row.citationKeys.length > 1) {
        rec.citationKeys = [...new Set([...rec.citationKeys, ...row.citationKeys])];
        rec.citationLabel = [...new Set(rec.citationLabel.split("; ").concat(row.citationLabel.split("; ")))].join("; ");
      }
    }

    const record = recordsByKey.get(primaryKey);
    const claimId = `EC${String(claimCounter++).padStart(6, "0")}`;
    adhdClaims.push({
      id: claimId,
      evidenceId: record.id,
      taId: "TA001",
      brsId: hub.brsId,
      fmIds: mech.fmIds,
      pmIds: mech.pmIds,
      phenomeIds: mech.phenomeIds,
      evidenceRelation,
      demonstration: evidenceRelation === "biomarker-association" ? "association" : "symptom-improvement",
      currentClaim: row.evidence,
      claimCeiling,
      confidence: studyDesign.includes("Review") ? "low-medium" : "medium",
      resultDirection,
      sourceOccurrences: [sourceOccurrence],
      displayTitle: displayTitle(row.evidence),
      displaySummary: buildSummary(row.evidence, row.citationLabel),
      limitationNote: limitationNote(row.evidence, studyDesign),
      studyDesignLabel: studyDesign,
      openEvidencePath: openEvidencePath(hub, mech),
    });
  }
}

const evidenceRecords = [...recordsByKey.values()].sort((a, b) => a.id.localeCompare(b.id));
const claims = [...adhdClaims, ...otherClaims];

const brsClaimIds = Object.fromEntries(
  HUBS.map((hub) => [hub.brsId, adhdClaims.filter((c) => c.brsId === hub.brsId).map((c) => c.id)]),
);

const pages = JSON.parse(fs.readFileSync(pagesPath, "utf8"));
const adhdPage = pages.pages.find((p) => p.taId === "TA001");
function claimIdForCitation(claims, records, citationKey, taId = "TA001") {
  for (const claim of claims) {
    if (claim.taId !== taId) continue;
    const record = records.find((entry) => entry.id === claim.evidenceId);
    if (!record) continue;
    if (record.citationKey === citationKey || (record.citationKeys || []).includes(citationKey)) {
      return claim.id;
    }
  }
  return null;
}

if (adhdPage) {
  adhdPage.status = "internal-review-hub-migration";
  adhdPage.brsSections = HUBS.map((hub) => {
    const prior = adhdPage.brsSections.find((s) => s.brsId === hub.brsId);
    return {
      brsId: hub.brsId,
      title: prior?.title || hub.brsId,
      relevance: prior?.relevance || `ADHD evidence mapped from ${hub.hubDoc} Therapeutic Area Research table.`,
      claimIds: brsClaimIds[hub.brsId],
      addressability: prior?.addressability || "",
      limitations: prior?.limitations || "See individual study cards and hub source rows.",
    };
  });
  const interventionKeys = {
    "L-tyrosine": "f_w_reimherr_open_1987",
    Pycnogenol: "trebaticka_pycnogenol_adhd_2006",
    Carnitine: "van_oudheusden_efficacy_2002",
    "Bifidobacterium bifidum": "wang_effect_2022",
  };
  for (const intervention of adhdPage.interventions) {
    const key = interventionKeys[intervention.label];
    if (!key) continue;
    const claimId = claimIdForCitation(adhdClaims, evidenceRecords, key);
    if (claimId) intervention.claimIds = [claimId];
  }

  adhdPage.majorGaps = [
    "Human dietary intervention studies directly measuring mechanism endpoints in ADHD remain sparse on several BRS hubs.",
    "Cross-BRS cascade steps remain partly inferred until end-to-end mediation is tested in ADHD cohorts.",
    "Dietary and lifestyle evidence is reserved for a later pass and is not yet migrated to the dedicated tab.",
  ];
}

fs.writeFileSync(
  evidencePath,
  `${JSON.stringify(
    {
      meta: {
        ...existing.meta,
        version: 2,
        adhdHubMigrationAt: new Date().toISOString(),
        adhdHubRowsMigrated: audit.rowsFound,
        adhdDistinctStudies: recordsByKey.size,
      },
      evidenceRecords,
      claims,
    },
    null,
    2,
  )}\n`,
);

fs.writeFileSync(pagesPath, `${JSON.stringify(pages, null, 2)}\n`);

const distinctStudies = recordsByKey.size;
const adhdCitationKeys = new Set();
for (const hub of HUBS) {
  const markdown = fs.readFileSync(path.join(root, hub.file), "utf8");
  const {rows} = parseTableRows(markdown, hub);
  for (const row of rows) for (const key of row.citationKeys) adhdCitationKeys.add(key);
}
const adhdDistinctBibliographyKeys = adhdCitationKeys.size;
const displayedStudies = adhdClaims.length;

const report = `# ADHD Therapeutic Area hub evidence migration report

**Generated:** ${new Date().toISOString()}
**Scope:** BRS1–BRS6 hub Therapeutic Area Research tables (Category A ADHD rows)
**No new literature search was performed.**

## Reviewed source rows by BRS

| BRS | Hub table rows migrated |
|-----|------------------------:|
${HUBS.map((h) => `| ${h.brsId} | ${audit.byBrs[h.brsId] ?? 0} |`).join("\n")}
| **Total** | **${audit.rowsFound}** |

## Study and page counts

| Metric | Count |
|--------|------:|
| Distinct bibliography keys across ADHD hub rows | ${adhdDistinctBibliographyKeys} |
| Canonical study records in registry (all therapeutic areas, deduplicated by citation key) | ${distinctStudies} |
| ADHD study presentations on the page (one per hub table row / interpretation) | ${displayedStudies} |
| Excluded rows | ${audit.excluded.length} |

## Excluded rows

${
  audit.excluded.length
    ? audit.excluded.map((e) => `- **${e.hub}:** ${e.reason}${e.evidence ? ` — “${String(e.evidence).slice(0, 80)}…”` : ""}`).join("\n")
    : "None."
}

## Missing citations, conflicts and review flags

${
  audit.excluded.filter((e) => e.reason.includes("Bibliography")).length
    ? audit.excluded
        .filter((e) => e.reason.includes("Bibliography"))
        .map((e) => `- ${e.reason} (${e.hub})`)
        .join("\n")
    : "- All migrated row citation keys resolved in \`static/bibtex/BRAIN-diet.bib\` at migration time."
}

- **Duplicate citation keys across BRS hubs** (same study, different mechanism mappings): expected — each hub row creates a separate ADHD interpretation on the page while the study is stored once in the registry (for example Wang et al., 2019 on BRS2 and BRS6).
- **Multi-citation hub rows** (Pycnogenol companion papers): one page presentation with multiple bibliography keys on the canonical study record.
- **Cross-BRS mechanism links** on BRS2/BRS3 rows (for example gut diversity routed via BRS5 FM): preserved on the claim; primary BRS remains the hub owning the table row.

## Accounting statement

Every eligible Category A ADHD evidence row in the six hub **ADHD evidence and connected BRSn mechanisms** tables was parsed. Limitations-only placeholder rows were excluded deliberately. Each eligible row maps to one ADHD page study presentation with a link back to the hub section or primary mechanism page.

## Next steps (out of scope for this pass)

- Populate **Dietary & Lifestyle Evidence** tab after dietary-evidence review.
- Enrich canonical study records with population and design detail from mechanism pages where hub rows are abbreviated.
- Resolve any remaining PM cross-links flagged by \`npm run ta:validate\`.
`;

fs.writeFileSync(reportPath, report);

console.log(`Migrated ${audit.rowsFound} hub rows into ${displayedStudies} ADHD page presentations.`);
console.log(`Distinct studies in registry: ${distinctStudies}`);
console.log(`Wrote ${path.relative(root, evidencePath)}`);
console.log(`Wrote ${path.relative(root, reportPath)}`);
