import { Kafka } from "kafkajs"
import { prisma } from "db/client"

const TOPIC_NAME = "synco-events"

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
})

async function main() {
  const producer = kafka.producer()
  await producer.connect()

  while (1) {
    const pendingRows = await prisma.syncRunOutbox.findMany({
      where: {},
      take: 10,
    })

    await producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map((r) => ({
        value: JSON.stringify({ syncRunId: r.syncRunId, stage: 0 }),
      })),
    })

    await prisma.syncRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((r) => r.id),
        },
      },
    })
  }
}

main()
