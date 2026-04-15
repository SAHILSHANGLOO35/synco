import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user"
import syncRouter from "./routes/sync"

const app = express()
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
  })
})

app.use("/api/v1/user", userRouter)
app.use("/api/v1/sync", syncRouter)

app.listen(process.env.PRIMARY_PORT, () => {
  console.log(
    `Primary Backend Server started on PORT ${process.env.PRIMARY_PORT}`
  )
})
