import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bed,
  Bath,
  SquareIcon as SquareFoot,
  MapPin,
  Heart,
  Share,
  Calendar,
  Phone,
  Mail,
  ArrowLeft,
  Shield,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PropertyGallery } from "@/components/property-gallery"
import { ContactForm } from "@/components/contact-form"
import { PropertyBlockchainDetails } from "@/components/blockchain/property-blockchain-details"
import { PropertyTokenization } from "@/components/blockchain/property-tokenization"
import { PropertyMarketplace } from "@/components/blockchain/property-marketplace"
import { ConnectWalletButton } from "@/components/blockchain/connect-wallet-button"
import { properties } from "@/data/properties"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Property Details | IntegriHomes",
  description: "View detailed information about this property listed with IntegriHomes.",
}

export default function PropertyPage({ params }: { params: { id: string } }) {
  const property = properties.find((p) => p.id === params.id) || {
    id: params.id,
    title: "Luxury Waterfront Villa",
    price: "₵1,250,000",
    address: "Kokrobite Beach, Greater Accra, Ghana",
    description:
      "This stunning waterfront villa offers breathtaking ocean views and luxurious living spaces. The property features an open floor plan with high ceilings, floor-to-ceiling windows, and premium finishes throughout. The gourmet kitchen is equipped with top-of-the-line appliances and a large center island. The primary suite includes a spa-like bathroom and a private balcony overlooking the ocean. Outside, you'll find a beautifully landscaped yard with a swimming pool, outdoor kitchen, and direct beach access.",
    beds: 4,
    baths: 3.5,
    sqft: 3200,
    location: {
      lat: 5.5192,
      lng: -0.3346,
    },
    yearBuilt: 2020,
    lotSize: "0.5 acres",
    garage: "2-car attached",
    type: "Villa",
    image: "/images/beachfront-villa.png",
    verified: true,
    features: [
      "Waterfront property",
      "Swimming pool",
      "Outdoor kitchen",
      "Smart home technology",
      "Hardwood floors",
      "Gourmet kitchen",
      "Walk-in closets",
      "Central air conditioning",
      "Fireplace",
      "Home office",
      "Security system",
      "Wine cellar",
    ],
    agent: {
      name: "Sarah Johnson",
      phone: "(+233) 24-123-4567",
      email: "sarah.johnson@integrihomes.co",
      image: "/placeholder.svg?height=150&width=150",
    },
    images: [
      "/images/beachfront-villa.png",
      "/images/beachfront-villa-interior.png",
      "/images/beachfront-villa-bedroom.png",
      "/placeholder.svg?height=600&width=800&text=Bathroom",
      "/placeholder.svg?height=600&width=800&text=Pool",
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Link>

          <div className="grid gap-6 lg:grid-cols-[2fr_1fr] lg:gap-12">
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">{property.title}</h1>
                <div className="flex items-center gap-2 mt-2 text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>{property.address}</span>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-2xl font-bold text-teal">{property.price}</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4 text-gray-500" />
                      <span>{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4 text-gray-500" />
                      <span>{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <SquareFoot className="h-4 w-4 text-gray-500" />
                      <span>{property.sqft} sq ft</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Heart className="h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Share className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Calendar className="h-4 w-4" />
                    Schedule Tour
                  </Button>
                  <div className="ml-auto">
                    <ConnectWalletButton />
                  </div>
                </div>
              </div>

              <PropertyGallery images={property.images} />

              <Tabs defaultValue="details" className="mt-8">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="map">Map</TabsTrigger>
                  <TabsTrigger value="blockchain" className="flex items-center gap-1">
                    <Shield className="h-4 w-4" />
                    Blockchain
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Property Description</h2>
                      <p className="text-gray-700 leading-relaxed">{property.description}</p>
                    </div>
                    <Separator />
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <div>
                          <p className="text-sm text-gray-500">Property Type</p>
                          <p className="font-medium">{property.type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Year Built</p>
                          <p className="font-medium">{property.yearBuilt}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Lot Size</p>
                          <p className="font-medium">{property.lotSize}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Bedrooms</p>
                          <p className="font-medium">{property.beds}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Bathrooms</p>
                          <p className="font-medium">{property.baths}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Square Feet</p>
                          <p className="font-medium">{property.sqft}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Garage</p>
                          <p className="font-medium">{property.garage}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="features" className="pt-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Property Features</h2>
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                      {property.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-teal" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="map" className="pt-6">
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Map view would be displayed here</p>
                  </div>
                </TabsContent>
                <TabsContent value="blockchain" className="pt-6">
                  <div className="space-y-6">
                    <PropertyBlockchainDetails propertyId={property.id} />
                    <PropertyTokenization propertyId={property.id} />
                    <PropertyMarketplace propertyId={property.id} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src={property.agent.image}
                      alt={property.agent.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">{property.agent.name}</p>
                      <p className="text-sm text-gray-500">{property.agent.email}</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Phone className="h-4 w-4" />
                      Call Agent
                    </Button>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Mail className="h-4 w-4" />
                      Email Agent
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
