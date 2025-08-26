"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NotFound() {
  const pathname = usePathname()

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md">
        <Image
          src="/yourtech-logo-full.png"
          alt="Yourtech logo"
          width="300"
          height="1"
        />
        <h2 className="font-semibold">404. Pagina niet gevonden</h2>

        <p>
          De verzochte URL <em>{pathname}</em> was niet gevonden.
        </p>

        <Link href="/">
          <Button className="mt-4">Ga terug naar de startpagina</Button>
        </Link>
      </div>
    </div>
  )
}
