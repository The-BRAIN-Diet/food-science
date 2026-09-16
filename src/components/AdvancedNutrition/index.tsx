import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

type Slot = {
  content: ReactNode | null
  setContent: (node: ReactNode | null) => void
  useTabPanel: boolean
  setUseTabPanel: (next: boolean) => void
}

const AdvancedNutritionContext = createContext<Slot | null>(null)

export function AdvancedNutritionProvider({
  children,
}: {
  children: ReactNode
}): ReactNode {
  const [content, setContent] = useState<ReactNode | null>(null)
  const [useTabPanel, setUseTabPanel] = useState(false)
  const value = useMemo(
    () => ({content, setContent, useTabPanel, setUseTabPanel}),
    [content, useTabPanel],
  )
  return (
    <AdvancedNutritionContext.Provider value={value}>
      {children}
    </AdvancedNutritionContext.Provider>
  )
}

export function useAdvancedNutritionSlot(): Slot | null {
  return useContext(AdvancedNutritionContext)
}

export default function AdvancedNutrition({
  children,
}: {
  children?: ReactNode
}): ReactNode {
  const slot = useContext(AdvancedNutritionContext)
  const setContent = slot?.setContent
  useLayoutEffect(() => {
    if (!setContent) return
    setContent(children ?? null)
    return () => setContent(null)
  }, [children, setContent])
  if (!slot || slot.useTabPanel) return slot ? null : <>{children}</>
  return <>{children}</>
}
