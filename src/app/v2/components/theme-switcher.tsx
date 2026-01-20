import { MoonIcon, SunIcon } from "lucide-react"
import { useEffect, useState } from "react"

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    // Bootstrap uses data-bs-theme attribute to determine the right colors, no React hook or provider necessary
    document.documentElement.setAttribute("data-bs-theme", theme)
  }, [theme])

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light")

  return (
    <div className="d-flex justify-content-center">
      {theme === "light" ? (
        <SunIcon onClick={toggleTheme} />
      ) : (
        <MoonIcon onClick={toggleTheme} />
      )}
    </div>
  )
}
