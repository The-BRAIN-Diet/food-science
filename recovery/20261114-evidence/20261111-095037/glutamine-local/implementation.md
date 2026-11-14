# Glutamine composition integration · local candidate · 11 November 2026

**PASS — source-specific egg composition and unranked propagation. REVIEW REQUIRED — publication and additional food-form matches. FAIL — production release gate.**

## Primary and secondary evidence

[Lenders et al., methods and Table 2](https://pmc.ncbi.nlm.nih.gov/articles/PMC3249386/) modelled protein fractions using sequences, assumptions about relative abundance and food-specific protein mass. Missing fractions could be represented by similar proteins. Free amino acids were explicitly excluded; processing was not modelled. Table 2 gives grams per 100 g of the food reference, not per 100 g protein or dry matter. No preparation-specific uncertainty interval is supplied. The estimates concern protein-bound residues. “Estimated total glutamine” would incorrectly imply inclusion of the free fraction. No values were calculated from Glx, glutamate or a universal protein ratio.

[Cruzat et al., Table 1](https://www.mdpi.com/2072-6643/10/11/1564) rounds Lenders' figures. It contributes no independent composition measurement. Supplement studies and intestinal metabolism are separate from food composition.

| Table 2 food | Protein g/100 g | Estimated bound glutamine g/100 g study food | Local decision |
|---|---:|---:|---|
| Egg | 12.6 | 0.559 | Display the reference-egg estimate on the whole-egg record, with unspecified study preparation. Canonical whole raw egg has 12.56 g protein/100 g. No preparation-specific assay or ranking. |
| Beef | 25.9 | 1.231 | Include the study figure as context. Raw 85%-lean ground beef has 18.59 g protein/100 g. The page also has a broiled patty profile of similar protein density, but the paper does not identify that preparation. Both preparations lack a matched quantity. |
| Tofu | 6.6 | 0.603 | Include the reference value in notes. Canonical raw firm calcium-set tofu has 17.27 g protein/100 g. Firmness, coagulant and water content of the reference are unspecified. |
| Skim milk | 3.4 | 0.275 | Defer. The canonical milk panel is whole milk, 3.25% fat. |
| White rice | 2.7 | 0.301 | Defer. The canonical long-grain rice panel is raw with 7.13 g protein/100 g. Cooking and water basis of the reference are unresolved. |
| Corn | 2.5 | 0.406 | Defer. The canonical yellow sweet corn panel is raw with 3.27 g protein/100 g; the reference gives no variety or preparation. |

Lenders also reports a wheat-germ maximum, but its processing state and match to the crude wheat-germ record remain unverified. Protein-intake contributions and correlations for other foods do not supply food-specific concentrations.

[Wu et al., methods](https://academic.oup.com/jas/article/94/6/2603/4702294) separated free and peptide-bound amino acids. [Table 6](https://academic.oup.com/view-large/110153022) reports free glutamine (µg/g dry weight) of 5,661 for under-blade chuck roast, 4,028 for top round, and 5,069 for top loin. [Table 3](https://academic.oup.com/view-large/110153017) separately reports bound concentrations of 41.1, 44.5 and 44.8 mg/g dry weight. Neither cut identity nor analytical basis matches the raw ground-beef panel. No cross-cut moisture conversion, aggregate concentration or substitution was made.

## Canonical and public projections

The three food records each retain one contains edge. It resolves through a supplementary-source key to the food-table record, citing the original Table 2. Only the egg row has a numerical field, with method, fraction, denominator, source URL and ranking exclusion. Beef and tofu have qualitative rows and textual source-specific qualifications. The substance renderer follows the same key and respects public-display status. The original Lenders citation key was reused. The existing substance-page PM link, scientific findings, protocol and admission remain in place. BRS5-FM1-PM1::PM1-DIT-6 is the only glutamine input in the generated presentation mappings.

All configured mappings (BRS1–6 and BRS-X) were generated, then the Explorer, intervention rollup and development Wheel display assets. The Explorer retained 1,254 rows; all non-glutamine food rows compared equal. Three glutamine rows remain, one estimated and two presence-only. The current Wheel graph retained exactly the same 1,092 edge IDs, including all 835 ranked records unchanged. Three glutamine rows gained updated provenance or presentation; two apple rows and one walnut row gained prior approved source qualifications, and 28 related SCFA rows acquired existing food-group metadata. No food rank, downstream quantity or edge was added. The frozen embedded ranked snapshot was not regenerated. The project selector uses a top-ten cap; the supplied five-source ceiling has no numerical effect here because no glutamine source qualifies at either cap. One reference-food estimate with unspecified preparation does not establish a comparable two-food pool.

## Verification and limits

Chrome loaded the three candidate food pages, glutamine page, PM1, Explorer and Food Wheel. Egg, substance, PM and Explorer showed the original 0.559 value. Beef and tofu showed the distinctly qualified study-reference notes. The Wheel value was verified after opening its contributor evidence control. The first browser pass sampled body text and recorded navigation links; it did not click every reverse link. See [page checks](browser.json) and [interactive Wheel check](browser-final.json). The development client compiled; production rendering remains unverified.

The three new composition-to-view tests passed. The combined focused suite passed 48/50. The two failures were the registry fingerprint and the older PM4 resistant-starch hold expectation. Broader mapper tests passed 35/41. Bibliography validation passed. Nutrition validation still flags the same broccoli, shrimp and spinach labels. The standard production command stopped at the presentation precheck for NutritionTable, SubstanceFoods, the turkey-wing recipe and acetic-acid page. The numerical publication baseline also requires separate release reconciliation. No approvals or fingerprints were replaced. [Test log](final-tests.log) · [Build output](build.log) · [Implementation files](source-files.txt) · [Generated edge changes](edge-delta.json).

Generated files include each scope's src/data input mapping and system/generated input mapping reports, src/data/foodStrategyRollup.generated.json and its system/generated counterpart, static/explore/pm-explorer/pm-sources.json and static/explore/food-wheel/display-network.json and SVG. The original Codex and Cursor checkouts and prior recovery archives were not edited.

**Publication decision requested:** review the source-qualified whole-egg estimate and the two shared presentation-component changes. Additional quantitative food admissions need a matched food-form record. Release remains on hold.
