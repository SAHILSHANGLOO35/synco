"use client"

import { WorkflowIcon } from "lucide-react"
import { Container } from "./container"

export const Navbar = () => {
  return (
    <div className="fixed top-0 z-50 w-full border-b border-rose-600/20 bg-[#0A0A0A] font-red-hat-display">
      <Container>
        <div
          className="flex h-16 cursor-pointer items-center gap-2 border-x border-rose-600/20 pl-4 font-bold tracking-wide text-white uppercase"
          onClick={() => (window.location.href = "/")}
        >
          <WorkflowIcon className="text-rose-500" size={24} />
          <div className="text-xl">
            syn<span className="text-rose-500">co</span>
          </div>
        </div>
      </Container>
    </div>
  )
}
