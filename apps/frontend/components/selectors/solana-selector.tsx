"use client"

import { useState } from "react"

export function SolanaSelector({
  setMetadata,
}: {
  setMetadata: (params: { address: string; amount: number }) => void
}) {
  const [amount, setAmount] = useState<number | 0>(0)
  const [address, setAddress] = useState("")

  return (
    <div className="flex flex-col gap-4 px-2 text-white">
      <div className="flex flex-col">
        <label className="text-sm text-neutral-400" htmlFor="amount">
          Amount*
        </label>
        <input
          id="amount"
          type="number"
          placeholder="Amount in SOL"
          onChange={(e) => setAmount(Number(e.target.value))}
          className="flex items-center gap-2.5 rounded-sm border border-white/8 bg-white/4 px-3 py-2.5 transition outline-none focus-within:border-white/20"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-neutral-400" htmlFor="address">
          Address
        </label>
        <input
          id="address"
          type="text"
          placeholder="Address*"
          onChange={(e) => setAddress(e.target.value)}
          className="flex items-center gap-2.5 rounded-sm border border-white/8 bg-white/4 px-3 py-2.5 transition outline-none focus-within:border-white/20"
        />
      </div>
      <button
        className="rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/50 transition hover:bg-white/10 hover:text-white/80"
        onClick={() => setMetadata({ amount, address })}
      >
        Submit Details
      </button>
    </div>
  )
}
