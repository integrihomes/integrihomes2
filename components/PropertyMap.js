"use client"

import { useState, useEffect } from "react"
import { properties } from "../data/properties"
import styles from "../styles/PropertyMap.module.css"
import Image from "next/image"
import { MapPin, Check } from "lucide-react"

export default function PropertyMap() {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapboxgl, setMapboxgl] = useState(null)
  const [map, setMap] = useState(null)
  const [selectedProperty, setSelectedProperty] = useState(null)

  // Initialize map when component mounts
  useEffect(() => {
    // Dynamic import of mapbox-gl to avoid SSR issues
    const initializeMap = async () => {
      try {
        // Import CSS
        await import("mapbox-gl/dist/mapbox-gl.css")
        // Import mapbox-gl
        const mapboxModule = await import("mapbox-gl")
        setMapboxgl(mapboxModule.default)
        setMapLoaded(true)
      } catch (error) {
        console.error("Failed to load mapbox-gl:", error)
      }
    }

    initializeMap()
  }, [])

  // Setup map after mapbox-gl is loaded
  useEffect(() => {
    if (!mapLoaded || !mapboxgl) return

    // Initialize map
    const mapInstance = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [0.187, 5.6037], // Ghana coordinates (reversed for mapbox)
      zoom: 9,
      accessToken: "pk.eyJ1IjoiaW50ZWdyaWhvbWVzIiwiYSI6ImNscXRqcWRxcjBkdXEyanBsOGx1NWdtdmQifQ.Bj1XKGJ-2FTnX-oYZ0riDg",
    })

    // Add navigation controls
    mapInstance.addControl(new mapboxgl.NavigationControl(), "top-right")
    mapInstance.addControl(new mapboxgl.FullscreenControl(), "top-right")

    // Add markers for each property
    properties.forEach((property) => {
      // Create custom marker element
      const el = document.createElement("div")
      el.className = styles.marker

      // Create marker content
      el.innerHTML = `
        <div class="${styles.markerContent}">
          <div class="${styles.markerIcon}">
            ${property.type === "Land" ? "L" : property.beds > 0 ? property.beds : "C"}
          </div>
          <div class="${styles.markerPrice}">${property.price}</div>
        </div>
      `

      // Add click event
      el.addEventListener("click", () => {
        setSelectedProperty(property)
      })

      // Add marker to map
      new mapboxgl.Marker(el).setLngLat([property.location.lng, property.location.lat]).addTo(mapInstance)
    })

    // Setup popup when a property is selected
    if (selectedProperty) {
      const popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([selectedProperty.location.lng, selectedProperty.location.lat])
        .setHTML(`
          <div class="${styles.popup}">
            <img src="${selectedProperty.image}" alt="${selectedProperty.title}" class="${styles.popupImage}" />
            <div class="${styles.popupContent}">
              <h3>${selectedProperty.title}</h3>
              <p class="${styles.popupPrice}">${selectedProperty.price}</p>
              <p>${selectedProperty.address}</p>
              <div class="${styles.popupDetails}">
                ${selectedProperty.beds > 0 ? `<span>${selectedProperty.beds} Beds</span>` : ""}
                ${selectedProperty.baths > 0 ? `<span>${selectedProperty.baths} Baths</span>` : ""}
                <span>${selectedProperty.sqft} sq ft</span>
              </div>
              <a href="/properties/${selectedProperty.id}" class="${styles.popupButton}">View Details</a>
            </div>
          </div>
        `)
        .addTo(mapInstance)
    }

    setMap(mapInstance)

    // Cleanup on unmount
    return () => {
      if (mapInstance) {
        mapInstance.remove()
      }
    }
  }, [mapLoaded, mapboxgl, selectedProperty])

  // Fallback UI when map is not available
  if (!mapLoaded || !mapboxgl) {
    return (
      <div className={styles.fallbackContainer}>
        <div className={styles.fallbackContent}>
          <MapPin size={48} className={styles.fallbackIcon} />
          <h2>Map Loading...</h2>
          <p>
            Our interactive property map is loading. You'll be able to explore {properties.length} properties across
            Ghana soon.
          </p>
          <div className={styles.fallbackProperties}>
            {properties.slice(0, 4).map((property) => (
              <div key={property.id} className={styles.fallbackProperty}>
                <h3>{property.title}</h3>
                <p>{property.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div id="map" className={styles.map}></div>
      <div className={styles.sidebar}>
        <h2>Properties</h2>
        <div className={styles.propertyList}>
          {properties.map((property) => (
            <div
              key={property.id}
              className={`${styles.propertyItem} ${selectedProperty?.id === property.id ? styles.selected : ""}`}
              onClick={() => setSelectedProperty(property)}
            >
              <div className={styles.propertyImage}>
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  width={80}
                  height={60}
                  objectFit="cover"
                />
                {property.verified && (
                  <div className={styles.verifiedBadge}>
                    <Check size={12} />
                  </div>
                )}
              </div>
              <div className={styles.propertyInfo}>
                <h3>{property.title}</h3>
                <p className={styles.propertyPrice}>{property.price}</p>
                <p className={styles.propertyAddress}>{property.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
