"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Building2, ShieldCheck, LogOut } from "lucide-react"
import AdminLoginDialog from "./admin-login-dialog"
import Link from "next/link"

export default function Header() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)

    const adminStatus = localStorage.getItem("isAdmin")
    setIsAdmin(adminStatus === "true")

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleAdminClick = () => {
    if (isAdmin) {
      router.push("/admin")
    } else {
      setShowAdminLogin(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isAdmin")
    setIsAdmin(false)
    router.push("/")
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-primary shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-accent">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-bold text-primary-foreground">Reis Emlak</h1>
                <p className="text-[10px] sm:text-xs text-primary-foreground/80">Güvenle evinizi alın</p>
              </div>
            </Link>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground text-xs sm:text-sm"
                onClick={handleAdminClick}
              >
                <ShieldCheck className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Yönetici</span>
              </Button>
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground text-xs sm:text-sm"
                  onClick={handleLogout}
                >
                  <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      <AdminLoginDialog open={showAdminLogin} onOpenChange={setShowAdminLogin} />
    </>
  )
}
