"use client"

import { Workflow } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const router = useRouter()

  return (
    <>
      <div className="flex flex-col items-center gap-2 px-2">
        <div className="flex items-center gap-2 text-3xl font-bold text-rose-500 uppercase lg:text-5xl">
          <Workflow className="sm:size-6 lg:size-12" />
          <span>Welcome back</span>
        </div>
        <div className="z-20 flex items-center text-[14px] text-neutral-400">
          <span className="mr-1">First time here?</span>
          <span
            className="cursor-pointer text-blue-500 transition-all duration-300 hover:underline"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </span>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <div className="text-[14px] text-neutral-400">Email</div>
        <input
          className="w-87.5 rounded-md border border-white/10 bg-transparent px-4 py-3 text-white placeholder-neutral-400 transition-all duration-300 outline-none hover:border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-700/50 sm:w-100"
          placeholder="Enter your email"
          type="text"
        />

        <div className="text-[14px] text-neutral-400">Password</div>
        <input
          className="w-87.5 rounded-md border border-white/10 bg-transparent px-4 py-3 text-white placeholder-neutral-400 transition-all duration-300 outline-none hover:border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-700/50 sm:w-100"
          placeholder="Enter your password"
          type="text"
        />
      </div>

      <button className="w-87.5 cursor-pointer rounded-md bg-rose-600 px-4 py-3 font-medium text-neutral-50 transition-colors duration-300 outline-none text-shadow-2xs hover:bg-linear-to-r hover:from-rose-600 hover:to-red-500 sm:w-100">
        <div>Sign In</div>
      </button>

      <div className="flex items-center justify-center text-[14px] text-neutral-400">
        Continue to enjoy the features of Synco.
      </div>
    </>
  )
}
