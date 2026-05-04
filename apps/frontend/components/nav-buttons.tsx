import { cn } from "@/lib/utils"
import Link from "next/link"

type Props = {
  link?: string
  text: string
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export const NavButtons = ({
  link,
  text,
  className,
  onClick,
  disabled,
}: Props) => {
  const baseStyles =
    "group relative cursor-pointer border border-rose-900/40 px-8 py-2 text-sm font-medium tracking-wide text-rose-200 transition-colors duration-500 hover:bg-rose-900/40 hover:text-white"

  if (link) {
    return (
      <Link href={link} className={cn(baseStyles, className)}>
        <ButtonContent text={text} />
      </Link>
    )
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(baseStyles, className)}
    >
      <ButtonContent text={text} />
    </button>
  )
}

const ButtonContent = ({ text }: { text: string }) => (
  <>
    <span className="absolute top-0 left-0 h-2 w-2 border-t border-l border-rose-600 transition-all duration-500 group-hover:h-full group-hover:w-full"></span>
    <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-rose-600 transition-all duration-500 group-hover:h-full group-hover:w-full"></span>
    <span className="absolute top-0 right-0 h-2 w-2 border-t border-r border-rose-600 transition-all duration-500 group-hover:h-full group-hover:w-full"></span>
    <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-rose-600 transition-all duration-500 group-hover:h-full group-hover:w-full"></span>
    <span className="relative z-10">{text}</span>
  </>
)
