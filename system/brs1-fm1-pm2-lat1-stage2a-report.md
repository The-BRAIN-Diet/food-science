# BRS1-FM1-PM2 LAT1 Competitive Transport Modulation — Stage 2A Report

## Scope and canonical references

Stage 2A used the Profile A PM contract in `system/primary-mechanism-schema.md`
and the bounded Scientific Finding contract in
`system/scientific-finding-schema.md`. The production pattern is the same as
BRS1-FM1-PM3 and BRS1-FM4-PM9. The target is BRS1-FM1-PM2.

Repository-reviewed evidence was used first. The attached corpus was sufficient
to adjudicate the Mechanistic Basis and Phenome-relationship propositions:

- Fernstrom (2013)
- Wurtman et al. (2003)
- Ashley et al. (1985)
- Aquili (2020)

No open literature search was added. PubMed retrieval of the meal-study
abstracts was blocked in this environment; Individual Study Assessments
therefore stay at the grain already present in the repository bibliography and
page corpus.

## Evidence-supported Overview rerun

The current Overview contract was applied claim by claim against PM2-F1,
PM2-F2 and PM2-F3:

- **Shared transporter and competition:** LAT1 carries tyrosine, tryptophan and
  other large neutral amino acids across the blood–brain barrier; transport
  bias depends on relative plasma concentrations (PM2-F1; Fernstrom 2013).
- **Meal-sensitive state:** ordinary carbohydrate-rich and protein-rich meals
  shift plasma tryptophan- and tyrosine-to-competing-LNAA ratios in different
  directions (PM2-F2; Wurtman et al. 2003; Ashley et al. 1985).
- **Measurement ceiling:** those studies measured plasma ratios, not brain LAT1
  flux, neurotransmitter production, an optimal meal ratio or clinical benefit
  (PM2-F2 and PM2-F3).

The inherited “win or lose” wording was replaced because it obscured the
relative-concentration rule and could be read as measured brain entry. The
carbohydrate-to-protein relationship was retained at the
`modulation-demonstrated` ceiling and explicitly tied to the plasma-ratio
endpoint.

The public result uses a 66-word explanatory paragraph followed by exactly
three non-duplicative bullets: mechanism boundary, evidence/measurement
boundary, and biological relevance with the treatment limitation. The ADHD
caveat appears only in the final limitation bullet so the general mechanism
does not end with repeated disorder-specific language. Citations resolve to PM
references [1]–[4], and the frontmatter summary matches the paragraph without
citation markup.

Rendered local verification confirmed one paragraph, exactly three bullets and
valid targets for every Overview citation link.

Existing verified evidence was sufficient for this bounded Overview rerun.
Targeted retrieval was not needed because every retained proposition maps to an
authored Finding and attached source. The unresolved direct-human brain-flux
and functional-outcome questions remain limitations rather than prompts to
expand the introductory claim.

## Propositions under test

Mechanistic Basis:

1. Tyrosine, tryptophan and other LNAAs share LAT1; transport is competitive.
2. Carbohydrate-rich versus protein-rich meals change plasma tryptophan and
   tyrosine ratios through meal macronutrient structure and insulin-mediated
   partitioning.
3. Meal structure biases precursor presentation; it is not neurotransmitter
   dosing.

Phenome relationships:

4. Meal-level LAT1 competition modulates Focus / Attention Stability.
5. Protein-forward meals modulate Motivation / Drive via tyrosine bias.
6. Carbohydrate–protein meals modulate Emotional Regulation via tryptophan
   bias.

## Supported claims

- Large neutral amino acids share LAT1 at the blood–brain barrier. Relative
  plasma concentration shapes which precursor is favoured for brain entry.
- Ordinary carbohydrate-rich and protein-rich meals change plasma
  tryptophan-to-LNAA and tyrosine-to-LNAA ratios in healthy adults.
- Those ratio shifts arise from meal-level competitive balance, not from total
  daily protein intake alone.
- Tyrosine and tryptophan are LAT1 cargo substrates. That biological role is
  not a Direct or Derived Dietary Requirement to eat more of either amino acid.

## Constrained claims

- Plasma LNAA-ratio change is not a measurement of brain LAT1 flux,
  neurotransmitter synthesis or a functional outcome.
- Insulin-mediated partitioning is the mechanistic account carried by the meal
  papers and the transport review. The attached studies measured circulating
  ratios, not insulin as an independent intervention.
- Carbohydrate–protein and protein-forward meal structure is a modulation
  relationship. It is not a Dietary Requirement and was not projected as a
  System Optimisation Practice in this pass.
- Phenome mappings remain translational. Precursor presentation at LAT1 is
  upstream of PM3–PM5 signalling and cannot substitute for those mechanisms.

## Rejected claims

- Eating more tyrosine or tryptophan is a LAT1 requirement or a monoamine-dosing
  rule.
- Ordinary meals that move plasma LNAA ratios improve attention, motivation,
  emotional regulation or ADHD.
- Aquili (2020) is ordinary-meal LAT1 evidence. It reviews executive function
  and reward mainly through depletion and loading designs.

## Unresolved claims

- Direct human measurement that these ordinary meals change brain LAT1
  transport, monoamine synthesis or a Phenome remains insufficient.
- Whether repeated meal-pattern use produces a durable competitive-balance
  adaptation is untested in the attached corpus.
- Habitual inadequacy of LAT1-relevant meal structure in a defined clinical
  population was not assessed here (Stage 2B addressability remains
  not-established).

## Scientific Findings authored

| Id | Presentation | Proposition |
|---|---|---|
| PM2-F1 | Mechanistic Basis | LNAAs compete at LAT1 |
| PM2-F2 | Mechanistic Basis | Ordinary meals shift plasma Trp/Tyr ratios |
| PM2-F3 | Phenome relationship (primary: Focus / Attention Stability) | Meal-ratio evidence does not establish Phenome or ADHD outcomes |
| PM2-IC1 | Interpretive constraint | Plasma ratios are not monoamine dosing |

PM2-F1 and PM2-F2 carry `fm_rollup: true`. This pass does not rewrite the parent
FM page.

No Therapeutic Area tags were added. None of the attached studies directly
assesses ADHD.

## Phenome and Change Control

Relationship rationales were rewritten so they no longer treat meal-ratio
evidence as ADHD-outcome evidence. Aquili remains in the bibliography and in
PM2-F3 as the wrong-construct review; it is not used as meal-LAT1 support.

Legacy `confidence` and `evidence_confidence` values were not silently
rescaled. The overclaim is recorded on the BRS1-FM1 PM2 row in
`system/mechanism-change-control-queue.md`.

## Dietary atoms after this pass

Existing Stage 2B atoms are retained and now cite Findings:

1. `PM2-DIT-1` — Tyrosine: LAT1 cargo substrate; `PM2-F1`.
2. `PM2-DIT-2` — Tryptophan: LAT1 cargo substrate; `PM2-F1`, `PM2-F2`.

No new Dietary Requirement was admitted. The carbohydrate–protein meal protocol
remains a candidate System Optimisation Practice for a later lever pass.

## Validation

Passed:

- `npm run findings:sync -- --pm BRS1-FM1-PM2`
- `npm run phenome:sync -- --file docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation.mdx --pm-only`
- `npm run findings:check` — 6 Findings-owned PM pages, 0 problems
- `npm run test:scientific-findings` — 27 tests
- `npm run test:dietary-lever-traceability` — 17 tests
