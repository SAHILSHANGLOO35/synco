import { Container } from "./container"

export const Navbar = () => {
  return (
    <div className="fixed top-0 z-50 w-full border-b border-neutral-500/20 bg-[#0A0A0A] font-red-hat-display">
      <Container>
        <div className="flex h-16 items-center border-x border-neutral-500/20 pl-4 font-bold tracking-wide uppercase">
          synco
        </div>
      </Container>
    </div>
  )
}
