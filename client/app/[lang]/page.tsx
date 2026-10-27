import type { Metadata } from "next";
import Link from "next/link";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { TechBand } from "@/components/tech-band";
import { localeAlternates } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { jsonLd, projects, site, stack } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return { title: { absolute: dict.home.metaTitle }, alternates: localeAlternates(locale) };
}

export default async function HomePage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.name,
          url: site.url,
          inLanguage: locale,
        })}
      />
      <HeroBackdrop>
        <PageHeader title={dict.home.title} text={dict.home.text} transparent>
          <Link href={`/${locale}/projects`} className="btn btn-primary">
            {dict.home.projects}
          </Link>
          <Link href={`/${locale}/contact`} className="btn btn-secondary bg-white hover:bg-primary-100 dark:bg-slate-900 dark:hover:bg-primary-900">
            {dict.home.contact}
          </Link>
        </PageHeader>

        <TechBand label={dict.home.stack} rows={[stack]} />
      </HeroBackdrop>

      <section className="container py-12 lg:py-24">
        <h2 className="mb-8 text-center">{dict.projects.title}</h2>
        {/* Mobile: swipeable row without a visible scrollbar, the next card peeks in. md+: three columns. */}
        <ul className="flex snap-x snap-mandatory gap-6 overflow-x-auto [scrollbar-width:none] md:grid md:grid-cols-3 md:overflow-visible">
          {projects.slice(0, 2).map((p) => (
            <li key={p.slug} className="w-4/5 shrink-0 snap-start md:w-auto">
              <ProjectCard as="h3" href={`/${locale}/projects/${p.slug}`} title={p.title[locale]} summary={p.summary[locale]} tags={p.tags} image={p.image} />
            </li>
          ))}
          {/* Third slot: skeleton card leading to the full list. */}
          <li className="w-4/5 shrink-0 snap-start md:w-auto">
            <Link
              href={`/${locale}/projects`}
              className="block h-full overflow-hidden rounded border border-dashed border-slate-300 transition-colors duration-300 hover:border-primary-500 dark:border-slate-700"
            >
              <div className="aspect-video bg-slate-100 dark:bg-slate-900" />
              <div className="flex flex-col items-center p-6">
                <div className="mb-4 h-6 w-2/3 rounded bg-slate-100 dark:bg-slate-900" />
                {/* Wraps instead of overflowing on narrow md columns. */}
                <span className="btn btn-secondary h-auto min-h-12 py-2 text-center whitespace-normal">{dict.home.moreProjects}</span>
                <div className="mt-4 flex gap-2">
                  <div className="h-6 w-16 rounded-full bg-slate-100 dark:bg-slate-900" />
                  <div className="h-6 w-20 rounded-full bg-slate-100 dark:bg-slate-900" />
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </section>

      <section className="container pb-12 lg:pb-24">
        <div className="rounded bg-primary-50 px-6 py-12 text-center lg:py-16 dark:bg-primary-950">
          <h2>{dict.home.ctaTitle}</h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed">{dict.home.ctaText}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {dict.home.contact}
            </Link>
            <Link href={`/${locale}/about`} className="btn btn-secondary bg-white hover:bg-primary-100 dark:bg-slate-900 dark:hover:bg-primary-900">
              {dict.home.about}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
