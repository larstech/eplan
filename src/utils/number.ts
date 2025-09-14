/**
 * Checks if a given value is within a specified range.
 *
 * @param value - The number to check.
 * @param start - The inclusive lower bound of the range.
 * @param end - The exclusive upper bound of the range.
 * @returns True if the value is greater than or equal to start and less than end; otherwise, false.
 */
export function inRange(value: number, start: number, end: number): boolean {
  return value >= start && value < end
}

/**
 * Checks if a given value starts with some other value.
 * @param target - The number to check.
 * @param value - The value that could match.
 * @returns True is the target starts with the vlaue; otherwise, false.
 */
export function startsWith(target: number, value: number): boolean {
  return target.toString().startsWith(String(value))
}
