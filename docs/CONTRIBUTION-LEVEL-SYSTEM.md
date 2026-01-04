# Contribution Level System

## Overview

The Contribution Level system prevents "presence = effect" errors by explicitly separating biochemical relevance from nutritional impact. This ensures foods list only substances that are meaningful at typical culinary intake.

## Definitions

**Contribution Level** (one of four levels):

1. **Primary contributor**: Meaningful amount at typical culinary serving; plausible functional impact on the system.
2. **Supporting contributor**: Contributes in combination with other foods; not sufficient alone.
3. **Contextual / minor contributor**: Biochemically relevant but quantitatively small at typical servings.
4. **Presence only (trace)**: Detectable or theoretically present but NOT functionally meaningful at real-world intake.

## Critical Visibility Rule

- **"Presence only (trace)" is a classification used to EXCLUDE substances from display.**
- Do NOT create or populate visible lists of "Presence only (trace)" substances by default.
- Presence-only substances should usually be omitted entirely from food pages and matrices.

## Implementation

### Food Page Frontmatter

Add a `contribution_levels` field to each food's frontmatter:

```yaml
contribution_levels:
  Iodine: Primary contributor
  Glycine: Contextual / minor contributor
  Arginine: Contextual / minor contributor
  Methionine: Contextual / minor contributor
  Creatine: Presence only (trace)
```

### Component Behavior

1. **FoodSubstances Component**: Automatically excludes substances marked as "Presence only (trace)" from the substances list.

2. **FoodMatrix Component**: 
   - Adds a "Contribution Level" column to the Biological Target Matrix
   - Automatically filters out rows where contribution level is "Presence only (trace)"
   - Defaults to "Contextual / minor contributor" if not specified

### Page Structure

Each food page should follow this structure:

1. **Overview** (1–2 short paragraphs, food-first, non-operational)
2. **Substance Hierarchy (Functional Contribution)** - Shows only:
   - Primary contributors
   - Supporting contributors
   - Selected contextual contributors
   - (Presence-only substances excluded automatically)
3. **Preparation Notes**
4. **Biological Target Matrix** (with Contribution Level column)
5. **Recipes**
6. **References** (short notes; no overclaims)

## Global Rules

A) Every Biological Target Matrix row MUST include a Contribution Level value.

B) Any substance tagged "Presence only (trace)" MUST NOT appear:
   - In the top-level "Substances" list
   - As a matrix row

C) Presence-only substances may be mentioned ONLY if:
   - They are widely misunderstood as major sources (e.g. creatine in plants, B12 in seaweeds), OR
   - A corrective disclaimer is scientifically necessary.
   
   When mentioned, include them as a single contextual sentence or boxed note — NOT as a list item or matrix entry.

D) Do not include a substance as a listed "Substance" unless it is at least "Contextual / minor contributor" AND the food is a plausible dietary contributor at normal intake frequency.

E) If a mechanism is described, the text MUST be qualified by contribution level (e.g. "context-dependent", "minor", "cumulative", "not a standalone source").

F) Avoid "mechanism inflation":
   - If the substance is not meaningfully present, remove the matrix row entirely.
   - Do not retain rows purely because the biochemistry is interesting.

## Heuristics

### Seaweeds
- Iodine often Primary or Supporting depending on species.
- Vitamin B12 should be marked variable and contextual; never a sole-source claim.

### Amino acids in low-serving foods (e.g. nori)
- Usually Contextual or Presence-only.
- Do NOT attach large mitochondrial, ATP, or creatine-buffering claims unless contribution is Primary/Supporting.

### Creatine in plant foods
- Almost always Presence only (trace) unless explicitly quantified and meaningful.

### Fibre / polysaccharides
- Often Supporting (cumulative) when foods are eaten regularly.

## Conservative Defaults

- When uncertain, prefer "Contextual / minor contributor" over "Supporting".
- Prefer removing a row rather than overstating functional impact.
- Default contribution level (if not specified) is "Contextual / minor contributor".

## Reference Implementation

See `docs/foods/nori.md` as the reference implementation:
- Substances are hierarchised by contribution.
- Creatine is NOT listed as a substance (marked "Presence only (trace)").
- Presence-only concepts appear only as brief disclaimers when necessary.
- Matrix rows include Contribution Level and avoid magnitude inflation.

