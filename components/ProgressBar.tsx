export function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-muted mb-2">
        <span>{current} / {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 bg-line rounded-full overflow-hidden">
        <div className="h-full bg-gold transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
