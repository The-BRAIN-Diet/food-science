# Specific Mechanism (SM) Schema

## Build Gate Proviso

- Never render or expose spreadsheet letter identifiers in generated content or public-facing pages.
- Always use semantic entity names.
- SMs are **not** a separate rendering system — they reuse the PM page contract (section order, collapsible blocks, scoreable table, bibliography rules, validators).

## Core principle

**PMs** define stable, intervention-influenceable regulatory mechanisms.

**Specific Mechanisms (SMs)** are context-specific expressions of stable biological regulation associated with phenotype patterns, therapeutic-area dynamics, and variant-sensitive modulation. They use the same PM rendering architecture, with categories including:

- therapeutic-area context (SM-ADHD)
- phenotype interpretation (SM-PHEN)
- variant-sensitive context (SM-SNP)
- other application framing (SM-OTHER)

SMs must remain mechanistically grounded in connected PMs, FMs, and KCs. They must not redefine PM biology, duplicate FM pages, make diagnostic claims, imply deterministic SNP outcomes, prescribe treatments, or exaggerate efficacy.

## Required top-level front matter

```yaml
title: string
sm_id: string                    # e.g. "BRS1(SM-PHEN1)"
sm_category: string               # SM-ADHD | SM-SNP | SM-PHEN | SM-OTHER
use_case: string                  # short phenotype / application framing
parent_brs: string                # e.g. "BRS1"
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
  - '[1] [Label](/docs/papers/BRAIN-Diet-References#citation_key)'
hide_title: true
```

Optional PM-compatible fields: `intervention_dominance`, `dose_sensitivity`, `mechanistic_authoring_required`, `key_constraints`, `cofactors`.

SMs do **not** use `parent_fm` or `pm_id` — use `connected_*` lists instead.

## SM category (required)

One of:

- `SM-ADHD`
- `SM-SNP`
- `SM-PHEN`
- `SM-OTHER`

**§2 Intervention Breakdown** in the public body contains **only** the `intervention_breakdown` value (same as PM pages), for example:

```markdown
## 2. Intervention Breakdown

Food-State Leaning
```

`sm_category` and `use_case` are required in **front matter** only — do not repeat them in the §2 body.

## Section order (Profile A — extended, same as PM)

First body line: `## <SM_ID> - <title>` (level `##`, not `#` or `###`).

1. Definition — phenotype / therapeutic / variant / instability framing (not a core PM definition)
2. Intervention Breakdown — breakdown value + **Category** + **Use case**
3. Functional Role — directional summary oriented to regulatory balance and resilience
4. Mechanistic Basis — connects connected PMs, FMs, KCs, and cross-BRS context into the interpretive overlay (`### Summary` + `<details>` as on PM pages)
5. Underlying Mechanisms and Requirements
   - `### 5.1` Co-factors
   - `### 5.2` KCs (Key Constraints)
   - `### 5.3` Connected Primary Mechanisms (PMs) — required when `connected_pms` non-empty
   - `### 5.4` Connected Functional Mechanisms (FMs)
   - `### 5.5` Cross-BRS Links (optional)
6. Dietary Levers — `<details><summary><strong>Diet</strong></summary>`
7. Lifestyle Levers — `<details><summary><strong>Lifestyle</strong></summary>`
8. Scoreable Inputs & Modulation Signals — optional; same table categories as PM/FM
9. References — if §8 Scoreable omitted, References is §8

Timing: `timing_specific` in front matter only; discuss timing in Functional Role, Mechanistic Basis, Lifestyle, or Scoreable when relevant.

## Validation

```bash
npm run mechanisms:validate
```

Validates SM pages with the same JS contract as PM pages (timing, intervention breakdown, section numbering, scoreable categories, mechanistic basis audit). SM-specific checks: `sm_category`, `use_case`, connected-entity front matter, and §2 category block.

## Spreadsheet

SM rows belong under BRSX in the six-systems workbook (not PM/FM/KC sheets). Generation should reuse PM MDX shell patterns; see `scripts/lib/brs-spreadsheet-generate.mjs` when SM export is wired.
