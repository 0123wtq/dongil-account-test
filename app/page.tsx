import Link from 'next/link';
import { Disclaimer } from '@/components/Disclaimer';

export default function HomePage() {
  return (
    <main className="flex flex-col gap-10">
      <div className="pt-4">
        <p className="text-gold text-sm font-bold tracking-widest">돈길 계좌체력 진단</p>
      </div>

      <h1 className="heading-xl">
        왜 내가 사면 떨어지고<br />
        팔면 올라갈까?
      </h1>

      <p className="text-ink/80 text-base leading-relaxed">
        종목 문제가 아닐 수 있습니다.<br />
        매수 습관, 현금 비중, 분할매수 기준이 무너지면<br />
        좋은 종목을 사도 계좌는 흔들립니다.
      </p>

      <div className="rounded-2xl border border-line p-5 bg-black/40">
        <p className="text-sm text-muted mb-3">이 진단은</p>
        <ul className="text-sm space-y-2">
          <li>• 10개 문항, 약 2분 소요</li>
          <li>• 매매 습관 7가지 위험 영역 점검</li>
          <li>• 결과는 브라우저에만 저장 (로그인 없음)</li>
        </ul>
      </div>

      <Link
        href="/test"
        className="rounded-2xl bg-gold text-black px-6 py-4 text-center text-base font-bold hover:bg-gold-soft transition-colors"
      >
        무료로 내 계좌체력 테스트하기 →
      </Link>

      <Disclaimer />
    </main>
  );
}
