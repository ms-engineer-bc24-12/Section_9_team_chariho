//src/app/rental/lend/page.tsx
//②-②　貸すページ(登録ボタン/自転車情報一覧)

export default function LendPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-2xl font-bold">
          ヘッダーの右上にアカウント設定を追加
        </p>
        <p className="text-2xl font-bold">貸す</p>

        <div className="mt-6">
          <p className="border p-4 rounded-md w-60 text-center">
            自転車を登録する
          </p>
        </div>

        <p className="text-lg font-semibold mt-6">自転車一覧</p>
        <div className="flex flex-col gap-2 mt-4">
          <p className="border p-4 rounded-md w-60">自転車1</p>
          <p className="border p-4 rounded-md w-60">自転車2</p>
          <p className="border p-4 rounded-md w-60">自転車3</p>
        </div>
      </div>

      {/* フッターナビ */}
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
// http://localhost:3000/rental/lend
