import Link from 'next/link';
import { Disclaimer } from '@/components/Disclaimer';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { CheckMark } from '@/components/CheckMark';
import { getMembershipUrl } from '@/lib/site';

const EMPATHY = [
  '장 시작하자마자 급등주 보고 바로 들어간다',
  '수익은 조금만 나도 팔고 싶다',
  '손실 종목은 “언젠가 오르겠지” 하며 버틴다',
  '남들 수익 인증 보면 나도 따라 사고 싶다',
  '현금 없이 거의 몰빵 상태로 버틴다',
  'ETF보다 한 방 종목이 더 끌린다',
];

const STEPS = [
  {
    step: 'STEP 1',
    title: '무료 테스트',
    desc: '10문항으로 내 투자 습관을 확인합니다.',
  },
  {
    step: 'STEP 2',
    title: '결과 확인',
    desc: '내 유형, 계좌체력 점수, 반복 실수를 확인합니다.',
  },
  {
    step: 'STEP 3',
    title: '혼자 매매의 문제 인식',
    desc: '결과를 알아도 장중에 혼자 있으면 같은 실수를 반복할 수 있습니다.',
  },
  {
    step: 'STEP 4',
    title: '하루 1,000원 멤버십방 신청',
    desc: '커피 한 잔보다 적은 하루 1,000원으로 장전·장중·마감 기준을 같이 잡습니다.',
  },
];

const DAILY_PREVIEW = [
  {
    time: '08:30',
    label: '장전',
    items: [
      '오늘 조심할 구간 한 줄 정리',
      '현금비중 점검',
      '섹터 흐름 체크',
    ],
  },
  {
    time: '12:30',
    label: '장중',
    items: [
      '급등주 추격매수 방지',
      'FOMO 체크',
      '하체운동 기준 확인',
    ],
  },
  {
    time: '16:00',
    label: '마감',
    items: [
      '오늘 시장 복기',
      '흔들린 구간 점검',
      '내일 기준 정리',
    ],
  },
];

const COMPARE = {
  free: [
    '내 투자 유형 확인',
    '반복 실수 확인',
    '일회성 진단',
    '무료',
  ],
  membership: [
    '매일 장전·장중·마감 기준 제공',
    '혼자 흔들리지 않는 루틴 형성',
    '장중 FOMO·추격매수 방지',
    '월 30,000원 (하루 1,000원)',
  ],
};

export default function HomePage() {
  const applyUrl = getMembershipUrl();
  return (
    <main className="flex flex-col gap-14">
      {/* HERO */}
      <section className="flex flex-col gap-6 pt-4">
        {/* 후킹 배지 — 손그림 형광펜/밑줄 톤 */}
        <div className="self-start border-sketch border-gold/40 bg-gold/5 rounded-xl px-4 py-3">
          <p className="text-base font-extrabold leading-snug">
            <span className="marker-gold">하루 1,000원</span>으로
            <br />
            혼자 매매하는 불안을{' '}
            <span className="underline decoration-gold decoration-[3px] underline-offset-[5px]">
              줄이세요
            </span>
          </p>
        </div>
        <h1 className="heading-xl">
          왜 내가 사면 떨어지고
          <br />
          팔면 <span className="marker-gold">올라갈까?</span>
        </h1>
        <p className="text-ink/80 text-base leading-relaxed">
          종목 문제가 아닐 수 있습니다.
          <br />
          매수 습관, 현금 비중, 분할매수 기준이 무너지면
          <br />
          좋은 종목을 사도 계좌는 흔들립니다.
        </p>

        {/* 스크롤 유도 — 히어로 CTA 없음, 본문을 먼저 읽게 유도 */}
        <div className="flex flex-col items-center gap-3 pt-4 text-muted">
          <p className="text-sm leading-relaxed text-center">
            아래로 내려서<br />
            내 계좌 습관을 먼저 확인해보세요
          </p>
          <svg
            width="22"
            height="36"
            viewBox="0 0 22 36"
            fill="none"
            className="text-gold/80 animate-bounce"
            aria-hidden
          >
            <path
              d="M11 3 C 10.4 12, 11.6 22, 11 30 M11 30 L4 22 M11 30 L18 22"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* SAMPLE DIAGNOSIS — 종이 노트 카드 */}
      <section className="flex flex-col gap-3">
        <p className="text-xs text-muted tracking-widest">진단 결과 예시</p>
        <div className="paper rounded-2xl border-2 border-paperEdge p-6 flex flex-col gap-5 shadow-2xl">
          <div className="flex justify-between items-center">
            <p className="text-xs text-mutedInk">샘플 진단</p>
            <span className="tilt-right text-[11px] px-2.5 py-1 rounded-md bg-danger text-paper border border-danger/60 font-bold tracking-widest">
              ⚠ 하체운동 부족
            </span>
          </div>
          <div>
            <p className="text-xs text-mutedInk mb-1">진단 유형</p>
            <h2 className="text-2xl font-extrabold text-inkDark">장초반 추격매수형</h2>
          </div>
          <div>
            <p className="text-xs text-mutedInk mb-1">계좌체력 점수</p>
            <p className="text-4xl font-extrabold text-inkDark">
              42<span className="text-xl text-mutedInk"> / 100</span>
            </p>
            <div className="h-2 bg-paperEdge/70 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-gold" style={{ width: '42%' }} />
            </div>
          </div>
          <div className="rounded-xl bg-danger/10 border border-danger/40 p-3">
            <p className="text-[11px] text-danger font-bold tracking-widest">대표 위험</p>
            <p className="text-sm font-bold mt-0.5 text-inkDark">장 초반 추격매수</p>
          </div>
          <div>
            <p className="text-[11px] text-mutedInk font-bold tracking-widest mb-1">반복 실수 TOP 1</p>
            <p className="text-sm text-inkDark">장 시작 직후 급등주 매수</p>
          </div>
          <p className="text-sm text-inkDark border-l-2 border-gold pl-3 leading-relaxed">
            <span className="marker-gold">수익은 짧게, 손실은 길게</span> 가져가는 패턴이 보입니다.
          </p>
        </div>
        <p className="text-[11px] text-muted text-center">실제 진단 결과의 일부 화면입니다</p>
      </section>

      {/* 강조 인용 */}
      <section className="rounded-2xl bg-gold/5 border-sketch border-gold/40 p-6 text-center">
        <p className="leading-relaxed font-bold text-lg">
          주식장에서 제일 위험한 건
          <br />
          종목 모르는 사람이 아니라
          <br />
          <span className="marker-gold">자기가 왜 지는지 모르는 사람</span>입니다.
        </p>
      </section>

      {/* 공감 카드 */}
      <section className="flex flex-col gap-5">
        <h2 className="heading-md">
          혹시 이런 매매,
          <br />
          반복되고 있나요?
        </h2>
        <ul className="flex flex-col gap-3">
          {EMPATHY.map((c, i) => (
            <li
              key={i}
              className="rounded-2xl border-2 border-line bg-black/30 p-4 text-sm leading-relaxed flex items-start gap-3"
            >
              <span className="text-gold font-bold shrink-0">✓</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm leading-relaxed text-ink/90 border-l-2 border-gold pl-4 mt-1">
          종목을 더 찾기 전에,
          <br />
          내가 반복하는 매매 습관부터 확인해야 합니다.
        </p>
      </section>

      {/* 중간 — 버튼 대신 문구 한 줄만 */}
      <p className="text-center text-base leading-relaxed text-ink/85 italic">
        결과를 아는 것보다 중요한 건,
        <br />
        장중에 같은 실수를 <span className="marker-gold">반복하지 않는 것</span>입니다.
      </p>

      {/* 4단계 */}
      <section className="flex flex-col gap-5">
        <h2 className="heading-md">
          1분이면
          <br />
          내 계좌 습관이 보입니다
        </h2>
        <ol className="flex flex-col gap-3">
          {STEPS.map((s) => (
            <li
              key={s.step}
              className="rounded-2xl border-2 border-line bg-black/30 p-5 flex gap-4"
            >
              <span className="text-gold font-extrabold shrink-0 text-xs tracking-widest pt-1">
                {s.step}
              </span>
              <div>
                <p className="font-bold mb-1">{s.title}</p>
                <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 멤버십방 실체감 — 매일 받는 기준 미리보기 */}
      <section className="flex flex-col gap-5">
        <h2 className="heading-md">
          돈길 멤버십방에서는
          <br />
          매일 <span className="marker-gold">이런 기준</span>을 봅니다
        </h2>
        <div className="flex flex-col gap-3">
          {DAILY_PREVIEW.map((s) => (
            <div
              key={s.label}
              className="paper rounded-2xl border-2 border-paperEdge p-5 flex flex-col gap-3 shadow-xl"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-xl font-extrabold text-inkDark">{s.time}</span>
                <span className="text-[10px] tracking-widest text-mutedInk bg-paperEdge/50 px-2 py-0.5 rounded">
                  {s.label}
                </span>
              </div>
              <ul className="flex flex-col gap-2 text-sm text-inkDark">
                {s.items.map((it, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <CheckMark className="text-danger mt-0.5" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link
          href="/routine"
          className="text-xs text-gold text-center underline underline-offset-4 hover:text-gold-soft"
        >
          하루 루틴 자세히 보기 →
        </Link>

        {/* 하루 1,000원 강조 카피 */}
        <div className="rounded-2xl border-sketch border-gold/40 bg-gold/5 p-5 mt-2 flex flex-col gap-2">
          <p className="leading-relaxed font-bold">
            <span className="marker-gold">하루 1,000원</span>으로
            <br />
            장중에 혼자 흔들리는 시간을 줄이세요.
          </p>
          <p className="text-sm text-muted leading-relaxed">
            커피 한 잔보다 적은 하루 1,000원으로
            <br />
            장전·장중·마감 기준을 같이 잡습니다.
          </p>
        </div>
      </section>

      {/* 무료 vs 멤버십 비교 티저 */}
      <section className="flex flex-col gap-4">
        <h2 className="heading-md">무료 테스트 vs 멤버십방</h2>
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border-2 border-line bg-black/30 p-5 flex flex-col gap-3">
            <p className="text-xs text-muted tracking-widest">무료 테스트</p>
            <ul className="text-sm flex flex-col gap-2">
              {COMPARE.free.map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <CheckMark className="text-muted mt-0.5" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="paper rounded-2xl border-2 border-gold p-5 flex flex-col gap-3 relative shadow-2xl">
            <span className="tilt-right absolute -top-3 left-5 text-[10px] tracking-widest bg-danger text-paper px-3 py-1 rounded-md font-extrabold">
              ★ 추천
            </span>
            <p className="text-xs text-mutedInk tracking-widest">돈길 멤버십방</p>
            <ul className="text-sm text-inkDark flex flex-col gap-2">
              {COMPARE.membership.map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <CheckMark className="text-danger mt-0.5" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <a
              href={applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-gold text-inkDark px-5 py-3 text-center text-sm font-extrabold btn-paper mt-1"
            >
              하루 1,000원으로 신청하기 →
            </a>
          </div>
        </div>
        <Link
          href="/membership"
          className="text-xs text-muted text-center underline underline-offset-4 hover:text-ink"
        >
          멤버십 비교·FAQ 자세히 보기 →
        </Link>
      </section>

      {/* 유일한 테스트 CTA — 페이지 최하단 */}
      <div className="flex flex-col gap-3">
        <Link
          href="/test"
          className="rounded-2xl bg-gold text-inkDark px-6 py-5 text-center text-lg font-extrabold btn-paper"
        >
          내 계좌체력 무료로 확인하기 →
        </Link>
        <p className="text-xs text-muted text-center leading-relaxed">
          10문항, 약 2분 · 로그인 없음 · 결과는 브라우저에만 저장
          <br />
          하루 1,000원으로 내 계좌 습관을 바꾸는 방, 돈길 멤버십방
        </p>
      </div>

      <Disclaimer />

      {/* 우측 스크롤 진행 인디케이터 (랜딩 전용) */}
      <ScrollProgressBar />
    </main>
  );
}
