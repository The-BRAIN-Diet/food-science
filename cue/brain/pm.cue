package brain

import "brain/common"

// PM Dietary Levers (Diet details): substance ← 2–3 food examples per bullet.
#PMDietaryLeversDietBlock: {
	// No nested "Food sources (examples)"; no legacy food → substance arrows.
}

#PMDietBullet: common.#SubstanceFoodBullet | string
