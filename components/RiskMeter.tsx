export function RiskMeter({
  label,
  level,
  comment,
}: {
  label: string;
  level: number;
  comment?: string;
}) {
  const color = level >= 70 ? 'bg-danger' : level >= 40 ? 'bg-gold' : 'bg-emerald-500';
  return (
    <div className="rounded-2xl border border-line p-5 bg-black/40">
      <div className="flex justify-between items-baseline mb-2">
        <span className="font-bold">{label}</span>
        <span className="text-sm text-muted">{level} / 100</span>
      </div>
      <div className="h-2 bg-line rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${level}%` }} />
      </div>
      {comment && <p className="text-sm text-muted mt-3 leading-relaxed">{comment}</p>}
    </div>
  );
}
