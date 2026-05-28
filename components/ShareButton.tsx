'use client';

import { useState } from 'react';
import { getSiteUrl } from '@/lib/site';

export function ShareButton({ typeName, score }: { typeName: string; score: number }) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    const url = getSiteUrl();
    const text =
      `[돈길 계좌체력 진단]\n` +
      `내 유형: ${typeName}\n` +
      `계좌체력 점수: ${score}점 / 100\n` +
      `테스트 해보기: ${url}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('아래 문구를 복사하세요', text);
    }
  };

  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl border border-line text-ink px-6 py-4 text-sm font-semibold hover:border-gold/40 transition-colors"
    >
      {copied ? '✅ 공유문구가 복사됐어요' : '내 결과 공유문구 복사하기'}
    </button>
  );
}
