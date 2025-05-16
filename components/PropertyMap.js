"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { MapIcon } from "lucide-react"
import Image from "next/image"

// Main PropertyMap component with robust error handling and fallbacks
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
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)
  const [map, setMap] = useState(null)
  const [mapboxgl, setMapboxgl] = useState(null)
  const mapContainerRef = useRef(null)

  // Initialize map
  useEffect(() => {
    let isMounted = true

    const initializeMap = async () => {
      try {
        // Import mapbox-gl
        const mapboxglModule = await import("mapbox-gl")
        await import("mapbox-gl/dist/mapbox-gl.css")

        if (!isMounted) return

        const mapboxInstance = mapboxglModule.default
        setMapboxgl(mapboxInstance)

        // Check if the container exists
        if (!mapContainerRef.current) {
          console.error("Map container not found")
          setMapError(true)
          return
        }

        // Set access token
        mapboxInstance.accessToken =
          "pk.eyJ1IjoiaW50ZWdyaWhvbWVzIiwiYSI6ImNscXRqcWRxcjBkdXEyanBsOGx1NWdtdmQifQ.Bj1XKGJ-2FTnX-oYZ0riDg"

        // Create map instance
        const mapInstance = new mapboxInstance.Map({
          container: mapContainerRef.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [initialViewState.longitude, initialViewState.latitude],
          zoom: initialViewState.zoom,
          attributionControl: false,
          preserveDrawingBuffer: true,
        })

        // Add navigation control
        mapInstance.addControl(new mapboxInstance.NavigationControl(), "top-right")

        // Handle map load event
        mapInstance.on("load", () => {
          if (!isMounted) return
          setMapLoaded(true)
          setMap(mapInstance)

          // Add markers for properties
          addMarkersToMap(mapInstance, mapboxInstance)
        })

        // Handle map error
        mapInstance.on("error", (e) => {
          console.error("Mapbox error:", e)
          if (!isMounted) return
          setMapError(true)
        })
      } catch (error) {
        console.error("Failed to initialize map:", error)
        if (!isMounted) return
        setMapError(true)
      }
    }

    initializeMap()

    return () => {
      isMounted = false
      // Clean up map instance
      if (map) {
        map.remove()
      }
    }
  }, [])

  // Update map when properties change
  useEffect(() => {
    if (map && mapboxgl && mapLoaded) {
      // Clear existing markers
      const existingMarkers = document.querySelectorAll(".mapboxgl-marker")
      existingMarkers.forEach((marker) => marker.remove())

      // Add new markers
      addMarkersToMap(map, mapboxgl)
    }
  }, [properties, map, mapboxgl, mapLoaded])

  // Update map when selected property changes
  useEffect(() => {
    if (map && mapLoaded && selectedPropertyId) {
      const selectedProperty = properties.find((p) => p.id === selectedPropertyId)
      if (selectedProperty && selectedProperty.location) {
        map.flyTo({
          center: [selectedProperty.location.lng, selectedProperty.location.lat],
          zoom: 15,
          essential: true,
        })
      }
    }
  }, [selectedPropertyId, map, mapLoaded, properties])

  // Update map when center/zoom props change
  useEffect(() => {
    if (map && mapLoaded && (center || zoom !== undefined)) {
      const newCenter = center || [map.getCenter().lng, map.getCenter().lat]
      const newZoom = zoom !== undefined ? zoom : map.getZoom()

      map.flyTo({
        center: newCenter,
        zoom: newZoom,
        essential: true,
      })
    }
  }, [center, zoom, map, mapLoaded])

  // Function to add markers to the map
  const addMarkersToMap = (mapInstance, mapboxglInstance) => {
    if (!properties || !properties.length) return

    // Create bounds to fit all markers
    const bounds = new mapboxglInstance.LngLatBounds()

    properties.forEach((property) => {
      if (!property.location) return

      // Create marker element
      const markerEl = document.createElement("div")
      markerEl.className = "property-marker"
      markerEl.innerHTML = `
        <div class="flex items-center justify-center w-12 h-12 -mt-6 cursor-pointer transition-transform hover:scale-110 ${
          selectedPropertyId === property.id ? "scale-110" : ""
        }">
          <div class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div class="bg-white rounded-full p-1 shadow-lg">
              <div class="bg-teal text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                ${property.type === "Land" ? "L" : property.beds > 0 ? property.beds : "C"}
              </div>
            </div>
          </div>
          <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-teal"></div>
          <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white text-navy text-xs font-bold py-1 px-2 rounded shadow-md whitespace-nowrap">
            ${property.price}
          </div>
        </div>
      `

      // Add click event
      markerEl.addEventListener("click", () => {
        if (onMarkerClick) {
          onMarkerClick(property)
        }

        // Create popup
        const popupContent = document.createElement("div")
        popupContent.className = "property-popup"
        popupContent.innerHTML = `
          <div class="card border-0 shadow-none">
            <div class="p-0">
              <div class="relative h-32 w-full">
                <img 
                  src="${property.image || "/placeholder.svg"}" 
                  alt="${property.title}"
                  class="object-cover rounded-t-lg w-full h-full"
                />
                ${
                  property.verified
                    ? `
                  <div class="absolute top-2 left-2 bg-teal text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gold">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Verified</span>
                  </div>
                `
                    : ""
                }
              </div>
              <div class="p-3">
                <h3 class="font-bold text-sm mb-1 text-navy">${property.title}</h3>
                <p class="text-teal font-bold text-sm mb-1">${property.price}</p>
                <div class="flex items-center text-xs text-gray-500 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span class="truncate">${property.address}</span>
                </div>
                <div class="flex justify-between text-xs text-gray-600 mb-3">
                  ${
                    property.beds > 0
                      ? `
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                        <path d="M2 9V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4"></path>
                        <path d="M2 11v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4"></path>
                        <path d="M2 12h20"></path>
                      </svg>
                      <span>${property.beds}</span>
                    </div>
                  `
                      : ""
                  }
                  ${
                    property.baths > 0
                      ? `
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                        <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path>
                        <line x1="10" y1="16" x2="8" y2="16"></line>
                        <line x1="14" y1="16" x2="12" y2="16"></line>
                        <line x1="18" y1="16" x2="16" y2="16"></line>
                        <path d="M13.73 4a2 2 0 0 0-3.46 0"></path>
                        <path d="M18 8.5V8a2.5 2.5 0 0 0-5 0v.5"></path>
                        <path d="M2 9.5h20"></path>
                      </svg>
                      <span>${property.baths}</span>
                    </div>
                  `
                      : ""
                  }
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    </svg>
                    <span>${property.sqft} sq ft</span>
                  </div>
                </div>
                <a href="/properties/${property.id}" class="w-full inline-block text-center bg-teal hover:bg-teal/90 text-white text-xs py-2 px-4 rounded">
                  View Details
                </a>
              </div>
            </div>
          </div>
        `

        // Create popup
        const popup = new mapboxglInstance.Popup({
          closeButton: true,
          closeOnClick: false,
          maxWidth: "300px",
          offset: [0, -15],
        })
          .setLngLat([property.location.lng, property.location.lat])
          .setDOMContent(popupContent)
          .addTo(mapInstance)
      })

      // Create marker
      const marker = new mapboxglInstance.Marker(markerEl)
        .setLngLat([property.location.lng, property.location.lat])
        .addTo(mapInstance)

      // Extend bounds
      bounds.extend([property.location.lng, property.location.lat])
    })

    // Fit bounds if we have properties
    if (properties.length > 1) {
      mapInstance.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15,
      })
    }
  }

  // Create a fallback map component
  const FallbackMap = () => {
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
            {mapError ? (
              <>
                We're having trouble loading the interactive map. Please try refreshing the page or check your internet
                connection.
              </>
            ) : (
              <>
                The interactive property map shows {properties.length} properties across Ghana. Click on markers to view
                property details.
              </>
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

  // Add CSS for markers
  useEffect(() => {
    // Add CSS for markers
    const style = document.createElement("style")
    style.textContent = `
      .property-marker {
        cursor: pointer;
      }
      .mapboxgl-popup-content {
        padding: 0 !important;
        border-radius: 0.5rem !important;
        overflow: hidden !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`} style={{ height }}>
      {mapError ? (
        <FallbackMap />
      ) : (
        <>
          <div
            ref={mapContainerRef}
            className="w-full h-full"
            style={{ visibility: mapLoaded ? "visible" : "hidden" }}
          />
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal mb-4"></div>
                <p className="text-gray-600">Loading map...</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default PropertyMap
