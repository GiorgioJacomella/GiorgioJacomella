"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { projects, site } from "@/lib/site";

const link =
  "flex items-center gap-1 py-4 transition-colors duration-300 hover:text-primary-500 lg:px-6 dark:hover:text-primary-400";
const subLink =
  "block py-2 whitespace-nowrap transition-colors duration-300 hover:text-primary-500 lg:px-4 dark:hover:text-primary-400";
const active = "text-primary-500 dark:text-primary-400";

function toggleTheme() {
  const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className={`size-4 transition-transform ${className}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

export function Header({ locale, labels }: { locale: Locale; labels: Dictionary["nav"] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);

  // Layouts stay mounted across navigations, so the mobile menu has to close itself.
  const close = () => {
    setMenuOpen(false);
    setProjectsOpen(false);
  };
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const base = `/${locale}`;

  return (
    <header className="header-shadow sticky top-0 z-20 bg-white/90 backdrop-blur-sm dark:bg-slate-900/90">
      <nav aria-label="Main" className="container flex h-[5.5rem] items-stretch gap-2 font-medium text-slate-700 dark:text-slate-50">
        <Link href={base} onClick={close} className="mr-auto flex items-center gap-2 font-heading text-base font-black whitespace-nowrap sm:text-xl sm:tracking-wider lg:text-2xl">
          <Logo className="size-7 sm:size-8 lg:size-10" />
          {/* Very narrow phones: logo only, name stays for screen readers */}
          <span className="max-[359px]:sr-only">{site.name}</span>
        </Link>

        {/* Mobile: full-screen panel. Desktop: inline row. */}
        <ul
          id="main-menu"
          className={`${menuOpen ? "flex" : "hidden"} absolute inset-x-0 top-full h-[calc(100dvh-5.5rem)] flex-col overflow-y-auto bg-white px-8 py-6 lg:static lg:flex lg:h-auto lg:flex-row lg:items-stretch lg:overflow-visible lg:bg-transparent lg:p-0 dark:bg-slate-900 lg:dark:bg-transparent`}
        >
          <li className="flex">
            <Link href={`${base}/about`} onClick={close} className={`${link} ${isActive(`${base}/about`) ? active : ""}`}>
              {labels.about}
            </Link>
          </li>

          {/* Desktop opens on hover/focus (CSS only); mobile uses the chevron button. */}
          <li className="group relative flex flex-col">
            <div className="flex items-center justify-between lg:h-full lg:items-stretch">
              <Link href={`${base}/projects`} onClick={close} className={`${link} ${isActive(`${base}/projects`) ? active : ""}`}>
                {labels.projects}
                <Chevron className="hidden lg:block lg:group-focus-within:rotate-180 lg:group-hover:rotate-180" />
              </Link>
              <button
                type="button"
                aria-expanded={projectsOpen}
                aria-controls="projects-menu"
                aria-label={labels.toggleProjects}
                onClick={() => setProjectsOpen((open) => !open)}
                className="p-2 lg:hidden"
              >
                <Chevron className={projectsOpen ? "rotate-180" : ""} />
              </button>
            </div>
            <ul
              id="projects-menu"
              className={`${projectsOpen ? "block" : "hidden"} animate-dropdown rounded bg-slate-300/10 px-4 lg:absolute lg:top-full lg:left-0 lg:hidden lg:min-w-48 lg:rounded-t-none lg:bg-white lg:px-0 lg:shadow-lg lg:shadow-slate-700/5 lg:group-focus-within:block lg:group-hover:block lg:dark:bg-slate-900`}
            >
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`${base}/projects/${project.slug}`}
                    onClick={close}
                    className={`${subLink} ${isActive(`${base}/projects/${project.slug}`) ? active : ""}`}
                  >
                    {project.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li className="flex">
            <Link href={`${base}/contact`} onClick={close} className={`${link} ${isActive(`${base}/contact`) ? active : ""}`}>
              {labels.contact}
            </Link>
          </li>
        </ul>

        <LanguageSwitcher locale={locale} label={labels.language} />

        {/* Icons swap via CSS so server and client render the same markup. */}
        <button type="button" onClick={toggleTheme} aria-label={labels.toggleTheme} className="flex w-10 items-center justify-center hover:text-primary-500 lg:w-12">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="size-6 dark:hidden">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="hidden size-6 dark:block">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
        </button>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          aria-label={labels.toggleMenu}
          onClick={() => setMenuOpen((open) => !open)}
          className="relative w-10 lg:hidden"
        >
          <span aria-hidden="true" className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2">
            <span className={`absolute block h-0.5 rounded-full bg-current transition-all duration-300 ${menuOpen ? "w-6 rotate-45" : "w-9/12 -translate-y-2"}`} />
            <span className={`absolute block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${menuOpen ? "-rotate-45" : ""}`} />
            <span className={`absolute block h-0.5 rounded-full bg-current transition-all duration-300 ${menuOpen ? "w-0" : "w-1/2 translate-y-2"}`} />
          </span>
        </button>
      </nav>
    </header>
  );
}
