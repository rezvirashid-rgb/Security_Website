# Site Structure — Bilingual Security Services Website (Bangladesh)

**Status:** Plan / structure only. No implementation yet.
**Markets:** Bangladesh (B2B corporate buyers + B2C residential + guard recruitment)
**Languages:** English (`en`) + Bangla (`bn`) — full parity, not partial translation.

> Placeholders marked `[[ ]]` need real company data before build (name, licence numbers, offices, hotline).

---

## 1. Primary navigation (7 items max)

| EN | BN | Path |
|---|---|---|
| Home | হোম | `/` |
| About Us | আমাদের সম্পর্কে | `/about` |
| Services | সেবাসমূহ | `/services` (hub + 11 children) |
| Industries | যেসব খাতে আমরা কাজ করি | `/industries` |
| Training | প্রশিক্ষণ একাডেমি | `/training` |
| Careers | ক্যারিয়ার | `/careers` |
| Contact | যোগাযোগ | `/contact` |

**Persistent CTAs (header + sticky mobile bar):**
`Get a Quote / কোটেশন নিন` · `24/7 Hotline / ২৪/৭ হটলাইন` (tap-to-call) · WhatsApp deep link.

---

## 2. Full sitemap

```
/                              Home / হোম
/about                         About Us / আমাদের সম্পর্কে
  /about/licences              Licences & Certifications / লাইসেন্স ও সনদ
  /about/management            Management Team / ব্যবস্থাপনা পর্ষদ
/services                      Services hub / সেবাসমূহ
  /services/manned-guarding        Manned Guarding / নিরাপত্তা প্রহরী সেবা
  /services/armed-guard            Armed Guard (Gunman) / সশস্ত্র প্রহরী (গানম্যান)
  /services/factory-industrial     Factory & Industrial / কারখানা ও শিল্প নিরাপত্তা
  /services/corporate-office       Corporate & Office / করপোরেট ও অফিস নিরাপত্তা
  /services/bank-atm               Bank & ATM / ব্যাংক ও এটিএম নিরাপত্তা
  /services/event-security         Event & Crowd Mgmt / ইভেন্ট নিরাপত্তা ও ভিড় ব্যবস্থাপনা
  /services/residential            Residential & Apartment / আবাসিক নিরাপত্তা
  /services/cash-in-transit        Cash-in-Transit / নগদ অর্থ পরিবহন
  /services/electronic-security    CCTV & Access Control / ইলেকট্রনিক নিরাপত্তা
  /services/dog-squad              K9 Dog Squad / ডগ স্কোয়াড
  /services/consultancy            Risk Assessment / নিরাপত্তা পরামর্শ ও ঝুঁকি মূল্যায়ন
  /services/facility-support       Housekeeping & Facility / হাউসকিপিং ও ফ্যাসিলিটি সাপোর্ট
/industries                    Sectors served / যেসব খাতে আমরা কাজ করি
  /industries/[slug]           RMG, banking, telecom, NGO/embassy, education, healthcare,
                               retail, logistics, real estate, power & energy
/training                      Training Academy / প্রশিক্ষণ একাডেমি
/technology                    Control Room & Tech / প্রযুক্তি ও কন্ট্রোল রুম
/clients                       Clients & Testimonials / আমাদের ক্লায়েন্ট
  /case-studies/[slug]         Case Studies / কেস স্টাডি
/coverage                      Service Areas / সেবা এলাকা (division + district list)
/careers                       Careers / ক্যারিয়ার
  /careers/apply-guard         Join as a Guard / প্রহরী হিসেবে যোগ দিন  ← Bangla-first
  /careers/[job-slug]          Open positions / নিয়োগ বিজ্ঞপ্তি
/quote                         Get a Quote / কোটেশন নিন  ← main conversion page
/faq                           FAQ / সাধারণ জিজ্ঞাসা
/news                          News & Notices / সংবাদ ও নোটিশ
  /news/[slug]
/contact                       Contact / যোগাযোগ
/privacy                       Privacy Policy / গোপনীয়তা নীতি
/terms                         Terms of Service / শর্তাবলি
```

**Page count v1:** 12 static + 12 service + ~10 industry + legal ≈ **38 pages per language → 76 routes.**

---

## 3. Page templates (6 reusable layouts)

**T1 — Home**
1. Hero: headline + 24/7 hotline + quote CTA (no stock-photo gun imagery; real guards on duty)
2. Trust strip: years in operation, guards deployed, client count, licence no.
3. Services grid (12 cards → detail pages)
4. Why us (4–6 points: vetted & trained guards, GPS patrol monitoring, 24/7 control room, on-time payroll = low turnover, compliance)
5. Industries served (logo/icon row)
6. How it works (4 steps: Survey → Proposal → Deployment → Supervision & reporting)
7. Client logos + 2 testimonials
8. Coverage map (Dhaka, Chattogram, Gazipur, Narayanganj, Sylhet, Khulna, …)
9. Latest news (3 cards)
10. Final CTA band: quote form shortcut + hotline

**T2 — Service detail** (×12)
Hero (service name + one-line promise) → What's included → Who it's for → Guard profile & deployment model (shift pattern, supervisor ratio, uniform/equipment) → Technology used → Pricing model note (per-guard/month, 8 or 12-hr shift — "quotation after site survey") → FAQ (3–5) → Related services → Quote CTA.

**T3 — Industry page** (×10)
Sector risk profile → Our solution → Compliance notes (e.g. buyer/audit requirements for RMG) → Mini case study → CTA.

**T4 — Content page** (About, Training, Technology, Coverage, FAQ, legal)
Intro → body sections → supporting media → CTA.

**T5 — Listing + detail** (News, Case studies, Jobs) — card grid, filter, pagination.

**T6 — Conversion** (Quote, Contact, Apply-as-guard) — form + offices + map + hotline + WhatsApp.

---

## 4. Bilingual architecture

| Decision | Recommendation | Why |
|---|---|---|
| Routing | Path prefix for both: `/en/...` and `/bn/...`; `/` redirects by `Accept-Language`, cookie-sticky | Clean hreflang, shareable links, no content cloaking |
| Default locale | `en` for corporate buyers; `bn` surfaced prominently in switcher | B2B procurement in BD is English-heavy; recruitment traffic is Bangla |
| Slugs | Same Latin slugs under both prefixes in v1; localized-slug map reserved for v2 | Avoids URL churn, keeps analytics simple |
| Switcher | Header toggle **EN / বাংলা** — stays on the same page, never dumps to home | Common failure of BD bilingual sites |
| Content storage | One JSON/MDX file per locale, identical key tree; CI fails on missing keys | Guarantees parity, no half-translated pages |
| Fonts | Latin: Inter/Manrope. Bangla: **Hind Siliguri** or **Noto Sans Bengali**, self-hosted + subset | Bangla conjuncts break in many Latin fallbacks |
| Bangla typography | Line-height 1.75–1.85, no `text-transform: uppercase`, slightly larger base size | Bangla has no uppercase; ascenders/matras need room |
| Numerals | Bangla numerals (০-৯) allowed in body copy; **phone numbers, prices, dates stay Latin digits** | Keeps `tel:` links and form validation usable |
| Currency / dates | `৳` BDT, `BDT 00,000/guard/month`; dates `DD MMM YYYY` + Bangla month names | Local convention |
| SEO | `hreflang` en/bn + `x-default`, per-locale meta, one sitemap with both | Avoids duplicate-content penalty |
| Forms | Labels + validation messages + error states fully translated; Bangla name/address input accepted | Guard applicants type in Bangla |

---

## 5. Trust & compliance block (critical in this market)

Reusable component shown in footer + `/about/licences`:
- Company name & registration — `[[ ]]`
- Ministry of Home Affairs private-security licence no. — `[[verify exact licence name/number]]`
- Trade licence, TIN, VAT/BIN — `[[ ]]`
- Trade-body membership (e.g. security service providers' association) — `[[confirm]]`
- ISO certifications, if held — `[[ ]]`
- Insurance coverage (third-party liability / fidelity guarantee) — `[[ ]]`

Also: guard vetting process (NID verification, police clearance, medical, reference check), training hours, supervision ratio, grievance/complaint channel.

---

## 6. Content model (bilingual, key-parallel)

```
content/
  en/ common.json  nav.json  home.json  about.json  faq.json  forms.json
      services/manned-guarding.mdx … (12)
      industries/rmg.mdx … (10)
      news/*.mdx   case-studies/*.mdx   jobs/*.mdx
  bn/ <identical tree, identical filenames>
data/
  offices.json      # name, address(en/bn), phone, map coords, hours
  coverage.json     # division → districts (en/bn)
  services.json     # slug, icon, order, locale titles/summaries
  stats.json        # guards deployed, years, clients
```

Rule: every `bn/` file mirrors `en/`. Build fails on an orphan or missing key.

---

## 7. Proposed repo structure

```
/
├─ docs/                      # this plan, content brief, brand notes
├─ src/
│  ├─ app/[locale]/           # routes mirroring §2 sitemap
│  ├─ components/
│  │  ├─ layout/   Header, Footer, LangSwitcher, StickyCallBar
│  │  ├─ sections/ Hero, TrustStrip, ServiceGrid, Steps, Testimonials,
│  │  │            CoverageMap, CTABand, FAQAccordion
│  │  ├─ forms/    QuoteForm, ContactForm, GuardApplicationForm
│  │  └─ ui/       Button, Card, Badge, Input, Accordion
│  ├─ lib/         i18n config, schema.org builders, form handlers, validation
│  └─ styles/      tokens (colors, type scale incl. Bangla overrides)
├─ content/  data/            # §6
├─ public/   fonts/ images/ icons/ docs(company-profile.pdf)
└─ messages/ en.json bn.json  # UI strings
```

---

## 8. Stack recommendation

- **Next.js (App Router) + TypeScript + Tailwind**, static-first (SSG), `next-intl` for i18n.
- Content as MDX/JSON in-repo for v1; optional headless CMS (Sanity/Payload) in v2 when a non-dev needs to edit Bangla copy.
- Forms → email (Resend) + optional Google Sheet log; WhatsApp deep link as the real-world primary channel.
- Host: Vercel or Cloudflare Pages. Custom domain `.com.bd` or `.com`.
- **Performance budget** (most traffic is mid-range Android on 4G): LCP < 2.5s on Moto G-class, JS < 150 KB gzipped, images AVIF/WebP, fonts subset & preloaded.
- Accessibility: WCAG 2.2 AA, 44px tap targets, visible focus, forms usable one-handed.

---

## 9. Build phases

| Phase | Scope | Output |
|---|---|---|
| 0 | Confirm company data, service list, brand, hotline | Filled `[[ ]]` placeholders |
| 1 | Scaffold + i18n routing + design tokens + Header/Footer/LangSwitcher | Shell renders in both languages |
| 2 | Home + Services hub + 1 service template | Approve layout before mass-producing |
| 3 | Remaining 11 service + 10 industry pages | Content-driven, no new components |
| 4 | About/Licences/Training/Technology/Coverage/Clients/FAQ | Trust surface complete |
| 5 | Quote, Contact, Careers + guard application + form delivery | Lead capture live |
| 6 | News/case-study listings, SEO (hreflang, schema, sitemap, GBP), analytics | Launch-ready |
| 7 | Bangla copy QA by native reader, perf/a11y pass, launch | Go live |

---

## 10. Open decisions

1. Company name, tagline, brand colors — or should the design direction be proposed?
2. Which of the 12 services are actually offered today? (armed guard, CIT, K9 and electronic security each imply licences/capex)
3. Default language at `/` — English or Bangla?
4. Stack: Next.js as above, or plain static HTML/CSS, or WordPress for self-editing?
5. Does the site need a client login / incident-report portal, or is it purely marketing in v1?
