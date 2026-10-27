import * as foodTargetTraceability from '../src/lib/foodTargetTraceability.mjs';
import * as aggregateFoodComposition from '../src/lib/aggregateFoodComposition.mjs';

// These deliberately incomplete legacy structural fixtures are not scientific admissions.
function assertOnlyProspectiveReviewGaps(issues) {
  assert.ok(issues.some(i=>i.code==='input_admission_unresolved'));
  assert.ok(issues.every(i=>['input_admission_unresolved','input_food_target_research_missing'].includes(i.code)));
}
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Module, {createRequire} from 'node:module';
import ts from 'typescript';
import {load as parseHtml} from 'cheerio';
import * as foodSelection from '../src/data/inputSubstanceFoodSelection.mjs';
import {
  INPUT_TYPES,
  SYSTEM_OPTIMISATION_CATEGORIES,
} from "./lib/dietary-input-traceability.mjs";
import {
  REQUIREMENT_CLASSIFICATION,
  dietaryRequirementRemainsWithoutModulationEvidence,
  formatRequirementCompactQualifier,
  isDietaryRequirementAtom,
  isBiochemicalRequirementAtom,
  retainPmDietaryAtomsDespiteKcMembership,
  validateDietaryLeverAtoms,
} from "./lib/dietary-lever-atoms.mjs";
import {
  auditLegacyLeverGaps,
  pmKcConstituentRelationshipIsAdjudicated,
  resolveAllLeverAtoms,
  resolveLeverAtom,
} from "./lib/dietary-lever-atoms.mjs";
import { buildDietaryLeverDisclosureMap, dietaryLeverBulletKey } from "./lib/dietary-lever-disclosure.mjs";
import { buildInputSubstanceFood } from "./lib/input-substance-food.mjs";
import { substanceHrefForInput } from "./lib/substance-input-pages.mjs";
import { RETIRED_KC_HREFS, RETIRED_KC_IDS } from "./lib/kc-registry.mjs";

const PM9 = path.join(
  process.cwd(),
  "docs/biological-targets/brs1/fm4/brs1-fm4-pm9-gaba-synthesis-capacity.mdx",
);
const PM3 = path.join(
  process.cwd(),
  "docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis.mdx",
);
const DOPAMINE_PM3 = path.join(
  process.cwd(),
  "docs/biological-targets/brs1/fm1/brs1-fm1-pm3-dopaminergic-signalling-regulation.mdx",
);
const NAD_PM2 = path.join(
  process.cwd(),
  "docs/biological-targets/brs4/fm1/brs4-fm1-pm2-nad-metabolism.mdx",
);
const BRS5_PM1 = path.join(
  process.cwd(),
  "docs/biological-targets/brs5/fm1/brs5-fm1-pm1-gut-barrier-tight-junction-integrity.mdx",
);
const BRS5_KC1 = path.join(
  process.cwd(),
  "docs/biological-targets/brs5/kc/brs5-kc1-fermentable-fibre-availability.mdx",
);
const BRS2_KC1 = path.join(
  process.cwd(),
  "docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool.mdx",
);
const DOC_ITEM_CONTENT = path.join(
  process.cwd(),
  "src/theme/DocItem/Content/index.tsx",
);
const PM_LEVER_ENHANCER = path.join(
  process.cwd(),
  "src/components/PmDietaryLeverEnhancer.tsx",
);
const PM_INPUT_FOOD_DISCLOSURE = path.join(
  process.cwd(),
  "src/lib/pmInputFoodDisclosure.ts",
);

function readPm8() {
  return matter(fs.readFileSync(PM9, "utf8"));
}

function readPm3() {
  return matter(fs.readFileSync(PM3, "utf8"));
}

function readDopaminePm3() {
  return matter(fs.readFileSync(DOPAMINE_PM3, "utf8"));
}

function readNadPm2() {
  return matter(fs.readFileSync(NAD_PM2, "utf8"));
}

function readBrs5Pm1() {
  return matter(fs.readFileSync(BRS5_PM1, "utf8"));
}

function readBrs5Kc1() {
  return matter(fs.readFileSync(BRS5_KC1, "utf8"));
}

function readBrs2Kc1() {
  return matter(fs.readFileSync(BRS2_KC1, "utf8"));
}

function assertDisclosureDescriptor(data, label, section, descriptor, atomId) {
  const disclosure = buildDietaryLeverDisclosureMap(data).get(dietaryLeverBulletKey(label, "", section));
  assert.ok(disclosure, `${label} disclosure`);
  assert.equal(disclosure.atomId, atomId);
  assert.equal(disclosure.shortDescriptor, descriptor);
  assert.equal(disclosure.biologicalRole.includes(descriptor), false);
  assert.equal(disclosure.readerDescription.includes(descriptor), false);
}

test("PM reader mounts the atomic Dietary Requirement projection enhancer", () => {
  const source = fs.readFileSync(DOC_ITEM_CONTENT, "utf8");
  assert.match(
    source,
    /<PmDietaryLeverEnhancer\s+frontMatter=\{frontMatter as Record<string, unknown>\}\s*\/>/,
  );
});

test("PM lever references render canonical author-year plus linked square-bracket numbers", () => {
  const source = fs.readFileSync(PM_LEVER_ENHANCER, "utf8");
  assert.match(source, /escapeHtml\(authorYear\)/);
  assert.match(source, />\[\$\{number\}\]<\/a>/);
  assert.doesNotMatch(source, /finding_ids|citation_keys|atom_id/);
  assert.doesNotMatch(
    source,
    /brs-dietary-lever-detail-title/,
    "the trigger label must not be repeated as a second panel title before Input",
  );
});

test("System Optimisation Practices and Lifestyle Priorities use the shared six-atom contract", () => {
  const fixture = {
    references: [
      "[Example et al. (2026)](/docs/papers/BRAIN-Diet-References#example_2026)",
      "[Greiner & Konietzny (1999)](/docs/papers/BRAIN-Diet-References#greiner_1999)",
    ],
    scientific_findings: [{ id: "PMX-F1" }],
    system_optimisation_practices: [
      {
        atom_id: "PMX-SOP-1",
        optimisation_category: "food_prep",
        input: "Gentle steaming",
        input_type: "food preparation/delivery practice",
        dietary_input: true,
        dietary_input_note: "Food preparation is the dietary component of this SOP record.",
        biological_role: "Preserves the evidence-supported input during preparation",
        evidence_source: {
          finding_ids: ["PMX-F1"],
          citation_keys: ["example_2026"],
        },
        evidence_limitation: "No comparative clinical outcome was established.",
      },
    ],
    lifestyle_priorities: [
      {
        atom_id: "PMX-LP-1",
        input: "Regular physical activity",
        input_type: "lifestyle practice",
        dietary_input: false,
        dietary_input_note: "Lifestyle practice; no dietary input relationship is admitted for this record.",
        biological_role: "Supports the PM process represented by the linked Finding",
        evidence_source: {
          finding_ids: ["PMX-F1"],
          citation_keys: ["greiner_1999"],
        },
        evidence_limitation: "The Finding does not establish an optimal programme.",
      },
    ],
  };
  const issues = [];
  validateDietaryLeverAtoms(fixture, issues, { entityLabel: "PMX" });
  assert.deepEqual(issues, []);

  const disclosures = buildDietaryLeverDisclosureMap(fixture);
  assert.equal(
    disclosures.get(dietaryLeverBulletKey("Gentle steaming", "", "3.2"))
      ?.evidenceReferences[0]?.number,
    1,
  );
  assert.equal(
    disclosures.get(dietaryLeverBulletKey("Gentle steaming", "", "3.2"))
      ?.dietaryInput,
    true,
  );
  assert.equal(
    disclosures.get(dietaryLeverBulletKey("Gentle steaming", "", "3.2"))
      ?.evidenceReferences[0]?.authorYear,
    "Example et al. (2026)",
  );
  assert.equal(
    disclosures.get(dietaryLeverBulletKey("Regular physical activity", "", "3.3"))
      ?.evidenceReferences[0]?.number,
    2,
  );
  assert.equal(
    disclosures.get(dietaryLeverBulletKey("Regular physical activity", "", "3.3"))
      ?.dietaryInput,
    false,
  );
  assert.equal(
    disclosures.get(dietaryLeverBulletKey("Regular physical activity", "", "3.3"))
      ?.evidenceReferences[0]?.authorYear,
    "Greiner and Konietzny (1999)",
  );

  for (const field of [
    "input",
    "input_type",
    "biological_role",
    "evidence_source",
    "evidence_limitation",
  ]) {
    const invalid = structuredClone(fixture);
    delete invalid.system_optimisation_practices[0][field];
    const invalidIssues = [];
    validateDietaryLeverAtoms(invalid, invalidIssues, { entityLabel: `missing-${field}` });
    assert.ok(invalidIssues.length > 0, `${field} must be required`);
  }

  assert.deepEqual(
    [...SYSTEM_OPTIMISATION_CATEGORIES],
    [
      "food_prep",
      "conditional_supplementation",
      "dietary_protocols",
      "light_circadian",
      "stress_autonomic",
    ],
  );
  const missingCategory = structuredClone(fixture);
  delete missingCategory.system_optimisation_practices[0].optimisation_category;
  const missingCategoryIssues = [];
  validateDietaryLeverAtoms(missingCategory, missingCategoryIssues, {
    entityLabel: "missing-optimisation-category",
  });
  assert.ok(
    missingCategoryIssues.some((issue) => issue.code === "pm_sop_missing_category"),
  );
});

test("input types permit evidence-supported dietary granularity without a new atom", () => {
  assert.deepEqual(
    [
      "nutrient/substance",
      "nutrient/compound class",
      "food component",
      "food group",
      "dietary matrix",
      "dietary pattern",
      "preparation characteristic",
      "defined dietary exposure",
    ].filter((inputType) => !INPUT_TYPES.has(inputType)),
    [],
  );
  assert.equal(REQUIREMENT_CLASSIFICATION.has("food group"), false);
  assert.equal(REQUIREMENT_CLASSIFICATION.has("dietary pattern"), false);
  assert.equal(REQUIREMENT_CLASSIFICATION.has("defined dietary exposure"), false);
});

test("retired BRS5(KC3) resolves to independently adjudicated PM1 atoms", () => {
  const { data, content } = readBrs5Pm1();
  const issues = [];
  validateDietaryLeverAtoms(data, issues, { entityLabel: "BRS5-FM1-PM1" });
  assert.deepEqual(issues, []);

  assert.equal(RETIRED_KC_IDS.has("BRS5(KC3)"), true);
  assert.equal(
    RETIRED_KC_HREFS.has(
      "/docs/biological-targets/brs5/kc/brs5-kc3-barrier-supportive-nutrient-sufficiency",
    ),
    true,
  );
  assert.doesNotMatch(content, /BRS5\(KC3\)|brs5-kc3-barrier-supportive-nutrient-sufficiency/);

  const resolved = resolveAllLeverAtoms(data);
  assert.deepEqual(
    resolved.filter(isDietaryRequirementAtom).map((atom) => atom.input),
    [
      "Butyrate",
      "Fermentable dietary fibre",
      "Retinoic acid",
      "Vitamin A",
      "Zinc",
      "Glutamine",
    ],
  );
  assert.equal(resolved.some((atom) => /omega-3/i.test(atom.input)), false);
  assert.equal(
    formatRequirementCompactQualifier(resolveLeverAtom(data, { atom_id: "PM1-DIT-3" })),
    "Direct · Biochemical requirement",
  );
  assert.equal(
    formatRequirementCompactQualifier(resolveLeverAtom(data, { atom_id: "PM1-DIT-4" })),
    "Derived · Precursor → Retinoic acid",
  );
  assert.equal(
    formatRequirementCompactQualifier(resolveLeverAtom(data, { atom_id: "PM1-DIT-5" })),
    "Direct · Biochemical requirement",
  );
  assert.equal(
    formatRequirementCompactQualifier(resolveLeverAtom(data, { atom_id: "PM1-DIT-6" })),
    "Direct · Substrate",
  );
});

test("BRS5 KC1 and PM1 expose independent six-atom constituent relationships", () => {
  const pm = readBrs5Pm1();
  const kc = readBrs5Kc1();
  const pmMap = buildDietaryLeverDisclosureMap(pm.data);
  const kcMap = buildDietaryLeverDisclosureMap(kc.data);
  const labels = [
    {
      pm: "FOS/GOS",
      kc: "Inulin-type fructans and galacto-oligosaccharides",
    },
    { pm: "Pectin", kc: "Pectin" },
    { pm: "Resistant starch", kc: "Resistant starch" },
  ];

  assert.equal(kc.data.kc_evidence_review_status, "canonical");
  assert.equal(kc.data.kc_input_traceability.length, 3);
  for (const label of labels) {
    const pmDisclosure = pmMap.get(dietaryLeverBulletKey(label.pm, "", "3.1.3"));
    const kcDisclosure = kcMap.get(dietaryLeverBulletKey(label.kc, ""));
    assert.ok(pmDisclosure, `${label.pm} must resolve through a PM-owned atom`);
    assert.ok(kcDisclosure, `${label.kc} must resolve through a separate KC-owned atom`);
    assert.ok(pmDisclosure.biologicalRole);
    assert.ok(pmDisclosure.evidenceReferences.length);
    assert.ok(pmDisclosure.evidenceLimitation);
    assert.equal(pmDisclosure.compactQualifier, "");
    assert.ok(kcDisclosure.biologicalRole);
    assert.ok(kcDisclosure.evidenceReferences.every((reference) => reference.href));
    assert.ok(kcDisclosure.evidenceLimitation);
    assert.notEqual(pmDisclosure.biologicalRole, kcDisclosure.biologicalRole);
  }
});

test("BRS2 KC1 Emerging Biological Supports expose separate six-field disclosures", () => {
  const { data, content } = readBrs2Kc1();
  const map = buildDietaryLeverDisclosureMap(data);
  const expected = [
    [
      "same-directed-supplementation",
      "SAMe-directed supplementation",
      "S-adenosyl-L-methionine (SAMe) supplementation",
      5,
    ],
    [
      "creatine-methyl-demand-reduction",
      "Creatine supplementation as a methyl-demand modifier",
      "Creatine supplementation",
      2,
    ],
    [
      "riboflavin-mthfr-677tt",
      "Riboflavin for MTHFR 677TT-linked capacity",
      "Riboflavin supplementation in MTHFR 677TT",
      1,
    ],
  ];

  assert.equal(data.kc_emerging_support_traceability.length, 3);
  for (const [slug, label, input, evidenceCount] of expected) {
    const disclosure = map.get(
      dietaryLeverBulletKey(label, "", `kc-emerging-support:${slug}`),
    );
    assert.ok(disclosure, `${slug} must resolve through an emerging-support atom`);
    assert.equal(disclosure.title, input);
    assert.ok(disclosure.inputType);
    assert.ok(disclosure.biologicalRole);
    assert.equal(disclosure.evidenceReferences.length, evidenceCount);
    assert.ok(disclosure.evidenceReferences.every((reference) => reference.href));
    assert.ok(disclosure.evidenceLimitation);
  }
  assert.equal((content.match(/brs-emerging-support-title-trigger/g) || []).length, 3);
});

test("BRS2 KC1 Evidence Base titles expose constituent six-field disclosures", () => {
  const { data, content } = readBrs2Kc1();
  const map = buildDietaryLeverDisclosureMap(data);
  const expected = [
    ["Vitamin B9 (folate)", "Vitamin B9 (folate)"],
    ["Choline", "Choline"],
    ["Betaine (TMG)", "Betaine"],
  ];

  for (const [label, input] of expected) {
    const disclosure = map.get(dietaryLeverBulletKey(label, ""));
    assert.ok(disclosure, `${label} must resolve through a KC-owned constituent atom`);
    assert.equal(disclosure.title, input);
    assert.ok(disclosure.inputType);
    assert.ok(disclosure.biologicalRole);
    assert.ok(disclosure.evidenceReferences.length);
    assert.ok(disclosure.evidenceLimitation);
  }
  assert.equal((content.match(/data-brs-kc-evidence-resource=/g) || []).length, 3);
  assert.equal((content.match(/class="brs-evidence-title-trigger brs-fm-hub-title"/g) || []).length, 3);
});

test("PM9 lever atoms resolve six-atom currency from PM evidence", () => {
  const { data } = readPm8();
  const issues = [];
  validateDietaryLeverAtoms(data, issues, { entityLabel: "BRS1-FM4-PM9" });
  assert.deepEqual(issues, []);
  const resolved = resolveAllLeverAtoms(data);
  assert.equal(resolved.length, 3);
  for (const atom of resolved) {
    assert.ok(atom.input);
    assert.ok(atom.input_type);
    assert.ok(atom.biological_role);
    assert.ok(atom.evidence_source?.finding_ids?.length || atom.evidence_source?.citation_keys?.length);
    assert.ok(atom.evidence_limitation);
    assert.ok(atom.reference_numbers.length, `${atom.input} should map to PM reference numbers`);
  }
  const glutamate = resolveLeverAtom(data, { atom_id: "PM9-DIT-1" });
  assert.equal(glutamate.relationship_layer, "biochemical-requirement");
  assert.equal(glutamate.requirement_classification, null);
  const plp = resolveLeverAtom(data, { atom_id: "PM9-DIT-2" });
  assert.equal(plp.requirement_classification, "direct");
  assert.equal(plp.dietary_addressability, "not-established");
  const b6 = resolveLeverAtom(data, { atom_id: "PM9-DIT-3" });
  assert.equal(b6.input_type, "cofactor precursor");
  assert.equal(b6.requirement_classification, "derived");
  assert.equal(b6.derived_target, "PLP");
  assert.equal(b6.derived_target_atom_id, "PM9-DIT-2");
  assert.equal(b6.claim_ceiling, "dietary-provision");
  assert.ok(b6.reference_numbers.includes(2));
  assert.ok(b6.evidence_source.finding_ids.includes("PM9-F2"));
});

test("multi-role reappearance preserves distinct atoms", () => {
  const { data } = readPm8();
  const inputs = (data.dietary_input_traceability || []).map((r) => r.input);
  assert.ok(inputs.includes("Vitamin B6"));
  assert.ok(inputs.includes("Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor)"));
  assert.notEqual(
    data.dietary_input_traceability.find((r) => r.input === "Vitamin B6").biological_role,
    data.dietary_input_traceability.find((r) => r.input.startsWith("Pyridoxal")).biological_role,
  );
});

test("dietary candidates require all six atoms and a resolvable derived biochemical target", () => {
  const { data } = readPm8();
  // Synthetic relationship variants are unassessed; do not inherit the real B6 adjudication.
  delete data.dietary_confidence_assessments;
  delete data.dietary_input_assessments;

  const missingLimitation = structuredClone(data);
  delete missingLimitation.dietary_input_traceability[0].evidence_limitation;
  const limitationIssues = [];
  validateDietaryLeverAtoms(missingLimitation, limitationIssues, { entityLabel: "missing-limit" });
  assert.ok(limitationIssues.some((issue) => issue.code === "dit_missing_limitation"));

  const missingFinding = structuredClone(data);
  missingFinding.dietary_input_traceability[0].evidence_source.finding_ids = [];
  const findingIssues = [];
  validateDietaryLeverAtoms(missingFinding, findingIssues, { entityLabel: "missing-finding" });
  assert.ok(findingIssues.some((issue) => issue.code === "dit_missing_finding_source"));

  const missingCitation = structuredClone(data);
  missingCitation.dietary_input_traceability[0].evidence_source.citation_keys = [];
  const citationIssues = [];
  validateDietaryLeverAtoms(missingCitation, citationIssues, { entityLabel: "missing-citation" });
  assert.ok(citationIssues.some((issue) => issue.code === "dit_missing_bibliography_source"));

  const biochemicalTargetById = structuredClone(data);
  const plpLever = biochemicalTargetById.dietary_lever_atoms.find((row) => row.atom_id === "PM9-DIT-2");
  delete plpLever.requirement_classification;
  plpLever.relationship_layer = "biochemical-requirement";
  const plpTrace = biochemicalTargetById.dietary_input_traceability.find((row) => row.atom_id === "PM9-DIT-2");
  plpTrace.dietary_input = false;
  const biochemicalTargetByIdIssues = [];
  validateDietaryLeverAtoms(biochemicalTargetById, biochemicalTargetByIdIssues, { entityLabel: "b6-plp-gad-target-id" });
  assert.deepEqual(biochemicalTargetByIdIssues, []);

  const biochemicalTargetUnset = structuredClone(data);
  const plpUnsetLever = biochemicalTargetUnset.dietary_lever_atoms.find((row) => row.atom_id === "PM9-DIT-2");
  delete plpUnsetLever.requirement_classification;
  plpUnsetLever.relationship_layer = "biochemical-requirement";
  const plpUnsetTrace = biochemicalTargetUnset.dietary_input_traceability.find((row) => row.atom_id === "PM9-DIT-2");
  plpUnsetTrace.dietary_input = null;
  plpUnsetTrace.dietary_input_note = "Direct PLP supply requires classification reconciliation.";
  const biochemicalTargetUnsetIssues = [];
  validateDietaryLeverAtoms(biochemicalTargetUnset, biochemicalTargetUnsetIssues, { entityLabel: "b6-plp-gad-target-unset" });
  assert.deepEqual(biochemicalTargetUnsetIssues, []);

  const biochemicalTargetByText = structuredClone(data);
  const b6ByText = biochemicalTargetByText.dietary_lever_atoms.find((row) => row.atom_id === "PM9-DIT-3");
  delete b6ByText.derived_target_atom_id;
  b6ByText.derived_target = "Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor)";
  const plpByTextLever = biochemicalTargetByText.dietary_lever_atoms.find((row) => row.atom_id === "PM9-DIT-2");
  delete plpByTextLever.requirement_classification;
  plpByTextLever.relationship_layer = "biochemical-requirement";
  const biochemicalTargetByTextIssues = [];
  validateDietaryLeverAtoms(biochemicalTargetByText, biochemicalTargetByTextIssues, { entityLabel: "b6-plp-gad-target-text" });
  assertOnlyProspectiveReviewGaps(biochemicalTargetByTextIssues);

  const consistentTarget = structuredClone(data);
  const b6Consistent = consistentTarget.dietary_lever_atoms.find((row) => row.atom_id === "PM9-DIT-3");
  b6Consistent.derived_target = "Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor)";
  const consistentIssues = [];
  validateDietaryLeverAtoms(consistentTarget, consistentIssues, { entityLabel: "consistent-target" });
  assertOnlyProspectiveReviewGaps(consistentIssues);

  const unresolvedTargetId = structuredClone(data);
  unresolvedTargetId.dietary_lever_atoms.find((row) => row.atom_id === "PM9-DIT-3")
    .derived_target_atom_id = "PM9-DIT-NOPE";
  const targetIdIssues = [];
  validateDietaryLeverAtoms(unresolvedTargetId, targetIdIssues, { entityLabel: "unresolved-target-id" });
  assert.ok(targetIdIssues.some((issue) => issue.code === "dla_derived_target_unresolved"));

  const unresolvedTargetText = structuredClone(data);
  const b6UnresolvedText = unresolvedTargetText.dietary_lever_atoms.find((row) => row.atom_id === "PM9-DIT-3");
  delete b6UnresolvedText.derived_target_atom_id;
  b6UnresolvedText.derived_target = "Unknown target";
  const targetTextIssues = [];
  validateDietaryLeverAtoms(unresolvedTargetText, targetTextIssues, { entityLabel: "unresolved-target-text" });
  assert.ok(targetTextIssues.some((issue) => issue.code === "dla_derived_target_unresolved"));

  const conflictingTarget = structuredClone(data);
  conflictingTarget.dietary_lever_atoms.find((row) => row.atom_id === "PM9-DIT-3")
    .derived_target = "Vitamin B6";
  const conflictIssues = [];
  validateDietaryLeverAtoms(conflictingTarget, conflictIssues, { entityLabel: "conflicting-target" });
  assert.ok(conflictIssues.some((issue) => issue.code === "dla_derived_target_conflict"));

  const ambiguousTargetText = structuredClone(data);
  ambiguousTargetText.dietary_input_traceability.push({
    atom_id: "PM9-DIT-PLP-DUP",
    input: "Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor)",
    input_type: "cofactor",
    biological_role: "Duplicate target fixture",
    evidence_source: { pathway_resources: ["example"] },
    evidence_limitation: "Example limitation",
  });
  const b6Ambiguous = ambiguousTargetText.dietary_lever_atoms.find((row) => row.atom_id === "PM9-DIT-3");
  delete b6Ambiguous.derived_target_atom_id;
  b6Ambiguous.derived_target = "Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor)";
  const ambiguousIssues = [];
  validateDietaryLeverAtoms(ambiguousTargetText, ambiguousIssues, { entityLabel: "ambiguous-target-text" });
  assert.ok(ambiguousIssues.some((issue) => issue.code === "dla_derived_target_ambiguous"));
});

test("KC identity cannot create PM science without an independently adjudicated PM atom", () => {
  const { data } = readPm8();
  assert.equal(
    pmKcConstituentRelationshipIsAdjudicated(
      { kc_atom_id: "BRS1-KC1-KIT-1" },
      data.dietary_input_traceability,
    ),
    false,
  );
  assert.equal(
    pmKcConstituentRelationshipIsAdjudicated(
      { pm_atom_id: "PM9-DIT-1", kc_atom_id: "BRS1-KC1-KIT-1" },
      data.dietary_input_traceability,
    ),
    true,
  );
});

test("§3 reflects adjudicated PM9 dietary relationships without food mappings", () => {
  const { data, content } = readPm8();
  const section3 = content.slice(
    content.indexOf("3.1 Dietary Requirements"),
    content.indexOf("3.2 System Optimisation Practices"),
  );
  assert.equal(data.dietary_lever_presentations?.length, 2);
  assert.ok(section3.includes("- Vitamin B6"));
  assert.equal(
    (section3.match(/- Pyridoxal 5′-phosphate \(PLP; active vitamin B6 cofactor\)/g) || []).length,
    0,
  );
  assert.ok(section3.includes("- Glutamate"));
  assert.ok(section3.includes("No mapping established."));
  assert.ok(!section3.includes("Glutamate substrate context"));
  assert.ok(!section3.includes("brs-kc-title-link"));
  assert.ok(!section3.includes("- Zinc"));
  assert.ok(!section3.includes("Current research does not establish a Direct Dietary Requirement"));
  assert.ok(!content.includes("B6 ← chickpeas"));
  assert.ok(!content.includes("B6 (PLP) ← poultry"));
  assert.ok(!content.includes("Protein matrix ← yogurt, kefir"));
  assert.ok(!content.includes("PM Evidence qualification"));
  assert.ok(!content.includes("Conflict flag"));
  assert.ok(!section3.includes("PM9-DIT-"), "Reader-facing dietary prose does not expose evidence atom identifiers");
  assert.equal(data.cofactors?.[0], "Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor)");
  const issues = [];
  validateDietaryLeverAtoms(data, issues, { entityLabel: "BRS1-FM4-PM9" });
  assert.deepEqual(issues, []);
  const map = buildDietaryLeverDisclosureMap(data);
  assert.equal(map.size, 2);
  assert.equal(
    map.get(dietaryLeverBulletKey("Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor)", "", "3.1.1")),
    undefined,
  );
  assert.equal(
    map.get(dietaryLeverBulletKey("Vitamin B6", "", "3.1.1")).compactQualifier,
    "Derived · Cofactor Precursor → PLP",
  );
  assert.equal(
    map.get(dietaryLeverBulletKey("Glutamate", "", "3.1.2")).compactQualifier,
    "Substrate",
  );
  const glutamate = [...map.values()].find((item) => item.title === "Glutamate");
  assert.ok(glutamate);
  assert.equal(glutamate.inputType, "Substrate");
  assert.equal(
    glutamate.evidenceLimitation,
    "The evidence establishes glutamate as the GAD substrate, not that dietary glutamate or protein controls neuronal glutamate availability or human brain GABA synthesis.",
  );
  const b6 = [...map.values()].find((item) => item.title === "Vitamin B6");
  assert.ok(b6);
  assert.equal(b6.inputType, "Cofactor precursor");
  assert.equal(
    b6.biologicalRole,
    "Provides dietary B6 vitamers that pyridoxal kinase converts to PLP, the cofactor required for GAD-dependent GABA synthesis",
  );
  assert.deepEqual(
    b6.evidenceReferences.map((ref) => ref.number),
    [1, 2, 3, 4],
  );
  assert.ok(b6.evidenceReferences.every((ref) => ref.label && !ref.label.includes("PM9-")));
  assert.equal("dietaryRelationship" in b6, false);
  assert.equal(
    b6.evidenceLimitation,
    "Dietary B6 provision of PLP precursors is supported, but increasing B6 intake has not been shown to increase human brain GABA synthesis; PLP supports many enzymes and is not GABA-specific.",
  );
  assert.ok(data.dietary_lever_atoms.every((r) => r.evidence_limitation));

  const duplicatePlpPrimary = structuredClone(data);
  duplicatePlpPrimary.dietary_lever_presentations.push({
    atom_id: "PM9-DIT-2",
    label: "Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor)",
    presentation_section: "3.1.2",
  });
  const duplicateIssues = [];
  validateDietaryLeverAtoms(duplicatePlpPrimary, duplicateIssues, { entityLabel: "BRS1-FM4-PM9-duplicate-plp" });
  assert.ok(duplicateIssues.some((issue) => issue.code === "dla_presentation_duplicate_derived_target"));
});

test("PM3 uses the PM9 atom and disclosure contract for dietary requirements", () => {
  const { data } = readPm3();
  const issues = [];
  validateDietaryLeverAtoms(data, issues, { entityLabel: "BRS2-FM1-PM3" });
  assert.deepEqual(issues, []);

  const resolved = resolveAllLeverAtoms(data);
  assert.deepEqual(
    resolved.filter(atom => !atom.atom_id.startsWith("PM3-KC1-UPSTREAM")).map((atom) => atom.atom_id),
    ["PM3-DIT-1", "PM3-DIT-2", "PM3-DIT-3", "PM3-DIT-4", "PM3-DIT-5"],
  );
  assert.ok(resolved.every((atom) => atom.reference_numbers.length > 0));
  assert.ok(data.dietary_lever_atoms.every((atom) => atom.evidence_limitation));

  const methionine = resolveLeverAtom(data, { atom_id: "PM3-DIT-1" });
  const atp = resolveLeverAtom(data, { atom_id: "PM3-DIT-2" });
  const magnesium = resolveLeverAtom(data, { atom_id: "PM3-DIT-3" });
  const potassium = resolveLeverAtom(data, { atom_id: "PM3-DIT-4" });
  const protein = resolveLeverAtom(data, { atom_id: "PM3-DIT-5" });
  assert.equal(methionine.requirement_classification, "direct");
  assert.equal(methionine.input_type, "substrate");
  assert.equal(methionine.relationship_layer, "dietary-requirement");
  assert.equal(methionine.claim_ceiling, "biological-dependency");
  assert.equal(atp.relationship_layer, "biochemical-requirement");
  assert.equal(atp.input_type, "substrate");
  assert.equal(isDietaryRequirementAtom(atp), false);
  assert.equal(magnesium.input_type, "catalytic ion");
  assert.equal(magnesium.relationship_layer, "dietary-requirement");
  assert.equal(potassium.input_type, "catalytic ion");
  assert.equal(protein.requirement_classification, "derived");
  assert.equal(protein.input_type, "substrate provision");
  assert.equal(protein.derived_target, "Methionine");
  assert.equal(protein.claim_ceiling, "dietary-provision");
  assert.equal(formatRequirementCompactQualifier(methionine), "Direct · Substrate");
  assert.equal(
    formatRequirementCompactQualifier(protein),
    "Derived · Substrate Provision → Methionine",
  );

  const disclosures = [...new Set(buildDietaryLeverDisclosureMap(data).values())].filter(item => item.inputType !== "Supported upstream supply");
  assert.equal(disclosures.length, 4);
  assert.deepEqual(
    disclosures.map((item) => item.title),
    [
      "Methionine",
      "ATP",
      "Magnesium",
      "Potassium",
    ],
  );
  assert.ok(disclosures.every((item) => item.evidenceReferences.length > 0));
  assert.ok(disclosures.every((item) => item.evidenceLimitation));
  assert.ok(
    disclosures.every((item) =>
      item.evidenceReferences.every((ref) => ref.label && !ref.label.includes("PM3-")),
    ),
  );
  const disclosureMap = buildDietaryLeverDisclosureMap(data);
  const methionineFullKey = dietaryLeverBulletKey("Methionine", "Chicken, Eggs, Salmon", "3.1.1");
  const methionineFoodlessKey = dietaryLeverBulletKey("Methionine", "", "3.1.1");
  const methionineFull = disclosureMap.get(methionineFullKey);
  const methionineFoodless = disclosureMap.get(methionineFoodlessKey);
  assert.ok(methionineFull);
  assert.ok(methionineFoodless);
  assert.equal(methionineFull, methionineFoodless);
  assert.equal(methionineFoodless.atomId, "PM3-DIT-1");
  assert.equal(methionineFoodless.title, "Methionine");
  assert.equal(
    disclosureMap.get(dietaryLeverBulletKey("Magnesium", "", "3.1.1")).atomId,
    "PM3-DIT-3",
  );

  const inputFood = buildInputSubstanceFood(process.cwd(), { brs: "BRS2" });
  const methionineFoodRelationship = inputFood.relationships.find(
    (row) => row.id === "BRS2-FM1-PM3::PM3-DIT-1",
  );
  assert.ok(methionineFoodRelationship);
  assert.ok(
    methionineFoodRelationship.presentations.some(
      (presentation) => presentation.label === "Methionine" && presentation.section === "3.1.1",
    ),
  );
  assert.ok(
    inputFood.food_sources.some(
      (source) => source.substance_id === methionineFoodRelationship.substance_id,
    ),
  );
  assert.equal(methionineFoodless.shortDescriptor, "Essential amino acid");
  assert.equal(
    disclosureMap.get(dietaryLeverBulletKey("ATP", "", "3.1.2")).shortDescriptor,
    "Cellular energy co-substrate",
  );
  assert.equal(
    disclosureMap.get(dietaryLeverBulletKey("Magnesium", "", "3.1.1")).shortDescriptor,
    "Essential mineral · Catalytic cofactor",
  );
  assert.equal(
    disclosureMap.get(dietaryLeverBulletKey("Potassium", "", "3.1.1")).shortDescriptor,
    "Essential mineral · Catalytic ion",
  );

  const duplicateProteinPrimary = structuredClone(data);
  duplicateProteinPrimary.dietary_lever_presentations.push({
    atom_id: "PM3-DIT-5",
    label: "Dietary protein",
    presentation_section: "3.1.1",
  });
  const duplicateIssues = [];
  validateDietaryLeverAtoms(duplicateProteinPrimary, duplicateIssues, { entityLabel: "BRS2-FM1-PM3-duplicate-protein" });
  assert.ok(
    duplicateIssues.some((issue) => issue.code === "dla_presentation_duplicate_substrate_provision"),
  );
});

test("four reference PMs carry short input descriptors without changing atoms or disclosures", () => {
  assertDisclosureDescriptor(readPm3().data, "Methionine", "3.1.1", "Essential amino acid", "PM3-DIT-1");
  assertDisclosureDescriptor(readPm3().data, "ATP", "3.1.2", "Cellular energy co-substrate", "PM3-DIT-2");
  assertDisclosureDescriptor(readPm3().data, "Magnesium", "3.1.1", "Essential mineral · Catalytic cofactor", "PM3-DIT-3");
  assertDisclosureDescriptor(readPm3().data, "Potassium", "3.1.1", "Essential mineral · Catalytic ion", "PM3-DIT-4");

  const dopamine = readDopaminePm3().data;
  assertDisclosureDescriptor(dopamine, "Tyrosine", "3.1.1", "Non-essential amino acid", "PM3-DIT-5");
  assertDisclosureDescriptor(dopamine, "Iron", "3.1.1", "Essential mineral · Enzyme cofactor", "PM3-DIT-1");
  assertDisclosureDescriptor(dopamine, "Vitamin B6", "3.1.1", "Essential vitamin · Cofactor precursor", "PM3-DIT-3");
  assertDisclosureDescriptor(dopamine, "Tetrahydrobiopterin (BH4)", "3.1.2", "Endogenous enzyme cofactor", "PM3-DIT-4");

  const nad = readNadPm2().data;
  assertDisclosureDescriptor(nad, "Nicotinamide (a form of vitamin B3)", "3.1.1", "Vitamin B3 form", "PM2-DIT-1");
  assertDisclosureDescriptor(nad, "Nicotinic acid (a form of vitamin B3)", "3.1.1", "Vitamin B3 form", "PM2-DIT-2");
  assertDisclosureDescriptor(nad, "Tryptophan", "3.1.1", "Essential amino acid", "PM2-DIT-3");

  const gaba = readPm8().data;
  assertDisclosureDescriptor(gaba, "Vitamin B6", "3.1.1", "Essential vitamin · Cofactor precursor", "PM9-DIT-3");
  assertDisclosureDescriptor(gaba, "Glutamate", "3.1.2", "GABA synthesis substrate", "PM9-DIT-1");

  const source = fs.readFileSync(PM_LEVER_ENHANCER, "utf8");
  assert.match(source, /disclosure\.shortDescriptor/);
  assert.match(source, /` — \$\{descriptor\}`/);
  const detailBuilder = source.slice(source.indexOf("function buildDetailHtml"), source.indexOf("function escapeHtml"));
  assert.doesNotMatch(detailBuilder, /shortDescriptor/);
});

test("PM input food-source renderer keeps compact category, citation and review formatting", () => {
  const source = fs.readFileSync(PM_INPUT_FOOD_DISCLOSURE, "utf8");
  assert.match(source, /createFoodSourceDetails\('Plant-based'/);
  assert.match(source, /createFoodSourceDetails\('Animal-based'/);
  assert.doesNotMatch(source, /Plant Based|Animal Based|no mapped values/);
  assert.match(source, /No verified sources yet/);
  assert.match(source, / — \$\{formatFoodAmount\(source\)\} · \$\{formatFoodPrep\(source\)\}/);
  assert.match(source, /preparation === 'oil'\) return 'oil'/);
  assert.match(source, /data-quality-flag="missing-preparation"/);
  assert.match(source, /data-food-id="\$\{esc\(source\.food_id \|\| ''\)\}"/);
  assert.match(source, /data-substance-id="\$\{esc\(source\.substance_id \|\| ''\)\}"/);
});

test("SAMe food-source mappings retain Methionine, magnesium and potassium links and review IDs", () => {
  const inputFood = buildInputSubstanceFood(process.cwd(), { brs: "BRS2" });
  const relationshipIds = [
    "BRS2-FM1-PM3::PM3-DIT-1",
    "BRS2-FM1-PM3::PM3-DIT-3",
    "BRS2-FM1-PM3::PM3-DIT-4",
  ];
  const relationships = relationshipIds.map((id) => inputFood.relationships.find((row) => row.id === id));
  assert.ok(relationships.every(Boolean));
  for (const relationship of relationships) {
    const sources = inputFood.food_sources.filter((source) => source.substance_id === relationship.substance_id);
    assert.ok(sources.length, `${relationship.id} has food-source mappings`);
    assert.ok(sources.every((source) => source.food_page?.startsWith("/docs/foods/")), `${relationship.id} links canonical food pages`);
  }

  const methionine = inputFood.relationships.find((row) => row.id === "BRS2-FM1-PM3::PM3-DIT-1");
  const methionineSources = inputFood.food_sources.filter((source) => source.substance_id === methionine.substance_id);
  const animalTopFive = methionineSources
    .filter((source) => /\b(anchov|beef|chicken|clam|cod|crab|duck|egg|fish|liver|mackerel|meat|milk|mussel|oyster|pork|poultry|salmon|sardine|scallop|seafood|shellfish|shrimp|tuna|turkey|whey|yolk)\b/i.test([
      source.food_id,
      source.food_title,
      source.material,
      source.food_matrix,
      source.product,
      source.species,
    ].filter(Boolean).join(" ")))
    .sort((a, b) => {
      const strongest = (source) => Math.max(...(source.observations || [])
        .flatMap((obs) => [obs.high, obs.low, obs.value])
        .map(Number)
        .filter(Number.isFinite));
      return strongest(b) - strongest(a) || String(a.food_title).localeCompare(String(b.food_title));
    })
    .slice(0, 5);
  assert.deepEqual(
    animalTopFive.map((source) => source.food_title),
    ["Sardines", "Tuna", "Salmon", "Chicken", "Eggs"],
  );
  assert.deepEqual(
    animalTopFive.map((source) => source.food_page),
    ["/docs/foods/sardines", "/docs/foods/tuna", "/docs/foods/salmon", "/docs/foods/chicken", "/docs/foods/eggs"],
  );

  const missingPreparationSources = inputFood.food_sources.filter((source) => !String(source.preparation || "").trim());
  assert.ok(missingPreparationSources.length, "missing preparation observations exist for data-quality review");
  assert.ok(
    missingPreparationSources.every((source) => source.id && source.food_id && source.substance_id),
    "review flags can retain source, food and substance identifiers",
  );
});

test("dietary lever disclosure foodless aliases do not overwrite another atom", () => {
  const fixture = {
    dietary_input_traceability: [
      {
        atom_id: "EX-DIT-1",
        input: "Methionine",
        input_type: "substrate",
        dietary_input: true,
        biological_role: "Direct substrate",
        evidence_source: {},
        evidence_limitation: "Limited.",
      },
      {
        atom_id: "EX-DIT-2",
        input: "Methionine context",
        input_type: "substrate",
        dietary_input: false,
        biological_role: "Context record",
        evidence_source: {},
        evidence_limitation: "Limited.",
      },
    ],
    dietary_lever_atoms: [
      {
        atom_id: "EX-DIT-1",
        requirement_classification: "direct",
        relationship_layer: "dietary-requirement",
        evidence_limitation: "Limited.",
      },
      {
        atom_id: "EX-DIT-2",
        relationship_layer: "biochemical-requirement",
        evidence_limitation: "Limited.",
      },
    ],
    dietary_lever_presentations: [
      {
        atom_id: "EX-DIT-2",
        label: "Methionine",
        presentation_section: "3.1.1",
      },
      {
        atom_id: "EX-DIT-1",
        label: "Methionine",
        foods: "Chicken, Eggs, Salmon",
        presentation_section: "3.1.1",
      },
    ],
  };

  assert.throws(
    () => buildDietaryLeverDisclosureMap(fixture),
    /foodless-key collision.*EX-DIT-2 versus EX-DIT-1/,
  );
});

test("PM3 §3.1 keeps ATP biochemical and keeps individual KC supply in §3.1.3", () => {
  const { data, content } = readPm3();
  const section3 = content.slice(
    content.indexOf("3.1 Dietary Requirements"),
    content.indexOf("3.2 System Optimisation Practices"),
  );
  const section311 = section3.slice(
    section3.indexOf("3.1.1 Direct and/or Derived Dietary Requirements"),
    section3.indexOf("3.1.2 Cofactors and Substrates"),
  );
  const section312 = section3.slice(
    section3.indexOf("3.1.2 Cofactors and Substrates"),
    section3.indexOf("3.1.3 Key Constraints"),
  );

  assert.ok(section3.includes("3.1.1 Direct and/or Derived Dietary Requirements"));
  assert.ok(section3.includes("3.1.2 Cofactors and Substrates"));
  assert.ok(section3.includes("3.1.3 Key Constraints"));
  assert.ok(!section3.includes("Dietary Levers"));
  assert.ok(!section3.includes("Supporting Inputs"));
  assert.equal((section3.match(/No mapping established\./g) || []).length, 0);
  assert.equal((section3.match(/Methionine substrate context/g) || []).length, 0);
  assert.ok(section311.includes("- Methionine"));
  assert.ok(!section311.includes("- Dietary protein"));
  assert.ok(!section311.includes("ATP"));
  assert.ok(!section312.includes("- Methionine"));
  assert.ok(section312.includes("- ATP"));
  assert.ok(section311.includes("- Magnesium"));
  assert.ok(!section312.includes("- Magnesium"));
  assert.ok(section311.includes("- Potassium"));
  assert.ok(!section312.includes("- Potassium"));
  assert.ok(!section3.includes("←"));
  assert.ok(!section311.includes("folate"));
  assert.ok(!section312.includes("Betaine"));
  assert.ok(!section312.includes("Choline"));
  assert.ok(section3.includes("Individual KC inputs"));
  assert.ok(section3.includes("- Vitamin B9 (folate)"));
  assert.ok(section3.includes("- Betaine"));
  assert.ok(section3.includes("- Choline"));
  assert.ok(!section3.includes("Vitamin B12"));
  assert.ok(!section3.includes("Riboflavin"));
  assert.ok(!section3.includes("Vitamin B6"));
  assert.ok(!section3.includes("PM3-DIT-"));

  const atp = data.dietary_lever_atoms.find((atom) => atom.atom_id === "PM3-DIT-2");
  assert.equal(atp.relationship_layer, "biochemical-requirement");
  assert.ok(
    data.dietary_lever_presentations.every(
      (row) => row.atom_id !== "PM3-DIT-2" || row.presentation_section === "3.1.2",
    ),
  );
});

test("BRS1-FM1-PM3 presents dopamine dietary supply once", () => {
  const { data } = readDopaminePm3();
  const issues = [];
  validateDietaryLeverAtoms(data, issues, { entityLabel: "BRS1-FM1-PM3" });
  assert.deepEqual(issues, []);

  const presentations = data.dietary_lever_presentations || [];
  assert.deepEqual(
    presentations
      .filter((row) => row.presentation_section === "3.1.1")
      .map((row) => row.label),
    ["Tyrosine", "Iron", "Vitamin B6", "Vitamin B2", "Magnesium"],
  );
  assert.deepEqual(
    presentations
      .filter((row) => row.presentation_section === "3.1.2")
      .map((row) => row.label),
    ["Tetrahydrobiopterin (BH4)"],
  );

  const map = buildDietaryLeverDisclosureMap(data);
  assert.equal(
    map.get(dietaryLeverBulletKey("Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor)", "", "3.1.1")),
    undefined,
  );
  assert.equal(
    map.get(dietaryLeverBulletKey("Vitamin B6", "", "3.1.1")).compactQualifier,
    "Derived · Cofactor Precursor → Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor)",
  );

  const duplicatePlpPrimary = structuredClone(data);
  duplicatePlpPrimary.dietary_lever_presentations.push({
    atom_id: "PM3-DIT-2",
    label: "Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor)",
    presentation_section: "3.1.2",
  });
  const duplicateIssues = [];
  validateDietaryLeverAtoms(duplicatePlpPrimary, duplicateIssues, { entityLabel: "BRS1-FM1-PM3-duplicate-plp" });
  assert.ok(duplicateIssues.some((issue) => issue.code === "dla_presentation_duplicate_derived_target"));
});

test("BRS1-FM1-PM3 permits B6 derived supply to PLP without independent Direct PLP admission", () => {
  const { data } = readDopaminePm3();
  const fixture = structuredClone(data);
  const plp = fixture.dietary_lever_atoms.find((row) => row.atom_id === "PM3-DIT-2");
  if (plp) {
    delete plp.requirement_classification;
    delete plp.relationship_mode;
    plp.relationship_layer = "biochemical-requirement";
  }
  const plpTrace = fixture.dietary_input_traceability.find((row) => row.atom_id === "PM3-DIT-2");
  if (plpTrace) plpTrace.dietary_input = false;
  const issues = [];
  validateDietaryLeverAtoms(fixture, issues, { entityLabel: "BRS1-FM1-PM3-b6-plp-aadc" });
  assert.deepEqual(issues, []);
});

test("BRS4-FM1-PM2 keeps NAD lifestyle disclosure out of dietary requirements", () => {
  const { data } = readNadPm2();
  const issues = [];
  validateDietaryLeverAtoms(data, issues, { entityLabel: "BRS4-FM1-PM2" });
  assert.deepEqual(issues, []);

  assert.deepEqual(
    data.dietary_lever_presentations
      .filter((row) => row.presentation_section === "3.1.1")
      .map((row) => row.label),
    ["Nicotinamide (a form of vitamin B3)", "Nicotinic acid (a form of vitamin B3)", "Tryptophan", "Nicotinamide riboside"],
  );

  const map = buildDietaryLeverDisclosureMap(data);
  const training = map.get(dietaryLeverBulletKey("Aerobic or resistance training", "", "3.3"));
  assert.ok(training);
  assert.equal(training.dietaryInput, false);
  assert.equal(training.presentationSection, "3.3");
});

test("requirement_classification is optional metadata and does not replace input_type", () => {
  assert.deepEqual([...REQUIREMENT_CLASSIFICATION], ["direct", "derived"]);
  const fixture = {
    dietary_input_traceability: [
      {
        atom_id: "TEST-DIT-1",
        input: "Methionine",
        input_type: "substrate",
        biological_role: "substrate for MAT-dependent SAMe synthesis",
        evidence_source: { pathway_resources: ["example"] },
        evidence_limitation: "Example limitation",
      },
      {
        atom_id: "TEST-DIT-2",
        input: "Dietary protein",
        input_type: "substrate provision",
        biological_role: "provides dietary methionine required as substrate for MAT",
        evidence_source: { pathway_resources: ["example"] },
        evidence_limitation: "Example limitation",
      },
    ],
    dietary_lever_atoms: [
      {
        atom_id: "TEST-DIT-1",
        requirement_classification: "direct",
        dietary_addressability: "direct",
        claim_ceiling: "biological-dependency",
      },
      {
        atom_id: "TEST-DIT-2",
        requirement_classification: "derived",
        derived_target: "Methionine",
        derived_target_atom_id: "TEST-DIT-1",
        dietary_addressability: "direct",
        claim_ceiling: "biological-dependency",
      },
    ],
  };
  const issues = [];
  validateDietaryLeverAtoms(fixture, issues, { entityLabel: "fixture" });
  assert.deepEqual(issues, []);

  const invalid = structuredClone(fixture);
  invalid.dietary_lever_atoms[0].requirement_classification = "weak";
  const invalidIssues = [];
  validateDietaryLeverAtoms(invalid, invalidIssues, { entityLabel: "fixture-invalid" });
  assert.ok(invalidIssues.some((issue) => issue.code === "dla_invalid_requirement_classification"));
});

test("primary presentations use one reader-facing entry per atom", () => {
  const fixture = {
    dietary_input_traceability: [
      {
        atom_id: "EX-DIT-1",
        input: "Methionine",
        input_type: "substrate",
        dietary_input: true,
        biological_role: "Substrate for MAT-dependent synthesis of SAMe",
        evidence_source: { pathway_resources: ["example"] },
        evidence_limitation: "Example limitation",
      },
      {
        atom_id: "EX-DIT-2",
        input: "Dietary protein / amino-acid provision",
        input_type: "substrate provision",
        dietary_input: true,
        biological_role: "Provides dietary methionine required as substrate for MAT-dependent SAMe synthesis",
        evidence_source: { pathway_resources: ["example"] },
        evidence_limitation: "Example limitation",
      },
    ],
    dietary_lever_atoms: [
      {
        atom_id: "EX-DIT-1",
        requirement_classification: "direct",
        dietary_addressability: "indirect/resource",
        claim_ceiling: "biological-dependency",
      },
      {
        atom_id: "EX-DIT-2",
        requirement_classification: "derived",
        derived_target: "Methionine",
        derived_target_atom_id: "EX-DIT-1",
        dietary_addressability: "direct",
        claim_ceiling: "dietary-provision",
      },
    ],
    dietary_lever_presentations: [
      { atom_id: "EX-DIT-1", label: "Methionine", presentation_section: "3.1.1" },
      {
        atom_id: "EX-DIT-1",
        label: "Methionine substrate context",
        presentation_section: "3.1.3",
      },
    ],
  };
  const issues = [];
  validateDietaryLeverAtoms(fixture, issues, { entityLabel: "direct-derived" });
  assertOnlyProspectiveReviewGaps(issues);
  const methionine = resolveLeverAtom(fixture, { atom_id: "EX-DIT-1" });
  const protein = resolveLeverAtom(fixture, { atom_id: "EX-DIT-2" });
  assert.equal(methionine.input_type, "substrate");
  assert.equal(protein.input_type, "substrate provision");
  assert.equal(protein.derived_target, "Methionine");
  assert.equal(formatRequirementCompactQualifier(methionine), "Direct · Substrate");
  assert.equal(
    formatRequirementCompactQualifier(protein),
    "Derived · Substrate Provision → Methionine",
  );
  const map = buildDietaryLeverDisclosureMap(fixture);
  assert.equal(
    map.get(dietaryLeverBulletKey("Methionine", "", "3.1.1")).compactQualifier,
    "Direct · Substrate",
  );
  assert.equal(
    map.get(dietaryLeverBulletKey("Dietary protein", "", "3.1.1")),
    undefined,
  );
  assert.equal(
    map.get(
      dietaryLeverBulletKey("Methionine substrate context", "", "3.1.3"),
    ).compactQualifier,
    "",
  );
  assert.equal(
    map.get(dietaryLeverBulletKey("Methionine", "", "3.1.1")).shortDescriptor || "",
    "",
  );

  const kcOnlyPresentation = structuredClone(fixture);
  kcOnlyPresentation.dietary_lever_presentations.push({
    atom_id: "EX-DIT-2",
    label: "Dietary protein",
    presentation_section: "3.1.3",
  });
  const kcOnlyIssues = [];
  validateDietaryLeverAtoms(kcOnlyPresentation, kcOnlyIssues, { entityLabel: "kc-only-presentation" });
  assertOnlyProspectiveReviewGaps(kcOnlyIssues);

  const foodCompositionPresentation = structuredClone(fixture);
  foodCompositionPresentation.dietary_lever_presentations[0].foods = [
    { name: "Example food", href: "/docs/foods/example-food" },
  ];
  const foodCompositionIssues = [];
  validateDietaryLeverAtoms(foodCompositionPresentation, foodCompositionIssues, {
    entityLabel: "food-composition-presentation",
  });
  assertOnlyProspectiveReviewGaps(foodCompositionIssues);

  const duplicatePrimary = structuredClone(fixture);
  duplicatePrimary.dietary_lever_presentations.push({
    atom_id: "EX-DIT-1",
    label: "Methionine",
    presentation_section: "3.1.2",
  });
  const duplicateIssues = [];
  validateDietaryLeverAtoms(duplicatePrimary, duplicateIssues, { entityLabel: "duplicate-primary" });
  assert.ok(duplicateIssues.some((issue) => issue.code === "dla_presentation_duplicate_primary_entry"));

  const duplicateProteinPrimary = structuredClone(fixture);
  duplicateProteinPrimary.dietary_lever_presentations.push({
    atom_id: "EX-DIT-2",
    label: "Dietary protein",
    presentation_section: "3.1.1",
  });
  const duplicateProteinIssues = [];
  validateDietaryLeverAtoms(duplicateProteinPrimary, duplicateProteinIssues, {
    entityLabel: "duplicate-protein-primary",
  });
  assert.ok(
    duplicateProteinIssues.some((issue) => issue.code === "dla_presentation_duplicate_substrate_provision"),
  );

  const unresolvedDietaryPrimary = structuredClone(fixture);
  unresolvedDietaryPrimary.dietary_input_traceability[0].dietary_input = false;
  unresolvedDietaryPrimary.dietary_input_traceability[0].dietary_input_note = "No dietary relationship is admitted.";
  const unresolvedIssues = [];
  validateDietaryLeverAtoms(unresolvedDietaryPrimary, unresolvedIssues, { entityLabel: "unresolved-primary" });
  assert.ok(unresolvedIssues.some((issue) => issue.code === "dla_presentation_unset_dietary_requirement"));
});

test("safeguards keep Dietary Requirements independent of KC, substrate inventory and modulation", () => {
  const methionine = {
    atom_id: "EX-DIT-1",
    input: "Methionine",
    input_type: "substrate",
    biological_role: "Substrate for MAT-dependent synthesis of SAMe",
    requirement_classification: "direct",
    dietary_addressability: "not-established",
    claim_ceiling: "biological-dependency",
  };
  assert.equal(isDietaryRequirementAtom(methionine), true);
  assert.equal(dietaryRequirementRemainsWithoutModulationEvidence(methionine), true);
  assert.deepEqual(
    retainPmDietaryAtomsDespiteKcMembership([methionine], ["Methionine", "KC2"]),
    [methionine],
  );

  const atp = {
    dietary_input_traceability: [
      {
        atom_id: "EX-ATP",
        input: "ATP",
        input_type: "substrate",
        biological_role: "Biochemical substrate for MAT-dependent SAMe formation",
        evidence_source: { pathway_resources: ["example"] },
        evidence_limitation: "Example limitation",
      },
    ],
    dietary_lever_atoms: [
      {
        atom_id: "EX-ATP",
        relationship_layer: "biochemical-requirement",
      },
    ],
    dietary_lever_presentations: [
      { atom_id: "EX-ATP", label: "ATP", presentation_section: "3.1.1" },
    ],
  };
  const atpIssues = [];
  validateDietaryLeverAtoms(atp, atpIssues, { entityLabel: "atp" });
  assert.ok(atpIssues.some((issue) => issue.code === "dla_presentation_biochemical_as_dietary"));
  assert.equal(isDietaryRequirementAtom(atp.dietary_lever_atoms[0]), false);

  const catchAll = {
    dietary_input_traceability: [
      {
        atom_id: "EX-BAD",
        input: "Protein",
        input_type: "supporting input",
        biological_role: "unclear",
        evidence_source: { pathway_resources: ["example"] },
        evidence_limitation: "Example limitation",
      },
    ],
  };
  const catchAllIssues = [];
  validateDietaryLeverAtoms(catchAll, catchAllIssues, { entityLabel: "catchall" });
  assert.ok(catchAllIssues.some((issue) => issue.code === "dit_forbidden_input_type"));

  const mislabeled = {
    dietary_input_traceability: [
      {
        atom_id: "EX-DIT-1",
        input: "Dietary protein",
        input_type: "substrate",
        biological_role: "Provides methionine",
        evidence_source: { pathway_resources: ["example"] },
        evidence_limitation: "Example limitation",
      },
    ],
    dietary_lever_atoms: [
      {
        atom_id: "EX-DIT-1",
        requirement_classification: "derived",
        dietary_addressability: "direct",
        claim_ceiling: "biological-dependency",
      },
    ],
  };
  const mislabeledIssues = [];
  validateDietaryLeverAtoms(mislabeled, mislabeledIssues, { entityLabel: "mislabeled" });
  assert.ok(mislabeledIssues.some((issue) => issue.code === "dla_derived_missing_target"));
  assert.ok(mislabeledIssues.some((issue) => issue.code === "dla_derived_mislabeled_as_substrate"));
});

test("state-regulation metadata cannot sit on biochemical inventory or use a dependency ceiling", () => {
  const mg = matter(
    fs.readFileSync(
      path.join(process.cwd(), "docs/biological-targets/brs3/fm1/brs3-fm1-pm1-nf-kb-signalling-regulation.mdx"),
      "utf8",
    ),
  ).data;
  const biochemicalAtoms = (mg.dietary_lever_atoms || []).filter(isBiochemicalRequirementAtom);
  const dietaryRequirementAtoms = (mg.dietary_lever_atoms || []).filter(isDietaryRequirementAtom);
  assert.equal(biochemicalAtoms.length, 1);
  assert.equal(dietaryRequirementAtoms.length, 0);
  assert.equal(mg.dietary_lever_presentations[0].presentation_section, "3.1.2");

  const issues = [];
  validateDietaryLeverAtoms(mg, issues, { entityLabel: mg.pm_id });
  assert.deepEqual(issues, []);

  const polluted = structuredClone(mg);
  polluted.dietary_lever_atoms[0].relationship_mode = "state-regulation";
  const pollutedIssues = [];
  validateDietaryLeverAtoms(polluted, pollutedIssues, { entityLabel: "polluted" });
  assert.ok(pollutedIssues.some((issue) => issue.code === "dla_biochemical_relationship_mode"));

  const fakeDirect = {
    dietary_input_traceability: [
      {
        atom_id: "EX-REG",
        input: "Example pattern",
        input_type: "dietary pattern",
        biological_role: "Regulates the PM-governed state",
        evidence_source: { pathway_resources: ["example"] },
        evidence_limitation: "Example limitation",
      },
    ],
    dietary_lever_atoms: [
      {
        atom_id: "EX-REG",
        relationship_layer: "dietary-requirement",
        relationship_mode: "state-regulation",
        requirement_classification: "direct",
        dietary_addressability: "not-established",
        claim_ceiling: "biological-dependency",
      },
    ],
  };
  const fakeIssues = [];
  validateDietaryLeverAtoms(fakeDirect, fakeIssues, { entityLabel: "fake" });
  assert.ok(fakeIssues.some((issue) => issue.code === "dla_state_regulation_dependency_ceiling"));
});

test("upstream PM relationships render as labelled indicators, not ownership prose", () => {
  const fixture = {
    dietary_input_traceability: [
      {
        atom_id: "EX-DIT-1",
        input: "Tyrosine",
        input_type: "substrate",
        biological_role: "Substrate for conversion to L-DOPA",
        upstream_pm_relationships: [
          {
            relationship_label: "Supply",
            pm_short_id: "PM1",
            pm_id: "BRS1-FM1-PM1",
            href: "/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation",
          },
        ],
        evidence_source: { pathway_resources: ["example"] },
        evidence_limitation: "Example limitation",
      },
    ],
    dietary_lever_atoms: [
      {
        atom_id: "EX-DIT-1",
        requirement_classification: "direct",
        dietary_addressability: "not-established",
        claim_ceiling: "biological-dependency",
      },
    ],
    dietary_lever_presentations: [
      {
        atom_id: "EX-DIT-1",
        label: "Tyrosine",
        presentation_section: "3.1.1",
        reader_description: "Tyrosine is the starting material used to make dopamine.",
      },
    ],
  };
  const issues = [];
  validateDietaryLeverAtoms(fixture, issues, { entityLabel: "upstream" });
  assertOnlyProspectiveReviewGaps(issues);
  const disclosure = buildDietaryLeverDisclosureMap(fixture).get(
    dietaryLeverBulletKey("Tyrosine", "", "3.1.1"),
  );
  assert.deepEqual(disclosure.upstreamIndicators, [
    {
      text: "Supply: PM1",
      href: "/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation",
    },
  ]);

  const ambiguous = structuredClone(fixture);
  ambiguous.dietary_input_traceability[0].upstream_pm_relationships[0].relationship_label = "From";
  const ambiguousIssues = [];
  validateDietaryLeverAtoms(ambiguous, ambiguousIssues, { entityLabel: "upstream-from" });
  assert.ok(ambiguousIssues.some((issue) => issue.code === "dla_upstream_ambiguous_label"));

  const ownership = structuredClone(fixture);
  ownership.dietary_lever_presentations[0].reader_description =
    "Local listing does not create a second independent nutritional need.";
  const ownershipIssues = [];
  validateDietaryLeverAtoms(ownership, ownershipIssues, { entityLabel: "upstream-prose" });
  assert.ok(ownershipIssues.some((issue) => issue.code === "dla_public_ownership_prose"));
});

test("Input links to its substance page and the compact heading stays unlinked", () => {
  const pm4 = matter(
    fs.readFileSync(
      "docs/biological-targets/brs3/fm2/brs3-fm2-pm4-ros-generation-vs-clearance-balance.mdx",
      "utf8",
    ),
  ).data;
  const map = buildDietaryLeverDisclosureMap(pm4);
  const expected = [
    ["Glutathione", "3.1.2", "/docs/substances/bioactive-compounds/glutathione"],
    ["Zinc", "3.1.1", "/docs/substances/nutrients/micronutrients/minerals/trace/zinc"],
    ["Manganese", "3.1.1", "/docs/substances/nutrients/micronutrients/minerals/trace/manganese"],
    ["Selenium", "3.1.1", "/docs/substances/nutrients/micronutrients/minerals/trace/selenium"],
    ["Copper", "3.1.1", "/docs/substances/nutrients/micronutrients/minerals/trace/copper"],
  ];
  for (const [label, section, href] of expected) {
    const disclosure = map.get(dietaryLeverBulletKey(label, "", section));
    assert.ok(disclosure, label);
    assert.equal(disclosure.inputHref, href);
    assert.equal(disclosure.titleHref, undefined);
  }

  assert.equal(substanceHrefForInput("Creatine supplementation"), undefined);
  assert.equal(substanceHrefForInput("glutathione peroxidase"), undefined);
});

test('NAD B3 form documentation links remain distinct and do not change the six-atom projection',async()=>{
 const {buildSubstanceInputPages}=await import('./lib/substance-input-pages.mjs');
 const pages=buildSubstanceInputPages(),data=readNadPm2().data;
 const base='/docs/substances/nutrients/micronutrients/vitamins/vitamin-b3';
 assert.equal(substanceHrefForInput('Niacinamide',pages),base+'#nicotinamide');
 assert.equal(substanceHrefForInput('Nicotinamide (a form of vitamin B3)',pages),base+'#nicotinamide');
 assert.equal(substanceHrefForInput('Nicotinic acid (a form of vitamin B3)',pages),base+'#nicotinic-acid');
 assert.equal(substanceHrefForInput('Vitamin B3',pages),base);
 assert.equal(substanceHrefForInput('Niacin',pages),base);
 assert.equal(substanceHrefForInput('Unregistered B3 derivative',pages),undefined);
 const before=structuredClone(data),map=buildDietaryLeverDisclosureMap(data);
 for(const [label,id] of [['Nicotinamide (a form of vitamin B3)','nicotinamide'],['Nicotinic acid (a form of vitamin B3)','nicotinic-acid']]){
  const disclosure=map.get(dietaryLeverBulletKey(label,'','3.1.1'));
  assert.equal(disclosure.inputHref,base+'#'+id);
  assert.equal(disclosure.titleHref,undefined);
  assert.equal(disclosure.dietaryInput,true);
 }
 assert.deepEqual(data,before);
 const renderer=fs.readFileSync('src/lib/pmInputFoodDisclosure.ts','utf8');
 assert.match(renderer,/No verified sources yet/);
 assert.match(renderer,/createFoodSourceDetails\('Plant-based'/);
 assert.match(renderer,/createFoodSourceDetails\('Animal-based'/);
});

// Execute the real renderer, with generated scope loading isolated from these disposable fixtures.
const rendererModule = new Module(PM_INPUT_FOOD_DISCLOSURE);
rendererModule.filename = PM_INPUT_FOOD_DISCLOSURE;
const rendererRequire = createRequire(PM_INPUT_FOOD_DISCLOSURE);
rendererModule.require = id => id.endsWith('inputMappingScopes.mjs') ? {__esModule:true,default:{}}
 : id.endsWith('inputSubstanceFoodSelection.mjs') ? foodSelection : id.endsWith('foodTargetTraceability.mjs') ? foodTargetTraceability : id.endsWith('aggregateFoodComposition.mjs') ? aggregateFoodComposition : rendererRequire(id);
rendererModule._compile(ts.transpileModule(fs.readFileSync(PM_INPUT_FOOD_DISCLOSURE,'utf8'),{
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022},
}).outputText,PM_INPUT_FOOD_DISCLOSURE);
const {renderFoodSourceItem,selectFoodDisclosureSources,renderFoodSourceSummary,renderProvenance} = rendererModule.exports;

test('Beetroot betaine resolves the verified USDA quantity while provenance stays on its food page',()=>{
 const mapping=buildInputSubstanceFood(process.cwd(),{brs:'BRS2'});
 const source=mapping.food_sources.find(s=>s.food_id==='beetroot'&&s.substance_id==='betaine');
 assert.ok(source);const obs=source.observations[0];
 assert.equal(obs.value,130);assert.equal(obs.unit,'mg');assert.equal(obs.verified,true);
 assert.equal(obs.basis,'per 100 g edible portion');assert.equal(obs.preparation,'raw');
 assert.equal(obs.source_reference,'#food-source-4');assert.match(obs.source_url,/ars\.usda\.gov.*Choln02\.pdf/);
 assert.equal(obs.rank_eligible,false);assert.equal(obs.comparison_group,null);
 const item=selectFoodDisclosureSources([source])[0],$=parseHtml(renderFoodSourceItem(item));
 assert.equal($.text(),'Beetroot — 130 mg per 100 g · raw');
 assert.equal($('a').length,1);assert.equal($('a').attr('href'),'/docs/foods/beetroot');
 assert.doesNotMatch($.text(),/Patterson|Analytical qualification|Studied material|ranking|Source/);
 assert.equal(renderProvenance(item),'');
 const food=fs.readFileSync('docs/foods/beetroot.md','utf8');
 assert.match(food,/id="food-source-4"/);assert.match(food,/BRAIN-Diet-References#patterson_choline_2008/);
 assert.match(food,/130 mg betaine per 100 g of raw beets/);
});

test('Spinach and wheat germ presence provenance produces one row each without deleting evidence',()=>{
 const mapping=buildInputSubstanceFood(process.cwd(),{brs:'BRS2'});
 const sources=mapping.food_sources.filter(s=>s.substance_id==='betaine'&&['spinach','wheat-germ'].includes(s.food_id));
 assert.equal(sources.length,2);
 assert.ok(sources.every(s=>s.observations.length===0&&s.presence_records.length===2));
 const before=structuredClone(sources),selected=selectFoodDisclosureSources(sources);
 assert.equal(selected.length,2);
 for(const id of ['spinach','wheat-germ']) {
  const rows=selected.filter(s=>s.food_id===id);assert.equal(rows.length,1);
  assert.equal(rows[0].presence_records.length,2);
  assert.match(parseHtml(renderFoodSourceItem(rows[0])).text(),/value not known/);
 }
 assert.deepEqual(sources,before);
 // A separately recorded preparation remains distinct, even without a quantity.
 const cooked={...structuredClone(sources[0]),id:'spinach::betaine::spinach cooked::cooked',material:'Spinach, cooked',preparation:'cooked'};
 cooked.presence_records=cooked.presence_records.map(p=>({...p,record:p.record+'-cooked-fixture'}));
 assert.equal(selectFoodDisclosureSources([...sources,cooked]).filter(s=>s.food_id==='spinach').length,2);
});

const c1Source = (food, substance, value, extra={}) => ({
 id:food+'::'+substance,food_id:food,food_title:food==='chicken'?'Chicken':'Chickpeas',
 food_page:'/docs/foods/'+food,substance_id:substance,material:food==='chicken'?'Chicken breast':'Chickpea',preparation:'unknown',
 observations:[{id:food+'::'+substance,value,unit:'mg',display:value+' mg',low:value,high:value,verified:true,
 basis:'per 100 g sample; fresh/dry basis not reported',preparation:'unknown',material:food==='chicken'?'Chicken breast':'Chickpea',
 source_reference:'#food-source-4',source_url:'https://www.ejast.org/archive/view_article?pid=jast-61-3-138',
 public_note:'Method-defined extractable analyte; native free-vitamer concentration and dietary availability are not established.',
 source_note:'Synthetic Çatak fixture: 0.1 N HCl, heated acid extraction at 121 °C for 30 min before HPLC; laboratory extraction, not cooking.',
 rank_eligible:false,comparison_group:null,...extra}],
});
test('C1 real renderer keeps all four synthetic quantities, full basis, material, unknown preparation and source beside each amount',()=>{
 const sources=[c1Source('chicken','nicotinamide',5.442),c1Source('chicken','nicotinic-acid',3.739),c1Source('chickpeas','nicotinamide',1.412),c1Source('chickpeas','nicotinic-acid',1.681)];
 const selected=selectFoodDisclosureSources(sources);
 assert.equal(selected.length,4);
 for(const item of selected){
  const html=renderFoodSourceItem(item),$=parseHtml(html),text=$.text();
  assert.ok(text.includes(item.observations[0].display));
  assert.ok(text.includes('per 100 g sample; fresh/dry basis not reported'));
  assert.ok(text.includes('Studied material: '+item.material));
  assert.ok(text.includes('unknown'));assert.ok(text.includes('native free-vitamer'));
  assert.ok(text.includes('Analytical qualification:'));
  assert.ok(text.includes('no concentration ranking'));
  assert.equal($('a').last().attr('href'),item.food_page+'#food-source-4');
  assert.doesNotMatch(text,/cooked|raw|roasted/);
 }
});
test('C1 renderer preserves multiple observations, removes exact canonical duplicates and withholds unverified quantities',()=>{
 const first=c1Source('chicken','nicotinamide',5.442);
 const alternate=c1Source('chicken','nicotinamide',123,{id:'alternate',display:'123 µg',unit:'µg',basis:'per g dry material',preparation:null,material:'Chicken breast, alternative assay',source_reference:'#food-source-5'});
 const held=c1Source('chicken','nicotinamide',999,{id:'held',verified:false,display:'999 mg'});
 const multi={...first,observations:[...first.observations,...alternate.observations,...held.observations]};
 const selected=selectFoodDisclosureSources([multi,first]);
 assert.equal(selected.length,3);
 const $=parseHtml(selected.map(renderFoodSourceItem).join(''));
 assert.ok($.text().includes('123 µg (per g dry material)'));
 assert.ok($.text().includes('Chicken breast, alternative assay'));
 assert.ok($.text().includes('form not known'));
 assert.ok($.text().includes('value not known'));
 assert.doesNotMatch($.text(),/999/);
 assert.deepEqual(selectFoodDisclosureSources([c1Source('chicken','nicotinamide',888,{public_display:'internal-only'})]),[]);
 assert.equal($('a[href="/docs/foods/chicken#food-source-5"]').length,1);
 // No verified quantities are manufactured for presence-only sources.
 assert.match(renderFoodSourceItem({...first,observations:[]}),/value not known/);
});
test('C1 concentration ranking needs explicit compatible analytical groups and does not reject preparation differences',()=>{
 const comparable=(food,value,preparation,extra={})=>c1Source(food,'nicotinamide',value,{basis:'per 100 g edible material',comparison_group:'reviewed-protocol-A',rank_eligible:true,preparation,...extra});
 const selected=selectFoodDisclosureSources([comparable('chickpeas',1.412,'boiled'),comparable('chicken',5.442,'raw')]);
 assert.deepEqual(selected.map(s=>s.food_id),['chicken','chickpeas']);
 assert.ok(selected.every(s=>/Concentration order/.test(s.comparisonNotice)));
 const overlapping=selectFoodDisclosureSources([comparable('chicken',5,'raw',{low:3,high:6,range:[3,6]}),comparable('chickpeas',4,'boiled',{low:4,high:7,range:[4,7]})]);
 assert.ok(overlapping.every(s=>/no concentration ranking/.test(s.comparisonNotice)));
 const otherAnalyte=c1Source('chickpeas','nicotinic-acid',100,{basis:'per 100 g edible material',comparison_group:'reviewed-protocol-A',rank_eligible:true});
 const incompatible=selectFoodDisclosureSources([otherAnalyte,...selected,comparable('chicken',88,'raw',{id:'dry',basis:'per 100 g dry material',comparison_group:'protocol-B'})]);
 assert.notEqual(incompatible[0].observations[0].value,100); // No global amount sort across analytes/methods/bases.
 const unresolved=selectFoodDisclosureSources([c1Source('chickpeas','nicotinamide',99),c1Source('chicken','nicotinamide',1)]);
 assert.deepEqual(unresolved.map(s=>s.food_id),['chicken','chickpeas']);
 assert.ok(unresolved.every(s=>/no concentration ranking/.test(s.comparisonNotice)));
});
test('C1 ordinary Methionine and magnesium projection retains actual renderer ordering, links, quantities and preparation',()=>{
 const data=buildInputSubstanceFood(process.cwd(),{brs:'BRS2'});
 for(const id of ['methionine','magnesium']){
  const sources=data.food_sources.filter(s=>s.substance_id===id);
  const expected=[...sources].sort((a,b)=>Math.max(...b.observations.flatMap(o=>[o.high,o.low,o.value]))-Math.max(...a.observations.flatMap(o=>[o.high,o.low,o.value]))||a.food_title.localeCompare(b.food_title)).slice(0,5);
  const selected=selectFoodDisclosureSources(sources);
  assert.deepEqual(selected.map(s=>s.food_id),expected.map(s=>s.food_id));
  for(const item of selected){
   const $=parseHtml(renderFoodSourceItem(item));
   assert.equal($('a').first().attr('href'),item.food_page);
   assert.ok($.text().includes(item.observations[0].display));
   assert.ok($.text().includes(item.preparation==='uncooked'?'raw':item.preparation==='oil'?'oil':item.preparation || 'form not known'));
   assert.doesNotMatch($.text(),/Analytical qualification/);
  }
 }
 const nad=buildInputSubstanceFood(process.cwd(),{brs:'BRS4'});
 assert.deepEqual(nad.relationships.filter(r=>r.pm==='BRS4-FM1-PM2').map(r=>[r.substance_id,r.dietary_input,r.relationship_type.classification]),[
  ['nicotinamide',true,'direct'],['nicotinic-acid',true,'direct'],['tryptophan',true,'derived'],['nad-plus',false,null],['nicotinamide-riboside',true,'derived'],
 ]);
 assert.equal(nad.food_sources.filter(s=>s.substance_id==='tryptophan').length,3);
});

test('rollout summaries show the first food quantity and basis without analytical clutter; audit renderers retain provenance',()=>{
 const item=selectFoodDisclosureSources([c1Source('chicken','nicotinamide',5.442)])[0];
 const $=parseHtml('<details><summary>'+renderFoodSourceSummary('Animal-based',item)+'</summary></details>');
 const summary=$('details:not([open]) > summary');
 assert.match(summary.text(),/Animal-based - Chicken 5\.442 mg .* - unknown/);
 assert.match(summary.text(),/5\.442 mg \(per 100 g sample; fresh\/dry basis not reported\)/);
 assert.equal(summary.find('details').length,0);
 assert.doesNotMatch(summary.text(),/Studied material|Analytical qualification|no concentration ranking|food-source/);
 const expanded=parseHtml(renderFoodSourceItem(item));
 assert.match(expanded('details > summary').text(),/Source qualifications/);
 assert.match(expanded('details').text(),/native free-vitamer/);
 assert.equal(expanded('details a').attr('href'),'/docs/foods/chicken#food-source-4');
 const provenance=parseHtml(renderProvenance(item));
 assert.equal(provenance('details > summary').text(),'Measurement provenance');
 assert.match(provenance('p').text(),/121 °C/);
 assert.equal(provenance('a').attr('href'),item.observations[0].source_url);
 assert.match(renderFoodSourceSummary('Plant-based'),/No verified sources yet/);
 const legacy=selectFoodDisclosureSources([c1Source('chicken','nicotinamide',5.442,{rank_eligible:true,comparison_group:'edible::raw'})]);
 assert.match(legacy[0].comparisonNotice,/no concentration ranking/);
});

test('C1 supported qualitative presence retains source limitations and cannot expose a withheld numerical value',()=>{
 const source=c1Source('chicken','nicotinamide',999);
 source.observations=[];
 source.presence_records=[{record:'presence-only',source_reference:'#food-source-4',source_url:'https://example.org/assay',public_note:'Method-defined extractable analyte; amount not established.',value:999,verified:false}];
 const items=selectFoodDisclosureSources([source]);
 const $=parseHtml(renderFoodSourceItem(items[0]));
 assert.match($.text(),/value not known/);assert.match($.text(),/amount not established/);
 assert.doesNotMatch($.text(),/999/);
 assert.equal($('a').last().attr('href'),'/docs/foods/chicken#food-source-4');
});

test('admitted food targets retain plant and animal disclosures and provisional rendering',()=>{
 const source=fs.readFileSync(PM_INPUT_FOOD_DISCLOSURE,'utf8');
 const branch=source.slice(source.indexOf("if (section === '3.1.1'"));
 assert.match(branch,/Plant-based/);assert.match(branch,/Animal-based/);
 assert.match(branch,/inputCoverageWarnings\(relationships\)/);assert.match(branch,/renderCoverageWarning\(warnings\)/);
 assert.match(source,/box\.insertAdjacentHTML\('beforeend', renderFoodMappingNotes\(sources\)\)/);
});

test('PM4 ETC iron keeps Nori mapping provenance with foods, outside the substance disclosure',()=>{
 const mapping=buildInputSubstanceFood(process.cwd(),{brs:'BRS4'});
 const iron=mapping.relationships.find(r=>r.pm==='BRS4-FM1-PM1'&&r.substance_id==='iron');
 const before=JSON.stringify(iron);
 const warning=iron.coverage_warnings.find(w=>w.startsWith('Nori → Iron'));
 assert.ok(warning);
 assert.ok(!foodTargetTraceability.inputCoverageWarnings([iron]).includes(warning));
 const $=parseHtml(rendererModule.exports.renderFoodMappingNotes(iron.food_targets.filter(f=>f.food_id==='nori')));
 assert.equal($('details > summary').text(),'Food-source mapping notes');
 assert.equal($('details .food-target-coverage-warning').text().trim(),'ⓘ '+warning);
 assert.equal($('.brs-dietary-lever-detail-inner, .brs-dietary-lever-detail-k').length,0);
 assert.equal(JSON.stringify(iron),before);
});

test('food warning relocation preserves input identity and conversion warnings and honest mapping states',()=>{
 const food={food_id:'sample',food_title:'Sample',substance_id:'iron',substance_title:'Iron',mapping_status:'research-supported-provisional'};
 const foodWarning=foodTargetTraceability.foodTargetCoverageWarning(food);
 const inputWarnings=['Vitamin B6 → PLP: conversion pathway reconciliation pending.','Input: canonical substance identity unresolved.'];
 const relationship={input:'Iron',food_targets:[food],coverage_warnings:[foodWarning,...inputWarnings]};
 assert.deepEqual(foodTargetTraceability.inputCoverageWarnings([relationship]),inputWarnings);
 const notes=rendererModule.exports.renderFoodMappingNotes([food,food]);
 assert.equal(parseHtml(notes)('.food-target-coverage-warning').length,1);
 assert.doesNotMatch(notes,/Vitamin B6|canonical substance identity unresolved/);
 assert.equal(rendererModule.exports.renderFoodMappingNotes([{...food,mapping_status:'verified'}]),'');
 assert.equal(rendererModule.exports.renderFoodMappingNotes([]),'');
});
