"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { AppWrapper } from "@/components/app-wrapper"
import { Button } from "@/components/ui/button"

export default function StopwatchPage() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10) // Increment by 10ms
      }, 10)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const handleStart = () => {
    setIsRunning(true)
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
  }

  const formatTime = () => {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    const centiseconds = Math.floor((time % 1000) / 10)

    return {
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      centiseconds: centiseconds.toString().padStart(2, "0"),
    }
  }

  const { minutes, seconds, centiseconds } = formatTime()

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
          <h1 className="text-primary text-4xl font-bold mb-12">STOPWATCH</h1>

          <div className="time-display text-primary text-9xl font-bold mb-4">
            {minutes}
            <span className="animate-pulse">:</span>
            {seconds}
            <span className="animate-pulse">:</span>
            {centiseconds}
          </div>

          <div className="grid grid-cols-3 gap-4 text-center text-primary mb-12">
            <div>Minutes</div>
            <div>Seconds</div>
            <div>Centiseconds</div>
          </div>

          <div className="flex gap-4">
            {!isRunning ? (
              <Button
                onClick={handleStart}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-4 text-xl"
              >
                START
              </Button>
            ) : (
              <Button
                onClick={handleStop}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-4 text-xl"
              >
                STOP
              </Button>
            )}

            <Button
              onClick={handleReset}
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

