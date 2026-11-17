import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

export function PageHeader({
  locale,
  d,
  title,
  lead,
  trail = [],
}: {
  locale: Locale;
  d: Dictionary;
  title: string;
  lead?: string;
  trail?: { href: string; label: string }[];
}) {
  const crumbs = [{ href: localePath(locale), label: d.nav.home }, ...trail];
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div className="bg-jamdani absolute inset-0 -z-10 opacity-[0.07]" />
      <div className="absolute -top-32 right-0 -z-10 size-[28rem] rounded-full bg-brand-700/25 blur-3xl" />
      <Container className="py-12 lg:py-16">
        <nav aria-label={d.a11y.breadcrumb}>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
            {crumbs.map((c) => (
              <li key={c.href} className="flex items-center gap-1.5">
                <Link href={c.href} className="hover:text-white">
                  {c.label}
                </Link>
                <Icon name="chevron-right" className="size-3.5" />
              </li>
            ))}
            <li aria-current="page" className="text-gold-300">
              {title}
            </li>
          </ol>
        </nav>
        <h1 className="mt-5 max-w-3xl text-3xl text-white sm:text-4xl lg:text-[2.75rem]">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-lg text-white/75">{lead}</p>}
      </Container>
    </section>
  );
}
