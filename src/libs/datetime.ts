const defaultOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}

export const formatDate = (
  value: Date,
  options?: Intl.DateTimeFormatOptions,
): string => {
  return new Intl.DateTimeFormat("nl-NL", {
    ...defaultOptions,
    ...options,
    timeZone: "Europe/Amsterdam",
  }).format(value)
}
