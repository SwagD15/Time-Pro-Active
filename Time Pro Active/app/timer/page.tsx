"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { AppWrapper } from "@/components/app-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAudio } from "@/contexts/audio-context"

export default function TimerPage() {
  const [timeLeft, setTimeLeft] = useState(0) // Start from 0 instead of 5 minutes
  const [isActive, setIsActive] = useState(false)
  const [minutes, setMinutes] = useState("00")
  const [seconds, setSeconds] = useState("00")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const { playAlarm } = useAudio()

  // Update timeLeft when minutes or seconds change
  useEffect(() => {
    const mins = Number.parseInt(minutes) || 0
    const secs = Number.parseInt(seconds) || 0
    setTimeLeft(mins * 60 + secs)
  }, [minutes, seconds])

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

  // Update minutes and seconds display when timeLeft changes
  useEffect(() => {
    if (!isActive) {
      return // Don't update inputs while timer is running
    }

    const mins = Math.floor(timeLeft / 60)
    const secs = timeLeft % 60
    setMinutes(mins.toString().padStart(2, "0"))
    setSeconds(secs.toString().padStart(2, "0"))
  }, [timeLeft, isActive])

  const toggleTimer = () => {
    if (timeLeft <= 0 && !isActive) {
      // Don't start if timer is at 0
      return
    }
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimeLeft(0)
    setMinutes("00")
    setSeconds("00")
  }

  const addTime = (secondsToAdd: number) => {
    const newTime = timeLeft + secondsToAdd
    setTimeLeft(newTime)

    const mins = Math.floor(newTime / 60)
    const secs = newTime % 60
    setMinutes(mins.toString().padStart(2, "0"))
    setSeconds(secs.toString().padStart(2, "0"))
  }

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isActive) return // Don't allow changes while timer is running

    const value = e.target.value
    // Only allow numbers and limit to 2 digits
    if (/^\d{0,2}$/.test(value)) {
      setMinutes(value)
    }
  }

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isActive) return // Don't allow changes while timer is running

    const value = e.target.value
    // Only allow numbers and limit to 2 digits
    if (/^\d{0,2}$/.test(value)) {
      // Ensure seconds are between 0-59
      if (Number.parseInt(value) < 60 || value === "") {
        setSeconds(value)
      }
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
          <h1 className="text-primary text-4xl font-bold mb-12">TIMER</h1>

          {isActive ? (
            <div className="time-display text-primary text-9xl font-bold mb-4">{formatTime(timeLeft)}</div>
          ) : (
            <div className="flex items-center gap-2 mb-4">
              <Input
                type="text"
                value={minutes}
                onChange={handleMinutesChange}
                className="text-primary text-6xl font-bold w-32 h-24 text-center bg-card"
                maxLength={2}
              />
              <span className="text-primary text-6xl font-bold">:</span>
              <Input
                type="text"
                value={seconds}
                onChange={handleSecondsChange}
                className="text-primary text-6xl font-bold w-32 h-24 text-center bg-card"
                maxLength={2}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-center text-primary mb-8">
            <div>Minutes</div>
            <div>Seconds</div>
          </div>

          <div className="flex gap-4 mb-8">
            <Button
              onClick={() => addTime(30)}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl px-4 py-2"
              disabled={isActive}
            >
              +0:30
            </Button>

            <Button
              onClick={() => addTime(60)}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl px-4 py-2"
              disabled={isActive}
            >
              +1:00
            </Button>

            <Button
              onClick={() => addTime(300)}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl px-4 py-2"
              disabled={isActive}
            >
              +5:00
            </Button>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={toggleTimer}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-4 text-xl"
              disabled={!isActive && timeLeft === 0}
            >
              {isActive ? "PAUSE" : "START"}
            </Button>

            <Button
              onClick={resetTimer}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-xl px-8 py-4 text-xl"
            >
              RESET
            </Button>
          </div>
        </div>
      </motion.div>
    </AppWrapper>
  )
}

