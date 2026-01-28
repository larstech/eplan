export const localDateString = (
  date: Date,
  options?: Intl.DateTimeFormatOptions,
): string => {
  // This is safe under the assumption that the users are in Europe/Amsterdam
  const formatter = new Intl.DateTimeFormat("nl-NL", {
    ...options,
    timeZone: "Europe/Amsterdam",
  })
  return formatter.format(date)
}

export const weeksInYear = (year: number): 52 | 53 => {
  // Source: https://en.wikipedia.org/wiki/ISO_week_date#Weeks_per_year
  const p = (y: number) =>
    (y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400)) % 7
  const weeks = 52 + (p(year) === 4 || p(year - 1) === 3 ? 1 : 0)
  return weeks as 52 | 53
}
