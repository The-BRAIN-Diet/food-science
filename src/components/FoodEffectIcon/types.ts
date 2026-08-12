import React from "react"

export type FoodEffectDirection =
  | "increase"
  | "decrease"
  | "preserve"
  | "interaction"

export const FOOD_EFFECT_META: Record<
  FoodEffectDirection,
  {label: string; ariaLabel: string}
> = {
  increase: {
    label: "INCREASES",
    ariaLabel: "Increases",
  },
  decrease: {
    label: "DECREASES",
    ariaLabel: "Decreases",
  },
  preserve: {
    label: "PRESERVES",
    ariaLabel: "Preserves",
  },
  interaction: {
    label: "INTERACTION",
    ariaLabel: "Interaction",
  },
}

export function isFoodEffectDirection(
  value: unknown,
): value is FoodEffectDirection {
  return (
    value === "increase" ||
    value === "decrease" ||
    value === "preserve" ||
    value === "interaction"
  )
}
