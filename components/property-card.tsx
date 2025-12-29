"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Home, Maximize2, ChevronLeft, ChevronRight, Tag } from "lucide-react"
import OfferDialog from "./offer-dialog"
import Image from "next/image"
import type { Property, PropertyCategory } from "@/lib/types"

interface PropertyCardProps {
  property: Property
  onPropertyClick?: (property: Property) => void
}

export default function PropertyCard({ property, onPropertyClick }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showOffer, setShowOffer] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const getStatusBadge = () => {
    switch (property.status) {
      case "satildi":
        return <Badge className="bg-red-500 text-white">Satıldı</Badge>
      case "kiralandi":
        return <Badge className="bg-orange-500 text-white">Kiralandı</Badge>
      case "rezerve":
        return <Badge className="bg-yellow-500 text-white">Rezerve</Badge>
      case "aktif":
        return <Badge className="bg-green-500 text-white">Aktif</Badge>
      default:
        return null
    }
  }

  const getCurrencySymbol = (currency?: string) => {
    switch (currency) {
      case "USD":
        return "$"
      case "EUR":
        return "€"
      case "TRY":
      default:
        return "₺"
    }
  }

  const getCategoryLabel = (category?: PropertyCategory) => {
    switch (category) {
      case "daire":
        return "Daire"
      case "villa":
        return "Villa"
      case "residence":
        return "Rezidans"
      case "mustakil-ev":
        return "Müstakil Ev"
      case "arsa":
        return "Arsa"
      default:
        return ""
    }
  }

  const fullAddress = `${property.address}, ${property.district}, ${property.city}`

  return (
    <>
      <Card className="overflow-hidden bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="cursor-pointer" onClick={() => onPropertyClick?.(property)}>
          <div className="relative h-[300px] md:h-[400px] bg-muted">
            <Image
              src={property.images[currentImageIndex] || "/placeholder.svg"}
              alt={`${property.title} - ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
              <Badge className="bg-accent text-accent-foreground">{property.type === "konut" ? "Konut" : "Arsa"}</Badge>
              {property.category && <Badge variant="secondary">{getCategoryLabel(property.category)}</Badge>}
              {property.listingType && (
                <Badge variant="secondary">{property.listingType === "satilik" ? "Satılık" : "Kiralık"}</Badge>
              )}
              {getStatusBadge()}
            </div>

            {property.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 w-2 rounded-full transition-all ${
                        index === currentImageIndex ? "bg-accent w-6" : "bg-primary-foreground/50"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageIndex(index)
                      }}
                      aria-label={`Fotoğraf ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-card-foreground mb-2">{property.title}</h3>

            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">{fullAddress}</span>
              </div>
            </div>

            <div className="text-2xl font-bold text-primary mb-4">
              {getCurrencySymbol(property.currency)}
              {property.price.toLocaleString("tr-TR")}
              {property.listingType === "kiralik" && <span className="text-sm font-normal">/ay</span>}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {property.rooms && (
                <div className="flex items-center gap-2 text-card-foreground">
                  <Home className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Oda</p>
                    <p className="font-semibold">{property.rooms}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 text-card-foreground">
                <Maximize2 className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">Alan</p>
                  <p className="font-semibold">{property.area} m²</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4 text-accent" />
                <p className="text-xs font-medium text-muted-foreground">Özellikler</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {property.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {property.features.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{property.features.length - 3} daha
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <Button
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            size="lg"
            onClick={(e) => {
              e.stopPropagation()
              setShowOffer(true)
            }}
          >
            Teklif Ver
          </Button>
        </div>
      </Card>
      <OfferDialog
        open={showOffer}
        onOpenChange={setShowOffer}
        propertyId={property.id}
        propertyTitle={property.title}
        propertyAddress={fullAddress}
        propertyCurrency={property.currency || "TRY"}
      />
    </>
  )
}
