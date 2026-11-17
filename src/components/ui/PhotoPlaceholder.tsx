import { Icon } from "./Icon";

/**
 * Stand-in for a REAL photograph (guards on duty, training, leadership).
 * The plan rules out stock photos, so the slot states plainly what goes here.
 */
export function PhotoPlaceholder({
  caption,
  className = "",
  tone = "dark",
}: {
  caption: string;
  className?: string;
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  return (
    <figure
      className={`relative isolate flex overflow-hidden rounded-2xl ${
        dark
          ? "bg-gradient-to-br from-navy-800 via-navy-900 to-brand-900 text-white/80"
          : "bg-gradient-to-br from-ink-100 to-ink-200 text-ink-600"
      } ${className}`}
    >
      <div className={`bg-jamdani absolute inset-0 -z-10 ${dark ? "opacity-[0.12]" : "opacity-[0.25]"}`} />
      <figcaption className="m-auto flex max-w-[16rem] flex-col items-center gap-3 p-6 text-center text-sm">
        <span
          className={`grid size-12 place-items-center rounded-full ${dark ? "bg-white/10" : "bg-white/70"}`}
        >
          <Icon name="camera" className="size-6" />
        </span>
        {caption}
      </figcaption>
    </figure>
  );
}
