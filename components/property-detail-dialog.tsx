"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  X,
  MapPin,
  Ruler,
  Home,
  Calendar,
  Building2,
  CheckCircle2,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Map,
} from "lucide-react"
import Image from "next/image"
import OfferDialog from "@/components/offer-dialog"
import type { Property, PropertyCategory } from "@/lib/types"

interface PropertyDetailDialogProps {
  property: Property | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function PropertyDetailDialog({ property, open, onOpenChange }: PropertyDetailDialogProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [showOfferDialog, setShowOfferDialog] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  if (!property) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aktif":
        return "bg-green-500"
      case "satildi":
        return "bg-red-500"
      case "kiralandi":
        return "bg-orange-500"
      case "rezerve":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "aktif":
        return "Aktif"
      case "satildi":
        return "Satıldı"
      case "kiralandi":
        return "Kiralandı"
      case "rezerve":
        return "Rezerve"
      default:
        return status
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

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const nextLightboxImage = () => {
    const totalMedia = property.images.length + (property.videos?.length || 0)
    setLightboxIndex((prev) => (prev + 1) % totalMedia)
  }

  const prevLightboxImage = () => {
    const totalMedia = property.images.length + (property.videos?.length || 0)
    setLightboxIndex((prev) => (prev - 1 + totalMedia) % totalMedia)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const fullAddress = `${property.address}, ${property.district}, ${property.city}`

  const allMedia = [
    ...property.images.map((img) => ({ type: "image" as const, url: img })),
    ...(property.videos?.map((vid) => ({ type: "video" as const, url: vid })) || []),
  ]

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

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 bg-background/95 hover:bg-background rounded-full shadow-lg backdrop-blur"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 space-y-0">
              {/* Image Gallery */}
              <div className="relative">
                <button
                  onClick={() => openLightbox(selectedImage)}
                  className="relative aspect-video bg-muted overflow-hidden w-full cursor-pointer group"
                >
                  {property.images && property.images.length > 0 && (
                    <Image
                      src={property.images[selectedImage] || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority
                      unoptimized
                    />
                  )}

                  <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                    <Badge className="bg-accent text-accent-foreground">
                      {property.type === "konut" ? "Konut" : "Arsa"}
                    </Badge>
                    {property.category && <Badge variant="secondary">{getCategoryLabel(property.category)}</Badge>}
                    {property.listingType && (
                      <Badge variant="secondary">{property.listingType === "satilik" ? "Satılık" : "Kiralık"}</Badge>
                    )}
                    <Badge className={`${getStatusColor(property.status)} text-white`}>
                      {getStatusText(property.status)}
                    </Badge>
                  </div>

                  {property.images && property.images.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
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
                        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation()
                          nextImage()
                        }}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </>
                  )}
                </button>

                {/* Thumbnail Gallery */}
                {property.images && property.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 p-4">
                    {property.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === idx ? "border-accent" : "border-transparent"
                        }`}
                      >
                        <Image
                          src={img || "/placeholder.svg"}
                          alt={`Görsel ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Video Section */}
                {property.videos && property.videos.length > 0 && (
                  <div className="p-4 border-t">
                    <h3 className="font-semibold mb-3 text-foreground">Video Turu</h3>
                    <div className="space-y-2">
                      {property.videos.map((video, idx) => (
                        <button
                          key={idx}
                          onClick={() => openLightbox(property.images.length + idx)}
                          className="w-full text-left"
                        >
                          <video className="w-full rounded-lg cursor-pointer">
                            <source src={video} type="video/mp4" />
                            Tarayıcınız video oynatmayı desteklemiyor.
                          </video>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="p-6 border-t">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Açıklama</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>

              {/* Features */}
              <div className="p-6 border-t">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Özellikler</h2>
                <div className="grid grid-cols-2 gap-3">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {property.location && (
                <div className="p-6 border-t">
                  <h2 className="text-2xl font-bold mb-4 text-foreground flex items-center gap-2">
                    <Map className="h-6 w-6 text-accent" />
                    Konum
                  </h2>
                  <div className="bg-muted rounded-lg p-4">
                    <a
                      href={`https://www.google.com/maps?q=${property.location.lat},${property.location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline text-sm font-medium"
                    >
                      📍 Haritada Görüntüle →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Price and Contact */}
            <div className="bg-muted/30 p-6 space-y-6 border-l">
              <div>
                <div className="text-3xl font-bold text-primary mb-6">
                  {getCurrencySymbol(property.currency)}
                  {property.price.toLocaleString("tr-TR")}
                  {property.listingType === "kiralik" && <span className="text-lg font-normal">/ay</span>}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-foreground">
                    <MapPin className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Konum</p>
                      <p className="font-medium">{fullAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-foreground">
                    <Ruler className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Alan</p>
                      <p className="font-medium">{property.area} m²</p>
                    </div>
                  </div>

                  {property.type === "konut" && property.rooms && (
                    <div className="flex items-center gap-3 text-foreground">
                      <Home className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground">Oda Sayısı</p>
                        <p className="font-medium">{property.rooms}</p>
                      </div>
                    </div>
                  )}

                  {property.floor && (
                    <div className="flex items-center gap-3 text-foreground">
                      <Building2 className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground">Kat</p>
                        <p className="font-medium">{property.floor}</p>
                      </div>
                    </div>
                  )}

                  {property.buildingAge !== undefined && (
                    <div className="flex items-center gap-3 text-foreground">
                      <Calendar className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-sm text-muted-foreground">Bina Yaşı</p>
                        <p className="font-medium">
                          {property.buildingAge === 0 ? "Sıfır" : `${property.buildingAge} yıl`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => setShowOfferDialog(true)}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Teklif Ver
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="relative w-full h-[95vh] flex items-center justify-center">
            {allMedia[lightboxIndex]?.type === "image" ? (
              <Image
                src={allMedia[lightboxIndex].url || "/placeholder.svg"}
                alt="Full size"
                fill
                className="object-contain"
                unoptimized
              />
            ) : (
              <video controls className="max-w-full max-h-full" autoPlay>
                <source src={allMedia[lightboxIndex]?.url} type="video/mp4" />
              </video>
            )}

            {allMedia.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 text-white hover:bg-white/20 rounded-full"
                  onClick={prevLightboxImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 text-white hover:bg-white/20 rounded-full"
                  onClick={nextLightboxImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
              {lightboxIndex + 1} / {allMedia.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <OfferDialog
        open={showOfferDialog}
        onOpenChange={setShowOfferDialog}
        propertyId={property.id}
        propertyTitle={property.title}
        propertyAddress={fullAddress}
        propertyCurrency={property.currency || "TRY"}
      />
    </>
  )
}
