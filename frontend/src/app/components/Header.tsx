//src/app/components/Header.tsx
//ヘッダーの作成(言語選択のみ？)
export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-6 py-4 bg-white shadow-md">
      {/* 左側: アプリ名 */}
      <h1 className="text-xl font-bold text-gray-800">Chariho</h1>

      {/* 右側: 言語選択 */}
      <div className="text-gray-600 text-sm cursor-pointer">言語選択</div>
    </header>
  );
}
