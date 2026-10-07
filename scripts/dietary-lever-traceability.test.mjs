import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
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

function readPm8() {
  return matter(fs.readFileSync(PM9, "utf8"));
}

function readPm3() {
  return matter(fs.readFileSync(PM3, "utf8"));
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

test("System Optimisation Practices and Lifestyle Priorities use the shared five-atom contract", () => {
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

test("BRS5 KC1 and PM1 expose independent five-atom constituent relationships", () => {
  const pm = readBrs5Pm1();
  const kc = readBrs5Kc1();
  const pmMap = buildDietaryLeverDisclosureMap(pm.data);
  const kcMap = buildDietaryLeverDisclosureMap(kc.data);
  const labels = [
    "Inulin-type fructans and galacto-oligosaccharides",
    "Pectin",
    "Resistant starch",
  ];

  assert.equal(kc.data.kc_evidence_review_status, "canonical");
  assert.equal(kc.data.kc_input_traceability.length, 3);
  for (const label of labels) {
    const pmDisclosure = pmMap.get(dietaryLeverBulletKey(label, "", "3.1.3"));
    const kcDisclosure = kcMap.get(dietaryLeverBulletKey(label, ""));
    assert.ok(pmDisclosure, `${label} must resolve through a PM-owned atom`);
    assert.ok(kcDisclosure, `${label} must resolve through a separate KC-owned atom`);
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

test("BRS2 KC1 Emerging Biological Supports expose separate five-field disclosures", () => {
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

test("BRS2 KC1 Evidence Base titles expose constituent five-field disclosures", () => {
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

test("PM9 lever atoms resolve five-atom currency from PM evidence", () => {
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

test("dietary candidates require all five atoms, resolvable evidence, and a Direct derived target", () => {
  const { data } = readPm8();

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

  const nonDirectTarget = structuredClone(data);
  nonDirectTarget.dietary_lever_atoms.find((row) => row.atom_id === "PM9-DIT-2")
    .requirement_classification = "derived";
  const targetIssues = [];
  validateDietaryLeverAtoms(nonDirectTarget, targetIssues, { entityLabel: "non-direct-target" });
  assert.ok(targetIssues.some((issue) => issue.code === "dla_derived_target_not_direct"));
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
  assert.equal(data.dietary_lever_presentations?.length, 4);
  assert.ok(section3.includes("- Vitamin B6"));
  assert.equal(
    (section3.match(/- Pyridoxal 5′-phosphate \(PLP; active vitamin B6 cofactor\)/g) || []).length,
    2,
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
  assert.ok(!content.includes("PM9-DIT-"));
  assert.equal(data.cofactors?.[0], "Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor)");
  const issues = [];
  validateDietaryLeverAtoms(data, issues, { entityLabel: "BRS1-FM4-PM9" });
  assert.deepEqual(issues, []);
  const map = buildDietaryLeverDisclosureMap(data);
  assert.equal(map.size, 4);
  assert.equal(
    map.get(dietaryLeverBulletKey("Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor)", "", "3.1.1"))
      .compactQualifier,
    "Direct · Cofactor",
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
  assert.equal(magnesium.relationship_layer, "biochemical-requirement");
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

  const disclosures = [...buildDietaryLeverDisclosureMap(data).values()].filter(item => item.inputType !== "Supported upstream supply");
  assert.equal(disclosures.length, 6);
  assert.deepEqual(
    disclosures.map((item) => item.title),
    [
      "Methionine",
      "Dietary protein",
      "Methionine",
      "ATP",
      "Magnesium ions (Mg²⁺)",
      "Potassium ions (K⁺)",
    ],
  );
  assert.ok(disclosures.every((item) => item.evidenceReferences.length > 0));
  assert.ok(disclosures.every((item) => item.evidenceLimitation));
  assert.ok(
    disclosures.every((item) =>
      item.evidenceReferences.every((ref) => ref.label && !ref.label.includes("PM3-")),
    ),
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
  assert.ok(section311.includes("- Dietary protein"));
  assert.ok(!section311.includes("ATP"));
  assert.ok(section312.includes("- Methionine"));
  assert.ok(section312.includes("- ATP"));
  assert.ok(section312.includes("- Magnesium ions (Mg²⁺)"));
  assert.ok(section312.includes("- Potassium ions (K⁺)"));
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

test("one atom renders relationship-specific qualifiers without Direct/Derived leakage", () => {
  const fixture = {
    dietary_input_traceability: [
      {
        atom_id: "EX-DIT-1",
        input: "Methionine",
        input_type: "substrate",
        biological_role: "Substrate for MAT-dependent synthesis of SAMe",
        evidence_source: { pathway_resources: ["example"] },
        evidence_limitation: "Example limitation",
      },
      {
        atom_id: "EX-DIT-2",
        input: "Dietary protein / amino-acid provision",
        input_type: "substrate provision",
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
      { atom_id: "EX-DIT-2", label: "Dietary protein", presentation_section: "3.1.1" },
      { atom_id: "EX-DIT-1", label: "Methionine", presentation_section: "3.1.2" },
      {
        atom_id: "EX-DIT-1",
        label: "Methionine substrate context",
        presentation_section: "3.1.3",
      },
    ],
  };
  const issues = [];
  validateDietaryLeverAtoms(fixture, issues, { entityLabel: "direct-derived" });
  assert.deepEqual(issues, []);
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
    map.get(dietaryLeverBulletKey("Dietary protein", "", "3.1.1")).compactQualifier,
    "Derived · Substrate Provision → Methionine",
  );
  assert.equal(
    map.get(dietaryLeverBulletKey("Methionine", "", "3.1.2")).compactQualifier,
    "Substrate",
  );
  assert.equal(
    map.get(
      dietaryLeverBulletKey("Methionine substrate context", "", "3.1.3"),
    ).compactQualifier,
    "",
  );
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
  assert.equal((mg.dietary_lever_atoms || []).length, 1);
  assert.equal(isBiochemicalRequirementAtom(mg.dietary_lever_atoms[0]), true);
  assert.equal(isDietaryRequirementAtom(mg.dietary_lever_atoms[0]), false);
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
  assert.deepEqual(issues, []);
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
    ["Zinc", "3.1.2", "/docs/substances/nutrients/micronutrients/minerals/trace/zinc"],
    ["Manganese", "3.1.2", "/docs/substances/nutrients/micronutrients/minerals/trace/manganese"],
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
