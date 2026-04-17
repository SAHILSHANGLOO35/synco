import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { Router } from "express"
import { prisma } from "db/client"
import { authMiddleware } from "../middlewares/middleware"
import { SigninSchema, SignupSchema } from "../types"

const router = Router()

router.post("/signup", async (req, res) => {
  try {
    const result = SignupSchema.safeParse(req.body)

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
      })
    }

    const { name, email, password } = result.data

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

    // await sendEmail()

    return res.status(201).json({
      message: `User created successfully!`,
    })
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong during signup",
    })
  }
})

router.post("/signin", async (req, res) => {
  try {
    const result = SigninSchema.safeParse(req.body)

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.issues.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
      })
    }

    const { email, password } = result.data

    const isExistingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (!isExistingUser) {
      return res.status(401).json({
        message: "Invalid email or password",
      })
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isExistingUser.password
    )

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      })
    }

    const token = jwt.sign(
      { userId: isExistingUser.id },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    )

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({
      message: "Signin successful",
    })
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({
      message: "Something went wrong during signin",
    })
  }
})

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId

    const isExistingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
      },
    })

    if (!isExistingUser) {
      return res.status(404).json({
        message: "User not found!",
      })
    }

    return res.status(200).json({
      User: isExistingUser,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while getting the user",
    })
  }
})

export default router
