"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Home, LogOut, Pencil, Trash2, Key, Settings, Mail } from "lucide-react"
import { mockProperties } from "@/lib/mock-data"
import type { Property, FooterSettings, Offer } from "@/lib/types"
import PropertyFormDialog from "@/components/property-form-dialog"
import ChangePasswordDialog from "@/components/change-password-dialog"
import FooterSettingsDialog from "@/components/footer-settings-dialog"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const DEFAULT_FOOTER_SETTINGS: FooterSettings = {
  companyName: "Reis Emlak",
  tagline: "Güvenle evinizi alın",
  description: "Eskişehir'in güvenilir emlak danışmanı. Hayalinizdeki evi bulmak için buradayız.",
  address: "Arifiye, Süleyman Çakır Cd. No:14 D:2\n26000 Tepebaşı/Eskişehir",
  phone: "+90 222 123 45 67",
  email: "info@reisemlak.com",
  weekdayHours: "09:00 - 18:00",
  saturdayHours: "09:00 - 15:00",
  sundayHours: "Kapalı",
  whatsappNumber: "+905551234567",
}

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [properties, setProperties] = useState<Property[]>([])
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showFooterSettings, setShowFooterSettings] = useState(false)
  const [footerSettings, setFooterSettings] = useState<FooterSettings>(DEFAULT_FOOTER_SETTINGS)
  const [offers, setOffers] = useState<Offer[]>([]) // Added offers state

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin")
    if (isAdmin !== "true") {
      router.push("/")
    } else {
      setIsAuthenticated(true)
    }

    const storedProperties = localStorage.getItem("properties")
    if (storedProperties) {
      setProperties(JSON.parse(storedProperties))
    } else {
      setProperties(mockProperties)
      localStorage.setItem("properties", JSON.stringify(mockProperties))
    }

    const stored = localStorage.getItem("footerSettings")
    if (stored) {
      setFooterSettings(JSON.parse(stored))
    }

    const storedOffers = localStorage.getItem("offers")
    if (storedOffers) {
      setOffers(JSON.parse(storedOffers))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAdmin")
    router.push("/")
  }

  const handleDelete = (id: number) => {
    if (confirm("Bu ilanı silmek istediğinizden emin misiniz?")) {
      const updatedProperties = properties.filter((p) => p.id !== id)
      setProperties(updatedProperties)
      localStorage.setItem("properties", JSON.stringify(updatedProperties))
    }
  }

  const handleEdit = (property: Property) => {
    setEditingProperty(property)
    setShowForm(true)
  }

  const handleAdd = () => {
    setEditingProperty(null)
    setShowForm(true)
  }

  const handleSave = (property: Property) => {
    let updatedProperties: Property[]
    if (editingProperty) {
      updatedProperties = properties.map((p) => (p.id === property.id ? property : p))
    } else {
      updatedProperties = [...properties, { ...property, id: Date.now() }]
    }
    setProperties(updatedProperties)
    localStorage.setItem("properties", JSON.stringify(updatedProperties))
    setShowForm(false)
    setEditingProperty(null)
  }

  const handleFooterSave = (settings: FooterSettings) => {
    localStorage.setItem("footerSettings", JSON.stringify(settings))
    setFooterSettings(settings)
    alert("Footer ayarları kaydedildi!")
  }

  const handleMarkOfferRead = (offerId: number) => {
    const updatedOffers = offers.map((offer) =>
      offer.id === offerId ? { ...offer, status: "okundu" as const } : offer,
    )
    setOffers(updatedOffers)
    localStorage.setItem("offers", JSON.stringify(updatedOffers))
  }

  const handleDeleteOffer = (offerId: number) => {
    if (confirm("Bu teklifi silmek istediğinizden emin misiniz?")) {
      const updatedOffers = offers.filter((o) => o.id !== offerId)
      setOffers(updatedOffers)
      localStorage.setItem("offers", JSON.stringify(updatedOffers))
    }
  }

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

  const unreadOffersCount = offers.filter((o) => o.status === "yeni").length

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <Home className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary-foreground">Reis Emlak - Yönetici Paneli</h1>
                <p className="text-xs text-primary-foreground/80">İlan yönetimi</p>
              </div>
            </Link>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/10 text-xs sm:text-sm"
                onClick={() => setShowFooterSettings(true)}
              >
                <Settings className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Footer Ayarları</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/10 text-xs sm:text-sm"
                onClick={() => setShowPasswordDialog(true)}
              >
                <Key className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Şifre Değiştir</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/10 text-xs sm:text-sm"
                onClick={handleLogout}
              >
                <LogOut className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Çıkış</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="properties" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="properties">İlanlar ({properties.length})</TabsTrigger>
            <TabsTrigger value="offers" className="relative">
              Teklifler ({offers.length})
              {unreadOffersCount > 0 && (
                <Badge className="ml-2 bg-red-500 text-white px-1.5 py-0.5 text-xs">{unreadOffersCount}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <h2 className="text-2xl font-bold">İlanlar</h2>
              <Button onClick={handleAdd} className="bg-accent hover:bg-accent/90">
                <Plus className="mr-2 h-4 w-4" />
                Yeni İlan Ekle
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={property.images[0] || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className={`absolute top-2 right-2 ${getStatusColor(property.status)} text-white`}>
                      {getStatusText(property.status)}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{property.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{property.address}</p>
                    <p className="text-xl font-bold text-primary mb-4">₺{property.price.toLocaleString("tr-TR")}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => handleEdit(property)}
                      >
                        <Pencil className="mr-1 h-4 w-4" />
                        Düzenle
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleDelete(property.id)}
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Sil
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="offers">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Gelen Teklifler</h2>

              {offers.length === 0 ? (
                <Card className="p-8 text-center">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Henüz teklif bulunmuyor</p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {offers
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((offer) => (
                      <Card key={offer.id} className={`p-6 ${offer.status === "yeni" ? "border-accent border-2" : ""}`}>
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold text-lg">{offer.customerName}</h3>
                              {offer.status === "yeni" && (
                                <Badge className="bg-accent text-accent-foreground">Yeni</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(offer.createdAt).toLocaleString("tr-TR")}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteOffer(offer.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">İlan</p>
                            <p className="font-semibold">{offer.propertyTitle}</p>
                            <p className="text-sm text-muted-foreground">{offer.propertyAddress}</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Telefon</p>
                              <a href={`tel:${offer.customerPhone}`} className="text-accent hover:underline">
                                {offer.customerPhone}
                              </a>
                            </div>
                            {offer.customerEmail && (
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">E-posta</p>
                                <a href={`mailto:${offer.customerEmail}`} className="text-accent hover:underline">
                                  {offer.customerEmail}
                                </a>
                              </div>
                            )}
                          </div>

                          {offer.offerAmount && (
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Teklif Tutarı</p>
                              <p className="text-xl font-bold text-primary">
                                ₺{offer.offerAmount.toLocaleString("tr-TR")}
                              </p>
                            </div>
                          )}

                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Mesaj</p>
                            <p className="text-foreground whitespace-pre-line bg-muted p-3 rounded-lg">
                              {offer.message}
                            </p>
                          </div>
                        </div>

                        {offer.status === "yeni" && (
                          <Button
                            onClick={() => handleMarkOfferRead(offer.id)}
                            variant="outline"
                            size="sm"
                            className="bg-transparent"
                          >
                            Okundu Olarak İşaretle
                          </Button>
                        )}
                      </Card>
                    ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <PropertyFormDialog open={showForm} onOpenChange={setShowForm} property={editingProperty} onSave={handleSave} />
      <ChangePasswordDialog open={showPasswordDialog} onOpenChange={(changed) => setShowPasswordDialog(false)} />
      <FooterSettingsDialog
        open={showFooterSettings}
        onOpenChange={setShowFooterSettings}
        settings={footerSettings}
        onSave={handleFooterSave}
      />
    </div>
  )
}
