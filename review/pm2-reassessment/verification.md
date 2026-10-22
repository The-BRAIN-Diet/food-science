# PM2 local verification

Date: 2026-10-19. Checkout: `work/sec-pm1-reassessment`, branch `codex/pm1-stage2ab-sec-reassessment`. This is the existing isolated checkout, not production. No commit, push, PR or deployment.

## Focused tests

`node --test scripts/pm2-reassessment.test.mjs scripts/sec-assessment-integration.test.mjs scripts/dietary-lever-traceability.test.mjs scripts/scientific-finding-presentation.test.mjs scripts/pm1-canonical-integration.test.mjs`

70 tests passed, 0 failed. Covers PM2 canonical MDX compilation, Finding/assessment identity and exact propositions, totals/status, immutable history, matching mechanism labels and counts, six-atom/KC preservation, reference integrity, existing disclosures and PM1 compatibility. Existing React `class`/`className` warning remains; it was not repaired in this task.

`node scripts/check-sec-assessments.mjs HEAD`: passed, 69 immutable snapshots. Also validated append-only preservation against the exact 61-snapshot working-tree baseline, not only HEAD.

`git diff --check`: passed.

## Wider legacy test

`node --test scripts/brs1-fm1-stage2b.test.mjs`: fails at line 66, an inherited PM1 assertion expecting the amino-acid-quality KC disposition `established`, receiving `undefined`. It fails in the PM1 branch before reaching PM2. PM1 is hash-identical to the starting snapshot. No test weakened and no PM1 scientific data changed.

## Browser / server

Only this checkout's port-3005 server was restarted after the browser confirmed stale PM2 content. Uses existing `docusaurus.sec-v1.config.ts` and writable `.cache/sec-v1-webpack`; no cache deletion, shared permissions or system-limit changes. Initial compilation succeeded in 53.66 seconds, followed by a successful 48.10-second incremental compilation. Existing EMFILE file-watcher warnings persist.

Actual canonical route: `http://localhost:3005/docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation`.

Browser eventually displayed the current full title, `4. Mechanistic Basis + Scientific Findings (SFs 2)`, matching SF labels and the SF2 `5/8 · Moderate · Provisionally assessed` indicator. Actual clicks expanded 1.1 and 1.1.1, then the meal-composition disclosure; all six fields and the corrected description were visible. SF2's audit link navigated to the exact version-2 assessment anchor. Remaining visual results are recorded in the final report; no production rendering claim follows from static tests alone.

Final browser result: the version-2 audit opened with the exact proposition, Directness 2/2, Bias Protection 1/2, Precision 1/2 and Replication 1/2; raw/adjusted totals 5/8, source links and prior-version history were visible. Evidence review remained `Review status not recorded`; correction status remained `Status unavailable`. A real click collapsed the assessment again. Screenshot: `pm2-evidence-audit.png`. Dark desktop layout was inspected; mobile/light-mode acceptance was not separately exercised in this pass. Initial browser-tool timeouts occurred during compilation, followed by successful verification without another server restart.

## Changed files in this task

- Canonical-shaped PM2 MDX in the isolated checkout.
- `src/lib/secAssessments.mjs`: only explicit PM2 allow-list addition, authorised by the user.
- `system/sec-assessments/registry.json`: append-only PM2 records; no existing snapshot changed.
- `scripts/pm2-reassessment.test.mjs`: eight focused regression tests.
- `scripts/apply-pm2-reassessment.mjs`, `scripts/finalize-pm2-assessment-links.mjs`: guarded one-time local projections; do not rerun over an integrated page.
- `review/pm2-reassessment/`: baseline page, baseline assessment registry, preservation manifest, scientific report and this verification record.

Scientific review still required before publication: corrected directional interpretation, scope-qualified SF2 synthesis, and whether a separate exact enriched-protein protocol should be admitted. No new SOP/lifestyle or food-strategy identity was registered. Reference PMs, shared instructions, accepted atom/KC data and generated food mappings pass preservation checks.
