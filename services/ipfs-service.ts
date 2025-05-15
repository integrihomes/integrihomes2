// Mock IPFS service for development
export class IPFSService {
  // Upload a file to IPFS (mock implementation)
  async uploadFile(file: File): Promise<string> {
    console.log(`Simulating upload of file: ${file.name}`)
    // Return a mock IPFS hash
    return `ipfs-mock-hash-${Date.now()}`
  }

  // Upload JSON data to IPFS (mock implementation)
  async uploadJSON(data: any): Promise<string> {
    console.log(`Simulating upload of JSON data:`, data)
    // Return a mock IPFS hash
    return `ipfs-mock-hash-${Date.now()}`
  }

  // Get IPFS gateway URL for a hash
  getIPFSUrl(hash: string): string {
    return `https://ipfs.io/ipfs/${hash}`
  }
}

// Create a singleton instance
export const ipfsService = new IPFSService()
