# Circadian PM3 identity and contextual-source investigation

Local review, 10 November 2026. Branch audit/dietary-connectivity-2026-11-09, HEAD af13bec1. No new admissions, identities, food edges, SEC changes or publication. Existing uncommitted work preserved.

## Implemented author instruction

Mission in the canonical PM frontmatter, visible Mission paragraph and local Explorer PM metadata:

Support the body's capacity to synthesise melatonin from serotonin through the availability of essential precursors and the activity of its biosynthetic enzymes.

The existing assessment's historical operation text and evidence boundaries remain intact. The summary and Principle still distinguish formation from secretion, receptor action, sleep and ADHD outcomes. A mission edit does not reapprove the unresolved assessment.

## Identity proposals (not implemented)

Registry/substance-file inspection finds none of these three canonical identities. Proposed standalone records using the existing bioactive-compounds directory and substance-page schema:

| ID | Proposed documentation | Scope |
|---|---|---|
| serotonin | docs/substances/bioactive-compounds/serotonin.md | Serotonin; proposed alias 5-hydroxytryptamine / 5-HT; distinguish endogenous formation from any separately verified food occurrence |
| n-acetylserotonin | docs/substances/bioactive-compounds/n-acetylserotonin.md | Exact acetylated intermediate; do not collapse into serotonin or melatonin |
| melatonin | docs/substances/bioactive-compounds/melatonin.md | Exact product; formation, circulating secretion and receptor-mediated effects remain separate |

No new category or schema is necessary for standalone substances. Verify exact chemical identifiers, aliases and image metadata against the original biochemical/chemical sources before registration; no chemical identifier has been guessed here. Existing PM3-SP1 already cites human AANAT Q16613, Rhea 25217, human ASMT P46597 and the corresponding reaction evidence. These support the terminal reaction documentation, not a dietary benefit claim.

The shared-documentation rule in system/substance-page-schema.md covers nutrient forms, studied preparations, defined mixtures and strains. It does not establish that a downstream metabolite is a child form of its precursor. Do not put these three under tryptophan via parent_substance_id, or assume food/evidence inheritance. Sharing a pathway page would require a separately approved extension; standalone records avoid that.

## Conversion work still required

system/dietary-input-governance-v2.md requires active_target_id plus an ordered conversion_pathway, with dependencies, evidence and limitations per step. Registering names alone will not complete it. Proposed endpoint is melatonin; document tryptophan through its hydroxylated intermediate to serotonin, then N-acetylserotonin and melatonin. Check the saved BRS1 pathway evidence for upstream steps before constructing an assessment. The contract permits versioned external chemical identities for route-local intermediates, so no automatic requirement to create another page merely for an intermediate. Preserve acetyl-CoA/SAM reaction context without admitting new dietary inputs.

PM3-DIT-1 records functional_dependency and dietary_supply as established, but overall status unresolved and Dietary input Unset. The 1993 depletion Finding supports a restriction-related constraint; it does not demonstrate extra-intake benefit. Any admission disposition must be reviewed separately after pathway reconciliation, using the existing gate rather than demanding clinical benefit or treating registration as admission.

## Contextual food sources

Existing brs-x source records contain tryptophan observations for pumpkin seeds, soy and turkey. PM3's food_targets are empty because its admission is unresolved, not because these foods lack tryptophan.

src/data/documentedFoodSources.mjs explicitly requires dietary_input=true and an admitted scientific assessment; it is not a contextual-source adapter. system/dietary-input-governance-v2.md forbids unresolved admissions from generating admitted food rows. Neither rule prohibits documenting food composition as such, but enabling it in this PM's source column requires explicit contextual presentation treatment.

Recommendation for approval: show a clearly separated context-only source disclosure for canonical tryptophan composition, labelled "Tryptophan food sources — dietary composition context; PM admission unresolved". Reuse canonical records, qualifications and applicable ranking rules; do not put these in PM-admitted coverage, efficacy claims, or ordinary admitted food ribbons. Display amounts as tryptophan, never downstream serotonin/melatonin. Explain the pending pathway/admission decision. Existing food ranking/hold rules stay unchanged. Update the shared presentation contract and regression tests with that approval; no contextual display has been enabled in this task.

## Validation

Six compact Explorer tests pass. Mission-only edit to canonical PM; historical assessment, Scientific Principle/Finding, SEC, admission and food mappings retained. No full build, push or deployment. Review identity registration and contextual presentation as separate decisions before implementing either.

## Canonical projection implementation — 10 November checkpoint

Author subsequently approved the framework-wide canonical-science/projection rules and five checkpoints. Implemented system/canonical-scientific-projections.md and linked it from PM schema/template, Stage 2A, Stage 2B, presentation change control, framework QC, system index and AGENTS.md. No bulk scientific migration.

PM3 visible Mission now uses CanonicalPmMission, reading frontmatter directly. Explorer regenerated by its existing canonical-file generator; mission equality checked across all 67 PM records. Public dietary explanation now uses scientific language rather than Unset/registry-gate terminology; internal missing-identity rationale and unresolved admission remain unchanged. Historical assessment operation and mission snapshots retain their original scope and provenance; they are not current mission values. No new identities or contextual food edges activated.

14 focused tests pass: canonical Mission React rendering, 67-PM Explorer equality, unresolved PM3 no-food-projection boundary, existing Explorer regressions, and PM/Explorer/wheel ranked-food consistency. Automated checks do not certify all legacy narrative entailment or recipe views; those require projection-specific checks when modified. No production build/browser-publication check performed in this scoped task, no SEC or admission changes, no commit/push/deployment.

## Transfer into the BRS-X review checkout — 10 November 2026

The findings above are the Codex review on `audit/dietary-connectivity-2026-11-09` at `af13bec1`. They were adopted in `/Users/paulhouston/Food Science/food-science` on `review/brs-x-hormones-pm7-circadian-pm3-2026-11-06` at `f8510da0`. Dietary-connectivity amendments, the food-wheel ledger, the ranked-food snapshot and tyrosine animal-coverage food edits were not copied. Concurrent intervention food/substance edits in the destination checkout were preserved. Explorer missions were derived here from canonical PM frontmatter; ranked and documented food layers were not regenerated.

Destination validation: 3/3 canonical projection tests pass. The compact Explorer and tyrosine tests still pass as 11 further tests in the Codex worktree (14/14 there) and do not load here, because their modules were left in that worktree. The MDX template file was not edited, so its existing presentation-approval hash remains valid. The Mission component and PM3 page have presentation-approval records for this instruction. No production build or deployment.
