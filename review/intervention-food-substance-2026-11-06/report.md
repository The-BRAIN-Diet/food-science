# SOP/Lifestyle food–substance integration — local review

Implemented 6 November 2026, uncommitted. Scientific branch: `review/brs5-pm4-sec-assessment`, HEAD `521036b1`. Existing unrelated CoQ/scientific edits were preserved. No commit, push, merge or deployment.

## Scope and results

Screened all **87 canonical SOP/Lifestyle array records** across BRS1–6 and Cross-BRS. Existing array membership is retained as historical admission, not a new scientific adjudication; explicit deferred/rejected/candidate/No/Unset intervention decisions are excluded. A false `dietary_input` does not reject a Lifestyle Lever.

| Checkout | Documented food–substance pair | Partial identity mapping | Unmapped | Total |
|---|---:|---:|---:|---:|
| Scientific branch | 5 | 23 | 59 | 87 |
| Localhost3145 (includes Cursor's vinegar/acetic-acid records) | 6 | 22 | 59 | 87 |

The 59 unmapped records include **26 behavioural records** for which no food/substance connection is required. The other 33 lack resolved canonical material links, including unnamed pattern constituents and preparation-specific materials. No placeholder is displayed. These are mapping counts, not scientific-confidence or admission counts. “Mapped” means at least one documented composition pair, not exhaustive protocol reconstruction or food/formulation equivalence. Twenty intervention records across 13 PMs received only existing canonical identity fields; see [identity additions](identity-additions.json). No authored scientific body, admission, mission, finding, limitation or SEC value was changed.

## Implementation

- Extended the **existing food-strategy roll-up**, with `intervention_mapping.records`, typed `edges`, provenance and counts. No competing hand-authored diagram dataset.
- Sources: canonical `food_ids`, `substance_ids`, ontology entries and explicit links already inside the exact intervention's six-atom disclosure. No prose-name mining, tag inference, inferred pattern ingredients or unrelated Finding links.
- Documented composition uses supported canonical food occurrence records and unambiguous substance identities. State-specific quantities are not transferred to intervention doses.
- Pilot disclosures and existing legacy intervention titles display identity links below the title using existing dietary CSS; six atoms and first-click expansion remain intact. Substance-led food sources are explicitly composition-only.
- `interventionChordEdges(records)` is exported for the chord consumer; the same edges are emitted by `npm run mappings:food-strategies`. No chord diagram was regenerated. Edge types preserve PM ownership and distinguish named identity, composition and BRS intervention context from dietary admission or efficacy.
- Stage 2A/2B, PM schema/template, SOP/Lifestyle presentation and food-strategy contract updated; scoped author approval recorded without baseline regeneration.

## Examples and browser checks

1. **Vinegar:** localhost BRS6-FM1-PM1 shows Vinegar → Acetic acid below the intervention. The six-atom source limitations remain intact; the new row expressly does not establish mediation or food-intervention equivalence. Its legacy evidence labels and Unset dietary flag were not re-adjudicated. [Screenshot](vinegar-expanded.png).
2. **Multiple foods:** BRS2-FM1-PM1 displays spinach and broccoli with canonical folate links and documented composition, not 5-MTHF quantity. First-click expansion verified, including preparation durations, null outcomes and no remethylation claim. [Collapsed](multi-food-collapsed.png), [expanded](multi-food-expanded.png).
3. **Dietary pattern:** BRS3-FM3-PM7 retains the fermented-food intervention without invented constituent links. Expanded evidence preserves the null primary response score. [Screenshot](pattern-no-inferred-foods.png).
4. **Behaviour:** browser inspection confirms guided breathing expands its six atoms with no food/substance display; mapping tests also cover light exposure and exclude accidental “heart” food from heart-wave feedback. [Screenshot](lifestyle-no-food-mapping.png).
5. **Extracted RS2:** tests preserve potatoes as contextual identity, explicitly not the tested meal or equivalent intervention. Composition does not establish butyrate production flux.

## Validation

- 17/17 focused mapping, withdrawn-pathway-panel and independent-intervention regression tests pass.
- Mapping regeneration exact/reproducible; 87 records reconciled; valid canonical links checked during extraction.
- Dietary governance: 65 PMs, zero issues.
- Findings consistency: 65 PMs, zero problems.
- SEC registry/immutable history: 139 snapshots valid, using baseline `a00d6b0d6c879e75c058ccb2a5c63ae6562afd2c`.
- Twelve transferred changed PM bodies compiled as MDX; comparison against HEAD confirmed bodies and intervention scientific fields unchanged after removing only added identity fields. The thirteenth PM (vinegar) has only `food_ids: [vinegar]` added in the scientific checkout; Cursor's different PM1 is preserved in preview.
- Changed TSX syntax compilation passes.
- **Scientific-branch presentation gate passes.** Preview checkout retains four pre-existing unrelated gate failures: framework-review-and-corrections, turkey-wing-stew, acetic-acid and the training page. No approvals manufactured for these.
- No full production build requested or run. Existing localhost server preserved; initial hot-reload navigation timed out, then the pages loaded and were inspected successfully.

## Checkout boundary and remaining work

Localhost3145 serves `/Users/paulhouston/Food Science/food-science` at `a00d6b0d`, not the scientific worktree. Only task-owned files whose preview versions matched the source baseline were transferred; all pre-existing dirty preview files, including the vinegar/acetic-acid work, were preserved. [Transfer log](preview-transfer.json). The approved instruction/renderer approval changes were also mirrored locally. This is not a Git branch integration.

Vinegar/acetic-acid mapping is complete in the preview checkout and partial in the scientific checkout because Cursor's new identity/composition records have not been integrated into this scientific branch. Do not overwrite or silently merge those concurrent records. No clinical or scientific gap was filled to improve mapping counts. Further mapping of the 33 non-behavioural unresolved records needs exact protocol-material identities; named patterns must not be expanded from generic assumptions.

Review [full inventory](inventory.md) before a future release. Author review is the next step; nothing has been published.
