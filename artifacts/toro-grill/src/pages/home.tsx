import { useState } from "react";
import { DeliveryOptionsModal } from "@/components/DeliveryOptionsModal";
import { AboutSection } from "@/components/AboutSection";
import { Hero } from "@/components/Hero";
import { StickyOrderBar } from "@/components/StickyOrderBar";
import { MenuSection } from "@/components/MenuSection";
import { EventsSection } from "@/components/EventsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-foreground">
      <Hero onDeliveryClick={() => setIsDeliveryOpen(true)} />
      <AboutSection />
      <MenuSection />
      <EventsSection />
      <ContactSection />
      <Footer />
      <StickyOrderBar onDeliveryClick={() => setIsDeliveryOpen(true)} />
      <DeliveryOptionsModal
        isOpen={isDeliveryOpen}
        onClose={() => setIsDeliveryOpen(false)}
      />
    </div>
  );
}
