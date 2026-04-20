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
      <div className="flex flex-col items-center gap-8">
        <div className="text-sm font-medium tracking-wide text-muted-foreground md:text-base">
          Powering Insights with Cutting-Edge Technology
        </div>

        <div className="max-w-4xl overflow-hidden mask-r-from-80% mask-l-from-80%">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 15,
              repeat: Infinity,
            }}
          >
            {[...logos, ...logos].map((Icon, idx) => (
              <div key={idx} className="shrink-0 py-2">
                <Icon className="text-5xl text-rose-500/75 transition-all duration-150 hover:scale-110 hover:text-rose-400" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Container>
  )
}
