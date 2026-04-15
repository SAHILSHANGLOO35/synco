import express from "express"
import dotenv from "dotenv"
import { prisma } from "db/client"

dotenv.config()
const app = express()
app.use(express.json())

const PORT = process.env.PORT

app.post("/hooks/catch/:userId/:syncId", async (req, res) => {
  const { userId, syncId } = req.params
  const body = req.body

  // store in db a new trigger
  await prisma.$transaction(async (tx) => {
    const run = await tx.syncRun.create({
      data: {
        syncId,
        metadata: body,
      },
    })

    await tx.syncRunOutbox.create({
      data: {
        syncRunId: run.id,
      },
    })
  })

  res.status(200).json({
    message: "Webhook received",
  })
})

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`)
})
