"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bed, Bath, SquareIcon, MapPin, Check, MapIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Property } from "@/data/properties"

// Create a fallback map component that doesn't rely on mapbox-gl
function FallbackMap({
  properties,
  height,
  onMarkerClick,
  selectedPropertyId,
}: {
  properties: Property[]
  height: string
  onMarkerClick?: (property: Property) => void
  selectedPropertyId?: string
}) {
  return (
    <div
      className="relative rounded-lg overflow-hidden bg-gray-100 flex flex-col items-center justify-center"
      style={{ height }}
    >
      <div className="absolute inset-0">
        <Image src="/images/map-search-preview.png" alt="Map Preview" fill className="object-cover opacity-50" />
      </div>
      <div className="relative z-10 text-center p-6 bg-white/80 rounded-lg shadow-lg max-w-md">
        <MapIcon className="h-12 w-12 mx-auto mb-4 text-teal" />
        <h3 className="text-xl font-bold mb-2 text-navy">Interactive Map</h3>
        <p className="mb-4 text-gray-600">
          The interactive property map shows {properties.length} properties across Ghana. Click on markers to view
          property details.
        </p>
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
        <p className="text-sm text-gray-500">Note: Full interactive map available in the deployed version.</p>
      </div>
    </div>
  )
}

interface PropertyMapProps {
  properties: Property[]
  initialViewState?: {
    latitude: number
    longitude: number
    zoom: number
  }
  height?: string
  onMarkerClick?: (property: Property) => void
  selectedPropertyId?: string
  className?: string
}

export function PropertyMap({
  properties,
  initialViewState = {
    latitude: 5.6037,
    longitude: -0.187,
    zoom: 9,
  },
  height = "600px",
  onMarkerClick,
  selectedPropertyId,
  className = "",
}: PropertyMapProps) {
  const [mapLibraryLoaded, setMapLibraryLoaded] = useState(false)
  const [popupInfo, setPopupInfo] = useState<Property | null>(null)
  const mapRef = useRef<any>(null)

  // Check if mapbox-gl can be loaded
  useEffect(() => {
    const loadMapLibrary = async () => {
      try {
        // Try to dynamically import mapbox-gl
        await import("mapbox-gl/dist/mapbox-gl.css")
        const mapboxgl = await import("mapbox-gl")
        // If we get here, the library loaded successfully
        setMapLibraryLoaded(true)
      } catch (error) {
        console.error("Failed to load mapbox-gl:", error)
        setMapLibraryLoaded(false)
      }
    }

    loadMapLibrary()
  }, [])

  // Set popup info when selectedPropertyId changes
  useEffect(() => {
    if (selectedPropertyId) {
      const property = properties.find((p) => p.id === selectedPropertyId)
      if (property) {
        setPopupInfo(property)
      }
    }
  }, [selectedPropertyId, properties])

  const handleMarkerClick = (property: Property) => {
    setPopupInfo(property)
    if (onMarkerClick) {
      onMarkerClick(property)
    }
  }

  // If mapbox-gl couldn't be loaded, show the fallback map
  if (!mapLibraryLoaded) {
    return (
      <FallbackMap
        properties={properties}
        height={height}
        onMarkerClick={onMarkerClick}
        selectedPropertyId={selectedPropertyId}
      />
    )
  }

  // This code will only run if mapbox-gl was successfully loaded
  // We need to dynamically import the Map component to avoid the error
  const MapComponent = () => {
    const [MapGL, setMapGL] = useState<any>(null)

    useEffect(() => {
      // Dynamically import react-map-gl components
      import("react-map-gl").then((module) => {
        setMapGL({
          Map: module.Map,
          Marker: module.Marker,
          Popup: module.Popup,
          NavigationControl: module.NavigationControl,
          FullscreenControl: module.FullscreenControl,
        })
      })
    }, [])

    if (!MapGL) {
      return <div className="flex items-center justify-center h-full">Loading map...</div>
    }

    const { Map, Marker, Popup, NavigationControl, FullscreenControl } = MapGL

    return (
      <Map
        ref={mapRef}
        mapboxAccessToken="pk.eyJ1IjoiaW50ZWdyaWhvbWVzIiwiYSI6ImNscXRqcWRxcjBkdXEyanBsOGx1NWdtdmQifQ.Bj1XKGJ-2FTnX-oYZ0riDg"
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />

        {properties.map((property) => (
          <Marker
            key={property.id}
            longitude={property.location.lng}
            latitude={property.location.lat}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              handleMarkerClick(property)
            }}
          >
            <div
              className={`flex items-center justify-center w-12 h-12 -mt-6 cursor-pointer transition-transform hover:scale-110 ${
                popupInfo?.id === property.id ? "scale-110" : ""
              }`}
            >
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <div className="bg-white rounded-full p-1 shadow-lg">
                  <div className="bg-teal text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {property.type === "Land" ? "L" : property.beds > 0 ? property.beds : "C"}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-teal"></div>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white text-navy text-xs font-bold py-1 px-2 rounded shadow-md whitespace-nowrap">
                {property.price}
              </div>
            </div>
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            longitude={popupInfo.location.lng}
            latitude={popupInfo.location.lat}
            anchor="bottom"
            onClose={() => setPopupInfo(null)}
            closeButton={true}
            closeOnClick={false}
            className="property-popup"
            maxWidth="300px"
          >
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                <div className="relative h-32 w-full">
                  <Image
                    src={popupInfo.image || "/placeholder.svg"}
                    alt={popupInfo.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                  {popupInfo.verified && (
                    <div className="absolute top-2 left-2 bg-teal text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <Check className="h-3 w-3 text-gold" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm mb-1 text-navy">{popupInfo.title}</h3>
                  <p className="text-teal font-bold text-sm mb-1">{popupInfo.price}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="truncate">{popupInfo.address}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mb-3">
                    {popupInfo.beds > 0 && (
                      <div className="flex items-center">
                        <Bed className="h-3 w-3 mr-1" />
                        <span>{popupInfo.beds}</span>
                      </div>
                    )}
                    {popupInfo.baths > 0 && (
                      <div className="flex items-center">
                        <Bath className="h-3 w-3 mr-1" />
                        <span>{popupInfo.baths}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <SquareIcon className="h-3 w-3 mr-1" />
                      <span>{popupInfo.sqft} sq ft</span>
                    </div>
                  </div>
                  <Link href={`/properties/${popupInfo.id}`}>
                    <Button size="sm" className="w-full bg-teal hover:bg-teal/90 text-xs">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </Popup>
        )}
      </Map>
    )
  }

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`} style={{ height }}>
      <MapComponent />
    </div>
  )
}
