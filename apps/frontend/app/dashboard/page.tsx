"use client"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { SyncTable } from "@/components/dashboard/sync-table"
import { useSync } from "@/hooks/use-sync"
import Loading from "./loading"

export default function DashboardPage() {
  const { loading, syncs } = useSync()

  return (
    <div className="flex font-red-hat-display text-white">
      <AppSidebar />
      {loading ? <Loading /> : <SyncTable syncs={syncs} />}
    </div>
  )
}
