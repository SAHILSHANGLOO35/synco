import express from "express"
import cors from "cors"
import userRouter from "./routes/user"
import syncRouter from "./routes/sync"

const app = express()
app.use(cors({ origin: "http://localhost:3000" }))
app.use(express.json())

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
