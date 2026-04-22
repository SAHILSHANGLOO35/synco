import Link from "next/link"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import DitherShader from "./ui/dither-shader"
import { Container } from "./container"

export const SectionWrapper = ({
  image,
  icon: Icon,
  title,
  subtitle,
  description,
  link,
  className,
}: {
  image: string
  icon: LucideIcon
  title: string
  subtitle: string
  description: string
  link: string
  className?: string
}) => {
  return (
    <Container>
      <div
        className={cn(
          "flex h-dvh w-full items-center font-red-hat-display",
          className
        )}
      >
        <div className="relative grid h-137.5 flex-1 grid-cols-2 gap-2 border-y border-neutral-500/20">
          <span className="absolute top-0 left-0 h-2 w-2 border-t border-l border-rose-600 transition-colors" />
          <span className="absolute top-0 right-0 h-2 w-2 border-t border-r border-rose-600 transition-colors" />
          <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-rose-600 transition-colors" />
          <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-rose-600 transition-colors" />

          <div className="relative h-full w-full overflow-hidden p-1">
            <DitherShader
              src="/images/dither-synco.jpeg"
              gridSize={1}
              ditherMode="noise"
              threshold={2}
              backgroundColor="#000000"
              pixelRatio={1}
            />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt="Synco sync overview"
              className="absolute right-0 bottom-0 z-20 h-[88%] w-[90%] translate-x-1 translate-y-1 rounded-tl-lg object-cover object-top-left"
            />
          </div>

          <div className="flex flex-col justify-center gap-6 bg-[#121212] p-16">
            <div className="flex items-center gap-1 text-xs text-rose-500">
              <Icon size={18} />
              <span className="text-[14px] font-semibold text-rose-500 uppercase">
                {subtitle}
              </span>
            </div>
            <h1 className="text-5xl font-bold tracking-wide text-white">
              {title}
            </h1>
            <p className="font-medium text-muted-foreground md:text-base">
              {description}
            </p>
            <Link
              href={link}
              className="flex w-fit items-center gap-3 rounded-xs border border-black/20 bg-linear-to-b from-rose-600 to-rose-500 px-3 py-2 text-sm font-bold text-white shadow-[0px_0.75px_0px_0px_rgba(255,252,252,0.3)_inset,0px_1px_5px_0px_rgba(0,0,0,0.75)] transition-colors duration-200 ease-in-out text-shadow-2xs hover:from-rose-600/80"
            >
              Start Building
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}
