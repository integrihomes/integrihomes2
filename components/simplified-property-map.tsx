"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Property } from "@/data/properties"

interface SimplifiedPropertyMapProps {
  properties: Property[]
  height?: string
  onMarkerClick?: (property: Property) => void
  selectedPropertyId?: string
  className?: string
}

export function SimplifiedPropertyMap({
  properties,
  height = "600px",
  onMarkerClick,
  selectedPropertyId,
  className = "",
}: SimplifiedPropertyMapProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    properties.find((p) => p.id === selectedPropertyId) || null,
  )

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property)
    if (onMarkerClick) {
      onMarkerClick(property)
    }
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      <div className="md:col-span-2">
        <div
          className="relative rounded-lg overflow-hidden bg-gray-100 flex flex-col items-center justify-center"
          style={{ height }}
        >
          <div className="absolute inset-0">
            <Image src="/images/map-search-preview.png" alt="Map Preview" fill className="object-cover" />
          </div>

          {/* Simulated property markers */}
          {properties.map((property) => (
            <div
              key={property.id}
              className={`absolute cursor-pointer transition-all hover:scale-110 ${
                selectedProperty?.id === property.id ? "z-10 scale-110" : "z-0"
              }`}
              style={{
                left: `${(property.location.lng + 0.4) * 20}%`,
                top: `${(property.location.lat - 5.4) * 40}%`,
              }}
              onClick={() => handlePropertyClick(property)}
            >
              <div className="bg-white rounded-full p-1 shadow-lg">
                <div className="bg-teal text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {property.type === "Land" ? "L" : property.beds > 0 ? property.beds : "C"}
                </div>
              </div>
              {selectedProperty?.id === property.id && (
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg whitespace-nowrap">
                  {property.price}
                </div>
              )}
            </div>
          ))}

          {/* Map overlay with instructions */}
          <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-lg shadow-lg max-w-xs">
            <h4 className="font-semibold text-navy mb-1">Interactive Map Preview</h4>
            <p className="text-xs text-gray-600">
              Click on property markers to view details. For the full interactive map experience, please view on
              desktop.
            </p>
          </div>
        </div>
      </div>

      <div className="h-[600px] overflow-y-auto pr-2">
        <h3 className="font-bold text-lg mb-4 text-navy">Properties</h3>
        <div className="space-y-4">
          {properties.map((property) => (
            <Card
              key={property.id}
              className={`cursor-pointer transition-colors ${
                selectedProperty?.id === property.id ? "border-teal" : ""
              }`}
              onClick={() => handlePropertyClick(property)}
            >
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover rounded"
                    />
                    {property.verified && (
                      <div className="absolute -top-2 -right-2 bg-teal text-white p-1 rounded-full">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm line-clamp-1">{property.title}</h4>
                    <p className="text-teal font-bold text-sm">{property.price}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="truncate">{property.address}</span>
                    </div>
                    <div className="mt-2">
                      <Link href={`/properties/${property.id}`}>
                        <Button size="sm" variant="outline" className="text-xs w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
