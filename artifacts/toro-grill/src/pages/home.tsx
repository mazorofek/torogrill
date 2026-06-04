import { useState } from "react";
import { DeliveryOptionsModal } from "@/components/DeliveryOptionsModal";
import { LunchDealsModal } from "@/components/LunchDealsModal";
import { MainNavigationCards } from "@/components/MainNavigationCards";
import { AboutSection } from "@/components/AboutSection";
import { Hero } from "@/components/Hero";
import { StickyOrderBar } from "@/components/StickyOrderBar";
import { MenuSection } from "@/components/MenuSection";
import { EventsSection } from "@/components/EventsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/i18n/I18nProvider";

export default function Home() {
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isLunchOpen, setIsLunchOpen] = useState(false);
  const { dir } = useI18n();

  return (
    <div
      className="flex flex-col min-h-screen bg-background font-sans text-foreground"
      dir={dir}
    >
      <Hero onDeliveryClick={() => setIsDeliveryOpen(true)} />
      <MainNavigationCards
        onDeliveryClick={() => setIsDeliveryOpen(true)}
        onLunchClick={() => setIsLunchOpen(true)}
      />
      <AboutSection />
      <MenuSection onLunchClick={() => setIsLunchOpen(true)} />
      <EventsSection />
      <ContactSection />
      <Footer />
      <StickyOrderBar onDeliveryClick={() => setIsDeliveryOpen(true)} />
      <DeliveryOptionsModal
        isOpen={isDeliveryOpen}
        onClose={() => setIsDeliveryOpen(false)}
      />
      <LunchDealsModal
        isOpen={isLunchOpen}
        onClose={() => setIsLunchOpen(false)}
      />
    </div>
  );
}
