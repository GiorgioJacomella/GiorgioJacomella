import type { Metadata } from "next";
import { ProjectList } from "@/components/project-list";
import { localeAlternates } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { projects } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return {
    title: dict.projects.title,
    description: dict.projects.text,
    alternates: localeAlternates(locale, "/projects"),
  };
}

export default async function ProjectsPage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  // Only the current language's strings go to the client component.
  const items = projects.map((p) => ({
    href: `/${locale}/projects/${p.slug}`,
    title: p.title[locale],
    summary: p.summary[locale],
    tags: p.tags,
    image: p.image,
  }));
  return <ProjectList items={items} labels={dict.projects} />;
}
