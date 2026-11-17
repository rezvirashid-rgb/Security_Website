import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { services, type ServiceSlug } from "@/data/catalog";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localDigits } from "@/i18n/format";
import { alternates } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { CTABand } from "@/components/sections/CTABand";
import { PageHeader } from "@/components/sections/PageHeader";

/**
 * Every valid slug is prerendered by generateStaticParams. Navigations may wait for the
 * (static, cached) page payload; in exchange, unknown slugs keep a real HTTP 404 status.
 */
export const instant = false;

const isServiceSlug = (v: string): v is ServiceSlug => services.some((s) => s.slug === v);

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceSlug(slug)) return {};
  const [locale, d] = await Promise.all([getLocale(), getDictionary()]);
  const item = d.services.items[slug];
  return { title: item.title, description: item.summary, alternates: alternates(`/services/${slug}`, locale) };
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-5 text-xl text-navy-900 sm:text-2xl">{children}</h2>;
}

export default async function ServicePage({ params }: PageProps<"/[locale]/services/[slug]">) {
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  const [locale, d] = await Promise.all([getLocale(), getDictionary()]);
  const t = d.services.detail;
  const item = d.services.items[slug];
  const full = "deployment" in item ? item : null;
  const others = services.filter((s) => s.slug !== slug);

  return (
    <>
      <PageHeader
        locale={locale}
        d={d}
        title={item.title}
        lead={item.summary}
        trail={[{ href: localePath(locale, "/services"), label: d.nav.services }]}
      />

      <Container className="grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
        <div className="space-y-14 lg:col-span-8">
          {full && <p className="text-lg text-ink-700">{full.intro}</p>}

          <section>
            <H2>{t.included}</H2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {item.included.map((inc) => (
                <li key={inc} className="flex gap-3 rounded-xl border border-ink-200 bg-white p-4">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-700 text-white">
                    <Icon name="check" className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-ink-700">{inc}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <H2>{t.idealFor}</H2>
            <ul className="flex flex-wrap gap-2">
              {item.idealFor.map((x) => (
                <li key={x} className="rounded-full border border-ink-200 bg-white px-4 py-1.5 text-sm font-medium text-navy-900">
                  {x}
                </li>
              ))}
            </ul>
          </section>

          {full ? (
            <>
              <section>
                <H2>{t.deployment}</H2>
                <dl className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
                  {full.deployment.map((row, i) => (
                    <div
                      key={row.label}
                      className={`grid gap-1 px-5 py-4 sm:grid-cols-3 sm:gap-6 ${i % 2 === 1 ? "bg-paper" : ""}`}
                    >
                      <dt className="font-semibold text-navy-900">{row.label}</dt>
                      <dd className="text-ink-700 sm:col-span-2">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section>
                <H2>{t.vetting}</H2>
                <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {full.vetting.map((v, i) => (
                    <li key={v} className="flex items-center gap-3 rounded-xl bg-navy-900 p-4 text-white">
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold-500 text-sm font-bold text-navy-950">
                        {localDigits(i + 1, locale)}
                      </span>
                      <span className="text-[0.95rem]">{v}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <H2>{t.reporting}</H2>
                <ul className="grid gap-3">
                  {full.reporting.map((r) => (
                    <li key={r} className="flex gap-3 text-ink-700">
                      <Icon name="clipboard-check" className="mt-1 size-5 shrink-0 text-brand-600" />
                      {r}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="flex gap-4 rounded-2xl border border-gold-500/50 bg-gold-300/15 p-6">
                <Icon name="hand-coins" className="mt-1 size-7 shrink-0 text-gold-600" />
                <div>
                  <h2 className="text-lg text-navy-900">{t.pricing}</h2>
                  <p className="mt-2 text-ink-700">{full.pricing}</p>
                </div>
              </section>

              <section>
                <H2>{t.faq}</H2>
                <div className="divide-y divide-ink-200 overflow-hidden rounded-2xl border border-ink-200 bg-white">
                  {full.faqs.map((f) => (
                    <details key={f.q} className="group">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-navy-900 hover:bg-paper">
                        {f.q}
                        <Icon name="chevron-down" className="size-5 shrink-0 text-ink-500 transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="px-5 pb-5 text-ink-700">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <p className="rounded-xl border border-dashed border-ink-300 bg-white p-5 text-sm text-ink-600">{t.fullSoon}</p>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="relative isolate overflow-hidden rounded-2xl bg-navy-900 p-6 text-white shadow-lift">
              <div className="bg-jamdani absolute inset-0 -z-10 opacity-[0.08]" />
              <h2 className="text-xl text-white">{t.asideTitle}</h2>
              <p className="mt-2 text-sm text-white/75">{t.asideText}</p>
              <div className="mt-5 grid gap-3">
                <ButtonLink href={localePath(locale, "/quote")} iconRight="arrow-right">
                  {d.cta.quote}
                </ButtonLink>
                <ButtonLink href={site.hotline.href} variant="alert" icon="phone">
                  {d.cta.hotline}: {site.hotline.display}
                </ButtonLink>
                <ButtonLink href={site.whatsapp} variant="whatsapp" icon="message-circle">
                  {d.cta.whatsapp}
                </ButtonLink>
              </div>
            </div>
            <nav aria-label={t.related} className="rounded-2xl border border-ink-200 bg-white p-5">
              <h2 className="mb-3 text-base text-navy-900">{t.related}</h2>
              <ul className="divide-y divide-ink-100">
                {others.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={localePath(locale, `/services/${s.slug}`)}
                      className="flex min-h-11 items-center gap-3 py-2 text-[0.95rem] text-ink-700 hover:text-brand-700"
                    >
                      <Icon name={s.icon} className="size-5 text-brand-600" />
                      {d.services.items[s.slug].title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
      </Container>

      <CTABand locale={locale} d={d} />
    </>
  );
}
