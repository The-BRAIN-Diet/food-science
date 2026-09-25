import test from "node:test";
import assert from "node:assert/strict";
import {
  buildCanonicalKcIndex,
  validateKcOwnedEvidence,
  validatePmKcGovernance,
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
