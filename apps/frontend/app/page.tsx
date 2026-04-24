"use client"

import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { LandingNavbar } from "@/components/landing-navbar"
import { SectionWrapper } from "@/components/section-wrapper"
import { Separator } from "@/components/separator"
import { Testimonials } from "@/components/testimonials/page"
import { RefreshCcwDot } from "lucide-react"
import { Workflow } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-dvh bg-[#0A0A0A]">
      <LandingNavbar />
      <div className="z-20 mx-auto max-w-7xl overflow-x-clip border-x border-rose-600/40 pt-20 sm:pt-24 md:pt-32">
        <Hero />
        <Separator />
        <div className="relative h-[200dvh]">
          <div className="sticky top-16 left-0 z-20 h-dvh w-full">
            <SectionWrapper
              image="/images/image-1.png"
              icon={RefreshCcwDot}
              title="SYNC ENGINE"
              subtitle="Connect events to actions"
              description="Triggers start the flow. Actions complete it. Synco links both so your workflows run automatically without manual effort."
              link="https://google.com"
            />
          </div>

          <div className="sticky top-16 left-0 z-30 h-dvh w-full">
            <SectionWrapper
              image="/images/image-2.png"
              icon={Workflow}
              title="EXECUTION FLOW"
              subtitle="Run every workflow reliably"
              description="Each trigger moves through a structured pipeline. Actions execute in order, so your automation stays predictable and consistent."
              link="https://google.com"
            />
          </div>
        </div>
        <Separator />
        <div className="py-8 sm:py-20 md:py-16">
          <Testimonials />
        </div>
        <Separator />
        <div className="py-8 sm:py-20 md:py-16">
          <CTA />
        </div>
        <Separator />
        <Footer />
      </div>
    </div>
  )
}
