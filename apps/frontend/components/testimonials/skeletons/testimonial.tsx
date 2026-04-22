import Image from "next/image"
import { ReactNode } from "react"

export type TestimonialsProps = {
  review?: string
  image: string
  username: string
  userRole: string
  stars: ReactNode
}

export const SkeletonTestimonial = ({
  image,
  username,
  userRole,
  stars,
}: TestimonialsProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 text-center text-white">
      <div className="relative h-20 w-20">
        <Image
          src={image}
          alt="Testimonial Image"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="font-bold">{username}</div>
      <div className="text-neutral-50/90">{userRole}</div>
      <div>{stars}</div>
    </div>
  )
}
