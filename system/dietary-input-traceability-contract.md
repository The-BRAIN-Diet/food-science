# Dietary Input Traceability & Visibility Contract

**Status:** Active — PM Evidence + Dietary Requirements atom projection for canonical §3.1.
**Scope:** Five-atom currency; Direct/Derived relationship metadata; `dietary_lever_atoms` overlay.
**Does not implement:** PM recomputation, Food→Substance composition, KC membership changes, or hub roll-up.

PM Evidence and Dietary Requirements are separate layers with different jobs. Both must
use the same minimum atomic currency defined below so the Dietary Requirements layer
can consume PM evidence without reconstructing biological roles or provenance from prose.

---

## 1. Canonical five-atom structure

For every **dietary-relevant** relationship established by PM evidence, preserve
the four mandatory atomic fields:

`Input | Input type | Biological role | Evidence source`

| Atom | Meaning |
|------|---------|
| **Input** | Evidence-supported dietary-facing identifier at the granularity actually established (for example a substance, class, component, food group, matrix, pattern, preparation characteristic, or other defined exposure) |
| **Input type** | Category of input (see § Input types) |
| **Biological role** | What job this input performs **in this PM / KC / context** |
| **Evidence source** | What supports **that biological role** — Finding id, `citation_key`, and/or curated pathway resource |

These four fields plus a conditional **Limitation** form the canonical reader-facing
five-atom structure:

`Input | Input type | Biological role | Evidence source | Limitation (conditional)`

**Limitation is not a fifth research requirement.** It is a concise evidence-boundary
statement derived from the adjudication and the cited Evidence Source. Do not initiate
a separate search for a “limitation reference,” and do not require Limitation when the
four mandatory fields already communicate the relationship accurately.

**Example — Vitamin B6:**

```yaml
input: Vitamin B6
input_type: nutrient/substance
biological_role: Dietary precursor supporting PLP availability required for GAD-dependent GABA synthesis
evidence_source:
  finding_ids: [PM8-F1, PM8-F2]
  citation_keys: [martin_regulation_1993, lee_human_2000, tang_crystal_2005, navarro_catalytic_2013]
```

**Example — Glutamate:**

```yaml
input: Glutamate
input_type: substrate
biological_role: Substrate for GAD-dependent GABA synthesis
evidence_source:
  finding_ids: [PM8-F1]
  citation_keys: [martin_regulation_1993]
```

One evidence source may support several atomic relationships from the same mechanism.
Do not require one paper per input.

### 1.1 Dietary input granularity

A Dietary Requirement may be represented at the level actually supported by the
evidence, including:

- substance / nutrient;
- nutrient or compound class;
- food component;
- food group;
- dietary matrix;
- dietary pattern;
- preparation characteristic; or
- another defined dietary exposure where scientifically justified.

Use the most specific level supported by the evidence without extrapolating beyond
it. Do not generalise evidence for a specific input to a broader category, and do
not force broad evidence into unnecessarily specific constituents.

If evidence supports fermentable fibre → microbial fermentation/metabolite
production → PM biology, represent the relationship at that supported level. If
the evidence specifically distinguishes resistant starch, inulin, pectin or other
subtypes, preserve that specificity where biologically relevant. Evidence limited
to one fibre subtype does not establish a generic “fibre” relationship.

Input granularity is independent of relationship classification. Foods, food
groups, matrices and dietary patterns are not automatically Derived merely because
they contain or may provide a Direct requirement. `Direct` / `Derived` continues
to describe relationship distance to the PM biology, not input granularity or
evidence strength.

#### Category safeguard

Dietary Requirement is not a catch-all for every dietary association or exposure.
UPF, emulsifier burden, dietary patterns, food preparation and other defined
exposures must be classified according to the relationship actually demonstrated.
Do not force them into Direct or Derived Dietary Requirements where the evidence
instead establishes exposure, modulation, association, avoidance, risk or another
relationship outside the requirement chain. Not every dietary exposure belongs in
§3.1.1.

Granularity does not add or rename an atom. The canonical structure remains
`Input | Input type | Biological role | Evidence source | Limitation (conditional)`;
the generic name **Input** is intentional.

---

## 2. Not an intervention model

Do not describe all dietary inputs as “interventions.”

The BRAIN dietary architecture primarily identifies dietary inputs required to
support biological requirements.

Keep separate:

| Layer | Question |
|-------|----------|
| **A. Biological dependency** | Is this input required by the biology? — **PM Evidence principal job** |
| **B. Appropriate dietary provision** | Does ordinary diet supply it adequately? — separate proposition |
| **C. Dose manipulation / therapeutic intervention** | Does increasing intake change the PM or outcome? — later evidence/Lever assessment, not a Direct/Derived classifier |

PM Evidence establishes **A** unless **B** or **C** are separately supported.
Do not infer B or C from biochemical dependency alone.

---

## 3. Reappearance is expected

A dietary input may legitimately reappear across PMs, KCs, cofactors, Key Dietary
Requirements, and BRSs — including in different biological roles.

**Reappearance ≠ duplication.** Do not deduplicate by nutrient/substance name.

A **true duplicate** exists only where the same input + type + role + target/context +
evidence relationship has accidentally been represented twice.

Preserving reappearance is essential: later mechanical roll-up must identify recurring
key dietary inputs while retaining every biological reason they appeared.

| Term | Meaning |
|------|---------|
| **Reappearance** | Same input again — inspect role and context |
| **Multi-role reappearance** | Same input, materially different biological role |
| **Shared-role reappearance** | Same input/role at multiple architectural levels legitimately |
| **True duplicate** | Same five-tuple accidentally twice |
| **Misclassification** | Wrong category or context for the actual role |

---

## 4. KCs, cofactors, Key Dietary Requirements

These are **biological structures/relationships**, not parent/child categories of
Dietary Requirements.

Where they carry a dietary-relevant relationship, preserve the same four atoms.
**A cofactor name alone is insufficient** (e.g. `cofactors: [B6 (PLP)]` without role
and evidence).

Do not force dietary strategies, patterns, timing, food groups, or other future Lever
input types through a KC or cofactor slot when their biological role belongs elsewhere.

A substrate, cofactor or nutritionally required input is not thereby a KC. KC status
requires the shared resource-pool/bottleneck logic in `system/key-constraint-schema.md`.
A KC relationship must not replace a PM-specific Direct/Derived Dietary Requirement or
PM-specific substrate/cofactor edge. The same substance may carry both relationships
when their biological roles and contexts are distinct.

### Ownership boundary

The KC page owns its definition, constituent membership, and each constituent's
canonical five-atom KC relationship in `kc_input_traceability`. Independently,
the PM owns every Input→PM relationship in its `dietary_input_traceability` and
owns PM↔KC context in `pm_kc_relationships`.

PM review does not begin from, wait for, or inherit KC adjudication. If a
KC-associated input is supported for the PM, create the PM-owned five-atom record
from PM-specific evidence. A §3.1.3 constituent relationship always references
that `pm_atom_id`. It may additionally reference `kc_atom_id` only after the
separate KC membership proposition is canonical-reviewed.

KC membership evidence cannot stand in for PM-relevance evidence. PM-relevance
evidence cannot add, remove, or reclassify a KC constituent. If PM review suggests
such a change—or encounters legacy-unreviewed membership—record a
`kc_change_control_flags` entry for KC-owned adjudication without delaying the PM
decision.

### Independent PM adjudication of KC-associated inputs

There is no KC→PM scientific propagation. PM review assesses candidate inputs
against PM evidence independently, rather than inheriting the KC dietary list.

```
PM8 → KC1 → only KC1 relationships whose biological role applies to PM8
```

**Not:**

```
PM8 → KC1 → automatically inherit every KC1 dietary input
```

**Example — may project to PM8:**

```yaml
input: Glutamate / relevant protein substrate
input_type: substrate
biological_role: Substrate availability for GAD-dependent GABA synthesis
evidence_source: PM8 evidence
```

**Example — does not project to PM8 merely because PM8 lists KC1:**

```yaml
input: Tryptophan
input_type: nutrient/substance
biological_role: Serotonin precursor / LNAA competition
evidence_source: KC1 evidence
```

The same applies to tyrosine and other KC inputs whose biological roles belong to
KC scope, not to the receiving PM. The error is **KC inheritance / scope mismatch**
when a PM admits a relationship without PM-specific role and evidence. A supported
PM atom remains valid if KC membership is later changed or retired.

---

## 5. Evidence source

Every atomic relationship requires provenance for the **role being claimed**.

Appropriate sources for biochemical dependencies include curated resources (Reactome,
Rhea, reviewed UniProt annotations) and underlying primary literature where necessary.

These establish reaction participants, substrates, cofactors, and biological roles.
They do **not** automatically establish dietary dose-response, limiting status in normal
humans, therapeutic efficacy, or optimal intake.

Evidence links resolve to the PM page **canonical References** section (`citation_key`
→ `static/bibtex/BRAIN-diet.bib`). Do not create a separate Dietary Lever bibliography.
The same reference may support Mechanistic Basis, Scientific Findings, dietary-input
roles, and future Lever claims.

---

## 6. Shared currency — PM Evidence → Dietary Requirements

| Layer | Job |
|-------|-----|
| **PM Evidence** | Establish biological requirements (dependency **A**) in `dietary_input_traceability` |
| **Dietary addressability** | Classify whether diet can meaningfully address that requirement (see §6.1) |
| **Dietary Requirements** | Dietary-facing Direct or Derived relationship that **projects** the same atoms—never a nutrient name alone |

```
PM Evidence (four-field atom)
        ↓
dietary_addressability (+ claim_ceiling)
        ↓
Dietary Requirement representation (§3.1)
```

**Neither relationships nor lists propagate from KC to PM.** A nutrient must not
enter §3 merely because it appears on a KC, cofactor line, or another PM. PM↔KC
context is valid only when it references an independently adjudicated PM atom
(`pmKcConstituentRelationshipIsAdjudicated` in
`scripts/lib/dietary-lever-atoms.mjs`).

### 6.1 Requirement classification and dietary addressability

`Direct` and `Derived` classify the dietary relationship to the PM. They answer
relationship distance, not evidence strength.

- **Direct Dietary Requirement:** a dietary input that is itself directly required
  by the PM biology. Direct does **not** mean demonstrated intervention,
  dose-response, human mechanism modulation, or stronger evidence than Derived.
- **Derived Dietary Requirement:** a dietary input that provides, generates,
  maintains or enables a Direct Dietary Requirement without itself being the
  direct biochemical requirement. Derived is a supported provision relationship
  and must name the Direct requirement it provides or enables.

They do not replace Input Type. Store optional
`requirement_classification: direct | derived` on the `dietary_lever_atoms`
overlay. Derived rows also store `derived_target` (Direct input name) and
optionally `derived_target_atom_id`. This is relationship metadata, not a sixth
reader-facing scientific atom.

Evidence Source must support the **stated Biological Role at the level claimed**.
Methionine → MAT substrate evidence does not by itself establish dietary protein →
methionine provision. Food composition evidence does not by itself establish PM
modulation.

Keep separate:

| Question | Decides |
|----------|---------|
| Does the Direct or Derived relationship exist? | Inclusion in §3.1.1 |
| Is the input a biochemical substrate/cofactor of the reaction? | §3.1.2 inventory |
| Is the input a shared resource-pool/bottleneck? | §3.1.3 KC logic |
| Does increasing intake increase mechanism activity? | Claim ceiling / Limitation |

Absence of intervention or dose-response evidence must **not** remove a legitimate
Dietary Requirement. Constrain the claim through `claim_ceiling` and Limitation.

A biochemical substrate is **not** automatically a Dietary Requirement. ATP may
belong in §3.1.2 as a MAT reaction substrate while remaining outside §3.1.1.
Use `relationship_layer: biochemical-requirement` when an atom is inventory-only.
Use `relationship_layer: kc-relevance` for a PM-owned Input→PM atom displayed
only in §3.1.3 KC context. This layer does not classify KC membership and does not
confer Direct/Derived status.

KC membership must **not** remove, hide or consolidate away a PM-specific
§3.1.1 relationship. The rule “already represented by a KC → remove from §3.1.1”
is prohibited. KC membership is not ownership.

Do not infer Derived relationships from pathway adjacency alone.

Dietary addressability remains a separate evidence/implementation property:

| Value | Meaning |
|-------|---------|
| `direct` | The biological input is meaningfully supplied/addressed through diet |
| `precursor-mediated` | Diet supplies a precursor converted into the biological input |
| `indirect/resource` | Diet supplies a broader pool/resource supporting the requirement |
| `not-established` | Biology supported; evidence does not justify a dietary target/Lever |

**Claim ceiling** (Lever must not exceed): `biological-dependency` → `dietary-provision` →
`modulation-demonstrated` → `phenome-benefit`. Default projection before adjudication:
`biological-dependency` only.

Biological requirement **≠** dietary modulation. Do not infer dose-response or Phenome
benefit from cofactor dependency alone.

---

## 7. Presentation / visibility contract

**Atomic traceability is mandatory in the data model.**  
**Atomic verbosity is not required in the default presentation.**

For every newly authored or recomputed PM, **every reader-facing §3.1 dietary
relationship entry must project from canonical relationship data**. A §3.1.1 or
§3.1.2 entry resolves through `dietary_lever_presentations.atom_id` to:

1. `dietary_input_traceability` for Input, Input Type, Biological Role and
   Evidence Source; and
2. `dietary_lever_atoms` for relationship-layer metadata, Direct/Derived
   classification, Derived Target, claim ceiling and conditional Limitation.

§3.1.3 resolves through `pm_kc_relationships`: the PM↔KC row references `kc_id`,
and every constituent row references a PM-owned `pm_atom_id`. A separately reviewed
`kc_atom_id` is an optional identity link, not the source of PM science. Legacy
membership remains `legacy-unreviewed` with a change-control flag. §3.1.3 must not
inherit §3.1.1 Direct/Derived metadata.

Do not maintain a second scientific record in Markdown bullets, labels or prose.
Presentation rows may specify placement and a reader-facing label, but they must
not restate or override the atom's Input Type, Biological Role, Evidence Source,
classification, Derived Target or Limitation.

Section context controls the compact projection:

- **§3.1.1:** Input + Direct/Derived + Input Type + Derived Target where applicable.
- **§3.1.2:** Input + biochemical Input Type only; never inherit Direct/Derived.
- **§3.1.3:** PM-owned Input→PM relevance in KC context, with optional linkage to
  separately reviewed KC identity; never inherit Direct/Derived or overwrite
  either relationship's evidence.

The same atom may be presented in more than one subsection when distinct
relationships share that input. Relationship-specific presentation metadata must
never become input-global metadata.

Default Dietary Requirement presentation remains compact. When Direct/Derived
classification is present, §3.1.1 should make the distinction readable without
internal IDs:

```text
Methionine
Direct · Substrate

Dietary protein
Derived · Substrate Provision → Methionine
```

Unclassified legacy rows may still show the input label only.

The **dietary-input label** is the evidence-bearing UI object:

- **Default:** show the dietary input only; indicate that more information is available
  (e.g. underlined / interactive label).
- **Hover, keyboard focus, or tap:** expose the four mandatory fields in a compact
  disclosure: `Input | Input type | Biological role | Evidence source`.
- **Optional qualification:** show `Limitation` only where the adjudicated evidence
  boundary is necessary to prevent overinterpretation. It is derived from the same
  adjudication/evidence source and is not independently researched.
- **Evidence/reference control:** navigates to the canonical reference in the PM
  References section. Reader-facing evidence uses the numbered reference and actual
  paper title; internal Finding and relationship identifiers remain hidden.

Each disclosed field uses the consistent inline form `LABEL = value`.

Hover must not be the only interaction — keyboard and touch/mobile must reach the same
information. Precise visual implementation is deferred to the Dietary Lever build;
this section is the governance requirement.

---

## 8. PM Evidence workflow

When adjudication establishes or materially changes a nutritionally relevant biological
requirement:

1. **Identify** the dietary input.
2. **Identify** its input type.
3. **State** its biological role in this PM/context.
4. **Preserve** the evidence source.
5. **Check** whether existing KC / cofactor / Key Dietary Requirement structures can
   carry that relationship.
6. **Flag** any downstream representation gap — do not adjudicate or redesign Dietary
   Levers during PM evidence work.
7. **STOP.**

**Downstream flag format:**

```
PM → Dietary Input → Input Type → Biological Role → Evidence Source → issue
```

Record flags in `system/mechanism-change-control-queue.md`.

**Exception:** Not every Scientific Finding is dietary-relevant. Do not create
artificial dietary-input records for interpretation, boundary-setting, or phenome
Findings with no dietary biology (e.g. PM8-IC1: GABA concentration ≠ synthesis rate).

---

## 9. Durable storage (PM Evidence layer)

Until a dedicated Lever schema exists, PM pages may carry adjudicated atomic
relationships in front matter:

```yaml
dietary_input_traceability:
  - atom_id: PM8-DIT-1                 # stable link for Lever projection
    input: string                      # required
    input_type: string                 # required — see § Input types
    biological_role: string            # required
    evidence_source:                   # required
      finding_ids: [PM8-F1]
      citation_keys: [martin_regulation_1993]   # must resolve in PM References
      pathway_resources: []

dietary_lever_atoms:
  - atom_id: PM8-DIT-1                 # references traceability row
    requirement_classification: direct # optional relationship metadata
    derived_target: Methionine         # required when classification is derived
    derived_target_atom_id: PM3-DIT-1  # optional machine link to the Direct atom
    relationship_layer: dietary-requirement # biochemical-requirement (§3.1.2) or kc-relevance (§3.1.3)
    dietary_addressability: direct
    claim_ceiling: biological-dependency
```

The YAML example above is structural. Do not treat the mixed PM8/PM3 identifiers as
a live record.

`dietary_input_traceability` is **PM Evidence durable source**.
`dietary_lever_atoms` **projects** those atoms for the Lever layer (same four fields via
`resolveLeverAtom`); it is not a second evidence ontology.

Validated when present (`validateDietaryLeverAtoms` in `scripts/lib/dietary-lever-atoms.mjs`).
Untouched legacy PMs without these fields are not failures. Once a PM is newly
authored or recomputed under canonical §3.1, all admitted dietary relationship
entries must use this atomic projection; do not retain an unlinked parallel list.

---

## Input types (non-exhaustive)

| Input type | Use for |
|------------|---------|
| `substrate` | Direct metabolic substrate (e.g. glutamate, methionine) |
| `substrate provision` | Dietary input that provides a direct substrate after digestion, absorption or conversion |
| `nutrient/substance` | Named nutrient or biochemical (e.g. vitamin B6, iron) |
| `cofactor` | Enzymatic cofactor requirement in this PM context |
| `catalytic ion` | Active-site metal or other catalytic ion required for catalysis, when the evidence is more specific than a general cofactor |
| `cofactor precursor` | Dietary input converted into or maintaining the direct cofactor |
| `precursor` | Upstream dietary precursor to an active form |
| `resource dependency` | Shared pool / bottleneck (often KC-scoped) |
| `biochemical requirement` | Other in-pathway requirement not better typed above |
| `nutrient/compound class` | Evidence supports a nutrient or compound class rather than a single constituent |
| `food component` | A defined dietary component such as an evidence-supported fibre subtype |
| `food group` | Evidence supports the grouped foods at that level, without inferring constituent-level causality |
| `dietary matrix` | The relevant relationship is supported for the combined food or meal matrix |
| `dietary pattern` | The evidence-bearing input is an overall dietary pattern |
| `preparation characteristic` | A defined preparation or processing characteristic is the evidence-bearing input |
| `defined dietary exposure` | Another precisely named dietary exposure whose demonstrated relationship does not fit the recommended vocabulary |

This recommended vocabulary is extensible when evidence requires a more precise
type. Do **not** use catch-alls such as `supporting input`, `dietary support` or
`other input`. If an input cannot be classified precisely, flag it for
adjudication.

These values permit evidence-supported granularity; they do not establish that an
input is a Dietary Requirement. Do not force patterns, food groups, matrices,
preparation characteristics or other exposures into Direct/Derived, cofactor or KC
slots when the demonstrated relationship belongs elsewhere.

---

## Diet → biology hierarchy

```text
Food / dietary matrix
        ↓
Dietary provision
        ↓
Derived Dietary Requirement
        ↓
Direct Dietary Requirement
        ↓
Biological Role / biochemical requirement
        ↓
Primary Mechanism
```

Not every PM must contain every level. Food → Substance composition remains owned
by the Food architecture. This hierarchy is illustrative, not a rule that every
food-facing input is Derived; classification still depends on the demonstrated
relationship.

#### Relationship-first workflow

1. Identify the claimed dietary relationship.
2. Determine whether it is Direct, Derived, or neither/unsupported.
3. Assign the precise Input Type.
4. State the Biological Role.
5. Identify evidence supporting that exact relationship.
6. Add a Limitation where needed to prevent reading beyond the evidence.
7. Independently assess whether a KC relationship also exists.

Do not use KC membership to decide Direct/Derived eligibility. Do not use absence
of dietary intervention evidence to decide whether a biological requirement
exists. Do not infer Derived relationships solely from pathway adjacency.

PM Scientific Findings may support, qualify, contradict or flag a dietary atom.
They must not automatically delete a dietary requirement, move it into a KC,
collapse Derived into its Direct target, convert a biochemical substrate into a
Dietary Requirement, or convert absence of modulation evidence into absence of
requirement. Flag conflicts for adjudication.

#### Canonical relationship examples (structure only)

These define atom shape. They are not a PM3 or PM8 recomputation.

**Direct — methionine**

`Input = Methionine` · `requirement_classification = direct` ·
`Input Type = substrate` · Biological Role = substrate for MAT-dependent SAMe
synthesis · Limitation = biochemical requirement does not establish a
proportional dietary intake → SAMe synthesis response.

**Derived — dietary protein**

`Input = Dietary protein / amino-acid provision` ·
`requirement_classification = derived` · `Input Type = substrate provision` ·
`derived_target = Methionine` · Biological Role = provides dietary methionine
required as substrate for MAT-dependent SAMe synthesis.

**Direct — PLP**

`Input = Pyridoxal-5′-phosphate (PLP)` · `direct` · `Input Type = cofactor`.

**Derived — vitamin B6**

`Input = Vitamin B6` · `derived` · `Input Type = cofactor precursor` ·
`derived_target = PLP`.

**§3.1.2-only — ATP**

MAT uses ATP as a biochemical substrate. Representable as
`relationship_layer: biochemical-requirement` for §3.1.2. Not automatically a
§3.1.1 Dietary Requirement.

Only evidence-supported levels are represented. Food → Substance composition remains
owned by the Food architecture.

Non-equivalences: Direct ≠ demonstrated dietary modulation; Derived ≠ weak evidence;
Substrate ≠ KC; Cofactor ≠ KC; dietary source/provision ≠ biochemical substrate; KC
membership ≠ ownership of a PM relationship; biochemical requirement ≠ proportional
intake response; food composition evidence ≠ PM modulation.

---

## Cross-references

- Scientific Finding workflow: `system/scientific-finding-schema.md` § Bounded assessment
- PM scope consistency: `system/primary-mechanism-schema.md` § PM scope consistency
- Cofactor / §3.1 presentation: `system/primary-mechanism-schema.md` § Dietary Requirements (canonical §3.1)
- Downstream flags: `system/mechanism-change-control-queue.md`
- Future hub/lever presentation patterns: `system/brs-hub-levers-schema.md` (Lever build)
