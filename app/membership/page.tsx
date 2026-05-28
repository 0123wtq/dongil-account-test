import Link from 'next/link';
import { getMembershipUrl } from '@/lib/site';
import { Disclaimer } from '@/components/Disclaimer';

const FAQ = [
  {
    q: '종목 추천방인가요?',
    a: '아닙니다. 돈길 멤버십방은 “지금 이거 사세요”라고 종목을 찍어주는 방이 아니라, 혼자 매매하다 흔들리지 않도록 기준을 같이 잡아주는 방입니다.',
  },
  {
    q: '매수·매도 타이밍을 알려주나요?',
    a: '아닙니다. 특정 종목의 매수가/매도가를 지시하지 않습니다. 시장 흐름, 분할매수 기준, 현금 비중 같은 기준을 공유합니다. 매매 판단과 책임은 본인에게 있습니다.',
  },
  {
    q: '초보자도 들어갈 수 있나요?',
    a: '오히려 초보일수록 도움이 됩니다. 혼자 매매하다 같은 실수를 반복하는 단계의 분들을 위해 만든 방입니다.',
  },
  {
    q: '월 30,000원은 자동결제인가요?',
    a: '현재는 자동결제 방식이 아닙니다. 신청 링크를 통해 안내드리는 방식으로 운영되며, 자동결제가 도입될 경우 사전에 공지드립니다.',
  },
  {
    q: '환불은 어떻게 되나요?',
    a: '서비스 이용 전이라면 환불이 가능합니다. 자세한 환불 기준은 신청 시 안내드리며, 결제 전 약관을 꼭 확인해 주세요.',
  },
  {
    q: '카톡방에서는 어떤 내용을 받나요?',
    a: '장전 시장 체크, 장중 멘탈 기준, 급등주 추격매수/FOMO 방지 가이드, ETF·섹터 흐름 관찰, 마감 복기, 초보 투자 루틴, 분할매수·현금비중·조정장 대응 기준 등을 받습니다.',
  },
];

const COMPARE_ROWS: [string, string, string, string][] = [
  ['내 유형 진단', '○', '○', '○'],
  ['계좌체력 점수', '○', '○', '○'],
  ['반복 실수 TOP 3', '✕', '○', '○'],
  ['매수 전 체크리스트', '✕', '○', '○'],
  ['이번 주 매매 금지 규칙', '✕', '○', '○'],
  ['장전 시장 체크', '✕', '✕', '○'],
  ['장중 흔들릴 때 기준', '✕', '✕', '○'],
  ['마감 복기 / 루틴', '✕', '✕', '○'],
  ['매일 같이 보는 사람', '✕', '✕', '○'],
];

const BENEFITS = [
  '장전 시장 체크',
  '장중 멘탈 기준',
  '급등주 추격매수 / FOMO 방지',
  'ETF · 섹터 흐름 관찰',
  '마감 복기',
  '초보 투자 루틴',
  '분할매수 · 현금비중 · 조정장 대응 기준',
];

export default function MembershipPage() {
  const applyUrl = getMembershipUrl();

  return (
    <main className="flex flex-col gap-10">
      <div className="pt-2">
        <p className="text-gold text-sm font-bold tracking-widest">돈길 계좌체력 멤버십</p>
      </div>

      <h1 className="heading-xl">
        진단 결과를 보는 것만으로는<br />
        계좌가 바뀌지 않습니다.
      </h1>

      <p className="leading-relaxed text-ink/90">
        문제는 장중에 또 같은 선택을 한다는 겁니다.<br />
        돈길 멤버십방에서는 매일 시장 흐름을 같이 보며<br />
        혼자 흔들리지 않도록 기준을 잡아드립니다.
      </p>

      <section className="rounded-2xl border border-gold/40 bg-gold/5 p-6">
        <p className="text-sm text-gold font-bold mb-2">멤버십 포지셔닝</p>
        <p className="leading-relaxed font-bold">
          종목 찍어주는 방이 아닙니다.<br />
          혼자 매매하다 흔들리지 않게<br />
          기준을 잡아주는 방입니다.
        </p>
      </section>

      <section>
        <h2 className="heading-lg mb-4">제공 내용</h2>
        <ul className="flex flex-col gap-3">
          {BENEFITS.map((x) => (
            <li key={x} className="rounded-2xl border border-line p-4 bg-black/40">
              <span className="text-gold font-bold mr-2">✓</span>
              {x}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="heading-lg mb-4">차이 비교</h2>
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left">
                <th className="p-3 border border-line"></th>
                <th className="p-3 border border-line text-muted">무료 테스트</th>
                <th className="p-3 border border-line text-muted">990원 리포트</th>
                <th className="p-3 border border-line text-gold">월 3만원 멤버십</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`p-3 border border-line align-top ${
                        j === 3 ? 'text-gold font-bold' : j === 0 ? '' : 'text-muted'
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-line p-6 bg-black/40">
        <p className="text-sm text-muted mb-1">멤버십 가격</p>
        <p className="text-3xl font-extrabold">
          월 <span className="text-gold">30,000원</span>
        </p>
        <p className="text-sm text-muted mt-3">상품명: 돈길 계좌체력 멤버십</p>
      </section>

      <a
        href={applyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-2xl bg-gold text-black px-6 py-4 text-center text-base font-bold hover:bg-gold-soft transition-colors"
      >
        월 30,000원으로 돈길 멤버십방 신청하기 →
      </a>

      <section>
        <h2 className="heading-lg mb-4">자주 묻는 질문</h2>
        <div className="flex flex-col gap-3">
          {FAQ.map((item) => (
            <details key={item.q} className="rounded-2xl border border-line p-5 bg-black/40 group">
              <summary className="font-bold cursor-pointer list-none flex justify-between items-center">
                <span>{item.q}</span>
                <span className="text-gold ml-3 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="text-sm text-ink/85 mt-3 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Link href="/" className="text-sm text-muted text-center hover:text-ink">
        ← 처음으로
      </Link>

      <Disclaimer />
    </main>
  );
}
