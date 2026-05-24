import { ExternalLink, X } from "lucide-react";
import { deliveryOptions } from "@/data/delivery";
import { useI18n } from "@/i18n/I18nProvider";

type DeliveryOptionsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function DeliveryOptionsModal({
  isOpen,
  onClose,
}: DeliveryOptionsModalProps) {
  const { dir, locale, t } = useI18n();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delivery-options-title"
      dir={dir}
      data-testid="delivery-options-modal"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label={t.delivery.closeOverlay}
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm border border-primary/45 bg-[#070707] p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-4 flex h-9 w-9 items-center justify-center border border-white/15 text-white/65 transition-colors hover:border-primary hover:text-white ${
            dir === "rtl" ? "left-4" : "right-4"
          }`}
          aria-label={t.delivery.close}
          data-testid="button-close-delivery-options"
        >
          <X size={18} />
        </button>

        <h2
          id="delivery-options-title"
          className="mb-2 text-2xl font-serif text-white"
        >
          {t.delivery.title}
        </h2>
        <p className="mb-6 text-sm text-white/50">{t.delivery.subtitle}</p>

        <div className="space-y-3">
          {deliveryOptions.map((option) => (
            <a
              key={option.id}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-between border border-white/12 bg-white/[0.03] px-4 text-lg font-medium text-white transition-colors hover:border-primary hover:bg-primary"
              data-testid={`delivery-option-${option.id}`}
            >
              <span>{option.name[locale]}</span>
              <ExternalLink size={18} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
