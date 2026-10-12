# BRS1 Input to Substance to Food — pilot report

Date: 12 October 2026. Scope: all structured accepted BRS1 PM inputs; food disclosures enabled on PM3, PM6, PM7 and PM12. No PM mission/admission, KC applicability, substance page, food page, evidence rating, diet score or recipe quantity was changed by this implementation. Separate concurrent edits to PM12 and BRS2 PM7 are preserved.

## Inventory and coverage

The inventory contains **50 relationships across 11 PM records**:

| Accounting designation | Relationships |
| --- | ---: |
| A — PM-owned dietary relationship | 18 |
| B — Upstream PM supply reference | 1 |
| C — Upstream iKC/resource constituent relationship | 14 |
| D — Shared pool/KC reference | 5 |
| E — Biochemical/endogenous dependency | 12 |

There are **13 distinct dietary substances**, with their independent roles preserved: tyrosine, tryptophan, iron, vitamin B6, folate/B9, betaine, choline, phenylalanine, copper, vitamin C, phosphatidylcholine, DHA and uridine. Biochemical-only BH4, glutamate and vitamin B5 remain represented separately. PLP and acetyl-CoA have unresolved canonical identities, not inferred dietary equivalents. Direct/Derived, biological role, claim ceiling and accounting designation remain separate.

Two unique shared pools are rolled up once: BRS1(KC1), the LNAA competitive context, and BRS2(KC1), the methyl-donor pool. Constituent–pool relationships deduplicate, with all dependent PM connections retained. Accepted supported upstream resource supply is not newly labelled as limiting iKC applicability. PM-owned independent choline relationships remain alongside its donor-pool connections. The PM5 tryptophan supply reference resolves to PM1's admitted tryptophan atom. Other upstream membrane-synthesis links retain local independent roles.

The complete unified table has **2,593 PM–input–food/gap rows**. Its normalized source projection contains **926 food-material links across 154 food identities**, with **880 source-specific verified quantitative observations** including biochemical context. Of those, **759 observations concern dietary-accounted substances**. Nine dietary substances have quantities; betaine and phosphatidylcholine have qualitative-only coverage; phenylalanine and uridine lack eligible source records in the current corpus. There are 282 material records without a comparable ranked amount, including qualitative records and measurements with incomplete preparation/basis. All eligible links remain in the full review, including those below the food headline threshold.

## Reused records and necessary additions

PM/KC admissions and relationship evidence remain in their existing structured records. Canonical substance IDs/pages remain in the registry and page metadata. Food occurrence and composition remain on canonical food records. The new schema adds only generated stable relationship IDs, material IDs, keyed source-observation pointers, accounting designations, resolution/gap fields and projections. No separately editable scientific or quantity registry was added.

The CLI and Docusaurus plugin use the same generator. Food selection logic is shared by the review and PM disclosure renderer. Authoring instructions for PMs, substances, foods and the legacy mapping format now describe how source changes regenerate the named table. Existing composition values are reproducible snapshots keyed to their authoritative observations; no yield or serving target is invented.

Outputs are in `system/generated/brs1-input-substance-food/`: unified CSV/Markdown, normalized JSON, inventory, cross-referenced substance index, full reverse food view gap/pool JSON and a separate candidate-ingredient projection for the meal pattern. The internal interactive page `/docs/system/brs1-input-substance-food` exposes the three review views.

## Pilot behavior

Food sources is a disclosure beneath each matched input on the four pilot PMs. It shows up to three quantified sources initially, expanding to at most ten. Other supported food sources retains qualitative presence and other preparation groups. Upstream supply and shared-resource connections remain visible. Derived inputs identify their target; PLP is not counted as an independent dietary B6 supply.

Representative checks use actual BRS1 records: Iron/B6 quantities in PM3; qualitative phosphatidylcholine in PM6; PM3 tyrosine supply and methyl-resource references; BRS2 KC1 connections in PM3/PM6/PM7; independent choline roles in PM6 and PM12; and PM12 uridine's missing food coverage. No example or admission was invented to fill the pilot.

## Missing data and identity gaps

- **Canonical identities/pages to flag for Cursor:** PLP and acetyl-CoA. These are biochemical entities; a missing page does not justify borrowing another nutrient's identity or amounts. No canonical dietary substance page is currently missing.
- **Food sourcing:** no eligible phenylalanine or uridine observations. BH4/glutamate have no eligible food occurrence in this corpus; their biochemical roles remain represented without implied dietary provision.
- **Non-substance inputs:** the indispensable-amino-acid class lacks an accepted constituent-level food join; protein grams are not a substitute. The meal carbohydrate-to-protein pattern has ingredient composition candidates and keyed values, but no accepted single-food equivalence or meal target. These remain specific gaps.
- **Relationship documentation:** PM6's established folate/KC constituent relationship has no explicit relationship-type label. Its applicability and food coverage are preserved, with the label gap recorded.
- **Quantitative adapter:** algal-oil authorised specifications are regulatory minimums, not measurements or universal ranges. Presence survives; product-specific quantitative adaptation remains unresolved.
- **Structured admission coverage:** PM10 and PM11 contain no structured admitted input inventory. No food mapping was inferred from narrative or tags.
- **Optional composition fields:** preparation, chemical form, food matrix, species/edible part and absorption information remain unknown where absent; known fields are retained. They do not erase supported occurrence.
- The initial Uridine missing-identity flag was corrected independently in the source during this run. Regeneration picked up that correction. Its food-source gap remains.

## Unresolved design decisions

1. The preview defaults to the largest comparable preparation group, with a deterministic tie break. This needs UX review before expanding; it is not a dietary priority. A preparation selector may be preferable.
2. Exact tied values are equal; overlapping source-specific ranges do not receive precise rankings. No incompatible preparations are combined into a universal range.
3. Decide how to present compound-class constituents and meal-composition candidates without implying equivalence or new scientific admission.
4. Decide whether biochemical-only food occurrence should remain available beneath those inputs or be restricted to the review view.
5. Decide how future recipe consumers should distinguish total analytes from constituent forms and precursor families, while calculating each canonical ingredient substance once. The pilot preserves derived links but does not perform recipe accounting.

## Validation and readiness

- New focused join/accounting suite: **11/11 pass**, including accepted-input coverage, stable IDs, explicit external dependency scope, source-value reproducibility, upstream supply/cycle checks, pool/constituent deduplication, independent roles, B6/PLP separation, qualitative retention, combined-analyte exclusion, reciprocal views, pattern preservation and identity/gap behavior.
- Existing composition-provenance suite: **11/11 pass**.
- Existing dietary traceability suite: **19/21 pass**. The two failures concern unchanged BRS5 constituent ownership and a pre-existing state-regulation validation expectation.
- New/changed rendering modules and internal review MDX compile. The wider repository typecheck still reports existing errors; no new mapping-module errors were reported.
- Browser verification used the actual disclosure renderer with generated BRS1 data in a focused harness: three initial Iron foods, expansion to ten, and qualitative phosphatidylcholine retention were verified. Full Docusaurus PM-page visual verification is **not certified**: the additional development preview hit EMFILE/open-file watcher limits. The extra server was stopped; the existing user server was left alone. Restart the normal server to load the newly registered plugin before the full-page review.
- `git diff --check` passes. No external evidence search or repeated production builds were performed.

The normalized structure is suitable as the foundation for BRS2–6. Bulk extension should follow review of the preparation-group UX, relationship-label gaps and non-substance handling, plus a fresh scoped inventory for each BRS. Missing data need not block valid joins; the implementation must not treat an unreviewed PM or missing page as scientific rejection.


## Dietary-input sixth-field update

The accepted BRS1 inventory now explicitly records 34 Yes, 9 No and 7 unset relationships. All 45 traceability atoms were reviewed; five displayed pool references are No. Accounting designations, accepted evidence, limitations, relationship layers and supply references are preserved independently. Vitamin B5 is Yes through its existing nutritional CoA precursor role despite its biochemical layer/accounting context; no new Direct requirement classification is assigned.

The four PLP entries remain unset with section/supply contradiction flags. PM1 Tyrosine and PM2 Tyrosine/Tryptophan transport entries remain unset pending explicit supply-route clarification. No and unset rows retain biological context; only Yes joins generate food lists. Four explicit intracellular/endogenous entries are No. This does not assert absence from foods. Canonical composition observations are retained.

Generated web/Markdown/CSV views expose dietary applicability plus BRS, PM and recorded section IDs. The substance index associates each section ID with its PM instead of assuming one section for a substance across mechanisms. Existing structured presentation sections are used; missing section metadata is reported, not invented.

Validation: 14 mapping/accounting, schema and disclosure tests pass. Existing traceability suite remains 19/21, with its two pre-existing unrelated failures. Full TypeScript validation has pre-existing site errors; no errors in the mapping review or dietary disclosure modules. Browser verification is blocked by connection refusal from localhost:3000 (preview server not running).


## Bounded preparation/relationship filter update

All preparations are eligible by default; exact preparation selection is optional. Verified per-100 g observations preserve separate source values and preparation/basis. Mixed states display alphabetically instead of as one nutritional rank. Additional quantified sources remain accessible separately from qualitative/unverified sources.

PM-owned (A) and upstream/shared (B/C, plus D pool references) are independent relationship filters, both initially selected. The shared projection filters relationships before generating PM, substance and food views and counts. Context and unresolved accounting stay in a separate disclosure. Vitamin B5 retains its accepted dietary flag but its existing E accounting is flagged unresolved rather than guessed. No accepted biological role, supply relationship or KC applicability was altered.

Focused verification: 19 checks pass, including four checkbox combinations, mixed/raw/dried/cooked selection, source-specific observation preservation, pool separation and independent choline roles. Browser verified both (38 relationships), owned only (18), upstream/shared only (20), neither (0), unchanged separate context (12), and the dried preparation filter. All preparations/both boxes restored after verification. Full TypeScript check retains unrelated existing errors; no errors in the changed review/food-disclosure modules. No full build or publication requested for this update.
