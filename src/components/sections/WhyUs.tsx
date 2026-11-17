import type { Dictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS: IconName[] = ["user-check", "graduation-cap", "clipboard-check", "file-text", "hand-coins", "badge-check"];

export function WhyUs({ d }: { d: Dictionary }) {
  const w = d.home.why;
  return (
    <section className="bg-white py-20 lg:py-24" aria-labelledby="why-title">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="why-title" eyebrow={w.eyebrow} title={w.title} lead={w.lead} />
            <PhotoPlaceholder caption={w.photo} tone="light" className="mt-8 hidden aspect-[4/3] lg:flex" />
          </div>
        </div>
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:pt-2">
          {w.items.map((item, i) => (
            <li key={item.title}>
              <span className="grid size-12 place-items-center rounded-xl bg-navy-900 text-gold-400">
                <Icon name={ICONS[i] ?? "check"} className="size-6" />
              </span>
              <h3 className="mt-4 text-lg text-navy-900">{item.title}</h3>
              <p className="mt-2 text-[0.95rem] text-ink-600">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
