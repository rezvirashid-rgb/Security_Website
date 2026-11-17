"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string };

function isActive(pathname: string, href: string) {
  const isHome = href.split("/").filter(Boolean).length === 1;
  return isHome ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop navigation with active-page state. */
export function NavLinks({ items, ariaLabel }: { items: Item[]; ariaLabel: string }) {
  const pathname = usePathname() ?? "";
  return (
    <nav aria-label={ariaLabel} className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative block rounded-md px-3 py-2 text-[0.95rem] font-medium transition-colors ${
                  active ? "text-brand-700" : "text-ink-700 hover:text-navy-900"
                }`}
              >
                {item.label}
                {active && (
                  <span className="kantha-line absolute inset-x-3 -bottom-0.5" aria-hidden="true" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Mobile drawer. Closes when a link is followed (layouts stay mounted across navigations). */
export function MobileNav({
  items,
  labels,
  extra,
}: {
  items: Item[];
  labels: { open: string; close: string; nav: string };
  extra: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";
  return (
    <details className="group lg:hidden">
      <summary
        className="grid size-11 cursor-pointer list-none place-items-center rounded-lg border border-ink-200 text-navy-900"
        aria-label={labels.open}
      >
        <svg viewBox="0 0 24 24" className="size-6 group-open:hidden" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 24 24" className="hidden size-6 group-open:block" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </summary>
      <div className="absolute inset-x-0 top-full border-b border-ink-200 bg-white shadow-lift">
        <nav aria-label={labels.nav} className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <ul className="divide-y divide-ink-100">
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={(e) => e.currentTarget.closest("details")?.removeAttribute("open")}
                    className={`flex min-h-12 items-center justify-between text-base font-medium ${
                      active ? "text-brand-700" : "text-navy-900"
                    }`}
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-ink-400">
                      ›
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 grid gap-2 pb-2">{extra}</div>
        </nav>
      </div>
    </details>
  );
}
