//src/app/rental/borrow/reserve/confirm/page.tsx
//②-①-①-①予約確定ページ (予約の最終確認)→ 完了アラート表示　 (②借りる/貸す/返すへ自動遷移？)

export default function ReserveConfirmPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-2xl font-bold">
          ヘッダーの右上にアカウント設定を追加
        </p>
        <p className="text-2xl font-bold">入力内容 確認</p>

        <div className="mt-6">
          <p className="border p-4 rounded-md w-60 text-center">予約開始日時</p>
          <p className="border p-4 rounded-md w-60 text-center">
            2025-2-1 12:00
          </p>
        </div>

        <div className="mt-6">
          <p className="border p-4 rounded-md w-60 text-center">終了予定日時</p>
          <p className="border p-4 rounded-md w-60 text-center">
            2025-2-1 13:00
          </p>
        </div>

        <div className="mt-6">
          <p className="border p-4 rounded-md w-60 text-center">決済方法</p>
          <p className="border p-4 rounded-md w-60 text-center">🟢 PayPay</p>
          <p className="border p-4 rounded-md w-60 text-center">
            ※ ⬆️ユーザー情報から参照
          </p>
        </div>

        <div className="mt-6">
          <p className="border p-4 rounded-md w-60 text-center">予約確定</p>
          <p className="border p-4 rounded-md w-60 text-center">
            ※予約確定ボタンを押したら完了アラート表示
          </p>
          <p className="border p-4 rounded-md w-60 text-center">
            ※完了アラート内のOKボタンを押して②へ自動遷移？
          </p>
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-around bg-gray-100 p-4">
          <p>🏠 ホーム</p>
          <p>👤 マイページ</p>
        </div>
      </div>
    </div>
  );
}

//ページ確認
// http://localhost:3000/rental/borrow/reserve/confirm
