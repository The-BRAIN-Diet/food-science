import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  findingInformsIndex,
  findingsById,
  hasScientificFindings,
  headlineMechanisticFindings,
  interpretiveConstraintFindings,
  isPrimaryPhenomeFinding,
  mechanisticFindings,
  renderRelationshipPrimaryFindings,
  renderScientificFindingsSection,
  rollUpFindings,
  SEC_NOT_YET_SCORED,
  validateScientificFindings,
} from "./lib/scientific-findings.mjs";
import { checkScientificFindings } from "./lib/scientific-findings-gate.mjs";
import { buildFmEvidenceHighlightsBlock } from "./lib/fm-evidence-highlights.mjs";
import { listMechanismMdxFiles } from "./lib/mechanism-page-validation.mjs";
import { detectPmLayout, PM_LAYOUT_CANONICAL, pmSectionNumbers } from "./lib/pm-section-layout.mjs";
import { BRS1_PM_PHASE3_SCORES } from "./data/brs1-phase3-phenome-scores.mjs";
import { BRS1_PM_EVIDENCE } from "./lib/pm-evidence-highlights.mjs";
import {
  buildPmReferenceKeyIndex,
  expandPmCitationMarkers,
  formatPmCitationCluster,
} from "./lib/pm-reference-index.mjs";

const root = process.cwd();
const PM8 = path.join(
  root,
  "docs/biological-targets/brs1/fm4/brs1-fm4-pm8-gaba-synthesis-capacity.mdx",
);
const FM4 = path.join(
  root,
  "docs/biological-targets/brs1/fm4/brs1-fm4-excitatory-inhibitory-balance-gaba-glutamate-regulation.mdx",
);
const BIB = path.join(root, "static/bibtex/BRAIN-diet.bib");
const BRS2_FM1 = path.join(
  root,
  "docs/biological-targets/brs2/fm1/brs2-fm1-methylation-cycle-efficiency.mdx",
);

function readPm8() {
  return matter(fs.readFileSync(PM8, "utf8"));
}

function readFindingsPms() {
  return listMechanismMdxFiles(root, "pm")
    .map((file) => ({ file, ...matter(fs.readFileSync(file, "utf8")) }))
    .filter(({ data }) => hasScientificFindings(data));
}

test("every Findings-owned PM satisfies the shared canonical model and freshness gate", () => {
  const pages = readFindingsPms();
  assert.ok(pages.length > 0, "expected at least one Findings-owned PM");
  const gate = checkScientificFindings(root);
  assert.deepEqual(gate.issues, []);

  for (const { file, data, content } of pages) {
    const label = data.pm_id || path.relative(root, file);
    assert.deepEqual(validateScientificFindings(data, [], { entityLabel: label }), []);
    if (detectPmLayout(content) === PM_LAYOUT_CANONICAL) {
      const major = [...content.matchAll(/^## (\d+)\. (.+)$/gm)].map((m) => `${m[1]} ${m[2]}`);
      assert.deepEqual(
        major,
        [
          "1 Mission & Overview",
          "2 Primary Biological Effects",
          "3 Levers",
          "4 Mechanistic Basis",
          "5 Phenome Connections",
          "6 BRS Pathways and Connections",
          "7 Scoreable Inputs & Modulation Signals",
          "8 References",
        ],
        `${label} canonical section order`,
      );
    }
    for (const finding of data.scientific_findings) {
      assert.equal(
        finding.synthesised_evidence_confidence,
        SEC_NOT_YET_SCORED,
        `${label} ${finding.id}`,
      );
      if (!String(finding.id).includes("-IC")) {
        assert.ok(String(finding.finding_label || "").trim(), `${label} ${finding.id} needs a label`);
      }
      for (const item of finding.evidence_considered || []) {
        if (!item.assessment) continue;
        for (const field of [
          "study",
          "population",
          "result",
          "effect_magnitude",
          "evidence_summary",
          "limitations",
        ]) {
          assert.ok(String(item.assessment[field] || "").trim(), `${label} ${finding.id} ISA.${field}`);
        }
      }
    }

    const byId = findingsById(data);
    for (const rel of data.phenome_relationships || []) {
      assert.ok(
        Array.isArray(rel.scientific_findings),
        `${label} ${rel.target_phenome} must reference Finding ids`,
      );
      assert.ok(
        rel.scientific_findings.every((id) => typeof id === "string" && byId.has(id)),
        `${label} ${rel.target_phenome} must reference declared Findings by id`,
      );
      const primary = renderRelationshipPrimaryFindings(rel, data);
      if (primary) {
        assert.ok(
          content.includes(primary),
          `${label} ${rel.target_phenome} generated primary Finding block is stale`,
        );
      }
    }
  }
});

test("FM roll-up has no declaration-order fallback", () => {
  assert.deepEqual(
    rollUpFindings([
      { id: "PM99-F1", presentation: "mechanistic-basis" },
      { id: "PM99-F2", presentation: "phenome-relationship" },
    ]),
    [],
  );
  assert.deepEqual(
    rollUpFindings([
      { id: "PM99-F1", presentation: "mechanistic-basis", fm_rollup: true },
      { id: "PM99-F2", presentation: "phenome-relationship" },
    ]).map((finding) => finding.id),
    ["PM99-F1"],
  );
});

test("FM roll-up represents later child PMs before taking sibling extras", () => {
  const { data, content } = matter(fs.readFileSync(BRS2_FM1, "utf8"));
  const block = buildFmEvidenceHighlightsBlock(data, content, root);
  assert.ok(
    block.includes("MAT converts methionine and ATP into SAMe"),
    "explicitly selected PM3 Finding must survive the four-entry FM cap",
  );
});

test("legacy evidence generator cannot overwrite any Findings-owned PM", () => {
  const result = spawnSync(
    process.execPath,
    ["scripts/populate-pm-evidence-highlights.mjs", "--brs", "BRS1", "--force", "--dry-run"],
    { cwd: root, encoding: "utf8" },
  );
  assert.equal(result.status, 0, result.stderr);
  assert.match(
    result.stdout,
    /skip \(Scientific Findings own §5\.1 — use npm run findings:sync\): BRS1-FM4-PM8/,
  );
});

test("legacy phenome generator cannot overwrite any Findings-owned PM", () => {
  const result = spawnSync(
    process.execPath,
    ["scripts/populate-pm-phenome-relationships.mjs", "--brs", "BRS2", "--force", "--dry-run"],
    { cwd: root, encoding: "utf8" },
  );
  assert.equal(result.status, 0, result.stderr);
  assert.match(
    result.stdout,
    /skip \(Scientific Findings own phenome relationships\): BRS2-FM1-PM3/,
  );
});

test("PM8 Scientific Findings satisfy the canonical model", () => {
  const { data } = readPm8();
  const issues = validateScientificFindings(data, [], { entityLabel: "BRS1-FM4-PM8" });
  assert.deepEqual(
    issues.map((i) => `${i.code}: ${i.message}`),
    [],
  );
});

test("Synthesised Evidence Confidence remains unscored", () => {
  const { data } = readPm8();
  for (const finding of data.scientific_findings) {
    assert.equal(finding.synthesised_evidence_confidence, SEC_NOT_YET_SCORED, finding.id);
  }
});

test("Findings are referenced by relationships, never duplicated into them", () => {
  const { data } = readPm8();
  const byId = findingsById(data);
  const informs = findingInformsIndex(data);

  for (const rel of data.phenome_relationships) {
    assert.ok(Array.isArray(rel.scientific_findings), `${rel.target_phenome} must reference Findings`);
    for (const id of rel.scientific_findings) {
      assert.ok(byId.has(id), `${rel.target_phenome} references unknown ${id}`);
    }
    for (const entry of rel.scientific_findings) {
      assert.equal(typeof entry, "string", `${rel.target_phenome} must reference by id`);
    }
  }

  const reused = [...informs.values()].filter((list) => list.length > 1);
  assert.ok(reused.length > 0, "expected at least one Finding reused across relationships");

  const orphan = data.scientific_findings.filter((f) => !informs.has(f.id));
  assert.equal(orphan.length, 0, "PM8 Findings should all be referenced by a relationship");
});

test("§4.1 body is generated from front matter and is fresh", () => {
  const { data, content } = readPm8();
  const match = content.match(/^### (\d+)\.1 Scientific Findings\s*$/m);
  assert.ok(match, "PM8 must expose ### 4.1 Scientific Findings");
  assert.equal(match[1], "4", "Findings live under §4 Mechanistic Basis in the canonical order");
  const mech = mechanisticFindings(data);
  assert.equal(mech.length, 2, "§4.1 headline mechanistic Findings must be exactly PM8-F1 and PM8-F2");
  assert.deepEqual(
    mech.map((f) => f.id),
    ["PM8-F1", "PM8-F2"],
  );
  const interpretive = interpretiveConstraintFindings(data);
  assert.equal(interpretive.length, 1);
  assert.equal(interpretive[0].id, "PM8-IC1");

  const block = renderScientificFindingsSection(data, {
    sectionNum: parseInt(match[1], 10),
    subNum: 1,
    intro: String(data.scientific_findings_intro || "").trim() || undefined,
  });
  const section41 = content.slice(content.indexOf("### 4.1 Scientific Findings"), content.indexOf("## 5. "));
  for (const finding of mech) {
    assert.ok(section41.includes(`"id":"${finding.id}"`), `${finding.id} missing from §4.1 body`);
  }
  assert.ok(
    !section41.includes('"id":"PM8-IC1"'),
    "PM8-IC1 must not render in §4.1 (interpretive constraints render at point of inference in §5)",
  );
  assert.ok(
    !section41.includes("Evidence interpretation constraints"),
    "§4.1 must not expose a generic Evidence interpretation constraints heading",
  );
  assert.ok(!section41.includes('"id":"PM8-F3"'), "phenome Findings must not render in §4.1");
  for (const finding of data.scientific_findings) {
    if (finding.presentation === "phenome-relationship") {
      assert.ok(!section41.includes(`"id":"${finding.id}"`), `${finding.id} must not render in §4.1`);
    }
  }
  assert.equal(block.match(/<ScientificFinding /g).length, mech.length);
  const section5 = content.slice(content.indexOf("## 5. Phenome Connections"), content.indexOf("## 6. "));
  assert.ok(
    !section5.includes('"id":"PM8-IC1"'),
    "PM8-IC1 must not render as a visible Finding block in §5",
  );
  assert.ok(!content.includes('"id":"SF-PM8-3"'), "demoted SF-PM8-3 must not remain a standalone Finding");
  assert.ok(!/SF-PM8-\d/.test(content), "legacy SF-PM8 ids must not remain in PM8 body");
});

test("retracted PM8 evidence cannot be reintroduced by the legacy seed", () => {
  assert.equal(
    BRS1_PM_EVIDENCE["brs1-fm4-pm8-gaba-synthesis-capacity"],
    undefined,
    "PM8 must not carry a legacy evidence-highlights seed",
  );
  const { content } = readPm8();
  assert.ok(!/Magnesium and neuronal excitability/.test(content));
  assert.ok(!/PLP-dependent glutamate decarboxylase context/.test(content));
});

test("magnesium is removed from PM8's synthesis boundary", () => {
  const { data, content } = readPm8();
  assert.ok(!(data.cofactors || []).some((c) => /magnesium/i.test(c)), "cofactors must not list magnesium");
  assert.ok(!/magnesium/i.test(String(data.dose_sensitivity || "")));
  const levers = content.slice(content.indexOf("3.1 Dietary Requirements"), content.indexOf("## 4. "));
  assert.ok(!/Magnesium ←/.test(levers), "§3 must not present magnesium as a PM8 dietary entry");
});

test("FM4 roll-up no longer displays retracted PM8 evidence", () => {
  const fm4 = fs.readFileSync(FM4, "utf8");
  const section = fm4.slice(fm4.indexOf("### 4.4 Evidence Highlights"), fm4.indexOf("## 5. "));
  assert.ok(!/Magnesium and neuronal excitability/.test(section));
  assert.ok(!/cataldo_comprehensive_2024/.test(section));
});

test("phase-3 snapshot covers every live PM8 relationship", () => {
  const { data } = readPm8();
  const snapshot = (BRS1_PM_PHASE3_SCORES["BRS1-FM4-PM8"] || []).map((r) => r.phenome);
  for (const rel of data.phenome_relationships) {
    assert.ok(
      snapshot.includes(rel.target_phenome),
      `re-running the phase-3 migration would drop ${rel.target_phenome}`,
    );
  }
});

test("every Finding citation key resolves in the durable bibliography", () => {
  const bib = fs.readFileSync(BIB, "utf8");
  const { data } = readPm8();
  const keys = new Set();
  for (const finding of data.scientific_findings) {
    for (const item of finding.evidence_considered || []) {
      if (item.citation_key) keys.add(item.citation_key);
    }
    for (const item of finding.connected_supportive_evidence || []) {
      if (item.citation_key) keys.add(item.citation_key);
    }
  }
  assert.ok(keys.size > 0);
  for (const key of keys) {
    assert.ok(bib.includes(`{${key},`), `missing BibTeX entry for ${key}`);
  }
});

test("PM8 uses the canonical section order", () => {
  const { content } = readPm8();
  assert.equal(detectPmLayout(content), PM_LAYOUT_CANONICAL);
  const { levers, mechanisticBasis, phenome, findingsSection } = pmSectionNumbers(content);
  assert.deepEqual({ levers, mechanisticBasis, phenome }, { levers: 3, mechanisticBasis: 4, phenome: 5 });
  assert.equal(findingsSection, "4.1");
  const order = [...content.matchAll(/^## (\d+)\. (.+)$/gm)].map((m) => `${m[1]} ${m[2]}`);
  assert.deepEqual(order, [
    "1. Mission & Overview".replace(". ", " "),
    "2 Primary Biological Effects",
    "3 Levers",
    "4 Mechanistic Basis",
    "5 Phenome Connections",
    "6 BRS Pathways and Connections",
    "7 Scoreable Inputs & Modulation Signals",
    "8 References",
  ]);
});

test("a study may be primary evidence in several Findings when the reuse is declared", () => {
  const shared = (dependency) => ({
    scientific_findings: ["PM99-F1", "PM99-F2"].map((id, i) => ({
      id,
      finding_label: `label ${id}`,
      finding_statement: `statement ${id}`,
      synthesised_evidence_confidence: SEC_NOT_YET_SCORED,
      synthesis: `synthesis ${id}`,
      synthesis_limitations: [`limitation ${id}`],
      evidence_dependency: i === 1 ? dependency : [],
      evidence_considered: [
        {
          label: "Shared et al. (2020)",
          citation_key: "shared_study_2020",
          directional_finding: "increase",
          evidence_source: "repository-inherited",
          data_level: "Human Study",
          assessment: Object.fromEntries(
            ["study", "population", "result", "effect_magnitude", "evidence_summary", "limitations"].map(
              (f) => [f, `${f} text`],
            ),
          ),
        },
      ],
    })),
  });

  const undeclared = validateScientificFindings(shared([]), [], { entityLabel: "FIXTURE" });
  assert.ok(
    undeclared.some((i) => i.code === "shared_evidence_undeclared"),
    "undeclared reuse of a study across Findings must be flagged",
  );

  const declared = validateScientificFindings(
    shared(["Shares Shared et al. (2020) with PM99-F1, so the two are not independent replication."]),
    [],
    { entityLabel: "FIXTURE" },
  );
  assert.deepEqual(declared.map((i) => i.code), [], "declared reuse must pass");

  const { data } = readPm8();
  assert.deepEqual(
    validateScientificFindings(data, [], { entityLabel: "BRS1-FM4-PM8" }).map((i) => i.code),
    [],
  );
});

test("§5 renders relationship Findings as supporting evidence without IC or Related Findings", () => {
  const { data, content } = readPm8();
  const byId = findingsById(data);
  const section4 = content.slice(content.indexOf("### 4.1 Scientific Findings"), content.indexOf("## 5. Phenome Connections"));
  const section5 = content.slice(content.indexOf("## 5. Phenome Connections"), content.indexOf("## 6. "));
  for (const rel of data.phenome_relationships) {
    for (const id of rel.scientific_findings) {
      const finding = byId.get(id);
      if (isPrimaryPhenomeFinding(finding, rel.target_phenome)) {
        assert.ok(
          section5.includes(`"id":"${id}"`),
          `${id} must render in full under ${rel.target_phenome}`,
        );
      }
    }
  }
  const emotionalPanel = section5.slice(
    section5.indexOf("Emotional Regulation — modulates"),
    section5.indexOf("Sleep / Calming Tone — modulates"),
  );
  assert.ok(emotionalPanel.includes("**Supporting evidence**"));
  assert.ok(emotionalPanel.includes('"finding_label":"ADHD GABA levels vary by age and brain region"'));
  assert.ok(emotionalPanel.includes('"finding_label":"Anterior cingulate GABA correlates with impulsivity and aggression"'));
  assert.ok(!emotionalPanel.includes('"id":"PM8-IC1"'));
  assert.ok(!emotionalPanel.includes("Related Scientific Findings"));
  assert.ok(!/Triangulated|Interpretive Constraint|PM8-IC1/i.test(emotionalPanel));
  assert.ok(emotionalPanel.includes("#pm-ref-6"));
  assert.ok(emotionalPanel.includes("#pm-ref-19"));
  assert.ok(
    !emotionalPanel.includes('"finding_label":"High-dose vitamin B6 reduced anxiety — without measuring GABA"'),
  );
  assert.ok(!section4.includes("##### Finding PM8-"));
  assert.ok(section4.includes('<ScientificFinding finding={{"id":"PM8-F1"'));
  const panels = section5.slice(section5.indexOf("brs-fm-hub-item"));
  assert.ok(!/\*\*Key References:\*\*/.test(panels));
  assert.ok(/\*\*Evidence Confidence:\*\*/.test(panels), "§5 rows must show Evidence Confidence");
  assert.ok(
    /\*\*Biology → Phenome Relationship Strength:\*\*/.test(panels),
    "§5 rows must show Biology → Phenome Relationship Strength",
  );
  for (const rel of data.phenome_relationships) {
    assert.ok(Array.isArray(rel.references) && rel.references.length > 0, `${rel.target_phenome} keeps its references`);
    assert.ok(rel.evidence_confidence, `${rel.target_phenome} keeps its legacy evidence_confidence`);
    assert.ok(rel.confidence, `${rel.target_phenome} keeps relationship strength (confidence field)`);
  }

  const adjudicationLeak = /Triangulated|framework-supplied|Interpretive Constraint|PM8-IC1|Related Scientific Findings/i;
  for (const rel of data.phenome_relationships) {
    const start = section5.indexOf(`${rel.target_phenome} —`);
    assert.ok(start >= 0, `${rel.target_phenome} panel missing`);
    const end = section5.indexOf("\n<div class=\"brs-fm-hub-item\"", start + 1);
    const panel = section5.slice(start, end === -1 ? undefined : end);
    assert.ok(!adjudicationLeak.test(panel), `${rel.target_phenome} must not expose adjudication plumbing`);
    assert.ok(!panel.includes('"id":"PM8-IC1"'), `${rel.target_phenome} must not render PM8-IC1`);
    assert.ok(!panel.includes('"id":"PM8-F1"'), `${rel.target_phenome} must not render mechanistic PM8-F1 in §5`);
  }
});

test("Abedrabbo evidence is preserved under PM8-F1 as connected supportive evidence", () => {
  const { data } = readPm8();
  const f1 = data.scientific_findings.find((f) => f.id === "PM8-F1");
  const abedrabbo = (f1.connected_supportive_evidence || []).find(
    (item) => item.citation_key === "abedrabbo_classical_2026",
  );
  assert.ok(abedrabbo, "Abedrabbo et al. (2026) must survive under PM8-F1");
  assert.ok(/ALDH7A1|pyridoxine-dependent epilepsy/i.test(abedrabbo.why_relevant));
  assert.ok(/ordinary dietary|seizure control|GAD alone/i.test(abedrabbo.why_excluded));
});

test("FM roll-up selection is explicit, not declaration order", () => {
  const { data } = readPm8();
  const rolled = rollUpFindings(data.scientific_findings);
  const ids = rolled.map((f) => f.id);
  assert.ok(!ids.includes("PM8-IC1"), "interpretive constraints must not roll up as FM reader-facing highlights");
  assert.ok(ids.includes("PM8-F1"), "PM8-F1 must roll up to FM4");
  assert.ok(rolled.every((f) => f.fm_rollup === true), "roll-up must be flag-driven");
  assert.ok(ids.length < data.scientific_findings.length, "roll-up must be a selection");

  const fm4 = fs.readFileSync(FM4, "utf8");
  const section = fm4.slice(fm4.indexOf("### 4.4 Evidence Highlights"), fm4.indexOf("## 5. "));
  for (const finding of rolled) {
    assert.ok(
      section.includes(finding.finding_label || finding.id),
      `${finding.id} must appear in the FM4 roll-up by label`,
    );
    assert.ok(
      !section.includes(finding.finding_statement),
      `${finding.id} must not reproduce its Finding Statement at FM level`,
    );
  }
});

test("every Finding carries a compact label for reference rendering", () => {
  const { data } = readPm8();
  for (const finding of data.scientific_findings) {
    const label = String(finding.finding_label || "").trim();
    assert.ok(label, `${finding.id} needs a finding_label`);
    assert.ok(label.length < 70, `${finding.id} label must stay compact`);
  }
});

test("every Evidence Considered item carries a complete Individual Study Assessment", () => {
  const { data } = readPm8();
  for (const finding of data.scientific_findings) {
    for (const item of finding.evidence_considered || []) {
      assert.ok(item.assessment, `${finding.id} → ${item.label} needs an ISA`);
      for (const field of ["study", "population", "result", "effect_magnitude", "evidence_summary", "limitations"]) {
        assert.ok(String(item.assessment[field] || "").trim(), `${finding.id} → ${item.label} ISA.${field}`);
      }
    }
  }
});

test("PM reference numbers are stable by citation_key", () => {
  const { data, content } = readPm8();
  const index = buildPmReferenceKeyIndex(data.references || []);
  assert.equal(index.get("mason_decrease_2001"), 6);
  assert.equal(index.get("manor_rate_1996"), 19);
  assert.equal(
    expandPmCitationMarkers("rate{{cite:mason_decrease_2001,manor_rate_1996}}.", index),
    "rate [[6](#pm-ref-6), [19](#pm-ref-19)].",
  );
  assert.equal(formatPmCitationCluster(["mason_decrease_2001"], index), "[6](#pm-ref-6)");
  assert.ok(content.includes('id="pm-ref-6"'));
  assert.ok(content.includes("mason_decrease_2001"));
});

test("PM8 phenome Finding ids follow consecutive F sequence in presentation order", () => {
  const { data } = readPm8();
  const phenomeIds = data.scientific_findings
    .filter((f) => f.presentation === "phenome-relationship")
    .map((f) => f.id);
  assert.deepEqual(phenomeIds, ["PM8-F3", "PM8-F4", "PM8-F5", "PM8-F6", "PM8-F7"]);
});
