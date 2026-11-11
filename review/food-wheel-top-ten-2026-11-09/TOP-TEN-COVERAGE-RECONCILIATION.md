# Top-ten coverage reconciliation — 9 November 2026

Branch experiment/food-wheel-top-ten-2026-11-09, base 2efc9c82. Read-only comparison of scientific records; no threshold, source-value or admission change.

## Exact snapshot comparison

The original frozen extraction reproduces **78 foods, 985 connections and 119 covered targets** using the current selection arithmetic. This separates changes in source authority and target policy from the top-ten calculation itself. Current shared snapshot: **64 foods, 800 connections, 98/151 covered targets**. There are exactly 21 lost covered targets and no newly covered target. All old relationship identifiers still resolve on the same targets.

These are selected-source coverage losses, not findings that the substances are absent from food and not withdrawals of PM dietary admissions. Nineteen targets depend on unpublished composition additions or eligibility metadata; two are subject to explicit retained target-specific restrictions.

## All 21 targets

|Target|Primary cause|Explanation|
|---|---|---|
|BRS1-FM1-PM3 / betaine|Unapproved or held composition observation|Five source-specific USDA Release 2 observations are local backfills, not in the approved published record snapshot.|
|BRS1-FM1-PM3 / phenylalanine|Unapproved or held composition observation|Source-specific USDA amino-acid supplementary observations are unpublished; dietary admission is unchanged.|
|BRS1-FM1-PM4 / betaine|Unapproved or held composition observation|Five source-specific USDA Release 2 observations are local backfills, not in the approved published record snapshot.|
|BRS1-FM1-PM4 / phenylalanine|Unapproved or held composition observation|Source-specific USDA amino-acid supplementary observations are unpublished; dietary admission is unchanged.|
|BRS1-FM3-PM7 / betaine|Unapproved or held composition observation|Five source-specific USDA Release 2 observations are local backfills, not in the approved published record snapshot.|
|BRS2-FM1-PM1 / 5-methyltetrahydrofolate|Unapproved or held composition observation|Existing preparation-specific quantities remain canonical; unpublished rank_eligible/comparison_group metadata is not imported.|
|BRS2-FM1-PM2 / betaine|Unapproved or held composition observation|Five source-specific USDA Release 2 observations are local backfills, not in the approved published record snapshot.|
|BRS2-FM1-PM3 / betaine|Unapproved or held composition observation|Five source-specific USDA Release 2 observations are local backfills, not in the approved published record snapshot.|
|BRS2-FM1-PM4 / betaine|Unapproved or held composition observation|Five source-specific USDA Release 2 observations are local backfills, not in the approved published record snapshot.|
|BRS2-FM1-PM4 / glycine|Unapproved or held composition observation|Source-specific USDA amino-acid supplementary observations are unpublished; dietary admission is unchanged.|
|BRS2-FM2-PM5 / serine|Unapproved or held composition observation|Source-specific USDA amino-acid supplementary observations are unpublished; dietary admission is unchanged.|
|BRS2-FM2-PM6 / glycine|Unapproved or held composition observation|Source-specific USDA amino-acid supplementary observations are unpublished; dietary admission is unchanged.|
|BRS2-FM3-PM7 / betaine|Unapproved or held composition observation|Five source-specific USDA Release 2 observations are local backfills, not in the approved published record snapshot.|
|BRS3-FM1-PM1 / glycine|Unapproved or held composition observation|Source-specific USDA amino-acid supplementary observations are unpublished; dietary admission is unchanged.|
|BRS3-FM1-PM2 / glycine|Unapproved or held composition observation|Source-specific USDA amino-acid supplementary observations are unpublished; dietary admission is unchanged.|
|BRS4-FM1-PM3 / glycine|Unapproved or held composition observation|Source-specific USDA amino-acid supplementary observations are unpublished; dietary admission is unchanged.|
|BRS4-FM3-PM6 / l-carnitine|Unapproved or held composition observation|Furusho 2026 beef/pork quantitative additions are unpublished; preserve source/form and existing beef holds.|
|BRS5-FM1-PM1 / pectin|Unapproved or held composition observation|General-food pectic measurements are unpublished; citrus-specific target separately held.|
|BRS5-FM2-PM4 / pectin|Target-specific non-rankable restriction|Canonical input is specifically citrus pectin. Four general-food total-pectic measurements do not establish the admitted citrus material.|
|BRS5-FM2-PM5 / pectin|Unapproved or held composition observation|General-food pectic measurements are unpublished; citrus-specific target separately held.|
|BRS5-FM3-PM7 / glucose|Target-specific non-rankable restriction|PM owns a luminal glucose sensory stimulus in a mouse circuit, not a nutritional requirement. Highest-glucose foods are not an evidence-based optimisation ranking.|

## Causes of complete target coverage loss

- Target-specific non-rankable restriction: 2
- Unapproved or held composition observation: 19
- Food identity consolidation: 0
- Shared-reference attribution: 0
- Comparability or preparation exclusion: 0
- Scientific admission/eligibility difference: 0
- Software or extraction defect: 0

No lost target is attributable solely to food consolidation, shared-panel attribution or an unexplained software defect. Betaine and 5-MTHF existing observations are not erased: the approved snapshot does not carry the frozen experiment’s additional source-specific observations or explicit comparison metadata. Missing ranking authorisation is distinct from missing concentration evidence.

## Connection and food accounting

985 − 219 removed + 34 added = **800 connections**. Primary-cause attribution below is mutually exclusive; observation-level evidence and secondary limitations are retained in the JSON ledger.

|Removed connections: primary cause|Count|
|---|---:|
|Unapproved or held composition observation|179|
|Food identity consolidation|24|
|Comparability or preparation exclusion|3|
|Shared-reference attribution|7|
|Target-specific non-rankable restriction|6|

The three “comparability or preparation” entries are **top-ten selection displacement**, not incompatibility: cocoa replaces pistachios in three copper target lists. The 179 composition entries include quantities or eligibility metadata not approved for the canonical snapshot; they must not be interpreted as 179 scientifically invalid values. The 24 retired lupin-beans connections are identity accounting, not lost evidence; surviving lupins competes once and is not guaranteed the retired entry’s rank.

Added connections: cocoa 24; peanuts 8 (folate positions released after lupin deduplication); lupins 1 (arginine from the preserved merged observation); cashews 1 (linoleic-acid position after the oil hold).

78 − 15 removed food identities + cocoa = **64 foods**. Removed from the ranked view:

|Food|Lost selected connections|Cause|
|---|---:|---|
|almonds|14|Unapproved or held composition observation|
|apples|3|Unapproved or held composition observation; Target-specific non-rankable restriction|
|bananas|1|Target-specific non-rankable restriction|
|beef|13|Unapproved or held composition observation|
|beetroot|7|Unapproved or held composition observation|
|early-harvest-olive-oil|4|Shared-reference attribution|
|extra-virgin-olive-oil|3|Shared-reference attribution|
|grapes|1|Target-specific non-rankable restriction|
|lupin-beans|24|Food identity consolidation|
|pork|1|Unapproved or held composition observation|
|potatoes|3|Unapproved or held composition observation; Target-specific non-rankable restriction|
|quinoa|7|Unapproved or held composition observation|
|spinach|11|Unapproved or held composition observation; Target-specific non-rankable restriction|
|swiss-chard|1|Unapproved or held composition observation|
|wheat-germ|7|Unapproved or held composition observation|

All canonical food evidence remains intact except the separately authorised lupin identity consolidation, whose historical records and URL redirect are preserved. Olive-oil identities remain distinct and held for generic-panel ranking. Cocoa alone represents FDC 169593, with the unsweetened dry-powder qualification; cacao's copied panel does not independently rank.

## Regression assessment and release state

- Current ranking arithmetic reproduces the old 78/985/119 exactly on the old frozen sources. No blanket preparation narrowing or 10% threshold change explains the reduction.
- The dry-powder parser omission identified during attribution was corrected and is regression-tested; cocoa's 24 additions are included in 800.
- No changed or missing admission IDs were found among the 119 previously covered targets.
- Every removed edge has a source-reconciliation record, explicit hold, retired identity or exact selector exclusion; unexplained removed edges: 0.
- Source backfills remain in their original scientific worktree and audit archive. They have not been discarded or silently imported. Their future publication requires record-level review, not relaxed ranking rules.
- The older report’s wheel-only proposal and count claims are historical and superseded for the shared-selector publication scope.
- Full release checks are now required; this report does not itself establish production-build or browser-preview success. No PR, merge or production deployment is implied.

Machine-readable complete ledger: [top-ten-reconciliation.json](top-ten-reconciliation.json). It contains every removed/added edge, original observation/provenance, review IDs, exact excluded-food reasons and all target identities.
