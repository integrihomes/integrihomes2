"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { blockchainService } from "@/services/blockchain-service"

interface BlockchainContextType {
  isConnected: boolean
  walletAddress: string | null
  isLoading: boolean
  error: string | null
  connectWallet: () => Promise<boolean>
  registerProperty: (
    propertyId: string,
    ownerAddress: string,
    propertyDataHash: string,
    documentIpfsHash: string,
  ) => Promise<any>
  getPropertyTitle: (propertyId: string) => Promise<any>
  transferPropertyOwnership: (propertyId: string, newOwnerAddress: string) => Promise<any>
  listPropertyForSale: (propertyId: string, priceInEth: string) => Promise<any>
  buyProperty: (propertyId: string, priceInEth: string) => Promise<any>
  tokenizeProperty: (propertyId: string, totalShares: number, pricePerShareInEth: string) => Promise<any>
  buyPropertyShares: (propertyId: string, shares: number) => Promise<any>
  getUserShares: (propertyId: string, userAddress: string) => Promise<number>
  getPropertyTokenInfo: (propertyId: string) => Promise<any>
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined)

export function BlockchainProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Connect wallet function
  const connectWallet = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const success = await blockchainService.initialize()

      if (success) {
        const address = await blockchainService.getWalletAddress()
        setWalletAddress(address)
        setIsConnected(true)
        return true
      } else {
        setError("Failed to connect wallet")
        return false
      }
    } catch (err) {
      setError(`Error connecting wallet: ${err instanceof Error ? err.message : String(err)}`)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          setIsConnected(false)
          setWalletAddress(null)
        } else if (accounts[0] !== walletAddress) {
          // Account changed
          setWalletAddress(accounts[0])
        }
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [walletAddress])

  // Wrapper functions for blockchain service methods
  const registerProperty = async (
    propertyId: string,
    ownerAddress: string,
    propertyDataHash: string,
    documentIpfsHash: string,
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      return await blockchainService.registerPropertyTitle(propertyId, ownerAddress, propertyDataHash, documentIpfsHash)
    } catch (err) {
      setError(`Error registering property: ${err instanceof Error ? err.message : String(err)}`)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const getPropertyTitle = async (propertyId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      return await blockchainService.getPropertyTitle(propertyId)
    } catch (err) {
      setError(`Error getting property title: ${err instanceof Error ? err.message : String(err)}`)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const transferPropertyOwnership = async (propertyId: string, newOwnerAddress: string) => {
    setIsLoading(true)
    setError(null)

    try {
      return await blockchainService.transferPropertyOwnership(propertyId, newOwnerAddress)
    } catch (err) {
      setError(`Error transferring property: ${err instanceof Error ? err.message : String(err)}`)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const listPropertyForSale = async (propertyId: string, priceInEth: string) => {
    setIsLoading(true)
    setError(null)

    try {
      return await blockchainService.listPropertyForSale(propertyId, priceInEth)
    } catch (err) {
      setError(`Error listing property: ${err instanceof Error ? err.message : String(err)}`)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const buyProperty = async (propertyId: string, priceInEth: string) => {
    setIsLoading(true)
    setError(null)

    try {
      return await blockchainService.buyProperty(propertyId, priceInEth)
    } catch (err) {
      setError(`Error buying property: ${err instanceof Error ? err.message : String(err)}`)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const tokenizeProperty = async (propertyId: string, totalShares: number, pricePerShareInEth: string) => {
    setIsLoading(true)
    setError(null)

    try {
      return await blockchainService.tokenizeProperty(propertyId, totalShares, pricePerShareInEth)
    } catch (err) {
      setError(`Error tokenizing property: ${err instanceof Error ? err.message : String(err)}`)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const buyPropertyShares = async (propertyId: string, shares: number) => {
    setIsLoading(true)
    setError(null)

    try {
      return await blockchainService.buyPropertyShares(propertyId, shares)
    } catch (err) {
      setError(`Error buying shares: ${err instanceof Error ? err.message : String(err)}`)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const getUserShares = async (propertyId: string, userAddress: string) => {
    setIsLoading(true)
    setError(null)

    try {
      return await blockchainService.getUserShares(propertyId, userAddress)
    } catch (err) {
      setError(`Error getting user shares: ${err instanceof Error ? err.message : String(err)}`)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const getPropertyTokenInfo = async (propertyId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      return await blockchainService.getPropertyTokenInfo(propertyId)
    } catch (err) {
      setError(`Error getting token info: ${err instanceof Error ? err.message : String(err)}`)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    isConnected,
    walletAddress,
    isLoading,
    error,
    connectWallet,
    registerProperty,
    getPropertyTitle,
    transferPropertyOwnership,
    listPropertyForSale,
    buyProperty,
    tokenizeProperty,
    buyPropertyShares,
    getUserShares,
    getPropertyTokenInfo,
  }

  return <BlockchainContext.Provider value={value}>{children}</BlockchainContext.Provider>
}

export function useBlockchain() {
  const context = useContext(BlockchainContext)
  if (context === undefined) {
    throw new Error("useBlockchain must be used within a BlockchainProvider")
  }
  return context
}
