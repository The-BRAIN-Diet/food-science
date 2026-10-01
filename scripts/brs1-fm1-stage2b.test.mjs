import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "path";
import matter from "gray-matter";
import { validateDietaryLeverAtoms } from "./lib/dietary-lever-atoms.mjs";
import {
  buildDietaryLeverDisclosureMap,
  dietaryLeverBulletKey,
} from "./lib/dietary-lever-disclosure.mjs";
import { extractHubItemBlock, extractHubPanelInner } from "./lib/pm-section-4-levers.mjs";
import {
  validatePmKcGovernance,
  validateStage2bDietaryRequirementLayers,
} from "./lib/kc-evidence-governance.mjs";
import {
  loadJson,
  validatePmRerunCompleteness,
} from "./lib/framework-qc.mjs";

const FM1 = path.join(
  process.cwd(),
  "docs/biological-targets/brs1/fm1",
);

const PAGES = [
  ["BRS1-FM1-PM1", "brs1-fm1-pm1-amino-acid-availability-and-prioritisation.mdx", "direct", "dietary-provision"],
  ["BRS1-FM1-PM2", "brs1-fm1-pm2-lat1-competitive-transport-modulation.mdx", "direct", "modulation-demonstrated"],
  ["BRS1-FM1-PM4", "brs1-fm1-pm4-noradrenergic-signalling-attention-executive-modulation.mdx", "not-established", "biological-dependency"],
  ["BRS1-FM1-PM5", "brs1-fm1-pm5-serotonergic-signalling-regulation.mdx", "not-established", "biological-dependency"],
];

test("FM1 remaining PMs carry Stage 2B dietary atoms that validate", () => {
  for (const [pmId, file, addressability, ceiling] of PAGES) {
    const { data, content } = matter(fs.readFileSync(path.join(FM1, file), "utf8"));
    assert.equal(data.pm_id, pmId);
    assert.equal(data.evidence_status, "stage-2b-dietary-addressability");
    assert.equal(data.dietary_addressability, addressability);
    assert.equal(data.claim_ceiling, ceiling);
    assert.ok((data.dietary_input_traceability || []).length > 0, `${pmId} needs DIT atoms`);
    const issues = [];
    validateDietaryLeverAtoms(data, issues, { entityLabel: pmId });
    if (pmId === "BRS1-FM1-PM1") {
      validateStage2bDietaryRequirementLayers(data, issues, { entityLabel: pmId, content });
      validatePmKcGovernance(data, issues, { entityLabel: pmId });
      const qcIssues = loadJson(
        path.join(process.cwd(), "system/framework-qc/framework-issues-register.json"),
        {issues: []},
      )
      const qcState = loadJson(
        path.join(process.cwd(), "system/framework-qc/page-review-state.json"),
        {pages: {}},
      )
      assert.deepEqual(
        validatePmRerunCompleteness({
          pmId,
          stateRow: qcState.pages?.[pmId],
          issues: qcIssues.issues,
          root: process.cwd(),
        }),
        [],
      )
      assert.equal(data.kc_change_control_flags?.[0]?.flag_id, "KC-CC-BRS1-FM1-PM1-01");
      assert.match(data.kc_change_control_flags[0].proposition, /Candidate PM↔KC1 mapping/);
      const pm1Adjudications = data.kc_applicability_adjudications || [];
      assert.equal(
        pm1Adjudications.find((row) => row.arm_id === "amino-acid-quality")?.disposition,
        "established",
      );
      assert.equal(
        pm1Adjudications.find((row) => row.arm_id === "competitive-lat1")?.disposition,
        "evidence-supported-non-application",
      );
      const requirementAtoms = data.dietary_lever_atoms.filter(
        (row) => row.relationship_layer === "dietary-requirement",
      );
      assert.equal(
        requirementAtoms.every((row) => row.relationship_mode === "capacity-requirement"),
        true,
      );
      assert.equal(
        data.dietary_lever_atoms.find((row) => row.atom_id === "PM1-DIT-4")?.relationship_layer,
        "biochemical-requirement",
      );
      assert.equal(
        data.dietary_input_traceability.some((row) => row.atom_id === "PM1-DIT-3"),
        false,
      );
      const kcBlock = extractHubItemBlock(content, "3.1.3 Key Constraints");
      assert.match(content, /brs-kc-title-link/);
      assert.match(extractHubPanelInner(kcBlock.block), /circulating amino-acid pool/);
      assert.doesNotMatch(content, /Amino-acid quality of the shared precursor pool/);
      const cofactorBlock = extractHubItemBlock(content, "3.1.2 Cofactors and Substrates");
      const directBlock = extractHubItemBlock(content, "3.1.1 Direct and/or Derived Dietary Requirements");
      assert.match(extractHubPanelInner(directBlock.block), /Tryptophan/);
      assert.match(extractHubPanelInner(cofactorBlock.block), /Tyrosine/);
      assert.doesNotMatch(extractHubPanelInner(cofactorBlock.block), /Tryptophan/);
      assert.equal(
        (data.dietary_lever_presentations || []).some(
          (row) => row.atom_id === "PM1-DIT-5" && String(row.presentation_section) === "3.1.2",
        ),
        false,
      );
      assert.doesNotMatch(content, /draws on BRS1\(KC1\)/);
      assert.doesNotMatch(content, /not inherited as PM/);
      assert.doesNotMatch(content, /Complementary plant-protein pairing/);
      assert.doesNotMatch(content, /indispensable amino acid this PM/);
    } else if (pmId === "BRS1-FM1-PM2") {
      validateStage2bDietaryRequirementLayers(data, issues, { entityLabel: pmId, content });
      validatePmKcGovernance(data, issues, { entityLabel: pmId });
      const qcIssues = loadJson(
        path.join(process.cwd(), "system/framework-qc/framework-issues-register.json"),
        {issues: []},
      )
      const qcState = loadJson(
        path.join(process.cwd(), "system/framework-qc/page-review-state.json"),
        {pages: {}},
      )
      assert.deepEqual(
        validatePmRerunCompleteness({
          pmId,
          stateRow: qcState.pages?.[pmId],
          issues: qcIssues.issues,
          root: process.cwd(),
        }),
        [],
      )
      const meal = data.dietary_lever_atoms.find((row) => row.atom_id === "PM2-DIT-3");
      assert.equal(meal?.relationship_mode, "state-regulation");
      assert.equal(meal?.requirement_classification, "direct");
      assert.equal(meal?.claim_ceiling, "modulation-demonstrated");
      assert.equal(data.pm_kc_relationships?.[0]?.relationship_id, "BRS1-FM1-PM2-KCR-1");
      const directBlock = extractHubItemBlock(content, "3.1.1 Direct and/or Derived Dietary Requirements");
      const cofactorBlock = extractHubItemBlock(content, "3.1.2 Cofactors and Substrates");
      const kcBlock = extractHubItemBlock(content, "3.1.3 Key Constraints");
      assert.match(extractHubPanelInner(directBlock.block), /Meal carbohydrate-to-protein composition/);
      assert.match(extractHubPanelInner(cofactorBlock.block), /Tyrosine/);
      assert.match(extractHubPanelInner(cofactorBlock.block), /Tryptophan/);
      assert.doesNotMatch(extractHubPanelInner(directBlock.block), /Tyrosine|Tryptophan/);
      assert.match(extractHubPanelInner(kcBlock.block), /meals change that competition/);
      assert.doesNotMatch(extractHubPanelInner(kcBlock.block), /← eggs|← dairy|Complete essential/);
      assert.match(content, /brs-kc-title-link/);
      assert.equal(
        data.kc_applicability_adjudications?.find((row) => row.arm_id === "competitive-lat1")?.disposition,
        "established",
      );
      assert.equal(
        data.kc_applicability_adjudications?.find((row) => row.arm_id === "amino-acid-quality")?.disposition,
        "unresolved",
      );
      const mealDisclosure = buildDietaryLeverDisclosureMap(data).get(
        dietaryLeverBulletKey("Meal carbohydrate-to-protein composition", "", "3.1.1"),
      );
      assert.match(mealDisclosure?.readerDescription || "", /circulating precursor ratios/);
      assert.equal(mealDisclosure?.supportingFinding?.id, "PM2-F2");
      assert.equal(mealDisclosure?.supportingFinding?.href, "#pm2-f2");
      assert.equal(
        mealDisclosure?.supportingFinding?.label,
        "Ordinary meals shift plasma tryptophan and tyrosine ratios",
      );
      assert.match(mealDisclosure?.evidenceLimitation || "", /not measured brain transport/);
    } else if (pmId === "BRS1-FM1-PM4") {
      validateStage2bDietaryRequirementLayers(data, issues, { entityLabel: pmId, content });
      validatePmKcGovernance(data, issues, { entityLabel: pmId });
      const adjudications = data.kc_applicability_adjudications || [];
      assert.equal(adjudications.filter((row) => row.kc_id === "BRS1(KC1)").length, 2);
      assert.ok(adjudications.some((row) => row.kc_id === "BRS2(KC1)"));
      assert.equal(
        adjudications.every((row) => row.applicability_proposition && row.disposition !== "unassessed"),
        true,
      );
      const established = adjudications.filter((row) => row.disposition === "established");
      const kcBlock = extractHubItemBlock(content, "3.1.3 Key Constraints");
      if (established.length) {
        assert.ok((data.pm_kc_relationships || []).length > 0);
        assert.ok((data.key_constraints || []).length > 0);
        assert.match(content, /brs-kc-title-link/);
      } else {
        assert.equal((data.pm_kc_relationships || []).length, 0);
        assert.equal((data.key_constraints || []).length, 0);
        assert.equal(extractHubPanelInner(kcBlock.block), "No mapping established.");
        assert.doesNotMatch(content, /brs-kc-title-link/);
      }
      assert.doesNotMatch(content, /not inherited as Dietary Requirements/);
      assert.doesNotMatch(content, /not inherited as PM/);
      assert.doesNotMatch(content, /← eggs|← dairy|Complete essential/);
    } else if (pmId === "BRS1-FM1-PM5") {
      validateStage2bDietaryRequirementLayers(data, issues, { entityLabel: pmId, content });
      validatePmKcGovernance(data, issues, { entityLabel: pmId });
      const adjudications = data.kc_applicability_adjudications || [];
      assert.equal(adjudications.filter((row) => row.kc_id === "BRS1(KC1)").length, 2);
      assert.ok(adjudications.some((row) => row.kc_id === "BRS2(KC1)"));
      assert.equal(
        adjudications.every((row) => row.applicability_proposition && row.disposition !== "unassessed"),
        true,
      );
      const established = adjudications.filter((row) => row.disposition === "established");
      const kcBlock = extractHubItemBlock(content, "3.1.3 Key Constraints");
      if (established.length) {
        assert.ok((data.pm_kc_relationships || []).length > 0);
        assert.ok((data.key_constraints || []).length > 0);
        assert.match(content, /brs-kc-title-link/);
        assert.match(extractHubPanelInner(kcBlock.block), /availability for serotonin synthesis/);
      } else {
        assert.equal((data.pm_kc_relationships || []).length, 0);
        assert.equal((data.key_constraints || []).length, 0);
        assert.equal(extractHubPanelInner(kcBlock.block), "No mapping established.");
        assert.doesNotMatch(content, /brs-kc-title-link/);
      }
      assert.doesNotMatch(content, /not inherited as Dietary Requirements/);
      assert.doesNotMatch(content, /not inherited as PM/);
      assert.doesNotMatch(content, /← eggs|← dairy|Complete essential/);
      const directBlock = extractHubItemBlock(content, "3.1.1 Direct and/or Derived Dietary Requirements");
      const cofactorBlock = extractHubItemBlock(content, "3.1.2 Cofactors and Substrates");
      assert.match(extractHubPanelInner(directBlock.block), /Tryptophan/);
      assert.match(extractHubPanelInner(directBlock.block), /Iron/);
      assert.match(extractHubPanelInner(cofactorBlock.block), /Tetrahydrobiopterin \(BH4\)/);
      assert.doesNotMatch(extractHubPanelInner(cofactorBlock.block), /^- Tryptophan/m);
      assert.equal(data.dietary_lever_atoms.find((row) => row.atom_id === "PM5-DIT-6")?.relationship_layer, "biochemical-requirement");
      assert.equal(data.dietary_input_traceability.some((row) => row.atom_id === "PM5-DIT-2"), false);
    } else {
      assert.match(content, /not inherited as PM/);
    }
    assert.deepEqual(issues, [], `${pmId} DIT issues: ${JSON.stringify(issues)}`);
    assert.doesNotMatch(content, /← poultry|← turkey|← beef|← leafy greens/);
  }
});
