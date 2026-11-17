import type { IconName } from "@/components/ui/Icon";

/** Order and icons only. All copy lives in src/dictionaries/{bn,en}.json. */
export const services = [
  { slug: "manned-guarding", icon: "shield-check" },
  { slug: "factory-industrial", icon: "factory" },
  { slug: "corporate-office", icon: "building-2" },
  { slug: "bank-atm", icon: "landmark" },
  { slug: "residential", icon: "house" },
  { slug: "event-security", icon: "users" },
] as const satisfies readonly { slug: string; icon: IconName }[];

export type ServiceSlug = (typeof services)[number]["slug"];

export const industries = [
  { slug: "rmg-garments", icon: "shirt" },
  { slug: "banking", icon: "landmark" },
  { slug: "corporate", icon: "briefcase-business" },
  { slug: "real-estate", icon: "building" },
  { slug: "education", icon: "school" },
  { slug: "healthcare", icon: "hospital" },
] as const satisfies readonly { slug: string; icon: IconName }[];

/** 8 divisions, 64 districts. `office` marks where the company has an office (placeholder). */
export const divisions = [
  { key: "dhaka", districts: 13, office: "hq" },
  { key: "chattogram", districts: 11, office: "branch" },
  { key: "rajshahi", districts: 8 },
  { key: "khulna", districts: 10 },
  { key: "barishal", districts: 6 },
  { key: "sylhet", districts: 4 },
  { key: "rangpur", districts: 8 },
  { key: "mymensingh", districts: 4 },
] as const;

/** Header navigation (max 7). */
export const mainNav = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "services", path: "/services" },
  { key: "industries", path: "/industries" },
  { key: "training", path: "/training" },
  { key: "careers", path: "/careers" },
  { key: "contact", path: "/contact" },
] as const;

/** Routes in the sitemap that are built in later milestones. They render a "coming next" page for now. */
export const plannedRoutes = [
  "about",
  "about/licences",
  "about/management",
  "industries",
  ...industries.map((i) => `industries/${i.slug}` as const),
  "training",
  "clients",
  "coverage",
  "careers",
  "careers/apply-guard",
  "quote",
  "faq",
  "news",
  "contact",
  "privacy",
  "terms",
] as const;
