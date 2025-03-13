"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sun, Palette } from "lucide-react"
import { useThemeContext } from "@/contexts/theme-context"

export function ThemeSelector() {
  const [mounted, setMounted] = useState(false)
  const { themeVariant, setThemeVariant, toggleDarkMode, isDarkMode } = useThemeContext()

  // After mounting, we can safely access the theme context
  useEffect(() => {
    setMounted(true)
  }, [])

  // If not mounted yet, render a placeholder to avoid hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="text-primary">
        <Palette className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-primary">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuItem onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
          {isDarkMode ? "Light mode" : "Dark mode"}
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Theme Colors</DropdownMenuLabel>

        <DropdownMenuItem
          onClick={() => setThemeVariant("default")}
          className={themeVariant === "default" ? "bg-muted" : ""}
        >
          <div className="w-4 h-4 rounded-full bg-primary mr-2" />
          Default (Pink)
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setThemeVariant("blue")} className={themeVariant === "blue" ? "bg-muted" : ""}>
          <div className="w-4 h-4 rounded-full bg-blue-500 mr-2" />
          Blue
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setThemeVariant("purple")}
          className={themeVariant === "purple" ? "bg-muted" : ""}
        >
          <div className="w-4 h-4 rounded-full bg-purple-500 mr-2" />
          Purple
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setThemeVariant("green")}
          className={themeVariant === "green" ? "bg-muted" : ""}
        >
          <div className="w-4 h-4 rounded-full bg-green-500 mr-2" />
          Green
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Theme Styles</DropdownMenuLabel>

        <DropdownMenuItem
          onClick={() => setThemeVariant("night-sky")}
          className={themeVariant === "night-sky" ? "bg-muted" : ""}
        >
          <div className="w-4 h-4 rounded-full bg-blue-900 mr-2" />
          Night Sky
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setThemeVariant("ocean")}
          className={themeVariant === "ocean" ? "bg-muted" : ""}
        >
          <div className="w-4 h-4 rounded-full bg-cyan-500 mr-2" />
          Ocean
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setThemeVariant("sunflower")}
          className={themeVariant === "sunflower" ? "bg-muted" : ""}
        >
          <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2" />
          Sunflower Field
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

