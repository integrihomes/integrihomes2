import { NextResponse } from "next/server"

// This function uses the server-side Mapbox token
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get("location")

  // Here you would use the server-side token to make authenticated requests to Mapbox
  // const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN

  // For now, we'll just return some sample data
  return NextResponse.json({
    points: [
      {
        id: 1,
        name: "Independence Square",
        description: "A public square in Accra",
        latitude: 5.5478,
        longitude: -0.1962,
      },
      {
        id: 2,
        name: "Kwame Nkrumah Memorial Park",
        description: "Memorial park",
        latitude: 5.5456,
        longitude: -0.1969,
      },
      // Add more points as needed
    ],
  })
}
