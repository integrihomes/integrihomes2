"use client"

import { Button } from "@/components/ui/button"
import { Bed, Bath, SquareIcon as SquareFoot, ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export function FeaturedProperty() {
  const [currentImage, setCurrentImage] = useState(0)

  const images = [
    {
      src: "/images/beachfront-villa.png",
      alt: "Luxury Beachfront Villa in Kokrobite - Exterior",
    },
    {
      src: "/images/beachfront-villa-interior.png",
      alt: "Luxury Beachfront Villa in Kokrobite - Kitchen Interior",
    },
    {
      src: "/images/beachfront-villa-bedroom.png",
      alt: "Luxury Beachfront Villa in Kokrobite - Bedroom",
    },
  ]

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
      <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/20 text-white hover:bg-black/40"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous image</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/20 text-white hover:bg-black/40"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next image</span>
          </Button>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentImage ? "bg-white" : "bg-white/50"}`}
              onClick={() => setCurrentImage(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm font-medium text-teal">Featured</div>
          <div className="inline-flex items-center rounded-full bg-teal text-white px-3 py-1 text-sm font-medium gap-1">
            <Check className="h-3 w-3 text-gold" />
            <span>Verified</span>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-navy">Luxury Beachfront Villa in Kokrobite</h3>
        <p className="text-xl font-bold text-teal">₵1,250,000</p>
        <p className="text-gray-600">
          This stunning beachfront villa offers breathtaking ocean views and luxurious living spaces. The property
          features an open floor plan with high ceilings, floor-to-ceiling windows, and premium finishes throughout. The
          gourmet kitchen includes top-of-the-line appliances and a large island with seating. Master bedroom with
          panoramic ocean views. Fully verified with clear title documentation.
        </p>
        <div className="flex gap-6 text-gray-600">
          <div className="flex items-center gap-1">
            <Bed className="h-5 w-5" />
            <span>4 Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-5 w-5" />
            <span>3.5 Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <SquareFoot className="h-5 w-5" />
            <span>3,200 sq ft</span>
          </div>
        </div>
        <Link href="/properties/featured">
          <Button className="gap-1.5 bg-teal hover:bg-teal/90">
            View Property
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
