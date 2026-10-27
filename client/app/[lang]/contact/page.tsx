import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { localeAlternates } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return {
    title: dict.contact.title,
    description: dict.contact.description,
    alternates: localeAlternates(locale, "/contact"),
  };
}

export default async function ContactPage() {
  const dict = await getDictionary();
  return (
    <>
      <PageHeader title={dict.contact.title} text={dict.contact.text}>
        <ContactForm labels={dict.contact} />
      </PageHeader>

      <section className="container py-12 text-center lg:py-16">
        <h2 className="mb-6 text-xl lg:text-2xl">{dict.contact.direct}</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={`mailto:${site.email}`} className="btn btn-primary">
            {site.email}
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            LinkedIn
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            GitHub
          </a>
        </div>
      </section>
    </>
  );
}
