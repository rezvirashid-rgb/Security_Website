import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { plannedRoutes } from "@/data/catalog";
import { localePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { alternates } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/sections/PageHeader";

/**
 * Every valid slug is prerendered by generateStaticParams. Navigations may wait for the
 * (static, cached) page payload; in exchange, unknown slugs keep a real HTTP 404 status.
 */
export const instant = false;

/** Every sitemap route not built yet renders this, so the preview has no dead links. */
type Planned = (typeof plannedRoutes)[number];
const isPlanned = (v: string): v is Planned => (plannedRoutes as readonly string[]).includes(v);

export async function generateStaticParams() {
  return plannedRoutes.map((p) => ({ slug: p.split("/") }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/[...slug]">): Promise<Metadata> {
  const path = (await params).slug.join("/");
  if (!isPlanned(path)) return {};
  const [locale, d] = await Promise.all([getLocale(), getDictionary()]);
  return { title: d.pages[path], alternates: alternates(`/${path}`, locale) };
}

export default async function PlannedPage({ params }: PageProps<"/[locale]/[...slug]">) {
  const path = (await params).slug.join("/");
  if (!isPlanned(path)) notFound();
  const [locale, d] = await Promise.all([getLocale(), getDictionary()]);

  const parent = path.includes("/") ? path.split("/")[0] : null;
  const trail = parent && isPlanned(parent) ? [{ href: localePath(locale, `/${parent}`), label: d.pages[parent] }] : [];

  return (
    <>
      <PageHeader locale={locale} d={d} title={d.pages[path]} trail={trail} />
      <Container className="py-16 lg:py-24">
        <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-ink-300 bg-white p-8 text-center sm:p-12">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-gold-300/30 text-gold-600">
            <Icon name="clipboard-check" className="size-7" />
          </span>
          <h2 className="mt-5 text-2xl text-navy-900">{d.comingSoon.title}</h2>
          <p className="mt-3 text-ink-600">{d.comingSoon.text}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={localePath(locale, "/quote")} iconRight="arrow-right">
              {d.cta.quote}
            </ButtonLink>
            <ButtonLink href={site.hotline.href} variant="alert" icon="phone">
              {site.hotline.display}
            </ButtonLink>
            <ButtonLink href={localePath(locale)} variant="outline">
              {d.cta.backHome}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
