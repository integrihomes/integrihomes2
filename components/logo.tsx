"use client"

import { useState, useEffect } from "react"
import { Home } from "lucide-react"
import { motion } from "framer-motion"

export function Logo({
  className = "",
  size = "default",
  isFooter = false,
}: {
  className?: string
  size?: "small" | "default" | "large"
  isFooter?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const sizeClasses = {
    small: "h-8",
    default: "h-10",
    large: "h-12",
  }

  const textSize = {
    small: "text-lg",
    default: "text-xl",
    large: "text-2xl",
  }

  // Define colors based on footer or regular use
  const textColor = isFooter ? "text-white" : "text-teal"
  const houseColor = isFooter ? "text-white" : "text-navy"
  const checkmarkColor = "text-gold"
  const highlightColor = isFooter ? "from-gold to-gold" : "from-gold to-teal"

  if (!isMounted) {
    // Simple SSR-compatible version
    return (
      <div className={`flex items-center ${className}`}>
        <div className="relative">
          <Home
            className={`${houseColor} ${size === "small" ? "h-6 w-6" : size === "large" ? "h-8 w-8" : "h-7 w-7"}`}
          />
          <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-0">
            <div
              className={`${checkmarkColor} ${
                size === "small" ? "h-3 w-3" : size === "large" ? "h-4 w-4" : "h-3.5 w-3.5"
              } rounded-full`}
            />
          </div>
        </div>
        <span className={`ml-2 font-montserrat font-bold ${textColor} ${textSize[size]}`}>IntegriHomes</span>
      </div>
    )
  }

  return (
    <div
      className={`flex items-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <motion.div
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <Home
            className={`${houseColor} ${size === "small" ? "h-6 w-6" : size === "large" ? "h-8 w-8" : "h-7 w-7"}`}
          />
        </motion.div>
        <motion.div
          className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-0"
          animate={isHovered ? { scale: 1.2, y: -2 } : { scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 10 }}
        >
          <div
            className={`${checkmarkColor} ${
              size === "small" ? "h-3 w-3" : size === "large" ? "h-4 w-4" : "h-3.5 w-3.5"
            } rounded-full`}
          />
        </motion.div>
      </div>
      <div className="ml-2 overflow-hidden">
        <motion.span
          className={`font-montserrat font-bold ${textColor} ${textSize[size]} inline-block`}
          animate={isHovered ? { y: 0 } : { y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <span className="relative">
            Integri
            <motion.span
              className={`absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r ${highlightColor}`}
              initial={{ width: "0%" }}
              animate={isHovered ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </span>
          <span className="relative">
            Homes
            <motion.span
              className={`absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r ${highlightColor}`}
              initial={{ width: "0%" }}
              animate={isHovered ? { width: "100%" } : { width: "0%" }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />
          </span>
        </motion.span>
      </div>
    </div>
  )
}
