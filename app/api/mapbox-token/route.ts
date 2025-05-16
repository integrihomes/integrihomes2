import { NextResponse } from "next/server"

export async function GET() {
  // Only return the availability status, not the token itself
  return NextResponse.json({
    status: process.env.MAPBOX_ACCESS_TOKEN ? "available" : "unavailable",
  })
}
