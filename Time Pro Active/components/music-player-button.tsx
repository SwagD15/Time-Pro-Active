"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, SkipForward, Music } from "lucide-react"
import { useAudio } from "@/contexts/audio-context"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function MusicPlayerButton() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const { isPlaying, togglePlay, nextTrack, prevTrack } = useAudio()

  // After mounting, we can safely access the audio context
  useEffect(() => {
    setMounted(true)
  }, [])

  // If not mounted yet, render a placeholder to avoid hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="text-primary">
        <Music className="h-5 w-5" />
        <span className="sr-only">Music player</span>
      </Button>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="text-primary">
          <Music className="h-5 w-5" />
          <span className="sr-only">Music player</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 bg-card">
        <div className="text-primary text-center mb-2 font-medium">Lofi</div>
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              prevTrack()
            }}
            className="text-primary hover:text-primary/80"
            aria-label="Previous track"
          >
            <SkipBack size={20} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              togglePlay()
            }}
            className="text-primary hover:text-primary/80"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              nextTrack()
            }}
            className="text-primary hover:text-primary/80"
            aria-label="Next track"
          >
            <SkipForward size={20} />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

