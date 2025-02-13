//src/app/rental/borrow/page.tsx
//②-①　借りるページ(Googleマップ/予約)

import Button from '@/app/components/Button';
import GoogleMapComponent from '../../components/GoogleMap';
import Link from 'next/link';

export default function BorrowPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-5xl font-bold">🔎My Chari 予約</p>

        <div className="mt-6 w-80 h-60 border flex items-center justify-center">
          {/* Google Mapを表示 */}
          <GoogleMapComponent />
        </div>

        <p className="mt-4">予約したいMy Chariを選ぼう！</p>
        <p className="text-lg font-semibold mt-2">自転車一覧</p>

        <div className="flex items-center gap-2 mt-2">
          <input type="checkbox" />
          <p>自転車を選択</p>
        </div>
        <br />
        <Link href="/rental/borrow/reserve">
          <Button>予約する</Button>
        </Link>
      </div>
    </div>
  );
}

//ページ確認
//http://localhost:3000/rental/borrow
