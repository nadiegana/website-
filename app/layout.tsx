import type { Metadata } from "next"
import type React from "react"
import "./globals.css"
import { ThemeProvider } from "next-themes"

export const metadata: Metadata = {
  title: "Nicolas Saenz | Creative Designer & Visual Storyteller",
  description:
    "Portfolio of Nicolas Saenz, a visual designer, storyteller, and creative collaborator specializing in brand identity, publication design, web design, photography, and video.",
  keywords: [
    "graphic design",
    "visual design",
    "branding",
    "web design",
    "photography",
    "video production",
    "Bogota",
    "Colombia",
    "Nicolas Saenz",
  ],
  authors: [{ name: "Nicolas Saenz" }],
  creator: "Nicolas Saenz",
  openGraph: {
    title: "Nicolas Saenz | Creative Designer & Visual Storyteller",
    description: "Explore the creative portfolio of Nicolas Saenz.",
    url: "https://nadiegana-website.vercel.app/", // Replace with your actual live URL
    siteName: "Nicolas Saenz Design",
    images: [
      {
        url: "/og-image.png", // Make sure to create this image in your public folder
        width: 1200,
        height: 630,
        alt: "Nicolas Saenz Design Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nicolas Saenz | Creative Designer & Visual Storyteller",
    description: "Portfolio of Nicolas Saenz, a visual designer, storyteller, and creative collaborator.",
    creator: "@nadie_gana",
    images: ["/og-image.png"], // Make sure to create this image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/nadie-gana-logo.png", // Black logo for light mode
    apple: "/nadie-gana-logo.png",
    other: {
      rel: "icon",
      url: "/nadie-gana-logo-white.png", // White logo for dark mode
      media: "(prefers-color-scheme: dark)",
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
