# BRS1-FM1-PM3 Dopaminergic Signalling — Stage 2B Report

Re-run against the **2B — Dietary Input Traceability & Visibility Contract**,
including the downstream-substrate amendment. Stage 2B reused the Stage 2A
Findings and bibliography. Absence of a new open search is not a failure.
Targeted follow-up was limited to contract/ownership correction and mission-stage
candidate review against that existing corpus. Schema validation is not proof of
scientific completeness.

**PM-governed objective/state:** appropriately regulated dopamine synthesis,
storage, release, receptor signalling, reuptake and metabolism.

Page `dietary_addressability: not-established` means no ordinary-diet
**target/Lever** is established at page level. It does not mean that biological
dependencies are absent.

Page `claim_ceiling: biological-dependency`.

## Ownership correction

Earlier 2A/2B text classified “Tyrosine / meal LNAA composition” as “Not this
PM.” That conflated two candidates:

| Candidate | Role | Owner |
|-----------|------|--------|
| Tyrosine as TH substrate | Conversion to L-DOPA | **This PM** |
| Circulating tyrosine / phenylalanine supply | Pool availability | PM1 |
| Meal LNAA composition | LAT1 competition | PM2 |

A related-PM link does not state or substantiate the local reaction-level claim.
Local listing does not create a second independent nutritional need. Roll-up
must keep both biological reasons and not double-count supply. Those
ownership and deduplication rules stay in this audit; they must not appear
in public dietary headings or reader descriptions.

Public §3.1.1 presentation for tyrosine is the science-first heading
`Tyrosine — Direct · Substrate · [Supply: PM1]`, with `Supply: PM1` an
always-visible link to the canonical PM1 page. The structured field is
`upstream_pm_relationships` on the dietary-input atom, not a tyrosine-only
renderer exception. The indicator names the upstream supply relationship; it
does not replace Fanet / PM3-F1 as the reference for tyrosine’s local
substrate role.

The shared contract now records this explicitly
(`system/dietary-input-traceability-contract.md`, downstream reaction
participants versus upstream supply).

## Biological classification (before atoms)

| Claimed input | Type | Decision |
|---------------|------|----------|
| Tyrosine | **A. Capacity / requirement** | **Admit** Direct §3.1.1 substrate. Fanet (2021) / PM3-F1 support the hydroxylase reaction. Ceiling `biological-dependency`. Addressability `not-established`. |
| Iron | **A. Capacity / requirement** | **Retain** Direct §3.1.1. |
| PLP | **A. Capacity / requirement** | **Retain** Direct §3.1.1. Active cofactor. |
| Vitamin B6 | **A, Derived** | **Retain** Derived → PLP. Dietary route to the active form, not a second independent need. |
| BH4 | **C. Biochemical inventory** | **Retain** §3.1.2 only. Endogenous cofactor. |
| Iron or PLP reprinted in §3.1.2 | **Same-role reprint** | **Keep removed.** Distinct B6→PLP supply is not a reprint. |
| Meal LNAA composition | **B / other PM** | **Not a PM3 DR.** Transport competition is PM2. |
| Ascorbic-acid pairing / phytate reduction | **SOP, not DR** | Meal iron-absorption practices. |
| Short-term fat restriction or VLCD | **B, failed high-bar** | Keep SOP. See Type B. |
| Acute exercise / avoid total sleep deprivation | **Lifestyle, not DR** | Keep §3.3. |
| BRS1(KC1) | **D, not this PM** | Public mapping not established. |

## Mission-stage candidate review (existing corpus)

| Stage | Assessed candidates | Decision |
|-------|---------------------|----------|
| Synthesis | Tyrosine, iron, BH4, PLP/B6 | Tyrosine, iron, PLP/B6 admitted as above; BH4 inventory only. |
| Storage / vesicular handling | General cellular energy / VMAT participants | **Not admitted.** No PM-specific dietary relationship in this corpus beyond the BRS4 constrained dependency. |
| Release | Activity-dependent tonic/phasic release (MacDonald) | **Not a DR.** Acute exercise remains lifestyle (PM3-F9). |
| Receptor signalling | D1/D2 pharmacology; D2/D3 binding-potential imaging | Pharmacology is not dietary. Fat-restriction/VLCD remain SOP. |
| Reuptake | DAT (Fusar-Poli, MacDonald) | Process established; no dietary DAT relationship admitted. |
| Metabolism | COMT and MAO named (MacDonald); SAM/BRS2; FAD; magnesium | **Not admitted as PM3 DRs.** Enzyme contribution is supported; dietary riboflavin/FAD, methionine/SAM, and magnesium routes are evidence gaps. SAM remains a BRS2 constrained dependency. |

## Type B high-bar (dietary-protocol candidates)

| Check | Fat restriction / VLCD |
|-------|------------------------|
| Exposure | Short inpatient fat restriction; short very-low-calorie diet |
| Population | Adults with obesity (small samples) |
| Endpoint | Regional D2/D3 receptor binding potential |
| Endpoint relevance | **Relevant** to the stated receptor-signalling scope. Binding potential is a receptor-family imaging measure used on this PM. |
| Endpoint sufficiency | **Not sufficient** to establish regulated signalling as a dietary state, or to separate receptor regulation from endogenous dopamine occupancy. |
| Attribution | Protocol and population specific; not a food or nutrient |
| Decision | SOP only. Not a Direct or Derived Dietary Requirement |

## Claim-level distinctions (public vs metadata)

| Level | This page |
|-------|-----------|
| Established biological dependency | Tyrosine, iron, PLP |
| Dietary provision of a dependency | Vitamin B6 → PLP; iron-absorption SOPs |
| Demonstrated modification of a dopamine process by ordinary diet | Not established as a Dietary Requirement |
| Demonstrated functional or clinical benefit | Not established |

Page-level `dietary_addressability: not-established` is the last two rows, not
the absence of synthesis dependencies.

## Admitted atoms

1. `PM3-DIT-5` — Tyrosine · Direct · substrate · `capacity-requirement` · `biological-dependency`
2. `PM3-DIT-1` — Iron · Direct · cofactor · `capacity-requirement` · `biological-dependency`
3. `PM3-DIT-2` — PLP · Direct · cofactor · `capacity-requirement` · `biological-dependency`
4. `PM3-DIT-3` — Vitamin B6 · Derived → PLP · `capacity-requirement` · `dietary-provision`
5. `PM3-DIT-4` — BH4 · §3.1.2 biochemical inventory only

## Remaining gaps

- Direct human dietary modification of synthesis, storage, release, receptor
  signalling, reuptake or metabolism remains insufficiently demonstrated.
- MAO/FAD and COMT/SAM/magnesium dietary routes, and any other
  storage/release/receptor/reuptake dietary dependencies, are **unresolved**,
  not evidence-supported rejections. They are parked as
  `CC-BRS1-FM1-PM3-01` in `system/mechanism-change-control-queue.md` and
  `FW017` on the PM3 review record. Identification does not authorise
  admission as Dietary Requirements.
- Schema checks passing does not close those gaps.
- Evidence review status remains Unreviewed. Applied corrections are not
  independent source or expert validation.

## Review & Corrections

`FW013`–`FW015` record the earlier 2B classification. `FW016` records the
tyrosine ownership correction (`register_surface: pm-tab`). `FW017` parks
mission-coverage questions beyond synthesis as **Deferred — evidence
assessment pending**. `FW024` / `FW034` record the completed Type D KC1 assessment: quality
`unresolved`; competitive `evidence-supported-non-application` for ordinary
meal LNAA balance; public copy stays `No mapping established.` See
`system/brs1-fm1-pm3-pm5-type-d-kc-reassessment.md`.

## Type D precedent check (not remapped)

Cited positive precedents were checked against the Type D threshold before
use. They were not used as exemplars for this PM and were not reopened.

- **BRS3-FM2-PM3** (`pm_biological_role`: Nrf2-ARE “assumes antioxidant-substrate
  sufficiency” / “draws on” BRS3(KC1)). That is assumption-only. It does not
  connect inadequacy of the named antioxidant-substrate pool to a constraint on
  Nrf2-ARE capacity. **Fails Type D (2).** Not an exemplar.
- **BRS5-FM1-PM1** (Peng 2009; Silva 2020; PM1-F2): butyrate can support
  tight-junction assembly; fermentable fibre is upstream SCFA provision. The
  structural form (named fermentation-product state → epithelial capacity) is
  closer to Type D than BRS3-FM2-PM3. This pass did **not** reassess BRS5 and
  does **not** treat that mapping as a template for monoamine signalling PMs.

## Validation

Passed after this correction:

- `npm run test:brs1-dopamine-stage1`
- `npm run test:dietary-lever-traceability`
- `npm run findings:check`
- `npm run qc:generate` and `npm run test:framework-qc`
