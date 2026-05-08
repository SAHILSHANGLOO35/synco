"use client"

import { createContext, useContext, useState } from "react"

const SyncNameContext = createContext<{
  syncName: string
  setSyncName: (name: string) => void
}>({ syncName: "Untitled Sync", setSyncName: () => {} })

export const SyncNameProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [syncName, setSyncName] = useState("Untitled Sync")
  return (
    <SyncNameContext.Provider value={{ syncName, setSyncName }}>
      {children}
    </SyncNameContext.Provider>
  )
}

export const useSyncName = () => useContext(SyncNameContext)
