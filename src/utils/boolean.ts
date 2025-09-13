export function boolToStr(value: boolean): string {
  return value ? "true" : "false"
}

export function strToBool(value: string): boolean {
  return value.toLowerCase() === "true"
}
