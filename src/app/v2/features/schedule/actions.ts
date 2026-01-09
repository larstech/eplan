import { ScheduleWeekDTO } from "@/app/v2/features/schedule/types"

export const fetchScheduleWeek = async (
  year: number,
  week: number,
): Promise<ScheduleWeekDTO> => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  return { id: 1, year, week }
}
