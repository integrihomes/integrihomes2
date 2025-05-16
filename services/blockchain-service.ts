import { ethers } from "ethers"
import PropertyTitleABI from "../contracts/abis/PropertyTitle.json"
import PropertyMarketplaceABI from "../contracts/abis/PropertyMarketplace.json"
import PropertyTokenABI from "../contracts/abis/PropertyToken.json"

// Contract addresses - would be environment variables in production
const PROPERTY_TITLE_ADDRESS = "0x123...abc" // Example address
const PROPERTY_MARKETPLACE_ADDRESS = "0x456...def" // Example address
const PROPERTY_TOKEN_ADDRESS = "0x789...ghi" // Example address

export class BlockchainService {
  provider: ethers.BrowserProvider | null = null
  signer: ethers.Signer | null = null
  titleContract: ethers.Contract | null = null
  marketplaceContract: ethers.Contract | null = null
  tokenContract: ethers.Contract | null = null

  // Initialize the blockchain service
  async initialize() {
    // Check if MetaMask is installed
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" })

        // Create Web3 provider
        this.provider = new ethers.BrowserProvider(window.ethereum)
        this.signer = await this.provider.getSigner()

        // Initialize contracts
        this.titleContract = new ethers.Contract(PROPERTY_TITLE_ADDRESS, PropertyTitleABI, this.signer)

        this.marketplaceContract = new ethers.Contract(
          PROPERTY_MARKETPLACE_ADDRESS,
          PropertyMarketplaceABI,
          this.signer,
        )

        this.tokenContract = new ethers.Contract(PROPERTY_TOKEN_ADDRESS, PropertyTokenABI, this.signer)

        return true
      } catch (error) {
        console.error("Error initializing blockchain service:", error)
        return false
      }
    } else {
      console.error("Please install MetaMask to use blockchain features")
      return false
    }
  }

  // Get the connected wallet address
  async getWalletAddress() {
    if (!this.signer) return null
    return await this.signer.getAddress()
  }

  // Property Title Management

  // Register a new property title on the blockchain
  async registerPropertyTitle(
    propertyId: string,
    ownerAddress: string,
    propertyDataHash: string,
    documentIpfsHash: string,
  ) {
    if (!this.titleContract) throw new Error("Title contract not initialized")

    const tx = await this.titleContract.registerProperty(propertyId, ownerAddress, propertyDataHash, documentIpfsHash)

    return await tx.wait()
  }

  // Get property title information
  async getPropertyTitle(propertyId: string) {
    if (!this.titleContract) throw new Error("Title contract not initialized")

    const propertyData = await this.titleContract.getProperty(propertyId)

    return {
      id: propertyData.id,
      owner: propertyData.owner,
      dataHash: propertyData.dataHash,
      documentHash: propertyData.documentHash,
      timestamp: new Date(Number(propertyData.timestamp) * 1000),
      isVerified: propertyData.isVerified,
    }
  }

  // Transfer property ownership
  async transferPropertyOwnership(propertyId: string, newOwnerAddress: string) {
    if (!this.titleContract) throw new Error("Title contract not initialized")

    const tx = await this.titleContract.transferProperty(propertyId, newOwnerAddress)
    return await tx.wait()
  }

  // Property Marketplace

  // List a property for sale
  async listPropertyForSale(propertyId: string, priceInEth: string) {
    if (!this.marketplaceContract) throw new Error("Marketplace contract not initialized")

    const priceInWei = ethers.parseEther(priceInEth)
    const tx = await this.marketplaceContract.listProperty(propertyId, priceInWei)

    return await tx.wait()
  }

  // Buy a property
  async buyProperty(propertyId: string, priceInEth: string) {
    if (!this.marketplaceContract) throw new Error("Marketplace contract not initialized")

    const priceInWei = ethers.parseEther(priceInEth)
    const tx = await this.marketplaceContract.buyProperty(propertyId, {
      value: priceInWei,
    })

    return await tx.wait()
  }

  // Property Tokenization

  // Tokenize a property
  async tokenizeProperty(propertyId: string, totalShares: number, pricePerShareInEth: string) {
    if (!this.tokenContract) throw new Error("Token contract not initialized")

    const pricePerShareInWei = ethers.parseEther(pricePerShareInEth)
    const tx = await this.tokenContract.tokenizeProperty(propertyId, totalShares, pricePerShareInWei)

    return await tx.wait()
  }

  // Buy property shares
  async buyPropertyShares(propertyId: string, shares: number) {
    if (!this.tokenContract) throw new Error("Token contract not initialized")

    const propertyData = await this.tokenContract.getPropertyTokenInfo(propertyId)
    const totalCost = propertyData.pricePerShare * BigInt(shares)

    const tx = await this.tokenContract.buyShares(propertyId, shares, {
      value: totalCost,
    })

    return await tx.wait()
  }

  // Get user's shares in a property
  async getUserShares(propertyId: string, userAddress: string) {
    if (!this.tokenContract) throw new Error("Token contract not initialized")

    const shares = await this.tokenContract.sharesOf(propertyId, userAddress)
    return Number(shares)
  }

  // Get property tokenization info
  async getPropertyTokenInfo(propertyId: string) {
    if (!this.tokenContract) throw new Error("Token contract not initialized")

    const info = await this.tokenContract.getPropertyTokenInfo(propertyId)

    return {
      totalShares: Number(info.totalShares),
      availableShares: Number(info.availableShares),
      pricePerShare: ethers.formatEther(info.pricePerShare),
      isActive: info.isActive,
    }
  }
}

// Create a singleton instance
export const blockchainService = new BlockchainService()
