import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale, type Locale } from "./config";
import type en from "./en.json";

export type Dictionary = typeof en;

// de.json is checked against en.json's shape, so a missing key fails the build.
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./en.json").then((m) => m.default),
  de: () => import("./de.json").then((m) => m.default),
};

export async function getLocale(): Promise<Locale> {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return locale;
}

export async function getDictionary() {
  return dictionaries[await getLocale()]();
}
