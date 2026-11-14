# Dietary connectivity audit — local only

Branch `audit/dietary-connectivity-2026-11-09`, base `af13bec1`; changes uncommitted/unpublished. Existing top-ten PR238 preserved.

Author requested full 68-substance/151-target reconciliation, not new scientific admissions. See [full report](../../review/dietary-connectivity-2026-11-09/REPORT.md) and detailed JSON/matrices. Current preview remains 64/800/98 with 25 ranked input identities. Seven additional endpoints have verified structured Derived routes (one defined protocol); historical incomplete links remain unresolved.

Verified extraction omission: source-linked individual EAA-profile observations were ignored. New shared-mapper adapter is opt-in for the audit, not activated in PM/wheel generation. Corrected audit: 65 foods, 890 edges, 100 targets, 26 ranked inputs. Preserve raw-source values, preparation and provenance. Glycine/betaine unpublished backfills are not imported. Public coverage definitions, activation and incomplete scientific links await author review.

Validation: seven focused tests pass; existing combined suite 90/94 with same four baseline failures; presentation check passes. All canonical records, SEC history and wheel assets match base bytes. No commit/push/merge/deploy. Next: review report and activation scope before regenerating shared public outputs. Do not silently combine this with PR238 or change scientific classifications to improve counts.

## Priority reconciliation after stopping preview work

Author stopped build monitoring and PR changes. Work remains on this local audit branch. The separate amino-acid correction was pushed as 4be84e79; do not poll or modify that PR. New SOURCE-RECONCILIATION.json/md reconciles all 32 original scope records, all 18 declared conversions and 42 remaining network identities. Finding: 27 KC and five biochemical layers explain null classification; all 18 conversion routes lack newer structured assessments, three also lack source IDs. FIRST-REVIEW-GROUPS.md proposes narrow glycine/betaine source-publication reviews and B6/PLP metadata reconciliation, without releasing holds or admitting anything. Added deterministic reconciliation script and four tests; combined audit tests 11/11. Canonical scientific/public files unchanged. No commit/push. Next: author review of small source/metadata groups, then only approved source-level corrections.

## Author review 01 — fresh source verification

Fresh official USDA CSV/PDF checks confirm all 13 saved glycine/betaine values. Six ready for approval; six require explicit qualifications; soy BFSN adjusted value retains hold. Source rows/hashes and all decisions in author-review-01/REVIEW.md and JSON. Conditional ready+qualified impact: +70 edges/+12 targets, to 70 foods/960 edges/112 targets; no activation. Four proposed B6→PLP assessments pass current schema, preserving original evidence, missions, limitations and Lamers null outcomes. They remain review sidecars, not canonical changes. Five focused tests pass. No holds released, PR changes, builds, commits or pushes. Next: author adjudication of source records and four assessment proposals.

## Review 01 implemented after explicit author approval

Twelve glycine/betaine food observations and four B6→PLP assessments now installed locally, uncommitted. Soy withheld. Exact qualifications retained; beef/salmon named unrelated holds scoped by substance IDs without changing their decisions. Shared output: 70 foods/960 edges/112 of 151 targets/28 ranked inputs. Four conversion records resolved; 14 remain. See author-review-01/IMPLEMENTED.md and implemented-results.json. Tests 17/17, MDX 16/16, dietary/Findings/SEC/presentation pass. Broad food validator retains three documented legacy qualitative-row errors. No PR update, build, wheel publication, commit, push or deployment. Do not mistake historical proposal-pending files for current approval status; implementation report records the subsequent owner decision.

### Review 02 — remaining 14 conversions, proposed only

Prepared `review/dietary-connectivity-2026-11-09/author-review-02/REVIEW.md`, `proposed-assessments.json` and `validation.json` on `audit/dietary-connectivity-2026-11-09` at HEAD `af13bec172b5938098a46f85c06523b8a20e90dc`. Local-only, not committed or published. Six metadata routes, five scope-qualified routes, three unresolved source-identity routes. Every record retains current original atoms, overlays, full supporting Findings and source hashes. No new source retrieval or scientific appraisal claimed.

Eight proposed assessments pass the unchanged structural validator. B9/B12/B2 require exact existing display-name aliases; dietary protein (two PMs) and fermentable fibre remain missing source identities. Ellagitannins exists in the registry despite a stale PM annotation. Vitamin A draft-only and all other publication holds remain. Existing admissions are not withdrawn by these structural blocks. Explicitly preserve vitamin A increased-permeability counter-result, methionine/cysteine null outcomes, NAC+glycine protocol boundary, PC methyl-label versus intact-headgroup distinction and multi-step hepatic tryptophan route.

Validation: 14 canonical source hashes unchanged; original citation keys resolve; original limitations, admissions and Derived overlays retained. No canonical scientific edits, SEC edits, schema changes, wheel generation, builds, PR updates or deployment. Next action: author review of the three prioritised decision groups; implement only subsequently approved items. Review01's implemented approved work remains intact.

### Approved PM food-source visibility correction — local only

Implemented the author's two-layer PM presentation in `src/lib/pmInputFoodDisclosure.ts` with `src/data/documentedFoodSources.mjs`. Shared ranking unchanged: local approved snapshot still 70 foods, 960 edges, 112/151 targets. Added 200 distinct documented-unranked food/substance/PM triples across 35 PMs; no wheel changes. PC six qualitative foods, uridine milk with chemical-form/delivery limits, choline eight ranked plus six qualitative sources, betaine five locally approved ranked plus qualitative shrimp, methionine ten unchanged. Canonical food-ID grouping repairs trout roe/tahini without changing source records. Internal-only annotations stay hidden; separately public supported contains relationships remain eligible. No fabricated amounts or qualitative RSP.

Authoritative mapping and Stage 2A/2B contracts updated; exact author-approved renderer hash appended to presentation approvals, historical records preserved. Review fixture/count ledger: `review/pm-food-source-visibility-2026-11-09/`. Tests: 18 focused pass; presentation691 pass; mapper37/41 with exact four documented baseline failure identities. Browser refused file URL; full PM visual integration not claimed. No build/deploy/PR modification/commit/push. Next: author review of corrected local presentation before further publication work.


## Focused coverage follow-up — local proposal only
Confirmed documented-source status filtering excludes both supported preparation-dependent sulforaphane sources; apple pectin lacks normalized structured status/citation despite existing public evidence. No corrections implemented. Measured-but-unrankable display requires explicit presentation approval; preserve original quantities/bases and target holds. See review/dietary-connectivity-2026-11-09/whole-framework-coverage/NEXT-DECISIONS.md. Current branch audit/dietary-connectivity-2026-11-09, HEAD af13bec172b5938098a46f85c06523b8a20e90dc; no commit/build/PR/deployment. In-memory status probe restored two sulforaphane sources; counts in proposal remain projections.

## PM supply inventory — read-only local extraction
Extracted all 67 PMs, explicit admitted inputs and accepted KC/resource constituent routes. Deduplicated 145 PM–substance pairs (53 substances), retaining five multiple-provenance pairs; ranked 927 and documented-unranked 200 triples remain separate. Six of the earlier 151 presentation targets fall outside the strictly qualified union and require metadata/scope reconciliation, not automatic withdrawal. Nine non-single-substance identities remain unresolved; one constituent disposition is unset. Full report and reproducible extractor: review/dietary-connectivity-2026-11-09/pm-supply-inventory/. HEAD af13bec172b5938098a46f85c06523b8a20e90dc; report-only local changes, no build/commit/PR/deployment. Scientific records and existing presentation untouched.


## PM/KC discrepancy decisions — proposed, not implemented
See review/dietary-connectivity-2026-11-09/pm-supply-reconciliation/REVIEW.md and evidence.json. Five omitted presentation targets have explicit existing upstream/provision/resource authority; FOS/GOS remains explicitly unresolved. Two BRS4 KC2 exclusions are intentional historical context. PM6 folate child needs explicit disposition/type; bounded conditional-constraint proposal prepared. Nine unresolved identities separated into classes, preparations/matrices/mixture and strains; no generic nutrient substitution. Original 145-pair and 151-target inventories preserved, canonical hashes unchanged. No build/PR/commit/deployment. Branch audit/dietary-connectivity-2026-11-09 at af13bec1.


## Approved five-supply reconciliation — implemented locally
Author-approved four metadata fields added to PM6 folate child. Corrected separate audit inventory now 150 pairs, 55 substances, 960 ranked and 200 documented triples; original 145 snapshot retained. 33 KC/resource pairs, 28 beyond explicit admitted-input identities; six multiple-route pairs deduplicated. Nine identity-role proposals remain unimplemented. See review/dietary-connectivity-2026-11-09/pm-supply-reconciled/REPORT.md. Nine focused tests and preservation assertions passed; no other canonical/SEC/food/policy/generated changes, 151 presentation targets intact. Branch audit/dietary-connectivity-2026-11-09 HEAD af13bec1; no build/PR/commit/push/deployment.


## Shared-documentation extension implemented locally
Five child IDs plus two species documentation parents registered, reusing parent_substance_id/page_anchor. Separate taxonomic_parent_id and existing constituent_ids preserve taxonomy/mixture distinctions. All seven network_activation=held; PM mappings, food data, wheel assets and SEC untouched. Two new tests and four B3 regression tests pass; presentation approval entries record current owner authorization, no baseline regeneration. Exact formulation details remain pending; no public network activation. Contracts updated in substance schema and Stage 2A/2B. No build/PR/commit/push/deployment.


## Exact child PM mapping completed locally
Five original BRS5 atoms now have explicit child substance_id and resolved canonical identity; projection_status=blocked and registry network_activation=held preserved. No food/wheel activation. Four original PM documents changed only in identity metadata. Exact before/after fingerprint transitions retain historical admission recognition; baseline untouched, altered scientific limitations rejected by test. See review/dietary-connectivity-2026-11-09/exact-child-mapping. No build/PR/commit/deployment.


## Post-child connectivity recalculation — read-only
Updated review inventory: 155 PM–identity pairs / 60 identities (150/55 substances, 2 preparations, 1 mixture, 2 strains); 67 PMs, original 150 pairs retained. Food coverage unchanged: 960 ranked + 200 documented triples, 128 pairs/40 identities in either food layer. Public 151-target snapshot unchanged. All five anchors resolve; all projection/network holds remain. Four non-substance/source-class representations remain unresolved. See review/dietary-connectivity-2026-11-09/post-child-inventory/REPORT.md. No canonical edits/build/PR/deployment.


## Four non-substance identities completed locally
Existing PM atoms now resolve as source-class, functional-substrate-class, dietary-matrix and preparation-characteristic; substance IDs remain null. Added bounded conversion source_atom_id validation with canonical sourceAtoms context. Fibre→butyrate remains incomplete/unresolved; no new assessment installed. Four connections separate from existing 155 PM–identity pairs. Original evidence/admissions/holds preserved through exact identity-only transitions. 62 focused tests and presentation check pass. See review/dietary-connectivity-2026-11-09/non-substance-inputs/REPORT.md. No build/PR/commit/deployment.


## Consolidated current audit entry point
Use review/dietary-connectivity-2026-11-09/consolidated/REPORT.md for current counts; prior audit snapshots remain historical. Fresh reconciliation: 67 PMs, 155 canonical PM–identity pairs/60 identities plus four typed non-substance connections; 95 Direct +32 Derived admitted atoms (including two Direct/two Derived non-substance atoms). Ranked960/documented200, union128 pairs/40 identities. 19 completed Derived routes, 18 food-connected; endpoint universe separate. 14 conversion assessments pending. Five child projection holds, FOS/GOS and source/publication decisions preserved. No scientific edits/build/PR/commit/deployment.


## Group 1 conversion assessments installed
Author-approved BRS1 PM6 PC→choline, BRS2 PM2 choline→betaine, BRS2 PM6 methionine→cysteine installed as existing provision metadata. All original citations/limitations/null boundaries retained. Three focused tests and presentation check passed; no evidence blockers at the bounded claim level. Original 14-proposal file unchanged; remaining 11 uninstalled. See review/dietary-connectivity-2026-11-09/conversion-group-1-installed/REPORT.md. No public snapshot/rankings/food mappings/SEC changes, no build/PR/commit/push/deployment.


## Group 2 vitamin conversions installed locally
Folate→5-MTHF and B12→methylcobalamin (BRS2 PM1), riboflavin→FMN (BRS4 PM1) installed from approved proposals. Three exact family display aliases registered; active forms not merged. Three focused tests and presentation check pass; qualified food targets and original nonassessment science unchanged. Eight proposals remain uninstalled. See review/dietary-connectivity-2026-11-09/conversion-group-2-installed/REPORT.md. No build/PR/commit/push/deployment.


## Group 3 conversions installed locally
Five approved records installed; NAC, PC and tryptophan qualified provision, vitamin A draft-only, ellagitannin hydrolysis public-blocked. Ellagitannin stale identity resolved. Pathway extraction enforces assessment projection holds. Five individual validations and five focused tests pass; presentation check passes. Three unrelated legacy fixture failures documented; Group 4 proposals unchanged. See review/dietary-connectivity-2026-11-09/conversion-group-3-installed/REPORT.md. No builds/PR/commits/push/deployment.


## Group 4 installed — conversion reconciliation closed locally
All 14 records installed: 12 qualified completed assessments (ellagitannins public-blocked), vitamin A draft-only, fibre→butyrate unresolved/public-blocked. Two protein assessments use typed PM source atoms; no new substance identities. Seven focused tests and presentation check pass. Original evidence, SEC, food mappings and publication holds preserved. See review/dietary-connectivity-2026-11-09/conversion-group-4-installed/REPORT.md and final-status.json. No build/deployment/commit/push/PR change.


## Pectin/sulforaphane source corrections — local
Three approved corrections implemented; fresh extraction recovers four documented links (PM1 KC apples, PM5 apples, BRS3 PM3 broccoli/sprouts). Broccoli preparation repaired; sulforaphane uses Preparation-dependent — not ranked. Citrus exclusion and child hold tested. 13 tests/presentation check pass. Generated snapshot refresh pending normal mapping generation; no build/deployment/PR/commit/push. See source-omissions/REPORT.md.


## Scoped source snapshot refresh / renderer verification
BRS3/BRS5 snapshots refreshed only for approved pectin/sulforaphane records and affected source projections. Four links present in actual dropdown renderer; documented total204, ranks unchanged. 14 focused tests/presentation check pass. Browser file inspection blocked; no live PM visual verification claimed. See source-omissions/page-verification/REPORT.md. No build/deploy/commit/push/PR.


## Measured-but-unrankable layer implemented locally
Four-substance scope approved.17 new PM-observation rows (seven5-MTHF, two inulin, eight RS) with original units/bases, source distinctions and qualifications. Ellagic PM6, RS PM4/BRS6 and child holds remain. Rankings unchanged.15 focused tests/presentation check pass. Stage2A/2B/mapping instructions updated. See measured-unranked/REPORT.md. No build/deploy/commit/push/PR.
