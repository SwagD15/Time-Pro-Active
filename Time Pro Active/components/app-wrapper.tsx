"use client"

import type React from "react"
import { Header } from "./header"
import { Footer } from "./footer"

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4">{children}</main>
      <Footer />
    </div>
  )
}

