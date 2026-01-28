import { toggleTheme } from "@/features/theme-switcher/actions"
import { defaultTheme } from "@/features/theme-switcher/contants"
import { MoonIcon, SunIcon } from "lucide-react"
import { useEffect, useState } from "react"

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light")

  const handleClick = async () => {
    const nextTheme = await toggleTheme()
    setTheme(nextTheme)

    // Bootstrap uses data-bs-theme attribute to determine the right colors, no React hook or provider necessary
    document.documentElement.setAttribute("data-bs-theme", nextTheme)
  }

  useEffect(() => {
    const theme =
      document.documentElement.getAttribute("data-bs-theme") ?? defaultTheme
    setTheme(theme)
  }, [])

  return (
    <div className="d-flex justify-content-center">
      {theme === "light" ? (
        <SunIcon onClick={handleClick} style={{ cursor: "pointer" }} />
      ) : (
        <MoonIcon onClick={handleClick} style={{ cursor: "pointer" }} />
      )}
    </div>
  )
}
