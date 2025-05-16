"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"

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

const AccraMap = ({ properties = [], height = "600px", onSelectProperty, selectedPropertyId }) => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [mapError, setMapError] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const markersRef = useRef([])
  const popupRef = useRef(null)

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
          setMapError("Map service is currently unavailable")
        }
      } catch (error) {
        console.error("Error fetching map configuration:", error)
        setMapError(`Error loading map: ${error.message || "Unknown error"}`)
      }
    }

    fetchMapConfig()
  }, [])

  const initializeMap = (styleUrl) => {
    if (map.current) return

    try {
      // Create new map instance without token
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: styleUrl || "mapbox://styles/mapbox/streets-v12", // Use provided style URL
        center: [-0.187, 5.6037], // Accra's coordinates
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

      map.current = mapInstance

      // Add navigation controls
      mapInstance.addControl(new mapboxgl.NavigationControl(), "top-right")

      // Handle map load event
      mapInstance.on("load", () => {
        setMapLoaded(true)
      })

      // Handle map error event
      mapInstance.on("error", (e) => {
        console.error("Map error:", e.error)
        setMapError(`Map error: ${e.error?.message || "Unknown error"}`)
      })

      // Clean up on unmount
      return () => {
        if (markersRef.current) {
          markersRef.current.forEach((marker) => marker.remove())
          markersRef.current = []
        }

        if (popupRef.current) {
          popupRef.current.remove()
          popupRef.current = null
        }

        mapInstance.remove()
        map.current = null
      }
    } catch (error) {
      console.error("Error initializing map:", error)
      setMapError(`Error initializing map: ${error.message || "Unknown error"}`)
    }
  }

  useEffect(() => {
    if (!map.current || !mapLoaded) return

    // Clear existing markers
    if (markersRef.current) {
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []
    }

    // If we have properties with coordinates, use those
    if (properties && properties.length > 0) {
      // Add markers for properties
      properties.forEach((property) => {
        if (!property.coordinates) return

        // Create a DOM element for the marker
        const markerEl = document.createElement("div")
        markerEl.className = "marker"
        markerEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${selectedPropertyId === property.id ? "#ef4444" : "#10b981"}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`

        // Add marker to map
        const marker = new mapboxgl.Marker(markerEl)
          .setLngLat([property.coordinates.lng, property.coordinates.lat])
          .addTo(map.current)

        markersRef.current.push(marker)

        // Add click event to marker
        markerEl.addEventListener("click", () => {
          if (onSelectProperty) {
            onSelectProperty(property)
          }

          // Close existing popup if any
          if (popupRef.current) {
            popupRef.current.remove()
            popupRef.current = null
          }

          // Create popup
          popupRef.current = new mapboxgl.Popup({ closeOnClick: true })
            .setLngLat([property.coordinates.lng, property.coordinates.lat])
            .setHTML(`
              <div class="p-2 max-w-[200px]">
                <h3 class="font-bold text-sm">${property.title}</h3>
                <p class="text-xs mt-1">${property.price}</p>
                <p class="text-xs mt-1">${property.address}</p>
              </div>
            `)
            .addTo(map.current)
        })
      })
    } else {
      // Use default points of interest
      POINTS_OF_INTEREST.forEach((point) => {
        // Create a DOM element for the marker
        const markerEl = document.createElement("div")
        markerEl.className = "marker"
        markerEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`

        // Add marker to map
        const marker = new mapboxgl.Marker(markerEl).setLngLat([point.longitude, point.latitude]).addTo(map.current)

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
            .addTo(map.current)
        })
      })
    }
  }, [mapLoaded, properties, selectedPropertyId, onSelectProperty])

  useEffect(() => {
    if (!map.current || !mapLoaded || !selectedPropertyId || !properties) return

    const selectedProperty = properties.find((p) => p.id === selectedPropertyId)
    if (selectedProperty && selectedProperty.coordinates) {
      map.current.flyTo({
        center: [selectedProperty.coordinates.lng, selectedProperty.coordinates.lat],
        zoom: 14,
        essential: true,
      })
    }
  }, [selectedPropertyId, properties, mapLoaded])

  return (
    <div className="w-full h-full relative" style={{ height }}>
      <div ref={mapContainer} className="w-full h-full" />

      {/* Fallback if map fails to load */}
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center p-4">
            <div className="h-12 w-12 text-gray-400 mx-auto mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3 className="text-lg font-medium">Map unavailable</h3>
            <p className="text-gray-500 mb-4">Unable to load map</p>
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-md text-sm text-amber-800 mb-4">
              <p className="font-medium">Error details:</p>
              <p className="mt-1">{mapError}</p>
              <p className="mt-2">Please try again later or contact support if the issue persists.</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .marker {
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

export default AccraMap
