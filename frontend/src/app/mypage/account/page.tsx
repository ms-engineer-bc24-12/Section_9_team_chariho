//src/app/mypage/account/page.tsx
//⑦　アカウント設定ページ

export default function AccountPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <h1 className="text-2xl font-bold">アカウント設定</h1>

      <div className="mt-4 w-80">
        <p className="text-gray-600">以下の情報を確認・編集できます。</p>

        <div className="flex flex-col gap-4 mt-4">
          <p>名前</p>
          <p className="border p-2 rounded-md w-full bg-gray-100">山田 太郎</p>

          <p>住所</p>
          <p className="border p-2 rounded-md w-full bg-gray-100">
            東京都新宿区⚪︎⚪︎1-2-3
          </p>

          <p>電話番号</p>
          <p className="border p-2 rounded-md w-full bg-gray-100">
            090-1234-5678
          </p>

          <p>メール</p>
          <p className="border p-2 rounded-md w-full bg-gray-100">
            example@email.com
          </p>

          <p>パスワード</p>
          <p className="border p-2 rounded-md w-full bg-gray-100">********</p>

          <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md">
            登録
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-around bg-gray-100 p-4 mt-6">
          <p>🏠 ホーム</p>
          <p>👤 マイページ</p>
        </div>
      </div>
    </div>
  );
}

//ページ確認
//http://localhost:3000/mypage/account
