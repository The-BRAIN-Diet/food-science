import React, {type ReactNode} from "react"
import {useLocation} from "@docusaurus/router"
import OriginalLayout from "@theme-original/DocRoot/Layout"
import type {Props} from "@theme/DocRoot/Layout"

/** Page-specific dashboard chrome. Navbar stays; docs sidebar/container cap do not. */
export const FCIR_DASHBOARD_CLASS = "fcir-dashboard-page"

export function isFcirDashboardPath(pathname: string): boolean {
  return pathname.replace(/\/$/, "").endsWith("/food-composition-interpretation-register")
}

export default function DocRootLayout(props: Props): ReactNode {
  const {pathname} = useLocation()
  if (!isFcirDashboardPath(pathname)) {
    return <OriginalLayout {...props} />
  }
  return (
    <div className={FCIR_DASHBOARD_CLASS}>
      <OriginalLayout {...props} />
    </div>
  )
}
