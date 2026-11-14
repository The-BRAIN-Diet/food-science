# Tyrosine animal-source reconciliation — 9 November 2026

Local implementation on `audit/dietary-connectivity-2026-11-09`; no commit/push/deployment. Author confirmed top ten and compatible edible-preparation comparisons.

## Findings

The immediate cause was not plant-only biology or a ranking cap. The original ranked target contained only soy, pumpkin seeds and tofu. Cheddar, parmesan and tempeh were rejected because preparation parsing returned null. Verified ordinary USDA panels now retain unspecified preparation as metadata while joining the same chemical identity and per-100-g edible basis. Explicit holds, qualified analytical records, dry-weight bases and chemical forms still retain their existing gates.

A second, independent omission was composition coverage: 23 existing animal pages lacked the tyrosine row present in their exact existing USDA record. The nutrient importer already recognises tyrosine; the food pages had incomplete amino-acid imports. Nine foods already had phenylalanine in separate EAA profiles but lacked panel tyrosine (beef, chicken, eggs, milk, mussels, salmon, sardines, tuna, turkey). Some profiles describe a different cut/preparation; no profile quantity was transferred.

One canonical `tyrosine` ID is retained. Values are total food tyrosine, not free supplemental L-tyrosine, phenylalanine, an absorbed dose or evidence of functional benefit. No PM admission, mission, SEC or Finding changed. Existing tyrosine targets remain BRS1 PM1/PM2/PM3/PM4 and BRS4 PM10.

## Sources and exact-match method

Reused the saved official [USDA SR Legacy April 2018 tables](https://fdc.nal.usda.gov/download-datasets/), joining food.csv → exact canonical FDC ID and food description → food_nutrient.csv → nutrient.csv Tyrosine, with derivation codes. Raw extracts and source row IDs are in `usda-audit.json`. No external secondary concentration was imported. USDA SR Legacy contains analytical and derived values; database verification does not make every row an independent assay. Beef AR is regression-derived, turkey PAK is physical-composition-derived, oysters RA is recipe-derived. Missing derivation codes remain explicitly unspecified.

## Coverage

| Measure | Before | After |
|---|---:|---:|
| Audited animal-food pages with panel tyrosine | 2 / 36 | 25 / 36 |
| PM1 selected tyrosine sources | 3 | 10 |
| Existing tyrosine PM targets covered | 5 | 5 |
| Tyrosine food–substance–PM triples | 15 | 50 |
| Shared ranked snapshot total triples | 960 | 995 |
| Shared ranked snapshot unique foods | 70 | 71 |
| Shared ranked covered targets | 112 / 151 | 112 / 151 |
| Local wheel ranked triples (older reference universe) | 800 | 835 |
| Local wheel available foods, all display layers | 91 | 92 |

The wheel intentionally retains its separate older baseline for unrelated targets; only tyrosine is refreshed from the current shared snapshot. The five tyrosine targets have identical foods, observations, powers and ranks across PM dropdowns, Explorer and runtime wheel. Frozen index.html/canonicalNetworks reference snapshot is unchanged. Other amino-acid rankings are byte-equivalent to before.

## Shared top ten

| Rank | Food | Tyrosine mg/100 g edible portion | RSP % | Preparation/material |
|---|---|---:|---:|---|
| 1 | parmesan-cheese | 1995 | 100.00 | Cheese, parmesan, hard |
| 2 | soy | 1539 | 77.14 | Soybeans, mature seeds, raw |
| 3 | cheddar-cheese | 1108 | 55.54 | Cheese, cheddar (Includes foods for USDA's Food Distribution Program) |
| 4 | pumpkin-seeds | 1093 | 54.79 | Seeds, pumpkin and squash seed kernels, dried |
| 5 | anchovies | 975 | 48.87 | Fish, anchovy, european, canned in oil, drained solids |
| 6 | sardines | 831 | 41.65 | Fish, sardine, Atlantic, canned in oil, drained solids with bone |
| 7 | liver | 807 | 40.45 | Beef, variety meats and by-products, liver, raw |
| 8 | tuna | 787 | 39.45 | Fish, tuna, fresh, bluefin, raw |
| 9 | salmon | 759 | 38.05 | Fish, salmon, Atlantic, farmed, raw |
| 10 | tofu | 701 | 35.14 | Tofu, raw, firm, prepared with calcium sulfate |

The selection contains seven animal and three plant identities. Raw/canned/other edible measurements compete without converting between preparations. Amounts retain their specific preparation. No serving-size or clinical ranking is implied.

## All existing animal records audited

| Food | Existing/recovered mg/100 g | FDC record | Disposition |
|---|---:|---|---|
| anchovies | 975 | [174183](https://fdc.nal.usda.gov/food-details/174183/nutrients) | Exact USDA quantity recovered |
| beef | 572 | [171796](https://fdc.nal.usda.gov/food-details/171796/nutrients) | Exact USDA quantity recovered |
| butter | 41 | [173430](https://fdc.nal.usda.gov/food-details/173430/nutrients) | Exact USDA quantity recovered |
| cheddar-cheese | 1108 | [173414](https://fdc.nal.usda.gov/food-details/173414/nutrients) | Existing quantity retained |
| chicken | 597 | [171447](https://fdc.nal.usda.gov/food-details/171447/nutrients) | Exact USDA quantity recovered |
| clams | 597 | [174214](https://fdc.nal.usda.gov/food-details/174214/nutrients) | Exact USDA quantity recovered |
| cockles | Not verified | [169803](https://fdc.nal.usda.gov/food-details/169803/nutrients) | No tyrosine row in exact USDA record |
| cod | 601 | [171955](https://fdc.nal.usda.gov/food-details/171955/nutrients) | Exact USDA quantity recovered |
| crab | Not verified | [2747670](https://fdc.nal.usda.gov/food-details/2747670/nutrients) | Unresolved source identity or non-SR source |
| dark-meat-poultry | Not verified | No exact SR identity | No tyrosine row in exact USDA record |
| egg-yolks | 678 | [172184](https://fdc.nal.usda.gov/food-details/172184/nutrients) | Exact USDA quantity recovered |
| eggs | 499 | [171287](https://fdc.nal.usda.gov/food-details/171287/nutrients) | Exact USDA quantity recovered |
| ghee | 14 | [173412](https://fdc.nal.usda.gov/food-details/173412/nutrients) | Exact USDA quantity recovered |
| grass-fed-butter | Not verified | No exact SR identity | No tyrosine row in exact USDA record |
| greek-yogurt | Not verified | [171304](https://fdc.nal.usda.gov/food-details/171304/nutrients) | No tyrosine row in exact USDA record |
| heart | Not verified | [168625](https://fdc.nal.usda.gov/food-details/168625/nutrients) | No tyrosine row in exact USDA record |
| herring | 606 | [175116](https://fdc.nal.usda.gov/food-details/175116/nutrients) | Exact USDA quantity recovered |
| kefir | Not verified | [170904](https://fdc.nal.usda.gov/food-details/170904/nutrients) | No tyrosine row in exact USDA record |
| kidney | Not verified | [169449](https://fdc.nal.usda.gov/food-details/169449/nutrients) | No tyrosine row in exact USDA record |
| lamb | 556 | [174370](https://fdc.nal.usda.gov/food-details/174370/nutrients) | Exact USDA quantity recovered |
| liver | 807 | [169451](https://fdc.nal.usda.gov/food-details/169451/nutrients) | Exact USDA quantity recovered |
| lumpfish-roe | Not verified | No exact SR identity | No tyrosine row in exact USDA record |
| mackerel | 628 | [175119](https://fdc.nal.usda.gov/food-details/175119/nutrients) | Exact USDA quantity recovered |
| milk | 159 | [171265](https://fdc.nal.usda.gov/food-details/171265/nutrients) | Exact USDA quantity recovered |
| mussels | 381 | [174216](https://fdc.nal.usda.gov/food-details/174216/nutrients) | Exact USDA quantity recovered |
| oysters | 202 | [171978](https://fdc.nal.usda.gov/food-details/171978/nutrients) | Exact USDA quantity recovered |
| parmesan-cheese | 1995 | [170848](https://fdc.nal.usda.gov/food-details/170848/nutrients) | Existing quantity retained |
| pork | 676 | [167818](https://fdc.nal.usda.gov/food-details/167818/nutrients) | Exact USDA quantity recovered |
| salmon-roe | Not verified | No exact SR identity | Unresolved source identity or non-SR source |
| salmon | 759 | [175167](https://fdc.nal.usda.gov/food-details/175167/nutrients) | Exact USDA quantity recovered |
| sardines | 831 | [175139](https://fdc.nal.usda.gov/food-details/175139/nutrients) | Exact USDA quantity recovered |
| scallops | 296 | [174220](https://fdc.nal.usda.gov/food-details/174220/nutrients) | Exact USDA quantity recovered |
| shrimp | 515 | [174210](https://fdc.nal.usda.gov/food-details/174210/nutrients) | Exact USDA quantity recovered |
| trout-roe | Not verified | No exact SR identity | No tyrosine row in exact USDA record |
| tuna | 787 | [173706](https://fdc.nal.usda.gov/food-details/173706/nutrients) | Exact USDA quantity recovered |
| turkey | 672 | [171480](https://fdc.nal.usda.gov/food-details/171480/nutrients) | Exact USDA quantity recovered |

## Ranking exclusions

| Food | Reason |
|---|---|
| butter | Below the provisional one-tenth threshold inside this basis. |
| ghee | Below the provisional one-tenth threshold inside this basis. |
| milk | Below the provisional one-tenth threshold inside this basis. |
| egg-yolks | Qualifies but outside maximum 10; equal-power ties use canonical food ID |
| pork | Qualifies but outside maximum 10; equal-power ties use canonical food ID |
| turkey | Qualifies but outside maximum 10; equal-power ties use canonical food ID |
| tempeh | Qualifies but outside maximum 10; equal-power ties use canonical food ID |
| mackerel | Qualifies but outside maximum 10; equal-power ties use canonical food ID |
| herring | Qualifies but outside maximum 10; equal-power ties use canonical food ID |
| cod | Qualifies but outside maximum 10; equal-power ties use canonical food ID |
| chicken | Qualifies but outside maximum 10; equal-power ties use canonical food ID |
| clams | Qualifies but outside maximum 10; equal-power ties use canonical food ID |
| beef | Qualifies but outside maximum 10; equal-power ties use canonical food ID |
| lamb | Qualifies but outside maximum 10; equal-power ties use canonical food ID |
| shrimp | Qualifies but outside maximum 10; equal-power ties use canonical food ID |
| eggs | Qualifies but outside maximum 10; equal-power ties use canonical food ID |
| mussels | Qualifies but outside maximum 10; equal-power ties use canonical food ID |
| scallops | Qualifies but outside maximum 10; equal-power ties use canonical food ID |
| oysters | Qualifies but outside maximum 10; equal-power ties use canonical food ID |

## Remaining gaps and publication boundaries

Eleven gaps remain: cockles, crab, dark-meat-poultry, grass-fed-butter, Greek yoghurt, heart, kefir, kidney, lumpfish roe, salmon roe and trout roe. Exact SR records lack tyrosine or the page uses a different/no database record. Targeted official-source searches for heart, kidney, Greek yoghurt and snow-crab IDs did not yield additional verifiable original tyrosine data. No CIQUAL or MEXT quantities were substituted; this is not a claim that those databases lack data. No egg-white page was created. Further source recovery must match species, cut and preparation.

Only existing canonical food pages were edited. Existing values, other nutrients, beef creatine/CoQ10 holds and source identities preserved. Canonical composition approvals are not deployment approval. The global publication-approved file-hash manifest is deliberately unchanged; this local reconciliation needs source/presentation review before a full publication generation.

## Validation

- 35 focused source, mapper, wheel, Explorer, USDA extractor and composition-provenance checks passed; an additional PM HTML-rendering test passed (36 total).
- Exact top-ten consistency verified across PM shared selector, Explorer and runtime wheel, including quantities/powers.
- Browser: Explorer shows ten tyrosine foods; wheel shows ten contributors across five PM targets and two systems, 50 ranked triples.
- Existing unrelated failures retained: presentation checker reports `src/theme/SubstanceFoods/index.tsx` from the preceding FOS/GOS import; measured-unranked test still expects PM4 resistant starch to be blocked; older PM documented-food test harness cannot require the existing SCFA ES module. No scientific record altered to clear them.
- No production build or deployment.

## Files changed in this task

23 food pages (those marked recovered above); shared mapper `scripts/lib/input-substance-food.mjs`; scoped generator `scripts/reconcile-tyrosine-sources.mjs`; BRS1/BRS4 generated source maps; shared ranked snapshot; Explorer generated sources; local wheel display generator and JSON/SVG; regression tests and this report. The wheel baseline HTML, PM source files, substance registry, SEC and Findings were not changed.

## Preview

[Explorer](http://127.0.0.1:3180/explore/pm-explorer/?brs=BRS1&pm=BRS1-FM1-PM1&sub=tyrosine) · [Wheel](http://127.0.0.1:3180/explore/food-wheel/?substance=tyrosine)

## Author-approved display ordering

Explorer food columns now group plant foods before animal foods, with selected ranked foods in descending comparable concentration (existing rank) within each group. Canonical food classification reuses the PM source helper. Unranked sources retain their separate evidence labels and are not assigned numerical ranks. Selection, quantities, powers and global ranks are unchanged. Tyrosine order is soy, pumpkin seeds, tofu; parmesan, cheddar, anchovies, sardines, liver, tuna, salmon. Focused ordering/immutability regression added; Explorer and tyrosine consistency tests pass. Local-only presentation change; no publication.
