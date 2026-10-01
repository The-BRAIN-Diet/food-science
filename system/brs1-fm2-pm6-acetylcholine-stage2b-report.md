# BRS1-FM2-PM6 Acetylcholine Synthesis Support — Stage 2B Report

## Outcome

The amended Stage 2B rerun retains `Diet-Dominant`, changes page-level
addressability to `direct`, keeps the ceiling at `dietary-provision`, expands
the traceability inventory to four distinct atoms, and establishes a
`constrained-by` Type D relationship to BRS2(KC1).

Biochemical necessity, food provision, demonstrated modulation, and functional
benefit are separate conclusions. A required substrate or precursor does not
imply that increasing intake improves acetylcholine production or cognition.

## Published-versus-local-final audit

| Candidate | Published page | Exact local start | Final adjudication |
|---|---|---|---|
| Choline | Dietary Requirement | Direct · Substrate | **Retain:** Direct · Substrate. ChAT reactant and essential dietary nutrient. |
| Phosphatidylcholine | Dietary Requirement | Explanatory prose only | **Restore, narrowed:** Derived · Substrate Provision → Choline. A food-form/provision route, not a second ChAT substrate. |
| Vitamin B5 / pantothenate | Cofactor and Substrate | Unresolved prose only | **Admit, narrowed:** Biochemical Cofactor Precursor in §3.1.2. Pantothenate supports CoA/acetyl-CoA supply; it is not a ChAT cofactor or a second Direct dietary requirement. |
| Vitamin B12 | Cofactor and Substrate; KC constituent | One-carbon prose only | **Do not admit as PM row or ChAT cofactor.** Represent only through BRS2(KC1)'s supported shared-resource relationship. |
| Folate | Cofactor and Substrate; KC constituent | One-carbon prose only | **Do not admit as PM row or ChAT cofactor.** Represent only through BRS2(KC1). |
| Betaine | KC constituent | No PM entry | **Do not admit as PM row.** BHMT/remethylation context contributes to the KC chain; betaine is not a ChAT reactant. |
| Acetyl-CoA | Omitted | Reaction-partner prose only | **Admit:** Biochemical Substrate in §3.1.2. It is locally produced rather than a dietary acetyl-CoA target. |
| CoA | Omitted | Omitted | **Do not admit separately.** Immediate carrier supplied through pantothenate; represented in the B5 → acetyl-CoA derivation. |
| BBB CTL1/CTL2 transport | Omitted | Omitted | **Add as a mechanistic boundary.** It is distinct from terminal CHT uptake and is not a separate dietary atom. |
| CHT/SLC5A7 | Omitted | Omitted | **Add to Mechanistic Basis/Finding.** Material non-dietary control step, not a dietary atom. |
| ChAT | Enzyme named in prose | Enzyme named in prose | **Retain as defining enzyme, not an intake.** |
| Citrate/ATP-citrate lyase and other acetyl-unit routes | Omitted | Omitted | **Add to Mechanistic Basis/Finding.** They explain compartmented cytosolic acetyl-CoA provision; route proportions remain unresolved. |
| Glucose/pyruvate | Generic food implication only | Omitted | **Do not admit.** They can feed neuronal acetyl-CoA metabolism but no PM-specific, useful dietary dependency was established. |
| Vitamin B1 / thiamine | Omitted | Omitted | **Do not admit.** Severe experimental deficiency reduced nerve-terminal acetyl-CoA and changed acetylcholine release, but did not change ChAT activity or measure synthesis flux. Retain only as connected evidence for compartmented acetyl-CoA supply. |
| AChE | Later pathway context | Omitted | **Out of scope:** acetylcholine breakdown, not synthesis. |
| VAChT | Omitted | Omitted | **Out of scope:** vesicular storage after synthesis. |
| Receptors | Binding/ADHD material | Phenome Finding | **Phenome context only:** signalling and receptor binding do not measure synthesis. |

The published KC food lists were not inherited. A PM↔KC mapping names the KC
and its relationship; it does not copy the KC's constituent or food inventory
into the PM page.

## Claim-level evidence matrix

| Candidate | Biochemical necessity | Dietary provision | Demonstrated modulation | Functional/clinical benefit |
|---|---|---|---|---|
| Choline | Established ChAT substrate | Established essential nutrient | Human oral intake changes circulating choline; direct brain-ACh synthesis response not established | Not established for this PM |
| Phosphatidylcholine | Not a distinct ChAT reactant | Established route to choline | Human isotope study establishes digestion/remodelling and delayed plasma choline | Not established |
| Acetyl-CoA | Established ChAT substrate | Not consumed as a PM target | Synthesis modulation is shown indirectly through pantothenate depletion/rescue in rats | Not established |
| Pantothenate | Necessary precursor to CoA, not direct ChAT cofactor | Established vitamin intake route | Severe depletion/rescue altered labelled rat-brain ACh synthesis | Ordinary-diet human benefit not established |
| Folate/B12 | Not direct ChAT cofactors | Established nutrients, but not PM rows | One-carbon impairment changed brain choline/ACh in animals | Not established for PM6 |
| Betaine | Not ChAT substrate/cofactor | Dietary and choline-oxidation source | Supports BHMT remethylation; no direct PM6 synthesis response established | Not established |
| Thiamine/B1 | Supports pyruvate dehydrogenase upstream of acetyl-CoA, not ChAT | Established vitamin intake route | Severe experimental deficiency changed acetyl-CoA distribution and ACh release; synthesis modulation not established | Not established |
| CHT/SLC5A7 | Required terminal choline-uptake machinery | Not a dietary provision target | Transporter regulation controls choline supply experimentally | Dietary/clinical benefit not established |

## Traceability inventory

- `PM6-DIT-1` — Choline, `Direct · Substrate`
- `PM6-DIT-2` — Phosphatidylcholine,
  `Derived · Substrate Provision → Choline`
- `PM6-DIT-3` — Acetyl-CoA, `Biochemical · Substrate`
- `PM6-DIT-4` — Vitamin B5,
  `Biochemical · Cofactor Precursor`

The phosphatidylcholine route is visibly Derived and preserves its Direct
choline target. Acetyl-CoA is represented in §3.1.2 because it is an actual
reaction participant; B5 appears there as its biochemical precursor. Neither is
described as dietary acetyl-CoA or as a direct ChAT vitamin cofactor. B12,
folate, and betaine remain outside the PM atom inventory.

Choline is not repeated in §3.1.2 because its §3.1.1 atom already records the
same substrate role. This deduplication decision belongs in the audit; public
copy instead explains plainly that choline and acetyl-CoA are the two reaction
substrates.

## BRS2(KC1) applicability

**Decision:** `established`; `constrained-by`; Type D.

The chain is evidence-supported:

1. ChAT requires choline (Oda 1999; Ojiakor and Rylett 2020).
2. Choline can be oxidised to betaine and used by BHMT-dependent remethylation,
   creating a real shared-resource connection to one-carbon metabolism.
3. Folate compromise lowered brain choline and acetylcholine in mice, with
   S-adenosylmethionine rescue in the relevant model (Chan 2008).
4. MTRR impairment lowered hippocampal choline, betaine, and acetylcholine
   (Jadavji 2014).
5. A separate rat study found region- and age-dependent effects, constraining
   the claim rather than supporting a universal direction (Crivello 2010).

This establishes applicability without inventing an end-to-end human capacity
assay. Ownership does not block downstream applicability; conversely, shared
names and pathway proximity alone were not used as evidence. The public page
therefore states the constrained relationship and its limits, but does not
inherit the KC's nutrients or foods.

An independent challenge recommended `unresolved` because the one-carbon
studies measured metabolite pools rather than synthesis flux. That stricter
rule was not adopted: the amended contract explicitly permits a supported
mechanistic chain and forbids imposing one end-to-end capacity assay. Here the
chain includes dietary and genetic perturbation, lower brain choline and
acetylcholine, SAM rescue under folate compromise, the independently
established ChAT substrate requirement, and a study showing heterogeneous
regional responses. The limitation remains explicit: this is preclinical
capacity evidence, not a human intake-response or benefit claim.

### Other-KC scan

- **BRS1(KC1), LNAA competition at LAT1:** not applicable. Choline uses CHT and
  is not a large neutral amino-acid LAT1 cargo.
- Other registered KCs were screened for a supported mechanistic chain; none
  had one specific enough to PM6 to pass the Type D threshold.

## Intervention dominance and addressability

`Diet-Dominant` is consistent because diet directly supplies indispensable
choline, can supply it through phosphatidylcholine, and supplies pantothenate
for CoA/acetyl-CoA provision. `dietary_addressability: direct` reflects the
direct choline route. `claim_ceiling: dietary-provision` prevents these
dependencies from being presented as proof that more intake increases human
brain acetylcholine, attention, or clinical outcomes.

## Public presentation and connections

The public page:

- places Choline and Phosphatidylcholine in §3.1.1 with always-visible
  Direct/Derived indicators;
- places Acetyl-CoA and Vitamin B5 in §3.1.2 as a substrate and precursor;
- maps BRS2(KC1) once, without copied constituents or food lists;
- separates synthesis from storage, release, breakdown, receptor signalling,
  and attention outcomes;
- explains each cross-system PM link in 1–2 public-facing lines; and
- leaves §5.3 empty because FM2 has no sibling PM.

Governance terms, Type D reasoning, ownership, and deduplication decisions are
kept in this report and Review & Corrections rather than public explanatory
copy.

## Five-field presentation repair

The four structured atoms already contained Input, Input type, Biological role,
Evidence source and Limitation. Their presentation rows also resolved to those
atoms. Rendering failed because the hand-authored list bullets included
Direct/Derived and Input-type qualifiers, while the shared enhancer matches the
plain presentation label plus subsection and adds those qualifiers itself. The
resulting keys did not match, so no disclosure controls were mounted.

The Markdown bullets now contain only the presentation labels. The shared
renderer supplies the always-visible qualifiers and the five-field disclosure.
Acetyl-CoA also received the missing `description_finding_id: PM6-F2`, while its
structured evidence retains PM6-F2, PM6-F5 and PM6-F7 traceability.

Browser verification on the local rendered page confirmed:

- **Choline:** collapsed `Direct · Substrate`; expanded five fields; references
  [4] and [6]; PM6-F2 link.
- **Phosphatidylcholine:** collapsed
  `Derived · Substrate Provision → Choline`; expanded five fields; reference
  [7]; PM6-F4 link.
- **Acetyl-CoA:** collapsed `Substrate`; expanded five fields; references [4],
  [8] and [12]; PM6-F2 link.
- **Vitamin B5:** collapsed `Cofactor Precursor`; expanded five fields;
  reference [8]; PM6-F5 link.

The BRS2(KC1) panel remains a separate linked relationship with no dietary-entry
disclosures or copied constituent/food list.
