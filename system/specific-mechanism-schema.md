# Specific Mechanism (SM) Schema

Citation and reference format: **`system/brs-citation-reference-standard.md`** (same as PM).

## Build Gate Proviso

- Never render or expose spreadsheet letter identifiers in generated content or public-facing pages.
- Always use semantic entity names.
- SMs are **not** a separate rendering system — they reuse the PM page contract (section order, collapsible blocks, scoreable table, bibliography rules, validators).

## Ontology layers (framework interpretation)

| Layer | Role |
|-------|------|
| **KC** | Feasibility conditions — shared sufficiency and constraint context |
| **PM** | Bounded biological mechanisms |
| **FM** | Integrated biological states emerging from coordinated PMs — capacities, desired states or regulatory conditions; principal biological targets of the framework |
| **SM** | Interpretation layers — context-specific reading of stable biology |

The ontology describes biology. Therapeutic-area framing (e.g. ADHD) belongs on **BRS hub pages**, introductions, and rationale sections — not as a primary SM category.

## Core principle

**PMs** define stable, intervention-influenceable regulatory mechanisms.

**Specific Mechanisms (SMs)** are interpretation layers: context-specific expressions of stable biological regulation grounded in connected PMs, FMs, and KCs. They use the same PM rendering architecture, with categories:

- **SM-SNP** — variant-sensitive interpretation (e.g. COMT, MTHFR, DAO, PEMT)
- **SM-CROSS** — multi-BRS interpretive concepts that cannot be owned by a single PM/FM

**Retired:** `SM-PHEN` pages are removed. Functional phenotype interpretation lives in the **Phenome Registry** (`src/data/phenome-registry.json` and `docs/phenomes/`) and in PM/FM phenome mappings — not as separate SM-PHEN mechanism pages. Do not create new `SM-PHEN` pages.

### SM-SNP pages (genotype-sensitive modifiers)

**SNPs never connect to phenotypes directly.** Genotype-sensitive SM pages are **modifiers**, not primary mechanism owners. They explain how inherited variation may alter the **efficiency, sensitivity, cofactor responsiveness, or interpretive context** of existing PM/FM biology — not independent biological pathways.

**Phenome rule:** SNP-sensitive SM pages should **not normally own direct Phenome mappings**. Functional outcome relationships defer to connected PM/FM structure. Add direct `phenome_relationships` / §2 phenome dropdowns on `SM-SNP` pages **only** where there is strong evidence that the genotype-sensitive modifier itself has an independent functional outcome relationship (rare; default is empty state).

**§2 Phenome Connections — required modifier note** (publish after the standard phenome disclaimer, before empty state or any mapping):

```markdown
Genotype-sensitive SMs function as modifiers of existing PM/FM biology rather than independent biological pathways. Phenome interpretation should therefore defer to the connected Primary Mechanisms and Functional Mechanisms influenced by this modifier. Direct Phenome mappings should only be added where there is strong evidence that the genotype-sensitive modifier itself has an independent functional outcome relationship.
```

**Connected PM discipline:** Do **not** connect SNP pages to every PM on the host BRS automatically. List only PMs where the variant-sensitive modifier plausibly alters mechanism efficiency, pathway flux, cofactor responsiveness, substrate handling, or downstream interpretation.

**§6.3 Connected Primary Mechanisms (legacy SM-SNP)** — tier with `####` subheads:

| Tier | §6.3 subhead | Meaning |
|------|----------------|---------|
| Primary | `#### Primary connected PMs` | Host-BRS PMs **directly** affected by the variant-sensitive pathway (enzyme activity, flux, or clearance owned by that PM). |
| Secondary | `#### Secondary or indirect connected PMs` | Host-BRS PMs influenced **through** another PM or downstream of the primary variant effect. |

**§6.5 Connected Mechanisms (legacy SM-SNP)** — cross-system links only:

| Tier | §6.5 content | Meaning |
|------|----------------|---------|
| Cross-system | Paragraph-led blocks with linked PM pages | PMs in **other BRS domains** affected only through downstream interpretation — not variant owners. |

Do not duplicate PM definitions in §6.3 or §6.5; link and interpret only.

### Retired category: SM-PHEN

`SM-PHEN` is **not** a valid category. Do not create new SM-PHEN pages. Functional phenotype interpretation is owned by the **Phenome Registry** (`src/data/phenome-registry.json`, `docs/phenomes/`) and by PM/FM phenome mappings. Former BRS1 SM-PHEN pages redirect to registry phenome detail pages.

- **SM-CROSS** — cross-system interpretive concepts spanning multiple BRS domains simultaneously, not naturally owned by a single PM or FM

SM-CROSS pages are **not** bounded mechanisms and **not** phenotype pages. They explain **cross-system biological concepts** that influence or connect multiple BRS domains (e.g. histaminergic arousal and neuroimmune crosstalk spanning BRS1, BRS3, BRS5, BRS6).

### SM-CROSS test (qualification gate)

A page should use `sm_category: SM-CROSS` **only if both** conditions are met:

1. **Multi-BRS span** — The concept **materially spans ≥ 2 BRS domains** (not a passing mention of another BRS; the interpretive story requires placement across domains).
2. **No single PM/FM owner** — The concept **cannot be naturally owned by a single PM or FM** (if one PM or FM already defines the biology cleanly, extend that page or use `SM-SNP` on the host BRS instead).

**Pass examples:** histaminergic arousal and neuroimmune crosstalk (BRS1 + BRS3 + BRS5 + BRS6 crossover); future candidates such as endocannabinoid signalling context or stress adaptation / allostatic load when genuinely multi-domain.

**Fail → use elsewhere:**

| Situation | Prefer |
|-----------|--------|
| Biology fits one PM | That **PM** page (or expand it) |
| Biology fits one FM’s integrated state | That **FM** page |
| Single-BRS variant pattern | **`SM-SNP`** on the host BRS |
| Functional phenotype interpretation | **Phenome Registry** + PM/FM phenome mappings |
| Therapeutic-area framing only | **BRS hub** rationale sections |

If only one condition holds (e.g. spans two BRSs but one PM already owns the mechanism), **do not** classify as SM-CROSS.

SMs must remain mechanistically grounded in connected PMs, FMs, and KCs. They must not redefine PM biology, duplicate FM pages, make diagnostic claims, imply deterministic SNP outcomes, prescribe treatments, or exaggerate efficacy.

### Retired category: SM-ADHD

`SM-ADHD` is **not** a valid category. Do not create new SM-ADHD pages. Existing therapeutic-area content should live on BRS hubs or be reclassified as `SM-CROSS` (multi-BRS interpretive concept) when appropriate; phenotype framing belongs in the Phenome Registry.

### BRS-X cross-system layer

Genuinely cross-system biological networks that span multiple BRS domains and cannot be owned by a single BRS are documented as **BRS-X** systems (see `system/brs-x-schema.md`). Initial systems: `BRS-X(ECS)` (endocannabinoid system) and `BRS-X(Hormones)` (hormone signalling & regulation). SM-Female and SM-Male may reference BRS-X(Hormones) FMs and PMs without owning those mechanisms.

`SM-CROSS` pages remain interpretation layers hosted on a BRS hub for navigation. When a concept matures into a bounded cross-system mechanism with PM/FM ownership, migrate to the appropriate `BRS-X(...)` namespace rather than expanding SM-CROSS indefinitely.

## Required top-level front matter

```yaml
title: string
sm_id: string                    # e.g. "BRS1(SM-CROSS1)" or "BRS1(SM-SNP1)"
sm_category: string               # SM-SNP | SM-CROSS
use_case: string                  # short variant / cross-system framing
parent_brs: string                # e.g. "BRS1" (host BRS for the page)
summary: string                   # <=120 words
connected_pms:
  - id: string
    name: string
    href: string
connected_fms:
  - id: string
    name: string
    href: string
connected_kcs:
  - id: string
    name: string
    href: string
intervention_breakdown: string    # same five values as PM/FM
timing_specific: "Yes" | "No"     # required; not a public body section
references:                       # same format as PM pages
  - '[Ramsey et al. (2009) — Circadian Control of NAD⁺ Biosynthesis](/docs/papers/BRAIN-Diet-References#citation_key)'
hide_title: true
```

Optional PM-compatible fields: `intervention_dominance`, `dose_sensitivity`, `mechanistic_authoring_required`, `key_constraints`, `cofactors`.

SMs do **not** use `parent_fm` or `pm_id` — use `connected_*` lists instead.

## SM category (required)

One of:

- `SM-SNP` — variant-sensitive interpretation
- `SM-CROSS` — cross-system interpretive concepts that pass the [SM-CROSS test](#sm-cross-test-qualification-gate) (≥ 2 BRS domains; no single PM/FM owner)

`SM-PHEN` is retired — use the Phenome Registry instead.

**§3 Intervention Breakdown** in the public body contains **only** the `intervention_breakdown` value (same as PM pages), for example:

```markdown
## 3. Intervention Breakdown

Food-State Leaning
```

`sm_category` and `use_case` are required in **front matter** only — do not repeat them in the §2 body.

## Section body prose

Same contract as PM pages: sections must not restate the title, `sm_id`, BRS name/number, or Definition; each section follows only its schema role. See `system/mechanism-page-section-prose.md`.

## Section order

### Profile A — `SM-CROSS` (canonical; identical numbering to PM)

**Reference:** `docs/biological-targets/brs1/sm/brs1-sm-cross1-histaminergic-arousal-neuroimmune-crosstalk.mdx` — same section order and numbering as [BRS1-FM1-PM1](/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation).

First body line: `## <SM_ID> - <title>` (level `##`, not `#` or `###`).

1. Definition — `## 1. Definition` — **SM-CROSS:** opening paragraph + exactly 3 bullets; biology-first cross-system significance; defer PM links to §6. See `system/mechanism-page-section-prose.md` (**§1 Definition — UX structure**).
2. Primary Biological Effects — directional summary (same contract as PM §2)
3. Phenome Connections — same contract as PM §3; empty state when none mapped
4. Levers — `## 4. Levers` with **4.1 Dietary**, **4.2 System Optimisation** (when authored), and **4.3 Lifestyle** dropdowns (same structure as PM §4); cofactors and KCs in **4.1.2** / **4.1.3**
5. Mechanistic Basis — `### Summary` + `<details>`; cross-system biology only — PM links stay in §6.2
6. BRS Pathways and Connections — `## 6. BRS Pathways and Connections`
   - `### 6.1` BRS Pathways — cross-BRS interpretive chain (`↓` between steps)
   - `### 6.2` Connected BRS Mechanisms — **required cross-BRS narrative** (former standalone §6.5 content); see [§6.2 Connected BRS Mechanisms (SM-CROSS)](#62-connected-brs-mechanisms-sm-cross) below
   - `### 6.3` Connected Primary Mechanisms — host FMs + connected PMs from front matter
7. Scoreable Inputs & Modulation Signals — optional; PM table categories (three rows)
8. References

`intervention_breakdown` and `intervention_dominance` stay in **front matter** only (`intervention_dominance` renders in §4 Intervention Profile). Do **not** publish `## N. Intervention Breakdown` on Profile A `SM-CROSS` pages.

Timing: `timing_specific` in front matter only; discuss timing in Primary Biological Effects, Mechanistic Basis, §4.3 Lifestyle Levers, or Scoreable when relevant.

### Legacy Profile A — `SM-SNP` (until migrated)

1. Definition
2. Phenome Connections
3. Intervention Breakdown — breakdown value only
4. Primary Biological Effects
5. Mechanistic Basis
6. Underlying Mechanisms and Requirements (6.1–6.5)
7. Dietary Levers
8. Lifestyle Levers
9. Scoreable Inputs
10. References

### §6.2 Connected BRS Mechanisms (SM-CROSS authoring contract)

### When required

- **`SM-CROSS` (Profile A):** `### 6.2` is **required** when the interpretive concept spans more than one BRS domain.
- **`SM-SNP` (legacy):** `### 6.5` is **optional**; use when cross-BRS PM context materially clarifies the interpretation (e.g. COMT cross-talk to BRS1, methylation to BRS3).

### Relationship to other §6 subsections (SM-CROSS Profile A)

| Subsection | Purpose |
|------------|---------|
| **§6.1 BRS Pathways** | Cross-BRS interpretive chain (`↓` between linked PM steps). |
| **§6.2 Connected BRS Mechanisms** | **Narrative** cross-domain placement: prose paragraphs (and optional `####` subheads) with **inline markdown links to specific PM pages**. |
| **§6.3 Connected Primary Mechanisms** | Bullet list of host FMs + connected PMs from front matter. |

### Relationship to other §6 subsections (legacy SM-SNP)

| Subsection | Purpose |
|------------|---------|
| **§6.3 Connected PMs** | Tiered bullet lists: **Primary connected PMs** (direct variant effect) and **Secondary or indirect connected PMs** (downstream through another PM). See [SM-SNP pages](#sm-snp-pages-genotype-sensitive-modifiers). |
| **§6.4 Connected FMs** | Bullet list of host-BRS FMs from `connected_fms` front matter. |
| **§6.5 Connected Mechanisms** | **Cross-system** narrative only — other BRS domains reached through downstream interpretation; paragraph-led with linked PM pages. |

Do **not** use hub-only labels (e.g. “BRS3 crossover”) without at least one linked PM when a relevant PM exists. Do **not** duplicate full PM definitions — link and interpret.

### Format

- **Paragraph form (preferred):** Explain cross-links in connected prose. Embed links as `[BRSx(PMn) — Name](/docs/biological-targets/brsX/pm/...)`.
- **Optional structure:** Use `####` subheads for priority tiers (e.g. Primary / Secondary / Tertiary) or thematic blocks when an `SM-CROSS` concept spans several domains — each block should still be **paragraph-led**, not bullet-only.
- **Citations:** Use `[Author et al., Year]` in §6.5 when claims need evidence; References per **`system/brs-citation-reference-standard.md`**.
- **§5 vs §6.2 (SM-CROSS) / §6.5 (legacy):** §5 Mechanistic Basis summarises cross-system biology; §6.2 / §6.5 is where **cross-BRS PM placement** is spelled out with linked PMs.

### Example pattern (`SM-CROSS` Profile A)

```markdown
### 6.2 Connected BRS Mechanisms

<Concept> maps to several connected PMs rather than a single mechanism home.

#### Neural Arousal & Attention Context

<Paragraph.> Maps to [BRS1-FM1-PM3 — …](/docs/biological-targets/brs1/fm1/…).
```

Reference implementation: `docs/biological-targets/brs1/sm/brs1-sm-cross1-histaminergic-arousal-neuroimmune-crosstalk.mdx`.

## Validation

```bash
npm run mechanisms:validate
```

Validates SM pages with the same JS contract as PM pages (timing, intervention breakdown, section numbering, scoreable categories, mechanistic basis audit). SM-specific checks: `sm_category`, `use_case`, connected-entity front matter, and §2 category block.

## Spreadsheet

SM rows belong under BRSX in the six-systems workbook (not PM/FM/KC sheets). Generation should reuse PM MDX shell patterns; see `scripts/lib/brs-spreadsheet-generate.mjs` when SM export is wired.
