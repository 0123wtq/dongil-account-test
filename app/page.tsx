import Link from 'next/link';
import { Disclaimer } from '@/components/Disclaimer';

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
    title: '결과 일부 확인',
    desc: '내 유형, 계좌체력 점수, 대표 위험을 먼저 확인합니다.',
  },
  {
    step: 'STEP 3',
    title: '상세 리포트 확인',
    desc: '반복 실수 TOP3, 매수 전 체크리스트, 하체운동 처방을 확인합니다.',
  },
  {
    step: 'STEP 4',
    title: '돈길 멤버십방 신청',
    desc: '혼자 매매하다 흔들리지 않도록 장전·장중·마감 기준을 같이 잡습니다.',
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-col gap-14">
      {/* HERO */}
      <section className="flex flex-col gap-6 pt-4">
        <p className="text-gold text-sm font-bold tracking-widest">
          돈길 계좌체력 진단
        </p>
        <h1 className="heading-xl">
          왜 내가 사면 떨어지고
          <br />
          팔면 올라갈까?
        </h1>
        <p className="text-ink/80 text-base leading-relaxed">
          종목 문제가 아닐 수 있습니다.
          <br />
          매수 습관, 현금 비중, 분할매수 기준이 무너지면
          <br />
          좋은 종목을 사도 계좌는 흔들립니다.
        </p>
      </section>

      {/* SAMPLE DIAGNOSIS CARD */}
      <section className="flex flex-col gap-3">
        <p className="text-xs text-muted tracking-widest">진단 결과 예시</p>
        <div className="rounded-2xl border border-line bg-black/40 p-6 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted">샘플 진단</p>
            <span className="text-[11px] px-2 py-1 rounded-full bg-danger/15 text-danger-soft border border-danger/40 font-bold">
              ⚠ 하체운동 부족
            </span>
          </div>
          <div>
            <p className="text-xs text-muted mb-1">진단 유형</p>
            <h2 className="text-2xl font-extrabold">장초반 추격매수형</h2>
          </div>
          <div>
            <p className="text-xs text-muted mb-1">계좌체력 점수</p>
            <p className="text-4xl font-extrabold text-gold">
              42<span className="text-xl text-muted"> / 100</span>
            </p>
            <div className="h-1.5 bg-line rounded-full overflow-hidden mt-2">
              <div className="h-full bg-gold" style={{ width: '42%' }} />
            </div>
          </div>
          <div className="rounded-xl border border-danger/30 bg-danger/10 p-3">
            <p className="text-[11px] text-danger-soft font-bold">대표 위험</p>
            <p className="text-sm font-bold mt-0.5">장 초반 추격매수</p>
          </div>
          <div>
            <p className="text-[11px] text-muted font-bold mb-1">반복 실수 TOP 1</p>
            <p className="text-sm">장 시작 직후 급등주 매수</p>
          </div>
          <p className="text-sm text-ink/90 border-l-2 border-gold pl-3 leading-relaxed">
            수익은 짧게, 손실은 길게 가져가는 패턴이 보입니다.
          </p>
        </div>
        <p className="text-[11px] text-muted text-center">
          실제 진단 결과의 일부 화면입니다
        </p>
      </section>

      {/* EMPHASIS QUOTE */}
      <section className="rounded-2xl bg-gold/5 border border-gold/30 p-6 text-center">
        <p className="leading-relaxed font-bold text-lg">
          주식장에서 제일 위험한 건
          <br />
          종목 모르는 사람이 아니라
          <br />
          <span className="text-gold">자기가 왜 지는지 모르는 사람</span>입니다.
        </p>
      </section>

      {/* MAIN CTA */}
      <Link
        href="/test"
        className="rounded-2xl bg-gold text-black px-6 py-5 text-center text-lg font-bold hover:bg-gold-soft transition-colors"
      >
        무료로 내 계좌체력 테스트하기 →
      </Link>
      <p className="text-xs text-muted text-center -mt-10 mb-4">
        10문항, 약 2분 · 로그인 없음 · 결과는 브라우저에만 저장
      </p>

      {/* EMPATHY CARDS */}
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
              className="rounded-2xl border border-line p-4 bg-black/40 text-sm leading-relaxed flex items-start gap-3"
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

      {/* HOW IT WORKS */}
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
              className="rounded-2xl border border-line p-5 bg-black/40 flex gap-4"
            >
              <span className="text-gold font-bold shrink-0 text-xs tracking-widest pt-1">
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

      {/* SECONDARY CTA */}
      <Link
        href="/test"
        className="rounded-2xl bg-gold text-black px-6 py-5 text-center text-lg font-bold hover:bg-gold-soft transition-colors"
      >
        무료로 내 계좌체력 테스트하기 →
      </Link>

      <Disclaimer />
    </main>
  );
}
