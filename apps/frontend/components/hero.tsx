"use client"

import { Container } from "./container"
import { LogoMarquee } from "./logo-marquee"
import { TabularInfo } from "./tabular-info"

export const Hero = () => {
  return (
    <Container>
      <div
        className="flex flex-col items-center gap-4 font-red-hat-display md:gap-6"
        suppressHydrationWarning
      >
        {/* Small tag */}
        <div className="font-sans text-xs font-medium tracking-wider text-white uppercase">
          no code automation
        </div>

        {/* Heading + Description */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-center text-3xl leading-tight font-medium tracking-wide text-white md:text-4xl">
            Triggers In. Actions Out. Everything Synced.
          </h1>

          <span className="max-w-xl text-center text-sm leading-relaxed font-medium tracking-wide text-muted-foreground md:text-base">
            Synco is an automation platform that links triggers and actions
            across apps, helping you build powerful workflows without
            complexity.
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-2 flex items-center justify-center gap-4">
          <button className="cursor-pointer bg-rose-600 px-8 py-2 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-rose-700">
            Start Now
          </button>

          <button className="group relative cursor-pointer border border-rose-900/40 px-8 py-2 text-sm font-medium tracking-wide text-rose-200 transition-colors hover:bg-rose-900/40 hover:text-white">
            <span className="absolute top-0 left-0 h-2 w-2 border-t border-l border-rose-600"></span>
            <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-rose-600"></span>
            <span className="absolute top-0 right-0 h-2 w-2 border-t border-r border-rose-600"></span>
            <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-rose-600"></span>
            <span className="relative z-10">Watch Demo</span>
          </button>
        </div>

        <LogoMarquee />
        <div className="mt-4 w-full md:mt-8">
          <TabularInfo />
        </div>
      </div>
    </Container>
  )
}
