"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send } from "lucide-react"
import type { Currency } from "@/lib/types"

interface OfferDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  propertyId: number
  propertyTitle: string
  propertyAddress: string
  propertyCurrency: Currency
}

export default function OfferDialog({
  open,
  onOpenChange,
  propertyId,
  propertyTitle,
  propertyAddress,
  propertyCurrency,
}: OfferDialogProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [offerAmount, setOfferAmount] = useState("")
  const [currency, setCurrency] = useState<Currency>(propertyCurrency)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const offer = {
      id: Date.now(),
      propertyId,
      propertyTitle,
      propertyAddress,
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      message,
      offerAmount: offerAmount ? Number.parseInt(offerAmount) : undefined,
      currency, // Include currency in offer
      createdAt: new Date().toISOString(),
      status: "yeni" as const,
    }

    const existingOffers = JSON.parse(localStorage.getItem("offers") || "[]")
    localStorage.setItem("offers", JSON.stringify([...existingOffers, offer]))

    alert("Teklifiniz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.")
    onOpenChange(false)
    setName("")
    setPhone("")
    setEmail("")
    setMessage("")
    setOfferAmount("")
    setCurrency("TRY")
  }

  const getCurrencySymbol = (curr: Currency) => {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">Teklif Ver</DialogTitle>
          <DialogDescription>{propertyTitle} için teklifinizi gönderin</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ad Soyad *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Adınız ve soyadınız"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0555 123 45 67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              type="email"
              placeholder="ornek@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="offerAmount">Teklif Tutarı</Label>
            <div className="flex gap-2">
              <Input
                id="offerAmount"
                type="number"
                placeholder="Teklif tutarı"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                className="flex-1"
              />
              <Select value={currency} onValueChange={(value: Currency) => setCurrency(value)}>
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
          <div className="space-y-2">
            <Label htmlFor="message">Mesajınız *</Label>
            <Textarea
              id="message"
              placeholder="Teklifinizi veya sorularınızı buraya yazın..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
            <Send className="mr-2 h-4 w-4" />
            Teklif Gönder
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
