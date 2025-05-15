"use client"

import { Button } from "@/components/ui/button"
import { useBlockchain } from "@/contexts/blockchain-context"
import { Wallet } from "lucide-react"
import { useState } from "react"

export function ConnectWalletButton() {
  const { isConnected, walletAddress, connectWallet, isLoading } = useBlockchain()
  const [isHovering, setIsHovering] = useState(false)

  const handleConnect = async () => {
    await connectWallet()
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <Button
      variant={isConnected ? "outline" : "default"}
      className={`gap-2 ${isConnected ? "border-teal text-teal hover:bg-teal/10" : "bg-teal hover:bg-teal/90"}`}
      onClick={handleConnect}
      disabled={isLoading}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Wallet className="h-4 w-4" />
      {isConnected
        ? isHovering
          ? "Disconnect"
          : formatAddress(walletAddress!)
        : isLoading
          ? "Connecting..."
          : "Connect Wallet"}
    </Button>
  )
}
