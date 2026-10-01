# BRS2-FM3-PM7 Phosphatidylcholine Formation — Stage 2B Report

## Correction

The first pass left §3.1.1 empty because choline is not the molecule PEMT methylates. That was the wrong public result. Phosphatidylcholine formation has a dietary choline relationship through the parallel CDP-choline route. Vance shows mice that lack PEMT develop liver failure within days on a choline-deficient diet. Choline is therefore admitted as a Direct dietary requirement at `biological-dependency`. Dietary phosphatidylcholine is admitted as Derived provision of choline at `dietary-provision`, from human tracing that dietary phosphatidylcholine raises labelled plasma choline (Böckmann et al. 2023). Neither row claims that extra choline or phosphatidylcholine increases PEMT rate or improves cognition. Page-level `dietary_addressability: not-established` and `claim_ceiling: biological-dependency` were removed so they do not contradict the rows. Phosphatidylethanolamine and SAMe stay in §3.1.2. DHA, EPA, phospholipid-bound DHA and magnesium stay out. Both Key Constraint arms stay unresolved, and §3.1.3 stays: No mapping established.

## Outcome

Stage 2B set `evidence_status: stage-2b-dietary-addressability`. The first pass also set page-level `dietary_addressability: not-established` and `claim_ceiling: biological-dependency` and left §3.1.1 empty. That page-level stamp was removed in the correction above. Intervention dominance is `Diet-Supported` with `Food-State Leaning`. Two biochemical substrates are admitted in §3.1.2. Magnesium was rejected and removed. Both Key Constraint arms are unresolved, so §3.1.3 is exactly: No mapping established.

Biochemical necessity, dietary provision, demonstrated modulation and functional benefit stay separate. A required substrate is not evidence that eating more of it increases PEMT activity or improves cognition.

## Dietary decisions

| Candidate | Layer | Decision | Ceiling |
|---|---|---|---|
| Phosphatidylethanolamine | §3.1.2 substrate | Admitted. Biochemical substrate only. | biological-dependency |
| S-adenosylmethionine (SAMe) | §3.1.2 substrate | Admitted. Methyl-donor substrate supplied by BRS2-FM1-PM3. Not a dietary SAMe requirement. | biological-dependency |
| Magnesium | Legacy cofactor and §3.1.2 food arrow | Rejected. Not a PEMT cofactor (PM7-F1). Removed from `cofactors` and from the public list. | — |
| Choline | Direct dietary requirement | Admitted after correction. Substrate of the parallel CDP-choline route. Not a PEMT substrate, and not a claim that more choline increases PEMT rate. Food arrows were not restored. | biological-dependency |
| Phosphatidylcholine | Derived provision of choline | Admitted after correction. Human tracing shows dietary phosphatidylcholine can raise plasma choline. Not a PEMT substrate. | dietary-provision |
| DHA, EPA, phospholipid-bound DHA | Legacy §3.1.1 food arrows | Not admitted. Brain DHA measurements do not record PEMT rate (PM7-IC1). | — |
| Dietary SAMe supplementation | Not previously a clean row | Not admitted. SAMe is produced by PM3. Substrate necessity does not create a supplement requirement. | — |
| Ethanolamine / dietary phosphatidylethanolamine provision | Omitted candidate | Unresolved. No retrieved study showed that ordinary intake supplies the hepatic phosphatidylethanolamine PEMT methylates. Not admitted, and not treated as a negative finding. | — |
| Folate, B12, betaine, methionine, serine, glycine, cysteine | Legacy KC food lists | Not copied. Not PM substrates. | — |

Admitted atoms:

- `PM7-DIT-1` Phosphatidylethanolamine — biochemical substrate — PM7-F1, PM7-F2
- `PM7-DIT-2` S-adenosylmethionine (SAMe) — biochemical substrate — Supply: PM3 — PM7-F1, PM7-F2
- `PM7-DIT-3` Choline — Direct dietary requirement — PM7-F1 — Vance
- `PM7-DIT-4` Phosphatidylcholine — Derived toward choline — Böckmann et al. 2023; Vance

§3.1.1 lists Choline and Phosphatidylcholine. The two methylation substrates stay in §3.1.2. Public bullets are the plain labels only.

No System Optimisation Practice or lifestyle atom was invented. Unsupported cooking, meal-timing and sleep bullets were removed.

## Type D

### BRS2(KC1) — Methyl Donor Pool

**Disposition: unresolved.**

Applicability proposition: inadequacy of the shared methyl-donor pool constrains hepatic PEMT-dependent phosphatidylcholine formation.

Established links:

- PEMT uses SAMe for three methylations of phosphatidylethanolamine (PM7-F1).
- S-adenosylhomocysteine can regulate PEMT (PM7-F2).
- Pemt-knockout mice develop liver failure within days on a choline-deficient diet because the CDP-choline route is also unavailable (PM7-F1; Vance).

Inference, not admission:

- Folate, betaine or choline-derived methyl shortage would still have to be shown to reduce PEMT flux, rather than only to sit upstream of SAMe.
- Choline deficiency that makes PEMT necessary, or that damages liver when PEMT is absent, does not isolate methyl-donor constraint of this enzyme.

The `key_constraints` line was removed. No `pm_kc_relationships` row. No constituent or food list.

### BRS2(KC2) — Methionine & Transsulfuration Substrate Pool

**Disposition: unresolved.**

Applicability proposition: inadequacy of the shared methionine and cysteine pool constrains hepatic PEMT-dependent phosphatidylcholine formation.

Established link: PEMT consumes SAMe, and methionine adenosyltransferase makes SAMe from methionine (PM7-F1; PM3).

Inference, not admission: a smaller methionine pool would have to limit PEMT flux rather than only limit SAMe synthesis. Methionine–choline-deficient models do not separate this pool from choline removal. SAMe concentration is not PEMT flux. The PM3 adjudication already found this pool unresolved for MAT flux; that upstream gap was not re-labelled as PEMT constraint.

The `key_constraints` line was removed. No `pm_kc_relationships` row. No constituent or food list.

## Retrieval and stopping rationale

Stage 2B used the Stage 2A reaction boundary and asked three dietary questions:

1. Is magnesium a PEMT cofactor that must be kept as a named cofactor?
2. Does choline, ethanolamine or dietary phosphatidylethanolamine enter the phospholipid pool this reaction actually methylates?
3. Does methyl-donor or methionine-pool inadequacy constrain PEMT capacity, rather than merely precede SAMe?

Magnesium was already rejected in Stage 2A. Choline was adjudicated from the Vance knockout phenotype as the parallel route. No additional paper was required to refuse choline as a PEMT substrate. Ethanolamine provision was not found in the bounded reaction literature; searching food-composition tables would not create a PEMT flux result, so that candidate stays unresolved. Type D was stopped when the available deficiency designs either removed the parallel choline route or only showed SAMe sitting upstream. Further combined methyl-deficiency papers would repeat that confound.

## Public presentation

- §3.1.1 lists Choline and Phosphatidylcholine. The first-pass empty sentence was replaced.
- §3.1.2 lists Phosphatidylethanolamine and S-adenosylmethionine (SAMe) only.
- §3.1.3 is exactly: No mapping established.
- §5.3 states that PM3 supplies the SAMe this reaction consumes.
- Phenome rationales keep Cognitive Clarity and Focus / Attention Stability as downstream inference. Legacy confidence fields were not rescored.
- `findings:sync` and `phenome:sync` were not run.

## Change-control notes

Not written to `system/mechanism-change-control-queue.md`, per this run.

- Magnesium disposition: rejected as a PEMT cofactor; removed rather than matched to an atom.
- Both KC arms: unresolved. Do not restore food lists from the KC pages.
- Ethanolamine / dietary phosphatidylethanolamine provision: unresolved, not a Dietary Requirement.
- New citation keys remain in `system/bib-additions/brs2-pm7.bib` until the main bibliography is updated: `shields_pemt_topography_2003`, `shields_pemt_adomet_2003`, `ridgway_pemt_kinetics_1988`.
- `vance_phospholipid_2014` identifier mismatch remains a bibliography repair, not a science change.

## Unresolved

- Dietary provision of phosphatidylethanolamine or ethanolamine into the PEMT substrate pool.
- Type D for BRS2(KC1) and BRS2(KC2), both unresolved.
- Human dietary dose-response for PEMT-dependent phosphatidylcholine formation.
- Whether supplemental SAMe changes PEMT flux. Not admitted.
- Finding cards in §4.1 and §7 are not generated. `findings:sync` and `phenome:sync` were not run. The rendered dietary disclosures were checked on the local page.
