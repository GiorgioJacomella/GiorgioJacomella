# giorgio.jacomella.dev

Personal portfolio built with Next.js 16 (App Router, Turbopack, static export), React 19, Tailwind CSS 4 and TypeScript. Every page is exported to static HTML in `out/`, in English and German, and served by Cloudflare.

## Requirements

- Node.js 20.9 or newer (`node -v`)
- npm

## Setup

```bash
cd client
npm install
npm run dev        # http://localhost:3000
```

| Command         | What it does                                  |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Dev server with hot reload                    |
| `npm run lint`  | ESLint (Next.js core-web-vitals + TypeScript) |
| `npm run build` | Static export to `out/`, also type-checks     |
| `npx wrangler dev` | Serve `out/` like Cloudflare does (redirects, 404s) |

`next build` no longer runs the linter, so run `npm run lint` before you push.

## Structure

```
wrangler.jsonc            Cloudflare config: serves out/, custom domain, 404 handling
public/_redirects         / → /en, /about → /en/about, old /project/* URLs
public/_headers           content type for the extensionless generated images
app/
  globals.css             Tailwind theme: blue palette, fonts, buttons
  [lang]/                 every page lives under /en or /de
    layout.tsx            root layout, site metadata, theme script
    page.tsx              /en, /de
    about/page.tsx        /en/about (+ portrait.webp, workspace.webp)
    projects/page.tsx     /en/projects (search + tag filter)
    projects/[slug]/      /en/projects/project-1 …
    contact/page.tsx      /en/contact
    impressum/, privacy/  legal pages, footer only, noindex
    not-found.tsx         translated 404 page
    [...rest]/page.tsx    sends unknown URLs to that 404 page
    opengraph-image.tsx   social preview per language, generated at build time
  sitemap.ts, robots.ts   /sitemap.xml (all pages in both languages), /robots.txt
  icon.svg, favicon.ico   favicon (the logo; .ico = fallback for older browsers)
  apple-icon.tsx          iOS home-screen icon, generated at build time
i18n/
  config.ts               languages, hreflang helper
  en.json, de.json        all UI text
  dictionaries.ts         loads the right JSON on the server
components/               header, language switcher, project list, footer, logo, page header
lib/site.ts               name, URL, links, tags (with colors) and projects
```

### Editing content

- **UI text:** edit `i18n/en.json` and `i18n/de.json`. Both files need the same keys; the build fails if `de.json` is missing one. German uses Swiss spelling: write `ss`, never `ß`.
- **Links, projects, tags:** edit `lib/site.ts`. Each project has its title and summary in both languages, plus its tags. The menu, pages and sitemap read from there.
- **Add a tag:** add it to `tags` and give it a color in `tagStyles` in `lib/site.ts`.
- **Colors and fonts:** edit `app/globals.css` (`--color-primary-*`) and `app/[lang]/layout.tsx` (fonts).

## Languages

English (`/en`) and German (`/de`). This follows the Next.js internationalization guide, with no extra library.

- Visiting a URL without a language (like `/` or `/about`) redirects to English, via `public/_redirects`. There's no server, so no browser-language detection; the switcher in the header links to the same page in the other language.
- Server components read the language with `getLocale()` and `getDictionary()` from `i18n/dictionaries.ts`, so the language doesn't have to be passed down through every component.
- To add a language, add it to `locales` in `i18n/config.ts`, create the JSON file, register it in `i18n/dictionaries.ts`, and add the translations to the projects in `lib/site.ts`.

## SEO

What is already set up:

- **Static HTML:** every page is exported in both languages. `output: "export"` makes the build fail if a page stops being static. Route handlers (`robots.ts`, `sitemap.ts`, the generated images) need `export const dynamic = "force-static"`.
- **Canonical URLs and hreflang:** each page sets `alternates: localeAlternates(locale, "/path")`. That gives it its own canonical URL plus links to its translation and an `x-default` version, so Google shows the right language. `x-default` points to the English URL. Don't set a canonical in a layout, or every page below it points to the same URL.
- **Metadata:** each page has its own translated title (`Page · Giorgio Jacomella`) and description. `<html lang>` is `en` or `de-CH`.
- **Sitemap and robots:** `/sitemap.xml` lists every page in both languages with its translations (not Impressum and privacy, those are `noindex`). `/robots.txt` points to it.
- **Structured data:** JSON-LD for `WebSite` on the home page and `ProfilePage`/`Person` on the about page.
- **Status codes:** unknown URLs return a real `404` with the translated not-found page (`not_found_handling: "404-page"` serves the nearest `404.html`). `/en/about/` redirects to `/en/about`.

When you add a page, create it under `app/[lang]/`, give it `generateMetadata` with `title`, `description` and `alternates: localeAlternates(locale, "/your-path")`, and add the path to `app/sitemap.ts`.

## Deployment (Cloudflare)

1. In Cloudflare, go to **Workers & Pages → Create → Import a repository** and pick this repo.
2. Set **Root directory** to `client`, **Build command** to `npm run build`, **Deploy command** to `npx wrangler deploy`.
3. Under **Build variables**, add `NEXT_PUBLIC_WEB3FORMS_KEY` (see `.env.example`). It is baked into the HTML at build time.
4. Delete any existing DNS record for `giorgio` first. The `custom_domain` route in `wrangler.jsonc` then creates it on deploy.
5. Delete the old Cloudflare Pages project. Otherwise `giorgiojacomella.pages.dev` keeps serving a duplicate copy of the site.

## After going live (Google Search Console)

1. Add a **Domain property** for `jacomella.dev` and verify it with the DNS TXT record.
2. Under **Sitemaps**, submit `https://giorgio.jacomella.dev/sitemap.xml`.
3. Use **URL Inspection → Request indexing** on the home page and `/about`.
4. Check the results with the [Rich Results Test](https://search.google.com/test/rich-results) (structured data) and PageSpeed Insights (Core Web Vitals).
