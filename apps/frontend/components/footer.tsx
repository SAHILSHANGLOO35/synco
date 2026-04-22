import { Container } from "./container"

export const Footer = () => {
  return (
    <Container className="pt-16">
      <div className="flex flex-col gap-6 font-red-hat-display text-white">
        <div className="font-sans text-xs leading-tight font-medium tracking-wide text-white uppercase md:text-sm">
          Get started today
        </div>
        <div></div>
        <div></div>
      </div>
    </Container>
  )
}
