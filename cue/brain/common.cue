package brain

// Substance ← food bullets (KC §3; FM/PM/SM Dietary Levers / Diet details).
// @see system/substance-food-mapping-format.md

#SubstanceFoodBullet: =~#"^- [^\n]+ ← [^\n]+$"#

// Legacy food → substance (forbidden in mapped sections).
#LegacyFoodToSubstanceArrow: =~#" → "#
