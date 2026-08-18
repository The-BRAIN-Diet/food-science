## ALA / omega-3 repair: before-and-after audit

Every food page that carried `ala_mg` or `omega3_mg`, with the source field each stored value actually came from.

Regenerate with `node scripts/repair-ala-omega3.mjs --baseline --markdown`. The "before" column is read from the last commit, so this table can be rebuilt after the repair has been applied.

### What changed

| | Pages |
| --- | --- |
| Audited | 137 |
| ALA removed — no explicit 18:3 n-3 in the source | 100 |
| ALA restored or corrected from nutrient 1404 | 10 |
| ALA confirmed unchanged | 22 |
| Stored value traced to an amino acid | 99 |
| Stored value traced to an unqualified 18:3 | 5 |
| Total omega-3 removed — no identified n-3 component | 89 |
| Total omega-3 recalculated from named components | 33 |
| Queued for identity or provenance review | 6 |

Ninety-nine of the 137 pages were publishing an amino acid as an omega-3 fatty acid. Alanine accounted for most; phenylalanine accounted for the four mushroom pages.

Ten pages gained a **correct** ALA they had never shown, because the true 18:3 n-3 value sat in the record beside the amino acid that had been taken instead. Butter is the clearest: 29 mg of alanine was published where the record states 315 mg of 18:3 n-3.

Totals rose on some fish pages rather than falling, because a total assembled only from ALA, EPA and DHA had been omitting DPA. Salmon moves from 2114 mg to 2507 mg — the earlier figure included 148 mg of ALA but no DPA at all.

### Reading the table

- **Resolved source nutrient** — the field in the food's own record that the stored number actually matches.
- **Components summed** — every n-3 acid the record explicitly identified. This is now recorded on the page itself as `omega3_components`; a total that cannot name its parts is not published.
- **—** in a value column means the field is absent. It never means zero.

| Page | FDC | Old ALA | Resolved source nutrient | New ALA | Old n-3 | New n-3 | Components summed | Disposition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `almonds` | 170567 | 3 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 3 | 3 | 3 | 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `amaranth` | 170682 | 42 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 42 | 42 | 42 | 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `apples` | 171688 | 9 | unqualified PUFA 18:3, 9 mg — isomer unstated | — | 9 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `asparagus` | 168389 | 10 | unqualified PUFA 18:3, 10 mg — isomer unstated | — | 10 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `aubergine` | 169228 | 13 | unqualified PUFA 18:3, 13 mg — isomer unstated | — | 13 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `avocado-oil` | 173573 | 957 | unqualified PUFA 18:3, 957 mg — isomer unstated | — | 957 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `avocado` | 171705 | 111 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 111 | 111 | 111 | 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `bananas` | 173944 | 40 | alanine, 40 mg — an amino acid, not a fatty acid | — | 40 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `barley` | 170283 | 486 | alanine, 486 mg — an amino acid, not a fatty acid | — | 486 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `beef` | 171796 | 42 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 42 | 45 | 57 | 22:6 n-3 (DHA) + 20:5 n-3 (EPA) + 22:5 n-3 (DPA) + 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `beetroot` | 169145 | 60 | alanine, 60 mg — an amino acid, not a fatty acid | — | 60 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `bell-peppers` | 170108 | 26 | alanine, 26 mg — an amino acid, not a fatty acid | — | 26 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `black-beans` | 173734 | 905 | alanine, 905 mg — an amino acid, not a fatty acid | — | 905 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `black-pepper` | 170931 | 152 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 152 | 152 | 152 | 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `blueberries` | 171711 | 31 | alanine, 31 mg — an amino acid, not a fatty acid | — | 31 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `broccoli` | 170379 | 104 | alanine, 104 mg — an amino acid, not a fatty acid | — | 104 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `brussels-sprouts` | 170383 | 98 | phenylalanine, 98 mg — an amino acid, not a fatty acid | — | 98 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `buckwheat` | 170286 | 748 | alanine, 748 mg — an amino acid, not a fatty acid | — | 748 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `butter` | 173430 | 29 | alanine, 29 mg — an amino acid, not a fatty acid | 315 | 29 | 315 | 18:3 n-3 (ALA) | restored from nutrient 1404, the explicit 18:3 n-3 field |
| `cabbage` | 169975 | 42 | alanine, 42 mg — an amino acid, not a fatty acid | — | 42 | — | — | ALA removed; the stored value was an amino acid |
| `cacao-powder` | 169593 | 941 | phenylalanine, 941 mg — an amino acid, not a fatty acid | — | 941 | — | — | ALA removed; the stored value was an amino acid |
| `carrots` | 170393 | 113 | alanine, 113 mg — an amino acid, not a fatty acid | — | 113 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `cashews` | 170162 | 837 | alanine, 837 mg — an amino acid, not a fatty acid | — | 837 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `cauliflower` | 169986 | 116 | alanine, 116 mg — an amino acid, not a fatty acid | 15 | 116 | 15 | 18:3 n-3 (ALA) | restored from nutrient 1404, the explicit 18:3 n-3 field |
| `chamomile-tea` | 174156 | — | — | — | 0 | — | — | no ALA stored; unchanged |
| `cheddar-cheese` | 173414 | 100 | no field in the record matches the stored value | 108 | 111 | 137 | 22:6 n-3 (DHA) + 20:5 n-3 (EPA) + 22:5 n-3 (DPA) + 18:3 n-3 (ALA) + 20:3 n-3 | restored from nutrient 1404, the explicit 18:3 n-3 field |
| `cherries` | 171719 | 590 | no field in the record matches the stored value | — | 590 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `chia-seeds` | 170554 | 17830 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 17830 | 17830 | 17830 | 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `chicken` | 171447 | 1089 | alanine, 1089 mg — an amino acid, not a fatty acid | — | 1129 | 50 | 22:6 n-3 (DHA) + 20:5 n-3 (EPA) + 22:5 n-3 (DPA) | ALA suppressed; 18:3 retained as chemically unresolved |
| `chickpeas` | 173756 | 882 | alanine, 882 mg — an amino acid, not a fatty acid | — | 882 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `chicory-root` | 169992 | 41 | phenylalanine, 41 mg — an amino acid, not a fatty acid | — | 41 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `cinnamon` | 171320 | 11 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 11 | 11 | 11 | 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `clams` | 174214 | 15 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 15 | 122 | 129 | 22:6 n-3 (DHA) + 20:5 n-3 (EPA) + 22:5 n-3 (DPA) + 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `cocoa` | 169593 | 941 | phenylalanine, 941 mg — an amino acid, not a fatty acid | — | 941 | — | — | ALA removed; the stored value was an amino acid |
| `coconut-oil` | 171412 | 19 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 19 | 19 | 19 | 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `cod` | 171955 | 1077 | alanine, 1077 mg — an amino acid, not a fatty acid | — | 1261 | 194 | 22:6 n-3 (DHA) + 20:5 n-3 (EPA) + 22:5 n-3 (DPA) | ALA suppressed; 18:3 retained as chemically unresolved |
| `cordyceps-mushroom` | 2003603 | 671 | phenylalanine, 671 mg — an amino acid, not a fatty acid | — | 671 | — | — | suppressed — cites FDC 2003603, Mushroom, beech — a different species |
| `corn` | 169998 | 295 | alanine, 295 mg — an amino acid, not a fatty acid | 14 | 295 | 14 | 18:3 n-3 (ALA) | restored from nutrient 1404, the explicit 18:3 n-3 field |
| `cranberries` | 171722 | 49 | alanine, 49 mg — an amino acid, not a fatty acid | — | 49 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `cucumber` | 168409 | 24 | alanine, 24 mg — an amino acid, not a fatty acid | — | 24 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `dark-chocolate` | 170273 | 34 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 34 | 34 | 34 | 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `dark-meat-poultry` | 171637 | 650 | alanine, 650 mg — an amino acid, not a fatty acid | 205 | 659 | 239 | 22:6 n-3 (DHA) + 20:5 n-3 (EPA) + 22:5 n-3 (DPA) + 18:3 n-3 (ALA) + 20:3 n-3 | restored from nutrient 1404, the explicit 18:3 n-3 field |
| `duck-fat` | 174467 | 1088 | alanine, 1088 mg — an amino acid, not a fatty acid | — | 1088 | — | — | ALA removed; the stored value was an amino acid |
| `edamame` | 168410 | 421 | alanine, 421 mg — an amino acid, not a fatty acid | — | 421 | — | — | ALA removed; the stored value was an amino acid |
| `egg-yolks` | 172184 | 836 | alanine, 836 mg — an amino acid, not a fatty acid | — | 961 | 125 | 22:6 n-3 (DHA) + 20:5 n-3 (EPA) | ALA suppressed; 18:3 retained as chemically unresolved |
| `eggs` | 171287 | 36 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 36 | 94 | 102 | 22:6 n-3 (DHA) + 22:5 n-3 (DPA) + 18:3 n-3 (ALA) + 20:3 n-3 | confirmed against nutrient 1404 |
| `fermented-hot-sauce` | 174280 | 334 | alanine, 334 mg — an amino acid, not a fatty acid | — | 334 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `fermented-vegetables` | 174280 | 334 | alanine, 334 mg — an amino acid, not a fatty acid | — | 334 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `flax-seeds` | 169414 | 925 | alanine, 925 mg — an amino acid, not a fatty acid | — | 925 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `fortified-plant-milks` | 172221 | — | — | — | 0 | — | — | no ALA stored; unchanged |
| `garlic` | 169230 | 132 | alanine, 132 mg — an amino acid, not a fatty acid | — | 132 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `ghee` | 173412 | 10 | alanine, 10 mg — an amino acid, not a fatty acid | — | 10 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `ginger` | 169231 | 31 | alanine, 31 mg — an amino acid, not a fatty acid | — | 31 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `grapes` | 174683 | 22 | alanine, 22 mg — an amino acid, not a fatty acid | — | 22 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `grass-fed-butter` | 173430 | 29 | alanine, 29 mg — an amino acid, not a fatty acid | 315 | 29 | 315 | 18:3 n-3 (ALA) | restored from nutrient 1404, the explicit 18:3 n-3 field |
| `greek-yogurt` | 171304 | 23 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 23 | 27 | 27 | 22:6 n-3 (DHA) + 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `heart` | 168625 | 11 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 11 | 11 | 11 | 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `herring` | 175116 | 1086 | alanine, 1086 mg — an amino acid, not a fatty acid | — | 2657 | 1626 | 22:6 n-3 (DHA) + 20:5 n-3 (EPA) + 22:5 n-3 (DPA) | ALA suppressed; 18:3 retained as chemically unresolved |
| `jerusalem-artichokes` | 169236 | — | — | — | 0 | — | — | no ALA stored; unchanged |
| `kale` | 168421 | 147 | phenylalanine, 150 mg — an amino acid, not a fatty acid | — | 147 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `kefir` | 170904 | 6 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 6 | 6 | 7 | 22:5 n-3 (DPA) + 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `kidney-beans` | 175193 | 988 | alanine, 988 mg — an amino acid, not a fatty acid | — | 988 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `kidney` | 169449 | 7 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 7 | 7 | 7 | 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `lamb` | 174370 | 996 | alanine, 996 mg — an amino acid, not a fatty acid | — | 996 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `leeks` | 169246 | 74 | alanine, 74 mg — an amino acid, not a fatty acid | — | 74 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `lemon-balm-tea` | 167802 | 6 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 6 | 6 | 6 | 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `lentils` | 172420 | 1029 | alanine, 1029 mg — an amino acid, not a fatty acid | — | 1029 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `lions-mane-mushroom` | 1999626 | 703 | phenylalanine, 703 mg — an amino acid, not a fatty acid | — | 703 | — | — | ALA removed; the stored value was an amino acid |
| `liver` | 169451 | 7 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 7 | 7 | 7 | 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `lumpfish-roe` | — | 100 | no source identifier on the page | — | 600 | — | — | suppressed — no fdc_id, provenance unestablished |
| `lupin-beans` | 172423 | 1296 | alanine, 1296 mg — an amino acid, not a fatty acid | — | 1296 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `lupins` | 172423 | 1296 | alanine, 1296 mg — an amino acid, not a fatty acid | — | 1296 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `mackerel` | 175119 | 1125 | alanine, 1125 mg — an amino acid, not a fatty acid | — | 3424 | 2511 | 22:6 n-3 (DHA) + 20:5 n-3 (EPA) + 22:5 n-3 (DPA) | ALA suppressed; 18:3 retained as chemically unresolved |
| `maitake-mushroom` | 169403 | 124 | alanine, 124 mg — an amino acid, not a fatty acid | — | 124 | — | — | ALA removed; the stored value was an amino acid |
| `mct-oil` | 748278 | 7450 | Oil, canola, a substituted record | — | 7450 | — | — | suppressed — cites FDC 748278, Oil, canola — a different food |
| `milk` | 171265 | 107 | alanine, 107 mg — an amino acid, not a fatty acid | — | 107 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `miso` | 172442 | 500 | alanine, 500 mg — an amino acid, not a fatty acid | — | 500 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `mushrooms` | 169251 | 199 | alanine, 199 mg — an amino acid, not a fatty acid | — | 199 | — | — | ALA removed; the stored value was an amino acid |
| `mussels` | 174216 | 720 | alanine, 720 mg — an amino acid, not a fatty acid | — | 1161 | 463 | 22:6 n-3 (DHA) + 20:5 n-3 (EPA) + 22:5 n-3 (DPA) | ALA suppressed; 18:3 retained as chemically unresolved |
| `natto` | 172443 | 798 | alanine, 798 mg — an amino acid, not a fatty acid | — | 798 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `nori` | 168458 | 651 | alanine, 651 mg — an amino acid, not a fatty acid | — | 731 | 80 | 20:5 n-3 (EPA) | ALA suppressed; 18:3 retained as chemically unresolved |
| `nutritional-yeast` | 167717 | 0 | unqualified PUFA 18:3, 0 mg — isomer unstated | — | 0 | — | — | stored zero removed; an unmeasured nutrient is unknown, not absent |
| `oats` | 169705 | 881 | phenylalanine, 895 mg — an amino acid, not a fatty acid | — | 881 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `olives` | 169094 | 43 | alanine, 43 mg — an amino acid, not a fatty acid | — | 43 | — | — | ALA removed; the stored value was an amino acid |
| `onions` | 170000 | 21 | alanine, 21 mg — an amino acid, not a fatty acid | — | 21 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `oranges` | 169097 | 50 | alanine, 50 mg — an amino acid, not a fatty acid | — | 50 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `oregano` | 171328 | 500 | alanine, 500 mg — an amino acid, not a fatty acid | 621 | 500 | 621 | 18:3 n-3 (ALA) | restored from nutrient 1404, the explicit 18:3 n-3 field |
| `oyster-mushroom` | 168580 | 239 | alanine, 239 mg — an amino acid, not a fatty acid | — | 239 | — | — | ALA removed; the stored value was an amino acid |
| `oysters` | 171978 | 271 | alanine, 271 mg — an amino acid, not a fatty acid | — | 584 | 323 | 22:6 n-3 (DHA) + 20:5 n-3 (EPA) + 22:5 n-3 (DPA) | ALA suppressed; 18:3 retained as chemically unresolved |
| `parmesan-cheese` | 170848 | 1048 | alanine, 1048 mg — an amino acid, not a fatty acid | — | 1048 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `parsley` | 170416 | 195 | alanine, 195 mg — an amino acid, not a fatty acid | — | 195 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `peanuts` | 172430 | 1025 | alanine, 1025 mg — an amino acid, not a fatty acid | — | 1025 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `peas` | 170419 | 240 | alanine, 240 mg — an amino acid, not a fatty acid | — | 240 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `peppermint` | 173474 | 195 | alanine, 195 mg — an amino acid, not a fatty acid | — | 195 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `pistachios` | 170184 | 973 | alanine, 973 mg — an amino acid, not a fatty acid | — | 973 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `pork` | 167818 | 1158 | alanine, 1158 mg — an amino acid, not a fatty acid | — | 1158 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `potatoes` | 170026 | 81 | phenylalanine, 81 mg — an amino acid, not a fatty acid | — | 81 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `pumpkin-seeds` | 170556 | 120 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 120 | 120 | 120 | 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `quinoa` | 168874 | 588 | phenylalanine, 593 mg — an amino acid, not a fatty acid | — | 635 | 47 | 22:6 n-3 (DHA) | ALA suppressed; 18:3 retained as chemically unresolved |
| `reishi-mushroom` | 2003603 | 671 | phenylalanine, 671 mg — an amino acid, not a fatty acid | — | 671 | — | — | suppressed — cites FDC 2003603, Mushroom, beech — a different species |
| `rice` | 169756 | 413 | alanine, 413 mg — an amino acid, not a fatty acid | — | 413 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `rosemary` | 173473 | 172 | phenylalanine, 169 mg — an amino acid, not a fatty acid | — | 172 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `saffron` | 170934 | — | — | — | 0 | 6 | 22:5 n-3 (DPA) | no ALA stored; unchanged |
| `sage` | 170935 | — | — | — | 0 | — | — | no ALA stored; unchanged |
| `salmon-roe` | 175132 | 1428 | alanine, 1428 mg — an amino acid, not a fatty acid | — | 3774 | 2428 | 22:6 n-3 (DHA) + 20:5 n-3 (EPA) + 22:5 n-3 (DPA) | ALA suppressed; 18:3 retained as chemically unresolved |
| `salmon` | 175167 | 148 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 148 | 2114 | 2507 | 22:6 n-3 (DHA) + 20:5 n-3 (EPA) + 22:5 n-3 (DPA) + 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `sardines` | 175139 | 1489 | alanine, 1489 mg — an amino acid, not a fatty acid | — | 2471 | 982 | 22:6 n-3 (DHA) + 20:5 n-3 (EPA) | ALA suppressed; 18:3 retained as chemically unresolved |
| `sauerkraut` | 169279 | 30 | alanine, 30 mg — an amino acid, not a fatty acid | — | 30 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `scallops` | 174220 | 536 | alanine, 536 mg — an amino acid, not a fatty acid | 3 | 639 | 109 | 22:6 n-3 (DHA) + 20:5 n-3 (EPA) + 22:5 n-3 (DPA) + 18:3 n-3 (ALA) | restored from nutrient 1404, the explicit 18:3 n-3 field |
| `seaweed` | 168457 | 122 | alanine, 122 mg — an amino acid, not a fatty acid | — | 126 | 4 | 20:5 n-3 (EPA) | ALA suppressed; 18:3 retained as chemically unresolved |
| `sesame-seeds` | 170150 | 927 | phenylalanine, 940 mg — an amino acid, not a fatty acid | — | 927 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `shiitake-mushroom` | 169242 | 167 | alanine, 167 mg — an amino acid, not a fatty acid | — | 167 | — | — | ALA removed; the stored value was an amino acid |
| `shrimp` | 174210 | 6 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 6 | 144 | 150 | 22:6 n-3 (DHA) + 20:5 n-3 (EPA) + 22:5 n-3 (DPA) + 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `sourdough-bread` | 172675 | 63 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 63 | 63 | 63 | 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `soy` | 174270 | 1915 | alanine, 1915 mg — an amino acid, not a fatty acid | — | 1915 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `spelt` | 169745 | 534 | alanine, 534 mg — an amino acid, not a fatty acid | 65 | 534 | 65 | 18:3 n-3 (ALA) | restored from nutrient 1404, the explicit 18:3 n-3 field |
| `spinach` | 168462 | 100 | no field in the record matches the stored value | — | 100 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `spirulina` | 170495 | 4515 | alanine, 4515 mg — an amino acid, not a fatty acid | — | 4515 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `strawberries` | 167762 | 33 | alanine, 33 mg — an amino acid, not a fatty acid | — | 33 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `sunflower-lecithin` | 1750349 | 162.8 | Oil, sunflower, a substituted record | — | 165.175 | — | — | suppressed — cites FDC 1750349, Oil, sunflower — a different food |
| `sunflower-seeds` | 170562 | 1117 | alanine, 1117 mg — an amino acid, not a fatty acid | — | 1131 | 14 | 20:5 n-3 (EPA) | ALA suppressed; 18:3 retained as chemically unresolved |
| `sweet-potatoes` | 168482 | 77 | alanine, 77 mg — an amino acid, not a fatty acid | — | 77 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `swiss-chard` | 169991 | 110 | phenylalanine, 110 mg — an amino acid, not a fatty acid | — | 110 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `tahini` | 170189 | 889 | phenylalanine, 901 mg — an amino acid, not a fatty acid | — | 889 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `tempeh` | 174272 | 960 | alanine, 960 mg — an amino acid, not a fatty acid | — | 960 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `tofu` | 172475 | 773 | alanine, 773 mg — an amino acid, not a fatty acid | — | 773 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `tomatoes` | 170457 | 27 | alanine, 27 mg — an amino acid, not a fatty acid | — | 27 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `trout-roe` | 175132 | 1428 | alanine, 1428 mg — an amino acid, not a fatty acid | — | 3774 | 2428 | 22:6 n-3 (DHA) + 20:5 n-3 (EPA) + 22:5 n-3 (DPA) | ALA suppressed; 18:3 retained as chemically unresolved |
| `tuna` | 173706 | 1411 | alanine, 1411 mg — an amino acid, not a fatty acid | — | 2584 | 1298 | 22:6 n-3 (DHA) + 20:5 n-3 (EPA) + 22:5 n-3 (DPA) | ALA removed; the stored value was an amino acid |
| `turkey-tail-mushroom` | 2003603 | 671 | phenylalanine, 671 mg — an amino acid, not a fatty acid | — | 671 | — | — | suppressed — cites FDC 2003603, Mushroom, beech — a different species |
| `turkey` | 171480 | 5 | PUFA 18:3 n-3 c,c,c (ALA) — correct | 5 | 7 | 10 | 22:6 n-3 (DHA) + 22:5 n-3 (DPA) + 18:3 n-3 (ALA) | confirmed against nutrient 1404 |
| `turmeric` | 172231 | 330 | alanine, 330 mg — an amino acid, not a fatty acid | 3 | 330 | 3 | 18:3 n-3 (ALA) | restored from nutrient 1404, the explicit 18:3 n-3 field |
| `vinegar-pickles` | 168558 | 21 | alanine, 21 mg — an amino acid, not a fatty acid | — | 21 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `walnuts` | 170187 | 696 | alanine, 696 mg — an amino acid, not a fatty acid | — | 696 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `watermelon` | 167765 | 17 | alanine, 17 mg — an amino acid, not a fatty acid | — | 17 | — | — | ALA removed; the stored value was an amino acid |
| `wheat-germ` | 168892 | 1477 | alanine, 1477 mg — an amino acid, not a fatty acid | — | 1477 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
| `wheat` | 168890 | 450 | alanine, 450 mg — an amino acid, not a fatty acid | — | 450 | — | — | ALA suppressed; 18:3 retained as chemically unresolved |
