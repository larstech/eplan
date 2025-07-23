import { inRange } from "@/utils/number"

const MORNING_START = 6
const MORNING_END = 12
const AFTERNOON_START = 12
const AFTERNOON_END = 18
const EVENING_START = 18
const EVENING_END = 24

const getGreetingByTime = () => {
  const currentHour = new Date().getHours()

  if (inRange(currentHour, MORNING_START, MORNING_END)) {
    return "Goedemorgen"
  } else if (inRange(currentHour, AFTERNOON_START, AFTERNOON_END)) {
    return "Goedemiddag"
  } else if (inRange(currentHour, EVENING_START, EVENING_END)) {
    return "Goedenavond"
  } else {
    return "Goedendag"
  }
}

export { getGreetingByTime }
