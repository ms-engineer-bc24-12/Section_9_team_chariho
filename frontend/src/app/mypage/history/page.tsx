//src/app/mypage/history/page.tsx
//③-① 利用履歴一覧ページ
import Link from 'next/link';
import Button from '@/app/components/Button';

export default function HistoryPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-[140vh] pt-16">
      <div className="flex flex-col items-center flex-grow max-w-lg">
        <p className="text-2xl font-bold mt-6">⏰履歴一覧</p>
        <br />
        {/* 自転車を貸した場合 */}
        <div className="flex flex-col gap-2 mt-4 md-6">
          <p className="text-lg font-semibold">貸した自転車</p>
          <div className="border p-4 rounded-md w-80">
            <p>📅 2025/01/10</p>
            <p>🚲 自転車:マウンテンバイク</p>
            <p>📍 場所:春日部市</p>
            <p>💰 料金:500円</p>
          </div>
          <div className="border p-4 rounded-md mt-2">
            <p>📅 2025/01/15</p>
            <p>🚲 自転車:マウンテンバイク</p>
            <p>📍 場所:春日部市</p>
            <p>💰 料金:300円</p>
          </div>
        </div>

        {/* 自転車を借りた場合 */}
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-lg font-semibold">借りた自転車</p>
          <div className="border p-4 rounded-md w-80">
            <p>📅 2025/02/01</p>
            <p>🚲 自転車:電動アシスト</p>
            <p>📍 場所:越生町</p>
            <p>💰 料金:500円</p>
          </div>
          <div className="border p-4 rounded-md mt-2">
            <p>📅 2025/02/05</p>
            <p>🚲 自転車:ロードバイク</p>
            <p>📍 場所:秩父市</p>
            <p>💰 料金:800円</p>
          </div>
        </div>
        <div className="mt-6">
          <Link href="/mypage">
            <Button> マイページへ戻る</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

//ページ確認
//http://localhost:3000/mypage/history
