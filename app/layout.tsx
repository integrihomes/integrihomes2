import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "IntegriHomes - Where Integrity Meets Home",
  description:
    "A trustworthy digital platform for buying, selling, and renting homes with transparency, security, and community at the core.",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://integrihomes.com"),
  openGraph: {
    title: "IntegriHomes - Where Integrity Meets Home",
    description:
      "A trustworthy digital platform for buying, selling, and renting homes with transparency, security, and community at the core.",
    url: "https://integrihomes.com",
    siteName: "IntegriHomes",
    locale: "en_US",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <title>IntegriHomes - Where Integrity Meets Home</title>
      </head>
      <body className="font-opensans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
