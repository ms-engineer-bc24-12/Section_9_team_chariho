//src/app/components/Footer.tsx
//⑤ フッターの作成(2025@chariho?)
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full text-2xl py-1 flex text-orange-600 bg-[#76ecc1]">
      <Link
        href="/rental"
        className="w-1/2 text-center py-2 hover:text-orange-800 rounded-l-lg border-r border-[#114431]"
      >
        <span className="text-4xl">🏠</span> {/* 自転車の絵文字 */}
        <span className="mt-2">Home</span> {/* Homeテキスト */}
      </Link>
      <Link
        href="/mypage"
        className="w-1/2 text-center py-2 hover:text-orange-800 rounded-full"
      >
        👤Mypage
      </Link>
    </footer>
  );
}
