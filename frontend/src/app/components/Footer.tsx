//src/app/components/Footer.tsx
//⑤ フッターの作成(2025@chariho?)
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full text-2xl py-1 flex text-orange-600 bg-[#76ecc1]">
      <Link
        href="/rental"
        className="w-1/2 flex flex-col items-center justify-center text-center py-2 hover:text-orange-800 rounded-l-lg border-r border-[#114431]"
      >
        <span className="text-3xl">🏠</span> {/* 自転車の絵文字 */}
        <span className="mt-1 text-sm">Home</span> {/* Homeテキスト */}
      </Link>
      <Link
        href="/mypage"
        className="w-1/2 flex flex-col items-center justify-center text-center py-2 hover:text-orange-800 rounded-full"
      >
        <span className="text-3xl">👤</span> {/* 人の絵文字 */}
        <span className="mt-1 text-sm">Mypage</span> {/* Mypageテキスト */}
      </Link>
    </footer>
  );
}
