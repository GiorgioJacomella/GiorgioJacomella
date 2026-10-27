import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { chip } from "@/components/project-card";
import { localeAlternates } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { projects, tagStyles } from "@/lib/site";

const findProject = (slug: string) => projects.find((project) => project.slug === slug);

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const [locale, { slug }] = await Promise.all([getLocale(), params]);
  const project = findProject(slug);
  if (!project) return {};
  return {
    title: project.title[locale],
    description: project.summary[locale],
    alternates: localeAlternates(locale, `/projects/${project.slug}`),
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const [locale, dict, { slug }] = await Promise.all([getLocale(), getDictionary(), params]);
  const project = findProject(slug);
  if (!project) notFound();
  return (
    <>
      {/* Project image as the title background, darkened so the white text stays readable. */}
      <section className="relative overflow-hidden bg-slate-900 py-16 lg:py-32">
        <Image src={project.image} alt="" fill preload sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-white dark:text-white">{project.title[locale]}</h1>
          <p className="text-lg leading-relaxed text-slate-200">{project.summary[locale]}</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className={`${chip} ${tagStyles[tag]}`}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Static list, unlike the moving bands elsewhere: each tool opens its website in a new tab. */}
      <section className="border-b border-slate-100 py-10 dark:border-slate-900">
        <p className="mb-6 text-center text-xs font-semibold tracking-widest uppercase">{dict.projects.builtWith}</p>
        <ul className="container flex flex-wrap justify-center gap-3">
          {project.stack.map(({ name, logo, href }) => (
            <li key={name}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                {logo && <span className="size-5 bg-current" style={{ mask: `url(/logos/${logo}.svg) center / contain no-repeat` }} />}
                {name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="py-12 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          {project.body[locale].map((paragraph) => (
            <p key={paragraph} className="mb-6 text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
          {project.links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-4">
              {project.links.map(({ href, label }, i) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={`btn ${i === 0 ? "btn-primary" : "btn-secondary"}`}>
                  {label[locale]}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
