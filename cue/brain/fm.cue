package brain

import "brain/common"

// FM Dietary Levers (Diet details): substance ← 2–3 food examples per bullet.
#FMDietaryLeversDietBlock: {
	// Bullets in Diet <details> that map substrates to foods use #SubstanceFoodBullet.
}

#FMDietBullet: common.#SubstanceFoodBullet | string

// §5.1 Cofactors and Substrates (per-PM table)
#FMCofactorsSubstratesRow: {
	pm:           string
	cofactors:    string
	kcSubstrates: string // substances from linked KC §3; KC link in parentheses
}
