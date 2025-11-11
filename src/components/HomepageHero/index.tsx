import type {ReactNode} from "react"
import clsx from "clsx"
import Heading from "@theme/Heading"
import styles from "./styles.module.css"

export default function HomepageHero(): ReactNode {
  // Extract video ID from YouTube URL
  const videoId = "c99PkqInI1Y"
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1`

  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className={styles.videoContainer}>
        <iframe
          className={styles.videoBackground}
          src={embedUrl}
          title="BRAIN Diet Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className={styles.videoOverlay} />
      </div>
      <div className={clsx("container", styles.heroContent)}>
        <Heading as="h1" className={styles.heroTitle}>
          The BRAIN Diet ™
        </Heading>
        <p className={styles.heroSubtitle}>Bio Regulation Algorithm and Integrated Neuronutrition</p>
      </div>
    </header>
  )
}
