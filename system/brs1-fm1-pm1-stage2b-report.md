# BRS1-FM1-PM1 Stage 2B (classification correction)

## §4.1.3 PM↔iKC re-adjudication

Relationship-first test of **PM1 ↔ BRS1(KC1)** against the KC page definition and
evidence already on this PM. No new literature search. Page `claim_ceiling`
remains `dietary-provision`.

KC1 is one iKC with two arms: **amino-acid quality** (complete indispensable
supply / protein quality) and **competitive LAT1 balance**. Those arms are
adjudicated separately. Shared inputs with §4.1.1 are not a rejection criterion:
a Direct Dietary Requirement and a shared limiting pool may name the same
substances. Copied KC constituent lists and food-source bullets are not public
§4.1.3 copy.

### KC1 definition (from the KC page)

Ambition: maintain complete essential amino-acid supply and an appropriate
precursor pool with competitive LNAA balance. Core nutritional layer: complete
essential amino-acid supply, with tryptophan and phenylalanine/tyrosine named
inside that pool. Quality evidence: FAO 2013 (DIAAS) and Mariotti 2019 on the
KC page; this PM already cites Mariotti 2019 and Moughan 2024 for coverage and
protein quality. Competitive-balance evidence: Fernstrom 2013; the KC page
assigns mechanism-level LAT1 regulation to **PM2**.

### Arms

| Arm | KC role | PM1-specific role | Evidence on this PM | Decision |
|-----|---------|-------------------|---------------------|----------|
| Amino-acid quality | Shared indispensable / protein-quality precursor pool assumed by multiple BRS1 PMs | Coverage and quality of that pool may set the circulating foundation this PM governs | Mariotti 2019; Moughan 2024 | **Candidate for KC review.** Not a public mapping. |
| Competitive LAT1 / LNAA balance | Relative precursor presentation at the blood–brain barrier | Not this PM. Mechanistic Basis and Fernstrom 2013 assign transport competition to PM2 | Fernstrom 2013 | **Not a PM1 relationship** |

Prior rejection of the whole edge merely because IAA supply already sits in
§4.1.1 is withdrawn as a scientific reason. DIT-1 remains the PM-owned Direct
Dietary Requirement. A public PM↔KC1 mapping is **not** established on this
page.

### Schema-field decisions

| Field | Decision |
|-------|----------|
| `key_constraints` | **None.** Listing BRS1(KC1) would publish a mapping. |
| `pm_kc_relationships` | **None.** `BRS1-FM1-PM1-KCR-1` is not on the page. |
| `constituent_relationships` | **None.** |
| `kc_change_control_flags` | **`KC-CC-BRS1-FM1-PM1-01`**, `ikc-scope-conflict`, `pending-kc-review`. Candidate quality-arm mapping retained for KC-owned review. Competitive arm is not this PM. |
| Flag `evidence_source` | `mariotti_dietary_2019`, `moughan_diaas_2024` (quality-arm candidate); `fernstrom_lnna_2013` (competitive arm is PM2). |
| Page `claim_ceiling` | Unchanged: `dietary-provision`. |
| Page `dietary_addressability` | Unchanged: `direct`. |

### Exact resulting public §4.1.3 copy

```
No mapping established.
```

No KC title, no relevance paragraph, no constituent bullets, no food-source
arrows.

Decision records for this rerun are `FW004`–`FW009` in
`system/framework-qc/framework-issues-register.json` (`register_surface: pm-tab`).
They populate the PM Review & Corrections tab only. They are not published on
the Framework Review & Corrections register.

---

Re-run against the **2B — Dietary Input Traceability & Visibility Contract**.
No open literature search. Classification was corrected using bibliography
already on the PM plus two sources named for this pass:

- [Matthews 2007](https://pmc.ncbi.nlm.nih.gov/articles/PMC2268015/) — phenylalanine → tyrosine kinetics; tyrosine is dispensable and can become conditionally indispensable when phenylalanine is limited.
- [Marsh et al. 2013](https://pubmed.ncbi.nlm.nih.gov/25369930/) — vegetarian protein; no need to combine plant proteins at each meal when the diet is varied from day to day.

**PM-governed objective:** coverage of the indispensable amino-acid pool and
prioritisation of neurotransmitter-relevant substrates. Not LAT1 (PM2), not
monoamine synthesis/signalling (PM3–PM5), not ADHD outcome.

Page `dietary_addressability: direct`. Page `claim_ceiling: dietary-provision`.
Admitted §4.1.1 rows remain `relationship_mode: capacity-requirement`.

## Biological classification (before atoms)

| Input | Classification |
|-------|----------------|
| Phenylalanine | Indispensable. Biologically in the IAA pool this PM governs. |
| Tyrosine | Catecholamine precursor. Normally synthesised from phenylalanine. Not an IAA. May become conditionally indispensable if phenylalanine is limiting. |
| Tryptophan | Indispensable serotonergic precursor. |
| Complementary plant-protein pairing at each meal | Not established as a Dietary Requirement by Mariotti 2019, Moughan 2024, or Marsh 2013. |

Absence of a phenylalanine **atom** is an **evidence-scope** decision (no
independent PM-owned five-atom record on this page). It is **not** a claim that
phenylalanine is biologically absent from the indispensable pool. DIT-1 names
phenylalanine as a member of that set.

## Revised §4.1.1 decisions

| Atom | Decision | Addressability | Ceiling | Evidence |
|------|----------|----------------|---------|----------|
| **PM1-DIT-1** Indispensable amino-acid supply | **Retain Direct** | `direct` | `dietary-provision` | Mariotti 2019; Moughan 2024 |
| **PM1-DIT-2** Dietary protein | **Retain Derived → IAA supply** | `direct` | `dietary-provision` | Mariotti 2019; Moughan 2024 |
| **PM1-DIT-3** Complementary plant-protein pairing | **Not admitted** | n/a | n/a | Marsh 2013; Mariotti 2019. Variety across the diet ≠ same-meal pairing. |
| **PM1-DIT-4** Tyrosine | **Demoted from Direct DR** | n/a | `biological-dependency` | Matthews 2007; Aquili 2020. Now §4.1.2 inventory only. |
| **PM1-DIT-5** Tryptophan | **Retain Direct substrate** | `direct` | `dietary-provision` | Mariotti 2019; Aquili 2020 |

DIT-1 biological role now distinguishes **measurable meal composition** from a
**requirement that each meal be complete**.

## Not admitted (unchanged exclusions plus this pass)

| Candidate | Result | Reason |
|-----------|--------|--------|
| Phenylalanine as its own atom | NO (evidence-scope) | Not independently atomised on this PM. Still a member of DIT-1. |
| Tyrosine as Direct Dietary Requirement | NO | Not an IAA; inventory in §4.1.2. |
| Complementary plant-protein pairing | NO | Cited vegetarian/DIAAS literature does not establish a same-meal pairing requirement. |
| Isolated L-tyrosine supplementation | NO | Reimherr 1987 is phenome/tolerance, not pool coverage. |
| LAT1 / LNAA | NO | PM2. |
| Monoamine effects / ADHD outcomes | NO | Claim ceiling remains dietary-provision. |

## Conditional Optimisation Strategy

§4.1.1 NO preserved for pairing and for dietary tyrosine as a lever.

| Candidate | Result |
|-----------|--------|
| Same-meal complementary pairing | **NOT ESTABLISHED** |
| L-tyrosine supplementation | **NOT ESTABLISHED** |
| Distributed protein intake | Unchanged change-control SOP candidate; not auto-admitted |

## Exact public-facing wording

### Intervention Profile

Diet can supply the indispensable amino-acid pool this PM governs. That is a provision relationship, not a rule that more protein increases brain monoamines or improves ADHD, and not a rule that each meal must be a complete protein.

### §4.1.1 Direct and/or Derived Dietary Requirements

Rendered labels and compact qualifiers:

- Indispensable amino-acid supply — Direct · Nutrient / compound class
- Dietary protein — Derived · Substrate Provision → Indispensable amino-acid supply
- Tryptophan — Direct · Substrate

Five-atom copy (reader disclosure):

**Indispensable amino-acid supply**

- Input = Indispensable amino-acid supply
- Input type = Nutrient / compound class
- Biological role = Coverage of the indispensable amino-acid set, including phenylalanine, that sets the circulating pool neurotransmitter pathways can draw on. Meals contribute measurable amino-acid composition; this is not a requirement that each meal provide complete coverage
- Evidence source = Mariotti et al. (2019); Moughan and Lim (2024)
- Limitation = Protein-quality scoring and vegetarian-diet amino-acid coverage do not establish that increasing protein raises brain monoamine synthesis or improves ADHD outcomes. The indispensable set includes phenylalanine even though phenylalanine is not a separate atom on this PM; tyrosine is not an indispensable amino acid.

**Dietary protein**

- Input = Dietary protein
- Input type = Substrate provision
- Biological role = Provides the indispensable amino acids that constitute the circulating pool this PM governs
- Evidence source = Mariotti et al. (2019); Moughan and Lim (2024)
- Limitation = Dietary protein provision of amino acids is supported; this does not establish an intake-to-neurotransmitter or clinical-response relationship, and it does not require each meal to be a complete protein.

**Tryptophan**

- Input = Tryptophan
- Input type = Substrate
- Biological role = Indispensable serotonergic precursor this PM prioritises in the circulating precursor pool
- Evidence source = Mariotti et al. (2019); Aquili (2020)
- Limitation = Pool presence of tryptophan is not evidence for increased brain serotonin, LAT1 advantage, or mood or ADHD benefit.

### §4.1.2 Cofactors and Substrates

- Tyrosine — Substrate

Tryptophan is not repeated here: it is already the same Direct substrate in §4.1.1.

**Tyrosine** (inventory only; not in §4.1.1)

- Input = Tyrosine
- Input type = Substrate
- Biological role = Catecholamine precursor in the circulating pool this PM prioritises. Tyrosine is normally formed from indispensable phenylalanine and can become conditionally indispensable when phenylalanine availability is limited
- Evidence source = Matthews (2007); Aquili (2020)
- Limitation = Tyrosine is not an indispensable amino acid. Pool presence or dietary tyrosine is not evidence for increased brain dopamine or noradrenaline, LAT1 advantage, or clinical benefit. Absence of a phenylalanine atom is an evidence-scope decision, not a claim that phenylalanine is absent from the indispensable pool.

### §4.1.3 Key Constraints

No mapping established.

## Layer results

| Layer | Result |
|-------|--------|
| §4.1.1 | IAA supply (Direct); dietary protein (Derived); tryptophan (Direct). |
| §4.1.2 | Tyrosine only. Tryptophan is not reprinted: same role as the §4.1.1 Direct substrate. |
| §4.1.3 | No mapping established. Quality-arm PM↔KC1 remains a candidate in this audit (`KC-CC-BRS1-FM1-PM1-01`). Competitive balance remains PM2. |
