"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { MapPin, AlertTriangle, Wifi, Key } from "lucide-react"

// Define TypeScript interfaces
interface Coordinates {
  lat: number
  lng: number
}

interface Property {
  id: string
  title: string
  address: string
  price: string
  image: string
  coordinates?: Coordinates
  [key: string]: any
}

interface AccraMapProps {
  properties: Property[]
  height?: string
  onSelectProperty?: (property: Property) => void
  selectedPropertyId?: string
  className?: string
}

const AccraMap = ({
  properties = [],
  height = "500px",
  onSelectProperty = () => {},
  selectedPropertyId,
  className = "",
}: AccraMapProps) => {
  const [selectedMarker, setSelectedMarker] = useState<string | undefined>(selectedPropertyId)
  const [mapError, setMapError] = useState<boolean>(false)
  const mapContainer = useRef(null)
  const map = useRef(null)
  const markersRef = useRef([])
  const popupRef = useRef(null)
  const [errorType, setErrorType] = useState(null) // 'token', 'network', or 'service'
  const [mapboxToken, setMapboxToken] = useState<string | null>(null)

  // Points of interest in Accra
  const POINTS_OF_INTEREST = [
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
    {
      id: 3,
      name: "Makola Market",
      description: "A large open-air market in the center of Accra",
      latitude: 5.55,
      longitude: -0.21,
    },
    {
      id: 4,
      name: "Jamestown Lighthouse",
      description: "Historic lighthouse in the old Jamestown district",
      latitude: 5.5328,
      longitude: -0.218,
    },
    {
      id: 5,
      name: "Labadi Beach",
      description: "Popular beach on the Gulf of Guinea",
      latitude: 5.56,
      longitude: -0.15,
    },
  ]

  // Accra, Ghana coordinates
  const ACCRA_COORDINATES = { lng: -0.187, lat: 5.6037 }

  // Fetch map configuration from server
  useEffect(() => {
    const fetchMapConfig = async () => {
      try {
        const response = await fetch("/api/map-config")
        if (!response.ok) {
          throw new Error("Failed to load map configuration")
        }
        const data = await response.json()

        if (data.status === "available") {
          // Initialize map with the style URL only (no token needed client-side)
          initializeMap(data.styleUrl)
        } else {
          setMapError(true)
          setErrorType("token")
        }
      } catch (error) {
        console.error("Error fetching map configuration:", error)
        setMapError(true)
        setErrorType("service")
      }
    }

    fetchMapConfig()
  }, [])

  // Initialize map with style URL
  const initializeMap = (styleUrl) => {
    if (map.current) return

    try {
      // Create new map instance without token
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: styleUrl || "mapbox://styles/mapbox/streets-v12", // Use provided style URL
        center: [ACCRA_COORDINATES.lng, ACCRA_COORDINATES.lat],
        zoom: 12,
        transformRequest: (url, resourceType) => {
          // Transform requests to use our server as a proxy for Mapbox resources
          if (url.startsWith("mapbox://") || url.includes("mapbox.com")) {
            return {
              url: `/api/map-proxy?url=${encodeURIComponent(url)}&type=${resourceType}`,
            }
          }
        },
      })

      // Store map instance in ref
      map.current = mapInstance

      // Add navigation controls
      mapInstance.addControl(new mapboxgl.NavigationControl(), "top-right")

      // Handle map load errors
      mapInstance.on("error", (e) => {
        console.error("Mapbox error:", e.error)

        // Determine error type
        const errorMessage = e.error?.message || "Unknown error"
        if (errorMessage.includes("access token") || errorMessage.includes("401")) {
          setErrorType("token")
          setMapError(true)
        } else if (
          errorMessage.includes("network") ||
          errorMessage.includes("timeout") ||
          errorMessage.includes("failed to fetch")
        ) {
          setErrorType("network")
          setMapError(true)
        } else {
          setErrorType("service")
          setMapError(true)
        }
      })

      // Add markers only after map has loaded
      mapInstance.on("load", () => {
        // Add markers for points of interest
        POINTS_OF_INTEREST.forEach((point) => {
          // Create a DOM element for the marker
          const markerEl = document.createElement("div")
          markerEl.className = "marker"
          markerEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`

          // Add marker to map
          const marker = new mapboxgl.Marker(markerEl).setLngLat([point.longitude, point.latitude]).addTo(mapInstance)

          // Store marker reference for cleanup
          markersRef.current.push(marker)

          // Add click event to marker
          markerEl.addEventListener("click", () => {
            // Close existing popup if any
            if (popupRef.current) {
              popupRef.current.remove()
              popupRef.current = null
            }

            // Create popup
            popupRef.current = new mapboxgl.Popup({ closeOnClick: true })
              .setLngLat([point.longitude, point.latitude])
              .setHTML(`
                <div class="p-2 max-w-[200px]">
                  <h3 class="font-bold text-sm">${point.name}</h3>
                  <p class="text-xs mt-1">${point.description}</p>
                </div>
              `)
              .addTo(mapInstance)
          })
        })

        // Add markers for properties
        properties.forEach((property) => {
          if (property.coordinates) {
            // Create a DOM element for the property marker
            const propertyMarkerEl = document.createElement("div")
            propertyMarkerEl.className = "property-marker"
            propertyMarkerEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`

            // Add property marker to map
            const propertyMarker = new mapboxgl.Marker(propertyMarkerEl)
              .setLngLat([property.coordinates.lng, property.coordinates.lat])
              .addTo(mapInstance)

            // Store property marker reference for cleanup
            markersRef.current.push(propertyMarker)

            // Add click event to property marker
            propertyMarkerEl.addEventListener("click", () => {
              handlePropertySelect(property)
            })
          }
        })
      })
    } catch (error) {
      console.error("Error initializing map:", error)
      setMapError(true)
      setErrorType("service")
    }
  }

  // Update selected marker when selectedPropertyId changes
  useEffect(() => {
    setSelectedMarker(selectedPropertyId)
  }, [selectedPropertyId])

  // Handle property selection
  const handlePropertySelect = (property: Property) => {
    setSelectedMarker(property.id)
    onSelectProperty(property)
  }

  // Cleanup function
  useEffect(() => {
    return () => {
      if (markersRef.current) {
        markersRef.current.forEach((marker) => marker.remove())
        markersRef.current = []
      }

      if (popupRef.current) {
        popupRef.current.remove()
        popupRef.current = null
      }

      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  // Render map container and fallback UI if needed
  return (
    <div className={`relative w-full overflow-hidden rounded-lg shadow-md ${className}`} style={{ height }}>
      <div ref={mapContainer} className="w-full h-full" />

      {/* Fallback UI when map fails to load */}
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center p-6 max-w-md bg-white rounded-lg shadow-lg">
            <div className="flex justify-center mb-4">
              {errorType === "token" ? (
                <Key className="h-12 w-12 text-amber-500" />
              ) : errorType === "network" ? (
                <Wifi className="h-12 w-12 text-amber-500" />
              ) : (
                <AlertTriangle className="h-12 w-12 text-amber-500" />
              )}
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">Map unavailable</h3>
            <p className="text-gray-600 mb-4">We couldn't load the map of Accra, Ghana</p>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md text-left">
              <h4 className="font-medium text-amber-800 mb-2">Possible issue:</h4>

              {errorType === "token" && (
                <>
                  <p className="text-amber-700 mb-2">The map service is currently unavailable.</p>
                  <p className="text-sm text-amber-700">
                    Please try again later or contact support if the issue persists.
                  </p>
                </>
              )}

              {errorType === "network" && (
                <>
                  <p className="text-amber-700 mb-2">There seems to be a network connectivity issue.</p>
                  <ul className="list-disc list-inside text-sm text-amber-700 space-y-1 mb-2">
                    <li>Check your internet connection</li>
                    <li>Try refreshing the page</li>
                    <li>Disable any VPN or proxy services</li>
                  </ul>
                </>
              )}

              {errorType === "service" && (
                <>
                  <p className="text-amber-700 mb-2">The map service might be temporarily unavailable.</p>
                  <ul className="list-disc list-inside text-sm text-amber-700 space-y-1 mb-2">
                    <li>Try again later</li>
                    <li>Check service status page</li>
                    <li>Contact support if the issue persists</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Property Markers */}
      {!mapError &&
        map.current &&
        properties.map((property, index) => {
          const isSelected = selectedMarker === property.id

          return (
            <div
              key={property.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
              style={{ left: `${property.coordinates?.lng}px`, top: `${property.coordinates?.lat}px` }}
              onClick={() => handlePropertySelect(property)}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full shadow-md transition-all duration-200 ${
                  isSelected ? "bg-red-500 scale-125" : "bg-blue-500 hover:scale-110"
                }`}
              >
                <MapPin className="h-5 w-5 text-white" />
              </div>

              {/* Property tooltip on hover/selection */}
              {isSelected && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-md shadow-lg p-2 z-20 w-48">
                  <div className="text-xs font-medium truncate">{property.title}</div>
                  <div className="text-xs text-gray-500 truncate">{property.address}</div>
                  <div className="text-xs font-bold mt-1">{property.price}</div>
                </div>
              )}
            </div>
          )
        })}

      {/* Map Controls */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
        <button
          size="sm"
          variant="secondary"
          className="bg-white/90 hover:bg-white"
          onClick={() => window.open(`https://www.google.com/maps/place/Accra,+Ghana`, "_blank")}
        >
          <MapPin className="h-4 w-4 mr-2" />
          View in Google Maps
        </button>
      </div>

      {/* Map Attribution */}
      {!mapError && map.current && (
        <div className="absolute bottom-1 right-1 text-[10px] text-gray-500 bg-white/80 px-1 rounded">
          © Mapbox © OpenStreetMap
        </div>
      )}
    </div>
  )
}

export default AccraMap
