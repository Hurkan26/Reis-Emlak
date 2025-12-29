"use client"

import { useEffect, useState } from "react"
import { Building2, MapPin, Phone, Mail } from "lucide-react"
import type { FooterSettings } from "@/lib/types"

const DEFAULT_SETTINGS: FooterSettings = {
  companyName: "Reis Emlak",
  tagline: "Güvenle evinizi alın",
  description: "Eskişehir'in güvenilir emlak danışmanı. Hayalinizdeki evi bulmak için buradayız.",
  address: "Arifiye, Süleyman Çakır Cd. No:14 D:2\n26000 Tepebaşı/Eskişehir",
  phone: "+90 222 123 45 67",
  email: "info@reisemlak.com",
  weekdayHours: "09:00 - 18:00",
  saturdayHours: "09:00 - 15:00",
  sundayHours: "Kapalı",
}

export default function Footer() {
  const [settings, setSettings] = useState<FooterSettings>(DEFAULT_SETTINGS)

  useEffect(() => {
    const stored = localStorage.getItem("footerSettings")
    if (stored) {
      setSettings(JSON.parse(stored))
    }
  }, [])

  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <Building2 className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{settings.companyName}</h3>
                <p className="text-sm text-primary-foreground/80">{settings.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/90 leading-relaxed">{settings.description}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-foreground">İletişim</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm text-primary-foreground/90 leading-relaxed whitespace-pre-line">
                  {settings.address}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="text-sm text-primary-foreground/90 hover:text-accent transition-colors"
                >
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="text-sm text-primary-foreground/90 hover:text-accent transition-colors"
                >
                  {settings.email}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-foreground">Çalışma Saatleri</h4>
            <div className="space-y-2 text-sm text-primary-foreground/90">
              <p>Pazartesi - Cuma: {settings.weekdayHours}</p>
              <p>Cumartesi: {settings.saturdayHours}</p>
              <p>Pazar: {settings.sundayHours}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-sm text-primary-foreground/80">
            © {new Date().getFullYear()} {settings.companyName}. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}
