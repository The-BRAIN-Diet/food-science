# 2B — Dietary Input Traceability & Visibility Contract

**Status:** Active Stage 2B schema — PM Evidence + Dietary Requirements atom projection for canonical §3.1.
**Scope:** Five-atom currency; Direct/Derived relationship metadata; `dietary_lever_atoms` overlay.
**Does not implement:** PM recomputation, Food→Substance composition, KC membership changes, or hub roll-up.

## Audience and public voice (Stage 2B)

**Intended readers:** interested members of the public. Nutritionists are the
most technically specialised intended readers. Do not assume PhD-level
biology knowledge.

Stage 2B public copy must:

- give a plain, scientifically precise explanation of what the mechanism does
  and why each admitted dietary input matters;
- gloss necessary technical terms briefly on first use, and keep the five-atom
  evidence record and Scientific Finding link in the expandable disclosure;
- describe connected PM relationships and dependencies in public scientific
  language, and display always-visible contextual indicators where required
  (including `Supply: PM1` beside Tyrosine);
- state limitations that say what the evidence does and does not establish.

**Separate layers.** Reader-facing scientific explanation belongs on the
public dietary heading, reader description and disclosed five-atom fields.
Internal governance — ownership, adjudication, duplicate counting, record
maintenance, and scoreable-atom language — belongs in Stage 2B reports,
schema documentation and Review & Corrections. Public copy must not use
internal maintenance phrasing such as “on this page”, “owned by”, “assessment is maintained”, “local listing”, “same-role reprint” or “scoreable atom”.

Do not meet the audience by deleting substantive science or replacing it
with generic statements.

### Foundational dietary coverage and targeted retrieval (Stage 2B)

**Review existing evidence first does not mean stop with existing evidence.**
The existing corpus is the starting point, not an automatic stopping point.
Check coverage against the mission, including defining steps omitted from
existing prose.

Stage 2B must:

- assess dietary relationships against the mission and Stage 2A Findings;
- check for omitted substrates, cofactors, dietary routes and
  state-regulation inputs, including names already in `cofactors:` / §3.1.2
  and obvious pathway participants not yet listed;
- retrieve dietary evidence where the inherited corpus cannot adjudicate a
  material candidate;
- distinguish **unassessed**, **unresolved** and **evidence-supported
  negative** decisions.

Targeted retrieval is bounded by **explicit questions** and a **stopping
rationale** in the Stage 2B report. Do not require exhaustive searches or
automatic searches for every claim. Cost concerns should guide efficient
retrieval and reuse, not omission of material assessment.

Before declaring Stage 2B complete, the report must explain why evidence
coverage is sufficient and record the bounded-search stopping rationale.
Successful schema validation is not scientific completion.

Limitation text remains derived from the adjudication (see §1). That does
not forbid retrieving the evidence needed to adjudicate the relationship
itself.

Preserve the agreed audience, Findings format, explained PM connections,
always-visible upstream indicators, and separation of public science from
audit language.

### Retrieval authorisation (supersedes earlier session limits)

The earlier session rule requiring a **separate request** before external
research is **superseded** for Stage 2A and Stage 2B. Running either stage
authorises necessary, question-bounded evidence retrieval under its
contract. Prior chat instructions, “no open literature search” report
lines, and session conventions do not restore the old limit.

### Stage boundary — 2A mechanism, 2B diet

Stage 2A establishes the scientific mechanism: defining pathway steps,
reaction participants, regulation, functional evidence and
connected-mechanism dependencies. It identifies candidates for dietary
assessment without admitting them as Dietary Requirements.

Stage 2B adjudicates dietary relationships: provision of substrates and
cofactors, derived dietary routes and state-regulation inputs. It uses
Stage 2A Findings and retrieves further evidence where needed.

Do not write PM-specific exceptions into this boundary.

### Claim thresholds

**Biochemical necessity**, **dietary provision**, **demonstrated
modulation** and **functional or clinical benefit** are distinct claims.
Do not require clinical benefit to establish a supported dependency, or
infer modulation from dependency alone.

### When Stage 2B identifies a missing foundational claim

If a dietary candidate depends on mechanism evidence not adequately
assessed in the Stage 2A Findings:

1. Identify the exact missing claim and the dietary decision it affects.
2. Perform a focused Stage 2A follow-up for that claim: retrieve necessary
   evidence, assess it using the Scientific Finding contract, and create
   or update the relevant Finding.
3. Resume Stage 2B and adjudicate the dietary candidate against that
   Finding.
4. Record the follow-up and resulting decision in the reports and Review
   & Corrections.

Do not rerun unrelated Stage 2A work. Continue assessing unaffected
dietary candidates.

If the missing claim cannot be resolved, mark the affected dietary
decision **unresolved** and explain the evidence or access gap. Do not
admit the relationship without support or treat missing evidence as a
negative finding.

This focused follow-up is authorised within the requested Stage 2B run;
it does not require a separate user instruction. Do not silently bypass
the Finding assessment.

PM Evidence and Dietary Requirements are separate layers with different jobs. Both must
use the same minimum atomic currency defined below so the Dietary Requirements layer
can consume PM evidence without reconstructing biological roles or provenance from prose.

---

## 1. Canonical five-atom structure

For every **dietary-relevant** relationship established by PM evidence, preserve
the five mandatory atomic fields:

`Input | Input type | Biological role | Evidence source | Limitation`

| Atom | Meaning |
|------|---------|
| **Input** | Evidence-supported dietary-facing identifier at the granularity actually established (for example a substance, class, component, food group, matrix, pattern, preparation characteristic, or other defined exposure) |
| **Input type** | Category of input (see § Input types) |
| **Biological role** | What job this input performs in the mechanism biology (public science; not ownership or page-maintenance language) |
| **Evidence source** | What supports **that biological role** — at least one resolvable Scientific Finding id and PM-bibliography `citation_key` |
| **Limitation** | Concise boundary preventing interpretation beyond the linked Finding and citation |

Together these form the canonical reader-facing five-atom structure:

`Input | Input type | Biological role | Evidence source | Limitation`

**Limitation is mandatory relationship currency, not a separate research exercise.**
Derive it from the existing adjudication and cited Evidence Source; do not initiate a
separate search for a “limitation reference.”

**Example — Vitamin B6:**

```yaml
input: Vitamin B6
input_type: nutrient/substance
biological_role: Dietary precursor supporting PLP availability required for GAD-dependent GABA synthesis
evidence_source:
  finding_ids: [PM9-F1, PM9-F2]
  citation_keys: [martin_regulation_1993, lee_human_2000, tang_crystal_2005, navarro_catalytic_2013]
evidence_limitation: Increasing vitamin B6 intake has not been shown to increase human brain GABA synthesis.
```

**Example — Glutamate:**

```yaml
input: Glutamate
input_type: substrate
biological_role: Substrate for GAD-dependent GABA synthesis
evidence_source:
  finding_ids: [PM9-F1]
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
Classify the **type of relationship** actually demonstrated (capacity/requirement
vs regulatory/state vs biochemical inventory vs shared constraint — §2).

Association, generic health effects, unrelated biomarker change, mechanistic
speculation, and “has been studied in” do **not** admit a §3.1.1 relationship.

Evidence-supported **regulation of the biological state/function governed by this
PM** may admit a §3.1.1 relationship when the regulatory claim itself is
established at the level claimed (§2 type B; high-bar checks in the workflow).
That is not a licence to treat every modulation paper as a Dietary Requirement.
Not every dietary exposure belongs in §3.1.1. Empty §3.1.1 remains valid.

Granularity does not add or rename an atom. The canonical structure remains
`Input | Input type | Biological role | Evidence source | Limitation`;
the generic name **Input** is intentional.

---

## 2. Relationship type before dietary relevance

Do not describe all dietary inputs as “interventions.”

Do **not** use a single universal PM Evidence gateway:

> Is this input required by the biology?

That question is necessary for capacity/requirement and biochemical-inventory
claims. It is **not** sufficient as the only test of dietary relevance. A dietary
input need not be indispensable to the *existence* of a mechanism in order for
dietary exposure to have an evidence-supported **regulatory** relationship with
the biological state/function the PM governs.

**First** name the biological objective/state governed by the PM. **Then**
classify the claimed dietary relationship:

| Type | Question | Layer |
|------|----------|-------|
| **A. Capacity / requirement** | Does the input provide, generate, maintain or enable something required to establish or maintain the biological **capacity** governed by the PM? | §3.1.1 / §4.1.1 — overlay `relationship_mode: capacity-requirement` |
| **B. Regulatory / state** | Does dietary exposure have evidence of **regulating** that governed state/function, at the level claimed? | §3.1.1 / §4.1.1 — overlay `relationship_mode: state-regulation` |
| **C. Biochemical requirement** | Does the mechanism/reaction itself require this substrate, cofactor, catalytic ion or other participant? | §3.1.2 / §4.1.2 — `relationship_layer: biochemical-requirement` |
| **D. Shared constraint** | Does an evidence-supported shared resource/availability constraint apply to this PM? | §3.1.3 / §4.1.3 — KC/iKC ownership unchanged. See **Type D — shared-constraint applicability** |

Keep these **separate from** Direct/Derived (relationship **distance**) and from
later propositions:

| Later proposition | Not a Direct/Derived classifier |
|-------------------|--------------------------------|
| Ordinary-diet provision adequacy | Does ordinary diet supply the input adequately? |
| Dose / therapeutic intervention | Does increasing intake change the PM or a phenome outcome? |
| Optimisation Strategy (SOP) | Does intervention evidence support a targeted practice that can influence the PM-governed state, directly or via an evidence-supported connected mechanism? |

Do not infer provision adequacy or therapeutic effect from capacity, regulation,
or biochemical dependency alone.

Type B does **not** permit association, generic inflammation reduction, unrelated
biomarkers, isolated-pharmacology-as-food, or combination/pattern evidence to be
read as a single-constituent effect unless attribution is supported. Type B does
**not** automatically enter §4.1.2 or §4.1.3.

### Type D — shared-constraint applicability

**“PM-specific”** means evidence that the iKC **applies to that PM**. It does
**not** mean the constraint is unique to the PM, that supporting evidence must
be authored or stored only on that PM, or that the PM must govern or assess
the shared pool.

Two applicability modes use the **same** evidence threshold:

- **Governs the constraint** — this PM’s governed objective is the pool or
  bottleneck state itself (for example meal-level LAT1 competitive balance).
- **Is constrained by it** — inadequacy or imbalance of the named KC pool or
  state can constrain the capacity this PM governs.

**Admission threshold.** Admit a PM↔iKC mapping only when both are true:

1. The iKC is a coherent shared pool or bottleneck (KC-owned definition).
2. Evidence connects **inadequacy or imbalance of that named pool or state**
   to a **constraint on this PM’s governed capacity**.

Reuse of KC-page or upstream-PM evidence is allowed when it is used for
**this** PM’s applicability proposition. Do not require a second original
literature search or a local supply/transport assessment.

An **explicitly supported upstream chain** may contribute to (2). It does
**not** automatically establish membership. Precursor delivery plus substrate
or cofactor necessity is not enough. Separate **established links** (what the
cited evidence actually shows) from **inference** (what would have to be
true for the pool to constrain this PM). Admit only when the
capacity-constraint link is established, not inferred.

**Still not enough:** pathway-diagram proximity; substrate or cofactor
necessity alone; “the KC is biologically relevant upstream”; copying iKC
constituents or food-source lists; using KC membership to admit or remove a
Dietary Requirement.

**Audit dispositions** (Stage 2B record in
`kc_applicability_adjudications`; not public §3.1.3 copy):

| Disposition | Meaning |
|-------------|--------|
| `established` | Threshold met. Publish the linked KC title and a concise relevance sentence. |
| `unassessed` | The applicability proposition, or a necessary link in it, has not been evidenced. |
| `unresolved` | Assessment was attempted; a material evidence or access gap remains. |
| `evidence-supported-non-application` | Evidence shows this iKC or arm does **not** constrain this PM’s governed capacity. |

Public empty copy remains `No mapping established.` Do not publish a KC
title for unassessed, unresolved, or evidence-supported non-application.
Do not treat unassessed or unresolved as a negative finding.

Assess distinct KC arms separately. Assessment ownership (where pool-quality
or transport science is maintained) neither excludes nor establishes
applicability.

Structural “draws on / assumes sufficiency” wording is not an exemplar
unless it meets this threshold. Assumption-only mappings fail (2).

Do not hard-code PM families (for example “signalling PMs use modulation”).
Reason from the governed objective and the claimed relationship.

`relationship_mode` is optional overlay metadata, not a sixth scientific atom.
Legacy capacity atoms without the field remain valid. When a §3.1.1 atom is newly
adjudicated as type B, set `relationship_mode: state-regulation` and do **not**
use `claim_ceiling: biological-dependency` unless the evidence actually
establishes nutritional necessity or biological indispensability.

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
| **Shared-role reappearance** | Same input/role at multiple architectural levels legitimately (for example the same substrate on two PMs). Not a licence to reprint §3.1.1 into §3.1.2 |
| **True duplicate** | Same five-tuple accidentally twice |
| **Misclassification** | Wrong category or context for the actual role |

---

## 4. KCs, iKCs, cofactors, Key Dietary Requirements

These are **biological structures/relationships**, not parent/child categories of
Dietary Requirements.

**Terminology:** `KC1`, `KC2`, `KC3`… are canonical **KC pages**. An **iKC** is an
individual Key Constraint on a KC page. A KC page may contain multiple iKCs. A PM
may reference multiple iKCs. An iKC may apply to multiple PMs. PM ↔ iKC is
many-to-many.

Where they carry a dietary-relevant relationship, preserve the same five atoms.
**A cofactor name alone is insufficient** (e.g. `cofactors: [B6 (PLP)]` without role
and evidence).

Do not force dietary strategies, patterns, timing, food groups, or other future Lever
input types through a KC or cofactor slot when their biological role belongs elsewhere.

A substrate, cofactor or nutritionally required input is not thereby a KC or iKC.
iKC status requires the shared resource-pool/bottleneck logic in
`system/key-constraint-schema.md`. An iKC relationship must not replace a
PM-specific Direct/Derived Dietary Requirement or PM-specific substrate/cofactor
edge. The same substance may carry both relationships when their biological roles
and contexts are distinct. If a cofactor or substrate in §3.1.2 / §4.1.2 plays
the **same** role as an already-admitted §3.1.1 / §4.1.1 Dietary Requirement
(same input, input type, and biological role), do not repeat it in §3.1.2 /
§4.1.2. That reprint is a true duplicate, not shared-role reappearance.

### Sequence and ownership

**KC first, PM second:**

1. The KC page evidence-qualifies its iKCs (constraint, constituents, evidence,
   intended FM/PM scope, limitations).
2. The PM independently evidence-qualifies whether each listed iKC applies, and
   which constituents apply to that PM.
3. Systematic disagreement with an iKC's claimed scope generates a **KC review
   flag**. PM results never automatically modify an iKC.

KC-page review (coherence → iKC definition → constituent five atoms → proposed
FM/PM scope) is specified in `system/kc-page-evidence-review-contract.md`. It
reuses this contract’s atoms and does not create a second evidence ontology.
Stage 2B does not replace that KC pass.

The KC page / iKC owns definition, constituent membership, and membership
evidence. The PM owns applicability, supported constituents for that PM, and
evidence that the iKC applies to that PM in `pm_kc_relationships`.
“PM-specific” is that applicability, not uniqueness or local evidence
ownership.

`key_constraints` records **which iKCs apply, or are proposed to apply**, to the
PM. It does **not** inherit constituent relationships. iKC membership ≠ PM
relevance. PM relevance ≠ iKC membership. A validated PM → constituent → iKC
edge requires both independently.

### Ownership boundary

The KC page owns each iKC's definition, constituent membership, and each
constituent's canonical five-atom KC relationship in `kc_input_traceability`.
Independently, the PM owns every Input→PM relationship in its
`dietary_input_traceability` and owns PM↔iKC context in `pm_kc_relationships`
(`kc_id` plus optional `ikc_id`; default `ikc_id` is `kc_id` on single-iKC pages).

If an iKC-associated input is supported for the PM, create the PM-owned five-atom
record from evidence of **that Input→PM role**. A §3.1.3 constituent relationship always
references that `pm_atom_id`. It may additionally reference `kc_atom_id` only after
the iKC membership proposition is canonical-reviewed on the KC page.

iKC membership evidence cannot stand in for PM-relevance evidence. PM-relevance
evidence cannot add, remove, or reclassify an iKC constituent. If PM review
suggests such a change—or encounters legacy-unreviewed membership—record a
`kc_change_control_flags` entry (`ikc-scope-conflict` when the conflict is with
claimed iKC scope) for KC-owned adjudication without rewriting the iKC.

### Independent PM adjudication of iKC-associated inputs

There is no iKC→PM scientific propagation and no wholesale inheritance from the
KC page.

```
PM9 → iKC → only constituents whose PM-specific biological role is supported
```

**Not:**

```
PM9 → KC1 → automatically inherit every iKC dietary input
```

**Example — may project to PM9:**

```yaml
input: Glutamate / relevant protein substrate
input_type: substrate
biological_role: Substrate availability for GAD-dependent GABA synthesis
evidence_source: PM9 evidence
```

**Example — does not project to PM9 merely because PM9 lists KC1:**

```yaml
input: Tryptophan
input_type: nutrient/substance
biological_role: Serotonin precursor / LNAA competition
evidence_source: KC1 evidence
```

The same applies to tyrosine and other KC inputs whose biological roles belong to
KC scope, not to the receiving PM. The error is **KC inheritance / scope mismatch**
when a PM admits a relationship without PM-specific role and evidence. A supported
PM atom remains valid if KC membership is later changed or retired. That example
does **not** forbid a synthesis PM from recording tyrosine as its own
hydroxylase substrate when PM-specific role and evidence exist.

### Downstream reaction participants versus upstream supply

Upstream ownership of a **supply or transport assessment** does not erase a
downstream PM’s **reaction-level substrate or cofactor**. Keep these roles
separate:

- circulating precursor-pool availability and prioritisation
- competitive transport of large neutral amino acids
- conversion of the arriving substrate in the receiving mechanism (for example
  tyrosine → L-DOPA)

Those are shared-role reappearances across PMs when the input name is the same
and the biological role or context differs. A related-PM link does not state or
substantiate the local reaction-level claim. Local visibility does not create a
second independent nutritional need: roll-up must retain every biological reason
the input appeared without double-counting supply.

Stage 2A identifies supported upstream PM dependencies and writes the
evidence-supported connection explanations. Stage 2B displays each relevant
upstream relationship beside the dietary-entry label as an always-visible,
linked indicator. Represent that relationship in structured data
(`upstream_pm_relationships` on the dietary-input atom) and render it
consistently for every qualifying entry. Do not hard-code a single-input
exception. Label the actual relationship, such as `Supply: PM1`, rather than
the ambiguous `From PM1`. The indicator identifies the upstream relationship;
it does not replace the scientific reference that supports the local role.

Public prose follows **Audience and public voice (Stage 2B)**. Ownership,
duplicate counting and record maintenance belong in reports and Review &
Corrections, not in the dietary heading, reader description, biological role
or limitation.

### Stage 2B — three Dietary Requirements layers

Stage 2B evidence-reviews **all three** Dietary Requirements layers (canonical
§3.1.x / legacy §4.1.x):

| Layer | Stage 2B job |
|-------|----------------|
| §4.1.1 Direct/Derived | Five-atom Input→PM relationships; Direct/Derived metadata; no food-arrow science |
| §4.1.2 Cofactors and Substrates | Independently evidence-review each existing/legacy candidate. Completing a five-atom record is the *output* of that review, not a precondition for keeping the candidate |
| §4.1.3 Key Constraints | PM side of PM ↔ iKC only. Do not copy iKC constituents or food-source bullets from the KC page |

**§4.1.2 is PM-owned.** There is no upstream KC-page pass that establishes the PM cofactor/substrate inventory. Treat every name in `cofactors:` and every legacy §4.1.2 bullet as an **unadjudicated candidate**. Research whether the defined PM mechanism requires it as a substrate, cofactor, catalytic ion, precursor, or other biochemical requirement; then admit (five atoms), reject/reclassify with an evidence-based disposition, or mark unresolved.

A cofactor **name alone is not evidence that the relationship exists**. It is also **not evidence that the relationship does not exist**. Do not reject or remove a §4.1.2 candidate because there was no pre-existing five-atom record, no citation already on the PM, or only a name-only legacy structure. Legacy evidence structure is not evidence status. `stage2b_cofactor_name_without_atom` is a completeness check on names that remain after review; emptying `cofactors:` to avoid that check is not an adjudication.

§4.1.3 is unchanged: iKC definition and constituent membership stay KC-owned. PM Stage 2B adjudicates only PM↔iKC applicability under **Type D — shared-constraint applicability**. Shared inputs with §4.1.1 are not grounds to reject that relationship; Direct Dietary Requirements and a shared constraint may name the same substances when the constraint is a shared limiting pool. Independent Dietary Requirement adjudication is preserved: do not use KC membership to admit or remove a §3.1.1 / §3.1.2 relationship, and do not inherit iKC constituent or food-source lists.

If no PM↔iKC mapping is `established` on the page, public copy is `No mapping established.` Record `kc_applicability_adjudications` for each assessed iKC arm (`established`, `unassessed`, `unresolved`, or `evidence-supported-non-application`). Unassessed, unresolved and evidence-supported non-application stay in the Stage 2B audit and change-control; they do not appear as a KC title, paragraph, constituent list, or food-source list. If a mapping is established, render the linked KC title and a concise statement of that relevance only. Assess distinct KC arms separately (for example amino-acid quality versus competitive transport balance).

Validators: `validateDietaryLeverAtoms`,
`validateStage2bDietaryRequirementLayers`, and
`validateKcApplicabilityAdjudications` in
`scripts/lib/kc-evidence-governance.mjs`.

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
| **PM Evidence** | Establish the claimed relationship (capacity, state-regulation, biochemical inventory, or shared-constraint applicability) in `dietary_input_traceability` |
| **Dietary addressability** | Classify whether diet can meaningfully address that relationship (see §6.1) |
| **Dietary Requirements** | Dietary-facing Direct or Derived **projection** of admitted §3.1.1 atoms—never a nutrient name alone. Empty §3.1.1 is valid |

```
PM Evidence (five-atom relationship)
        ↓
dietary_addressability (+ claim_ceiling)
        ↓
Dietary Requirement representation (§3.1)
```

**Neither relationships nor lists propagate from an iKC to a PM.** A nutrient must
not enter §3 merely because it appears on a KC page, iKC constituent list, cofactor
line, or another PM. PM↔iKC context is valid only when it references an
independently adjudicated PM atom (`pmKcConstituentRelationshipIsAdjudicated` in
`scripts/lib/dietary-lever-atoms.mjs`).

### 6.1 Requirement classification and dietary addressability

§3.1.1 / §4.1.1 admission is **not** “does the PM require this dietary input in
order for the mechanism to exist?” It is:

> Does the evidence establish a dietary relationship that is relevant to
> achieving, maintaining or **regulating** the biological objective/state
> governed by this PM, **at the level claimed**?

Then classify the relationship accurately (capacity vs state-regulation). Do not
relabel a capacity relationship as regulation to gain admission. Do not describe
regulation as biological dependency, substrate requirement, deficiency
prevention, or nutritional necessity unless that stronger claim is established.

`Direct` and `Derived` classify **relationship distance**, not evidence strength.

- **Direct:** the dietary input itself has the evidence-supported relationship to
  the PM-governed biological objective/state (capacity **or** state-regulation).
  Direct does **not** mean demonstrated phenome benefit, dose-response, or
  stronger evidence than Derived.
- **Derived:** the dietary input provides, generates, maintains or enables the
  Direct input **or Direct relationship** through an evidence-supported
  intermediate step. Each necessary edge must be supported. Derived must name
  that Direct target.

Do not infer Direct from pathway-diagram proximity. Do not infer Derived merely
because a food contains a compound.

They do not replace Input Type. Store optional
`requirement_classification: direct | derived` and optional
`relationship_mode: capacity-requirement | state-regulation` on the
`dietary_lever_atoms` overlay. Derived rows also store `derived_target` and
optionally `derived_target_atom_id`. This is relationship metadata, not a sixth
reader-facing scientific atom.

Evidence Source must support the **stated Biological Role at the level claimed**.
Methionine → MAT substrate evidence does not by itself establish dietary protein →
methionine provision. Food composition evidence does not by itself establish PM
modulation.

Keep separate:

| Question | Decides |
|----------|---------|
| Does an evidence-supported capacity or state-regulation relationship exist at the level claimed? | Inclusion in §3.1.1 |
| Is the input a biochemical substrate/cofactor of the reaction? | §3.1.2 inventory (independent; not automatic §3.1.1) |
| Is the input a shared resource-pool/bottleneck relevant to this PM? | §3.1.3 iKC logic |
| Does increasing intake increase mechanism activity / phenome benefit? | Claim ceiling / Limitation |

Absence of intervention or dose-response evidence must **not** remove a legitimate
**capacity** Dietary Requirement. Constrain the claim through `claim_ceiling` and
Limitation. A **state-regulation** claim, by contrast, is not established until
the regulatory relationship itself meets the high-bar checks below.

A biochemical substrate is **not** automatically a Dietary Requirement. ATP may
belong in §3.1.2 as a MAT reaction substrate while remaining outside §3.1.1.
Magnesium as an IKK catalytic ion may belong in §3.1.2 while ordinary dietary
magnesium limitation of NF-κB regulation remains unestablished. Use
`relationship_layer: biochemical-requirement` when an atom is inventory-only.
Use `relationship_layer: kc-relevance` for a PM-owned Input→PM atom displayed
only in §3.1.3 iKC context. This layer does not classify iKC membership and does
not confer Direct/Derived status.

iKC membership must **not** remove, hide or consolidate away a PM-specific
§3.1.1 relationship. The rule “already represented by a KC → remove from §3.1.1”
is prohibited. iKC membership is not ownership.

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
`biological-dependency` only **for capacity/biochemical claims**. Newly adjudicated
`state-regulation` atoms must not use `biological-dependency` as the ceiling unless
indispensability/necessity is actually established.

Capacity/biochemical requirement **≠** dietary state-regulation **≠** phenome benefit.
Do not infer dose-response or Phenome benefit from cofactor dependency alone. Do not
infer NF-κB (or any one PM) regulation from generic inflammation reduction.

**Biochemical necessity**, **dietary provision**, **demonstrated modulation** and
**functional or clinical benefit** remain distinct (see § **Claim thresholds**).
Do not require clinical benefit to establish a supported dependency, or infer
modulation from dependency alone.

---

## 7. Presentation / visibility contract

**Atomic traceability is mandatory in the data model.**
**Atomic verbosity is not required in the default presentation.**

For every newly authored or recomputed PM, **every reader-facing §3.1 dietary
relationship entry must project from canonical relationship data**. A §3.1.1 or
§3.1.2 entry resolves through `dietary_lever_presentations.atom_id` to:

1. `dietary_input_traceability` for Input, Input Type, Biological Role,
   Evidence Source and Limitation; and
2. `dietary_lever_atoms` for relationship-layer metadata, Direct/Derived
   classification, Derived Target and claim ceiling.

§3.1.3 resolves through `pm_kc_relationships`: the PM↔iKC row references `kc_id`
and optional `ikc_id` (default `kc_id`), and every constituent row references a
PM-owned `pm_atom_id`. A separately reviewed `kc_atom_id` is an optional identity
link, not the source of PM science. Legacy membership remains `legacy-unreviewed`
with a change-control flag. §3.1.3 must not inherit iKC constituent lists or
§3.1.1 Direct/Derived metadata.

Do not maintain a second scientific record in Markdown bullets, labels or prose.
Presentation rows may specify placement and a reader-facing label, but they must
not restate or override the atom's Input Type, Biological Role, Evidence Source,
Limitation, classification or Derived Target.

Section context controls the compact projection:

- **§3.1.1:** Input + Direct/Derived + Input Type + Derived Target where applicable, plus any always-visible linked upstream indicators from `upstream_pm_relationships`.
- **§3.1.2:** Input + biochemical Input Type only; never inherit Direct/Derived.
- **§3.1.3:** PM-owned Input→PM relevance in iKC context, with optional linkage to
  separately reviewed KC identity; never inherit Direct/Derived, never copy
  un-adjudicated iKC constituents, and never overwrite either relationship's
  evidence.

The same atom may be presented in more than one subsection when **distinct**
relationships share that input. Do not present the same input + type + role in
both §3.1.1 and §3.1.2. Relationship-specific presentation metadata must
never become input-global metadata.

Default Dietary Requirement presentation remains compact. When Direct/Derived
classification is present, §3.1.1 should make the distinction readable without
internal IDs:

```text
Source Markdown bullet: Methionine
Rendered collapsed entry: Methionine — Direct · Substrate

Source Markdown bullet: Tyrosine
Rendered collapsed entry: Tyrosine — Direct · Substrate · [Supply: PM1]

Source Markdown bullet: Dietary protein
Rendered collapsed entry: Dietary protein — Derived · Substrate Provision → Methionine
```

**Renderer-matched bullets must contain the plain presentation label only.**
The label must match `dietary_lever_presentations.label` in the applicable
subsection. Do not hand-write Direct/Derived, Input Type, Derived Target or
upstream qualifiers into the Markdown bullet. The shared renderer adds those
qualifiers from canonical atom and relationship metadata. Hand-written
qualifiers change the matching key, can prevent the disclosure from mounting,
and create a second presentation record.

`Supply: PM1` is an always-visible link to the canonical upstream PM. It must
remain readable on the collapsed dietary entry without hovering or expanding
the evidence disclosure.

Unclassified legacy rows may still show the input label only.

The **dietary-input label** is the evidence-bearing UI object:

- **Default:** show the dietary input only; indicate that more information is available
  (e.g. underlined / interactive label).
- **Hover, keyboard focus, or tap:** expose the five mandatory fields in a compact
  disclosure: `Input | Input type | Biological role | Evidence source | Limitation`.
- **Evidence/reference control:** navigates to the canonical reference in the PM
  References section. On first mention, reader-facing evidence uses
  `Author et al. (year) [n]` (or both author names for a two-author study), with
  `[n]` linked to §8. Author text, year, number and link derive from the same canonical
  PM reference record; internal Finding and relationship identifiers remain hidden.

Each disclosed field uses the consistent inline form `LABEL = value`.

Hover must not be the only interaction — keyboard and touch/mobile must reach the same
information. Precise visual implementation is deferred to the Dietary Lever build;
this section is the governance requirement.

**Rendered-browser verification is mandatory before Stage 2B completion.**
Open every admitted §3.1.1 and §3.1.2 entry individually in the rendered page
and confirm:

1. the collapsed label and renderer-added qualifiers are correct;
2. opening the entry exposes all five fields;
3. Evidence source links resolve to the intended numbered PM references;
4. Finding traceability remains connected through the structured record and
   presentation link where used; and
5. KC relationships remain separate and do not inject constituents or food
   lists into the entry disclosure.

Schema and unit-test success alone is insufficient because a valid atom can
still fail to render when its Markdown label does not match its presentation
record.

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
6. **Flag** any downstream representation gap — including an Optimisation
   Strategy **candidate** when Direct/Derived was refused but intervention
   evidence remains (see Relationship-first workflow, Conditional Optimisation
   Strategy follow-up). Do not adjudicate or auto-admit System Optimisation
   Practices during the Dietary Requirement decision unless that SOP workflow is
   already in the current task.
7. **Coverage check** — confirm omitted material candidates were listed and
   either adjudicated, retrieved against, or parked as unassessed/unresolved
   with an explicit question and stopping rationale. If a candidate depends
   on a missing foundational mechanism claim, follow § **When Stage 2B
   identifies a missing foundational claim** before stopping. Schema
   validation passing is not scientific completion. Then **STOP.**

**Downstream flag format:**

```
PM → Dietary Input → Input Type → Biological Role → Evidence Source → issue
```

Record flags in `system/mechanism-change-control-queue.md`.

**Exception:** Not every Scientific Finding is dietary-relevant. Do not create
artificial dietary-input records for interpretation, boundary-setting, or phenome
Findings with no dietary biology (e.g. PM9-IC1: GABA concentration ≠ synthesis rate).

---

## 9. Durable storage (PM Evidence layer)

Until a dedicated Lever schema exists, PM pages may carry adjudicated atomic
relationships in front matter:

```yaml
dietary_input_traceability:
  - atom_id: PM9-DIT-1                 # stable link for Lever projection
    input: string                      # required
    input_type: string                 # required — see § Input types
    biological_role: string            # required; science only
    upstream_pm_relationships:         # optional; Stage 2A identifies, Stage 2B displays
      - relationship_label: Supply     # name the relationship; not “From”
        pm_short_id: PM1
        pm_id: BRS1-FM1-PM1
        href: /docs/biological-targets/...
    evidence_source:                   # required
      finding_ids: [PM9-F1]
      citation_keys: [martin_regulation_1993]   # must resolve in PM References
    evidence_limitation: string        # required

dietary_lever_atoms:
  - atom_id: PM9-DIT-1                 # references traceability row
    requirement_classification: direct # optional relationship metadata
    relationship_mode: capacity-requirement # or state-regulation; optional
    derived_target: Methionine         # required when classification is derived
    derived_target_atom_id: PM3-DIT-1  # optional machine link to the Direct atom
    relationship_layer: dietary-requirement # biochemical-requirement (§3.1.2) or kc-relevance (§3.1.3)
    dietary_addressability: direct
    claim_ceiling: biological-dependency
```

The YAML example above is structural. Do not treat the mixed PM9/PM3 identifiers as
a live record.

`dietary_input_traceability` is **PM Evidence durable source**.
`dietary_lever_atoms` **projects** those atoms for the Lever layer (same five atoms via
`resolveLeverAtom`); it is not a second evidence ontology.

PM-owned non-dietary relationships use the same five atoms in
`system_optimisation_practices` (§3.2) and `lifestyle_priorities` (§3.3). The
containing collection determines lever class and destination subsection, so records
must not duplicate PM ownership or subsection fields. These relationships remain
owned by the scientific-evidence layer and are not candidates for removal by the
later Dietary Levers pass.

Each `system_optimisation_practices` record also requires
`optimisation_category` with one of the hub-aligned values: `food_prep`,
`conditional_supplementation`, `dietary_protocols`, `light_circadian`, or
`stress_autonomic`. This is relationship metadata used for nested presentation
and hub roll-up; it is not an additional evidence atom. **Admitted** SOP records
are evidence-qualified interventions/protocols. PM pages render only categories
containing at least one such record. BRS hubs always show all five categories
(`Coming soon` when empty).

A refused Direct/Derived Dietary Requirement must not be rewritten as an SOP to
recover a lever. Apply the **conditional Optimisation Strategy follow-up**: flag
leftover intervention evidence as an SOP candidate and adjudicate it
independently, only when that workflow is in the current task. An SOP may act
through a connected mechanism; keep that distance and never project it upstream
as Direct/Derived of the target PM.

For these relationships, write the **Biological Role** at the level directly
measured by the cited evidence, then state separately any established biological
relevance to the PM. Do not turn improved absorption or another proximal effect
into demonstrated delivery to a tissue pool or modification of the PM. Write the
**Limitation** as one concise sentence wherever possible: identify the nearest
important boundary rather than listing every unmeasured mechanism and outcome.
Use plain scientific language; avoid governance phrases such as “does not
authorise”.

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

1. Name the biological objective/state governed by the PM.
2. Identify the claimed dietary relationship and its **type** (capacity,
   state-regulation, biochemical inventory, or shared constraint).
3. For **state-regulation**, apply the high-bar checks: exposure actually tested;
   population/model; human vs animal vs in vitro; endpoint; whether that endpoint
   represents **this** PM-governed state; direction; exposure context; dietary vs
   isolated pharmacological exposure; direct vs intermediate-dependent evidence;
   combination/pattern vs attributable constituent; reproducibility where
   evidence permits; Limitation; claim ceiling.
4. If the relationship is admitted to §3.1.1, determine whether it is Direct or
   Derived (distance), not evidence strength.
5. Assign the precise Input Type.
6. State the Biological Role at the level the evidence supports.
7. Identify evidence supporting that exact relationship.
8. Add a Limitation that blocks reading beyond the evidence.
9. Independently review §3.1.2 candidates (legacy names included). Independently
   test PM↔iKC applicability without reconstructing KC membership.
10. If a candidate is **not admitted** as Direct/Derived, preserve that NO, then
    apply the **conditional Optimisation Strategy follow-up** (next subsection).
    Do not reopen §3.1.1 / §4.1.1.

Do not use KC membership to decide Direct/Derived eligibility. Do not use absence
of dietary intervention evidence to decide whether a **capacity** relationship
exists. Do not infer Derived relationships solely from pathway adjacency. Do not
require every PM to have §3.1.1 entries.

#### Conditional Optimisation Strategy follow-up

A negative Dietary Requirements adjudication does **not** necessarily mean the
PM is not diet- or intervention-addressable.

**Optimisation Strategy** here is the existing System Optimisation Practices
layer (`system_optimisation_practices` / hub SOP). This is not a new ontology.

When a plausible dietary input or intervention is assessed for §4.1.1 / §3.1.1
and is **not** admitted as Direct or Derived, ask a **separate** question — do
not reopen the Dietary Requirement result:

> Does the evidence nevertheless support this input/exposure as an Optimisation
> Strategy for influencing the PM-governed state, either directly or through an
> evidence-supported connected mechanism?

**Canonical principle:** An Optimisation Strategy may influence a PM through an
evidence-supported connected mechanism, but the mechanistic distance must be
preserved. Such an intervention must not be projected upstream as a Direct or
Derived Dietary Requirement of the target PM.

**Rules**

1. **Preserve the Stage 2B result.** If X failed as Direct/Derived, it remains
   failed. Optimisation Strategy evidence must not be used to project X into
   §4.1.1 / §3.1.1.
2. **Preserve mechanistic distance.** Connected routes stay explicit. Example:
   EPA/DHA → SPM substrate/capacity (PM8) → resolution signalling → connected
   influence on NF-κB/inflammatory regulation must **not** collapse into EPA/DHA
   as a Direct Dietary Requirement of NF-κB PM1.
3. **Require independent evidence.** §4.1.1 failure does not auto-qualify an
   Optimisation Strategy. Ask whether intervention evidence supports: the
   intervention/exposure actually tested; the relevant biological outcome; the
   proposed direct or connected route; population/model and exposure context;
   direction and magnitude where available; an appropriate claim ceiling;
   governing limitations.
4. **Preserve exposure context.** Supplement, isolated compound, food, dietary
   pattern, preparation, timing protocol and other interventions are not
   interchangeable.
5. **Connected-mechanism strategies are allowed.** Evidence need not establish
   the candidate as a biological requirement of the target PM. Each load-bearing
   relationship in the proposed intervention route must be evidence-supported at
   the level claimed.
6. **Do not manufacture missing edges.** A limitation may bound an
   evidence-supported intervention relationship; it cannot compensate for an
   unsupported mechanistic connection.
7. **A valid outcome remains** Dietary Requirement: NO **and** Optimisation
   Strategy: NO / NOT ESTABLISHED. Do not force intervention addressability onto
   every PM.

**Workflow trigger**

When Stage 2B returns NO for a biologically plausible candidate that has
meaningful intervention evidence, or evidence through a connected mechanism:

```text
§4.1.1 / §3.1.1 candidate
        ↓
Direct/Derived relationship established?
        ↓ NO
Preserve NO
        ↓
Credible intervention evidence relevant to the PM, or an
evidence-supported connected mechanism?
        ↓ YES → surface a candidate for Optimisation Strategy
                 adjudication (matching `optimisation_category`)
        ↓ NO  → stop
```

Do **not** run a large Optimisation Strategies review automatically. Create or
surface the candidate for the SOP workflow unless that workflow is already part
of the current task. Do not auto-admit `system_optimisation_practices`.

**Public presentation**

Public PM Dietary Requirements panels show the **current evidence-qualified
scientific state** and reader-relevant limitations (exposure, population,
indirectness, conditionality, claim ceiling). They do **not** show how that
state was reached.

| Layer | Empty public copy | Populated public copy |
|-------|-------------------|------------------------|
| §3.1.1 / §4.1.1 | `No Direct or Derived Dietary Requirement is currently established for [PM-governed state/function].` | Admitted Direct/Derived relationships and scientific limitations |
| §3.1.2 / §4.1.2 | Admitted biochemical relationships only. If none: `No evidence-supported cofactors or substrates are currently established for this mechanism.` | Do not list rejected legacy candidates |
| §3.1.3 / §4.1.3 | `No mapping established.` | Linked KC title plus concise PM-specific relevance; no copied constituents or food-source bullets |

Helpers: `scripts/lib/pm-dietary-requirements-public-copy.mjs`. Empty Key Constraint
panels that still say `None listed` are rewritten to the empty copy by
`transformPmKcPresentation`.

Keep evidence boundaries. Remove pipeline history, rejected-candidate lists,
schema/governance reasoning, migration language, ownership disputes, and
review-status narration.

Where an Optimisation Strategy is independently admitted, identify it separately
from Dietary Requirements. Do not present an unreviewed candidate as an admitted
practice.

**Canonical principle:** Public pages explain what the evidence currently supports
and its scientific limitations. Audit records explain how the system reached that
conclusion.

**Calibration (BRS3-FM1-PM1):** EPA/DHA remains **not admitted** as Direct/Derived.
EPA/DHA supplementation, SPM biology and inflammatory outcomes may trigger an
Optimisation Strategy **candidate** (`conditional_supplementation`). That review
must keep the supported route through SPM/resolution biology and must not rewrite
EPA/DHA as a Direct NF-κB dietary relationship.

PM Scientific Findings may support, qualify, contradict or flag a dietary atom.
They must not automatically delete a dietary requirement, move it into a KC,
collapse Derived into its Direct target, convert a biochemical substrate into a
Dietary Requirement, or convert absence of modulation evidence into absence of
requirement. Flag conflicts for adjudication.

#### Canonical relationship examples (structure only)

These define atom shape. They are not a PM3 or PM9 recomputation.

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
intake response; food composition evidence ≠ PM modulation; type B state-regulation ≠
capacity/requirement; generic inflammation reduction ≠ this inflammatory PM;
combination/pattern evidence ≠ attributable constituent; isolated compound exposure ≠
ordinary food exposure; empty §3.1.1 ≠ a failed PM; Optimisation Strategy ≠ Dietary
Requirement; connected-mechanism influence ≠ Direct/Derived of the target PM;
§4.1.1 NO ≠ not diet- or intervention-addressable.

The heading **Dietary Requirement** may include both capacity relationships and
evidence-supported state-regulation. That is a terminology tension, not a licence to
collapse types. Keep the distinction in `relationship_mode`. Do not rename the
architecture in this contract revision.

---

## Cross-references

- Scientific Finding workflow: `system/scientific-finding-schema.md` § Bounded assessment
- PM scope consistency: `system/primary-mechanism-schema.md` § PM scope consistency
- Cofactor / §3.1 presentation: `system/primary-mechanism-schema.md` § Dietary Requirements (canonical §3.1)
- Downstream flags: `system/mechanism-change-control-queue.md`
- Conditional Optimisation Strategy follow-up / SOP boundary: `system/brs-hub-levers-schema.md` (System Optimisation Practices)
- Future hub/lever presentation patterns: `system/brs-hub-levers-schema.md` (Lever build)
