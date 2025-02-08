//src/app/rental/borrow/page.tsx
//②-①　借りるページ(Googleマップ/予約)
export default function BorrowPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-2xl font-bold">
          ヘッダーの右上にアカウント設定を追加
        </p>
        <p className="text-2xl font-bold">
          借りる ヘッダーの右上にアカウント設定を追加
        </p>

        <div className="mt-6 w-80 h-60 border flex items-center justify-center">
          <p>Googleマップ</p>
        </div>

        <p className="mt-4">クリックしたら</p>
        <p className="text-lg font-semibold mt-2">自転車一覧</p>

        <div className="flex items-center gap-2 mt-2">
          <input type="checkbox" />
          <p>自転車を選択</p>
        </div>

        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md">
          予約する
        </button>
      </div>

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
//http://localhost:3000/rental/borrow
