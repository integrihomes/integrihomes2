"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ConnectWalletButton } from "@/components/blockchain/connect-wallet-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useBlockchain } from "@/contexts/blockchain-context"
import { Shield, Coins, FileText, AlertCircle, Check, Clock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from "next/image"
import Link from "next/link"

export default function BlockchainPage() {
  const { isConnected, walletAddress, error } = useBlockchain()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-navy">Blockchain Real Estate</h1>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Secure, transparent, and efficient property transactions powered by blockchain technology
                </p>
              </div>
              <div className="w-full max-w-sm">
                <ConnectWalletButton />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="investments">Investments</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-navy">Property Titles</CardTitle>
                      <CardDescription>Immutable property ownership records</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center py-6">
                      <Shield className="h-16 w-16 text-teal" />
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm text-gray-600">
                        Secure your property title on the blockchain to prevent fraud and ensure transparent ownership
                        history.
                      </p>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-navy">Smart Contracts</CardTitle>
                      <CardDescription>Automated property transactions</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center py-6">
                      <FileText className="h-16 w-16 text-teal" />
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm text-gray-600">
                        Execute property sales, rentals, and agreements automatically with secure smart contracts.
                      </p>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-navy">Tokenization</CardTitle>
                      <CardDescription>Fractional property ownership</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center py-6">
                      <Coins className="h-16 w-16 text-teal" />
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm text-gray-600">
                        Invest in property shares to access real estate with lower capital requirements.
                      </p>
                    </CardFooter>
                  </Card>
                </div>

                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-navy mb-6">How It Works</h2>
                  <div className="grid gap-8 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-muted rounded-full p-4 mb-4">
                        <Shield className="h-8 w-8 text-teal" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">1. Secure Verification</h3>
                      <p className="text-gray-600">
                        Properties are verified and registered on the blockchain with all legal documentation.
                      </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="bg-muted rounded-full p-4 mb-4">
                        <FileText className="h-8 w-8 text-teal" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">2. Smart Contracts</h3>
                      <p className="text-gray-600">
                        Transactions are executed through smart contracts, eliminating intermediaries and reducing
                        costs.
                      </p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                      <div className="bg-muted rounded-full p-4 mb-4">
                        <Coins className="h-8 w-8 text-teal" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">3. Ownership Transfer</h3>
                      <p className="text-gray-600">
                        Property ownership is instantly transferred and recorded on the immutable blockchain ledger.
                      </p>
                    </div>
                  </div>
                </div>

                {!isConnected && (
                  <div className="mt-12 bg-muted p-6 rounded-lg text-center">
                    <h3 className="text-xl font-bold text-navy mb-2">Connect Your Wallet to Get Started</h3>
                    <p className="text-gray-600 mb-4">
                      Connect your Ethereum wallet to access blockchain-powered real estate features.
                    </p>
                    <ConnectWalletButton />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="properties" className="mt-6">
                {!isConnected ? (
                  <div className="bg-muted p-6 rounded-lg text-center">
                    <h3 className="text-xl font-bold text-navy mb-2">Connect Your Wallet</h3>
                    <p className="text-gray-600 mb-4">
                      Connect your Ethereum wallet to view your blockchain properties.
                    </p>
                    <ConnectWalletButton />
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-navy">Your Properties</h2>
                      <Button className="bg-teal hover:bg-teal/90">Register New Property</Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {/* Sample property cards - in a real app, these would be fetched from the blockchain */}
                      <Card>
                        <div className="relative h-48">
                          <Image
                            src="/images/beachfront-villa.png"
                            alt="Beachfront Villa"
                            fill
                            className="object-cover rounded-t-lg"
                          />
                          <div className="absolute top-2 right-2 bg-teal text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                            <Check className="h-3 w-3 text-gold" />
                            <span>Verified</span>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-navy">Luxury Beachfront Villa</CardTitle>
                          <CardDescription>Kokrobite, Greater Accra</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 mb-4">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Registered 3 months ago</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="bg-muted p-2 rounded">
                              <p className="text-gray-500">Status</p>
                              <p className="font-medium">Listed for Sale</p>
                            </div>
                            <div className="bg-muted p-2 rounded">
                              <p className="text-gray-500">Price</p>
                              <p className="font-medium">2.5 ETH</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full" asChild>
                            <Link href="/properties/3">Manage Property</Link>
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <div className="relative h-48">
                          <Image
                            src="/images/modern-apartment-east-legon.png"
                            alt="Modern Apartment"
                            fill
                            className="object-cover rounded-t-lg"
                          />
                          <div className="absolute top-2 right-2 bg-teal text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                            <Check className="h-3 w-3 text-gold" />
                            <span>Verified</span>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-navy">Modern Apartment</CardTitle>
                          <CardDescription>East Legon, Accra</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 mb-4">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">Registered 1 month ago</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="bg-muted p-2 rounded">
                              <p className="text-gray-500">Status</p>
                              <p className="font-medium">Tokenized</p>
                            </div>
                            <div className="bg-muted p-2 rounded">
                              <p className="text-gray-500">Shares Sold</p>
                              <p className="font-medium">45/100</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full" asChild>
                            <Link href="/properties/1">Manage Property</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="investments" className="mt-6">
                {!isConnected ? (
                  <div className="bg-muted p-6 rounded-lg text-center">
                    <h3 className="text-xl font-bold text-navy mb-2">Connect Your Wallet</h3>
                    <p className="text-gray-600 mb-4">
                      Connect your Ethereum wallet to view your property investments.
                    </p>
                    <ConnectWalletButton />
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-navy">Your Investments</h2>
                      <Button className="bg-teal hover:bg-teal/90">Explore Investment Opportunities</Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {/* Sample investment cards - in a real app, these would be fetched from the blockchain */}
                      <Card>
                        <div className="relative h-48">
                          <Image
                            src="/images/colonial-home-labone.png"
                            alt="Colonial Style Home"
                            fill
                            className="object-cover rounded-t-lg"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-navy">Colonial Style Home</CardTitle>
                          <CardDescription>Labone, Accra</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                            <div className="bg-muted p-2 rounded">
                              <p className="text-gray-500">Your Shares</p>
                              <p className="font-medium">15/100</p>
                            </div>
                            <div className="bg-muted p-2 rounded">
                              <p className="text-gray-500">Value</p>
                              <p className="font-medium">0.75 ETH</p>
                            </div>
                          </div>
                          <div className="bg-muted p-2 rounded text-sm">
                            <p className="text-gray-500">Dividend Yield</p>
                            <p className="font-medium">5.2% annually</p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full" asChild>
                            <Link href="/properties/5">Manage Investment</Link>
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <div className="relative h-48">
                          <Image
                            src="/images/family-home-cantonments.png"
                            alt="Family Home"
                            fill
                            className="object-cover rounded-t-lg"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-navy">Family Home</CardTitle>
                          <CardDescription>Cantonments, Accra</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                            <div className="bg-muted p-2 rounded">
                              <p className="text-gray-500">Your Shares</p>
                              <p className="font-medium">8/100</p>
                            </div>
                            <div className="bg-muted p-2 rounded">
                              <p className="text-gray-500">Value</p>
                              <p className="font-medium">0.48 ETH</p>
                            </div>
                          </div>
                          <div className="bg-muted p-2 rounded text-sm">
                            <p className="text-gray-500">Dividend Yield</p>
                            <p className="font-medium">4.8% annually</p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full" asChild>
                            <Link href="/properties/2">Manage Investment</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-navy text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">The Future of Real Estate is Here</h2>
                  <p className="max-w-[600px] text-gray-300 md:text-xl">
                    IntegriHomes is pioneering blockchain technology in Ghana's real estate market, making property
                    transactions more secure, transparent, and accessible than ever before.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1.5 bg-teal hover:bg-teal/90">
                    Learn More
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Contact Our Blockchain Team
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-navy-800 p-4 rounded-lg bg-opacity-50">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-gold" />
                    Secure Ownership
                  </h3>
                  <p className="text-gray-300">
                    Property titles are secured on the blockchain, eliminating the risk of fraud and title disputes.
                  </p>
                </div>
                <div className="bg-navy-800 p-4 rounded-lg bg-opacity-50">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-gold" />
                    Smart Contracts
                  </h3>
                  <p className="text-gray-300">
                    Automated agreements handle payments, escrow, and ownership transfers without intermediaries.
                  </p>
                </div>
                <div className="bg-navy-800 p-4 rounded-lg bg-opacity-50">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Coins className="h-5 w-5 text-gold" />
                    Fractional Ownership
                  </h3>
                  <p className="text-gray-300">
                    Tokenization allows investors to purchase shares of properties, lowering barriers to entry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
