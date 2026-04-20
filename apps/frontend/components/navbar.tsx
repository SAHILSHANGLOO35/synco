"use client"

import { WorkflowIcon } from "lucide-react"
import { Container } from "./container"
import { NavButtons } from "./nav-buttons"

export const Navbar = () => {
  return (
    <div className="fixed top-0 z-50 w-full border-b border-rose-600/20 bg-[#0A0A0A] font-red-hat-display">
      <Container>
        <div
          className="flex h-16 cursor-pointer items-center justify-between border-x border-rose-600/20 px-4 font-bold tracking-wide text-white uppercase"
          onClick={() => (window.location.href = "/")}
        >
          <div className="flex items-center justify-center gap-2">
            <WorkflowIcon className="text-rose-500" size={24} />
            <div className="text-xl">
              syn<span className="text-rose-500">co</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-5">
            <NavButtons text="Sign In" />
            <NavButtons text="Sign Up" />
          </div>
        </div>
      </Container>
    </div>
  )
}
