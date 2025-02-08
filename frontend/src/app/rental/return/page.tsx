//src/app/rental/return/page.tsx
//②-③　返すページ(画像アップロード)
//画像アップロード・決済

export default function ReturnPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-2xl font-bold">
          ヘッダーの右上にアカウント設定を追加
        </p>
        <p className="text-2xl font-bold">返却</p>

        <div className="mt-6">
          <p className="border p-4 rounded-md w-60 text-center">
            🗺️ Googleマップ
          </p>
        </div>

        <p className="text-lg font-semibold mt-6">
          自転車の現在地と返却場所を表示
        </p>

        <div className="mt-6">
          <p className="border p-4 rounded-md w-60 text-center">
            位置が一致したら返却ボタンが出てくる
          </p>
        </div>

        <div className="mt-6">
          <p className="border p-4 rounded-md w-60 text-center">返却する</p>
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
// http://localhost:3000/rental/return
