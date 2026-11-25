# Canonical PM evidence tabs — approved template

Status: approved canonical template, 26 October 2026, following the real PM8 implementation and browser review. Apply during subsequent controlled Stage 2A/2B assessments and evidence-tab migrations. This contract update does not execute a bulk migration or authorise scientific reclassification, new admissions, deletion of other PM issues, or scoring changes.

**Owner correction — 27 October 2026:** Scientific Findings belong in Section 4. The current Summary and mechanism layout is specified in the PM1 reference below. Evidence & Audit must not duplicate the Finding disclosures. Apply this correction to PM8 using `scientific_findings_placement: section-4`; preserve other pages until their controlled migration. This overrides the earlier audit-only Finding placement, not the three-tab interface or scientific decisions.

Implementation marker: migrated pages use `evidence_tabs_version: 1` and `evidence_gaps_tab: true`. Unmigrated pages retain their current output until deliberately reconciled. Preserve concurrent work and record a before/after inventory for each migrated PM.

## Classification before presentation and SEC

Classify propositions before appraisal: a Scientific Principle is established foundational identity/reaction provenance; a Scientific Finding is an appraisable synthesis, including uncertain physiological regulation or preclinical research. An unscored or weak Finding does not become a Principle. Preserve canonical identities, source records and versioned SEC history. This presentation contract changes no scoring anchors or scientific admission.

## Three distinct tabs, in this order

1. **Evidence Gaps**: what available evidence establishes; the specific claim it cannot establish; the missing link; required evidence; and the affected PM operation, intervention or relationship. Reference canonical Findings and decisions rather than copying their source assessments. A completed non-admission is not an artificial active Open Issue.
2. **Open Issues**: material unresolved scientific, scope, classification, traceability or governance questions requiring investigation or a decision. Use the authoritative issue registry. Do not reopen resolved mission/classification decisions or auto-create issues from missing numerical SEC values.
3. **Evidence & Audit**: Scientific Principles, SEC appraisal, provenance, corrections and immutable historical decisions. Current SEC assessments remain available before any correction; this is not a second set of Scientific Finding disclosures. Principles display no active SEC status or factor fields. Existing assessment history stays accessible.

## Main page and rerun stability

Keep accepted mission, necessary mechanistic explanation, essential qualifications and admitted dietary/KC/SOP/lifestyle relationships on the main page. Display detailed evidence in the audit and link to its stable anchors. Lack of a dietary intervention is not a reason to remove valid mechanism explanation.

The `scientific_findings` array remains authoritative. For `scientific_findings_placement: section-4`, generate §4.1 from those records using the existing ScientificFinding renderer, including its source disclosures and unchanged SEC indicators. Write the visible §4 Summary as prose with inline citations where needed. Follow Summary → topic-based mechanism detail (including Boundaries and Integration) → §4.1. Place any existing Scientific Lessons between the Summary prose and the mechanism dropdown. Count active Findings dynamically. Do not duplicate these Finding disclosures in Evidence & Audit. Old `?review=1#pm*-f*` links resolve to the main-page Finding; `?review=1#scientific-findings` resolves to §4.1; SEC and Principle links still open the audit. Existing audit-only pages retain their behaviour until deliberately migrated.

`evidence_gaps` records contain stable IDs, title, `finding_ids`, `citation_keys`, `establishes`, `cannot_establish`, `missing_link`, `required_evidence`, `affected_relationship` and an optional authoritative `decision_ref`. They are presentation/adjudication links, not new source experiments or admissions. Existing completed decisions remain in `intervention_adjudications` and are selected, not copied.

Stage 2A inventories and classifies propositions and evidence destinations. Stage 2B separately adjudicates intervention gates and displays only accepted relationships. Neither stage may turn a gap into an admission, an issue into a Finding, or a Principle into a Finding to satisfy presentation. Do not remove accepted admissions because their detailed evidence is displayed in the audit. Preserve six atoms, Type A/B, Direct/Derived, KC membership and food mappings.

Future reruns must retain gap IDs, authoritative issue references, historical records and immutable SEC assessments; must reproduce the declared Finding placement without duplicating records across tabs; and must not duplicate the evidence dataset. Validate referential integrity and scientific-record preservation before output.

## Canonical disclosure style and record labels

### PM1 Section 4 reference layout — one dropdown per Finding

The owner-approved layout for new or explicitly revised pages is [BRS1-1-1 — Amino-Acid Availability & Prioritisation](https://thebraindiet.org/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation/), restored and verified locally on 20 November 2026. Use the local source as the current reference at `docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation.mdx` and the shared `src/components/ScientificFinding.tsx` renderer. Reuse its structure and interactions with each PM’s own science, Findings and scores. Apply during authoring or an explicitly scoped revision. Existing pages retain their layout until scheduled for revision.

1. **4. Mechanistic Basis**. Write the visible `### Summary` as short prose. Use inline source citations where needed and keep Finding indexes and navigation lists out of the Summary. Put the explanation under topic headings in one **[mechanism name] — mechanistic detail** dropdown, with **Boundaries of the mechanism** and integration inside. Close the dropdown before §4.1. Avoid repeating individual Finding summaries in the mechanism narrative.
2. **4.1 Scientific Findings (N)**: visible `#### Summary` from `scientific_findings_intro`, followed by **one separate, independently expandable dropdown for every active mechanism Finding**. These are sibling `ScientificFinding` components, not a single combined Findings dropdown and not children of the mechanistic-detail dropdown.
3. Each closed SF row shows **SF[number] — descriptive title**, a chevron, and the existing compact SEC indicator/status and Evidence & Audit link where applicable. Preserve canonical Finding IDs/anchors and assessed values; do not renumber IDs to close historical gaps.
4. Opening an SF exposes its own summary, **What this means**, applicable evidence confidence and nested **Explore the evidence** disclosure. The latter retains that Finding's statement, synthesis, limitations, considered studies and any existing individual-study assessment dropdowns. Do not replace this hierarchy with free-text evidence or a new Confidence/Evidence Level card.
5. Keep claim-local citations and preserve stable anchors used by existing lessons or deep links. Existing useful links to the mechanism may point to a thematic block. Reciprocal links and one heading per Finding are no longer required. Principles and full SEC audit/history stay in Evidence & Audit.

**Implementation:** use `scripts/sync-pm-scientific-findings.mjs` / `renderScientificFindingsSection` to emit one `<ScientificFinding>` per eligible canonical record. Use `brain-sf`, `brs-fm-hub-item`, `brs-fm-hub-shell`, `brs-fm-hub-summary` and `brs-fm-hub-panel` through the existing component and `src/css/custom.css`; do not hand-build a substitute. An audit link or a mechanism heading alone is not a Finding dropdown.

**Acceptance check:** verify the count of top-level SF dropdowns equals the active mechanism-Finding count; each can open and close independently; opening one does not expose the bodies of the others; the Summary is prose; Boundaries is inside the mechanism dropdown; §4.1 is outside it; nested evidence and study disclosures work; existing source, lesson and audit links resolve. Compare the actual canonical browser page against the PM1 reference, including a closed row and an expanded SF. Preserve legitimate differences in content and assessment status.

Reuse canonical `brs-fm-hub-item` / shell / summary / panel markup and the existing dropdown initializer. Do not substitute plain unstyled details, permanently expanded cards, or another tab framework. Each disclosure requires a stable record anchor, visible reader ID, keyboard-operable button, `aria-expanded` and button/panel ARIA linkage.

Use **Evidence Gap 1**, **Open Issue 1 — Under Investigation**, and the canonical Scientific Principle ID (for example PM8-SP1) in the summary. Preserve full canonical issue and gap IDs inside the expanded record. Local numbering does not rename authoritative records. Use **Open Issue**, not **Scientific question**, as the reader-facing record category. Display actual dispositions consistently; do not turn completed non-admissions into open issues.

Use the existing compact half-filled blue flask for Evidence Gaps. Preserve light/dark colours and responsive layout. Keep the compact evidence-confidence/SEC presentation and provenance where applicable; Principles have no active SEC readout. Do not render the empty “Evidence review status / Review status not recorded” block on migrated pages.

### SOP science and SEC in §4.1

Use BRS6-FM4-PM8 (Adipose Endocrine Regulation) as the presentation reference for SOP-associated Findings. Section 4.1 contains the scientific account of each SOP: the exact tested protocol, population and comparator where applicable, measured effects, PM relevance, limitations and sources. Show the canonical SEC score and status with the corresponding Finding disclosure, with a link to the full versioned assessment in Evidence & Audit. If a separate protocol-specific SEC record exists, expose it under §4.1 alongside the associated Finding and identify its owner. A Finding appraisal and a protocol appraisal can address different propositions. Preserve their separate identities, and show the recorded unscored or pending status when no score is available.

Use **SF[n]-SOP** for reader-facing protocol evidence titles, as in **SF2-SOP — Dietary Energy Restriction** and **SF5-SOP — Milled flaxseed and circulating adiponectin**. When several protocols share a Finding, give each a distinct SF-SOP display number and link each to its canonical supporting Finding. Leave the SOP suffix unnumbered. PM8 also uses **SF4-SOP — DHA formulations and circulating adiponectin** for a protocol Finding linked to a separately admitted Dietary Lever. Use explicit canonical Finding-to-record relationships for evidence links. Preserve stable Finding, intervention and assessment IDs. The display label itself confers no admission and carries no score across records.

List admitted practices in canonical §3.2. When the evidence independently clears the Dietary Requirement or Regulatory Modulator gate, the exact admitted input or exposure may appear in §3.1 with its own conditions and limitations. In both cases, keep the protocol science and its scoring under §4.1. Preserve existing admission decisions and apply the layout during authoring and controlled revisions.

## Three-tab visibility and empty states

Every PM uses the shared top-left **Back to PM** button while an evidence tab is open. Keep it outside the tablist, preserve its keyboard focus indicator and responsive wrapping, and return to the main PM heading while clearing evidence-tab query parameters and record anchors. Returning must preserve unrelated URL parameters and browser Back/Forward history. Do not require readers to discover that clicking the selected tab again closes it.

All migrated PMs retain the three tabs in canonical order, including an empty **Open Issues** tab. Empty tabs state that no records are currently recorded; do not hide the canonical tab, fabricate records, infer that an empty tab invalidates the mission, or fill it with historical/rejected material. Evidence Gaps and Open Issues are not interchangeable datasets.

The main page flows from intervention sections into Mechanistic Basis without an inserted Evidence Gaps body section. Scientific Findings remain in §4.1 on corrected pages; Scientific Principles and SEC history remain in Evidence & Audit, with concise claim-local links from necessary mechanism explanations. Do not create separate top-level tabs for Findings or Principles. Existing Scientific Hypotheses remain distinct and must not become admitted relationships through relocation.

## Controlled migration and validation

Before each migration inventory the mission, active/historical Findings, Principles, immutable SEC assessments, dietary/KC/SOP/lifestyle records, authoritative issues and completed decisions. Reconcile each record's role before relocation. Preserve accepted scientific decisions; presentation changes do not authorise admissions, withdrawals, new scores or retirement. A low SEC score is not itself a relocation rule. Do not reopen resolved scientific or ownership decisions.

Verify all three tab labels and order; honest empty states; source/Finding/Principle counts; canonical disclosure IDs; old deep links; exact-record expansion; Back/Forward; keyboard activation and focus; mobile wrapping; light/dark themes; and separation of main-page claims from evidence detail. Test the actual canonical localhost route, not only compilation or a simulation.

Run scientific-governance, source/reference, SEC-history and dietary-admission checks. Check food/KC/admission invariance, issue references, retained historical provenance and absent duplicate source records. Run Findings generation in dry-run mode to prove §4.1 stays fresh, lesson links and stable anchors survive and Findings are not removed or duplicated by tab migration. Report missing functionality or scientific decisions explicitly; do not claim rollout completion from instructions alone.

Stage 2A/2B reruns must preserve the approved tab layout, stable IDs, gap records, issue dispositions, completed decisions and immutable history. Explicit owner-approved deletions are exceptions to historical retention and must not be undone by restoring earlier snapshots. PM-specific policies apply only to that PM.

## PM8 issue removal — owner decision, 26 October 2026

PM8 uses `open_issues_policy: evidence-gaps-only`. Its former seven issue records are removed, including legacy and reassignment metadata. Do not restore them from historical snapshots or reruns, create replacement issues in another PM, or infer new issue admissions from retained evidence gaps. The unresolved scientific propositions remain in PM8-EG-1 and PM8-EG-2, linked to existing Findings. This does not change the mission, Principles, Findings, interventions, KCs or SEC assessments. A future Open Issue requires explicit owner approval to change this policy. Validators must reject issue creation while this policy is set. Do not render orphaned issue links or empty issue-history headings.

The canonical three-tab interface retains **Open Issues** even when its register is empty. Show an honest empty state, not fabricated records. Deleting issues must not remove the canonical tab.

## Evidence-gap granularity — PM4 clarification, 2 November 2026

Stage 2A: identify each independently answerable missing proposition. Trace popular numerical dietary targets to original study categories and search later interventions; distinguish observed associations, tested packages and demonstrated thresholds.

Stage 2B: use a separate stable gap ID for each independently resolvable proposition. One gap may reference multiple relevant Findings; do not require one-to-one cardinality. Explain each source's role and preserve contradictory results and appraisal limits. Splitting a gap does not admit an intervention or modify SEC history. Retain the existing ID for its narrowed question and create a new ID for the separated question.

Presentation: show `Related Scientific Findings` for Finding links and numbered source links from canonical citation keys. Do not label the first Finding as a decision record. Preserve actual completed-adjudication and Open Issue links. Reruns must preserve the separated questions rather than recombining them.

**Owner correction — 12 November 2026 (BRS6-FM2-PM4 and BRS6-FM4-PM8):** the §4 Summary is prose only, with no list of mechanism → SF hyperlinks, because the list repeats the headings in the mechanistic-detail dropdown and §4.1. Mechanism blocks keep their "Supporting evidence: SFn" links. The 20 November shared layout extends the prose Summary rule to new and explicitly revised pages. PM8 was added the same day on owner instruction after the urolithin A summary bullet repeated SF11 and SF12.

PM4 Section 4 restoration (2 November 2026): BRS5-FM2-PM4 uses `scientific_findings_placement: section-4`. This restoration used four Summary mappings and four sibling ScientificFinding disclosures. On controlled revision, apply the current PM1 reference and retain the four disclosures via the existing generator. Do not restore the audit-only Findings link or duplicate active Findings in Evidence & Audit. SEC assessment links and historical audit records remain in the audit.

## Assessment gaps in Evidence & Audit

Render Assessment gaps inside the affected versioned SEC assessment using canonical independently expandable disclosures with stable IDs. Show affected Finding, dimensions, source, reason, attempted verification, required action, disposition and history. Keep scientific Evidence Gaps in their existing tab, with optional explicit cross-links. Do not create another tab or automatically duplicate Assessment gaps into Open Issues. On the main Finding, display Pending appraisal for tracked incomplete work and Evidence Un-assessable for a documented unassessable determination. No numerical score is implied by either. See the [SEC completeness contract](sec-assessments/README.md#assessment-completeness--approved-extension-2-november-2026).

## Presentation correction — 2 November 2026

Do not generate or render dated “Stage 2A/2B evidence and traceability review” execution panels in canonical pages, including Evidence & Audit. Historical execution reports remain in their source/archive records; the legacy `Stage2Review` wrapper is non-rendering compatibility only. Use the governed Finding, Principle, assessment, correction and gap interfaces for scientific records. This removes no scientific evidence and does not remove the public Framework Review & Corrections register link.

## Reader-facing Finding numbers — owner correction 23 November 2026

Use the canonical Finding number in the visible SF label. For example, PM3-F8 appears as SF8 in §4.1, Evidence & Audit and Evidence Gap links. A move between sections or retirement can leave a gap in the visible sequence. Preserve canonical IDs, anchors, references and immutable assessment ownership. Existing protocol and explicitly approved association titles retain their separate conventions.

Use SF labels for readers and retain canonical IDs in structured records and anchor targets. Omit the separate canonical record ID row in Finding disclosures.

## PM1 controlled reference completion — 3 November 2026

Owner instruction: resolve PM1 issues starting with F3, complete SEC appraisal, apply PM8 tabs and approved six-atom presentation; no commit or push. Scope is BRS1-FM1-PM1, not framework-wide refactoring or certification of a finished Gold Standard.

PM1 is an authorised controlled migration, not a new tab design. Retain six active mechanism Findings, the reserved F4 history and two Principles. Intervention assessment disclosures use the existing SEC widget in Section 4; ownership links must resolve to the intervention, not a surrogate Finding ID. The widget default for existing Finding/history callers is unchanged. Remove the obsolete dated execution block; preserve its source history. Empty Open Issues is valid. Do not claim visual completion until the canonical local route has been inspected.


## PM1 Section 4 assessment-family grouping — approved 4 November 2026

Historical PM1-only grouping pilot. For current SOP evidence placement follow [SOP science and SEC in §4.1](pm-evidence-tabs-contract.md#sop-science-and-sec-in-41). The pilot kept the Section 4 summary visible and specified: group Scientific Findings first, SOP assessments second, and Lifestyle Lever assessments only when present. Each family starts collapsed and uses existing `brs-fm-hub` dropdown CSS and keyboard behaviour. Individual Findings/assessments retain their own disclosures; stable deep links must open all enclosing groups. Scores, assessment ownership, six atoms and admissions are unchanged. Do not display empty Lifestyle assessment groups.

Stage 2A preserves separate scientific and intervention propositions; grouping never implies inherited scores. Stage 2B renders the approved family order and preserves the `section4-findings:end` generated boundary so regeneration cannot discard following SOP assessments. `section4_assessment_groups: true` is enabled only on PM1 in this pilot; do not activate other PMs without rollout authorisation. This presentation approval is not scientific reassessment.

## PM8 association and Investigations pilot — owner-approved 15 November 2026

Scope: BRS6-FM4-PM8 only, opted in with `sf_association_pilot.version: 1`. This scoped amendment supersedes the separate Evidence Gaps/Open Issues presentation for this pilot, not other PMs. See [pilot implementation and validation](../review/pm8-association-pilot-2026-11-15/report.md).

Section 4 Scientific Findings remain the common evidence foundation. One immutable scientific record can inform multiple PM Scope, SOP, Lifestyle Lever, admitted Dietary Lever or Hypothesis relationships. `associations` reference existing Finding/atom/decision IDs and their support/limitation fields; reader labels never replace identifiers. Missing SOP atoms remain explicitly unresolved candidate-assessment identities. No new Intervention Evidence type, admission, SEC score, food edge or ranking is created.

Even an accepted SOP remains a practice/protocol. A Dietary Lever requires its own identified input/delivery relationship and admission. Pattern, fasting, supplement and food exposures cannot transfer efficacy or status to constituents or ordinary foods. Keep the five formal SOP categories unchanged. Lifestyle Levers remain recurring behaviours, called Lifestyle Priorities on BRS hubs.

`Investigations` replaces the competing evidence-gap/open-issue queues on PM8. It references existing questions, evidence and decisions, with `open` only where a recorded active next action exists; otherwise `awaiting-further-evidence`. Display both Open Investigations and Non-conclusive — awaiting further evidence. Each retains affected relationship, established evidence, missing link, rationale, next action, required evidence and SF/hypothesis links. An empty active group is not clearance. Completed non-admissions remain in history unless a specific unresolved question remains.

Decision conclusion, exact admission, review action and historical/superseded presentation are independent. Preserve original decision payloads; grouped historical records link to candidate-specific successors only with provenance. Accepted bounded relationships may coexist with stronger unestablished propositions. Hypotheses remain Unestablished and graph-isolated. QC remains suspended; archived inputs are untouched.

Validation: all pre-existing PM8 frontmatter fields must deep-equal the pre-pilot record; reference integrity, deterministic SF generation, non-pilot behavior and rendering require focused checks. Retain stable anchors and same-origin links. No bulk migration is authorised.

## PM8 accepted-output reconstruction — superseding owner decision, 15 November 2026

For PM8 only, the subsequent owner instruction supersedes the Investigations/history/hypothesis presentation and its pre-pilot whole-frontmatter invariance requirement above. Retain accepted dietary inputs, SOPs and Lifestyle Levers, their unchanged assessments, and Findings F13, F16, F17, F19, F20, F22 and F23. Retire other candidate records, investigations, evidence gaps and hypotheses from active frontmatter and rendered content into the non-published recovery archive. Association support and limitations remain; investigation/history arrays are optional when retired. This does not rescind qualified admissions or resolve the retired questions scientifically. QC remains suspended.

Maximum references: **30**, revised by the owner. Preserve original numeric reference anchors using explicit `[N]` prefixes where removing obsolete references creates gaps; never reassign a retired anchor to a different study. Unprefixed reference lists retain existing numbering. See the [reconstruction report](../review/pm8-accepted-reconstruction-2026-11-15/report.md) for current invariance checks and historical test limitations.

Subsequent PM8 owner instruction: renumber references consecutively from 1 in first appearance order. This supersedes the PM8 stable numeric numbering requirement above; preserve canonical bibliography keys and the archived old-to-new numeric mapping. Restore the agreed SF association display labels without restoring retired hypothesis records.

**Section 4 migration — 20 November 2026.** The owner requested migration of the remaining 26 audit-only PMs. Headline mechanistic Findings now render as independent disclosures in §4.1. Phenome-specific Findings and interpretive constraints retain their existing Evidence & Audit access and do not duplicate the mechanistic Findings. Existing Scientific Principles, hypotheses, assessment pointers and historical evidence remain available in their established locations.
