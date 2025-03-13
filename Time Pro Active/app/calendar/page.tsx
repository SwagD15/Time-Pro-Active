"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AppWrapper } from "@/components/app-wrapper"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const prevMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() - 1)
      return newDate
    })
  }

  const nextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + 1)
      return newDate
    })
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  // Create calendar grid
  const calendarDays = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
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
        <div className="bg-muted rounded-3xl p-8">
          <h1 className="text-primary text-4xl font-bold mb-8 text-center">CALENDAR</h1>

          <div className="bg-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <Button onClick={prevMonth} variant="ghost" className="text-primary hover:text-primary/80">
                <ChevronLeft size={24} />
              </Button>

              <h2 className="text-primary text-2xl font-bold">
                {months[month]} {year}
              </h2>

              <Button onClick={nextMonth} variant="ghost" className="text-primary hover:text-primary/80">
                <ChevronRight size={24} />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-center py-2 bg-secondary text-secondary-foreground font-semibold rounded-lg"
                >
                  {day}
                </div>
              ))}

              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`text-center py-3 ${day ? "text-card-foreground hover:bg-muted cursor-pointer" : ""} ${
                    day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
                      ? "bg-primary text-primary-foreground font-bold rounded-lg"
                      : ""
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AppWrapper>
  )
}

