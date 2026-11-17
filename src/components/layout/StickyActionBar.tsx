import Link from "next/link";
import { site } from "@/config/site";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Icon } from "@/components/ui/Icon";

/** Mobile-only bottom bar: in this market phone and WhatsApp beat web forms. */
export function StickyActionBar({ locale, d }: { locale: Locale; d: Dictionary }) {
  const cell = "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-xs font-semibold";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-12px_rgb(15_30_61/0.25)] md:hidden">
      <div className="flex">
        <a href={site.hotline.href} className={`${cell} bg-alert-600 text-white`}>
          <Icon name="phone" className="size-5" strokeWidth={2} />
          {d.cta.call}
        </a>
        <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className={`${cell} bg-[#1f7a4d] text-white`}>
          <Icon name="message-circle" className="size-5" strokeWidth={2} />
          {d.cta.whatsapp}
        </a>
        <Link href={localePath(locale, "/quote")} className={`${cell} bg-navy-900 text-white`}>
          <Icon name="file-text" className="size-5" strokeWidth={2} />
          {d.cta.quote}
        </Link>
      </div>
    </div>
  );
}
