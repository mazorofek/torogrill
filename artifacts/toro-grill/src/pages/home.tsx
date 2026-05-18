import { Hero } from "@/components/Hero";
import { StickyOrderBar } from "@/components/StickyOrderBar";
import { MenuSection } from "@/components/MenuSection";
import { EventsSection } from "@/components/EventsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-foreground">
      <Hero />
      <MenuSection />
      <EventsSection />
      <ContactSection />
      <Footer />
      <StickyOrderBar />
    </div>
  );
}