# BRS3(KC1) KC-page evidence review

**Contract:** `system/kc-page-evidence-review-contract.md`  
**Page:** `docs/biological-targets/brs3/kc/brs3-kc1-antioxidant-substrate-availability.mdx`  
**Corpus (attached only):** Packer et al. 1997 (`packer_vitamin_1997`); Sekhar et al. 2011 (`sekhar_glutathione_2011`); Zelicha et al. 2022 (`zelicha_effect_2022`).  
**PM evidence:** not modified. Stage 2B of PM ↔ iKC is out of scope.

## Strict membership (accepted calibration)

Applied to the completed review without new evidence. iKC membership requires
participation in the shared constraint. Glutamate remains biochemically required
for GSH but is **excluded** from iKC membership. Polyphenols and vitamin C remain
excluded; vitamin C is not preserved by creating another iKC.

---

## Page coherence

**Candidate page constraint:** “Antioxidant Substrate Sufficiency” as one shared
pool of **direct dietary antioxidants** plus **glutathione-building amino-acid
substrates**, as a **shared prerequisite** and **constraint prevention** condition
across listed FM1 and FM2 PMs.

**Adjudication:** **not supported as a single nutritionally constrained pool.**

- Sekhar supports **conditional limitation of glutathione synthesis** by cysteine
  and glycine (elderly humans; supplementation of those two amino acids).
- Packer supports an **interlinked metabolic antioxidant network** centred on
  vitamin E recycling, thiols, and glutathione — network biochemistry, not a
  demonstration that polyphenols and glutathione amino acids are one dietary
  limiting pool.
- Zelicha is a **polyphenol-rich (green-MED) dietary-pattern RCT** on visceral
  adiposity. It does not establish polyphenols as an indispensable shared
  antioxidant-substrate constraint.

**Surviving page-level constraint:** **cysteine and glycine availability** for
glutathione synthesis. Glutamate is biochemically required for GSH but is
**not** an iKC member. The former dual-arm architecture does not earn page
coherence. The iKC is allowed to be small.

**Title / ambition:** the historical “Antioxidant Substrate Sufficiency” title
overstated the surviving science. The canonical title is now **Glutathione
Precursor Sufficiency**, and the ambition and functional descriptor follow the
admitted cysteine-and-glycine constraint. The historical dual-arm title
proposition is retained as a resolved change-control record rather than
preserved in public copy.

---

## iKC definition

| Proposed iKC | Constrained thing | Verdict |
|--------------|-------------------|---------|
| Direct dietary antioxidants / exogenous antioxidant substrate class (polyphenols + vitamin C) | Unspecified “dietary antioxidant” pool | **Rejected as an iKC on this page.** Not shown to be one nutritionally constrained resource shared with the GSH amino-acid pool. |
| Glutathione-building amino-acid substrates | GSH precursor amino acids for endogenous GSH synthesis / GSH-centred network | **Admitted** as the page iKC `BRS3(KC1)`. |

**Admitted iKC — `BRS3(KC1)` (page default; glutathione precursor amino-acid pool)**

A second iKC id (`BRS3(KC1)-IKC1`) is **not** declared in YAML. Declaring it
would make existing PM `pm_kc_relationships` (default `ikc_id` = `BRS3(KC1)`)
fail unknown-iKC validation. PM records are not modified in this pass. The
surviving constraint is the page’s single iKC.

- **What is constrained:** availability of amino-acid precursors for glutathione
  (γ-glutamyl-cysteinyl-glycine) synthesis under oxidative/inflammatory demand.
- **Resource:** the GSH precursor amino-acid pool, not “antioxidants” in general.
- **Why a constraint:** Sekhar shows GSH synthesis can be limited by cysteine and
  glycine availability in aging humans. That is resource limitation of an
  endogenous redox buffer, not merely a relevant pathway.
- **Relation to the page:** this is the only grouping that survives the shared-pool
  test on the attached corpus.

Vitamin C is **not** this iKC and is not a second iKC.

---

## Admitted constituent five-atom records

Admitted members are cysteine and glycine only. Food examples were not used as iKC evidence and
are not retained.

### Cysteine — `nutritionally-constrained`

| Atom | Record |
|------|--------|
| Input | Cysteine |
| Input Type | substrate |
| Biological Role | Sulfur-amino-acid substrate whose availability can limit glutathione synthesis, constraining the endogenous GSH pool. |
| Evidence Source | `sekhar_glutathione_2011` |
| Limitation | Elderly humans; cysteine plus glycine supplementation restored GSH synthesis. Does not establish a universal intake threshold, ADHD-specific limitation, or that extra cysteine benefits GSH-replete people. Does not by itself prove every listed PM is constrained. |
| Claim ceiling | `dietary-provision` |

### Glycine — `nutritionally-constrained`

| Atom | Record |
|------|--------|
| Input | Glycine |
| Input Type | substrate |
| Biological Role | Glycine residue of glutathione; availability can co-limit GSH synthesis with cysteine. |
| Evidence Source | `sekhar_glutathione_2011` |
| Limitation | Same trial as cysteine; conditional (aging / deficient GSH synthesis), not proof of ordinary dietary glycine limitation in all populations or of isolated glycine as a sole lever. |
| Claim ceiling | `dietary-provision` |

### Glutamate — `biochemical-requirement` / **excluded from iKC membership**

| Atom | Record |
|------|--------|
| Input | Glutamate |
| Input Type | substrate |
| Biological Role | γ-Glutamyl constituent of glutathione; required for GSH structure and GSH-centred network recycling. |
| Evidence Source | `packer_vitamin_1997` (GSH-centred antioxidant network); GSH stoichiometry is biochemical context, not a dietary trial. |
| Limitation | Biochemical requirement for GSH does **not** establish ordinary dietary glutamate as limiting. Packer does not measure glutamate intake or limitation. Sekhar did not supplement glutamate. |
| Claim ceiling | `biological-dependency` |

---

## Rejected / reclassified / unresolved

| Proposition | Verdict | Reason |
|-------------|---------|--------|
| “Antioxidant Substrate Sufficiency” as one exogenous + GSH pool | **Flagged** | Dual-arm grouping not supported as one nutritionally constrained domain. |
| “Direct dietary antioxidants” as core iKC constituents | **Rejected** | Packer is vitamin E / thiol / GSH **network** biochemistry, not a dietary polyphenol+vitamin C substrate class. |
| “Exogenous antioxidant substrate class” | **Rejected** | Not established by Packer or Zelicha as a KC pool. |
| “Shared prerequisite” / “constraint prevention” for the dual-arm claim | **Rejected at that breadth** | Constraint-prevention language is retained only for **conditional GSH precursor limitation** (Sekhar), not for polyphenols or the dual-arm page. |
| “Glutathione-building amino-acid substrates” as an undifferentiated trio of dietary constraints | **Narrowed** | Cysteine and glycine: nutritionally constrained (glycine conditional). Glutamate: biochemical requirement only → **excluded from iKC**. |
| Polyphenols as KC constituent / direct in-vivo antioxidant substrate | **Rejected** (`constituent-challenge`, resolved) | Zelicha tests a **polyphenol-rich dietary pattern** (green-MED, VAT). Pattern RCT ≠ indispensable polyphenol constraint. Packer does not establish polyphenol substrate status. Signalling / pattern effects remain eligible for **PM** Stage 2B, not iKC membership here. |
| Vitamin C as GSH-pool constituent | **Excluded** | Packer supports vitamin C as a **network recycling** partner. That is not this shared constraint. Not a second iKC. |
| Food arrows (berries, citrus, eggs, …) | **Not retained as evidence** | Food → Input was not independently adjudicated at claimed granularity. |

---

## Public Evidence Base Summary and disclosures

The Summary was rechecked claim by claim against the narrowed page definition,
all five constituent decisions and the admitted atoms' `dietary-provision`
claim ceiling. It now opens with one 81-word public-facing paragraph followed
by exactly three distinct, claim-local cited bullets:

1. the constraint boundary separating glutamate, polyphenols and vitamin C from
   cysteine-and-glycine precursor availability;
2. the population, combined-exposure and measurement limits of the Sekhar
   evidence; and
3. the distinction between preventing precursor constraint and claiming benefit
   from additional intake.

The Summary uses only the existing Sekhar and Packer sources. Both citation
keys resolve to their intended bibliography records, and no unresolved Summary
claim remains. Internal governance and workflow language was removed from the
public Summary.

Cysteine and Glycine now each have a separate §3 resource disclosure attached
to the exact presentation title. Pointer hover and keyboard focus expose the
five-field atom; activating the title or adjacent chevron toggles the same full
evidence panel. Excluded inputs remain in structured adjudication records and
the Summary boundary but no longer appear as resource dropdowns.

Section 4 states that no Emerging Biological Supports are currently
prioritised. Candidate-like placeholder prose was removed, so no unevidenced
candidate bypasses the required support-atom and title-interaction contract.

---

## Proposed FM/PM scope

Existing §5 connections are **carried forward as proposed scope** for
`BRS3(KC1)`. This review does **not** confirm PM relevance.

| Connection | Status |
|------------|--------|
| BRS3(FM2); PM3 Nrf2; PM4 ROS balance; PM5 lipid peroxidation; PM6 network recycling | Proposed. GSH-centred redox buffering is biologically adjacent; **Stage 2B must test each PM**. |
| BRS3(FM1); PM1 NF-κB; PM2 gut-derived inflammatory signalling | Proposed only. Attached corpus does **not** show that GSH precursor sufficiency is a shared constraint of these inflammatory PMs. Flagged (`ikc-scope-conflict`) as **materially unsupported**, not proven impossible. |

---

## Governing limitations

- Attached three-source corpus only; no new PM or polyphenol-signalling search.
- Sekhar: aging, GSH synthesis, cysteine+glycine — not a general population
  requirement statement.
- Packer: vitamin E network review (1997) — not a polyphenol or glutamate
  dietary-limitation trial.
- Zelicha: green-MED / VAT — not KC membership for polyphenols.
- Shared-scope across listed PMs is **proposed**, not evidenced per PM.

---

## KC review flags

Recorded on the KC page `kc_change_control_flags`. The historical title /
dual-arm proposition is resolved by the narrowed title and definition. The
FM1/PM1–PM2 scope proposition remains pending because the attached corpus does
not establish that scope. The existing shared queue was intentionally not
modified by this page-owned audit.

The page is `kc_evidence_review_status: canonical` for **admitted** precursor-pool atoms
so PM Stage 2B may use `canonical-reviewed` membership **only for those
constituents**, not for rejected polyphenol/vitamin C claims.

---

## Verification

The canonical page retains only Cysteine and Glycine in §2, gives both admitted
resources separate title-attached five-field disclosures in §3, and keeps
Glutamate, Polyphenols and Vitamin C excluded from membership. The Summary has
one 65–90-word paragraph and exactly three distinct cited bullets. All page
citation keys resolve to existing bibliography records. Focused governance,
bibliography, mechanism-page and build checks are recorded in the completion
handoff.
