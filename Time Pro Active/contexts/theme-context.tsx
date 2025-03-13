"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useTheme } from "next-themes"

type ThemeVariant = "default" | "blue" | "purple" | "green" | "night-sky" | "ocean" | "sunflower"

interface ThemeContextType {
  themeVariant: ThemeVariant
  setThemeVariant: (theme: ThemeVariant) => void
  toggleDarkMode: () => void
  isDarkMode: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>("default")
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"
  const [mounted, setMounted] = useState(false)

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true)

    // Load saved theme variant from localStorage
    if (typeof window !== "undefined") {
      const savedVariant = localStorage.getItem("theme-variant") as ThemeVariant
      if (savedVariant) {
        setThemeVariant(savedVariant)
        applyThemeClass(savedVariant)
      }
    }
  }, [])

  const applyThemeClass = (variant: ThemeVariant) => {
    if (typeof document !== "undefined") {
      // Remove all theme classes
      document.body.classList.remove(
        "theme-blue",
        "theme-purple",
        "theme-green",
        "theme-night-sky",
        "theme-ocean",
        "theme-sunflower",
      )

      // Add new theme class if not default
      if (variant !== "default") {
        document.body.classList.add(`theme-${variant}`)
      }
    }
  }

  const handleSetThemeVariant = (variant: ThemeVariant) => {
    applyThemeClass(variant)

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("theme-variant", variant)
    }

    setThemeVariant(variant)
  }

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  // Create context value
  const contextValue = {
    themeVariant,
    setThemeVariant: handleSetThemeVariant,
    toggleDarkMode,
    isDarkMode,
  }

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider")
  }
  return context
}

