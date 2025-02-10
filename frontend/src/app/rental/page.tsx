//src/app/rental/page.tsx
//②　借りる/貸す/返す選択ページ
export default function RentalPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-2xl font-bold">
          ホーム ヘッダーの右上にアカウントを追加
        </p>

        <div className="flex flex-col gap-4 mt-6">
          <p className="border p-4 rounded-md w-60 text-center">貸す</p>
          <p className="border p-4 rounded-md w-60 text-center">借りる</p>
          <p className="border p-4 rounded-md w-60 text-center">返す</p>
        </div>
      </div>
    </div>
  );
}

//ページ確認
//http://localhost:3000/rental にアクセス
