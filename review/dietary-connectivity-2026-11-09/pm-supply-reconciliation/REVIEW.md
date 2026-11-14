# PM/KC supply discrepancies — proposed decisions only

Branch audit/dietary-connectivity-2026-11-09; HEAD af13bec172b5938098a46f85c06523b8a20e90dc. Existing 145-pair inventory and 151-target presentation inventory preserved. Canonical records, SEC, holds and applicability unchanged. Original extracted records and current canonical file fingerprints: evidence.json. No new scientific source retrieval or appraisal.

## 1. Six existing presentation targets

| PM / atom | Existing authority and scope | Proposed disposition |
|---|---|---|
| BRS1-FM1-PM2 / PM2-DIT-1: tyrosine | dietary_input=true; biochemical cargo/competition role; explicit Supply reference to BRS1 PM1 PM1-DIT-4. §3.1.2; accounting B. | Remain as an upstream dietary-supply reference. Correct audit extraction to recognize the resolved owner/relationship link, not invent a local Direct/Derived admission. |
| BRS1-FM1-PM2 / PM2-DIT-2: tryptophan | Same structure; owner PM1-DIT-5. Existing Fernstrom, Wurtman and Ashley references. | Same correction. Plasma ratios do not establish brain uptake, serotonin synthesis or clinical benefit. |
| BRS1-FM2-PM6 / PM6-DIT-4: B5 | Historical admission=true, dietary_input=true, addressability=direct, claim ceiling=dietary-provision. Canonical note explicitly retains the nutritional CoA precursor route; Rivera-Calimlim 1988 rat evidence. | Remain as bounded precursor provision. Reconcile the missing generated admission/classification field from this explicit provision decision, without converting it into a completed B5→acetyl-CoA conversion assessment or intake-response claim. |
| BRS1-FM2-PM6 / PM6-DIT-5: B9 | Existing folate constituent supply in §3.1.3, historical admission and dietary_input=true; established parent KC adjudication. Child type/disposition missing. | Remain as existing folate resource supply. Complete the child decision described below before counting it as explicitly established iKC in the strict union. |
| BRS2-FM2-PM5 / PM5-DIT-4: serine | Historical admission=true; canonical note and limitation explicitly allow endogenous and dietary provision. Biochemical cosubstrate role, biological-dependency ceiling; Belew 2009/Meier 2001. | Remain as existing dietary provision, not evidence that intake increases transsulfuration flux. Reconcile the missing machine classification without inferring an intervention effect or a new Derived route. |
| BRS5-FM2-PM5 / PM5-DIT-2: studied FOS/GOS | Current versioned assessment says unresolved/review_required; historical dietary_input=true explicitly does not renew approval. Van Trijp 2024; functional dependency unresolved; no food targets. | Retain the historical displayed record with its existing review qualification, but do not count as scientifically accepted current supply or expose ordinary-food equivalence. Author adjudication of the exact mixture→SCFA Capacity claim remains required. |

The first five are not evidence of five absent dietary decisions: the strict extractor omitted approved scope encoded outside its narrow admission field. Approve metadata/extraction reconciliation of those existing roles, with the B9 child explicitly adjudicated below. FOS/GOS must remain separate. If later approved and implemented, those five would extend the strict union from 145 to 150 without changing the 151-target display inventory; no such change is made here.

## 2. Two excluded KC relationships: intentional

- **BRS4-FM2-PM4 → BRS4(KC2)**, PM4-KC2-HISTORICAL-REVIEW. relationship_type=historical-context; review_status and scientific_admission=unresolved; dietary_input=false; no constituents or established applicability adjudication. Sources: PM4-F1, brs4_brand2016_20261023, brs4_chouchani2014_20261023.
- **BRS4-FM2-PM5 → BRS4(KC2)**, PM5-KC2-HISTORICAL-REVIEW. Identical unresolved historical-context treatment. Sources: PM5-F1, brs4_rafique2001_20261023, brs4_azuma2022_20261023.

Both records explicitly say source-specific mitochondrial evidence does not establish the whole B-vitamin/iron/magnesium pool as a constraint. **Proposal: retain exclusion from accepted supply, retain historical provenance, make no mapping correction.** Reinstatement would require a separate scientific applicability decision; no new review is needed merely to preserve current exclusion.

## 3. Exact missing constituent decision

BRS1-FM2-PM6-KCI-1 links PM6-DIT-5 to BRS2-KC1-KIT-1 (folate). The parent BRS2(KC1) has disposition=established and applicability_mode=constrained-by. The KC atom already has ikc_membership=admitted and substance_id=vitamin-b9. The child lacks **disposition** and **relationship_type**; this is not an unresolved folate identity.

**Proposed author decision:** confirm this child as `disposition: established`, `relationship_type: conditional-constraint`, bounded to the existing deficiency/one-carbon-compromise animal evidence. Populate its existing canonical identity references (`substance_id: vitamin-b9`, `ikc_id: BRS2-KC1-KIT-1`) as reconciliation, retaining original evidence and source links. No parent applicability change.

This follows the actual established parent proposition. It must not claim a universal folate limitation, a ChAT cofactor role, extra-folate benefit in replete humans, or automatically add B12/betaine constituents. PM6-F6/F2 and Chan 2008, Crivello 2010, Jadavji 2014, Oda 1999 remain the sources. Region/age-dependent findings and mechanistic-inference limits stay intact. If this constituent-level decision is not approved, leave child status unset while preserving its current resource presentation.

## 4. Nine unresolved identities: distinct treatment

| PM / atom | Category | Exact proposed handling and decision |
|---|---|---|
| BRS2-FM1-PM4 / PM4-DIT-2: dietary protein | Broad source class | Preserve protein as source class and methionine as downstream constituent. Approve a typed source-class/constituent representation under the existing pending conversion review; do not rename protein to methionine or treat DIAAS methionine+cysteine as isolated methionine. No ordinary-source conversion efficiency. |
| BRS5-FM1-PM1 / PM1-DIT-2: fermentable dietary fibre | Heterogeneous functional class | Preserve unresolved class identity and proposed butyrate route. Require an exact supported substrate definition before constituent mapping; do not alias all fibre to inulin, pectin or resistant starch. Existing Silva 2020 scope is not universal fermentation/response evidence. |
| BRS5-FM1-PM2 / PM2-DIT-2: tested RS2 | Defined preparation/subtype | Retain tested RS2 identity and Zhang 2020 aged-mouse protocol. A parent relation to resistant-starch may be proposed, but is not an exact identity or food equivalence. Approve a preparation-aware identity representation before unblocking; do not simply set substance_id=resistant-starch and inherit foods. |
| BRS5-FM1-PM2 / PM2-DIT-3: fish-oil-containing meal | Studied mixed dietary matrix | Preserve meal/comparator as intervention identity, not a single substance. No DHA/EPA substitution. A typed matrix mapping can retain verified ingredients without attributing the outcome to them. Lyte 2016 lower-fat olive-oil-control differences were not significant. Any later reclassification requires separate approval. |
| BRS5-FM1-PM2 / PM2-DIT-4: milk-fat physical structure | Preparation characteristic | Preserve physical emulsification/comparator as protocol identity. Neither generic milk fat nor an emulsifier is an equivalent substance. Vors 2017 normal-weight subgroup null remains. Approve non-substance classification of the mapping issue, not migration of the existing admission. |
| BRS5-FM1-PM3 / PM3-DIT-1: oligofructose-enriched inulin | Defined mixture | Preserve the mixture. Existing inulin/oligofructose identities may be constituent references only, without separate efficacy claims or food inheritance. Exact formulation identity needs approval; preserve Schroeder 2018 combination null with NCC2705. |
| BRS5-FM1-PM3 / PM3-DIT-2: B. longum NCC2705 | Exact microbial strain | Use a strain-specific exposure identity, not a nutrient, species-wide probiotic or fermented food. Existing registry does not resolve the exact strain. Approve typed identity treatment; do not invent a strain record here. Preserve preclinical scope and absent penetrability/thickness restoration. |
| BRS5-FM3-PM7 / PM7-DIT-1: L. rhamnosus JB-1 | Exact microbial strain | Same strain-specific treatment, preserving original naming/aliases through verified taxonomy if subsequently registered. Do not replace with generic Lactobacillus/probiotic foods. Bravo 2011 and Kelly 2017 human null remain. |
| BRS5-FM3-PM8 / PM8-DIT-2: apple pectin studied preparation | Source-specific studied preparation | Preserve exact tested apple-pectin material (Sinha 2024). Existing pectin can be a parent identity, not equivalent whole apples or generic pectin intervention. Approve preparation-qualified parent mapping only after confirming representation prevents food inheritance. |

Registry inspection confirms generic pectin, resistant-starch and inulin identities exist; that does not resolve exact preparation identity. These nine are **not nine missing nutrient admissions**. Retain all original atom IDs, citations, null outcomes and projection holds until the appropriate identity decision is approved. Do not create records or move dietary interventions to SOPs in this task.

## Recommended approval sequence

1. Approve retention and extraction reconciliation for the five existing supply roles; explicitly approve the bounded folate child fields.
2. Confirm the two historical KC exclusions remain intentional; leave FOS/GOS review unresolved pending substantive adjudication.
3. Approve separation of non-substance source classes/matrices/strains from missing-substance errors. Request exact representation proposals before creating any new identity or lifting a projection hold.

No numerical ranking, admission, SEC, source value, hold or KC applicability changed. No build, deployment, PR change or commit. The 145 and 151 inventories remain intact.
