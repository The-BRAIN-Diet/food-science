export type BrainSystem = {
  id: string
  title: string
  description: string
  href: string
  /** Closed SVG path in the 1024×681 viewBox, traced to one coloured region. */
  path: string
}

/**
 * One record per coloured region. Preview assignment, posterior to anterior:
 * blue BRS1, cyan BRS2, orange BRS3, purple BRS4, green BRS5, yellow BRS6.
 */
export const BRAIN_SYSTEMS: BrainSystem[] = [
  {
    id: "BRS1",
    title: "Neurotransmitter Regulation",
    description: "Signal layer for synaptic communication and behavioural expression.",
    href: "/docs/biological-targets/neurotransmitter-regulation",
    path: "M365.0 66.0 L355.8 81.8 L335.2 99.2 L331.6 106.6 L330.0 116.0 L333.2 127.8 L355.8 144.2 L361.4 153.6 L365.0 168.0 L363.0 206.0 L374.4 236.6 L378.0 258.0 L369.0 298.0 L366.6 304.6 L362.8 308.8 L351.2 316.2 L340.2 326.2 L311.8 368.8 L300.6 382.6 L293.0 408.0 L291.2 421.2 L289.2 425.2 L286.0 426.0 L215.3 413.7 L173.0 397.0 L166.6 390.4 L157.4 385.0 L140.8 353.7 L139.0 334.0 L133.2 323.8 L124.9 318.1 L124.4 314.4 L131.8 303.8 L147.4 244.4 L164.3 224.3 L182.0 190.0 L187.0 176.0 L209.0 162.0 L221.2 144.9 L234.2 140.2 L246.8 131.8 L257.6 121.6 L261.0 113.4 L269.0 112.0 L283.4 104.4 L291.6 95.6 L302.7 92.7 L307.1 87.3 L317.4 84.4 L326.2 77.2 L341.7 73.7 L347.9 67.3 L357.0 68.0 Z",
  },
  {
    id: "BRS2",
    title: "Methylation & One-Carbon Metabolism",
    description: "Biochemical regulation of synthesis, repair, and epigenetic control.",
    href: "/docs/biological-targets/methylation-one-carbon-metabolism",
    path: "M596.0 58.0 L617.8 74.2 L624.6 84.4 L627.0 92.0 L626.4 102.4 L617.6 119.6 L614.4 131.4 L601.8 160.8 L597.4 197.4 L590.0 236.0 L590.6 251.4 L595.6 264.4 L607.2 278.8 L621.0 284.0 L610.0 287.0 L592.4 275.6 L573.2 271.4 L547.8 275.8 L525.4 287.4 L507.0 293.0 L489.0 293.0 L463.0 288.0 L442.6 288.6 L424.6 291.6 L400.4 300.4 L381.0 305.0 L374.4 304.6 L369.0 298.0 L378.0 258.0 L374.4 236.6 L363.0 206.0 L365.0 168.0 L361.4 153.6 L355.8 144.2 L333.2 127.8 L330.0 116.0 L331.6 106.6 L335.2 99.2 L355.8 81.8 L365.0 66.0 L373.9 59.4 L392.1 59.1 L402.2 51.2 L418.4 51.4 L445.6 44.6 L484.0 42.0 L496.3 38.3 L521.0 45.0 L538.0 43.0 L565.4 43.6 Z",
  },
  {
    id: "BRS3",
    title: "Inflammation & Oxidative Stress",
    description: "Immune and redox regulation of inflammatory tone, antioxidant defence, and repair balance.",
    href: "/docs/biological-targets/inflammation-oxidative-stress",
    path: "M873.0 335.0 L862.2 327.8 L849.8 313.2 L841.4 307.6 L828.0 304.0 L815.0 304.0 L804.6 306.6 L795.6 312.6 L791.4 312.6 L776.4 302.6 L746.6 289.4 L733.4 280.6 L713.0 273.0 L694.0 272.0 L621.0 284.0 L607.2 278.8 L595.6 264.4 L590.6 251.4 L590.0 236.0 L597.4 197.4 L601.8 160.8 L614.4 131.4 L617.6 119.6 L626.4 102.4 L627.0 92.0 L624.6 84.4 L617.8 74.2 L596.0 58.0 L610.0 56.0 L635.8 56.2 L646.9 63.1 L673.1 71.9 L691.6 87.4 L712.6 95.4 L736.8 124.2 L763.9 140.1 L783.9 169.1 L795.4 179.6 L810.3 188.7 L823.3 211.7 L829.7 227.3 L841.3 241.7 L848.1 262.9 L859.8 275.2 L868.0 297.0 Z",
  },
  {
    id: "BRS4",
    title: "Mitochondrial & Bioenergetics Regulation",
    description: "Capacity layer for ATP production, mitochondrial resilience, and bioenergetic efficiency.",
    href: "/docs/biological-targets/mitochondrial-function-bioenergetics",
    path: "M610.0 287.0 L597.2 294.2 L571.8 317.8 L542.2 336.2 L532.6 348.6 L527.0 366.0 L527.4 393.4 L524.6 401.6 L505.6 426.6 L495.0 459.0 L492.8 479.2 L494.4 481.6 L501.0 483.0 L483.6 490.6 L473.0 498.0 L457.6 502.6 L440.3 503.3 L405.9 516.4 L378.4 507.6 L356.7 507.4 L353.6 504.4 L350.4 491.6 L344.6 484.4 L311.1 470.9 L299.0 462.0 L296.1 447.9 L287.7 437.3 L286.0 426.0 L289.2 425.2 L291.2 421.2 L293.0 408.0 L300.6 382.6 L311.8 368.8 L340.2 326.2 L351.2 316.2 L362.8 308.8 L366.6 304.6 L369.0 298.0 L374.4 304.6 L381.0 305.0 L400.4 300.4 L424.6 291.6 L442.6 288.6 L463.0 288.0 L489.0 293.0 L507.0 293.0 L525.4 287.4 L547.8 275.8 L573.2 271.4 L592.4 275.6 Z",
  },
  {
    id: "BRS5",
    title: "Gut–Brain & Enteric Nervous System Regulation",
    description: "Peripheral neural-immune interface for gut signalling, microbial metabolites, and vagal integration.",
    href: "/docs/biological-targets/gut-brain-axis-enteric-nervous-system",
    path: "M873.0 335.0 L882.6 355.4 L884.0 389.0 L879.3 417.3 L872.2 439.2 L854.6 468.6 L841.7 480.7 L831.9 484.9 L823.0 486.0 L804.0 482.0 L780.4 467.6 L736.4 451.6 L707.0 444.0 L679.0 442.0 L613.0 451.0 L588.6 457.6 L553.2 471.2 L501.0 483.0 L494.4 481.6 L492.8 479.2 L495.0 459.0 L505.6 426.6 L524.6 401.6 L527.4 393.4 L527.0 366.0 L532.6 348.6 L542.2 336.2 L571.8 317.8 L597.2 294.2 L610.0 287.0 L621.0 284.0 L694.0 272.0 L713.0 273.0 L733.4 280.6 L746.6 289.4 L776.4 302.6 L791.4 312.6 L795.6 312.6 L804.6 306.6 L815.0 304.0 L828.0 304.0 L841.4 307.6 L849.8 313.2 L862.2 327.8 Z",
  },
  {
    id: "BRS6",
    title: "Metabolic & Neuroendocrine Regulation",
    description: "Whole-body regulation of stress allocation, autonomic tone, hormonal coordination, and energy prioritisation.",
    href: "/docs/biological-targets/metabolic-neuroendocrine-stress",
    path: "M804.0 482.0 L801.6 487.4 L805.9 510.9 L801.7 526.7 L775.8 560.8 L759.9 570.9 L733.4 581.4 L699.4 589.4 L679.9 591.9 L657.0 590.0 L646.6 585.4 L626.1 571.9 L618.4 572.4 L619.1 581.9 L638.6 634.4 L637.1 638.2 L625.4 642.0 L619.7 639.3 L602.7 639.2 L599.3 637.7 L591.7 627.3 L573.3 590.7 L552.8 557.2 L542.3 547.7 L510.0 530.0 L494.4 506.6 L473.0 498.0 L483.6 490.6 L501.0 483.0 L553.2 471.2 L588.6 457.6 L613.0 451.0 L679.0 442.0 L707.0 444.0 L736.4 451.6 L780.4 467.6 Z",
  },
]
