"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { MapIcon, ExternalLink } from "lucide-react"

// Update the PropertyMap component to use a static map image approach
function PropertyMap({
  properties = [],
  initialViewState = {
    latitude: 5.6037,
    longitude: -0.187,
    zoom: 9,
  },
  height = "600px",
  onMarkerClick,
  selectedPropertyId,
  className = "",
  center,
  zoom,
  markers,
}) {
  const [mapError, setMapError] = useState(false)
  const mapContainerRef = useRef(null)

  // Use a static map image instead of trying to initialize Mapbox
  const mapImageUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${initialViewState.longitude},${initialViewState.latitude},${initialViewState.zoom},0/800x600?access_token=pk.eyJ1IjoiaW50ZWdyaWhvbWVzIiwiYSI6ImNscXRqcWRxcjBkdXEyanBsOGx1NWdtdmQifQ.Bj1XKGJ-2FTnX-oYZ0riDg`

  // Create a static map component
  const StaticMap = () => {
    return (
      <div className="relative rounded-lg overflow-hidden bg-gray-100" style={{ height }}>
        <div className="absolute inset-0">
          <img
            src={mapImageUrl || "/placeholder.svg"}
            alt="Map of Accra, Ghana"
            className="w-full h-full object-cover"
          />

          {/* Add property markers as absolute positioned elements */}
          {properties.map(
            (property) =>
              property.location && (
                <div
                  key={property.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                    selectedPropertyId === property.id ? "z-20" : "z-10"
                  }`}
                  style={{
                    top: `${50 - (property.location.lat - initialViewState.latitude) * 100}%`,
                    left: `${50 + (property.location.lng - initialViewState.longitude) * 100}%`,
                  }}
                  onClick={() => onMarkerClick?.(property)}
                >
                  <div className="flex items-center justify-center">
                    <div className="bg-white rounded-full p-1 shadow-lg">
                      <div className="bg-teal text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        {property.type === "Land" ? "L" : property.beds > 0 ? property.beds : "C"}
                      </div>
                    </div>
                  </div>
                </div>
              ),
          )}
        </div>

        <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-md">
          <div className="text-xs text-gray-500">© Mapbox © OpenStreetMap</div>
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            size="sm"
            className="bg-white text-navy hover:bg-gray-100 shadow-md"
            onClick={() => window.open(`https://www.google.com/maps/place/Accra,+Ghana`, "_blank")}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            View in Google Maps
          </Button>
        </div>
      </div>
    )
  }

  // Create a fallback map component
  const FallbackMap = () => {
    return (
      <div
        className="relative rounded-lg overflow-hidden bg-gray-100 flex flex-col items-center justify-center"
        style={{ height }}
      >
        <div className="absolute inset-0">
          <img
            src="/images/map-search-preview.png"
            alt="Map Preview"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 text-center p-6 bg-white/80 rounded-lg shadow-lg max-w-md">
          <MapIcon className="h-12 w-12 mx-auto mb-4 text-teal" />
          <h3 className="text-xl font-bold mb-2 text-navy">Property Map</h3>
          <p className="mb-4 text-gray-600">
            {mapError ? (
              <>
                We're having trouble loading the interactive map. Please try refreshing the page or check your internet
                connection.
              </>
            ) : (
              <>Explore properties across Ghana. Click on markers to view property details.</>
            )}
          </p>
          {mapError && (
            <Button onClick={() => window.location.reload()} className="bg-teal hover:bg-teal/90 text-white">
              Refresh Page
            </Button>
          )}
          {!mapError && properties.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              {properties.slice(0, 4).map((property) => (
                <Button
                  key={property.id}
                  variant="outline"
                  size="sm"
                  className={`text-xs justify-start overflow-hidden ${
                    selectedPropertyId === property.id ? "border-teal bg-teal/10" : ""
                  }`}
                  onClick={() => onMarkerClick?.(property)}
                >
                  <div className="truncate">{property.title}</div>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`} style={{ height }}>
      {mapError ? <FallbackMap /> : <StaticMap />}
    </div>
  )
}

export default PropertyMap
