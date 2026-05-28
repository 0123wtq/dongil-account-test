'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { getReport } from '@/lib/reports';
import type { ScoreResult, ReportContent } from '@/lib/types';
import { Disclaimer } from '@/components/Disclaimer';
import { RiskMeter } from '@/components/RiskMeter';
import { ShareButton } from '@/components/ShareButton';

export default function ReportPage() {
  const router = useRouter();
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [report, setReport] = useState<ReportContent | null>(null);

  useEffect(() => {
    if (!storage.isUnlocked()) {
      router.replace('/result');
      return;
    }
    const r = storage.loadResult();
    if (!r) {
      router.replace('/test');
      return;
    }
    setResult(r);
    setReport(getReport(r.typeId));
  }, [router]);

  if (!result || !report) return null;

  const indicators = [
    { label: '추격매수 위험도', level: result.risks.chase, comment: report.indicatorComments.chase },
    { label: '손실방치 위험도', level: result.risks.neglect, comment: report.indicatorComments.neglect },
    { label: '현금비중 안정성', level: Math.max(0, 100 - result.risks.cash), comment: report.indicatorComments.cash },
    { label: '분할매수 준비도', level: Math.max(0, 100 - result.risks.split), comment: report.indicatorComments.split },
    { label: 'FOMO 위험도', level: result.risks.fomo, comment: report.indicatorComments.fomo },
  ];

  return (
    <main className="flex flex-col gap-10">
      <p className="text-gold text-sm font-bold tracking-widest">상세 리포트</p>

      <div>
        <p className="text-muted text-sm mb-2">당신의 유형</p>
        <h1 className="heading-xl">{report.typeName}</h1>
        <p className="mt-4 text-lg leading-relaxed border-l-2 border-gold pl-4">
          {report.oneLineDiagnosis}
        </p>
      </div>

      <section className="rounded-2xl border border-line p-6 bg-black/40">
        <p className="text-sm text-gold font-bold mb-2">핵심 진단</p>
        <p className="leading-relaxed">{report.coreExplanation}</p>
      </section>

      <section className="rounded-2xl border border-line p-6 bg-black/40">
        <p className="text-sm text-muted">계좌체력 점수</p>
        <p className="text-5xl font-extrabold text-gold mt-1">
          {result.fitnessScore}
          <span className="text-2xl text-muted"> / 100</span>
        </p>
        <p className="text-sm text-danger-soft mt-3">대표 위험: {report.topRisk}</p>
      </section>

      <section>
        <h2 className="heading-lg mb-4">위험 지표 5개</h2>
        <div className="flex flex-col gap-3">
          {indicators.map((i) => (
            <RiskMeter key={i.label} {...i} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="heading-lg mb-4">반복 실수 TOP 3</h2>
        <ol className="flex flex-col gap-3">
          {report.repeatedMistakes.map((m, i) => (
            <li key={i} className="rounded-2xl border border-line p-5 bg-black/40">
              <span className="text-gold font-bold mr-2">{i + 1}.</span>
              {m}
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="heading-lg mb-4">이번 주 매매 금지 규칙</h2>
        <ul className="flex flex-col gap-3">
          {report.thisWeekBans.map((b, i) => (
            <li key={i} className="rounded-2xl border border-danger/40 bg-danger/10 p-5">
              <span className="text-danger-soft font-bold mr-2">🚫</span>
              {b}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="heading-lg mb-4">매수 전 체크리스트</h2>
        <ul className="flex flex-col gap-3">
          {report.preBuyChecklist.map((c, i) => (
            <li key={i} className="rounded-2xl border border-line p-5 bg-black/40">
              <span className="text-gold font-bold mr-2">☐</span>
              {c}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-gold/40 bg-gold/5 p-6">
        <p className="text-sm text-gold font-bold mb-2">돈길식 한 줄 처방</p>
        <p className="text-lg font-bold leading-relaxed">{report.oneLinePrescription}</p>
      </section>

      <section className="rounded-2xl border border-line p-6 bg-black/40 flex flex-col gap-4">
        <p className="text-sm text-gold font-bold">멤버십방 활용 가이드</p>
        <p className="leading-relaxed">{report.membershipPitch}</p>
        <Link
          href="/membership"
          className="rounded-2xl bg-gold text-black px-6 py-4 text-center text-base font-bold hover:bg-gold-soft transition-colors"
        >
          돈길 멤버십방 자세히 보기 →
        </Link>
      </section>

      <ShareButton typeName={report.typeName} score={result.fitnessScore} />

      <Link href="/test" className="text-sm text-muted text-center hover:text-ink">
        테스트 다시 하기
      </Link>

      <Disclaimer />
    </main>
  );
}
