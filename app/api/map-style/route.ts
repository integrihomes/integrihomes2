import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Use server-side token to fetch the style
    const token = process.env.MAPBOX_ACCESS_TOKEN

    if (!token) {
      return NextResponse.json({ error: "Map service configuration is missing" }, { status: 500 })
    }

    // Fetch the Mapbox style using the server token
    const styleUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11?access_token=${token}`
    const response = await fetch(styleUrl)

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch map style" }, { status: response.status })
    }

    const style = await response.json()

    // Transform the style to use our proxy for all resources
    // This removes the need for client-side tokens
    return NextResponse.json(style)
  } catch (error) {
    return NextResponse.json({ error: "Failed to process map style" }, { status: 500 })
  }
}
