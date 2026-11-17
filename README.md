# Security Services Website — Bangladesh (বাংলা / English)

Bilingual website for a private security services company operating in Bangladesh.
Bangla is the default language; every page also exists in English.

**Current stage:** initial design (milestone M1 + M2 of the build plan). Home page,
Services hub and the Manned Guarding service page are designed in both languages; every
other sitemap route shows a "being built" page. All company data is placeholder.

## Run it locally

Requires **Node.js 20.9 or newer**.

```bash
git clone https://github.com/rezvirashid-rgb/Security_Website.git
cd Security_Website
git checkout claude/nice-maxwell-o5so6r
npm install
npm run dev
```

Open <http://localhost:3000> — it redirects to the Bangla site at `/bn`. Use the
**বাংলা / English** switch in the top bar to change language on the same page.
Edits are reloaded in the browser as you save.

| Command | What it does |
|---|---|
| `npm run dev` | Development server with live reload on port 3000 |
| `npm run build` then `npm start` | Production build and server |
| `npm run check` | Translation parity + Bangla Unicode check, TypeScript, lint |

## Where to change things

| To change… | Edit |
|---|---|
| Company name, hotline, WhatsApp, email, licence numbers, stats | `src/config/site.ts` (set `isPlaceholder: false` once real) |
| Any text, in Bangla | `src/dictionaries/bn.json` (the source copy) |
| The same text, in English | `src/dictionaries/en.json` (must keep the same keys) |
| Colours, fonts, Bangla typography, cultural motifs | `src/app/globals.css` |
| Order of services, industries, divisions, header menu | `src/data/catalog.ts` |
| Page layouts | `src/app/[locale]/…` and `src/components/sections/…` |

While `isPlaceholder` is `true` the site shows a "design preview" ribbon, tells search
engines not to index it, and a Vercel production build refuses to run unless the Vercel
project sets `ALLOW_PLACEHOLDER_PRODUCTION=1`. Remove that variable when real data is in.

## Guard-rails

- **Translation parity:** a key missing from either language fails `npm run check` (and TypeScript).
- **Bangla Unicode:** text pasted in Bijoy/SutonnyMJ encoding, or with stray Devanagari letters, fails the check.
- **Honest placeholders:** photo, client-logo and testimonial slots say what goes there instead of using stock images.

## Docs

- [`docs/01-site-structure.md`](docs/01-site-structure.md) — navigation, sitemap, page templates, bilingual architecture.
- [`docs/02-build-plan.md`](docs/02-build-plan.md) — industry baseline, Bangladeshi cultural layer, legal context,
  design tokens, component inventory, architecture, milestones, inputs checklist.
