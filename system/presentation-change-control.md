# Mandatory presentation change control

Author instruction: 2 November 2026, “Emergency Presentation Regression Repair and Mandatory Change Control”.

No agent, generator or renderer may introduce a new reader-facing section, panel, tab, dropdown, table, card, heading or substantive content block without an updated authoritative presentation contract AND explicit prior author approval. Silence, related data approval and general implementation permission are not approval. Scientific data may be stored and validated without being displayed.

Before implementation, record: **Change, Purpose, Placement, Source, Scope (page types and counts), Duplication, Example (representative rendering), Governance, Approval**. A proposed rendered example may be made in a review artifact, not silently installed on canonical pages. Preserve the author's actual approval and its source; agents must never invent or self-grant approval.

Typographical, citation and existing-content repairs remain allowed. They must not indirectly introduce new information architecture. The conservative gate can flag legitimate rendering fixes: record the existing author authorisation and bounded repair rationale rather than bypassing the gate.

## Technical gate

**Owner instruction — 12 November 2026:** turn the presentation gate off. `npm run presentation:check` stays in the prebuild command and exits successfully without comparing hashes. Do not switch that check back on, regenerate the baseline, or invent an approval to recreate the failure. Dietary-input governance and SEC checks remain in the build.

`system/presentation-contract-baseline.json` still freezes existing renderer/theme/plugin/CSS/template code and document structure (headings, markup, tables and internal record IDs). It is no longer a build failure. `system/presentation-change-approvals.json` remains the record of earlier approvals.

The emergency baseline captures current presentation after panel withdrawal; it is a containment baseline, NOT retrospective author approval of every legacy page. Do not regenerate it to make a test pass. Baseline and approval changes require author review. No automatic approve or baseline-update command is supplied.

This is a conservative source-level gate, not proof of human consent or exhaustive runtime coverage. Arbitrary changes to data-dependent text, code outside protected directories or deliberate edits to the gate itself require code review and representative browser checks. Future CI/repository enforcement must keep this gate mandatory and protect baseline/approval edits; local code cannot authenticate the author. Do not claim branch protection has been configured.

## Emergency withdrawal

Both Dietary pathways technical panel types are withdrawn on ALL pages by explicit author instruction. Remove the global injection and retain the legacy component as a no-output compatibility adapter. Preserve ontology, source provenance, admissions, authored prose and existing section hierarchy. No replacement panel is authorised. Embedded butyrate output is covered by the explicit instruction to remove the panel everywhere; its surrounding authored explanation remains.

## Authorised nested pathway-disclosure removal — 3 November 2026

Owner instruction: “Delete Unauthorised Dietary Pathway Disclosure.” Remove the generated `Dietary pathway evidence` / `.pm-input-pathway-evidence` block from all PM six-atom disclosures, including PM9 vitamin B6. Remove its exclusive renderer argument and ontology-projection subscription. This is a shared presentation removal only: keep pathway records, six atoms, Dietary Confidence, ontology links and approved food sources unchanged. No replacement is authorised. Representative expected result: PM9 vitamin B6 opens its existing six atoms and food disclosures without a nested pathway-evidence heading. The presentation baseline is not regenerated.


## Canonical scientific projections — approved 10 November 2026

Apply [Canonical scientific truth and presentation consistency](canonical-scientific-projections.md), including its five scientific, automated, release and publication checkpoints. Current mission comes from PM frontmatter; explanatory prose must not strengthen the canonical science. Preserve authoritative admissions, limitations and SEC history. Report conflicts with provenance instead of selecting the newest text.

## Author-reviewed local release candidate — 11 November 2026

Author instruction: “Yes, approve all four presentation changes as reviewed” with the NutritionTable proviso. Approval is presentation only.

- NutritionTable: in the existing summary, highlight vitamins and minerals meeting 10% RI. For complete records (currently pears), a collapsed **Full vitamins and minerals** disclosure includes all public quantified panel observations, including small positives and those without an RI. Keep preparation, basis, sources and measurement status. Repeated highlight amounts in the full table are the same observations, not new evidence. Example: pear copper remains quantified even below the highlight threshold.
- SubstanceFoods: below direct sources on the FOS/GOS substance page, show constituent food pathways, not foods containing the combined preparation. Example: garlic supplies documented fructans, not the tested mixture.
- Mature soybeans: retain /soy/, with boiled unsalted beans as default, raw beans and defatted flour in separately labelled panels. No transfer of flour or raw concentrations to cooked beans.
- Acetic acid: retain qualified food and trial context, cider vinegar presence only and vinegar-pickle brine only; no pickle concentration, isolated-acid effect or new admission.

No ranking, food-composition, scientific-admission or release authorisation is conferred.

## PM food-source dropdown repair — 11 November 2026

Author instruction: restore `Plant-based -` and `Animal-based -`, then “we don't need this unranked heading, remove it from the template.” The shared dropdown does not prefix categories with `Ranked sources ·` and does not render `Documented, unranked sources`. The category column grid applies only to a summary that contains the category label, so an empty ranked row stays on the available line. Representative page: BRS1-FM5-PM12. No ranking, food-record or admission change.

Author instruction, 12 November 2026: `edible portion` is not a public basis label, and `Measurement provenance` is not shown on any PM. Preparations such as `cooked` stay. Stored analytical bases are unchanged.


## Temporary public review-history disclosure — approved 14 November 2026

Author: “Yes, approve the temporary public-QC disclosure. Implement it, test and refresh the PR #244 preview. Preserve the archived issues and keep QC suspended; do not mark them closed. No merge or production deployment.”

- Change/purpose: disclose incomplete review metadata instead of implying an empty register establishes clearance.
- Placement/scope: existing shared Review & Corrections panel on every page where opened, the PM Evidence & Audit panel’s existing Correction status area, and the existing Framework Review & Corrections register where available. The nested PM review records do not repeat the outer notice. No new tab or scientific section. One notice per surface, no duplicated scientific content.
- Exact example: “Public review-history reconciliation is incomplete. Missing review entries do not indicate scientific clearance or resolution of previously recorded issues.” Missing page metadata reads “Review history unavailable / incomplete”; an empty register reports available entries with an explicit incomplete-history qualification rather than “0 issues”.
- Source: the archived issue register and page-review state remain inactive; the temporary presentation flag is not a scientific status or issue resolution. Existing available corrections remain displayed with their original statuses.
- Governance: preserve the archived records, unresolved public-QC test expectation, current suspension and all admission/SEC/ranking decisions. Do not activate archived inputs or remove this disclosure automatically on file discovery. Removal requires separately validated public-history reconciliation.
- This is a shared review-status presentation exception only. Stage 2A/2B scientific contracts, PM schema, missions and evidence templates remain unchanged. See [Framework QC contract](framework-qc-schema.md) and the [recovery action register](../review/recovery-readiness-2026-11-14/ACTION-REGISTER.md).


## Therapeutic-area section withdrawal — approved 15 November 2026

Author instruction: “at some point https://thebraindiet.org/docs/therapeutic-areas/ went live again; it was taken down; please unpublish all links under therapeutic-areas”.

Withdraw the complete `/docs/therapeutic-areas/` section, including its index and every descendant, from public publication, navigation, generated listings and sitemap. Existing requests return404; do not redirect them to substitute clinical claims. The previous two-document exclusion was insufficient. Scope: all ten current canonical documents in that directory, plus future descendants; eight were still eligible for public loading under the previous rule.

Preserve canonical files, scientific relationships and evidence. Explicit local development (`INCLUDE_INTERNAL_DOCS=true` outside production) may still load these records. That flag must not republish the section in a production build. No new UI sections, PM/food scientific edits, ranking changes, QC reactivation or issue closure are authorised. Condition-specific research on other canonical substance/PM pages is outside this route withdrawal and remains unchanged.

## Phenome Registry — approved presentation, 15 November 2026

Restore the author's introduction and ADHD/anxiety/depression overlap table. State 15 active phenomes from 18 defined, with PH007, PH012 and PH013 retained as retired historical records. Remove the Therapeutic Areas catalogue and the entire condition-based filter. Suppress TA005 in registry/detail badges without deleting canonical associations. Preserve scientific relationships, evidence scores, detail pages and existing QC suspension. Local-only recovery; no publication authorised.

## Neuroeshot ingredient evidence matrix — approved 15 November 2026

Owner's “Neuroeshot BRS Evidence Matrix” EXEC authorises one recipe page only: `docs/recipes/Snacks/neuroeshot.md`. Immediately after Nutrition, use the existing responsive Markdown table with exactly Food, Substance, BRS–PM, Biological effect, Source evidence, Limitation. Ten separate substance rows are grouped by ingredient; canonical PM links require existing admission, otherwise mark research context. Composition and primary biological evidence remain distinct, with one general recipe-efficacy note. The same EXEC approves the 15 g roe / 7.5 ml juice / 2 ml sauce formulation and a bounded historical sensory-neuroscience paragraph. Preserve RecipeNutrition, RecipeFoods, image and description. No new components, global template rollout, PM schema/admission/SEC changes or ranking changes. Review locally before publication. The rendered recipe is the representative example; the original EXEC is the approval provenance, not a new gate exemption.

### Neuroeshot column refinement — approved 15 November 2026

Author requested moving constituent weights out of Biological effect into the substance column and separating function from study observations. On this recipe only, the second heading is now `Substance / Amount`; use ingredient-serving amounts in mg/µg and explicitly state when not established. Biological effect contains bounded function/mechanism wording; experimental population and results belong to Source evidence and Limitation. DHA remains 300 mg (the author's illustrative 300 g is not a source-value change). No changes to PM templates or scientific admissions.

### Neuroeshot serving relevance — owner-approved bounded demonstration

15 November 2026: the owner authorises serving relevance only in this ingredient evidence matrix. Retain exactly Food | Substance | BRS–PM | Biological effect | Source evidence | Limitation. Put serving amount and concise contribution interpretation in Substance. Use individually justified nutritional references; distinguish experimental sensory action from unverified serving response. No universal threshold, shared engine, new ontology fields, scores or global recipe rollout. The recipe-matrix schema proposal remains a proposal; its materiality screening language is not activated. Existing vitamin reference conventions are retained; EFSA's combined EPA+DHA AI is explicitly a separate, named contextual benchmark. This supersedes the prior Substance / Amount header for this page only. PM schemas, admissions, confidence, SEC and ranking contracts remain unchanged.

### Compact Neuroeshot disclosures — owner approved

15 November 2026: shorten the matrix for paper use and split its ten rows between native details/summary dropdowns titled `1. Significant BRS Contributions` (DHA, EPA, B12) and `2. Insignificant BRS Contributions` (the other seven). Both retain the six approved columns, quantities, contribution distinctions, all evidence URLs and key limitations. A visible qualification makes clear that significant concerns nutritional supply, not demonstrated/statistically significant BRS effects, and insignificant includes unestablished exposure rather than proving biological irrelevance. Capsaicin remains sensory, PM-unassigned. Recipe-only presentation; no component/schema engine, scientific record or ranking changes.
