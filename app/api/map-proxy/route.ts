import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN

  if (!mapboxToken) {
    return NextResponse.json({ error: "Map service not configured" }, { status: 500 })
  }

  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "Missing URL parameter" }, { status: 400 })
  }

  // Add the token to the request on the server side
  const separator = url.includes("?") ? "&" : "?"
  const fullUrl = `${url}${separator}access_token=${mapboxToken}`

  const response = await fetch(fullUrl)

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch resource" }, { status: response.status })
  }

  // Return the response directly
  const contentType = response.headers.get("content-type") || "application/json"

  if (contentType.includes("application/json")) {
    const data = await response.json()
    return NextResponse.json(data)
  } else {
    const data = await response.arrayBuffer()
    return new Response(data, {
      headers: {
        "Content-Type": contentType,
      },
    })
  }
}
