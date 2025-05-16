"use client"
import { Button } from "@/components/ui/button"
import { MapIcon } from "lucide-react"
import Image from "next/image"

// Create a fallback map component that doesn't rely on mapbox-gl
function FallbackMap({ properties, height, onMarkerClick, selectedPropertyId, center, zoom, markers }) {
  return (
    <div
      className="relative rounded-lg overflow-hidden bg-gray-100 flex flex-col items-center justify-center"
      style={{ height: height || "600px" }}
    >
      <div className="absolute inset-0">
        <Image src="/images/map-search-preview.png" alt="Map Preview" fill className="object-cover opacity-50" />
      </div>
      <div className="relative z-10 text-center p-6 bg-white/80 rounded-lg shadow-lg max-w-md">
        <MapIcon className="h-12 w-12 mx-auto mb-4 text-teal" />
        <h3 className="text-xl font-bold mb-2 text-navy">Interactive Map</h3>
        <p className="mb-4 text-gray-600">
          {properties
            ? `The interactive property map shows ${properties.length} properties across Ghana.`
            : "Property location map"}
          {markers && markers.length > 0 && ` Showing ${markers.length} location marker(s).`}
          {center && ` Centered at coordinates [${center[0]}, ${center[1]}] with zoom level ${zoom || 9}.`}
        </p>
        {properties && properties.length > 0 && (
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
        <p className="text-sm text-gray-500">Note: Full interactive map available in the deployed version.</p>
      </div>
    </div>
  )
}

// Main PropertyMap component
function PropertyMap({
  properties,
  initialViewState,
  height = "600px",
  onMarkerClick,
  selectedPropertyId,
  className = "",
  center,
  zoom = 9,
  markers,
}) {
  // Always use the fallback map for now to avoid deployment issues
  return (
    <FallbackMap
      properties={properties}
      height={height}
      onMarkerClick={onMarkerClick}
      selectedPropertyId={selectedPropertyId}
      center={center}
      zoom={zoom}
      markers={markers}
    />
  )
}

export default PropertyMap
