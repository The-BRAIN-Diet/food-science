# Canonical phytate and oxalate — 5 November 2026

Owner explicitly requested creation/reuse of two canonical substance pages using the current template. Neither identity nor page existed. Created phytate and oxalate under existing bioactive-compounds; no category, component, tab or new presentation structure introduced. Representative authored examples are the two new pages themselves, matching Overview → Dietary Context → Foods → Recipes → References from the current schema. No BRS section without an admitted mapping.

## Identity and relationships

Registry aliases resolve documentation, not quantitative chemical equivalence. Phytate uses phytic-acid reference CID 890 (acid formula and depiction explicitly identified); lower inositol phosphates are not aliases. Oxalate uses dianion CID 71081; acid CID 971 and salts remain distinct forms in prose. PubChem API verified formulas/InChIKeys and supplied depictions. Existing Functional Properties phytate_content and oxalate_content now name the canonical related_substances IDs. Their pre-existing BRS hints are not promoted into PM admissions; no PM mapping added. Phytate's contextual link to existing iron-provision SOP is not a positive support edge.

## Verified qualitative food links

- Amaranth → phytate and oxalate: original Hejazi 2016 abstract, indexed by AGRIS/National Agricultural Library, verifies measured constituents and germination effects. Full methods unavailable via publisher/Scite; extraction, fractions and comparable quantity unresolved. Native/malted experimental grain is not a generic cooked serving. Added canonical identity fields and contains edges; preserved prior provenance. No numeric composition, food ranking or absorbed amount inferred.
- Spinach → oxalate: original Heaney 1988 abstract explicitly reports calcium and oxalate measurements in the test food. Its preparation is not established from that abstract; qualitative edge does not transfer a numeric value to a raw/cooked food state.
- No other food connections manufactured. Amaranth and spinach prose now distinguish binding/processing from demonstrated absorption. Amaranth table labels have canonical substance IDs; no new renderer or link layer was introduced.

## Sources and access

- PubChem CID 890, 71081, 971: PUG property responses verified; images retrieved from the matching compound endpoints.
- Hejazi et al., DOI 10.1016/j.jcs.2015.11.007: primary abstract at https://agris.fao.org/search/en/providers/122535/records/65dfb92e0f3e94b9e5dbb23d ; publisher restricted and Scite returned no body. Not full-text verification.
- Hurrell et al., DOI 10.1093/ajcn/77.5.1213: existing original-source appraisal reused for matrix-specific human iron absorption, not mineral binding alone.
- Heaney et al., DOI 10.1093/ajcn/47.4.707, PMID 3354496: original abstract, human double-isotope food comparison. Not an isolated oxalate intervention or proof for amaranth.
- Chai and Liebman, DOI 10.1021/jf048128d, PMID 15826055: original abstract supports preparation-dependent soluble-oxalate loss. No specific analytical method or spinach reduction percentage assigned without full methods.

## Validation scope

Added both pages to substance validation. Corrected validator to follow the existing conditional BRS-heading rule; mapped pages still require that section. This avoids inventing a BRS relationship merely to pass a structural check. A focused regression covers both cases. No schema relaxation of evidence/admission rules.

Current explicit page-creation authorization is recorded for these two files only in the presentation ledger, with no baseline regeneration. No PM admissions, SEC scores, commits, pushes or deployment. Validation results appended after checks.

### Completed checks

- Substance validation: six registered pages pass, including both new pages; inverse food safeguards pass.
- Substance schema regression suite: 9/9 pass.
- Presentation contract: pass, 691 baseline files; two explicitly authorised additions, no baseline regeneration.
- Registry identity, citation-key existence, image existence, MDX compile and unique qualitative food edges: pass.
- All 106 protected PM/SEC files match task-start hashes.
- BRS1 mapping regenerated: 0 conflicts, 15 reported gaps; none mentions phytate or oxalate. This is not a claim of a gap-free framework.
- No production build or deployment.
