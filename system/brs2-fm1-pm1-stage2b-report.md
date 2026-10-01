# BRS2-FM1-PM1 Folate/B12-Dependent Homocysteine Remethylation — Stage 2B Report

## Outcome

`evidence_status` is `stage-2b-dietary-addressability`. Intervention dominance stays Diet-Dominant because diet supplies folate and vitamin B12 for the reaction’s substrate and cofactor. That is not evidence that more intake raises tissue synthase flux or treats attention or cognition.

Riboflavin was removed from `cofactors`. The retained cofactor name is Methylcobalamin, matching the traceability input. The list was not emptied.

## Dietary decisions

| Candidate | Decision | Layer | Ceiling |
|---|---|---|---|
| 5-Methyltetrahydrofolate | Admit. Direct substrate. Addressability direct. | §3.1.1 `PM1-DIT-1` | biological-dependency |
| Folate | Admit. Derived substrate provision → 5-Methyltetrahydrofolate. Each edge used is in Froese et al. (2019): folic acid is reduced by dihydrofolate reductase, and methylenetetrahydrofolate reductase produces 5-methyltetrahydrofolate, the synthase substrate. Addressability precursor-mediated. | §3.1.1 `PM1-DIT-2` | dietary-provision |
| Methylcobalamin | Admit. Direct cofactor of the reaction. Addressability not-established: diet supplies cobalamin that is processed to this cofactor; methylcobalamin is not a separate intake target. | §3.1.1 `PM1-DIT-3` | biological-dependency |
| Vitamin B12 | Admit. Derived cofactor precursor → Methylcobalamin. Froese describes absorption and intracellular processing onto the enzyme. Addressability precursor-mediated. | §3.1.1 `PM1-DIT-4` | dietary-provision |
| Homocysteine | Admit as biochemical substrate only. Not a dietary requirement. Methionine is the product and was not admitted. | §3.1.2 `PM1-DIT-5` | biological-dependency |
| Riboflavin / B2 | Reject as a methionine-synthase cofactor. FAD is a cofactor of MTHFR and of MTRR. Not given a dietary atom on this PM. | Removed from `cofactors` and from §3.1.2 | — |
| Vitamin B6 | Reject. Collaboration (1998) found no additional blood-homocysteine effect, and B6 serves transsulfuration, which is outside this reaction. | Not admitted | — |
| Choline, betaine | Reject as inputs of this reaction. They belong to the parallel BHMT route. | Not admitted | — |
| Fish oil / omega-3 | Reject as a Dietary Requirement. Tao Huang and Oulhaj show marker or cognitive interactions, not a synthase substrate. | Not admitted. SOP candidate only; no practice atom created | — |
| Zinc, potassium | Unresolved. Bacterial methionine synthase uses zinc to activate homocysteine, and one bacterial structure note also mentions potassium. The human review used here does not establish those ions, and no dietary limitation of human synthase flux was retrieved. Not admitted. | Unresolved | — |

Biochemical necessity, dietary provision, demonstrated modulation and clinical benefit stay separate. Folic acid and vitamin B12 lower blood homocysteine. That modulation is of a circulating marker (PM1-IC1), so it was not used to raise any atom to `modulation-demonstrated` or `phenome-benefit`.

5-Methyltetrahydrofolate and methylcobalamin are not repeated in §3.1.2. Their §3.1.1 rows already carry the same substrate and cofactor roles. Homocysteine is only in §3.1.2 because it is not a dietary input.

No System Optimisation Practice or Lifestyle Priority atom was created. Existing lifestyle and food-preparation prose was left in place. It is not evidence for this pass.

## Type D — BRS2(KC1) Methyl Donor Pool

Disposition: **unresolved**. Applicability mode was not set. `key_constraints` was removed. No `pm_kc_relationships` row was added. Public §3.1.3 is exactly: No mapping established.

Arm: `methyl-donor-pool-inadequacy`. The question was whether inadequacy of the named methyl-donor pool constrains this PM’s remethylation capacity.

Established links:

- 5-Methyltetrahydrofolate, made from folate by methylenetetrahydrofolate reductase, is an obligatory substrate of methionine synthase (Froese et al., 2019; PM1-F1).
- Folic acid lowers blood homocysteine, with a larger effect when pretreatment folate is lower (Collaboration, 1998; PM1-IC1).

Inferred links, not used for admission:

- Inadequacy of the whole pool, including choline and betaine, limits tissue methionine-synthase capacity. Those donors feed BHMT, not this reaction.
- A fall in blood homocysteine is a fall in tissue remethylation flux. PM1-IC1 rejects that reading.

Substrate necessity plus a circulating marker does not meet the capacity-constraint test. This is unresolved, not evidence that the pool has no role. Vitamin B12 stays a PM cofactor and is not treated as a member of the donor pool.

## Retrieval and stopping

Stage 2B reused the Stage 2A reaction evidence for the folate and B12 edges. Extra questions were whether B2, B6, homocysteine, methionine, choline, betaine or fish oil were requirements of this reaction, and whether pool inadequacy constrained tissue capacity.

Search stopped once those candidates were admitted, rejected or explicitly unresolved. Another homocysteine-lowering trial would not convert the blood marker into tissue flux. Bacterial zinc enzymology would not, by itself, create a dietary zinc atom.

## Rendered check

On the local page, the collapsed labels and disclosures were:

- 5-Methyltetrahydrofolate — Direct · Substrate; five fields; Froese et al. (2019) [9]
- Folate — Derived · Substrate Provision → 5-Methyltetrahydrofolate; five fields; [9]
- Methylcobalamin — Direct · Cofactor; five fields; [9]
- Vitamin B12 — Derived · Cofactor Precursor → Methylcobalamin; five fields; [9]
- Homocysteine — Substrate, without a Direct/Derived qualifier; five fields; [9]
- Key Constraints: No mapping established.

Food-arrow bullets are gone. §4.1 and §7 on the rendered page are still the pre-sync text.

## Change-control items (not written to the queue file)

1. Merge `system/bib-additions/brs2-pm1.bib` (`garcia_minguillan_riboflavin_2014`) into `static/bibtex/BRAIN-diet.bib`. The PM reference link will not resolve in the shared bibliography until that merge. The main bib was not edited.
2. Run `findings:sync` and `phenome:sync` for this file. Front matter is the source. §4.1 and §7 were not hand-edited, so they still show the previous highlights and rationales.
3. Legacy phenome confidence was not rescored: Focus / Attention Stability remains low–medium; Cognitive Clarity evidence confidence remains low. The findings say those studies do not test this reaction.
4. BRS2(KC1) applicability to this PM is unresolved. Do not copy choline, betaine or folate foods onto the PM from the KC page.
5. Fish-oil or combined omega-3 plus B-vitamin exposure is an Optimisation Strategy candidate (`conditional_supplementation`) only. It was not admitted.
6. A human catalytic-zinc (and possibly potassium) assessment of methionine synthase remains unresolved and was not admitted.
