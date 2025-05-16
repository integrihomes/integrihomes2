// Types for our analytics data
export interface PropertyValue {
  date: string
  value: number
}

export interface SaleRecord {
  date: string
  price: number
  buyer?: string
  seller?: string
}

export interface PropertyAnalytics {
  propertyId: string
  historicalValues: PropertyValue[]
  estimatedValue: number
  saleHistory: SaleRecord[]
  marketHeat: "hot" | "average" | "cool"
  neighborhoodAvgPrice: number
  pricePerSqft: number
}

// Mock data for property analytics
const analyticsData: Record<string, PropertyAnalytics> = {
  "1": {
    propertyId: "1",
    historicalValues: [
      { date: "2018-01", value: 320000 },
      { date: "2018-07", value: 325000 },
      { date: "2019-01", value: 335000 },
      { date: "2019-07", value: 350000 },
      { date: "2020-01", value: 365000 },
      { date: "2020-07", value: 380000 },
      { date: "2021-01", value: 400000 },
      { date: "2021-07", value: 420000 },
      { date: "2022-01", value: 435000 },
      { date: "2022-07", value: 445000 },
      { date: "2023-01", value: 450000 },
      { date: "2023-07", value: 455000 },
      { date: "2024-01", value: 460000 },
    ],
    estimatedValue: 465000,
    saleHistory: [
      { date: "2018-03-15", price: 320000, seller: "Akosua Mensah", buyer: "Kofi Adu" },
      { date: "2023-05-22", price: 450000, seller: "Kofi Adu", buyer: "Current Owner" },
    ],
    marketHeat: "hot",
    neighborhoodAvgPrice: 430000,
    pricePerSqft: 375,
  },
  "2": {
    propertyId: "2",
    historicalValues: [
      { date: "2017-01", value: 550000 },
      { date: "2017-07", value: 570000 },
      { date: "2018-01", value: 600000 },
      { date: "2018-07", value: 620000 },
      { date: "2019-01", value: 650000 },
      { date: "2019-07", value: 680000 },
      { date: "2020-01", value: 700000 },
      { date: "2020-07", value: 710000 },
      { date: "2021-01", value: 725000 },
      { date: "2021-07", value: 735000 },
      { date: "2022-01", value: 740000 },
      { date: "2022-07", value: 745000 },
      { date: "2023-01", value: 750000 },
      { date: "2023-07", value: 755000 },
      { date: "2024-01", value: 760000 },
    ],
    estimatedValue: 765000,
    saleHistory: [
      { date: "2017-02-10", price: 550000, seller: "Developer", buyer: "Emmanuel Osei" },
      { date: "2020-11-05", price: 710000, seller: "Emmanuel Osei", buyer: "Abena Boateng" },
      { date: "2023-08-18", price: 755000, seller: "Abena Boateng", buyer: "Current Owner" },
    ],
    marketHeat: "average",
    neighborhoodAvgPrice: 720000,
    pricePerSqft: 302,
  },
  "3": {
    propertyId: "3",
    historicalValues: [
      { date: "2016-01", value: 900000 },
      { date: "2016-07", value: 950000 },
      { date: "2017-01", value: 980000 },
      { date: "2017-07", value: 1000000 },
      { date: "2018-01", value: 1050000 },
      { date: "2018-07", value: 1080000 },
      { date: "2019-01", value: 1100000 },
      { date: "2019-07", value: 1120000 },
      { date: "2020-01", value: 1150000 },
      { date: "2020-07", value: 1170000 },
      { date: "2021-01", value: 1180000 },
      { date: "2021-07", value: 1190000 },
      { date: "2022-01", value: 1200000 },
      { date: "2022-07", value: 1210000 },
      { date: "2023-01", value: 1220000 },
      { date: "2023-07", value: 1230000 },
      { date: "2024-01", value: 1250000 },
    ],
    estimatedValue: 1280000,
    saleHistory: [
      { date: "2016-04-20", price: 920000, seller: "Developer", buyer: "Kwame Asante" },
      { date: "2024-01-15", price: 1250000, seller: "Kwame Asante", buyer: "Current Owner" },
    ],
    marketHeat: "hot",
    neighborhoodAvgPrice: 1150000,
    pricePerSqft: 694,
  },
  "4": {
    propertyId: "4",
    historicalValues: [
      { date: "2019-01", value: 120000 },
      { date: "2019-07", value: 125000 },
      { date: "2020-01", value: 130000 },
      { date: "2020-07", value: 140000 },
      { date: "2021-01", value: 150000 },
      { date: "2021-07", value: 160000 },
      { date: "2022-01", value: 165000 },
      { date: "2022-07", value: 170000 },
      { date: "2023-01", value: 175000 },
      { date: "2023-07", value: 180000 },
      { date: "2024-01", value: 185000 },
    ],
    estimatedValue: 190000,
    saleHistory: [{ date: "2019-03-10", price: 120000, seller: "Land Commission", buyer: "Current Owner" }],
    marketHeat: "average",
    neighborhoodAvgPrice: 175000,
    pricePerSqft: 36,
  },
  "5": {
    propertyId: "5",
    historicalValues: [
      { date: "2015-01", value: 600000 },
      { date: "2015-07", value: 620000 },
      { date: "2016-01", value: 650000 },
      { date: "2016-07", value: 680000 },
      { date: "2017-01", value: 700000 },
      { date: "2017-07", value: 720000 },
      { date: "2018-01", value: 750000 },
      { date: "2018-07", value: 770000 },
      { date: "2019-01", value: 790000 },
      { date: "2019-07", value: 800000 },
      { date: "2020-01", value: 810000 },
      { date: "2020-07", value: 820000 },
      { date: "2021-01", value: 830000 },
      { date: "2021-07", value: 835000 },
      { date: "2022-01", value: 840000 },
      { date: "2022-07", value: 845000 },
      { date: "2023-01", value: 850000 },
      { date: "2023-07", value: 855000 },
      { date: "2024-01", value: 860000 },
    ],
    estimatedValue: 870000,
    saleHistory: [
      { date: "2015-05-12", price: 610000, seller: "Estate", buyer: "Kwesi Amissah" },
      { date: "2019-09-28", price: 800000, seller: "Kwesi Amissah", buyer: "Ama Darko" },
      { date: "2023-11-15", price: 855000, seller: "Ama Darko", buyer: "Current Owner" },
    ],
    marketHeat: "cool",
    neighborhoodAvgPrice: 880000,
    pricePerSqft: 304,
  },
  "6": {
    propertyId: "6",
    historicalValues: [
      { date: "2020-01", value: 250000 },
      { date: "2020-07", value: 260000 },
      { date: "2021-01", value: 275000 },
      { date: "2021-07", value: 290000 },
      { date: "2022-01", value: 300000 },
      { date: "2022-07", value: 310000 },
      { date: "2023-01", value: 315000 },
      { date: "2023-07", value: 320000 },
      { date: "2024-01", value: 325000 },
    ],
    estimatedValue: 330000,
    saleHistory: [
      { date: "2020-02-15", price: 250000, seller: "Developer", buyer: "Yaw Mensah" },
      { date: "2022-08-10", price: 310000, seller: "Yaw Mensah", buyer: "Current Owner" },
    ],
    marketHeat: "hot",
    neighborhoodAvgPrice: 315000,
    pricePerSqft: 500,
  },
  "7": {
    propertyId: "7",
    historicalValues: [
      { date: "2014-01", value: 1000000 },
      { date: "2014-07", value: 1050000 },
      { date: "2015-01", value: 1100000 },
      { date: "2015-07", value: 1150000 },
      { date: "2016-01", value: 1200000 },
      { date: "2016-07", value: 1250000 },
      { date: "2017-01", value: 1300000 },
      { date: "2017-07", value: 1350000 },
      { date: "2018-01", value: 1380000 },
      { date: "2018-07", value: 1400000 },
      { date: "2019-01", value: 1420000 },
      { date: "2019-07", value: 1440000 },
      { date: "2020-01", value: 1450000 },
      { date: "2020-07", value: 1460000 },
      { date: "2021-01", value: 1470000 },
      { date: "2021-07", value: 1480000 },
      { date: "2022-01", value: 1490000 },
      { date: "2022-07", value: 1500000 },
      { date: "2023-01", value: 1510000 },
      { date: "2023-07", value: 1520000 },
      { date: "2024-01", value: 1530000 },
    ],
    estimatedValue: 1550000,
    saleHistory: [
      { date: "2014-03-20", price: 1020000, seller: "Developer", buyer: "John Kufuor" },
      { date: "2018-06-15", price: 1390000, seller: "John Kufuor", buyer: "Nana Addo" },
      { date: "2023-12-10", price: 1520000, seller: "Nana Addo", buyer: "Current Owner" },
    ],
    marketHeat: "average",
    neighborhoodAvgPrice: 1450000,
    pricePerSqft: 478,
  },
  "8": {
    propertyId: "8",
    historicalValues: [
      { date: "2018-01", value: 400000 },
      { date: "2018-07", value: 420000 },
      { date: "2019-01", value: 450000 },
      { date: "2019-07", value: 480000 },
      { date: "2020-01", value: 500000 },
      { date: "2020-07", value: 520000 },
      { date: "2021-01", value: 550000 },
      { date: "2021-07", value: 580000 },
      { date: "2022-01", value: 600000 },
      { date: "2022-07", value: 620000 },
      { date: "2023-01", value: 630000 },
      { date: "2023-07", value: 640000 },
      { date: "2024-01", value: 650000 },
    ],
    estimatedValue: 670000,
    saleHistory: [
      { date: "2018-04-05", price: 410000, seller: "Land Commission", buyer: "Kumasi Metropolitan Assembly" },
      { date: "2021-09-20", price: 570000, seller: "Kumasi Metropolitan Assembly", buyer: "Current Owner" },
    ],
    marketHeat: "hot",
    neighborhoodAvgPrice: 620000,
    pricePerSqft: 65,
  },
}

// Default analytics data for properties without specific data
const defaultAnalytics: PropertyAnalytics = {
  propertyId: "default",
  historicalValues: [
    { date: "2019-01", value: 800000 },
    { date: "2019-07", value: 850000 },
    { date: "2020-01", value: 900000 },
    { date: "2020-07", value: 950000 },
    { date: "2021-01", value: 1000000 },
    { date: "2021-07", value: 1050000 },
    { date: "2022-01", value: 1100000 },
    { date: "2022-07", value: 1150000 },
    { date: "2023-01", value: 1200000 },
    { date: "2023-07", value: 1250000 },
    { date: "2024-01", value: 1300000 },
  ],
  estimatedValue: 1350000,
  saleHistory: [
    { date: "2019-03-15", price: 820000, seller: "Original Developer", buyer: "First Owner" },
    { date: "2022-08-10", price: 1120000, seller: "First Owner", buyer: "Current Owner" },
  ],
  marketHeat: "average",
  neighborhoodAvgPrice: 1200000,
  pricePerSqft: 406,
}

// Function to get analytics data for a property
export function getPropertyAnalytics(propertyId: string): PropertyAnalytics {
  return analyticsData[propertyId] || { ...defaultAnalytics, propertyId }
}

// Function to parse price string to number (e.g., "₵450,000" to 450000)
export function parsePriceString(priceString: string): number {
  return Number.parseInt(priceString.replace(/[^\d]/g, ""), 10)
}
