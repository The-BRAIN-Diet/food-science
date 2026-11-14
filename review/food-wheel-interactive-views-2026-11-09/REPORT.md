# Food Wheel interactive views — local review

Authorisation: EXEC 1 — Food Wheel Interactive Views (Revised), 9 November 2026.
Branch: audit/dietary-connectivity-2026-11-09. No commit, push or deployment.

## Implemented

Existing circular Foods → Substances → BRS/BRS-X layout and geometry retained. No PM nodes. New controls: Multiple Selection, Combined/Compare, BRS focus, removable food chips. Single-food selection remains available. Combined uses the union of qualified records; summary counts deduplicate substance, substance–BRS and substance–PM identities. Compare does not alter those records.

Shared relationships use two fixed 2-unit strokes at +/-2.2 units with brightness(1.5), retaining BRS colours/gradients. Contributor counts do not scale width. Invisible hit regions improve pointer targeting without changing visual width. Hover/focus text and keyboard-activated details name contributors; shared/unique labels provide a non-colour alternative. Tooltip space is reserved to prevent hover-induced chart movement.

URL parameters: foods (canonical comma-separated IDs), view=multiple, mode=compare, brs, substance. Combined/single defaults can be omitted. Unknown IDs are ignored; lupin-beans resolves to lupins. Reset removes only explorer-owned parameters, preserving unrelated query parameters and hashes. Back/Forward and refresh restore the selected view. Selecting a BRS preserves food selection. No recipe multi-select or new recipe engine was introduced.

## Verification

17 focused tests pass (selection/history model, graph invariance, ledger invariance, exact child mapping, Recipe Explorer). Presentation check passes for 691 protected files. Runtime syntax and diff checks pass.

Browser checks:
- Salmon roe alone: 25 original records, 25 distinct PM targets, 7 substances, 15 substance–BRS relationships, 6 systems.
- Salmon + salmon roe: 51 records, 39 distinct PM targets, 10 substances, 20 substance–BRS relationships; 4 shared substances.
- Combined and Compare retain identical counts. Combined has no doubled strokes; Compare has 34 strokes on 17 shared ribbons, all width 2.
- With pumpkin seeds added and BRS3 focus: 14 records / 9 distinct PM targets; 3 selected foods retained.
- Removing pumpkin seeds retains 2-food BRS3 view: 11 records / 6 distinct PM targets / 4 substances.
- Mode switching, food removal, BRS filtering, reload, Back and Forward verified in browser.
- Shared-edge keyboard activation and pointer inspection reveal contributor names and evidence details. Paired strokes and brighter colour visually inspected.
- Evidence ledger remains linked. No new food ribbons or experimental-child connections.

The entire embedded DATA object and SVG geometry equal the saved pre-change snapshot. Scientific records, SEC, admissions, rankings and recipe mappings remain unchanged. The current frozen wheel remains 64 foods / 800 food–substance–PM records; newer canonical reconciliation was not substituted in this presentation task.

## Files

- static/explore/food-wheel/index.html — toolbar, styles, module loader; data and base geometry unchanged.
- static/explore/food-wheel/selection-model.mjs — pure state/URL/filter/count logic; no ranking logic.
- static/explore/food-wheel/interactive-views.mjs — DOM interactions and visual overlays.
- scripts/food-wheel-navigation.test.mjs — revised navigation/union invariance tests.
- This report, pre-change reference and screenshot.

The existing top-ten generator preserves the HTML shell and script suffix, so these module references survive generation. The ledger generator remains unchanged.

## Preview and limitations

http://127.0.0.1:3180/explore/food-wheel/?foods=salmon,salmon-roe&view=multiple&mode=compare&brs=BRS3

Local static server only. No new production build attempted: the prior resource-safe build had to be stopped when disk reached 1.3 GiB. Existing broader publication/snapshot failures remain outside scope. No successful full-build claim. Browser automation initially required reconnection, then completed verification. Screenshot: compare-brs3.png. Dense overlaps can make direct pointer selection less precise; keyboard and named contributor buttons expose the same evidence without relying on pointer precision.

## All BRSs off follow-up

Added dropdown value `off`, persisted as `brs=off`. Hides every food/substance/BRS ribbon, retains food selections and mode, and restores the unchanged graph when All BRSs or an individual BRS is chosen. Browser verified zero visible ribbons with two retained foods; restoring All BRSs restores 51 original records. Eleven focused selection/ledger tests pass. No scientific, ranking, build or publication change.

Food-selection correction: selecting a food now clears only `brs=off`, restoring its connections; an explicit BRS filter remains intact. Selecting an already selected food while off reveals it instead of toggling it out. Regression test reproduces liver + multiple + off and verifies 41 restored records. Twelve focused tests pass. Browser reconnection failed during this follow-up; no new browser verification claimed.

### Superseding correction — independent food selection and BRS visibility

Food selection no longer enables BRSs automatically. All BRSs off hides only substance–BRS ribbons; selected food–substance ribbons and Compare contributor styling remain visible. Adding/removing foods and the all-food control preserve the BRS setting. This supersedes earlier off-state/automatic-activation behaviour described above.

Validation: 16 focused navigation, evidence-ledger and Recipe Explorer tests passed. Local browser: liver alone with BRS off showed 9 food ribbons and zero biological ribbons; adding salmon retained off and showed 16 food ribbons (67 provenance records). Compare showed 8 paired-stroke elements and zero biological overlays. Restoring All BRSs retained the same 67 records and restored biological ribbons. Screenshot: `independent-brs-off.png`. No scientific data, ranking or admissions changed; no build, commit, push or deployment.

### Approved Compare refinement — rainbow contributor colours

Compare now uses single high-contrast food–substance ribbons, matching food labels and chips. Eight rainbow hues cycle into lighter shades for the next eight contributors. Selection order is retained in shareable URLs. Double-bond rendering is removed; shared contributor details remain accessible. Combined restores its existing system-derived fills and label styles; BRS arcs and biological ribbons retain canonical colours.

Local verification: cocoa + pumpkin seeds show 15 food–substance ribbons, 10 substances, 54 provenance records and 5 shared substances, with zero double-bond overlays. Switching to Combined restores original fills/labels without changing counts. All 18 focused navigation, ledger and recipe tests passed. Screenshot: `rainbow-compare.png`. No scientific snapshot, ranking, admissions, commit, push or deployment changes.
