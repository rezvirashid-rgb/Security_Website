import { Icon } from "@/components/ui/Icon";

/** Shown while src/config/site.ts has isPlaceholder: true. */
export function PreviewRibbon({ text }: { text: string }) {
  return (
    <div role="note" className="bg-gold-300 text-navy-950">
      <p className="mx-auto flex max-w-7xl items-start gap-2 px-4 py-1.5 text-xs font-medium sm:items-center sm:px-6 lg:px-8">
        <Icon name="triangle-alert" className="mt-0.5 size-3.5 shrink-0 sm:mt-0" strokeWidth={2.2} />
        {text}
      </p>
    </div>
  );
}
