"use client"

import { useState, useEffect } from "react"
import { useBlockchain } from "@/contexts/blockchain-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield, FileCheck, Clock, ExternalLink } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface PropertyBlockchainDetailsProps {
  propertyId: string
}

export function PropertyBlockchainDetails({ propertyId }: PropertyBlockchainDetailsProps) {
  const { getPropertyTitle, isConnected, isLoading } = useBlockchain()
  const [propertyData, setPropertyData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!isConnected) return

      try {
        const data = await getPropertyTitle(propertyId)
        setPropertyData(data)
      } catch (err) {
        setError("Property not registered on blockchain")
      }
    }

    fetchPropertyData()
  }, [propertyId, isConnected, getPropertyTitle])

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-navy">Blockchain Verification</CardTitle>
          <CardDescription>Connect your wallet to view blockchain verification details</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6">
          <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">
            Blockchain verification information will appear here once you connect your wallet
          </p>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-navy">Blockchain Verification</CardTitle>
          <CardDescription>Loading blockchain data...</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-gray-200 h-12 w-12 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !propertyData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-navy">Blockchain Verification</CardTitle>
          <CardDescription>Property not registered on blockchain</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6">
          <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">This property has not been registered on the blockchain yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-navy">Blockchain Verification</CardTitle>
            <CardDescription>Property details secured on blockchain</CardDescription>
          </div>
          {propertyData.isVerified && <Badge className="bg-teal text-white">Verified</Badge>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-teal" />
          <div>
            <p className="text-sm font-medium">Property ID</p>
            <p className="text-sm text-gray-500">{propertyData.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-teal" />
          <div>
            <p className="text-sm font-medium">Document Hash</p>
            <p className="text-sm text-gray-500 truncate">{propertyData.documentHash}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-teal" />
          <div>
            <p className="text-sm font-medium">Registered</p>
            <p className="text-sm text-gray-500">{formatDistanceToNow(propertyData.timestamp, { addSuffix: true })}</p>
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-sm font-medium mb-1">Current Owner</p>
          <p className="text-sm text-gray-500 break-all">{propertyData.owner}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full gap-2" asChild>
          <a href={`https://etherscan.io/address/${propertyData.owner}`} target="_blank" rel="noopener noreferrer">
            View on Etherscan
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
