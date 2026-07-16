# BRS Hub Page Authoring Standard

Rollup and presentation schema for **BRS1–BRS6 hub pages**.

**Dietary and Lifestyle Levers reference:** **BRS2** (`docs/biological-targets/methylation-one-carbon-metabolism.md`) is the canonical implementation. Apply the same KC-integrated Dietary Guidance layout when rewriting other hubs.

## Purpose

Each BRS hub page should orient readers in under one minute: explain the biological objective, translate system requirements into practical dietary guidance, and guide readers into Functional Modules — without duplicating PM-level biology, Food Profiles, or Recipes.

---

## Hub page structure (BRS1–BRS6)

| # | Section | Status |
|---|---------|--------|
| 1 | Title + functional descriptor | Required |
| 2 | **Ambition** | Required — manual |
| 3 | **Therapeutic Area Research** | BRS1–BRS6 ADHD dropdowns — [BRS Hub ADHD TA Dropdown](./brs-hub-ta-adhd-dropdown-schema.md); [BRAIN TA Evidence Integration Standard v1.2](./brain-ta-evidence-integration-standard.md) |
| 4 | **Dietary and Lifestyle Levers** | Required — **Dietary Guidance**, **System Optimisation Practices**, **Lifestyle Priorities** (see [BRS Dietary Guidance Standard](#brs-dietary-guidance-standard-final)). Shared Key Constraint pools are introduced **inside** Dietary Guidance — not as a standalone hub section. |
| 5 | **Functional Mechanisms** | Required — regenerate with `npm run brs:update-hub-fms` |
| 5a | **Cross-BRS Dependencies** | Landmark mechanistic reviews per Cross-BRS dependency (Category B — not in ADHD dropdown) |
| 6 | **Specific Mechanisms** and downstream navigation (SMs, etc.) | Required |

**Removed from hub pages (do not restore):**

- Standalone **Key Constraints (Dietary Bottlenecks)** section (KC pools fold into Dietary Guidance — see [KC-integrated Dietary Guidance](#kc-integrated-dietary-guidance-canonical))
- Standalone **Overview** section (content relocated into Ambition or Dietary Guidance Biology)
- Standalone **Biological Bottlenecks / Constraints** section (content integrated into Dietary Guidance Biology)
- Standalone **References** section on the hub (TA dropdown carries its own references)
- Separate **Target Foods** dropdown (target foods now live inside each Dietary Guidance point)

**Migration status:** BRS1–BRS6 are live on the canonical KC-integrated Dietary Guidance layout; do not re-run `brs:generate-hub-key-constraints` for hubs already migrated (generator skips them).

Apply or refresh Therapeutic Area Research markers:

```bash
npm run brs:patch-ta-research
```

Apply or refresh Cross-BRS Dependencies sections:

```bash
npm run brs:generate-hub-cross-integration
```

Source of truth: `scripts/data/brs-cross-integration-evidence.json` (also consumed by the Miguel manuscript generator).

---

## Cross-BRS Dependencies

Cross-BRS dependencies explain **how the Functional Mechanisms within one Biological Regulatory System collectively preserve the adaptive performance of another during sustained physiological demand.** Category B evidence — not ADHD intervention studies. Rendered as collapsible notes on each hub page.

**Canonical graph rule:** PM §6.2 **Cross-BRS Mechanism Relationships** are the single canonical home for explicit PM-to-PM biological relationships. Hub Cross-BRS Dependencies provide **systems-level interpretation** on the hub — they must **not** duplicate PM relationship lists (no **Declared PM Relationships** panels).

**PM relationships are not the BRS dependency.** PM §6.2 declarations provide mechanistic evidence supporting the dependency, but a BRS dependency is a systems-level biological interpretation informed by literature, physiology, integrated BRS architecture, and expert interpretation.

### Core principle

Every Cross-BRS relationship answers:

> **How do the Functional Mechanisms within this Biological Regulatory System collectively preserve the adaptive performance of another Biological Regulatory System?**

Derive the biological story from the **contributing BRS architecture** (its FMs). Literature validates the conclusion; it does not lead the narrative. The **Biological Regulatory System** is always the unit of explanation.

### Hub panel structure (required)

Each relationship in `scripts/data/brs-cross-integration-evidence.json` uses system-level fields. Each hub collapsible uses these layers:

| # | Field / layer | Section title | Question |
|---|---------------|---------------|----------|
| 1 | `biological_contribution` | **Biological Contribution** | What does this BRS snapshot collectively contribute? |
| 2 | `systems_significance` | **Systems Significance** | Why does preserving this capacity matter for the downstream BRS? |
| 3 | `integrated_regulatory_capacity` | **Integrated Regulatory Capacity** | What integrated regulatory capacities produce this cross-BRS relationship? |
| 4 | `evidence[]` | **Supporting Evidence** | Which landmark reviews validate the systems interpretation? |
| — | `translational_examples[]` (optional) | **Translational Examples** | Worked intervention examples — not proof of every intermediate step |

**Panel order (required):** Biological Contribution → Systems Significance → Integrated Regulatory Capacity → **Supporting Evidence** → Translational Examples (if any).

**Do not render Declared PM Relationships on hub pages.** PM §6.2 on Primary Mechanism pages is the canonical PM-to-PM graph.

Hub renderer: `scripts/lib/brs-hub-cross-integration.mjs`. Regenerate hubs: `npm run brs:generate-hub-cross-integration`.

#### 1. Biological Contribution

One concise sentence. Emergent contribution of the **whole BRS**, not individual PMs. Frame **adaptive capacity** (ability to regulate appropriately under demand).

*Collectively, the Functional Mechanisms within [source BRS] maintain the adaptive [capacity] that enables [destination BRS] to [preserve function] under prolonged physiological demand.*

#### 2. Systems Significance

Explain **adaptive systems significance** — upstream enabling role, principal biological constraints under allostatic load, complement vs substitute. This is the primary section for **allostatic framing** (see below). Include:

- Demand-preservation clause (*reducing the likelihood that… become the principal biological constraint(s)…*)
- Upstream enabling system (or principal gateway for BRS6)
- Complement clause (*preserving the biological environment within which resilient [function] can be sustained*)

#### 3. Integrated Regulatory Capacity

FM-derived integrated capacities at **BRS level only**. Open with *Together, the Functional Mechanisms within…* Close with *Rather than acting through a single pathway…*

Do **not** introduce PM detail (vesicle mobilisation, enzymes, receptor subtypes).

#### 4. Supporting Evidence

1–3 landmark systems-biology papers. Each `supports` field validates the framework interpretation at BRS level — not a bibliographic synopsis. No dietary prescriptions.

### Positioning allostasis across the BRS network

Do **not** present allostasis as synonymous solely with BRS6.

- **BRS6** is the principal **gateway** for introducing allostatic theory (HPA-axis, autonomic regulation, glycaemic control, stress–metabolic load allocation).
- **Canonical implementation:** `(BRS6 → BRS1)` Cross-BRS **Integrated Regulatory Capacity** — how allostasis is implemented biologically across the integrated network.
- **Allostasis** is a property of the **entire BRS network**, not a single system.

The six BRSs collectively determine adaptive capacity (`brs_adaptive_resilience_roles` in the integration library):

| BRS | Adaptive resilience role |
|-----|--------------------------|
| BRS1 | Resilient neurotransmitter regulation and neurochemical signalling |
| BRS2 | Methylation, biosynthetic and repair capacity |
| BRS3 | Inflammatory and oxidative resilience |
| BRS4 | Bioenergetic reserve and adaptive mitochondrial capacity |
| BRS5 | Gut-derived signalling, substrate availability and host–microbial regulation |
| BRS6 | Neuroendocrine resource allocation, stress adaptation and physiological recovery |

Allostatic load emerges when one or more adaptive capacities become constrained and remaining BRSs must compensate. BRS6 frequently **initiates or coordinates** these responses; successful adaptation depends on **integrated performance of all six BRSs**.

Therefore:

- Introduce allostatic **theory** primarily within **(BRS6 → BRS1) Cross-BRS Dependencies** (Systems Significance + Integrated Regulatory Capacity).
- Explain other Cross-BRS dependencies in terms of **preserving adaptive capacity and biological resilience**.
- Avoid describing every BRS as *"an allostatic system."*
- Present the six BRSs as the **integrated adaptive network** through which allostatic regulation is achieved.

Distinguish:

- **BRS6** — principal gateway for explaining allostatic regulation
- **Complete BRS network** — biological substrate through which adaptive regulation and resilience are maintained

### Allostasis reference tiers

Foundational citations live in `allostasis_reference_tiers` within `scripts/data/brs-cross-integration-evidence.json`. Use in **(BRS6 → BRS1) Cross-BRS** Systems Significance and Supporting Evidence; brief pointer only in manuscript introduction.

| Tier | Papers | Role |
|------|--------|------|
| **1 — Foundational** | Sterling & Eyer (1988); McEwen (1998); McEwen (2006) | Define allostasis, allostatic load, brain-centred adaptive regulation |
| **2 — Network biology** | McEwen & Wingfield (2003)*; Picard et al. (2014); Picard (2015) | Interacting systems, mitochondrial allostatic load, signalling organelles |
| **3 — Systems extensions** | Picard (2018)*; Picard & McEwen (stress–mitochondria)*; Slavich & Irwin (2014) | Stress adaptation, BRS6↔BRS4/BRS3 bridges |

\*Pending bibliography entry — add to `static/bibtex/BRAIN-diet.bib` before citing on published pages.

### Worked example (BRS4 → BRS1)

**Biological Contribution**

> Collectively, the Functional Mechanisms within BRS4 maintain the adaptive bioenergetic reserve that enables BRS1 to sustain neurotransmitter regulation under prolonged physiological demand.

**Systems Significance**

> By preserving these bioenergetic capacities, BRS4 reduces the likelihood that energetic limitation becomes the principal rate-limiting constraint on neurotransmitter regulation within BRS1 as allostatic load increases. BRS4 is not itself a neurotransmitter system. Instead, it functions as an upstream enabling system that preserves the bioenergetic conditions required for resilient neurotransmitter regulation. Maintaining BRS4 therefore complements neurotransmitter precursor and cofactor biology by preserving adaptive bioenergetic capacity rather than substituting for neurotransmitter regulation itself.

**Integrated Regulatory Capacity**

> Together, the Functional Mechanisms within BRS4 maintain energetic reserve, metabolic flexibility, oxidative resilience and adaptive mitochondrial capacity required to sustain neurotransmission during prolonged cognitive, metabolic and physiological demand. Rather than acting through a single pathway, these integrated capacities collectively preserve neuronal energy availability and reduce the likelihood that sustained physiological demand degrades neurotransmitter regulation within BRS1.

**Supporting Evidence** — Harris et al. (2012); Picard (2015).

### Worked example (BRS3 → BRS1)

Canonical template — see integration library `BRS3->BRS1`.

### Anti-patterns

| Do not write | Write instead |
|--------------|---------------|
| One dense paragraph mixing all four questions | Four labelled sections |
| "Mitochondria supply ATP for synapses" | BRS-level integrated capacities |
| PM molecular detail in Integrated Regulatory Capacity | FM-derived BRS capacities only |
| Every BRS labelled "allostatic" | Adaptive capacity / resilience; BRS6 as gateway |
| Dietary targets in Supporting Evidence | Biological validation only |

### Display titles

Human-readable relationship titles are defined in `scripts/lib/brs-hub-cross-integration.mjs` (`INTEGRATION_DISPLAY_TITLES`).

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

**Canonical reference:** BRS2 (`methylation-one-carbon-metabolism.md`). All remaining BRS hub Dietary Guidance rewrites must match this layout.

### KC-integrated Dietary Guidance (canonical)

Architectural rule:

- **Key Constraints** define shared substrate / cofactor / biological input pools across several PMs.
- **Primary Mechanisms** may have additional dietary biology not fully represented by those pools.
- Hub **Dietary Guidance** integrates **both** — KC-derived guidance first, then distinct PM-level items — in one dropdown.
- There is **no** standalone hub **Key Constraints (Dietary Bottlenecks)** section on migrated hubs.

#### Required structure inside **Dietary Guidance**

1. Flow line: `Pattern → Nutrients → Biology → Target Foods`
2. **Key Constraints of BRS{n}** — section heading (`brs-hub-dietary-guidance-section`) introducing the shared-pool block
3. One substrate subheading per KC (`brs-hub-dietary-guidance-heading`) — e.g. `Methylation Substrates — KC1: …` — each with one consolidated guidance row (or the minimum needed to cover distinct pool biology)
4. **Additional Mechanism-Specific Dietary Levers** — section heading for dietary biology not already captured by the KC pools

Each guidance row must use **Pattern → Nutrients → Biology** only (no inline `← food` examples). Foods appear solely on the **Target foods** line (about **2–5** representative whole foods). Label **KC:** on shared-pool rows; label **BRS:** with PM refs on all rows.

Heading pattern: `Key Constraints of BRS{n}` → individual KC substrate subheadings → `Additional Mechanism-Specific Dietary Levers`.

#### Section intros (above the dropdowns)

Migrated hubs use **two** short `brs-hub-levers-intro` paragraphs under **Dietary and Lifestyle Levers**. Each has a distinct job — do not repeat the same “problem starts before you notice it” framing in both:

1. **Biology** — the shared biological requirement (Key Constraint pools across PMs) and how Dietary Guidance translates that pool plus distinct PM-level needs.
2. **Daily regulation** — the positive purpose of everyday behaviour: what meal quality, timing, circadian alignment and recovery determine for resilient system performance.

**Reference:** BRS4 (`mitochondrial-function-bioenergetics.md`).

Do not duplicate paragraph 1’s ontology sentence in paragraph 2. If both would say the same thing, merge only when content truly collapses (e.g. BRS3); prefer the two-job template when Biology and Daily regulation remain distinct.

#### Public-copy rules (required)

Hub Dietary Guidance is **reader-facing practical advice**. Do **not** publish authoring instructions, schema commentary, or deduplication rationale as UI text.

| Allowed on the page | Forbidden on the page |
|---------------------|------------------------|
| Pattern → Nutrients → Biology | “Present once here…”, “not as separate rows…” |
| Target foods + KC/PM labels | “Retained once, without repeating…” |
| Practical caveats (e.g. vegan B12 note) | “Distinct PM-level food biology not already captured by…” |
| Short subsection headings (Key Constraints of BRSn / KC substrate / Additional Mechanism-Specific Dietary Levers) | Meta phrases explaining architecture to the reader |

Deduplication is an **authoring rule** (schema/process), not page content:

- Present a shared KC pattern **once**; label the KC; list all relevant PM refs at the end.
- Do not repeat the same shared-pool biology across near-identical rows.
- Keep KC-page and PM-page detail on those pages; hub only consolidates dietary action.

Do not re-run `brs:generate-hub-key-constraints` for hubs on this layout — the generator skips them (`KC_INTEGRATED_INTO_DIETARY_GUIDANCE`).

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

**Public copy only.** Dietary Guidance body text must be practical advice for readers. Do not surface schema instructions, deduplication notes, “present once / do not repeat” language, or authoring rationale in the published hub panel. Those rules belong in this schema — not in the page.

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

### Hub HTML implementation (BRS2 reference)

Dietary Guidance is a top-level collapsible dropdown labelled **Dietary Guidance**. Inside the panel:

1. Flow line: `Pattern → Nutrients → Biology → Target Foods`
2. Section: **Key Constraints of BRS{n}** (`brs-hub-dietary-guidance-section`)
3. Per-KC substrate heading (`brs-hub-dietary-guidance-heading`) + guidance list
4. Section: **Additional Mechanism-Specific Dietary Levers** (`brs-hub-dietary-guidance-section`) + guidance list
5. Each `<li class="brs-hub-dietary-guidance-item">` contains:
   - `<p class="brs-hub-dietary-guidance-main">` — Pattern → Nutrients → Biology
   - `<p class="brs-hub-dietary-target-foods">` — Target foods (linked) + KC label (when applicable) + BRS PM links
   - Optional `<p class="brs-hub-dietary-guidance-note">` for genuine biological caveats only

CSS classes live in `src/css/custom.css` (`.brs-hub-dietary-guidance-*`, `.brs-hub-dietary-guidance-section`).

**Important:** BRS1–BRS6 Dietary Guidance is **manually authored** inside `<!-- brs-hub-levers:start -->` / `<!-- brs-hub-levers:end -->`. Do **not** run `npm run brs:generate-hub-levers-legacy` on migrated hubs — it is disabled and will refuse to run because the legacy renderer still outputs the obsolete Dietary Strategy / Target Foods layout and would overwrite approved **Dietary Guidance**, **System Optimisation Practices**, and **Lifestyle Priorities** content.

**Approved maintenance command (BRS1–BRS6):**

```bash
npm run brs:patch-hub-levers-section
```

This command refreshes section intros and System Optimisation Practices panels only. It does not replace Dietary Guidance body content.

**Regression guard:**

```bash
npm run test:brs-hub-levers-guard
```

---

## Hub levers (section 4)

The generated block between `<!-- brs-hub-levers:start -->` / `<!-- brs-hub-levers:end -->` presents three intervention layers:

| # | Hub dropdown | PM section | Purpose |
|---|--------------|------------|---------|
| 4.1 | **Dietary Guidance** | §4.1 Direct Dietary Levers | What to eat — patterns, nutrients, biology, target foods |
| 4.2 | **System Optimisation Practices** | §4.2 System Optimisation Practices | Targeted interventions beyond foundational diet/lifestyle — five nested categories (prep, protocols, supplements, light/circadian, stress/autonomic) |
| 4.3 | **Lifestyle Priorities** | §4.3 Lifestyle Levers | Behavioural levers (sleep, activity, stress recovery, circadian routines) — not dietary delivery or preparation |

### System Optimisation Practices

**Purpose:** Targeted interventions that may enhance biological system performance **beyond** foundational dietary guidance and lifestyle priorities. They complement — rather than replace — Key Constraints, Dietary Guidance and Lifestyle Priorities.

**Hub architecture:** One outer collapsible labelled **System Optimisation Practices**, containing five nested category dropdowns on every BRS1–BRS6 hub:

| # | Category | Description |
|---|----------|-------------|
| 1 | **Food Preparation & Delivery** | Food structure, cooking, bioavailability and nutrient delivery |
| 2 | **Dietary & Fasting Protocols** | Targeted dietary approaches beyond routine healthy eating |
| 3 | **Conditional Supplementation** | Evidence-informed supplements under selected conditions |
| 4 | **Light & Circadian Optimisation** | Circadian entrainment and biological timing practices |
| 5 | **Stress & Autonomic Regulation** | Deliberate autonomic and adaptive-stress interventions |

**Population rules:**

- Use **3–4 representative examples** per populated category (fewer is fine when evidence is sparse).
- Empty categories display **Coming soon** — do not invent placeholder biology.
- Preserve **Supports:** PM mappings when relocating existing practices.

**Boundary — do not place here:**

- Routine exercise, physical activity, sleep, general stress management, meal timing
- Protein distribution, dietary diversity, routine dietary patterns, ordinary food recommendations
- Step-by-step recipes → **Food Profiles**

Those remain in **Lifestyle Priorities** or **Dietary Guidance**.

**Biological connection:**

- **FM §4.2 Integrated Functional Narrative** may reference why suboptimal preparation or exposure matters at the integrated biology level.
- **PM §4.2 System Optimisation Practices** covers **Food Preparation & Delivery ONLY** (labelled at the top of the panel). Broader SOP categories are curated on the hub.
- **Hub System Optimisation Practices** integrates and deduplicates across PMs into the five standard categories.

**Source of truth:**

| Layer | Location |
|-------|----------|
| **Curated hub practices** | `scripts/data/brs-hub-optimisation-levers.mjs` (`SOP_CATEGORIES` + per-BRS category maps) |
| **PM levers** | §4.2 System Optimisation Practices on PM pages |
| **FM biology (integrated context)** | FM §4.2 Integrated Functional Narrative |
| **Practical detail** | Food Profiles (primary home for preparation instructions) |

**Example (BRS1 — Food Preparation & Delivery):**

> **Prepare omega-3-rich foods gently and include them regularly** to protect delicate marine fats during cooking and support ongoing brain membrane health over time.
>
> **Supports:** BRS1-FM3-PM6

---

## Legacy: generated Dietary Strategy block (disabled on migrated BRS1–BRS6)

The sections below describe the **previous** auto-generated hub lever block. **BRS1–BRS6 have migrated** to the [BRS Dietary Guidance Standard](#brs-dietary-guidance-standard-final). BRS-X hubs may still use the legacy layout until migrated.

### Generator status

| Command | Status |
|---------|--------|
| `npm run brs:patch-hub-levers-section` | **Approved** — safe maintenance for migrated hubs |
| `npm run brs:generate-hub-levers-legacy` | **Disabled** — exits immediately on migrated BRS1–BRS6 hubs |

The legacy generator (`scripts/generate-brs-hub-levers.mjs` → `renderHubLeversHtml()`) must not be run against real migrated hub pages until it is rebuilt to emit the three-panel architecture and proven idempotent on `scripts/fixtures/brs-hub-migrated-levers.fixture.md`.

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

Regenerate after PM lever edits, copy-map changes, or **TA Phases 7 and 7.5** only on **non-migrated** hubs. For migrated BRS1–BRS6 hubs, use safe maintenance instead:

```bash
npm run brs:patch-hub-levers-section
```

Legacy full regeneration (disabled on migrated BRS1–BRS6):

```bash
npm run brs:generate-hub-levers-legacy
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
4. PM §4.2 System Optimisation Practices + FM §4.2 integrated biology (not FM §4.3 — consequences only)
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
| **PM §4.2 System Optimisation Practices** | Actionable preparation/bioavailability strategies at mechanism level |
| **Not Lifestyle Priorities** | Cooking, preparation, and bioavailability strategies are **System Optimisation Practices** — not behavioural lifestyle levers |
| **Not FM §4.3** | FM §4.3 describes **consequences** of lost FM capacity — not dietary causes or preparation rationale |

**FM §4.2 example (integrated biology — not preparation instructions):**

> Phospholipid-bound omega-3 delivery and membrane enrichment operate as an integrated capacity supporting neuronal signalling competence — distinct from any single transport or incorporation step alone.

Practical cooking guidance remains on food pages; hub **System Optimisation Practices** synthesise PM-level strategies.

### 2. Intervention hierarchy

Distinguish consistently between **biological architecture** and **intervention architecture**.

**Biological architecture:** BRS → FM → PM

**Intervention architecture:**

- Foods
- Substances
- Lifestyle
- Recipes

Food preparation is **not** an independent intervention category. Preparation modifies food interventions and is therefore treated as a **property of food pages** (with biological context on PM §4.2 System Optimisation Practices and hub System Optimisation Practices where relevant).

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

This is a **BRS-level educational summary** — not a collection of PM annotations. PM pages retain mechanistic lifestyle detail in §4.3; the hub presents integrated behavioural themes.

### Lifestyle vs Dietary Guidance boundary (required)

**Lifestyle Priorities** describe **how people live** — non-dietary behaviours that modulate BRS function.

**Dietary Guidance** (including Key Constraints and Additional Mechanism-Specific Dietary Levers) describes **what and how people eat**.

| Belongs in Lifestyle Priorities | Belongs in Dietary Guidance / System Optimisation Practices |
|--------------------------------|--------------------------------------------|
| Meal timing / eating rhythm | Food choice, food quality, food processing |
| Sleep | Nutrients, dietary patterns, food diversity |
| Stress management | Ultra-processed / emulsifier patterns |
| Physical activity (where relevant) | Preparation, pairing, matrix preservation |
| Circadian sleep–wake behaviour | Restrictive vs varied eating patterns |
| Alcohol as a lifestyle exposure (if retained) | Fermented foods, fibre, polyphenols, etc. |

Do **not** place recommendations whose primary intervention is food choice, food quality, food processing, food diversity, nutrients, or dietary pattern in Lifestyle Priorities. Do not duplicate the same recommendation across Lifestyle Priorities and Dietary Guidance.

### Deduplication process

```text
All PM §4.3 lifestyle notes
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
| **PM provenance** | Attached at generation from PM §4.3 lines matching patterns |
| **PM pages** | Authoritative mechanistic detail (unchanged) |

Target **~5–8 distinct priorities per BRS**, not one per PM.

Regenerate after editing curated priorities or PM §4.3 content on **non-migrated** hubs only. For migrated BRS1–BRS6 hubs:

```bash
npm run brs:patch-hub-levers-section
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
      pm_lifestyle_notes: number        # raw PM §4.3 lines before merge (when integrated)
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
7. Lifestyle: PM §**4.3** remains authoritative on PM pages; hub **Lifestyle Priorities** are integrated from `scripts/data/brs-hub-lifestyle-priorities.mjs` with PM provenance matched at generation time.
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
