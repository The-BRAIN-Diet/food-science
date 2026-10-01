# BRS2-FM1-PM4 Methionine Cycle Flux — Stage 2B Report

## Governed state

Integrated methionine-cycle throughput and the distribution of homocysteine between remethylation and transsulfuration. Component-enzyme cofactors and sibling substrates were not admitted because a neighbouring mechanism uses them.

## Correction

The first pass left §3.1.1 and §3.1.2 empty because methionine was treated as owned by SAMe synthesis and because no study showed ordinary intake changing human branch rates. That was the wrong public result. Methionine is the amino acid that enters this cycle. Reappearance on a sibling mechanism is expected when the role differs: here the role is cycle entry and regeneration, not MAT catalysis. Absence of a dose-response does not erase that capacity requirement.

Restored rows, all at `biological-dependency` except dietary protein at `dietary-provision`:

- `PM4-DIT-1` Methionine — Direct substrate — PM4-F1 — Chiang; Finkelstein
- `PM4-DIT-2` Dietary protein — Derived toward methionine — FAO DIAAS; Finkelstein
- `PM4-DIT-3` Folate — supplies 5-methyltetrahydrofolate for remethylation — PM4-F1, PM4-IC1 — Finkelstein; Froese; Collaboration
- `PM4-DIT-4` Vitamin B12 — cobalamin cofactor for folate-dependent remethylation — Froese; Collaboration
- `PM4-DIT-5` Vitamin B6 — pyridoxal phosphate cofactor for the transsulfuration exit — Finkelstein; Meier; Lamers (mean rates unchanged under moderate restriction)
- `PM4-DIT-6` Riboflavin — flavin for the enzyme that makes 5-methyltetrahydrofolate — Froese; Finkelstein

Page-level `dietary_addressability: not-established` and `claim_ceiling` were removed. §3.1.1 lists those six labels. §3.1.2 lists Methionine, Folate, Vitamin B12, Vitamin B6 and Riboflavin. Choline, betaine, the coordinated meal-pattern bullet and both Key Constraint food lists stay out. §3.1.3 remains: No mapping established. No row claims that raising intake increases human remethylation or transsulfuration rates.

Page status after correction: `evidence_status: stage-2b-dietary-addressability`. The first pass had set addressability `not-established` and claim ceiling `biological-dependency`, created no five-atom records, and left §3.1.1 and §3.1.2 empty. That empty state is no longer the public page. §3.1.3 remains `No mapping established.`

Inherited `Intervention Dominance: Diet-Dominant` was left in place. It is not evidence that a dietary lever exists.

## Dietary decisions

| Candidate | Type tested | Decision |
|---|---|---|
| Methionine | A capacity, and a possible B state-regulation of the split | Not admitted. Methionine is the entry amino acid for SAM synthesis, which is PM3’s substrate relationship. Finkelstein (1998) also notes that excess methionine can continue hepatic SAM synthesis through a liver MAT isoenzyme. Fanti et al. (2026) changed frailty and metabolic signalling in aged mice when methionine was too low or too high. None of this shows a PM4 dietary relationship to coordinated human branch rates. |
| Dietary protein | Derived provision of methionine | Not admitted. That provision relationship belongs with methionine as a MAT substrate. It was not re-derived here. |
| Folate | A capacity via methyl-tetrahydrofolate | Not admitted. Methyl-tetrahydrofolate is an effector of the split (PM4-F1). Collaboration (1998) shows folic acid lowers blood homocysteine concentration (about 25% at the standardised baseline). That is a concentration result for the remethylation arm, not evidence that dietary folate sets PM4 branch rates. |
| Choline and betaine | A or B via methyl donation | Not admitted. No attached or retrieved source shows that choline or betaine intake changes remethylation or transsulfuration rates. |
| Coordinated methyl-donor meal pattern | B state-regulation | Not admitted. The previous food-arrow bullet asserted the pattern. No study in the corpus tested that pattern against cycle rates. |
| Vitamin B2 | C biochemical requirement of integrated flux | Rejected. Removed from `cofactors`. Aragão et al. (2024) is a general riboflavin review and does not test cycle rates. Riboflavin cofactor status of MTHFR is a folate-cycle fact for remethylation, not a demonstrated requirement of the integrated rates governed here. |
| Vitamin B6 | C biochemical requirement of integrated flux | Rejected. Removed from `cofactors`. Lamers et al. (2011), PM4-F2: in nine healthy adults, 28 days of restriction lowered plasma PLP from 49 ± 4 to 19 ± 2 nmol/L and did not change mean postprandial remethylation, transmethylation, or total transsulfuration. Cystathionine concentration rose from 142 ± 8 to 236 ± 9 nmol/L, and fractional cystathionine synthesis rose by a mean of 12% in 8 of 9 participants. That intermediate change is not the integrated rate. Collaboration (1998): added vitamin B6 (mean 16.5 mg/day) did not further lower blood homocysteine. PLP cofactor status of transsulfuration enzymes is not, by itself, a PM4 requirement. |
| Vitamin B12 | C biochemical requirement of integrated flux | Rejected. Removed from `cofactors`. Vitamin B12 is the cofactor of methionine synthase. Collaboration (1998) found an additional 7% (3% to 10%) reduction in blood homocysteine concentration. Huang et al. (2015) reported lower plasma homocysteine after vitamin B12. Both are concentration results, not PM4 rate requirements. |
| ATP, magnesium, potassium | C | Not candidates here. They belong to MAT catalysis on PM3. |

The first pass admitted no Direct or Derived row. That empty inventory was corrected above. The six restored atoms are the public inventory.

## Type D

### BRS2(KC1) — Methyl Donor Pool

Disposition: **unresolved**. Not published. No `key_constraints` entry. No `pm_kc_relationships` row.

Established links: methyl-tetrahydrofolate is an effector of homocysteine distribution (Finkelstein 1998; PM4-F1). Folic acid, with a further effect of vitamin B12, lowers blood homocysteine concentration (Collaboration 1998; PM4-IC1).

Inference that was not admitted: those facts mean inadequacy of the folate, choline, and betaine pool constrains remethylation or transsulfuration rates.

A targeted query for a human folate-depletion tracer study did not return a clear rate paper in the first results and was stopped. The arm is unresolved, not a demonstrated non-application.

### BRS2(KC2) — Methionine & Transsulfuration Substrate Pool

Disposition: **unresolved**. Not published. No `key_constraints` entry. No `pm_kc_relationships` row.

Established links: methionine is the amino acid that enters SAM formation (Chiang 1996; Finkelstein 1998). A liver MAT isoenzyme allows excess methionine to continue SAM synthesis (Finkelstein 1998). In aged mice, too little or too much methionine removed longevity-diet benefits on frailty and metabolic signalling (Fanti 2026).

Inference that was not admitted: inadequacy of the shared methionine–cysteine pool therefore limits human branch rates. Necessity and a mouse phenotype are not that rate constraint. Cysteine sparing was not re-adjudicated from the KC page onto this PM.

## Optimisation and lifestyle

Homocysteine-lowering supplements and methionine-restriction protocols were not admitted as Direct or Derived requirements. They were also not admitted as System Optimisation Practices. The measured endpoints are homocysteine concentration, frailty, or ageing commentary, not a change in the branch rates this mechanism governs. No lifestyle atom was created. Public §3.2 shows no populated category. Public §3.3 states that no evidence-qualified lifestyle relationship is projected. The previous meal-timing, phytate, fat-pairing, and salmon bullets were removed because they were not evidence for this mechanism.

## Stopping rationale

Every listed cofactor was adjudicated. B6 is the one candidate with a direct human rate test, and that test did not show a mean rate change in the conditions studied. Folate, B12, methionine, choline, betaine, and dietary protein lack a rate-level PM4 relationship and were not admitted from pathway proximity. Both KC arms were assessed and left unresolved because the pool-to-rate link is inferred. Another broad search of one-carbon trials would keep returning concentration endpoints. Resolving either KC arm needs evidence that inadequacy of that named pool changes remethylation or transsulfuration rates.

## Change-control notes

Recorded here only. The change-control queue was not edited.

- B2, B6, and B12 removed from `cofactors` with the dispositions above.
- Both KC index entries removed because neither applicability disposition is `established`.
- Food-arrow dietary, cofactor, and KC constituent bullets removed.
- New keys `finkelstein_homocysteine_1998` and `lamers_vitamin_b6_methionine_cycle_2011` are only in `system/bib-additions/brs2-pm4.bib`.
- `findings:sync` and `phenome:sync` were not run. §4.1 and §7 were rendered from this page’s front matter with the same section renderers so the public findings match the records.
- Browser verification of dietary disclosures was not required: no §3.1.1 or §3.1.2 atom is admitted.
