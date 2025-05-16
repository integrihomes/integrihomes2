"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MapPin, ChevronDown, X } from "lucide-react"
import { geocodeLocation, suggestLocations, type GeoLocation } from "@/services/geocoding-service"

interface PropertySearchHeaderProps {
  onSearch: (location: string, filters: any, coordinates?: { lat: number; lng: number; zoom: number }) => void
  className?: string
  initialLocation?: string
}

export function PropertySearchHeader({ onSearch, className = "", initialLocation = "" }: PropertySearchHeaderProps) {
  const [location, setLocation] = useState(initialLocation)
  const [suggestions, setSuggestions] = useState<GeoLocation[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Handle outside clicks to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Update suggestions when location input changes
  useEffect(() => {
    if (location.length >= 2) {
      const results = suggestLocations(location)
      setSuggestions(results)
      setShowSuggestions(results.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [location])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const geoLocation = geocodeLocation(location)

      if (geoLocation) {
        onSearch(geoLocation.name, {}, { lat: geoLocation.lat, lng: geoLocation.lng, zoom: geoLocation.zoom })
        setStatus("success")
        setShowSuggestions(false)
      } else {
        setStatus("error")
        setErrorMessage(`Location "${location}" not found in Ghana. Please try another location.`)
        setTimeout(() => setStatus("idle"), 3000)
      }
    } catch (error) {
      setStatus("error")
      setErrorMessage("An error occurred while searching. Please try again.")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  const handleSuggestionClick = (suggestion: GeoLocation) => {
    setLocation(suggestion.name)
    setShowSuggestions(false)
    onSearch(suggestion.name, {}, { lat: suggestion.lat, lng: suggestion.lng, zoom: suggestion.zoom })
  }

  const clearSearch = () => {
    setLocation("")
    setShowSuggestions(false)
    setStatus("idle")
  }

  return (
    <div className={`bg-white border-b border-gray-200 py-3 ${className}`}>
      <div className="container px-4 md:px-6">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 items-center">
          <div className="relative w-full md:w-1/3">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search city, neighborhood, or address"
              className="pl-8 pr-8"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => location.length >= 2 && setSuggestions(suggestLocations(location))}
            />
            {location && (
              <button
                type="button"
                className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {/* Location suggestions dropdown */}
            {showSuggestions && (
              <div
                ref={suggestionsRef}
                className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto"
              >
                {suggestions.map((suggestion) => (
                  <div
                    key={`${suggestion.name}-${suggestion.lat}-${suggestion.lng}`}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <MapPin className="h-4 w-4 mr-2 text-teal" />
                    <span>{suggestion.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-2 w-full md:w-auto">
            <Select defaultValue="for-sale">
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder="For sale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="for-sale">For sale</SelectItem>
                <SelectItem value="for-rent">For rent</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  Price
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Any price</DropdownMenuItem>
                <DropdownMenuItem>₵100k - ₵300k</DropdownMenuItem>
                <DropdownMenuItem>₵300k - ₵500k</DropdownMenuItem>
                <DropdownMenuItem>₵500k - ₵1M</DropdownMenuItem>
                <DropdownMenuItem>₵1M+</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  Beds/baths
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Any</DropdownMenuItem>
                <DropdownMenuItem>1+ bed</DropdownMenuItem>
                <DropdownMenuItem>2+ beds</DropdownMenuItem>
                <DropdownMenuItem>3+ beds</DropdownMenuItem>
                <DropdownMenuItem>4+ beds</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  Home type
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Any</DropdownMenuItem>
                <DropdownMenuItem>House</DropdownMenuItem>
                <DropdownMenuItem>Apartment</DropdownMenuItem>
                <DropdownMenuItem>Land</DropdownMenuItem>
                <DropdownMenuItem>Commercial</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button type="submit" className="w-full md:w-auto bg-teal hover:bg-teal/90">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </form>

        {status === "error" && <div className="mt-2 text-red-500 text-sm">{errorMessage}</div>}
      </div>
    </div>
  )
}
