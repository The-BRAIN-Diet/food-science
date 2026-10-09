# BRS-X Schema

Citation and reference format: **`system/brs-citation-reference-standard.md`**.

## Definition

**BRS-X** systems are cross-system biological regulatory networks that operate across multiple Biological Regulatory Systems (BRS1–BRS6) simultaneously and cannot be cleanly owned by a single BRS domain.

BRS-X is a first-class framework layer alongside BRS1–BRS6, not a replacement for them.

## Naming convention

| Object | Pattern | Example |
|--------|---------|---------|
| System | `BRS-X(ECS)`, `BRS-X(Hormones)` | Endocannabinoid System |
| Functional mechanism | `BRS-X(ECS-FM1)` | Endocannabinoid tone regulation |
| Primary mechanism | `BRS-X(Hormones-PM3)` | Estrogen–Neurotransmitter Coupling |
| Key constraint | `BRS-X(ECS-KC1)` | When applicable |

**Do not use** the retired `BRS-Cross` naming convention.

## Hub structure

- **BRS-X hub:** `docs/biological-targets/cross-system-regulation.md`
- **System pages:** `docs/biological-targets/brs-x/{ecs,hormones,circadian}/<slug>.md` (frontmatter `id`: `brs-x-ecs`, `brs-x-hormones`, `brs-x-circadian`; permalinks `/docs/biological-targets/brs-x/{ecs,hormones,circadian}/brs-x-{ecs,hormones,circadian}`)

## Connected Mechanisms (replaces Cross-BRS Links)

On **FM**, **PM**, and **SM** pages, cross-system references use a single section:

| Page type | Section | Level |
|-----------|---------|-------|
| FM | `## 5. Connected Mechanisms` | major |
| PM | `## 6. Connected Mechanisms` | major |
| SM | `### 5.5 Connected Mechanisms` | subsection |

**Purpose:** Reference any biologically relevant mechanism regardless of originating system (BRS1–BRS6 or BRS-X).

**FM format:** each bullet links a specific PM or FM page and includes a one-sentence connection after an em dash:

```markdown
- [BRS3-FM2-PM5 — Lipid Peroxidation Control](/docs/.../brs3-fm2-pm5-lipid-peroxidation-control) — membrane PUFA protection once DHA is incorporated
```

Do not list BRS hub pages alone (for example `BRS1 — Neurotransmitter Regulation`) without a specific mechanism link and connection sentence. Roll up from child PM `§6.2 Connected BRS Mechanisms`.

Examples:

- `BRS1-FM1-PM2 — LAT1 Competitive Transport Modulation`
- `BRS5-FM2-PM5 — SCFA Production & Signalling`
- `BRS-X(ECS-PM1) — Endocannabinoid Tone Regulation`
- `BRS-X(Hormones-PM3) — Estrogen–Neurotransmitter Coupling`

PM §6 (`BRS Pathways and Connections`) holds pathway chains (§6.1), cross-BRS links (§6.2), and same-host-FM rollups (§6.3).

## Relationship to SMs

No change to SM architecture. SMs remain interpretation layers and do not own biological mechanisms. PMs and FMs remain authoritative biological objects.

SM pages may reference Connected FMs, PMs, KCs, Mechanisms, Mods, and Mediators in prose and link lists.

Examples:

- **SM-Female** may reference `BRS-X(Hormones-FM2)`, Estrogen–Neurotransmitter Coupling, Estrobolome Regulation
- **SM-Male** may reference Testosterone–Motivation Signalling, Androbolome Regulation

## Initial systems

| ID | Name | Connected BRSs |
|----|------|----------------|
| `BRS-X(ECS)` | Endocannabinoid System | BRS1, BRS3, BRS4, BRS5, BRS6 |
| `BRS-X(Hormones)` | Hormone Signalling & Regulation | BRS1, BRS2, BRS3, BRS4, BRS5, BRS6 |
| `BRS-X(Circadian)` | Circadian Rhythm Regulation | BRS1, BRS4, BRS5, BRS6 — hub, FM1, and two PMs are published; further FMs remain deferred |

### BRS-X(Circadian) — FM1 published

The hub, FM1, and two primary mechanisms are published. Light–dark entrainment and feeding-time synchronisation replaced BRS6-FM2-PM5. Cortisol output stays on BRS6-FM2-PM4. The longer outline in `system/brs-x-circadian-outline.md` is not the published structure.

| FM | Title | PMs |
|----|-------|-----|
| `BRS-X(Circadian-FM1)` | Light and Feeding Zeitgeber Entrainment | PM1 Light–Dark Circadian Entrainment; PM2 Feeding-Time Circadian Synchronisation |
| `BRS-X(Circadian-FM2)` | Circadian Metabolic & Endocrine Oscillation *(deferred, not published)* | PM4 CLOCK–NAMPT–NAD⁺ Oscillation; PM5 Diurnal Cortisol & HPA Phase Coupling; PM6 Circadian Glycaemic & Insulin-Sensitivity Rhythms |
| `BRS-X(Circadian-FM3)` | Circadian Neurochemical & Sleep–Wake Coupling *(deferred, not published)* | PM7 Melatonin Synthesis & Dietary Support; PM8 Diurnal Monoamine & Precursor Timing; PM9 Arousal–Sleep Interface (Histaminergic Context) |
| `BRS-X(Circadian-FM4)` | Circadian Gut–Microbiome Rhythmicity *(deferred, not published)* | PM10 Feeding-Rhythm → Microbiome Turnover; PM11 Microbial Metabolite–Melatonin Interface |

**KCs (not published):** `BRS-X(Circadian-KC1)` Zeitgeber Coherence & Day-Structure Regularity; `BRS-X(Circadian-KC2)` Circadian Substrate & Cofactor Sufficiency.

**BRS6 retention:** `BRS6-FM2-PM5` has moved. No replacement interface PM was added. `BRS6-FM2-PM4` remains the cortisol mechanism.

### BRS-X(Hormones) — proposed FM structure

| FM | Title | Potential PMs |
|----|-------|---------------|
| `BRS-X(Hormones-FM1)` | Hormone Production & Availability | Steroid Hormone Synthesis; Endocrine Cofactor Sufficiency |
| `BRS-X(Hormones-FM2)` | Hormone-Responsive Neural Regulation | Estrogen–Neurotransmitter Coupling; Progesterone–GABA Regulation; Testosterone–Motivation Signalling |
| `BRS-X(Hormones-FM3)` | Hormone–Microbiome Interaction | Estrobolome Regulation; Androbolome Regulation; Microbial Hormone Biotransformation |
| `BRS-X(Hormones-FM4)` | Hormonal Adaptation & Transition Resilience | Menstrual Cycle Adaptation; Perimenopause & Menopause Adaptation; Androgen Transition & Ageing Adaptation; Gender-Affirming Hormone Transition Support |

## Long-term vision

BRS1–BRS6 remain the core architecture. **BRS-X(Circadian)** is published for the hub, FM1, and the two zeitgeber mechanisms. Further circadian functional mechanisms stay in `system/brs-x-circadian-outline.md` and are not published. Promotion of a further mechanism requires evidence of a distinct biological route. Exercise timing, stress-reduction techniques, and caffeine remain modulators and are not mapped as primary mechanisms.
