"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface MapPickerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLocationSelect: (lat: number, lng: number) => void
  initialLat?: number
  initialLng?: number
}

export default function MapPickerDialog({
  open,
  onOpenChange,
  onLocationSelect,
  initialLat = 39.7767,
  initialLng = 30.5206,
}: MapPickerDialogProps) {
  const [selectedLat, setSelectedLat] = useState(initialLat)
  const [selectedLng, setSelectedLng] = useState(initialLng)

  useEffect(() => {
    if (open) {
      setSelectedLat(initialLat)
      setSelectedLng(initialLng)
    }
  }, [open, initialLat, initialLng])

  const handleConfirm = () => {
    onLocationSelect(selectedLat, selectedLng)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-accent" />
            Harita Konumu Seç
          </DialogTitle>
          <DialogDescription>
            Google Maps'te haritayı gezin, doğru konuma sağ tıklayıp koordinatları kopyalayın ve aşağıya yapıştırın.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <iframe
              src={`https://www.google.com/maps?q=${selectedLat},${selectedLng}&z=15&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Enlem (Latitude)</label>
              <input
                type="number"
                step="any"
                value={selectedLat}
                onChange={(e) => setSelectedLat(Number.parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="39.7767"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Boylam (Longitude)</label>
              <input
                type="number"
                step="any"
                value={selectedLng}
                onChange={(e) => setSelectedLng(Number.parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="30.5206"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleConfirm} className="flex-1 bg-accent hover:bg-accent/90">
              Konumu Onayla
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              İptal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
