# Build Plan — Industry Standard, Adapted for Bangladesh

**Builds on:** [`01-site-structure.md`](01-site-structure.md) (sitemap, templates, bilingual routing).
**This doc adds:** the industry baseline, the Bangladeshi cultural and market layer, legal context, design system, technical architecture, component inventory and the build sequence.
**Locked:** manpower guarding only · Bangla default · Next.js + TypeScript + Tailwind.

---

## 1. Industry baseline: what credible security firms show

What established firms in Bangladesh and abroad consistently put front and centre:

| Signal | Typical form | Our implementation |
|---|---|---|
| Track record | Founding year, guards deployed, clients served | `TrustStrip` on home + about, from `data/stats.json` |
| Leadership pedigree | Founders/MD from the armed forces with rank shown, e.g. *Major (Retd.)* | Leadership section with rank, service background, photo |
| Licensing | Licence numbers, association membership, ISO 9001 | `LicenceBlock` in footer + `/about/licences` |
| Marquee clients | Embassies, multinationals, banks, RMG exporters | Logo wall shown **only with written permission** |
| Supervision model | Supervisor ratio, inspection visits, reporting | A section on every service page |
| Technology | Guard tour/patrol verification, incident reporting | Only what really exists. No claims we can't back up |
| Conversion | 24/7 hotline, quote request, company profile PDF | Sticky call bar, `/quote`, PDF download |
| Recruitment | Ongoing guard hiring | `/careers/apply-guard`, Bangla-first |

**The market gap to exploit:** news reports put Bangladesh at 700–900+ private security firms, many operating on a trade licence alone with weak enforcement. A site that **shows verifiable licence numbers, real staff and real sites** stands out in a crowded, low-trust market. Every claim must be something we could prove on request.

---

## 2. Bangladeshi cultural & market layer

### 2.1 Language & tone
- **Bangla:** standard colloquial (প্রমিত চলিত), always respectful **আপনি**, never তুমি. Formal but warm. No সাধু ভাষা.
- **English:** **British spelling** (licence, organisation, programme, centre), which is the norm in Bangladeshi business and government writing.
- **Search reality:** people search in Bangla, English *and* Banglish ("security company dhaka", "সিকিউরিটি গার্ড সার্ভিস"). Page titles and copy cover all three naturally.
- **Unicode only.** Content from local teams often arrives typed in **Bijoy / SutonnyMJ (legacy ANSI encoding)**, which renders as garbage on the web. CI rejects it (see §6.5).

### 2.2 Respect, hierarchy and trust cues
- A **Message from the Managing Director / Chairman** (ব্যবস্থাপনা পরিচালকের বাণী) with a formal photo is an expected section on Bangladeshi corporate sites. It goes on `/about`.
- **Rank titles** are shown as used locally: *Major (Retd.)* / *মেজর (অব.)*, *Lt Col (Retd.)* / *লে. কর্নেল (অব.)*. Ex-forces leadership is the industry's strongest trust signal here.
- **Guards are shown with dignity:** real faces (with consent), proper uniform, training, welfare. Never anonymous stock silhouettes. Welfare (on-time pay, festival bonus, leave) is a selling point to clients *and* recruits.
- **Female guards are shown.** RMG factories and many offices need women guards to search women staff and visitors. That is a real buying requirement, not just optics.

### 2.3 Visual identity
- Palette rooted in national colours **without looking like a government site** (see §4). Red is reserved for emergency/hotline. Never red-on-green.
- **Imagery:** Bangladeshi guards, recognisable local settings (factory gates, apartment lobbies, bank branches, Dhaka streetscapes). No Western stock photos, **no weapons** (we don't offer armed guarding), no aggressive or intimidating poses.
- **Maps:** any map of Bangladesh must use accurate, official national boundaries. A careless map is a credibility and sensitivity problem.
- **Political neutrality:** no party colours, leaders, slogans or politically contested dates anywhere on the site.

### 2.4 National & festive calendar
A date-driven `FestiveBanner` with editable dates (lunar festivals shift each year and depend on moon sighting):

| Date | Occasion | Tone |
|---|---|---|
| 21 Feb | শহীদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস | **Solemn tribute.** Never "Happy". Muted/monochrome |
| 26 Mar | স্বাধীনতা দিবস · Independence Day | Respectful greeting |
| 14 Apr | পহেলা বৈশাখ · Bangla New Year | Festive |
| Lunar | ঈদুল ফিতর · ঈদুল আজহা | Greeting **plus a business message** (below) |
| Lunar | দুর্গাপূজা · Durga Puja | Greeting (inclusivity matters) |
| 16 Dec | বিজয় দিবস · Victory Day | Respectful greeting |

**Business tie-in:** during long Eid holidays, factories, offices and apartments sit empty and theft risk rises. An **"Eid holiday security" offer** on the banner and quote form is a real seasonal demand spike, not decoration.

### 2.5 Contact conventions
- **Phone first.** In this market phone and WhatsApp beat web forms. Tap-to-call is in the header, the sticky mobile bar, every CTA and the footer.
- **Hotline:** a 5-digit **16XXX short code** if acquired (common for BD companies), plus an 11-digit mobile shown as `+880 1XXX-XXXXXX`.
- **Validation:** BD mobile `^(?:\+?88)?01[3-9]\d{8}$`. Accept with or without +88, normalise on submit.
- **Messaging:** WhatsApp deep link (primary), Messenger via an `m.me/<page>` link. Meta discontinued the embeddable chat plugin, so we use a link, not a widget.
- **Facebook is the main social and discovery channel** in Bangladesh. The page link is prominent; LinkedIn targets corporate buyers; YouTube for training videos.
- **Working week:** office hours **Saturday–Thursday**, Friday closed. Operations hotline **24/7**. Show both, clearly.

### 2.6 Formats
| Item | Convention |
|---|---|
| Numbers | Lakh/crore grouping in both languages: `12,50,000` / `১২,৫০,০০০` (`Intl` with `en-IN` / `bn-BD`) |
| Currency | `৳` / `BDT`. Pricing shown as *per guard per month, quoted after a free site survey* |
| Dates | Day first: `17/11/2026`, `17 Nov 2026`, `১৭ নভেম্বর ২০২৬` |
| Bangla calendar | Optional বঙ্গাব্দ date in the top bar (common on BD sites). Revised Bangla Academy calendar, Pohela Boishakh fixed at 14 Apr. Nice-to-have |
| Address | House · Road · Block/Sector · Area · Thana · District-Postcode, e.g. *House 12, Road 5, Banani, Dhaka 1213* |
| Location fields | Cascading **Division → District → Upazila/Thana** selects (8 divisions, 64 districts) in both languages |

### 2.7 Corporate procurement norms
Procurement and admin teams want paperwork before they call:
- **Company Profile PDF** (EN; BN optional) on home, about and quote pages.
- Trade licence, TIN, BIN, Home Ministry licence and association membership shown as text, not hidden in images.
- The quote form asks for site type, number of guards, shift (8 / 12 hr), start date and location. That is what an ops manager needs to price a site survey.

### 2.8 Recruitment culture (highest-volume Bangla traffic)
- **Bangla-first, plain language, phone-first.** Many applicants are from rural districts and apply from a basic Android phone.
- State requirements plainly: age range, minimum height, education (SSC/JSC etc.), ex-forces or Ansar-VDP preferred, and salary range if the company agrees to publish one.
- **Three ways to apply:** short web form, call/WhatsApp, or a **printable PDF form** for walk-in, with walk-in addresses and times.
- **Fraud warning, prominent:** *"আমরা নিয়োগের জন্য কোনো টাকা নিই না।"* ("We never charge any fee for recruitment"), with a verification number to call. Recruitment-fee scams that impersonate security firms are common.
- **Collect the minimum online.** No NID number, photos or certificates via the website. Those are collected in person at interview (see §3).

### 2.9 Network & device reality
- Mostly **mid-range Android on metered mobile data**. First load under ~1 MB, no autoplay video, lazy YouTube embeds (thumbnail first), AVIF/WebP images, subset Bangla fonts.
- `lang="bn"` / `lang="en"` set correctly per page, so Android screen readers and TTS pronounce Bangla properly.

---

## 3. Legal & compliance context

> Researched from news and legal-commentary sources (Nov 2026). **Confirm with your lawyer and your own licence papers before launch.** The site only states what the company can prove.

| Area | What we know | Site impact |
|---|---|---|
| Sector law | **Private Security Services Act, 2006** (বেসরকারী নিরাপত্তা সেবা আইন, ২০০৬). Licences from the **Ministry of Home Affairs**, reportedly applied for via DMP | Licence number in `LicenceBlock` and on `/about/licences` |
| Labour | Contractor licence under **Bangladesh Labour Rules 2015** (labour department); Bangladesh Labour Act 2006 applies to guards | Show if held; welfare claims must match practice |
| Association | Industry bodies include **BPSSPA** (Bangladesh Professional Security Service Providers Association) and the **Bangladesh Security Services Companies Owners Association** | Show membership only if current |
| Data protection | **Personal Data Protection Ordinance 2025**, gazetted Nov 2025. Covers sensitive data (health, criminal records, biometrics) | Privacy policy, consent checkbox on every form, data minimisation (no NID/medical/criminal-record data online), stated retention period |
| Firearms | Personal gun licences cannot be used for private guard work | Not applicable. No armed services in v1 |

**A security company's own website is a trust test.** HTTPS only, HSTS, strict security headers/CSP, `/.well-known/security.txt`, no exposed admin panels, dependencies kept patched. A static Next.js site removes the WordPress-plugin attack surface common on local competitor sites.

---

## 4. Design system

### 4.1 Colour tokens (default proposal, replaced if you have brand colours)

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `green-700` primary | `#0A5C45` | Primary buttons, links, headings accents. Flag-green family, darkened for authority | 8.0 : 1 on white (AAA) |
| `navy-900` | `#0F1E3D` | Header, footer, dark sections | ~16 : 1 on white |
| `red-600` alert | `#C8102E` | **Hotline/emergency only** | 5.9 : 1 on white (AA) |
| `gold-500` | `#C9A227` | Badges, rank/licence seals, on navy only | 6.8 : 1 on navy (AA) |
| `paper-50` | `#F7F6F2` | Page background (warm off-white) | — |
| neutrals | warm grey 100–900 | Text, borders, surfaces | Body text ≥ 7 : 1 |

Rules: red never sits on green; gold never carries body text on white; every pairing passes WCAG 2.2 AA.

### 4.2 Typography
| | Bangla | English |
|---|---|---|
| Family | **Hind Siliguri** (fallback Noto Sans Bengali) | **Inter** |
| Loading | Self-hosted via `next/font`, subset, `display: swap` | same |
| Body size / line-height | 17px / 1.8 | 16px / 1.6 |
| Headings | 600–700 weight, line-height 1.4 | 700, line-height 1.2 |
| Never | `uppercase`, tight letter-spacing, italic Bangla | — |

Font stack `Inter, "Hind Siliguri", sans-serif` renders mixed BN/EN strings correctly: Inter has no Bengali glyphs, so Bangla falls through to Hind Siliguri.

### 4.3 Layout
Mobile-first, 360px minimum. Container 1200px. 8px spacing grid. 44px minimum tap targets. Components designed with **Bangla copy first**, since it runs 10–25% longer and taller.

---

## 5. Component inventory (~30)

| Group | Components |
|---|---|
| Layout | `TopBar` (hotline · office hours · BN date · language) · `Header` · `MainNav` · `MobileNavDrawer` · `StickyActionBar` (Call · WhatsApp · Quote) · `Footer` · `Breadcrumbs` · `LangSwitcher` |
| Trust | `TrustStrip` · `LicenceBlock` · `LeadershipMessage` · `LeadershipGrid` · `ClientLogos` · `Testimonials` · `CertBadge` |
| Content | `Hero` · `ServiceGrid` · `ServiceDetail` · `WhyUs` · `IndustryRow` · `ProcessSteps` · `CoverageMap` (accurate BD division SVG) · `NoticeList` · `CTABand` · `FAQAccordion` · `FestiveBanner` · `FraudWarning` · `ProfileDownload` |
| Forms | `QuoteForm` · `ContactForm` · `GuardApplicationForm` · `LocationSelect` (Division → District → Thana) · `BDPhoneInput` · `ConsentCheckbox` |
| UI primitives | `Button` · `Card` · `Badge` · `Input` · `Select` · `Textarea` · `Accordion` · `Icon` (Lucide) |

---

## 6. Technical architecture

### 6.1 Stack
- **Next.js (App Router), TypeScript strict, Tailwind CSS**, current stable versions pinned at scaffold time.
- **`next-intl`**, `localePrefix: 'always'`, default `bn`, middleware redirects `/` → `/bn` and remembers the user's choice.
- All pages **statically generated** (`generateStaticParams` for both locales). Forms are the only server code.
- Content: JSON (UI strings) + MDX (long-form pages) in mirrored `content/bn` ↔ `content/en` trees.

### 6.2 Project tree
```
src/
  app/
    [locale]/
      layout.tsx                 # <html lang>, fonts, TopBar/Header/Footer/StickyActionBar
      page.tsx                   # Home
      about/ (page, licences/, management/)
      services/ (page, [slug]/)
      industries/ (page, [slug]/)
      training/  operations/  clients/  case-studies/[slug]/  coverage/
      careers/ (page, apply-guard/, [slug]/)
      quote/  contact/  faq/  news/ (page, [slug]/)  privacy/  terms/
      not-found.tsx
    api/forms/[type]/route.ts    # quote | contact | guard-application
    sitemap.ts  robots.ts
  components/  layout/ trust/ content/ forms/ ui/
  i18n/        routing.ts  request.ts  formats.ts (lakh/crore, dates, BN calendar)
  lib/         schema-org.ts  validation.ts (zod; BD phone)  email.ts  ratelimit.ts
  data/        divisions-districts-thanas.json  offices.json  stats.json  services.json  festivals.json
content/       bn/…  en/…        # mirrored, identical keys and filenames
messages/      bn.json  en.json
public/        fonts/  images/  docs/company-profile-en.pdf  docs/guard-application-bn.pdf
scripts/       check-i18n-parity.ts  check-bangla-unicode.ts
tests/         e2e/ (Playwright)
middleware.ts  next.config.ts (security headers)
```

### 6.3 Forms pipeline
Client validation (zod, translated messages) → route handler → **honeypot + Cloudflare Turnstile + rate limit** → email to the ops inbox (Resend or SMTP) with a reference number → bilingual thank-you page with the hotline. v2: SMS alert to the duty officer via a local SMS gateway, plus a Google Sheet log.

### 6.4 SEO & analytics
- `hreflang` `bn` / `en` / `x-default`, per-locale metadata and Open Graph, one sitemap covering both locales.
- Structured data: `Organization`, `LocalBusiness` (per office), `Service` (per service page), `FAQPage`, **`JobPosting`** for guard vacancies (Google for Jobs reaches applicants). Schema.org has no dedicated security-company type.
- **Google Business Profile** per office, in both languages.
- GA4 + Meta Pixel (Facebook is the main ad channel), with a light consent notice in line with the data protection ordinance.

### 6.5 Quality gates (CI blocks merge)
| Check | Fails when |
|---|---|
| `check-i18n-parity` | A key or file exists in one locale and not the other |
| `check-bangla-unicode` | `bn` content contains legacy Bijoy/SutonnyMJ ANSI patterns instead of Unicode Bengali |
| Type check + lint | Any error |
| Playwright smoke | Any route in either locale is not 200, has the wrong `lang`, is missing hreflang, or is missing the hotline link |
| Lighthouse CI (mobile) | Performance < 90, Accessibility < 95, SEO < 95 |
| Link checker | Broken internal link |

### 6.6 Hosting & domain
- **Vercel** for v1 (native Next.js). After launch, measure TTFB from Dhaka. If it's poor, move to Cloudflare, which has edge locations in Bangladesh.
- **`.com.bd` domains are registered through BTCL** and need company documents. Start early, as it can take days to weeks. A `.com` can run in parallel.
- Security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) set in `next.config.ts`.

---

## 7. Build sequence

| # | Milestone | Deliverable | Gate |
|---|---|---|---|
| M0 | **Inputs** (§8) | Company data, logo, real photos, licence numbers | Enough to fill the home page truthfully |
| M1 | **Foundation** | Scaffold, tokens, fonts, i18n routing, layout shell (TopBar/Header/Footer/StickyActionBar), CI checks, preview deploy | Empty pages render in both languages and CI is green |
| M2 | **Home + Services hub + 1 service** | Bangla copy first, then English | **You approve look and tone before mass production** |
| M3 | Services & industries | Remaining 5–6 service + 6 industry pages | Content only, no new components |
| M4 | Trust pages | About (MD message), Licences, Management, Training, Clients, Coverage, FAQ | Every claim has evidence on file |
| M5 | Conversion | Quote, Contact, Careers, Apply-as-Guard, form backend, PDFs, `JobPosting` | Test submissions arrive in the ops inbox |
| M6 | Growth layer | News & notices, FestiveBanner, SEO, analytics, GBP, security headers | securityheaders.com A, Lighthouse gates pass |
| M7 | **Launch QA** | Native Bangla proofread, low-end Android on 4G, a11y, lawyer review of privacy & terms, domain live | Go live |

**Definition of done (every page):** exists in both locales with no missing keys · Bangla proofread by a native reader · works at 360px · Lighthouse mobile ≥ 90 · keyboard and screen-reader usable · hotline reachable in one tap · no unverifiable claims.

---

## 8. Inputs needed from you

1. **Identity:** legal name (EN + BN), logo (vector), tagline, brand colours if any
2. **Papers:** Home Ministry licence no., trade licence, TIN, BIN, labour contractor licence, association membership, ISO (if any)
3. **Numbers:** founding year, guards deployed, active clients, sites, districts covered
4. **Leadership:** names, ranks/retired titles, photos, MD's message (BN and/or EN)
5. **Contact:** hotline (16XXX?), mobile, WhatsApp, email, office addresses with map pins, office hours
6. **Photos:** real guards on duty (including female guards), training, offices, with signed consent
7. **Clients:** logos you have written permission to show, 2–3 attributable testimonials
8. **Recruitment:** age/height/education requirements, salary range (if publishable), benefits, walk-in addresses and times
9. **Services:** is *Mobile Patrol & Inspection* offered? Is there a real 24/7 control desk (decides `/operations`)?
10. **Domain:** preferred name and whether `.com.bd` is already registered

M1 can start before these arrive (placeholders are clearly marked). M2 needs items 1, 3, 5 and some photos.

---

## Sources

- [Prothom Alo: Security guards live with little security of their own](https://en.prothomalo.com/bangladesh/bcnqu8fwn2)
- [Dhaka Tribune: 700 security companies run on mere trade licences](https://www.dhakatribune.com/amp/bangladesh/126847/700-security-companies-run-on-mere-trade-licences)
- [The Financial Express: The state of private security services industry in Bangladesh](https://thefinancialexpress.com.bd/views/opinions/the-state-of-private-security-services-industry-in-bangladesh-1658593136)
- [Bangladesh Laws portal: Private Security Services Act 2006](https://bdlaws.minlaw.gov.bd/act-details-935.html)
- [TBS News: Unlicensed security firm sued under the Labour Act](https://www.tbsnews.net/node/299887)
- [UNB: Firearm licence holders can't work as guards](https://unb.com.bd/category/Bangladesh/firearm-licence-holders-cant-work-as-guards-ministry/30731)
- [TBS News: Data protection ordinances gazetted](https://www.tbsnews.net/node/1281356)
- [The Daily Star: Personal Data Protection Ordinance 2025, key takeaways](https://www.thedailystar.net/tech-startup/news/bangladeshs-personal-data-protection-ordinance-2025-key-takeaways-4015401)
- [G4S Bangladesh: Manned services](https://www.g4s.com/en-bd/content-pages/g4s-manned-services)
- [CCIFB: Elite Security Services Ltd profile (PDF)](https://ccifb.com.bd/wp-content/uploads/2021/06/ELITE-SECURITY-SERVICES-LIMITED.pdf)
- [TBS News: e-Guarding in Bangladesh](https://www.tbsnews.net/node/18269)
