# Changed-file manifest

Base: `110a26bc52663ba6a2e5bdd1a02e4014278b5233`, incorporating integration `96b08913b917fffb8c96862ac4aab50a46a8d4fe` and the committed approved PM5 corrections.

Tracked changes:

```
M	scripts/food-target-reconciliation.test.mjs
M	static/bibtex/BRAIN-diet.bib
M	system/food-target-research.json
M	system/generated/dietary-food-targets/cursor-repair-queue.json
M	system/generated/dietary-food-targets/cursor-repair-summary.md
M	system/generated/dietary-food-targets/manuscript-rollup-brs4.json
M	system/generated/dietary-food-targets/manuscript-rollup-brs5.json
M	system/generated/dietary-food-targets/reconciliation.json
M	system/generated/dietary-food-targets/research-ledger-reconciliation.json
```

New implementation and review files:

- `scripts/run-rapid-stage2ab.mjs`: explicit PM/input adjudication gate, inventory, six-BRS shards, manuscript and food roll-ups, deduplicated whole-inventory repair tasks.
- `scripts/rapid-stage2ab.test.mjs`: ten focused manuscript-extraction/preservation/rendering regressions.
- `scripts/rapid-food-display-check.mjs`: verification harness using the actual existing client disclosure module and canonical mapping records.
- `system/rapid-stage2ab-2026-10-23/adjudications.json`: 64 explicit PM dispositions, 26 retained input relationships, eight selected practices, six EAA research tasks.
- `system/rapid-stage2ab-2026-10-23/source-verification.json`: source-to-claim verification records with publication kind, exposure/measurement boundaries and limitations; no new scores.
- `review/rapid-stage2ab-2026-10-23/`: generated inventories, batch reports, admission reconciliation, datasets, queue, browser/compilation evidence, validation logs and synthesis.

Generated BRS input mapping snapshots and the general food-strategy cache are ignored build artifacts, regenerated locally. The diagnostic client copies and baseline mapping snapshots are review artifacts, not new canonical code or scientific records. PM5 compilation also regenerated two untracked diagnostic HTML files under its existing review directory.

No canonical PM, food, substance, registry, mission, Scientific Finding, KC, SEC/CC or governance file was changed. The sole canonical reference correction is the existing Mora PMID. Composition proposals are research-ledger entries, not ontology edges.
