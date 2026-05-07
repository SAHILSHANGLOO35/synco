"use client"

import {
  LayoutDashboard,
  Share2,
  WebhookIcon,
  WorkflowIcon,
} from "lucide-react"

import { SidebarIcon } from "@phosphor-icons/react"
import { SidebarButton } from "../app-sidebar/sidebar-button"
import { useState } from "react"
import { cn } from "@/lib/utils"

export const AppSidebar = () => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div
      className={cn(
        "top-0 left-0 z-50 flex h-screen flex-col border-r border-rose-600/40 bg-black/80 font-red-hat-display text-white backdrop-blur-xl transition-all duration-300",
        isOpen ? "w-16 sm:w-40 md:w-64" : "w-16"
      )}
    >
      {/* TOP HEADER */}
      <div className="flex h-16 items-center justify-between px-4 font-bold tracking-wide">
        <div className="hidden items-center gap-2 overflow-hidden uppercase sm:flex">
          <WorkflowIcon
            className={cn(
              "shrink-0 text-rose-500",
              isOpen
                ? "hidden opacity-100 sm:block"
                : "hidden translate-x-5 opacity-0"
            )}
            size={18}
          />

          <div
            className={cn(
              "text-lg whitespace-nowrap transition-all duration-200 md:text-xl",
              isOpen ? "hidden opacity-100 sm:block" : "hidden opacity-0"
            )}
          >
            syn<span className="text-rose-500">co</span>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "group flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-sm transition-all duration-300 ease-in-out hover:bg-rose-900/40",
            isOpen ? "h-7 w-7" : "mx-auto h-7 w-7"
          )}
        >
          <SidebarIcon
            size={18}
            className={cn(
              "text-neutral-600 transition-all duration-300 ease-in-out group-hover:text-white"
            )}
          />
        </button>
      </div>

      {/* MENU AREA */}
      <div className="no-scrollbar flex flex-1 flex-col gap-2 overflow-y-auto border-t border-rose-600/40 p-4">
        <div
          className={cn(
            "text-sm font-bold tracking-tight text-neutral-300",
            isOpen ? "hidden sm:block" : "hidden"
          )}
        >
          Menu
        </div>

        <SidebarButton
          icon={LayoutDashboard}
          text="Dashboard"
          active={activeTab === "dashboard"}
          isOpen={isOpen}
          onClick={() => setActiveTab("dashboard")}
        />

        <SidebarButton
          icon={WebhookIcon}
          text="Explore Triggers"
          active={activeTab === "triggers"}
          isOpen={isOpen}
          onClick={() => setActiveTab("triggers")}
        />

        <SidebarButton
          icon={Share2}
          text="Explore Actions"
          active={activeTab === "actions"}
          isOpen={isOpen}
          onClick={() => setActiveTab("actions")}
        />
      </div>
    </div>
  )
}
