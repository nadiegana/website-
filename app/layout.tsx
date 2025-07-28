import type React from "react"
import "./globals.css"
// Removed GeistSans and GeistMono imports
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/nadie-gana-logo.png" />
      </head>
      {/* Removed Geist font variables from body className */}
      <body className="font-sans">
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
