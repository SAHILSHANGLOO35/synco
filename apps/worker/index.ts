import dotenv from "dotenv"

import { Kafka } from "kafkajs"
import { prisma } from "db/client"
import type { JsonObject } from "../../packages/db/generated/prisma/runtime/library"
import { parse } from "./parser"
import { sendEmail } from "./email"
import { sendSol } from "./solana"

dotenv.config()

const TOPIC_NAME = "synco-events"

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
})

async function main() {
  const consumer = kafka.consumer({ groupId: "main-worker" })
  await consumer.connect()

  const producer = kafka.producer()
  await producer.connect()

  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true })

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic: TOPIC_NAME, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      })

      if (!message.value?.toString()) return

      const parsedValue = JSON.parse(message.value.toString())
      const { syncRunId, stage } = parsedValue

      const syncRunDetails = await prisma.syncRun.findFirst({
        where: { id: syncRunId },
        include: {
          sync: {
            include: {
              actions: {
                include: { type: true },
              },
            },
          },
        },
      })

      if (!syncRunDetails) {
        console.error(`SyncRun not found for id: ${syncRunId}`)
        return
      }

      const currentAction = syncRunDetails.sync.actions.find(
        (x) => x.sortingOrder === stage
      )

      if (!currentAction) {
        console.error(`No action found for stage ${stage}`)
        return
      }

      const syncRunMetadata = syncRunDetails.metadata
      const metadata = (
        typeof currentAction.metadata === "string"
          ? JSON.parse(currentAction.metadata)
          : currentAction.metadata
      ) as JsonObject

      if (currentAction.type.name === "Email") {
        const rawBody = metadata?.body as string
        const rawEmail = metadata?.email as string

        if (!rawBody || !rawEmail) {
          console.error(
            "Email action missing body or email in metadata:",
            metadata
          )
          return
        }

        const normalize = (s: string) =>
          s.replace(/\{\{/g, "{").replace(/\}\}/g, "}")

        const body = parse(normalize(rawBody), syncRunMetadata)
        const to = parse(normalize(rawEmail), syncRunMetadata)

        console.log(`Sending email to ${to}, body: ${body}`)
        await sendEmail(to, body)
      }

      if (currentAction.type.name === "Send-Solana") {
        const rawAmount = metadata?.amount as string
        const rawAddress = metadata?.address as string

        if (!rawAmount || !rawAddress) {
          console.error(
            "Solana action missing amount or address in metadata:",
            metadata
          )
          return
        }

        const normalize = (s: string) =>
          s.replace(/\{\{/g, "{").replace(/\}\}/g, "}")

        const amount = parse(normalize(rawAmount), syncRunMetadata)
        const address = parse(normalize(rawAddress), syncRunMetadata)

        console.log(`Sending ${amount} SOL to ${address}`)
        await sendSol(amount, address)
      }

      const totalActions = syncRunDetails.sync.actions.length ?? 1
      const lastStage = totalActions - 1

      if (lastStage !== stage) {
        await producer.send({
          topic: TOPIC_NAME,
          messages: [
            {
              value: JSON.stringify({
                stage: stage + 1,
                syncRunId,
              }),
            },
          ],
        })
      }

      await consumer.commitOffsets([
        {
          topic: TOPIC_NAME,
          partition,
          offset: (parseInt(message.offset) + 1).toString(),
        },
      ])
    },
  })
}

main()
