# BRS Hub Dietary & Lifestyle Levers

Rollup schema for **BRS1–BRS6 hub pages** — deduplicated whole-food dietary levers and lifestyle levers extracted from constituent **PM** pages. FM pages do not carry levers per the FM contract.

## Purpose

Make each core BRS hub page practically useful by showing the consolidated dietary landscape for that system, while keeping mechanistic rationale on PM/FM pages.

## Source of truth

| Layer | Location |
|-------|----------|
| **PM pages** | Authoritative lever detail (`substance ← food` bullets, lifestyle lines, KC links) |
| **KC pages** | Substance `←` food mappings for Key constraints enrichment |
| **BRS-specific copy** | `KEY_CONSTRAINTS_INTRO`, `KEY_DIETARY_STRATEGY_TARGETS` in `scripts/lib/brs-hub-levers.mjs` |
| **Generated registry** | `src/data/brs-hub-levers.generated.json` |
| **Hub pages** | HTML block between `<!-- brs-hub-levers:start -->` / `<!-- brs-hub-levers:end -->` |

Regenerate after PM lever edits or copy-map changes:

```bash
npm run brs:generate-hub-levers
```

## Hub page order (BRS1–BRS6)

1. **Ambition**
2. **Overview**
3. **Dietary & Lifestyle Levers** (generated block)
4. **Therapeutic Area Research** (ADHD dropdowns — BRS1–BRS6 only)
5. **Functional Mechanisms** and downstream navigation

Apply or refresh Therapeutic Area Research markers:

```bash
npm run brs:patch-ta-research
```

## Dietary Levers panel (inside generated block)

Top-level collapsible **Dietary Levers** dropdown. Inside the panel, in order:

| # | Section | Heading / label |
|---|---------|-----------------|
| 1 | Intro | Educational rollup paragraph |
| 2 | **Key constraints** | BRS-specific intro sentence + example foods sentence; then deduplicated whole-food list |
| 3 | **Key Dietary Strategy & Targets** | BRS seed targets merged with deduplicated PM pattern prose |
| 4 | **Nutrient-dense stars / signature foods** | Only food category dropdown exposed on hub pages (for now) |

### Key constraints

Single merged rollup across all KCs referenced by the BRS PMs — **no per-KC breakdown** on hub pages.

1. **Commentary** (two sentences):
   - Sentence 1: BRS-specific intro from `KEY_CONSTRAINTS_INTRO[brsId]`
   - Sentence 2: `Whole foods such as … supply the common pools.` — uses the **full** food list when it is short (≤6 example slots); otherwise a signature-food–biased sample of up to six items
2. **Food list** (optional): shown only when the deduplicated list is **longer** than the sample in the commentary; omitted when the commentary already names every food

### Key Dietary Strategy & Targets

Replaces the former **Meal & pattern context** line.

1. Seed items from `KEY_DIETARY_STRATEGY_TARGETS[brsId]` (listed first)
2. PM pattern prose from §4.1.1 bullets without extractable food tokens
3. Semantic deduplication removes PM items that overlap seed targets

### Nutrient-dense stars (hub food dropdown)

Only **signature / nutrient-dense star** foods appear in the hub food dropdown. Internal categorisation rules in `scripts/lib/brs-hub-levers.mjs` remain for assignment; other category buckets are omitted from the registry and hub HTML until re-enabled.

**Signature foods:** salmon, sardines, mackerel, eggs, spinach, broccoli, lentils, berries, extra-virgin olive oil, walnuts, pumpkin seeds, kefir, fermented vegetables, yogurt, fish roe, oats, barley.

Each food line links to contributing PM IDs.

## Lifestyle Levers panel

Separate top-level collapsible **Lifestyle Levers** dropdown.

- Parsed from PM §**4.2 Lifestyle Levers**
- Evidence tags and trailing citation brackets stripped for hub display
- Deduplicated by normalised label; PM provenance tags retained
- **Blend rule:** `Circadian alignment` + `Consistent meal timing` → `Consistent meal timing and circadian alignment`

## Registry shape (`brs-hub-levers.generated.json`)

```yaml
meta:
  version: 2
  generatedAt: ISO-8601
brs:
  BRS1:
    dietary:
      nutrient_dense_stars: []    # hub display only (for now)
    key_constraints:
      foods: []                 # deduplicated across all connected KCs
      commentary: string        # BRS-specific two-sentence block
      show_food_list: boolean   # false when full list fits in commentary; true when a longer list follows
      kc_count: number          # underlying KC count (internal)
    dietary_strategy_targets: []  # merged seed + PM pattern items
    lifestyle: []
    stats:
      pm_count: number
      unique_foods: number
      unique_lifestyle: number
      unique_key_constraints: number
      nutrient_dense_stars: number
```

### Food item

| Field | Type | Notes |
|-------|------|-------|
| `label` | string | Normalized display label |
| `source_pms` | `{ id, href }[]` | PM provenance |

### Lifestyle item

| Field | Type | Notes |
|-------|------|-------|
| `label` | string | Deduplicated lifestyle lever text |
| `source_pms` | `{ id, href }[]` | PM provenance |

## BRS-specific copy maps

Edit in `scripts/lib/brs-hub-levers.mjs`, then regenerate.

### `KEY_CONSTRAINTS_INTRO` (sentence 1 of Key constraints)

| BRS | Intro |
|-----|-------|
| BRS1 | Key constraints across this system are those with complete amino-acid availability; or complementary food pairings. |
| BRS2 | Key constraints across this system are those with adequate methyl-donor intake; or folate-, choline-, and betaine-rich whole-food patterns. |
| BRS3 | Key constraints across this system are those with antioxidant substrate availability; or balanced omega-3 and omega-6 fatty-acid intake. |
| BRS4 | Key constraints across this system are those with reliable macronutrient fuel delivery; or B-vitamin, iron, and magnesium cofactor sufficiency. |
| BRS5 | Key constraints across this system are those with fermentable fibre and resistant-starch intake; or broad plant-diversity and barrier-supportive nutrients. |
| BRS6 | Key constraints across this system are those with stable meal-derived energy substrates; or stress-response micronutrient and lipid sufficiency. |

### `KEY_DIETARY_STRATEGY_TARGETS` (seed items)

| BRS | Seed targets |
|-----|--------------|
| BRS1 | Protein-inclusive meals · B-vitamin-rich foods · omega-3-rich foods · glycaemic stabilisation · membrane fluidity and receptor function |
| BRS2 | Methyl-donor-rich meals · folate- and B12-containing foods · choline and betaine sources · distributed one-carbon protein |
| BRS3 | Anti-inflammatory whole-food patterns · antioxidant-rich vegetables and fruits · omega-3/omega-6 balance · polyphenol-diverse intake |
| BRS4 | Balanced macronutrient fuel delivery · mitochondrial cofactor-rich foods · sustained energy-substrate meals |
| BRS5 | Fermentable-fibre intake · plant-diversity patterns · polyphenol-rich foods · barrier-supportive nutrient pairing |
| BRS6 | Glycaemic stabilisation · mixed macronutrient meal matrices · consistent meal timing · lower ultra-processed load |

PM pattern prose is appended when not semantically redundant.

## Extraction rules

1. Parse PM §**4.1.1 Direct Dietary Levers** only (not cofactor-only §4.1.2 lists).
2. Parse PM §**4.1.3 KCs (Key Constraints)** — KC links; enrich foods from KC pages and connected PM dietary lines.
3. Primary food format: `substance ← food, food, food`
4. Secondary: prose bullets with `such as …` / `including …` food lists (common on BRS6 meal-timing PMs).
5. Pattern prose: §4.1.1 bullets without extractable food tokens roll into `dietary_strategy_targets`.
6. Normalize aliases (`EVOO` → extra-virgin olive oil, `oily fish` → salmon, sardines, mackerel, `fish roe` → signature star).
7. Lifestyle: parse §**4.2**; strip `(Evidence:…)` and trailing citation brackets.
8. Hub registry includes **nutrient_dense_stars** only; assign via `SIGNATURE_FOODS` and `categorizeFood()`.

## Core BRS hub page map

| BRS | Hub file |
|-----|----------|
| BRS1 | `docs/biological-targets/neurotransmitter-regulation.md` |
| BRS2 | `docs/biological-targets/methylation-one-carbon-metabolism.md` |
| BRS3 | `docs/biological-targets/inflammation-oxidative-stress.md` |
| BRS4 | `docs/biological-targets/mitochondrial-function-bioenergetics.md` |
| BRS5 | `docs/biological-targets/gut-brain-axis-enteric-nervous-system.md` |
| BRS6 | `docs/biological-targets/metabolic-neuroendocrine-stress.md` |

BRS-X hub pages use the same generator but are outside the core BRS1–BRS6 rollout scope.

## Non-goals

- Do **not** remove lever detail from PM pages.
- Do **not** frame hub rollups as supplement protocols — whole foods and food matrices only.
- FM pages remain lever-free per FM contract.
- Do **not** show per-KC breakdowns on hub Key constraints sections.
