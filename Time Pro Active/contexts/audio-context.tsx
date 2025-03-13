"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useRef } from "react"
import { Howl } from "howler"

interface Track {
  title: string
  src: string
}

interface AudioContextType {
  isPlaying: boolean
  currentTrack: number
  togglePlay: () => void
  nextTrack: () => void
  prevTrack: () => void
  playAlarm: () => void
}


const tracks: Track[] = [
  { title: "Lofi Track 1", src: "https://cdn.jsdelivr.net/gh/SwagD15/Time-Pro-Active@main/Audio/Peaceful%20coffee%20time.mp3" }, 
  { title: "Lofi Track 2", src: "https://cdn.jsdelivr.net/gh/SwagD15/Time-Pro-Active@main/Audio/Sunny%20day%20in%20paradise.mp3" },
  { title: "Lofi Track 3", src: "https://cdn.jsdelivr.net/gh/SwagD15/Time-Pro-Active@main/Audio/Naruto%20Main%20Theme%20lofi.mp3" },
  { title: "Lofi Track 4", src: "https://cdn.jsdelivr.net/gh/SwagD15/Time-Pro-Active@main/Audio/Forgotten.mp3" },
]

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const soundRef = useRef<Howl | null>(null)
  const alarmRef = useRef<Howl | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Initialize alarm sound
    if (typeof window !== "undefined") {
      alarmRef.current = new Howl({
        src: ["https://cdn.jsdelivr.net/gh/SwagD15/Time-Pro-Active@main/Audio/Kawaii%20ring.mp3"], //  alarm sound
        volume: 0.7,
      })
    }

    return () => {
      // Cleanup
      if (soundRef.current) {
        soundRef.current.unload()
      }
      if (alarmRef.current) {
        alarmRef.current.unload()
      }
    }
  }, [])

  useEffect(() => {
    // Only run on client-side
    if (!mounted) return

    // Initialize or change track
    if (typeof window !== "undefined") {
      if (soundRef.current) {
        soundRef.current.unload()
      }

      soundRef.current = new Howl({
        src: [tracks[currentTrack].src],
        html5: true,
        loop: false,
        volume: 0.5,
        onend: () => {
          nextTrack()
        },
      })

      if (isPlaying) {
        soundRef.current.play()
      }
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.stop()
      }
    }
  }, [currentTrack, isPlaying, mounted])

  const togglePlay = () => {
    if (!soundRef.current) return

    if (isPlaying) {
      soundRef.current.pause()
    } else {
      soundRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    const next = (currentTrack + 1) % tracks.length
    setCurrentTrack(next)
  }

  const prevTrack = () => {
    const prev = (currentTrack - 1 + tracks.length) % tracks.length
    setCurrentTrack(prev)
  }

  const playAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.play()
    }
  }

  // Create context value
  const contextValue = {
    isPlaying,
    currentTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    playAlarm,
  }

  return <AudioContext.Provider value={contextValue}>{children}</AudioContext.Provider>
}

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}

