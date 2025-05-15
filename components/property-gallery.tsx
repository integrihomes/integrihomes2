"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Expand, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface PropertyGalleryProps {
  images?: string[]
}

export function PropertyGallery({ images = [] }: PropertyGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [dialogImageIndex, setDialogImageIndex] = useState(0)

  const galleryImages =
    images.length > 0
      ? images
      : [
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=300&width=400&text=Image 1",
          "/placeholder.svg?height=300&width=400&text=Image 2",
          "/placeholder.svg?height=300&width=400&text=Image 3",
          "/placeholder.svg?height=300&width=400&text=Image 4",
        ]

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  const handleDialogPrevImage = () => {
    setDialogImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const handleDialogNextImage = () => {
    setDialogImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative md:col-span-2 md:row-span-2 cursor-pointer group">
            <Image
              src={galleryImages[currentImageIndex] || "/placeholder.svg"}
              alt={`Property view ${currentImageIndex + 1}`}
              width={800}
              height={600}
              className="rounded-lg object-cover w-full h-full aspect-square md:aspect-auto"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center">
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                <Expand className="h-6 w-6 text-white" />
                <span className="sr-only">View full size</span>
              </Button>
            </div>

            {/* Navigation buttons */}
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/20 text-white hover:bg-black/40"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevImage()
                }}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/20 text-white hover:bg-black/40"
                onClick={(e) => {
                  e.stopPropagation()
                  handleNextImage()
                }}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next image</span>
              </Button>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent
          className="max-w-4xl"
          onOpenAutoFocus={(e) => {
            e.preventDefault()
            setDialogImageIndex(currentImageIndex)
          }}
        >
          <div className="relative">
            <Image
              src={galleryImages[dialogImageIndex] || "/placeholder.svg"}
              alt={`Property view ${dialogImageIndex + 1}`}
              width={1200}
              height={800}
              className="rounded-lg object-cover w-full"
            />

            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/20 text-white hover:bg-black/40"
                onClick={handleDialogPrevImage}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/20 text-white hover:bg-black/40"
                onClick={handleDialogNextImage}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next image</span>
              </Button>
            </div>

            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
              {dialogImageIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {galleryImages.slice(0, 4).map((image, index) =>
        index === 0 ? null : (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div className="relative cursor-pointer group">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Property view ${index + 1}`}
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full h-full aspect-square"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center">
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                    <Expand className="h-5 w-5 text-white" />
                    <span className="sr-only">View full size</span>
                  </Button>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent
              className="max-w-4xl"
              onOpenAutoFocus={(e) => {
                e.preventDefault()
                setDialogImageIndex(index)
              }}
            >
              <div className="relative">
                <Image
                  src={galleryImages[dialogImageIndex] || "/placeholder.svg"}
                  alt={`Property view ${dialogImageIndex + 1}`}
                  width={1200}
                  height={800}
                  className="rounded-lg object-cover w-full"
                />

                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-black/20 text-white hover:bg-black/40"
                    onClick={handleDialogPrevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                    <span className="sr-only">Previous image</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-black/20 text-white hover:bg-black/40"
                    onClick={handleDialogNextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                    <span className="sr-only">Next image</span>
                  </Button>
                </div>

                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-md text-sm">
                  {dialogImageIndex + 1} / {galleryImages.length}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ),
      )}
    </div>
  )
}
