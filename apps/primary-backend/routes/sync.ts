import { Router } from "express"
import { authMiddleware } from "../middlewares/middleware"

const router = Router()

router.post("/", authMiddleware, (req, res) => {})

router.get("/", authMiddleware, (req, res) => {})

router.get("/:syncId", authMiddleware, (req, res) => {})

export default router
