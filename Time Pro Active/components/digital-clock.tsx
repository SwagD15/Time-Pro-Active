"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface DigitalClockProps {
  timezone?: string
  className?: string
}

export function DigitalClock({ timezone = "UTC", className = "" }: DigitalClockProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formatTimeWithTimezone = () => {
    try {
      return time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: timezone,
        hour12: true,
      })
    } catch (error) {
      // Fallback to local time if timezone is invalid
      return time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    }
  }

  const [hours, minutes, seconds, period] = formatTimeWithTimezone().split(/[:\s]/)

  return (
    <div className={`text-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="time-display text-primary text-8xl md:text-9xl font-bold tracking-tighter"
      >
        {hours}
        <span className="animate-pulse">:</span>
        {minutes}
        <span className="animate-pulse">:</span>
        {seconds}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="time-display text-primary text-4xl md:text-5xl font-bold mt-2"
      >
        {period}
      </motion.div>
    </div>
  )
}

