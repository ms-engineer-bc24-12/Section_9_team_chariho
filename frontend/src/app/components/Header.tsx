//src/app/components/Header.tsx
//ヘッダーの作成(言語選択のみ？)
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-8 py-4 shadow-md bg-[#81d4fa]">
      {/* 左側: アプリ名 */}
      <Link
        href="/"
        className="text-3xl font-bold hover:text-orange-800 text-orange-600"
      >
        Chariho
      </Link>

      <div className="flex items-center gap-6">
        {/* 言語選択 */}
        <div className="text-1xl hover:text-orange-800 text-orange-600 cursor-pointer">
          <span>言語選択</span>
        </div>

        {/* 設定（⚙️） */}
        <div>
          <Link href="/mypage/account" className="relative group">
            <span className="cursor-pointer">⚙️</span>
            {/* ホバー時に表示されるツールチップ */}
            <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-max px-2 py-1 text-1xl hover:text-orange-800 text-orange-600 bg-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              設定
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
