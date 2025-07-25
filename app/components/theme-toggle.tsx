"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Verificar preferencia guardada o del sistema
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden hover:bg-white/20 dark:hover:bg-slate-800/50"
    >
      <div className="relative">
        <Sun className={`h-5 w-5 transition-all duration-300 ${isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
        <Moon
          className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`}
        />
      </div>
    </Button>
  )
}
