import test from "node:test";
import assert from "node:assert/strict";
import {
  emptyCofactorSubstrateCopy,
  emptyDirectDerivedCopy,
  emptyKeyConstraintCopy,
  publicDietaryRequirementsWorkflowHits,
} from "./lib/pm-dietary-requirements-public-copy.mjs";

test("empty Dietary Requirements copy states the scientific result, not the review path", () => {
  assert.equal(
    emptyDirectDerivedCopy("regulation of NF-κB transcriptional tone"),
    "No Direct or Derived Dietary Requirement is currently established for regulation of NF-κB transcriptional tone.",
  );
  assert.equal(
    emptyKeyConstraintCopy(),
    "No mapping established.",
  );
  assert.match(emptyCofactorSubstrateCopy(), /cofactors or substrates/);
});

test("public Dietary Requirements workflow detector ignores scientific limitations", () => {
  assert.deepEqual(
    publicDietaryRequirementsWorkflowHits(
      "Magnesium ions participate in ATP-dependent IKK phosphotransfer. This does not establish a dietary magnesium effect on human NF-κB transcription.",
    ),
    [],
  );
  assert.ok(
    publicDietaryRequirementsWorkflowHits(
      "BRS3(KC1) is proposed KC-page scope only. Polyphenol modulation evidence is not iKC membership.",
    ).length > 0,
  );
});
