## Seed fatty-acid evidence

Primary analytical studies that resolve the chemical form of 18:3 in seeds and seed oils, assessed one paper at a time against a fixed acceptance rule.

This register exists because a database field labelled only `18:3` is chemically underspecified. It states a chain length and a count of double bonds and nothing else. Two fatty acids answering that description — alpha-linolenic acid (18:3 n-3) and gamma-linolenic acid (18:3 n-6) — are metabolically different, and at least eleven distinct octadecatrienoic acids occur across seed oils once conjugation and geometry are counted. USDA reports 18:3 under nutrient 1270 for most of our foods, which is exactly this underspecified field. Literature may supply the chemical form. It rarely supplies the quantity.

Rules: `system/food-nutrition-schema.md`. Source search: `system/nutrition-workflow.md`. Pages whose whole panel was withdrawn: `system/specialist-composition-review-queue.md`. Nutrient-level identity failures: `system/nutrient-provenance-review-queue.md`. Public ledger: `docs/dietary-foundations/nutrient-effects/food-composition-interpretation-register.md`.

---

### Acceptance rule

A paper resolves the isomer **only** where it explicitly writes one of: *alpha-linolenic acid*, *α-linolenic acid*, *ALA*, *18:3 n-3*, *18:3n-3*, *C18:3n3*, or the equivalent structure *9c,12c,15c-18:3* / *cis*-9,12,15-octadecatrienoic acid. The same test applies to gamma-linolenic acid: *gamma-linolenic acid*, *γ-linolenic acid*, *GLA*, *18:3 n-6*, *18:3n-6*, *C18:3n6*, *6c,9c,12c-18:3*.

"Linolenic acid" alone does not resolve the isomer. Bare `18:3` or `C18:3` does not resolve the isomer.

Two refinements, both learned from papers below rather than assumed in advance:

1. **Where the wording appears matters as much as whether it appears.** A paper may write "18:3 n-3" in its introduction as background about the crop in general and then report its own measurements as bare `C18:3`. That is not isomer resolution of anything the authors measured. Record the section the accepted wording appears in, and reject the paper where the resolved form is confined to background prose.
2. **Nomenclature is not resolving power.** Check that the instrument and the reference standards could have separated the isomers. A short packed column with no named standard cannot, whatever the introduction says.

### The proof case

Hemp is the reason the rule is strict rather than pedantic. Hemp seed genuinely contains both isomers, and Golimowski et al. 2022 report them in adjacent rows of one table.

| Cultivar | 18:3 n-3 (ALA) | 18:3 n-6 (GLA) | A generic `18:3` field would hold |
| --- | --- | --- | --- |
| Finola | 16.02 | 4.15 | 20.17 |
| Earlina 8FC | 18.05 | 3.43 | 21.48 |
| Secuieni Jubileu | 17.26 | 3.69 | 20.95 |

Per cent of total fatty acids in the pressed oil. Reading Finola's combined figure as alpha-linolenic acid would overstate omega-3 by about a quarter, and would book a quantity of n-6 as n-3.

Goldschmidt & Byrdwell 2021 extend the same point beyond the n-3/n-6 axis. Their Table 2 publishes an `18:3` row that is explicitly the sum of every 18:3 species found — conjugated isomers (punicic, α- and β-eleostearic, catalpic, jacaric, α- and β-calendic, plus 8c,10t,12t-18:3, which until recently was not known to occur naturally) together with non-conjugated geometric isomers of alpha-linolenic acid itself. A summed field of that kind is what "18:3" means in the absence of an isomer statement.

---

## Records

### Flax — *Linum usitatissimum*

#### Ribeiro et al. 2013 — accepted for identity, supplies no quantity

| Field | Finding |
| --- | --- |
| Species and material | *Linum usitatissimum*, named explicitly. Whole seeds **and** flours, reported separately. Lipid was solvent-extracted (petroleum ether, Soxhlet, AOCS Af 3-54); "seed" and "flour" denote what the lipid was extracted from, not a per-seed-weight basis |
| Whole seed or oil | Whole seed and flour, extracted lipid analysed |
| Cultivar and n | No cultivars. Colour classes only, yellow and brown. **n = 78: 38 whole seeds, 40 flours**, from two commercial suppliers in Curitiba, Paraná, Brazil |
| Oil content by seed weight | **NOT REPORTED.** Lipid was extracted gravimetrically but no figure is published. The only mention is qualitative |
| ALA | Accepted. "alpha-linolenic acid (ALA) 18:3ω−3" in the Introduction; "alpha-linolenic acid" in the Fig. 2 peak-identification caption. **47.1–48.7 per cent in whole seeds, 42.5–55.6 per cent in flours**, both as **per cent of total fatty acids** — §2.5 states "the data obtained were converted to a percentage of the total FAs measured" |
| GLA | **NOT MEASURED.** No 18:3 n-6 row, and the paper makes **no statement that GLA was absent** |
| Method and standards | GC-MS for identification (NIST library plus Sigma-Aldrich primary standards and the Supelco 37-component FAME mix); GC-FID for all quantification, by area normalisation with no internal standard and no response-factor correction |
| Measured or derived | Measured, as a ratio only |
| Defensible per-100 g value | **None.** With no oil content, the ratio cannot be converted without importing a denominator from another source |

Caveats. The accepted wording is confined to the Introduction, §3.1 and the Fig. 2 caption; the title, abstract and both tables use bare "linolenic" and "C18:3". Cite the Introduction or Fig. 2, not the tables. The stated seed floor of 47.1 cannot be reconciled with Table 2, whose lowest seed value is 47.02. The flour range is eight times wider than the seed range and spans blended commercial products from two suppliers, so it is not biological variability in flax.

#### Gómez-Cortés et al. 2016 — accepted for identity, oil only

| Field | Finding |
| --- | --- |
| Species and material | Linseed oil. The paper **never states a Latin binomial** — do not attribute one to it. Two commercial retail edible oils bought in Spanish supermarkets |
| Whole seed or oil | **Oil only. No seed was analysed** |
| Cultivar and n | None named. **n = 2 oils**, each analysed six times |
| Oil content by seed weight | Not applicable and NOT REPORTED |
| ALA | Accepted, and the strongest identification of any paper here. "α-Linolenic acid ((9Z,12Z,15Z)-octadeca-9,12,15-trienoic acid, ALA)"; Table 1 row "(9Z,12Z,15Z)-C18:3". **46.59 and 56.02 g/100 g of total fatty acid methyl esters** — note the basis is FAME, not fatty acids and not oil |
| GLA | **Measured and detected.** Table 1 row "(6Z,9Z,12Z)-C18:3": **0.02 g/100 g FAME in oil 2**, a dash in oil 1. The dash carries no stated limit of detection, so "absent from oil 1" is a table symbol, not a reported non-detect |
| Method and standards | GC-FID on a 100 m SLB-IL111 ionic-liquid column, plus GC-EIMS and CACI-MS/MS with acetonitrile reagent gas. Authentic **C18:3 n-3 and C18:3 n-6 standards** and a Supelco 4-7792 mixture containing **all eight geometric isomers of ALA**. n-3 versus n-6 confirmed independently by diagnostic ions, m/z 108 for n-3 and m/z 150 for n-6 |
| Measured or derived | Measured |
| Defensible per-100 g value | **None for seed.** This is an oil characterisation |

Why it still matters. It is the only source here that separates alpha-linolenic acid from its own geometric isomers in linseed, and it finds them at up to 7.75 g/100 g FAME combined in the more heat-damaged of the two oils, with ALA correspondingly depressed to 46.59 against 56.02. It also detects a trace of gamma-linolenic acid. So flax 18:3 is overwhelmingly but **not exclusively** alpha-linolenic acid, and processing shifts the balance. Read from the accepted NIH author manuscript, PMC4739793, not the typeset version.

#### Sargi et al. 2013 — accepted, and the only flax source giving both ratio and denominator

See the chia entry below; the paper covers chia, flax and perilla in one design. For flax it reports **golden flax 483.49 and brown flax 396.56 mg ALA per gram of total lipids**, with **total lipids 37.57 and 38.13 g/100 g seed** measured on the same samples.

### Walnut — *Juglans regia*

#### Yoshinaga-Kiriake et al. 2022 — accepted, the only isomer-resolved walnut source

| Field | Finding |
| --- | --- |
| Species and material | *Juglans regia* L., compared against *Juglans mandshurica* var. *sachalinensis*. Total lipid extracted from kernel by Folch chloroform/methanol, then called "walnut oil" |
| Whole seed or oil | Extracted kernel oil |
| Cultivar and n | **No cultivar.** One retail lot imported from the USA, bought in Japan. **n = 3 analytical replicates of a single composite sample** — no biological replication |
| Oil content by seed weight | **46.5 g oil per 100 g kernel**, stated in the same paper for the same sample. Markedly below the 54–72 per cent of the horticultural literature |
| ALA | Accepted. Table 1 row "α-linolenic acid (C18:3n3)". ***J. regia* 15.2**, labelled g/100 g oil. Do not transpose the 11.1 figure, which is *J. mandshurica*, or the 13.9 figure, which is the sn-2 positional value |
| GLA | **NOT MEASURED.** Six fatty acids reported, one of them explicitly n-3 |
| Method and standards | GC-FID, InertCap Pure-WAX 30 m. FAMEs by AOCS Ce 1b-89. Peaks identified against the **Supelco 37-component FAME mix**, which contains both 18:3 n-3 and 18:3 n-6 as separate components |
| Measured or derived | Measured |
| Defensible per-100 g value | **7,068 mg/100 g kernel, derived** — see the derivation section. Not reported by the paper |

Caveat that constrains the basis. The six Table 1 values sum to 99.7, and a genuine gravimetric mass per 100 g of oil should total nearer 95–96 because of the glycerol backbone. The figures behave as normalised percentages of total fatty acids that have been labelled "g/100 g oil". Record the basis as the paper states it, with that discrepancy attached.

#### Poggetti et al. 2018 — rejected for identity, accepted as an oil-content denominator

| Field | Finding |
| --- | --- |
| Species and material | *Juglans regia* L. Oil content by NMR on **whole intact kernels**; fatty acids on a separate Soxhlet petroleum-ether extract, so the two figures do not come from the same physical extract |
| Whole seed or oil | Both, by different routes |
| Cultivar and n | Wild accessions from Friuli Venezia Giulia, north-eastern Italy, across six climatic zones and 1–1073 m elevation, harvested 2013 and 2014. **58 in 2013, 166 in 2014, 35 common to both.** The abstract says 190 unique accessions; 58 + 166 − 35 is 189, and the paper does not reconcile this. Plus five named commercial cultivars as controls: Lara, Franquette, Hartley, Howard, Sorrento |
| Oil content by seed weight | **54.2–72.2 per cent w/w.** Wild 2013 65.3 ± 3.2 (56.2–71.6); wild 2014 66.3 ± 3.1 (54.2–72.2); cultivars 70.2 ± 1.62 (68.5–72.9). Per-accession values in its Table 3. **Dry-matter versus as-analysed basis is not stated**; moisture was about 3.5 per cent after drying |
| ALA | **REJECTED.** Never resolved anywhere — not in the abstract, methods, results, Tables 2–5 or figure captions. Its formal enumeration reads "palmitic (C16:0), stearic (C18:0), oleic (C18:1), linoleic (C18:2) and linolenic (C18:3) acids". The C18:3 values, 6.89–17.57 per cent of total fatty acids, must not be promoted to ALA |
| GLA | NOT MEASURED |
| Method and standards | GC-FID, 60 m HP-88. **Standards not named** — "identified by comparison with known standards" is the entire statement |
| Measured or derived | Measured |
| Defensible per-100 g value | None for ALA. Usable only as an oil-content denominator |

The journal is *Journal of the Science of Food and Agriculture*, not *Food Chemistry* and not *Journal of Food Composition and Analysis*.

### Chia — *Salvia hispanica*

#### Sargi et al. 2013 — accepted; covers chia, flax and perilla, not sesame

| Field | Finding |
| --- | --- |
| Species and material | *Salvia hispanica* L.; *Linum usitatissimum* golden and brown; *Perilla frutescens* white and brown. **Whole seeds**, ground to 50 mesh, total lipid by Bligh & Dyer |
| Whole seed or oil | Whole seed, extracted total lipid analysed |
| Cultivar and n | No cultivars, colour types only. Local producers in southern Brazil. **n = 3 analytical replicates per seed type**, one composite each |
| Oil content by seed weight | Reported for every sample: **chia 21.69 ± 0.21**, golden flax 37.57 ± 0.71, brown flax 38.13 ± 1.39, white perilla 40.12 ± 1.75, brown perilla 42.27 ± 1.69 g/100 g seed |
| ALA | Accepted. Table 2 row "18:3n-3 (LNA)", footnoted "LNA = alpha linolenic acid". **Chia 544.85 ± 6.84 mg per gram of total lipids**; golden flax 483.49 ± 8.12; brown flax 396.56 ± 9.44 |
| GLA | Accepted on naming — Table 2 carries a bare "18:3n-6" row with no trivial name. **Chia 1.98, golden flax 0.18, brown flax 0.17 mg/g lipids.** Treat with suspicion: identification is by retention time only with no MS, and flax and perilla are not recognised GLA-bearing seeds, so a small co-eluting peak is at least as likely |
| Method and standards | GC-FID, 100 m CP-7420 cyanopropyl column. Internal standard methyl tricosanoate with theoretical FID correction factors. Peak identification: "retention times were compared with those of standard methyl esters" — **no standard named** |
| Measured or derived | Measured |
| Defensible per-100 g value | Derivable within this one source — see below |

The chia oil content of 21.69 g/100 g is below the 25–38 per cent range the paper itself cites in its own introduction, and the authors note it. Any whole-seed estimate built on it will run low.

### Hemp — *Cannabis sativa*

We hold no hemp page. These records are kept for the acceptance rule they demonstrate.

#### Golimowski et al. 2022 — accepted; the clearest ALA/GLA separation available

| Field | Finding |
| --- | --- |
| Species and material | *Cannabis sativa* L. Whole unhulled uncrushed seed for fat content by Soxhlet; **cold-pressed and hot-pressed oils** for the fatty acid profile. Do not conflate the two |
| Whole seed or oil | Both, separately |
| Cultivar and n | **Finola (FIN-314), Earlina 8FC, Secuieni Jubileu**, harvested September 2021 from a Polish plantation. Six oil samples, three cultivars × two pressing temperatures, each in triplicate |
| Oil content by seed weight | Finola 30.45 ± 0.85, Earlina 29.47 ± 0.84, Secuieni Jubileu 31.03 ± 1.03 g/100 g seed |
| ALA | Accepted. Table 3 row "C18:3 n-3"; discussion "α-linolenic acid (C18:3 n-3)". **16.02, 18.05 and 17.26 per cent of total fatty acids** in the pressed oil |
| GLA | Accepted. Table 3 row "C18:3 n-6"; discussion "γ- linolenic acid (C18:3 n-6)". **4.15, 3.43 and 3.69 per cent.** The discussion text says an upper bound of 4.14, which contradicts its own table; 4.15 is correct |
| Method and standards | GC-FID, 100 m HP-88, AOCS Ce 2-66. **FAME standards not named**, though the sterol section of the same paper does name its standards |
| Measured or derived | Measured |
| Defensible per-100 g value | Not applicable, no page |

Two naming errors in this paper would corrupt an automated ingest: it calls C20:0 "arachidonic acid", which is arachidic acid, and it lists "C20:2 n-9" where seed oils carry 20:2 n-6. Twenty-nine days from submission to acceptance.

#### Alonso-Esteban et al. 2023 — could not be verified, not usable

*Journal of Food Composition and Analysis* 115:104962. Closed access with no repository deposit anywhere, so the claim that it separately identifies ALA and GLA **could not be checked**. Its abstract names α-linolenic acid but is silent on GLA; the only GLA wording in the accessible text is a literature citation in the introduction. Its authors are González-Fernández, Fabrikov, Sánchez-Mata, Torija-Isasa and Guil-Guerrero — not Pinela, Morales, Barros and Ferreira, who belong to a different 2022 *Food Chemistry* paper by the same lead author that **contains no fatty acid analysis at all**.

A better-fitting lead, abstract-level only and unverified: Alonso-Esteban et al. 2020, *Eur. J. Lipid Sci. Technol.* 122(7):1900445, which writes "γ-linolenic acid (GLA, 18:3, n-6)" and gives 0.5–4.5 per cent of total fatty acids across hemp varieties.

### Ribes — blackcurrant and relatives

We hold no blackcurrant page. Both records are blocked on access.

#### Piskernik et al. 2018 — naming accepted, no values obtainable

*LWT* 98:424–427, closed access, no repository copy. Covers *Ribes nigrum*, *R. rubrum*, *R. uva-crispa* and jostaberry across 20 cultivars from one Slovenian station. Resolves all three of ALA ("α-linolenic acid (ALA, 18:3, n-3)"), GLA ("γ-linolenic acid (GLA, 18:3, n-6)") and stearidonic acid ("SDA, C18:4, n-3"), and reports an n-6/n-3 ratio, which is only computable if the isomers were separated. **Every numeric ALA and GLA value sits in paywalled tables.** Seed oil 17.6–22.4 per cent, basis not stated. Authors are Piskernik, Vidrih, Demšar, Koron, Rogelj and Pajk Žontar — note the double surname, which Crossref corrupts to "Žontar, T.P.". Jostaberry conclusions rest on a single cultivar.

#### Bakowska-Barczak et al. 2009 — abstract only

*J. Agric. Food Chem.* 57(24):11528–11536, closed access. Five *Ribes nigrum* cultivars from western Canada. GLA **11 per cent (Ben Conan) to 17 per cent (Ben Tirran)**, with the **basis not stated in the abstract**. Oil 27–33 per cent of seed, basis not stated. No ALA value available. Separation of the isomers is nonetheless proven by the reported triacylglycerol species "αLnLγLn", a single molecule carrying one of each.

Its 27–33 per cent oil content conflicts with Piskernik's 17.6 per cent for the same species. That must be resolved before either is used as a denominator.

### Method reference

#### Goldschmidt & Byrdwell 2021 — accepted, methodological

*Separations* 8(4):51, USDA-ARS Beltsville, CC BY, fully verified against its own tables. Seven seed oils containing conjugated fatty acids, lipid extracted from ground seed by Folch for six of them. GC-FID and GC-MS with positive-ion chemical ionisation, on two complementary columns, against Nu-Check Prep GLC 68B and GLC 463 and a Sigma-Aldrich L6031 standard carrying **all eight geometric isomers of 9,12,15-18:3**.

Its value here is the demonstration, not the foods. It shows that co-elution on a single column hid an entire isomer in four of its seven samples; that acidic derivatisation reagents and even the GC inlet can create *trans* isomers that were not in the sample; and that its own `18:3` row is an explicit sum across species. γ-Ln was 0.00 in all seven samples, and that is a standard-backed negative rather than a silent non-detection, because the GLC 463 standard contained it.

It carries no *Ribes*, no hemp and no GLA. Cite it for "a bare 18:3 field is underspecified", not for anything about the n-3/n-6 split in a particular food.

---

## Rejected

| Paper | Why |
| --- | --- |
| Dogan & Akgül 2005, *Grasas y Aceites* 56(4):328–331 | The string "18:3 n-3" appears **once, in the Introduction**, as generic background about walnut oil citing prior literature. The authors' own Results say "linolenic (C18:3)" and the Table 2 footnote defines the variable as "C 18:3 :Linolenic acid". Independently, the instrument could not have resolved the isomers: a 2.1 m packed DEGS column run isothermally at 200 °C, with **no identification standard named anywhere**. Its oil content, 65–70 per cent, is on a **dry-weight** basis |
| Poggetti et al. 2018 | Rejected for identity only; retained above as an oil-content denominator |
| Fernandes et al. 2018, *Grasas y Aceites* 69(2):e256 | Already cited on the avocado-oil page for oleic identity. Its own fatty-acid results and the Woolf range it quotes say "linolenic (C18:3)". It never writes 18:3 n-3 / ALA in what it measured, despite using the Supelco 37 mix and naming ω-isomers for C18:1 and C16:1 |

Both are recorded rather than discarded, because "we checked this one and it does not qualify" is the finding.

---

## Deriving a per-100 g amount

Where a paper reports a ratio and an oil content **measured on the same samples**, a whole-seed amount follows:

> ALA per 100 g seed = oil g per 100 g seed × ALA fraction of the oil

Every value produced this way is **derived**, is our arithmetic and not the paper's, and must be labelled as such wherever it appears. Two constraints:

- **Never cross sources for the two terms.** Taking one paper's ratio and another's fat content manufactures a number that neither measured. This is not hypothetical: Ribeiro's Brazilian cultivars run 47.1–48.7 per cent of total fatty acids where both USDA datasets put flax 18:3 at 57 per cent, so combining Ribeiro's ratio with USDA's fat would have produced a figure that looks plausible and is arrived at wrongly.
- **Watch the denominator.** Per cent of total fatty acids, per cent of FAME, per cent of oil and grams per 100 g of oil are four different bases. Fatty acyl chains are roughly 95–96 per cent of triacylglycerol mass, so treating "per cent of total fatty acids" as "per cent of oil" is wrong by about the glycerol fraction.

Derivations available from the records above, none of them published by their source:

| Seed | Source | Oil content | ALA fraction | Derived, per 100 g seed |
| --- | --- | --- | --- | --- |
| Chia | Sargi et al. 2013 | 21.69 g/100 g | 544.85 mg/g lipids | **11,817 mg** |
| Flax, golden | Sargi et al. 2013 | 37.57 g/100 g | 483.49 mg/g lipids | **18,165 mg** |
| Flax, brown | Sargi et al. 2013 | 38.13 g/100 g | 396.56 mg/g lipids | **15,121 mg** |
| Walnut | Yoshinaga-Kiriake et al. 2022 | 46.5 g/100 g kernel | 15.2 g/100 g oil | **7,068 mg** |

For comparison, and not as a component of any of the above: USDA SR Legacy holds flax at 22,813 mg of 18:3 (now published as interpreted ALA), walnuts at 9,080 mg of 18:3 (now published as interpreted ALA), and chia at 17,830 mg of published ALA. The derived figures run low in every case, and in each the reason is visible in the source — Sargi's chia oil content is below the range the paper itself quotes, and Yoshinaga-Kiriake's kernel oil content of 46.5 g/100 g is well under the 54–72 per cent of the walnut literature. Single retail lots, not population estimates.

The corroborative flax range 19–25 g/100 g (about 35–45 g oil × ~0.55 ALA) is the same arithmetic. It is **not** the published flax figure. USDA already reports a whole-seed 18:3 quantity per 100 g; multiplying fat × fraction would replace it with a derived estimate and would treat 55% of fatty acids as if that were 55 g per 100 g of seed.

Gandova, Teneva, Petkova, Iliev & Stoyanova 2023 (*Applied Sciences* 13(18):10141, DOI 10.3390/app131810141) reports **α-linolenic acid 57.5%** of fatty acids in one Bulgarian flaxseed oil, with 1.4% unsaponifiable matter. Isomer-resolved naming, oil only, no seed-weight oil yield in the paper. It corroborates identity and the ~57% share; it does not supply the published 22.8 g.

---

## What this changes for our pages

**Flax — resolved by combined provenance.** The public row is **22.8 g ALA per 100 g***, USDA SR Legacy FDC 169414 nutrient 1270 (22,813 mg unqualified 18:3) interpreted as 18:3 n-3. Internally `ala_mg: 22813` replaces `pufa_18_3_unresolved_mg` so recipes consume it; the mg field is `internal-only` so the table does not also show 22,813.0 mg. The asterisked 22.8 g row names both sources and states that the figure is not a single ALA assay, not Foundation 2262075's 19.42 g (ground seed, different fat), and not 55 g per 100 g of seed. Identity: Foundation 2262075 nutrient 1404, Ribeiro et al. 2013, Gómez-Cortés et al. 2016. Quantity: this SR Legacy record only.

**Walnut — resolved by combined provenance.** Public row **9.08 g ALA per 100 g***. Quantity: SR Legacy FDC 170187 nutrient 1270 (9,080 mg). Identity: Kafkas et al. 2017 and Yoshinaga-Kiriake et al. 2022. Foundation FDC 2346394 still has no 1404 and is not used. Yoshinaga-Kiriake's derived 7,068 mg remains corroborative only.

**Soy cluster — resolved by combined provenance.** Mature soybeans, tofu, tempeh, natto and miso each publish their own SR Legacy 1270 milligrams as ALA. Identity is USDA soybean oil FDC 171411 nutrient 1404 (6.789 g/100 g oil; GLA nutrient 1321 = 0), not a paper that says only "linolenic (C18:3)". The oil's 6.789 g is not copied onto any of those pages. Soy/tofu/natto/miso 18:3 is ~6.7% of that record's fat, matching the oil; tempeh is ~2.3% and that difference is left standing. Fermented hot sauce and fermented vegetables still cite fuyu tofu — wrong food; their 18:3 is not closed.

**Chia.** Already publishes 17,830 mg ALA from a record that carried 1404. Sargi is corroboration of chemical form, not a correction.

**Spirulina — must not be closed as ALA.** SR Legacy FDC 170495 reports 823 mg of nutrient 1270 and no 1404 or 1321. Cyanobacterial literature treats 18:3 as GLA (18:3 n-6), with ALA often absent — the inverse flax case. The milligrams stay unresolved and are not published as GLA either, because this record does not name the isomer. Otles & Pire 2001 is the usual primary citation; full text was not re-verified in this pass.

**Avocado oil — must not be closed as ALA.** Fernandes et al. 2018 (already on the page) writes "linolenic (C18:3)" in the Woolf identity range and in its own discussion; it never names 18:3 n-3 in what it measured, even though it used the Supelco 37 mix and did name ω7/ω9/ω11 for C18:1 and C16:1. Independently, avocado **fruit** SR Legacy FDC 171705 reports both 1404 (0.111 g ALA) and 1321 (0.015 g GLA), so fruit 18:3 is not a single isomer. The oil record has only 1270.

**Hemp and Ribes.** No pages. Retained as the demonstration that this rule is load-bearing.

**Sesame / tahini.** Foundation FDC 2262073 (*Sesame butter, creamy*) reports 1404 = 0.25 g, but that is not the roasted-kernel tahini record on the page, and SR Legacy sesame oil (FDC 171016) has 1270 only. Left unresolved.

**Ruminant fats (ghee, lamb, milk, parmesan).** Butter SR Legacy already publishes ALA from nutrient 1404 (0.315 g) while the same record's unqualified 1270 is 1.18 g — most of dairy 18:3 is not ALA. Foundation cheeses report both 1404 and 1321. Ghee FDC 173412 has 1270 only. Not closed.

---

## Corrections to earlier entries

The flax page and its bibliography entry previously stated that Ribeiro et al. found "no gamma-linolenic (18:3 n-6) among the acids found". **This overstated the source.** Ribeiro did not measure GLA, does not report a 18:3 n-6 row, and makes no statement of absence anywhere. The claim has been narrowed to what the paper supports. Both have also been corrected to say 38 whole seeds and 40 flours rather than "78 flax seed samples", which mirrored the paper's own loose wording.

Two further corrections of record, neither previously published by us: Gómez-Cortés et al. 2016 has four authors and includes neither Sacristán nor Juárez; Poggetti et al. 2018 is in *Journal of the Science of Food and Agriculture*, not *Food Chemistry*.
