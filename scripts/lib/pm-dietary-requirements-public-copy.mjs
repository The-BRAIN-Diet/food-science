/**
 * Public Dietary Requirements copy — current evidence-qualified state only.
 * Audit/history belongs in Stage 2B reports and change-control records.
 * @see system/dietary-input-traceability-contract.md
 */

/** @param {string} [governedState] PM-governed state or function, e.g. "regulation of NF-κB transcriptional tone" */
export function emptyDirectDerivedCopy(governedState) {
  const state = String(governedState || "").trim() || "this mechanism";
  return `No Direct or Derived Dietary Requirement is currently established for ${state}.`;
}

export function emptyCofactorSubstrateCopy() {
  return "No evidence-supported cofactors or substrates are currently established for this mechanism.";
}

export function emptyKeyConstraintCopy() {
  return "No mapping established.";
}

/**
 * Phrases that belong in audit records, not public §3.1 / §4.1 panels.
 * Scientific limitations (exposure, indirectness, claim ceilings) are not listed here.
 */
export const PUBLIC_DIETARY_REQUIREMENTS_WORKFLOW_RES = [
  /Stage 2[AB]/i,
  /proposed KC-page scope/i,
  /this PM'?s corpus does not show/i,
  /is not iKC membership/i,
  /legacy food-source/i,
  /not projected without/i,
  /independently adjudicated Input/i,
  /KC inheritance/i,
  /food-list constituents are not inherited/i,
  /change-control/i,
  /pending-kc/i,
  /re-tested/i,
  /None listed/i,
  /candidate state-regulation/i,
  /ownership reconcil/i,
];

export function publicDietaryRequirementsWorkflowHits(text) {
  const sample = String(text || "");
  return PUBLIC_DIETARY_REQUIREMENTS_WORKFLOW_RES.filter((re) => re.test(sample)).map(
    (re) => re.source,
  );
}
