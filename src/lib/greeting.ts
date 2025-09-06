import { DateTime } from "luxon"

export default function getTimeBasedGreeting() {
  const morningEnd = 12
  const afternoonEnd = 18
  const localHour = DateTime.local().hour

  // Between 0 (inclusive) and 12 (exclusive).
  if (localHour < morningEnd) {
    return "Goedemorgen"
    // Between 12 (inclusive) and 18 (exclusive).
  } else if (localHour < afternoonEnd) {
    return "Goedemiddag"
  }

  // Between 18 and 23 (both inclusive).
  return "Goedenavond"
}
