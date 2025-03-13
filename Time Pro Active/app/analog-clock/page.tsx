"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AppWrapper } from "@/components/app-wrapper"
import { TimezoneSearch } from "@/components/timezone-search"

export default function AnalogClockPage() {
  const [timezone, setTimezone] = useState("Asia/Kolkata")
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const handleTimezoneChange = (newTimezone: string) => {
    setTimezone(newTimezone)
  }

  // Calculate clock hand angles
  const getTimeInTimezone = () => {
    try {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      })

      const formattedTime = formatter.format(time)
      const [timePart, period] = formattedTime.split(" ")
      const [hours, minutes, seconds] = timePart.split(":").map(Number)

      return {
        hours: hours % 12,
        minutes,
        seconds,
        period,
      }
    } catch (error) {
      // Fallback to local time if timezone is invalid
      const hours = time.getHours()
      return {
        hours: hours % 12,
        minutes: time.getMinutes(),
        seconds: time.getSeconds(),
        period: hours >= 12 ? "PM" : "AM",
      }
    }
  }

  const { hours, minutes, seconds, period } = getTimeInTimezone()

  const hourDegrees = hours * 30 + minutes * 0.5
  const minuteDegrees = minutes * 6
  const secondDegrees = seconds * 6

  return (
    <AppWrapper>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl mx-auto"
      >
        <div className="bg-muted rounded-3xl p-8 flex flex-col items-center">
          <h1 className="text-primary text-4xl font-bold mb-12">ANALOG CLOCK</h1>

          <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
            {/* Clock face */}
            <div className="absolute inset-0 rounded-full border-2 border-primary bg-card"></div>

            {/* Hour markers */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-2 bg-card-foreground"
                style={{
                  left: `${50 + 45 * Math.sin((i * 30 * Math.PI) / 180)}%`,
                  top: `${50 - 45 * Math.cos((i * 30 * Math.PI) / 180)}%`,
                  transform: "translate(-50%, -50%)",
                }}
              ></div>
            ))}

            {/* Hour numbers */}
            <div
              className="absolute text-primary font-bold text-xl"
              style={{ left: "50%", top: "10%", transform: "translateX(-50%)" }}
            >
              12
            </div>
            <div
              className="absolute text-primary font-bold text-xl"
              style={{ left: "85%", top: "50%", transform: "translateY(-50%)" }}
            >
              3
            </div>
            <div
              className="absolute text-primary font-bold text-xl"
              style={{ left: "50%", top: "85%", transform: "translateX(-50%)" }}
            >
              6
            </div>
            <div
              className="absolute text-primary font-bold text-xl"
              style={{ left: "15%", top: "50%", transform: "translateY(-50%)" }}
            >
              9
            </div>

            {/* Hour hand */}
            <div
              className="absolute w-1.5 bg-card-foreground rounded-full origin-bottom"
              style={{
                height: "30%",
                left: "50%",
                bottom: "50%",
                transform: `translateX(-50%) rotate(${hourDegrees}deg)`,
                transformOrigin: "bottom center",
              }}
            ></div>

            {/* Minute hand */}
            <div
              className="absolute w-1 bg-primary rounded-full origin-bottom"
              style={{
                height: "40%",
                left: "50%",
                bottom: "50%",
                transform: `translateX(-50%) rotate(${minuteDegrees}deg)`,
                transformOrigin: "bottom center",
              }}
            ></div>

            {/* Second hand */}
            <div
              className="absolute w-0.5 bg-primary rounded-full origin-bottom"
              style={{
                height: "45%",
                left: "50%",
                bottom: "50%",
                transform: `translateX(-50%) rotate(${secondDegrees}deg)`,
                transformOrigin: "bottom center",
              }}
            ></div>

            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

            {/* AM/PM indicator */}
            <div className="absolute top-[60%] left-1/2 -translate-x-1/2 text-primary font-bold">{period}</div>
          </div>

          <div className="w-full max-w-xs mt-4">
            <TimezoneSearch onTimezoneChange={handleTimezoneChange} initialTimezone={timezone} />
          </div>
        </div>
      </motion.div>
    </AppWrapper>
  )
}

