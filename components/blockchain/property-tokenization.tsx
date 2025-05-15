"use client"

import { useState, useEffect } from "react"
import { useBlockchain } from "@/contexts/blockchain-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Coins, DollarSign, Users, AlertCircle } from "lucide-react"
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

interface PropertyTokenizationProps {
  propertyId: string
  propertyPrice: string
  isOwner: boolean
}

export function PropertyTokenization({ propertyId, propertyPrice, isOwner }: PropertyTokenizationProps) {
  const {
    isConnected,
    walletAddress,
    tokenizeProperty,
    getPropertyTokenInfo,
    getUserShares,
    buyPropertyShares,
    isLoading,
  } = useBlockchain()

  const [tokenInfo, setTokenInfo] = useState<any>(null)
  const [userShares, setUserShares] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Form states for tokenization
  const [totalShares, setTotalShares] = useState<number>(100)
  const [pricePerShare, setPricePerShare] = useState<string>("")

  // Form states for buying shares
  const [sharesToBuy, setSharesToBuy] = useState<number>(1)

  // Fetch token info and user shares
  useEffect(() => {
    const fetchTokenInfo = async () => {
      if (!isConnected) return

      try {
        const info = await getPropertyTokenInfo(propertyId)
        setTokenInfo(info)

        if (walletAddress) {
          const shares = await getUserShares(propertyId, walletAddress)
          setUserShares(shares)
        }
      } catch (err) {
        // Property might not be tokenized yet
        console.log("Property not tokenized yet")
      }
    }

    fetchTokenInfo()
  }, [propertyId, isConnected, walletAddress, getPropertyTokenInfo, getUserShares])

  // Calculate suggested price per share based on property price
  useEffect(() => {
    if (propertyPrice) {
      // Remove currency symbol and commas, then parse
      const numericPrice = Number.parseFloat(propertyPrice.replace(/[^0-9.]/g, ""))
      const suggestedPrice = (numericPrice / totalShares).toFixed(4)
      setPricePerShare(suggestedPrice)
    }
  }, [propertyPrice, totalShares])

  const handleTokenize = async () => {
    setError(null)
    setSuccess(null)

    try {
      await tokenizeProperty(propertyId, totalShares, pricePerShare)
      setSuccess("Property successfully tokenized!")

      // Refresh token info
      const info = await getPropertyTokenInfo(propertyId)
      setTokenInfo(info)
    } catch (err) {
      setError(`Failed to tokenize property: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  const handleBuyShares = async () => {
    setError(null)
    setSuccess(null)

    try {
      await buyPropertyShares(propertyId, sharesToBuy)
      setSuccess(`Successfully purchased ${sharesToBuy} shares!`)

      // Refresh token info and user shares
      const info = await getPropertyTokenInfo(propertyId)
      setTokenInfo(info)

      if (walletAddress) {
        const shares = await getUserShares(propertyId, walletAddress)
        setUserShares(shares)
      }
    } catch (err) {
      setError(`Failed to buy shares: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-navy">Fractional Ownership</CardTitle>
          <CardDescription>Connect your wallet to access fractional ownership options</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6">
          <Coins className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">Connect your wallet to view or purchase fractional ownership shares</p>
        </CardContent>
      </Card>
    )
  }

  // If property is not tokenized and user is not the owner
  if (!tokenInfo && !isOwner) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-navy">Fractional Ownership</CardTitle>
          <CardDescription>This property is not available for fractional ownership yet</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6">
          <Coins className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">The owner has not enabled fractional ownership for this property</p>
        </CardContent>
      </Card>
    )
  }

  // If property is not tokenized and user is the owner
  if (!tokenInfo && isOwner) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-navy">Tokenize Your Property</CardTitle>
          <CardDescription>Enable fractional ownership by tokenizing this property</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Tokenizing your property allows investors to purchase shares, making real estate investment more accessible
            while potentially increasing your property's liquidity.
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
            <Label htmlFor="total-shares">Total Number of Shares</Label>
            <Input
              id="total-shares"
              type="number"
              value={totalShares}
              onChange={(e) => setTotalShares(Number.parseInt(e.target.value))}
              min="1"
            />
            <p className="text-xs text-gray-500">Recommended: 100-1000 shares for easier fractional ownership</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price-per-share">Price Per Share (ETH)</Label>
            <Input
              id="price-per-share"
              type="number"
              value={pricePerShare}
              onChange={(e) => setPricePerShare(e.target.value)}
              min="0.0001"
              step="0.0001"
            />
            <p className="text-xs text-gray-500">
              Suggested price based on property value: {pricePerShare} ETH per share
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-teal hover:bg-teal/90" onClick={handleTokenize} disabled={isLoading}>
            {isLoading ? "Processing..." : "Tokenize Property"}
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // If property is tokenized
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-navy">Fractional Ownership</CardTitle>
        <CardDescription>
          {tokenInfo?.isActive ? "Purchase shares of this property" : "Fractional ownership is currently paused"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Available Shares</span>
            <span className="font-medium">
              {tokenInfo?.availableShares} / {tokenInfo?.totalShares}
            </span>
          </div>
          <Progress value={(tokenInfo?.availableShares / tokenInfo?.totalShares) * 100} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-xs text-gray-500">Price Per Share</p>
            <p className="font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              {tokenInfo?.pricePerShare} ETH
            </p>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <p className="text-xs text-gray-500">Your Shares</p>
            <p className="font-medium flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {userShares} shares
            </p>
          </div>
        </div>

        {tokenInfo?.isActive && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-teal hover:bg-teal/90">Buy Shares</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Buy Property Shares</DialogTitle>
                <DialogDescription>Purchase shares of this property to become a fractional owner</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="shares-to-buy">Number of Shares to Buy</Label>
                  <Input
                    id="shares-to-buy"
                    type="number"
                    value={sharesToBuy}
                    onChange={(e) => setSharesToBuy(Number.parseInt(e.target.value))}
                    min="1"
                    max={tokenInfo?.availableShares}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Total Cost</Label>
                  <div className="p-2 bg-muted rounded-md font-medium">
                    {(Number.parseFloat(tokenInfo?.pricePerShare) * sharesToBuy).toFixed(4)} ETH
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button className="bg-teal hover:bg-teal/90" onClick={handleBuyShares} disabled={isLoading}>
                  {isLoading ? "Processing..." : "Confirm Purchase"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  )
}
