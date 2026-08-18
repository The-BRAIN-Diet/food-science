# Food page audit schedule (3 letters / day)

Canonical checks follow `system/food-page-schema.md`. Each weekday, audit one batch of food pages grouped by **title first letter**.

**Default runtime: localhost** on your current checkout (e.g. `paul12`). Edits stay on this machine until **you** push to update live.

**Epoch:** 2026-06-24 = Day 1 (**A, B, C**). The cycle repeats every 9 days.

| Cycle day | Letters | ~Pages |
| --------- | ------- | ------ |
| 1 | A, B, C | 51 |
| 2 | D, E, F | 12 |
| 3 | G, H, I | 8 |
| 4 | J, K, L | 16 |
| 5 | M, N, O | 20 |
| 6 | P, Q, R | 16 |
| 7 | S, T, U | 32 |
| 8 | V, W, X | 9 |
| 9 | Y, Z | 1 |

Letters with no foods (e.g. **I**, **U**, **X**, **Z**) are still in the rotation for a stable calendar.

## Local chron (recommended)

Cursor’s scheduled **Automations run in the cloud** (separate GitHub checkout). That is why the earlier job could fix pages but not get them onto your laptop. Prefer a **macOS LaunchAgent** on this repo:

```bash
# Install weekdays 12:30 (Mac local time) → this checkout
npm run food:audit:install-local-cron

# Run the same job once now
npm run food:audit:local

# Remove the LaunchAgent
npm run food:audit:uninstall-local-cron
```

What the local job does:

1. Runs `bash scripts/run-food-audit-today.sh` in **this** working tree  
2. Logs under `.food-audit-logs/`  
3. If anything fails: macOS notification + writes `.food-audit-logs/open-in-cursor-prompt.md` for a local Agent fix  
4. You fix on localhost → commit → push when ready (live updates from here)

**Turn off** the Cursor Cloud Automation named **“Food pages — 3-letter daily audit”** in Agents → Automations so it does not keep running in the cloud.

## Commands

```bash
# Smoke-test tooling
npm run food:audit:smoke

# Today's batch
npm run food:audit:today
bash scripts/run-food-audit-today.sh

# Local chron entrypoint (same as LaunchAgent)
npm run food:audit:local

# Full 9-day table + slug lists
npm run food:audit:schedule

# Force a letter batch
node scripts/food-page-letter-audit.mjs --letters D,E,F

# Editorial record schema (does not rewrite pages or start a batch)
node scripts/food-page-letter-audit.mjs --schema
```

## What the audit checks

Canonical structure (`system/food-page-schema.md`):

- Canonical section order (Overview → Key Nutritional Highlights → Food Context → Recipes → Substances → References)
- 3–6 Key Nutritional Highlights bullets
- Required components (`<FoodRecipes />`, `<NutritionTable />`, `<FoodSubstancesFromTable />`)
- **References display:** bibliographic core is `[n] Author(s) (Year). [title](#citationKey)`; food pages may append a concise food-specific finding. Do not replace that core.
- Essential Amino Acid Profile when protein ≥ 5 g/100 g

Editorial records (`system/food-page-letter-audit-schema.md`) are a **separate** letter-audit output:

- `role`, `meaningful_reference_count`, `evidence_types`, distinctive story or inclusion reason, missing research, material destined for a Substance page or future BRS Matrix, `recommended_depth`
- Citation correctness and citation relevance are separate
- The citation relevance queue is attached when present; do not replace those citations in a mechanical pass
- Schema updates and canonical validation **do not** fill records or begin the next letter batch
- Dump the schema: `node scripts/food-page-letter-audit.mjs --schema`

## Local Agent prompt (when the notification fires)

> Working directory: this `food-science` checkout on the current branch. Run `bash scripts/run-food-audit-today.sh`. Fix only today’s letter-batch pages to `system/food-page-schema.md` (example: `docs/foods/dark-chocolate.md`). Re-run until OK. Commit/push from this machine when you want live updated — do not use cloud Automations for this job.

## Cloud Automation (not recommended for this job)

Only use a Cursor scheduled Automation if you intentionally want a **cloud** checkout. That path needs push/PR credentials and will not edit your localhost `paul12` tree. Prefer the LaunchAgent above.
