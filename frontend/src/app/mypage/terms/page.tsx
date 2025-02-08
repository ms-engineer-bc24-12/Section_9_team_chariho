//src/app/mypage/terms/page.tsx
//③-② 利用規約ページ

export default function TermsPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-2xl font-bold">
          ヘッダーの右上にアカウント設定を追加
        </p>
        <p className="text-2xl font-bold">利用規約</p>

        <p className="text-center text-gray-700">
          アプリ利用時はスマートフォンの電源を切らないでください。
        </p>

        <p className="text-center text-gray-700">
          ①-①新規登録ページの利用規約を押すとこちらにページ遷移する設定にしている
        </p>

        <p className="text-center text-gray-700">
          もしこの方法を採用する場合、①-①新規登録ページに戻るボタンを追加
        </p>

        <p className="text-center text-gray-700">
          採用しない場合は ①-①新規登録ページの利用規約をトグルにする
        </p>
        <p className="text-center text-gray-700">
          ③マイページの利用規約ボタンを押すとこちらのページページ遷移する予定
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
//http://localhost:3000/mypage/terms
