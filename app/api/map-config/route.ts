import { NextResponse } from "next/server"

export async function GET() {
  // Only provide public configuration, no tokens
  return NextResponse.json({
    initialView: {
      latitude: 5.6037,
      longitude: -0.187,
      zoom: 12,
    },
    mapStyle: "/api/map-style", // Use our proxy endpoint
    hasToken: !!process.env.MAPBOX_ACCESS_TOKEN,
  })
}
