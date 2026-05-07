import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js"

function parseSecretKey(secretKey: string): Uint8Array {
  try {
    const trimmed = secretKey.trim()
    const raw = trimmed.startsWith("[")
      ? JSON.parse(trimmed)
      : trimmed
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean)

    if (!Array.isArray(raw) || raw.length !== 64) {
      throw new Error("Secret key must be a 64-byte array")
    }

    return Uint8Array.from(
      raw.map((v) => {
        const byte = Number(v)
        if (!Number.isInteger(byte) || byte < 0 || byte > 255) {
          throw new Error(`Invalid byte value: ${v}`)
        }
        return byte
      })
    )
  } catch (err) {
    throw new Error(
      `Failed to parse SOL_PRIVATE_KEY: ${(err as Error).message}`
    )
  }
}

function solToLamports(amount: string): number {
  const normalized = amount.trim()

  if (!normalized || !/^\d+(\.\d+)?$/.test(normalized)) {
    throw new Error(`Invalid SOL amount: "${amount}"`)
  }

  const parts = normalized.split(".")
  const whole = parts[0]!
  const fraction = parts[1] ?? ""
  const lamports =
    BigInt(whole) * BigInt(LAMPORTS_PER_SOL) +
    BigInt(`${fraction}000000000`.slice(0, 9))

  if (lamports > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error("SOL amount exceeds safe integer limit")
  }

  return Number(lamports)
}

export async function sendSol(amount: string, to: string): Promise<string> {
  try {
    const privateKey = process.env.SOL_PRIVATE_KEY
    if (!privateKey) throw new Error("SOL_PRIVATE_KEY is not configured")

    const signer = Keypair.fromSecretKey(parseSecretKey(privateKey))
    const connection = new Connection(
      process.env.SOLANA_RPC_URL ?? clusterApiUrl("devnet"),
      "confirmed"
    )

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: signer.publicKey,
        toPubkey: new PublicKey(to),
        lamports: solToLamports(amount),
      })
    )

    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [signer],
      {
        commitment: "confirmed",
      }
    )

    console.log(`Sent ${amount} SOL to ${to}: ${signature}`)
    return signature
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    throw new Error(`sendSol failed: ${message}`)
  }
}
