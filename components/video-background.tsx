"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface VideoBackgroundProps {
  videoSrc: string
  fallbackImage?: string
  overlayOpacity?: number
  children?: React.ReactNode
}

export function VideoBackground({
  videoSrc,
  fallbackImage = "/placeholder.svg?height=800&width=1200",
  overlayOpacity = 0.5,
  children,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleCanPlay = () => {
      setIsVideoLoaded(true)
    }

    videoElement.addEventListener("canplay", handleCanPlay)

    return () => {
      videoElement.removeEventListener("canplay", handleCanPlay)
    }
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Fallback image shown until video loads */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fallbackImage})` }} />
      )}

      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/60 to-navy/30" style={{ opacity: overlayOpacity }} />

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
