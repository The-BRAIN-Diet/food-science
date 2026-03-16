# Nutrition Data Workflow: Scripts A, B, C

This document defines the **three-script architecture** for ingesting, enriching, and applying nutrition data to food pages. The scripts stay separate; the workflow chains them in order.

---

## 1. Script B: existence and location

**Script B does not currently exist** and must be created.

- **Proposed file path:** `scripts/enrich-nutrition-from-overview.mjs`
- **Purpose:** Overview-driven compound enrichment (see below).

---

## 2. Script C: location

**Script C does not currently exist** and must be created.

- **Proposed file path:** `scripts/update-food-page-frontmatter.mjs`
- **Purpose:** Safely update food page front matter from the combined output of A + B.

---

## 3. Script A — Core nutrition ingestion

- **Path:** `scripts/fetch-usda-nutrition.mjs`
- **Source of truth:** Scans `docs/foods/*.md` automatically. No hard-coded food list. New food pages are picked up on the next run.
- **USDA resolution:** Uses `scripts/usda-map.json` (slug → search query). When present, the mapping overrides the default (slug with dashes replaced by spaces). Add entries to improve USDA matches (e.g. `"turkey": "turkey breast, meat only, roasted"`).
- **When `USDA_API_KEY` is set:** For each food page, fetch from USDA API; on success write/update payload in `scripts/out/<slug>.json`; on no match write a no-match payload so B/C can still run.
- **When `USDA_API_KEY` is not set:** For each food page, create or update payload from existing front matter (no fetch). Pipeline still runs end-to-end.
- **Options:** `--food <slug>` — run only for that slug; `--out-dir <dir>` (default `scripts/out`); `--foods-dir <dir>` (default `docs/foods`).
- **Responsibilities:** Standard nutrient mapping, provenance, no guessing, no literature search, no overview-driven enrichment. Prints a summary (foods detected, fetched, payloads created/updated, missing USDA match, skipped).

---

## 4. How Script B works

**Inputs:**

- With `--all`: `--pages-dir` (default `docs/foods`) and `--payload-dir` (default `scripts/out`). Script B **detects all food pages** from the directory. If a payload does not exist for a page, it **creates one from the page’s front matter** and then enriches it.
- Single-page: `--page` and `--payload` as before.

**Enrichment trigger (deterministic):**

1. **Preferred:** If the page front matter has **`overview_key_compounds`** (a list of compound names), use that list. This is the future-proof, explicit source of “key compounds to consider for the table”.
2. **Fallback:** If `overview_key_compounds` is absent or empty, extract **bold** phrases (`**...**`) from the first section under `## Overview`.

**Logic:**

1. **Read the page** – Parse front matter and body (e.g. with `gray-matter`).
2. **Get candidate compounds** – From `overview_key_compounds` if present and non-empty; otherwise from bold phrases in the Overview section. Deduplicate by normalized form (lowercase, single space).
3. **Identify table compounds** – From the payload, build the set of compounds already represented:
   - Keys from `nutrition_per_100g` mapped to display labels (via shared `NUTRIENT_LABELS` or an in-script copy).
   - Labels from existing `nutrition_supplementary_sources` (if any).
4. **Detect missing** – For each candidate, if it is not already in the table set, treat it as “missing”.
5. **Look up missing compounds** – For each missing compound, consult **approved secondary sources** (e.g. `scripts/data/literature-compounds.json`). No guessing; if no credible value is found, do not emit an entry.
6. **Deduplication** – Never add an entry whose `key` is already in `nutrition_supplementary_sources` (from the payload or from a previous run), or already added in this run. Each supplementary key appears at most once.
7. **Output** – Merge into the payload: set `nutrition_supplementary_sources` to the existing list plus any new strict entries; write the payload back to the same file.

**Output shape:** The payload file after B contains:

- `nutrition_per_100g` (from A)
- `nutrition_source` (from A)
- `nutrition_supplementary_sources` (from B; array of `{ key, label, value, unit, source_note }`)

---

## 5. How Script C safely updates front matter

**Inputs:**

- Path to the food page (e.g. `docs/foods/salmon.md`).
- **Payload** – Path to the combined JSON file (output of A + B) or stdin. Payload may contain: `nutrition_per_100g`, `nutrition_source`, `nutrition_supplementary_sources`, and optionally `protein_profile_note`, `amino_acid_strengths`, `limiting_amino_acids`, `complementary_pairings`.

**Logic:**

1. **Read the page** – Use `gray-matter` (or equivalent) to parse the file into `{ data: frontMatter, content: body }`.
2. **Read the payload** – JSON from file or stdin.
3. **Merge only nutrition-related keys** – Update (or set) only these keys in the front matter:
   - `nutrition_per_100g`
   - `nutrition_source`
   - `nutrition_supplementary_sources`
   - `protein_profile_note` (if present in payload)
   - `amino_acid_strengths` (if present in payload)
   - `limiting_amino_acids` (if present in payload)
   - `complementary_pairings` (if present in payload)
   Omit any key not present in the payload (do not delete existing keys unless the payload explicitly sets them to `null` or the spec says “remove if absent”).
4. **Preserve everything else** – All other front matter keys and the entire body (including imports, headings, components) are left unchanged.
5. **Serialise and write** – Use the same front-matter library to stringify YAML (with stable, consistent formatting) and rejoin with the body. Preserve line endings (e.g. detect `\n` vs `\r\n` from original file).
6. **Dry-run** – With `--dry-run`, print the would-be result to stdout and do not write the file.
7. **Fail safely** – If the page cannot be parsed or the payload is invalid, exit with a non-zero code and do not modify the file.

---

## 6. Commands

**Full pipeline (all food pages):**

```bash
npm run nutrition:fetch -- --out-dir scripts/out
npm run nutrition:enrich -- --all --pages-dir docs/foods --payload-dir scripts/out
npm run nutrition:apply -- --all --pages-dir docs/foods --payload-dir scripts/out
```

- **Script A** scans `docs/foods`, resolves USDA query from `scripts/usda-map.json` or slug, fetches (when `USDA_API_KEY` set) or builds payload from front matter, writes `scripts/out/<slug>.json` for every food.
- **Script B** scans `docs/foods`, loads or creates payload per page, enriches (overview_key_compounds / bold phrases → supplementary sources), writes payload back.
- **Script C** scans `docs/foods`, loads or creates payload per page, merges nutrition keys into front matter (does not overwrite `nutrition_per_100g` with empty when page already has data), writes page back.

**Updating one food** (e.g. salmon):

```bash
npm run nutrition:fetch -- --food salmon --out-dir scripts/out
npm run nutrition:enrich -- --page docs/foods/salmon.md --payload scripts/out/salmon.json
npm run nutrition:apply -- --page docs/foods/salmon.md --payload scripts/out/salmon.json
```

NPM scripts (in `package.json`):

- `nutrition:fetch` – Run Script A (with optional args passed through).
- `nutrition:enrich` – Run Script B (with optional args passed through).
- `nutrition:apply` – Run Script C (with optional args passed through).

---

## 7. Standard workflow for new food creation

When a **new food page** is added (e.g. `docs/foods/mackerel.md`):

1. **Create the page** – Add `docs/foods/<slug>.md` with Overview and any front matter. No manual registration is required.
2. **Optional:** Add a USDA search override in `scripts/usda-map.json` if the slug does not match USDA well (e.g. `"mackerel": "mackerel, Atlantic, raw"`).
3. **Run the pipeline** – The next run of A, then B, then C will:
   - **A:** Detect the new page, fetch from USDA (if key set and mapping or slug matches) or create payload from front matter, write `scripts/out/mackerel.json`.
   - **B:** Load or create payload, enrich from overview_key_compounds or bold phrases, write payload back.
   - **C:** Load or create payload, merge nutrition keys into the page, write page back.

No manual config updates are required. `docs/foods` is the single source of truth; the pipeline scales to hundreds of foods.

---

## 8. Validation and reporting

Each script prints a summary at the end of a run:

- **Script A:** Foods detected, Fetched from USDA, Payloads created, Payloads updated, Missing USDA match (list), Skipped (list). When `USDA_API_KEY` is not set, notes “payloads from front matter only”.
- **Script B:** Foods detected, Foods processed, Payloads created (from front matter), Payloads enriched, Skipped.
- **Script C:** Foods detected, Pages updated, Payloads created (from front matter), Skipped.

Skipped and missing-USDA items are listed so the pipeline can be debugged as the food library grows.
