# BRS1-FM1-PM4 Noradrenergic Signalling — Stage 2A Report

## Scope and canonical references

Stage 2A used the Profile A PM contract in `system/primary-mechanism-schema.md`
and the bounded Scientific Finding contract in
`system/scientific-finding-schema.md`. The production pattern is the same as
BRS1-FM1-PM2 and BRS1-FM1-PM3. The target is BRS1-FM1-PM4.

Repository-reviewed evidence was used first. The attached corpus was sufficient
to adjudicate the listed Mechanistic Basis and Phenome-relationship
propositions:

- O'Donnell et al. (2012)
- Beard et al. (2003)
- Kennedy (2016)
- Spector (1978)
- Fernstrom (2013)
- MacDonald et al. (2024)
- Gruber et al. (2023)
- Santos et al. (2019) (bibliography only; not promoted to a Finding)

No open literature search was added.

Stage 2B dietary atoms already on the page were left in place. This pass did
not admit or remove Dietary Requirements.

## Propositions under test

Mechanistic Basis:

1. Noradrenaline modulates arousal, vigilance and executive control.
2. Noradrenaline formation depends on the shared tyrosine-to-dopamine
   catecholamine sequence, including iron and PLP/B6 requirements.
3. Meal-level precursor transport is upstream presentation, not noradrenaline
   signalling.

Phenome relationships:

4. Noradrenergic signalling modulates Focus / Attention Stability.
5. Noradrenergic signalling modulates Motivation / Drive (weaker than
   dopamine).
6. Noradrenergic signalling modulates Pleasure & Interest Capacity.

## Supported claims

- Noradrenaline is a multi-cell-type neuromodulator that helps set arousal
  and vigilance so attention and executive control can stay engaged.
- Noradrenaline is formed from dopamine on the tyrosine-derived catecholamine
  path. Iron is required by tyrosine hydroxylase. PLP supports decarboxylation
  toward dopamine; dietary vitamin B6 can supply PLP precursors.
- Tyrosine is the pathway starting material. That biological role is not erased
  because circulating supply, LAT1 transport and dopamine formation are
  assessed on other PMs.

## Constrained claims

- Cofactor or substrate necessity is not intake-responsive human brain
  noradrenaline, an attention benefit, or an ADHD treatment effect.
- ADHD-related dopamine findings are heterogeneous and are not a uniform
  noradrenaline deficit.
- Motivation / Drive remains primarily dopaminergic in the attached corpus.
  Pleasure & Interest Capacity is only adjacent catecholamine context.
- BRS2 methylation / COMT / SAM is a constrained connection: catecholamine
  inactivation can use COMT, but the attached corpus does not establish that
  ordinary one-carbon variation controls noradrenaline signalling.

## Rejected claims

- Changing iron, vitamin B6 or meal amino-acid pattern has been shown to raise
  brain noradrenaline or improve attention or ADHD.
- Plasma LNAA ratios, dopamine-process imaging or insulin–dopamine reviews are
  measurements of noradrenaline signalling.
- Glycaemic volatility is established here as a noradrenaline dietary finding
  (the earlier “section 4.3 glycaemic” wording was not supported by the
  published §5.2 link).

## Unresolved claims

- Direct human dietary modification of noradrenaline synthesis, storage,
  release, receptor signalling, reuptake or metabolism, and of attention or
  ADHD, remains insufficiently demonstrated.
- Dopamine β-hydroxylase chemistry was completed in a focused 2026-09-30
  Stage 2A follow-up during the Stage 2B rerun (`PM4-F4`; Goldstein and
  Eisenhofer 2026; Vendelboe 2016). Dietary copper and vitamin C
  qualification is recorded in
  `system/brs1-fm1-pm4-noradrenergic-stage2b-report.md`.
- Whether tyrosine should appear as a PM4 Dietary Requirement (with a
  structured `Supply: PM1` indicator) is a Stage 2B question. Stage 2A
  identifies the dependency; it does not reopen the earlier 2B decision that
  did not admit tyrosine as a PM4 requirement.

## Where related assessments live

Recorded here, not in public copy:

- Circulating amino-acid supply and tyrosine-pool assessment: BRS1-FM1-PM1.
- Competitive LAT1 transport: BRS1-FM1-PM2
  (`system/brs1-fm1-pm2-lat1-stage2a-report.md`).
- Dopamine formation and dopaminergic signalling: BRS1-FM1-PM3
  (`system/dopaminergic-signalling-stage2a-report.md`).
- Unique later conversion of dopamine to noradrenaline: `PM4-F4` / Stage 2B
  copper and vitamin C atoms.

## Scientific Findings authored

| Id | Presentation | Proposition |
|---|---|---|
| PM4-F1 | Mechanistic Basis | Noradrenaline supports arousal, vigilance and executive control |
| PM4-F2 | Mechanistic Basis | Shared catecholamine synthesis requirements |
| PM4-F4 | Mechanistic Basis | Dopamine β-hydroxylase uses copper and ascorbate |
| PM4-F3 | Phenome relationship (primary: Focus / Attention Stability) | Attention relevance is not a dietary or ADHD-treatment finding |
| PM4-IC1 | Interpretive constraint | Precursor transport and dopamine-process measures are not noradrenaline signalling |

PM4-F1, PM4-F2 and PM4-F4 carry `fm_rollup: true`. This pass does not rewrite the parent
FM page.

No Therapeutic Area tags were added. None of the attached studies directly
assesses ADHD as a noradrenaline dietary trial.

## Published connections

Every published §5.2 / §5.3 link now has a 1–2 line relationship description.

- §5.2 BRS2(FM1): constrained COMT/SAM chemistry; not an established control
  of noradrenaline signalling.
- §5.3: PM1 supply and PM2 transport. KC1 is not a published PM4 mapping.
  PM2 transport; PM3 dopamine formation; PM5 parallel serotonin path.

## Dietary atoms after this pass

Existing Stage 2B atoms are retained and now cite `PM4-F2`:

1. `PM4-DIT-1` — Iron: Direct cofactor; `biological-dependency`.
2. `PM4-DIT-2` — PLP: Direct cofactor; `biological-dependency`.
3. `PM4-DIT-3` — Vitamin B6: Derived route to PLP; `dietary-provision`.
4. `PM4-DIT-4` — Copper: Direct cofactor of dopamine β-hydroxylase; see Stage 2B.
5. `PM4-DIT-5` — Vitamin C (ascorbate): Direct electron-donor cofactor; see Stage 2B.

## Phenome and Change Control

Focus / Attention Stability, Motivation / Drive and Pleasure & Interest
Capacity rationales were rewritten so they no longer treat dopamine-ADHD or
insulin–dopamine reviews as noradrenaline dietary evidence.

Legacy `confidence` and `evidence_confidence` values were not silently
rescaled.

## Validation

Passed:

- `npm run findings:sync -- --pm BRS1-FM1-PM4`
- `npm run phenome:sync -- --file docs/biological-targets/brs1/fm1/brs1-fm1-pm4-noradrenergic-signalling-attention-executive-modulation.mdx --pm-only`
- `npm run findings:check`
- `npm run test:scientific-findings`
- `npm run test:dietary-lever-traceability`

## Overview evidence rerun (2026-09-30)

The Overview now retains noradrenergic arousal, vigilance and executive-control
roles, adds the supported dopamine β-hydroxylase conversion step, and separates
upstream precursor supply/LAT1 transport from PM4 signalling. Existing
Findings and attached references (O'Donnell; Goldstein and Eisenhofer;
Vendelboe; MacDonald) were sufficient; no retrieval was performed. Stopping
rationale: reaction identity, signalling role and adjacent-process boundaries
are adjudicated. Unresolved: ordinary-diet modification of human brain
noradrenaline and nutritional attention or ADHD benefit.
