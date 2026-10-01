import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import matter from "gray-matter";
import { validatePmKcGovernance } from "./lib/kc-evidence-governance.mjs";

const ROOT = process.cwd();
const BRS_ROOT = path.join(ROOT, "docs/biological-targets");
const DOPAMINE_PATH = path.join(
  BRS_ROOT,
  "brs1/fm1/brs1-fm1-pm3-dopaminergic-signalling-regulation.mdx",
);

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute, files);
    else files.push(absolute);
  }
  return files;
}

function corePmFiles() {
  return walk(BRS_ROOT).filter((file) => {
    const relative = path.relative(BRS_ROOT, file);
    return /^brs[1-6]\/fm\d+\/brs[1-6]-fm\d+-pm\d+-.*\.mdx$/.test(relative);
  });
}

test("core framework and BRS1 PM totals reflect the dopamine insertion", () => {
  const files = corePmFiles();
  assert.equal(files.length, 52, "core BRS1–BRS6 total must be 52 PMs");
  assert.equal(
    files.filter((file) => path.relative(BRS_ROOT, file).startsWith("brs1/")).length,
    11,
    "BRS1 must contain 11 PMs",
  );
});

test("BRS1 PM filenames and qualified identifiers remain aligned", () => {
  for (const file of corePmFiles().filter((candidate) =>
    path.relative(BRS_ROOT, candidate).startsWith("brs1/"),
  )) {
    const filename = path.basename(file);
    const match = filename.match(/^brs1-fm(\d+)-pm(\d+)-/);
    assert.ok(match, `unrecognised BRS1 PM filename: ${filename}`);
    const { data } = matter(fs.readFileSync(file, "utf8"));
    assert.equal(data.pm_id, `BRS1-FM${match[1]}-PM${match[2]}`, filename);
  }
});

test("FM1 publishes five PMs in canonical order", () => {
  const fmPath = path.join(BRS_ROOT, "brs1/fm1/brs1-fm1-monoaminergic-function.mdx");
  const { data } = matter(fs.readFileSync(fmPath, "utf8"));
  assert.deepEqual(
    data.mechanisms_covered.map((item) => item.id),
    [
      "BRS1-FM1-PM1",
      "BRS1-FM1-PM2",
      "BRS1-FM1-PM3",
      "BRS1-FM1-PM4",
      "BRS1-FM1-PM5",
    ],
  );
});

test("there is one canonical Stage 2A dopamine PM with bounded evidence", () => {
  const dopamineFiles = corePmFiles().filter((file) => {
    const { data } = matter(fs.readFileSync(file, "utf8"));
    return data.pm_id === "BRS1-FM1-PM3" || /Dopaminergic Signalling Regulation/.test(data.title);
  });
  assert.deepEqual(dopamineFiles, [DOPAMINE_PATH]);

  const { data, content } = matter(fs.readFileSync(DOPAMINE_PATH, "utf8"));
  assert.equal(data.evidence_status, "stage-2b-dietary-addressability");
  assert.equal(data.mechanistic_authoring_required, false);
  assert.equal(data.dietary_addressability, "not-established");
  assert.equal(data.claim_ceiling, "biological-dependency");
  assert.equal(data.scientific_findings.length, 11);
  assert.deepEqual(
    data.scientific_findings.map((finding) => finding.id),
    [
      "PM3-F1",
      "PM3-F2",
      "PM3-F3",
      "PM3-F4",
      "PM3-F5",
      "PM3-F6",
      "PM3-F7",
      "PM3-F8",
      "PM3-F9",
      "PM3-F10",
      "PM3-F11",
    ],
  );
  assert.ok(data.phenome_relationships.length >= 3);
  assert.ok(data.references.length >= 11);
  assert.deepEqual(
    data.dietary_input_traceability.map((atom) => atom.atom_id),
    ["PM3-DIT-1", "PM3-DIT-2", "PM3-DIT-3", "PM3-DIT-5", "PM3-DIT-4"],
  );
  const byId = Object.fromEntries(
    data.dietary_lever_atoms.map((atom) => [atom.atom_id, atom]),
  );
  assert.equal(byId["PM3-DIT-1"].dietary_addressability, "not-established");
  assert.equal(byId["PM3-DIT-2"].dietary_addressability, "not-established");
  assert.equal(byId["PM3-DIT-3"].dietary_addressability, "precursor-mediated");
  assert.equal(byId["PM3-DIT-3"].claim_ceiling, "dietary-provision");
  assert.equal(byId["PM3-DIT-4"].relationship_layer, "biochemical-requirement");
  assert.equal(byId["PM3-DIT-5"].requirement_classification, "direct");
  assert.equal(byId["PM3-DIT-5"].relationship_mode, "capacity-requirement");
  assert.equal(byId["PM3-DIT-5"].claim_ceiling, "biological-dependency");
  assert.equal(byId["PM3-DIT-1"].relationship_mode, "capacity-requirement");
  assert.equal(byId["PM3-DIT-2"].relationship_mode, "capacity-requirement");
  assert.equal(byId["PM3-DIT-3"].relationship_mode, "capacity-requirement");
  assert.match(content, /- Tyrosine/);
  assert.match(content, /Tyrosine, iron and PLP are established biological dependencies/);
  assert.match(
    content,
    /Addresses the precursor pool supplying tyrosine for PM3’s dopamine-synthesis step/,
  );
  const tyrosine = data.dietary_input_traceability.find((atom) => atom.atom_id === "PM3-DIT-5");
  assert.equal(
    tyrosine?.biological_role,
    "Tyrosine is the substrate for conversion to L-DOPA in dopamine synthesis.",
  );
  assert.deepEqual(tyrosine?.upstream_pm_relationships, [
    {
      relationship_label: "Supply",
      pm_short_id: "PM1",
      pm_id: "BRS1-FM1-PM1",
      href: "/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation",
    },
  ]);
  const tyrosinePresentation = (data.dietary_lever_presentations || []).find(
    (row) => row.atom_id === "PM3-DIT-5",
  );
  assert.match(
    tyrosinePresentation?.reader_description,
    /Tyrosine is the starting material used to make dopamine/,
  );
  assert.doesNotMatch(
    `${tyrosine?.biological_role} ${tyrosinePresentation?.reader_description}`,
    /on this page|supply assessment is maintained|Local listing does not create/,
  );
  assert.equal(
    (content.split("### 5.3")[1] || "").match(
      /brs1-fm1-pm1-amino-acid-availability-and-prioritisation/g,
    )?.length,
    1,
  );
  assert.equal(
    (data.dietary_lever_presentations || []).some(
      (row) => row.atom_id === "PM3-DIT-1" && String(row.presentation_section) === "3.1.2",
    ),
    false,
  );
  assert.equal(
    (data.dietary_lever_presentations || []).some(
      (row) => row.atom_id === "PM3-DIT-2" && String(row.presentation_section) === "3.1.2",
    ),
    false,
  );
  assert.ok(
    data.dietary_lever_atoms.every(
      (atom) => !/Candidate for Dietary Levers review/.test(atom.permitted_wording || ""),
    ),
  );
  assert.deepEqual(
    data.scientific_findings
      .filter((finding) => finding.therapeutic_area_ids?.includes("TA001"))
      .map((finding) => finding.id),
    ["PM3-F6", "PM3-F7"],
  );
  assert.ok(data.candidate_cross_brs_relationships.length === 4);
  assert.ok(
    data.candidate_cross_brs_relationships.every(
      (relationship) => relationship.status === "constrained-dependency",
    ),
  );
  assert.deepEqual(
    data.system_optimisation_practices.map((relationship) => relationship.atom_id),
    ["PM3-SOP-1", "PM3-SOP-2", "PM3-SOP-3", "PM3-SOP-4"],
  );
  assert.deepEqual(
    [...new Set(data.system_optimisation_practices.map(
      (relationship) => relationship.optimisation_category,
    ))],
    ["food_prep", "dietary_protocols"],
  );
  assert.deepEqual(
    data.lifestyle_priorities.map((relationship) => relationship.atom_id),
    ["PM3-LP-1", "PM3-LP-2"],
  );
  for (const relationship of [
    ...data.system_optimisation_practices,
    ...data.lifestyle_priorities,
  ]) {
    assert.ok(relationship.input);
    assert.ok(relationship.input_type);
    assert.ok(relationship.biological_role);
    assert.ok(relationship.evidence_source.finding_ids.length);
    assert.ok(relationship.evidence_source.citation_keys.length);
    assert.ok(relationship.evidence_limitation);
  }
  assert.match(content, /### 4\.1 Scientific Findings/);
  const kcIssues = [];
  validatePmKcGovernance(data, kcIssues, { entityLabel: "BRS1-FM1-PM3" });
  assert.deepEqual(kcIssues, []);
  const kcRows = data.kc_applicability_adjudications || [];
  assert.equal(kcRows.filter((row) => row.kc_id === "BRS1(KC1)").length, 2);
  assert.ok(kcRows.some((row) => row.kc_id === "BRS2(KC1)"));
  assert.ok(kcRows.some((row) => row.kc_id === "BRS3(KC1)"));
  assert.equal(
    kcRows.every((row) => row.applicability_proposition && row.disposition !== "unassessed"),
    true,
  );
  const establishedKc = kcRows.filter((row) => row.disposition === "established");
  if (establishedKc.length) {
    assert.ok((data.pm_kc_relationships || []).length > 0);
    assert.match(content, /brs-kc-title-link/);
  } else {
    assert.equal((data.pm_kc_relationships || []).length, 0);
    assert.match(content, /No mapping established\./);
    assert.doesNotMatch(content, /brs-kc-title-link/);
  }
  assert.match(content, /- Tetrahydrobiopterin \(BH4\)/);
  assert.match(content, /ADHD does not show one uniform dopamine abnormality/);
  assert.equal(
    (content.match(/data-brs-sop-category=/g) || []).length,
    new Set(
      data.system_optimisation_practices.map(
        (relationship) => relationship.optimisation_category,
      ),
    ).size,
    "PM §3.2 must render only categories with substantive records",
  );
  assert.match(content, /data-brs-sop-category="food_prep"/);
  assert.match(content, /data-brs-sop-category="dietary_protocols"/);
  assert.doesNotMatch(content, /data-brs-sop-category="conditional_supplementation"/);
  assert.doesNotMatch(content, /data-brs-sop-category="light_circadian"/);
  assert.doesNotMatch(content, /data-brs-sop-category="stress_autonomic"/);
  assert.match(content, /Pair non-haem iron-containing meals with an ascorbic-acid source/);
  assert.match(
    content,
    /Use validated phytate-reducing preparation methods for high-phytate cereals/,
  );
  assert.match(content, /Acute voluntary cardiovascular exercise/);
  assert.match(content, /Avoid acute total sleep deprivation/);
  assert.match(content, /Short-term selective dietary-fat restriction in adults with obesity under controlled conditions/);
  assert.match(content, /Short-term very-low-calorie dieting in adults with obesity/);
  assert.ok(
    [...data.system_optimisation_practices, ...data.lifestyle_priorities].every(
      (relationship) =>
        relationship.evidence_limitation.split(/[.!?](?:\s|$)/).filter(Boolean).length <= 1 &&
        !/does not authorise/i.test(relationship.evidence_limitation),
    ),
  );
  assert.doesNotMatch(content, /uniform dopamine-deficiency disorder/i);
});

test("renumbered public routes retain aliases from their former canonical routes", () => {
  const config = fs.readFileSync(path.join(ROOT, "docusaurus.config.ts"), "utf8");
  const redirects = [
    [
      "brs1/fm1/brs1-fm1-pm3-noradrenergic-signalling-attention-executive-modulation",
      "brs1/fm1/brs1-fm1-pm4-noradrenergic-signalling-attention-executive-modulation",
    ],
    [
      "brs1/fm1/brs1-fm1-pm4-serotonergic-signalling-regulation",
      "brs1/fm1/brs1-fm1-pm5-serotonergic-signalling-regulation",
    ],
    [
      "brs1/fm2/brs1-fm2-pm5-acetylcholine-synthesis-support",
      "brs1/fm2/brs1-fm2-pm6-acetylcholine-synthesis-support",
    ],
    [
      "brs1/fm3/brs1-fm3-pm6-neuronal-membrane-dha-incorporation",
      "brs1/fm3/brs1-fm3-pm7-neuronal-membrane-dha-incorporation",
    ],
    [
      "brs1/fm4/brs1-fm4-pm7-gaba-glutamate-neurotransmission-balance",
      "brs1/fm4/brs1-fm4-pm8-gaba-glutamate-neurotransmission-balance",
    ],
    [
      "brs1/fm4/brs1-fm4-pm8-gaba-synthesis-capacity",
      "brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity",
    ],
    [
      "brs1/fm4/brs1-fm4-pm9-glutamate-clearance-and-recycling",
      "brs1/fm4/brs1-fm4-pm10-glutamate-clearance-and-recycling",
    ],
    [
      "brs1/fm4/brs1-fm4-pm10-excitotoxicity-modulation",
      "brs1/fm4/brs1-fm4-pm11-excitotoxicity-modulation",
    ],
  ];

  for (const [from, to] of redirects) {
    const pair = `{ to: '/docs/biological-targets/${to}', from: '/docs/biological-targets/${from}' }`;
    assert.ok(config.includes(pair), `missing redirect: ${from} → ${to}`);
  }
});
