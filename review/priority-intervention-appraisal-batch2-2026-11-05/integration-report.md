# Batch 2 — integration and resolution

5 November 2026. Local implementation on `review/brs5-pm4-sec-assessment`, base HEAD `f1607fe5`; no commit, push or deployment. Authorisation: **Batch 2 Integration and Resolution**. Original `appraisals.json` remains the historical review; `resolution.json` records targeted follow-up and the final dispositions.

| Candidate | Receiving PM | D/B/P/R | SEC | Final disposition |
|---|---|---|---|---|
| Egg-yolk phospholipid formulation | BRS1-FM2-PM6 | 2/1/1/0 | 4/8 provisional | Admitted and implemented: exact 37 g ELIP formulation providing 3 g choline versus 9.3 g bitartrate; plasma endpoint only. |
| Glutamine | BRS5-FM1-PM1 | 2/1/2/0 | 5/8 provisional | Admitted and implemented: 5 g three times/day, eight weeks, selected hyperpermeable postinfectious IBS-D. |
| Whey versus casein | BRS1-FM1-PM1 | 2/1/1/0 | 4/8 provisional | Admitted and implemented from a matched 20 g protocol; pooled discovery contrast retained as history. |
| Vitamin C/E retention | BRS3-FM2-PM6 | 2/1/1/0 | 4/8 provisional | Admitted and implemented: smoker-specific retention under tested low-ascorbate conditions, not direct recycling flux or clinical protection. |
| Fish versus capsules | BRS1-FM3-PM7 | 2/1/1/0 | 4/8 provisional | Admitted and implemented as defined peripheral DHA provision alternatives; no source-superiority, equivalence or neuronal claim. |
| Prebiotic blend | BRS5-FM3-PM8 | 2/1/1/0 | 4/8 review only | Deferred: obtain exact ingredient proportions/material specification from investigators or sponsor. No generic-fibre substitution. |
| Cocoa flavanols | BRS1-FM5-PM12 (rejected owner) | — | Not appraised | Rejection retained: human vascular endpoint is not synaptic structural remodelling. |

## Admission boundaries

`system/brs-hub-levers-schema.md` permits condition-specific supplementation; `system/dietary-input-traceability-contract.md` permits connected proximal provision effects when kept distinct from PM activity. These existing rules support the glutamine clinical context, egg plasma-choline relationship and fish peripheral-DHA provision relationship. No new category, superiority requirement or clinical efficacy inference was introduced. All five records stay in §3.2, without dominance promotion. SEC remains in Section 4, independently owned by the intervention.

Full MoA, measured effect and PM relevance remain separate. Unisolated mediators do not receive invented collapsed mechanism lines. Typed limitations and null results remain accessible within the existing six-atom disclosure. The five changed pages reuse existing components; no shared presentation renderer was changed.

## Targeted evidence resolution

- **Whey:** Pennings et al. (2011), DOI [10.3945/ajcn.110.008102](https://doi.org/10.3945/ajcn.110.008102), author-uploaded primary full text. Matched protein doses and tracer sampling resolve the pooled-protocol blocker. Later casein appearance and finite sampling remain limitations. The synthesis and its constituent trial are not counted as independent replications.
- **Vitamin C/E:** Bruno et al. (2006), DOI [10.1016/j.freeradbiomed.2005.10.051](https://doi.org/10.1016/j.freeradbiomed.2005.10.051), author-uploaded primary methods/results recovered. The two review Assessment gaps are resolved conservatively at B1/P1, with missing allocation/carryover detail retained. Hemilä (2007), DOI [10.1016/j.freeradbiomed.2006.11.035](https://doi.org/10.1016/j.freeradbiomed.2006.11.035), warns against clinical inference from surrogates; that inference is excluded. Author reply was not independently appraised.
- **Fish:** Harris et al. (2007), DOI [10.1093/ajcn/86.5.1621](https://doi.org/10.1093/ajcn/86.5.1621), full primary PDF and tables recovered. DHA is measured separately from the EPA+DHA headline. The defined food schedule offers a distinct upstream provision practice; no superiority is required by the existing SOP contract. Small samples and no untreated control remain explicit.
- **Prebiotic:** Kang et al. (2022), DOI [10.3389/fnut.2022.908534](https://doi.org/10.3389/fnut.2022.908534), original appraisal reused. [NCT03785860](https://clinicaltrials.gov/study/NCT03785860) did not recover proportions. Romo et al. (2025), DOI [10.1016/j.nutres.2024.11.013](https://doi.org/10.1016/j.nutres.2024.11.013), identified as a follow-up; full text unavailable through attempted Scite/PMC/BioC retrieval. It is not treated as independent replication. Next action is formulation retrieval, not rescoring or another discovery sweep.
- **Egg and glutamine:** prior verified full-text appraisals reused without rescoring: Smolders et al. (2019), DOI [10.3390/nu11112758](https://doi.org/10.3390/nu11112758); Zhou et al. (2019), DOI [10.1136/gutjnl-2017-315136](https://doi.org/10.1136/gutjnl-2017-315136).

## Preservation and validation

Five new immutable provisional intervention assessments; all 129 prior snapshots preserved. Missions, Findings, Principles, dietary admissions, Lifestyle Levers and previously admitted SOP records are unchanged. Original Batch 2 review is unchanged. `integration-before.json` captures the pre-integration records; `integration.json` lists exact files, atoms and pins. Validation results are recorded in `integration-validation.json`.

Presentation approval scope: the current author instruction explicitly authorises these eligible admissions using the existing six-atom and Section 4 presentation. Fingerprints are appended to the existing approval ledger; the baseline is not regenerated. No new component or schema approval is inferred.

Final validation: **12 focused tests pass**, five changed PM admission checks have zero issues, all65 PM Findings checks pass, presentation contract passes, and134 SEC snapshots validate with129 prior records unchanged. Browser interaction verified on the egg page; glutamine preview stalled, so full five-page visual verification remains incomplete. Broader existing failures and the roll-up blocker are enumerated in `integration-validation.json`; no clean repository-wide build is claimed.

## Browser validation completed — 5 November 2026

All five implemented six-atom disclosures opened in the local browser; each Section 4 link opened the independently owned intervention assessment. References and typed limitations were visible. Corrected three existing-content defects: active glutamine dose made explicit, obsolete no-SOP text removed from BRS3PM6, PM1 assessment-parent count changed from2 to3. No admission or SEC changes. Existing presentation fingerprints still pass; baseline and approvals unchanged. Focused tests9/9; presentation691 protected files; SEC134 snapshots pass. Details: [browser-validation.json](browser-validation.json). No production deployment.
