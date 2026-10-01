# BRS1-FM4-PM11 Excitotoxicity Modulation — Stage 2A Report

## Scope and canonical references

Stage 2A used the Profile A PM contract in `system/primary-mechanism-schema.md`
and the bounded Scientific Finding contract in
`system/scientific-finding-schema.md`. The production pattern is the same as
the updated BRS1-FM4-PM10 page. The target is BRS1-FM4-PM11.

The assigned corpus was used only:

- Clerc et al. (2013)
- Mamiya et al. (2021)
- Maltezos et al. (2014)

No open literature search was added. The three attached papers were sufficient
to adjudicate the listed Mechanistic Basis and Phenome-relationship
propositions: Clerc establishes receptor-overload energy stress and
model-level magnesium-sulfate protection; Mamiya supplies network
excitation–inhibition framing as context rather than this buffering
demonstration; Maltezos supplies glutamate/glutamine–attention pool context
and is not promoted to a headline Finding.

This pass identifies dietary candidates. It does not admit Dietary
Requirements.

## Propositions under test

Mechanistic Basis:

1. Excessive glutamate-receptor stimulation can produce bioenergetic /
   excitotoxic stress.
2. Magnesium sulfate can protect against those bioenergetic consequences in
   that chronic receptor-stimulation model.
3. Network excitation–inhibition framing is cluster context, not this
   buffering demonstration.

Phenome relationships:

4. Excitotoxicity modulation modulates Stress Reactivity (translational).
5. Excitotoxicity modulation modulates Recovery Capacity (translational).

## Supported claims

- Chronic glutamate-receptor stimulation can produce bioenergetic harm
  consistent with excitotoxic stress (Clerc; preclinical).
- In that same model, magnesium sulfate reduced those bioenergetic
  consequences (Clerc; preclinical).
- Mamiya’s excitation–inhibition review is network context for the wider
  cluster. It does not demonstrate injury-level buffering.
- Maltezos’s regional Glx–attention association is spectroscopic pool
  context. It is Connected / Supportive Evidence, not a buffering assay.

## Constrained claims

- Magnesium-sulfate protection in that model is not ordinary-diet magnesium
  control, not a human intervention, and not a Stage 2A Dietary Requirement.
- Network excitation–inhibition imbalance is not excitotoxic buffering.
- Spectroscopic glutamate/glutamine is not a buffering-rate or bioenergetic
  protection measure.
- Stress Reactivity and Recovery Capacity remain translational mappings with
  low confidence. Clerc did not measure those human outcomes.

## Rejected claims

- Mamiya demonstrates this mechanism’s buffering job.
- Maltezos measures excitotoxic buffering or clearance-equivalent flux.
- Ordinary diet has been shown to control this buffering.

## Unresolved claims

- Whether ordinary dietary magnesium, omega-3, or antioxidants regulate this
  governed buffering state. Stage 2A parks these as dietary candidates for
  Stage 2B. They are not admitted here.

## Coverage sufficiency and stopping rationale

Defining pathway steps in Mission, Overview and Mechanistic Basis are
receptor overload → bioenergetic / excitotoxic stress → last-line buffering,
with sibling jobs (integrative excitation–inhibition match, GABA synthesis,
upstream clearance) held as boundaries. Clerc adjudicates the overload and
model-level protection steps. Mamiya and Maltezos adjudicate the boundary
propositions (network frame; Glx pool). No defining mission step remained
unassessed after those three papers. Further retrieval would be a dietary
or human-outcome question, not a missing mechanism step. Stop.

## Where related assessments live

Recorded here, not in public copy:

- Integrative excitation–inhibition matching: BRS1-FM4-PM8.
- GABA synthesis: BRS1-FM4-PM9.
- Upstream glutamate clearance and recycling: BRS1-FM4-PM10.
- Ordinary-diet magnesium, omega-3 and antioxidant addressability: Stage 2B
  report.

## Scientific Findings authored

| Id | Presentation | Proposition |
|---|---|---|
| PM11-F1 | Mechanistic Basis | Excessive glutamate-receptor stimulation can produce bioenergetic / excitotoxic stress |
| PM11-F2 | Mechanistic Basis | Magnesium sulfate protected against those bioenergetic consequences in that model (not a human dietary magnesium requirement) |
| PM11-F3 | Mechanistic Basis | Excitation–inhibition network framing is context, not this buffering demonstration |

Maltezos is Connected / Supportive Evidence on PM11-F3. No interpretive
constraint was required. PM11-F1 carries `fm_rollup: true`. This pass does
not rewrite the parent FM page.

No Therapeutic Area tags were added.

Clerc is primary evidence for both PM11-F1 and PM11-F2. Reuse is declared
under Evidence Dependency and is not independent replication.

## Published connections

Every published §5.2 / §5.3 link now has a 1–2 line relationship description
(≥50 characters after the link).

- §5.2 BRS3-FM1-PM1: inflammatory tone as setting, not a proven controller of
  this buffering.
- §5.2 BRS4-FM1-PM1: mitochondrial energy context next to Clerc’s
  bioenergetic harm, not shown as the controller of this layer.
- §5.2 BRS6-FM1-PM1: glycaemic context, not a proven controller of buffering.
- §5.3 PM8: integrative excitation–inhibition match; this layer is
  injury-level pressure after that match is exceeded.
- §5.3 PM9: GABA synthesis chemistry, not the same buffering function.
- §5.3 PM10: upstream clearance; failed or overloaded clearance is a risk
  for this layer, not the same mechanism.

No structured `upstream_pm_relationships` dietary-entry records were created.
Stage 2A identifies the clearance dependency as biology, not as an admitted
dietary-entry indicator.

## Dietary candidates after this pass (not admitted)

1. Magnesium — model-level magnesium sulfate protection (PM11-F2).
2. Omega-3 — legacy page name; no assigned-corpus role in this buffering.
3. Antioxidants — legacy page name; no assigned-corpus role in this buffering.

## Phenome and Change Control

Stress Reactivity and Recovery Capacity rationales were rewritten as
translational, low-confidence mappings that cite Clerc’s preclinical limits.
Mamiya was not used as phenome evidence for those relationships.

Legacy `confidence` and `evidence_confidence` values remain `low`.

The issues register was not edited.

## Validation

Ran after Stage 2B authoring:

- `npm run findings:sync -- --pm BRS1-FM4-PM11` — updated this page. The command
  also reported stale §4.1 / §7 on PM8 and PM10. Those pages were not edited.
- `npm run phenome:sync -- --file docs/biological-targets/brs1/fm4/brs1-fm4-pm11-excitotoxicity-modulation.mdx --pm-only` — updated this page.

PM11-targeted checks (`validateScientificFindings`, Stage 2B dietary layers,
Type D adjudications, published connection explanations, mechanism page
audit): **0 issues**.

## Overview evidence rerun (2026-09-30)

The Overview now retains only receptor-overload bioenergetic stress, its
last-line position after clearance/network matching, and magnesium-sulfate
protection in the assessed preclinical model. It does not generalise that
exposure to dietary magnesium. Existing Findings and references (Clerc;
Mamiya) were sufficient; no retrieval was performed. Stopping rationale:
overload, protection and adjacent-mechanism boundaries are adjudicated.
Unresolved: human buffering effects, ordinary-diet control and clinical
benefit.
