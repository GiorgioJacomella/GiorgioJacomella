"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { chip, ProjectCard, type ProjectItem } from "@/components/project-card";
import type { Dictionary } from "@/i18n/dictionaries";
import { tags, tagStyles, type Tag } from "@/lib/site";
import { useDismiss } from "@/lib/use-dismiss";

function RemoveButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="-mr-1 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" className="size-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
  );
}

export function ProjectList({ items, labels }: { items: ProjectItem[]; labels: Dictionary["projects"] }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Tag[]>([]);
  const [open, setOpen] = useState(false);
  const filterRef = useDismiss<HTMLDivElement>(open, () => setOpen(false));

  const toggle = (tag: Tag) => setSelected((s) => (s.includes(tag) ? s.filter((t) => t !== tag) : [...s, tag]));
  const q = query.trim().toLowerCase();
  // Tags match any-of; search matches title, summary or tag names.
  const visible = items.filter(
    (item) =>
      (selected.length === 0 || item.tags.some((t) => selected.includes(t))) &&
      (!q || [item.title, item.summary, ...item.tags].some((field) => field.toLowerCase().includes(q))),
  );

  return (
    <>
      <PageHeader title={labels.title} text={labels.text}>
        <div className="w-full text-left">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">{labels.search}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={labels.search}
                className="h-12 w-full rounded border border-slate-200 bg-white pr-4 pl-12 text-slate-700 outline-none focus:border-primary-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50"
              />
            </label>
    
            <div ref={filterRef} className="relative">
              <button
                type="button"
                aria-expanded={open}
                aria-controls="tag-filter"
                onClick={() => setOpen((o) => !o)}
                className="flex h-12 w-full items-center justify-between gap-2 rounded border border-slate-200 bg-white px-4 font-medium text-slate-700 hover:border-primary-500 sm:w-auto dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50"
              >
                {labels.tags}
                {selected.length > 0 && <span className="rounded-full bg-primary-500 px-2 text-xs text-white">{selected.length}</span>}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {open && (
                <fieldset id="tag-filter" className="absolute top-full right-0 z-10 mt-2 w-full min-w-56 animate-dropdown rounded border border-slate-200 bg-white p-2 shadow-lg shadow-slate-700/5 dark:border-slate-800 dark:bg-slate-900">
                  <legend className="sr-only">{labels.tags}</legend>
                  {tags.map((tag) => (
                    <label key={tag} className="flex cursor-pointer items-center gap-3 rounded px-2 py-2 hover:bg-slate-50 dark:hover:bg-slate-800">
                      <input type="checkbox" checked={selected.includes(tag)} onChange={() => toggle(tag)} className="size-4 accent-primary-500" />
                      <span className={`${chip} ${tagStyles[tag]}`}>{tag}</span>
                    </label>
                  ))}
                </fieldset>
              )}
            </div>
          </div>
    
          {(q || selected.length > 0) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {q && (
                <span className={`${chip} bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200`}>
                  “{query.trim()}”
                  <RemoveButton label={`${labels.remove}: ${query.trim()}`} onClick={() => setQuery("")} />
                </span>
              )}
              {selected.map((tag) => (
                <span key={tag} className={`${chip} ${tagStyles[tag]}`}>
                  {tag}
                  <RemoveButton label={`${labels.remove}: ${tag}`} onClick={() => toggle(tag)} />
                </span>
              ))}
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelected([]);
                }}
                className="ml-1 text-xs font-semibold text-primary-500 hover:text-primary-700 dark:text-primary-400"
              >
                {labels.clearAll}
              </button>
            </div>
          )}
        </div>
      </PageHeader>

      <section className="container py-12 lg:py-24">
        {visible.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-3">
            {visible.map((item) => (
              <li key={item.href}>
                <ProjectCard {...item} />
              </li>
            ))}
          </ul>
        ) : (
          <p role="status" className="text-center">
            {labels.noResults}
          </p>
        )}
      </section>
    </>
  );
}
