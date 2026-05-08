"use client"

import { AppNavbar } from "@/components/dashboard/app-navbar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SyncNameProvider } from "@/context/sync-name-context"

export default function CreateSyncLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SyncNameProvider>
      <div className="flex h-screen overflow-hidden">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AppNavbar variant="create-sync" />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SyncNameProvider>
  )
}
