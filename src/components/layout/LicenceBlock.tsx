import { site } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { Icon } from "@/components/ui/Icon";

/** Licence & registration numbers as plain text — procurement teams look for these. */
export function LicenceBlock({ d }: { d: Dictionary }) {
  const rows = [
    { label: d.licence.moha, value: site.licences.moha },
    { label: d.licence.trade, value: site.licences.trade },
    { label: d.licence.tin, value: site.licences.tin },
    { label: d.licence.bin, value: site.licences.bin },
  ];
  return (
    <div className="rounded-xl border border-gold-500/40 bg-navy-900/60 p-5">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-gold-300">
        <Icon name="badge-check" className="size-4" strokeWidth={2} />
        {d.licence.title}
      </p>
      <dl className="grid gap-2 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="flex flex-wrap justify-between gap-x-4">
            <dt className="text-white/60">{r.label}</dt>
            <dd className="font-mono text-[0.82rem] text-white/90">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
