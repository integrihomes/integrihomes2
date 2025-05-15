"use client"

import { Button } from "@/components/ui/button"
import { Shield, FileText, Coins, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function BlockchainSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-navy text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-navy-800 px-3 py-1 text-sm text-gold">New Feature</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Blockchain-Powered Real Estate
            </h2>
            <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Secure, transparent, and efficient property transactions with blockchain technology
            </p>
          </div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-8 md:grid-cols-3"
        >
          <motion.div variants={itemVariants} className="bg-navy-800 p-6 rounded-lg bg-opacity-50">
            <div className="h-12 w-12 rounded-lg bg-teal/20 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-teal" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Property Titles</h3>
            <p className="text-gray-300 mb-4">
              Property titles are registered on the blockchain, creating an immutable record of ownership that prevents
              fraud and reduces disputes.
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-gold mt-2 mr-2" />
                <span>Tamper-proof ownership records</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-gold mt-2 mr-2" />
                <span>Transparent ownership history</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-gold mt-2 mr-2" />
                <span>Reduced title fraud risk</span>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-navy-800 p-6 rounded-lg bg-opacity-50">
            <div className="h-12 w-12 rounded-lg bg-teal/20 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-teal" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Contracts</h3>
            <p className="text-gray-300 mb-4">
              Automate property transactions with smart contracts that execute agreements between buyers, sellers, and
              agents without intermediaries.
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-gold mt-2 mr-2" />
                <span>Automated escrow services</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-gold mt-2 mr-2" />
                <span>Instant ownership transfer</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-gold mt-2 mr-2" />
                <span>Reduced transaction costs</span>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-navy-800 p-6 rounded-lg bg-opacity-50">
            <div className="h-12 w-12 rounded-lg bg-teal/20 flex items-center justify-center mb-4">
              <Coins className="h-6 w-6 text-teal" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fractional Ownership</h3>
            <p className="text-gray-300 mb-4">
              Tokenize property assets to enable fractional ownership, allowing investors to purchase shares of
              properties with lower capital requirements.
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-gold mt-2 mr-2" />
                <span>Lower investment barriers</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-gold mt-2 mr-2" />
                <span>Diversified real estate portfolio</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-gold mt-2 mr-2" />
                <span>Liquid property investments</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="flex justify-center mt-12">
          <Link href="/blockchain">
            <Button size="lg" className="gap-1.5 bg-teal hover:bg-teal/90">
              Explore Blockchain Features
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
