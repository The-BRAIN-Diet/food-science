# BRS Hub Page Authoring Standard

Rollup and presentation schema for **BRS1–BRS6 hub pages**. Use **BRS1** (`docs/biological-targets/neurotransmitter-regulation.md`) as the reference implementation for all remaining hub rewrites.

## Purpose

Each BRS hub page should orient readers in under one minute: explain the biological objective, translate system requirements into practical dietary guidance, and guide readers into Functional Modules — without duplicating PM-level biology, Food Profiles, or Recipes.

---

## Hub page structure (BRS1–BRS6)

| # | Section | Status |
|---|---------|--------|
| 1 | Title + subtitle | Required |
| 2 | **Ambition** | Required — manual |
| 3 | **Dietary Guidance** | Required — manual (see [BRS Dietary Guidance Standard](#brs-dietary-guidance-standard-final)) |
| 4 | **Optimisation Levers** | Required where applicable — curated + PM provenance (see [Optimisation Levers](#optimisation-levers)) |
| 5 | **Lifestyle Priorities** | Required — curated + PM provenance |
| 6 | **Therapeutic Area Research** | BRS1–BRS6 ADHD dropdowns — [BRS Hub ADHD TA Dropdown](./brs-hub-ta-adhd-dropdown-schema.md); [BRAIN TA Evidence Integration Standard v1.2](./brain-ta-evidence-integration-standard.md) |
| 6a | **Cross-BRS integration Evidence** | Landmark mechanistic reviews per Cross-BRS relationship (Category B — not in ADHD dropdown) |
| 7 | **Functional Mechanisms** and downstream navigation (KCs, SMs) | Required |

**Removed from hub pages (do not restore):**

- Standalone **Overview** section (content relocated into Ambition or Dietary Guidance Biology)
- Standalone **Biological Bottlenecks / Constraints** section (content integrated into Dietary Guidance Biology)
- Standalone **References** section on the hub (TA dropdown carries its own references)
- Separate **Target Foods** dropdown (target foods now live inside each Dietary Guidance point)

Apply or refresh Therapeutic Area Research markers:

```bash
npm run brs:patch-ta-research
```

Apply or refresh Cross-BRS integration Evidence sections:

```bash
npm run brs:generate-hub-cross-integration
```

Source of truth: `scripts/data/brs-cross-integration-evidence.json` (also consumed by the Miguel manuscript generator).

---

## Ambition

**Length:** 30–60 words

Describe the desired functional state of the Biological Regulatory System — the biological objective the system continually attempts to maintain under healthy conditions. Answers: *What is this system trying to achieve?*

### Authoring rules

- Describe the healthy regulatory objective.
- Do **not** mention diet, deficiencies, mechanisms, or disease.
- Keep aspirational, concise, and scientifically grounded.

### Example (BRS1)

> Maintain continuous, balanced neurotransmitter signalling across monoaminergic, cholinergic, membrane-lipid, and GABA–glutamate systems so the brain sustains attention, arousal, motivation, emotional regulation, and behavioural control without drifting into depletion, imbalance, or excitation–inhibition mismatch.

---

## BRS Dietary Guidance Standard (Final)

Use BRS1 as the reference implementation for all remaining BRS hub pages.

### Purpose

The Dietary Guidance section should translate biological requirements into practical dietary advice while avoiding repetition with either the Functional Modules or the Food Profiles.

Each guidance point should teach a complete translational pathway:

**Pattern → Nutrients → Biology**

Follow each guidance point with:

**Target foods:** Representative foods that implement the recommendation.

**BRS:** Relevant Functional Module / Phenotypic Mechanism references.

### Format

| Element | Rule |
|---------|------|
| **Pattern** | The dietary behaviour or eating pattern |
| **Nutrients** | The principal nutrient targets or nutritional resources |
| **Biology** | A concise explanation of why those nutrients matter for that BRS, expressed at system level rather than PM-level mechanism |
| **Target foods** | 2–5 representative whole foods that naturally provide those nutrients (linked to Food Profiles) |
| **BRS** | Relevant PM references |

**Example:**

> **Distribute high-quality protein across the day** → amino-acid precursors (tryptophan, tyrosine and choline) → the brain cannot store neurotransmitter precursors and therefore depends on a continuous dietary supply to maintain neurotransmitter synthesis.
>
> **Target foods:** Eggs • Salmon • Greek Yogurt • Lentils
>
> **BRS:** BRS1-FM1-PM1 • BRS1-FM1-PM2 • BRS1-FM1-PM3 • BRS1-FM1-PM4

### Authoring principles

- Preserve important biological concepts previously described in the Biological Bottlenecks, but integrate them naturally into the Biology stage rather than maintaining a separate Bottlenecks section.
- Explain biology at BRS level, not PM level.
- Teach biological principles rather than isolated nutrients.
- Keep every guidance point focused on one distinct biological requirement.
- Avoid repeating the same concept across multiple guidance points.
- Avoid generic advice such as "eat a balanced diet" or "maintain broad micronutrient coverage."
- Do not duplicate the content of the Food Profiles. Dietary Guidance explains the principle; Food Profiles explain the individual foods.
- Every guidance point should be specific to that Biological Regulatory System. If the advice would appear almost unchanged across all six BRSs, it probably belongs in the framework's universal dietary guidance rather than in a BRS-specific page.

### Educational flow

The BRS hub should now follow this learning pathway:

**Ambition**
→ what the system is trying to achieve.

**Dietary Guidance**
→ Pattern → Nutrients → Biology
→ Target foods
→ BRS references

### Plant-Based & Vegan Authoring Standard

The BRAIN Framework is **biology-first, not diet-first**. Dietary Guidance should describe the biological requirement, while the Target Foods demonstrate multiple whole-food ways of meeting that requirement.

Do not separate omnivore and vegan guidance or label foods by dietary identity. Instead, include both animal and plant food examples together within the same Target Foods list where they support the same biological objective.

**Example:**

> **Distribute high-quality protein across the day** → amino-acid precursors (tryptophan, tyrosine and choline) → the brain cannot store neurotransmitter precursors and therefore depends on a continuous dietary supply to maintain neurotransmitter synthesis.
>
> **Target foods:** Eggs • Salmon • Greek Yogurt • Lentils • Tofu • Tempeh • Edamame

Use concise notes only where they provide genuine biological clarification rather than dietary preference.

**Examples:**

- **Protein quality:** Plant protein sources may be combined to provide complementary indispensable amino-acid profiles. See the relevant Food Profiles for Essential Amino Acid (EAA) pairing guidance where applicable.
- **Vitamin B12:** Vegan dietary patterns should obtain vitamin B12 from fortified foods and/or supplementation where appropriate.
- **Omega-3:** Marine foods and algae provide preformed DHA/EPA. Walnuts, chia and flax provide ALA, which requires endogenous conversion to DHA and EPA with variable efficiency.

**Authoring principles:**

- Keep the biological requirement constant; vary only the food examples.
- Present multiple dietary routes to achieving the same biological objective.
- Avoid implying that one dietary pattern is preferred over another.
- Use notes only where meaningful biological differences exist.
- Keep detailed discussion of EAA pairing, bioavailability and food-specific considerations within the individual Food Profiles rather than the Dietary Guidance.

### Hub HTML implementation (BRS1 reference)

Dietary Guidance is a top-level collapsible dropdown labelled **Dietary Guidance**. Inside the panel:

1. Flow line: `Pattern → Nutrients → Biology → Target Foods`
2. `<ul class="brs-hub-dietary-guidance-list">` of guidance items
3. Each `<li class="brs-hub-dietary-guidance-item">` contains:
   - `<p class="brs-hub-dietary-guidance-main">` — Pattern → Nutrients → Biology
   - `<p class="brs-hub-dietary-target-foods">` — Target foods (linked) + BRS PM links

CSS classes live in `src/css/custom.css` (`.brs-hub-dietary-guidance-*`).

**Important:** BRS1 Dietary Guidance is **manually authored** inside `<!-- brs-hub-levers:start -->` / `<!-- brs-hub-levers:end -->`. Do **not** run `npm run brs:generate-hub-levers` on BRS1 until the generator is updated for this schema — it will overwrite manual content with the legacy Dietary Strategy / Target Foods layout.

---

## Hub levers (section 4)

The generated block between `<!-- brs-hub-levers:start -->` / `<!-- brs-hub-levers:end -->` presents three intervention layers:

| # | Hub dropdown | PM section | Purpose |
|---|--------------|------------|---------|
| 4.1 | **Dietary Guidance** | §4.1 Direct Dietary Levers | What to eat — patterns, nutrients, biology, target foods |
| 4.2 | **Optimisation Levers** | §4.3 Optimisation Levers | How to prepare, combine, or handle foods and exposures to improve bioavailability, reduce degradation, or limit avoidable biological load |
| 4.3 | **Lifestyle Priorities** | §4.2 Lifestyle Levers | Behavioural and temporal levers (sleep, activity, meal timing, stress recovery) |

### Optimisation Levers

**Purpose:** Capture intervention strategies that are neither dietary patterns nor lifestyle behaviours — food preparation, bioavailability enhancement, matrix preservation, and exposure reduction (e.g. gentle cooking of marine fats, soaking legumes, reducing plastic nanoparticle exposure where relevant).

**Does not belong here:**

- Whole dietary patterns → **Dietary Guidance**
- Sleep, exercise, stress, circadian behaviour → **Lifestyle Priorities**
- Step-by-step recipes or full preparation instructions → **Food Profiles / Recipes**

**Biological connection:**

- **FM §4.2 Integrated Functional Narrative** may reference why suboptimal preparation or exposure matters at the **integrated biology** level when relevant to emergent capacity.
- **PM §4.3 Optimisation Levers** states the actionable optimisation strategy at mechanism level.
- **Hub Optimisation Levers** integrates and deduplicates across PMs for the BRS reader.

**Do not** place preparation instructions or dietary cause narratives in **FM §4.3** — that section describes consequences of lost FM capacity only.

**Hub HTML (BRS1 reference):**

Third collapsible dropdown labelled **Optimisation Levers**, placed immediately after **Dietary Guidance** and before **Lifestyle Priorities**. Structurally parallel to Lifestyle Priorities:

- `<ul class="brs-hub-optimisation-list">`
- Each item: action + explanation + **Supports:** PM links

**Source of truth:**

| Layer | Location |
|-------|----------|
| **Curated hub levers** | `scripts/data/brs-hub-optimisation-levers.mjs` |
| **PM levers** | §4.3 Optimisation Levers on PM pages |
| **FM biology (integrated context)** | FM §4.2 Integrated Functional Narrative |
| **Practical detail** | Food Profiles (primary home for preparation instructions) |

**Example (BRS1):**

> **Prepare omega-3-rich foods gently and include them regularly** to protect delicate marine fats during cooking and support ongoing brain membrane health over time.
>
> **Supports:** BRS1-FM3-PM6

---

## Legacy: generated Dietary Strategy block (BRS2–BRS6)

The sections below describe the **previous** auto-generated hub lever block. BRS2–BRS6 still use this layout until migrated to the [BRS Dietary Guidance Standard](#brs-dietary-guidance-standard-final). BRS1 has been migrated.

### Rollup purpose (legacy)

Make each core BRS hub page practically useful by showing the consolidated dietary landscape for that system, while keeping mechanistic rationale on PM/FM pages.

### Source of truth (legacy generator)

| Layer | Location |
|-------|----------|
| **PM pages** | Authoritative lever detail (`substance ← food` bullets, lifestyle lines, KC links) |
| **KC pages** | Substance `←` food mappings for Key constraints enrichment |
| **BRS-specific copy** | `KEY_CONSTRAINTS_INTRO`, `KEY_DIETARY_STRATEGY_TARGETS` in `scripts/lib/brs-hub-levers.mjs` |
| **Lifestyle Priorities** | `scripts/data/brs-hub-lifestyle-priorities.mjs` — integrated themes; PM provenance matched at generation |
| **Generated registry** | `src/data/brs-hub-levers.generated.json` |
| **Hub pages** | HTML block between `<!-- brs-hub-levers:start -->` / `<!-- brs-hub-levers:end -->` |

Regenerate after PM lever edits, copy-map changes, or **TA Phases 7 and 7.5** (BRS2–BRS6 only until generator is updated):

```bash
npm run brs:generate-hub-levers
```

## TA evidence integration (Phases 7 and 7.5)

When a BRS hub Therapeutic Area dropdown is revised under [BRAIN TA Evidence Integration Standard v1.2](./brain-ta-evidence-integration-standard.md):

| Phase | Scope |
|-------|--------|
| **Phase 7** | Rebuild hub **Dietary Guidance** (or legacy Dietary Strategy) & **Lifestyle Priorities** block |
| **Phase 7.5** | Complete **Biological Intervention Ledger** — gold-nugget relocation, evidence-first PM links, missing-link gap report |

Practical content removed from the TA dropdown must be **re-homed** per Phase 7.5 §1 (see [BRS Hub Schema & Phase 7.5 improvements (before BRS6)](#brs-hub-schema--phase-75-improvements-before-brs6)):

1. `KEY_DIETARY_STRATEGY_PROSE` / `KEY_DIETARY_STRATEGY_TARGETS` (legacy — migrate to Dietary Guidance on hub rewrite)
2. `scripts/data/brs-hub-signature-foods.mjs` (legacy target foods — migrate into Dietary Guidance target-food lines)
3. `scripts/data/brs-hub-lifestyle-priorities.mjs`
4. PM §4.3 Optimisation Levers + FM §4.2 integrated biology (not FM §4.3 — consequences only)
5. PM dietary levers (`substance ← food`)
6. Food pages (primary home for preparation guidance)
7. Substance pages (evidence-linked)
8. Cross-BRS hub notes where appropriate

The TA dropdown carries evidence and interpretation only. Hub levers and the intervention ledger carry **actionable dietary translation**.

**Phase 7 QA:** *Have translational dietary insights failed to appear in the Dietary Lever Overview?*

**Phase 7.5 QA:** *Have any gold nuggets failed to appear anywhere in the ledger, or been left only on legacy TA prose?*

See [Phase 7.5 in the parent standard](./brain-ta-evidence-integration-standard.md#phase-75--biological-intervention-ledger--translational-integration) for ledger categories, evidence-first rules, and gap-audit examples.

---

## BRS Hub Schema & Phase 7.5 improvements (before BRS6)

The BRS Hub methodology and presentation schema are now largely stable. The refinements below apply to **all remaining BRS hub work** (BRS6 next; BRS1–BRS3 audit passes) and should be read together with [BRAIN TA Evidence Integration Standard v1.2](./brain-ta-evidence-integration-standard.md) Phase 7.5.

### 1. Preparation guidance — correct architecture

Food preparation is **not** a lifestyle intervention and is **not primarily owned by the Functional Module**.

Preparation methods are **modifiers of food interventions**. Examples include boiling spinach, fermenting cabbage, soaking legumes, cooling potatoes, and gentle cooking of oily fish. These alter food-matrix properties, nutrient bioavailability, anti-nutrient content, oxidation, resistant-starch formation, or related biological characteristics.

| Home | Role |
|------|------|
| **Food pages (primary)** | Practical preparation guidance lives on the relevant food page where the intervention is described |
| **Dietary Guidance (primary)** | General preparation principles that apply across multiple foods (e.g. reducing AGE formation, improving mineral bioavailability, preserving polyphenols) may be summarised in hub Dietary Guidance where biologically relevant |
| **FM §4.2 (integrated biology only)** | FMs may explain why preparation matters at the **integrated capacity** level when relevant to emergent function — not cooking instructions |
| **PM §4.3 Optimisation Levers** | Actionable preparation/bioavailability strategies at mechanism level |
| **Not Lifestyle Priorities** | Cooking, preparation, and bioavailability strategies are **Optimisation Levers** — not behavioural lifestyle levers |
| **Not FM §4.3** | FM §4.3 describes **consequences** of lost FM capacity — not dietary causes or preparation rationale |

**FM §4.2 example (integrated biology — not preparation instructions):**

> Phospholipid-bound omega-3 delivery and membrane enrichment operate as an integrated capacity supporting neuronal signalling competence — distinct from any single transport or incorporation step alone.

Practical cooking guidance remains on food pages; hub **Optimisation Levers** synthesise PM-level strategies.

### 2. Intervention hierarchy

Distinguish consistently between **biological architecture** and **intervention architecture**.

**Biological architecture:** BRS → FM → PM

**Intervention architecture:**

- Foods
- Substances
- Lifestyle
- Recipes

Food preparation is **not** an independent intervention category. Preparation modifies food interventions and is therefore treated as a **property of food pages** (with biological context on PM §4.3 Optimisation Levers and hub Optimisation Levers where relevant).

### 3. Biological Intervention Ledger

Continue implementing Phase 7.5 across remaining BRS hubs.

The objective is to reconcile both sides of the biological ledger:

- Every intervention (food, substance, or lifestyle) should ultimately map to one or more **BRS → FM → PM**
- Every PM should ultimately identify evidence-supported intervention levers where evidence exists

Where links are currently absent, **report ledger gaps** rather than creating unsupported mappings.

### 4. Substance integration (future hub work)

BRS hubs currently embed representative **Target foods** within **Dietary Guidance** (migrated hubs) or **Signature Foods** dropdowns (legacy hubs). Substances are not yet represented consistently on hub pages.

Future work should introduce an **Evidence-Based Substances** section for each BRS. Each substance should:

- link to relevant PMs
- include supporting references
- inherit the same evidence methodology used throughout the framework
- link bidirectionally back to the relevant BRS/FM/PM pages

Substances should become first-class intervention nodes within the framework rather than standalone reference pages.

### 5. Preserve biological knowledge during deduplication

Continue removing duplication from Therapeutic Area dropdowns. However, **no unique biological insight should be lost.**

Gold nuggets should be re-homed into the correct destination:

- Dietary Guidance (Pattern → Nutrients → Biology + target foods)
- Food pages
- Substance pages
- Lifestyle Priorities
- FM/PM biology (§4.3 biological rationale; PM dietary levers)
- Cross-BRS notes

The objective is **knowledge relocation, never knowledge deletion.**

Multiple facts may be synthesised into a single stronger biological narrative where this improves readability without losing scientific meaning.

### 6. BRS philosophy

The BRS architecture remains the organising principle. Foods, substances, lifestyle, preparation methods, and recipes are **intervention layers** that support biological regulation.

The framework should always explain the biology first, then show the interventions that support that biology. Avoid reverting to nutrient monographs or supplement lists.

---

## Legacy hub page order (superseded for BRS1)

~~1. Ambition → 2. Dietary Strategy & Lifestyle → 3. Overview → 4. TA Research → 5. FMs~~

See [Hub page structure](#hub-page-structure-brs1brs6) for the current order.

---

## Legacy: Dietary Strategy panel (BRS2–BRS6 only)

Top-level collapsible **Dietary Strategy** dropdown. Inside the panel, in order:

| # | Section | Heading / label |
|---|---------|-----------------|
| 1 | **Key constraints** | BRS-specific intro sentence; then deduplicated whole-food list |
| 2 | **Key Dietary Strategy & Targets** | BRS seed targets merged with deduplicated PM pattern prose |
| 3 | **Target Foods** | Only food category dropdown exposed on hub pages (for now) |

*Superseded by [Dietary Guidance](#brs-dietary-guidance-standard-final) on migrated hubs.*

### Key constraints (legacy)

Single merged rollup across all KCs referenced by the BRS PMs — **no per-KC breakdown** on hub pages.

1. **Commentary**: BRS-specific intro from `KEY_CONSTRAINTS_INTRO[brsId]`
2. **Food list**: deduplicated whole-food list from connected KCs (always shown when non-empty)

### Key Dietary Strategy & Targets

Replaces the former **Meal & pattern context** line.

1. Seed items from `KEY_DIETARY_STRATEGY_TARGETS[brsId]` (listed first)
2. PM pattern prose from §4.1.1 bullets without extractable food tokens
3. Semantic deduplication removes PM items that overlap seed targets

### Target Foods (hub food dropdown)

Only **target / signature** foods appear in the hub food dropdown. Internal categorisation uses the `nutrient_dense_stars` bucket in `scripts/lib/brs-hub-levers.mjs`; other category buckets are omitted from the registry and hub HTML until re-enabled.

Curated **Target Foods** with BRS-specific captions live in `scripts/data/brs-hub-signature-foods.mjs` (BRS1–BRS6 and BRS-X). When defined for a BRS, the curated list replaces auto-extracted nutrient-dense stars on hub pages; PM provenance tags are merged via `match_foods`.

**Food categories:** Some PM labels are categories (e.g. **Berries**) with no dedicated food page. Hub rollups expand these to linked examples via `FOOD_CATEGORY_EXPANSIONS` in `scripts/lib/brs-hub-levers.mjs` (currently Blueberries, Raspberries, Strawberries). The same expansion applies to Key constraints food lists.

## Lifestyle Priorities panel

Separate top-level collapsible **Lifestyle Priorities** dropdown — unchanged by the Dietary Guidance migration. Still applies to all BRS1–BRS6 hub pages.

This is a **BRS-level educational summary** — not a collection of PM annotations. PM pages retain mechanistic lifestyle detail in §4.2; the hub presents integrated behavioural themes.

### Deduplication process

```text
All PM §4.2 lifestyle notes
↓
Identify common behavioural themes (match patterns)
↓
Merge overlapping concepts
↓
One integrated Lifestyle Priority (action + explanation)
↓
Retain links to all contributing PMs
```

Do **not** surface multiple hub entries for the same theme (e.g. several meal-timing / precursor-transport variants). Merge into one priority such as:

> **Maintain regular meal timing and circadian alignment** to support a steady supply of neurotransmitter building blocks, metabolic regulation, and balanced brain signalling throughout the day.

**Supports:** BRS1-FM1-PM1 · BRS1-FM1-PM2 · …

### Writing style (required)

Each Lifestyle Priority must include:

| Element | Rule |
|---------|------|
| **Action** | Begin with a verb: Maintain, Prioritise, Include, Engage, Practise, Avoid, etc. |
| **Explanation** | One short sentence on **why it matters for this BRS** — understandable without PM jargon |
| **PM links** | Every contributing PM listed under **Supports:** |

Additional rules:

- Typically **15–30 words** total (action + explanation).
- Describe **behaviours**, not mechanisms.
- Avoid PM terminology and abbreviations (LNAA, precursor bias, autonomic context, glycaemic excursions, etc.).
- **Never describe a physiological variable when the underlying phenomenon can be stated directly.**

| Avoid | Prefer |
|-------|--------|
| attenuate glycaemic excursions | reduce blood sugar spikes after meals |
| improve post-prandial glycaemic variability | help keep blood sugar more stable after eating |
| optimise precursor transport | support a steady supply of neurotransmitter building blocks |
| reduce autonomic strain | support healthy stress recovery |

**Bad (label only):** Sleep adequacy  
**Good:** **Prioritise sufficient, consistent sleep** to support balanced neurotransmitter regulation, cognitive performance, and physiological recovery.

### Source of truth

| Layer | Location |
|-------|----------|
| **Curated priorities** | `scripts/data/brs-hub-lifestyle-priorities.mjs` — action, explanation, `match_lifestyle` / `match_pm_ids` |
| **PM provenance** | Attached at generation from PM §4.2 lines matching patterns |
| **PM pages** | Authoritative mechanistic detail (unchanged) |

Target **~5–8 distinct priorities per BRS**, not one per PM.

Regenerate after editing curated priorities or PM §4.2 content:

```bash
npm run brs:generate-hub-levers
```

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
      show_food_list: boolean   # true when a food list follows the commentary
      kc_count: number          # underlying KC count (internal)
    dietary_strategy_targets: []  # merged seed + PM pattern items
    lifestyle: []
    stats:
      pm_count: number
      unique_foods: number
      unique_lifestyle: number          # integrated hub priorities (5–8 target)
      pm_lifestyle_notes: number        # raw PM §4.2 lines before merge (when integrated)
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
| `action` | string | Behaviour-led headline (verb first) |
| `explanation` | string | Why it matters for this BRS (plain language) |
| `label` | string | Full display text: `action` + `explanation` |
| `source_pms` | `{ id, href }[]` | All PMs that contributed via pattern match |

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
7. Lifestyle: PM §**4.2** remains authoritative on PM pages; hub **Lifestyle Priorities** are integrated from `scripts/data/brs-hub-lifestyle-priorities.mjs` with PM provenance matched at generation time.
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
- Do **not** assign food preparation to Lifestyle Priorities or FM §4.3 as cooking instructions — preparation is a food-page property; FM §4.3 carries capacity-loss consequences only.
- FM pages remain lever-free per FM contract (§4.3 may reference preparation biology where it explains suboptimal function).
- Do **not** show per-KC breakdowns on hub Key constraints sections.
