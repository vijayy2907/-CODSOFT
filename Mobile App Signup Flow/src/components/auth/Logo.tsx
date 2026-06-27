interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500 shadow-soft">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.5 11.5L7 4L9.5 9.5L11.5 6.5L15.5 13.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-slate-800 dark:text-white">
        Nimbus
      </span>
    </div>
  );
}
