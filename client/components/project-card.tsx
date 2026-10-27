import Image from "next/image";
import Link from "next/link";
import { tagStyles, type Tag } from "@/lib/site";

export const chip = "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold";

export type ProjectItem = { href: string; title: string; summary: string; tags: Tag[]; image: string };

// `as` keeps the outline right: h2 under the projects page h1, h3 under a home section h2.
export function ProjectCard({ href, title, summary, tags, image, as: Heading = "h2" }: ProjectItem & { as?: "h2" | "h3" }) {
  return (
    <Link
      href={href}
      className="block h-full overflow-hidden rounded border border-slate-200 transition-colors duration-300 hover:border-primary-500 dark:border-slate-800"
    >
      {/* Decorative: the title right below already names the link. */}
      <Image src={image} alt="" width={1600} height={900} className="aspect-video w-full object-cover" />
      <div className="p-6">
        <Heading className="mb-4 text-xl lg:text-xl">{title}</Heading>
        <p>{summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag} className={`${chip} ${tagStyles[tag]}`}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
