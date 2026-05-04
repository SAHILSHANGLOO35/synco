"use client"

import { NavButtons } from "@/components/nav-buttons"
import { API } from "@/config"
import { useAvailableTriggersAndActions } from "@/hooks/use-available-triggers-and-actions"
import axios from "axios"
import { ChevronRight, Workflow } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { LuLayoutDashboard } from "react-icons/lu"
import { BiLeftArrowAlt } from "react-icons/bi"

type Option = {
  id: string
  name: string
  image: string
  metadata?: Record<string, unknown>
}

type Action = {
  index: number
  image: string
  availableActionId: string
  availableActionName: string
  metadata?: Record<string, unknown>
}

export default function CreateSync() {
  const router = useRouter()

  const [selectedTrigger, setSelectedTrigger] = useState<Option | null>(null)
  const [selectedActions, setSelectedActions] = useState<Action[]>([])
  const [selectedModalIndex, setSelectedModalIndex] = useState<number | null>(
    null
  )

  const { availableTriggers, availableActions } =
    useAvailableTriggersAndActions()

  const handleSelect = (option: Option | null) => {
    if (!option) {
      setSelectedModalIndex(null)
      return
    }

    if (selectedModalIndex === 1) {
      setSelectedTrigger(option)
    } else if (selectedModalIndex !== null) {
      setSelectedActions((prev) => {
        const updated = [...prev]
        updated[selectedModalIndex - 2] = {
          index: selectedModalIndex,
          image: option.image,
          availableActionId: option.id,
          availableActionName: option.name,
          metadata: option.metadata,
        }
        return updated
      })
    }

    setSelectedModalIndex(null)
  }

  const isPublishable =
    !!selectedTrigger?.id &&
    selectedActions.length > 0 &&
    selectedActions.every((a) => a.availableActionId !== "")

  return (
    <div className="flex h-screen flex-col font-red-hat-display">
      {/* Top bar — unchanged */}
      <div className="flex h-12 items-center justify-between pr-4 pl-12 text-white">
        <div
          className="flex h-full cursor-pointer items-center transition-all duration-200 hover:text-rose-600"
          onClick={() => router.push("/dashboard")}
        >
          <LuLayoutDashboard size={20} />
        </div>
        <NavButtons
          text="Publish"
          disabled={!isPublishable}
          onClick={async () => {
            if (!selectedTrigger?.id) return

            // Filter out any actions that haven't been configured yet
            const filledActions = selectedActions.filter(
              (action) => action.availableActionId !== ""
            )

            if (filledActions.length === 0) return // optionally warn the user

            await axios.post(
              `${API}/api/v1/sync`,
              {
                availableTriggerId: selectedTrigger.id,
                triggerMetadata: {},
                actions: selectedActions.map((action) => ({
                  availableActionId: action.availableActionId,
                  actionMetadata: action.metadata,
                })),
              },
              {
                withCredentials: true,
              }
            )
            router.push("/dashboard")
          }}
        />
      </div>

      {/* Working area */}
      <div className="flex flex-1 pl-12">
        <div className="flex w-full flex-col items-center justify-center gap-0 overflow-y-auto rounded-tl-xl bg-[#121212] py-10 text-white">
          {/* ── Trigger node ── */}
          <FlowNode
            stepNumber={1}
            label="Trigger"
            name={selectedTrigger?.name ?? null}
            image={selectedTrigger?.image}
            onClick={() => setSelectedModalIndex(1)}
          />

          {/* ── Action nodes ── */}
          {selectedActions.map((action) => (
            <div key={action.index} className="flex flex-col items-center">
              <Connector />
              <FlowNode
                stepNumber={action.index}
                label="Action"
                name={action.availableActionName || null}
                image={action.image}
                onClick={() => setSelectedModalIndex(action.index)}
              />
            </div>
          ))}

          {/* ── Add action ── */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <Connector short />
            <button
              className="flex items-center gap-2.5 rounded-full border border-dashed border-white/20 bg-white/5 px-5 py-2.5 text-sm text-white/60 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
              onClick={() =>
                setSelectedActions((prev) => [
                  ...prev,
                  {
                    index: prev.length + 2,
                    image: "",
                    availableActionId: "",
                    availableActionName: "",
                  },
                ])
              }
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-black/30 text-base leading-none">
                +
              </span>
              Add action
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedModalIndex !== null && (
        <Modal
          index={selectedModalIndex}
          isOpen={true}
          onClose={() => setSelectedModalIndex(null)}
          onSelect={handleSelect}
          options={
            selectedModalIndex === 1 ? availableTriggers : availableActions
          }
        />
      )}
    </div>
  )
}

/* ─────────────────────────────────────────
   FlowNode — single step card
───────────────────────────────────────── */
function FlowNode({
  stepNumber,
  label,
  name,
  image,
  onClick,
}: {
  stepNumber: number
  label: string
  name: string | null
  image?: string
  onClick: () => void
}) {
  const isEmpty = !name

  return (
    <button
      onClick={onClick}
      className={`group flex w-full max-w-md items-center gap-4 rounded-md border px-5 py-4 text-left transition-all duration-150 ${
        isEmpty
          ? "border-dashed border-white/15 bg-white/3 hover:border-white/30 hover:bg-white/6"
          : "border-white/10 bg-white/6 hover:border-white/20 hover:bg-white/10"
      } `}
    >
      {/* Icon / image */}
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isEmpty ? "border border-dashed border-white/20 bg-white/5" : "bg-white/10"} `}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name ?? label}
            className="h-6 w-6 rounded-full object-cover"
          />
        ) : (
          <span className="text-lg text-white/30">
            {label === "Trigger" ? <Workflow /> : "→"}
          </span>
        )}
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col">
        <span className="text-[10px] font-medium tracking-widest text-white/35 uppercase">
          {stepNumber}. {label}
        </span>
        <span
          className={`mt-0.5 text-sm font-medium ${
            isEmpty ? "text-white/35" : "text-white/90"
          }`}
        >
          {name ?? `Choose a ${label.toLowerCase()}…`}
        </span>
      </div>

      {/* Chevron */}
      <span className="text-white/25 transition group-hover:text-white/50">
        <ChevronRight size={16} />
      </span>
    </button>
  )
}

/* ─────────────────────────────────────────
   Connector — vertical line between nodes
───────────────────────────────────────── */
function Connector({ short = false }: { short?: boolean }) {
  return (
    <div className={`flex flex-col items-center ${short ? "h-5" : "h-8"}`}>
      <div className="w-px flex-1 bg-linear-to-b from-white/20 to-white/10" />
      <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
    </div>
  )
}

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  index: number
  onSelect: (option: Option | null) => void
  options: Option[]
}

export function Modal({
  isOpen,
  onClose,
  onSelect,
  index,
  options,
}: ModalProps) {
  const [step, setStep] = useState(0)
  const [selectedAction, setSelectedAction] = useState<{
    id: string
    name: string
    image: string
    metadata?: Record<string, unknown>
  }>()
  const [search, setSearch] = useState("")
  const isTrigger = index === 1

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  if (!isOpen) return null

  const filtered = options.filter((o) =>
    o.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Sheet on mobile, centered dialog on sm+ */}
      <div className="relative w-full max-w-md animate-in overflow-hidden rounded-t-3xl border border-white/8 bg-[#111111] shadow-[0_32px_80px_rgba(0,0,0,0.7)] duration-200 fade-in slide-in-from-bottom-4 sm:rounded-sm sm:slide-in-from-bottom-0 sm:zoom-in-95">
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-white/15" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3 sm:pt-5">
          <div className="flex items-center gap-3">
            {step === 1 && (
              <button
                onClick={() => setStep(0)}
                className="flex h-8 w-8 items-center justify-center rounded-full border-white/10 text-white/50 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <BiLeftArrowAlt />
              </button>
            )}
            <div>
              <p className="text-[10px] font-medium tracking-widest text-white/30 uppercase">
                Step {index}
              </p>
              <h2 className="text-base leading-tight font-semibold text-white">
                {step === 0
                  ? `Choose a ${isTrigger ? "trigger" : "action"}`
                  : `Configure ${selectedAction?.name}`}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path
                d="M1 1l10 10M11 1L1 11"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Search — only on step 0 */}
        {step === 0 && (
          <div className="px-5 pb-3">
            <div className="flex items-center gap-2.5 rounded-sm border border-white/8 bg-white/4 px-3 py-2.5 transition focus-within:border-white/20">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0 text-white/30"
              >
                <circle
                  cx="7"
                  cy="7"
                  r="5.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path
                  d="M11 11l3 3"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
              <input
                autoFocus
                type="text"
                placeholder={`Search ${isTrigger ? "triggers" : "actions"}…`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-white/25 outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-white/30 transition hover:text-white/60"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M1 1l10 10M11 1L1 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="mx-5 h-px bg-neutral-500/20" />

        {/* Body */}
        <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 max-h-72 overflow-y-auto px-3 py-3">
          {/* ── Step 0: option list ── */}
          {step === 0 && (
            <div className="flex flex-col gap-1">
              {filtered.length === 0 && (
                <p className="py-8 text-center text-sm text-white/30">
                  No results for &ldquo;{search}&ldquo;
                </p>
              )}
              {filtered.map(({ id, name, image }) => (
                <button
                  key={id}
                  onClick={() => {
                    if (isTrigger) {
                      onSelect({ id, name, image })
                    } else {
                      setStep(1)
                      setSelectedAction({ id, name, image })
                    }
                  }}
                  className="group flex w-full items-center gap-3 rounded-sm border border-transparent px-3 py-2.5 text-left transition-all duration-100 hover:border-white/10 hover:bg-white/5 active:scale-[0.99]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={name}
                    className="h-8 w-8 shrink-0 rounded-xl object-cover ring-1 ring-white/10"
                  />
                  <span className="flex-1 text-sm font-medium text-white/80 transition group-hover:text-white">
                    {name}
                  </span>
                  <span className="text-white/20 transition group-hover:text-white/50">
                    <ChevronRight size={15} />
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* ── Step 1: Email config ── */}
          {step === 1 && selectedAction?.name === "Email" && (
            <EmailSelector
              setMetadata={(metadata) => {
                onSelect({
                  ...selectedAction,
                  image: selectedAction.image,
                  metadata,
                })
              }}
            />
          )}

          {/* ── Step 1: Solana config ── */}
          {step === 1 && selectedAction?.name === "Send-Solana" && (
            <SolanaSelector
              setMetadata={(metadata) => {
                onSelect({
                  ...selectedAction,
                  image: selectedAction.image,
                  metadata,
                })
              }}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-neutral-500/20 px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/50 transition hover:bg-white/10 hover:text-white/80"
          >
            Cancel
          </button>
          {step === 0 && (
            <button
              onClick={onClose}
              className="rounded-sm border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/12 hover:text-white"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function EmailSelector({
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

function SolanaSelector({
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
