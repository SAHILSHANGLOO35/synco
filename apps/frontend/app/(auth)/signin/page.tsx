"use client"

import axios from "axios"
import { API } from "@/config"
import { toastManager } from "@/components/ui/toast"
import { Loader2, Workflow } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSignin = async () => {
    setLoading(true)
    try {
      await axios.post(
        `${API}/api/v1/user/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      setEmail("")
      setPassword("")
      router.push("/")
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data

        if (data?.errors && Array.isArray(data.errors)) {
          const firstError = data.errors[0]
          toastManager.add({
            id: Date.now().toString(),
            title: "Validation Error",
            description: firstError.message,
          })
        } else if (data?.message) {
          toastManager.add({
            id: Date.now().toString(),
            title: "Signup Failed",
            description: data.message,
          })
        } else {
          toastManager.add({
            id: Date.now().toString(),
            title: "Error",
            description: "Something went wrong",
          })
        }
      } else {
        toastManager.add({
          id: Date.now().toString(),
          title: "Error",
          description: "Unexpected error occurred",
        })
      }
    } finally {
      setLoading(false)
    }
  }

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
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Enter your email"
          className="w-87.5 rounded-xs border border-white/10 bg-transparent px-4 py-3 text-white placeholder-neutral-400 transition-all duration-300 outline-none hover:border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-700/50 sm:w-100"
        />

        <div className="text-[14px] text-neutral-400">Password</div>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Enter your password"
          className="w-87.5 rounded-xs border border-white/10 bg-transparent px-4 py-3 text-white placeholder-neutral-400 transition-all duration-300 outline-none hover:border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-700/50 sm:w-100"
        />
      </div>

      <button
        className="flex w-87.5 cursor-pointer items-center justify-center rounded-md bg-rose-600 px-4 py-3 font-medium text-neutral-50 transition-colors duration-300 outline-none text-shadow-2xs hover:bg-linear-to-r hover:from-rose-600 hover:to-red-500 sm:w-100"
        onClick={handleSignin}
      >
        {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
      </button>

      <div className="flex items-center justify-center text-[14px] text-neutral-400">
        Continue to enjoy the features of Synco.
      </div>
    </>
  )
}
