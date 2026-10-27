# BRAIN Diet V1 — food-target roll-up readiness

Baseline: published `main` at `87b8f11db40e8e998dccec0a3d2cb762dded3cd7` (merge of pull request #229). This audit reads that tree. It does not change scientific admissions, Scientific Evidence Confidence records, food composition, or production roll-ups.

The five reports:

- [This readiness report](brain-diet-v1-rollup-readiness.md)
- [Annex A — Foods by BRS and Cross-BRS](01-brs-cross-brs-foods.md)
- [Annex B — Consolidated food inventory](02-consolidated-food-targets.md)
- [Annex C — Patterns, SOPs and lifestyle levers](03-patterns-sops-lifestyle.md)
- [Annex D — Primary-mechanism research completeness](04-pm-research-completeness.md)

## Decision

A descriptive food inventory can be extracted for **36 of 64** primary mechanisms. Those 36 have at least one scientifically admitted dietary input with a verified quantitative food observation. The extraction has to keep Relative Source Power inside a single substance, unit, basis and food form, and it has to leave the field **PM-specific target dose / effective intake: Not established** on every row.

The same inspection shows that a framework-wide ranking, and a claim that intervention research is complete, would go beyond the records. **All 64** mechanisms need a further SOP or lifestyle pass. Forty-one have no system-optimisation-practice atom at all. Fifty-one have no lifestyle-priority atom. Twenty-three have at least one SOP atom, and those atoms still leave at least one of preparation, food-matrix context, meal timing or fermentation unrecorded. Nineteen mechanisms currently admit no dietary input. Fifteen admitted mechanisms still have a food-identity, food-coverage or projection-block gap. One mechanism, BRS5-FM2-PM5, carries an explicit unresolved scientific admission on the studied FOS/GOS preparation.

The practical recommendation is to use Annexes A and B as the V1 food inventory for the 36 ready mechanisms, and to keep Annexes C and D as the open intervention questions. A production ranking algorithm, a change of admission, a merge to `main`, and a production deploy are outside this audit.

## What was inspected

The canonical tree contains **64** primary-mechanism records with a `pm_id`, outside copied review folders. They fall into nine groupings that already exist in the repository:

| Grouping | Mechanisms |
| --- | ---: |
| BRS1 | 11 |
| BRS2 | 7 |
| BRS3 | 8 |
| BRS4 | 9 |
| BRS5 | 8 |
| BRS6 | 8 |
| Cross-BRS · Circadian | 2 |
| Cross-BRS · Endocannabinoid | 5 |
| Cross-BRS · Hormones | 6 |

The dietary layer on those records holds **233** structured relationships. **158** have `dietary_input: true`. **75** are biochemical, pool, or otherwise non-input relationships. Of the 158 admitted flags, **124** are scientifically admitted on a section 3.1.1 projection and **33** carry the dietary flag without that projection. Projection is how the published builder attaches foods. A dietary flag on a cofactor or pool section does not, by itself, create a food row.

Those 124 projections resolve to **55** canonical substance identities. After verified-mapping and projection-block filters, the extraction inventory contains **122** foods and **1,490** food–substance–mechanism rows. Sections 1.1 and 3.1 of the same atom count once. A food that supplies several substances to one mechanism counts once in that mechanism’s appearance total and once for each distinct substance in the target list.

Plant versus animal origin follows the food page. A page tagged Vegan is recorded as plant. A page without that tag is recorded as animal or mixed. That is the page’s own classification.

## How a food entered the inventory

A row is included when three gates agree.

The mechanism atom has `dietary_input: true`. The published projection then gives that relationship `scientific_admission: admitted` and a food target whose mapping status is verified. The food observation itself is a verified quantity: a finite point or a stated span, with the source fields the composition builder already requires. Presence-only text, research-supported provisional mappings, and atoms whose own record still says `projection_status: blocked` stay out of the extraction rows. They are listed separately in Annex B so the exclusion is visible.

Sixty-one provisional food rows were set aside. Twelve food attachments were set aside because the mechanism atom still blocks projection even though the substance registry now resolves the name. The builder records that clash as a stale missing-substance status and leaves the scientific admission unchanged. This audit follows the atom’s projection block for the extraction set.

Related-substance edges are one hop, and only where the catalogue already registers them: resistant starch toward acetate, propionate and butyrate; vitamin A toward retinoic acid; ellagitannins toward ellagic acid. Where the downstream substance is not an admitted dietary input, the food remains in Annex B as a related pathway and the quantity stays the measured intermediate. A resistant-starch span is a resistant-starch quantity. It is not a butyrate, acetate or propionate yield. A vitamin A amount is not a retinoic acid amount. An ellagitannin amount is not an ellagic acid amount and is not a urolithin amount.

## Relative Source Power

RSP is a reporting figure for this audit. It is not an approved production rank, and the annexes are not a request to install one.

For a verified point value:

**RSP = 100 × that food’s concentration / the highest verified point in the same group.**

A group is one canonical substance, one unit, one exact basis string, and one food form. The food-form split places dried, dehydrated, powdered, flour and mature-seed records in their own group. Fresh or as-recorded foods stay in theirs. Moisture-corrected, dry-weight, dry-matter and fresh-weight bases remain separate because their basis strings differ. A measurement span is shown and left unranked. A presence-only record is left unranked. A blank basis receives no RSP.

The highest food in a group has RSP 100. A sole source also has RSP 100, labelled sole source, because there is no second food on that basis. That label means the group cannot support a comparison. Dried, toasted nori is the example: its vitamin figures sit on the basis “per 100 g edible dried, toasted nori; not a typical serving”, so each of those RSP 100 values is a group of one.

The provisional reporting filter keeps at most five foods with RSP at least 10. It does not fill unused places. Annex B prints the full distribution beside that filter. Foods below the line remain visible. RSP values are not added across substances, and they are not multiplied by the number of mechanisms. A food that appears on 28 mechanisms is a food with 28 admitted links. It is not a food with 28 demonstrated effects.

Per 100 g concentration also ranks materials that are eaten in small amounts above foods that are eaten as meals. Turmeric at 55 mg iron per 100 g is the top of the as-recorded iron group, ahead of cockles at 16.2 mg. That order is a concentration order. It is not an iron-intake order, and the target dose remains unestablished. The same reading applies to spice and dried-herb rows elsewhere in Annex B.

## The nine groupings

**BRS1** has 11 mechanisms. Ten are ready for extraction: amino-acid supply, the one-carbon and methylation mechanisms that carry choline, folate and betaine, and the later BRS1 mechanisms with verified micronutrient or amino-acid foods. BRS1-FM1-PM2 is the exception inside this system. Its admitted input is the meal carbohydrate-to-protein pattern. That pattern has no canonical substance and no food targets. Single-food carbohydrate and protein numbers do not create the pattern.

**BRS2** has seven mechanisms, and all seven have at least one verified food link. The betaine mechanism is the clearest quantitative case. Raw beetroot, 129 mg per 100 g edible portion, is the sole verified point in the betaine group, so its reporting RSP is 100 as a sole source. Spinach, wheat germ and quinoa are connected to the same admitted betaine input, and the verified-point gate returns “value not known” for them, so they have no RSP. Shrimp remains a provisional canned mapping. The Zeisel assays are on the food pages. This inventory ranks only the beetroot point that passed the gate. BRS2 also still lacks ordinary-food coverage for dietary protein, for glycine links that are pending, and for N-acetylcysteine, whose conversion toward cysteine is unresolved and whose food-delivery assessment records no ordinary-food source.

**BRS3** has eight mechanisms. Five are ready (BRS3-FM2-PM4, PM5, PM6, and BRS3-FM3-PM7, PM8). The early BRS3 mechanisms carry admitted inputs, including oligofructose, without a verified ordinary-food equivalent. The admitted oligofructose exposure is a defined inulin-hydrolysate preparation. Native food fructan fractions do not stand in for that preparation. Two of those mechanisms do record an SOP for a tested fibre and fruit-rich mixed meal compared with a high-fat, high-carbohydrate meal. That SOP is a studied meal contrast. It is not a verified composition edge for a named food, and it is not an independent food effect.

**BRS4** has nine mechanisms. Four are ready (BRS4-FM1-PM1, PM2, PM3, and BRS4-FM2-PM5). Three admit no dietary input: ROS production and control, metabolic fuel switching, and mitochondrial biogenesis. The remaining mechanisms include L-carnitine and the nicotinamide and nicotinic acid vitamers, where named foods exist and the ontology link is still pending. An experimental carnitine and carbohydrate loading protocol is recorded as an SOP on the carnitine mechanism. The protocol is a studied exposure. It does not fill the missing food edge.

**BRS5** has eight mechanisms. Five are ready: gut-barrier integrity, the two mechanisms that carry the quantified resistant-starch foods, and BRS5-FM3-PM7 and PM8. Polyphenol biotransformation is the sentinel and is not ready; it is discussed below. The other two BRS5 mechanisms hold studied preparations and strains — oligofructose-enriched inulin, a named *Bifidobacterium*, and related blocks — without a verified ordinary-food roll-up.

Resistant starch on the ready BRS5 mechanisms is a verified span, not a point rank. Green or unripe bananas are 2.7–25.3 g per 100 g fresh weight. Black beans and chickpeas are 3–5 g per 100 g dry weight, cooked under study-specific conditions. Potatoes are 2.2–5.4 g per 100 g on a moisture-corrected basis, after baking or boiling and chilling to 4°C. These four spans stay unranked. They are not combined into one RSP. They are precursor composition. Butyrate on the gut-barrier mechanism has an unresolved admission, and butyrate on the short-chain fatty-acid mechanism is `dietary_input: false`. The annex therefore lists the starch foods as related upstream records and keeps the starch quantity in the quantity column.

Inulin has one verified point: asparagus spear, 1.3 g per 100 g dry matter, lyophilised edible spear, root excluded. Its RSP is 100 as the sole source on that dry-matter basis. Chicory root and Jerusalem artichoke remain outside that verified group. Apple pectin on BRS5-FM2-PM5 is still a provisional studied-cultivar mapping, so it has no RSP.

**BRS6** has eight mechanisms. Two are ready: BRS6-FM1-PM3 and BRS6-FM4-PM8. The other six admit no dietary input, including glucose appearance, glycaemic variability, cortisol rhythm, sympathetic and parasympathetic recovery, vagal tone, and stress-modulated appetite. Vagal tone does record a lifestyle atom for a twelve-week aerobic programme, with `dietary_input: false`. Glucose appearance records an SOP for a studied whey preload before a carbohydrate meal. Those atoms are real intervention records. They are not admissions that a named food delivers the mechanism’s target.

**Circadian** has two mechanisms, light–dark entrainment and feeding-time synchronisation. Neither has `dietary_input: true`. Feeding time is the subject of the second mechanism, and the dietary-input field is still empty. A meal-timing programme is not implied by the title.

**Endocannabinoid** has five mechanisms. Two are ready, NAPE to NAE biosynthesis and omega-3-derived endocannabinoidome signalling, which is where the DHA and EPA food links concentrate. FAAH-mediated preservation, dopamine neuromodulation, and stress-buffering capacity admit no dietary input. One early atom on the biosynthesis mechanism still carries a projection block; the ready flag comes from a separate verified food link, and the block remains a food-ontology gap on that atom.

**Hormones** has six mechanisms. Testosterone signalling stability is the one ready mechanism. Oestrogen signalling, the estrobolome, progesterone-supportive microbial metabolism, metabolic-reproductive integration, and androgen-microbiome regulation admit no dietary input. Several of those atoms also still say `missing-substance` and block projection. Microbial metabolism of a hormone is not, on these records, an admitted food supply.

## Top ten foods by distinct mechanism appearances

Appearance means distinct primary mechanisms on which the food has a verified, admitted food link. Shared micronutrients raise the count of foods that contain them. The RSP figures below are the strongest links at or above 10. Full distributions, including foods the filter leaves in view, are in Annex B.

1. **Salmon roe** — animal or mixed — **28** mechanisms across BRS1–BRS6, the endocannabinoid grouping and hormones. Targets include DHA, EPA, vitamin A, vitamin E, vitamin B12, folate, choline, phosphatidylcholine, iron, zinc, magnesium, copper and vitamin C. DHA is 2,000 mg per 100 g edible portion, RSP 100, rank 1 of 20. EPA is 1,600 mg per 100 g, RSP 100, rank 1 of 17. Vitamin B12 is 47 µg per 100 g, RSP 79.3, rank 2 of 35. Target dose: not established.

2. **Broccoli** — plant — **24** mechanisms, eight groupings. Vitamin C is 89.2 mg per 100 g edible portion, RSP 67.1, rank 4 of 75 in the as-recorded group. 5-Methyltetrahydrofolate is 101 µg per 100 g fresh edible material, RSP 35.1, rank 3 of 5 on that fresh-material basis. Potassium is 316 mg per 100 g, RSP 15.2, rank 56 of 124. The potassium rank shows why appearance count and RSP answer different questions: broccoli is widely linked, and its potassium concentration sits in the middle of a large group. Target dose: not established.

3. **Quinoa** — plant — **23** mechanisms. Magnesium is 197 mg per 100 g, RSP 46, rank 11 of 121. Folate is 184 µg per 100 g, RSP 38.4, rank 8 of 115. Vitamin B6 is 0.487 mg per 100 g, RSP 18.1, rank 13 of 117. Betaine is linked and unranked, because the point gate returned value not known. Target dose: not established.

4. **Milk** — animal or mixed — **22** mechanisms. The link at or above RSP 10 is the indispensable amino-acid supply, 1.447 g per 100 g, RSP 11.2, rank 13 of 15. Riboflavin, potassium, zinc and vitamin B12 on this food sit below 10 in their groups and remain in the full distribution. Uridine, flavin mononucleotide, pyridoxal 5′-phosphate and nicotinamide riboside are separate targets and are not folded into the amino-acid figure. Target dose: not established.

5. **Mussels** — animal or mixed — **22** mechanisms. Indispensable amino acids are 8.67 g per 100 g, RSP 67.4, rank 6 of 15. Selenium is 44.8 µg per 100 g, RSP 31.8, rank 8 of 104. Vitamin B12 is 12 µg per 100 g, RSP 20.2, rank 5 of 35. DHA is 253 mg per 100 g, RSP 12.7, rank 8 of 20. EPA is 188 mg per 100 g, RSP 11.8, rank 8 of 17. Target dose: not established.

6. **Chickpeas** — plant — **21** mechanisms. Folate, manganese and potassium ranks below are inside the mature-seed group, which is held apart from fresh foods. Folate is 557 µg per 100 g, RSP 100, rank 1 of 16 dry-form foods. Manganese is 4.15 mg per 100 g, RSP 52.8, rank 3 of 13. Potassium is 718 mg per 100 g, RSP 40, rank 12 of 16. Resistant starch is the unranked dry-weight span, 3–5 g per 100 g, and it is not given an RSP. Target dose: not established.

7. **Oysters** — animal or mixed — **21** mechanisms. Zinc is 39.3 mg per 100 g edible portion, RSP 100, rank 1 of 123 in the as-recorded zinc group. Vitamin B12 is 8.75 µg per 100 g, RSP 14.8, rank 9 of 35. Selenium is 19.7 µg per 100 g, RSP 14, rank 27 of 104. EPA is 177 mg per 100 g, RSP 11.1, rank 9 of 17. Target dose: not established.

8. **Black beans** — plant — **20** mechanisms. As with chickpeas, the point ranks are dry-form. Potassium is 1,483 mg per 100 g, RSP 82.5, rank 4 of 16. Folate is 444 µg per 100 g, RSP 79.7, rank 2 of 16. Zinc is 3.65 mg per 100 g, RSP 46.7, rank 12 of 16. Resistant starch is the unranked 3–5 g per 100 g dry-weight span. Target dose: not established.

9. **Chicken** — animal or mixed — **20** mechanisms across seven groupings. Indispensable amino acids are 12.865 g per 100 g, RSP 100, rank 1 of 15. Methionine is 0.493 g per 100 g, RSP 45.4, rank 4 of 5. Vitamin B6 is 0.35 mg per 100 g, RSP 13, rank 20 of 117. Selenium is 14.4 µg per 100 g, RSP 10.2, rank 33 of 104. Target dose: not established.

10. **Nori** — plant — **20** mechanisms. The high RSP figures are sole-source values on the dried, toasted basis, which states that 100 g is not a typical serving. Vitamin B6 is 0.59 mg, vitamin B2 is 2.33 mg, copper is 0.55 mg, and vitamin C is 210 mg, each RSP 100 in a group of one. Those figures are not ranks against fresh vegetables or fresh fish. Target dose: not established.

Spinach is just outside this ten, on 20 mechanisms, and is the right illustration of a wide target list with a qualified betaine row. Wheat germ is on 7 mechanisms and is in the same betaine position: linked, and unranked by the point gate.

## Patterns

One primary-mechanism input is typed as a dietary pattern: meal carbohydrate-to-protein composition on BRS1-FM1-PM2. It is `dietary_input: true` and scientifically admitted. It has no substance identity and no food targets. The composition builder also produced a single macronutrient candidate row from food tables across the seven scope builds. A food’s carbohydrate and protein values are ingredient figures. They do not establish a meal ratio, a target, or an effect of the pattern.

Other meal contrasts live as SOP atoms rather than as pattern inputs. The fibre and fruit-rich mixed meal versus a high-fat, high-carbohydrate comparison is recorded on BRS3-FM1-PM1, BRS3-FM1-PM2 and BRS5-FM1-PM2, tied to the Ghanim finding. The studied whey preload before a carbohydrate meal is an SOP on glucose appearance. The carnitine and carbohydrate loading protocol is an SOP on the carnitine mechanism. Each of these is a studied pattern component. None of them is a verified food-composition edge, and none of them is an independently demonstrated effect of an ordinary food in the ontology.

## System optimisation practices

The records contain **45** SOP atoms on **23** mechanisms. **41** mechanisms have an empty SOP list. An empty list means no SOP is admitted. It does not mean the question was investigated and closed, unless a practice-candidate adjudication says so.

The gut-barrier mechanism is the clearest positive case. It has an SOP atom for including dietary fat with provitamin-A vegetables, tied to findings and citations. Its candidate adjudications then narrow or hold the neighbouring ideas: gentle cooking of marine-fat sources is unresolved; preparing fermentable staples is consolidated into admitted upstream inputs because no independent preparation protocol was identified; traditionally fermented foods stay unresolved pending the trial product, the strains and the permeability contrast; pairing every fat-soluble compound with fat was narrowed to vegetable provitamin A; lowering alcohol exposure was retained; lowering ultra-processed food exposure and preferring daily consistency over resets stay unresolved. The lifestyle atom that matches the retained alcohol decision is “reduce alcohol exposure”, limited to the studied patient context. On the four-part scan of structured fields, this mechanism records preparation, matrix context and fermentation, and it does not record meal timing. That missing timing record is why the mechanism remains in the SOP-reassessment count even though it is ready for food extraction.

Across the 64 mechanisms the same scan finds timing to be the dimension most often absent. Fermentation is recorded only where the structured text actually contains it. A mechanism can be ready for a food list and still lack an SOP for how that food is prepared, combined, sequenced or fermented.

## Lifestyle levers

There are **17** lifestyle-priority atoms. **51** mechanisms have none. The atoms that exist are specific and bounded. Alcohol reduction on the gut barrier is one. Aerobic conditioning in a tested twelve-week programme on vagal tone is another, and that atom is explicitly not a dietary input. The audit did not add exercise, sleep or psychotherapy programmes to the mechanisms that lack these atoms. Absence of a lifestyle atom is a missing record. It is not a finding that the behaviour is irrelevant, and it is not a finding that a programme should be written.

Circadian light–dark entrainment and feeding-time synchronisation are the sharpest examples. Both are lifestyle-shaped mechanisms in ordinary language, and both have no lifestyle-priority atom and no dietary-input atom. The inventory leaves them there.

## Sentinel: polyphenol biotransformation

BRS5-FM2-PM6 admits three dietary inputs: ellagic acid, ellagitannins and epicatechin. It has three scientific findings. It has no SOP atom, no lifestyle atom and no practice-candidate adjudication. The findings state that urolithin conversion depends on the substrate and the microbial community, that finished-metabolite experiments do not validate microbial conversion, and that epicatechin conversion depends on the donor community. Donor cultures and juice matrices are limits inside those findings. They were not turned into a preparation method, a food-matrix rule, a meal sequence or a fermentation condition.

Ellagic acid and ellagitannins still have `canonical_identity.status: missing-substance` and `projection_status: blocked` on the mechanism. The substance registry now resolves both names, and the builder reports the identity as resolved while flagging the stale block. One ellagic food target and two ellagitannin food targets are attached downstream of that clash. This inventory does not treat those attachments as verified extraction rows. Epicatechin is identified and admitted, with seven food targets, and it contributes **zero** verified quantitative rows to the extraction inventory. The mechanism is therefore classified as food-ontology incomplete, SOP research incomplete, and lifestyle research incomplete. It is not in the 36.

That is the distinction the sentinel was chosen to force. Dietary admission of a substrate is in place. Evidence that a person can prepare, combine, time or ferment an ordinary food and thereby produce the metabolite is not in place. An empty SOP list here is an unfinished research layer.

## Highest-impact missing food relationships

These are the gaps that most change what a V1 food list can honestly say. They are ordered by how many downstream claims would be affected if they were filled in or quietly assumed.

1. **Projection blocks that the registry has outgrown.** Ellagic acid and ellagitannins on PM6 are the food-facing cases. The same block pattern appears on fermentable dietary fibre, on several BRS5 studied inputs, and on endocannabinoid and hormone atoms. Until the atom and the registry agree, foods attached by name resolution stay in the conflict list.

2. **Studied preparations with no ordinary-food equivalent.** Oligofructose is an inulin-hydrolysate preparation. The FOS/GOS studied preparation on BRS5-FM2-PM5 is the one relationship whose scientific admission is explicitly unresolved. Oligofructose-enriched inulin, named bacterial strains, and N-acetylcysteine are admitted without a verified food target. Native foods are not substitutes for those preparations.

3. **Provisional edges that are still doing compositional work in prose.** Apple pectin remains a studied-cultivar provisional mapping. Chicory root and Jerusalem artichoke inulin did not enter the verified inulin group. The verified inulin point is the asparagus spear on a dry-matter basis. Promoting the provisional roots into that group would change the rank on a basis the records have not verified.

4. **Named foods whose ontology link is pending.** Glycine on beef, nicotinamide and nicotinic acid on the studied chicken-breast material, and L-carnitine on beef are cited and unresolved as food edges. They are visible warnings, not roll-up rows.

5. **Admitted inputs with no substance identity.** The meal carbohydrate-to-protein pattern and dietary protein are scientifically admitted and have nowhere to attach a food. They need an identity decision before any food list can represent them.

6. **Qualified betaine quantities.** Beetroot at 129 mg per 100 g is the only verified betaine point in the ranking group. Spinach, wheat germ and quinoa are admitted food links with value not known at the point gate. Shrimp is provisional. A betaine rank that used the page narrative in place of the gate would mix qualified and verified assays. The bibliography keys for the Zeisel, Fabbri and Raatz assays are also still absent from the committed bibliography, which is a citation-resolution gap beside the quantities that already sit on the food pages.

7. **Short-chain fatty acids as if they were food contents.** Acetate, propionate and butyrate are not admitted food deliveries. The resistant-starch spans are the measured quantities, on three incompatible bases. Inulin is not registered as a butyrate yield. Pectin is not registered as a butyrate yield. FOS/GOS is not registered as a butyrate yield.

## Completeness counts

| Question | Count |
| --- | ---: |
| Primary mechanisms inspected | 64 |
| Ready for V1 dietary extraction | 36 |
| Food composition or ontology still incomplete | 15 |
| No currently admitted dietary contribution | 19 |
| Mechanistic admission explicitly unresolved | 1 (BRS5-FM2-PM5) |
| SOP research incomplete | 64 |
| Of which, no SOP atom | 41 |
| Of which, SOP atoms exist and a dimension is still absent | 23 |
| Lifestyle research incomplete | 51 |
| Needing SOP or lifestyle reassessment | 64 |

The union is 64 because every mechanism is missing a lifestyle atom or an SOP dimension, and most are missing both. Readiness for food extraction is independent of that union. A mechanism can be in the 36 and in the 64 at the same time. Gut-barrier integrity is the example: verified vitamin A and related mineral foods are extractable, and meal timing is still an empty SOP dimension.

The flags are workflow labels. They are not a new Scientific Evidence Confidence score. A finding that is `not-yet-scored` was not used as the reason for any flag.

The 36 ready mechanisms are:

- BRS1: FM1-PM1, FM1-PM3, FM1-PM4, FM1-PM5, FM2-PM6, FM3-PM7, FM4-PM9, FM4-PM10, FM4-PM11, FM5-PM12
- BRS2: FM1-PM1, FM1-PM2, FM1-PM3, FM1-PM4, FM2-PM5, FM2-PM6, FM3-PM7
- BRS3: FM2-PM4, FM2-PM5, FM2-PM6, FM3-PM7, FM3-PM8
- BRS4: FM1-PM1, FM1-PM2, FM1-PM3, FM2-PM5
- BRS5: FM1-PM1, FM2-PM4, FM2-PM5, FM3-PM7, FM3-PM8
- BRS6: FM1-PM3, FM4-PM8
- Endocannabinoid: ECS-PM1, ECS-PM2
- Hormones: Hormones-PM5

Annex D carries the flag set for every mechanism, including the 19 with no admitted dietary contribution and the 15 with an open food gap.

## What this audit kept intact

Scientific admissions, mechanism prose, food composition values, SEC records and production roll-ups were left as published. The unfinished bibliography stash that holds the Zeisel, Fabbri and Raatz keys was not applied. Pull request #228 was not modified. No merge and no production deploy was made from this reporting branch.

The reporting rules that kept the inventory inside the records were: deduplicate by canonical substance; count each food–mechanism pair once; rank only verified points inside one basis and one food form; leave spans unranked; leave provisional mappings out of RSP; leave projection-blocked atoms out of the extraction set; and refuse a metabolite quantity on a one-hop related edge.

## Recommendation

Proceed with the V1 food roll-up as a **descriptive inventory** for the 36 ready mechanisms, using Annex A for the nine groupings and Annex B for the consolidated foods, the full RSP distributions, the unranked starch spans, the provisional list and the projection-block list. Publish beside it the statement that the target dose is not established, and that RSP is a within-group concentration index.

Hold the framework-wide ranking algorithm. Hold any rewrite that would turn provisional inulin, provisional pectin, studied FOS/GOS, or resistant starch into a butyrate delivery. Hold SOP and lifestyle completion: 41 mechanisms have no SOP record, PM6 shows what that emptiness means, and 51 mechanisms have no lifestyle record. The next research pass is an adjudication of preparation, matrix, timing and fermentation on the mechanisms that already admit foods, plus an identity decision on the meal pattern, dietary protein, and the projection-blocked polyphenol atoms.

Stop here. The reports are the deliverable.
