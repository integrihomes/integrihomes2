"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Calendar, User, Thermometer } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Types for our analytics data
interface PropertyValue {
  date: string
  value: number
}

interface SaleRecord {
  date: string
  price: number
  buyer?: string
  seller?: string
}

interface PropertyAnalyticsProps {
  propertyId: string
  currentPrice: string
  historicalValues: PropertyValue[]
  estimatedValue: number
  saleHistory: SaleRecord[]
  marketHeat: "hot" | "average" | "cool"
  neighborhoodAvgPrice: number
  pricePerSqft: number
  sqft: number
}

export function PropertyAnalytics({
  propertyId,
  currentPrice,
  historicalValues,
  estimatedValue,
  saleHistory,
  marketHeat,
  neighborhoodAvgPrice,
  pricePerSqft,
  sqft,
}: PropertyAnalyticsProps) {
  // Format currency values
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Format date values
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GH", {
      year: "numeric",
      month: "short",
    })
  }

  // Calculate price trend percentage
  const calculateTrend = () => {
    if (historicalValues.length < 2) return { percent: 0, isPositive: true }

    const oldestValue = historicalValues[0].value
    const newestValue = historicalValues[historicalValues.length - 1].value
    const percentChange = ((newestValue - oldestValue) / oldestValue) * 100

    return {
      percent: Math.abs(percentChange).toFixed(1),
      isPositive: percentChange >= 0,
    }
  }

  const trend = calculateTrend()

  // Get market heat color and description
  const getMarketHeatInfo = (heat: "hot" | "average" | "cool") => {
    switch (heat) {
      case "hot":
        return { color: "text-red-500", bgColor: "bg-red-100", description: "High demand, limited supply" }
      case "average":
        return { color: "text-amber-500", bgColor: "bg-amber-100", description: "Balanced market conditions" }
      case "cool":
        return { color: "text-blue-500", bgColor: "bg-blue-100", description: "Low demand, buyer's market" }
    }
  }

  const heatInfo = getMarketHeatInfo(marketHeat)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Property Analytics</span>
          <Badge variant="outline" className="ml-2 font-normal">
            ID: {propertyId}
          </Badge>
        </CardTitle>
        <CardDescription>Data-driven insights to help inform your property decision</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="valuation">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="valuation">Valuation</TabsTrigger>
            <TabsTrigger value="history">Sale History</TabsTrigger>
            <TabsTrigger value="market">Market Analysis</TabsTrigger>
          </TabsList>

          {/* Valuation Tab */}
          <TabsContent value="valuation" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">Current Listing Price</div>
                <div className="text-2xl font-bold text-teal">{currentPrice}</div>
                <div className="flex items-center text-sm">
                  {trend.isPositive ? (
                    <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                  )}
                  <span className={trend.isPositive ? "text-green-500" : "text-red-500"}>
                    {trend.percent}% {trend.isPositive ? "increase" : "decrease"} since purchase
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">Estimated Market Value</div>
                <div className="text-2xl font-bold text-navy">{formatCurrency(estimatedValue)}</div>
                <div className="text-sm text-gray-500">Based on recent comparable sales and market trends</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 text-sm font-medium">Historical Property Value</div>
              <div className="h-[300px] w-full">
                <ChartContainer
                  config={{
                    value: {
                      label: "Property Value (₵)",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={historicalValues}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--teal))" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="hsl(var(--teal))" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={formatDate} />
                      <YAxis tickFormatter={(value) => `₵${value / 1000}k`} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--teal))"
                        fillOpacity={1}
                        fill="url(#colorValue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                Historical property values over time (data based on market estimates and previous sales)
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-gray-500">Price per sq ft</div>
                <div className="text-lg font-bold">{formatCurrency(pricePerSqft)}/sq ft</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-gray-500">Neighborhood Avg</div>
                <div className="text-lg font-bold">{formatCurrency(neighborhoodAvgPrice)}</div>
              </div>
            </div>
          </TabsContent>

          {/* Sale History Tab */}
          <TabsContent value="history">
            <div className="mt-4">
              <div className="mb-2 text-sm font-medium">Property Sale History</div>
              <div className="space-y-4">
                {saleHistory.length > 0 ? (
                  saleHistory.map((sale, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="font-medium">{formatDate(sale.date)}</span>
                        </div>
                        <div className="font-bold text-teal">{formatCurrency(sale.price)}</div>
                      </div>
                      {(sale.buyer || sale.seller) && (
                        <div className="mt-2 text-sm text-gray-500">
                          {sale.seller && (
                            <div className="flex items-center mt-1">
                              <User className="mr-2 h-4 w-4" />
                              <span>Seller: {sale.seller}</span>
                            </div>
                          )}
                          {sale.buyer && (
                            <div className="flex items-center mt-1">
                              <User className="mr-2 h-4 w-4" />
                              <span>Buyer: {sale.buyer}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No previous sale records available for this property
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Market Analysis Tab */}
          <TabsContent value="market">
            <div className="mt-4 space-y-6">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Market Heat</div>
                    <div className="text-lg font-bold flex items-center">
                      <Thermometer className={`mr-2 h-5 w-5 ${heatInfo.color}`} />
                      <span className="capitalize">{marketHeat} Market</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full ${heatInfo.bgColor} ${heatInfo.color}`}>
                    {heatInfo.description}
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm font-medium">Market Insights</div>
                <div className="space-y-3">
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium">Average Days on Market</div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">45 days</div>
                      <Badge variant="outline" className="ml-2">
                        Area avg: 62 days
                      </Badge>
                    </div>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium">Price Changes</div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">12%</div>
                      <Badge variant="outline" className="ml-2">
                        of listings reduced
                      </Badge>
                    </div>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium">Sale-to-List Ratio</div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">98%</div>
                      <Badge variant="outline" className="ml-2">
                        Area avg: 96%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm font-medium">Neighborhood Trends</div>
                <div className="text-sm text-gray-600">
                  <p>
                    This area has seen a <span className="font-medium text-green-600">7% increase</span> in property
                    values over the past year, outperforming the city average of 5%. The neighborhood is particularly
                    popular among young professionals and families due to its proximity to schools and amenities.
                  </p>
                  <p className="mt-2">
                    Recent infrastructure developments including road improvements and a new shopping center are
                    expected to further enhance property values in this area.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
