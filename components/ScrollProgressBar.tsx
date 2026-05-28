'use client';

import { useEffect, useState } from 'react';

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const current = doc.scrollTop;
      const p = total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-1/2 -translate-y-1/2 right-3 z-40 pointer-events-none select-none"
      style={{ height: '46vh' }}
    >
      {/* 작은 라벨 */}
      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.25em] text-muted/70">
        SCROLL
      </span>

      {/* 세로 라인 */}
      <div className="relative h-full w-[2px] rounded-full bg-line/70">
        {/* 진행 채움 — 머스타드 골드/웜 브라운 */}
        <div
          className="absolute top-0 left-0 w-full rounded-full"
          style={{
            height: `${progress}%`,
            background: 'linear-gradient(180deg, rgba(201,154,42,0.85), rgba(139,80,30,0.7))',
            transition: 'height 120ms ease-out',
          }}
        />
        {/* 점 */}
        <div
          className="absolute -left-[3px] w-2 h-2 rounded-full bg-gold border border-paperEdge/60"
          style={{
            top: `calc(${progress}% - 4px)`,
            transition: 'top 120ms ease-out',
            boxShadow: '0 0 6px rgba(201,154,42,0.55)',
          }}
        />
      </div>
    </div>
  );
}
