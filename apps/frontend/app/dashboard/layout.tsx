import { AppNavbar } from "@/components/dashboard/app-navbar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppNavbar />

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
