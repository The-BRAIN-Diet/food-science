# Nutrition Data Workflow: Scripts A, B, C, repair, and layer reconciliation

This document describes the **code that actually exists**. The scripts stay separate. They are not all chained by `nutrition:pipeline`.

Canonical page layers (Three Sources of Truth) are defined in `system/food-page-model.md`. This workflow implements ingestion, curated enrichment, front-matter application, repair, validation, and post-apply layer reporting. Composition/provenance classes and Intrinsic / Mechanism / Strategy are separate models.

A food page must provide a **rendered compositional representation**, not necessarily a populated USDA-shaped `nutrition_per_100g` block. Valid representations are: populated `nutrition_per_100g` (standard database composition); `nutrition_authorised_specifications` (variable or formulated specialist products); or an explicitly supported qualitative `nutrition_supplementary_sources` block. An empty `nutrition_per_100g: {}` may remain as an implementation compatibility field; it is not the compositional source or the canonical requirement.

Reconciliation scripts report; they **must not** automatically create Substance pages, invent rows, copy substitute USDA foods, or promote trace/internal records into rendered cards. Every rendered Substance card must still resolve to a rendered row in whichever valid representation the page uses.

---

## Commands that exist

| Role | npm command | Script | Writes `.md`? |
|------|-------------|--------|---------------|
| **Script A** — core USDA ingestion | `npm run nutrition:fetch` | `scripts/fetch-usda-nutrition.mjs` | No. Writes `scripts/out/<slug>.json` |
| **Script B** — overview-driven curated lookup | `npm run nutrition:enrich` | `scripts/enrich-nutrition-from-overview.mjs` | No. Writes payload + review queue JSON |
| **Script C** — apply payload to front matter | `npm run nutrition:apply` | `scripts/update-food-page-frontmatter.mjs` | Yes. Front matter only |
| **Repair** | `npm run nutrition:repair` | `scripts/repair-food-pages.mjs` | Yes. Body + selected tags/EAA |
| **Validate** | `npm run nutrition:validate` | `scripts/validate-food-pages.mjs` | No |
| **Layer reconciliation (report)** | `npm run nutrition:reconcile-layers` | `scripts/reconcile-food-page-layers.mjs` | No. Writes a report under `scripts/out/` |

---

## What `nutrition:pipeline` actually runs

From `package.json`:

```bash
npm run nutrition:apply -- --all && npm run nutrition:repair
```

That is **Script C then repair only**.

`nutrition:pipeline` does **not** run Script A (`nutrition:fetch`) and does **not** run Script B (`nutrition:enrich`). Fetch and enrich must be invoked explicitly.

---

## Script A — Core nutrition ingestion

- **Command:** `npm run nutrition:fetch`
- **Path:** `scripts/fetch-usda-nutrition.mjs`
- **Role:** Import quantitative USDA data. Does **not** infer compounds from Overview prose.
- **Source of pages:** Scans `docs/foods/*.md`. No hard-coded food list.
- **USDA resolution:** `scripts/usda-map.json` (slug → search query), else slug with dashes replaced by spaces.
- **When `USDA_API_KEY` is set:** Fetches USDA FoodData Central; inspects up to eight ranked candidates; keeps the richest mapped panel (`scripts/lib/usda-nutrient-extract.mjs`); writes `scripts/out/<slug>.json`.
- **When `USDA_API_KEY` is not set:** Builds payload from existing front matter (no fetch).
- **Do not use a substitute food.** If SR Legacy has no matching record, do not copy canola, another oil, or a related species. Skip specialist products (currently `algal-oil`) and represent source-specific authorised specifications instead of inventing a universal average.
- **Options:** `--food <slug>`, `--out-dir <dir>` (default `scripts/out`), `--foods-dir <dir>` (default `docs/foods`).

---

## Script B — Overview-driven enrichment (curated lookup)

- **Command:** `npm run nutrition:enrich`
- **Path:** `scripts/enrich-nutrition-from-overview.mjs`

**Honest scope:** Script B is a **curated lookup**, not a research or verification pipeline. It does not search the web, does not invent values, and does not treat arbitrary results as compositional evidence.

**Provenance dataset:** `scripts/data/literature-compounds.json`. As of this writing that file contains **only the salmon–astaxanthin entry**. Verified supplementary entries must be curated into this dataset **before** Script B will apply them to a payload.

**Trigger (deterministic):**

1. Preferred: front matter `overview_key_compounds`.
2. Fallback: `**bold**` phrases in `## Overview`.

**Apply rule:** If a missing Overview compound has a curated dataset entry, Script B may add it to `nutrition_supplementary_sources` on the **payload** (not the `.md` file).

**Review queue:** Unresolved Overview **identity** compounds (no rendered table match and no curated dataset entry) are written to `scripts/out/overview-enrichment-review.json`. Each item includes:

- food slug
- compound candidate
- triggering Overview text
- existing table match
- existing canonical substance match
- verification status
- proposed source
- proposed value, unit, and food basis
- decision: `verified`, `unsupported`, `ambiguous`, or `requires-review`

Letter-scope remaining work is also recorded in `scripts/out/food-layer-a-research-queue.json` using the research-queue states in `system/food-page-model.md` (presence unresolved; presence resolved but quantity unresolved; quantity resolved but ontology admission unresolved; parent/derivative mapping unresolved; canonical Substance page absent; scope or formulation ambiguity). A supported qualitative row is **not** an Overview → table gap.

**Two workflow enums remain separate.** They describe different stages and must not be collapsed into one enum:

| Stage | What it records | Values |
|-------|-----------------|--------|
| **Script B** | Evidence-verification decision for an Overview compound against the curated dataset | `verified`, `unsupported`, `ambiguous`, `requires-review` |
| **Letter audit** | Reconciliation state for remaining food–substance work | Presence unresolved; Presence resolved, quantity unresolved; Quantity resolved, ontology admission unresolved; Parent/derivative mapping unresolved; Canonical Substance page absent; Scope or formulation ambiguity |

They should eventually have an explicit mapping. They do not need to become one enum now.

Letter-audit **editorial records** (role, evidence type, recommended depth, and related fields) are a third schema in `system/food-page-letter-audit-schema.md`. They do not replace the two enums above, do not change reference rendering, and must not be pre-filled to begin the next letter batch. Citation correctness and citation relevance remain separate checks.

Script B must not fill proposed numeric values except from the curated dataset. Human review decides `unsupported` vs a later curated `verified` entry. Do not invent rows or cards from Overview mentions.

**Inputs:**

- `--all --pages-dir docs/foods --payload-dir scripts/out`
- Single page: `--page docs/foods/<slug>.md --payload scripts/out/<slug>.json`

If a payload is missing under `--all`, Script B creates one from the page’s front matter, then looks up curated entries.

---

## Script C — Apply payload to front matter

- **Command:** `npm run nutrition:apply`
- **Path:** `scripts/update-food-page-frontmatter.mjs`
- Merges nutrition-related keys from the payload into food-page front matter.
- Preserves body and all other front matter keys.
- Does not fetch USDA and does not enrich from Overview.

---

## Repair stage

- **Command:** `npm run nutrition:repair`
- **Path:** `scripts/repair-food-pages.mjs`
- Removes downstream-metabolite tags (content-boundary model).
- Inserts a missing Essential Amino Acid Profile when the protein rule requires it.
- Swaps `<FoodSubstances />` to `<FoodSubstancesFromTable />` when nutrition data is present.
- Does not fetch, enrich, or apply USDA payloads.

---

## Post-apply layer reconciliation (report only)

Run **after** Script C (and typically after repair):

```bash
npm run nutrition:reconcile-layers
```

This stage **does not silently create** canonical substance pages and **does not** promote trace database rows into the Substances list. It reports:

- Substances cards without **rendered** table rows
- important Overview **identity** compounds without rendered table rows
- verified table compounds that may require cards (editorial; not auto-admitted)
- synonym / canonical-ID resolution notes
- **proposed** missing canonical substance pages
- trace or internal database rows that must not be auto-promoted

A supported qualitative row must not be classified as an Overview → table gap. Use `node scripts/audit-food-page-layers.mjs` for letter-scope classification into the research-queue states in `system/food-page-model.md`.

Report path: `scripts/out/food-page-layer-reconciliation.json`.

`npm run nutrition:reconcile-substances` is a **different**, older bulk tool (`scripts/reconcile-food-substance-tables.mjs`). It is not this reporting stage and is not part of `nutrition:pipeline`.

---

## Recommended full run (explicit; not `nutrition:pipeline`)

```bash
npm run nutrition:fetch -- --out-dir scripts/out
npm run nutrition:enrich -- --all --pages-dir docs/foods --payload-dir scripts/out
npm run nutrition:apply -- --all --pages-dir docs/foods --payload-dir scripts/out
npm run nutrition:repair
npm run nutrition:reconcile-layers
npm run nutrition:validate
```

One food (e.g. salmon):

```bash
npm run nutrition:fetch -- --food salmon --out-dir scripts/out
npm run nutrition:enrich -- --page docs/foods/salmon.md --payload scripts/out/salmon.json
npm run nutrition:apply -- --page docs/foods/salmon.md --payload scripts/out/salmon.json
npm run nutrition:repair
npm run nutrition:reconcile-layers -- --slug salmon
```

---

## New food pages

1. Add `docs/foods/<slug>.md` with Overview and front matter.
2. Optionally add a USDA query override in `scripts/usda-map.json`.
3. Run Script A, then B, then C, then repair, then layer reconciliation, then validate.
4. Curate any verified non-USDA compound into `literature-compounds.json` before expecting Script B to apply it.

`docs/foods` remains the page inventory; no separate food-list config is required for A/B/C to see a new page.
