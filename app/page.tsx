import Header from "@/components/header"
import Hero from "@/components/hero"
import PropertyList from "@/components/property-list"
import WhatsAppButton from "@/components/whatsapp-button"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <PropertyList />
      <WhatsAppButton />
      <Footer />
    </div>
  )
}
