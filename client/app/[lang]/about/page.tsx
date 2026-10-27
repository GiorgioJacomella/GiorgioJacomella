import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { TechBand } from "@/components/tech-band";
import { localeAlternates } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { jsonLd, site, stack } from "@/lib/site";
import portrait from "./portrait.webp";
import workspace from "./workspace.webp";

const social = "block text-slate-400 transition-colors duration-300 hover:text-primary-500 dark:text-slate-500 dark:hover:text-primary-400";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return {
    title: dict.about.title,
    description: dict.about.description,
    alternates: localeAlternates(locale, "/about"),
  };
}

export default async function AboutPage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const { title, text, skillsLabel, skills, studyTitle, studyText, projectsTitle, projectsText, projectsCta, portraitAlt, workspaceAlt } =
    dict.about;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          inLanguage: locale,
          mainEntity: {
            "@type": "Person",
            name: site.name,
            url: site.url,
            image: `${site.url}${portrait.src}`,
            jobTitle: "Full-Stack Developer",
            worksFor: { "@type": "Organization", name: "Synprovis" },
            sameAs: [site.github, site.linkedin],
          },
        })}
      />
      <PageHeader
        title={title}
        text={text}
        image={{ src: portrait, alt: portraitAlt }}
        aside={
          <ul className="flex items-center gap-4">
            {[
              { href: site.github, label: "GitHub", logo: "github" },
              { href: site.linkedin, label: "LinkedIn", logo: "linkedin" },
            ].map(({ href, label, logo }) => (
              <li key={logo}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={social}>
                  {/* Mask paints the logo in the text color, like the tech band. */}
                  <span className="block size-6 bg-current" style={{ mask: `url(/logos/${logo}.svg) center / contain no-repeat` }} />
                </a>
              </li>
            ))}
            <li>
              <Link href={`/${locale}/contact`} aria-label={dict.nav.contact} className={social}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" className="size-6">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path strokeLinejoin="round" d="m3 7 9 6 9-6" />
                </svg>
              </Link>
            </li>
          </ul>
        }
      />

      <TechBand label={skillsLabel} rows={[stack, skills.map((name) => ({ name }))]} />

      {/* Mobile: image, title, text. md+: text left 2/3, image right 1/3 (mirror of the header). */}
      <section className="py-12 lg:py-24">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 text-center md:flex-row-reverse md:text-left lg:gap-16">
          <Image
            src={workspace}
            alt={workspaceAlt}
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 33vw, 240px"
            className="aspect-square h-auto w-60 max-w-full shrink-0 rounded-full object-cover shadow-lg shadow-primary-500/20 ring-4 ring-white md:w-1/3 dark:ring-slate-800"
          />
          <div className="md:w-2/3">
            <h2>{studyTitle}</h2>
            <p className="text-lg leading-relaxed">{studyText}</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 lg:py-24 dark:bg-slate-900">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2>{projectsTitle}</h2>
          <p className="text-lg leading-relaxed">{projectsText}</p>
          <Link href={`/${locale}/contact`} className="btn btn-primary mt-8">
            {projectsCta}
          </Link>
        </div>
      </section>
    </>
  );
}
