"use client"

import { Container } from "../container"
import { SkeletonTestimonial } from "./skeletons/testimonial"

const StarRating = ({ count }: { count: number }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={`h-4 w-4 ${i < count ? "fill-rose-200" : "fill-gray-600"}`}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
)

export const Testimonials = () => {
  const users = [
    {
      review:
        "Loved the simplicity of the service and the prompt customer support. We can't imagine working without it.",
      image: "/testimonials/anuj-gill.jpg",
      username: "Anuj Gill",
      userRole: "Founder of EventsPRO",
      stars: 4,
    },
    {
      review:
        "Very easy to use and quick to set up. Everything feels simple and clear, and it does exactly what you expect without any confusion.",
      image: "/testimonials/arkan-khan.jpg",
      username: "Arkan Khan",
      userRole: "Engineer at Smallcase",
      stars: 4,
    },
    {
      review:
        "Clean and simple design that's easy to understand. It gives you all the important info without making things complicated or overwhelming.",
      image: "/testimonials/om-alve.png",
      username: "Om Alve",
      userRole: "Head at PuchAI",
      stars: 5,
    },
  ]

  return (
    <Container>
      <div className="flex w-full flex-col items-center gap-4 font-red-hat-display md:gap-12">
        <h1 className="text-md font-sans leading-tight font-medium tracking-wide text-white uppercase">
          Trusted By Teams Worldwide
        </h1>
        <div className="max-w-4xl text-center text-3xl font-bold text-rose-500/80">
          {users[0].review}
        </div>
        <div className="mx-auto mt-4 flex max-w-4xl">
          <div className="flex gap-4 overflow-visible mask-r-from-50% mask-l-from-50% py-2 md:gap-32">
            {users.map((user, idx) => (
              <div
                key={idx}
                className="duration:150 transition-all hover:scale-105"
              >
                <SkeletonTestimonial
                  review={user.review}
                  image={user.image}
                  username={user.username}
                  userRole={user.userRole}
                  stars={<StarRating count={user.stars} />}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}
