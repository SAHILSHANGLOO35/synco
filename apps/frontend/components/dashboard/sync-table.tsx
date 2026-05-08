"use client"
import { useState } from "react"
import { Sync } from "@/hooks/use-sync"
import { HOOKS_URL } from "@/config"
import { PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { LayoutIcon } from "@/icons/layout"

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <button
      onClick={handleCopy}
      title="Copy webhook URL"
      className={`ml-2 inline-flex shrink-0 items-center justify-center rounded-sm border px-2 py-1 text-[10px] font-semibold tracking-wide transition-all duration-200 ${
        copied
          ? "border-rose-400/60 bg-rose-500/20 text-rose-300"
          : "border-rose-600/30 bg-rose-500/5 text-rose-400/60 hover:border-rose-400/50 hover:bg-rose-500/15 hover:text-rose-300"
      } `}
    >
      {copied ? (
        <span className="flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="hidden sm:inline">Copied</span>
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <rect
              x="4"
              y="4"
              width="7"
              height="7"
              rx="1.2"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M8 4V2.8A.8.8 0 007.2 2H2.8A.8.8 0 002 2.8v4.4A.8.8 0 002.8 8H4"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <span className="hidden sm:inline">Copy</span>
        </span>
      )}
    </button>
  )
}

export const SyncTable = ({ syncs }: { syncs: Sync[] }) => {
  const router = useRouter()

  return (
    <>
      <div className="flex w-full justify-center p-4 font-red-hat-display sm:p-6">
        <div className="w-full overflow-hidden rounded-md border border-rose-600/40 bg-[#0a0a0a] backdrop-blur-md">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 bg-rose-500/4 px-4 py-3 sm:gap-4 sm:px-6">
            <div className="col-span-3 sm:col-span-2" />

            <div className="hidden sm:col-span-4 md:block">
              <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Sync Id
              </span>
            </div>

            <div className="hidden items-center justify-center sm:col-span-1 md:flex">
              <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                Created
              </span>
            </div>

            <div className="col-span-9 text-center text-xs font-bold tracking-widest text-muted-foreground uppercase sm:col-span-5">
              Webhook URL
            </div>
          </div>

          {/* Empty state */}
          {syncs.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-rose-400/60">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              <div className="text-sm font-medium">No syncs yet</div>
              <div
                className="group flex w-52 cursor-pointer items-center justify-between rounded-sm bg-rose-600 px-2 py-1.5 font-semibold tracking-wide text-white transition-all duration-200 ease-in-out hover:bg-rose-700/95"
                onClick={() => router.push("/sync/create")}
              >
                <div className="flex items-center gap-1">
                  <LayoutIcon className="text-rose-200 transition-all duration-200 ease-linear group-hover:text-white" />
                  <span>Create Sync</span>
                </div>
                <span className="rounded-sm bg-rose-700 p-1 shadow-xs shadow-black/10 transition-all duration-200 ease-linear group-hover:bg-rose-600">
                  <PlusIcon size={20} className="text-shadow-2xs" />
                </span>
              </div>
            </div>
          )}

          {/* Rows */}
          <div>
            {syncs.map((sync, idx) => {
              const webhookUrl = `${HOOKS_URL}/hooks/catch/1/${sync.id}`
              const rowDate = new Date(sync.createdAt)

              return (
                <div
                  key={idx}
                  style={{ animationDelay: `${idx * 40}ms` }}
                  className="group grid cursor-pointer grid-cols-12 items-center gap-2 border-b border-rose-600/20 px-4 py-4 transition-all duration-200 last:border-0 hover:bg-rose-600/4 sm:gap-4 sm:px-6 sm:py-5"
                >
                  {/* Icons */}
                  <div className="col-span-2 flex items-center gap-1 sm:gap-2">
                    {sync.trigger?.type?.image && (
                      <div className="relative shrink-0">
                        <div className="absolute inset-0 rounded-sm bg-rose-500/10 blur-sm group-hover:bg-rose-500/20" />
                        {/* eslint-disable-next-line @next/next/no-img-element  */}
                        <img
                          src={sync.trigger.type.image}
                          alt={sync.trigger.type.name}
                          className="relative h-6 w-6 rounded-sm object-contain sm:h-7 sm:w-7"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      {sync.actions.map((action, id) => (
                        <div key={id} className="relative shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element  */}
                          <img
                            src={action?.type?.image}
                            alt={action.type.name}
                            className="h-6 w-6 rounded-sm object-contain transition-transform duration-200 sm:h-7 sm:w-7"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sync ID */}
                  <div className="col-span-4 hidden flex-col gap-0.5 md:flex">
                    <span className="text-[14px] font-semibold tracking-wide">
                      {sync.name}
                    </span>
                    <span className="truncate text-[11px] font-semibold text-white/60 transition-colors duration-200 sm:text-[12px]">
                      {sync.id}
                    </span>
                  </div>

                  {/* Created At */}
                  <div className="col-span-2 text-center text-[11px] font-medium text-white sm:text-[13px] md:col-span-1">
                    <span className="hidden md:inline">
                      {rowDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "2-digit",
                      })}
                    </span>
                  </div>

                  {/* Webhook URL */}
                  <div className="col-span-8 flex items-center justify-center sm:col-span-5">
                    <div className="flex w-full max-w-full items-center justify-between rounded-sm border border-rose-600/20 bg-rose-500/5 px-2 py-1.5 transition-colors duration-200 group-hover:border-rose-500/30 group-hover:bg-rose-500/10 sm:px-3">
                      <span className="truncate text-[10px] font-medium text-rose-300/60 group-hover:text-rose-300/80 sm:text-[11px]">
                        <span className="hidden sm:inline">{webhookUrl}</span>
                        <span className="sm:hidden">…/{sync.id}</span>
                      </span>
                      <CopyButton text={webhookUrl} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
