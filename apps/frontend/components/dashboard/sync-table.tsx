"use client"

import { Sync } from "@/hooks/use-sync"
import { HOOKS_URL } from "@/config"
import { useRouter } from "next/navigation"

export const SyncTable = ({ syncs }: { syncs: Sync[] }) => {
  const date = new Date()
  const router = useRouter()

  return (
    <div className="flex w-full justify-center p-4 sm:p-6">
      <div className="w-6xl min-w-full overflow-hidden rounded-2xl border border-rose-600/40 bg-linear-to-b from-rose-500/5 to-transparent font-red-hat-display shadow-sm backdrop-blur-md">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 border-rose-600/40 px-6 py-3 text-sm font-extrabold text-rose-300/80">
          <div className="col-span-2 text-center"></div>
          <div className="col-span-4">Name</div>
          <div className="col-span-1 text-center">Created At</div>
          <div className="col-span-4 text-center">Webhook URL</div>
          <div className="col-span-1 pr-2 text-right">Running</div>
          {/* <div className="col-span-2 pr-2 text-right"></div> */}
        </div>

        {/* Rows */}
        <div>
          {syncs.map((sync, idx) => (
            <div
              onClick={() => router.push(`/sync/create/${sync.id}`)}
              key={idx}
              className="group grid cursor-pointer grid-cols-12 items-center gap-4 border-b border-rose-600/40 px-6 py-6 transition-all duration-200 last:border-0 hover:bg-rose-500/10"
            >
              {/* Images/hooks */}
              <div className="col-span-2 flex items-center gap-2 text-center text-sm text-muted-foreground group-hover:text-rose-400">
                {/* eslint-disable-next-line @next/next/no-img-element  */}
                <img
                  src={sync.trigger?.type?.image}
                  alt={sync.trigger.type.name}
                  className="h-6 w-6 rounded-xs object-contain"
                />
                <div className="flex items-center gap-2">
                  {sync.actions.map((action, id) => (
                    <div key={id}>
                      {/* eslint-disable-next-line @next/next/no-img-element  */}
                      <img
                        src={action?.type?.image}
                        alt={action.type.name}
                        className="h-6 w-6 rounded-xs border border-white/30 object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Name of the Sync */}
              <div className="col-span-4 flex items-center gap-3">
                <div className="flex flex-col gap-0.5">
                  <span>Sync name</span>
                  <span className="text-justify font-mono text-xs font-medium text-muted-foreground">
                    {sync.id}
                  </span>
                </div>
              </div>

              {/* Created At */}
              <div className="col-span-1 text-center text-sm text-muted-foreground">
                {date.toDateString()}
              </div>

              <div className="col-span-4 text-center text-sm text-muted-foreground">
                {`${HOOKS_URL}/hooks/catch/1/${sync.id}`}
              </div>

              {/* Status */}
              <div className="col-span-1 flex flex-wrap justify-center gap-2 pr-4">
                GO
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
