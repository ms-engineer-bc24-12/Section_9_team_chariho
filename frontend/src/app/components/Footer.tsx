//src/app/components/Footer.tsx
//⑤ フッターの作成(2025@chariho?)
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full border-t border-gray-300 text-2xl py-4 px-6 flex text-orange-600 bg-[#76ecc1]">
      <Link
        href="/rental"
        className="w-1/2 text-center py-2 hover:text-orange-800 rounded-l-lg"
      >
        🚲Home
      </Link>
      <Link
        href="/mypage"
        className="w-1/2 text-center py-2 hover:text-orange-800 rounded-r-lg"
      >
        🔔Mypage
      </Link>
    </footer>
  );
}
