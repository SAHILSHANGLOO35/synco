"use client"

import { useState } from "react"

export function EmailSelector({
  setMetadata,
}: {
  setMetadata: (params: { email: string; body: string }) => void
}) {
  const [email, setEmail] = useState("")
  const [body, setBody] = useState("")

  return (
    <div className="flex w-full flex-col justify-center gap-4 px-2 text-white">
      <div className="flex flex-col gap-0.5">
        <label className="text-sm text-neutral-400" htmlFor="to">
          To*
        </label>
        <input
          id="to"
          type="email"
          placeholder="goat@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          className="flex items-center gap-2.5 rounded-sm border border-white/8 bg-white/4 px-3 py-2.5 transition outline-none focus-within:border-white/20"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <label className="text-sm text-neutral-400" htmlFor="body">
          Body*
        </label>
        <input
          id="body"
          type="text"
          placeholder="Body"
          onChange={(e) => setBody(e.target.value)}
          className="flex items-center gap-2.5 rounded-sm border border-white/8 bg-white/4 px-3 py-2.5 transition outline-none focus-within:border-white/20"
        />
      </div>
      <button
        className="rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/50 transition hover:bg-white/10 hover:text-white/80"
        onClick={() => setMetadata({ email, body })}
      >
        Submit Details
      </button>
    </div>
  )
}
