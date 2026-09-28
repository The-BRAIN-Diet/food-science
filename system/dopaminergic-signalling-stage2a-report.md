# BRS1-FM1-PM3 Dopaminergic Signalling — Stage 2A Report

## Scope and canonical references

Stage 2A used the Profile A PM contract in `system/primary-mechanism-schema.md`
and the bounded Scientific Finding contract in
`system/scientific-finding-schema.md`. The implementation follows the production
patterns on BRS1-FM4-PM9 GABA Synthesis Capacity and BRS5-FM1-PM1 Gut Barrier
Integrity. The branch-verified target is BRS1-FM1-PM3.

Repository-reviewed evidence was used first. Bounded external follow-up was
limited to propositions that the repository corpus could not adjudicate:
nonlinear cognitive control, cognitive effort, flexibility, healthy aging and
ADHD transporter heterogeneity.

## Supported claims

- Dopamine regulation is a sequence of synthesis, vesicular handling, release,
  receptor signalling, transporter-mediated reuptake and enzymatic metabolism.
  Concentration, synthesis capacity, release, receptor availability,
  transporter binding and metabolites are not interchangeable measures.
- Dopaminergic effects on working memory and cognitive control are nonlinear
  and depend on baseline state, region and task. Neither lower nor higher
  signalling is uniformly beneficial.
- Human mechanistic evidence supports dopamine involvement in cognitive-effort
  allocation through benefit-versus-cost weighting.
- D2-receptor signalling contributes to cognitive flexibility, with
  task- and baseline-dependent effects.
- Healthy aging affects dopamine targets differently: receptor and transporter
  measures decline on average, while synthesis capacity was not significantly
  reduced in the assessed meta-analysis.
- Dopamine biology is relevant to ADHD, but ADHD evidence is heterogeneous
  across process, region, age, method and medication history. A uniform global
  dopamine-deficiency account is not supported.

## Constrained claims

- Iron, tetrahydrobiopterin and PLP are reaction-level requirements. This does
  not establish that additional intake raises dopamine when status is adequate.
- Medication target engagement establishes pharmacological relevance, not a
  dietary route to the same target or outcome.
- Cognitive effort is not equivalent to sustained performance or resistance to
  fatigue.
- Receptor or transporter change in aging is not a global dopamine
  concentration change and does not by itself establish cognitive mediation.
- BRS2 methyl-donor availability, BRS3 redox handling, BRS4 bioenergetics and
  BRS6 metabolic/stress/circadian context remain constrained dependencies,
  not PM3 roll-ups or dietary claims.

## Rejected claims

- “More dopamine is better.”
- ADHD is a uniform dopamine-deficiency disorder.
- Dietary tyrosine provision demonstrates increased brain dopamine.
- Dopamine target engagement demonstrates symptom or clinical benefit.
- The small open L-tyrosine trial supports sustained ADHD treatment; its initial
  response disappeared and no dopamine process was measured.
- Pharmacological dopamine manipulation can be translated directly into a
  food, nutrient or supplement recommendation.

## Unresolved claims

- A dopamine-specific mechanism for sustained cognitive performance or fatigue
  decline was not established.
- Direct human dietary modification of dopamine synthesis, release, receptor
  signalling, transporter activity or metabolism remains insufficiently
  demonstrated.
- Depression- and anxiety-specific dopamine findings were not strong enough in
  this bounded pass to receive TA003 or TA002 tags.
- End-to-end mediation from the BRS2, BRS3, BRS4 or BRS6 dependencies to a PM3
  functional outcome remains untested.
- A dedicated Cognitive Flexibility Phenome does not exist in the current
  registry, so the supported flexibility finding remains in §4.1 rather than
  creating a non-canonical Phenome relationship.

## Condition tags

The Scientific Finding schema now accepts optional
`therapeutic_area_ids`, validated against the canonical Therapeutic Area
registry. PM3-F6 and PM3-F7 carry `TA001` because they directly assess ADHD.
No tags are inferred from general Phenome relevance.

## Candidate dietary atoms for the later Dietary Levers pass

1. `PM3-DIT-1` — Iron: direct tyrosine-hydroxylase cofactor candidate.
   Human intake responsiveness at adequate status and clinical mediation are
   unresolved.
2. `PM3-DIT-2` — Pyridoxal-5′-phosphate: direct aromatic
   L-amino-acid-decarboxylase cofactor candidate. Dietary PLP provision and
   human brain responsiveness are not established.
3. `PM3-DIT-3` — Vitamin B6: derived candidate because B6 vitamers provide PLP
   precursors. No dopamine-specific dose, timing, recommendation strength or
   scoreability is authorised.

The later Dietary Levers pass must decide whether each candidate is retained,
revised, merged, relocated or deleted. It must preserve the finding and
citation provenance and report material changes. Tyrosine is not duplicated as
a PM3 atom because amino-acid availability and LAT1 competition are owned by
PM1 and PM2.

## GABA evidence-placement repair

No edit was required. After branch renumbering, GABA Synthesis Capacity is
BRS1-FM4-PM9. Its canonical `PM9-F3` already represents ADHD GABA-concentration
evidence as a Phenome-linked Scientific Finding and states explicitly that
measured GABA concentration does not establish GABA synthesis capacity.
`findings:check` confirms the generated placement is fresh.

## Validation

Passed:

- `npm run findings:check`
- `npm run test:scientific-findings` — 25 tests
- `npm run test:brs1-dopamine-stage1` — 5 tests; command name retained for branch compatibility
- `npm run test:dietary-lever-traceability` — 13 tests
- `npm run test:pm-dietary-requirements-headings` — 6 tests
- `npm run phenome:validate` — 159/159 relationship edges mapped
- `npm run bib:validate` — all cited keys resolved
- PM contract, PM Mechanistic Basis, Phenome index/mapping and Scientific
  Findings portions of `npm run mechanisms:validate`
- IDE lint diagnostics for the edited PM, validator and tests

Existing baseline failure not changed:

- `npm run mechanisms:validate` still exits non-zero for four pre-existing
  Specific Mechanism §6.2/§6.3 heading-contract failures. PM validation and all
  Stage 2A-specific gates pass.
- `npm run build` compiled the client and server successfully, then exited
  non-zero on pre-existing production broken links from PM pages to the
  internal-only Therapeutic Area routes. No PM3 or new bibliography link was
  reported in the broken-link output.
