import { PlusIcon } from "lucide-react"

export const AppSidebar = () => {
  return (
    <div className="flex h-full w-auto shrink-0 flex-col border-r border-rose-600/40 font-red-hat-display md:w-64">
      <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-auto p-4">
        <div className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-rose-600 px-4 py-2 font-semibold tracking-wide transition-all duration-150 active:scale-95">
          <span>
            <PlusIcon size={20} />
          </span>
          <span>Create Sync</span>
        </div>
      </div>
    </div>
  )
}
