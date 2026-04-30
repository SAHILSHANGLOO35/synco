import { Router } from "express"
import { authMiddleware } from "../middlewares/middleware"
import { prisma } from "db/client"

const router = Router()

router.get("/available", async (req, res) => {
  const availableActions = await prisma.availableAction.findMany({})

  return res.status(200).json({ availableActions })
})

export default router
