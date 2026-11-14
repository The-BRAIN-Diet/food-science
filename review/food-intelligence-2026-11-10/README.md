# Food Intelligence prototype review

Local preview: http://127.0.0.1:3180/explore/food-intelligence/

| RSP threshold | Foods | Ranked identities | Supporting-only identities | PM–identity pairs | Food–PM–identity triples |
|---|---:|---:|---:|---:|---:|
| 10% | 79 | 28 | 21 | 145 | 1026 |
| 25% | 65 | 28 | 21 | 145 | 756 |
| 50% | 57 | 27 | 22 | 145 | 484 |

These are the new peer-review projection's denominators, not the historical wheel totals. The snapshot uses current shared PM source records. At 25%, 49 distinct identities remain represented. Twenty-six further supporting food associations are available through expansion. No source quantities or scientific admissions were changed.

## Identity hygiene

Egg yolks are suppressed in favour of whole eggs for this shortlist only, without transferring values. Review flags cover soy/edamame/tofu/tempeh/lecithin, sesame/tahini, sunflower seed/lecithin, broccoli/sprouts, cocoa/cacao/chocolate, EVOO/early-harvest oil, chicken/dark-meat poultry and organ/muscle distinctions. These are related foods, not automatically duplicate identities. Shared reference panels must not become independent observations; the existing shared selector remains authoritative. EAA aggregates remain inspectable but are excluded from additive counts when individual essential amino acids are represented.

## Evidence and presentation limits

Starred routes distinguish constituent, preparation-dependent and precursor/related pathways. Details retain original observations and limitations. Measured-but-unrankable is not zero or unknown. No new RSP was assigned to resistant starch or sulforaphane. The two-source supporting selection prioritises documentation completeness, not clinical importance. Serving scenarios are restricted to supported point edible-weight measurements; typical servings and recommended frequency remain unestablished.

The all-system diagram is necessarily long and crossed; selection and BRS filtering make individual routes readable. Narrow screens use horizontal scrolling. A browser inspection screenshot is saved as desktop.png. Print/PDF control is available, but publication-quality pagination has not been validated.

## Validation and files

Five focused tests passed: ranked thresholds/canonical edges/egg exclusion; counts and grouping; BRS filtering/expansion; retained observation provenance; portion conversion restrictions. JavaScript syntax check passed. Browser checked 25/50% thresholds, BRS4 filter, keyboard pumpkin-seed inspection and a 30 g calculation scenario. No browser console errors observed. No full production build, commit, push or deployment.

New isolated files: scripts/build-food-intelligence.mjs; scripts/food-intelligence.test.mjs; static/explore/food-intelligence/{index.html,style.css,app.mjs,model.mjs,data.json}; system/food-intelligence-peer-review-prototype.md; this review folder. Existing Explorer, Food Wheel and scientific files were not edited for this prototype.

## Compact refinement

Implemented tighter food/score rows, BRS-grouped natural-flow PM stacks and smaller substance labels. All original 65 foods, 49 identities and 145 PM–identity pairs remain at the default 25%. Five focused tests and JS syntax check passed; local browser verified grouped layout and unchanged counts. Screenshot: compact.png. The four-column canvas retains horizontal scrolling on narrow windows. No data regeneration or scientific changes; no push.
