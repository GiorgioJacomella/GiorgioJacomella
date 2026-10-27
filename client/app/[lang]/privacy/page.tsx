import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { localeAlternates } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

// Linked from the footer only, like the Impressum.
export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return {
    title: dict.privacy.title,
    description: dict.privacy.description,
    robots: { index: false },
    alternates: localeAlternates(locale, "/privacy"),
  };
}

export default async function PrivacyPage() {
  const dict = await getDictionary();
  return (
    <>
      <PageHeader title={dict.privacy.title} />
      <section className="container max-w-3xl py-12 lg:py-16">
        {dict.privacy.sections.map(({ title, text }) => (
          <div key={title} className="mb-8">
            <h2 className="text-xl lg:text-2xl">{title}</h2>
            <p className="leading-relaxed">{text}</p>
          </div>
        ))}
      </section>
    </>
  );
}
