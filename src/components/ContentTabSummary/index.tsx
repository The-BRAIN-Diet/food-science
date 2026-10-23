import React, {type ReactNode} from "react"
import clsx from "clsx"
import Link from "@docusaurus/Link"
import tabStyles from "../ReviewCorrections/styles.module.css"
import styles from "./styles.module.css"

/**
 * One Overview paragraph that points at a populated research tab.
 * The label is the same square control as the page tab, and it is the link.
 */
export default function ContentTabSummary({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}): React.JSX.Element {
  return (
    <div className={styles.summary}>
      <Link className={clsx(tabStyles.tab, styles.link)} to={href}>
        {label}
      </Link>
      <div className={styles.text}>{children}</div>
    </div>
  )
}
