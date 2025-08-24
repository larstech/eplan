import { inRange } from "@/utils/number"
import { DateTime } from "luxon"

type TimeBlock = {
  min: number
  max: number
  greeting: string
}

const morningStart = 6
const morningEnd = 12
const afternoonStart = 12
const afternoonEnd = 18
const eveningStart = 18
const eveningEnd = 24

const greetings: TimeBlock[] = [
  { min: morningStart, max: morningEnd, greeting: "Goedemorgen" },
  { min: afternoonStart, max: afternoonEnd, greeting: "Goedemiddag" },
  { min: eveningStart, max: eveningEnd, greeting: "Goedenavond" },
]

export const getGreetingByTime = (): string => {
  const hour = DateTime.now().hour
  const match = greetings.find((timeBlock) => inRange(hour, timeBlock.min, timeBlock.max))
  return match?.greeting ?? "Goedendag"
}
