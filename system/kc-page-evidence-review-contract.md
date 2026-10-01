# KC-page evidence-review contract

Reuses Stage 2B / Dietary Requirements machinery. **No new evidence ontology.**

Bounded assessment: `system/scientific-finding-schema.md`.
Five-atom records, Input Types, Evidence Source, Limitation, claim ceiling:
`system/dietary-input-traceability-contract.md`.
KC / iKC ownership, inclusion test, YAML: `system/key-constraint-schema.md`.
Change-control flags: `system/mechanism-change-control-queue.md` and
`kc_change_control_flags` (`scripts/lib/kc-evidence-governance.mjs`).

Durable KC science lives on the **KC page**. Stage 2B later tests **PM ↔ iKC**
independently. This pass does not modify PM evidence, does not write PM
Findings, and does not propagate iKC constituents onto PMs.

---

## Sequence

1. **KC page coherence** — what shared resource-pool, bottleneck, or nutritionally
   constrained domain justifies this page.
2. **iKC definition** — which distinct individual constraints instantiate that
   domain.
3. **Constituent evidence** — five-atom adjudication of every proposed input.
4. **Evidence-supported public Summary** — translate the adjudicated constraint,
   membership and claim ceiling into the required §3 Evidence Base opening.
5. **Emerging-support evidence** — when §4 candidates are assessed, record each
   candidate as a separate five-field support atom (Input, Input Type,
   Biological Role, Evidence Source, Limitation) and project it through the
   accessible evidence disclosure attached to the candidate title. Pointer
   hover and keyboard focus reveal the five fields at that title; activating
   the title or its adjacent chevron toggles the full candidate research panel.
   Keep support atoms separate from iKC constituent membership and Core
   Nutritional Requirements.
6. **Evidence-supported proposed FM/PM scope** — keep existing connections as
   proposed scope when admitted iKCs remain coherent; flag if the reviewed
   definition makes a listed connection impossible or materially inconsistent.
7. **Stop.** Subsequent **PM Stage 2B** independently verifies each PM ↔ iKC
   relationship.

Do not independently evidence-review every KC/iKC → PM relationship here.

---

## Bounded assessment (reuse)

Treat the existing KC title, ambition, iKCs, constituents, claimed FM/PM scope,
and on-page evidence as **candidate propositions**, not facts that must be
preserved.

For each proposition:

1. Define it precisely enough to be falsified.
2. Assess the attached KC corpus first; targeted follow-up only if the
   proposition cannot be adjudicated from what is in hand.
3. Adjudicate: supported, narrowed, reclassified, rejected, or unresolved.
4. Stop. Do not open PM literature or redesign unrelated architecture.

Finding **workflow** is required. Durable storage of PM-scoped `PMn-F*` ids on
KC pages is **not** required. Record the adjudication in
`kc_input_traceability`, `individual_key_constraints`, `kc_change_control_flags`,
and a KC review report.

---

## 1. KC page coherence

A KC page must represent one coherent shared resource-pool, bottleneck, or
nutritionally constrained biological domain. Its iKCs must be scientifically
related through that constraint.

Do not assume proposed iKCs belong together because they currently share a page.

If evidence does not support the grouping, definition, or title, record a
`kc_change_control_flags` entry (`ikc-scope-conflict` when the conflict is with
claimed page/iKC scope) rather than forcing the architecture to survive.

---

## 2. iKC definition

For each proposed iKC:

- What exactly is constrained?
- What biological resource/pool/dependency constitutes the constraint?
- Why is this a constraint rather than a relevant pathway, nutrient, antioxidant,
  or modulator?
- How does it instantiate the shared constraint of the KC page?

An iKC must have a scientifically defensible relationship to the page-level KC.
If not, reclassify, reject, or flag it.

Until `individual_key_constraints` is declared, the page is one iKC whose
`ikc_id` equals `kc_id`. Declaring iKCs does not invent extra constraints.

---

## 3. Constituent evidence (five atoms)

Every **admitted** Input → iKC relationship uses the canonical five atoms:

| Atom | Meaning |
|------|---------|
| Input | The constrained or contributing input |
| Input Type | Canonical vocabulary (`scripts/lib/dietary-input-traceability.mjs`) |
| Biological Role | Role **in this iKC**, not a PM slogan |
| Evidence Source | Provenance for that role (`citation_keys` on the KC page) |
| Limitation | Claim ceiling / what the source does not establish |

Do not retain a constituent because it already appears on the page. After
adjudication, **no admitted input remains without the five atoms.**

Store durable records in `kc_input_traceability` and project them with
`kc_constituent_presentations`. Food arrows are **not** scientific atoms.
Render the complete `### 2. Core Nutritional Requirements` body inside the
standard collapsed PM-style disclosure defined by
`system/key-constraint-schema.md`; retain the canonical heading for section
parsing and navigation. In `### 3. Evidence Base`, attach each projected
five-field atom to its resource dropdown title. Pointer hover and keyboard
focus reveal the five fields at the title; activating the title or its adjacent
chevron toggles the full Biological Importance and Supporting Evidence panel.
Use `kc_constituent_presentations.evidence_label` only when the §3 title needs a
reader-facing synonym or qualifier that differs from the §2 `label`.

### Strict iKC membership

iKC membership requires evidence that the constituent itself participates in
the shared constraint. Biochemical requirement, pathway participation,
substrate/cofactor status, dietary provision or biological relevance alone
is insufficient. Where constraint evidence is absent, the relationship
remains at the appropriate PM Dietary Requirements layer.

An iKC is **not** an inventory of the biochemical requirements of the
mechanisms it affects. DEFAULT: if evidence shows that X is required by a
mechanism, but does not show that X availability contributes to the shared
constraint, **exclude X** from the iKC.

`constraint_status: biochemical-requirement` (and dietary-input, modulatory,
unsupported) cannot satisfy membership. Overlay `ikc_membership: admitted |
excluded`. Only `admitted` rows project as iKC constituents. Excluded rows
may remain on the KC page as explicit non-members; they must not appear in
§2 Core Nutritional Requirements or in PM §3.1.3 as canonical iKC members.

**Firewall:** KC/iKC asks what evidence-supported resource or availability
constraint is shared. PM Dietary Requirements asks what this mechanism
requires. Do not let the first question absorb the second. Exclusion from an
iKC is not a finding of biological unimportance.

**BRS3(KC1) calibration:** Cysteine and glycine may qualify for the
glutathione-related iKC because availability/limitation evidence supports
their participation in the constraint. Glutamate is required for glutathione
synthesis but is excluded from iKC membership where evidence establishes
biochemical dependency only, not nutritional constraint. The GSH tripeptide
containing all three amino acids does not make all three members of the
nutritional constraint. Polyphenols and vitamin C remain excluded from this
iKC; do not create another iKC merely to preserve them.

---

## 4. Constraint status / claim ceiling

Do not collapse these into “nutritional requirement.”

| Status | Meaning | Typical claim ceiling |
|--------|---------|------------------------|
| `nutritionally-constrained` | Availability is a meaningful biological constraint | `dietary-provision` only if provision is evidenced; else `biological-dependency` with Limitation |
| `biochemical-requirement` | Required by the biology; ordinary dietary availability as limiting is **not** established | `biological-dependency` |
| `dietary-input` | Supported dietary biological role; not necessarily a constrained resource pool | do not treat as iKC membership without the inclusion test |
| `modulatory` | Influences the mechanism or pathway; not substrate/resource sufficiency | not iKC constituent membership |
| `unsupported` | Existing KC placement is not supported at the claimed level | reject or flag |

Optional overlay on KC atoms: `constraint_status` plus existing `claim_ceiling`.
This classifies the same five atoms; it is not a sixth scientific atom.

Biochemical requirement ≠ dietary limitation.
Dietary association ≠ constraint.
Intervention benefit ≠ indispensable requirement.
In-vitro antioxidant activity ≠ demonstrated direct antioxidant action in vivo.

---

## 5. Evidence must match the claim

Evidence Source must support the exact Biological Role and constraint claim.

Examples:

- Reaction/pathway evidence may establish biochemical substrate status but not
  dietary limiting status.
- Dietary-pattern RCT evidence may establish effects of that pattern but not
  that one constituent is an indispensable shared constraint.
- Food-composition evidence may establish provision but not KC or PM modulation.

Use Limitation / claim ceiling to keep valid narrower relationships rather than
overstating or deleting them.

---

## 6. Public §3 Evidence Base Summary

Every canonical KC evidence review must assess and publish an
evidence-supported `#### Summary` at the start of `### 3. Evidence Base`. Treat
each substantive statement as a proposition alongside the KC definition,
constituent atoms, claim ceilings and proposed scope. Existing Summary prose is
not established merely because it is already published.

The Summary must:

- explain the shared nutritional resource or availability constraint;
- identify the admitted resources at a useful public level and explain why they
  form one coherent pool or bottleneck;
- reflect the adjudicated `kc_input_traceability` evidence and claim ceilings;
- include readable, claim-local bibliography citations beside substantive
  scientific claims; and
- avoid conclusions stronger than the constituent evidence.

Use one concise explanatory paragraph, normally about 65–90 words, followed by
exactly three non-duplicative, scannable bullets:

1. **Constraint and membership boundary** — what belongs to the shared
   constraint and which adjacent cofactors, substrates, pathways or outcomes do
   not.
2. **Evidence / measurement boundary** — what the cited evidence establishes
   and what it does not measure or justify inferring.
3. **Biological relevance and provision limitation** — why adequate
   availability matters without turning prevention of constraint into a claim
   that additional intake, supplementation or treatment improves downstream
   function or clinical outcomes.

The bullets must add orientation rather than repeat the paragraph or one
another. Mention a rejected constituent only when it clarifies a material
biological boundary; do not reproduce the review ledger in public copy.

Write for interested members of the public, with nutritionists as the most
technically specialised intended readers. Keep internal governance out of the
Summary: no `iKC`, `admitted`, `excluded`, `canonical`, `proposed scope`,
`Stage 2B`, review-status or page-maintenance language. Express important
boundaries biologically, and keep adjudication status in structured records and
the KC review report.

Detailed source interpretation, study design and constituent-by-constituent
rationale remain in the resource dropdowns and review report. The Summary does
not replace those disclosures.

Each resource dropdown title is also the visible trigger for that constituent's
five-field atom. Hover/focus reveals the atom without opening the panel;
activating the title or adjacent chevron toggles the detailed panel. Do not add
a duplicate five-field bullet inside the panel.

Before completion:

1. compare the Summary claim by claim with the reviewed KC definition,
   `kc_input_traceability` and claim ceilings;
2. confirm each Summary citation resolves to the intended bibliography record
   and supports the adjacent proposition;
3. inspect the rendered Evidence Base for one paragraph and exactly three
   distinct bullets; and
4. record the Summary check and unresolved claims in the KC review report.

---

## 7. Proposed FM/PM scope

If admitted iKCs remain scientifically coherent on the page, **preserve existing
FM/PM connections as proposed scope**.

This review establishes:

- the KC represents a coherent shared constraint (or is flagged);
- admitted iKCs belong together (or are flagged);
- each admitted iKC and constituent is evidence-qualified.

It does **not** confirm that each listed PM draws on that iKC. Stage 2B tests
the PM side and may confirm, narrow, reject, or flag.

If this review itself shows that an existing scope claim is **impossible** or
**materially inconsistent** with the reviewed KC definition, record a KC review
flag. Do not launch additional PM research.

---

## 8. Food relationships

Do not use food-source examples as evidence that an iKC exists.

Keep separate:

- Food → provides Input
- Input → contributes to iKC
- iKC → constrains PM/FM biology

Retain food examples only where Food → Input is independently supported at the
claimed granularity. Food arrows are not iKC membership evidence.

---

## 9. Final coherence test

After adjudicating iKCs, constituents, and proposed scope:

- Does the page still represent one coherent shared constraint?
- Do admitted iKCs belong under that constraint?
- Are constituent memberships evidence-supported?
- Is there evidence these constraints are shared across the **proposed** PM/FM
  scope, or only that the list should be carried forward as proposed?
- Does the title/ambition describe what survived?

If not, generate a KC review flag. Do not force the existing architecture to
survive the evidence.

---

## Calibration

First calibration: **BRS3(KC1)** (`system/brs3-kc1-evidence-review.md`).
Calibration questions are **not** predetermined verdicts.

---

## Output

A completed KC-page review produces:

- evidence-qualified page definition / ambition;
- evidence-qualified iKC structure;
- admitted constituent five-atom records with title-attached §3 Evidence Base
  presentations; title activation and the adjacent chevron both toggle the full
  resource evidence panel;
- five-field support atoms and title-attached accessible presentations for
  every assessed §4 Emerging Biological Support, with title activation and the
  adjacent chevron both toggling the full research panel, kept outside
  constituent membership;
- an evidence-supported public §3 Summary with one concise paragraph and the
  three required boundary bullets;
- evidence-supported **proposed** FM/PM scope per iKC;
- rejected / reclassified / unresolved propositions with concise reasons;
- governing limitations;
- `kc_change_control_flags` where required.

**Stop** when the KC page is sufficiently evidence-qualified for subsequent PM
Stage 2B. Do not modify PM evidence. Do not auto-propagate constituents to PMs.

---

## Core rule

A KC page must earn its coherence.
Each iKC must earn its place within that KC.
Each constituent must earn its place within the iKC.
The shared PM/FM scope must be supported as **proposed** by the reviewed
definition, then independently verified on each PM in Stage 2B.
