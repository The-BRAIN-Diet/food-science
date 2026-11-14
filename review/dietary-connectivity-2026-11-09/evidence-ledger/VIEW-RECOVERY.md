# View recovery — 9 November 2026

Scope: targeted resource diagnostics and existing view behaviour only. Scientific records, ledger evidence, selector and mappings preserved.

## Diagnosis and smallest correction

The failed Node 20.11 process used the default 2096 MiB heap limit; its fatal allocation occurred at approximately 2039 MiB. NODE_OPTIONS was unset. Existing netlify.toml already specifies --max-old-space-size=4096, TERSER_PARALLEL=1 and DOCUSAURUS_NO_PERSISTENT_CACHE=1. The recovery run reuses these settings, not an increased policy or dependency/refactoring change. Ledger files are static assets, not imports into application modules or webpack entries. Evidence supports a build-invocation resource mismatch rather than a ledger module regression; no expensive before/after full build was performed.

Recovery command:

```
NODE_OPTIONS=--max-old-space-size=4096 TERSER_PARALLEL=1 DOCUSAURUS_NO_PERSISTENT_CACHE=1 DOCUSAURUS_GENERATED_FILES_DIR_NAME=.docusaurus-ledger-validation npx docusaurus build --out-dir build-ledger-validation
```

The isolated output preserves prior localhost previews. Direct CLI avoids npm prebuild's broad mapping regeneration. It does not waive the existing dietary/snapshot publication failures documented in REPORT.md.

## Browser verification

Source previews served on localhost:3180:
- /explore/food-wheel/ — renders; salmon roe selection shows 25 existing PM connections, seven substances, 18 PMs; reset/full view retains 64 foods and 800 edges.
- /explore/food-wheel/evidence-ledger.html — wheel navigation and Back work; ten parent entries and five experimental entries appear; expanded banana shows 2.7–25.3 g per 100 g fresh weight and cultivar/ripening restrictions; apple qualitative and KC scope preserved.
- /preview/recipe-brs-matrix/ — renders; spinach selection shows six substances, 17 PMs, five systems; reset works. Five ingredients / four connected, eight substances, 35 dietary records and 21 PMs retained; kefir remains unmapped. Provenance JSON link and canonical external links remain.

One UI defect found and fixed: browsers restored a stale native dropdown after returning from the ledger while the graph reset. render() now synchronizes form controls with focus; pageshow invokes render. This does not add deep links, change ranking or rebuild data. A Node VM regression executes the actual browser script for form restoration, food/substance transitions and reset.

12 focused tests pass; presentation check passes (691 protected files). Food graph and recipe-data equality checks remain passing. Screenshots: wheel-recovery.png, ledger-recovery.png, recipe-recovery.png. Desktop browser checks only; no new mobile-specific claim.

Build result: recorded below after process completion.

## Final resource result

The 4 GiB retry passed server compilation (1.74 minutes). Client compilation remained active while available disk fell from 6.3 GiB to 1.3 GiB. The isolated build output was only 101 MiB and generated directory 64 MiB; system memory/swap pressure is the likely contributor, not verified by a system-wide scan. Stopped only the build process with SIGTERM to avoid disk exhaustion. No deletion or cleanup performed. The full production build remains incomplete. This is evidence of an existing invocation/resource constraint, not proof that the full current worktree has no other build errors. No further full-build retry until resources are available.

Standalone HTTP preview remains available on 127.0.0.1:3180. Its wheel↔ledger navigation is verified; Docusaurus /docs routes are not served by this static-only preview, so canonical ledger documentation links require a completed full site preview. Existing recipe external canonical links remain intact.

No changes to science, selector, food connections, recipe mappings, publication state or source quantities. Only wheel UI-state synchronization, its focused test and this diagnostic report were added in the recovery task. No commit, push or deployment.

Termination confirmation: SIGTERM did not complete while Node was in uninterruptible state; SIGKILL was sent to the same build PID only. Build session exited 137. Static preview server remains running.
