import Link from "next/link";
import { Logo } from "@/components/logo";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { projects, site } from "@/lib/site";

const social = [
  {
    name: "GitHub",
    href: site.github,
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    name: "LinkedIn",
    href: site.linkedin,
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

// Logo sources, see lib/site.ts.
const credits = [
  { name: "Simple Icons (CC0)", href: "https://simpleicons.org" },
  { name: "Devicon (MIT)", href: "https://devicon.dev" },
];

const heading = "mb-3 font-heading font-bold text-slate-700 dark:text-slate-50";
const link = "transition-colors duration-300 hover:text-primary-500";

export async function Footer() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <footer className="text-sm">
      <div className="border-t border-slate-100 bg-slate-50 py-12 dark:border-slate-900 dark:bg-slate-950">
        <div className="container grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link href={`/${locale}`} className="mb-4 flex w-fit items-center gap-2 font-heading text-xl font-bold text-slate-700 dark:text-slate-50">
              <Logo className="size-8" />
              {site.name}
            </Link>
            <p className="max-w-xl">{dict.meta.description}</p>
          </div>
          <nav aria-label={dict.footer.pages}>
            <h2 className={`${heading} text-base lg:text-base`}>{dict.footer.pages}</h2>
            <ul className="space-y-2">
              {(["about", "projects", "contact"] as const).map((page) => (
                <li key={page}>
                  <Link href={`/${locale}/${page}`} className={link}>
                    {dict.nav[page]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={dict.nav.projects}>
            <h2 className={`${heading} text-base lg:text-base`}>{dict.nav.projects}</h2>
            <ul className="space-y-2">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${locale}/projects/${p.slug}`} className={link}>
                    {p.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-100 py-4 text-slate-600 dark:border-slate-900 dark:bg-slate-800/50 dark:text-slate-400">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
          <p>
            © {site.name} ·{" "}
            <Link href={`/${locale}/impressum`} className={link}>
              {dict.impressum.title}
            </Link>{" "}
            ·{" "}
            <Link href={`/${locale}/privacy`} className={link}>
              {dict.footer.privacy}
            </Link>{" "}
            · {dict.footer.icons}:{" "}
            {credits.map(({ name, href }, i) => (
              <span key={href}>
                {i > 0 && ", "}
                <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
                  {name}
                </a>
              </span>
            ))}
          </p>
          <ul className="flex gap-6">
            {social.map(({ name, href, path }) => (
              <li key={name}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className={link}>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
                    <path d={path} />
                  </svg>
                </a>
              </li>
            ))}
            <li>
              <Link href={`/${locale}/contact`} aria-label={dict.nav.contact} className={link}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" className="size-4">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path strokeLinejoin="round" d="m3 7 9 6 9-6" />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
