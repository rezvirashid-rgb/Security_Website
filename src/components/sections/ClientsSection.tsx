import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Logos and testimonials appear only with written permission, so these are honest empty slots. */
export function ClientsSection({ d }: { d: Dictionary }) {
  const c = d.home.clients;
  return (
    <section className="py-20 lg:py-24" aria-labelledby="clients-title">
      <Container>
        <SectionHeading id="clients-title" eyebrow={c.eyebrow} title={c.title} align="center" />
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }, (_, i) => (
            <li
              key={i}
              className="grid h-20 place-items-center rounded-xl border border-dashed border-ink-300 bg-white text-xs text-ink-500"
            >
              {c.logo}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-xs text-ink-500">{c.note}</p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {Array.from({ length: 2 }, (_, i) => (
            <figure key={i} className="rounded-2xl border border-ink-200 bg-white p-7 shadow-card">
              <Icon name="quote" className="size-8 text-brand-200" strokeWidth={1.5} />
              <blockquote className="mt-3 text-ink-500">{c.testimonial}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="size-11 rounded-full bg-ink-100 ring-1 ring-ink-200" aria-hidden="true" />
                <span>
                  <span className="block font-semibold text-navy-900">{c.person}</span>
                  <span className="block text-sm text-ink-500">{c.personRole}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
