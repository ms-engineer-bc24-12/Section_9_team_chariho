//src/app/rental/borrow/reserve/page.tsx
//②-①-①予約内容入力ページ(予約日時選択)

export default function ReservePage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-2xl font-bold">
          ヘッダーの右上にアカウント設定を追加
        </p>
        <p className="text-2xl font-bold">予約フォーム</p>

        <p className="text-lg font-semibold mt-6">予約日時</p>
        <div className="flex flex-col gap-2 mt-4">
          <p className="border p-4 rounded-md w-60">📅 予約開始日</p>
          <p className="border p-4 rounded-md w-60">📅 終了予定日</p>
        </div>

        <p className="text-lg font-semibold mt-6">決済方法</p>
        <div className="flex flex-col gap-2 mt-4">
          <p className="border p-4 rounded-md w-60">⭕ PayPay</p>
          <p className="border p-4 rounded-md w-60">⭕ 電子マネー</p>
          <p className="border p-4 rounded-md w-60">⭕ クレカ</p>
        </div>

        <div className="mt-6">
          <p className="border p-4 rounded-md w-60 text-center">
            入力内容を確認
          </p>
        </div>
      </div>

      {/* フッターナビ */}
      <div className="w-full">
        <div className="flex justify-around bg-gray-100 p-4">
          <p>🏠 ホーム</p>
          <p>👤 マイページ</p>
        </div>
        <p className="text-center text-sm text-gray-500 py-2"></p>
      </div>
    </div>
  );
}

//ページ確認
//http://localhost:3000/rental/borrow/reserve
