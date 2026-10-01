import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { validateDietaryLeverAtoms } from "./lib/dietary-lever-atoms.mjs";
import { extractHubItemBlock, extractHubPanelInner } from "./lib/pm-section-4-levers.mjs";
import {
  emptyDirectDerivedCopy,
  emptyKeyConstraintCopy,
  publicDietaryRequirementsWorkflowHits,
} from "./lib/pm-dietary-requirements-public-copy.mjs";
import {
  buildCanonicalKcIndex,
  validatePmKcGovernance,
  validateStage2bDietaryRequirementLayers,
} from "./lib/kc-evidence-governance.mjs";

const ROOT = path.join(process.cwd(), "docs/biological-targets/brs3");
const KC_PAGE = path.join(
  process.cwd(),
  "docs/biological-targets/brs3/kc/brs3-kc1-antioxidant-substrate-availability.mdx",
);

const PAGES = [
  "fm1/brs3-fm1-pm1-nf-kb-signalling-regulation.mdx",
  "fm1/brs3-fm1-pm2-gut-derived-inflammatory-signalling.mdx",
  "fm2/brs3-fm2-pm3-nrf2-are-antioxidant-activation.mdx",
  "fm2/brs3-fm2-pm4-ros-generation-vs-clearance-balance.mdx",
  "fm2/brs3-fm2-pm5-lipid-peroxidation-control.mdx",
  "fm2/brs3-fm2-pm6-antioxidant-network-recycling.mdx",
  "fm3/brs3-fm3-pm7-cytokine-network-modulation.mdx",
  "fm3/brs3-fm3-pm8-eicosanoid-spm-balance.mdx",
];

test("BRS3 FM1–FM3 PMs carry Stage 2B dietary status that validates", () => {
  const kcMatter = matter(fs.readFileSync(KC_PAGE, "utf8")).data;
  const canonicalKcIndex = buildCanonicalKcIndex([kcMatter]);
  for (const rel of PAGES) {
    const { data, content } = matter(fs.readFileSync(path.join(ROOT, rel), "utf8"));
    assert.equal(data.evidence_status, "stage-2b-dietary-addressability", data.pm_id);
    assert.equal(data.dietary_addressability, "not-established", data.pm_id);
    assert.equal(data.claim_ceiling, "biological-dependency", data.pm_id);
    const issues = [];
    validateDietaryLeverAtoms(data, issues, { entityLabel: data.pm_id });
    validatePmKcGovernance(data, issues, { entityLabel: data.pm_id, canonicalKcIndex });
    validateStage2bDietaryRequirementLayers(data, issues, { entityLabel: data.pm_id, content });
    assert.deepEqual(issues, [], `${data.pm_id}: ${JSON.stringify(issues)}`);
    if (Array.isArray(data.key_constraints) && data.key_constraints.length) {
      assert.ok(
        (data.pm_kc_relationships || []).length,
        `${data.pm_id} lists a KC but has no pm_kc_relationships`,
      );
    }
    const start = content.indexOf("4.1.1 Direct");
    const end = content.indexOf("4.1.2 Cofactors");
    const dietary = start >= 0 && end > start ? content.slice(start, end) : "";
    const cofactorStart = content.indexOf("4.1.2 Cofactors");
    const cofactorEnd = content.indexOf("4.1.3 Key");
    const cofactors = cofactorStart >= 0 && cofactorEnd > cofactorStart
      ? content.slice(cofactorStart, cofactorEnd)
      : "";
    assert.equal(/←/.test(dietary), false, `${data.pm_id} still has food arrows in §4.1.1`);
    assert.match(content, /id="pm-ref-1"/);
    if (data.pm_id === "BRS3-FM1-PM1") {
      assert.equal((data.dietary_input_traceability || []).length, 1);
      assert.equal(data.dietary_input_traceability[0].atom_id, "PM1-DIT-1");
      assert.equal(data.dietary_input_traceability[0].input_type, "catalytic ion");
      assert.equal((data.dietary_lever_atoms || []).length, 1);
      assert.equal(data.dietary_lever_atoms[0].relationship_layer, "biochemical-requirement");
      assert.equal(data.dietary_lever_atoms[0].relationship_mode, undefined);
      assert.match(
        dietary,
        /No Direct or Derived Dietary Requirement is currently established for regulation of NF-κB transcriptional tone/,
      );
      assert.equal(/polyphenol|Li and Zhang|Cannataro|re-tested|candidate|Stage 2B/i.test(dietary), false);
      assert.match(cofactors, /Magnesium ions/);
      assert.equal(/←/.test(cofactors), false, `${data.pm_id} must not restore food arrows in §4.1.2`);
      assert.equal((data.pm_kc_relationships || []).length, 0);
      assert.equal((data.key_constraints || []).length, 0);
      assert.equal(data.kc_change_control_flags[0].flag_type, "ikc-scope-conflict");
      assert.equal(/dietary-actionable/i.test(content), false, "Overview must not claim dietary-actionable without §4.1.1");
      assert.equal(
        Array.isArray(data.system_optimisation_practices) ? data.system_optimisation_practices.length : 0,
        0,
        "EPA/DHA SOP must not be auto-admitted on PM1",
      );
      const sopStart = content.indexOf("4.2 System Optimisation Practices");
      const sopEnd = content.indexOf("## 5. Mechanistic Basis");
      const sop = sopStart >= 0 && sopEnd > sopStart ? content.slice(sopStart, sopEnd) : "";
      assert.match(sop, /No evidence-qualified System Optimisation Practices are currently established/);
      assert.equal(/EPA|DHA|Conditional Supplementation/i.test(sop), false);
    }
    const directBlock = extractHubItemBlock(content, "4.1.1 Direct and/or Derived Dietary Requirements");
    const kcBlock = extractHubItemBlock(content, "4.1.3 Key Constraints");
    assert.ok(directBlock, `${data.pm_id} missing §4.1.1 panel`);
    assert.ok(kcBlock, `${data.pm_id} missing §4.1.3 panel`);
    const directHits = publicDietaryRequirementsWorkflowHits(extractHubPanelInner(directBlock.block));
    const kcHits = publicDietaryRequirementsWorkflowHits(extractHubPanelInner(kcBlock.block));
    assert.deepEqual(directHits, [], `${data.pm_id} §4.1.1 public workflow language: ${directHits.join(", ")}`);
    assert.deepEqual(kcHits, [], `${data.pm_id} §4.1.3 public workflow language: ${kcHits.join(", ")}`);
    if (data.pm_id === "BRS3-FM1-PM1") {
      assert.equal(
        extractHubPanelInner(directBlock.block),
        emptyDirectDerivedCopy("regulation of NF-κB transcriptional tone"),
      );
      assert.equal(extractHubPanelInner(kcBlock.block), emptyKeyConstraintCopy());
    }
  }
});
