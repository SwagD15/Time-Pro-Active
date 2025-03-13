"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { DigitalClock } from "@/components/digital-clock"
import { TimezoneSearch } from "@/components/timezone-search"
import { AppWrapper } from "@/components/app-wrapper"

export default function HomePage() {
  const [timezone, setTimezone] = useState("Asia/Kolkata")

  const handleTimezoneChange = (newTimezone: string) => {
    setTimezone(newTimezone)
  }

  const tileVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  }

  return (
    <AppWrapper>
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8">
          <TimezoneSearch onTimezoneChange={handleTimezoneChange} initialTimezone={timezone} />
        </div>

        <div className="bg-muted rounded-3xl p-8 mb-8">
          <DigitalClock timezone={timezone} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            variants={tileVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            transition={{ delay: 0.1 }}
          >
            <Link href="/pomodoro" className="block h-full">
              <div className="bg-muted rounded-3xl p-8 h-full flex items-center justify-center">
                <h2 className="text-primary text-3xl font-bold">Pomodoro</h2>
              </div>
            </Link>
          </motion.div>

          <motion.div
            variants={tileVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            transition={{ delay: 0.2 }}
          >
            <Link href="/analog-clock" className="block h-full">
              <div className="bg-muted rounded-3xl p-8 h-full flex items-center justify-center">
                <h2 className="text-primary text-3xl font-bold">Analog Clock</h2>
              </div>
            </Link>
          </motion.div>

          <motion.div
            variants={tileVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            transition={{ delay: 0.3 }}
          >
            <Link href="/stopwatch" className="block h-full">
              <div className="bg-muted rounded-3xl p-8 h-full flex items-center justify-center">
                <h2 className="text-primary text-3xl font-bold">Stop watch</h2>
              </div>
            </Link>
          </motion.div>

          <motion.div
            variants={tileVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            transition={{ delay: 0.4 }}
          >
            <Link href="/timer" className="block h-full">
              <div className="bg-muted rounded-3xl p-8 h-full flex items-center justify-center">
                <h2 className="text-primary text-3xl font-bold">Timer</h2>
              </div>
            </Link>
          </motion.div>

          <motion.div
            variants={tileVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            transition={{ delay: 0.5 }}
          >
            <Link href="/calendar" className="block h-full">
              <div className="bg-muted rounded-3xl p-8 h-full flex items-center justify-center">
                <h2 className="text-primary text-3xl font-bold">Calendar</h2>
              </div>
            </Link>
          </motion.div>

          <motion.div
            variants={tileVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            transition={{ delay: 0.6 }}
          >
            <Link href="/date-calculator" className="block h-full">
              <div className="bg-muted rounded-3xl p-8 h-full flex items-center justify-center">
                <h2 className="text-primary text-3xl font-bold text-center">Date Duration Calculator</h2>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </AppWrapper>
  )
}

