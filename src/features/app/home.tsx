import { homeNavigationLinks } from "./constants"
import getTimeBasedGreeting from "@/lib/greeting"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-primary mb-4">
        {getTimeBasedGreeting()}!
      </h2>
      <p className="text-lg mb-6">Wat gaan we doen vandaag?</p>

      <ul className="space-y-3">
        {homeNavigationLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex gap-x-1 items-center text-primary"
            >
              <ArrowRight /> {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
