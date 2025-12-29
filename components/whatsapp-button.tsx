"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WhatsAppButton() {
  const [phoneNumber, setPhoneNumber] = useState("905551234567")

  useEffect(() => {
    const stored = localStorage.getItem("footerSettings")
    if (stored) {
      const settings = JSON.parse(stored)
      const cleanPhone = (settings.whatsappNumber || settings.phone).replace(/[^0-9]/g, "")
      setPhoneNumber(cleanPhone)
    }

    // Listen for storage changes to update phone number in real-time
    const handleStorageChange = () => {
      const stored = localStorage.getItem("footerSettings")
      if (stored) {
        const settings = JSON.parse(stored)
        const cleanPhone = (settings.whatsappNumber || settings.phone).replace(/[^0-9]/g, "")
        setPhoneNumber(cleanPhone)
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Merhaba, emlak ilanları hakkında bilgi almak istiyorum.")
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-2xl z-40"
      size="icon"
      aria-label="WhatsApp ile iletişime geç"
    >
      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
    </Button>
  )
}
