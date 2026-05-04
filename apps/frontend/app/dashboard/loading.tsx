"use client"

export default function Loading() {
  return (
    <div className="flex w-full justify-center p-4 sm:p-6">
      <div className="w-6xl min-w-full overflow-hidden rounded-2xl border border-rose-600/40 bg-linear-to-b from-rose-500/5 to-transparent font-red-hat-display shadow-sm backdrop-blur-md">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 border-rose-600/40 px-6 py-3 text-sm font-bold text-rose-300/80">
          <div className="col-span-1 flex justify-center"></div>
          <div className="col-span-5 flex justify-start">
            <div className="h-5 w-24 animate-pulse rounded-full bg-rose-500/15"></div>
          </div>
          <div className="col-span-2 flex justify-center">
            <div className="h-5 w-30 animate-pulse rounded-full bg-rose-500/15"></div>
          </div>
          <div className="col-span-2 flex justify-center">
            <div className="h-5 w-24 animate-pulse rounded-full bg-rose-500/15"></div>
          </div>
          <div className="col-span-2 flex justify-end"></div>
        </div>

        {/* Skeleton Rows */}
        <div>
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="grid grid-cols-12 items-center gap-4 border-b border-rose-600/40 px-6 py-6 last:border-0"
            >
              {/* Index */}
              <div className="col-span-1 flex justify-center">
                <div className="h-6 w-6 animate-pulse rounded-full bg-rose-500/15" />
              </div>

              {/* Name */}
              <div className="col-span-5 flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-rose-500/15" />
                <div className="h-5 w-72 animate-pulse rounded-full bg-rose-500/15" />
              </div>

              {/* Last Edit */}
              <div className="col-span-2 flex justify-center pr-8">
                <div className="h-4 w-20 animate-pulse rounded-full bg-rose-500/15" />
              </div>

              {/* Running */}
              <div className="col-span-2 flex justify-center pr-3">
                <div className="h-4 w-20 animate-pulse rounded-full bg-rose-500/15" />
              </div>

              {/* 5th Col */}
              <div className="col-span-2 flex justify-end pr-6">
                <div className="h-6 w-6 animate-pulse rounded-full bg-rose-500/15" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
