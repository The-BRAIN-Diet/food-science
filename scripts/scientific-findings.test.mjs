import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  findingInformsIndex,
  findingsById,
  isPrimaryPhenomeFinding,
  mechanisticFindings,
  renderRelationshipFindingsLine,
  renderScientificFindingsSection,
  rollUpFindings,
  SEC_NOT_YET_SCORED,
  validateScientificFindings,
} from "./lib/scientific-findings.mjs";
import { detectPmLayout, PM_LAYOUT_CANONICAL, pmSectionNumbers } from "./lib/pm-section-layout.mjs";
import { BRS1_PM_PHASE3_SCORES } from "./data/brs1-phase3-phenome-scores.mjs";
import { BRS1_PM_EVIDENCE } from "./lib/pm-evidence-highlights.mjs";

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

function readPm8() {
  return matter(fs.readFileSync(PM8, "utf8"));
}

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
    // A relationship must reference Finding ids only — never inline a Finding body.
    for (const entry of rel.scientific_findings) {
      assert.equal(typeof entry, "string", `${rel.target_phenome} must reference by id`);
    }
  }

  // Reuse is real: at least one Finding informs more than one relationship.
  const reused = [...informs.values()].filter((list) => list.length > 1);
  assert.ok(reused.length > 0, "expected at least one Finding reused across relationships");

  // Every live Finding on PM8 informs at least one relationship after reorg.
  const orphan = data.scientific_findings.filter((f) => !informs.has(f.id));
  assert.equal(orphan.length, 0, "PM8 Findings should all be referenced by a relationship");
});

test("§4.1 body is generated from front matter and is fresh", () => {
  const { data, content } = readPm8();
  const match = content.match(/^### (\d+)\.1 Scientific Findings\s*$/m);
  assert.ok(match, "PM8 must expose ### 4.1 Scientific Findings");
  assert.equal(match[1], "4", "Findings live under §4 Mechanistic Basis in the canonical order");
  const mech = mechanisticFindings(data);
  const block = renderScientificFindingsSection(data, {
    sectionNum: parseInt(match[1], 10),
    subNum: 1,
    intro: String(data.scientific_findings_intro || "").trim() || undefined,
  });
  const section41 = content.slice(content.indexOf("### 4.1 Scientific Findings"), content.indexOf("## 5. "));
  for (const finding of mech) {
    assert.ok(section41.includes(`"id":"${finding.id}"`), `${finding.id} missing from §4.1 body`);
  }
  for (const finding of data.scientific_findings) {
    if (finding.presentation === "phenome-relationship") {
      assert.ok(
        !section41.includes(`##### Finding ${finding.id}`),
        `${finding.id} must not render in §4.1`,
      );
    }
  }
  assert.equal(block.match(/<ScientificFinding /g).length, mech.length);
  assert.ok(!content.includes('"id":"SF-PM8-3"'), "demoted SF-PM8-3 must not remain a standalone Finding");
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
  const levers = content.slice(content.indexOf("3.1 Dietary Levers"), content.indexOf("## 4. "));
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
  // Cleanup A: sharing a study across Findings is legitimate — one study can bear on
  // more than one proposition. What must not happen is reuse reading as independent
  // replication, so the rule is now "declare it under Evidence Dependency".
  const shared = (dependency) => ({
    scientific_findings: ["SF-PMX-1", "SF-PMX-2"].map((id, i) => ({
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
    shared([
      "Shares Shared et al. (2020) with SF-PMX-1, so the two are not independent replication.",
    ]),
    [],
    { entityLabel: "FIXTURE" },
  );
  assert.deepEqual(declared.map((i) => i.code), [], "declared reuse must pass");

  // And the real page passes under the relaxed rule.
  const { data } = readPm8();
  assert.deepEqual(
    validateScientificFindings(data, [], { entityLabel: "BRS1-FM4-PM8" }).map((i) => i.code),
    [],
  );
});

test("§5 renders primary relationship Findings and cross-references mechanistic context", () => {
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
  // Cross-referenced mechanistic Findings stay compact and link to §4.1 anchors.
  const emotional = data.phenome_relationships.find((r) => r.target_phenome === "Emotional Regulation");
  const crossLine = renderRelationshipFindingsLine(emotional, byId, {
    ids: emotional.scientific_findings.filter((id) => !isPrimaryPhenomeFinding(byId.get(id), emotional.target_phenome)),
  });
  assert.ok(crossLine.includes("[SF-PM8-1](#sf-pm8-1)"));
  assert.ok(content.includes(crossLine));
  assert.ok(section5.includes('"finding_label":"ADHD GABA levels vary by age and brain region"'));
  assert.ok(section5.includes('"finding_label":"High-dose vitamin B6 reduced anxiety — without measuring GABA"'));
  assert.ok(!section4.includes("##### Finding SF-PM8-"));
  assert.ok(!section4.includes("##### Vitamin B6 supports"));
  assert.ok(section4.includes('<ScientificFinding finding={{"id":"SF-PM8-1"'));
  const panels = section5.slice(section5.indexOf("brs-fm-hub-item"));
  assert.ok(!/\*\*Key References:\*\*/.test(panels));
  assert.ok(!/\*\*Evidence Confidence:\*\*/.test(panels));
  for (const rel of data.phenome_relationships) {
    assert.ok(Array.isArray(rel.references) && rel.references.length > 0, `${rel.target_phenome} keeps its references`);
    assert.ok(rel.evidence_confidence, `${rel.target_phenome} keeps its legacy evidence_confidence`);
    assert.ok(rel.confidence, `${rel.target_phenome} keeps Biology → Phenome Confidence`);
  }
});

test("SF-PM8-3 evidence is preserved under SF-PM8-1 as connected supportive evidence", () => {
  const { data } = readPm8();
  const f1 = data.scientific_findings.find((f) => f.id === "SF-PM8-1");
  const abedrabbo = (f1.connected_supportive_evidence || []).find(
    (item) => item.citation_key === "abedrabbo_classical_2026",
  );
  assert.ok(abedrabbo, "Abedrabbo et al. (2026) must survive under SF-PM8-1");
  assert.ok(/ALDH7A1|pyridoxine-dependent epilepsy/i.test(abedrabbo.why_relevant));
  assert.ok(/ordinary dietary|seizure control|GAD alone/i.test(abedrabbo.why_excluded));
});

test("FM roll-up selection is explicit, not declaration order", () => {
  const { data } = readPm8();
  const rolled = rollUpFindings(data.scientific_findings);
  const ids = rolled.map((f) => f.id);
  assert.ok(
    ids.includes("SF-PM8-4"),
    "the governing constraint (concentration is not synthesis rate) must reach the FM roll-up",
  );
  assert.ok(rolled.every((f) => f.fm_rollup === true), "roll-up must be flag-driven");
  assert.ok(ids.length < data.scientific_findings.length, "roll-up must be a selection");

  const fm4 = fs.readFileSync(FM4, "utf8");
  const section = fm4.slice(fm4.indexOf("### 4.4 Evidence Highlights"), fm4.indexOf("## 5. "));
  for (const finding of rolled) {
    assert.ok(section.includes(finding.id), `${finding.id} must appear in the FM4 roll-up`);
    // The FM shows a compact reference, not the full canonical record.
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
  const fields = ["study", "population", "result", "effect_magnitude", "evidence_summary", "limitations"];
  let count = 0;
  for (const finding of data.scientific_findings) {
    for (const item of finding.evidence_considered || []) {
      count++;
      assert.ok(item.assessment, `${finding.id} / ${item.label} needs an assessment`);
      for (const field of fields) {
        assert.ok(
          String(item.assessment[field] || "").trim(),
          `${finding.id} / ${item.label} missing ${field}`,
        );
      }
      assert.ok(item.evidence_source, `${finding.id} / ${item.label} needs an Evidence Source`);
      assert.ok(item.citation_key, `${finding.id} / ${item.label} needs a Reference`);
    }
  }
  assert.ok(count > 0);
});
