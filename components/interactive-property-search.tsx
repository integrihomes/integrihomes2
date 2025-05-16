"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, MapPin, X } from "lucide-react"
import PropertyMap from "@/components/PropertyMap"
import { properties } from "@/data/properties"
import { motion, AnimatePresence } from "framer-motion"

export function InteractivePropertySearch() {
  const [showMap, setShowMap] = useState(false)
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState("any")
  const [status, setStatus] = useState("for-sale")
  const [priceRange, setPriceRange] = useState([50, 2000])
  const [bedrooms, setBedrooms] = useState("any")
  const [verified, setVerified] = useState("any")

  // Filter properties based on search criteria
  const filteredProperties = properties.filter((property) => {
    // Simple filtering logic - can be expanded as needed
    if (location && !property.address.toLowerCase().includes(location.toLowerCase())) {
      return false
    }
    if (propertyType !== "any" && property.type.toLowerCase() !== propertyType.toLowerCase()) {
      return false
    }
    if (bedrooms !== "any" && property.beds < Number.parseInt(bedrooms)) {
      return false
    }
    if (verified === "verified" && !property.verified) {
      return false
    }
    return true
  })

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault()
    setShowMap(true)
  }

  // Close map
  const closeMap = () => {
    setShowMap(false)
  }

  return (
    <div className="w-full">
      <div className="bg-white p-6 shadow-lg rounded-xl border border-gray-100">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-navy">Find Your Perfect Property in Ghana</h2>
          <form onSubmit={handleSearch} className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="location" className="text-sm font-medium leading-none">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="location"
                  placeholder="City, region, or area"
                  className="pl-8"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="property-type" className="text-sm font-medium leading-none">
                  Property Type
                </label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger id="property-type">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="status" className="text-sm font-medium leading-none">
                  Status
                </label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="For Sale" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="for-sale">For Sale</SelectItem>
                    <SelectItem value="for-rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="price-range" className="text-sm font-medium leading-none">
                  Price Range (GHS)
                </label>
                <span className="text-sm text-gray-500">
                  ₵{priceRange[0]}k - ₵{priceRange[1]}k
                </span>
              </div>
              <Slider
                defaultValue={[50, 2000]}
                min={0}
                max={5000}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="bedrooms" className="text-sm font-medium leading-none">
                  Bedrooms
                </label>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger id="bedrooms">
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
              <div className="grid gap-2">
                <label htmlFor="verified" className="text-sm font-medium leading-none">
                  Verification
                </label>
                <Select value={verified} onValueChange={setVerified}>
                  <SelectTrigger id="verified">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="verified">Verified Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full gap-1.5 bg-teal hover:bg-teal/90">
              <Search className="h-4 w-4" />
              Search Properties
            </Button>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {showMap && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <div className="bg-white p-6 shadow-lg rounded-xl border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold text-navy">
                    Property Map Results
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      {filteredProperties.length} properties found
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600">
                    {location ? `Showing properties in ${location}` : "Showing all properties"}
                    {propertyType !== "any" ? ` • ${propertyType}` : ""}
                    {bedrooms !== "any" ? ` • ${bedrooms}+ beds` : ""}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={closeMap} className="text-gray-500">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close map</span>
                </Button>
              </div>

              <div className="rounded-xl overflow-hidden shadow-md border border-gray-100">
                <PropertyMap
                  properties={filteredProperties}
                  height="500px"
                  initialViewState={{
                    latitude: 5.6037,
                    longitude: -0.187,
                    zoom: 9,
                  }}
                  className="w-full"
                />
              </div>

              <div className="mt-4 text-sm text-gray-500">
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-teal" />
                  Click on markers to view property details
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
