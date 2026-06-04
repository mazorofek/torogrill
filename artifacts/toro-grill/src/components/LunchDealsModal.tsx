import { Check, Clock, Flame, UtensilsCrossed, X } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

type LunchDealsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LunchDealsModal({ isOpen, onClose }: LunchDealsModalProps) {
  const { dir, t } = useI18n();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[75] flex items-start justify-center overflow-y-auto bg-black/80 px-3 py-4 backdrop-blur-sm sm:items-center sm:px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lunch-deals-title"
      dir={dir}
      data-testid="lunch-deals-modal"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label={t.lunchDeals.closeOverlay}
        onClick={onClose}
      />
      <div className="relative max-h-[calc(100dvh-2rem)] w-full max-w-3xl overflow-y-auto border border-primary/45 bg-[#070707] p-4 shadow-2xl sm:p-5 md:p-8">
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-4 flex h-9 w-9 items-center justify-center border border-white/15 text-white/65 transition-colors hover:border-primary hover:text-white ${
            dir === "rtl" ? "left-4" : "right-4"
          }`}
          aria-label={t.lunchDeals.close}
          data-testid="button-close-lunch-deals"
        >
          <X size={18} />
        </button>

        <div className="mb-4 max-w-xl pr-10 md:mb-6 md:pr-0">
          <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-primary">
            <Clock size={16} />
            {t.lunchDeals.kicker}
          </p>
          <h2
            id="lunch-deals-title"
            className="text-2xl font-serif font-bold text-white md:text-4xl"
          >
            {t.lunchDeals.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/60 md:mt-3 md:text-base md:leading-7">
            {t.lunchDeals.description}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          {t.lunchDeals.deals.map((deal) => (
            <article
              key={deal.price}
              className="relative overflow-hidden border border-white/12 bg-gradient-to-b from-white/[0.06] to-white/[0.025] p-3 sm:p-4 md:p-5"
            >
              <div className="relative mb-3 flex items-start justify-between gap-3 md:mb-4 md:gap-4">
                <div>
                  <p className="mb-2 inline-flex items-center gap-1.5 border border-primary/35 bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary md:px-2.5 md:py-1">
                    <Flame size={14} />
                    {deal.badge}
                  </p>
                  <h3 className="text-lg font-bold text-white md:text-xl">
                    {deal.title}
                  </h3>
                </div>
                <span className="shrink-0 text-2xl font-black text-primary md:text-3xl">
                  {deal.price}
                </span>
              </div>
              <p className="relative hidden text-sm leading-6 text-white/72 sm:block md:min-h-14 md:text-base md:leading-7">
                {deal.description}
              </p>
              <div className="relative mt-3 border-t border-white/10 pt-3 md:mt-4 md:pt-4">
                <p className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-white/80 md:mb-2">
                  <UtensilsCrossed size={16} className="text-primary" />
                  {t.lunchDeals.includesTitle}
                </p>
                <ul className="grid gap-1 text-xs leading-4 text-white/62 sm:gap-1.5 sm:text-sm sm:leading-5 md:gap-2 md:leading-6">
                  {deal.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check size={14} className="shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
