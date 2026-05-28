export function LockedCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl border border-line bg-black/40 p-6 overflow-hidden min-h-[240px]">
      <div className="opacity-25 blur-[2px] select-none pointer-events-none">{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
        <div className="text-3xl">🔒</div>
        <p className="text-lg font-bold">상세 리포트가 잠겨 있습니다.</p>
        <p className="text-sm text-muted">990원으로 열람 가능합니다.</p>
      </div>
    </div>
  );
}
