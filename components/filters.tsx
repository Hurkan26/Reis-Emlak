"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Home, LandPlot, Search } from "lucide-react"
import type { PropertyType, ListingType, PropertyCategory } from "@/lib/types"
import { TURKISH_CITIES } from "@/lib/cities"

interface FiltersProps {
  propertyType: PropertyType | "all"
  listingType: ListingType | "all"
  propertyCategory: PropertyCategory | "all"
  city: string
  minPrice: string
  maxPrice: string
  minArea: string
  maxArea: string
  rooms: string
  district: string
  sortBy: string
  onPropertyTypeChange: (type: PropertyType | "all") => void
  onListingTypeChange: (type: ListingType | "all") => void
  onPropertyCategoryChange: (category: PropertyCategory | "all") => void
  onCityChange: (city: string) => void
  onMinPriceChange: (price: string) => void
  onMaxPriceChange: (price: string) => void
  onMinAreaChange: (area: string) => void
  onMaxAreaChange: (area: string) => void
  onRoomsChange: (rooms: string) => void
  onDistrictChange: (district: string) => void
  onSortByChange: (sortBy: string) => void
}

export default function Filters({
  propertyType,
  listingType,
  propertyCategory,
  city,
  minPrice,
  maxPrice,
  minArea,
  maxArea,
  rooms,
  district,
  sortBy,
  onPropertyTypeChange,
  onListingTypeChange,
  onPropertyCategoryChange,
  onCityChange,
  onMinPriceChange,
  onMaxPriceChange,
  onMinAreaChange,
  onMaxAreaChange,
  onRoomsChange,
  onDistrictChange,
  onSortByChange,
}: FiltersProps) {
  return (
    <div className="bg-card rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Search className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
        <h2 className="text-lg sm:text-xl font-bold text-card-foreground">İlan Ara</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Button
          variant={propertyType === "konut" ? "default" : "outline"}
          className={`h-auto py-3 sm:py-4 ${
            propertyType === "konut"
              ? "bg-accent hover:bg-accent/90 text-accent-foreground"
              : "text-card-foreground hover:bg-muted"
          }`}
          onClick={() => onPropertyTypeChange("konut")}
        >
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <Home className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-sm sm:text-base font-semibold">Konut</span>
          </div>
        </Button>
        <Button
          variant={propertyType === "arsa" ? "default" : "outline"}
          className={`h-auto py-3 sm:py-4 ${
            propertyType === "arsa"
              ? "bg-accent hover:bg-accent/90 text-accent-foreground"
              : "text-card-foreground hover:bg-muted"
          }`}
          onClick={() => onPropertyTypeChange("arsa")}
        >
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <LandPlot className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-sm sm:text-base font-semibold">Arsa</span>
          </div>
        </Button>
      </div>

      {propertyType === "konut" && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <Button
            variant={listingType === "satilik" ? "default" : "outline"}
            className={`text-sm sm:text-base ${
              listingType === "satilik"
                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                : "text-card-foreground hover:bg-muted"
            }`}
            onClick={() => onListingTypeChange("satilik")}
          >
            Satılık
          </Button>
          <Button
            variant={listingType === "kiralik" ? "default" : "outline"}
            className={`text-sm sm:text-base ${
              listingType === "kiralik"
                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                : "text-card-foreground hover:bg-muted"
            }`}
            onClick={() => onListingTypeChange("kiralik")}
          >
            Kiralık
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-card-foreground text-sm sm:text-base">
            Şehir
          </Label>
          <Select value={city} onValueChange={onCityChange}>
            <SelectTrigger id="city" className="text-card-foreground">
              <SelectValue placeholder="Tüm Şehirler" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Şehirler</SelectItem>
              {TURKISH_CITIES.map((cityName) => (
                <SelectItem key={cityName} value={cityName}>
                  {cityName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {propertyType === "konut" && (
          <div className="space-y-2">
            <Label htmlFor="propertyCategory" className="text-card-foreground text-sm sm:text-base">
              Emlak Tipi
            </Label>
            <Select value={propertyCategory} onValueChange={onPropertyCategoryChange}>
              <SelectTrigger id="propertyCategory" className="text-card-foreground">
                <SelectValue placeholder="Tümü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="daire">Daire</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="residence">Rezidans</SelectItem>
                <SelectItem value="mustakil-ev">Müstakil Ev</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {propertyType === "konut" && (
          <div className="space-y-2">
            <Label htmlFor="rooms" className="text-card-foreground text-sm sm:text-base">
              Oda Sayısı
            </Label>
            <Select value={rooms} onValueChange={onRoomsChange}>
              <SelectTrigger id="rooms" className="text-card-foreground">
                <SelectValue placeholder="Tümü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="1+0">1+0</SelectItem>
                <SelectItem value="1+1">1+1</SelectItem>
                <SelectItem value="2+0">2+0</SelectItem>
                <SelectItem value="2+1">2+1</SelectItem>
                <SelectItem value="2+2">2+2</SelectItem>
                <SelectItem value="3+0">3+0</SelectItem>
                <SelectItem value="3+1">3+1</SelectItem>
                <SelectItem value="3+2">3+2</SelectItem>
                <SelectItem value="3+3">3+3</SelectItem>
                <SelectItem value="4+1">4+1</SelectItem>
                <SelectItem value="4+2">4+2</SelectItem>
                <SelectItem value="4+3">4+3</SelectItem>
                <SelectItem value="5+">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-card-foreground text-sm sm:text-base">Fiyat Aralığı (₺)</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
              className="text-card-foreground text-sm"
            />
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              className="text-card-foreground text-sm"
            />
          </div>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label className="text-card-foreground text-sm sm:text-base">Metrekare (m²)</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min m²"
              value={minArea}
              onChange={(e) => onMinAreaChange(e.target.value)}
              className="text-card-foreground text-sm"
            />
            <Input
              type="number"
              placeholder="Max m²"
              value={maxArea}
              onChange={(e) => onMaxAreaChange(e.target.value)}
              className="text-card-foreground text-sm"
            />
          </div>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="sortBy" className="text-card-foreground text-sm sm:text-base">
            Sıralama
          </Label>
          <Select value={sortBy} onValueChange={onSortByChange}>
            <SelectTrigger id="sortBy" className="text-card-foreground">
              <SelectValue placeholder="Sıralama" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Varsayılan</SelectItem>
              <SelectItem value="price-high">Fiyat (Yüksek → Düşük)</SelectItem>
              <SelectItem value="price-low">Fiyat (Düşük → Yüksek)</SelectItem>
              <SelectItem value="area-high">Metrekare (Büyük → Küçük)</SelectItem>
              <SelectItem value="area-low">Metrekare (Küçük → Büyük)</SelectItem>
              <SelectItem value="date-new">En Yeni İlanlar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
