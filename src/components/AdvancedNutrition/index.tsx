import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export type ContentPanelName = "advanced" | "therapeutic"

type Slot = {
  panels: Record<ContentPanelName, ReactNode | null>
  setPanel: (name: ContentPanelName, node: ReactNode | null) => void
  useTabPanel: boolean
  setUseTabPanel: (next: boolean) => void
}

const PageContentTabsContext = createContext<Slot | null>(null)

const emptyPanels: Record<ContentPanelName, ReactNode | null> = {
  advanced: null,
  therapeutic: null,
}

export function AdvancedNutritionProvider({
  children,
}: {
  children: ReactNode
}): ReactNode {
  const [panels, setPanels] =
    useState<Record<ContentPanelName, ReactNode | null>>(emptyPanels)
  const [useTabPanel, setUseTabPanel] = useState(false)
  const setPanel = useMemo(
    () => (name: ContentPanelName, node: ReactNode | null) => {
      setPanels((prev) => (prev[name] === node ? prev : {...prev, [name]: node}))
    },
    [],
  )
  const value = useMemo(
    () => ({panels, setPanel, useTabPanel, setUseTabPanel}),
    [panels, setPanel, useTabPanel],
  )
  return (
    <PageContentTabsContext.Provider value={value}>
      {children}
    </PageContentTabsContext.Provider>
  )
}

export function usePageContentTabs(): Slot | null {
  return useContext(PageContentTabsContext)
}

/** @deprecated Prefer usePageContentTabs; kept so existing imports keep working. */
export function useAdvancedNutritionSlot(): {
  content: ReactNode | null
  setContent: (node: ReactNode | null) => void
  useTabPanel: boolean
  setUseTabPanel: (next: boolean) => void
} | null {
  const slot = useContext(PageContentTabsContext)
  if (!slot) return null
  return {
    content: slot.panels.advanced,
    setContent: (node) => slot.setPanel("advanced", node),
    useTabPanel: slot.useTabPanel,
    setUseTabPanel: slot.setUseTabPanel,
  }
}

function NamedTabPanel({
  name,
  children,
}: {
  name: ContentPanelName
  children?: ReactNode
}): ReactNode {
  const slot = useContext(PageContentTabsContext)
  const setPanel = slot?.setPanel
  useLayoutEffect(() => {
    if (!setPanel) return
    setPanel(name, children ?? null)
    return () => setPanel(name, null)
  }, [children, name, setPanel])
  if (!slot || slot.useTabPanel) return slot ? null : <>{children}</>
  return <>{children}</>
}

export default function AdvancedNutrition({
  children,
}: {
  children?: ReactNode
}): ReactNode {
  return <NamedTabPanel name="advanced">{children}</NamedTabPanel>
}

export function TherapeuticAreaResearch({
  children,
}: {
  children?: ReactNode
}): ReactNode {
  return <NamedTabPanel name="therapeutic">{children}</NamedTabPanel>
}
