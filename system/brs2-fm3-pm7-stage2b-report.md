# PM7 Stage 2B focused reassessment — 2026-10-01

This section supersedes conflicting conclusions and completion statements in the historical report retained below. Mission unchanged. Stage 2A follow-up authored PM7-F5/F6/F7 with Individual Study Assessments; Stage 2B admitted KC1 conditionally, retained KC2 unresolved, and corrected Choline Direct/Phosphatidylcholine Derived provision roles. See canonical Findings and QC decisions FW037, FW038, FW039, FW040.

Böckmann exact source location: Results, D3-PC from the PEMT pathway; supplementary Figure S5B (appearance by input), S5A (betaine relationship); Methods, Chemical analysis. D9-PC/remodelling and D3-PC are separate signals. Full Results passage verified at the publisher. Provision is admitted, not indispensable dependence or activity enhancement.

Retrieval questions: donor restriction and pathway-specific formation; methionine intervention with choline maintained; upstream SAM impairment and capacity; labelled choline/PC methyl provision. Searches used the exact Chew, Kharbanda, Sugiyama, Shimada, Cano and Böckmann titles and citation following. Chew/Cano indexed primary results, Shimada full text, Böckmann publisher full text, and Kharbanda/Sugiyama abstracts were assessed. Access limits remain explicit.

Stopping: KC1 and dietary provision are resolved at bounded claims. KC2 remains open for dietary-study methods, intake adequacy, inhibitor specificity and competing effects; no universal human trial, absolute-flux or numerical deficiency threshold is imposed. Phenome reassessment is separately deferred (FW041). Bibliography identifiers previously repaired and existing Findings cards are current; earlier statements otherwise are historical.

Implementation and validation status is maintained in the QC register, not inferred from this report.

## Clarified KC input presentation and interaction — 2026-10-02

This supersedes presentation wording in the preceding implementation pass only. Public §3.1.3 now contains Folate, Betaine and Choline as named disclosure buttons, each with a separate `KC1: Methyl Donor Pool` origin link. Parent-KC input and audit headings are removed. The three presentation labels and origin metadata changed; mission, scientific Findings, bibliography, dietary five-atom evidence, applicability adjudications and canonical identifiers remain unchanged. KC1 is conditionally admitted and KC2 unresolved/audit-only.

The shared list renderer previews on the input trigger rather than the whole row. Origin hover/focus does not preview; origin click navigates. Click/tap-equivalent activation pins, repeat activation closes; Enter/Space work through native buttons. Escape closes and returns focus with focus-preview temporarily suppressed. Outside-click close remains unchanged. The existing PM3 dropdown was regression-tested because the shared handlers also serve it.

Actual verification: 64 tests passed across PM7 reference/interaction, PM3 reference, dietary traceability, KC governance, BRS1-FM1 Stage 2B and framework QC. The minimal documented record fixture loads complete dependencies from canonical PM7 and executes actual shared projection/rendering code. Pointer-enter/leave and touch-pointer/click sequences were tested through event fixtures against the actual shared handlers; no physical touch-device test is claimed. Browser checks on the actual PM7 page confirmed focus preview, Enter/Space pinning, click/reclick, Escape focus return without reopening, separate-origin Tab/Enter navigation to the published KC1 page, all three seven-part disclosure orders, and numbered/local Finding targets. Production build passed with the writable workspace output directory. Existing unrelated tag/cache/update warnings remain.

The exact working Markdown, records, origin wiring and shared interaction handlers are embedded in `system/dietary-input-traceability-contract.md` under “Admitted PM-owned KC input disclosure — PM7 integration reference”. Full studies/bibliography remain canonical. The contradictory legacy wording allowing proposed iKCs in `key_constraints` was aligned with the existing admitted-only contract; this is not a new admission rule or a scientific reassessment.

Remaining deployment gap is unchanged: published PM7 lacks F5/F7. Local canonical titles and targets are verified, but the full public research URLs need deployment. KC2 research and phenome follow-up remain audit-only and open.

## KC disclosure and constituent implementation — 2026-10-02

KC1 remains established conditionally; KC2 remains unresolved. Existing PM7-F5/F6/F7 and citation sources were reused at their recorded access levels; no new scientific finding, dietary classification or FM mapping was inferred from missing records. PM ownership means independent applicability assessment, not prohibition of iKC inclusion.

| Candidate | Specific PM connection and evidence | Disposition and boundary |
|---|---|---|
| KC1 methyl-donor pool | Named folate restriction reduced hepatic d3-PC enrichment with choline maintained; betaine rescued reported production under ethanol imbalance (F5). | Existing conditional applicability preserved; animal contexts and enrichment-versus-flux limitation exposed. |
| Folate | Restricted donor availability changed pathway-specific methyl incorporation in female mice (Chew, F5). | PM-owned DIT-5 admitted for KC relevance only. No extra-intake enhancement or new §3.1.1 requirement. |
| Betaine | SAM:SAH and reported PEMT production recovered in ethanol-fed rats (Kharbanda abstract, F5). | PM-owned DIT-6 admitted for bounded KC relevance only; ordinary betaine deficiency and assay specificity unresolved. |
| Choline | Human D3-PC tracing after dietary choline supports methyl-group provision, distinct from D9-PC/Kennedy incorporation (Böckmann, F7). | Existing DIT-3 reused for provision relevance, not proof that choline inadequacy universally constrains PEMT. |
| KC2 sulfur-amino-acid pool | Methionine diet changes SAM and PC:PE; MAT1A loss lowers measured PEMT activity in young mice (F6). | Existing unresolved disposition preserved; adequacy, inhibitor specificity and competing effects still needed. Not an established mapping. |
| Methionine | Diet and upstream SAM evidence support a connection, but PC:PE and genetic perturbation do not isolate dietary capacity limitation (F6). | Candidate capacity-constraint relation unresolved; no admitted KC2 constituent edge. |
| Cysteine | Canonical KC2 allows methionine sparing; PM7's cystine intervention had little/no comparable effect and does not isolate a sparing→PEMT capacity chain (Shimada, F6). | PM relationship unresolved, not excluded because absent from PM atoms. No interchangeability assumption. |
| B12, serine, glycine as iKC constituents | KC-owned review excludes B12 as a remethylation cofactor, serine as a transsulfuration cosubstrate and glycine as a separate GSH substrate outside this sulfur pool. Glycine attenuation in PM7-F6 is a competing-effect signal, not shared-pool membership. | Rejected as projections of these iKCs under the canonical membership definitions, with rationale retained here; this does not reject any independently supported local PM role or settle KC2 applicability. |

The first request for a public unresolved KC2 assessment conflicted with the audit-only contract. The clarified user instruction superseded that request: KC2 remains audit-only; the draft assessment block and proposed exception were removed before applying any repository change. No public-admission rule or scientific threshold changed.

Actual implementation verification: 53 tests passed across the PM7 KC reference, PM3 documented example, dietary traceability, KC governance and BRS1-FM1 Stage 2B suites. The documented PM7 example loads canonical dependencies and executes the shared disclosure/renderer functions; unresolved-admission mutation checks pass. Browser verification covered closed/open KC1 and all three constituents, description → five atoms → research-link order, bibliography targets [10]/[11]/[12], local F5/F7 anchors and the published KC1 title destination. The production build passed with a workspace output directory (the repository build directory could not be replaced under filesystem permissions). Existing tag/cache/update warnings are unrelated.

Deployment gap: the published PM7 page still lacks F5/F7. Its full canonical research URLs therefore cannot reach those Findings until the updated page is deployed; the local record, resolved titles and anchors are verified. No deployment was performed. Phenome follow-up remains separately deferred. The exact working integration is embedded in `system/dietary-input-traceability-contract.md`, under “Admitted PM-owned KC disclosure — PM7 integration reference”.

## Dietary header indicator placement correction — 2026-10-01

The consolidated implementation added PM2 Remethylation and PM3 Supply relationships to both PM7-DIT-3 (Choline) and PM7-DIT-4 (Phosphatidylcholine). The existing dietary-input-traceability contract (§ downstream reaction participants versus upstream supply and §7 collapsed display rules) requires atom-level upstream relationships to appear beside entry labels. PmDietaryLeverEnhancer therefore displayed those links in §3.1.1; the §3.1 heading markup itself was unchanged. This was page-level metadata placement, not a shared renderer defect.

Removed those transitive-chain indicators from the Choline and Phosphatidylcholine atoms. Retained the pre-existing PM3 Supply relationship on the SAMe substrate atom PM7-DIT-2 and the evidence-supported methyl-provision descriptions/Finding PM7-F7. Added the PM2 chain explanation to §5.3 Local BRS Mechanism Relationships alongside the existing PM3 explanation. KC1/KC2 adjudications, Direct/Derived classifications, ceilings, Findings and scientific evidence are unchanged. No contract or renderer behavior change.

---

## Historical report (superseded where inconsistent)

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
