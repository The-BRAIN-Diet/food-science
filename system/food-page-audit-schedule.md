# Food page audit schedule (3 letters / day)

Canonical checks follow `system/food-page-schema.md`. Each weekday, audit one batch of food pages grouped by **title first letter**.

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

## Commands

```bash
# Today's batch (from epoch) — preferred
npm run food:audit:today

# Wrapper for automations (npm script or direct node fallback)
bash scripts/run-food-audit-today.sh

# Full 9-day table + slug lists
npm run food:audit:schedule

# Force a letter batch
node scripts/food-page-letter-audit.mjs --letters D,E,F

# Simulate another date
node scripts/food-page-letter-audit.mjs --date 2026-06-20
```

## Cursor Automation / cloud agent environment

Scheduled agents must use the **`The-BRAIN-Diet/food-science`** repo with working directory at the **repository root** (where `package.json` and `docs/foods/` live).

| Issue | Cause | What to do |
| ----- | ----- | ---------- |
| `npm run food:audit:today` missing | Branch checked out before audit scripts were merged | Run `bash scripts/run-food-audit-today.sh` or `node scripts/food-page-letter-audit.mjs` |
| Audit scripts missing entirely | Stale or shallow checkout | Pull latest `paul12` (or target branch); confirm `scripts/food-page-letter-audit.mjs` exists |
| `git push` fails (HTTPS token / SSH key) | Cloud sandbox has no GitHub credentials | **Commit locally**, report the commit hash in the run summary, and stop — do not retry push |
| Fixes not visible locally | Agent committed on ephemeral checkout without push | Re-run audit on the letter batch and re-apply fixes, or cherry-pick if hash is available |

**Required committed files for a working automation checkout:**

- `package.json` — `food:audit:today`, `food:audit:schedule`
- `scripts/food-page-letter-audit.mjs`
- `scripts/lib/food-page-letter-schedule.mjs`
- `scripts/lib/food-page-validation.mjs`
- `system/food-page-audit-schedule.md`

Until these are on the branch the automation checks out, agents should use the **direct node** command or `bash scripts/run-food-audit-today.sh`.

**Push policy for automations:** local commit only when credentials are absent. A human merges or pushes from a credentialed machine.

## What the audit checks

- Canonical section order (Overview → Key Nutritional Highlights → Food Context → Recipes → Substances → References)
- 3–6 Key Nutritional Highlights bullets
- Required components (`<FoodRecipes />`, `<NutritionTable />`, `<FoodSubstancesFromTable />`)
- **References:** every bullet must link to `/docs/papers/BRAIN-Diet-References#citationKey`
- Essential Amino Acid Profile when protein ≥ 5 g/100 g

## Suggested daily agent prompt (lunch review)

Use this in a Cursor Automation or manual Agent run:

> Working directory: `food-science` repo root (`The-BRAIN-Diet/food-science`). Run `bash scripts/run-food-audit-today.sh` (or `npm run food:audit:today`). For each failing page, bring it up to the canonical schema in `system/food-page-schema.md` (use `docs/foods/dark-chocolate.md` as the worked example). Replace placeholder References with bibliography-linked evidence. Do not change unrelated pages outside today's batch. If `git push` fails due to missing credentials, commit locally, note the commit hash, and stop — do not retry push.

## Cursor Automation (optional)

| Setting | Value |
| ------- | ----- |
| **Name** | Food pages — 3-letter daily audit |
| **Schedule** | Weekdays at 12:30 (your lunch time) |
| **Repo** | `food-science` |
| **Prompt** | Same as “Suggested daily agent prompt” above |

Set this up in the **Agents Window** → Automations → scheduled trigger.
