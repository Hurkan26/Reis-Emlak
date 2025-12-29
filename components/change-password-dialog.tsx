"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Key } from "lucide-react"

interface ChangePasswordDialogProps {
  open: boolean
  onOpenChange: (changed: boolean) => void
}

export default function ChangePasswordDialog({ open, onOpenChange }: ChangePasswordDialogProps) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const storedPassword = localStorage.getItem("adminPassword") || "admin123"

    if (currentPassword !== storedPassword) {
      alert("Mevcut şifre hatalı!")
      return
    }

    if (newPassword !== confirmPassword) {
      alert("Yeni şifreler eşleşmiyor!")
      return
    }

    if (newPassword.length < 6) {
      alert("Şifre en az 6 karakter olmalıdır!")
      return
    }

    localStorage.setItem("adminPassword", newPassword)
    alert("Şifreniz başarıyla değiştirildi!")
    onOpenChange(true)
  }

  const handleSkip = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={() => onOpenChange(false)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
              <Key className="h-6 w-6 text-accent-foreground" />
            </div>
            <DialogTitle className="text-2xl">Şifre Değiştir</DialogTitle>
          </div>
          <DialogDescription>Güvenliğiniz için şifrenizi değiştirmek ister misiniz?</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current">Mevcut Şifre</Label>
            <Input
              id="current"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new">Yeni Şifre</Label>
            <Input
              id="new"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Yeni Şifre (Tekrar)</Label>
            <Input
              id="confirm"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
              Değiştir
            </Button>
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={handleSkip}>
              Şimdi Değil
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
