"use client"

import { WorkflowIcon } from "lucide-react"
import { Container } from "./container"
import { NavButtons } from "./nav-buttons"
import { useRouter } from "next/navigation"

export const LandingNavbar = () => {
  const router = useRouter()

  return (
    <div className="fixed top-0 z-50 w-screen border-b border-rose-600/40 bg-[#0A0A0A] font-red-hat-display">
      <Container>
        <div className="flex h-16 cursor-pointer items-center justify-between border-x border-rose-600/40 px-2 font-bold tracking-wide text-white uppercase sm:px-4">
          {/* LOGO */}
          <div
            className="flex items-center gap-1 sm:gap-2"
            onClick={() => router.push("/")}
          >
            <WorkflowIcon className="text-rose-500" size={18} />
            <div className="text-lg md:text-xl">
              syn<span className="text-rose-500">co</span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-5">
            <NavButtons text="Sign In" link="/signin" />
            <NavButtons text="Sign Up" link="/signup" />
          </div>
        </div>
      </Container>
    </div>
  )
}
