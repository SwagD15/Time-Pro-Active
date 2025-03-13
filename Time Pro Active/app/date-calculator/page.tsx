"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AppWrapper } from "@/components/app-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "lucide-react"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function DateCalculatorPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [result, setResult] = useState<{ years: number; months: number; weeks: number; days: number } | null>(null)

  const calculateDuration = () => {
    if (!startDate || !endDate) return

    // Ensure end date is after start date
    if (endDate < startDate) {
      alert("End date must be after start date")
      return
    }

    // Calculate the difference in milliseconds
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())

    // Calculate days
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    // Calculate years, months, weeks, and remaining days
    const years = Math.floor(diffDays / 365)
    const remainingDaysAfterYears = diffDays % 365

    const months = Math.floor(remainingDaysAfterYears / 30)
    const remainingDaysAfterMonths = remainingDaysAfterYears % 30

    const weeks = Math.floor(remainingDaysAfterMonths / 7)
    const days = remainingDaysAfterMonths % 7

    setResult({ years, months, weeks, days })
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
          <h1 className="text-primary text-4xl font-bold mb-12 text-center">Date Duration Calculator</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
            <div className="space-y-2">
              <h2 className="text-primary text-2xl font-bold">Start Day</h2>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  value={startDate ? format(startDate, "dd/MM/yyyy") : ""}
                  readOnly
                  className="pr-10 border-primary"
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="absolute right-0 top-0 h-full px-3 text-primary">
                      <Calendar className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex justify-center items-center text-primary text-3xl font-bold">To</div>

            <div className="space-y-2">
              <h2 className="text-primary text-2xl font-bold">End Day</h2>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  value={endDate ? format(endDate, "dd/MM/yyyy") : ""}
                  readOnly
                  className="pr-10 border-primary"
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="absolute right-0 top-0 h-full px-3 text-primary">
                      <Calendar className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <Button
              onClick={calculateDuration}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-4 text-xl"
              disabled={!startDate || !endDate}
            >
              Calculate
            </Button>
          </div>

          <div className="space-y-2">
            <h2 className="text-primary text-2xl font-bold">Result</h2>
            <div className="bg-card rounded-xl p-4 border border-primary">
              {result ? (
                <p className="text-card-foreground text-lg">
                  {result.years} Years, {result.months} Months, {result.weeks} Weeks, {result.days} Days
                </p>
              ) : (
                <p className="text-card-foreground text-lg">0 Years, 0 Months, 0 Weeks, 0 Days</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AppWrapper>
  )
}

