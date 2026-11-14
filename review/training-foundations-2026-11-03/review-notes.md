# Foundational training drafts review notes

Date: 3 November 2026.

## Training lesson drafts

- [What Can We Really Prove About Nutrition and the Brain?](what-can-we-really-prove-about-nutrition-and-the-brain.md)
- [From Food to Brain: Following a Nutrient](from-food-to-brain-following-a-nutrient.md)
- [Why One Nutrient Can Influence Several Biological Systems](why-one-nutrient-can-influence-several-biological-systems.md)

Each lesson links back to its relevant scientific questions below.

## Location and publication status

The three lesson files in this folder are unpublished review artifacts. They use the existing local training module's conventions: front matter with list image, status/audience/purpose, learning outcomes, numbered explanations, canonical-page guided reading, knowledge checks with answers, applied exercise and core principle. No dedicated lesson template was found in this checkout.

The intended training destination is the repository's local-only `docs/training/` architecture, not Dietary Foundations or a new public course section. The files remain outside `docs/` because the presentation gate covers that directory even for ignored local training. No routes, navigation, categories, tags, public components, contracts, baselines or approvals were changed. `draft: true` records intent but is not the sole publication safeguard: the review directory is outside the documentation source. No files were installed in `docs/training/`.

The structural reference was the older local-only module at `/Users/paulhouston/Documents/Codex/2026-10-14/what-x20/work/repo/docs/training/from-primary-mechanisms-to-brs-dietary-guidance.md`. Its content was not imported or treated as current scientific authority. Published Dietary Foundations pages were inspected as background conventions; they are not a dedicated training course or lesson template.

## Original verified starting state

Repository/worktree: `/Users/paulhouston/Documents/Codex/2026-10-22/we-x20/work/brain-diet-v1-quantitative`.

Branch: `review/brs5-pm4-sec-assessment`; HEAD `510da22015af4ab5aa0c4dbd84e48fb0b31b43f8`. Initially clean, with no tracked modifications or ordinary untracked files. HEAD matched cached `github/review/brs5-pm4-sec-assessment` (zero ahead/behind). HEAD was two commits ahead of cached `github/main`; no fetch or live merge-status claim was made. The remote named `github` is The-BRAIN-Diet/food-science; `origin` points to a local checkout.

The worktree inventory includes other branches; their changes were not assumed present. The cached local branches not merged into HEAD included `codex/brs6-fm4-endocrine-review` and `review/brain-diet-v1-rollup`. No `PROJECT-CONTEXT.md` or `CURRENT-HANDOFF.md` was found in the target checkout. The relevant current handoff is `review/sequential-pm-interventions-2026-11-02/CURSOR-HANDOFF.md`.

That handoff identifies an incomplete checkpoint, current SOP/Lifestyle queue position BRS2-FM1-PM3, remaining BRS1 retrieval/adjudication work, and provisional/pending intervention assessments. These drafts do not claim completion of that work.

## Authority and history consulted

Read root `AGENTS.md`, `INTERNAL-DOCS.md`, `.cursor/rules/training-pm-to-brs-rollup.mdc` and `system/training-pm-to-brs-dietary-guidance.md` for authoring and local training boundaries.

Scientific and intervention authority: `system/scientific-finding-schema.md` (Stage 2A), `system/dietary-input-traceability-contract.md` (Stage 2B), `system/dietary-input-governance-v2.md`, `system/scientific-hypotheses-schema.md`, `system/primary-mechanism-schema.md`, `system/brain-diet-ontology-rules.md`, and `system/cross-brs-dependency-page-schema.md`. Consulted the intervention mechanism-of-action validator's separation of measured effect and PM relevance.

Presentation authority: `system/presentation-change-control.md` and `system/pm-evidence-tabs-contract.md`. Neither related scientific approval nor drafting permission was used to create public presentation approval.

Compared the current LAT1, DHA and GABA PM sources with their Stage 2A/2B reports, `review/pm2-reassessment/manifest.json`, and the current sequential-intervention manifest/handoff. Inspected recent implementation commits `60601dbe`, `f75238dd` and `510da220`. Earlier DHA reports describe fewer Findings and older KC decisions; current PM7 records contain later human tracer and upstream-supply assessments. Those reports are historical snapshots, not overrides of current records.

Primary-source spot checks: Wurtman 2003 PubMed abstract, Umhau 2009 full text and Field 2022 full text. These checks informed wording; they were not a new Stage 2A/2B assessment, exhaustive search or canonical admission. No new bibliography entries or evidence records were created.

## Scientific questions requiring review

### B6 activation and legacy wording

The substance page contains broad claims about B6 in homocysteine remethylation and magnesium-supported activation. Current governance distinguishes form-specific PDXK/PNPO routes, and current PM9 evidence restricts in-vitro metal findings from dietary mineral recommendations. Review those legacy statements separately; the lessons neither repeat their broad claims nor repair the source pages.
### PLP supply metadata

Current PM9 records mark the direct PLP supply entry unset with `section-supply-contradiction`, while retaining the accepted dietary B6 precursor relationship. The lessons teach precursor versus active form without resolving that canonical conflict.
### GAD reserve capacity

PM9-F1 qualifies independent replication of the occupancy finding and its human physiological relevance. The older Overview report's reserve-capacity wording should not be presented as established human dietary responsiveness. The lessons use the reaction dependency and leave the reserve mechanism qualified.
### LAT1 translation

Ordinary-meal plasma-ratio results do not establish human brain transport flux, monoamine synthesis or improved attention. The checkpoint explicitly says the discussion did not authorise a high-protein-breakfast attention claim. No such claim is made.
### DHA exposure and cross-system supply

Human incorporation estimates, animal delivery-form experiments and conditional upstream methyl-resource evidence answer different questions. Adult human dietary response magnitude, mediation and clinical benefit remain distinct unresolved translation questions; no new choline-plus-DHA recommendation is made.
### B6 behavioural interpretation

PM9-F6 preserves a positive visual endpoint, an inconclusive anxiety comparison against placebo and unmeasured GABA synthesis. The drafts retain this separation rather than adopting the paper title as an efficacy conclusion.
### Synergy terminology

The combined-exposure example is hypothetical teaching material. It introduces no named nutrient synergy, universal additive model, threshold, scoring rule or admission. Any future claim needs the exact exposure, comparators, endpoint, outcome scale and assessed interaction.

## Original verification

`npm run presentation:check` passed: 691 protected files, no unapproved structural changes. `git diff --check` passed for tracked files. Checked the three new drafts separately for trailing whitespace, draft/list-image metadata, internal document targets and bibliography keys. All three lessons passed MDX syntax compilation. No components or JSX were introduced.

Only this new review folder was added in the repository. Existing tracked files, scientific records, SEC history, admissions and presentation contracts were unchanged. No commit, merge, deployment, build, preview restart or publication was performed. These artifacts have not been installed or visually verified as routed training pages; publication and route installation remain outside this task.

## Link update verification

Added links to all three lesson drafts and reciprocal links from each lesson to the relevant scientific question headings. Local file targets and heading anchors were checked. Output copies contain the same links. Concurrent changes elsewhere in the worktree were preserved; the original orientation and verification above describe the initial drafting checkpoint.

## Website link verification

All website-relative links in the three lessons were replaced with full HTTPS URLs. BRAIN Diet pages returned HTTP 200 with the expected page titles; the Liu citation uses the final lowercase reference-page URL and its confirmed `liu_higher_2014` anchor. The two PMC pages presented a browser challenge during this check, so lesson links now use the verified PubMed records for the same Umhau and Field studies. This changes navigation only, not the sources assessed or scientific wording.

Links between these four local files remain relative. All local destinations and review-question heading anchors were checked in both the repository folder and synchronized output folder.
