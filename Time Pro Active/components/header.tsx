"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeSelector } from "./theme-selector"
import { MusicPlayerButton } from "./music-player-button"

export function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <header className="flex items-center justify-between p-4 w-full bg-background">
      <div className="flex items-center gap-2">
        {!isHomePage && (
          <Link href="/" className="mr-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2">
              <ArrowLeft className="h-6 w-6 text-primary" />
            </motion.div>
          </Link>
        )}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Time Pro Active Logo" width={40} height={40} className="object-contain" />
          <span className="text-primary text-xl font-bold">Time Pro Active</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-4">
          <Link href="https://24timezones.com/#/map" className="text-primary hover:underline">
            World Time Converter
          </Link>
          <Link href="https://www.rapidtables.com/" className="text-primary hover:underline">
            Calculator
          </Link>
          <Link href="https://excalidraw.com/" className="text-primary hover:underline">
            Note taker
          </Link>
        </nav>
        <MusicPlayerButton />
        <ThemeSelector />
      </div>
    </header>
  )
}

