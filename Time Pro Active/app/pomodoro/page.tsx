"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { AppWrapper } from "@/components/app-wrapper"
import { Button } from "@/components/ui/button"
import { useAudio } from "@/contexts/audio-context"

export default function PomodoroPage() {
  const [mode, setMode] = useState<"focus" | "break" | "longBreak">("focus")
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const { playAlarm } = useAudio()

  useEffect(() => {
    // Set time based on selected mode
    switch (mode) {
      case "focus":
        setTimeLeft(25 * 60)
        break
      case "break":
        setTimeLeft(5 * 60)
        break
      case "longBreak":
        setTimeLeft(30 * 60)
        break
    }

    // Reset timer when mode changes
    setIsActive(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }, [mode])

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Time's up
            clearInterval(intervalRef.current!)
            setIsActive(false)
            playAlarm()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, playAlarm])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    switch (mode) {
      case "focus":
        setTimeLeft(25 * 60)
        break
      case "break":
        setTimeLeft(5 * 60)
        break
      case "longBreak":
        setTimeLeft(30 * 60)
        break
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

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
          <h1 className="text-primary text-4xl font-bold mb-12">POMODORO</h1>

          <div className="time-display text-primary text-9xl font-bold mb-12">{formatTime(timeLeft)}</div>

          <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-lg">
            <Button
              onClick={() => setMode("focus")}
              className={`rounded-xl py-6 ${
                mode === "focus" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              }`}
            >
              <div className="flex flex-col items-center">
                <span>Focus</span>
                <span className="text-xl font-bold">25 min</span>
              </div>
            </Button>

            <Button
              onClick={() => setMode("break")}
              className={`rounded-xl py-6 ${
                mode === "break" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              }`}
            >
              <div className="flex flex-col items-center">
                <span>Break</span>
                <span className="text-xl font-bold">5 min</span>
              </div>
            </Button>

            <Button
              onClick={() => setMode("longBreak")}
              className={`rounded-xl py-6 ${
                mode === "longBreak" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              }`}
            >
              <div className="flex flex-col items-center">
                <span>Long Break</span>
                <span className="text-xl font-bold">30 min</span>
              </div>
            </Button>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={toggleTimer}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-4 text-xl"
            >
              {isActive ? "PAUSE" : "START"}
            </Button>

            {isActive && (
              <Button
                onClick={resetTimer}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl px-8 py-4 text-xl"
              >
                RESET
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </AppWrapper>
  )
}

