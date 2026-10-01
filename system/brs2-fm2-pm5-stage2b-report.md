# BRS2-FM2-PM5 Transsulfuration Pathway — Stage 2B Report

`evidence_status` is `stage-2b-dietary-addressability`. Page `dietary_addressability` is `precursor-mediated` and `claim_ceiling` is `biological-dependency`.

## Dietary decisions

| Atom | Input | Type | Layer | Classification | Section | Addressability | Ceiling |
|---|---|---|---|---|---|---|---|
| PM5-DIT-1 | Pyridoxal 5'-phosphate | Cofactor | dietary-requirement | Direct | §3.1.1 | precursor-mediated | biological-dependency |
| PM5-DIT-2 | Vitamin B6 | Cofactor precursor | dietary-requirement | Derived → PM5-DIT-1 | §3.1.1 | direct | biological-dependency |
| PM5-DIT-3 | Homocysteine | Substrate | biochemical-requirement | — | §3.1.2 | — | biological-dependency |
| PM5-DIT-4 | Serine | Substrate | biochemical-requirement | — | §3.1.2 | — | biological-dependency |
| PM5-DIT-5 | Cystathionine | Substrate | biochemical-requirement | — | §3.1.2 | — | biological-dependency |

`cofactors` is `Pyridoxal 5'-phosphate, Vitamin B6`. Both strings normalise to the same labels as the dietary atoms.

**Pyridoxal 5'-phosphate.** Belew, Meier, and Zhu establish that CBS and CGL require this cofactor. It is the active form, so the row is Direct. Food does not deliver PLP as the dietary form used by the enzymes; di Salvo places salvage between food vitamin B6 and PLP, so addressability is precursor-mediated. The limitation keeps the ceiling at biological dependency: cofactor dependence is not an intake-response.

**Vitamin B6.** di Salvo (2012) describes salvage of food vitamin B6 to PLP by pyridoxal kinase, pyridoxine 5'-phosphate oxidase, and phosphatases. That is a provision edge to the Direct cofactor, so the row is Derived. No admitted study shows that changing vitamin B6 intake changes CBS or CGL flux, so the ceiling stays biological-dependency and the claim is not `demonstrated-modulation`.

**Homocysteine.** Direct substrate of CBS, generated inside the methionine cycle. Biochemical atom only. Not a dietary intake and not a Derived food row.

**Serine.** Direct cosubstrate of CBS. Biochemical atom only. Diet and endogenous synthesis can both supply serine, but no provision citation was retrieved showing that dietary serine or protein is the evidenced source for this reaction. Dietary serine and dietary protein were not admitted.

**Cystathionine.** Substrate of CGL and the product of CBS. Pathway intermediate, biochemical atom only.

**Not admitted.** Cysteine is the product, not a substrate of this conversion. Glutathione is PM6. Food arrows (poultry, eggs, fish, legumes, grains) were removed because they were not tied to an evidenced atom. No SOP or lifestyle atom was invented; public §3.2 and §3.3 state that no assessed practice has been shown to change the conversion.

## Type D — BRS2(KC2)

KC page title: Methionine–Cysteine Sulfur Amino Acid Pool. `kc_id` `BRS2(KC2)`.

Disposition: **unassessed**.

What is established about the enzymes is not a pool constraint. CBS uses homocysteine and serine. Homocysteine is a cycle intermediate, not methionine, and serine is excluded from this KC's admitted constituents. CGL releases cysteine; cysteine is the product of this PM, and the KC page does not show that inadequacy of the methionine–cysteine pool reduces CBS or CGL capacity. Substrate necessity alone does not meet the Type D threshold.

`key_constraints` was removed. No `pm_kc_relationships` entry was added. `kc_applicability_adjudications` records `unassessed` without `applicability_mode`. Public §3.1.3 is exactly `No mapping established.`

The inferred, untested link is whether low S-adenosylmethionine or a low methionine supply reduces CBS capacity. A review abstract notes allosteric activation by S-adenosylmethionine; that paper was not retrieved as primary evidence and was not used to establish the KC.

## Rendered check

Local page `http://localhost:3000/docs/biological-targets/brs2/fm2/brs2-fm2-pm5-transsulfuration-pathway`.

- §3.1.1 collapsed labels: `Pyridoxal 5'-phosphate — Direct · Cofactor` and `Vitamin B6 — Derived · Cofactor Precursor → Pyridoxal 5'-phosphate`.
- Each of those two entries, and Homocysteine, Serine, and Cystathionine, opens to Input, Input type, Biological role, Evidence source, and Limitation.
- §3.1.2 qualifiers are `Substrate` only.
- Evidence links resolve to `#pm-ref-1` through `#pm-ref-5` as cited on each row.
- §3.1.3 reads `No mapping established.` with no constituent or food list.
- §4.1 shows the public intro. Finding cards are absent until sync, which this pass did not run.
- §5.2 reads `None listed`. §5.3 carries the PM6 explanation.

## Change-control notes

- Merge `system/bib-additions/brs2-pm5.bib` into the master bibliography so the new keys resolve outside this sidecar.
- Repair `gregory_homocysteine_2016` and `kumar_transsulfuration_2017` in the master bib; they were not used.
- After sync, Finding anchors can be linked from the dietary disclosures if `description_finding_id` is added. It was omitted so the rendered page would not point at anchors that do not exist yet.
- A later pass can extract Lamers et al. (2011) if the question becomes whether moderate B6 restriction changes human transsulfuration flux. That result was not needed to keep the present ceiling.
- Type D stays open until a study shows that inadequacy of the methionine–cysteine pool changes this conversion's capacity.
