import Image from "next/image"
import { Container } from "./container"
import DitherShader from "./ui/dither-shader"

export const CTA = () => {
  return (
    <Container className="pb-16">
      <div className="relative h-200 w-full border-y border-neutral-500/20 p-1 font-red-hat-display text-white">
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

          <div className="absolute bottom-0 left-1/2 z-20 h-112.5 w-[80%] max-w-5xl -translate-x-1/2 overflow-hidden">
            <Image
              src="/cta/cta.png"
              alt="Dashboard"
              width={1200}
              height={800}
              className="h-full w-full rounded-tl-lg rounded-tr-lg object-cover object-top"
            />
          </div>

          {/* TEXT CONTENT */}
          <div className="absolute inset-0 z-30 flex flex-col items-center gap-4 pt-24 text-center">
            <h1 className="text-lg leading-tight font-bold tracking-wide text-white md:text-4xl">
              Get Started Today
            </h1>
            <p className="max-w-xl font-medium tracking-wide text-neutral-50">
              Build your first sync in under 2 minutes - no payment required.
            </p>

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
          </div>
        </div>
      </div>
    </Container>
  )
}
