//src/app/components/Header.tsx
//ヘッダーの作成(言語選択のみ？)
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-md">
      {/* 左側: アプリ名 */}
      <Link href="/" className="text-xl font-bold text-gray-800">
        Chariho
      </Link>

      {/* 右側: 言語選択 */}
      <div className="flex items-center gap-6 text-gray-800 hover:text-gray-400 text-sm cursor-pointer">
        <span>言語選択</span>
        <Link href="/mypage/account" className="relative group">
          <span className="cursor-pointer">⚙️</span>
          {/* ホバー時に表示されるツールチップ */}
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-max px-2 py-1 text-xs text-black bg-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            設定
          </span>
        </Link>
      </div>
    </header>
  );
}
