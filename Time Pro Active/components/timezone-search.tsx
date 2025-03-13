"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { motion } from "framer-motion"

interface TimezoneSearchProps {
  onTimezoneChange: (timezone: string) => void
  initialTimezone?: string
}

// List of common cities and their timezones
const COMMON_TIMEZONES = [
  { city: "New York", timezone: "America/New_York" },
  { city: "London", timezone: "Europe/London" },
  { city: "Tokyo", timezone: "Asia/Tokyo" },
  { city: "Sydney", timezone: "Australia/Sydney" },
  { city: "Los Angeles", timezone: "America/Los_Angeles" },
  { city: "Paris", timezone: "Europe/Paris" },
  { city: "Berlin", timezone: "Europe/Berlin" },
  { city: "Mumbai", timezone: "Asia/Kolkata" },
  { city: "Kolkata", timezone: "Asia/Kolkata" },
  { city: "Dubai", timezone: "Asia/Dubai" },
  { city: "Singapore", timezone: "Asia/Singapore" },
  { city: "Rio de Janeiro", timezone: "America/Sao_Paulo" },
  { city: "Los Angeles", timezone: "America/Los_Angeles" },
  { city: "Cape Town", timezone: "Africa/Johannesburg" },
  { city: "Mexico City", timezone: "America/Mexico_City" },
  { city: "Seoul", timezone: "Asia/Seoul" },
  { city: "Istanbul", timezone: "Europe/Istanbul" },
  { city: "Moscow", timezone: "Europe/Moscow" },
  { city: "Toronto", timezone: "America/Toronto" },
  { city: "Beijing", timezone: "Asia/Shanghai" },
  { city: "Bangkok", timezone: "Asia/Bangkok" },
  { city: "Kabul", timezone: "Asia/Kabul" },
  { city: "Algiers", timezone: "Africa/Algiers" },
  { city: "Buenos Aires", timezone: "America/Argentina/Buenos_Aires" },
  { city: "Yerevan", timezone: "Asia/Yerevan" },
  { city: "Canberra", timezone: "Australia/Sydney" },
  { city: "Vienna", timezone: "Europe/Vienna" },
  { city: "Brasília", timezone: "America/Sao_Paulo" },
  { city: "Ottawa", timezone: "America/Toronto" },
  { city: "Santiago", timezone: "America/Santiago" },
  { city: "Cairo", timezone: "Africa/Cairo" },
  { city: "Zagreb", timezone: "Europe/Zagreb" },
  { city: "Copenhagen", timezone: "Europe/Copenhagen" },
  { city: "Rome", timezone: "Europe/Rome" },
  { city: "Madrid", timezone: "Europe/Madrid" },
  { city: "Port Moresby", timezone: "Pacific/Port_Moresby" },
  { city: "Washington, D.C.", timezone: "America/New_York" },
  { city: "São Paulo", timezone: "America/Sao_Paulo" },
  { city: "Lagos", timezone: "Africa/Lagos" },
  { city: "Oslo", timezone: "Europe/Oslo" },
  { city: "Riyadh", timezone: "Asia/Riyadh" },
  { city: "Stockholm", timezone: "Europe/Stockholm" },
  { city: "Addis Ababa", timezone: "Africa/Addis_Ababa" },
  { city: "Tashkent", timezone: "Asia/Tashkent" },
  { city: "Caracas", timezone: "America/Caracas" },
  { city: "Kathmandu", timezone: "Asia/Kathmandu" },
  { city: "Delhi", timezone: "Asia/Kolkata" }
]

export function TimezoneSearch({ onTimezoneChange, initialTimezone = "Asia/Kolkata" }: TimezoneSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState(() => {
    const found = COMMON_TIMEZONES.find((item) => item.timezone === initialTimezone)
    return found ? found.city : "Kolkata"
  })
  const [showResults, setShowResults] = useState(false)
  const [filteredTimezones, setFilteredTimezones] = useState(COMMON_TIMEZONES)
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchTerm) {
      const filtered = COMMON_TIMEZONES.filter((item) => item.city.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredTimezones(filtered)
    } else {
      setFilteredTimezones(COMMON_TIMEZONES)
    }
  }, [searchTerm])

  const handleSelect = (city: string, timezone: string) => {
    setSelectedCity(city)
    setSearchTerm("")
    setShowResults(false)
    setIsEditing(false)
    onTimezoneChange(timezone)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setShowResults(true)
  }

  const handleInputFocus = () => {
    setIsEditing(true)
    setSearchTerm("")
    setShowResults(true)
    // Focus and select all text when focusing
    if (inputRef.current) {
      inputRef.current.select()
    }
  }

  const handleInputBlur = () => {
    // Delay to allow click on search results
    setTimeout(() => {
      if (!isEditing) return

      // If user didn't select anything, revert to selected city
      if (!searchTerm) {
        setIsEditing(false)
      }
    }, 200)
  }

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={isEditing ? searchTerm : selectedCity}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="w-full py-2 px-4 pr-10 rounded-full border border-primary bg-card text-primary placeholder-primary/50 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Search city..."
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
      </div>

      {showResults && isEditing && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-10 mt-1 w-full bg-card rounded-lg shadow-lg border border-primary overflow-hidden"
        >
          {filteredTimezones.length > 0 ? (
            <ul className="max-h-60 overflow-auto">
              {filteredTimezones.map((item) => (
                <li
                  key={item.city}
                  className="px-4 py-2 hover:bg-muted cursor-pointer"
                  onClick={() => handleSelect(item.city, item.timezone)}
                >
                  {item.city}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-muted-foreground">No cities found</div>
          )}
        </motion.div>
      )}
    </div>
  )
}

