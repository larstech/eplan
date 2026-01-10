"use client"

import { useEffect } from "react"

export default function BootstrapClient() {
  useEffect(() => {
    // @ts-expect-error Bootstrap JS has no TypeScript types
    import("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, [])

  return null
}
