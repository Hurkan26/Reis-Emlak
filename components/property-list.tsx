"use client"

import { useState, useMemo, useEffect } from "react"
import PropertyCard from "./property-card"
import PropertyDetailDialog from "./property-detail-dialog"
import Filters from "./filters"
import { mockProperties } from "@/lib/mock-data"
import type { PropertyType, ListingType, Property, PropertyCategory } from "@/lib/types"

export default function PropertyList() {
  const [properties, setProperties] = useState(mockProperties)
  const [propertyType, setPropertyType] = useState<PropertyType | "all">("all")
  const [listingType, setListingType] = useState<ListingType | "all">("all")
  const [propertyCategory, setPropertyCategory] = useState<PropertyCategory | "all">("all")
  const [city, setCity] = useState("all")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [minArea, setMinArea] = useState("")
  const [maxArea, setMaxArea] = useState("")
  const [rooms, setRooms] = useState("all")
  const [district, setDistrict] = useState("")
  const [sortBy, setSortBy] = useState("default")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  useEffect(() => {
    const storedProperties = localStorage.getItem("properties")
    if (storedProperties) {
      setProperties(JSON.parse(storedProperties))
    }
  }, [])

  const filteredProperties = useMemo(() => {
    let filtered = properties.filter((property) => {
      if (property.status !== "aktif" && property.status !== "rezerve") return false
      if (propertyType !== "all" && property.type !== propertyType) return false
      if (listingType !== "all" && property.listingType !== listingType) return false
      if (propertyCategory !== "all" && property.category !== propertyCategory) return false
      if (city !== "all" && property.city !== city) return false
      if (minPrice && property.price < Number.parseFloat(minPrice)) return false
      if (maxPrice && property.price > Number.parseFloat(maxPrice)) return false
      if (minArea && property.area < Number.parseFloat(minArea)) return false
      if (maxArea && property.area > Number.parseFloat(maxArea)) return false
      if (rooms !== "all" && property.rooms !== rooms) return false
      if (district && !property.district.toLowerCase().includes(district.toLowerCase())) return false
      return true
    })

    switch (sortBy) {
      case "price-high":
        filtered = filtered.sort((a, b) => b.price - a.price)
        break
      case "price-low":
        filtered = filtered.sort((a, b) => a.price - b.price)
        break
      case "area-high":
        filtered = filtered.sort((a, b) => b.area - a.area)
        break
      case "area-low":
        filtered = filtered.sort((a, b) => a.area - b.area)
        break
      case "date-new":
        filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default:
        break
    }

    return filtered
  }, [
    properties,
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
  ])

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property)
    setShowDetailDialog(true)
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <Filters
          propertyType={propertyType}
          listingType={listingType}
          propertyCategory={propertyCategory}
          city={city}
          minPrice={minPrice}
          maxPrice={maxPrice}
          minArea={minArea}
          maxArea={maxArea}
          rooms={rooms}
          district={district}
          sortBy={sortBy}
          onPropertyTypeChange={setPropertyType}
          onListingTypeChange={setListingType}
          onPropertyCategoryChange={setPropertyCategory}
          onCityChange={setCity}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onMinAreaChange={setMinArea}
          onMaxAreaChange={setMaxArea}
          onRoomsChange={setRooms}
          onDistrictChange={setDistrict}
          onSortByChange={setSortBy}
        />

        <div className="grid gap-8 max-w-4xl mx-auto">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} onPropertyClick={handlePropertyClick} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Arama kriterlerinize uygun ilan bulunamadı.</p>
            </div>
          )}
        </div>
      </div>

      <PropertyDetailDialog property={selectedProperty} open={showDetailDialog} onOpenChange={setShowDetailDialog} />
    </section>
  )
}
