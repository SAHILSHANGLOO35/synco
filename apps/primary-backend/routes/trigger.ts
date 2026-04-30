import { Router } from "express"
import { authMiddleware } from "../middlewares/middleware"
import { prisma } from "db/client"

const router = Router()

router.get("/available", authMiddleware, async (req, res) => {
  const availableTriggers = await prisma.availableTrigger.findMany({})

  res.status(200).json({ availableTriggers })
})

export default router
