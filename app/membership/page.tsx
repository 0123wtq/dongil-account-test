import Link from 'next/link';
import { getMembershipUrl } from '@/lib/site';
import { Disclaimer } from '@/components/Disclaimer';

const FAQ = [
  {
    q: '종목 추천방인가요?',
    a: '아닙니다. 특정 종목 매수·매도 지시를 제공하지 않습니다. 시장 흐름, 투자 습관, 리스크 관리 기준을 함께 점검하는 방입니다.',
  },
  {
    q: '매수·매도 타이밍을 알려주나요?',
    a: '아닙니다. 매수·매도 지시는 제공하지 않습니다. 대신 장중에 흔들리지 않도록 분할매수, 현금비중, 추격매수 방지 기준을 제공합니다.',
  },
  {
    q: '초보자도 들어갈 수 있나요?',
    a: '네. 오히려 초보 투자자가 혼자 장을 보다가 흔들리지 않도록 돕는 목적의 방입니다.',
  },
  {
    q: '월 30,000원은 자동결제인가요?',
    a: '현재 오픈 테스트 단계에서는 자동결제가 아닙니다. 신청 확인 후 안내되는 방식으로 운영됩니다.',
  },
  {
    q: '환불은 어떻게 되나요?',
    a: '현재는 정식 PG 결제 전 단계이므로 신청/입장 안내 시점에 별도 안내됩니다. 정식 결제 도입 후에는 환불 정책을 명확히 고지할 예정입니다.',
  },
  {
    q: '카톡방에서는 어떤 내용을 받나요?',
    a: '장전 체크, 장중 멘탈 기준, 급등주 추격매수 방지, ETF/섹터 흐름, 마감 복기, 초보 투자 루틴을 제공합니다.',
  },
];

const PLANS = [
  {
    title: '무료 테스트',
    price: '무료',
    highlight: false,
    items: [
      '투자 유형 일부 확인',
      '계좌체력 점수 확인',
      '대표 위험 1개 확인',
    ],
    cta: { label: '무료 테스트 시작', href: '/test', external: false },
  },
  {
    title: '상세 리포트',
    price: '오픈 테스트 무료',
    sub: '정식 오픈 후 990원',
    highlight: false,
    items: [
      '반복 실수 TOP 3',
      '위험 지표 5개',
      '이번 주 매매 금지 규칙',
      '매수 전 체크리스트',
      '하체운동 처방',
    ],
    cta: { label: '결과 화면으로', href: '/result', external: false },
  },
  {
    title: '돈길 멤버십',
    price: '월 30,000원',
    sub: '하루 1,000원',
    highlight: true,
    items: [
      '장전 시장 체크',
      '장중 멘탈 기준',
      '급등주 추격매수 · FOMO 방지',
      'ETF · 섹터 흐름 관찰',
      '마감 복기',
      '초보 투자 루틴',
      '분할매수 · 현금비중 · 조정장 기준',
    ],
    cta: { label: '월 30,000원으로 멤버십 신청하기', href: '', external: true },
  },
];

export default function MembershipPage() {
  const applyUrl = getMembershipUrl();

  return (
    <main className="flex flex-col gap-12">
      {/* HERO */}
      <section className="flex flex-col gap-5 pt-2">
        <p className="text-gold text-sm font-bold tracking-widest">
          돈길 계좌체력 멤버십
        </p>
        <h1 className="heading-xl">
          혼자 매매하면
          <br />
          또 흔들립니다
        </h1>
        <p className="leading-relaxed text-ink/90">
          돈길 멤버십방은 종목 찍어주는 방이 아닙니다.
          <br />
          장전·장중·마감 기준을 같이 잡으며
          <br />
          혼자 흔들리지 않게 만드는 계좌체력 관리방입니다.
        </p>
      </section>

      {/* 3-COL COMPARISON */}
      <section className="flex flex-col gap-4">
        <h2 className="heading-md">3단계 비교</h2>
        <div className="flex flex-col gap-4">
          {PLANS.map((p) => {
            const isApply = p.cta.external && p.highlight;
            const ctaHref = isApply ? applyUrl : p.cta.href;
            return (
              <div
                key={p.title}
                className={
                  p.highlight
                    ? 'rounded-2xl border border-gold/50 bg-gold/5 p-6 flex flex-col gap-5 relative'
                    : 'rounded-2xl border border-line bg-black/40 p-6 flex flex-col gap-5'
                }
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-6 text-[11px] tracking-widest bg-gold text-black px-2 py-1 rounded-full font-bold">
                    추천
                  </span>
                )}
                <div>
                  <p className="text-xs text-muted tracking-widest mb-1">
                    {p.title}
                  </p>
                  <p
                    className={
                      p.highlight
                        ? 'text-3xl font-extrabold text-gold'
                        : 'text-2xl font-extrabold'
                    }
                  >
                    {p.price}
                  </p>
                  {p.sub && (
                    <p className="text-xs text-muted mt-1">{p.sub}</p>
                  )}
                </div>
                <ul className="flex flex-col gap-2 text-sm">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span
                        className={
                          p.highlight ? 'text-gold font-bold' : 'text-muted'
                        }
                      >
                        ✓
                      </span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                {isApply ? (
                  <a
                    href={ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl bg-gold text-black px-6 py-4 text-center text-base font-bold hover:bg-gold-soft transition-colors"
                  >
                    {p.cta.label} →
                  </a>
                ) : (
                  <Link
                    href={ctaHref}
                    className="rounded-2xl border border-line text-ink px-6 py-4 text-center text-sm font-semibold hover:border-gold/40 transition-colors"
                  >
                    {p.cta.label} →
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* MEMBERSHIP CTA BLOCK */}
      <section className="rounded-2xl border border-gold/40 bg-gold/5 p-6 flex flex-col gap-5">
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
          className="rounded-2xl bg-gold text-black px-6 py-5 text-center text-base font-bold hover:bg-gold-soft transition-colors"
        >
          월 30,000원으로 멤버십 신청하기 →
        </a>
        <p className="text-xs text-muted text-center -mt-2">
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
              className="rounded-2xl border border-line p-5 bg-black/40 group"
            >
              <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                <span>{item.q}</span>
                <span className="text-gold ml-3 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-sm text-ink/85 mt-3 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* PRIVACY */}
      <section className="rounded-2xl border border-line p-5 bg-black/40">
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
