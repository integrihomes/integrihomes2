import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Bed, Bath, SquareIcon as SquareFoot, Heart, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface PropertyCardProps {
  id: string
  title: string
  price: string
  address: string
  beds: number
  baths: number
  sqft: number
  type: string
  image: string
  verified?: boolean
}

export function PropertyCard({
  id,
  title,
  price,
  address,
  beds,
  baths,
  sqft,
  type,
  image,
  verified = false,
}: PropertyCardProps) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <Link href={`/properties/${id}`}>
          <div className="relative h-48 overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to favorites</span>
        </Button>
        <div className="absolute bottom-2 left-2 rounded-full bg-white/80 backdrop-blur-sm px-2 py-1 text-xs font-medium">
          {type}
        </div>
        {verified && (
          <div className="absolute top-2 left-2 rounded-full bg-teal text-white px-2 py-1 text-xs font-medium flex items-center gap-1">
            <Check className="h-3 w-3 text-gold" />
            <span>Verified</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <Link href={`/properties/${id}`} className="block">
            <h3 className="font-montserrat font-semibold line-clamp-1 hover:underline">{title}</h3>
          </Link>
          <p className="text-lg font-bold text-teal">{price}</p>
          <p className="text-sm text-gray-500 line-clamp-1">{address}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between text-sm text-gray-500">
        {beds > 0 && (
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{beds}</span>
          </div>
        )}
        {baths > 0 && (
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{baths}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <SquareFoot className="h-4 w-4" />
          <span>{sqft} sq ft</span>
        </div>
      </CardFooter>
    </Card>
  )
}
