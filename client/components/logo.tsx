export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <circle cx="16" cy="16" r="16" className="fill-primary-500" />
      <circle cx="40" cy="40" r="8" className="fill-primary-500" />
    </svg>
  );
}
