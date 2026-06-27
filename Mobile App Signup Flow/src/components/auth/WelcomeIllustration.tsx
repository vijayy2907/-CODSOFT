export function WelcomeIllustration() {
  return (
    <svg
      viewBox="0 0 280 200"
      className="h-44 w-full sm:h-48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of a person next to a mobile phone"
    >
      <ellipse cx="140" cy="178" rx="92" ry="10" className="fill-primary-100 dark:fill-white/5" />

      {/* leaf / blob shapes */}
      <circle cx="46" cy="60" r="26" className="fill-primary-100 dark:fill-white/5" />
      <rect x="206" y="34" width="34" height="34" rx="10" className="fill-primary-200/70 dark:fill-white/5" />
      <path
        d="M225 130c18 0 30-14 30-30s-12-26-26-22-22 18-18 32 6 20 14 20z"
        className="fill-rose-100 dark:fill-white/5"
      />

      {/* phone */}
      <rect x="120" y="46" width="62" height="118" rx="14" className="fill-white dark:fill-card-dark" stroke="currentColor" strokeOpacity="0.08" strokeWidth="2" />
      <rect x="128" y="58" width="46" height="78" rx="4" className="fill-primary-500" />
      <circle cx="151" cy="148" r="5" className="fill-primary-200 dark:fill-white/10" />
      <rect x="133" y="68" width="36" height="4" rx="2" className="fill-white/60" />
      <rect x="133" y="78" width="26" height="4" rx="2" className="fill-white/40" />
      <rect x="133" y="96" width="36" height="20" rx="4" className="fill-white/20" />

      {/* person */}
      <circle cx="78" cy="86" r="14" className="fill-amber-200" />
      <path
        d="M52 168c0-26 12-46 26-46s26 20 26 46"
        className="fill-primary-500"
      />
      <rect x="62" y="118" width="32" height="38" rx="14" className="fill-primary-400" />
      <path d="M40 150c4-10 14-16 22-14" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" strokeLinecap="round" />

      {/* sparkle accents */}
      <circle cx="200" cy="150" r="3" className="fill-primary-400" />
      <circle cx="92" cy="44" r="3" className="fill-rose-300" />
      <circle cx="246" cy="100" r="3" className="fill-primary-300" />
    </svg>
  );
}
