import Link from "next/link";
import { site } from "@/config/site";
import { mainNav } from "@/data/catalog";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "@/components/ui/LogoMark";
import { MobileNav, NavLinks } from "./NavLinks";

export function Header({ locale, d }: { locale: Locale; d: Dictionary }) {
  const items = mainNav.map((n) => ({ href: localePath(locale, n.path), label: d.nav[n.key] }));
  const quote = localePath(locale, "/quote");

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <Container className="relative flex h-[4.5rem] items-center justify-between gap-4">
        <Link href={localePath(locale)} className="flex min-w-0 items-center gap-3">
          <LogoMark className="size-10 shrink-0 sm:size-11" />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[1.05rem] font-bold text-navy-900">{d.brand.name}</span>
            <span className="block truncate text-xs text-ink-500">{d.brand.tagline}</span>
          </span>
        </Link>

        <NavLinks items={items} ariaLabel={d.a11y.mainNav} />

        <div className="flex shrink-0 items-center gap-3">
          <a
            href={site.hotline.href}
            className="hidden items-center gap-2.5 rounded-lg px-2 py-1 text-left xl:flex"
          >
            <span className="grid size-10 place-items-center rounded-full bg-alert-50 text-alert-600">
              <Icon name="phone-call" className="size-5" strokeWidth={2} />
            </span>
            <span className="leading-tight">
              <span className="block text-xs text-ink-500">{d.cta.hotline}</span>
              <span className="block text-lg font-bold text-alert-600">{site.hotline.display}</span>
            </span>
          </a>
          <span className="hidden sm:block">
            <ButtonLink href={quote} iconRight="arrow-right">
              {d.cta.quote}
            </ButtonLink>
          </span>
          <MobileNav
            items={items}
            labels={{ open: d.a11y.menuOpen, close: d.a11y.menuClose, nav: d.a11y.mainNav }}
            extra={
              <>
                <ButtonLink href={quote} size="lg" iconRight="arrow-right">
                  {d.cta.quote}
                </ButtonLink>
                <ButtonLink href={site.hotline.href} size="lg" variant="alert" icon="phone">
                  {d.cta.hotline}: {site.hotline.display}
                </ButtonLink>
              </>
            }
          />
        </div>
      </Container>
    </header>
  );
}
