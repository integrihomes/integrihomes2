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
    image: "/images/residential-land-tema.png",
    verified: true,
    location: {
      lat: 5.6698,
      lng: -0.0167,
    },
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
  },
]
