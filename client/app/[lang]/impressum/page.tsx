import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { localeAlternates } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { site } from "@/lib/site";

// Linked from the footer only, on purpose.
export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return {
    title: dict.impressum.title,
    description: dict.impressum.description,
    robots: { index: false },
    alternates: localeAlternates(locale, "/impressum"),
  };
}

export default async function ImpressumPage() {
  const dict = await getDictionary();
  return (
    <>
      <PageHeader title={dict.impressum.title} />
      <section className="container max-w-3xl py-12 lg:py-16">
        <address className="not-italic">
          {site.name}
          <br />
          Aarburg, Aargau
          <br />
          {dict.impressum.country}
          <br />
          <a href={`mailto:${site.email}`} className="underline hover:text-primary-500">
            {site.email}
          </a>
        </address>
      </section>
    </>
  );
}
