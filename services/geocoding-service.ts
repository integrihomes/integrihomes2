// Types for location data
export interface GeoLocation {
  name: string
  lat: number
  lng: number
  zoom: number
  aliases?: string[]
}

// Database of Ghana locations with coordinates
const ghanaLocations: GeoLocation[] = [
  {
    name: "Accra",
    lat: 5.6037,
    lng: -0.187,
    zoom: 12,
    aliases: ["accra", "greater accra", "accra metropolitan"],
  },
  {
    name: "East Legon",
    lat: 5.6361,
    lng: -0.1633,
    zoom: 14,
    aliases: ["east legon", "eastlegon"],
  },
  {
    name: "Cantonments",
    lat: 5.5788,
    lng: -0.1761,
    zoom: 14,
    aliases: ["cantonments", "cantonment"],
  },
  {
    name: "Airport Residential",
    lat: 5.6025,
    lng: -0.1789,
    zoom: 14,
    aliases: ["airport residential", "airport", "airport residential area"],
  },
  {
    name: "Labone",
    lat: 5.5602,
    lng: -0.1752,
    zoom: 14,
    aliases: ["labone"],
  },
  {
    name: "Tema",
    lat: 5.6698,
    lng: -0.0167,
    zoom: 12,
    aliases: ["tema", "tema community", "tema metropolitan"],
  },
  {
    name: "Kumasi",
    lat: 6.6885,
    lng: -1.6244,
    zoom: 12,
    aliases: ["kumasi", "kumasi metropolitan", "ashanti region"],
  },
  {
    name: "Takoradi",
    lat: 4.9051,
    lng: -1.7741,
    zoom: 12,
    aliases: ["takoradi", "sekondi-takoradi", "sekondi takoradi"],
  },
  {
    name: "Tamale",
    lat: 9.4075,
    lng: -0.8533,
    zoom: 12,
    aliases: ["tamale", "tamale metropolitan"],
  },
  {
    name: "Cape Coast",
    lat: 5.1053,
    lng: -1.2466,
    zoom: 12,
    aliases: ["cape coast", "cape-coast"],
  },
  {
    name: "Koforidua",
    lat: 6.0945,
    lng: -0.2601,
    zoom: 12,
    aliases: ["koforidua"],
  },
  {
    name: "Ho",
    lat: 6.601,
    lng: 0.4712,
    zoom: 12,
    aliases: ["ho"],
  },
  {
    name: "Sunyani",
    lat: 7.3349,
    lng: -2.3268,
    zoom: 12,
    aliases: ["sunyani"],
  },
  {
    name: "Obuasi",
    lat: 6.2049,
    lng: -1.6662,
    zoom: 12,
    aliases: ["obuasi"],
  },
  {
    name: "Teshie",
    lat: 5.5927,
    lng: -0.1036,
    zoom: 14,
    aliases: ["teshie"],
  },
  {
    name: "Nungua",
    lat: 5.6028,
    lng: -0.0742,
    zoom: 14,
    aliases: ["nungua"],
  },
  {
    name: "Kokrobite",
    lat: 5.5192,
    lng: -0.3662,
    zoom: 14,
    aliases: ["kokrobite"],
  },
  {
    name: "Akosombo",
    lat: 6.346,
    lng: 0.0641,
    zoom: 13,
    aliases: ["akosombo"],
  },
  {
    name: "Ghana",
    lat: 7.9465,
    lng: -1.0232,
    zoom: 7,
    aliases: ["ghana", "republic of ghana"],
  },
]

// Function to geocode a location string to coordinates
export function geocodeLocation(locationString: string): GeoLocation | null {
  if (!locationString) {
    // Default to Ghana overview if no location provided
    return ghanaLocations.find((loc) => loc.name === "Ghana") || null
  }

  const normalizedInput = locationString.trim().toLowerCase()

  // First try exact match
  const exactMatch = ghanaLocations.find(
    (loc) => loc.name.toLowerCase() === normalizedInput || (loc.aliases && loc.aliases.includes(normalizedInput)),
  )

  if (exactMatch) {
    return exactMatch
  }

  // Then try partial match
  const partialMatch = ghanaLocations.find(
    (loc) =>
      loc.name.toLowerCase().includes(normalizedInput) ||
      (loc.aliases && loc.aliases.some((alias) => alias.includes(normalizedInput))),
  )

  return partialMatch || null
}

// Function to get nearby locations based on coordinates
export function getNearbyLocations(lat: number, lng: number, limit = 5): GeoLocation[] {
  // Calculate distance between two points using Haversine formula
  const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371 // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c // Distance in km
  }

  // Sort locations by distance and return the closest ones
  return ghanaLocations
    .map((loc) => ({
      ...loc,
      distance: getDistance(lat, lng, loc.lat, loc.lng),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
}

// Function to suggest locations based on partial input
export function suggestLocations(input: string, limit = 5): GeoLocation[] {
  if (!input || input.length < 2) return []

  const normalizedInput = input.trim().toLowerCase()

  return ghanaLocations
    .filter(
      (loc) =>
        loc.name.toLowerCase().includes(normalizedInput) ||
        (loc.aliases && loc.aliases.some((alias) => alias.includes(normalizedInput))),
    )
    .slice(0, limit)
}
