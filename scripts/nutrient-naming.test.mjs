import test from "node:test";
import assert from "node:assert/strict";
import {
  PLP_LABEL,
  preferredVitaminLabelFor,
  validateStructuredVitaminLabels,
} from "./lib/nutrient-naming.mjs";

test("preferred vitamin labels replace superseded structured aliases", () => {
  assert.equal(preferredVitaminLabelFor("B9 - Folate (B9)"), "Vitamin B9 (folate)");
  assert.equal(preferredVitaminLabelFor("B3 - Nicotinamide (B3)"), "Nicotinamide (a form of vitamin B3)");
  assert.equal(preferredVitaminLabelFor("Nicotinamide"), "Nicotinamide (a form of vitamin B3)");
  assert.equal(preferredVitaminLabelFor("Vitamin B12"), "Vitamin B12 (cobalamin)");
  assert.equal(preferredVitaminLabelFor("Pyridoxal-5′-phosphate (PLP)"), PLP_LABEL);
  assert.equal(preferredVitaminLabelFor("Pyridoxal 5'-phosphate"), PLP_LABEL);
  assert.equal(preferredVitaminLabelFor(PLP_LABEL), null);
  assert.equal(preferredVitaminLabelFor("Vitamin B6"), null);
  assert.equal(preferredVitaminLabelFor("B6"), "Vitamin B6");
  assert.equal(preferredVitaminLabelFor("niacin"), "Vitamin B3 (niacin)");
  assert.equal(preferredVitaminLabelFor("B2"), "Vitamin B2 (riboflavin)");
  assert.equal(preferredVitaminLabelFor("Vitamin B5 (pantothenate)"), null);
  assert.equal(preferredVitaminLabelFor("Riboflavin supplementation in MTHFR 677TT"), null);
  assert.equal(preferredVitaminLabelFor("PLP"), null);
});

test("structured vitamin check flags only whole-label aliases", () => {
  const issues = [];
  validateStructuredVitaminLabels(
    {
      dietary_input_traceability: [{ input: "B2 - Riboflavin (B2)" }, { input: "Iron" }],
      cofactors: ["Riboflavin", "Tryptophan"],
      kc_emerging_support_traceability: [{ input: "Riboflavin supplementation in MTHFR 677TT" }],
    },
    issues,
    {
      entityLabel: "fixture",
      content: "- B9 - Folate (B9)\n- Folate insufficiency can constrain remethylation.\n",
    },
  );
  assert.deepEqual(
    issues.map((issue) => issue.message),
    [
      'fixture: dietary_input_traceability[0].input "B2 - Riboflavin (B2)" — use "Vitamin B2 (riboflavin)"',
      'fixture: cofactors[0] "Riboflavin" — use "Vitamin B2 (riboflavin)"',
      'fixture: public bullet "B9 - Folate (B9)" — use "Vitamin B9 (folate)"',
    ],
  );
});
