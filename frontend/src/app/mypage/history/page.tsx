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
          <p className="text-2xl font-semibold text-center">売上金：0円</p>
          <p className="text-2xl font-semibold text-center">お支払金額：1000円</p>
          <br />
          <div className="border p-4 rounded-md w-80">
            <p>📅 2025/02/27</p>
            <p>🚲 自転車の名前:自転車</p>
            <p>⌚ 予約時間:9:00～12:00</p>
            <p>💰 料金:300円</p>
          </div>
          <div className="border p-4 rounded-md w-80">
            <p>📅 2025/01/30</p>
            <p>🚲 自転車の名前:マウンテンバイク</p>
            <p>⌚ 予約時間:7:00～14:00</p>
            <p>💰 料金:700円</p>
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
