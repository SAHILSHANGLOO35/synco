import { WorkflowIcon } from "lucide-react"
import { NavButtons } from "../nav-buttons"
import { LayoutIcon } from "@/icons/layout"

export const AppNavbar = () => {
  return (
    <div className="w-full border-b border-rose-600/40 font-red-hat-display">
      <div className="flex h-16 items-center justify-between font-bold tracking-wide text-white">
        {/* LOGO */}
        <div className="flex h-full w-48 shrink-0 items-center gap-2 border-r border-rose-600/40 px-4 uppercase md:w-64">
          <WorkflowIcon className="text-rose-500" size={18} />
          <div className="hidden text-lg md:block md:text-xl">
            syn<span className="text-rose-500">co</span>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex items-center gap-2 px-4 sm:gap-4 md:gap-5">
          <div className="flex cursor-pointer items-center justify-center gap-2 px-4 py-2 text-sm font-medium tracking-wide text-rose-100 transition-colors duration-200 hover:bg-rose-900/40 hover:text-white">
            <LayoutIcon className="text-rose-200" />
            <span>Explore Actions</span>
          </div>

          <NavButtons
            text="Contact Us"
            link="/dashboard"
            className="font-semibold"
          />

          <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-rose-900/60 font-medium uppercase shadow-inner shadow-rose-900/30 text-shadow-2xs">
            ss
          </div>
        </div>
      </div>
    </div>
  )
}
