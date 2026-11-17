/** Marks copy that the company must replace with its own words (e.g. the MD's message). */
export function SampleTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-dashed border-gold-600 bg-gold-300/25 px-2.5 py-0.5 text-xs font-medium text-ink-700">
      {label}
    </span>
  );
}
