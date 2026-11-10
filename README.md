# Security Services Website — Bangladesh (EN / বাংলা)

Bilingual marketing website for a private security services company operating in Bangladesh.

**Current stage:** structure agreed. Scope, default language and stack are locked; no application code yet.

- [`docs/01-site-structure.md`](docs/01-site-structure.md) — navigation, full sitemap, page templates,
  bilingual architecture, content model, repo layout, stack recommendation, build phases.

## Languages

| Locale | Audience |
|---|---|
| `en` — English | corporate / institutional buyers, procurement, tenders |
| `bn` — বাংলা | residential clients, general public, guard recruitment |

Full content parity between locales is a hard requirement, not a stretch goal.

## Next step

Resolve the open decisions in §10 of the structure doc, then start Phase 1 (scaffold + i18n routing).

## Locked decisions

- **Scope v1:** manpower guarding only (static guards & supervisors, factory/industrial, corporate,
  bank & ATM, residential, event security).
- **Default language:** Bangla at the bare domain; Bangla is the source copy, English the translation.
- **Stack:** Next.js (App Router) + TypeScript + Tailwind, static-first, `next-intl`.
