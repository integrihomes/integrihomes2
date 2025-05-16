import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { BlockchainProvider } from "@/contexts/blockchain-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "IntegriHomes - Verified Real Estate in Ghana",
  description: "Find verified properties and land in Ghana with secure blockchain-backed titles.",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://integrihomes.com"),
  openGraph: {
    title: "IntegriHomes - Verified Real Estate in Ghana",
    description: "Find verified properties and land in Ghana with secure blockchain-backed titles.",
    url: "https://integrihomes.com",
    siteName: "IntegriHomes",
    locale: "en_US",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <title>IntegriHomes - Verified Real Estate in Ghana</title>
        {/* Add Mapbox GL JS directly in the head */}
        <script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script>
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <BlockchainProvider>{children}</BlockchainProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
