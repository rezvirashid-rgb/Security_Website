/** Placeholder brand mark: shield with a jamdani diamond. Replace with the real logo. */
export function LogoMark({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="9" fill="#0f1e3d" />
      <path
        d="M20 6 32.5 10.4v9.4c0 7.7-5.2 13.6-12.5 15.6C12.7 33.4 7.5 27.5 7.5 19.8v-9.4z"
        fill="none"
        stroke="#c9a227"
        strokeWidth="2.2"
      />
      <path d="M20 13.5 25.5 20 20 26.5 14.5 20z" fill="#c9a227" />
      <circle cx="20" cy="20" r="1.6" fill="#0f1e3d" />
    </svg>
  );
}
