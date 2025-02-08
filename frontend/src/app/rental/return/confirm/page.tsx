//src/app/rental/return/confirm/pape.tsx
//②-③-①自転車返却確認ページ (時間/金額/決済情報)　→ 完了アラート表示(②借りる/貸す/返す選択ページへ自動遷移？)

export default function ReturnConfirmPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-4">
      <h1 className="text-2xl font-bold">
        ヘッダーの右上にアカウント設定を追加
      </h1>
      <h1 className="text-2xl font-bold">返却フォーム</h1>

      <div className="mt-4 w-full max-w-md">
        <p className="border p-2 rounded-md w-full">利用時間: ○○時間</p>
        <p className="border p-2 rounded-md w-full">料金: ○○円</p>
        <p className="border p-2 rounded-md w-full">写真の認証？</p>
        <p className="border p-2 rounded-md w-full">決済情報</p>
      </div>

      <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md">
        完了する
      </button>
      <div>
        <p>完了するを押したら、完了アラート表示(返却決済が完了しました！)</p>
        <p>
          完了アラートのOKボタンを押したら②(借りる/貸す/返す選択ページ)に自動遷移？
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
//http://localhost:3000/rental/return/confirm
