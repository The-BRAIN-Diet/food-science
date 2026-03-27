---
title: Functional metrics (food pages)
sidebar_label: Functional metrics
description: How “Functional metrics” are defined on food pages (Low/Medium/High scoring).
unlisted: true
draft: true
---

## Overview

Food pages can optionally include **Functional metrics** inside the **Nutrient Tables** block. These are **qualitative scores** intended for within-framework orientation (not precision nutrition).

## Why scores (not numbers)

Many “functional” attributes (e.g. total polyphenols proxy, antioxidant capacity proxies, processing-sensitive bioactive retention) vary strongly with:

- cultivar and origin
- harvest/storage conditions
- processing (fermentation/roasting/alkalisation, etc.)
- brand formulation
- assay method and reporting conventions

Because of that, numeric cross-food comparisons are often misleading. The framework therefore uses **Low / Medium / High** scores plus short notes.

## Scoring scale

- **Low**: present but not a defining feature of the food in typical servings, or highly variable and usually modest.
- **Medium**: meaningfully present and relevant in typical servings; can contribute to dietary strategy.
- **High**: a defining feature of the food; consistently ranks high within its category, or can be reliably high with common sourcing/preparation patterns.

## Front matter schema

Add this to a food page front matter:

```yaml
nutrition_functional_metrics:
  - key: total_polyphenols_proxy
    label: Total polyphenols (Folin proxy)
    score: High
    notes: Short, food-specific context about variability, preparation, or interpretation.
```

Supported scores: `Low`, `Medium`, `High`.
