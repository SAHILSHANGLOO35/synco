"use client"

import { motion } from "motion/react"
import { FaReact } from "react-icons/fa"
import { RiNextjsFill } from "react-icons/ri"
import { FaNodeJs } from "react-icons/fa"
import { SiExpress } from "react-icons/si"
import { BiLogoPostgresql } from "react-icons/bi"
import { SiApachekafka } from "react-icons/si"
import { SiPrisma } from "react-icons/si"
import { Container } from "./container"

export const LogoMarquee = () => {
  const logos = [
    FaReact,
    RiNextjsFill,
    FaNodeJs,
    SiExpress,
    BiLogoPostgresql,
    SiApachekafka,
    SiPrisma,
  ]

  return (
    <Container className="mt-4 md:mt-6">
      <div className="flex flex-col items-center gap-6 md:gap-8">
        {/* TEXT */}
        <div className="px-2 text-center text-xs font-medium tracking-wide text-muted-foreground sm:text-sm md:text-base">
          Powering Insights with Cutting-Edge Technology
        </div>

        <div className="w-full max-w-md overflow-hidden mask-r-from-80% mask-l-from-80% md:max-w-4xl">
          <motion.div
            className="flex gap-6 whitespace-nowrap sm:gap-10 md:gap-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 15,
              repeat: Infinity,
            }}
          >
            {[...logos, ...logos].map((Icon, idx) => (
              <div key={idx} className="shrink-0 py-2">
                <Icon className="text-4xl text-rose-500/75 transition-all duration-150 hover:scale-110 hover:text-rose-400 md:text-5xl" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Container>
  )
}
