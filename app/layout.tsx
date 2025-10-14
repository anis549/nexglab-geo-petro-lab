import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={inter.variable}>
      <head>
        <title>Laboratoire Virtuel de Pétrographie</title>
        <meta
          name="description"
          content="Laboratoire virtuel interactif dédié à la pétrographie des roches sédimentaires et des sols déconsolidés"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
