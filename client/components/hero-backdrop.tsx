// Decorative skeletons of websites and charts behind the home hero, tilted upward to the right.
// Center is masked out so the hero text stays readable.

const card = "shrink-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950";
const block = "rounded bg-slate-200 dark:bg-slate-800";
// Full class strings so Tailwind picks them up.
const shades = ["bg-primary-500/10", "bg-primary-500/25", "bg-primary-500/40", "bg-primary-500/60", "bg-primary-500/80"];

function Site() {
  return (
    <div className={`${card} w-72`}>
      <div className="mb-4 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-2 rounded-full bg-slate-300 dark:bg-slate-700" />
        ))}
      </div>
      <div className={`${block} mb-3 h-20`} />
      <div className={`${block} mb-2 h-3 w-3/4`} />
      <div className={`${block} mb-4 h-3 w-1/2`} />
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`${block} h-12`} />
        ))}
      </div>
    </div>
  );
}

function Growth() {
  return (
    <div className={`${card} w-64`}>
      <div className={`${block} mb-2 h-6 w-20`} />
      <div className={`${block} mb-4 h-2 w-12`} />
      <div className="flex h-28 items-end gap-2">
        {[30, 42, 38, 55, 68, 82, 100].map((h) => (
          <div key={h} className="flex-1 rounded-t bg-primary-500/30" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function Trend() {
  return (
    <div className={`${card} w-64`}>
      <div className={`${block} mb-4 h-3 w-24`} />
      <svg viewBox="0 0 200 100" className="h-28 w-full text-primary-500/50">
        <polyline points="0,90 30,78 60,82 90,60 120,52 150,34 200,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Heatmap() {
  return (
    <div className={card}>
      <div className="grid grid-cols-7 gap-1.5">
        {/* Fixed pseudo-random shades, so server and client render the same. */}
        {Array.from({ length: 35 }, (_, i) => (
          <div key={i} className={`size-6 rounded-sm ${shades[(i * 7 + (i % 3) * 3) % 5]}`} />
        ))}
      </div>
    </div>
  );
}

const tiles = [Site, Growth, Heatmap, Trend, Site, Heatmap, Growth, Site, Trend, Heatmap, Site, Growth];

// Wraps the hero and the tech band: one background fades from tinted to the page color across both.
export function HeroBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden bg-linear-to-b from-slate-50 from-40% via-primary-50 to-white dark:from-slate-900 dark:via-primary-900/30 dark:to-slate-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        // Clear ellipse behind the hero text, intersected with a fade-out toward the bottom.
        style={{
          maskImage: "radial-gradient(ellipse 50% 40% at 50% 38%, transparent 50%, black), linear-gradient(black 55%, transparent)",
          maskComposite: "intersect",
        }}
      >
        <div className="absolute top-1/2 left-1/2 flex w-[1800px] -translate-1/2 -rotate-6 flex-wrap items-center justify-center gap-6 opacity-70">
          {tiles.map((Tile, i) => (
            <Tile key={i} />
          ))}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
