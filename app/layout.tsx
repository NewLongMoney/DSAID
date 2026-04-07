import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DSAID - Digital Solutions for Africa's Integrated Development",
  description: "Bridging the digital divide in rural Kenya through Solar Mobile Computer Labs, international curriculum training, and educational technology solutions.",
  keywords: "DSAID, Digital Solutions, Africa, Kenya, ICT training, Solar Mobile Computer Lab, rural development, homeschooling, international curriculum, teacher training",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
