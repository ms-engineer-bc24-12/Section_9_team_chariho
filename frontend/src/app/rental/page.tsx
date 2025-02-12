//src/app/rental/page.tsx
//②　借りる/貸す/返す選択ページ
import Link from 'next/link';

export default function RentalPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-2xl font-bold">
          ホーム ヘッダーの右上にアカウントを追加
        </p>

        <div className="flex flex-col gap-4 mt-6">
          <Link href="/rental/lend">
            <p className="border p-4 rounded-md w-60 text-center cursor-pointer hover:bg-gray-100">
              貸す
            </p>
          </Link>
          <Link href="/rental/borrow">
            <p className="border p-4 rounded-md w-60 text-center cursor-pointer hover:bg-gray-100">
              借りる
            </p>
          </Link>
          <Link href="/rental/return">
            <p className="border p-4 rounded-md w-60 text-center cursor-pointer hover:bg-gray-100">
              返す
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

//ページ確認
//http://localhost:3000/rental にアクセス
