# BRS3 Stage 2A/2B completion inventory — 7 October 2026

## Scope and authority

Read-only scientific inventory of the eight canonical PMs, their sixteen dedicated Stage 2A/2B reports, the earlier group report, and KC1 evidence review. This is not a new literature assessment or scientific admission. Governing files: `scientific-finding-schema.md` (Stage 2A), `dietary-input-traceability-contract.md` (Stage 2B), and `primary-mechanism-schema.md` (page contract).

All eight PMs have dedicated reports, principally dated 6 October 2026, and canonical Findings. This supersedes the assumption that most BRS3 PMs have never received 2A/2B. It does **not** establish that every current completion gate has been met. Phenome confidence was generally preserved rather than reassessed.

## Inventory

| PM | Dedicated 2A / 2B | Canonical evidence and lever result | Remaining review |
| --- | --- | --- | --- |
| FM1-PM1 NF-κB signalling | Both; 1 Finding | IKK activation; Mg biochemical catalytic participant; no admitted dietary/practice route | KC pending scope flag; assess whether material dietary regulation candidates were excluded using an unnecessarily narrow transcription-rate endpoint. No automatic admission. |
| FM1-PM2 Gut-derived inflammatory signalling | Both; 1 Finding | Withdrawn fibre/butyrate requirements: cited experiments were not fibre-to-endotoxin-translocation evidence | KC unresolved; reported inference requires endotoxin to limit GSH synthesis, which does not test the proposed precursor-supply direction. Reframe the actual proposition before retrieval. Missing Sekhar audit bibliography reference. |
| FM2-PM3 Nrf2-mediated cellular defence | Both; 2 Findings | Keap1 regulation; bounded sprout-homogenate practice; no required sulforaphane input; principal route 3.2 | Legacy vitamin-C non-application row cites a nonmember of the narrowed KC. Failure to demonstrate a constraint is not itself evidence of non-application. Review disposition and current scope. |
| FM2-PM4 ROS generation/clearance | Both; 4 Findings | Selenium/copper low-status repletion requirements; Zn/Mn/GSH biochemical participants | KC precursor supply versus constraint unresolved; Zn/Mn/iron dietary decisions need current capacity-threshold review; missing Sekhar audit reference. Diet-Dominant lacks a structured principal-route assessment. |
| FM2-PM5 Lipid peroxidation | Both; 2 Findings | Vitamin E chain-breaking requirement; high-dose outcome is a limitation | KC unresolved; check GSH-dependent lipid protection against PM scope without assuming vitamin E must be limited first. No new mapping authorised by this inventory. |
| FM2-PM6 Antioxidant recycling | Both; 1 Finding | Vitamin C reduces vitamin E radical; distinct from PM5 chain-breaking | KC unresolved; evaluate thiol-dependent regeneration and mission coverage before retaining a vitamin-pair-only boundary. |
| FM3-PM7 Cytokine network modulation | Both; 1 Finding | Corrected Ferguson cytokine null; no admitted lever | Previous report excludes stimulated-cell results as outside a circulating-network boundary; test that boundary against the mission. Separate negative trial from unresolved other contexts. KC candidate coverage not demonstrated by absent public mappings. |
| FM3-PM8 Eicosanoid/SPM balance | Both; 2 Findings | EPA/DHA provision; Barden measured increases in some mediators; no clinical-resolution inference | Structured dietary route selected; retain mediator-specific limitations. Audit whether eicosanoid as well as SPM coverage is sufficient for the title/mission. |

Report paths follow `system/brs3-fm[1–3]-pm[1–8]-stage2[a/b]-report.md`; exact PM/FM ownership is in the table. Earlier `brs3-fm1-fm3-stage2b-report.md` contains superseded fibre, vitamin-C KC and dominance descriptions. Use dedicated reports plus canonical records for current decisions; retain the older report as history, not a current completion certificate.

## Current-contract gaps

1. **KC identity migration precedes PM admission.** KC1 is now Glutathione Precursor Sufficiency; cysteine and glycine are admitted members. Its evidence review still calls the whole pool `BRS3(KC1)` an iKC. Current Stage 2B “Canonical iKC identity and PM-specific upstream supply” defines an iKC as an individually registered constituent, requires verified substance identity, and explicitly preserves older pool/arm IDs as legacy references. Current KC1 has not implemented that constituent-v2 registration. Reconcile existing records rather than inventing identities.
2. **Supply and constraint are different propositions.** That same clause states “Deficiency evidence and a demonstrated limiting effect are not mandatory” for Supported upstream supply. PM4's existing precursor-to-GSH-to-peroxidase chain is acknowledged but rejected as insufficient to establish a limiting effect. That may remain correct for Conditional constraint; it does not settle Supported upstream supply. Independently adjudicate each necessary edge and context. Do not inherit the pool to every PM.
3. **Capacity admissions must not require universal human supplementation trials.** Stage 2B §6.1 states “Absence of intervention or dose-response evidence must not remove a legitimate capacity Dietary Requirement.” PM4's zinc, manganese and iron exclusions cite missing human intake results. This is a threshold-review flag, not proof those inputs should be admitted; establish dietary supply, physiological role, compensation and bounded claim first.
4. **Absence is not non-application.** The applicability table distinguishes unresolved from evidence-supported non-application. PM3's rationale says the evidence does not show a constraint, while its disposition asserts non-application. Reconcile that mismatch without restoring vitamin C as a KC member.
5. **FM roll-up remains unfinished.** Existing global validation reports FM1 §4.3 cites KC1 absent from the child-PM union. Assess child relationships first, then qualify the FM summary. Do not turn supply into a proven constraint.

## Numbering and verification

The existing shared `src/plugin/pm-lever-layout/index.cjs` already renders groups in section 1 as 1.1 (and further promoted groups sequentially), with dietary children 1.1.1–1.1.3. Source labels and canonical record IDs may remain 3.1; those are transformed presentation inputs, not displayed numbering. No science or placement decision was changed.

Added an all-canonical-PM regression to `scripts/pm-lever-layout.test.mjs`: parse each actual MDX page, apply the actual shared transform, reject section-1 disclosure labels beginning 3.1, and verify front matter remains unchanged. **15/15 tests passed**, including existing stable-ID and all route-combination checks. Scanned the existing complete build: zero section-1 3.1 button/summary labels. Live localhost PM3 shows 1.1 System Optimisation Practices, while Dietary Requirements correctly remains 3.1 in section 3.

Existing global validation remains unclean: all eight BRS3 PMs have legacy section-title validator warnings; PM2/PM4 have missing Sekhar audit citations; FM1 has the KC-union warning. No global-clean claim is made. No new build was needed because renderer/page content was unchanged.

## Recommended sequence

Reconcile KC1 identity and definition first. Then review PMs in order, starting FM1-PM1/PM2, using the current admission threshold, explicit candidate questions and bounded retrieval. Prioritise FM2-PM4/PM6 upstream GSH supply and PM4 mineral capacity decisions. Finish FM summaries only after child adjudications. Preserve existing missions, ratings, canonical scientific decisions and unresolved statuses until each review is supported.
