export const TabularInfo = () => {
  return (
    <div className="mx-auto mt-5 max-w-6xl">
      <div className="border border-rose-600">
        <div className="flex h-24 items-center border-b border-rose-500 px-2 text-3xl font-bold tracking-wide text-white uppercase sm:px-4 md:px-8">
          synco
        </div>

        <div className="grid w-full grid-cols-4 border-b border-rose-500 sm:px-4 md:px-8">
          <div className="col-span-2 border-r border-rose-500 py-16 text-3xl text-white">
            <div className="mb-2 font-medium">Connect events.</div>
            <div className="mb-2 font-medium">Connect events to actions.</div>
            <div className="font-medium">
              Connect events to actions. Automate everything.
            </div>
          </div>

          <div className="col-span-2 py-16 pl-2 text-white sm:pl-4 md:pl-8">
            <div className="max-w-md text-xl leading-relaxed">
              Triggers start the flow. Actions complete it. Synco connects both
              - so your apps and workflows stay in sync without extra overhead.
            </div>
          </div>
        </div>

        <div className="flex w-full flex-wrap">
          <div className="grid flex-1 grid-rows-[auto_auto_1fr] border-r border-rose-500 px-2 py-2 sm:px-4 sm:py-4 md:px-8 md:py-8">
            <div className="mb-4 text-lg font-semibold text-rose-500">
              Auth / Getting started
            </div>
            <div className="mb-0.5 font-medium">One account.</div>
            <div className="tracking-wide text-white">
              Sign up with email, username, and password. No complex setup -
              just get in and start building your syncs.
            </div>
          </div>

          <div className="grid flex-1 grid-rows-[auto_auto_1fr] border-r border-rose-500 px-2 py-2 sm:px-4 sm:py-4 md:px-8 md:py-8">
            <div className="mb-4 text-lg font-semibold text-rose-500">
              Core feature
            </div>
            <div className="mb-0.5 font-medium">One sync system.</div>
            <div className="tracking-wide text-white">
              Create syncs by connecting triggers and actions. Define what
              happens, and Synco handles the flow.
            </div>
          </div>

          <div className="grid flex-1 grid-rows-[auto_auto_1fr] border-r border-rose-500 px-2 py-2 sm:px-4 sm:py-4 md:px-8 md:py-8">
            <div className="mb-4 text-lg font-semibold text-rose-500">
              Execution / reliability
            </div>
            <div className="mb-0.5 font-medium">One execution flow.</div>
            <div className="tracking-wide text-white">
              Every trigger runs through a structured pipeline. Actions execute
              in order, so your workflows stay predictable.
            </div>
          </div>

          <div className="grid flex-1 grid-rows-[auto_auto_1fr] px-2 py-2 sm:px-4 sm:py-4 md:px-8 md:py-8">
            <div className="mb-4 text-lg font-semibold text-rose-500">
              Simplicity / control
            </div>
            <div className="mb-0.5 font-medium">One simple interface.</div>
            <div className="tracking-wide text-white">
              Manage all your syncs in one place. No scattered logic, no
              unnecessary complexity.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
