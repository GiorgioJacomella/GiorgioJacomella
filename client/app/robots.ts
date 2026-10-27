import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Static export only writes route handlers that opt in.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
