import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { projects, site } from "@/lib/site";

// One entry per page and language, each listing its translations (hreflang).
// URLs only otherwise: Google ignores priority/changefreq and distrusts lastmod that changes every build.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/about", "/projects", ...projects.map((p) => `/projects/${p.slug}`), "/contact"];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])) },
    })),
  );
}
