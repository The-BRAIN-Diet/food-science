import React, {useId, useState} from "react"
import Link from "@docusaurus/Link"
import clsx from "clsx"
import styles from "./styles.module.css"
import {BRAIN_SYSTEMS, type BrainSystem} from "./systems"

const BRAIN_SRC = "/img/foods/originals/six-region-neural-brain-map.jpg"

function regionLabel(system: BrainSystem): string {
  return `${system.id} — ${system.title}`
}

export default function BrainSystemsExplorer(): React.ReactElement {
  const [activeId, setActiveId] = useState<string | null>(null)
  const panelId = useId()
  const active = BRAIN_SYSTEMS.find(system => system.id === activeId) ?? null

  function select(id: string) {
    setActiveId(id)
  }

  return (
    <section className={styles.explorer} aria-label="Biological Regulatory Systems explorer">
      <div className={styles.layout}>
        <div className={styles.graphic}>
          <svg
            className={styles.svg}
            viewBox="0 0 1024 681"
            preserveAspectRatio="xMidYMid meet"
            role="group"
            aria-label="Six coloured brain regions, one for each Biological Regulatory System"
          >
            <image
              href={BRAIN_SRC}
              xlinkHref={BRAIN_SRC}
              x="0"
              y="0"
              width="1024"
              height="681"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            />
            {BRAIN_SYSTEMS.map(system => {
              const selected = system.id === activeId
              return (
                <path
                  key={system.id}
                  d={system.path}
                  className={clsx(styles.region, selected && styles.regionActive)}
                  tabIndex={0}
                  role="button"
                  aria-label={regionLabel(system)}
                  aria-pressed={selected}
                  aria-controls={panelId}
                  data-brs={system.id}
                  fill="transparent"
                  pointerEvents="fill"
                  vectorEffect="non-scaling-stroke"
                  onMouseEnter={() => select(system.id)}
                  onFocus={() => select(system.id)}
                  onClick={event => {
                    event.preventDefault()
                    select(system.id)
                  }}
                  onKeyDown={event => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      select(system.id)
                    }
                  }}
                />
              )
            })}
          </svg>
        </div>

        <div id={panelId} className={styles.panel} aria-live="polite" aria-atomic="true">
          <p className={styles.kicker}>{active ? active.id : "BRS"}</p>
          <h2 className={styles.title}>{active ? active.title : "Select a system"}</h2>
          <p className={styles.description}>
            {active
              ? active.description
              : "Hover, focus, or tap a coloured region. Open a system only with Explore this BRS."}
          </p>
          {active ? (
            <Link className={styles.cta} to={active.href}>
              Explore this BRS
            </Link>
          ) : (
            <span className={styles.cta} aria-disabled="true">
              Explore this BRS
            </span>
          )}
        </div>
      </div>
    </section>
  )
}

export {BRAIN_SYSTEMS}
export type {BrainSystem}
