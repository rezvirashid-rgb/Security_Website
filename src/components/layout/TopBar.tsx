import { site } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { LangSwitcher } from "./LangSwitcher";
import { TodayDate } from "./TodayDate";

export function TopBar({ locale, d }: { locale: Locale; d: Dictionary }) {
  return (
    <div className="bg-navy-950 text-[0.8rem] text-white/80">
      <Container className="flex min-h-10 items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <a href={site.hotline.href} className="flex items-center gap-1.5 font-semibold text-white md:hidden">
            <Icon name="phone" className="size-3.5 text-gold-400" strokeWidth={2} />
            {d.cta.hotline}: {site.hotline.display}
          </a>
          <span className="hidden items-center gap-1.5 md:flex">
            <Icon name="clock" className="size-3.5 text-gold-400" />
            {d.topbar.hours}
          </span>
          <span className="hidden items-center gap-1.5 md:flex">
            <span className="size-1.5 rounded-full bg-brand-400" aria-hidden="true" />
            {d.topbar.ops}
          </span>
          <a href={`mailto:${site.email}`} className="hidden items-center gap-1.5 hover:text-white lg:flex">
            <Icon name="mail" className="size-3.5 text-gold-400" />
            {site.email}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden xl:inline">
            <TodayDate locale={locale} />
          </span>
          <LangSwitcher current={locale} labels={d.lang} ariaLabel={d.a11y.langLabel} />
        </div>
      </Container>
    </div>
  );
}
