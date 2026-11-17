/**
 * Company facts in one place. Everything here is a PLACEHOLDER until the
 * company supplies real data (see docs/02-build-plan.md §8).
 *
 * While `isPlaceholder` is true the site shows a "design preview" ribbon,
 * is marked noindex, and a Vercel production build refuses to run.
 */
export const site = {
  isPlaceholder: true,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  hotline: { display: "16XXX", href: "tel:16XXX" },
  mobile: { display: "+880 1XXX-XXXXXX", href: "tel:+8801XXXXXXXXX" },
  whatsapp: "https://wa.me/8801XXXXXXXXX",
  email: "info@example.com",
  social: {
    facebook: "https://www.facebook.com/",
    linkedin: "https://www.linkedin.com/",
    youtube: "https://www.youtube.com/",
  },

  licences: {
    moha: "MoHA/PSS/XXXX",
    trade: "TRAD/DNCC/XXXXXX",
    tin: "XXXXXXXXXXXX",
    bin: "XXXXXXXXX-XXXX",
  },

  stats: { years: 15, guards: 2500, clients: 180, districts: 24 },

  profilePdf: "/docs/company-profile-en.pdf",
  copyrightYear: 2026,
} as const;
