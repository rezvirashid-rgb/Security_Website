#!/usr/bin/env python3
"""
Build a single-file, self-contained snapshot of the site for static hosting
(e.g. a Claude artifact link) where there is no server and no Next.js runtime.

  1. npm run build && npx next start -p 3100     (in another terminal)
  2. python3 scripts/build-snapshot.py [base_url] [out_file]

Every page (both languages) becomes a hidden <section> view; links are rewritten
to #bn-services style anchors and a tiny script shows the matching view.
CSS and the preloaded font subsets are inlined, Next.js scripts are dropped:
the menu and FAQs use native <details>, so they keep working without them.
"""
import base64
import json
import re
import sys
import urllib.request
from pathlib import Path

from bs4 import BeautifulSoup, Comment

ROOT = Path(__file__).resolve().parent.parent
BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3100"
OUT = Path(sys.argv[2]) if len(sys.argv) > 2 else ROOT / "snapshot" / "index.html"

SERVICES = ["manned-guarding", "factory-industrial", "corporate-office", "bank-atm", "residential", "event-security"]
INDUSTRIES = ["rmg-garments", "banking", "corporate", "real-estate", "education", "healthcare"]
PLANNED = (
    ["about", "about/licences", "about/management", "industries"]
    + [f"industries/{s}" for s in INDUSTRIES]
    + ["training", "clients", "coverage", "careers", "careers/apply-guard", "quote", "faq", "news", "contact", "privacy", "terms"]
)
PATHS = ["", "services"] + [f"services/{s}" for s in SERVICES] + PLANNED
LOCALES = ["bn", "en"]


def view_id(locale: str, path: str) -> str:
    return f"{locale}-{path.replace('/', '-') if path else 'home'}"


VIEW_IDS = {view_id(l, p) for l in LOCALES for p in PATHS}


def route_to_hash(href: str, locale: str) -> str | None:
    if href.endswith(".pdf"):
        return f"#{locale}-about"  # PDFs cannot be embedded in the snapshot
    m = re.fullmatch(r"/(bn|en)(?:/(.*))?", href)
    if not m:
        return None
    vid = view_id(m.group(1), (m.group(2) or "").strip("/"))
    return f"#{vid}" if vid in VIEW_IDS else f"#{m.group(1)}-home"


def fetch(path: str) -> str:
    with urllib.request.urlopen(f"{BASE}{path}") as r:
        return r.read().decode("utf-8")


def inline_css(css_href: str) -> str:
    css = (ROOT / ".next" / css_href.removeprefix("/_next/")).read_text("utf-8")
    media = ROOT / ".next" / "static" / "media"

    def font_face(m: re.Match) -> str:
        block = m.group(0)
        src = re.search(r"url\(\.\./media/([^)]+)\)", block)
        if not src:
            return block  # local() fallbacks
        name = src.group(1)
        if ".p." not in name:
            return ""  # non-preloaded subsets (cyrillic, greek, …) are not needed
        data = base64.b64encode((media / name).read_bytes()).decode()
        return block.replace(f"url(../media/{name})", f"url(data:font/woff2;base64,{data})")

    css = re.sub(r"@font-face\{[^}]*\}", font_face, css)
    assert "../media/" not in css, "unhandled media reference in CSS"
    return css


def main() -> None:
    views, css_href, html_classes, first_head = [], None, None, None
    for locale in LOCALES:
        for path in PATHS:
            url = f"/{locale}" + (f"/{path}" if path else "")
            soup = BeautifulSoup(fetch(url), "lxml")
            vid = view_id(locale, path)
            if css_href is None:
                css_href = soup.find("link", rel="stylesheet")["href"]
                html_classes = " ".join(soup.html.get("class", []))
                first_head = soup.head
            title = soup.title.string if soup.title else ""
            body = soup.body
            for tag in body.find_all(["script", "noscript"]):
                tag.decompose()
            # React hydration markers (<!--$-->, <!--&-->) are meaningless without React.
            for comment in body.find_all(string=lambda t: isinstance(t, Comment)):
                comment.extract()
            for div in body.find_all("div", attrs={"hidden": True}, recursive=False):
                div.decompose()
            skip = body.find("a", href="#main")
            if skip:
                skip.decompose()
            # Unique ids per view, and fix references to them.
            for el in body.find_all(id=True):
                el["id"] = f"{vid}--{el['id']}"
            for attr in ("aria-labelledby", "aria-describedby", "aria-controls", "for"):
                for el in body.find_all(attrs={attr: True}):
                    el[attr] = " ".join(f"{vid}--{x}" for x in el[attr].split())
            for a in body.find_all("a", href=True):
                new = route_to_hash(a["href"], locale)
                if new:
                    a["href"] = new
                    a.attrs.pop("hreflang", None)
            inner = "".join(str(c) for c in body.contents)
            views.append(
                f'<section class="view" id="view-{vid}" data-lang="{locale}" '
                f'data-title="{BeautifulSoup(title, "lxml").get_text().replace(chr(34), "&quot;")}" hidden>{inner}</section>'
            )
            print(f"  {url:40} → #{vid}")

    css = inline_css(css_href)
    icon = base64.b64encode((ROOT / "src" / "app" / "icon.svg").read_bytes()).decode()
    desc = first_head.find("meta", attrs={"name": "description"})
    router = """
(function () {
  var DEFAULT = 'bn-home';
  var MONTHS = ['বৈশাখ','জ্যৈষ্ঠ','আষাঢ়','শ্রাবণ','ভাদ্র','আশ্বিন','কার্তিক','অগ্রহায়ণ','পৌষ','মাঘ','ফাল্গুন','চৈত্র'];
  function bnDigits(s) { return String(s).replace(/[0-9]/g, function (d) { return '০১২৩৪৫৬৭৮৯'[d]; }); }
  function leap(y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; }
  function banglaDate(now) {
    var p = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka', year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(now);
    function g(t) { for (var i = 0; i < p.length; i++) if (p[i].type === t) return Number(p[i].value); }
    var y = g('year'), m = g('month'), d = g('day');
    var start = (m > 4 || (m === 4 && d >= 14)) ? y : y - 1;
    var idx = Math.round((Date.UTC(y, m - 1, d) - Date.UTC(start, 3, 14)) / 86400000);
    var len = [31,31,31,31,31,31,30,30,30,30, leap(start + 1) ? 30 : 29, 30], mo = 0;
    while (idx >= len[mo]) { idx -= len[mo]; mo++; }
    return bnDigits(idx + 1) + ' ' + MONTHS[mo] + ' ' + bnDigits(start - 593) + ' বঙ্গাব্দ';
  }
  function fillDates() {
    var now = new Date();
    document.querySelectorAll('.view').forEach(function (v) {
      var bn = v.getAttribute('data-lang') === 'bn';
      v.querySelectorAll('span.inline-block.min-w-48').forEach(function (s) {
        var g = new Intl.DateTimeFormat(bn ? 'bn-BD' : 'en-GB', { timeZone: 'Asia/Dhaka', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(now);
        s.className = '';
        s.removeAttribute('aria-hidden');
        s.textContent = g;
        if (bn) { var b = document.createElement('span'); b.className = 'text-gold-300'; b.textContent = ' · ' + banglaDate(now); s.appendChild(b); }
      });
    });
  }
  function show() {
    var id = (location.hash || '').slice(1);
    var v = document.getElementById('view-' + id);
    if (!v) {
      var saved = null; try { saved = localStorage.getItem('lang'); } catch (e) {}
      id = saved === 'en' ? 'en-home' : DEFAULT; v = document.getElementById('view-' + id);
    }
    document.querySelectorAll('.view').forEach(function (el) { el.hidden = el !== v; });
    var lang = v.getAttribute('data-lang');
    document.documentElement.lang = lang;
    document.title = v.getAttribute('data-title');
    try { localStorage.setItem('lang', lang); } catch (e) {}
    // Close every mobile menu (any view), but leave FAQ answers as the visitor left them.
    document.querySelectorAll('details[open]').forEach(function (d) { if (d.querySelector(':scope > summary[aria-label]')) d.removeAttribute('open'); });
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', show);
  fillDates();
  show();
})();
"""
    html = f"""<!DOCTYPE html>
<html lang="bn" class="{html_classes}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#0f1e3d">
{str(desc) if desc else ''}
<title>[Company Name] Security Services — Design Preview</title>
<link rel="icon" href="data:image/svg+xml;base64,{icon}">
<style>{css}</style>
</head>
<body class="min-h-dvh font-sans">
{''.join(views)}
<script>{router}</script>
</body>
</html>
"""
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(html, "utf-8")
    print(f"\n✓ {len(views)} views → {OUT} ({OUT.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
