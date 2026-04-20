import { Hero } from "@/components/hero"
import { Navbar } from "@/components/navbar"
import { SectionWrapper } from "@/components/section-wrapper"
import { Separator } from "@/components/separator"
import { RefreshCcwDot } from "lucide-react"
import { Workflow } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-dvh bg-[#0A0A0A]">
      <Navbar />
      <div className="z-20 mx-auto max-w-7xl border-x border-neutral-500/20 pt-32">
        <Hero />
        <Separator />
        <div className="relative h-[200dvh]">
          <div className="sticky top-16 left-0 z-20 h-dvh w-full">
            <SectionWrapper
              image="/images/dashboard-synco.png"
              icon={RefreshCcwDot}
              title="SYNC ENGINE"
              subtitle="Connect events to actions"
              description="Triggers start the flow. Actions complete it. Synco links both so your workflows run automatically without manual effort."
              link="https://google.com"
            />
          </div>

          <div className="sticky top-16 left-0 z-30 h-dvh w-full">
            <SectionWrapper
              image="/images/syncflow-synco.png"
              icon={Workflow}
              title="EXECUTION FLOW"
              subtitle="Run every workflow reliably"
              description="Each trigger moves through a structured pipeline. Actions execute in order, so your automation stays predictable and consistent."
              link="https://google.com"
            />
          </div>
        </div>
        <Separator />
      </div>
    </div>
  )
}
