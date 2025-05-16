"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import PropertyMap from "@/components/PropertyMap"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { MapPin, Filter, List, MapIcon } from "lucide-react"
import { properties as allProperties, type Property } from "@/data/properties"

export default function MapSearchPage() {
  const [properties, setProperties] = useState<Property[]>(allProperties)
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"map" | "list" | "split">("split")
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "any",
    priceRange: [0, 2000] as [number, number],
    beds: "any",
    baths: "any",
    verified: false,
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setViewMode("list") // Default to list view on mobile
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Apply filters
  useEffect(() => {
    let filteredProperties = [...allProperties]

    // Filter by location
    if (filters.location) {
      filteredProperties = filteredProperties.filter((property) =>
        property.address.toLowerCase().includes(filters.location.toLowerCase()),
      )
    }

    // Filter by property type
    if (filters.propertyType !== "any") {
      filteredProperties = filteredProperties.filter(
        (property) => property.type.toLowerCase() === filters.propertyType.toLowerCase(),
      )
    }

    // Filter by price range
    filteredProperties = filteredProperties.filter((property) => {
      const price = Number.parseInt(property.price.replace(/[^\d]/g, ""))
      return price >= filters.priceRange[0] * 1000 && price <= filters.priceRange[1] * 1000
    })

    // Filter by beds
    if (filters.beds !== "any") {
      const bedsCount = Number.parseInt(filters.beds)
      filteredProperties = filteredProperties.filter((property) => property.beds >= bedsCount)
    }

    // Filter by baths
    if (filters.baths !== "any") {
      const bathsCount = Number.parseInt(filters.baths)
      filteredProperties = filteredProperties.filter((property) => property.baths >= bathsCount)
    }

    // Filter by verified
    if (filters.verified) {
      filteredProperties = filteredProperties.filter((property) => property.verified)
    }

    setProperties(filteredProperties)
  }, [filters])

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property.id)
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const clearFilters = () => {
    setFilters({
      location: "",
      propertyType: "any",
      priceRange: [0, 2000] as [number, number],
      beds: "any",
      baths: "any",
      verified: false,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-6 md:py-8">
          <div className="container px-4 md:px-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight text-navy mb-2">Map Search</h1>
              <p className="text-gray-600">Explore properties across Ghana with our interactive map search</p>
            </div>

            {/* Search and Filter Controls */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search by location, address, or region"
                    className="pl-10"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                  <div className="hidden md:flex border rounded-md overflow-hidden">
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      className={`rounded-none ${viewMode === "list" ? "bg-teal hover:bg-teal/90" : ""}`}
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "split" ? "default" : "ghost"}
                      size="sm"
                      className={`rounded-none ${viewMode === "split" ? "bg-teal hover:bg-teal/90" : ""}`}
                      onClick={() => setViewMode("split")}
                    >
                      <div className="flex h-4 w-4">
                        <div className="w-1/2 border-r"></div>
                        <div className="w-1/2"></div>
                      </div>
                    </Button>
                    <Button
                      variant={viewMode === "map" ? "default" : "ghost"}
                      size="sm"
                      className={`rounded-none ${viewMode === "map" ? "bg-teal hover:bg-teal/90" : ""}`}
                      onClick={() => setViewMode("map")}
                    >
                      <MapIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Expanded Filters */}
              {isFilterOpen && (
                <div className="mt-4 border-t pt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Property Type</label>
                    <Select
                      value={filters.propertyType}
                      onValueChange={(value) => handleFilterChange("propertyType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Price Range (₵'000s)</label>
                    <div className="px-2">
                      <Slider
                        value={filters.priceRange}
                        min={0}
                        max={2000}
                        step={50}
                        onValueChange={(value) => handleFilterChange("priceRange", value)}
                      />
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>₵{filters.priceRange[0]}k</span>
                        <span>₵{filters.priceRange[1]}k</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Beds</label>
                      <Select value={filters.beds} onValueChange={(value) => handleFilterChange("beds", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Baths</label>
                      <Select value={filters.baths} onValueChange={(value) => handleFilterChange("baths", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verified"
                        checked={filters.verified}
                        onCheckedChange={(checked) => handleFilterChange("verified", checked === true)}
                      />
                      <Label htmlFor="verified">Verified Properties Only</Label>
                    </div>
                    <Button variant="outline" size="sm" onClick={clearFilters} className="mt-2 self-end">
                      Clear Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-gray-600">
                {properties.length} {properties.length === 1 ? "property" : "properties"} found
              </p>
            </div>

            {/* Mobile View Mode Selector */}
            <div className="md:hidden flex border rounded-md overflow-hidden mb-4 w-full">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                className={`flex-1 rounded-none ${viewMode === "list" ? "bg-teal hover:bg-teal/90" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                className={`flex-1 rounded-none ${viewMode === "map" ? "bg-teal hover:bg-teal/90" : ""}`}
                onClick={() => setViewMode("map")}
              >
                <MapIcon className="h-4 w-4 mr-2" />
                Map
              </Button>
            </div>

            {/* Map and Listings */}
            <div
              className={`
              ${viewMode === "split" ? "grid md:grid-cols-2 gap-6" : ""}
              ${viewMode === "list" ? "" : ""}
              ${viewMode === "map" ? "" : ""}
            `}
            >
              {/* Map View */}
              {(viewMode === "map" || viewMode === "split") && (
                <div className={viewMode === "map" ? "mb-6" : ""}>
                  <PropertyMap
                    properties={properties}
                    height={viewMode === "map" ? "70vh" : "600px"}
                    onMarkerClick={handlePropertyClick}
                    selectedPropertyId={selectedProperty || undefined}
                    className={viewMode === "map" ? "sticky top-20" : ""}
                  />
                </div>
              )}

              {/* List View */}
              {(viewMode === "list" || viewMode === "split") && (
                <div
                  className={`
                  ${viewMode === "split" ? "h-[600px] overflow-y-auto pr-2" : ""}
                `}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
                        onClick={() => handlePropertyClick(property)}
                        isSelected={selectedProperty === property.id}
                      />
                    ))}
                  </div>

                  {properties.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500 mb-4">No properties match your search criteria</p>
                      <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
