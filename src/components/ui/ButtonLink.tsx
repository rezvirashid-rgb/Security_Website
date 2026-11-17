import Link from "next/link";
import { Icon, type IconName } from "./Icon";

const variants = {
  primary: "bg-brand-700 text-white hover:bg-brand-800 shadow-sm",
  alert: "bg-alert-600 text-white hover:bg-alert-700 shadow-sm",
  navy: "bg-navy-900 text-white hover:bg-navy-800",
  outline: "border border-ink-300 bg-white text-ink-900 hover:border-brand-700 hover:text-brand-700",
  light: "border border-white/35 text-white hover:bg-white/10",
  whatsapp: "bg-[#1f7a4d] text-white hover:bg-[#186640]",
} as const;

const sizes = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-5 text-[0.95rem]",
  lg: "min-h-12 px-6 text-base",
} as const;

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  icon?: IconName;
  iconRight?: IconName;
  className?: string;
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  className = "",
  external,
}: Props) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {icon && <Icon name={icon} className="size-[1.15em] shrink-0" strokeWidth={2} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} className="size-[1.1em] shrink-0" strokeWidth={2} />}
    </>
  );
  // tel:, wa.me, PDFs and other non-route links are plain anchors.
  if (external || !href.startsWith("/") || /\.[a-z0-9]+$/i.test(href)) {
    const isNewTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(isNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
