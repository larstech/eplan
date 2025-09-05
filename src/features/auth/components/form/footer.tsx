import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FormFooter() {
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        Deze omgeving is uitsluitend bedoeld voor medewerkers van Yourtech. Ben
        je geen medewerker, maar zoek je wel informatie over Yourtech?
      </p>
      <Link href="https://yourtech.nl/nl">
        <Button variant="link">Klik dan hier</Button>
      </Link>
    </div>
  )
}
