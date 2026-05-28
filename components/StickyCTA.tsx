'use client';

import { ReactNode } from 'react';

export function StickyCTA({
  children,
  helper,
}: {
  children: ReactNode;
  helper?: string;
}) {
  return (
    <>
      <div aria-hidden className="h-28" />
      <div className="fixed bottom-0 inset-x-0 z-50 pointer-events-none">
        <div
          className="mx-auto w-full max-w-[480px] px-4 pb-4 pt-8 pointer-events-auto"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.95) 45%)',
          }}
        >
          {children}
          {helper && (
            <p className="text-[11px] text-muted text-center mt-2 leading-relaxed">
              {helper}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
