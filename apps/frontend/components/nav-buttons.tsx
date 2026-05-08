import { cn } from "@/lib/utils"
import Link from "next/link"
import { Loader2 } from "lucide-react"

type Props = {
  link?: string
  text: string
  className?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
}

export const NavButtons = ({
  link,
  text,
  className,
  onClick,
  disabled,
  loading = false,
}: Props) => {
  const baseStyles =
    "group relative flex items-center justify-center gap-2 border border-rose-900/40 px-8 py-2 text-sm font-medium tracking-wide text-rose-200 transition-colors duration-500 hover:bg-rose-900/40 hover:text-white"

  const loadingStyles = loading ? "pointer-events-none opacity-60" : ""

  if (link) {
    return (
      <Link href={link} className={cn(baseStyles, className, loadingStyles)}>
        <ButtonContent text={text} loading={loading} />
      </Link>
    )
  }

  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(baseStyles, className, loadingStyles)}
    >
      <ButtonContent
        text={loading ? "Publishing..." : text}
        loading={loading}
      />
    </button>
  )
}

const ButtonContent = ({
  text,
  loading,
}: {
  text: string
  loading?: boolean
}) => (
  <>
    <span className="absolute top-0 left-0 h-2 w-2 border-t border-l border-rose-600 transition-all duration-500 group-hover:h-full group-hover:w-full"></span>

    <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-rose-600 transition-all duration-500 group-hover:h-full group-hover:w-full"></span>

    <span className="absolute top-0 right-0 h-2 w-2 border-t border-r border-rose-600 transition-all duration-500 group-hover:h-full group-hover:w-full"></span>

    <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-rose-600 transition-all duration-500 group-hover:h-full group-hover:w-full"></span>

    <span className="relative z-10 flex items-center gap-2">
      {loading && <Loader2 size={16} className="animate-spin" />}
      {text}
    </span>
  </>
)
