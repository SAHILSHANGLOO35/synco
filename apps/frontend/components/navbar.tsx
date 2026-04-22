"use client"

import { WorkflowIcon } from "lucide-react"
import { Container } from "./container"
import { NavButtons } from "./nav-buttons"

export const Navbar = () => {
  return (
    <div className="fixed top-0 z-50 w-screen border-b border-rose-600/40 bg-[#0A0A0A] font-red-hat-display">
      <Container>
        <div
          className="flex h-16 cursor-pointer items-center justify-between border-x border-rose-600/40 px-2 font-bold tracking-wide text-white uppercase sm:h-14 sm:px-4"
          onClick={() => (window.location.href = "/")}
        >
          {/* LOGO */}
          <div className="flex items-center gap-1 sm:gap-2">
            <WorkflowIcon className="text-rose-500" size={18} />
            <div className="text-lg md:text-xl">
              syn<span className="text-rose-500">co</span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-5">
            <NavButtons text="Sign In" />
            <NavButtons text="Sign Up" />
          </div>
        </div>
      </Container>
    </div>
  )
}
