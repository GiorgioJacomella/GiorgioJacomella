import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export default async function NotFound() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <PageHeader title={dict.notFound.title} text={dict.notFound.text}>
      <Link href={`/${locale}`} className="btn btn-primary">
        {dict.notFound.back}
      </Link>
    </PageHeader>
  );
}
