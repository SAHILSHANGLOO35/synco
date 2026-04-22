import { SquareArrowOutUpRight } from "lucide-react"
import { Container } from "./container"

export const Footer = () => {
  return (
    <Container className="py-8">
      <div className="flex items-center justify-between px-2 font-red-hat-display text-white md:px-4">
        <div className="font-mono text-base font-medium text-neutral-400">
          @ 2026 SYNCO. All rights reserved.
        </div>
        <div className="group flex items-center gap-2 font-mono text-base font-medium text-neutral-400">
          <span>Created</span>
          <span>by</span>
          <a
            href="https://x.com/doubleSdotdev"
            target="_blank"
            className="group flex items-baseline-last gap-1"
          >
            <span className="cursor-pointer font-mono text-base font-medium text-neutral-400 transition-all duration-200 ease-in-out group-hover:underline">
              Sahil
            </span>

            <SquareArrowOutUpRight size={12} />
          </a>
        </div>
      </div>
    </Container>
  )
}
