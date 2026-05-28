export function CheckMark({ className = '' }: { className?: string }) {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      className={`inline-block shrink-0 ${className}`}
      aria-hidden
    >
      <path
        d="M2 7 L7 12 L18 2"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
