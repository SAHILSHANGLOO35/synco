export function parse(
  text: string,
  values: any,
  startDelimiter = "{",
  endDelimiter = "}"
) {
  // Example:
  // "You received {comment.amount} money from {comment.link}"

  if (!text || typeof text !== "string") {
    throw new Error(`parse() received invalid input: ${JSON.stringify(text)}`)
  }

  let finalString = ""

  let startIndex = 0
  let endIndex = 1

  while (endIndex <= text.length) {
    if (text[startIndex] === startDelimiter) {
      let endPoint = startIndex + 1

      // Find closing delimiter
      while (endPoint < text.length && text[endPoint] !== endDelimiter) {
        endPoint++
      }

      // No closing delimiter found
      if (endPoint >= text.length) {
        finalString += text.slice(startIndex)
        break
      }

      // Extract content inside {}
      const path = text.slice(startIndex + 1, endPoint).trim()

      // Skip empty {}
      if (!path) {
        startIndex = endPoint + 1
        endIndex = startIndex + 1
        continue
      }

      const keys = path.split(".")

      let localValues: any = values

      // Traverse object safely
      for (const key of keys) {
        if (localValues == null) {
          break
        }

        // Parse stringified JSON if needed
        if (typeof localValues === "string") {
          try {
            localValues = JSON.parse(localValues)
          } catch {
            localValues = null
            break
          }
        }

        localValues = localValues[key]
      }

      // Append resolved value
      finalString += localValues ?? ""

      // Move pointers
      startIndex = endPoint + 1
      endIndex = startIndex + 1
    } else {
      finalString += text[startIndex]

      startIndex++
      endIndex++
    }
  }

  return finalString
}
