# BRS-X(Circadian) — Implementation Specification

**Status:** Spec only — **do not implement hub/FM/PM pages or migrate BRS6-FM2-PM5 until the ADHD paper ships.**  
**Authoritative schema:** `system/brs-x-schema.md`, `system/specific-mechanism-schema.md`, `system/primary-mechanism-schema.md`  
**Related manuscript:** `paper.txt` Section 10 (Circadian Rhythm Modulators, Chrono-Nutrition, Exercise, Sleep)

---

## 1. Purpose & positioning

**System ID:** `BRS-X(Circadian)`  
**Working title:** Circadian Rhythm Regulation  
**Hub path (post-v1):** `docs/biological-targets/brs-x/circadian/circadian-rhythm-regulation.md`  
**Permalink (post-v1):** `/docs/biological-targets/brs-x/circadian/brs-x-circadian`  
**Register on:** `docs/biological-targets/cross-system-regulation.md`

**One-line:** Cross-system timing architecture coordinating light, sleep, feeding, and neuroendocrine/metabolic oscillations across BRS1–BRS6.

**Hub thesis:** Circadian biology is not a BRS6 subtopic. It is a higher-order regulatory network that sets the phase at which diet, stress, bioenergetics, neurotransmitter biology, and gut signalling are interpreted. BRS-X(Circadian) owns **clock entrainment and 24-hour oscillation**; BRS1–BRS6 PMs remain authoritative for domain mechanism biology.

**Intervention profile (hub-level):** Mixed Modulation — lifestyle-dominant for zeitgebers; food-state-relevant for chrono-nutrition and melatonin substrate support.

**Scope exclusions (v1 / paper):**

- Do **not** create circadian SMs or `SM-ADHD` pages.
- Do **not** map **exercise timing**, **stress-reduction techniques**, or **caffeine** as PMs — hub modulator paragraph only (see §8).
- ADHD genetics/outcome papers (e.g. Takahashi 2024) → hub dropdown / therapeutic framing only until post-paper review.

---

## 2. Key Constraints

| KC | Title | Role |
|----|-------|------|
| `BRS-X(Circadian-KC1)` | Zeitgeber Coherence & Day-Structure Regularity | Shared timing context: sleep–wake consistency, feeding-window regularity, light–dark exposure pattern |
| `BRS-X(Circadian-KC2)` | Circadian Substrate & Cofactor Sufficiency | Magnesium, B vitamins, tryptophan/melatonin precursor context, niacin/NAD⁺ cofactors supporting clock-coupled metabolism |

BRS6(KC1/KC2) remain on BRS6 pages. Circadian KCs describe **timing-layer** sufficiency, not glucose/micronutrient pools themselves.

---

## 3. Functional Mechanisms & Primary Mechanisms

### FM1 — Zeitgeber Entrainment & Chrono-Structure

**FM ID:** `BRS-X(Circadian-FM1)`  
**Summary:** Aligns central and peripheral clocks through light, sleep–wake, and feeding timing — the upstream inputs that set 24-hour phase across systems.

**Primary biological effects:** ↑ phase alignment; ↑ zeitgeber coherence; ↓ circadian misalignment; ↑ sleep–wake stability  
**Modulation:** Behavioural/Lifestyle Dominant · Timing-specific: Yes · Coverage: Daily

| PM | ID | Title |
|----|-----|-------|
| PM1 | `BRS-X(Circadian-FM1-PM1)` | Light–Dark Entrainment |
| PM2 | `BRS-X(Circadian-FM1-PM2)` | Sleep–Wake Regularity & Recovery Timing |
| PM3 | `BRS-X(Circadian-FM1-PM3)` | Chrono-Nutrition & Feeding-Window Entrainment |

**PM1 — Light–Dark Entrainment**

- **Definition:** Morning/daytime light and reduced evening blue-enriched light as SCN phase cues.
- **Tier-1 evidence:** Scheer 2009; Tähkämö 2019; Silvani 2022
- **Tier-2 (post-v1):** Huang 2015/2020

**PM2 — Sleep–Wake Regularity & Recovery Timing**

- **Definition:** Stable bed/wake times; sleep duration as entrainment and recovery lever.
- **Tier-1 evidence:** Spiegel 1999 (via NAD link); Scheer 2009
- **Tier-2 (hub only initially):** Becker 2019 (ADHD sleep)

**PM3 — Chrono-Nutrition & Feeding-Window Entrainment**

- **Definition:** Meal timing, TRF/eating windows, early vs late energy distribution as peripheral clock zeitgebers.
- **Tier-1 evidence:** Hatori 2012; Garaulet 2014; Scheer 2009
- **Tier-2 (post-v1):** Franzago 2023; Young 2023; Poggiogalle 2018
- **Migration source:** Primary recipient of current `BRS6-FM2-PM5` content (see §6).

**FM1 connected BRS (hub + FM §5 roll-up):**

| Target | Connection |
|--------|------------|
| BRS6-FM2-PM4 | Misaligned zeitgebers propagate into HPA phase drift — BRS6 readout |
| BRS6-FM1-PM1–PM3 | Circadian phase modulates glycaemic tolerance and excursion timing |
| BRS4-FM1-PM2 | Clock–NAMPT coupling links entrainment to redox/metabolic oscillation |
| BRS5-FM2-PM4 | Feeding rhythms entrain gut microbial community turnover |
| BRS1-FM1-PM2 | Meal timing shifts LNAA ratios and precursor bias across the day |

---

### FM2 — Circadian Metabolic & Endocrine Oscillation

**FM ID:** `BRS-X(Circadian-FM2)`  
**Summary:** How molecular clocks and peripheral rhythms reshape NAD⁺, cortisol, insulin sensitivity, and mitochondrial metabolic output across the 24-hour cycle.

**Primary biological effects:** ↑ diurnal metabolic rhythm stability; ↑ NAD⁺ phase coupling; ↑ time-appropriate insulin sensitivity; ↓ misalignment-driven endocrine drift  
**Modulation:** Mixed Modulation · Timing-specific: Yes · Coverage: Daily

| PM | ID | Title |
|----|-----|-------|
| PM4 | `BRS-X(Circadian-FM2-PM4)` | CLOCK–NAMPT–NAD⁺ Oscillation |
| PM5 | `BRS-X(Circadian-FM2-PM5)` | Diurnal Cortisol & HPA Phase Coupling |
| PM6 | `BRS-X(Circadian-FM2-PM6)` | Circadian Glycaemic & Insulin-Sensitivity Rhythms |

**PM4 — CLOCK–NAMPT–NAD⁺ Oscillation**

- **Definition:** Circadian control of NAD⁺ biosynthesis and SIRT1 coupling.
- **Tier-1 evidence:** Ramsey 2009; Nakahata 2009
- **Boundary:** Molecular NAD⁺ biochemistry stays authoritative on **BRS4-FM1-PM2**; this PM is the circadian interpretation layer.

**PM5 — Diurnal Cortisol & HPA Phase Coupling**

- **Definition:** Cortisol amplitude/phase as clock-output into neuroendocrine stress (interpretive cross-link only).
- **Tier-1 evidence:** Scheer 2009; Chang 2021
- **Boundary:** HPA cortisol regulation, cofactors, and gut–HPA evidence stay on **BRS6-FM2-PM4**.

**PM6 — Circadian Glycaemic & Insulin-Sensitivity Rhythms**

- **Definition:** Time-of-day variation in glucose tolerance and insulin action.
- **Tier-1 evidence:** Poggiogalle 2018; Garaulet 2014

**FM2 connected BRS:**

| Target | Connection |
|--------|------------|
| BRS4-FM1-PM2 | Canonical NAD⁺/clock molecular detail |
| BRS4(FM1) | Bioenergetic rhythm alignment |
| BRS6(FM2) | HPA rhythm FM — downstream of clock outputs |
| BRS6(FM1) | Glycaemic–insulin stability under circadian phase |

---

### FM3 — Circadian Neurochemical & Sleep–Wake Coupling

**FM ID:** `BRS-X(Circadian-FM3)`  
**Summary:** Diurnal neurotransmitter phasing, melatonin biology, and arousal/sleep chemistry — how nutrient timing supports brain-relevant circadian outputs.

**Primary biological effects:** ↑ sleep–wake neurochemistry alignment; ↑ melatonin substrate context; ↑ time-appropriate monoamine bias; ↓ arousal–sleep conflict  
**Modulation:** Food-State Leaning + Lifestyle · Timing-specific: Yes

| PM | ID | Title |
|----|-----|-------|
| PM7 | `BRS-X(Circadian-FM3-PM7)` | Melatonin Synthesis & Dietary Support Context |
| PM8 | `BRS-X(Circadian-FM3-PM8)` | Diurnal Monoamine & Precursor Timing |
| PM9 | `BRS-X(Circadian-FM3-PM9)` | Arousal–Sleep Interface (Histaminergic Context) |

**PM7 — Melatonin Synthesis & Dietary Support Context**

- **Tier-1 evidence:** Peuhkuri 2012; Rondanelli 2018; Losso 2018 (tart cherry)
- **Links:** tryptophan substance page; tart cherry, pumpkin seeds, oats food pages

**PM8 — Diurnal Monoamine & Precursor Timing**

- **Tier-1 evidence:** Wurtman 2003; Huang 2020 (review)
- **Manuscript anchor:** paper.txt §9.1.1 (AM tyrosine / PM tryptophan pattern)

**PM9 — Arousal–Sleep Interface (Histaminergic Context)**

- **Tier-1 evidence:** Briguglio 2018; BRS1 SM-CROSS1 references
- **Boundary:** Does not own histamine PM biology — links to BRS1(SM-CROSS1).

**FM3 connected BRS:**

| Target | Connection |
|--------|------------|
| BRS1-FM1-PM1–PM4 | Monoaminergic timing context |
| BRS1(SM-CROSS1) | Histaminergic arousal × circadian entrainment |
| BRS5-FM2-PM5/PM6 | SCFA / butyrate–melatonin interface (Checa-Ros — defer detail to FM4) |

---

### FM4 — Circadian Gut–Microbiome Rhythmicity (deferred)

**FM ID:** `BRS-X(Circadian-FM4)` — implement only if ADHD gut–sleep becomes a headline claim post-paper.

| PM | ID | Title | Evidence |
|----|-----|-------|----------|
| PM10 | `BRS-X(Circadian-FM4-PM10)` | Feeding-Rhythm → Microbiome Turnover | BRS5-FM2-PM4 existing prose |
| PM11 | `BRS-X(Circadian-FM4-PM11)` | Microbial Metabolite–Melatonin Interface | Checa-Ros 2021 |

---

## 4. Hub-level Connected Mechanisms (roll-up)

List **specific PM/FM pages** only — never BRS hubs alone.

**BRS1:** FM1-PM1, FM1-PM2, FM1-PM4, SM-CROSS1  
**BRS2:** FM1-PM3 (SAMe — brief link only)  
**BRS3:** hub oxidative narrative (sleep/circadian disruption) until PM added  
**BRS4:** FM1-PM2, FM1  
**BRS5:** FM2-PM4, FM2-PM5  
**BRS6:** FM2-PM4, FM2-PM5 (revised), FM1-PM1–PM3, FM3  

---

## 5. Migration matrix — `BRS6-FM2-PM5`

**Current page:** `docs/biological-targets/brs6/fm2/brs6-fm2-pm5-circadian-feeding-and-light-dark-entrainment.mdx`

### Migrate → BRS-X(Circadian)

| Content block | Destination |
|---------------|-------------|
| Definition (feeding + light + sleep as zeitgebers) | FM1 hub + PM1–PM3 |
| §4.1 dietary levers (meal timing, TRF, morning-forward) | FM1-PM3 |
| §4.2 lifestyle levers (light, sleep timing) | FM1-PM1 + FM1-PM2 |
| §5 Hatori + Garaulet evidence | FM1-PM3 |
| §5 Scheer misalignment | FM1 rollup + FM2-PM5/PM6 (split angles) |
| §7 scoreable chrononutrition inputs | FM1-PM3 |
| §6.2 BRS1/BRS4 links | BRS-X hub + FM connected mechanisms |

**ID change:** `BRS6-FM2-PM5` → `BRS-X(Circadian-FM1-PM3)` with **301 redirect** from old URL.

### Stay on BRS6 (revised)

| Content | Where |
|---------|-------|
| BRS6(KC1) glycaemic consequences of bad timing | BRS6-FM1 PMs + **new BRS6-FM2-PM5** |
| Cofactors as stress-HPA support | BRS6-FM2-PM4 + BRS6(KC2) |
| Cortisol rhythm detail | **BRS6-FM2-PM4** (unchanged owner) |
| Chang 2021, Schmidt 2015 | BRS6-FM2-PM4 |
| FM2 integrated narrative | **BRS6(FM2)** — rewrite as HPA rhythm under circadian influence |

### New BRS6-FM2-PM5 (replacement)

**Title:** Circadian Misalignment → HPA–Metabolic Stress Interface  
**Keep pm_id:** `BRS6-FM2-PM5` (recommended — avoids renumbering FM2 PM list)

**Definition:** How circadian misalignment and erratic timing propagate into BRS6-relevant HPA drift, glycaemic instability, and autonomic stress load — **downstream consequences**, not zeitgeber instruction.

**Content (~30% of old PM5):**

- Short definition + link to BRS-X(Circadian-FM1)
- Scheer from BRS6 stress-consequence angle only (one highlight block max)
- Failure modes from existing BRS6(FM2) §4.3
- §6.2 → BRS-X(Circadian-FM1) upstream

**Do not duplicate:** Hatori, Garaulet, TRF, scoreable chrononutrition tables.

### BRS6-FM2-PM4 — stay, re-link

- Keep full PM body.
- Add §6.2 → BRS-X(Circadian-FM2-PM5), BRS-X(Circadian-FM1-PM2).
- Trim duplicate Scheer highlight — one sentence + link to BRS-X.

### Backlink updates (post-migration)

| Source | New primary link |
|--------|------------------|
| BRS5-FM2 PM4/PM5/PM6, FM2 hub | BRS-X(Circadian-FM1-PM3) + BRS6-FM2-PM5 |
| BRS1 SM-CROSS1 | BRS-X(Circadian-FM1) + FM3-PM9 |
| BRS6 KC1 | BRS-X FM1-PM3 + BRS6-FM2-PM5 |
| BRS6 FM2 hub | PM4 + new PM5 + link to BRS-X FM1 |

---

## 6. BRS4-FM1-PM2 (NAD⁺) — stay, re-link only

| Stay on BRS4-PM2 | BRS-X narrative only |
|------------------|----------------------|
| NAD⁺ redox biochemistry, niacin, Pirinen, de Guia | CLOCK–NAMPT–SIRT1 oscillation framing on FM2-PM4 |
| Lifestyle sleep/rhythm bullets (Nakahata) | Ramsey/Nakahata primary on BRS-X FM2-PM4 |

---

## 7. Evidence tiering (hub ADHD dropdown, post-v1)

**Tier 1 (ADHD-facing):** Scheer, Garaulet, Hatori, Takahashi 2024, Franzago 2023, Poggiogalle 2018, Peuhkuri 2012  

**Tier 2 (architecture):** Ramsey, Nakahata, Wurtman, Huang 2020, Tähkämö, Silvani  

**Tier 3 (modulators — hub paragraph only):** Youngstedt, Burke (caffeine), exercise, stress techniques  

**Therapeutic-area only:** Becker 2019, Isaksson 2012, Nair 2025, Hirose 2025  

---

## 8. Modulators (unmapped until post-paper + modulator layer)

Single hub paragraph acknowledging but **not** PM-mapping:

- Exercise timing (Youngstedt 2019)
- Stress-reduction / vagal recovery techniques
- Caffeine near bedtime (Burke 2015)

Same deferral policy as exercise/stress modulators elsewhere in the framework.

---

## 9. Hub page skeleton

1. Overview  
2. Functional Mechanisms (FM1–FM3 `<details>`)  
3. Requirements (KC1, KC2)  
4. Connected BRS Mechanisms (BRS1–6 table)  
5. ADHD dropdown (optional, post-v1)  
6. References (Tier 1)  
7. Modulators (future) — §8 paragraph  

Mirror ECS/Hormones hub: `docs/biological-targets/brs-x/ecs/endocannabinoid-system.md`.

---

## 10. Implementation sequence (post-paper)

| Phase | Work |
|-------|------|
| A | Extend `brs-x-schema.md`; add redirect in `docusaurus.config.ts` when PM5 migrates |
| B | Hub + FM1 (PM1–PM3) — migrate PM5 content |
| C | FM2 (PM4–PM6) + FM3 (PM7–PM9) thin pages with cross-links |
| D | Replace BRS6-FM2-PM5 with downstream interface PM; redirect old URL |
| E | Update BRS5 / BRS1 SM-CROSS / BRS4 PM2 backlinks |
| F | Wire bib orphans: Franzago, Poggiogalle, Takahashi, Youngstedt, Tähkämö |
| G | ADHD dropdown on BRS-X circadian hub |
| H | FM4 gut clock (optional) |

---

## 11. Decision log

| Decision | Choice |
|----------|--------|
| FM count | 3 FMs (+ deferred FM4) |
| PM5 migration | Migrate zeitgeber content to BRS-X; replace BRS6-PM5 with downstream interface |
| Cortisol PM4 owner | BRS6 (unchanged) |
| NAD clock refs owner | BRS4 PM2 authoritative; BRS-X FM2-PM4 interpretive |
| Exercise/stress/caffeine | Modulator paragraph only |
| ADHD genetics | Hub dropdown / SM-PHEN later |

---

## 12. Frontmatter stubs (copy when implementing)

### Hub

```yaml
id: brs-x-circadian
title: BRS-X(Circadian) - Circadian Rhythm Regulation
sidebar_label: BRS-X(Circadian) - Circadian Rhythm Regulation
description: Cross-system timing network spanning light, sleep, feeding, and 24-hour metabolic and neurochemical oscillation
tags:
  - Biological Target
  - Cross-System Regulation
  - Circadian Rhythm
hide_title: true
```

### FM1

```yaml
fm_id: BRS-X(Circadian-FM1)
parent_brs: BRS-X(Circadian)
title: Zeitgeber Entrainment & Chrono-Structure
summary: >-
  Aligns central and peripheral clocks through light, sleep–wake, and feeding
  timing — the upstream inputs that set 24-hour phase across BRS1–BRS6.
intervention_dominance: Lifestyle-Dominant
intervention_breakdown: Behavioural/Lifestyle Dominant
timing_specific: 'Yes'
coverage_timing: Daily
```

### FM1-PM3 (migration target for old BRS6-PM5)

```yaml
pm_id: BRS-X(Circadian-FM1-PM3)
parent_fm: BRS-X(Circadian-FM1)
parent_brs: BRS-X(Circadian)
title: Chrono-Nutrition & Feeding-Window Entrainment
summary: >-
  Aligns meal timing, eating windows, and early-vs-late energy distribution
  with peripheral metabolic clock entrainment across the 24-hour cycle.
intervention_dominance: Lifestyle-Dominant
intervention_breakdown: Behavioural/Lifestyle Dominant
timing_specific: 'Yes'
references:
  - '[Hatori et al. (2012) — Time-restricted Feeding...](/docs/papers/BRAIN-Diet-References#hatori_2012_22608008)'
  - '[Garaulet & Gómez-Abellán (2014) — A Novel Association.](/docs/papers/BRAIN-Diet-References#garaulet_2014_24467926)'
  - '[Scheer et al. (2009) — Adverse Metabolic and Cardiovascular Consequences of Circadian Misalignment.](/docs/papers/BRAIN-Diet-References#scheer_2009_19255424)'
```

### New BRS6-FM2-PM5 (replacement)

```yaml
pm_id: BRS6-FM2-PM5
parent_fm: BRS6(FM2)
parent_brs: BRS6
title: Circadian Misalignment → HPA–Metabolic Stress Interface
summary: >-
  Describes how circadian misalignment and erratic timing propagate into
  HPA drift, glycaemic instability, and autonomic stress load within BRS6 —
  downstream of zeitgeber entrainment (BRS-X Circadian-FM1).
intervention_dominance: Lifestyle-Dominant
intervention_breakdown: Behavioural/Lifestyle Dominant
timing_specific: 'Yes'
references:
  - '[Scheer et al. (2009) — Adverse Metabolic and Cardiovascular Consequences of Circadian Misalignment.](/docs/papers/BRAIN-Diet-References#scheer_2009_19255424)'
```

### FM2-PM4

```yaml
pm_id: BRS-X(Circadian-FM2-PM4)
parent_fm: BRS-X(Circadian-FM2)
title: CLOCK–NAMPT–NAD⁺ Oscillation
summary: >-
  Circadian control of NAD⁺ biosynthesis via NAMPT and SIRT1 coupling —
  interpretive layer linking clock phase to BRS4 NAD⁺ metabolism.
intervention_breakdown: Mixed Modulation
timing_specific: 'Yes'
references:
  - '[Ramsey et al. (2009) — Circadian clock feedback cycle through NAMPT...](/docs/papers/BRAIN-Diet-References#ramsey_circadian_2009)'
  - '[Nakahata et al. (2009) — The NAD+-dependent deacetylase SIRT1 modulates CLOCK-mediated chromatin remodeling...](/docs/papers/BRAIN-Diet-References#nakahata_clock_2009)'
```

---

## 13. Existing site touchpoints (audit reference)

| Location | Current circadian role |
|----------|------------------------|
| BRS6-FM2-PM5 | Only dedicated circadian PM — **migrate** |
| BRS6-FM2-PM4 | Cortisol rhythm — **stay, re-link** |
| BRS4-FM1-PM2 | Ramsey/Nakahata — **stay, re-link** |
| BRS1 multiple PMs | Meal-timing lifestyle bullets |
| BRS1 SM-CROSS1 | Histamine × circadian crossover |
| BRS5 FM2 PM4/PM5/PM6 | Links to BRS6-PM5 — **update post-migration** |
| Substance/food pages | Tryptophan, tart cherry, oats, pumpkin seeds |
| Bib (22 circadian entries) | ~8 wired to mechanism pages today |
