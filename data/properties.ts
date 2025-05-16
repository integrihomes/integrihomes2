export type Property = {
  id: string
  title: string
  price: string
  address: string
  beds: number
  baths: number
  sqft: number
  type: string
  image: string
  verified: boolean
  location: {
    lat: number
    lng: number
  }
  yearBuilt?: number
  lotSize?: string
  garage?: string
  description?: string
  features?: string[]
  agent?: {
    name: string
    phone: string
    email: string
    image: string
  }
  images?: string[]
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Apartment in East Legon",
    price: "₵450,000",
    address: "East Legon, Accra",
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: "Apartment",
    image: "/images/modern-apartment-east-legon.png",
    verified: true,
    location: {
      lat: 5.6361,
      lng: -0.1633,
    },
    description:
      "A modern apartment with contemporary finishes, located in the heart of East Legon. Features include an open floor plan, updated kitchen, and a spacious balcony with city views.",
    features: ["Open floor plan", "Updated kitchen", "Balcony", "City views", "Security system"],
    images: ["/images/modern-apartment-east-legon.png"],
    agent: {
      name: "David Mensah",
      phone: "(+233) 24-555-1234",
      email: "david.mensah@integrihomes.co",
      image: "/placeholder.svg?height=150&width=150&text=DM",
    },
  },
  {
    id: "2",
    title: "Spacious Family Home in Cantonments",
    price: "₵750,000",
    address: "Cantonments, Accra",
    beds: 4,
    baths: 3,
    sqft: 2500,
    type: "House",
    image: "/images/family-home-cantonments.png",
    verified: true,
    location: {
      lat: 5.5788,
      lng: -0.1761,
    },
    description:
      "A spacious family home in the prestigious Cantonments area. This property features 4 bedrooms, 3 bathrooms, a large garden, and a modern kitchen perfect for family gatherings.",
    features: ["Large garden", "Modern kitchen", "Family room", "Master suite", "Security system"],
    images: ["/images/family-home-cantonments.png"],
    agent: {
      name: "Sarah Johnson",
      phone: "(+233) 24-123-4567",
      email: "sarah.johnson@integrihomes.co",
      image: "/placeholder.svg?height=150&width=150&text=SJ",
    },
  },
  {
    id: "3",
    title: "Beachfront Property in Kokrobite",
    price: "₵1,200,000",
    address: "Kokrobite, Greater Accra",
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "House",
    image: "/images/beachfront-villa.png",
    verified: true,
    location: {
      lat: 5.5192,
      lng: -0.3662,
    },
    description:
      "Stunning beachfront property with direct access to the beautiful shores of Kokrobite. Enjoy breathtaking ocean views from the comfort of your own home.",
    features: ["Beachfront", "Ocean views", "Private access to beach", "Outdoor patio", "Modern design"],
    images: [
      "/images/beachfront-villa.png",
      "/images/beachfront-villa-interior.png",
      "/images/beachfront-villa-bedroom.png",
    ],
    agent: {
      name: "Michael Addo",
      phone: "(+233) 24-987-6543",
      email: "michael.addo@integrihomes.co",
      image: "/placeholder.svg?height=150&width=150&text=MA",
    },
  },
  {
    id: "4",
    title: "Residential Land in Tema",
    price: "₵180,000",
    address: "Community 25, Tema",
    beds: 0,
    baths: 0,
    sqft: 5000,
    type: "Land",
    image: "/images/residential-land-tema-new.png",
    verified: true,
    location: {
      lat: 5.6698,
      lng: -0.0167,
    },
    description:
      "Prime residential land in a developing area of Tema. This 5000 sq ft plot is perfect for building your dream home or for investment purposes. The land has been cleared and is ready for development.",
    features: ["Cleared land", "Ready for development", "Good road access", "Utilities nearby", "Residential zoning"],
    images: ["/images/residential-land-tema-new.png", "/images/residential-land.jpeg"],
    agent: {
      name: "Grace Owusu",
      phone: "(+233) 24-222-3333",
      email: "grace.owusu@integrihomes.co",
      image: "/placeholder.svg?height=150&width=150&text=GO",
    },
    lotSize: "5000 sq ft",
  },
  {
    id: "5",
    title: "Colonial Style Home in Labone",
    price: "₵850,000",
    address: "Labone, Accra",
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: "House",
    image: "/images/colonial-home-labone.png",
    verified: true,
    location: {
      lat: 5.5602,
      lng: -0.1752,
    },
    description:
      "Beautiful colonial style home in the prestigious Labone area. This property features classic architecture with modern amenities, a spacious garden, and a swimming pool.",
    features: ["Colonial architecture", "Swimming pool", "Garden", "Modern amenities", "Security system"],
    images: ["/images/colonial-home-labone.png"],
    agent: {
      name: "James Kwame",
      phone: "(+233) 24-444-5555",
      email: "james.kwame@integrihomes.co",
      image: "/placeholder.svg?height=150&width=150&text=JK",
    },
  },
  {
    id: "6",
    title: "Modern Studio Apartment in Airport Residential",
    price: "₵320,000",
    address: "Airport Residential, Accra",
    beds: 1,
    baths: 1,
    sqft: 650,
    type: "Apartment",
    image: "/images/studio-apartment-airport.png",
    verified: true,
    location: {
      lat: 5.6025,
      lng: -0.1789,
    },
    description:
      "Compact and stylish studio apartment in the Airport Residential area. Perfect for young professionals or as an investment property with high rental yield potential.",
    features: ["Modern design", "Built-in storage", "Gym access", "Security", "Close to amenities"],
    images: ["/images/studio-apartment-airport.png"],
    agent: {
      name: "Sophia Mensah",
      phone: "(+233) 24-777-8888",
      email: "sophia.mensah@integrihomes.co",
      image: "/placeholder.svg?height=150&width=150&text=SM",
    },
  },
  {
    id: "7",
    title: "Lakeside Property in Akosombo",
    price: "₵1,500,000",
    address: "Akosombo, Eastern Region",
    beds: 5,
    baths: 4,
    sqft: 3200,
    type: "House",
    image: "/images/lakeside-property-akosombo.png",
    verified: true,
    location: {
      lat: 6.346,
      lng: 0.0641,
    },
    description:
      "Luxurious lakeside property with stunning views of Lake Volta. This 5-bedroom home features high-end finishes, a private dock, and expansive outdoor living spaces.",
    features: ["Lakefront", "Private dock", "Outdoor living spaces", "High-end finishes", "Guest house"],
    images: ["/images/lakeside-property-akosombo.png"],
    agent: {
      name: "Daniel Osei",
      phone: "(+233) 24-999-0000",
      email: "daniel.osei@integrihomes.co",
      image: "/placeholder.svg?height=150&width=150&text=DO",
    },
  },
  {
    id: "8",
    title: "Commercial Land in Kumasi",
    price: "₵650,000",
    address: "Adum, Kumasi",
    beds: 0,
    baths: 0,
    sqft: 10000,
    type: "Land",
    image: "/images/commercial-land-kumasi.png",
    verified: true,
    location: {
      lat: 6.6885,
      lng: -1.6244,
    },
    description:
      "Prime commercial land in the heart of Kumasi's business district. Excellent opportunity for retail, office, or mixed-use development in a high-traffic area.",
    features: [
      "Commercial zoning",
      "High traffic area",
      "Corner lot",
      "All utilities available",
      "Development potential",
    ],
    images: ["/images/commercial-land-kumasi.png"],
    agent: {
      name: "Abena Koranteng",
      phone: "(+233) 24-111-2222",
      email: "abena.koranteng@integrihomes.co",
      image: "/placeholder.svg?height=150&width=150&text=AK",
    },
    lotSize: "10000 sq ft",
  },
]
