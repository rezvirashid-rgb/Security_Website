import Link from "next/link";
import { site } from "@/config/site";
import { services } from "@/data/catalog";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localDigits } from "@/i18n/format";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "@/components/ui/LogoMark";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { LicenceBlock } from "./LicenceBlock";

export function Footer({ locale, d }: { locale: Locale; d: Dictionary }) {
  const p = (path: string) => localePath(locale, path);
  const company = [
    { href: p("/about"), label: d.nav.about },
    { href: p("/training"), label: d.nav.training },
    { href: p("/clients"), label: d.footer.clients },
    { href: p("/coverage"), label: d.footer.coverage },
    { href: p("/careers"), label: d.nav.careers },
    { href: p("/news"), label: d.footer.news },
    { href: p("/faq"), label: d.footer.faq },
  ];
  const linkClass = "text-white/70 transition-colors hover:text-white";

  return (
    <footer className="relative isolate overflow-hidden bg-navy-950 pb-20 text-white md:pb-0">
      <div className="bg-jamdani absolute inset-0 -z-10 opacity-[0.05]" />
      <Container className="grid gap-10 py-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <LogoMark className="size-11" />
            <span className="leading-tight">
              <span className="block font-bold">{d.brand.name}</span>
              <span className="block text-xs text-white/60">{d.brand.tagline}</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-white/70">{d.footer.about}</p>
          <div className="mt-6">
            <LicenceBlock d={d} />
          </div>
        </div>

        <nav aria-label={d.footer.services} className="lg:col-span-3">
          <h2 className="mb-4 text-base text-gold-300">{d.footer.services}</h2>
          <ul className="grid gap-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={p(`/services/${s.slug}`)} className={linkClass}>
                  {d.services.items[s.slug].title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={d.footer.company} className="lg:col-span-2">
          <h2 className="mb-4 text-base text-gold-300">{d.footer.company}</h2>
          <ul className="grid gap-2.5 text-sm">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="mb-4 text-base text-gold-300">{d.footer.contact}</h2>
          <ul className="grid gap-3 text-sm text-white/80">
            <li className="flex gap-2.5">
              <Icon name="map-pin" className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <span>{d.footer.address}</span>
            </li>
            <li>
              <a href={site.hotline.href} className="flex items-center gap-2.5 font-semibold text-white">
                <Icon name="phone" className="size-4 text-gold-400" />
                {d.cta.hotline}: {site.hotline.display}
              </a>
            </li>
            <li>
              <a href={site.mobile.href} className="flex items-center gap-2.5 hover:text-white">
                <Icon name="phone" className="size-4 text-gold-400" />
                {site.mobile.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-white">
                <Icon name="mail" className="size-4 text-gold-400" />
                {site.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <span>
                {d.topbar.hours}
                <br />
                {d.topbar.ops}
              </span>
            </li>
          </ul>
          <div className="mt-5">
            <SocialLinks />
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {d.footer.copyright
              .replace("{year}", localDigits(site.copyrightYear, locale))
              .replace("{name}", `${d.brand.name} ${d.brand.tagline}`)}
          </p>
          <ul className="flex gap-5">
            <li>
              <Link href={p("/privacy")} className="hover:text-white">
                {d.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={p("/terms")} className="hover:text-white">
                {d.footer.terms}
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
