# Final scientific approval gate

SEC reference infrastructure is implemented; no canonical scientific changes or
production assessment snapshots have been applied. The exact canonical-shaped
proposals are in `drafts/`; exact original/proposed dispositions and archived
interventions are in `reconciliation.json`. Existing assessment history remains
in `assessments.json`. Approval of infrastructure is not approval of the following
scientific edits.

## GABA: approve these draft decisions

- Replace the stronger reserve-versus-basal F1 claim with the approved narrower
  GAD65/GAD67 occupancy finding, inferred recruitable capacity and explicit human
  uncertainty. Preserve conditional 4/8, not provisional promotion.
- Scope F2's conditional 5/8 to experimental PDXK metal/nucleotide behaviour;
  separate PDXK/PNPO activation chemistry. Correct Tang's protein source from
  human to sheep brain. Do not infer dietary enhancement of brain GABA.
- Correct F6's placebo interpretation: within-B6 anxiety improvement does not
  establish a treatment-by-time effect (p=0.140); preserve the visual interaction
  (p=0.011), evidence, limitations and original history.
- Retire generic public preparation/timing/exercise/stress advice from PM9's
  selected interventions, retaining its history: zero SOPs/lifestyle protocols.
- Preserve all dietary atoms, B6 supply, biochemical glutamate, historical PLP,
  KCs and food mappings. Unscored contextual claims may remain unscored.

## Glycaemic variability: approve these draft decisions

- Replace F1's causal all-endpoint claim with the tested uncontrolled cohort
  observation and inconclusive excursion endpoints. Proposed exact-claim SEC is
  4/8; retain the earlier raw 3/adjusted 2 assessment as history.
- Retain fish-before-rice F2 and its acute dispersion evidence/4/8, but remove
  its leading PM2 SOP presentation. Do not recast the study as negative evidence.
- Select two SOPs only: grain-processing package (F5) and early/front-loaded
  eating (F6). Proposed IDs PM2-SOP-2 and PM2-SOP-3 are not registered yet.
- Select interval walking (F7) and brief vigorous bouts (F8), proposed
  PM2-LIFE-2/3; retain exact protocols, null primary outcomes and limitations.
  Retire generic PM2-LIFE-1 presentation, preserving its history.
- Preserve all eight Findings and their endpoint-specific assessments. No
  exposure-to-variability or metabolic-to-ADHD confidence transfer.

### Required registry reconciliation before canonical publication

The existing strategy `food-strategy-053016fdaaca` has two relationships:
`BRS6-FM1-PM1::PM1-SOP-2` and `BRS6-FM1-PM2::PM2-SOP-1`.
Retire only PM2's selected relationship after approval; keep PM1 and the shared
strategy. The old PM2 identity must remain in correction/audit history and must
not be reused for a new protocol. New grain/early-eating strategies need approved
IDs and scope/category metadata before roll-up generation. Do not invent food
or substance links from protocol labels. The generator consumes canonical SOP
metadata (`scripts/generate-food-strategy-rollup.mjs`); generated outputs must be
updated only after these ownership decisions. All registry files remain unchanged
in this infrastructure phase.

## SAMe: approve these draft decisions

- Present F1/F4 elementary MAT chemistry as curated provenance without an
  artificial score, retaining IDs, source evidence and original history.
- Preserve ATP-first versus random-order experimental disagreement; remove any
  implication that substrate binding order is settled universally.
- Add proposed model-bounded MAT2B stability F5: provisional 5/8 (2/1/1/1),
  non-exclusive of allostery, not a human nutrient-to-flux/ADHD claim.
- Retire unsupported generic legume-preparation optimisation presentation;
  zero selected SOPs/lifestyle protocols. Preserve methionine as the single
  primary requirement, protein delivery record, ATP/Mg/K biochemistry, upstream
  folate/betaine/choline relationships and all KC decisions.

## Technical decisions still gated

1. Approve the above scientific changes and intervention identities/registry actions.
2. Then pin exact accepted propositions to versioned snapshots; do not publish
   review drafts or silently copy their current data into the empty registry.
3. Reconcile canonical GABA generated-section freshness and its legacy section
   title test against the accepted page layout, preserving the Scientific Lesson.
   Do not regenerate away evidence merely to pass a stale assertion.
4. Verify the three canonical routes, references, food/disclosure UI and review/
   correction navigation after that separately approved application.

No numerical score is required for every claim. Curated provenance, conditional
estimates and honest unscored assessments are legitimate V1 treatments.
