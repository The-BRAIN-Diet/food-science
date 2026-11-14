# Recovery completion — 14 November 2026

Backup, not publication approval. Original checkouts and indexes retained. No regeneration was run in a source checkout. No merge, PR update or deployment. Recovery commits carry skip-ci and skip-netlify markers.

## Verified Git and preview state

- GitHub main: `f0845f3a29e078bc63f613e8baec6b889e716285` (PR #233 merge).
- Draft PR #243: `37adc6b180f27a946688ee0274d5f2c16e9ec012`; remains open and unchanged.
- Main/PR merge base: `8415b0cead710ead990a8c0c8f2a42441ff844f6`; main-only 1 commit, PR-only 4 commits. PR is not based on the latest main tip.
- Cursor startup commit `9d9159d865dc830555e6451a24af02deea8eb3f7` was local-only; now an ancestor of the Cursor backup.
- Local preview PID 14154: Python http.server, 127.0.0.1:3191; working directory `/Users/paulhouston/Documents/Codex/2026-10-22/we-x20/sync-recovery/combined-local/static`. Static assets only, not a complete Docusaurus PM server.
- Candidate remains detached at `af13bec172b5938098a46f85c06523b8a20e90dc`; backup refs do not move its HEAD. At entry: 243 collapsed status entries / 504 individual paths; after authorised startup and renderer fixes: 249 collapsed entries. This intentionally remains dirty; backups were created using separate indexes without resetting/staging the original index.

## Source checkout inventory

Counts below expand untracked directories; they are not directly comparable with collapsed `git status --short` counts.

| Absolute checkout | Original branch | Original HEAD | Changed paths at inspection |
|---|---|---|---|
| `/Users/paulhouston/Documents/Codex/2026-10-22/we-x20/work/rapid-stage2ab` | `codex/rapid-stage2ab-manuscript` | `110a26bc52663ba6a2e5bdd1a02e4014278b5233` | 151 |
| `/Users/paulhouston/Documents/Codex/2026-10-22/we-x20/sync-recovery/combined-local` | `DETACHED` | `af13bec172b5938098a46f85c06523b8a20e90dc` | 504 |
| `/Users/paulhouston/Documents/Codex/2026-10-22/we-x20/work/brain-diet-v1-quantitative` | `review/brs5-pm4-sec-assessment` | `521036b1d6c212e58c660f0f985e47617a71a716` | 6293 |
| `/Users/paulhouston/Documents/Codex/2026-10-22/we-x20/work/brs4-pm4-pm5-reassessment` | `codex/brs4-pm4-pm5-reassessment` | `a850e10126ad5c4bd290439fbcc72c2eae07f6a7` | 30 |
| `/Users/paulhouston/Documents/Codex/2026-10-22/we-x20/work/brs5-kc2-focused-reassessment` | `codex/brs5-kc2-focused-reassessment` | `1884c7ae0f46a152e2502bb8d4dd6276a0276a7e` | 70 |
| `/Users/paulhouston/Documents/Codex/2026-10-22/we-x20/work/brs6-fm4-github-review` | `codex/brs6-fm4-endocrine-review` | `297b88fc422aaf34f30616129be5b41d716bd18d` | 0 |
| `/Users/paulhouston/Documents/Codex/2026-10-22/we-x20/work/deferred-stage2ab` | `codex/deferred-stage2ab-enrichment` | `d3570391e7a6e3de40c57af784683cd13bd2370a` | 51 |
| `/Users/paulhouston/Documents/Codex/2026-10-22/we-x20/work/food-wheel-publication` | `release/food-wheel-canonical-2026-11-07` | `bad5cab52a00b7d39a7b675eab868b0d871c3c47` | 3113 |
| `/Users/paulhouston/Documents/Codex/2026-10-22/we-x20/work/food-wheel-top-ten` | `audit/dietary-connectivity-2026-11-09` | `af13bec172b5938098a46f85c06523b8a20e90dc` | 1427 |
| `/Users/paulhouston/Documents/Codex/2026-10-22/we-x20/work/food-wheel-top-ten-amino` | `experiment/food-wheel-top-ten-2026-11-09` | `4be84e79bb22ed3dda660e5b81e5381feffc22d1` | 0 |
| `/Users/paulhouston/Documents/Codex/2026-10-22/we-x20/work/recipe-matrix-preview` | `release/recipe-matrix-preview-2026-11-09` | `ac5ffca6629550b850998b38b676142182e92b43` | 16 |
| `/Users/paulhouston/Documents/Codex/2026-10-22/we-x20/work/release-reviewed-framework` | `codex/dietary-recovery-canonical-release-2026-10-27` | `11f4e450704b3144ab39b8ddb104bf5ca18d4bba` | 50 |
| `/Users/paulhouston/Food Science/food-science` | `feature/taurine-brazil-nuts-qc-register-2026-11-13` | `9d9159d865dc830555e6451a24af02deea8eb3f7` | 2 |
| `/Users/paulhouston/Documents/Codex/2026-10-22/we-x20/work/food-target-integration` | `codex/food-target-integration` | `96b08913b917fffb8c96862ac4aab50a46a8d4fe` | 0 |
| `/Users/paulhouston/Documents/Codex/2026-10-22/we-x20/work/brs5-scfa-controlled-test` | `codex/brs5-scfa-controlled-test` | `110a26bc52663ba6a2e5bdd1a02e4014278b5233` | 35 |

## Required coverage

All items below are now retrievable from GitHub, sometimes on different source-state branches. They have not been silently combined into one publication-ready tree. PR #243 comparison: 81 changed files; candidate had 4 identical, 68 different and 9 absent. Full per-file blob comparison is attached.

| Work | Source and verified contents | Classification / location |
|---|---|---|
| Brazil nuts | PR food commit 97335940: FDC 170569, selenium 1,917 µg/100 g, documented-unranked composition edge; two WebP images; original PNG additionally backed up | Already on GitHub; source originals now in `recovery/20261114-food-science` |
| Cloves | Same food commit: dried-bud quercetin 28.4 mg/100 g with source qualifications, composition-only edge; two WebP images; original PNG | Already on GitHub; source originals now in `recovery/20261114-food-science` |
| Capers | Phenol-Explorer/Inocencio mean 32.82 mg/100 g, n=17, assay identity and recipe note. PR contains its proposed changed publication pin; candidate retains its different pin | Both versions preserved, `recovery/20261114-food-science` / `recovery/20261114-combined-local`. No new pin approved |
| Plant/animal grouping | Exact ANIMAL_FOOD_IDS in src/data/documentedFoodSources.mjs replaces substring matching | PR #243 and candidate; both preserved |
| Shared Explorer theme | static/explore/view-theme.mjs and all three viewers, from 37adc6b1 | PR #243 / `recovery/20261114-food-science`; absent from older candidate, not overwritten |
| Generated viewers | Food Intelligence data, pm-sources.json, wheel JSON/SVG/HTML, source hashes, frozen ranked source data | Differing exact historical versions preserved in both branches, with manifests; no regeneration substituted |
| Mapping refresh | src/data BRS indexes, system/generated pathways, BRS rollups, reconciliation outputs | All existing bytes preserved, including normally ignored generated datasets |
| Seven wording edits | dietary-input-traceability-contract, food-page-schema, input-substance-food-mapping, primary-mechanism-schema, scientific-finding-schema, substance-food-mapping-format, substance-page-schema | Exact PR #243 wording preserved in `recovery/20261114-food-science`. Candidate variants separately preserved in `recovery/20261114-combined-local`; not reconciled by choosing newest |
| Startup | 9d9159d8 adds --skip-ranked-food-wheel only to prestart; production path remains | `recovery/20261114-food-science` ancestry; narrow equivalent installed and separately committed in `recovery/20261114-combined-local` |
| Test repairs | Cursor compact-pm-explorer pectin expectation and ESM module-loader shims in pm-documented-food-sources | Previously local-only, now `recovery/20261114-food-science`; remaining assertion failures reported below |
| Scientific recovery | Existing five: PM9 mitochondrial, BRS6 PM8 urolithin, BRS5 PM1, ECS PM3 genistein, BRS1 PM11 taurine. Four new: plant variety, arginine/creatine, dietary PE, androgen deconjugation | All nine canonical records in `recovery/20261114-combined-local`. Androgen stress rationale, linked question and Unestablished complete-chain limitation retained |
| Other work | Older worktree source changes, review reports, original snapshots, mapping exports, recipe diagrams, local shared-data refactor, source observations and recovery overlays | Separate worktree branches and reconciliation-evidence branch; no scientific conflict silently resolved |

## Backup commits

Each source-state commit contains `recovery/20261114-working-state.json` with original checkout/HEAD and per-file SHA-256. Four oversized historical JSON files are losslessly gzip-compressed and identified in that manifest; no averages or regeneration. The candidate startup amendment has its own manifest.

| Recovery branch | Full pushed commit |
|---|---|
| [recovery/20261114-rapid-stage2ab](https://github.com/The-BRAIN-Diet/food-science/tree/recovery/20261114-rapid-stage2ab) | `eb67615caf314c4d537c1bc2add69c02ff776fd7` |
| [recovery/20261114-combined-local](https://github.com/The-BRAIN-Diet/food-science/tree/recovery/20261114-combined-local) | `c9730cc2d0b9a7ca8f518c05bfc410e7cfe4194d` |
| [recovery/20261114-brain-diet-v1-quantitative](https://github.com/The-BRAIN-Diet/food-science/tree/recovery/20261114-brain-diet-v1-quantitative) | `95ea448716a9da82e6b425423935c90121753274` |
| [recovery/20261114-brs4-pm4-pm5-reassessment](https://github.com/The-BRAIN-Diet/food-science/tree/recovery/20261114-brs4-pm4-pm5-reassessment) | `ec7c3e7a3bb591e4d27313797cd705a50851143b` |
| [recovery/20261114-brs5-kc2-focused-reassessment](https://github.com/The-BRAIN-Diet/food-science/tree/recovery/20261114-brs5-kc2-focused-reassessment) | `37ab37ab3d5c273d82422648462d58859c83b2da` |
| [recovery/20261114-deferred-stage2ab](https://github.com/The-BRAIN-Diet/food-science/tree/recovery/20261114-deferred-stage2ab) | `bbee350b2d17f48f11b65f3dc1c5ef74cb1020d1` |
| [recovery/20261114-food-wheel-publication](https://github.com/The-BRAIN-Diet/food-science/tree/recovery/20261114-food-wheel-publication) | `0ba9e424f01282b4c548bb8e306e6832312f2073` |
| [recovery/20261114-food-wheel-top-ten](https://github.com/The-BRAIN-Diet/food-science/tree/recovery/20261114-food-wheel-top-ten) | `f4d0704eb3b24892d0dc6d84399984db018e7211` |
| [recovery/20261114-food-wheel-top-ten-amino](https://github.com/The-BRAIN-Diet/food-science/tree/recovery/20261114-food-wheel-top-ten-amino) | `cb03e4498bb5742ba5f3f6d37b878011b942b1a0` |
| [recovery/20261114-recipe-matrix-preview](https://github.com/The-BRAIN-Diet/food-science/tree/recovery/20261114-recipe-matrix-preview) | `079d484bb017ff70359c288cab423900cf71eb93` |
| [recovery/20261114-release-reviewed-framework](https://github.com/The-BRAIN-Diet/food-science/tree/recovery/20261114-release-reviewed-framework) | `d29526e063630016a42d864ce138444ab53dc2ac` |
| [recovery/20261114-food-science](https://github.com/The-BRAIN-Diet/food-science/tree/recovery/20261114-food-science) | `6a79296bfd94d9b128b15d1a81265095345cd2b9` |
| [recovery/20261114-brs5-scfa-controlled-test](https://github.com/The-BRAIN-Diet/food-science/tree/recovery/20261114-brs5-scfa-controlled-test) | `1f217713b37f4e76b9349892afa72e7d5da1c3f0` |
| [recovery/20261114-wheel-renderer-repair](https://github.com/The-BRAIN-Diet/food-science/tree/recovery/20261114-wheel-renderer-repair) | `bbac659eba841c72c008d662708588c6716791f8` |

## Focused validation and preserved blockers

- Four installed hypotheses: 6/6 focused tests; sync validator 0 problems.
- Graph/admission isolation: 3/3 targeted tests passed. No accepted food/causal edges introduced by hypotheses.
- Wider hypothesis suites: 18/22 pass. Four existing PM1/PM9 preservation/placement baseline failures remain; not repaired by rewriting canonical records. They do not establish defects in the four newly installed hypotheses.
- Cursor Explorer/documented-source tests: 15/19 pass. Module-loader exception fixed. Remaining assertions: nine-system/67-PM coverage, methionine/betaine expectations, all-scope counts, four-source refresh. These require source/fixture reconciliation; no blanket scientific classification inferred from a failed assertion.
- Candidate startup regression tests: 2/2 passed. Production checks and both ranking-writer invocations remain in the non-startup path.
- Isolated Cursor runtime: npm start -- --help ran actual prestart successfully; all 15 ranked/wheel file hashes unchanged. A separate actual npm start reached Docusaurus server startup and client compilation; stopped after bounded test before HTTP readiness. Again all 15 hashes unchanged. This does not certify a fully rendered dev build.
- Production regeneration tested separately in isolated copy: ranked generator ran (158 targets, 112 covered, 984 connections, 79 foods); renderer then failed at undefined.category. Same snapshot bytes were regenerated; no source checkout or frozen snapshot replaced. Full production build not run.

## Exact production-generation diagnosis

First missing SVG inventory key: **quercetin**; second latent key: **genistein**. Both canonical registry identities exist; no alias mismatch.
Main f0845f3a has 68 SVG nodes / 76 embedded inventory records and no missing SVG identities. Food commit 97335940 adds the two layout nodes (70 total) without adding them to index.html embedded DATA.network.inventory (still 76). PR head and startup commit retain that mismatch.
build-food-wheel-top-ten.mjs reads embedded DATA from index.html. build-food-wheel-unranked.mjs separately adds quercetin/genistein as composition-only nodes to display-network.json (78 records) with existing Distinctive display metadata. The ranked renderer receives the older inventory and unconditionally reads s.category for every SVG entity.
Classification: inconsistent generated/embedded input layers plus missing renderer validation; not missing canonical biology or a need for new admissions. Smallest prospective repair is to make the renderer explicitly handle template-only composition nodes using the existing qualified display inventory/metadata, with named validation for absent metadata, preserving ranked output and composition-only status. Do not silently remove nodes or fabricate categories. This diagnosis was preserved before the subsequently authorised repair described below.

## QC suspension and publication boundaries

The cross-framework hypothesis/QC release gate remains provisionally suspended as directed, pending separate scientific reconciliation and validation. Its code, historical decisions and diagnostics are preserved. Gate code and publication-pin bytes match their respective source snapshots. No gate re-enabled and no content edited to satisfy its assumptions.
Unavailable: a trustworthy cross-framework QC release-blocking verdict; a completed production build; HTTP/browser verification of the bounded new dev-server run. Focused tests are not a substitute for these.
Suspension is not admission approval, rejection of a substance, promotion of held evidence, or permission to create accepted graph edges. Admissions remain PM-role/context-specific.
Outstanding publication decisions: reconcile differing candidate/PR source versions; review capers publication pin separately; review the separately backed-up renderer repair and ranking delta; classify residual stale fixtures versus genuine discrepancies; validate the suspended QC gate separately before restoring release blocking.

## Intentional local-only exclusions

No source work was discarded. Build/compiler caches, machine files, ordinary compilation logs and explicitly local-only Training/QA data remain on disk. In particular Cursor src/data/framework-qc-register.generated.json remains local under INTERNAL-DOCS.md; its generator, fallback and rule history are backed up. These exclusions are enumerated in manifests.
Credential-pattern screening found no matches in files selected for backup. Recovery archives were copied as source-only tar files with member hashes; original complete archives, including excluded caches, remain untouched locally.
Original sources were content-verified against backup Git blobs. The backup is not a unified release tree: Brazil nuts/cloves and shared-theme changes remain absent from the older candidate preview, but are fully retrievable from PR #243 and the Cursor backup. No work is declared superseded without exact equivalence.

## Reproduction

Fetch the named recovery branch; inspect recovery/20261114-working-state.json and compare blobs/hashes. Use the historical source commit in that manifest for original context. Do not run generators before comparing archived outputs. Decompress .json.gz historical snapshots losslessly when needed. Local preview remains http://127.0.0.1:3191/explore/food-wheel/.

## Subsequently authorised pipeline repair — verified

The author approved repair after the initial diagnosis. Shared template validation now names missing inventory IDs, missing existing category metadata and missing food-link positions. It does not invent a category. The two composition-only layout groups are explicitly marked in the Cursor template. Ranked rendering omits only explicitly marked, unreferenced layout-only nodes absent from that view’s inventory; any actual relationship to a missing identity still fails by name. Combined rendering retains both nodes using the existing unranked inventory. No canonical identity is deleted.

- `recovery/20261114-wheel-renderer-repair` is based on the preserved Cursor state. It contains the exact 70-node template repair, code/tests, and isolated generated results under `recovery/20261114-renderer-repair/`, not as active publication outputs.
- The shared validation/caller fix is also applied locally and backed up on the candidate branch. Its existing 68-node template is retained; no new scientific node was imported into the older candidate.
- Combined generation now validates before writing JSON/SVG, avoiding a half-written output on validation failure.
- Renderer tests: 8/8 on both candidate and isolated Cursor data. Combined candidate suite: 16/16 (renderer, startup, four hypotheses); hypothesis sync 0 problems.
- Production regeneration and the documented-unranked generator both complete in the isolated Cursor-derived copy. This is generation validation, not a complete production build or browser sign-off.
- Snapshot bytes unchanged: saved ranked snapshot remains 984 edges, 79 foods, 112/158 covered targets. Comparing with the frozen embedded wheel (1,015 edges): 20 added, 51 removed, 56 shared edges with changed rank/power/observation. The complete edge IDs are attached. This existing divergence is not approved for publication by fixing rendering.
- Quercetin/genistein: zero ranked edges; 11 composition-only associations remain unranked with no RSP/rank. Existing metadata is reused, not fabricated.
- All 35 backed-up candidate static files were checked byte-for-byte unchanged. No preview snapshot replaced. Cursor original worktree remains unchanged.
- Cross-framework QC gate remains suspended. No gate, admission, SEC, canonical quantities or publication pins were changed by this repair.

## Remote verification

All 14 source/repair recovery refs resolve to their recorded full SHAs. The evidence/report branch is additional. Both Brazil nuts and cloves pages, medium/thumb WebP images, original PNGs and mapping records were verified in the remote-named Cursor backup commit. GitHub main and PR #243 remain exactly at their initial SHAs. No PR was opened/updated, merged or deployed.
