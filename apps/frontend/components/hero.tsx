import { Container } from "./container"
import { TabularInfo } from "./tabular-info"

export const Hero = () => {
  return (
    <Container>
      <div className="flex flex-col items-center gap-5 font-red-hat-display">
        <div className="font-sans text-xs font-semibold text-white uppercase">
          no code automation
        </div>

        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-semibold text-white">
            Triggers In. Actions Out. Everything Synced.
          </h1>
          <span className="max-w-120 text-center text-sm text-neutral-400">
            Synco is an automation platform that links triggers and actions
            across apps, helping you build powerful workflows without
            complexity.
          </span>
        </div>

        <div className="mt-2 flex items-center justify-center gap-3">
          <button className="cursor-pointer bg-rose-600 px-4 py-1.75 text-sm font-semibold text-white transition-colors hover:bg-rose-700">
            Start Now
          </button>

          <button className="group relative cursor-pointer border border-rose-900/40 px-3 py-2 text-sm font-medium text-rose-200 transition-colors hover:bg-rose-900/40">
            <span className="absolute top-0 left-0 h-2 w-2 border-t border-l border-rose-600 transition-colors"></span>
            <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-rose-600 transition-colors"></span>
            <span className="absolute top-0 right-0 h-2 w-2 border-t border-r border-rose-600 transition-colors"></span>
            <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-rose-600 transition-colors"></span>
            Watch Demo
          </button>
        </div>

        <TabularInfo />
      </div>
    </Container>
  )
}
