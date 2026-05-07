"use client"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

export const SidebarButton = ({
  icon: Icon,
  text,
  active,
  onClick,
  isOpen,
}: {
  icon: LucideIcon
  text: string
  active?: boolean
  onClick?: () => void
  isOpen?: boolean
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group flex cursor-pointer items-center overflow-hidden rounded-sm px-2 py-1.5 transition-all duration-300 ease-in-out",
        isOpen ? "w-full gap-2" : "w-9 justify-center",
        active
          ? "bg-rose-600/20 text-white"
          : "text-neutral-300 hover:bg-rose-600/20 hover:text-white"
      )}
    >
      <Icon size={16} className="shrink-0 transition-transform duration-300" />

      <div
        className={cn(
          "text-sm font-medium whitespace-nowrap transition-all duration-300 ease-in-out",
          isOpen
            ? "max-w-30 translate-x-0 opacity-100"
            : "max-w-0 -translate-x-2 opacity-0"
        )}
      >
        {text}
      </div>
    </div>
  )
}
