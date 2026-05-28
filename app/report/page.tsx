'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { getReport } from '@/lib/reports';
import { getMembershipUrl } from '@/lib/site';
import type { ScoreResult, ReportContent } from '@/lib/types';
import { Disclaimer } from '@/components/Disclaimer';
import { RiskMeter } from '@/components/RiskMeter';
import { ShareButton } from '@/components/ShareButton';
import { StickyCTA } from '@/components/StickyCTA';

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

  const applyUrl = getMembershipUrl();

  const indicators = [
    { label: '추격매수 위험도', level: result.risks.chase, comment: report.indicatorComments.chase },
    { label: '손실방치 위험도', level: result.risks.neglect, comment: report.indicatorComments.neglect },
    { label: '현금비중 안정성', level: Math.max(0, 100 - result.risks.cash), comment: report.indicatorComments.cash },
    { label: '분할매수 준비도', level: Math.max(0, 100 - result.risks.split), comment: report.indicatorComments.split },
    { label: 'FOMO 위험도', level: result.risks.fomo, comment: report.indicatorComments.fomo },
  ];

  return (
    <main className="flex flex-col gap-10">
      <p className="text-gold text-sm font-bold tracking-widest pt-2">상세 리포트</p>

      <div>
        <p className="text-muted text-sm mb-2">당신의 유형</p>
        <h1 className="heading-xl">{report.typeName}</h1>
      </div>

      {/* 상단 경고 카드 */}
      <section className="rounded-2xl border border-danger/40 bg-danger/10 p-6">
        <p className="text-xs text-danger-soft font-bold tracking-widest mb-2">
          ⚠ 지금 가장 큰 위험
        </p>
        <p className="text-lg font-bold leading-relaxed">{report.topRisk}</p>
        <p className="mt-3 text-sm text-ink/85 leading-relaxed">
          {report.oneLineDiagnosis}
        </p>
      </section>

      {/* 핵심 진단 */}
      <section className="rounded-2xl border border-line p-6 bg-black/40">
        <p className="text-sm text-gold font-bold mb-2 tracking-widest">핵심 진단</p>
        <p className="leading-relaxed">{report.coreExplanation}</p>
      </section>

      {/* 점수 */}
      <section className="rounded-2xl border border-line p-6 bg-black/40">
        <p className="text-sm text-muted">계좌체력 점수</p>
        <p className="text-5xl font-extrabold text-gold mt-1">
          {result.fitnessScore}
          <span className="text-2xl text-muted"> / 100</span>
        </p>
        <div className="h-2 bg-line rounded-full overflow-hidden mt-4">
          <div className="h-full bg-gold" style={{ width: `${result.fitnessScore}%` }} />
        </div>
      </section>

      {/* 위험 지표 */}
      <section>
        <h2 className="heading-lg mb-4">위험 지표 5개</h2>
        <div className="flex flex-col gap-3">
          {indicators.map((i) => (
            <RiskMeter key={i.label} {...i} />
          ))}
        </div>
      </section>

      {/* 반복 실수 */}
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

      {/* 매매 금지 */}
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

      {/* 체크리스트 */}
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

      {/* 한 줄 처방 */}
      <section className="rounded-2xl border border-gold/40 bg-gold/5 p-6">
        <p className="text-sm text-gold font-bold mb-2 tracking-widest">
          돈길식 하체운동 처방
        </p>
        <p className="text-lg font-bold leading-relaxed">{report.oneLinePrescription}</p>
      </section>

      {/* 공유 */}
      <ShareButton typeName={report.typeName} score={result.fitnessScore} />

      {/* 강화된 멤버십 CTA */}
      <section className="rounded-2xl border border-gold/40 bg-gold/5 p-6 flex flex-col gap-5">
        <p className="text-xs text-gold font-bold tracking-widest">
          {report.typeName}에게 필요한 것
        </p>
        <p className="leading-relaxed">{report.membershipPitch}</p>

        <div className="border-t border-gold/20 pt-5 flex flex-col gap-4">
          <p className="leading-relaxed">
            리포트를 읽고 끝내면 계좌는 바뀌지 않습니다.
            <br />
            문제는 장중에 또 같은 선택을 한다는 겁니다.
          </p>
          <p className="leading-relaxed">
            장이 흔들릴 때,
            <br />
            급등주가 튈 때,
            <br />
            남들이 수익 인증할 때,
            <br />
            혼자 있으면 다시 같은 선택을 하기 쉽습니다.
          </p>
          <p className="leading-relaxed font-bold">
            돈길 멤버십방은 종목 찍어주는 방이 아닙니다.
            <br />
            장전·장중·마감 기준을 같이 잡으면서
            <br />
            혼자 흔들리지 않게 도와주는 방입니다.
          </p>
        </div>

        <a
          href={applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl bg-gold text-black px-6 py-5 text-center text-base font-bold hover:bg-gold-soft transition-colors"
        >
          월 30,000원으로 돈길 멤버십방 신청하기 →
        </a>
        <p className="text-xs text-muted text-center -mt-2">
          하루 1,000원으로 혼자 매매하는 불안을 줄이세요.
        </p>

        <Link
          href="/membership"
          className="text-xs text-muted text-center underline underline-offset-4 hover:text-ink"
        >
          비교표·FAQ 자세히 보기
        </Link>
      </section>

      <Link href="/test" className="text-sm text-muted text-center hover:text-ink">
        테스트 다시 하기
      </Link>

      <Disclaimer />

      {/* Sticky CTA */}
      <StickyCTA helper="하루 1,000원으로 혼자 매매하는 불안을 줄이세요">
        <a
          href={applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-2xl bg-gold text-black px-5 py-4 text-center text-base font-bold shadow-2xl"
        >
          월 30,000원 멤버십방 신청하기 →
        </a>
      </StickyCTA>
    </main>
  );
}
