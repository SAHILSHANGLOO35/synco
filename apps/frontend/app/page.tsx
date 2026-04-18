import { Hero } from "@/components/hero"
import { Navbar } from "@/components/navbar"
import { Separator } from "@/components/separator"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <div className="z-20 mx-auto min-h-screen max-w-7xl border-x border-neutral-500/20 pt-32">
        <Hero />
        <Separator />
      </div>
    </div>
  )
}
