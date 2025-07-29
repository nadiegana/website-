import type React from "react"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Suspense } from "react"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Ensure href is always a public path */}
        <link rel="icon" href="/nadie-gana-logo-white.png" />
      </head>
      <body className="font-sans">
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <main>{children}</main>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
