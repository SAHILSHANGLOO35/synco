import { Container } from "@/components/container"
import { LandingNavbar } from "@/components/landing-navbar"
import DitherShader from "@/components/ui/dither-shader"
import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <Container className="flex w-full flex-1 items-center justify-center border-x border-rose-600/40">
        <div className="relative grid h-auto min-h-screen flex-1 grid-cols-1 gap-2 border-y border-neutral-500/20 pt-4 md:h-137.5 md:grid-cols-2">
          <div className="relative h-70 w-full overflow-hidden sm:h-90 md:h-full">
            <Image
              src="/images/dither-synco.jpeg"
              alt=""
              fill
              priority // disables lazy loading, fetches immediately
              className="object-cover"
            />

            <DitherShader
              src="/images/dither-synco.jpeg"
              gridSize={1}
              ditherMode="noise"
              threshold={2}
              backgroundColor="#000000"
              pixelRatio={1}
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-4 bg-[#121212] pt-4 font-red-hat-display md:pt-0">
            {children}
          </div>
        </div>
      </Container>
    </div>
  )
}
