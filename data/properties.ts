export interface Property {
  id: string
  title: string
  price: string
  address: string
  location: {
    lat: number
    lng: number
  }
  beds: number
  baths: number
  sqft: number
  type: string
  image: string
  verified: boolean
  description?: string
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Apartment in East Legon",
    price: "₵450,000",
    address: "East Legon, Accra",
    location: {
      lat: 5.6363,
      lng: -0.1525,
    },
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: "Apartment",
    image: "/images/modern-apartment-east-legon.png",
    verified: true,
    description:
      "A contemporary apartment building in Accra's upscale East Legon neighborhood featuring modern amenities and stylish finishes.",
  },
  {
    id: "2",
    title: "Spacious Family Home in Cantonments",
    price: "₵750,000",
    address: "Cantonments, Accra",
    location: {
      lat: 5.5788,
      lng: -0.1761,
    },
    beds: 4,
    baths: 3,
    sqft: 2500,
    type: "House",
    image: "/images/family-home-cantonments.png",
    verified: true,
    description:
      "A luxury family residence in the prestigious Cantonments area with spacious rooms and premium finishes throughout.",
  },
  {
    id: "3",
    title: "Beachfront Property in Kokrobite",
    price: "₵1,200,000",
    address: "Kokrobite, Greater Accra",
    location: {
      lat: 5.5192,
      lng: -0.3346,
    },
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "House",
    image: "/images/beachfront-villa.png",
    verified: true,
    description:
      "Stunning beachfront villa with direct access to Kokrobite Beach, featuring panoramic ocean views and luxury amenities.",
  },
  {
    id: "4",
    title: "Residential Land in Tema",
    price: "₵180,000",
    address: "Community 25, Tema",
    location: {
      lat: 5.7284,
      lng: -0.0371,
    },
    beds: 0,
    baths: 0,
    sqft: 5000,
    type: "Land",
    image: "/images/residential-land-tema.png",
    verified: true,
    description:
      "Prime residential land in Tema Community 25, perfect for building your dream home in a developing neighborhood.",
  },
  {
    id: "5",
    title: "Colonial Style Home in Labone",
    price: "₵850,000",
    address: "Labone, Accra",
    location: {
      lat: 5.5602,
      lng: -0.1744,
    },
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: "House",
    image: "/images/colonial-home-labone.png",
    verified: true,
    description:
      "A colonial-inspired residence in Labone featuring classic architecture with modern amenities and a spacious garden.",
  },
  {
    id: "6",
    title: "Modern Studio Apartment in Airport Residential",
    price: "₵320,000",
    address: "Airport Residential, Accra",
    location: {
      lat: 5.6028,
      lng: -0.1858,
    },
    beds: 1,
    baths: 1,
    sqft: 650,
    type: "Apartment",
    image: "/images/studio-apartment-airport.png",
    verified: true,
    description:
      "A compact, modern studio in the Airport Residential area, perfect for professionals or investors looking for rental income.",
  },
  {
    id: "7",
    title: "Lakeside Property in Akosombo",
    price: "₵1,500,000",
    address: "Akosombo, Eastern Region",
    location: {
      lat: 6.3047,
      lng: 0.0418,
    },
    beds: 5,
    baths: 4,
    sqft: 3200,
    type: "House",
    image: "/images/lakeside-property-akosombo.png",
    verified: true,
    description:
      "A luxury home with stunning views of Lake Volta in Akosombo, featuring spacious living areas and premium finishes.",
  },
  {
    id: "8",
    title: "Commercial Land in Kumasi",
    price: "₵650,000",
    address: "Adum, Kumasi",
    location: {
      lat: 6.6885,
      lng: -1.6244,
    },
    beds: 0,
    baths: 0,
    sqft: 10000,
    type: "Land",
    image: "/images/commercial-land-kumasi.png",
    verified: true,
    description:
      "Prime commercial plot in Adum, Kumasi's business district, ideal for retail or office development with high foot traffic.",
  },
  {
    id: "9",
    title: "Luxury Penthouse in Osu",
    price: "₵980,000",
    address: "Osu, Accra",
    location: {
      lat: 5.5526,
      lng: -0.1774,
    },
    beds: 3,
    baths: 3,
    sqft: 1800,
    type: "Apartment",
    image: "/images/modern-apartment-east-legon.png",
    verified: true,
    description:
      "Stunning penthouse apartment in the vibrant Osu district with panoramic city views and high-end finishes.",
  },
  {
    id: "10",
    title: "Waterfront Villa in Ada",
    price: "₵1,350,000",
    address: "Ada, Greater Accra",
    location: {
      lat: 5.7917,
      lng: 0.6356,
    },
    beds: 4,
    baths: 4,
    sqft: 2900,
    type: "House",
    image: "/images/beachfront-villa.png",
    verified: true,
    description:
      "Beautiful waterfront villa in Ada with private beach access, perfect for weekend getaways or permanent residence.",
  },
  {
    id: "11",
    title: "Modern Office Space in Ridge",
    price: "₵850,000",
    address: "Ridge, Accra",
    location: {
      lat: 5.5577,
      lng: -0.2038,
    },
    beds: 0,
    baths: 2,
    sqft: 2200,
    type: "Commercial",
    image: "/images/colonial-home-labone.png",
    verified: true,
    description:
      "Premium office space in the prestigious Ridge area, featuring modern design and amenities for businesses.",
  },
  {
    id: "12",
    title: "Gated Community Home in Trasacco",
    price: "₵1,100,000",
    address: "Trasacco Valley, Accra",
    location: {
      lat: 5.6417,
      lng: -0.1028,
    },
    beds: 4,
    baths: 4,
    sqft: 3000,
    type: "House",
    image: "/images/family-home-cantonments.png",
    verified: true,
    description:
      "Elegant home in the secure Trasacco Valley gated community with 24/7 security, swimming pool, and landscaped gardens.",
  },
]
