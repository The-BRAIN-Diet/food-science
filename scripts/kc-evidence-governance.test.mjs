import test from "node:test";
import assert from "node:assert/strict";
import {
  buildCanonicalKcIndex,
  isAdmittedIkcConstituent,
  validateKcApplicabilityAdjudications,
  validateKcOwnedEvidence,
  validateKcCoreMembershipProjection,
  validatePmKcGovernance,
  validateStage2bDietaryRequirementLayers,
} from "./lib/kc-evidence-governance.mjs";

const KC = {
  kc_id: "BRS9(KC1)",
  references: [
    "[Example source (2026) — KC evidence](/docs/papers/BRAIN-Diet-References#example_kc_source)",
  ],
  kc_evidence_review_status: "canonical",
  kc_input_traceability: [
    {
      atom_id: "BRS9-KC1-KIT-1",
      input: "Example substrate",
      input_type: "substrate",
      biological_role: "Contributes to the constrained substrate pool shared by distinct mechanisms",
      evidence_source: { citation_keys: ["example_kc_source"] },
      evidence_limitation: "The evidence establishes pool membership, not benefit from additional intake.",
    },
  ],
  kc_constituent_presentations: [
    { atom_id: "BRS9-KC1-KIT-1", section: "core-nutritional-requirements" },
  ],
};

const PM = {
  pm_id: "BRS9-FM1-PM1",
  scientific_findings: [
    { id: "PM1-F1" },
  ],
  dietary_input_traceability: [
    {
      atom_id: "BRS9-FM1-PM1-DIT-1",
      input: "Example substrate",
      input_type: "substrate",
      biological_role: "Serves as the reaction substrate required by this PM.",
      evidence_source: { finding_ids: ["PM1-F1"] },
    },
  ],
  key_constraints: ["BRS9(KC1) - Example constrained pool"],
  pm_kc_relationships: [
    {
      relationship_id: "BRS9-FM1-PM1-KCR-1",
      kc_id: "BRS9(KC1)",
      pm_biological_role: "The PM draws on the constrained pool for its reaction substrate.",
      evidence_source: { finding_ids: ["PM1-F1"] },
      evidence_limitation: "Relevance does not establish intake responsiveness.",
      constituent_relationships: [
        {
          relationship_id: "BRS9-FM1-PM1-KCI-1",
          pm_atom_id: "BRS9-FM1-PM1-DIT-1",
          kc_membership_status: "canonical-reviewed",
          kc_atom_id: "BRS9-KC1-KIT-1",
        },
      ],
    },
  ],
};

test("canonical KC constituents carry five-atom evidence and projected identity", () => {
  const issues = [];
  validateKcOwnedEvidence(KC, issues, { entityLabel: KC.kc_id });
  assert.deepEqual(issues, []);
});

test("KC Emerging Biological Supports require five-field support atoms and presentations", () => {
  const data = structuredClone(KC);
  data.kc_emerging_support_traceability = [
    {
      atom_id: "BRS9-KC1-EBS-1",
      input: "Example intervention",
      input_type: "nutrient/substance",
      biological_role: "Reduces a defined demand on the constrained resource.",
      evidence_source: { citation_keys: ["example_kc_source"] },
      evidence_limitation: "Demand reduction does not establish redistribution or functional benefit.",
    },
  ];
  data.kc_emerging_support_presentations = [
    {
      atom_id: "BRS9-KC1-EBS-1",
      support_slug: "example-intervention",
      label: "Example intervention",
    },
  ];

  const issues = [];
  validateKcOwnedEvidence(data, issues, { entityLabel: data.kc_id });
  assert.deepEqual(issues, []);

  delete data.kc_emerging_support_traceability[0].evidence_limitation;
  const missing = [];
  validateKcOwnedEvidence(data, missing, { entityLabel: data.kc_id });
  assert.ok(missing.some((issue) => issue.code === "kc_emerging_support_missing_limitation"));
});

test("canonical KC review rejects invalid constraint_status overlay", () => {
  const data = structuredClone(KC);
  data.kc_input_traceability[0].constraint_status = "nutritional requirement";
  const issues = [];
  validateKcOwnedEvidence(data, issues, { entityLabel: data.kc_id });
  assert.equal(issues[0]?.code, "kc_atom_invalid_constraint_status");
});

test("KC pages may carry change-control flags with citation provenance", () => {
  const data = structuredClone(KC);
  data.kc_change_control_flags = [
    {
      flag_id: "KC-CC-BRS9-KC1-01",
      flag_type: "ikc-scope-conflict",
      kc_id: "BRS9(KC1)",
      proposition: "Example unresolved grouping proposition.",
      evidence_source: { citation_keys: ["example_kc_source"] },
      status: "pending-kc-review",
    },
  ];
  const issues = [];
  validateKcOwnedEvidence(data, issues, { entityLabel: data.kc_id });
  assert.deepEqual(issues, []);
});

test("canonical KC review rejects incomplete atoms and Markdown-owned presentation overrides", () => {
  const data = structuredClone(KC);
  delete data.kc_input_traceability[0].evidence_source;
  data.kc_constituent_presentations[0].biological_role = "Copied scientific record";
  const issues = [];
  validateKcOwnedEvidence(data, issues, { entityLabel: data.kc_id });
  assert.deepEqual(
    new Set(issues.map(({ code }) => code)),
    new Set(["kc_atom_missing_evidence_source", "kc_presentation_scientific_override"]),
  );
});

test("PM science resolves through its own atom even when canonical KC identity is linked", () => {
  const issues = [];
  const index = buildCanonicalKcIndex([KC]);
  validatePmKcGovernance(PM, issues, { entityLabel: PM.pm_id, canonicalKcIndex: index });
  assert.deepEqual(issues, []);
  assert.equal(PM.pm_kc_relationships[0].constituent_relationships[0].input, undefined);
  assert.notEqual(
    PM.dietary_input_traceability[0].biological_role,
    KC.kc_input_traceability[0].biological_role,
  );
});

test("PM constituent relationship cannot redefine science or reference unknown KC atoms", () => {
  const data = structuredClone(PM);
  const constituent = data.pm_kc_relationships[0].constituent_relationships[0];
  constituent.kc_atom_id = "BRS9-KC1-KIT-404";
  constituent.input_type = "cofactor";
  const issues = [];
  validatePmKcGovernance(data, issues, {
    entityLabel: data.pm_id,
    canonicalKcIndex: buildCanonicalKcIndex([KC]),
  });
  assert.deepEqual(
    new Set(issues.map(({ code }) => code)),
    new Set([
      "pm_kc_constituent_unknown_kc_atom",
      "pm_kc_constituent_scientific_override",
    ]),
  );
});

test("PM adjudication proceeds independently when KC membership remains legacy-unreviewed", () => {
  const data = {
    pm_id: "BRS9-FM1-PM2",
    scientific_findings: [{ id: "PM2-F1" }],
    dietary_input_traceability: [
      {
        atom_id: "BRS9-FM1-PM2-DIT-1",
        input: "Legacy-listed input",
        input_type: "substrate",
        biological_role: "Independently supported PM-specific substrate role.",
        evidence_source: { finding_ids: ["PM2-F1"] },
      },
    ],
    pm_kc_relationships: [
      {
        relationship_id: "BRS9-FM1-PM2-KCR-1",
        kc_id: "BRS9(KC2)",
        pm_biological_role: "PM-specific relevance is independently supported.",
        evidence_source: { finding_ids: ["PM2-F1"] },
        constituent_relationships: [
          {
            relationship_id: "BRS9-FM1-PM2-KCI-1",
            pm_atom_id: "BRS9-FM1-PM2-DIT-1",
            kc_membership_status: "legacy-unreviewed",
            legacy_kc_constituent_label: "Legacy-listed input",
            kc_change_control_flag_id: "KC-CC-BRS9-FM1-PM2-01",
          },
        ],
      },
    ],
    kc_change_control_flags: [
      {
        flag_id: "KC-CC-BRS9-FM1-PM2-01",
        flag_type: "constituent-challenge",
        kc_id: "BRS9(KC2)",
        proposition: "Whether the independently adjudicated PM input belongs to KC2.",
        evidence_source: { finding_ids: ["PM2-F1"] },
        status: "pending-kc-review",
      },
    ],
  };
  const legacyIndex = buildCanonicalKcIndex([
    { kc_id: "BRS9(KC2)", kc_evidence_review_status: "legacy-unreviewed" },
  ]);
  const issues = [];
  validatePmKcGovernance(data, issues, {
    entityLabel: data.pm_id,
    canonicalKcIndex: legacyIndex,
  });
  assert.deepEqual(issues, []);
});

test("retired KCs cannot remain in legacy or canonical PM projections", () => {
  const issues = [];
  validatePmKcGovernance(
    {
      pm_id: "BRS5-FM9-PM9",
      key_constraints: ["BRS5(KC3) - Retired"],
      pm_kc_relationships: [
        {
          relationship_id: "BRS5-FM9-PM9-KCR-1",
          kc_id: "BRS5(KC3)",
          pm_biological_role: "Invalid retired relationship",
          evidence_source: { pathway_resources: ["Example pathway"] },
        },
      ],
    },
    issues,
    { entityLabel: "BRS5-FM9-PM9" },
  );
  assert.deepEqual(
    new Set(issues.map(({ code }) => code)),
    new Set(["pm_retired_kc_projection", "pm_retired_kc_relationship"]),
  );
});

test("KC change-control flags preserve PM/KC ownership boundaries", () => {
  const issues = [];
  validatePmKcGovernance(
    {
      pm_id: "BRS9-FM1-PM2",
      scientific_findings: [{ id: "PM2-F1" }],
      kc_change_control_flags: [
        {
          flag_id: "KC-CC-BRS9-FM1-PM2-01",
          flag_type: "constituent-challenge",
          kc_id: "BRS9(KC1)",
          proposition: "Whether the candidate genuinely belongs to the shared constrained pool.",
          evidence_source: { finding_ids: ["PM2-F1"] },
          status: "pending-kc-review",
        },
      ],
    },
    issues,
    { entityLabel: "BRS9-FM1-PM2" },
  );
  assert.deepEqual(issues, []);
});

test("a KC page may declare multiple iKCs and a PM may reference more than one", () => {
  const kcPage = {
    ...KC,
    individual_key_constraints: [
      { ikc_id: "BRS9(KC1)-IKC1", title: "Pool A" },
      { ikc_id: "BRS9(KC1)-IKC2", title: "Pool B" },
    ],
    kc_input_traceability: [
      { ...KC.kc_input_traceability[0], ikc_id: "BRS9(KC1)-IKC1" },
      {
        atom_id: "BRS9-KC1-KIT-2",
        ikc_id: "BRS9(KC1)-IKC2",
        input: "Second substrate",
        input_type: "substrate",
        biological_role: "Contributes to a second iKC on the same KC page",
        evidence_source: { citation_keys: ["example_kc_source"] },
      },
    ],
    kc_constituent_presentations: [
      { atom_id: "BRS9-KC1-KIT-1", section: "core-nutritional-requirements" },
      { atom_id: "BRS9-KC1-KIT-2", section: "core-nutritional-requirements" },
    ],
  };
  const kcIssues = [];
  validateKcOwnedEvidence(kcPage, kcIssues, { entityLabel: kcPage.kc_id });
  assert.deepEqual(kcIssues, []);

  const pm = structuredClone(PM);
  pm.dietary_input_traceability.push({
    atom_id: "BRS9-FM1-PM1-DIT-2",
    input: "Second substrate",
    input_type: "substrate",
    biological_role: "PM-supported role for the second iKC only.",
    evidence_source: { finding_ids: ["PM1-F1"] },
  });
  pm.pm_kc_relationships[0].ikc_id = "BRS9(KC1)-IKC1";
  pm.pm_kc_relationships.push({
    relationship_id: "BRS9-FM1-PM1-KCR-2",
    kc_id: "BRS9(KC1)",
    ikc_id: "BRS9(KC1)-IKC2",
    pm_biological_role: "The second iKC also applies, independently.",
    evidence_source: { finding_ids: ["PM1-F1"] },
    evidence_limitation: "Applicability of IKC2 does not inherit IKC1 constituents.",
    constituent_relationships: [
      {
        relationship_id: "BRS9-FM1-PM1-KCI-2",
        pm_atom_id: "BRS9-FM1-PM1-DIT-2",
        kc_membership_status: "canonical-reviewed",
        kc_atom_id: "BRS9-KC1-KIT-2",
      },
    ],
  });
  const issues = [];
  validatePmKcGovernance(pm, issues, {
    entityLabel: pm.pm_id,
    canonicalKcIndex: buildCanonicalKcIndex([kcPage]),
  });
  assert.deepEqual(issues, []);
});

test("PM pages must not rewrite iKC membership records", () => {
  const data = structuredClone(PM);
  data.kc_input_traceability = KC.kc_input_traceability;
  const issues = [];
  validatePmKcGovernance(data, issues, { entityLabel: data.pm_id, canonicalKcIndex: buildCanonicalKcIndex([KC]) });
  assert.equal(issues.some((issue) => issue.code === "pm_rewrites_ikc"), true);
});

test("canonical-reviewed membership is not allowed before KC-page evidence review", () => {
  const data = structuredClone(PM);
  const issues = [];
  validatePmKcGovernance(data, issues, {
    entityLabel: data.pm_id,
    canonicalKcIndex: buildCanonicalKcIndex([{ kc_id: "BRS9(KC1)" }]),
  });
  assert.equal(
    issues.some((issue) => issue.code === "pm_kc_canonical_membership_before_kc_review"),
    true,
  );
});

test("Stage 2B requires PM↔iKC evidence for listed key_constraints and five-atom cofactors", () => {
  const issues = [];
  validateStage2bDietaryRequirementLayers(
    {
      evidence_status: "stage-2b-dietary-addressability",
      key_constraints: ["BRS9(KC1) - Example"],
      cofactors: ["Example substrate"],
      dietary_input_traceability: [],
      pm_kc_relationships: [],
    },
    issues,
    {
      entityLabel: "BRS9-FM1-PM9",
      content: "## 4. Levers\n<strong>4.1.1 Direct and/or Derived Dietary Requirements</strong>\n",
    },
  );
  assert.deepEqual(
    new Set(issues.map(({ code }) => code)),
    new Set([
      "stage2b_missing_cofactor_layer",
      "stage2b_missing_kc_layer",
      "stage2b_cofactor_name_without_atom",
      "stage2b_kc_index_unadjudicated",
    ]),
  );
});

test("ikc-scope-conflict is a valid KC review flag", () => {
  const issues = [];
  validatePmKcGovernance(
    {
      pm_id: "BRS9-FM1-PM2",
      scientific_findings: [{ id: "PM2-F1" }],
      kc_change_control_flags: [
        {
          flag_id: "KC-CC-BRS9-FM1-PM2-02",
          flag_type: "ikc-scope-conflict",
          kc_id: "BRS9(KC1)",
          ikc_id: "BRS9(KC1)",
          proposition: "PM reviews systematically conflict with the iKC claimed scope.",
          evidence_source: { finding_ids: ["PM2-F1"] },
          status: "pending-kc-review",
        },
      ],
    },
    issues,
    { entityLabel: "BRS9-FM1-PM2" },
  );
  assert.deepEqual(issues, []);
});

test("biochemical requirement alone cannot admit iKC membership", () => {
  const data = structuredClone(KC);
  data.kc_input_traceability.push({
    atom_id: "BRS9-KC1-KIT-2",
    input: "Glutamate",
    input_type: "substrate",
    biological_role: "Required for the tripeptide structure of glutathione.",
    evidence_source: { citation_keys: ["example_kc_source"] },
    constraint_status: "biochemical-requirement",
    ikc_membership: "admitted",
  });
  data.kc_constituent_presentations.push({
    atom_id: "BRS9-KC1-KIT-2",
    section: "core-nutritional-requirements",
  });
  const issues = [];
  validateKcOwnedEvidence(data, issues, { entityLabel: data.kc_id });
  assert.ok(issues.some(({ code }) => code === "kc_atom_requirement_is_not_membership"));
  assert.equal(isAdmittedIkcConstituent(data.kc_input_traceability[1]), false);
});

test("excluded biochemical constituent cannot project as an iKC member or into §3.1.3", () => {
  const kcPage = structuredClone(KC);
  kcPage.kc_input_traceability.push({
    atom_id: "BRS9-KC1-KIT-2",
    input: "Glutamate",
    input_type: "substrate",
    biological_role: "Required for glutathione structure.",
    evidence_source: { citation_keys: ["example_kc_source"] },
    constraint_status: "biochemical-requirement",
    ikc_membership: "excluded",
  });
  kcPage.kc_constituent_presentations.push({
    atom_id: "BRS9-KC1-KIT-2",
    section: "core-nutritional-requirements",
  });
  const kcIssues = [];
  validateKcOwnedEvidence(kcPage, kcIssues, { entityLabel: kcPage.kc_id });
  assert.ok(kcIssues.some(({ code }) => code === "kc_excluded_constituent_projected"));

  const coreIssues = [];
  validateKcCoreMembershipProjection(
    kcPage,
    "### 2. Core Nutritional Requirements\n\n- Example substrate\n- Glutamate\n- Polyphenols ← berries\n\n### 3. Evidence Base\n",
    coreIssues,
    { entityLabel: kcPage.kc_id },
  );
  assert.ok(coreIssues.some(({ code }) => code === "kc_excluded_constituent_in_core"));
  assert.ok(coreIssues.some(({ code }) => code === "kc_legacy_food_arrow"));

  const pm = structuredClone(PM);
  pm.dietary_input_traceability.push({
    atom_id: "BRS9-FM1-PM1-DIT-2",
    input: "Glutamate",
    input_type: "substrate",
    biological_role: "PM-supported GAD substrate role remains valid without iKC membership.",
    evidence_source: { finding_ids: ["PM1-F1"] },
  });
  pm.pm_kc_relationships[0].constituent_relationships.push({
    relationship_id: "BRS9-FM1-PM1-KCI-2",
    pm_atom_id: "BRS9-FM1-PM1-DIT-2",
    kc_membership_status: "canonical-reviewed",
    kc_atom_id: "BRS9-KC1-KIT-2",
  });
  const pmIssues = [];
  validatePmKcGovernance(pm, pmIssues, {
    entityLabel: pm.pm_id,
    canonicalKcIndex: buildCanonicalKcIndex([
      {
        ...kcPage,
        kc_constituent_presentations: [{ atom_id: "BRS9-KC1-KIT-1", section: "core-nutritional-requirements" }],
      },
    ]),
  });
  assert.ok(pmIssues.some(({ code }) => code === "pm_kc_excluded_constituent_projection"));

  const pmWithoutKcProjection = structuredClone(PM);
  pmWithoutKcProjection.dietary_input_traceability.push({
    atom_id: "BRS9-FM1-PM1-DIT-2",
    input: "Glutamate",
    input_type: "substrate",
    biological_role: "PM-supported GAD substrate role remains valid without iKC membership.",
    evidence_source: { finding_ids: ["PM1-F1"] },
  });
  const pmOk = [];
  validatePmKcGovernance(pmWithoutKcProjection, pmOk, {
    entityLabel: pmWithoutKcProjection.pm_id,
    canonicalKcIndex: buildCanonicalKcIndex([
      {
        ...kcPage,
        kc_constituent_presentations: [{ atom_id: "BRS9-KC1-KIT-1", section: "core-nutritional-requirements" }],
      },
    ]),
  });
  assert.deepEqual(pmOk, []);
});

test("legacy presentation cannot silently restore rejected KC constituents as members", () => {
  const kcPage = {
    ...KC,
    kc_input_traceability: [
      ...KC.kc_input_traceability,
      {
        atom_id: "BRS9-KC1-KIT-poly",
        input: "Polyphenols",
        input_type: "nutrient/compound class",
        biological_role: "Rejected mixed-pool member.",
        evidence_source: { citation_keys: ["example_kc_source"] },
        constraint_status: "unsupported",
        ikc_membership: "excluded",
      },
    ],
  };
  const issues = [];
  validateKcOwnedEvidence(
    {
      ...kcPage,
      kc_constituent_presentations: [
        { atom_id: "BRS9-KC1-KIT-1", section: "core-nutritional-requirements" },
        { atom_id: "BRS9-KC1-KIT-poly", section: "core-nutritional-requirements" },
      ],
    },
    issues,
    { entityLabel: kcPage.kc_id },
  );
  assert.ok(issues.some(({ code }) => code === "kc_excluded_constituent_projected"));
});

test("kc_applicability_adjudications must match published mappings when present", () => {
  const established = {
    key_constraints: ["BRS9(KC1) - Example"],
    pm_kc_relationships: [
      {
        relationship_id: "BRS9-FM1-PM1-KCR-1",
        kc_id: "BRS9(KC1)",
        pm_biological_role: "Applies because the shared pool constrains this capacity.",
        evidence_source: { finding_ids: ["PM1-F1"] },
        evidence_limitation: "Applicability is not a Dietary Requirement.",
      },
    ],
    kc_applicability_adjudications: [
      {
        kc_id: "BRS9(KC1)",
        arm_id: "example-arm",
        disposition: "established",
        applicability_mode: "constrained-by",
      },
    ],
  };
  const ok = [];
  validateKcApplicabilityAdjudications(established, ok, { entityLabel: "BRS9-FM1-PM1" });
  assert.deepEqual(ok, []);

  const unpublished = [];
  validateKcApplicabilityAdjudications(
    {
      kc_applicability_adjudications: [
        {
          kc_id: "BRS9(KC1)",
          arm_id: "example-arm",
          disposition: "unassessed",
        },
      ],
      key_constraints: ["BRS9(KC1) - Example"],
      pm_kc_relationships: established.pm_kc_relationships,
    },
    unpublished,
    { entityLabel: "BRS9-FM1-PM1" },
  );
  assert.ok(unpublished.some((issue) => issue.code === "pm_kc_without_established_adjudication"));
  assert.ok(unpublished.some((issue) => issue.code === "kc_index_without_established_adjudication"));

  const missingRow = [];
  validateKcApplicabilityAdjudications(
    {
      kc_applicability_adjudications: [
        {
          kc_id: "BRS9(KC1)",
          arm_id: "example-arm",
          disposition: "established",
          applicability_mode: "governs",
        },
      ],
      pm_kc_relationships: [],
    },
    missingRow,
    { entityLabel: "BRS9-FM1-PM1" },
  );
  assert.ok(missingRow.some((issue) => issue.code === "established_adjudication_missing_pm_kc"));

  const completedEmpty = [];
  validateKcApplicabilityAdjudications(
    {
      kc_applicability_adjudications: [
        {
          kc_id: "BRS9(KC1)",
          arm_id: "quality",
          disposition: "unresolved",
        },
        {
          kc_id: "BRS9(KC1)",
          arm_id: "competitive",
          disposition: "evidence-supported-non-application",
        },
      ],
    },
    completedEmpty,
    { entityLabel: "BRS9-FM1-PM9" },
  );
  assert.deepEqual(completedEmpty, []);
});
