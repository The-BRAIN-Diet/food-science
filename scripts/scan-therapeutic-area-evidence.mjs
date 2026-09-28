#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "scripts/out");
const jsonPath = path.join(outDir, "therapeutic-area-evidence-scan.json");
const reportPath = path.join(root, "Therapeutic-Area-Evidence-Scan.md");

const CONDITIONS = [
  { id: "TA001", name: "ADHD", pattern: /\b(?:ADHD|attention[- ]deficit(?:\/hyperactivity)? disorder)\b/i },
  { id: "TA002", name: "Anxiety Disorders", pattern: /\b(?:anxiety|anxious|GAD|generalised anxiety|generalized anxiety)\b/i },
  { id: "TA003", name: "Depressive Disorders", pattern: /\b(?:depress(?:ion|ive)|MDD|dysthymi|postnatal depression|postpartum depression)\b/i },
];
const TEXT_EXT = new Set([".md", ".mdx", ".json", ".mjs", ".js", ".ts", ".tsx", ".txt"]);
const ROOTS = ["docs", "system", "scripts/data", "src/data", "manuscript"];
const ROOT_FILES = ["paper.txt"];
const SKIP = /(?:^|\/)(?:node_modules|build|\.docusaurus[^/]*|scripts\/out|\.git)(?:\/|$)/;
const SELF_GENERATED = /src\/data\/therapeutic-area-(?:evidence|pages)\.json$/;

function walk(absolute, files = []) {
  if (!fs.existsSync(absolute)) return files;
  const stat = fs.statSync(absolute);
  if (stat.isFile()) return files.concat(absolute);
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    const child = path.join(absolute, entry.name);
    const rel = path.relative(root, child).split(path.sep).join("/");
    if (SKIP.test(rel) || SELF_GENERATED.test(rel)) continue;
    if (entry.isDirectory()) walk(child, files);
    else if (TEXT_EXT.has(path.extname(entry.name).toLowerCase())) files.push(child);
  }
  return files;
}

function sectionAt(lines, index) {
  for (let i = index; i >= 0; i -= 1) {
    const match = lines[i].match(/^#{1,6}\s+(.+?)\s*(?:\{#[^}]+\})?\s*$/);
    if (match) return match[1];
  }
  return "Front matter / unsectioned";
}

function sourceType(rel) {
  if (/docs\/biological-targets\/dependencies\//.test(rel)) return "cross-brs-dependency";
  if (/docs\/biological-targets\/brs\d\//.test(rel)) return "mechanism";
  if (/docs\/biological-targets\/[^/]+\.(?:md|mdx)$/.test(rel)) return "brs-hub";
  if (/docs\/phenomes\//.test(rel) || /phenome-(?:registry|relationships)/.test(rel)) return "phenome";
  if (/docs\/substances\//.test(rel)) return "substance";
  if (/docs\/foods\//.test(rel)) return "food";
  if (/docs\/therapeutic-areas\//.test(rel)) return "legacy-therapeutic-area";
  if (/docs\/dietary-foundations\//.test(rel)) return "dietary-pattern";
  if (/manuscript|paper\.txt/.test(rel)) return "manuscript";
  if (/scripts\/data\//.test(rel)) return "structured-source";
  return "other";
}

function inferIds(text, rel) {
  const joined = `${rel} ${text}`;
  const brs = [...new Set((joined.match(/\bBRS[1-6]\b/g) || []))].sort();
  const fm = [...new Set((joined.match(/\bBRS[1-6](?:-FM\d+|\(FM\d+\))/g) || []))].sort();
  const pm = [...new Set((joined.match(/\bBRS[1-6]-FM\d+-PM\d+\b/g) || []))].sort();
  const phenome = [...new Set((joined.match(/\bPH\d{3}\b/g) || []))].sort();
  return { brs, fm, pm, phenome };
}

function citations(text) {
  return [...new Set([
    ...[...text.matchAll(/BRAIN-Diet-References#([a-zA-Z0-9_.:-]+)/g)].map((m) => m[1]),
    ...[...text.matchAll(/\{\{cite:([a-zA-Z0-9_.:-]+)\}\}/g)].map((m) => m[1]),
    ...[...text.matchAll(/citation_?key["']?\s*[:=]\s*["']([a-zA-Z0-9_.:-]+)/gi)].map((m) => m[1]),
  ])].sort();
}

function direction(text) {
  if (/\b(null|no significant|did not|insufficient|not support|absence of evidence)\b/i.test(text)) return "null";
  if (/\b(contradict|opposite|higher in .* lower in|conflict|mixed)\b/i.test(text)) return "contradictory-or-mixed";
  if (/\b(improv|reduc|benefit|support|associated|correlat|increase|decrease)\b/i.test(text)) return "directional";
  return "unclear";
}

function occurrenceId(rel, line, claim) {
  const hash = crypto.createHash("sha1").update(`${rel}:${line}:${claim}`).digest("hex").slice(0, 10).toUpperCase();
  return `SO-${hash}`;
}

function blocks(lines) {
  const result = [];
  let start = 0;
  let buf = [];
  const flush = () => {
    const value = buf.join("\n").trim();
    if (value) result.push({ start, text: value });
    buf = [];
  };
  lines.forEach((line, i) => {
    if (!line.trim()) {
      flush();
      start = i + 1;
    } else {
      if (!buf.length) start = i;
      buf.push(line);
    }
  });
  flush();
  return result;
}

const files = [
  ...ROOTS.flatMap((dir) => walk(path.join(root, dir))),
  ...ROOT_FILES.map((file) => path.join(root, file)).filter(fs.existsSync),
].sort();
const binaryManuscriptsNotParsed = fs.existsSync(path.join(root, "manuscript"))
  ? fs.readdirSync(path.join(root, "manuscript"))
      .filter((name) => /\.(?:docx|pdf)$/i.test(name))
      .map((name) => `manuscript/${name}`)
      .sort()
  : [];

const occurrences = [];
for (const file of files) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  const body = fs.readFileSync(file, "utf8");
  const lines = body.split(/\r?\n/);
  for (const block of blocks(lines)) {
    const matched = CONDITIONS.filter((condition) => condition.pattern.test(block.text));
    if (!matched.length) continue;
    const citeKeys = citations(block.text);
    const ids = inferIds(block.text, rel);
    for (const condition of matched) {
      occurrences.push({
        id: occurrenceId(rel, block.start + 1, block.text),
        conditionId: condition.id,
        condition: condition.name,
        sourcePath: rel,
        section: sectionAt(lines, block.start),
        startLine: block.start + 1,
        sourceType: sourceType(rel),
        currentClaim: block.text,
        citationKeys: citeKeys,
        ...ids,
        resultDirection: direction(block.text),
        directness: condition.pattern.test(path.basename(rel)) || /\b(cohort|participants?|patients?|children|adults|trial|case.control)\b/i.test(block.text)
          ? "candidate-direct"
          : "unclassified",
        reviewFlags: [
          ...(citeKeys.length ? [] : ["missing-or-unparsed-citation"]),
          ...(block.text.length > 2000 ? ["compound-source-block"] : []),
        ],
      });
    }
  }
}

const duplicateGroups = Object.values(
  occurrences.reduce((acc, occurrence) => {
    const normalized = occurrence.currentClaim.toLowerCase().replace(/\s+/g, " ").replace(/[^\p{L}\p{N}]+/gu, "");
    const key = `${occurrence.conditionId}:${normalized}`;
    (acc[key] ||= []).push(occurrence.id);
    return acc;
  }, {}),
).filter((ids) => ids.length > 1);

const byCondition = Object.fromEntries(CONDITIONS.map((condition) => {
  const rows = occurrences.filter((row) => row.conditionId === condition.id);
  return [condition.id, {
    name: condition.name,
    occurrences: rows.length,
    sourceFiles: new Set(rows.map((row) => row.sourcePath)).size,
    bySourceType: Object.fromEntries([...new Set(rows.map((row) => row.sourceType))].sort().map((type) => [type, rows.filter((row) => row.sourceType === type).length])),
    brs: [...new Set(rows.flatMap((row) => row.brs))].sort(),
    fm: [...new Set(rows.flatMap((row) => row.fm))].sort(),
    pm: [...new Set(rows.flatMap((row) => row.pm))].sort(),
    phenomes: [...new Set(rows.flatMap((row) => row.phenome))].sort(),
  }];
}));

const acceptedPath = path.join(root, "src/data/therapeutic-area-evidence.json");
const accepted = fs.existsSync(acceptedPath)
  ? JSON.parse(fs.readFileSync(acceptedPath, "utf8")).claims
  : [];
const reviewedV1Coverage = Object.fromEntries(CONDITIONS.map((condition) => {
  const rows = accepted.filter((claim) => claim.taId === condition.id);
  return [condition.id, {
    claimCount: rows.length,
    brs: [...new Set(rows.map((row) => row.brsId))].sort(),
    fm: [...new Set(rows.flatMap((row) => row.fmIds || []))].sort(),
    pm: [...new Set(rows.flatMap((row) => row.pmIds || []))].sort(),
    phenomes: [...new Set(rows.flatMap((row) => row.phenomeIds || []))].sort(),
  }];
}));

const scan = {
  meta: {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    policy: "Repository-only V1 scan; no fresh literature search.",
    rootsSearched: ROOTS,
    fileCount: files.length,
    occurrenceCount: occurrences.length,
  },
  filesSearched: files.map((file) => path.relative(root, file).split(path.sep).join("/")),
  binaryManuscriptsNotParsed,
  byCondition,
  reviewedV1Coverage,
  duplicateGroups,
  occurrences,
};

function list(values) {
  return values.length ? values.join(", ") : "None recovered";
}

const report = `# Therapeutic Area Existing-System Evidence Scan

**Generated:** ${scan.meta.generatedAt}
**Policy:** ${scan.meta.policy}
**Scope:** ADHD, Anxiety Disorders, Depressive Disorders

This is a migration inventory, not a new scientific review. Wording in source
occurrences is preserved in the JSON dataset and may be unsupported, duplicated, or
too strong. Inclusion in the scan does not mean inclusion on a V1 page.

## 1. Files and data sources searched

- ${scan.meta.fileCount} text sources across \`${ROOTS.join("`, `")}\` and \`paper.txt\`
- BRS hubs; FM/PM/SM/KC pages; dependency cascades; Phenome data; substances;
  foods; dietary foundations; legacy TA pages; structured script data; system
  standards; manuscript text
- Master bibliography was treated as the citation authority during validation rather
  than as condition evidence.
- Binary manuscript files were inventoried by location but were not parsed; generated
  website sources remain authoritative.

Full paths are in \`scripts/out/therapeutic-area-evidence-scan.json#filesSearched\`.

## 2. Findings recovered for each condition

| TA | Condition | Candidate occurrences | Source files |
|---|---|---:|---:|
${CONDITIONS.map((condition) => `| ${condition.id} | ${condition.name} | ${byCondition[condition.id].occurrences} | ${byCondition[condition.id].sourceFiles} |`).join("\n")}

Occurrences are source blocks, not unique studies.

## 3. Coverage by BRS, FM, PM and Phenome

Coverage below is the scientifically accepted V1 subset, not keyword-derived
candidate coverage. Raw candidate identifiers remain available in the JSON report.

${CONDITIONS.map((condition) => {
  const row = reviewedV1Coverage[condition.id];
  return `### ${condition.name}\n\n- Accepted claim mappings: ${row.claimCount}\n- BRS: ${list(row.brs)}\n- FM identifiers: ${list(row.fm)}\n- PM identifiers: ${list(row.pm)}\n- Phenomes: ${list(row.phenomes)}`;
}).join("\n\n")}

## 4. Duplicate and conflicting claims

- ${duplicateGroups.length} exact-normalised duplicate group(s) are recorded in
  \`duplicateGroups\`.
- Directional, null and contradictory/mixed source blocks are retained. Automated
  direction labels are triage aids and require scientific adjudication.
- Known high-priority conflicts include non-uniform GABA findings, null antioxidant
  status findings, and short-lived tyrosine response. These must remain visible.

## 5. Unsupported or untraceable claims

Every occurrence with \`missing-or-unparsed-citation\` is a review candidate, not an
accepted evidence record. Food-page ADHD benefit language and broad legacy TA
statements require particular review.

## 6. Missing citations or identifiers

The JSON report records citation keys plus inferred BRS/FM/PM/Phenome IDs for every
occurrence. Missing identifiers are not guessed. Identifier and BibTeX resolution are
enforced separately by \`npm run ta:validate\`.

## 7. Material suitable for immediate V1 inclusion

- Six BRS ADHD Therapeutic Area Research tables and their explicit limitations
- Reviewed PM Phenome mappings and Scientific Findings
- PH016–PH018 anxiety/depression extension records with inferential boundaries
- Copper, glutathione and tetrahydrobiopterin substance TA panels
- Traceable direct dietary/lifestyle trials already present on legacy pages
- Cross-BRS dependency pages where direct and inferred cascade steps are separated

## 8. Evidence requiring scientific review before inclusion

- Uncited or weakly qualified food-page condition claims
- Legacy tag-matrix claims that do not resolve to current biological-target tags
- Walsh/Cu:Zn biotype prose
- Non-condition trials mapped inferentially to PH016 or PH017
- Condition mentions in substance highlights without a reviewed TA panel

## 9. Gaps requiring later targeted literature search

- Anxiety and depression evidence outside the currently concentrated BRS1/BRS3 map
- Direct tests of complete cross-BRS cascades
- Dietary-pattern, food-matrix and meal-timing evidence with mechanism measures
- Biomarker-defined subgroups, life-stage effects and replicated target engagement
- Direct Phenome outcome measures rather than construct substitution

## 10. Generated V1 pages

The internal pages are generated from the reviewed canonical registry:

- \`docs/therapeutic-areas/adhd.mdx\`
- \`docs/therapeutic-areas/anxiety-disorders.mdx\`
- \`docs/therapeutic-areas/depressive-disorders.mdx\`

They remain excluded from publication pending scientific review and targeted
literature work.
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(jsonPath, `${JSON.stringify(scan, null, 2)}\n`);
fs.writeFileSync(reportPath, report);
console.log(`Scanned ${files.length} files; recovered ${occurrences.length} condition occurrences.`);
console.log(`Wrote ${path.relative(root, jsonPath)}`);
console.log(`Wrote ${path.relative(root, reportPath)}`);
