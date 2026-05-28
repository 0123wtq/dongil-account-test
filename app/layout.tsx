import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '돈길 계좌체력 진단',
  description: '왜 내가 사면 떨어지고 팔면 올라갈까? 종목 문제가 아닐 수 있습니다. 무료 10문항으로 내 매매 습관을 점검해보세요.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen">
        <div className="mx-auto w-full max-w-[480px] px-5 py-8">{children}</div>
      </body>
    </html>
  );
}
