# Canonical scientific truth and presentation consistency

Author-approved instruction, 10 November 2026. Applies to future scientific creation, revision, generation and publication. Does not authorise new admissions, SEC reassessment or wholesale legacy migration.

## Ownership

Each PM has one current mission in canonical frontmatter `mission`. The visible Mission reads that value (use `CanonicalPmMission` for MDX); Explorer/index descriptions derive deterministically from the same record. No independently maintained mission, fallback interpretation or manual generated-file edit. Historical assessment operation/mission snapshots retain their original provenance and are not current mission sources.

Findings, Principles, dietary admissions, evidence limitations and SEC remain in their existing authoritative records. Renderers resolve canonical IDs and references rather than rewrite those decisions. Food composition stays in canonical food observations. Public pages, Explorer, Food Wheel, recipes and indexes are projections, not scientific authorities. Generated copies must identify their source and be reproducible; compare regenerated fields with canonical sources before release.

Public explanation may be longer than the mission but cannot introduce stronger or new scientific conclusions. Edit the canonical scientific record first when scope or interpretation changes, review effects on prior decisions, then regenerate dependants. Do not update immutable assessment history to match new editorial wording. Report conflicts with both sources and provenance; modification date alone does not resolve authority.

## Reader-facing boundaries

Use ordinary scientific language rather than internal terms such as Unset, gate or missing registry ID, unless those terms meaningfully inform the reader. Preserve internal gaps and review states in canonical governance records. An unresolved admission must not look like an established intervention. It also does not erase established food composition or biochemical knowledge. Contextual composition is a separate, clearly labelled projection; enabling it must follow existing presentation approval and must not silently create admitted edges, target coverage, efficacy claims or downstream quantities.

## Five checkpoints

| When | Required check | Gate |
|---|---|---|
| Scientific creation | Mission, biological scope, evidence and admission rules for new PMs, Findings and relationships | Scientific |
| Canonical modification | Exact change and whether prior decisions remain valid; preserve history | Scientific |
| Presentation generation | Canonical IDs, current mission, claims, statuses, limitations and eligible relationships; no invented edges | Automated |
| Pull request | Authorised scientific scope, consistent projections and required tests; unresolved conflicts reported | Release |
| Production deployment | Actual deployed content, links/navigation and intended release identity | Publication |

Automated equality checks verify structural consistency, not scientific entailment. Human review must check explanatory prose against its evidence. Release/publication checks remain mandatory at their actual stage; local tests do not claim deployed verification.

## Template and generation implementation

For new or revised MDX PM Mission sections, import `@site/src/components/CanonicalPmMission` and place `<CanonicalPmMission />` under the existing Mission heading. Do not add another mission value or change page structure. Legacy Markdown pages may use deterministic generation with exact equality tests until an approved migration; do not bulk rewrite them under this instruction.

Stage 2A records the biological operation and evidence without independently authoring presentation conclusions. Stage 2B adjudicates exact claims and preserves unresolved decisions. Every generator must retain canonical record identifiers, scientific status, qualifications and source provenance. Test ranked and documented-unranked/related layers separately; recipe/wheel projections may not promote contextual or held records. Never use a successful identity lookup as admission.

## Current scoped verification

Melatonin PM3: direct frontmatter Mission component; Explorer generated from PM frontmatter; existing unresolved dietary assessment and missing-identity rationale retained; public dietary sentence states depletion evidence and absence of established extra-intake benefit. Contextual food display is proposed, not activated. Existing historical operation wording differs from the new mission by design and remains historical, not overwritten.

Regression entry point: `node --test scripts/canonical-scientific-projections.test.mjs scripts/compact-pm-explorer.test.mjs scripts/tyrosine-animal-coverage.test.mjs`. Coverage is scoped: Explorer missions across 67 PMs, Melatonin mission rendering/admission boundaries, and existing PM/Explorer/wheel food consistency. This is not proof that every legacy prose statement or recipe projection has been reconciled. New or modified projection paths must add corresponding tests before release.
