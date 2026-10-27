import { notFound } from "next/navigation";

// Unmatched URLs like /de/nope land here, so they get the styled, translated
// [lang]/not-found page with a real 404 instead of Next's bare default.
export function generateStaticParams() {
  return [{ rest: ["404"] }];
}

export default function CatchAll() {
  notFound();
}
