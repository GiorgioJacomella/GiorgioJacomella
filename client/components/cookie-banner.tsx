"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const KEY = "analytics";
const GA_ID = "G-N5T45Q1F1K";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function getChoice() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function setChoice(value: "granted" | "denied") {
  try {
    localStorage.setItem(KEY, value);
  } catch {}
}

// Only ever called after consent. Until then nothing from Google is requested and no cookie is set.
function loadGA() {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // gtag.js expects the arguments object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.append(s);
}

const button =
  "rounded-md border border-slate-300 px-4 py-2 font-medium transition-colors duration-300 hover:border-primary-500 hover:text-primary-500 dark:border-slate-700";

export function CookieBanner({ locale, labels }: { locale: Locale; labels: Dictionary["cookies"] }) {
  // Hidden until mounted: the static HTML can't know the saved choice.
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const choice = getChoice();
    if (choice === "granted") loadGA();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
    else if (choice !== "denied") setOpen(true);
  }, []);

  if (!open) return null;

  const decide = (value: "granted" | "denied") => {
    setChoice(value);
    if (value === "granted") loadGA();
    setOpen(false);
  };

  return (
    <div
      role="region"
      aria-label={labels.settings}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-2xl flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 text-sm shadow-lg sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900"
    >
      <p className="flex-1">
        {labels.text}{" "}
        <Link href={`/${locale}/privacy`} className="underline hover:text-primary-500">
          {labels.more}
        </Link>
      </p>
      <div className="flex gap-2">
        <button type="button" onClick={() => decide("denied")} className={button}>
          {labels.decline}
        </button>
        <button type="button" onClick={() => decide("granted")} className={button}>
          {labels.accept}
        </button>
      </div>
    </div>
  );
}

// Withdraw consent: forget the choice, delete GA's cookies, reload so GA is gone and the banner asks again.
export function CookieSettings({ label, className }: { label: string; className?: string }) {
  const reset = () => {
    try {
      localStorage.removeItem(KEY);
    } catch {}
    const expire = "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    for (const c of document.cookie.split("; ")) {
      const name = c.split("=")[0];
      if (!name.startsWith("_ga")) continue;
      document.cookie = name + expire;
      document.cookie = `${name}${expire}; domain=${location.hostname}`;
      document.cookie = `${name}${expire}; domain=.${location.hostname.split(".").slice(-2).join(".")}`;
    }
    location.reload();
  };

  return (
    <button type="button" onClick={reset} className={className}>
      {label}
    </button>
  );
}
