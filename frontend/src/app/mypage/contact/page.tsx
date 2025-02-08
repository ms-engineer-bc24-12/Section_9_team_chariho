//src/app/mypage/contact/page.tsx
//③-③　問い合わせページ

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow px-4">
        <p className="text-2xl font-bold mb-4">
          ヘッダーの右上にアカウント設定を追加
        </p>
        <p className="text-2xl font-bold mb-4">問い合わせ</p>
        <p className="text-center text-gray-600">
          ③マイページの問い合わせボタンを押すとこちらのページに遷移する予定
        </p>
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
//http://localhost:3000/mypage/contact
