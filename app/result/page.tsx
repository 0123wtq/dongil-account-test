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

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [report, setReport] = useState<ReportContent | null>(null);

  useEffect(() => {
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
  const sentences = Array.isArray(result.shortDiagnosis)
    ? result.shortDiagnosis
    : [result.shortDiagnosis as unknown as string];

  const indicators = [
    { label: '추격매수 위험도', level: result.risks.chase },
    { label: '손실방치 위험도', level: result.risks.neglect },
    { label: '현금비중 안정성', level: Math.max(0, 100 - result.risks.cash) },
    { label: '분할매수 준비도', level: Math.max(0, 100 - result.risks.split) },
    { label: 'FOMO 위험도', level: result.risks.fomo },
  ];

  // 이번 주 매매 규칙은 "일부"만 노출 (2개)
  const partialBans = report.thisWeekBans.slice(0, 2);

  return (
    <main className="flex flex-col gap-10">
      <p className="text-gold text-sm font-bold tracking-widest pt-2">진단 결과</p>

      {/* 종이 카드 — 핵심 결과 */}
      <section className="paper rounded-2xl border-2 border-paperEdge p-6 flex flex-col gap-5 shadow-2xl">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-mutedInk mb-1">당신의 유형</p>
            <h1 className="text-3xl font-extrabold leading-tight text-inkDark">
              {result.typeName}
            </h1>
          </div>
          <span className="tilt-right text-[11px] px-2.5 py-1 rounded-md bg-danger text-paper font-bold tracking-widest shrink-0">
            ⚠ 하체운동 부족
          </span>
        </div>

        <div>
          <p className="text-xs text-mutedInk mb-1">계좌체력 점수</p>
          <p className="text-5xl font-extrabold text-inkDark">
            {result.fitnessScore}
            <span className="text-2xl text-mutedInk"> / 100</span>
          </p>
          <div className="h-2 bg-paperEdge/70 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-gold" style={{ width: `${result.fitnessScore}%` }} />
          </div>
          <p className="text-[11px] text-mutedInk mt-2 leading-relaxed">
            점수가 낮을수록 매매 습관·현금 비중·분할매수 기준에서 위험 신호가 많은 상태입니다.
          </p>
        </div>

        <div className="rounded-xl bg-danger/10 border border-danger/50 p-3">
          <p className="text-[11px] text-danger font-bold tracking-widest">대표 위험</p>
          <p className="text-sm font-bold mt-0.5 text-inkDark">{result.topRiskLabel}</p>
        </div>
      </section>

      {/* 3문장 진단 */}
      <section className="border-l-2 border-gold pl-4 flex flex-col gap-3">
        {sentences.map((s, i) => (
          <p key={i} className="text-base leading-relaxed text-ink/95">
            {s}
          </p>
        ))}
      </section>

      {/* 위험 지표 5개 */}
      <section className="flex flex-col gap-3">
        <h2 className="heading-md">위험 지표</h2>
        {indicators.map((i) => (
          <RiskMeter key={i.label} {...i} />
        ))}
      </section>

      {/* 반복 실수 TOP3 */}
      <section className="flex flex-col gap-3">
        <h2 className="heading-md">내가 반복하는 실수 TOP 3</h2>
        <ol className="flex flex-col gap-3">
          {report.repeatedMistakes.map((m, i) => (
            <li
              key={i}
              className="paper rounded-2xl border-2 border-paperEdge p-5 text-inkDark"
            >
              <span className="text-danger font-extrabold mr-2">{i + 1}.</span>
              {m}
            </li>
          ))}
        </ol>
      </section>

      {/* 이번 주 매매 규칙 일부 */}
      <section className="flex flex-col gap-3">
        <h2 className="heading-md">이번 주 매매 규칙</h2>
        <ul className="flex flex-col gap-3">
          {partialBans.map((b, i) => (
            <li
              key={i}
              className="rounded-2xl border-2 border-danger/40 bg-danger/10 p-5"
            >
              <span className="text-danger-soft font-bold mr-2">🚫</span>
              {b}
            </li>
          ))}
          {report.thisWeekBans.length > partialBans.length && (
            <li className="text-xs text-muted text-center pt-1">
              나머지 규칙은 멤버십방에서 매일 같이 점검합니다.
            </li>
          )}
        </ul>
      </section>

      {/* 한 줄 처방 */}
      <section className="rounded-2xl bg-gold/5 border-sketch border-gold/40 p-6">
        <p className="text-xs text-gold font-bold tracking-widest mb-2">
          돈길식 하체운동 처방
        </p>
        <p className="text-lg font-bold leading-relaxed">{report.oneLinePrescription}</p>
      </section>

      {/* 공유 */}
      <ShareButton typeName={result.typeName} score={result.fitnessScore} />

      {/* 멤버십 CTA — 강한 카피 블록 */}
      <section className="rounded-2xl border-2 border-gold/50 bg-gold/5 p-6 flex flex-col gap-5">
        <p className="text-xs text-gold font-extrabold tracking-widest">
          이 결과를 혼자 보고 끝내면 또 반복됩니다
        </p>
        <p className="leading-relaxed">
          진단 결과를 보는 것만으로는 계좌가 바뀌지 않습니다.
          <br />
          문제는 장중에 또 같은 선택을 한다는 겁니다.
        </p>
        <p className="leading-relaxed">
          급등주가 튀고,
          <br />
          남들이 수익 인증하고,
          <br />
          장이 흔들리는 순간에는
          <br />
          <span className="marker-gold">혼자 기준을 지키기 어렵습니다.</span>
        </p>
        <p className="leading-relaxed font-bold">
          하루 1,000원으로
          <br />
          돈길 멤버십방에서 장전·장중·마감 기준을 같이 잡아보세요.
        </p>

        <div className="border-t border-gold/30 pt-5 flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted tracking-widest">멤버십 가격</span>
            <span>
              <span className="text-2xl font-extrabold text-gold">월 30,000원</span>
              <span className="text-xs text-muted ml-2">(하루 1,000원)</span>
            </span>
          </div>
          <a
            href={applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-gold text-inkDark px-6 py-5 text-center text-base font-extrabold btn-paper"
          >
            하루 1,000원으로 멤버십방 신청하기 →
          </a>
          <Link
            href="/membership"
            className="text-xs text-muted text-center underline underline-offset-4 hover:text-ink"
          >
            멤버십 비교·FAQ 자세히 보기
          </Link>
        </div>
      </section>

      <Link href="/test" className="text-sm text-muted text-center hover:text-ink">
        테스트 다시 하기
      </Link>

      <Disclaimer />

      {/* Sticky */}
      <StickyCTA helper="하루 1,000원으로 혼자 매매하는 불안을 줄이세요">
        <a
          href={applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-2xl bg-gold text-inkDark px-5 py-4 text-center text-base font-extrabold btn-paper"
        >
          하루 1,000원으로 멤버십방 신청 →
        </a>
      </StickyCTA>
    </main>
  );
}
