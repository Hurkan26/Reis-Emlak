"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShieldCheck, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import ChangePasswordDialog from "./change-password-dialog"

interface AdminLoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AdminLoginDialog({ open, onOpenChange }: AdminLoginDialogProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const storedPassword = localStorage.getItem("adminPassword") || "admin123"

    if (username === "admin" && password === storedPassword) {
      localStorage.setItem("isAdmin", "true")
      onOpenChange(false)
      setShowChangePassword(true)
    } else {
      alert("Hatalı kullanıcı adı veya şifre!")
    }
  }

  const handlePasswordChangeComplete = (changed: boolean) => {
    setShowChangePassword(false)
    if (changed) {
      alert("Şifreniz başarıyla değiştirildi!")
    }
    router.push("/admin")
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <ShieldCheck className="h-6 w-6 text-accent-foreground" />
              </div>
              <DialogTitle className="text-2xl">Yönetici Girişi</DialogTitle>
            </div>
            <DialogDescription>Yönetici paneline erişim için giriş yapın.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Kullanıcı Adı</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Giriş Yap
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <ChangePasswordDialog open={showChangePassword} onOpenChange={handlePasswordChangeComplete} />
    </>
  )
}
