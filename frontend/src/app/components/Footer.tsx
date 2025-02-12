//src/app/components/Footer.tsx
//⑤ フッターの作成(2025@chariho?)
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-white border-t border-gray-300 py-4 px-6 flex">
      <Link
        href="/rental"
        className="w-1/2 text-center py-2 text-grey-800 hover:text-gray-400 rounded-l-lg"
      >
        ホーム
      </Link>
      <Link
        href="/mypage"
        className="w-1/2 text-center py-2 text-grey-800 hover:text-gray-400 rounded-r-lg"
      >
        マイページ
      </Link>
    </footer>
  );
}
