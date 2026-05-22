package brain

import "brain/common"

// Key Constraint public body: section 3 uses substance-first food examples.
#KCSupportingInputsSection: {
	heading: "### 3. Supporting Inputs/Substrates"
	// Each substrate bullet should match #SubstanceFoodBullet when foods are listed.
}

#KCBullet: common.#SubstanceFoodBullet | string
