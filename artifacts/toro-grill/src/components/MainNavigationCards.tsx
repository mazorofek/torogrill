import {
  CalendarCheck,
  ClipboardList,
  PartyPopper,
  Truck,
  Utensils,
} from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

type MainNavigationCardsProps = {
  onDeliveryClick: () => void;
  onLunchClick: () => void;
};

export function MainNavigationCards({
  onDeliveryClick,
  onLunchClick,
}: MainNavigationCardsProps) {
  const { dir, t } = useI18n();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const cards = [
    {
      icon: ClipboardList,
      title: t.quickNav.menu.title,
      text: t.quickNav.menu.text,
      action: () => scrollToSection("menu"),
      testId: "quick-nav-menu",
    },
    {
      icon: Utensils,
      title: t.quickNav.lunch.title,
      text: t.quickNav.lunch.text,
      action: onLunchClick,
      testId: "quick-nav-lunch",
    },
    {
      icon: PartyPopper,
      title: t.quickNav.events.title,
      text: t.quickNav.events.text,
      action: () => scrollToSection("events"),
      testId: "quick-nav-events",
    },
  ];

  return (
    <section className="bg-[#050505] border-y border-white/8 py-8">
      <div className="container mx-auto max-w-6xl px-4" dir={dir}>
        <div className="grid gap-3 md:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.testId}
                type="button"
                onClick={card.action}
                data-testid={card.testId}
                className="group min-h-28 border border-white/10 bg-white/[0.025] p-4 text-start transition-colors hover:border-primary/70 hover:bg-primary/10"
              >
                <span className="mb-3 flex size-10 items-center justify-center bg-primary text-white">
                  <Icon size={20} />
                </span>
                <span className="block text-lg font-bold text-white">
                  {card.title}
                </span>
                <span className="mt-1 block text-sm leading-6 text-white/55">
                  {card.text}
                </span>
              </button>
            );
          })}

          <div className="min-h-28 border border-primary/35 bg-primary/10 p-4">
            <span className="mb-3 flex size-10 items-center justify-center bg-white text-primary">
              <Truck size={20} />
            </span>
            <span className="block text-lg font-bold text-white">
              {t.quickNav.orders.title}
            </span>
            <span className="mt-1 block text-sm leading-6 text-white/55">
              {t.quickNav.orders.text}
            </span>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onDeliveryClick}
                data-testid="quick-nav-delivery"
                className="h-10 bg-primary px-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                {t.quickNav.orders.delivery}
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                data-testid="quick-nav-table"
                className="flex h-10 items-center justify-center gap-1 border border-white/18 px-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                <CalendarCheck size={15} />
                {t.quickNav.orders.table}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
