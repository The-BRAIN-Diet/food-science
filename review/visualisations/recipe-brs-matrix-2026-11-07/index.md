# Recipe BRS connectivity matrix — isolated proposal

7 November 2026. Local-only on `review/brs5-pm4-sec-assessment`, HEAD `521036b1d6c212e58c660f0f985e47617a71a716`. No commit, push or deployment. Author approved this isolated prototype in the Recipe BRS Connectivity Matrix EXEC; no canonical recipe rollout is approved.

## Pilot and scope

Selected **Matcha Mitochondria Smoothie** (`docs/recipes/Breakfast/Matcha-mito-smoothie.md`). The preferred Neuroeshot was inspected first: roe has accepted mapped paths, lemon juice has a separate recipe snapshot rather than the lemon-flesh identity, and hot sauce has no accepted explicit food-target join. A roe-only network would not demonstrate multiple-food relationships. Neither recipe was edited.

The fallback shows five mapped ingredient foods: spinach, bananas, chia seeds, pumpkin seeds and kefir. Four have qualifying displayed paths; kefir has no qualifying explicit accepted food-target join. Eight shared substance identities, fourteen food–substance edges and thirty-five accepted dietary records span twenty-one distinct PMs and six BRSs. Kefir remains a dashed food node, with no fabricated substance path.

Matcha, ice and optional maca retain the source recipe's exclusions. Matcha's unresolved powdered-leaf composition is not replaced by brewed green tea. The prototype does not imply the recipe is fully characterised.

## Reused architecture and scientific rules

`build.mjs` imports the same `buildInputSubstanceFood()` mapper as the Food Wheel canonical ingestion and PM food mapping. It reads the existing recipe's `recipe_ingredients`, canonical `docs/foods` nutritional panels, substance registry and PM dietary traceability records. Derived `network.json` is regenerated from those sources; it is not an independently maintained scientific mapping dataset. Every read source is SHA-256 pinned.

A displayed path requires:

1. A default-included recipe ingredient with a canonical food identity and explicit edible weight.
2. A positive verified scalar from that food's `nutrition_per_100g` panel, per 100 g edible portion. The recipe-named FDC record must match the food panel. No presence-only quantity, range, provisional research quantity or alternate preparation is substituted.
3. An explicit food-target join in the existing mapper, to the same substance identity.
4. PM `dietary_input: true`, `scientific_admission: admitted`, resolved substance identity and a numbered BRS1–6 parent.

Historical admission basis, unfinished appraisal flags, original PM references and limitations remain visible. Accepted here means the existing canonical disposition; it is not a new adjudication. Biological participation alone cannot produce a path. BRS-X is excluded from this six-system prototype.

Ingredient contributions are food-panel value × existing ingredient grams / 100. They are named-panel arithmetic, not complete recipe totals, absorption estimates or target-engagement evidence. No RDA or benefit score is added. Missing measurements are not zero. Preparation and formulation remain metadata and are accessible in each composition disclosure.

### Readability selection

Cap at eight distinct substances. Round-robin through recipe foods in existing ingredient order; within a food sort by distinct accepted PM count, then canonical substance ID. Include all qualifying food edges for those eight substances. This is a deterministic connectivity sample, not nutritional ranking or a new scientific threshold. All omitted candidates and reasons remain in `network.json` (85 audit rows, not 85 unique substances).

Selected: vitamin B2, vitamin B6, magnesium, iron, potassium, manganese, linoleic acid and tryptophan. No connection was added to fill an empty BRS. All six systems happen to have qualifying paths. The Food Wheel's Relative Source Power and top-five selection remain unchanged and are not imposed on ingredients already chosen by the recipe.

No optional provisional/composition-only network mode is implemented. Such records remain diagnostic only.

## Visual and interaction proposal

**Change:** One standalone vertical recipe → foods → substances → BRS matrix. **Purpose:** Inspect composition-to-accepted-PM traceability without asserting recipe efficacy. **Placement:** Local review artifact only. **Scope:** One recipe prototype, zero production pages. **Duplication:** Reuses the existing canonical mapper; does not duplicate scientific source records. **Example:** `desktop.png`, `mobile-selected.png`, local preview. **Governance:** Existing `system/presentation-change-control.md` permits an isolated rendered proposal. Any canonical integration requires a separate author-approved recipe presentation contract, recipe template/component scope and exact presentation approval records. No shared CSS, global renderer or approval baseline was edited.

Visual reuse: Food Wheel night background `#090d16`, text palette, Arial typography, canonical colours read directly from `src/css/brs-accent.css`, curved system-coloured connections and selection-plus-detail interaction. Circular geometry is not reused. Dependency-free SVG connectors sit beneath native HTML buttons; native disclosures expose source and PM evidence. Keyboard Enter/Space activates nodes. Hover/focus previews highlight; click pins selection. Reset restores the overview. Mobile reflows to two columns with details beneath the graph.

## Reproduce

From the repository root:

```sh
node review/visualisations/recipe-brs-matrix-2026-11-07/build.mjs
node --test review/visualisations/recipe-brs-matrix-2026-11-07/validate.mjs
python3 -m http.server 3163 --bind 127.0.0.1 --directory review/visualisations/recipe-brs-matrix-2026-11-07
```

Preview: http://127.0.0.1:3163/ — same responsive URL on desktop/mobile. Source pages open on the public canonical site; the prototype uses current local canonical records, which can be ahead of published pages. Source record paths/hashes identify the exact local version.

## Validation

- Seven focused tests passed: explicit accepted source joins, canonical values/portion arithmetic, identity deduplication, BRS provenance, missing/excluded records, source hashes, isolated dependency-free rendering.
- Presentation contract: 691 protected files, no unapproved structural changes.
- Dietary governance: 65 PMs checked, zero issues.
- SEC: 139 immutable snapshots valid against the existing published baseline `ebbc10ed11484192c972952d8c47645bd3c5bf4e`. Initial invocation without mandatory baseline refused to run; corrected configuration passed. No SEC record changed.
- Existing Food Wheel canonical regression suite: 14/14 pass. Existing recipe nutrition integrity suite: 57/57 pass, including source-scoped roe; 78 tests total with prototype suite.
- Browser: keyboard magnesium selection reveals three foods/six PMs/three systems; spinach panel 79 mg/100 g and 23.7 mg at 30 g confirmed. BRS6 selection reveals three foods/one substance/one PM. Mobile 390 px client width equals scroll width. Desktop/mobile screenshots saved.
- Production compilation is recorded separately in `production-build.log` and `build-exit.txt`. Build runs with 4 GiB Node heap, separate output directory, and lifecycle generation disabled to avoid rewriting unrelated generated mappings. Read-only mandatory presentation/dietary/SEC gates were run explicitly above. The isolated prototype itself is compiled by `build.mjs` and intentionally absent from the production site output.

## Limitations and next decision

This demonstrates the architecture, not a complete recipe appraisal. The sampling favours well-connected substances and must not be read as a nutrient-contribution ranking. Historical PM admission qualifications are preserved. Food formulation and the recipe's uncharacterised matcha remain unresolved at source. Dense paths require selection on small screens; information is also readable in the adjacent/below text disclosures.

For another recipe, reuse the same extractor and require exact ingredient identities and recipe-specific composition panels; resolve gaps at source separately. Before public rollout, review the substance-selection rule and the prototype's vertical density, then approve a bounded recipe presentation contract. No new ring, scientific rule or global component has been installed.

## Final build result

Production compilation passed: exit 0, 580.25 seconds, 2,086,027,264-byte maximum RSS, 1159 HTML pages, Node 20.11.0 with 4 GiB heap. Existing undefined tags, outdated Browserslist and broken-anchor warnings remain; none originate from the isolated prototype. All 405 pinned source files remain unchanged. No prototype route was added to production output. Existing localhost previews remain running.
