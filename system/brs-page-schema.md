# BRS Page Schema

## Build Gate Proviso

- Never render or expose spreadsheet letter identifiers in generated content or public-facing pages.
- Always use semantic entity names (for example, `Intervention Dominance`, `Coverage Timing`, `Evidence Type`).
- Treat any letter-identifier wording in generated outputs as a validation failure that must be fixed before build.

This schema defines the canonical structure for Biological Regulatory System (BRS) overview pages.

## Scope

- Represents one BRS as a system-level control domain.
- Summarizes FM controls and KC requirements without introducing PM-level detail.
- Must remain structure-focused; no scoring formulas.

## Required Front Matter Fields

```yaml
id: string
title: string
sidebar_label: string
description: string
tags:
  - Biological Target
  - string
list_image: string
```

## Section Order (Page Rendering Contract)

1. Name
2. Overview
3. Functional Mechanisms
4. Core Functional Mechanisms
5. Requirements (Key Constraints)
6. Modulators
7. Functional Outputs
8. References

## Section Definitions

## Overview

- Two short paragraphs:
  - paragraph 1: system control role and physiological integration
  - paragraph 2: brain-relevant role and whole-body implication

## Functional Mechanisms

- Short framing sentence describing FMs as primary control points.

## Core Functional Mechanisms

- Bullet list in canonical format:
  - `BRSx-FMy - <FM_NAME>: <One-line control signal description>`
- FM names and one-line descriptions must be copied from spreadsheet source.
- Must not rename, reorder, paraphrase, or reinterpret FM canonical definitions.

## Requirements (Key Constraints)

- Bullet list in canonical format:
  - `BRSx-KCy - <KC_NAME>`
- KCs are requirements/substrates, not intervention prescriptions.
- Must not include food examples in this section.

## Modulators

- Contextual modifiers only (non-core structure).
- Allowed examples include circadian timing, stress/recovery, sleep, physical activity, meal timing.
- Must not treat modulators as FMs, PMs, or KCs.
- Modulator claims must be supported by evidence and cited with inline numeric citations that resolve in the References section.

## Functional Outputs

- Must include both sub-sections:
  - `When functioning well`
  - `When dysregulated`
- Each subsection should use concise bullet points describing observable system-state patterns.

## References

- Placeholder references are allowed in templates.
- Use bibliography links:
  - `/docs/papers/BRAIN-Diet-References#citationKey`
- If claims are made, references must resolve to valid bibliography keys.
- Bibliography entries should include a DOI or source URL so users can click through from bibliography to source.

## Validation Rules

- Must not include scoring formulas.
- Must not include PM->PM or FM->FM dependency chains.
- Must not introduce SM rollout content.
- Must not invent FMs, KCs, references, foods, or substances.
- If required source data is missing, flag instead of inferring.
