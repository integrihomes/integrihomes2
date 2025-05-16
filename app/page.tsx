import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, MapPin, ArrowRight, Phone, Mail, Clock, Check, Home, MapIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PropertyCard } from "@/components/property-card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FeaturedProperty } from "@/components/featured-property"
import { VideoBackground } from "@/components/video-background"
import { BlockchainSection } from "@/components/blockchain-section"
import PropertyMap from "@/components/PropertyMap"
import type { Metadata } from "next"
import { properties } from "@/data/properties"

export const metadata: Metadata = {
  title: "IntegriHomes - Where Integrity Meets Home",
  description: "Discover, verify, and own land and property in Ghana with confidence. Secure, Simple, Verified.",
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full relative">
          <VideoBackground videoSrc="/videos/real-estate-background.mp4" overlayOpacity={0.6}>
            <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32 xl:py-48">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                      Where Integrity Meets Home
                    </h1>
                    <p className="max-w-[600px] text-gray-100 md:text-xl">
                      Discover, verify, and own land and property in Ghana with confidence. Secure, Simple, Verified.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="#properties">
                      <Button size="lg" className="gap-1.5 bg-teal hover:bg-teal/90">
                        Browse Properties
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/map-search">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-1.5">
                        <MapPin className="h-4 w-4" />
                        Map Search
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                        Contact an Agent
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="bg-white p-6 shadow-lg rounded-xl border border-gray-100">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-navy">Find Your Perfect Property in Ghana</h2>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="location" className="text-sm font-medium leading-none">
                          Location
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                          <Input id="location" placeholder="City, region, or area" className="pl-8" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <label htmlFor="property-type" className="text-sm font-medium leading-none">
                            Property Type
                          </label>
                          <Select>
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
                          <Select>
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
                          <span className="text-sm text-gray-500">₵50k - ₵2M</span>
                        </div>
                        <Slider defaultValue={[50, 2000]} min={0} max={5000} step={10} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <label htmlFor="bedrooms" className="text-sm font-medium leading-none">
                            Bedrooms
                          </label>
                          <Select>
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
                          <Select>
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
                      <Button className="w-full gap-1.5 bg-teal hover:bg-teal/90">
                        <Search className="h-4 w-4" />
                        Search Properties
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </VideoBackground>
        </section>

        {/* Property Map Integration - Added directly after welcome message */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-teal">Explore</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-navy">
                  Discover Properties Across Ghana
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Browse our interactive map to find verified properties in your desired location.
                </p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl border border-gray-100">
              <PropertyMap
                properties={properties}
                height="500px"
                initialViewState={{
                  latitude: 5.6037,
                  longitude: -0.187,
                  zoom: 9,
                }}
                className="w-full"
              />
            </div>
            <div className="flex justify-center mt-6">
              <Link href="/map-search">
                <Button size="lg" className="gap-1.5 bg-teal hover:bg-teal/90">
                  View Full Map Search
                  <MapIcon className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
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
                  Every property is thoroughly vetted through the Lands Commission to eliminate fraud and ensure secure
                  transactions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Home className="h-8 w-8 text-teal" />
                </div>
                <h3 className="text-xl font-bold text-navy">Verified Properties</h3>
                <p className="text-gray-600">
                  Our verification process ensures all properties have clear titles, land and property registration and
                  proper documentation.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Check className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-navy">Local Expertise</h3>
                <p className="text-gray-600">
                  Our team has deep knowledge of Ghana's real estate market, regional, local and state stool property
                  laws.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* New Map Search Feature Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-white px-3 py-1 text-sm text-teal">New Feature</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-navy">
                  Discover Properties on the Map
                </h2>
                <p className="text-gray-600 md:text-xl/relaxed">
                  Our new interactive map search allows you to explore properties across Ghana visually. Find homes in
                  specific neighborhoods, compare locations, and discover new areas with ease.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-teal" />
                    <span>View all properties on an interactive map</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-teal" />
                    <span>Filter by location, price, and property features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-teal" />
                    <span>Get detailed property information with a single click</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-teal" />
                    <span>Compare properties based on their geographic location</span>
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/map-search">
                    <Button size="lg" className="gap-1.5 bg-teal hover:bg-teal/90">
                      Try Map Search
                      <MapIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 rounded-lg"></div>
                <Image
                  src="/images/map-search-preview.png"
                  alt="Map Search Feature"
                  fill
                  className="object-cover rounded-lg"
                />
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
                  Explore our handpicked selection of premium properties available right now in Ghana.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12">
              <FeaturedProperty />
            </div>
          </div>
        </section>

        <section id="properties" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-navy">Browse Properties</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find your perfect home or land from our extensive collection of verified properties across Ghana.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
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
            <div className="flex justify-center mt-10">
              <Button size="lg" variant="outline" className="gap-1.5 border-teal text-teal hover:bg-teal/10">
                Load More Properties
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-navy text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Find Your Dream Property in Ghana?
                </h2>
                <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our expert agents are ready to help you navigate Ghana's real estate market and find the perfect
                  verified property for your needs.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/contact">
                    <Button size="lg" className="bg-teal text-white hover:bg-teal/90">
                      Contact an Agent
                    </Button>
                  </Link>
                  <Link href="/properties">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-navy/80">
                      Browse All Properties
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
                <h3 className="text-2xl font-bold text-navy">Invest in Ghana from Anywhere</h3>
                <p className="text-gray-600 md:text-xl/relaxed">
                  Whether you're in the diaspora or a local resident, our platform makes it easy to invest in verified
                  Ghanaian real estate with complete confidence and transparency.
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
      <SiteFooter />
    </div>
  )
}
