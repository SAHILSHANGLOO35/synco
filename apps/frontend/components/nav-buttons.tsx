import React from "react"

export const NavButtons = ({ text }: { text: string }) => {
  return (
    <button className="group relative cursor-pointer border border-rose-900/40 px-8 py-2 text-sm font-medium tracking-wide text-rose-200 transition-colors duration-500 hover:bg-rose-900/40 hover:text-white">
      <span className="absolute top-0 left-0 h-2 w-2 border-t border-l border-rose-600 transition-all duration-500 ease-in-out group-hover:h-full group-hover:w-full"></span>

      <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-rose-600 transition-all duration-500 ease-in-out group-hover:h-full group-hover:w-full"></span>

      <span className="absolute top-0 right-0 h-2 w-2 border-t border-r border-rose-600 transition-all duration-500 ease-in-out group-hover:h-full group-hover:w-full"></span>

      <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-rose-600 transition-all duration-500 ease-in-out group-hover:h-full group-hover:w-full"></span>

      <span className="relative z-10">{text}</span>
    </button>
  )
}
