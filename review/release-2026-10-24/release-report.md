# Reviewed Framework release — 24 October 2026

Release branch: `codex/release-reviewed-framework-2026-10-24`.
Main baseline: `9d3c604b3fd742f11cb8f919fce57d4e80dfcbe8`.
Reviewed PM4/PM5 commit, pushed: `a850e10126ad5c4bd290439fbcc72c2eae07f6a7`.

## Included and preserved

- Approved Stage 2A/2B governance, six atoms, independent Type A/B and Direct/Derived classifications, food traceability and reconciliation infrastructure.
- Approved PM5 controlled corrections, deferred enrichment and BRS4 corrections, including canonical L-carnitine and the approved admission.
- Approved PM4/PM5 missions, distinct ownership, evidence, dietary decisions, presentation corrections and SEC assessments. Names, identifiers, filenames and URLs retained.
- PM9 Scientific Hypotheses pilot, Unestablished, direction BRS6-FM1-PM1 → BRS4-FM4-PM9; excluded from approved causal extraction and dietary abstraction.
- Existing Cursor repairs already on main, preserved through ancestry. No duplicate Cursor-repair branch, replayed food-edge commits or automatic ontology repairs.
- Current main's phenylalanine component markup and registered component, four previously missing bibliography references and historical SEC preview clarification.
- Regenerated mapping outputs and reviewed manuscript selection. Existing food/source quantities were not recalculated.

## Explicit conflict resolutions

Canonical substance identities were combined without duplicates; the reviewed L-carnitine identity is the only registry addition relative to main. Bibliography records from both sides were retained. The conflicting Mora reference PMID was resolved to 18989971 using DOI 10.1021/jf801953t and PubMed/Europe PMC. Current main's phenylalanine markup and historical SEC preview component/test were retained. Five stale BRS2/BRS5 mapping documents were regenerated against the combined records.

## Curated manuscript output

The authoritative reviewed selection is `review/approved-six-brs-rollup-2026-10-23/manuscript-dietary-rollup.json`, with six corresponding shards, CSV, food-target export and changes report.

It contains 33 input–PM relationships and 369 rows: 345 verified food mappings, 23 research-supported provisional mappings and one unresolved food-coverage row (glutamine), covering 110 distinct foods. It retains 19 six-BRS SOP/lifestyle practices and one separately preserved cross-BRS timing practice.

Relative to the original rapid report: seven reviewed input–PM relationships and 56 exposure rows are added; none removed. The release adds PM5 Vitamin E/manganese and PM4's bounded aerobic-retraining record to the earlier reviewed enrichment export. Formulation, tissue, species and preparation limits remain attached. Finding SEC references are retained separately and do not confer a dietary connection score.

All 369 rows join the freshly regenerated global mapping catalogue. Both sets of six shards reconstruct their respective consolidated exports. The global 883-row catalogue preserves historical recorded admissions with an explicit qualification; it is not the reviewed manuscript selection and must not be interpreted as 883 newly approved scientific relationships.

The fresh Cursor queue has 54 tasks: 32 food edges pending independent verification, four material-equivalence reviews, four identity reconciliations and 14 conversion-pathway tasks. These are coverage counts, not evidence-strength measures.

## Unresolved work excluded from approval

PM8 remains under architectural review and excluded from the approved manuscript selection. PM5 FOS/GOS remains unresolved; its inulin candidate remains unadmitted. Apple → pectin remains provisional and queued. Niacin/NR and the fatty-acid meal comparison remain unadmitted. PM9-H1 is not a causal dependency. Provisional food relationships and incomplete conversion chains remain explicit; publication supplies no additional scientific approval.

Uncommitted raw retrieval artifacts, source preview logs and ongoing research in other checkouts were preserved. Source fingerprints remain unchanged. The approved PM4/PM5 work was committed/pushed in its original branch; source checkouts were not reset, cleaned or overwritten.

## Validation

Passing checks: Scientific Findings (64 PMs, zero issues); Scientific Hypotheses (zero issues); dietary governance (64 PMs, zero issues); canonical substances and inverse-edge safeguards; SEC registry/history and canonical references (84 snapshots), against both main and the reviewed PM4/PM5 baseline; bibliography (880 cited keys resolve, 1,319 entries); code/scientific-source whitespace check; lineage/preservation; food-target joins and shard reconstruction; hypothesis/curated-export tests (17/17).

Focused suite: 220/221 pass. The remaining butyrate Dietary Origin projection test fails identically in the reviewed source branch; its old literal input/food expectations predate the subsequent approved PM changes.

Broader suite: 257/267 pass. Nine failures also occur on the reviewed source branch: preservation assertions tied to older one-task diffs, section-title expectations, PM1 SOP absence, old SEC HTML and prebuild-order assumptions. The additional historical SEC calibration preview test expects its body to mirror the now-updated canonical GABA page; latest main's historical preview is deliberately preserved and excluded from production. Tests were not weakened to hide these failures.

The mechanism validator's full output is identical to the reviewed source branch after path normalisation: legacy FM/PM/SM contract issues remain. No new PM4/PM5 or hypothesis errors are introduced.

The food validator retains the existing broccoli/sulforaphane qualitative display-status failure (reported in two checks) and advisory food-copy/table warnings. Broccoli and the food validator are unchanged from main. Nutrient quantities, serving sizes and nutrition panels were not repaired in this release.

Full production build: **PASS**, exit 0, with `SEC_BASE_REF=github/main NODE_OPTIONS=--max-old-space-size=4096 npm run build`. Server compiled in 3.06 minutes and client in 6.23 minutes; full static generation completed. No build configuration or test rule was relaxed. The build includes the phenylalanine page successfully.

Built-release browser checks covered PM4, PM5, BRS5 PM5 and the PM9 hypothesis. Plant/animal food groups, verified/provisional distinction, small red icons and the precise combined warning above all six atoms were verified. Resistant-starch preparation context, FOS/GOS review status and the provisional apple/pectin target remain correct. The hypothesis is visibly Unestablished and immediately precedes Scientific Findings.

Browser console limitation: React hydration-recovery error #418 occurs on the built pages and was independently observed on the current live PM5 page. Its root cause is not isolated; do not claim an error-free runtime or that code equality proves the same cause. Functional controls worked after recovery. No unrelated shared-rendering fix was attempted.

The build reported 3,250 anchor warnings: 3,149 targets exist in the actual static HTML and 88 further targets were verified in the hydrated ADHD biological-evidence tab. All 13 remaining missing targets originate from unchanged main pages containing the same old links. PM4/PM5, SCFA and hypothesis Finding/reference anchors exist. Details are in the anchor audit JSON.

The main client asset is 29,669,210 bytes uncompressed (estimated gzip 3,673,619); the live main asset is already 25,139,980 bytes uncompressed. No performance redesign was attempted.

## Deployment gate and rollback

The live origin is served by Netlify, confirmed by HTTP headers. The repository has no GitHub Actions workflows or recorded GitHub deployment/check-run configuration identifying the deployment linkage. `netlify.toml` sets a 4 GiB heap, but does not declare the actual dashboard build command, publish directory or production branch. The Netlify dashboard is logged out, so those settings remain unverified.

Before approval to merge/deploy, verify the Netlify site/repository binding, production branch, command, publish directory and explicit accessible SEC_BASE_REF. The local release build supplies SEC_BASE_REF explicitly; the hosted build needs an equivalent configured published baseline. Do not use the generic Docusaurus deploy command as an assumed Netlify deployment route.

Record the currently published Netlify deploy ID before release. Roll back by restoring that published deploy in Netlify; if needed, revert the approved release merge through normal Git history. Preserve research/release branches. No reset or force-push.

Integration result: **validated with explicit inherited limitations**. The **live deployment gate remains incomplete** until authenticated Netlify settings are verified and the documented limitations are reviewed. Proposed merge is this release branch into main only after that gate and explicit user approval.

No merge into main or production deployment has been performed. Main is preserved. An explicit user approval remains required after release checks and deployment configuration verification.
