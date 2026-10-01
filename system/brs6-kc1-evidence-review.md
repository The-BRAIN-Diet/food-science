# BRS6(KC1) KC-page evidence review

**Contract:** `system/kc-page-evidence-review-contract.md`  
**Page:** `docs/biological-targets/brs6/kc/brs6-kc1-glucose-energy-substrate-availability.mdx`  
**Corpus:** Mergenthaler et al. 2013 (`mergenthaler_sugar_brain_2013`); Reynolds et al. 2019 (`reynolds_2019_30638909`); Monnier et al. 2006 (`monnier_2006_16638903`).  
**PM evidence:** not modified. PM ↔ iKC applicability remains a later independent Stage 2B decision.

## Page coherence

**Candidate constraint:** meal-patterned slow-release carbohydrate, protein, fat,
and soluble-viscous fibre form one energy-substrate pool shared across
glycaemic, HPA-axis, circadian-feeding, and metabolic-inflammation mechanisms.

**Adjudication:** **narrowed.** The corpus supports continuous cerebral dependence
on circulating glucose and the biological relevance of carbohydrate quality and
glucose variability. It does not establish the listed meal components as
constituents of one limiting pool. The surviving default iKC is therefore
**glucose availability**, with a `biological-dependency` claim ceiling.

The title, summary, functional descriptor, ambition, §2, and §3 were narrowed to
that resource. Food arrows were removed because food provision is a separate
proposition and was not needed to establish membership.

## iKC definition

The page retains one default iKC whose `ikc_id` equals `BRS6(KC1)`.

- **Constrained thing:** circulating glucose availability as a cerebral energy
  substrate.
- **Resource:** glucose supplied through regulated circulation, not an inventory
  of meal components.
- **Why it can be a constraint:** inadequate glucose availability can constrain
  cerebral energy metabolism.
- **Boundary:** the evidence does not establish dietary carbohydrate as
  indispensable, an ordinary-diet limiting threshold, or the listed meal
  modifiers as members of the glucose resource.

## Constituent adjudication

### Glucose availability — admitted

- **Input Type:** `resource dependency`
- **Biological Role:** circulating glucose supplies a continuously required
  cerebral energy substrate whose inadequate availability can constrain
  neuronal energy metabolism.
- **Evidence Source:** `mergenthaler_sugar_brain_2013`
- **Limitation:** cerebral glucose dependence does not establish dietary
  carbohydrate indispensability, common ordinary-diet limitation, or
  applicability to every listed BRS6 mechanism.
- **Constraint status:** `nutritionally-constrained`
- **Claim ceiling:** `biological-dependency`

### Slow-release carbohydrate substrates — excluded

- **Input Type:** `nutrient/compound class`
- **Evidence Source:** `reynolds_2019_30638909`
- **Disposition:** `dietary-input`; excluded from iKC membership.
- **Reason:** carbohydrate-quality evidence can support dietary or glycaemic
  modulation, but not membership in an indispensable shared glucose resource.

### Dietary protein substrate context — excluded

- **Input Type:** `dietary matrix`
- **Evidence Source tested:** `mergenthaler_sugar_brain_2013`;
  `reynolds_2019_30638909`
- **Disposition:** `unsupported`; excluded from iKC membership.
- **Reason:** neither source establishes dietary protein context as a shared
  limiting glucose resource across the proposed scope.

### Dietary fat substrate context — excluded

- **Input Type:** `dietary matrix`
- **Evidence Source tested:** `mergenthaler_sugar_brain_2013`;
  `reynolds_2019_30638909`
- **Disposition:** `unsupported`; excluded from iKC membership.
- **Reason:** neither source establishes dietary fat context as a shared limiting
  glucose resource across the proposed scope.

### Soluble-viscous fibre classes — excluded

- **Input Type:** `nutrient/compound class`
- **Evidence Source:** `reynolds_2019_30638909`;
  `monnier_2006_16638903`
- **Disposition:** `dietary-input`; excluded from iKC membership.
- **Reason:** the corpus supports carbohydrate-quality evidence and the
  biological relevance of glucose fluctuations, but does not establish
  soluble-viscous fibre as a constituent of the glucose resource.

Exclusion from the iKC is not a finding that these inputs are biologically
unimportant. Their PM-specific dietary roles remain available for independent
Stage 2B adjudication.

## Public Summary check

The §3 Summary was checked claim by claim against the narrowed definition, all
five constituent decisions, and their claim ceilings.

- It opens with one 76-word explanatory paragraph.
- It is followed by exactly three cited, non-duplicative boundary bullets.
- Citations resolve to the three page bibliography records and are attached to
  the propositions they support.
- It contains no internal review-status or workflow terminology.
- It distinguishes cerebral glucose dependence from dietary carbohydrate
  indispensability, meal-modifier membership, and supplementation benefit.

The sole §3 resource title, **Glucose availability**, matches its presentation
record and carries the standard title-attached five-field disclosure. The title
and adjacent chevron toggle the same evidence panel. §4 has no assessed
candidate, so no support atom or candidate disclosure is required.

## Proposed FM/PM scope

Existing links are retained as **proposed scope**, not established applicability.

- FM1 and PM1–PM3 remain plausible proposed scope because they concern glucose
  appearance, variability, and disposal.
- FM2, PM4, PM5, FM4, and PM8 are not established as constrained by glucose
  availability in this corpus. They remain linked only as proposed scope and are
  flagged `ikc-scope-conflict` for independent assessment.

No PM evidence or PM mapping was modified.

## Change-control flags

- `KC-CC-BRS6-KC1-01` — resolved: the inherited meal-pattern grouping does not
  form one shared limiting pool.
- `KC-CC-BRS6-KC1-02` — pending: cross-FM HPA-axis, circadian-feeding, and
  metabolic-inflammation applicability is not established by the KC corpus.

The flags are stored on the KC page only. The shared queue was not modified.

## Evidence coverage and stopping rationale

The existing page corpus was sufficient to separate three propositions:

1. continuous cerebral glucose dependence;
2. dietary carbohydrate-quality or fibre effects; and
3. harmful glucose variability in type 2 diabetes.

Those propositions do not establish the broader meal-component pool or every
proposed PM relationship. Additional PM literature would test PM ↔ iKC
applicability rather than constituent membership and is outside this KC pass.
Review therefore stopped after the page constraint, every inherited constituent,
the public Summary, and proposed scope were adjudicated.

## Final verdict

**Canonical after narrowing.** `BRS6(KC1)` now represents glucose availability
only. One constituent is admitted, four inherited dietary candidates are
explicitly excluded, and the page carries `kc_evidence_review_status: canonical`.
