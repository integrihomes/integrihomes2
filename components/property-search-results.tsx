"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LayoutGrid, MapIcon, SplitSquareVertical, ChevronDown } from "lucide-react"
import PropertyMap from "@/components/PropertyMap"
import { PropertyCard } from "@/components/property-card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface PropertySearchResultsProps {
  location: string
  properties: any[]
  filters: any
  coordinates?: { lat: number; lng: number; zoom: number }
}

export function PropertySearchResults({ location, properties, filters, coordinates }: PropertySearchResultsProps) {
  const [view, setView] = useState<"split" | "map" | "grid">("split")
  const [sortBy, setSortBy] = useState("recommended")

  // Default coordinates for Ghana if none provided
  const defaultCoordinates = {
    lat: 7.9465,
    lng: -1.0232,
    zoom: 7,
  }

  // Use provided coordinates or default
  const mapCoordinates = coordinates || defaultCoordinates

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white border-b border-gray-200 py-2">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h1 className="text-xl font-bold text-navy">
                {location ? `${location} properties` : "All properties in Ghana"}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  {properties.length} {properties.length === 1 ? "home" : "homes"}
                </span>
              </h1>
              {properties.length === 0 && (
                <p className="text-sm text-gray-600">
                  No results in this area, but here are nearby properties that match your criteria
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant={view === "grid" ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-none ${view === "grid" ? "bg-teal hover:bg-teal/90" : ""}`}
                  onClick={() => setView("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "map" ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-none ${view === "map" ? "bg-teal hover:bg-teal/90" : ""}`}
                  onClick={() => setView("map")}
                >
                  <MapIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "split" ? "default" : "ghost"}
                  size="sm"
                  className={`rounded-none ${view === "split" ? "bg-teal hover:bg-teal/90" : ""}`}
                  onClick={() => setView("split")}
                >
                  <SplitSquareVertical className="h-4 w-4" />
                </Button>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("recommended")}>Recommended</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-high")}>Price (High to Low)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-low")}>Price (Low to High)</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {view === "grid" && (
          <div className="w-full bg-gray-50 py-6">
            <div className="container px-4 md:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    id={property.id}
                    title={property.title}
                    price={property.price}
                    address={property.address}
                    beds={property.beds}
                    baths={property.baths}
                    sqft={property.sqft}
                    type={property.type}
                    image={property.image}
                    verified={property.verified}
                  />
                ))}
              </div>

              {properties.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Try adjusting your search criteria or exploring a different area.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {view === "map" && (
          <div className="w-full">
            <PropertyMap
              properties={properties}
              height="calc(100vh - 170px)"
              initialViewState={{
                latitude: mapCoordinates.lat,
                longitude: mapCoordinates.lng,
                zoom: mapCoordinates.zoom,
              }}
              className="w-full"
            />
          </div>
        )}

        {view === "split" && (
          <div className="w-full flex flex-col md:flex-row">
            <div
              className="w-full md:w-1/2 bg-gray-50 py-6 overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 170px)" }}
            >
              <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 gap-6">
                  {properties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      id={property.id}
                      title={property.title}
                      price={property.price}
                      address={property.address}
                      beds={property.beds}
                      baths={property.baths}
                      sqft={property.sqft}
                      type={property.type}
                      image={property.image}
                      verified={property.verified}
                    />
                  ))}
                </div>

                {properties.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Try adjusting your search criteria or exploring a different area.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <PropertyMap
                properties={properties}
                height="calc(100vh - 170px)"
                initialViewState={{
                  latitude: mapCoordinates.lat,
                  longitude: mapCoordinates.lng,
                  zoom: mapCoordinates.zoom,
                }}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
