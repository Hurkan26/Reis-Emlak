"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TURKISH_CITIES } from "@/lib/cities"
import type { Property, PropertyType, ListingType, PropertyCategory, PropertyStatus, Currency } from "@/lib/types"
import { Upload, X, ImageIcon, Video } from "lucide-react"
import Image from "next/image"

interface PropertyFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  property: Property | null
  onSave: (property: Property) => void
}

export default function PropertyFormDialog({ open, onOpenChange, property, onSave }: PropertyFormDialogProps) {
  const [formData, setFormData] = useState<Partial<Property>>({
    title: "",
    type: "konut",
    listingType: "satilik",
    category: "daire",
    rooms: "",
    area: 0,
    price: 0,
    currency: "TRY",
    address: "",
    city: "Eskişehir",
    district: "",
    features: [],
    description: "",
    images: [],
    videos: [],
    status: "aktif",
    floor: "",
    buildingAge: 0,
    contactPhone: "",
  })

  const [featuresInput, setFeaturesInput] = useState("")

  useEffect(() => {
    if (property) {
      setFormData(property)
      setFeaturesInput(property.features.join(", "))
    } else {
      setFormData({
        title: "",
        type: "konut",
        listingType: "satilik",
        category: "daire",
        rooms: "",
        area: 0,
        price: 0,
        currency: "TRY",
        address: "",
        city: "Eskişehir",
        district: "",
        features: [],
        description: "",
        images: [],
        videos: [],
        status: "aktif",
        floor: "",
        buildingAge: 0,
        contactPhone: "",
      })
      setFeaturesInput("")
    }
  }, [property, open])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileUrls: string[] = []
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          fileUrls.push(reader.result as string)
          if (fileUrls.length === files.length) {
            setFormData({ ...formData, images: [...(formData.images || []), ...fileUrls] })
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileUrls: string[] = []
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          fileUrls.push(reader.result as string)
          if (fileUrls.length === files.length) {
            setFormData({ ...formData, videos: [...(formData.videos || []), ...fileUrls] })
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...(formData.images || [])]
    newImages.splice(index, 1)
    setFormData({ ...formData, images: newImages })
  }

  const removeVideo = (index: number) => {
    const newVideos = [...(formData.videos || [])]
    newVideos.splice(index, 1)
    setFormData({ ...formData, videos: newVideos })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const features = featuresInput
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean)

    onSave({
      ...formData,
      features,
      id: property?.id || Date.now(),
      createdAt: property?.createdAt || new Date().toISOString().split("T")[0],
    } as Property)
  }

  const getCurrencySymbol = (curr?: Currency) => {
    switch (curr) {
      case "USD":
        return "$"
      case "EUR":
        return "€"
      case "TRY":
      default:
        return "₺"
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{property ? "İlan Düzenle" : "Yeni İlan Ekle"}</DialogTitle>
            <DialogDescription>İlan bilgilerini doldurun.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">İlan Başlığı</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Durum</Label>
              <Select
                value={formData.status}
                onValueChange={(value: PropertyStatus) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aktif">Aktif</SelectItem>
                  <SelectItem value="satildi">Satıldı</SelectItem>
                  <SelectItem value="kiralandi">Kiralandı</SelectItem>
                  <SelectItem value="rezerve">Rezerve</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tür</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: PropertyType) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="konut">Konut</SelectItem>
                    <SelectItem value="arsa">Arsa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="listingType">İlan Tipi</Label>
                <Select
                  value={formData.listingType}
                  onValueChange={(value: ListingType) => setFormData({ ...formData, listingType: value })}
                >
                  <SelectTrigger id="listingType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="satilik">Satılık</SelectItem>
                    <SelectItem value="kiralik">Kiralık</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {formData.type === "konut" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: PropertyCategory) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daire">Daire</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="residence">Residence</SelectItem>
                      <SelectItem value="mustakil-ev">Müstakil Ev</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rooms">Oda Sayısı</Label>
                  <Input
                    id="rooms"
                    value={formData.rooms}
                    onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                    placeholder="3+1"
                  />
                </div>
              </div>
            )}

            {formData.type === "konut" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.category === "daire" || formData.category === "residence" ? (
                  <div className="space-y-2">
                    <Label htmlFor="floor">Bulunduğu Kat</Label>
                    <Input
                      id="floor"
                      value={formData.floor}
                      onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                      placeholder="5"
                    />
                  </div>
                ) : null}

                <div className="space-y-2">
                  <Label htmlFor="buildingAge">Bina Yaşı</Label>
                  <Input
                    id="buildingAge"
                    type="number"
                    value={formData.buildingAge}
                    onChange={(e) => setFormData({ ...formData, buildingAge: Number.parseInt(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="area">Alan (m²)</Label>
                <Input
                  id="area"
                  type="number"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: Number.parseInt(e.target.value) })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Fiyat</Label>
                <div className="flex gap-2">
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number.parseInt(e.target.value) })}
                    required
                    className="flex-1"
                  />
                  <Select
                    value={formData.currency}
                    onValueChange={(value: Currency) => setFormData({ ...formData, currency: value })}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TRY">{getCurrencySymbol("TRY")} TL</SelectItem>
                      <SelectItem value="USD">{getCurrencySymbol("USD")} USD</SelectItem>
                      <SelectItem value="EUR">{getCurrencySymbol("EUR")} EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Şehir</Label>
                <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
                  <SelectTrigger id="city">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TURKISH_CITIES.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">Mahalle</Label>
                <Input
                  id="district"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adres</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">İletişim Telefonu (Hemen Ara için)</Label>
              <Input
                id="contactPhone"
                type="tel"
                placeholder="0555 123 45 67"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Bu numara "Hemen Ara" butonunda gösterilecektir.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Özellikler (virgülle ayırın)</Label>
              <Input
                id="features"
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                placeholder="Asansör, Otopark, Güvenlik"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Fotoğraflar</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.images?.map((img, index) => (
                  <div key={index} className="relative w-20 h-20 rounded border">
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`Preview ${index}`}
                      fill
                      className="object-cover rounded"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => document.getElementById("imageUpload")?.click()}
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Fotoğraf Ekle
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Videolar</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.videos?.map((video, index) => (
                  <div key={index} className="relative flex items-center gap-2 p-2 border rounded">
                    <Video className="h-4 w-4" />
                    <span className="text-sm">Video {index + 1}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 ml-2"
                      onClick={() => removeVideo(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  id="videoUpload"
                  type="file"
                  accept="video/*"
                  multiple
                  className="hidden"
                  onChange={handleVideoUpload}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => document.getElementById("videoUpload")?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Video Ekle
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90">
                {property ? "Güncelle" : "Ekle"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => onOpenChange(false)}
              >
                İptal
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
