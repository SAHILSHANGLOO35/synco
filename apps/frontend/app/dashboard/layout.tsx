import { AppNavbar } from "@/components/dashboard/app-navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex min-h-screen flex-col">
      <AppNavbar />
      <div className="flex flex-1">{children}</div>
    </section>
  )
}
