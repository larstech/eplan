/**
 * Checks if a given value is within a specified range.
 *
 * @param value - The number to check.
 * @param start - The inclusive lower bound of the range.
 * @param end - The exclusive upper bound of the range.
 * @returns True if the value is greater than or equal to start and less than end; otherwise, false.
 */
const inRange = (value: number, start: number, end: number): boolean => {
  return value >= start && value < end
}

export { inRange }
