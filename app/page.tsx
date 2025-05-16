"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, Mail, Clock, Check, Home, MapPin, Search, ChevronDown } from "lucide-react"
import Link from "next/link"
import { PropertyCard } from "@/components/property-card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FeaturedProperty } from "@/components/featured-property"
import { BlockchainSection } from "@/components/blockchain-section"
import { PropertySearchHeader } from "@/components/property-search-header"
import { PropertySearchResults } from "@/components/property-search-results"
import { properties } from "@/data/properties"
import { geocodeLocation } from "@/services/geocoding-service"

export default function HomePage() {
  const [searchActive, setSearchActive] = useState(false)
  const [searchLocation, setSearchLocation] = useState("")
  const [searchFilters, setSearchFilters] = useState({})
  const [filteredProperties, setFilteredProperties] = useState(properties)
  const [mapCoordinates, setMapCoordinates] = useState<{ lat: number; lng: number; zoom: number } | undefined>(
    undefined,
  )
  const [activeTab, setActiveTab] = useState("buy")

  const handleSearch = (location: string, filters: any, coordinates?: { lat: number; lng: number; zoom: number }) => {
    setSearchLocation(location)
    setSearchFilters(filters)
    setSearchActive(true)

    if (coordinates) {
      setMapCoordinates(coordinates)
    } else if (location) {
      // Try to geocode the location if coordinates weren't provided
      const geoLocation = geocodeLocation(location)
      if (geoLocation) {
        setMapCoordinates({
          lat: geoLocation.lat,
          lng: geoLocation.lng,
          zoom: geoLocation.zoom,
        })
      }
    }

    // Filter properties based on location
    const filtered = properties.filter((property) => {
      if (!location) return true
      return property.address.toLowerCase().includes(location.toLowerCase())
    })

    setFilteredProperties(filtered)

    // Scroll to results
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      {searchActive ? (
        <>
          <PropertySearchHeader
            onSearch={handleSearch}
            className="sticky top-0 z-10"
            initialLocation={searchLocation}
          />
          <PropertySearchResults
            location={searchLocation}
            properties={filteredProperties}
            filters={searchFilters}
            coordinates={mapCoordinates}
          />
        </>
      ) : (
        <main className="flex-1">
          <section className="w-full relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/90 to-teal/80 z-0"></div>
            <div className="absolute inset-0 bg-grid-white/5 z-0"></div>
            <div className="absolute right-0 top-0 h-full w-1/2 bg-teal/10 rounded-l-full blur-3xl z-0"></div>

            {/* Animated dots */}
            <div className="absolute inset-0 z-0">
              <div className="integrity-dots"></div>
            </div>

            <div className="container relative z-10 px-4 md:px-6 py-16 md:py-28 lg:py-36">
              <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-6">
                  <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                      Where <span className="text-teal">Integrity</span> Meets{" "}
                      <span className="relative inline-block">
                        Home
                        <span className="absolute bottom-1 left-0 w-full h-1 bg-gold rounded-full"></span>
                      </span>
                    </h1>
                    <p className="max-w-[600px] text-gray-100 md:text-xl leading-relaxed mb-6">
                      Discover, verify, and own land and property with confidence.
                      <span className="block mt-2 font-semibold">Secure. Simple. Verified.</span>
                    </p>
                  </div>
                  {/* Hero buttons removed */}
                </div>
                <div className="relative">
                  {/* Floating elements */}
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/20 rounded-full blur-xl animate-pulse"></div>
                  <div
                    className="absolute -bottom-8 -right-8 w-32 h-32 bg-teal/20 rounded-full blur-xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>

                  <div className="relative z-10">
                    {/* Tabs */}
                    <div className="flex flex-wrap">
                      <button
                        className={`py-3 px-6 text-base font-medium rounded-tl-lg ${
                          activeTab === "buy"
                            ? "bg-white text-navy border-b-2 border-teal"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } transition-colors focus:outline-none`}
                        onClick={() => setActiveTab("buy")}
                      >
                        Buy
                      </button>
                      <button
                        className={`py-3 px-6 text-base font-medium ${
                          activeTab === "rent"
                            ? "bg-white text-navy border-b-2 border-teal"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } transition-colors focus:outline-none`}
                        onClick={() => setActiveTab("rent")}
                      >
                        Rent
                      </button>
                      <button
                        className={`py-3 px-6 text-base font-medium ${
                          activeTab === "sell"
                            ? "bg-white text-navy border-b-2 border-teal"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } transition-colors focus:outline-none`}
                        onClick={() => setActiveTab("sell")}
                      >
                        Sell
                      </button>
                      <button
                        className={`py-3 px-6 text-base font-medium ${
                          activeTab === "mortgage"
                            ? "bg-white text-navy border-b-2 border-teal"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } transition-colors focus:outline-none`}
                        onClick={() => setActiveTab("mortgage")}
                      >
                        Mortgage
                      </button>
                      <button
                        className={`py-3 px-6 text-base font-medium rounded-tr-lg ${
                          activeTab === "value"
                            ? "bg-white text-navy border-b-2 border-teal"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } transition-colors focus:outline-none`}
                        onClick={() => setActiveTab("value")}
                      >
                        My Home Value
                      </button>
                    </div>

                    {/* Search Card */}
                    <div className="bg-white p-6 shadow-xl rounded-b-xl border border-gray-100 transform transition-transform hover:scale-[1.02] duration-500">
                      <div className="absolute -top-3 -right-3 bg-teal text-white text-xs px-3 py-1 rounded-full font-medium">
                        Verified Properties
                      </div>
                      <div className="space-y-4">
                        <h2 className="text-xl font-bold text-navy">Find Your Perfect Property</h2>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault()
                            window.location.href = "/map-search"
                          }}
                        >
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Enter an address, neighborhood, city, or ZIP code"
                              className="h-12 w-full rounded-md border border-gray-200 bg-white pl-4 pr-12 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                            />
                            <button
                              type="submit"
                              className="absolute right-1 top-1/2 -translate-y-1/2 bg-teal hover:bg-teal/90 text-white h-10 w-10 rounded-md flex items-center justify-center transition-colors"
                            >
                              <Search className="h-5 w-5" />
                            </button>
                          </div>
                        </form>
                        <div className="mt-4 text-center">
                          <a
                            href="/map-search"
                            className="inline-flex items-center gap-2 text-teal hover:text-teal/80 font-medium transition-colors"
                          >
                            <MapPin size={16} />
                            Explore Interactive Map
                          </a>
                        </div>

                        {/* Trust indicators */}
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Check className="h-3 w-3 text-teal mr-1" />
                              Verified Properties
                            </span>
                            <span className="flex items-center">
                              <Check className="h-3 w-3 text-teal mr-1" />
                              Secure Transactions
                            </span>
                            <span className="flex items-center">
                              <Check className="h-3 w-3 text-teal mr-1" />
                              Local Expertise
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add this to your globals.css or as a style tag */}
            <style jsx>{`
              .bg-grid-white\/5 {
                background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
              }
              
              .integrity-dots {
                position: absolute;
                width: 100%;
                height: 100%;
                background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
                background-size: 30px 30px;
              }
              
              @keyframes pulse {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 0.8; }
              }
              
              .animate-pulse {
                animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
              }
            `}</style>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-teal">Our Mission</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-navy">Why Choose IntegriHomes</h2>
                  <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    To create a trustworthy digital platform for buying, selling, and renting homes with transparency,
                    security, and community at the core.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-12 pt-12">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Check className="h-8 w-8 text-teal" />
                  </div>
                  <h3 className="text-xl font-bold text-navy">Secure Transactions</h3>
                  <p className="text-gray-600">
                    Every property is thoroughly vetted to eliminate fraud and ensure secure transactions.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Home className="h-8 w-8 text-teal" />
                  </div>
                  <h3 className="text-xl font-bold text-navy">Verified Properties</h3>
                  <p className="text-gray-600">
                    Our verification process ensures all properties have clear titles, land and property registration
                    and proper documentation.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Check className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-navy">Local Expertise</h3>
                  <p className="text-gray-600">
                    Our team has deep knowledge of regional real estate markets, local regulations, and property laws.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Blockchain Section */}
          <BlockchainSection />

          <section id="featured" className="w-full py-12 md:py-24 lg:py-32 bg-white">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-teal">Featured</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-navy">Featured Properties</h2>
                  <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Explore our handpicked selection of premium properties available right now.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12">
                <FeaturedProperty />
              </div>
            </div>
          </section>

          <section id="properties" className="w-full py-12 md:py-24 lg:py-32 bg-white">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="space-y-2 max-w-3xl">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-teal">
                    Verified Properties
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-navy">Browse Properties</h2>
                  <p className="text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Find your perfect home or land from our extensive collection of verified properties.
                  </p>
                </div>

                {/* Property filters */}
                <div className="w-full max-w-4xl mt-8 flex flex-wrap gap-3 justify-center">
                  <Button variant="outline" className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100">
                    All Properties
                  </Button>
                  <Button variant="outline" className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100">
                    Houses
                  </Button>
                  <Button variant="outline" className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100">
                    Apartments
                  </Button>
                  <Button variant="outline" className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100">
                    Land
                  </Button>
                  <Button variant="outline" className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100">
                    Commercial
                  </Button>
                  <Button variant="outline" className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100">
                    Price <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                  <Button variant="outline" className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-100">
                    Bedrooms <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <PropertyCard
                  id="1"
                  title="Modern Apartment in East Legon"
                  price="₵450,000"
                  address="East Legon, Accra"
                  beds={2}
                  baths={2}
                  sqft={1200}
                  type="Apartment"
                  image="/images/modern-apartment-east-legon.png"
                  verified={true}
                />
                <PropertyCard
                  id="2"
                  title="Spacious Family Home in Cantonments"
                  price="₵750,000"
                  address="Cantonments, Accra"
                  beds={4}
                  baths={3}
                  sqft={2500}
                  type="House"
                  image="/images/family-home-cantonments.png"
                  verified={true}
                />
                <PropertyCard
                  id="3"
                  title="Beachfront Property in Kokrobite"
                  price="₵1,200,000"
                  address="Kokrobite, Greater Accra"
                  beds={3}
                  baths={2}
                  sqft={1800}
                  type="House"
                  image="/images/beachfront-villa.png"
                  verified={true}
                />
                <PropertyCard
                  id="4"
                  title="Residential Land in Tema"
                  price="₵180,000"
                  address="Community 25, Tema"
                  beds={0}
                  baths={0}
                  sqft={5000}
                  type="Land"
                  image="/images/residential-land-tema.png"
                  verified={true}
                />
                <PropertyCard
                  id="5"
                  title="Colonial Style Home in Labone"
                  price="₵850,000"
                  address="Labone, Accra"
                  beds={4}
                  baths={3}
                  sqft={2800}
                  type="House"
                  image="/images/colonial-home-labone.png"
                  verified={true}
                />
                <PropertyCard
                  id="6"
                  title="Modern Studio Apartment in Airport Residential"
                  price="₵320,000"
                  address="Airport Residential, Accra"
                  beds={1}
                  baths={1}
                  sqft={650}
                  type="Apartment"
                  image="/images/studio-apartment-airport.png"
                  verified={true}
                />
                <PropertyCard
                  id="7"
                  title="Lakeside Property in Akosombo"
                  price="₵1,500,000"
                  address="Akosombo, Eastern Region"
                  beds={5}
                  baths={4}
                  sqft={3200}
                  type="House"
                  image="/images/lakeside-property-akosombo.png"
                  verified={true}
                />
                <PropertyCard
                  id="8"
                  title="Commercial Land in Kumasi"
                  price="₵650,000"
                  address="Adum, Kumasi"
                  beds={0}
                  baths={0}
                  sqft={10000}
                  type="Land"
                  image="/images/commercial-land-kumasi.png"
                  verified={true}
                />
              </div>

              <div className="flex justify-center mt-12">
                <Button size="lg" className="gap-1.5 bg-teal hover:bg-teal/90 px-8">
                  View All Properties
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>

          <section id="cta" className="w-full py-12 md:py-24 lg:py-32 text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/90 to-teal/80 z-0"></div>
            <div className="absolute inset-0 bg-grid-white/5 z-0"></div>
            <div className="absolute right-0 top-0 h-full w-1/2 bg-teal/10 rounded-l-full blur-3xl z-0"></div>

            {/* Animated dots */}
            <div className="absolute inset-0 z-0">
              <div className="integrity-dots"></div>
            </div>

            {/* Floating elements */}
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-gold/20 rounded-full blur-xl animate-pulse"></div>
            <div
              className="absolute top-20 right-20 w-32 h-32 bg-teal/20 rounded-full blur-xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>

            <div className="container px-4 md:px-6 relative z-10">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Ready to Find Your Dream Property?
                  </h2>
                  <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our expert agents are ready to help you navigate the real estate market and find the perfect
                    verified property for your needs.
                  </p>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="/contact">
                      <Button size="lg" className="bg-teal text-white hover:bg-teal/90">
                        Contact an Agent
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 rounded-lg bg-navy-800 p-4 bg-opacity-50">
                    <Phone className="h-6 w-6 text-gold" />
                    <div>
                      <h3 className="font-medium">Call Us</h3>
                      <p className="text-gray-300">+233 24 712 0078</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg bg-navy-800 p-4 bg-opacity-50">
                    <Mail className="h-6 w-6 text-gold" />
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <p className="text-gray-300">info@integrihomes.co</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 rounded-lg bg-navy-800 p-4 bg-opacity-50">
                    <Clock className="h-6 w-6 text-gold" />
                    <div>
                      <h3 className="font-medium">Office Hours</h3>
                      <p className="text-gray-300">Mon-Fri: 9AM-6PM, Sat: 10AM-4PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-white border-t">
            <div className="container px-4 md:px-6">
              <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
                <div className="space-y-4">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-teal">Our Vision</div>
                  <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-navy">
                    Redefining Homeownership
                  </h2>
                  <p className="text-gray-600 md:text-xl/relaxed">
                    To redefine homeownership by bridging people, property, and integrity through technology.
                  </p>
                  <Link
                    href="/about"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-teal px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-teal/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Learn More About Us
                  </Link>
                </div>
                <div className="flex flex-col items-start space-y-4">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-teal">For Diaspora</div>
                  <h3 className="text-2xl font-bold text-navy">Invest from Anywhere</h3>
                  <p className="text-gray-600 md:text-xl/relaxed">
                    Whether you're in the diaspora or a local resident, our platform makes it easy to invest in verified
                    real estate with complete confidence and transparency.
                  </p>
                  <Link
                    href="/diaspora"
                    className="inline-flex h-9 items-center justify-center rounded-md border border-teal bg-white px-4 py-2 text-sm font-medium text-teal shadow-sm transition-colors hover:bg-teal/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Diaspora Services
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      <SiteFooter />
    </div>
  )
}
