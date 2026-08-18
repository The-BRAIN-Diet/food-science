/**
 * Public RecipeMatrix gate.
 *
 * Auto-walked food → substance → BRS graphs are not a validated meal mapping.
 * Do not render a Biological Target Matrix unless editorial review has set
 * `recipe_matrix_validated: true` on the recipe.
 */

export const PENDING_MATRIX_MESSAGE =
  "Biological Target Matrix pending canonical BRS validation."

export function isRecipeMatrixValidated(frontMatter) {
  return frontMatter?.recipe_matrix_validated === true
}
