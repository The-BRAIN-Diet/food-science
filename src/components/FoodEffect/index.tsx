import React, {type ReactNode} from "react"
import FoodEffectIcon, {
  FOOD_EFFECT_META,
  isFoodEffectDirection,
  type FoodEffectDirection,
} from "../FoodEffectIcon"
import styles from "./styles.module.css"

export type {FoodEffectDirection}

type FoodEffectProps = {
  direction: FoodEffectDirection
  children: ReactNode
  className?: string
}

/**
 * Food / recipe effect line: glyph + semantic label + biological property.
 *
 * Good:  <FoodEffect direction="increase">Sulforaphane formation</FoodEffect>
 * Bad:   <FoodEffect direction="increase">Chop broccoli</FoodEffect>
 *
 * Supporting practical action belongs on the following prose line, not in children.
 */
export default function FoodEffect({
  direction,
  children,
  className,
}: FoodEffectProps): React.JSX.Element {
  if (!isFoodEffectDirection(direction)) {
    throw new Error(
      `FoodEffect: invalid direction "${String(direction)}". Expected increase | decrease | preserve | interaction.`,
    )
  }

  const meta = FOOD_EFFECT_META[direction]
  const classNames = [styles.effect, className].filter(Boolean).join(" ")

  return (
    <span className={classNames}>
      <FoodEffectIcon direction={direction} />
      <span className={styles.label}>{meta.label}</span>
      <span className={styles.property}>{children}</span>
    </span>
  )
}
