## BRAIN Diet – Nutrient Reference Values

This file documents the **reference daily intake values** used for %RDA calculations in the BRAIN Diet nutrition layer.

These values are used by the `NutritionTable` component to compute:

> % RDA per 100 g = (amount per 100 g ÷ daily reference intake) × 100

---

## Reference Standard

- **Base standard**: U.S. Institute of Medicine / National Academies **Dietary Reference Intakes (DRIs)**  
- **Population**: Healthy adults **19–50 years**  
- **Sex differences**: Where male and female RDAs differ, we use the **higher of the two** as a conservative reference for labelling and comparison.

This is a pragmatic, single‑number standard for comparative recipe work. It is **not** intended to replace personalised clinical recommendations.

---

## Reference Values (per day)

All values below are **adult daily reference intakes** used for %RDA calculations.

| Nutrient        | Symbol / field key | Reference value | Unit | Notes |
|-----------------|--------------------|-----------------|------|-------|
| Iron            | `iron_mg`          | 18              | mg   | Higher of adult men (8 mg) and women (18 mg) |
| Zinc            | `zinc_mg`          | 11              | mg   | Higher of adult women (8 mg) and men (11 mg) |
| Magnesium       | `magnesium_mg`     | 420             | mg   | Higher of women (310–320 mg) and men (400–420 mg) |
| Selenium        | `selenium_ug`      | 55              | µg   | RDA for adults |
| Calcium         | `calcium_mg`       | 1000            | mg   | RDA for adults 19–50 years |
| Potassium       | `potassium_mg`     | 3400            | mg   | Adequate Intake (AI) for adult men (higher than women 2600 mg) |
| Choline         | `choline_mg`       | 550             | mg   | Adequate Intake (AI) for adult men |
| Folate          | `folate_ug`        | 400             | µg   | RDA as dietary folate equivalents (DFE) |
| Vitamin B12     | `vitamin_b12_ug`   | 2.4             | µg   | RDA for adults |
| Vitamin B6      | `vitamin_b6_mg`    | 1.7             | mg   | Higher of adult women (1.5 mg) and men (1.7 mg) |
| Vitamin E       | `vitamin_e_mg`     | 15              | mg   | RDA as α-tocopherol for adults |
| Vitamin K       | `vitamin_k_ug`     | 120             | µg   | RDA for adults (as phylloquinone) |
| Copper          | `copper_mg`        | 0.9             | mg   | RDA 900 µg for adults |

These values are mirrored in code (see `src/components/NutritionTable.tsx`) so that UI calculations and documentation remain aligned.

