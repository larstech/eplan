import { neon } from "@neondatabase/serverless"

export const client = neon(`${process.env.DATABASE_URL}`)

export const sql = async <T>(
  strings: TemplateStringsArray,
  ...values: any[]
) => {
  try {
    // Wrap the query with a generic for type safety
    return (await client(strings, ...values)) as T
  } catch {
    console.error("Failed to execute query:", strings, values)
    // Return an empty object if the query fails
    return {} as T
  }
}
