import { Kafka } from "kafkajs"

const TOPIC_NAME = "sync-events"

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
})

async function main() {
  const consumer = kafka.consumer({ groupId: "main-worker" })
  await consumer.connect()

  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true })

  // manually commiting the kafka cluster for acknowledgement
  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic: TOPIC_NAME, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      })

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
