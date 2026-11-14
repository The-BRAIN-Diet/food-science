# Full dietary connectivity reconciliation — 9 November 2026

Local audit branch: `audit/dietary-connectivity-2026-11-09`, based on `af13bec172b5938098a46f85c06523b8a20e90dc`. PR238 and its deployed preview remain unchanged. No commit, push, merge or deployment performed. This is canonical-record verification, not new literature retrieval or SEC appraisal.

## What the original 25 actually counts

The wheel contains 68 included network identities, while its dietary ranking snapshot has 151 distinct PM–input-substance targets covering 55 distinct input identities. Those are different universes. The 25 counts distinct input identities with at least one selected food in the snapshot; it does **not** mean 25 scientifically classified Direct relationships. Food composition is a direct observation of the input even when the input's relationship to its receiving biological operation is Derived.

Across the 151 targets, 89 have explicitly Direct records, 30 explicitly Derived records, and 32 have accepted dietary flags but no explicit Direct/Derived classification. None has both classifications in these records. Do not silently classify the 32 from their section, upstream reference or biochemical role. Of the 98 currently ranked targets, 59 are Direct, 23 Derived and 16 unclassified. These counts retain the existing admissions; they do not endorse missing metadata.

## Coverage of the 68 network identities

These mutually exclusive audit categories describe the **unchanged preview**, using the more complete canonical source inspection performed here. Category precedence is ranked input, then verified Derived endpoint, then documented occurrence, then unresolved admitted route, then contextual/candidate-only.

| Category | Distinct identities | Meaning |
|---|---:|---|
| Ranked food inputs | 25 | At least one selected food in PR238; not synonymous with Direct PM classification |
| Additional verified Derived endpoints | 7 | Accepted input plus supported structured conversion and an explicitly matched active target; precursor composition remains precursor composition |
| Documented but unranked food occurrence, excluding the preceding groups | 21 | Food records exist; this alone does not establish an admitted food-to-PM route |
| Admitted/historical route with unresolved food or conversion connection | 10 | Incomplete traceability, not evidence of biological absence |
| Contextual/candidate-only in the inspected network | 5 | Acetate, acetic acid, propionate, SCFAs and urolithin A; preserve record-specific qualifications |
| **Total** | **68** | Distinct canonical identities, not edge totals |

The overlapping count of unranked identities with documented food-material records is **24**: the 21 above plus CoQ10, creatine and PLP. Do not add that overlapping number to the table. A food occurrence is not automatically the studied protocol or a qualified rank.

No record establishes a universal scientific claim that any of these substances has **no possible dietary route**. The audit identifies five contextual/candidate-only identities and ten unresolved admitted-route identities. Report that uncertainty rather than relabelling all fifteen as biologically non-dietary. Acetic acid has contextual vinegar/SOP links but no resolved direct dietary atom in this checkout; an intervention does not isolate its molecular mediator.

### Seven Derived endpoints

- **FAD:** admitted riboflavin conversion in PM-specific records, with RFK/FMN/FAD steps and original evidence.
- **PLP:** the fully structured B6 route in GABA PM9. Other B6 records retain their unresolved conversion warnings; one complete PM route does not resolve all PMs.
- **SAM:** admitted methionine-to-SAM routes in BRS2 PM7 and BRS4 PM3/PM10. Betaine, folate and other methylation resources are not silently converted into measured SAM quantities.
- **CoQ10:** PM10's admitted tyrosine precursor route, with its biosynthesis qualifications. No inferred food-to-mitochondrial delivery or clinical effect.
- **Creatine:** admitted arginine route with glycine/SAM dependencies. A connected precursor does not mean every required resource is supplied or a yield is established.
- **NAD+:** admitted nicotinamide-riboside route; its ordinary-food occurrence is qualitative, not a ranked dose or tissue-delivery measurement.
- **Acetoacetate:** admitted defined caprylic-triglyceride protocol. This is **protocol-specific**, not ordinary coconut-oil equivalence. Thus six endpoints have documented ordinary-food precursor connections; one has only the defined protocol route.

There are 14 distinct receiving PM–endpoint pairs across those verified routes. They must not be added to 151 as though all were original ranking targets. Only **BRS4-FM1-PM3 / creatine** is an additional covered endpoint within that exact 151-target denominator: 98 ranked or 99 ranked-or-verified-derived before the technical correction; 100 ranked or 101 ranked-or-verified-derived in the opt-in audit after correction. Ranked and incoming-Derived coverage do not overlap within that denominator here. Source records still mark downstream dietary admission separately; no new direct product admission is created.

## Priority findings and verified correction

**Phenylalanine:** approved food records already contain individual source-linked observations in `nutrition_amino_acid_profiles`. The mapper extracted the nine-amino-acid aggregate but omitted its explicitly reported constituents. The new adapter reads the individual value and original source row, preparation, basis and provenance without dividing protein or the aggregate. The same correction recovers methionine and tryptophan observations. Invalid profiles, missing constituent values and source holds remain excluded.

**Glycine:** not in the canonical nine-EAA profiles. Eight glycine backfill observations remain in the earlier unpublished reconciliation. They were not imported. A missing direct mapping cannot be repaired by inventing a glycine constituent in an EAA profile.

**Betaine:** five existing food-material sources are retained, with non-comparable basis/preparation metadata, held or unverified quantities and presence-only observations. The prior five proposed composition/metadata changes require source-level approval. No preparation or verification flag was manufactured to force a ranking.

**Glutathione:** outside the frozen 68; it is one of the eight excluded inventory entries. Existing precursor resources and KC evidence must be examined PM by PM. In BRS3-FM2-PM4, the canonical KC review explicitly leaves precursor-pool applicability unresolved; biochemical peroxidase use is not an admitted dietary-glutathione relationship. This audit does not override that decision or add a 69th node. Other PM precursor admissions remain intact and are represented through their own cysteine/glycine input records.

**Butyrate:** supported resistant-starch fermentation paths exist in substrate-production context. The path index correctly does not treat them as fully admitted downstream barrier/signalling pathways. The older BRS5 PM1 Derived entry retains unresolved identity/conversion metadata. Preserve the distinct microbial-production proposition and the measured faecal-concentration intervention; neither supplies a food-to-butyrate conversion yield or proves barrier mediation.

**Other mapping gaps:** 18 recorded Derived links lack a complete supported endpoint path in the current structured index. This is not automatically a software error: `derived-pathways.json` preserves their existing admissions, conversion status, evidence and limitations. Generic supported formation edges are retained as production context and cannot be promoted merely because a graph can be traversed.

## Technical impact — not published

| Metric | PR238 unchanged | Opt-in corrected audit |
|---|---:|---:|
| Selected foods | 64 | 65 |
| Ranked food–substance–PM connections | 800 | 890 |
| Ranked input identities | 25 | 26 |
| Ranked PM–substance targets | 98/151 | 100/151 |

Fourteen targets change their food selection: seven methionine, five tryptophan and two phenylalanine. Ninety edges are added; none removed. `ranking-impact.json` enumerates each food and receiving target. The adapter is implemented behind `includeProfileConstituents: true` in the shared mapper and enabled **only in this audit**. Default generation, the frozen ranked snapshot, PM presentation and wheel assets remain unchanged pending the owner's review. This avoids expanding the existing PR or silently activating revised coverage.

Activation would also require updating five older source-list fixture assumptions to the reviewed enlarged canonical observations; the dry run exposed those assumptions. No assertions were weakened. Default consumers still pass all previously passing tests.

## Proposed coverage presentation — not implemented

Use separate denominators and preserve overlaps in the detail view:

- **68 network targets** — frozen included identity set.
- **25 ranked food inputs** (26 after approved activation) — identities with selected foods, not Direct classification.
- **7 additional verified Derived targets** — six ordinary-food precursor routes and one defined protocol; no downstream quantities.
- **21 other documented unranked targets** (20 after activation moves phenylalanine to ranked).
- **15 requiring route resolution or remaining contextual/candidate-only** — ten unresolved and five contextual/candidate-only; not “no food sources”.

A separate PM-target metric can say **98/151 ranked input targets** (100 after activation), with classification and incoming-derived coverage shown separately. Framework membership is **6 BRS + 3 BRS-X groups**, not the eight systems reached by this ranked subset. Do not turn these audit categories into new public panels without presentation review.

## Decisions needed before further activation

1. Review the corrected amino-acid extraction and its 90 additional edges; approve activation in both PMs and wheel together after the existing top-ten PR is handled.
2. Review publication/integration of the 105 historical changes across 41 food records individually. Their existing local-implementation approvals remain valid and are retained per record. `unpublished-composition.json` retains original source values and statuses; this is not blanket approval. Some phenylalanine/tryptophan proposals may duplicate the now-recovered canonical profile and require deduplication instead of import.
3. Resolve the 32 unclassified accepted target records without inferring Direct/Derived labels automatically.
4. Review the 18 incomplete conversion links only where a source-level scientific decision or missing evidence is actually needed; do not auto-complete them from common biochemistry.
5. Any change to glutathione network inclusion, butyrate downstream applicability, defined supplement/mixture equivalence or the revised public summary requires its own scientific/presentation decision. Existing ten non-rankable target restrictions and generic-olive-oil hold remain intact.

## Deliverables and reproduction

- `SUBSTANCE-MATRIX.md` / `substance-matrix.json`: all 68 identities and provenance.
- `UNRANKED-43.md`: individual audit of all original 43, connected PMs, admitted inputs, limitations and blockers.
- `TARGETS.md` / `target-reconciliation.json`: all 151 targets, original classifications, upstream records, exact observations, ranks and before/after selections.
- `derived-pathways.json`: qualified endpoint routes, production-only context, blocked and incomplete links.
- `MAPPING-ISSUES.json`, `ranking-impact.json`, `unpublished-composition.json`, `NON-RANKABLE.md`: defects, held research, restrictions and scientific decisions.

Run `node scripts/audit-dietary-connectivity.mjs` to reproduce machine-readable coverage against the unchanged ranked snapshot and canonical records. Then `node --test scripts/dietary-connectivity.test.mjs`. Markdown commentary is reviewed interpretation of those outputs, not independent scientific authority.

## Validation

Seven focused connectivity tests pass: identities/targets, exact constituent provenance, invalid/held source exclusion, precursor/product separation, distinct counts, ranking rules and byte-for-byte preservation of canonical foods/PMs/SEC/wheel. Combined existing mapper/renderer/wheel suite: 90/94 pass, with exactly the same four documented pre-existing failures. Presentation contract: 691 protected files, passes. No production build, generation into active wheel assets, new server or external scientific retrieval was performed. No scientific admissions, quantities, classifications, PM missions, KC decisions or SEC history changed.

## Subsequent source reconciliation — supersedes gap interpretation above

The approved individual-amino-acid correction is now separate from this audit. See SOURCE-RECONCILIATION.md and FIRST-REVIEW-GROUPS.md. All 32 null-classification rows have explicit KC (27) or biochemical (5) layers; they are not automatically missing dietary classifications. All 18 conversions retain declared Derived routes but lack newer structured assessment records. Publication holds remain. The new audit retains these distinctions without changing canonical records or PR238.
