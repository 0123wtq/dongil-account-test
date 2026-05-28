import Link from 'next/link';
import { getMembershipUrl } from '@/lib/site';
import { Disclaimer } from '@/components/Disclaimer';
import { CheckMark } from '@/components/CheckMark';

const SECTIONS = [
  {
    time: '08:30',
    label: '장전',
    title: '오늘 조심할 구간 · 현금비중 · 섹터 흐름',
    items: [
      '오늘 변동성이 큰 시간대(개장 직후, 옵션 만기, 미국 지표 발표 등)를 한 줄로 정리.',
      '현금 비중 30% 이상 유지 중인가? 25% 미만이면 신규 매수 보류.',
      '어제 강세 섹터의 후속 추격 금지. 오늘 약세 전환 가능성 체크.',
    ],
    tilt: '-rotate-1',
  },
  {
    time: '12:30',
    label: '장중',
    title: '추격매수 방지 · FOMO 체크 · 하체운동 기준',
    items: [
      '오전 9~10시 +5% 이상 급등 종목 신규 매수 금지. 아침의 손가락은 늘 비쌉니다.',
      '단톡방·뉴스 수익 인증으로 손이 움직이면 “1시간 룰”. 1시간 뒤에도 사고 싶으면 그때 검토.',
      '매수 전 3가지(현금비중·분할매수 가격·손절가)를 한 줄로 적었는지 본인에게 확인.',
    ],
    tilt: 'rotate-1',
  },
  {
    time: '16:00',
    label: '마감',
    title: '오늘 복기 · 흔들린 구간 · 내일 기준',
    items: [
      '오늘 종가 · 거래대금 · 강세/약세 섹터 한 줄 복기.',
      '장중 가장 흔들렸던 매수/매도가 있었다면 그 시간과 이유를 노트에 남기기.',
      '내일 진입 후보 종목 · 가격 · 비중을 미리 한 줄로. 즉흥 매수 방지.',
    ],
    tilt: '-rotate-1',
  },
];

export default function RoutinePage() {
  const applyUrl = getMembershipUrl();

  return (
    <main className="flex flex-col gap-12">
      {/* HERO */}
      <section className="flex flex-col gap-5 pt-2">
        <p className="text-gold text-sm font-bold tracking-widest">
          돈길 하루 루틴 미리보기
        </p>
        <h1 className="heading-xl">
          돈길은 매일
          <br />
          이렇게 <span className="marker-gold">계좌를 봅니다</span>
        </h1>
        <p className="leading-relaxed text-ink/90">
          종목을 찍어주는 게 아니라,
          <br />
          장전·장중·마감 세 시간대에 무엇을 점검하는지
          <br />
          돈길 멤버십방의 하루 흐름을 미리 보여드립니다.
        </p>
      </section>

      {/* 3 NOTE CARDS */}
      <section className="flex flex-col gap-8">
        {SECTIONS.map((s) => (
          <div
            key={s.label}
            className={`paper rounded-2xl border-2 border-paperEdge p-6 flex flex-col gap-4 shadow-2xl ${s.tilt}`}
          >
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-extrabold text-inkDark">{s.time}</span>
                <span className="text-xs tracking-widest text-mutedInk bg-paperEdge/50 px-2 py-0.5 rounded">
                  {s.label}
                </span>
              </div>
              <span className="tilt-right text-[10px] tracking-widest text-danger font-extrabold border border-danger/50 px-2 py-0.5 rounded">
                MEMO
              </span>
            </div>
            <p className="text-sm font-bold text-inkDark leading-snug">
              {s.title}
            </p>
            <ul className="flex flex-col gap-3 text-sm text-inkDark">
              {s.items.map((it, i) => (
                <li key={i} className="flex items-start gap-3 leading-relaxed">
                  <CheckMark className="text-danger mt-1" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="text-[11px] text-muted text-center leading-relaxed">
          ※ 실제 멤버십방 메시지의 형식과 톤을 보여주는 예시 화면입니다.
          <br />
          특정 종목 추천이 아니며, 시장 상황에 맞춰 매일 새로 제공됩니다.
        </p>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border-2 border-gold/50 bg-gold/5 p-6 flex flex-col gap-5">
        <p className="leading-relaxed font-bold text-lg">
          이 루틴을 매일 같이 보고 싶다면
          <br />
          하루 1,000원으로 돈길 멤버십방에 신청하세요.
        </p>
        <div className="flex items-baseline justify-between border-t border-gold/30 pt-4">
          <span className="text-xs text-muted tracking-widest">멤버십 가격</span>
          <span>
            <span className="text-2xl font-extrabold text-gold">하루 1,000원</span>
            <span className="text-xs text-muted ml-2">(월 30,000원)</span>
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
        <p className="text-xs text-muted text-center -mt-2">
          하루 1,000원으로 혼자 매매하는 불안을 줄이세요.
        </p>
      </section>

      <div className="flex flex-col gap-3 items-center">
        <Link href="/membership" className="text-sm text-muted hover:text-ink">
          멤버십 비교·FAQ 자세히 보기
        </Link>
        <Link href="/" className="text-sm text-muted hover:text-ink">
          ← 처음으로
        </Link>
      </div>

      <Disclaimer />
    </main>
  );
}
