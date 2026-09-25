import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  PM_DIETARY_REQUIREMENTS_HEADINGS,
  PM_DIETARY_REQUIREMENTS_LEGACY_HEADINGS,
  isCofactorsSubstratesTitle,
  isDietaryRequirementsParentTitle,
  isDirectDerivedDietaryTitle,
  isKeyConstraintsDietaryTitle,
} from "./lib/pm-section-layout.mjs";
import { validatePmDietaryRequirementHeadings } from "./lib/mechanism-page-validation.mjs";

const PM8 = path.join(
  process.cwd(),
  "docs/biological-targets/brs1/fm4/brs1-fm4-pm8-gaba-synthesis-capacity.mdx",
);
const PM3 = path.join(
  process.cwd(),
  "docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis.mdx",
);

function leversBlock(parent, children) {
  return [
    `<details>`,
    `<summary><strong>3.1 ${parent}</strong></summary>`,
    ...children.flatMap((title, i) => [
      `<details>`,
      `<summary><strong>3.1.${i + 1} ${title}</strong></summary>`,
      `- example`,
      `</details>`,
    ]),
    `</details>`,
  ].join("\n");
}

test("canonical §3.1 headings use the exact Dietary Requirements wording", () => {
  assert.deepEqual({ ...PM_DIETARY_REQUIREMENTS_HEADINGS }, {
    parent: "Dietary Requirements",
    directDerived: "Direct and/or Derived Dietary Requirements",
    cofactorsSubstrates: "Cofactors and Substrates",
    keyConstraints: "Key Constraints",
  });
  assert.equal(isDietaryRequirementsParentTitle("Dietary Requirements"), true);
  assert.equal(isDirectDerivedDietaryTitle("Direct and/or Derived Dietary Requirements"), true);
  assert.equal(isCofactorsSubstratesTitle("Cofactors and Substrates"), true);
  assert.equal(isKeyConstraintsDietaryTitle("Key Constraints"), true);
  assert.equal(isCofactorsSubstratesTitle("Cofactors and Supporting Inputs"), true);
  assert.equal(isDietaryRequirementsParentTitle("Supporting Inputs"), false);
});

test("new §3.1 headings pass the dietary-requirements heading contract", () => {
  const issues = [];
  validatePmDietaryRequirementHeadings(
    leversBlock(PM_DIETARY_REQUIREMENTS_HEADINGS.parent, [
      PM_DIETARY_REQUIREMENTS_HEADINGS.directDerived,
      PM_DIETARY_REQUIREMENTS_HEADINGS.cofactorsSubstrates,
      PM_DIETARY_REQUIREMENTS_HEADINGS.keyConstraints,
    ]),
    issues,
    { entityLabel: "fixture-canonical" },
  );
  assert.deepEqual(issues, []);
});

test("legacy Dietary Levers headings remain valid until a PM is recomputed", () => {
  const issues = [];
  validatePmDietaryRequirementHeadings(
    leversBlock(PM_DIETARY_REQUIREMENTS_LEGACY_HEADINGS.parent, [
      PM_DIETARY_REQUIREMENTS_LEGACY_HEADINGS.directDerived,
      PM_DIETARY_REQUIREMENTS_LEGACY_HEADINGS.cofactorsSubstrates,
      PM_DIETARY_REQUIREMENTS_LEGACY_HEADINGS.keyConstraints,
    ]),
    issues,
    { entityLabel: "fixture-legacy" },
  );
  assert.deepEqual(issues, []);
});

test("Supporting Inputs is not an accepted child of Dietary Requirements", () => {
  const issues = [];
  validatePmDietaryRequirementHeadings(
    leversBlock(PM_DIETARY_REQUIREMENTS_HEADINGS.parent, [
      PM_DIETARY_REQUIREMENTS_HEADINGS.directDerived,
      PM_DIETARY_REQUIREMENTS_LEGACY_HEADINGS.cofactorsSubstrates,
      PM_DIETARY_REQUIREMENTS_HEADINGS.keyConstraints,
    ]),
    issues,
    { entityLabel: "fixture-supporting-inputs" },
  );
  assert.ok(issues.some((issue) => issue.code === "pm_dietary_requirements_headings"));
  assert.ok(
    issues.some((issue) => String(issue.message).includes("Cofactors and Substrates")),
  );
});

test("PM3 uses the canonical §3.1 Dietary Requirements headings", () => {
  const content = fs.readFileSync(PM3, "utf8");
  assert.ok(content.includes("3.1 Dietary Requirements"));
  assert.ok(content.includes("3.1.1 Direct and/or Derived Dietary Requirements"));
  assert.ok(content.includes("3.1.2 Cofactors and Substrates"));
  assert.ok(content.includes("3.1.3 Key Constraints"));
  assert.ok(!content.includes("3.1 Dietary Levers"));
  assert.ok(!content.includes("Cofactors and Supporting Inputs"));
  const issues = [];
  validatePmDietaryRequirementHeadings(content, issues, { entityLabel: "BRS2-FM1-PM3" });
  assert.deepEqual(issues, []);
});

test("PM8 uses the canonical §3.1 Dietary Requirements headings", () => {
  const content = fs.readFileSync(PM8, "utf8");
  assert.ok(content.includes("3.1 Dietary Requirements"));
  assert.ok(content.includes("3.1.1 Direct and/or Derived Dietary Requirements"));
  assert.ok(content.includes("3.1.2 Cofactors and Substrates"));
  assert.ok(content.includes("3.1.3 Key Constraints"));
  assert.ok(!content.includes("3.1 Dietary Levers"));
  assert.ok(!content.includes("Cofactors and Supporting Inputs"));
  const issues = [];
  validatePmDietaryRequirementHeadings(content, issues, { entityLabel: path.basename(PM8) });
  assert.deepEqual(issues, []);
});
