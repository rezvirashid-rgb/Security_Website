# Site Structure — Bilingual Security Services Website (Bangladesh)

**Status:** structure agreed (v2). No application code yet.
**Market:** Bangladesh — corporate/institutional buyers, apartment & residential clients, guard recruitment.

## Decisions locked

| Decision | Choice |
|---|---|
| Service scope | **Manpower guarding core only.** No armed guard/gunman, cash-in-transit, K9, electronic security (CCTV/access control) or housekeeping pages in v1. |
| Default language | **Bangla (`bn`)** at the bare domain. English (`en`) one tap away. |
| Stack | **Next.js (App Router) + TypeScript + Tailwind**, static-first, `next-intl`. |

> `[[ ]]` = real company data still needed (name, licence numbers, hotline, offices, stats).

---

## 1. Primary navigation (7 items)

| BN (primary) | EN | Path |
|---|---|---|
| হোম | Home | `/` |
| আমাদের সম্পর্কে | About Us | `/about` |
| সেবাসমূহ | Services | `/services` |
| খাতসমূহ | Industries | `/industries` |
| প্রশিক্ষণ | Training | `/training` |
| ক্যারিয়ার | Careers | `/careers` |
| যোগাযোগ | Contact | `/contact` |

Nav labels are kept short in Bangla on purpose — the full page title (e.g. *যেসব খাতে আমরা কাজ করি*) lives on the page, not in the header, or the nav wraps on 360px screens.

**Persistent CTAs** (header + sticky mobile bar): `কোটেশন নিন / Get a Quote` · `২৪/৭ হটলাইন` tap-to-call · WhatsApp deep link.

---

## 2. Sitemap — 30 pages per locale (60 routes) + dynamic detail pages

```
/                              হোম · Home
/about                         আমাদের সম্পর্কে · About Us
  /about/licences              লাইসেন্স ও সনদ · Licences & Certifications
  /about/management            ব্যবস্থাপনা পর্ষদ · Management Team
/services                      সেবাসমূহ · Services (hub)
  /services/manned-guarding    নিরাপত্তা প্রহরী সেবা · Manned Guarding (static guards + supervisors)
  /services/factory-industrial কারখানা ও শিল্প নিরাপত্তা · Factory & Industrial Security
  /services/corporate-office   করপোরেট ও অফিস নিরাপত্তা · Corporate & Office Security
  /services/bank-atm           ব্যাংক ও এটিএম নিরাপত্তা · Bank & ATM Security
  /services/residential        আবাসিক ও অ্যাপার্টমেন্ট নিরাপত্তা · Residential & Apartment Security
  /services/event-security     ইভেন্ট নিরাপত্তা ও ভিড় ব্যবস্থাপনা · Event Security & Crowd Management
  /services/mobile-patrol      মোবাইল পেট্রোল ও পরিদর্শন · Mobile Patrol & Inspection   [optional 7th]
/industries                    যেসব খাতে আমরা কাজ করি · Industries (hub)
  /industries/rmg-garments     পোশাক ও বস্ত্র খাত · RMG & Textiles
  /industries/banking          ব্যাংক ও আর্থিক প্রতিষ্ঠান · Banking & NBFI
  /industries/corporate        করপোরেট ও বহুজাতিক অফিস · Corporate & Multinational
  /industries/real-estate      রিয়েল এস্টেট ও অ্যাপার্টমেন্ট · Real Estate & Housing Societies
  /industries/education        শিক্ষা প্রতিষ্ঠান · Education
  /industries/healthcare       হাসপাতাল ও স্বাস্থ্যসেবা · Healthcare
/training                      প্রশিক্ষণ একাডেমি · Training Academy
/operations                    পরিচালনা ও মনিটরিং · Operations & Monitoring   [[only if a real 24/7 desk exists]]
/clients                       আমাদের ক্লায়েন্ট · Clients & Testimonials
  /case-studies/[slug]         কেস স্টাডি · Case Studies
/coverage                      সেবা এলাকা · Service Areas (division → district)
/careers                       ক্যারিয়ার · Careers
  /careers/apply-guard         প্রহরী হিসেবে যোগ দিন · Join as a Guard   ← highest-volume Bangla page
  /careers/[job-slug]          নিয়োগ বিজ্ঞপ্তি · Job detail
/quote                         কোটেশন নিন · Get a Quote   ← main conversion page
/faq                           সাধারণ জিজ্ঞাসা · FAQ
/news                          সংবাদ ও নোটিশ · News & Notices
  /news/[slug]
/contact                       যোগাযোগ · Contact
/privacy                       গোপনীয়তা নীতি · Privacy Policy
/terms                         শর্তাবলি · Terms of Service
```

Industries start at 6 and grow (telecom, NGO/development, retail, logistics, power) once the template proves out — each new one is a content file, not new code.

---

## 3. Page templates — 6 layouts cover all 30 pages

**T1 Home**
Hero (headline + hotline + quote CTA; real guards on duty, not stock weapon imagery) → trust strip (years · guards deployed · clients · licence no.) → 6-service grid → why us (vetted & trained guards, supervisor visits, on-time guard payroll = low turnover, documented reporting, compliance) → industries row → how it works (সার্ভে → প্রস্তাব → নিয়োগ → সুপারভিশন) → client logos + testimonials → coverage map → latest notices → closing CTA band.

**T2 Service detail** (×6–7)
What's included → who it's for → guard profile & deployment model (shift pattern, 8 vs 12 hr, supervisor-to-guard ratio, uniform & equipment) → vetting and training behind each guard → reporting & supervision → pricing note (*per guard / per month, quoted after free site survey*) → 3–5 FAQs → related services → quote CTA.

**T3 Industry** (×6) — sector risk profile → our approach → compliance/audit notes (buyer audits matter in RMG) → mini case study → CTA.

**T4 Content** (About, Licences, Management, Training, Operations, Coverage, FAQ, legal) — intro → sections → media → CTA.

**T5 Listing + detail** (News, Case studies, Jobs) — card grid, pagination.

**T6 Conversion** (Quote, Contact, Apply as Guard) — form + offices + map + hotline + WhatsApp. Guard application is deliberately short: name, mobile, district, age, height, education, ex-service y/n, preferred location.

---

## 4. Bilingual architecture (Bangla-first)

| Topic | Decision |
|---|---|
| Routing | Both locales prefixed: `/bn/...` and `/en/...`; `/` → `/bn`, choice remembered in a cookie. Symmetric hreflang, and flipping the default later changes no URLs. (Alternative — unprefixed Bangla at root — is nicer-looking but asymmetric; rejected for v1.) |
| Authoring order | **Bangla is the source copy, English is the translation.** Reverse of the usual, and it changes review flow: Bangla copy gets approved first. |
| Design order | Lay out every component with Bangla text first. Bangla strings run ~10–25% longer and taller; a design tuned on English breaks on nav, buttons and cards. |
| Slugs | Same Latin slugs under both prefixes in v1; localized-slug map reserved for v2. |
| Switcher | `বাংলা / EN` in header, stays on the same page — never dumps the user to the home page. |
| Content parity | Mirrored `content/bn` ↔ `content/en` trees, identical keys and filenames. **CI fails the build on a missing key or orphan file** — no half-translated pages. |
| Fonts | Bangla: Hind Siliguri or Noto Sans Bengali, self-hosted + subset + preloaded. Latin: Inter/Manrope. Never rely on a Latin fallback — Bangla conjuncts break. |
| Typography | Bangla line-height 1.75–1.85, base size a notch larger, **no `uppercase`** (Bangla has no case), avoid tight letter-spacing. |
| Numerals | Bangla numerals (০–৯) allowed in prose; **phone numbers, prices, dates stay Latin digits** so `tel:` links, copy-paste and validation work. |
| Formats | `৳` BDT, "BDT 00,000 / প্রহরী / মাস", dates `DD MMM YYYY` with Bangla month names. |
| Forms | Labels, placeholders, validation and error messages fully translated; Bangla-script names and addresses accepted and stored correctly (UTF-8 end to end). |
| SEO | `hreflang` bn/en + `x-default`, per-locale titles/descriptions/OG, single sitemap with both, `LocalBusiness`/`SecurityService` + `FAQPage` schema, Google Business Profile in both languages. |

---

## 5. Trust & compliance block (what actually wins contracts here)

Footer component + `/about/licences`:
- Company legal name & registration — `[[ ]]`
- Ministry of Home Affairs private-security licence — `[[verify exact title + number]]`
- Trade licence · TIN · VAT/BIN — `[[ ]]`
- Trade-body membership — `[[confirm which, if any]]`
- Insurance: third-party liability / fidelity guarantee — `[[ ]]`
- ISO certification if held — `[[ ]]`

Plus, stated plainly: guard vetting steps (NID verification, police clearance, medical, references), training hours, supervision ratio, payroll compliance, and a named grievance channel. Claim nothing that cannot be evidenced on request.

---

## 6. Content model

```
content/
  bn/  common.json  nav.json  home.json  about.json  faq.json  forms.json
       services/manned-guarding.mdx … (6–7)
       industries/rmg-garments.mdx … (6)
       news/*.mdx   case-studies/*.mdx   jobs/*.mdx
  en/  <identical tree, identical filenames>
data/
  offices.json    # name, address(bn/en), phone, coords, hours
  coverage.json   # division → districts (bn/en)
  services.json   # slug, icon, order, bn/en title + summary
  stats.json      # years, guards deployed, clients, sites
messages/
  bn.json  en.json   # UI strings
```

---

## 7. Repo structure

```
/
├─ docs/                       # this plan, content brief, brand notes
├─ src/
│  ├─ app/[locale]/            # routes mirroring §2
│  ├─ components/
│  │  ├─ layout/    Header, Footer, LangSwitcher, StickyCallBar
│  │  ├─ sections/  Hero, TrustStrip, ServiceGrid, Steps, Testimonials,
│  │  │             CoverageMap, CTABand, FAQAccordion, LicenceBlock
│  │  ├─ forms/     QuoteForm, ContactForm, GuardApplicationForm
│  │  └─ ui/        Button, Card, Badge, Input, Select, Accordion
│  ├─ lib/          i18n config, schema.org builders, form handlers, validation
│  └─ styles/       tokens — colors, type scale, Bangla overrides
├─ content/  data/  messages/   # §6
└─ public/   fonts/ images/ icons/ company-profile.pdf
```

---

## 8. Non-functional targets

- **Performance** (traffic is mostly mid-range Android on 4G): LCP < 2.5s on a Moto G-class device, JS < 150 KB gzipped, AVIF/WebP images, subset fonts preloaded, static generation for all 60 routes.
- **Accessibility:** WCAG 2.2 AA, 44px tap targets, visible focus, one-handed mobile forms, `lang` attribute correct per locale.
- **Conversion reality:** phone and WhatsApp outrank web forms in this market — hotline is tap-to-call everywhere, forms also deliver to WhatsApp/email, never form-only.
- **Hosting:** Vercel or Cloudflare Pages; domain `.com.bd` or `.com`.

---

## 9. Build phases

| Phase | Scope | Gate |
|---|---|---|
| 0 | Fill `[[ ]]` company data, brand direction, hotline, office list | Content ready |
| 1 | Scaffold, i18n routing (bn default), tokens, Header/Footer/LangSwitcher/StickyCallBar | Shell renders in both languages |
| 2 | Home + Services hub + **one** service page, Bangla copy first | **Layout approved before mass production** |
| 3 | Remaining 5–6 service pages + 6 industry pages | Content-driven, no new components |
| 4 | About, Licences, Management, Training, Operations, Coverage, Clients, FAQ | Trust surface complete |
| 5 | Quote, Contact, Careers, Apply-as-Guard + delivery to email/WhatsApp | Lead capture live |
| 6 | News & case-study listings, SEO (hreflang, schema, sitemap, GBP), analytics | Launch-ready |
| 7 | Bangla copy QA by a native reader, perf & a11y pass | Go live |

---

## 10. Still open

1. Company name, tagline, brand colors — or should a design direction be proposed?
2. Is the 7th service, **mobile patrol & inspection**, offered? (included above as optional)
3. Is there a real 24/7 control desk / GPS patrol monitoring to justify `/operations`?
4. Offices and coverage: which districts are genuinely served today?
5. Marketing-only in v1, or will a client portal (incident reports, attendance) be needed later? Affects nothing now, but worth knowing before Phase 1.
