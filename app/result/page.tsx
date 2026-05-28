'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { payments } from '@/lib/payments';
import type { ScoreResult } from '@/lib/types';
import { Disclaimer } from '@/components/Disclaimer';
import { LockedCard } from '@/components/LockedCard';
import { ShareButton } from '@/components/ShareButton';

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const r = storage.loadResult();
    if (!r) {
      router.replace('/test');
      return;
    }
    setResult(r);
  }, [router]);

  const onUnlock = async () => {
    if (processing) return;
    setProcessing(true);
    const res = await payments.requestPayment({
      amount: 990,
      productName: '돈길 계좌체력 상세 리포트',
      orderId: `mock_${Date.now()}`,
    });
    if (res.success) {
      storage.setUnlocked(true);
      router.push('/report');
    } else {
      setProcessing(false);
    }
  };

  if (!result) return null;

  return (
    <main className="flex flex-col gap-8">
      <p className="text-gold text-sm font-bold tracking-widest">진단 결과</p>

      <div>
        <p className="text-muted text-sm mb-2">당신의 유형은</p>
        <h1 className="heading-xl">{result.typeName}</h1>
      </div>

      <div className="rounded-2xl border border-line p-6 bg-black/40">
        <p className="text-sm text-muted">계좌체력 점수</p>
        <p className="text-5xl font-extrabold text-gold mt-1">
          {result.fitnessScore}
          <span className="text-2xl text-muted"> / 100</span>
        </p>
        <div className="h-2 bg-line rounded-full overflow-hidden mt-4">
          <div className="h-full bg-gold" style={{ width: `${result.fitnessScore}%` }} />
        </div>
      </div>

      <div className="rounded-2xl border border-danger/40 bg-danger/10 p-5">
        <p className="text-sm text-danger-soft font-bold mb-1">대표 위험</p>
        <p className="font-bold text-lg">{result.topRiskLabel}</p>
      </div>

      <p className="text-base leading-relaxed text-ink/90 border-l-2 border-gold pl-4">
        {result.shortDiagnosis}
      </p>

      <ShareButton typeName={result.typeName} score={result.fitnessScore} />

      <div>
        <p className="text-sm text-muted mb-3">990원으로 열람 가능한 내용</p>
        <LockedCard>
          <ul className="space-y-2 text-sm">
            <li>• 반복 실수 TOP 3</li>
            <li>• 내 유형별 위험 포인트</li>
            <li>• 위험 지표 5개</li>
            <li>• 이번 주 매매 금지 규칙</li>
            <li>• 매수 전 체크리스트</li>
            <li>• 돈길식 하체운동 처방</li>
            <li>• 멤버십방 활용 가이드</li>
          </ul>
        </LockedCard>
      </div>

      <button
        onClick={onUnlock}
        disabled={processing}
        className="rounded-2xl bg-gold text-black px-6 py-4 text-base font-bold hover:bg-gold-soft transition-colors disabled:opacity-60"
      >
        {processing ? '처리 중…' : '990원으로 상세 결과 열기'}
      </button>
      <p className="text-xs text-muted text-center -mt-4">
        상품명: 돈길 계좌체력 상세 리포트
      </p>

      <Link href="/test" className="text-sm text-muted text-center hover:text-ink">
        테스트 다시 하기
      </Link>

      <Disclaimer />
    </main>
  );
}
