# Stage 2B — Applicability & Lever Implementation Contract

**Governing instruction:** Stage 2B applicability and lever implementation. Use with the [whole-PM page schema](primary-mechanism-schema.md) and preserve the evidence thresholds and stage boundary in [Stage 2A](scientific-finding-schema.md).

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

### Nutrient naming

Apply [Nutrient naming conventions](nutrient-naming-conventions.md) to vitamin names, form-specific claims and structured input/presentation labels. Keep family, specific form, preferred display label and aliases separately in the authoring/identity record; project labels through existing accepted page fields. This applies to Stage 2A handoff and Stage 2B adjudication.

### Input-specificity adjudication — before dietary candidate adjudication

**Name the specific evidence-supported biological input or defined resource pool required by the PM. Do not use a broad delivery category where the actual biological requirement can be identified.** Apply this before classifying each dietary candidate as Direct/Derived, biochemical inventory or shared constraint. This is a specificity decision, not evidence that a relationship is admitted or that increasing intake helps.

**Worked example — “Dietary protein → cysteine”.** If protein is proposed merely because it supplies cysteine for glutathione synthesis, assess **cysteine** as the biological input at the evidence-supported relationship and claim level. Do not admit an additional “Dietary protein → Cysteine” requirement solely to represent food delivery. Food → Substance composition, quantified food-source links and rankings belong to the food ontology. Evidence of food content or delivery does not establish a PM requirement, responsiveness or benefit from extra intake. Narrow only if the evidence supports cysteine's stated PM relationship; otherwise retain the tested exposure in its appropriate intervention category or record the precise unresolved gap.

**Choose the level from the biology and evidence:**

| Candidate context | Appropriate target / decision boundary |
|---|---|
| Identified substance requirement | Name the specific evidence-supported substance, not its food/macronutrient supplier. |
| Indispensable-amino-acid coverage | Name the defined indispensable-amino-acid pool or coverage requirement and its boundaries; “dietary protein” alone is insufficient. |
| Genuine protein-level process/intervention | Precisely defined protein quantity or quality may be retained when supported for the PM-specific process, for example an assessed muscle-protein outcome. Do not narrow it without constituent-specific evidence. |
| Food, mixture or dietary-pattern study without constituent isolation | Preserve the tested exposure and studied context in its appropriate intervention category. Do not invent a substance-specific effect or force an intervention into a biological-requirement slot. |
| Delivery-only supplier of an already identified input | Do not admit it as another biological requirement; consolidate duplicate delivery relationships while retaining evidence, upstream dependencies and decision history. |

**Mandatory candidate reporting:** reuse the existing Stage 2B candidate, evidence, rationale and disposition report/Review & Corrections entries. For every candidate, record a specificity decision and supporting evidence. A concise table row is sufficient for straightforward cases. Explicitly address all three questions where the label is broad, the target changes, or the relationship is disputed or unresolved.

The three questions are:

1. What biological input or resource pool does this PM require (or, for an intervention exposure, what PM biology was actually tested)?
2. Does the proposed label identify that requirement/exposure, or merely a delivery category?
3. Does the evidence support the proposed level of specificity? Identify the supporting Finding/study and the measured versus inferred links, context and limitations; if insufficient, name the exact gap.

Record the **specificity disposition** in the existing disposition/rationale entry: **retained, narrowed, consolidated, moved, rejected or unresolved**. This does not replace the separate scientific admission/applicability or Direct/Derived decision. Record original candidate label, resulting target and destination when changed; link supporting evidence and preserve prior identifiers/decisions and independently supported upstream edges. Consolidation must explain the duplicate relationship and retained record; moving must identify the appropriate destination without automatically admitting it there. Rejection needs an evidence-based rationale; unresolved needs the missing evidence and follow-up. Narrowing must not add a claim absent from the evidence. No additional canonical PM fields or sixth disclosure atom are required.

**Completion gate:** generic labels such as “dietary protein”, “amino-acid provision” or broad macronutrient/food categories require explicit adjudication. Review all candidates, not only exact keyword matches. A retained broad target needs a mechanism-specific justification for why that level is biologically/evidentially appropriate. A delivery-only category cannot be admitted as an additional requirement merely because it supplies an identified substance. Do not auto-delete, rename, merge, migrate or change classification by matching words. The report is incomplete until every candidate has supporting evidence/rationale and a specificity disposition, with all three questions explicitly addressed where the label is broad, the target changes, or the relationship is disputed or unresolved; an unresolved outcome may remain only with its exact gap and follow-up, not as a substitute for review. Record consolidation history and verify that no duplicate delivery-only requirement was newly admitted. Structural atom validation alone does not satisfy this scientific/reporting gate.

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
| **Input** | Evidence-supported dietary-facing identifier at the granularity actually established (for example a substance, class, component, food group, matrix, pattern, preparation characteristic, or other defined exposure). When that identifier has a page in this system, the Input value inside the five-atom disclosure links to it. The compact heading above the disclosure does not. |
| **Input type** | Category of input (see § Input types) |
| **Biological role** | What job this input performs in the mechanism biology (public science; not ownership or page-maintenance language) |
| **Evidence source** | What supports **that biological role** — at least one resolvable Scientific Finding id and PM-bibliography `citation_key` |
| **Limitation** | Concise boundary preventing interpretation beyond the linked Finding and citation |

Together these form the canonical reader-facing five-atom structure:

`Input | Input type | Biological role | Evidence source | Limitation`

**Limitation is mandatory relationship currency, not a separate research exercise.**
Derive it from the existing adjudication and cited Evidence Source; do not initiate a
separate search for a “limitation reference.”

**Input page link.** Every admitted lever on a PM, SM, or KC page links its Input
to that input’s page when the page exists in this system. The link is the Input
value inside the five-atom disclosure only. Do not link the compact heading above
it. “Glutathione — Biochemical requirement” stays plain text; the disclosed
`Input = Glutathione` links to the glutathione page. Resolve the page from the
substance pages already published. Do not invent a page. Do not match a longer
phrase to a shorter page: “Creatine supplementation” is not the creatine page,
and “glutathione peroxidase” is not the glutathione page. A preparation, practice,
pattern, or class with no page stays unlinked.

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
| **D. Shared constraint** | Does an evidence-supported shared resource/availability constraint apply to this PM? | §3.1.3 / §4.1.3 — KC/iKC ownership unchanged. See **Type D — shared-pool applicability** |

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

### Type D — shared-pool applicability

Supported upstream supply follows the canonical iKC rule below. The following capacity-constraint threshold applies to **Conditional constraint**, not to Supported upstream supply. Both relationship types belong in §3.1.3; §3.1.2 remains biochemical Cofactors and Substrates.


**“PM-specific”** means evidence that the iKC **applies to that PM**. It does
**not** mean the constraint is unique to the PM, that supporting evidence must
be authored or stored only on that PM, or that the PM must govern or assess
the shared pool.

Two applicability modes use the **same** evidence threshold:

- **Governs the constraint** — this PM’s governed objective is the pool or
  bottleneck state itself (for example meal-level LAT1 competitive balance).
- **Is constrained by it** — inadequacy or imbalance of the named KC pool or
  state can constrain the capacity this PM governs.

**Conditional-constraint admission threshold.** Admit this relationship type only when both are true:

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
| `established` | Threshold met. Publish each adjudicated distinct input or pool disclosure with its separate linked KC origin tag. If distinctness review consolidates every disclosure, keep this applicability record and leave §3.1.3 without `No mapping established.` |
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

## KC relationship distinctness and duplication — final Stage 2B gate

A separate **conditional-constraint** KC disclosure must explain an evidence-supported constraint relationship distinct from relationships already published under **§3.1.1 Direct/Derived Requirements, §3.1.2 Cofactors and Substrates, or §3.2 System Optimisation Practices**. Ask: **“What different biological job does this KC relationship explain?”**

Compare the input or defined pool, biological role, relationship claim, context and supporting evidence. A different section, KC origin tag, record identifier or wording does not establish a different relationship. Shared evidence alone does not prove duplication; different evidence alone does not prove distinctness. Do not deduplicate by input name: independently supported jobs may share an input.

A provision relationship stays one job when §3.1.1 already states it as two atoms: the direct substrate used in the reaction, and a precursor that supplies that substrate by conversion. Publish both in §3.1.1 at the distance the evidence supports. A KC disclosure whose stated job is sustaining that same capacity is the same relationship.

An input-type label, including “Resource dependency,” does not answer the job question. Neither does a KC origin tag.

Results that only bound that provision stay with the provision atoms. Combined depletion and an adequate-intake boundary limit what those atoms may claim, and they remain supporting evidence. They support a separate conditional-constraint KC disclosure when the evidence establishes a further constraint — competition, allocation, transport, or another bottleneck — beyond provision of the same inputs. A supported mechanistic chain can establish that further constraint; distinctness does not require one direct measurement of the bottleneck. The chain must establish a constraint beyond provision. A precursor-to-substrate chain alone is the provision relationship already recorded in §3.1.1 and does not establish KC distinctness. When no such constraint is established, consolidate that conditional-constraint disclosure as a duplicate. A concise supported-upstream-supply pool summary follows the canonical iKC rule below. Keep its evidence, canonical KC identifiers, provenance and decision history on the retained records, and leave applicability on the applicability record. If every proposed disclosure is consolidated, §3.1.3 has no public disclosure. Do not write `No mapping established.` That sentence means no PM↔iKC mapping was established. Consolidating presentation must not erase an established applicability record.

- Repeated substrate, cofactor, precursor or intervention relationships: consolidate duplicate public presentation while preserving evidence, canonical identifiers, provenance and decision history in the retained relationship and audit.
- Distinct shared-resource limitations: retain a separate KC disclosure explaining the limitation and its boundaries.
- Combined-pool evidence: retain a pool-level public claim only when that pool passes the job test above. Do not split a retained pool into individually limiting constituents without supporting adjudication. Name a retained pool as the trigger with a separate KC origin tag. Individually authorised input triggers remain appropriate only for individually supported, distinct relationships. When the pool’s job is provision already recorded for its constituents, consolidate the public disclosure and preserve the combined result in the supporting evidence and limitations, without attributing individual effects the study did not isolate.
- Unresolved distinctness: retain the proposed additional disclosure audit-only, recording the precise gap and follow-up. Scientific applicability and public distinctness are separate decisions; consolidation does not reject an otherwise valid applicability record.

**Mandatory recorded review:** Before completion, compare every proposed KC/iKC and constituent disclosure against all three sections. Reuse the Stage 2B report's disposition, rationale, evidence and record-ID columns; no new public atom, front-matter status or applicability enum is required. Record **distinct**, **consolidated as duplicate**, or **unresolved** as the presentation-review disposition, alongside (not replacing) scientific applicability. A concise row must identify proposed relationship/atom IDs, compared records (or explicit “none” for each section), the biological job and context comparison, supporting evidence, rationale, retained/public destination, preserved provenance and any precise gap. Rejected candidates remain audit-only under the existing admission rules.

Final review must verify that every proposed disclosure has a decision, no duplicate public relationship remains, unresolved additional disclosures are absent publicly, and consolidation preserves its evidence and provenance. This is an evidence review, not string matching. For a focused report gate, pass the existing report rows and proposed public relationship IDs to `validateKcDistinctnessReview` in `scripts/lib/kc-relationship-distinctness-review.mjs`. It checks completeness and disposition-to-publication consistency, not biological truth. A row that records a different job string can pass this structural check. Different wording does not prove a different biological job; evidence adjudication must establish that job. The check also rejects a `distinct` disposition when the row records the same biological job as a compared record, including when the pool name, a “Resource dependency” label, or the citation set differs, and it rejects consolidated presentation that replaces an established mapping with `No mapping established.` Run `node --test scripts/kc-relationship-distinctness-review.test.mjs`.

## 3. Reappearance is expected

A dietary input may legitimately reappear across PMs, KCs, cofactors, Key Dietary
Requirements, and BRSs — including in different biological roles.

**Reappearance ≠ duplication.** Do not deduplicate by nutrient/substance name.

A **true duplicate** repeats the same biological relationship in the same PM context. Different supporting studies do not make an otherwise repeated job distinct; apply the KC distinctness gate above.

Preserving reappearance is essential: later mechanical roll-up must identify recurring
key dietary inputs while retaining every biological reason they appeared.

| Term | Meaning |
|------|---------|
| **Reappearance** | Same input again — inspect role and context |
| **Multi-role reappearance** | Same input, materially different biological role |
| **Shared-role reappearance** | Same input/role at multiple architectural levels legitimately (for example the same substrate on two PMs). Not a licence to reprint §3.1.1 into §3.1.2 |
| **True duplicate** | Repeated biological relationship/context; evidence identity is not decisive |
| **Misclassification** | Wrong category or context for the actual role |

---

## 4. KCs, iKCs, cofactors, Key Dietary Requirements

These are **biological structures/relationships**, not parent/child categories of
Dietary Requirements.

**Terminology:** `KC1`, `KC2`, `KC3`… are canonical **KC pages**. An **iKC** is an
individually registered KC constituent linked to a verified canonical substance ID. A KC page may register multiple iKCs. A PM
may reference multiple iKCs. An iKC may apply to multiple PMs. PM ↔ iKC is
many-to-many.

Where they carry a dietary-relevant relationship, preserve the same five atoms.
**A cofactor name alone is insufficient** (e.g. `cofactors: [B6 (PLP)]` without role
and evidence).

Do not force dietary strategies, patterns, timing, food groups, or other future Lever
input types through a KC or cofactor slot when their biological role belongs elsewhere.

A substrate, cofactor or nutritionally required input is not thereby a KC or iKC.
iKC identity requires registered membership in a canonical KC pool and verified substance identity under
`system/key-constraint-schema.md`. The KC pool retains the shared resource-pool/bottleneck definition. An iKC relationship must not replace a
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

`key_constraints` records **which iKCs are independently admitted** for the
PM. Proposed, rejected and unresolved assessments remain audit-only. It does **not** inherit constituent relationships. iKC membership ≠ PM
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

Treat every proposed KC/iKC and relevant constituent as an evidence-review candidate. Presence on a KC page or absence from a PM record settles neither applicability nor relevance. Independently assess the resource/bottleneck, its supported connection to this PM, evidence and limitations. Reuse verified evidence and explicitly supported mechanistic chains; do not require a universal single end-to-end human assay. Record supported/conditionally admitted, rejected or unresolved decisions with evidence, limitations and rationale; unresolved decisions identify the exact gap and follow-up. Missing records are an implementation gap, not scientific exclusion. PM ownership does not prohibit iKC inclusion. Public §3.1.3 and mapping indices show admitted relationships only; rejected/unresolved assessments remain in the audit.

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

§4.1.3 is unchanged: iKC definition and constituent membership stay KC-owned. PM Stage 2B adjudicates only PM↔iKC applicability under **Type D — shared-pool applicability**. Shared inputs with §4.1.1 are not grounds to reject that relationship; Direct Dietary Requirements and a shared constraint may name the same substances when the constraint is a shared limiting pool. Independent Dietary Requirement adjudication is preserved: do not use KC membership to admit or remove a §3.1.1 / §3.1.2 relationship, and do not inherit iKC constituent or food-source lists.

If no PM↔iKC mapping is `established` on the page, public copy is `No mapping established.` Record `kc_applicability_adjudications` for each assessed iKC arm (`established`, `unassessed`, `unresolved`, or `evidence-supported-non-application`). Unassessed, unresolved and evidence-supported non-application stay in the Stage 2B audit and change-control; they do not appear as a KC title, paragraph, constituent list, or food-source list. If a mapping is established, render only adjudicated distinct input or pool disclosures with separate KC origin tags; apply the final distinctness gate. When that gate consolidates every disclosure, leave the panel without a public disclosure and without `No mapping established.` Applicability stays on the applicability record. Assess distinct KC arms separately (for example amino-acid quality versus competitive transport balance).

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
Methionine → MAT substrate evidence supports assessing methionine at that biological level; it does not justify an additional dietary-protein requirement solely for delivery. A separately tested protein-level intervention needs its own PM-specific evidence and specificity decision. Food composition evidence does not by itself establish PM modulation.

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
Presentation rows may specify placement, a label, `reader_description` and
`description_finding_id`. The description briefly summarises the reviewed role
in concise, faithful plain language without adding claims; the Finding link supplies
navigation. Neither field owns or overrides the atom's Input Type, Biological
Role, Evidence Source, Limitation, classification or Derived Target.

Section context controls the compact projection:

- **§3.1.1:** Input + Direct/Derived + Input Type + Derived Target where applicable, plus any always-visible linked upstream indicators from `upstream_pm_relationships`.
- **§3.1.2:** Input + biochemical Input Type only; never inherit Direct/Derived.
- **§3.1.3:** PM-owned Input→PM relevance in iKC context, with optional linkage to
  separately reviewed KC identity; never inherit Direct/Derived, never copy
  un-adjudicated iKC constituents, and never overwrite either relationship's
  evidence.

The same atom may be presented in more than one subsection when **distinct**
relationships share that input. Do not present the same input + type + role in
both §3.1.1 and §3.1.2. That input + type + role test detects reprints between
§3.1.1 and §3.1.2. It does not establish KC distinctness. For §3.1.3, apply the
KC distinctness gate: a different input name, input type, or origin tag can
still be the provision relationship already published in §3.1.1.
Relationship-specific presentation metadata must never become input-global metadata.

Default Dietary Requirement presentation remains compact. When Direct/Derived
classification is present, §3.1.1 should make the distinction readable without
internal IDs:

```text
Source Markdown bullet: Methionine
Rendered collapsed entry: Methionine — Direct · Substrate

Source Markdown bullet: Tyrosine
Rendered collapsed entry: Tyrosine — Direct · Substrate · [Supply: PM1]
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
   lists into the entry disclosure; and
6. when the Input has a page in this system, that page is linked from the
   Input value only. The compact heading is not that link.

Schema and unit-test success alone is insufficient because a valid atom can
still fail to render when its Markdown label does not match its presentation
record.

---

### Canonical working Stage 2B reference: BRS1-FM1-PM3

This is the implemented reference, extracted from the actual PM3 source and shared renderer. Preserve the adjudicated science; presentation metadata is a faithful summary and navigation, not a second scientific record.

Canonical page: https://thebraindiet.org/docs/biological-targets/brs1/fm1/brs1-fm1-pm3-dopaminergic-signalling-regulation

Each entry is one component: **compact label/trigger → reader description → Input → Input type → Biological role → Evidence source → Limitation → supporting mechanism research link**. The description is the first opened content. The research link is the final opened content, not a sixth atom. Keep the description inside the dropdown and the Finding title after the atoms. Use a concise, faithful, plain-language reader description. A concise Biological role may also serve as the description; do not force artificial variation.

Author one short sentence explaining input → contribution/conversion → process, within the reviewed role and claim ceiling. These accepted descriptions are the reference:

| Input | Reader description |
|---|---|
| Tyrosine | Tyrosine is the starting material used to make dopamine. |
| Iron | Iron helps the enzyme that carries out the first step in making dopamine from tyrosine. |
| Vitamin B6 | Vitamin B6 is converted into PLP, the active cofactor used in the final step of dopamine synthesis. |

Local requirements remain local even with upstream supply: Tyrosine — Direct · Substrate · [Supply: PM1]; Iron — Direct · Cofactor; Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor) — Direct · Cofactor; Vitamin B6 — Derived · Cofactor Precursor → Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor). Do not repeat the supply explanation in the description. Retain `upstream_pm_relationships` on the reviewed atom; render its link beside that input, never on the subsection header. PM1's canonical destination is https://thebraindiet.org/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation. Do not import PM1's dietary entries.

If no local Direct/Derived requirements are established, state the adjudicated status: distinguish an established absence from an unresolved assessment. An independently supported upstream dependency may appear once as a linked relationship with a concise explanation; it does not create local nutrient atoms. Do not manufacture five-field local disclosures from upstream lists.

`description_finding_id` must identify the necessary canonical Finding that supports the description. Resolve its actual record title and actual anchor; flag missing targets or multiple necessary Findings before finalising, rather than inventing anchors or choosing a broadly related Finding. Here PM3-F1 resolves to **Dopamine synthesis requires distinct substrate and cofactor steps**, at https://thebraindiet.org/docs/biological-targets/brs1/fm1/brs1-fm1-pm3-dopaminergic-signalling-regulation#pm3-f1. Its title comes from `scientific_findings[].finding_label`; `ScientificFinding.tsx` uses the lower-case Finding ID as the element ID. Evidence source separately retains author/year plus numbered bibliography links.

| Stored here | Displayed here |
|---|---|
| PM3 §3.1.1 Markdown bullets | Entry labels selected by `dietary_lever_presentations.label` and `atom_id`; Markdown supplies no independent scientific prose |
| `dietary_lever_atoms.requirement_classification`, `derived_target` + canonical `input_type` | Compact Direct/Derived qualifier and Derived target |
| `dietary_input_traceability[].upstream_pm_relationships` | Always-visible contextual PM link beside the input |
| `dietary_lever_presentations.reader_description` | First content inside the opened dropdown |
| `dietary_input_traceability`: `input`, `input_type`, `biological_role`, `evidence_source`, `evidence_limitation` | Exactly five atoms, in that order; citation keys resolve against `references` to author/year [n] |
| `dietary_lever_presentations.description_finding_id` → canonical Finding | Final Supporting mechanism research link, with canonical title and full PM URL |

The following is exact source Markdown; descriptions, qualifiers, fields and research links are supplied by the renderer. No authored description paragraph is inserted here.

<!-- PM3-REFERENCE:markdown -->
```mdx
<div class="brs-fm-hub-item" data-brs-fm-hub>
<div class="brs-fm-hub-shell">
<button type="button" class="brs-fm-hub-summary" aria-expanded="false">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
<strong>3.1.1 Direct and/or Derived Dietary Requirements</strong>
</button>
<div class="brs-fm-hub-panel" hidden>

- Tyrosine
- Iron
- Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor)
- Vitamin B6

</div>
</div>
</div>
```
<!-- /PM3-REFERENCE:markdown -->

Minimal frontmatter integration excerpts follow: Tyrosine (Direct), vitamin B6 (Derived) and BH4 (biochemical). Each retains its complete five-field atom and presentation metadata; overlays show the classification fields needed for display. B6 targets canonical PLP atom `PM3-DIT-2`, whose complete Direct record remains in PM3. Apply these patterns to the target PM’s own reviewed records; these excerpts are not a complete standalone frontmatter file.

Full `scientific_findings` and `references` remain in the canonical PM3 source. **Citation numbering is resolved from the target PM’s own bibliography**, by matching atom citation keys to its `references` positions. Do not copy PM3’s bibliography into another PM, hard-code PM3’s numbers, or renumber the live page to simplify this example. The renderer resolves author/year and [n] separately from the Finding navigation. Tests load the complete canonical PM3 source for dependencies omitted here.

<!-- PM3-REFERENCE:records -->
```yaml
dietary_input_traceability:
  - atom_id: PM3-DIT-3
    input: Vitamin B6
    input_type: cofactor precursor
    biological_role: 'Dietary route to PLP, the active cofactor for aromatic L-amino-acid decarboxylase. This is not an independent dopamine-synthesis cofactor'
    evidence_source:
      finding_ids:
        - PM3-F1
      citation_keys:
        - kennedy_b_2016
        - spector_vitamin_1978
    evidence_limitation: 'Dietary B6 can supply PLP precursors, including vitamers that enter the central nervous system, but increasing B6 intake has not been shown to increase human brain dopamine synthesis.'
  - atom_id: PM3-DIT-5
    input: Tyrosine
    input_type: substrate
    biological_role: Tyrosine is the substrate for conversion to L-DOPA in dopamine synthesis.
    upstream_pm_relationships:
      - relationship_label: Supply
        pm_short_id: PM1
        pm_id: BRS1-FM1-PM1
        href: /docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation
    evidence_source:
      finding_ids:
        - PM3-F1
      citation_keys:
        - fanet_tetrahydrobioterin_2021
    evidence_limitation: Substrate necessity does not establish that additional dietary tyrosine increases brain dopamine or improves a functional or clinical outcome.
  - atom_id: PM3-DIT-4
    input: Tetrahydrobiopterin (BH4)
    input_type: cofactor
    biological_role: Endogenous cofactor required by tyrosine hydroxylase during conversion of tyrosine to L-DOPA
    evidence_source:
      finding_ids:
        - PM3-F1
      citation_keys:
        - fanet_tetrahydrobioterin_2021
    evidence_limitation: BH4 is synthesised and recycled in vivo; this is not evidence for dietary BH4 provision or increased dopamine synthesis.
dietary_lever_atoms:
  - atom_id: PM3-DIT-3
    requirement_classification: derived
    relationship_mode: capacity-requirement
    derived_target: Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor)
    derived_target_atom_id: PM3-DIT-2
    relationship_layer: dietary-requirement
    dietary_addressability: precursor-mediated
    claim_ceiling: dietary-provision
  - atom_id: PM3-DIT-5
    requirement_classification: direct
    relationship_mode: capacity-requirement
    relationship_layer: dietary-requirement
    dietary_addressability: not-established
    claim_ceiling: biological-dependency
  - atom_id: PM3-DIT-4
    relationship_layer: biochemical-requirement
    claim_ceiling: biological-dependency
dietary_lever_presentations:
  - atom_id: PM3-DIT-5
    label: Tyrosine
    presentation_section: 3.1.1
    reader_description: Tyrosine is the starting material used to make dopamine.
    description_finding_id: PM3-F1
  - atom_id: PM3-DIT-3
    label: Vitamin B6
    presentation_section: 3.1.1
    reader_description: Vitamin B6 is converted into PLP, the active cofactor used in the final step of dopamine synthesis.
    description_finding_id: PM3-F1
  - atom_id: PM3-DIT-4
    label: Tetrahydrobiopterin (BH4)
    presentation_section: 3.1.2
    reader_description: BH4 helps the enzyme that converts tyrosine into L-DOPA, the first step in making dopamine.
    description_finding_id: PM3-F1
```
<!-- /PM3-REFERENCE:records -->

**Integration examples using the existing shared renderer, not standalone replacement components.** The following code is extracted from existing source. Do not copy these partial functions into new components; keep using `PmDietaryLeverEnhancer` and its existing imports, helpers and effect lifecycle.

Exact renderer functions from `src/components/PmDietaryLeverEnhancer.tsx` (types/imports remain in that source):

<!-- PM3-REFERENCE:renderer -->
```tsx
function renderEvidenceLinks(refs: EvidenceReference[]): string {
  if (!refs.length) return "<span>No linked reference available.</span>";
  return `<span class="brs-dietary-lever-detail-references">${refs
    .map(
      ({ number, authorYear, href }) =>
        `${escapeHtml(authorYear)} <a href="${escapeHtml(href || pmReferenceHref(number))}">[${number}]</a>`,
    )
    .join("; ")}</span>`;
}

function buildDescriptionHtml(d: DietaryLeverDisclosure): string {
  const description = String(d.readerDescription || "").trim();
  if (!description) return "";
  return `<div class="brs-dietary-lever-description"><p>${escapeHtml(description)}</p></div>`;
}

function buildResearchLinkHtml(d: DietaryLeverDisclosure): string {
  const finding = d.supportingFinding;
  return finding
    ? `<p class="brs-dietary-lever-finding">Supporting mechanism research: <a href="${escapeHtml(finding.href)}">${escapeHtml(finding.label)}</a></p>`
    : "";
}

function renderInputValue(d: DietaryLeverDisclosure): string {
  const label = escapeHtml(d.title);
  if (!d.inputHref) return label;
  return `<a class="brs-dietary-lever-input-link" href="${escapeHtml(d.inputHref)}">${label}</a>`;
}

function buildDetailHtml(d: DietaryLeverDisclosure): string {
  const limitation = d.evidenceLimitation
    ? `<p class="brs-dietary-lever-detail-limit"><span class="brs-dietary-lever-detail-k">Limitation</span> = ${escapeHtml(d.evidenceLimitation)}</p>`
    : "";

  return `
    <div class="brs-dietary-lever-detail-inner">
      ${buildDescriptionHtml(d)}
      <p><span class="brs-dietary-lever-detail-k">Input</span> = ${renderInputValue(d)}</p>
      <p><span class="brs-dietary-lever-detail-k">Input type</span> = ${escapeHtml(d.inputType)}</p>
      <p><span class="brs-dietary-lever-detail-k">Biological role</span> = ${renderInlineMarkdownLinks(d.biologicalRole)}</p>
      <p class="brs-dietary-lever-detail-evidence"><span class="brs-dietary-lever-detail-k">Evidence source</span> = ${renderEvidenceLinks(d.evidenceReferences)}</p>
      ${limitation}
      ${buildResearchLinkHtml(d)}
    </div>
  `.trim();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderInlineMarkdownLinks(text: string): string {
  return escapeHtml(text).replace(
    /\[([^\]]+)\]\((\/docs\/[^)]+)\)/g,
    '<a href="$2">$1</a>',
  );
}
```
<!-- /PM3-REFERENCE:renderer -->

Minimal panel/row wiring from existing `enhanceListItem`. That shared function already constructs the trigger, classification qualifier and contextual upstream links and handles opening/closing. The contextual link is a sibling of the trigger within the same entry, not nested inside the button.

<!-- PM3-REFERENCE:assembly -->
```tsx
  const detailId = `brs-dietary-lever-${Math.random().toString(36).slice(2, 9)}`;
  trigger.setAttribute("aria-controls", detailId);

  const detail = document.createElement("div");
  detail.id = detailId;
  detail.className = "brs-dietary-lever-detail";
  detail.hidden = true;
  detail.setAttribute("role", "dialog");
  detail.setAttribute("aria-modal", "false");
  detail.setAttribute("aria-label", `${disclosure.title} — five-field evidence`);
  detail.innerHTML = buildDetailHtml(disclosure);

  li.textContent = "";
  li.append(trigger);
  if (titleLink) li.append(document.createTextNode(" "), titleLink);
  if (originLink) li.append(document.createTextNode(" · ["), originLink, document.createTextNode("]"));
  if (disclosure.compactQualifier) li.append(qualifierSpan);
  if (upstreamIndicators.length) li.append(upstreamWrap);
  if (parsed.foods) li.append(foodsSpan);
  li.append(detail);
```
<!-- /PM3-REFERENCE:assembly -->

Exact route binding from the component; this excerpt ends before the remaining effect's event registration. `useDoc` supplies the real document permalink, and `useDocusaurusContext` supplies the site's canonical origin.

<!-- PM3-REFERENCE:binding -->
```tsx
export default function PmDietaryLeverEnhancer({ frontMatter }: Props): React.ReactNode {
  const { metadata } = useDoc();
  const { siteConfig } = useDocusaurusContext();
  const canonicalPmUrl = new URL(metadata.permalink, siteConfig.url).href;
  useEffect(() => {
    const map = buildDietaryLeverDisclosureMap(frontMatter);
    for (const disclosure of map.values()) {
      if (disclosure.titleHref) {
        disclosure.titleHref = new URL(disclosure.titleHref, canonicalPmUrl).href;
      }
      if (disclosure.inputHref) {
        disclosure.inputHref = new URL(disclosure.inputHref, canonicalPmUrl).href;
      }
      if (disclosure.originTag) {
        disclosure.originTag.href = new URL(disclosure.originTag.href, canonicalPmUrl).href;
      }
      if (disclosure.supportingFinding) {
        disclosure.supportingFinding.href = new URL(disclosure.supportingFinding.href, canonicalPmUrl).href;
      }
      for (const indicator of disclosure.upstreamIndicators || []) {
        indicator.href = new URL(indicator.href, canonicalPmUrl).href;
      }
    }
```
<!-- /PM3-REFERENCE:binding -->

Exact Finding resolver from `src/lib/dietaryLeverDisclosure.ts`:

<!-- PM3-REFERENCE:resolver -->
```tsx
function supportingFindingLink(
  frontMatter: Record<string, unknown>,
  findingId?: string,
): SupportingFindingLink | null {
  const id = String(findingId || "").trim();
  if (!id) return null;
  const findings = (frontMatter.scientific_findings || []) as Array<{
    id?: string;
    finding_label?: string;
  }>;
  const finding = findings.find((row) => String(row?.id || "") === id);
  const label = String(finding?.finding_label || "").trim();
  if (!label) return null;
  return { id, label, href: `#${id.toLowerCase()}` };
}
```
<!-- /PM3-REFERENCE:resolver -->

Expected closed result: the four compact labels above, with Supply: PM1 only beside Tyrosine. Expected opened result: one reader sentence, five labelled atomic rows, then Supporting mechanism research: [Dopamine synthesis requires distinct substrate and cofactor steps]. All of these belong to the same dropdown; neither presentation field changes the five-atom model.

Completion gate: run `node --test scripts/pm-dietary-reference-example.test.mjs` plus the relevant traceability/governance tests and production build. The reference test parses these excerpts, loads full dependencies from canonical PM3, validates the resulting records, executes the actual renderer excerpt and tests Direct and Derived behavior, field ordering and resolved references. Verify closed/opened states and actual Finding/bibliography targets in the browser. After changing the implementation, refresh the extracted code here and rerun the behavior tests; text equality alone is insufficient.

### Implemented §3.1.2 extension: endogenous BH4

This extension uses the same existing shared dropdown component and the same five-atom record, PM3-DIT-4, shown above. Its presentation metadata now supplies `reader_description` and `description_finding_id: PM3-F1`. Its description summarises the reviewed atom without adding dietary-provision or intake-response claims.

Stored §3.1.2 Markdown below → compact **Tetrahydrobiopterin (BH4) — Cofactor**. Stored `reader_description` → first opened sentence: **BH4 helps the enzyme that converts tyrosine into L-DOPA, the first step in making dopamine.** Then the renderer displays Input → Input type → Biological role → Evidence source → Limitation → Supporting mechanism research, linking to the same canonical PM3-F1 title and full URL above. Evidence source remains Fanet et al. (2021) [1].

BH4 remains `relationship_layer: biochemical-requirement`; it has no Direct/Derived classification or Derived target, and no imported upstream dietary entries. Its limitation explicitly says endogenous synthesis/recycling is not evidence for dietary BH4 provision or increased dopamine synthesis. The text below the entry is existing subsection context, not a reader description outside the dropdown.

<!-- PM3-REFERENCE:markdown-bh4 -->
```mdx
<div class="brs-fm-hub-item" data-brs-fm-hub>
<div class="brs-fm-hub-shell">
<button type="button" class="brs-fm-hub-summary" aria-expanded="false">
<span class="brs-fm-hub-chevron" aria-hidden="true"></span>
<strong>3.1.2 Cofactors and Substrates</strong>
</button>
<div class="brs-fm-hub-panel" hidden>

- Tetrahydrobiopterin (BH4)

Tetrahydrobiopterin is an endogenous cofactor required for tyrosine hydroxylation, not a dietary BH4 recommendation. Tyrosine as the local hydroxylase substrate is listed above. Dietary tyrosine supply and phenylalanine conversion are assessed on [BRS1-FM1-PM1 — Amino-Acid Availability & Prioritisation](/docs/biological-targets/brs1/fm1/brs1-fm1-pm1-amino-acid-availability-and-prioritisation). Competitive LAT1 transport is assessed on [BRS1-FM1-PM2 — LAT1 Competitive Transport Modulation](/docs/biological-targets/brs1/fm1/brs1-fm1-pm2-lat1-competitive-transport-modulation).

</div>
</div>
</div>
```
<!-- /PM3-REFERENCE:markdown-bh4 -->

Test this extension through the documented records and shared renderer: verify the Cofactor-only compact label, exactly five atoms, Fanet [1], and the final canonical research link. Do not inherit §3.1.1 Direct/Derived metadata.

### Admitted PM-owned KC input disclosure — PM7 integration reference

Use the existing shared renderer. Public §3.1.3 titles identify the adjudicated distinct **input or defined pool**, not a parent KC used as a substitute for the biological input. The following individual-input example demonstrates renderer integration only; it does not waive distinctness review or approve scientific admissions. Pool evidence requires a pool trigger rather than unsupported constituent splitting. Render `Folate · [KC1: Methyl Donor Pool]`, `Betaine · [KC1: Methyl Donor Pool]`, `Choline · [KC1: Methyl Donor Pool]`. Each input name is a button; the separate origin tag is a sibling navigation link, never nested inside it. Do not add audit headings such as “Established mapping” or “Independently supported input relationships”.

**Admission:** Stage 2B independently evidence-reviews each proposed PM→KC/iKC/input relationship and records evidence, limitations, rationale and disposition. Publish only supported or conditionally admitted relationships. Rejected and unresolved candidates remain audit-only, with exact remaining gaps and follow-up. KC membership or a provenance tag alone does not authorise an input; missing records do not justify exclusion. Preserve canonical KC/iKC/constituent identifiers when applicable; do not invent iKC identifiers or label every nutrient an iKC. PM7 KC1 remains conditionally established; KC2 remains unresolved and is not a public requirement or admitted mapping. Folate/betaine/choline provision does not settle KC2's methionine/cysteine capacity question.

**Interaction:** hover or focus on the input previews its disclosure; click/tap pins the same disclosure; a second activation, Escape or the existing outside-click close interaction dismisses it. Enter/Space activate the native button. Tab reaches the separate origin link, which navigates without opening or pinning the disclosure. Hover/focus on the origin tag alone does not preview. Escape returns focus to the input without reopening it.

**Opened order:** reader description → exactly five atoms (Input → Input type → Biological role → Evidence source → Limitation) → Supporting mechanism research. Conditional animal contexts, enrichment-versus-flux limits and provision-versus-enhancement boundaries remain inside the disclosure. The research link is navigation, not a sixth atom.

Canonical PM source: `docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation.mdx`. Canonical origin destination: https://thebraindiet.org/docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool. PM7-F5 resolves to “Donor insufficiency can constrain hepatic methylation” at https://thebraindiet.org/docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation#pm7-f5; choline uses PM7-F7 at https://thebraindiet.org/docs/biological-targets/brs2/fm3/brs2-fm3-pm7-phosphatidylcholine-formation#pm7-f7. Resolve titles/anchors from the canonical Finding, not an invented target. Evidence source links remain Author et al. (year) [n], with numbering resolved from the target PM bibliography. Do not copy PM3/KC bibliographies or renumber live pages for this example.

**Integration excerpts using the existing shared renderer; not standalone replacement components.** Stored Markdown → three compact trigger rows inside the existing §3.1.3 panel. The renderer supplies origin tags from reviewed relationship metadata; Markdown is not three manually linked input titles.

<!-- PM7-KC-REFERENCE:markdown -->
```mdx
- Folate
- Betaine
- Choline
```
<!-- /PM7-KC-REFERENCE:markdown -->

Stored PM-owned records → constituent five fields, description and research target. The representative folate atom below is exact; betaine DIT-6 and choline DIT-3, all Findings, bibliography and the established KC1 adjudication are loaded from canonical PM7 dependencies. `kc_atom_id` records reviewed membership separately from `pm_atom_id`; no atom fields are inherited from the KC page. The relationship's `origin_label`/`kc_href` provide provenance only. Other existing parent relationship evidence fields are retained in canonical source, not copied into this instruction.

<!-- PM7-KC-REFERENCE:records -->
```yaml
dietary_input_traceability:
  - atom_id: PM7-DIT-5
    input: Folate
    input_type: precursor
    biological_role: Folate availability contributes to the methyl-donor supply used by hepatic PEMT; folate restriction with choline maintained reduced hepatic methyl-derived PC enrichment in female mice.
    evidence_source:
      finding_ids:
        - PM7-F5
      citation_keys:
        - chew_folate_choline_2011
    evidence_limitation: The response was conditional on sex and experimental context. Methyl-derived PC enrichment is not absolute PEMT flux; extra folate above adequacy is not established to enhance formation or cognition.
pm_kc_relationships:
  - relationship_id: BRS2-FM3-PM7-KCR-1
    kc_id: BRS2(KC1)
    ikc_id: BRS2(KC1)
    kc_href: /docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool
    origin_label: "KC1: Methyl Donor Pool"
    constituent_relationships:
      - relationship_id: BRS2-FM3-PM7-KCI-1
        pm_atom_id: PM7-DIT-5
        kc_atom_id: BRS2-KC1-KIT-1
        kc_membership_status: canonical-reviewed
        label: Folate
        reader_description: Folate availability supports methyl-group provision for PEMT-dependent formation.
        description_finding_id: PM7-F5
      - relationship_id: BRS2-FM3-PM7-KCI-2
        pm_atom_id: PM7-DIT-6
        kc_atom_id: BRS2-KC1-KIT-3
        kc_membership_status: canonical-reviewed
        label: Betaine
        reader_description: Betaine can support PEMT-dependent formation when methylation is impaired in the studied ethanol model.
        description_finding_id: PM7-F5
      - relationship_id: BRS2-FM3-PM7-KCI-3
        pm_atom_id: PM7-DIT-3
        kc_atom_id: BRS2-KC1-KIT-2
        kc_membership_status: canonical-reviewed
        label: Choline
        reader_description: Choline can supply methyl groups used in PEMT-dependent formation.
        description_finding_id: PM7-F7
```
<!-- /PM7-KC-REFERENCE:records -->

Stored constituent edges → disclosure map in `src/lib/dietaryLeverDisclosure.ts` (mirrored in `scripts/lib/dietary-lever-disclosure.mjs`). This runs inside the existing map builder after `assessments` has been loaded from PM adjudications. Its established-parent check prevents an unresolved KC from projecting constituents; independently vetted edges provide the PM-specific input evidence. `originTag` is presentation metadata, not an applicability decision.

<!-- PM7-KC-REFERENCE:projection -->
```tsx
  const pmTraceById = new Map(
    traceRows.filter((row) => row.atom_id).map((row) => [String(row.atom_id), row]),
  );
  const pmKcRelationships = (frontMatter.pm_kc_relationships || []) as Array<{
    origin_label?: string;
    kc_href?: string;
    constituent_relationships?: Array<{
      pm_atom_id?: string;
      label?: string;
      reader_description?: string;
      description_finding_id?: string;
    }>;
  }>;
  for (const relationship of pmKcRelationships) {
    if (assessments.length && !assessments.some((assessment) =>
      assessment.disposition === "established" && assessment.kc_id === (relationship as PmKcDisclosureRow).kc_id &&
      (assessment.ikc_id || assessment.kc_id) === ((relationship as PmKcDisclosureRow).ikc_id || (relationship as PmKcDisclosureRow).kc_id),
    )) continue;
    for (const constituent of relationship.constituent_relationships || []) {
      const base = pmTraceById.get(String(constituent.pm_atom_id || ""));
      if (!base?.input) continue;
      const label = String(constituent.label || base.input);
      map.set(dietaryLeverBulletKey(label, "", "3.1.3"), {
        title: String(base.input),
        inputType: formatInputTypeLabel(String(base.input_type || "")),
        biologicalRole: String(base.biological_role || ""),
        evidenceLimitation: String(base.evidence_limitation || "").trim(),
        evidenceReferences: evidenceSourceReferences(
          references,
          base.evidence_source?.citation_keys || [],
        ),
        compactQualifier: "",
        presentationSection: "3.1.3",
        readerDescription: String(constituent.reader_description || ""),
        supportingFinding: supportingFindingLink(frontMatter, constituent.description_finding_id),
        originTag: relationship.origin_label && relationship.kc_href
          ? { text: relationship.origin_label, href: relationship.kc_href }
          : undefined,
      });
    }
  }
```
<!-- /PM7-KC-REFERENCE:projection -->

Displayed origin tag → sibling link inside existing `enhanceListItem`; the input remains the existing named trigger button. Only this origin wiring is added; the existing five-field renderer is reused:

<!-- PM7-KC-REFERENCE:origin-link -->
```tsx
  const originLink = disclosure.originTag ? document.createElement("a") : null;
  if (originLink) {
    originLink.href = disclosure.originTag!.href;
    originLink.textContent = disclosure.originTag!.text;
    originLink.className = "brs-dietary-lever-origin-link";
    originLink.addEventListener("click", (event) => event.stopPropagation());
  }
```
<!-- /PM7-KC-REFERENCE:origin-link -->

After `li.append(trigger)` append the separate origin tag:

<!-- PM7-KC-REFERENCE:origin-append -->
```tsx
  if (originLink) li.append(document.createTextNode(" · ["), originLink, document.createTextNode("]"));
```
<!-- /PM7-KC-REFERENCE:origin-append -->

The existing canonical URL loop additionally resolves the origin destination:

<!-- PM7-KC-REFERENCE:origin-resolution -->
```tsx
      if (disclosure.originTag) {
        disclosure.originTag.href = new URL(disclosure.originTag.href, canonicalPmUrl).href;
      }
```
<!-- /PM7-KC-REFERENCE:origin-resolution -->

Existing shared interaction handlers → trigger preview, pinning and close behaviour. These are exact integration lines within `enhanceListItem`, not a new component:

<!-- PM7-KC-REFERENCE:interaction -->
```tsx
  const openTransiently = () => {
    closeAllExcept(root, detail);
    setDisclosureOpen(li, detail, trigger, true);
  };

  trigger.addEventListener("pointerenter", (e) => {
    if ((e as PointerEvent).pointerType === "touch") return;
    openTransiently();
  });

  li.addEventListener("pointerleave", (e) => {
    if ((e as PointerEvent).pointerType === "touch") return;
    if (li.dataset.brsDietaryLeverPinned === "true" || li.contains(document.activeElement)) return;
    setDisclosureOpen(li, detail, trigger, false);
  });

  let suppressFocusPreview = false;
  const dismissOriginPreview = () => {
    if (li.dataset.brsDietaryLeverPinned !== "true") setDisclosureOpen(li, detail, trigger, false);
  };
  originLink?.addEventListener("pointerenter", dismissOriginPreview);
  originLink?.addEventListener("focus", dismissOriginPreview);
  li.addEventListener("focusin", (e) => {
    if (!suppressFocusPreview && (e.target === trigger || detail.contains(e.target as Node))) openTransiently();
  });

  li.addEventListener("focusout", (e) => {
    if (li.dataset.brsDietaryLeverPinned === "true") return;
    const next = e.relatedTarget as Node | null;
    if (!next || !li.contains(next)) setDisclosureOpen(li, detail, trigger, false);
  });

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const wasPinned = li.dataset.brsDietaryLeverPinned === "true";
    if (wasPinned) {
      setDisclosureOpen(li, detail, trigger, false);
      return;
    }
    closeAllExcept(root, detail);
    li.dataset.brsDietaryLeverPinned = "true";
    setDisclosureOpen(li, detail, trigger, true);
    detail.tabIndex = -1;
    detail.focus();
  });

  li.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      setDisclosureOpen(li, detail, trigger, false);
      suppressFocusPreview = true;
      trigger.focus();
      suppressFocusPreview = false;
    }
  });
}
```
<!-- /PM7-KC-REFERENCE:interaction -->

Expected closed integration-fixture result: the three input buttons with separate KC1 tags, no parent-KC input or audit headings. Live publication additionally requires the final distinctness gate; consolidate repeated jobs or retain an adjudicated pool claim as appropriate. Expected opened result: description, five fields and final canonical research link, with each input's own conditional limitations.

Run `node --test scripts/pm7-kc-reference.test.mjs` and the related traceability/governance/PM3 reference suites. The documented example must execute actual shared projection and rendering code with canonical dependencies, including interaction events and unresolved-parent suppression. Browser-check focus/activation/Escape, origin navigation, ordering and link targets; report actual results and deployment gaps separately from these completion instructions.


### Evidence-adjudicated intervention dominance and training layout

This governs canonical Profile A PMs with `intervention_dominance_assessment`. Group meanings remain: **3.1 Dietary Requirements** (its three existing dietary/biochemical/KC subgroups), **3.2 System Optimisation Practices** (defined practices/protocols in the existing five categories), **3.3 Lifestyle Levers** (foundational/recurrent behaviours). Moving a group changes prominence only, never its classification, claim ceiling or evidence status.

Required rendered order: **Mission → Intervention Dominance → every adjudicated principal group → Overview**. Remaining groups appear once in section 3. The shared MDX build transform `src/plugin/pm-lever-layout/index.cjs` performs placement and numbering before HTML/TOC generation; it is registered through `beforeDefaultRemarkPlugins` in `docusaurus.config.ts`. Do not run the retired diet-only migration or hand-copy groups into two sections.

| Adjudicated canonical routes | Visible number after Mission, before Overview | Visible numbers remaining in section 3 |
|---|---|---|
| 3.1 Dietary Requirements | 1.1 Dietary Requirements | 3.1 System Optimisation Practices; 3.2 Lifestyle Levers |
| 3.2 System Optimisation Practices | 1.1 System Optimisation Practices | 3.1 Dietary Requirements; 3.2 Lifestyle Levers |
| 3.3 Lifestyle Levers | 1.1 Lifestyle Levers | 3.1 Dietary Requirements; 3.2 System Optimisation Practices |
| 3.2 + 3.3 | 1.1 System Optimisation Practices + 1.2 Lifestyle Levers | 3.1 Dietary Requirements |
| Any other independently adjudicated principal combination | All principal groups, numbered 1.1, 1.2… in canonical order | All unselected groups, numbered 3.1, 3.2… in canonical order |
| Not established | Preserved qualification + “No principal intervention route established”; no promoted group | 3.1 Dietary Requirements; 3.2 System Optimisation Practices; 3.3 Lifestyle Levers |

**Two separately traceable decisions are mandatory.** Evidence qualification records the supported influence, context and limitations; principal-route selection determines placement. Preserve the canonical `intervention_dominance` label verbatim (including `Diet-Supported`) and its governing meaning. The spreadsheet schema calls this field “dominance” and permits FM inheritance; the approximate FM profile mapping does not redefine it or adjudicate PM placement. A qualification is not silently replaced by a group title or upgraded to Diet-Dominant. Unassessed legacy pages retain their existing presentation pending review.

**Evidence qualification:** `intervention_dominance_assessment.evidence_qualification` contains `label` (matching the canonical label), `rationale`, optional `scope_note` and independently assessed `routes`. Each route carries canonical `group_id`, `evidence_basis: intervention-effect`, measured `intervention_effect`, `context`, `limitations` and `evidence_source.finding_ids`/`citation_keys`. Trace evidence to this PM's canonical Findings and bibliography. Neither nutrient presence, biochemical necessity, KC membership nor provision tracing alone establishes intervention responsiveness. Conditional correction/restriction evidence remains eligible within its boundaries; do not impose a universal human assay or enhancement above adequacy.

**Principal selection:** the separate `principal_route_selection` contains `disposition` (`established` or `not-established`), unique `selected_groups`, `rationale`, `comparative_limitations` and `assessments`. Each selected route requires a distinct assessment of `relevance`, `directness` and `extent` of its demonstrated influence on this PM. Qualification alone, or missing admitted competitors, does not establish primacy. Multiple selected groups additionally require `joint_prominence_rationale` explaining why joint prominence is justified; two supported entries do not imply equal dominance. Unestablished selection uses an empty `selected_groups` list while retaining all qualified routes. Supported non-principal groups remain in section 3. Rejected/unresolved candidates remain in the audit; no placement is inferred from FM inheritance.

**Public statement:** render `Intervention Dominance: <preserved qualification> — <selected principal group(s) or No principal intervention route established>`, followed by the qualification scope and comparative limitations. Keep conditional boundaries visible. Do not invent rankings or equal dominance where the evidence does not establish them. Structural validation checks this separation and traceability; Stage 2B must review the science.

**Numbering and stable identity:** author all three groups once with their canonical labels/IDs in section 3. When Dietary Requirements is moved before Overview, canonical **3.1 becomes 1.1**. Its children become 1.1.1 Direct and/or Derived Dietary Requirements, 1.1.2 Cofactors and Substrates, and 1.1.3 Key Constraints. The groups that remain in section 3 are then numbered from 3.1 in canonical order: canonical **3.2 System Optimisation Practices becomes 3.1**, and canonical **3.3 Lifestyle Levers becomes 3.2**. The same renumbering applies whichever group is moved. A moved group takes the next 1.n number (1.1, then 1.2). Each group left in section 3 takes the next 3.n number (3.1, then 3.2). Titles retain their meanings. `data-pm-lever-group="3.1"` and `data-pm-lever-section="3.1.3"` retain canonical lookup identity independent of visible numbering. Preserve existing anchors; missing ones receive stable `pm-lever-dietary`, `pm-lever-optimisation`, `pm-lever-lifestyle` and dietary-child IDs. Do not renumber Finding, atom, KC/iKC, bibliography or relationship identifiers. The shared disclosure renderer reads these attributes before its legacy heading fallback, preserving the existing hover/focus, click/tap, Escape and origin-link behaviour.

**Exact live PM7 assessment → Diet-Supported retained; principal selection not established; all groups remain in section 3.** F5 qualifies conditional dietary influence, not comparative dominance; F7 provision tracing does not select a principal route. All Findings, full studies and bibliography remain canonical PM7 dependencies; no existing scientific classification is rewritten.

<!-- DOMINANCE-REFERENCE:pm7 -->
```yaml
intervention_dominance: Diet-Supported
intervention_dominance_assessment:
  evidence_qualification:
    label: Diet-Supported
    rationale: The retained Diet-Supported qualification is supported by conditional PM-specific dietary influence; it does not establish comparative intervention dominance.
    scope_note: Conditional animal evidence concerns folate restriction and methyl-derived PC enrichment; it does not establish absolute PEMT flux, benefit above adequacy or cognitive benefit.
    routes:
      - group_id: '3.1'
        evidence_basis: intervention-effect
        intervention_effect: Eight-week folate restriction with labelled choline maintained reduced hepatic d3-PC enrichment and the product/precursor enrichment ratio in female mice.
        context: Female wild-type and Mthfr-heterozygous mice; the hepatic response was not demonstrated in males.
        limitations: Enrichment is not absolute PEMT flux. The restriction experiment does not establish supplementation benefit above adequacy, a human intake target or cognitive benefit.
        evidence_source:
          finding_ids:
            - PM7-F5
          citation_keys:
            - chew_folate_choline_2011
  principal_route_selection:
    disposition: not-established
    selected_groups: []
    rationale: F5 demonstrates conditional dietary responsiveness, but the current assessment does not establish the relevance, directness and extent needed to prioritise this route over the other intervention groups. Absence of admitted alternative entries is not evidence of dietary primacy.
    comparative_limitations: Comparative dominance is not established; no ranking or equal dominance is inferred.
    assessments: []
```
<!-- /DOMINANCE-REFERENCE:pm7 -->

**Exact shared decision-to-placement code → section and route labels.** Integration excerpt from the existing registered build transform, not a standalone renderer. `GROUPS` retains the three canonical titles; `validateDominanceAssessment` rejects unresolved IDs/citations and biochemical-necessity-only evidence.

<!-- DOMINANCE-REFERENCE:plan -->
```js
function dominancePlan(data) {
  const a = data.intervention_dominance_assessment;
  if (!a) return null; // Legacy strings/modes and FM inheritance are not evidence adjudications.
  const errors = validateDominanceAssessment(data);
  if (errors.length) throw new Error(`${data.pm_id || 'PM'} dominance: ${errors.join('; ')}`);
  const promoted = Object.keys(GROUPS).filter(id => a.principal_route_selection.selected_groups.includes(id));
  const remaining = Object.keys(GROUPS).filter(id => !promoted.includes(id));
  const headings = Object.fromEntries([...promoted.map((id, i) => [id, `1.${i + 1}`]), ...remaining.map((id, i) => [id, `3.${i + 1}`])]);
  const selection = a.principal_route_selection;
  const routeLabel = promoted.length ? promoted.map(id => GROUPS[id].title).join(' + ') : 'No principal intervention route established';
  return {promoted, remaining, headings, label: `${a.evidence_qualification.label} — ${routeLabel}`, scope: [a.evidence_qualification.scope_note, selection.comparative_limitations].filter(Boolean).join(' ')};
}
```
<!-- /DOMINANCE-REFERENCE:plan -->

**Explicit independently adjudicated joint-principal test fixture → 1.1 System Optimisation Practices + 1.2 Lifestyle Levers, with 3.1 Dietary Requirements remaining below.** This is synthetic test data, not a real PM scientific admission; `FIX-F1`/`fixture_source` dependencies live only in the test fixture. The same fixture is exercised for each single route, every combination, and no established dominance.

<!-- DOMINANCE-REFERENCE:joint-fixture -->
```yaml
intervention_dominance: Mixed
intervention_dominance_assessment:
  evidence_qualification:
    label: Mixed
    rationale: Synthetic qualification only; two independently supported simulated routes.
    scope_note: Synthetic test fixture only.
    routes:
      - group_id: '3.2'
        evidence_basis: intervention-effect
        intervention_effect: Simulated intervention changes a simulated endpoint.
        context: Synthetic test dataset only.
        limitations: Not a scientific study or a live admission.
        evidence_source:
          finding_ids:
            - FIX-F1
          citation_keys:
            - fixture_source
      - group_id: '3.3'
        evidence_basis: intervention-effect
        intervention_effect: Simulated intervention changes a simulated endpoint.
        context: Synthetic test dataset only.
        limitations: Not a scientific study or a live admission.
        evidence_source:
          finding_ids:
            - FIX-F1
          citation_keys:
            - fixture_source
  principal_route_selection:
    disposition: established
    selected_groups:
      - '3.2'
      - '3.3'
    rationale: Synthetic assessment of relevance, directness and extent selects both routes.
    comparative_limitations: Synthetic demonstration only; no real intervention ranking.
    joint_prominence_rationale: The simulated interventions address complementary substantial parts of the simulated PM endpoint; joint prominence was independently adjudicated.
    assessments:
      - group_id: '3.2'
        relevance: Simulated PM-specific endpoint.
        directness: Simulated intervention directly changes the endpoint.
        extent: Simulated substantial complementary influence.
      - group_id: '3.3'
        relevance: Simulated PM-specific endpoint.
        directness: Simulated intervention directly changes the endpoint.
        extent: Simulated substantial complementary influence.
```
<!-- /DOMINANCE-REFERENCE:joint-fixture -->

Minimal authoring pattern: use the existing shared hub dropdown or native `<details>` exactly once for each canonical group; retain its evidence content. The test source `scripts/fixtures/pm-lever-layout.fixture.mdx` demonstrates stable anchor preservation. Run `node --test scripts/pm-lever-layout.test.mjs` to compile/render the actual transform, execute these documented records, verify all combinations and unchanged disclosure lookup, and reject invalid evidence chains, qualification-label changes and joint promotion without a separate rationale. Supported-but-unselected fixtures verify that support does not imply principal placement. Record actual test/build/browser outcomes separately from this instruction. No synthetic study or bibliography is copied into a live PM.


## 8. PM Evidence workflow

When adjudication establishes or materially changes a nutritionally relevant biological
requirement:

1. **Apply the input-specificity adjudication/reporting gate above**, then identify the evidence-supported dietary input or defined pool; do not admit a delivery-only duplicate.
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
| `substrate provision` | A specifically identified, independently supported input providing a direct substrate after digestion, absorption or conversion; not a generic food/macronutrient supplier included solely for delivery |
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
relationship. Delivery is not itself an additional requirement: bypass delivery-only levels when the identified substance or defined pool is the biological target. Apply the input-specificity gate before using this hierarchy.

#### Relationship-first workflow

Before step 1, complete the input-specificity adjudication and record a specificity decision and supporting evidence for every candidate. A concise table row suffices for straightforward cases; explicitly address all three questions where the label is broad, the target changes, or the relationship is disputed or unresolved.

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
| §3.1.3 / §4.1.3 | `No mapping established.` only when no PM↔iKC mapping is established. An established mapping whose disclosures were all consolidated leaves the panel without that sentence. | Distinct authorised input or pool disclosure with separate KC origin tag; no inherited lists or duplicate relationships |

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

**Delivery-only protein — not an additional requirement**

Where protein only supplies an identified substrate (for example cysteine for glutathione synthesis or methionine for MAT), assess the specific substrate's relationship using its own evidence. Record the broad delivery candidate as narrowed or consolidated as justified; leave food-source delivery to the ontology. Do not create a Derived protein atom solely for that chain. Retain a precisely defined protein-level input only following the mechanism-specific assessment above. This illustrates governance, not a new scientific admission.

**Direct — PLP**

`Input = Pyridoxal 5′-phosphate (PLP; active vitamin B6 cofactor)` · `direct` · `Input Type = cofactor`.

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



### Canonical iKC identity and PM-specific upstream supply

An **iKC** is an individually registered constituent of a canonical Key Constraint pool, linked to its verified canonical substance ID. Being a substrate, cofactor or dietary input alone does not confer iKC status. Canonical KC membership establishes constituent identity; PM-specific applicability requires independent evidence adjudication. A substance may belong to several KCs: retain each membership using one canonical substance identity.

**Existing usage and migration:** Older `ikc_id` records denote whole pools or constraint arms. They retain their recorded meaning as legacy references and are not silently reinterpreted as nutrient identities. For a reviewed constituent migration, use existing `individual_key_constraints` and KC five-atom records with `ikc_identity_version: constituent-v2`. Retain old pool/arm IDs explicitly in `legacy_ikc_references`. Reuse existing KC constituent evidence IDs as membership references when registering them; do not invent substance IDs or create a parallel registry. Each constituent registration carries `ikc_id`, `kc_atom_id`, `substance_id`, `identity_status`, `registration_status` and verified `substance_href`. A missing substance remains a `pending-identity` registration, not a verified iKC identity. Other pages are not migrated automatically.

**Separate applicability decisions:**

- **Supported upstream supply** (`relationship_type` and `applicability_mode`: `supported-upstream-supply`): a source-supported pathway maintains or replenishes a resource used by this PM. Establish the actual supply chain and preserve tissue/context boundaries and compensation. Deficiency evidence and a demonstrated limiting effect are not mandatory.
- **Conditional constraint** (`conditional-constraint`): evidence shows resource availability constraining this PM in a specified context. A supported mechanistic chain may establish this; one end-to-end human bottleneck measurement is not universally required. A precursor-to-substrate supply chain alone does not establish this additional proposition.

Neither participation nor homocysteine lowering establishes increased MAT flux, increased SAMe availability or benefit from extra intake. Keep limiting effects unresolved when not established. Individual admission is independent of pool membership/admission; do not inherit every constituent or propagate downstream applicability.

**Section boundaries are unchanged:** §3.1.1 = independently admitted Direct/Derived Dietary Requirements. §3.1.2 = actual biochemical **Cofactors and Substrates**. §3.1.3 = shared KC relationship plus independently admitted individual KC inputs. Never broaden §3.1.2 for upstream supply or copy iKCs there or into §3.1.1 solely because KC1 is admitted.

Under the KC in §3.1.3, show the concise pool-level relationship, evidence and attached limitation, followed by **Individual KC inputs**. Each admitted individual has the existing shared dropdown: reader description → exactly Input → Input type → Biological role → Evidence source → Limitation → supporting mechanism research link. Use `input_type: supported upstream supply` when appropriate. The pool summary does not repeat full individual atoms. Origin tags navigate separately from triggers; reviewed intermediary PM links belong beside inputs/in their disclosure, never on section headings. Preserve distinct independently adjudicated roles across other sections using the same substance identity, with cross-references instead of identical full disclosures.

**Distinctness:** The pool may summarise admitted upstream supply edges once, with limitations, without claiming an additional capacity constraint. The further-biological-job gate applies to a proposed separate conditional constraint; supply alone does not satisfy it. A different input name/type, tag, citation set or wording still does not establish another job. Do not duplicate individual supply atoms in the pool summary.

**Canonical identity audit:** For every admitted individual input, check the canonical registry key, actual substance-page `id` and registry/page path, aliases, nutrient families, specific forms and metabolites. Slug/display-name matches are not proof. Retain `canonical_identity.status`: `resolved`, `existing-substance-identity-inconsistency`, or `missing-substance`. Resolved identities carry verified `substance_id`, `substance_href` and checked sources. Missing/inconsistent identities are **MAJOR AUDIT FLAGS**. Keep supported biology and five atoms visible, but block unreliable identity-based projections.

**Required next step:** Reuse PM `pending_actions` and the Stage 2B report. Each flag records input/intended identity, PM/KC/type, checked candidate records and aliases, required canonical repair or substance registration/page creation, and subsequent food-relationship assessment. Resolve identity through the existing substance registry/page workflow, then separately assess source-backed food composition and approved top-10 records. “Contains” does not mean “approved top-10”: retain units, comparison basis, preparation state and authoritative source. Do not fabricate missing identities, foods or rankings. No new substance/food pages, rankings or food dropdowns during this pilot.

**Same canonical projection edges:** `pm_kc_relationships[].constituent_relationships` references PM evidence through `pm_atom_id`, KC evidence through `kc_atom_id`, canonical membership through `ikc_id`, and retains `substance_id`, `canonical_identity` and `relationship_type`. All pool and individual disclosures belong to canonical §3.1.3. Use existing ontology/SubstanceMatrix infrastructure to project only individually admitted PM relationships with verified substance identities and registered KC membership; preserve evidence, type and limitation. Make those same records available to future food and FM/BRS projections without transitive graph inheritance. Missing identities stay visible in audit and queue, not silently omitted from scientific records.

**Completion gate:** Check unchanged §3.1.2 participants, pool/individual placement in §3.1.3, individual evidence, no unsupported members or downstream inheritance, verified IDs/memberships or explicit major flags, unchanged relationship types/limitations through projection, and preserved unrelated work. Exercise the documented record with the actual shared renderer/projection. Inspect triggers, five atoms, citations, origin/intermediary/Finding links, keyboard preview/pinning and Escape. Record actual verification results separately from these instructions.

### Verified PM3 §3.1.3 implementation example

Exact source excerpts use the **existing shared renderer**, not standalone replacement components. Stored here: `docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis.mdx` → displayed here: https://thebraindiet.org/docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis , canonical §3.1.3. §3.1.2 remains unchanged.

Source Markdown inside the existing KC panel:

```mdx
- One-carbon methyl-donor pool (folate, betaine, choline)

#### Individual KC inputs

<span id="pm3-individual-kc-inputs" />

- Vitamin B9 (folate)
- Betaine
- Choline
```

Exact new five-atom records and matching pool/constituent relationship records follow. The target PM supplies its existing Lever overlays, applicability adjudications, complete Findings and bibliography; do not copy full studies or bibliography into this instruction or into another PM. Citation numbering resolves from the target PM bibliography; do not renumber the live PM to simplify an example.

<!-- pm3-ikc-record-example -->
```json
{
  "dietary_input_traceability": [
    {
      "atom_id": "PM3-KC1-UPSTREAM-1",
      "input": "Vitamin B9 (folate)",
      "input_type": "supported upstream supply",
      "biological_role": "Folate supplies 5-methyltetrahydrofolate to [PM1 — Folate/B12-dependent remethylation](/docs/biological-targets/brs2/fm1/brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation), regenerating methionine that PM3 can use to form SAMe.",
      "evidence_source": {
        "finding_ids": [
          "PM3-F4",
          "PM3-F1"
        ],
        "citation_keys": [
          "froese_vitamin_2019",
          "obeid_metabolic_2013"
        ]
      },
      "evidence_limitation": "This is upstream methionine supply, not a MAT substrate or cofactor. The route depends on functional vitamin B12-dependent methionine synthase; alternative methionine supply and tissue context affect its contribution. Increased MAT flux or benefit from extra folate in replete individuals is not established.",
      "substance_id": "vitamin-b9",
      "canonical_identity": {
        "status": "resolved",
        "substance_id": "vitamin-b9",
        "substance_href": "/docs/substances/nutrients/micronutrients/vitamins/vitamin-b9",
        "verified_against": [
          "registry/substances.json",
          "docs/substances/nutrients/micronutrients/vitamins/vitamin-b9.md"
        ]
      },
      "kc_id": "BRS2(KC1)",
      "ikc_id": "BRS2-KC1-KIT-1",
      "relationship_type": "supported-upstream-supply",
      "upstream_pm_relationships": [
        {
          "relationship_label": "Supply",
          "pm_short_id": "PM1",
          "pm_id": "BRS2-FM1-PM1",
          "href": "/docs/biological-targets/brs2/fm1/brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation"
        }
      ]
    },
    {
      "atom_id": "PM3-KC1-UPSTREAM-2",
      "input": "Betaine",
      "input_type": "supported upstream supply",
      "biological_role": "Betaine donates a methyl group through [PM2 — Betaine/BHMT remethylation](/docs/biological-targets/brs2/fm1/brs2-fm1-pm2-betaine-bhmt-remethylation) to regenerate methionine used by PM3.",
      "evidence_source": {
        "finding_ids": [
          "PM3-F4",
          "PM3-F1"
        ],
        "citation_keys": [
          "obeid_metabolic_2013",
          "evans_betaine_2002"
        ]
      },
      "evidence_limitation": "BHMT activity is concentrated mainly in liver and kidney; this is not local BHMT activity in every tissue. Folate-dependent remethylation and dietary methionine provide alternative supply. Homocysteine lowering does not establish increased MAT flux, increased SAMe availability or benefit from extra intake in replete individuals.",
      "substance_id": "betaine",
      "canonical_identity": {
        "status": "resolved",
        "substance_id": "betaine",
        "substance_href": "/docs/substances/bioactive-compounds/choline-methylation/betaine",
        "verified_against": [
          "registry/substances.json",
          "docs/substances/bioactive-compounds/choline-methylation/betaine.md"
        ],
        "aliases_checked": [
          "Betaine",
          "Glycine betaine",
          "Trimethylglycine",
          "TMG"
        ],
        "identity_scope": "Glycine betaine (trimethylglycine), not other betaine compounds."
      },
      "kc_id": "BRS2(KC1)",
      "ikc_id": "BRS2-KC1-KIT-3",
      "relationship_type": "supported-upstream-supply",
      "upstream_pm_relationships": [
        {
          "relationship_label": "Supply",
          "pm_short_id": "PM2",
          "pm_id": "BRS2-FM1-PM2",
          "href": "/docs/biological-targets/brs2/fm1/brs2-fm1-pm2-betaine-bhmt-remethylation"
        }
      ]
    },
    {
      "atom_id": "PM3-KC1-UPSTREAM-3",
      "input": "Choline",
      "input_type": "supported upstream supply",
      "biological_role": "Choline can be oxidised to betaine, supplying methyl groups through [PM2 — Betaine/BHMT remethylation](/docs/biological-targets/brs2/fm1/brs2-fm1-pm2-betaine-bhmt-remethylation) for methionine regeneration upstream of PM3.",
      "evidence_source": {
        "finding_ids": [
          "PM3-F4",
          "PM3-F1"
        ],
        "citation_keys": [
          "obeid_metabolic_2013",
          "salvi_choline_2013"
        ]
      },
      "evidence_limitation": "Only the choline-to-betaine methyl-supply route is admitted here, not choline membrane or neurotransmitter roles. Oxidation, predominantly hepatic/renal BHMT activity and alternative supply constrain interpretation. Increased MAT flux, increased SAMe availability or benefit from additional choline in replete individuals is not established.",
      "substance_id": "choline",
      "canonical_identity": {
        "status": "resolved",
        "substance_id": "choline",
        "substance_href": "/docs/substances/bioactive-compounds/choline-methylation/choline",
        "verified_against": [
          "registry/substances.json",
          "docs/substances/bioactive-compounds/choline-methylation/choline.md"
        ]
      },
      "kc_id": "BRS2(KC1)",
      "ikc_id": "BRS2-KC1-KIT-2",
      "relationship_type": "supported-upstream-supply",
      "upstream_pm_relationships": [
        {
          "relationship_label": "Supply",
          "pm_short_id": "PM2",
          "pm_id": "BRS2-FM1-PM2",
          "href": "/docs/biological-targets/brs2/fm1/brs2-fm1-pm2-betaine-bhmt-remethylation"
        }
      ]
    }
  ],
  "pm_kc_relationships": [
    {
      "relationship_id": "PM3-KC1-UPSTREAM-POOL",
      "kc_id": "BRS2(KC1)",
      "ikc_id": "BRS2(KC1)",
      "relationship_type": "supported-upstream-supply",
      "input": "One-carbon methyl-donor pool (folate, betaine, choline)",
      "input_type": "supported upstream supply",
      "pm_biological_role": "KC1 contributes methyl groups to methionine regeneration through [PM1 — Folate/B12-dependent remethylation](/docs/biological-targets/brs2/fm1/brs2-fm1-pm1-folate-b12-dependent-homocysteine-remethylation) and [PM2 — Betaine/BHMT remethylation](/docs/biological-targets/brs2/fm1/brs2-fm1-pm2-betaine-bhmt-remethylation). PM3 uses that regenerated methionine to produce SAMe.",
      "evidence_source": {
        "finding_ids": [
          "PM3-F4",
          "PM3-F1"
        ],
        "citation_keys": [
          "froese_vitamin_2019",
          "obeid_metabolic_2013",
          "evans_betaine_2002",
          "salvi_choline_2013"
        ]
      },
      "evidence_limitation": "Deficiency and pathway-impairment studies support this upstream connection, with responses varying by tissue and condition. KC1’s limiting effect on MAT-dependent synthesis remains unresolved; SAMe abundance also reflects consumption and turnover. Benefit from additional intake in nutrient-replete individuals is not established. This pool relationship is distinct from PM3’s biochemical reaction requirements.",
      "presentation_label": "One-carbon methyl-donor pool (folate, betaine, choline)",
      "reader_description": "The shared methyl-donor pool supports regeneration of the methionine used to make SAMe.",
      "description_finding_id": "PM3-F4",
      "applicability_label": "Supported upstream supply",
      "origin_label": "KC1: Methyl Donor Pool",
      "kc_href": "/docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool",
      "constituent_relationships": [
        {
          "relationship_id": "PM3-KC1-UPSTREAM-1-REL",
          "pm_atom_id": "PM3-KC1-UPSTREAM-1",
          "kc_atom_id": "BRS2-KC1-KIT-1",
          "ikc_id": "BRS2-KC1-KIT-1",
          "kc_membership_status": "canonical-reviewed",
          "label": "Vitamin B9 (folate)",
          "presentation_section": "3.1.3",
          "reader_description": "Folate supports regeneration of the methionine used to make SAMe.",
          "description_finding_id": "PM3-F4",
          "relationship_type": "supported-upstream-supply",
          "substance_id": "vitamin-b9",
          "canonical_identity": {
            "status": "resolved",
            "substance_id": "vitamin-b9",
            "substance_href": "/docs/substances/nutrients/micronutrients/vitamins/vitamin-b9",
            "verified_against": [
              "registry/substances.json",
              "docs/substances/nutrients/micronutrients/vitamins/vitamin-b9.md"
            ]
          },
          "disposition": "established",
          "rationale": "Individually reviewed supporting sources establish this upstream supply route. This admission does not establish a limiting effect on MAT or additional-intake benefit."
        },
        {
          "relationship_id": "PM3-KC1-UPSTREAM-2-REL",
          "pm_atom_id": "PM3-KC1-UPSTREAM-2",
          "kc_atom_id": "BRS2-KC1-KIT-3",
          "ikc_id": "BRS2-KC1-KIT-3",
          "kc_membership_status": "canonical-reviewed",
          "label": "Betaine",
          "presentation_section": "3.1.3",
          "reader_description": "Betaine supplies methyl groups for regeneration of methionine upstream of SAMe synthesis.",
          "description_finding_id": "PM3-F4",
          "relationship_type": "supported-upstream-supply",
          "substance_id": "betaine",
          "canonical_identity": {
            "status": "resolved",
            "substance_id": "betaine",
            "substance_href": "/docs/substances/bioactive-compounds/choline-methylation/betaine",
            "verified_against": [
              "registry/substances.json",
              "docs/substances/bioactive-compounds/choline-methylation/betaine.md"
            ],
            "aliases_checked": [
              "Betaine",
              "Glycine betaine",
              "Trimethylglycine",
              "TMG"
            ],
            "identity_scope": "Glycine betaine (trimethylglycine), not other betaine compounds."
          },
          "disposition": "established",
          "rationale": "Individually reviewed supporting sources establish this upstream supply route. This admission does not establish a limiting effect on MAT or additional-intake benefit."
        },
        {
          "relationship_id": "PM3-KC1-UPSTREAM-3-REL",
          "pm_atom_id": "PM3-KC1-UPSTREAM-3",
          "kc_atom_id": "BRS2-KC1-KIT-2",
          "ikc_id": "BRS2-KC1-KIT-2",
          "kc_membership_status": "canonical-reviewed",
          "label": "Choline",
          "presentation_section": "3.1.3",
          "reader_description": "Choline can be converted to betaine to support methionine regeneration upstream of SAMe synthesis.",
          "description_finding_id": "PM3-F4",
          "relationship_type": "supported-upstream-supply",
          "substance_id": "choline",
          "canonical_identity": {
            "status": "resolved",
            "substance_id": "choline",
            "substance_href": "/docs/substances/bioactive-compounds/choline-methylation/choline",
            "verified_against": [
              "registry/substances.json",
              "docs/substances/bioactive-compounds/choline-methylation/choline.md"
            ]
          },
          "disposition": "established",
          "rationale": "Individually reviewed supporting sources establish this upstream supply route. This admission does not establish a limiting effect on MAT or additional-intake benefit."
        }
      ]
    }
  ]
}
```
<!-- /pm3-ikc-record-example -->

Stored `reader_description` → first opened sentence; PM `pm_atom_id` → the five atoms; `description_finding_id: PM3-F4` → **Upstream donor routes regenerate methionine for SAMe synthesis** at https://thebraindiet.org/docs/biological-targets/brs2/fm1/brs2-fm1-pm3-same-synthesis#pm3-f4 . Same-page Finding links remain local in previews. Origin tag → https://thebraindiet.org/docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool . Biochemical and KC identities remain distinct.

Exact integration excerpt from the existing shared renderer (partial function; use in its existing context, not as a standalone component):

```typescript
    for (const constituent of relationship.constituent_relationships || []) {
      const base = pmTraceById.get(String(constituent.pm_atom_id || ""));
      if (!base?.input) continue;
      const label = String(constituent.label || base.input);
      map.set(dietaryLeverBulletKey(label, "", "3.1.3"), {
        title: String(base.input),
        identityStatus: base.canonical_identity?.status,
        inputHref: base.canonical_identity?.status === "resolved" ? base.canonical_identity.substance_href : undefined,
        inputType: formatInputTypeLabel(String(base.input_type || "")),
        biologicalRole: String(base.biological_role || ""),
        evidenceLimitation: String(base.evidence_limitation || "").trim(),
        evidenceReferences: evidenceSourceReferences(
          references,
          base.evidence_source?.citation_keys || [],
        ),
```

Relevant existing integration is `buildDietaryLeverDisclosureMap` in `src/lib/dietaryLeverDisclosure.ts` and its server mirror: the constituent loop resolves `pm_atom_id`, displays in **3.1.3**, and creates the separate KC origin tag. The existing `PmDietaryLeverEnhancer` renders reader description → Input → Input type → Biological role → Evidence source → Limitation → supporting mechanism research, with focus/hover preview, click/tap pinning and Escape dismissal. Do not copy partial functions into new components. No new section-placement renderer is required.

The existing ontology projection consumes canonical records; `buildUpstreamResourceProjection` in `src/data/dietaryOriginProjection.mjs` verifies individual admission, registered KC membership and registry/page substance identity, retaining relationship type and limitation. Shared SubstanceMatrix displays these same rows once on substance pages. Neither tags nor graph traversal admit a row.

Expected result: one KC1 pool disclosure followed by **Individual KC inputs** with folate, betaine and choline, each with five atoms, citations and its own limitations. All three identities resolve in the completed pilot. A future missing identity must remain a major audit flag, with supported biology visible and identity projection blocked. The worked-example test loads target-PM dependencies and exercises actual disclosure/matrix output, including mutation cases; test results are recorded separately in the pilot report.



### Canonical KC decision examples — existing shared integration

These are integration records for the existing shared renderer, not standalone replacement components. Use the PM3 upstream-supply example above. For every case, load the target PM's canonical Findings, bibliography, presentation metadata and overlays; citation numbering is resolved from that PM's bibliography. Do not copy studies or bibliography into another PM. Stable section identifiers remain 3.1.x even when visible headings are promoted.

#### Conditional constraint: actual PM2 records

Source: `docs/biological-targets/brs2/fm1/brs2-fm1-pm2-betaine-bhmt-remethylation.mdx`. Public URL: https://thebraindiet.org/docs/biological-targets/brs2/fm1/brs2-fm1-pm2-betaine-bhmt-remethylation. Exact admitted records below are used with existing shared integration. **Stored here → displayed here:** atoms PM2-DIT-1/2 supply the retained five-atom provision disclosures in §3.1.1; the conditional relationship retains evidence and limitations and its §3.1.3 cross-reference. `public_disclosure: consolidated-as-duplicate` does not erase applicability and must not manufacture a second full disclosure. This example demonstrates a conditional decision, not a scientifically distinct additional KC job.

<!-- kc-conditional-real-example -->
```json
{
  "pm_id": "BRS2-FM1-PM2",
  "pm_kc_relationships": [
    {
      "relationship_id": "PM2-KC1-DEPLETION-CONSTRAINT",
      "kc_id": "BRS2(KC1)",
      "ikc_id": "BRS2(KC1)",
      "relationship_type": "conditional-constraint",
      "pm_biological_role": "KC1’s betaine/choline route supplies BHMT methyl donor; demonstrated choline depletion can reduce remethylation reserve under a methionine challenge.",
      "evidence_source": {
        "finding_ids": [
          "PM2-F1",
          "PM2-F2",
          "PM2-F5"
        ],
        "citation_keys": [
          "evans_betaine_2002",
          "salvi_choline_2013",
          "da_costa_choline_2005",
          "setoue_choline_deprivation_2008",
          "strakova_bhmt_inhibition_2011"
        ]
      },
      "evidence_limitation": "Human evidence is an eight-man depletion pilot, with the challenge response in four clinically depleted participants; tissue BHMT flux was not measured. Rat donor rescue and specific inhibition support the chain. This does not establish ordinary-diet limitation, response in every tissue or benefit above adequacy. Folate’s indirect constraint on BHMT remains unresolved.",
      "origin_label": "KC1: Methyl Donor Pool",
      "kc_href": "/docs/biological-targets/brs2/kc/brs2-kc1-one-carbon-donor-pool",
      "constituent_relationships": [
        {
          "relationship_id": "PM2-DIT-1-KC1-ADMISSION",
          "pm_atom_id": "PM2-DIT-1",
          "kc_atom_id": "BRS2-KC1-KIT-3",
          "ikc_id": "BRS2-KC1-KIT-3",
          "kc_membership_status": "canonical-reviewed",
          "substance_id": "betaine",
          "canonical_identity": {
            "status": "resolved",
            "substance_id": "betaine",
            "substance_href": "/docs/substances/bioactive-compounds/choline-methylation/betaine",
            "verified_against": [
              "registry/substances.json",
              "docs/substances/bioactive-compounds/choline-methylation/betaine.md"
            ]
          },
          "relationship_type": "conditional-constraint",
          "disposition": "established",
          "presentation_section": "3.1.3",
          "public_disclosure": "consolidated-as-duplicate",
          "retained_record_ids": [
            "PM2-DIT-1"
          ],
          "rationale": "Individually evidenced KC membership and PM applicability. The full provision disclosure is already retained on this PM; no second identical atom is published."
        },
        {
          "relationship_id": "PM2-DIT-2-KC1-ADMISSION",
          "pm_atom_id": "PM2-DIT-2",
          "kc_atom_id": "BRS2-KC1-KIT-2",
          "ikc_id": "BRS2-KC1-KIT-2",
          "kc_membership_status": "canonical-reviewed",
          "substance_id": "choline",
          "canonical_identity": {
            "status": "resolved",
            "substance_id": "choline",
            "substance_href": "/docs/substances/bioactive-compounds/choline-methylation/choline",
            "verified_against": [
              "registry/substances.json",
              "docs/substances/bioactive-compounds/choline-methylation/choline.md"
            ]
          },
          "relationship_type": "conditional-constraint",
          "disposition": "established",
          "presentation_section": "3.1.3",
          "public_disclosure": "consolidated-as-duplicate",
          "retained_record_ids": [
            "PM2-DIT-2"
          ],
          "rationale": "Individually evidenced KC membership and PM applicability. The full provision disclosure is already retained on this PM; no second identical atom is published."
        }
      ],
      "public_disclosure": "consolidated-as-duplicate",
      "retained_record_ids": [
        "PM2-DIT-1",
        "PM2-DIT-2"
      ]
    }
  ],
  "dietary_input_traceability": [
    {
      "atom_id": "PM2-DIT-1",
      "input": "Betaine",
      "input_type": "substrate",
      "biological_role": "Methyl-donor substrate for BHMT remethylation of homocysteine to methionine",
      "evidence_source": {
        "finding_ids": [
          "PM2-F1",
          "PM2-IC1"
        ],
        "citation_keys": [
          "evans_betaine_2002",
          "breksa_zinc_1999",
          "olthof_low_2003"
        ]
      },
      "evidence_limitation": "Supplemental betaine lowers plasma homocysteine in healthy adults, but that change does not measure tissue BHMT activity or show a clinical benefit. Human evidence is an eight-man depletion pilot, with the challenge response in four clinically depleted participants; tissue BHMT flux was not measured. Rat donor rescue and specific inhibition support the chain. This does not establish ordinary-diet limitation, response in every tissue or benefit above adequacy. Folate’s indirect constraint on BHMT remains unresolved.",
      "substance_id": "betaine",
      "kc_id": "BRS2(KC1)",
      "ikc_id": "BRS2-KC1-KIT-3",
      "relationship_type": "conditional-constraint",
      "canonical_identity": {
        "status": "resolved",
        "substance_id": "betaine",
        "substance_href": "/docs/substances/bioactive-compounds/choline-methylation/betaine",
        "verified_against": [
          "registry/substances.json",
          "docs/substances/bioactive-compounds/choline-methylation/betaine.md"
        ]
      }
    },
    {
      "atom_id": "PM2-DIT-2",
      "input": "Choline",
      "input_type": "precursor",
      "biological_role": "Dietary precursor that can be oxidised to betaine, the methyl-donor substrate for BHMT",
      "evidence_source": {
        "finding_ids": [
          "PM2-F2",
          "PM2-F1"
        ],
        "citation_keys": [
          "obeid_metabolic_2013",
          "salvi_choline_2013",
          "evans_betaine_2002"
        ]
      },
      "evidence_limitation": "Choline oxidation can supply betaine, but increasing choline intake has not been shown to increase tissue BHMT flux. Human evidence is an eight-man depletion pilot, with the challenge response in four clinically depleted participants; tissue BHMT flux was not measured. Rat donor rescue and specific inhibition support the chain. This does not establish ordinary-diet limitation, response in every tissue or benefit above adequacy. Folate’s indirect constraint on BHMT remains unresolved.",
      "substance_id": "choline",
      "kc_id": "BRS2(KC1)",
      "ikc_id": "BRS2-KC1-KIT-2",
      "relationship_type": "conditional-constraint",
      "canonical_identity": {
        "status": "resolved",
        "substance_id": "choline",
        "substance_href": "/docs/substances/bioactive-compounds/choline-methylation/choline",
        "verified_against": [
          "registry/substances.json",
          "docs/substances/bioactive-compounds/choline-methylation/choline.md"
        ]
      }
    }
  ],
  "kc_applicability_adjudications": [
    {
      "kc_id": "BRS2(KC1)",
      "ikc_id": "BRS2(KC1)",
      "arm_id": "reviewed-member-supply",
      "applicability_mode": "conditional-constraint",
      "applicability_proposition": "KC1’s betaine/choline route supplies BHMT methyl donor; demonstrated choline depletion can reduce remethylation reserve under a methionine challenge.",
      "disposition": "established",
      "established_links": [
        "KC1’s betaine/choline route supplies BHMT methyl donor; demonstrated choline depletion can reduce remethylation reserve under a methionine challenge."
      ],
      "inferred_links": [
        "Human evidence is an eight-man depletion pilot, with the challenge response in four clinically depleted participants; tissue BHMT flux was not measured. Rat donor rescue and specific inhibition support the chain. This does not establish ordinary-diet limitation, response in every tissue or benefit above adequacy. Folate’s indirect constraint on BHMT remains unresolved."
      ],
      "evidence_source": {
        "finding_ids": [
          "PM2-F1",
          "PM2-F2",
          "PM2-F5"
        ],
        "citation_keys": [
          "evans_betaine_2002",
          "salvi_choline_2013",
          "da_costa_choline_2005",
          "setoue_choline_deprivation_2008",
          "strakova_bhmt_inhibition_2011"
        ]
      },
      "rationale": "Existing human depletion/repletion, route identity, rodent rescue and pathway-specific inhibition together establish a bounded capacity-constraint chain. The absence of one human BHMT-flux assay does not defeat this chain. Public provision atoms remain consolidated; this is not an additional biological job. The earlier user-approved removal of duplicated public disclosure is preserved."
    }
  ]
}
```
<!-- /kc-conditional-real-example -->

The excerpt supplements the target PM; it does not replace its unrelated atoms. Exact integration used by the executable test (`pm2.data` is the parsed canonical source, `e` is the fenced record above):

```javascript
const data={...pm2.data,...e,dietary_input_traceability:pm2.data.dietary_input_traceability.map(a=>e.dietary_input_traceability.find(b=>b.atom_id===a.atom_id)||a)};
const actual=[...buildDietaryLeverDisclosureMap(data).values()];
```

This calls `scripts/lib/dietary-lever-disclosure.mjs`, the existing shared disclosure builder. The existing page renderer consumes those results; do not copy partial functions into a new component.

#### Canonical KC member not admitted at this PM: folate at PM2

Folate is registered as KC1 constituent BRS2-KC1-KIT-1 with substance identity vitamin-b9. Its indirect BHMT constraint remains unresolved in this actual PM2 adjudication. **Stored here → displayed here:** the assessment is audit-only; no folate constituent edge or public folate KC disclosure is created at PM2. Pool admission does not change this decision. The source's historical wording is retained verbatim below; the later conditional admission above controls betaine/choline, not folate.

<!-- kc-not-admitted-real-example -->
```json
{
  "pm_id": "BRS2-FM1-PM2",
  "kc_applicability_adjudications": [
    {
      "kc_id": "BRS2(KC1)",
      "ikc_id": "BRS2(KC1)",
      "arm_id": "folate-donor-route",
      "applicability_proposition": "Inadequacy of the folate donor route can indirectly constrain BHMT-dependent remethylation capacity by changing demand on the betaine route or the betaine-to-DMG state.",
      "disposition": "unresolved",
      "established_links": [
        "BHMT transfers a methyl group from betaine to homocysteine and does not use folate or vitamin B12 in that reaction (PM2-F1).",
        "The flow of methyl groups through BHMT is not dependent on folate or vitamin B12 (PM2-F1).",
        "The canonical KC review admits folate as a methyl-group input into the shared pool.",
        "In folate-deprived rats, hepatic betaine fell, dimethylglycine rose, and betaine supplementation increased hepatic BHMT activity but only partly corrected hyperhomocysteinaemia."
      ],
      "inferred_links": [
        "The higher hepatic dimethylglycine concentration inhibited BHMT enough in vivo to make folate inadequacy a BHMT-capacity constraint.",
        "The rat interaction generalises to human BHMT capacity under nutritionally relevant folate inadequacy."
      ],
      "evidence_source": {
        "finding_ids": [
          "PM2-F1"
        ],
        "citation_keys": [
          "evans_betaine_2002",
          "breksa_zinc_1999",
          "obeid_metabolic_2013",
          "liu_betaine_folate_2012"
        ]
      },
      "rationale": "Folate is not a BHMT reactant, so pathway proximity cannot establish this arm. The prior non-application decision was nevertheless too strong: rat evidence shows a material cross-route interaction through lower hepatic betaine, higher dimethylglycine and a limited response to betaine. Because in-vivo BHMT flux was inferred and the evidence is not human, indirect folate-to-PM2 applicability remains unresolved. The separate betaine/choline KC admission has subsequently been withdrawn; its supported donor-provision chain remains on the dietary records."
    }
  ]
}
```
<!-- /kc-not-admitted-real-example -->

#### Missing canonical identity: explicitly synthetic failure fixture

All three live PM3 identities resolve. Do not damage the live page to demonstrate failure. Apply only this fixture's identity override to PM3's existing betaine atom and matching constituent record, removing unresolved substance ID/href from the fixture edge. Retain all scientific fields and canonical membership references. **Stored here → displayed here:** the five-atom disclosure remains available through the shared renderer; the MAJOR flag and pending action appear in audit, while the identity-based BRS matrix projection is blocked. This simulates missing identity, not a real finding that betaine lacks a page.

<!-- kc-missing-identity-fixture -->
```json
{
  "fixture_only": true,
  "base_pm_id": "BRS2-FM1-PM3",
  "pm_atom_id": "PM3-KC1-UPSTREAM-2",
  "canonical_identity": {
    "status": "missing-substance",
    "severity": "MAJOR"
  },
  "pending_actions": [
    {
      "input": "Betaine",
      "kc_atom_id": "BRS2-KC1-KIT-3",
      "pm_id": "BRS2-FM1-PM3",
      "kc_id": "BRS2(KC1)",
      "relationship_type": "supported-upstream-supply",
      "severity": "MAJOR",
      "status": "pending",
      "intended_identity": "Betaine (trimethylglycine)",
      "candidate_records_checked": [
        "registry/substances.json: betaine",
        "docs/substances/bioactive-compounds/choline-methylation/betaine.md"
      ],
      "aliases_checked": [
        "betaine",
        "trimethylglycine"
      ],
      "required_action": "Verify canonical registration and page linkage; repair linkage or create the canonical substance through the existing workflow only if genuinely absent.",
      "subsequent_food_assessment": "After identity resolution, assess source-backed food composition separately from approved top-10 ranking."
    }
  ]
}
```
<!-- /kc-missing-identity-fixture -->

Run `node --test scripts/stage2b-kc-documented-cases.test.mjs scripts/upstream-resource-pilot.test.mjs scripts/kc1-fm1-constituent-projection.test.mjs`. These tests load the fenced examples, resolve real dependencies, exercise shared disclosure and projection functions, and reject missing repair actions. Completion instructions are not test results.

**Visible numbering after placement:** A lever group displayed in section 1 is numbered `1.1` (then `1.2` for another promoted group), with dietary children `1.1.1`–`1.1.3`. Canonical section IDs remain `3.1`/`3.1.1`–`3.1.3` for records, lookup and stable anchors. This numbering correction also applies to a group already placed in section 1 on a legacy page; it neither selects a principal route nor changes its evidence qualification. Do not display §3.1 under section 1.

**Documented KC-case verification (2026-10-07):** The three-case suite, PM3 pilot suite and FM1 constituent-projection suite passed: 12 tests, 0 failures. Checks exercised canonical disclosure output, conditional projection type/limitations, non-admitted-member suppression, missing-identity projection blocking and required repair actions. No live page or shared renderer was changed; this instruction-only update did not perform a new browser verification or claim site-wide validation is clean.
