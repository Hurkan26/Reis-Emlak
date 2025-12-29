export type PropertyType = "konut" | "arsa"
export type ListingType = "satilik" | "kiralik"
export type PropertyCategory = "daire" | "villa" | "residence" | "mustakil-ev" | "arsa"
export type PropertyStatus = "aktif" | "satildi" | "kiralandi" | "rezerve"
export type Currency = "TRY" | "USD" | "EUR"

export interface Property {
  id: number
  title: string
  images: string[]
  videos?: string[]
  type: PropertyType
  listingType: ListingType
  category?: PropertyCategory
  rooms?: string
  area: number
  price: number
  currency?: Currency
  address: string
  city: string
  district: string
  features: string[]
  description: string
  createdAt: string
  status: PropertyStatus
  floor?: string
  buildingAge?: number
  contactPhone?: string
  location?: {
    lat: number
    lng: number
  }
}

export interface FooterSettings {
  companyName: string
  tagline: string
  description: string
  address: string
  phone: string
  email: string
  weekdayHours: string
  saturdayHours: string
  sundayHours: string
  whatsappNumber: string
}

export interface Offer {
  id: number
  propertyId: number
  propertyTitle: string
  propertyAddress: string
  customerName: string
  customerPhone: string
  customerEmail: string
  message: string
  offerAmount?: number
  currency?: Currency
  createdAt: string
  status: "yeni" | "okundu" | "yanitlandi"
}
