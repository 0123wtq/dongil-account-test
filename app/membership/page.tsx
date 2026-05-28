import Link from 'next/link';
import { getMembershipUrl } from '@/lib/site';
import { Disclaimer } from '@/components/Disclaimer';
import { CheckMark } from '@/components/CheckMark';

const FAQ = [
  {
    q: '종목 추천방인가요?',
    a: '아닙니다. 특정 종목 매수·매도 지시가 아니라 시장을 보는 기준과 투자 습관을 잡는 방입니다.',
  },
  {
    q: '매수·매도 타이밍을 알려주나요?',
    a: '직접적인 매수·매도 지시는 제공하지 않습니다. 장중에 흔들리지 않도록 체크 포인트와 리스크 관리 기준을 제공합니다.',
  },
  {
    q: '초보자도 들어갈 수 있나요?',
    a: '네. 오히려 초보 투자자가 혼자 흔들리지 않도록 돕는 것을 목표로 합니다.',
  },
  {
    q: '월 30,000원은 자동결제인가요?',
    a: '현재 오픈 테스트 기간에는 신청 확인 후 안내하는 방식으로 운영됩니다. 정식 결제 시스템 도입 전까지 자동결제는 진행하지 않습니다.',
  },
  {
    q: '하루 1,000원이라는 말은 무슨 뜻인가요?',
    a: '월 30,000원을 30일 기준으로 나눈 금액입니다. 하루 약 1,000원으로 장중에 혼자 흔들리는 시간을 줄이는 것이 목표입니다.',
  },
  {
    q: '카톡방에서는 어떤 내용을 받나요?',
    a: '장전 시장 체크, 장중 멘탈 기준, 급등주 추격매수 방지, ETF/섹터 흐름, 마감 복기, 초보 투자 루틴, 분할매수·현금비중·조정장 대응 기준을 제공합니다.',
  },
];

const BENEFITS = [
  '장전 시장 체크',
  '장중 멘탈 기준',
  '급등주 추격매수 · FOMO 방지',
  'ETF · 섹터 흐름 관찰',
  '마감 복기',
  '초보 투자 루틴',
  '분할매수 · 현금비중 · 조정장 대응 기준',
];

export default function MembershipPage() {
  const applyUrl = getMembershipUrl();

  return (
    <main className="flex flex-col gap-12">
      {/* HERO */}
      <section className="flex flex-col gap-5 pt-2">
        <p className="text-gold text-sm font-bold tracking-widest">돈길 계좌체력 멤버십</p>
        <h1 className="heading-xl">
          혼자 매매하면
          <br />
          또 <span className="marker-gold">흔들립니다</span>
        </h1>
        <p className="leading-relaxed text-ink/90">
          종목 찍어주는 방이 아닙니다.
          <br />
          혼자 매매하다 흔들리지 않게
          <br />
          장전·장중·마감 기준을 같이 잡는 방입니다.
        </p>
      </section>

      {/* 가격 강조 — 종이 카드 */}
      <section className="paper rounded-2xl border-2 border-paperEdge p-6 flex flex-col gap-3 shadow-2xl text-center">
        <p className="text-xs text-mutedInk tracking-widest">멤버십 가격</p>
        <p className="text-5xl font-extrabold text-inkDark">월 30,000원</p>
        <p className="text-lg font-bold text-inkDark">
          하루 <span className="marker-gold">1,000원</span>
        </p>
        <p className="text-sm text-mutedInk leading-relaxed mt-2">
          커피 한 잔보다 적은 하루 1,000원으로
          <br />
          혼자 매매하는 불안을 줄이고,
          <br />
          흔들리는 장에서 기준을 잡아보세요.
        </p>
        <a
          href={applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl bg-gold text-inkDark px-6 py-5 text-center text-base font-extrabold btn-paper mt-3"
        >
          하루 1,000원으로 멤버십방 신청하기 →
        </a>
      </section>

      {/* 제공 내용 */}
      <section className="flex flex-col gap-4">
        <h2 className="heading-md">제공 내용</h2>
        <ul className="flex flex-col gap-3">
          {BENEFITS.map((x) => (
            <li
              key={x}
              className="rounded-2xl border-2 border-line bg-black/30 p-4 flex items-start gap-3"
            >
              <CheckMark className="text-gold mt-1" />
              <span>{x}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/routine"
          className="rounded-2xl border-sketch border-gold/50 bg-gold/5 px-6 py-4 text-center text-sm font-bold hover:bg-gold/10 transition-colors mt-2"
        >
          돈길 하루 루틴 미리보기 →
        </Link>
        <p className="text-xs text-muted text-center">
          멤버십방에서 매일 받는 장전·장중·마감 메모 형식
        </p>
      </section>

      {/* 2단계 비교 */}
      <section className="flex flex-col gap-4">
        <h2 className="heading-md">무료 테스트 vs 멤버십방</h2>
        <div className="flex flex-col gap-4">
          {/* 무료 테스트 */}
          <div className="rounded-2xl border-2 border-line bg-black/30 p-6 flex flex-col gap-4">
            <div>
              <p className="text-xs text-muted tracking-widest mb-1">무료 테스트</p>
              <p className="text-2xl font-extrabold">무료</p>
            </div>
            <ul className="text-sm flex flex-col gap-2">
              <li className="flex items-start gap-2">
                <span className="text-muted">✓</span>
                <span>내 투자 유형과 반복 실수 확인</span>
              </li>
            </ul>
            <Link
              href="/test"
              className="rounded-2xl border-2 border-line text-ink px-6 py-3 text-center text-sm font-semibold hover:border-gold/40 transition-colors"
            >
              무료 테스트 하러 가기 →
            </Link>
          </div>

          {/* 멤버십방 — 강조 */}
          <div className="paper rounded-2xl border-2 border-gold p-6 flex flex-col gap-4 relative shadow-2xl">
            <span className="tilt-right absolute -top-3 left-6 text-[11px] tracking-widest bg-danger text-paper px-3 py-1 rounded-md font-extrabold">
              ★ 추천
            </span>
            <div>
              <p className="text-xs text-mutedInk tracking-widest mb-1">돈길 멤버십방</p>
              <p className="text-3xl font-extrabold text-inkDark">월 30,000원</p>
              <p className="text-xs text-mutedInk mt-1">하루 1,000원</p>
            </div>
            <ul className="text-sm flex flex-col gap-2 text-inkDark">
              <li className="flex items-start gap-2">
                <span className="text-danger font-extrabold">✓</span>
                <span>매일 장전·장중·마감 기준 제공</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-danger font-extrabold">✓</span>
                <span>혼자 흔들리지 않는 투자 루틴 형성</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-danger font-extrabold">✓</span>
                <span>급등주 추격매수 · FOMO 방지</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-danger font-extrabold">✓</span>
                <span>돈길식 하체운동 기준 반복 학습</span>
              </li>
            </ul>
            <a
              href={applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-gold text-inkDark px-6 py-4 text-center text-base font-extrabold btn-paper"
            >
              월 30,000원으로 신청하기 →
            </a>
          </div>
        </div>
      </section>

      {/* 강한 CTA 카피 블록 */}
      <section className="rounded-2xl border-sketch border-gold/40 bg-gold/5 p-6 flex flex-col gap-4">
        <p className="leading-relaxed">
          진단 결과를 보는 것만으로는 계좌가 바뀌지 않습니다.
          <br />
          문제는 장중에 또 같은 선택을 한다는 겁니다.
        </p>
        <p className="leading-relaxed font-bold">
          돈길 멤버십방에서는 매일 시장 흐름을 같이 보며
          <br />
          혼자 흔들리지 않도록 기준을 잡아드립니다.
        </p>
        <a
          href={applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl bg-gold text-inkDark px-6 py-5 text-center text-base font-extrabold btn-paper"
        >
          혼자 매매 그만하고 돈길이랑 같이 보기 →
        </a>
        <p className="text-xs text-muted text-center -mt-1">
          하루 1,000원으로 혼자 매매하는 불안을 줄이세요.
        </p>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="heading-lg mb-4">자주 묻는 질문</h2>
        <div className="flex flex-col gap-3">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="rounded-2xl border-2 border-line p-5 bg-black/30 group"
            >
              <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                <span>{item.q}</span>
                <span className="text-gold ml-3 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="text-sm text-ink/85 mt-3 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 개인정보 안내 */}
      <section className="rounded-2xl border-2 border-line p-5 bg-black/30">
        <p className="text-xs text-muted leading-relaxed">
          멤버십 신청 시 외부 폼 또는 카카오톡에서 입력한 정보는
          입장 안내 및 문의 응대 목적으로만 사용됩니다.
        </p>
      </section>

      <Link href="/" className="text-sm text-muted text-center hover:text-ink">
        ← 처음으로
      </Link>

      <Disclaimer />
    </main>
  );
}
