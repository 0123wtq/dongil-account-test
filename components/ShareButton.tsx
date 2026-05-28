'use client';

import { useState } from 'react';
import { getSiteUrl } from '@/lib/site';

const templates = (typeName: string, score: number, url: string) => [
  `내 계좌체력 점수 ${score}점 나왔다.\n결과는 [${typeName}].\n하체운동 안 된 계좌는 조정장 오면 흔들린다는데…\n너도 돈길 계좌체력 테스트 해봐.\n${url}`,
  `나 왜 맨날 고점에 사는지 알았다.\n결과가 [${typeName}] 나옴.\n종목 문제가 아니라 매매 습관 문제일 수도 있다네.\n${url}`,
];

export function ShareButton({ typeName, score }: { typeName: string; score: number }) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    const url = getSiteUrl();
    const choices = templates(typeName, score, url);
    const text = choices[Math.floor(Math.random() * choices.length)];
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
