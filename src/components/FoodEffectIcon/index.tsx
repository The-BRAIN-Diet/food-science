import React from "react"
import styles from "./styles.module.css"
import {
  FOOD_EFFECT_META,
  isFoodEffectDirection,
  type FoodEffectDirection,
} from "./types"

export type {FoodEffectDirection}
export {FOOD_EFFECT_META, isFoodEffectDirection}

type FoodEffectIconProps = {
  direction: FoodEffectDirection
  className?: string
  /** Override accessible name; defaults to direction label (e.g. "Increases"). */
  "aria-label"?: string
}

function SymbolGlyph({direction}: {direction: FoodEffectDirection}) {
  // Stroke glyphs — bold at ~14–18px; colour comes from currentColor.
  switch (direction) {
    case "increase":
      return (
        <path
          d="M8 3.6 L8 12.4 M4.6 7 L8 3.6 L11.4 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )
    case "decrease":
      return (
        <path
          d="M8 3.6 L8 12.4 M4.6 9 L8 12.4 L11.4 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )
    case "preserve":
      return (
        <path
          d="M4.2 8 H11.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
      )
    case "interaction":
      return (
        <path
          d="M5.2 5.6 L3.4 8 L5.2 10.4 M10.8 5.6 L12.6 8 L10.8 10.4 M3.8 8 H12.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )
  }
}

/**
 * Inline glyph for preparation / bioavailability / pairing direction.
 * Maps CUE `direction` values — authors must not pick symbols manually.
 */
export default function FoodEffectIcon({
  direction,
  className,
  "aria-label": ariaLabelProp,
}: FoodEffectIconProps): React.JSX.Element {
  if (!isFoodEffectDirection(direction)) {
    throw new Error(
      `FoodEffectIcon: invalid direction "${String(direction)}". Expected increase | decrease | preserve | interaction.`,
    )
  }

  const meta = FOOD_EFFECT_META[direction]
  const classNames = [
    styles.icon,
    styles[direction],
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <span
      className={classNames}
      role="img"
      aria-label={ariaLabelProp ?? meta.ariaLabel}
    >
      <svg
        className={styles.svg}
        viewBox="0 0 16 16"
        width="1em"
        height="1em"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          className={styles.frame}
          x="1"
          y="1"
          width="14"
          height="14"
          rx="2.4"
          ry="2.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <SymbolGlyph direction={direction} />
      </svg>
    </span>
  )
}
