import Image from "next/image"
import { Container } from "./container"
import DitherShader from "./ui/dither-shader"

export const CTA = () => {
  return (
    <Container className="px-1 md:px-0">
      <div className="relative h-105 w-full border-y border-neutral-500/20 p-1 font-red-hat-display text-white sm:h-130 md:h-160 lg:h-200">
        <span className="absolute top-0 left-0 z-40 h-2 w-2 border-t border-l border-rose-600" />
        <span className="absolute top-0 right-0 z-40 h-2 w-2 border-t border-r border-rose-600" />
        <span className="absolute bottom-0 left-0 z-40 h-2 w-2 border-b border-l border-rose-600" />
        <span className="absolute right-0 bottom-0 z-40 h-2 w-2 border-r border-b border-rose-600" />

        <div className="relative h-full w-full overflow-hidden">
          <DitherShader
            src="/images/dither-synco.jpeg"
            gridSize={1}
            ditherMode="noise"
            threshold={2}
            backgroundColor="#000000"
            pixelRatio={1}
            className="absolute inset-0 z-0 h-full w-full object-cover"
          />

          {/* DARK OVERLAY (only on background) */}
          <div className="absolute inset-0 z-10 bg-black/80 mask-b-from-36%" />

          <div className="absolute bottom-0 left-1/2 z-20 h-50 w-[95%] max-w-5xl -translate-x-1/2 overflow-hidden sm:h-70 sm:w-[90%] md:h-90 md:w-[85%] lg:h-112.5 lg:w-[80%]">
            <Image
              src="/cta/cta.png"
              alt="Dashboard"
              width={1200}
              height={800}
              className="h-full w-full rounded-tl-lg rounded-tr-lg object-cover object-top"
            />
          </div>

          {/* TEXT CONTENT */}
          <div className="absolute inset-0 z-30 flex flex-col items-center gap-3 px-4 pt-10 text-center sm:gap-4 sm:pt-16 md:pt-20 lg:pt-24">
            <h1 className="text-lg leading-tight font-bold tracking-wide text-white md:text-4xl">
              Get Started Today
            </h1>
            <p className="max-w-xl text-sm font-medium tracking-wide text-neutral-50 sm:text-base">
              Build your first sync in under 2 minutes - no payment required.
            </p>

            <div className="mt-1 flex items-center justify-center gap-3 sm:mt-2 sm:gap-4">
              <button className="cursor-pointer bg-rose-600 px-5 py-2 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-rose-700 sm:px-8 sm:text-sm">
                Start Now
              </button>

              <button className="group relative cursor-pointer border border-rose-900/40 px-5 py-2 text-xs font-medium tracking-wide text-rose-200 transition-colors hover:bg-rose-900/40 hover:text-white sm:px-8 sm:text-sm">
                <span className="absolute top-0 left-0 h-2 w-2 border-t border-l border-rose-600"></span>
                <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-rose-600"></span>
                <span className="absolute top-0 right-0 h-2 w-2 border-t border-r border-rose-600"></span>
                <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-rose-600"></span>
                <span className="relative z-10">Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
