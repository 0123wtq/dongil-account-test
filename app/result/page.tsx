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
import { StickyCTA } from '@/components/StickyCTA';

const REPORT_PREVIEW = [
  '내가 반복하는 실수 TOP 3',
  '내 유형별 위험 지표 5개',
  '이번 주 매매 금지 규칙',
  '매수 전 체크리스트',
  '돈길식 하체운동 처방',
  '멤버십방 활용 가이드',
];

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
      amount: 0,
      productName: '돈길 계좌체력 상세 리포트 (오픈 테스트)',
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

  const sentences = Array.isArray(result.shortDiagnosis)
    ? result.shortDiagnosis
    : [result.shortDiagnosis as unknown as string];

  // Top 2 risks preview (간단한 바만 노출 — 코멘트는 잠금 후 공개)
  const previewRisks = [
    { label: '추격매수 위험도', level: result.risks.chase },
    { label: '손실방치 위험도', level: result.risks.neglect },
    { label: 'FOMO 위험도', level: result.risks.fomo },
  ]
    .sort((a, b) => b.level - a.level)
    .slice(0, 2);

  return (
    <main className="flex flex-col gap-8">
      <p className="text-gold text-sm font-bold tracking-widest pt-2">진단 결과</p>

      {/* 유형 */}
      <div>
        <p className="text-muted text-sm mb-2">당신의 유형은</p>
        <h1 className="heading-xl">{result.typeName}</h1>
      </div>

      {/* 점수 */}
      <div className="rounded-2xl border border-line p-6 bg-black/40">
        <p className="text-sm text-muted">계좌체력 점수</p>
        <p className="text-5xl font-extrabold text-gold mt-1">
          {result.fitnessScore}
          <span className="text-2xl text-muted"> / 100</span>
        </p>
        <div className="h-2 bg-line rounded-full overflow-hidden mt-4">
          <div className="h-full bg-gold" style={{ width: `${result.fitnessScore}%` }} />
        </div>
        <p className="text-[11px] text-muted mt-3 leading-relaxed">
          점수가 낮을수록 매매 습관·현금 비중·분할매수 기준에서 위험 신호가 많은 상태입니다.
        </p>
      </div>

      {/* 대표 위험 */}
      <div className="rounded-2xl border border-danger/40 bg-danger/10 p-5">
        <p className="text-xs text-danger-soft font-bold tracking-widest">⚠ 대표 위험</p>
        <p className="font-bold text-lg mt-1">{result.topRiskLabel}</p>
      </div>

      {/* 짧은 진단 (3문장) */}
      <section className="border-l-2 border-gold pl-4 flex flex-col gap-3">
        {sentences.map((s, i) => (
          <p key={i} className="text-base leading-relaxed text-ink/95">
            {s}
          </p>
        ))}
      </section>

      {/* 위험도 미리보기 */}
      <section className="flex flex-col gap-3">
        <p className="text-sm text-gold font-bold tracking-widest">위험도 미리보기</p>
        {previewRisks.map((r) => {
          const color =
            r.level >= 70 ? 'bg-danger' : r.level >= 40 ? 'bg-gold' : 'bg-emerald-500';
          return (
            <div
              key={r.label}
              className="rounded-2xl border border-line p-4 bg-black/40"
            >
              <div className="flex justify-between items-baseline mb-2">
                <span className="font-bold text-sm">{r.label}</span>
                <span className="text-xs text-muted">{r.level} / 100</span>
              </div>
              <div className="h-2 bg-line rounded-full overflow-hidden">
                <div className={`h-full ${color}`} style={{ width: `${r.level}%` }} />
              </div>
            </div>
          );
        })}
        <p className="text-[11px] text-muted leading-relaxed">
          5개 위험 지표 전체와 코멘트는 상세 리포트에서 확인할 수 있습니다.
        </p>
      </section>

      {/* 공유 */}
      <ShareButton typeName={result.typeName} score={result.fitnessScore} />

      {/* 잠금 박스 */}
      <section>
        <p className="text-sm text-gold font-bold mb-3 tracking-widest">
          상세 리포트에서 확인할 수 있는 내용
        </p>
        <LockedCard>
          <ul className="space-y-2 text-sm">
            {REPORT_PREVIEW.map((x) => (
              <li key={x}>• {x}</li>
            ))}
          </ul>
        </LockedCard>
      </section>

      {/* 오픈 테스트 안내 + 메인 CTA */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onUnlock}
          disabled={processing}
          className="rounded-2xl bg-gold text-black px-6 py-5 text-lg font-bold hover:bg-gold-soft transition-colors disabled:opacity-60"
        >
          {processing ? '여는 중…' : '내 매매 습관 상세 리포트 보기'}
        </button>
        <p className="text-xs text-muted text-center leading-relaxed">
          오픈 테스트 기간에는 무료로 열람 가능합니다.
          <br />
          정식 오픈 후 990원 상세 리포트로 전환됩니다.
        </p>
      </div>

      <Link href="/test" className="text-sm text-muted text-center hover:text-ink">
        테스트 다시 하기
      </Link>

      <Disclaimer />

      {/* Sticky CTA */}
      <StickyCTA
        helper="오픈 테스트 기간 무료 열람"
      >
        <button
          onClick={onUnlock}
          disabled={processing}
          className="w-full rounded-2xl bg-gold text-black px-5 py-4 text-base font-bold shadow-2xl disabled:opacity-60"
        >
          {processing ? '여는 중…' : '내 매매 습관 상세 리포트 보기 →'}
        </button>
      </StickyCTA>
    </main>
  );
}
