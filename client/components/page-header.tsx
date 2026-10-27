import Image, { type StaticImageData } from "next/image";

export function PageHeader({
  title,
  text,
  image,
  transparent,
  aside,
  children,
}: {
  title: string;
  text?: string;
  image?: { src: StaticImageData; alt: string };
  // Shown right of the title, e.g. social links.
  aside?: React.ReactNode;
  // For a wrapper that paints its own background, like the home hero backdrop.
  transparent?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className={`py-12 lg:py-24 ${transparent ? "" : "bg-slate-50 dark:bg-slate-900"}`}>
      <div
        className={`mx-auto px-6 text-center ${image ? "flex max-w-5xl flex-col items-center gap-8 md:flex-row md:text-left lg:gap-16" : "max-w-3xl"}`}
      >
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            preload
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 33vw, 240px"
            className="aspect-square h-auto w-60 max-w-full shrink-0 md:w-1/3 rounded-full object-cover shadow-lg shadow-primary-500/20 ring-4 ring-white dark:ring-slate-800"
          />
        )}
        <div className={image ? "md:w-2/3" : undefined}>
          {aside ? (
            <div className="mb-6 flex flex-wrap items-center justify-center gap-4 md:justify-between">
              <h1 className="mb-0">{title}</h1>
              {aside}
            </div>
          ) : (
            <h1>{title}</h1>
          )}
          {text && <p className="text-lg leading-relaxed">{text}</p>}
          {children && <div className="mt-8 flex flex-wrap justify-center gap-4">{children}</div>}
        </div>
      </div>
    </section>
  );
}
