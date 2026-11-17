export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  id,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
}) {
  const centered = align === "center";
  const dark = tone === "dark";
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p
          className={`mb-3 flex items-center gap-3 text-sm font-semibold ${centered ? "justify-center" : ""} ${
            dark ? "text-gold-300" : "text-brand-700"
          }`}
        >
          <span className="kantha" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={`text-2xl sm:text-3xl lg:text-[2.1rem] ${dark ? "text-white" : "text-navy-900"}`}>
        {title}
      </h2>
      {lead && <p className={`mt-4 text-[1.02rem] ${dark ? "text-white/75" : "text-ink-600"}`}>{lead}</p>}
    </div>
  );
}
