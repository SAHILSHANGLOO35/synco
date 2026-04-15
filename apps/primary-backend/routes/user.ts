import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Router } from "express"
import { prisma } from "db/client"
import { authMiddleware } from "../middlewares/middleware"

const router = Router()

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body

    const isExistingUser = await prisma.user.findFirst({
      where: { email },
    })

    if (isExistingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists!" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return res.status(200).json({
      message: `User with name: ${name} and email: ${email} created successfully!`,
    })
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong during signup",
    })
  }
})

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body

    const isExistingUser = await prisma.user.findFirst({
      where: { email },
    })

    if (!isExistingUser) {
      return res.status(404).json({
        message: "User is not signed up! Register first",
      })
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isExistingUser.password
    )

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Password mismatch",
      })
    }

    const token = jwt.sign(
      { userId: isExistingUser.id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    )

    return res.status(200).json({ token })
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong during signin",
    })
  }
})

router.get("/user", authMiddleware, (req, res) => {})

export default router
