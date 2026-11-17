import { site } from "@/config/site";

// Lucide no longer ships brand logos; simple letter marks keep the footer dependency-free.
const items = [
  { key: "facebook", label: "Facebook", mark: "f", href: site.social.facebook },
  { key: "linkedin", label: "LinkedIn", mark: "in", href: site.social.linkedin },
  { key: "youtube", label: "YouTube", mark: "▶", href: site.social.youtube },
] as const;

export function SocialLinks() {
  return (
    <ul className="flex gap-2">
      {items.map((s) => (
        <li key={s.key}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="grid size-10 place-items-center rounded-full border border-white/20 text-sm font-bold text-white/85 transition-colors hover:border-gold-500 hover:text-gold-300"
          >
            {s.mark}
          </a>
        </li>
      ))}
    </ul>
  );
}
