//src/app/rental/page.tsx
//②　借りる/貸す/返す選択ページ
import Link from 'next/link';
import Button from '../components/Button';

export default function RentalPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-4xl font-bold">🏠Home</p>
      <br />
      <br />
      <div className="flex flex-col gap-4 mt-6">
        <Link href="/rental/lend">
          <Button className="border p-4 rounded-md w-60 text-center cursor-pointer hover:bg-gray-100">
            自転車を貸す
          </Button>
        </Link>
        <br />
        <Link href="/rental/borrow">
          <Button className="border p-4 rounded-md w-60 text-center cursor-pointer hover:bg-gray-100">
            自転車を借りる
          </Button>
        </Link>
        <br />
        <Link href="/rental/return">
          <Button className="border p-4 rounded-md w-60 text-center cursor-pointer hover:bg-gray-100">
            自転車を返す
          </Button>
        </Link>
      </div>
    </div>
  );
}

//ページ確認
//http://localhost:3000/rental にアクセス
