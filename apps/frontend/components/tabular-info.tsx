"use client"

import { MoveRight, WorkflowIcon } from "lucide-react"

export const TabularInfo = () => {
  return (
    <div className="mx-auto mt-5 max-w-6xl px-2 md:px-0">
      <div className="border border-rose-600">
        {/* HEADER */}
        <div className="flex h-16 items-center border-b border-rose-500 bg-rose-600/15 px-2 text-xl font-bold tracking-wide text-white uppercase sm:h-20 sm:px-4 sm:text-2xl md:h-24 md:px-8 md:text-3xl">
          <WorkflowIcon className="mr-2 text-rose-500" size={22} />
          syn <span className="text-rose-500">co</span>
        </div>

        {/* HERO SECTION */}
        <div className="grid w-full grid-cols-1 border-b border-rose-500 md:grid-cols-2">
          {/* LEFT */}
          <div className="border-b border-rose-500 px-2 py-8 text-xl text-white sm:px-4 sm:py-12 sm:text-2xl md:border-r md:border-b-0 md:px-8 md:py-16 md:text-3xl">
            <div className="mb-2 font-semibold">
              Connect <span className="text-rose-500">events.</span>
            </div>
            <div className="mb-2 font-semibold">
              Connect events to <span className="text-rose-500">actions.</span>
            </div>
            <div className="font-semibold">
              Connect events to actions.{" "}
              <span className="text-rose-500">Automate everything.</span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center py-8 pl-2 text-white/85 sm:py-12 sm:pl-4 md:py-16 md:pl-8">
            <div className="max-w-md text-sm leading-relaxed font-thin sm:text-lg md:text-xl">
              Triggers start the flow. Actions complete it. Synco connects both
              - so your apps and workflows stay in sync without extra overhead.
            </div>
          </div>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 border-b border-rose-500 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Auth / Getting started",
              heading: "One account.",
              text: "Sign up with email, username, and password. No complex setup - just get in and start building your syncs.",
            },
            {
              title: "Core feature",
              heading: "One sync system.",
              text: "Create syncs by connecting triggers and actions. Define what happens, and Synco handles the flow.",
            },
            {
              title: "Execution / reliability",
              heading: "One execution flow.",
              text: "Every trigger runs through a structured pipeline. Actions execute in order, so your workflows stay predictable.",
            },
            {
              title: "Simplicity / control",
              heading: "One simple interface.",
              text: "Manage all your syncs in one place. No scattered logic, no unnecessary complexity.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="border-r border-b border-rose-500 px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:border-b-0"
            >
              <div className="mb-3 text-base font-semibold text-rose-500 sm:text-[18px]">
                {item.title}
              </div>
              <div className="mb-1 text-sm font-semibold text-white sm:text-base">
                {item.heading}
              </div>
              <div className="text-sm tracking-wide text-white sm:text-base">
                {item.text}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 gap-6 px-3 py-6 sm:grid-cols-2 sm:px-4 md:px-8 lg:grid-cols-3">
          <div className="flex flex-col text-white">
            <div className="flex items-center gap-2 text-xl font-bold text-rose-500 sm:text-2xl md:text-3xl">
              Triggers <MoveRight /> Actions
            </div>
            <div className="mt-2 text-sm sm:text-base">
              Define once. Run automatically
            </div>
          </div>

          <div className="flex flex-col text-white">
            <div className="text-xl font-bold text-rose-500 sm:text-2xl md:text-3xl">
              Real - Time
            </div>
            <div className="mt-2 text-sm sm:text-base">
              Syncs start the moment events arrive.
            </div>
          </div>

          <div className="flex flex-col text-white">
            <div className="text-xl font-bold text-rose-500 sm:text-2xl md:text-3xl">
              Ordered Execution
            </div>
            <div className="mt-2 text-sm sm:text-base">
              Actions run step-by-step, reliably.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
