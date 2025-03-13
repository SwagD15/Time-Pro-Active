import type React from "react"
import type { Metadata } from "next"
import { Ubuntu, Karla } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeContextProvider } from "@/contexts/theme-context"
import { AudioProvider } from "@/contexts/audio-context"



const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
})

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-karla",
})

export const metadata: Metadata = {
  title: "Time Pro Active",
  description: "A comprehensive time management application",
    
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head>
         <title>Time Pro Active</title> {/* Title here */}
        
         <link rel="icon" href="/logo.svg" />
      </head>
      <body className={`${ubuntu.variable} ${karla.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="time-pro-theme">
          <ThemeContextProvider>
            <AudioProvider>{children}</AudioProvider>
          </ThemeContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'