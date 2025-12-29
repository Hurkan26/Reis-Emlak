"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { FooterSettings } from "@/lib/types"

interface FooterSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  settings: FooterSettings
  onSave: (settings: FooterSettings) => void
}

export default function FooterSettingsDialog({ open, onOpenChange, settings, onSave }: FooterSettingsDialogProps) {
  const [formData, setFormData] = useState<FooterSettings>(settings)

  useEffect(() => {
    setFormData(settings)
  }, [settings, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Footer Ayarları</DialogTitle>
          <DialogDescription>Site altbilgi ve WhatsApp ayarlarını düzenleyin.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Şirket Adı</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Slogan</Label>
            <Input
              id="tagline"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Açıklama</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Adres</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={2}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+90 222 123 45 67"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsappNumber">WhatsApp Numarası</Label>
            <Input
              id="whatsappNumber"
              value={formData.whatsappNumber || formData.phone}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              placeholder="+905551234567"
              required
            />
            <p className="text-xs text-muted-foreground">
              WhatsApp butonu bu numarayı kullanacak (ülke kodu ile birlikte, örnek: +905551234567)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weekdayHours">Hafta İçi Saatleri</Label>
            <Input
              id="weekdayHours"
              value={formData.weekdayHours}
              onChange={(e) => setFormData({ ...formData, weekdayHours: e.target.value })}
              placeholder="09:00 - 18:00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="saturdayHours">Cumartesi Saatleri</Label>
            <Input
              id="saturdayHours"
              value={formData.saturdayHours}
              onChange={(e) => setFormData({ ...formData, saturdayHours: e.target.value })}
              placeholder="09:00 - 15:00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sundayHours">Pazar Saatleri</Label>
            <Input
              id="sundayHours"
              value={formData.sundayHours}
              onChange={(e) => setFormData({ ...formData, sundayHours: e.target.value })}
              placeholder="Kapalı"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90">
              Kaydet
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
  )
}
