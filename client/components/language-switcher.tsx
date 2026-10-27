"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { languageNames, locales, type Locale } from "@/i18n/config";
import { useDismiss } from "@/lib/use-dismiss";

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));
  // Same page in the other language: swap the leading /en or /de.
  const rest = pathname.replace(/^\/[^/]+/, "");

  return (
    <div ref={ref} className="relative flex">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="language-menu"
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 px-1 text-sm font-semibold uppercase hover:text-primary-500 lg:px-2"
      >
        {locale}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <ul id="language-menu" className="absolute top-full right-0 min-w-36 animate-dropdown rounded-b bg-white py-2 shadow-lg shadow-slate-700/5 dark:bg-slate-900">
          {locales.map((l) => (
            <li key={l}>
              <Link
                href={`/${l}${rest}`}
                hrefLang={l}
                lang={l}
                aria-current={l === locale ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 hover:text-primary-500 ${l === locale ? "text-primary-500 dark:text-primary-400" : ""}`}
              >
                {languageNames[l]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
