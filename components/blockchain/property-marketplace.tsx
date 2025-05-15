"use client"

import { useState, useEffect } from "react"
import { useBlockchain } from "@/contexts/blockchain-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tag, ShoppingCart, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface PropertyMarketplaceProps {
  propertyId: string
  propertyPrice: string
  isOwner: boolean
}

export function PropertyMarketplace({ propertyId, propertyPrice, isOwner }: PropertyMarketplaceProps) {
  const { isConnected, walletAddress, listPropertyForSale, buyProperty, isLoading } = useBlockchain()

  const [listingPrice, setListingPrice] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isListed, setIsListed] = useState<boolean>(false)

  // Initialize listing price from property price
  useEffect(() => {
    if (propertyPrice) {
      // Remove currency symbol and commas, then parse
      const numericPrice = Number.parseFloat(propertyPrice.replace(/[^0-9.]/g, ""))
      // Convert to ETH (this is just an example conversion)
      const ethPrice = (numericPrice / 5000).toFixed(2) // Assuming 1 ETH = 5000 GHS
      setListingPrice(ethPrice)
    }
  }, [propertyPrice])

  const handleListProperty = async () => {
    setError(null)
    setSuccess(null)

    try {
      await listPropertyForSale(propertyId, listingPrice)
      setSuccess("Property successfully listed for sale!")
      setIsListed(true)
    } catch (err) {
      setError(`Failed to list property: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  const handleBuyProperty = async () => {
    setError(null)
    setSuccess(null)

    try {
      await buyProperty(propertyId, listingPrice)
      setSuccess("Property purchase successful! Ownership has been transferred to your wallet.")
    } catch (err) {
      setError(`Failed to buy property: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-navy">Blockchain Marketplace</CardTitle>
          <CardDescription>Connect your wallet to access marketplace features</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6">
          <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">Connect your wallet to buy or sell this property on the blockchain</p>
        </CardContent>
      </Card>
    )
  }

  // If user is the owner
  if (isOwner) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-navy">List Property on Blockchain</CardTitle>
          <CardDescription>Sell your property securely through smart contracts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Listing your property on the blockchain marketplace enables secure, transparent transactions with reduced
            fees and automated ownership transfer.
          </p>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="listing-price">Listing Price (ETH)</Label>
            <Input
              id="listing-price"
              type="number"
              value={listingPrice}
              onChange={(e) => setListingPrice(e.target.value)}
              min="0.01"
              step="0.01"
              disabled={isListed}
            />
            <p className="text-xs text-gray-500">Suggested price based on property value: {listingPrice} ETH</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-teal hover:bg-teal/90"
            onClick={handleListProperty}
            disabled={isLoading || isListed}
          >
            {isLoading ? "Processing..." : isListed ? "Property Listed" : "List Property for Sale"}
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // If user is not the owner
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-navy">Buy Property on Blockchain</CardTitle>
        <CardDescription>Purchase this property securely through smart contracts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Buying property on the blockchain ensures secure ownership transfer with reduced fees and instant settlement.
        </p>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 text-green-800 border-green-200">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="bg-muted p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <Tag className="h-5 w-5 mr-2 text-teal" />
            <span className="font-medium">Price</span>
          </div>
          <span className="font-bold">{listingPrice} ETH</span>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-teal hover:bg-teal/90">Buy Property</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Property Purchase</DialogTitle>
              <DialogDescription>You are about to purchase this property using blockchain technology</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Property ID</Label>
                <div className="p-2 bg-muted rounded-md font-medium truncate">{propertyId}</div>
              </div>

              <div className="space-y-2">
                <Label>Purchase Price</Label>
                <div className="p-2 bg-muted rounded-md font-medium">{listingPrice} ETH</div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  This transaction will transfer ownership of the property to your wallet address. This action cannot be
                  undone.
                </AlertDescription>
              </Alert>
            </div>

            <DialogFooter>
              <Button className="bg-teal hover:bg-teal/90" onClick={handleBuyProperty} disabled={isLoading}>
                {isLoading ? "Processing..." : "Confirm Purchase"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
