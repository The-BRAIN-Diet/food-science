# Canonical PM evidence tabs — approved template

Status: approved canonical template, 26 October 2026, following the real PM8 implementation and browser review. Apply during subsequent controlled Stage 2A/2B assessments and evidence-tab migrations. This contract update does not execute a bulk migration or authorise scientific reclassification, new admissions, deletion of other PM issues, or scoring changes.

**Owner correction — 27 October 2026:** Scientific Findings belong in Section 4, mapped from its Summary to the corresponding mechanistic explanations. Evidence & Audit must not duplicate the Finding disclosures. Apply this correction to PM8 using `scientific_findings_placement: section-4`; preserve other pages until their controlled migration. This overrides the earlier audit-only Finding placement, not the three-tab interface or scientific decisions.

Implementation marker: migrated pages use `evidence_tabs_version: 1` and `evidence_gaps_tab: true`. Unmigrated pages retain their current output until deliberately reconciled. Preserve concurrent work and record a before/after inventory for each migrated PM.

## Classification before presentation and SEC

Classify propositions before appraisal: a Scientific Principle is established foundational identity/reaction provenance; a Scientific Finding is an appraisable synthesis, including uncertain physiological regulation or preclinical research. An unscored or weak Finding does not become a Principle. Preserve canonical identities, source records and versioned SEC history. This presentation contract changes no scoring anchors or scientific admission.

## Three distinct tabs, in this order

1. **Evidence Gaps**: what available evidence establishes; the specific claim it cannot establish; the missing link; required evidence; and the affected PM operation, intervention or relationship. Reference canonical Findings and decisions rather than copying their source assessments. A completed non-admission is not an artificial active Open Issue.
2. **Open Issues**: material unresolved scientific, scope, classification, traceability or governance questions requiring investigation or a decision. Use the authoritative issue registry. Do not reopen resolved mission/classification decisions or auto-create issues from missing numerical SEC values.
3. **Evidence & Audit**: Scientific Principles, SEC appraisal, provenance, corrections and immutable historical decisions. Current SEC assessments remain available before any correction; this is not a second set of Scientific Finding disclosures. Principles display no active SEC status or factor fields. Existing assessment history stays accessible.

## Main page and rerun stability

Keep accepted mission, necessary mechanistic explanation, essential qualifications and admitted dietary/KC/SOP/lifestyle relationships on the main page. Display detailed evidence in the audit and link to its stable anchors. Lack of a dietary intervention is not a reason to remove valid mechanism explanation.

The `scientific_findings` array remains authoritative. For `scientific_findings_placement: section-4`, generate §4.1 from those records using the existing ScientificFinding renderer, including its source disclosures and unchanged SEC indicators. The visible §4 Summary links each Finding to its corresponding mechanism block; those blocks link to the Findings and each Finding links back. Follow Summary → primary mechanism → boundaries → integration, with the mechanism detail in the canonical dropdown and §4.1 outside it. Count active Findings dynamically. Do not duplicate these Finding disclosures in Evidence & Audit. Old `?review=1#pm*-f*` links resolve to the main-page Finding; `?review=1#scientific-findings` resolves to §4.1; SEC and Principle links still open the audit. Existing audit-only pages retain their behaviour until deliberately migrated.

`evidence_gaps` records contain stable IDs, title, `finding_ids`, `citation_keys`, `establishes`, `cannot_establish`, `missing_link`, `required_evidence`, `affected_relationship` and an optional authoritative `decision_ref`. They are presentation/adjudication links, not new source experiments or admissions. Existing completed decisions remain in `intervention_adjudications` and are selected, not copied.

Stage 2A inventories and classifies propositions and evidence destinations. Stage 2B separately adjudicates intervention gates and displays only accepted relationships. Neither stage may turn a gap into an admission, an issue into a Finding, or a Principle into a Finding to satisfy presentation. Do not remove accepted admissions because their detailed evidence is displayed in the audit. Preserve six atoms, Type A/B, Direct/Derived, KC membership and food mappings.

Future reruns must retain gap IDs, authoritative issue references, historical records and immutable SEC assessments; must reproduce the declared Finding placement without duplicating records across tabs; and must not duplicate the evidence dataset. Validate referential integrity and scientific-record preservation before output.

## Canonical disclosure style and record labels

### PM1 Section 4 reference layout — one dropdown per Finding

The owner-approved visual reference is [BRS1-1-1 — Amino-Acid Availability & Prioritisation](https://thebraindiet.org/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation/), verified on 27 October 2026. Reuse its local canonical source at `docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation.mdx` and the shared `src/components/ScientificFinding.tsx` renderer. Match the structure and interactions, not PM1's scientific text, number of Findings or scores.

1. **4. Mechanistic Basis + Scientific Findings (SFs N)**: visible `### Summary`, followed by one canonical **[mechanism name] — mechanistic detail** dropdown. It holds the explanation, Finding-linked mechanism headings, boundaries and integration. It ends before §4.1.
2. **4.1 Scientific Findings (N)**: visible `#### Summary` from `scientific_findings_intro`, followed by **one separate, independently expandable dropdown for every active mechanism Finding**. These are sibling `ScientificFinding` components, not a single combined Findings dropdown and not children of the mechanistic-detail dropdown.
3. Each closed SF row shows **SF[number] — descriptive title**, a chevron, and the existing compact SEC indicator/status and Evidence & Audit link where applicable. Preserve canonical Finding IDs/anchors and assessed values; do not renumber IDs to close historical gaps.
4. Opening an SF exposes its own summary, **What this means**, applicable evidence confidence and nested **Explore the evidence** disclosure. The latter retains that Finding's statement, synthesis, limitations, considered studies and any existing individual-study assessment dropdowns. Do not replace this hierarchy with free-text evidence or a new Confidence/Evidence Level card.
5. Retain the reciprocal **Mechanistic explanation: [Finding title]** link beneath each SF, and source/Finding links from its mechanism explanation. Principles and full SEC audit/history stay in Evidence & Audit; do not duplicate the SF disclosures there.

**Implementation:** use `scripts/sync-pm-scientific-findings.mjs` / `renderScientificFindingsSection` to emit one `<ScientificFinding>` per eligible canonical record. Use `brain-sf`, `brs-fm-hub-item`, `brs-fm-hub-shell`, `brs-fm-hub-summary` and `brs-fm-hub-panel` through the existing component and `src/css/custom.css`; do not hand-build a substitute. An audit link or a mechanism heading alone is not a Finding dropdown.

**Acceptance check:** verify the count of top-level SF dropdowns equals the active mechanism-Finding count; each can open and close independently; opening one does not expose the bodies of the others; §4.1 is outside the mechanism dropdown; nested evidence and study disclosures work; source, mechanism and audit links resolve. Compare the actual canonical browser page against the PM1 reference, including a closed row and an expanded SF. Preserve legitimate differences in content and assessment status.

Reuse canonical `brs-fm-hub-item` / shell / summary / panel markup and the existing dropdown initializer. Do not substitute plain unstyled details, permanently expanded cards, or another tab framework. Each disclosure requires a stable record anchor, visible reader ID, keyboard-operable button, `aria-expanded` and button/panel ARIA linkage.

Use **Evidence Gap 1**, **Open Issue 1 — Under Investigation**, and the canonical Scientific Principle ID (for example PM8-SP1) in the summary. Preserve full canonical issue and gap IDs inside the expanded record. Local numbering does not rename authoritative records. Use **Open Issue**, not **Scientific question**, as the reader-facing record category. Display actual dispositions consistently; do not turn completed non-admissions into open issues.

Use the existing compact half-filled blue flask for Evidence Gaps. Preserve light/dark colours and responsive layout. Keep the compact evidence-confidence/SEC presentation and provenance where applicable; Principles have no active SEC readout. Do not render the empty “Evidence review status / Review status not recorded” block on migrated pages.

## Three-tab visibility and empty states

Every PM uses the shared top-left **Back to PM** button while an evidence tab is open. Keep it outside the tablist, preserve its keyboard focus indicator and responsive wrapping, and return to the main PM heading while clearing evidence-tab query parameters and record anchors. Returning must preserve unrelated URL parameters and browser Back/Forward history. Do not require readers to discover that clicking the selected tab again closes it.

All migrated PMs retain the three tabs in canonical order, including an empty **Open Issues** tab. Empty tabs state that no records are currently recorded; do not hide the canonical tab, fabricate records, infer that an empty tab invalidates the mission, or fill it with historical/rejected material. Evidence Gaps and Open Issues are not interchangeable datasets.

The main page flows from intervention sections into Mechanistic Basis without an inserted Evidence Gaps body section. Scientific Findings remain in §4.1 on corrected pages; Scientific Principles and SEC history remain in Evidence & Audit, with concise claim-local links from necessary mechanism explanations. Do not create separate top-level tabs for Findings or Principles. Existing Scientific Hypotheses remain distinct and must not become admitted relationships through relocation.

## Controlled migration and validation

Before each migration inventory the mission, active/historical Findings, Principles, immutable SEC assessments, dietary/KC/SOP/lifestyle records, authoritative issues and completed decisions. Reconcile each record's role before relocation. Preserve accepted scientific decisions; presentation changes do not authorise admissions, withdrawals, new scores or retirement. A low SEC score is not itself a relocation rule. Do not reopen resolved scientific or ownership decisions.

Verify all three tab labels and order; honest empty states; source/Finding/Principle counts; canonical disclosure IDs; old deep links; exact-record expansion; Back/Forward; keyboard activation and focus; mobile wrapping; light/dark themes; and separation of main-page claims from evidence detail. Test the actual canonical localhost route, not only compilation or a simulation.

Run scientific-governance, source/reference, SEC-history and dietary-admission checks. Check food/KC/admission invariance, issue references, retained historical provenance and absent duplicate source records. Run Findings generation in dry-run mode to prove §4.1 stays fresh, reciprocal links survive and Findings are not removed or duplicated by tab migration. Report missing functionality or scientific decisions explicitly; do not claim rollout completion from instructions alone.

Stage 2A/2B reruns must preserve the approved tab layout, stable IDs, gap records, issue dispositions, completed decisions and immutable history. Explicit owner-approved deletions are exceptions to historical retention and must not be undone by restoring earlier snapshots. PM-specific policies apply only to that PM.

## PM8 issue removal — owner decision, 26 October 2026

PM8 uses `open_issues_policy: evidence-gaps-only`. Its former seven issue records are removed, including legacy and reassignment metadata. Do not restore them from historical snapshots or reruns, create replacement issues in another PM, or infer new issue admissions from retained evidence gaps. The unresolved scientific propositions remain in PM8-EG-1 and PM8-EG-2, linked to existing Findings. This does not change the mission, Principles, Findings, interventions, KCs or SEC assessments. A future Open Issue requires explicit owner approval to change this policy. Validators must reject issue creation while this policy is set. Do not render orphaned issue links or empty issue-history headings.

The canonical three-tab interface retains **Open Issues** even when its register is empty. Show an honest empty state, not fabricated records. Deleting issues must not remove the canonical tab.
