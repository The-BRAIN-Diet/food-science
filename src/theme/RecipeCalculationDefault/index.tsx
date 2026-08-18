import React from "react"
import {defaultCombination} from "@site/src/utils/recipeNutritionCalculate.mjs"

interface RecipeCalculationDefaultProps {
  details: Record<string, unknown>
}

const NOTE: React.CSSProperties = {
  fontSize: "0.9em",
  color: "var(--ifm-color-content-secondary)",
  marginTop: "0.5rem",
}

/**
 * Names the ingredient combination behind the nutrition figures, directly under
 * the ingredient list. Recipes offering a choice otherwise leave the reader
 * unable to tell which version was calculated without opening a dropdown.
 *
 * Renders nothing when the recipe offers no alternatives.
 */
export default function RecipeCalculationDefault({
  details,
}: RecipeCalculationDefaultProps): React.ReactElement | null {
  const combination = defaultCombination(details)
  if (!combination) return null
  return <p style={NOTE}>{combination}</p>
}
