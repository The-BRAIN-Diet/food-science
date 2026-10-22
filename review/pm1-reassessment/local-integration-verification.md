# PM1 local canonical integration

Date: 2026-10-18. Local isolated checkout only; no commit, push or deployment.

## Acceptance route

`http://localhost:3005/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation`

Confirmed from the canonical filename, absent slug override, and Docusaurus's generated route. The requested `amino-acid-substrate-availability` route is not the repository's current canonical slug. The calibration preview is not the acceptance target.

## Integration

- Applied the reviewed draft to the actual canonical PM1 MDX file using the existing Findings generator, layout transform, components and SEC registry.
- Existing confidence fields remain unchanged. Six Findings pin exact version-2 assessments; all version-1 records and the original PM source remain available.
- Extended the existing explicit SEC PM allowlist by PM1 only. No new renderer, CSS, global MDX override or schema field.
- Six-atom dietary records, KC decisions and original paper numbering preserved. Tyrosine dietary admission remains Unset.
- No selected SOPs or lifestyle levers. The qualified beef-preparation experiment remains F5 evidence; its unapproved intervention disposition is explicitly recorded in its version-2 audit limitation and history. No intervention or food-strategy identity registered.

## Focused checks

- PM1 canonical/reassessment/layout tests: 33 passed.
- SEC compatibility and dietary traceability tests: 49 passed.
- Canonical integration tests rerun: 5 passed (included in the 33, not additional tests).
- `node scripts/check-sec-assessments.mjs HEAD`: valid, 61 snapshots. A call without an explicit baseline correctly refused to run; the gate was not relaxed.
- `git diff --check`: passed.
- Development compilation: succeeded in 5.19 minutes; subsequent watcher errors reported `EMFILE`.

## Browser findings and incomplete acceptance

Before restart, real clicks opened the older preview's 1.1 and nested 1.1.1 correctly, including food rows. The reported inert-dropdown state was not reproduced. The canonical route demonstrably showed stale original four-Finding content despite the updated six-Finding local source. Its server working directory was verified, then only port 3005 was restarted with the existing checkout-local cache.

After compilation, browser reload/selection timed out. No browser acceptance is inferred from successful compilation or static tests. Light/dark/mobile, canonical nested six-atom clicks, food navigation, eight-level colours and SF-to-audit navigation still require a successful live browser pass. No speculative shared-handler change was made.

`scripts/pm1-canonical-browser-check.mjs` provides the live click regression: actual parent and nested disclosure clicks, visible-panel checks, input evidence open/close and parent-isolation checks. It is added but not yet successfully executed against the rebuilt canonical route.

The existing layout promotes canonical dietary group 3.1 to visible 1.1, with its child 3.1.1 rendered as 1.1.1 and its canonical identity preserved in DOM metadata. These are the same disclosure, not two primary dietary inventories.
