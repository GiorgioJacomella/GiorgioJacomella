// Display only: links to the tools live on the project pages.
type Item = { name: string; logo?: string };

// Every other row runs in the opposite direction.
export function TechBand({ label, rows }: { label: string; rows: Item[][] }) {
  return (
    <section className="border-b border-slate-100 py-10 dark:border-slate-900">
      <p className="mb-6 text-center text-xs font-semibold tracking-widest uppercase">{label}</p>
      <div className="flex flex-col gap-4">
        {rows.map((items, row) => {
          // The list renders twice so the -50% keyframe loops seamlessly, four times when short so half still fills wide screens.
          // ponytail: "short" assumes ~200px per item, raise the threshold if gaps show on very wide screens.
          const copies = items.length < 8 ? 4 : 2;
          return (
            <div key={row} className="overflow-hidden mask-x-from-85% motion-reduce:mask-none">
              {/* Copies are hidden from assistive tech and when motion is reduced. */}
              <ul
                className={`flex w-max animate-marquee motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center ${row % 2 ? "[animation-direction:reverse]" : ""}`}
                // Duration scales with the items in one half of the track, so every row moves at the same speed.
                style={{ animationDuration: `${(items.length * copies) / 2 * 5}s` }}
              >
                {Array.from({ length: copies }, (_, copy) =>
                  items.map(({ name, logo }) => (
                    <li
                      key={`${copy}-${name}`}
                      aria-hidden={copy > 0 || undefined}
                      className={`flex items-center gap-3 px-6 py-2 font-heading font-semibold text-slate-400 dark:text-slate-500 ${copy ? "motion-reduce:hidden" : ""}`}
                    >
                      {/* Mask paints any logo in the text color, so all stay the same grey in both themes */}
                      {logo && <span className="size-8 bg-current" style={{ mask: `url(/logos/${logo}.svg) center / contain no-repeat` }} />}
                      {name}
                    </li>
                  )),
                )}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
