"use client"

import { useRouter } from "next/navigation"
import { NavButtons } from "../nav-buttons"
import { LayoutIcon } from "@/icons/layout"

export const AppNavbar = () => {
  const router = useRouter()

  return (
    <div className="w-full border-b border-rose-600/40 font-red-hat-display">
      <div className="flex h-16 items-center justify-between px-4 tracking-wide text-white">
        <div className="font-semibold">Your Syncs</div>
        {/* BUTTONS */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-5">
          <div
            className="flex cursor-pointer items-center justify-center gap-2 px-4 py-2 text-sm font-medium tracking-wide text-rose-100 transition-colors duration-200 hover:bg-rose-900/40 hover:text-white"
            onClick={() => router.push("/sync/create")}
          >
            <LayoutIcon className="text-rose-200" />
            <span>Create Sync</span>
          </div>

          <NavButtons
            link={`mailto:sahilshanglo35@gmail.com?subject=${encodeURIComponent(
              "Synco Support"
            )}&body=${encodeURIComponent("Hey Sahil,\n\nI need help with:\n")}`}
            text="Contact Us"
            className="hidden font-semibold sm:block"
          />

          <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-rose-900/60 font-medium uppercase shadow-inner shadow-rose-900/30 text-shadow-2xs">
            ss
          </div>
        </div>
      </div>
    </div>
  )
}
