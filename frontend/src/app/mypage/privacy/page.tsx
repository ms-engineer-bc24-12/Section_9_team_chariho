//src/app/mypage/privacy/page.tsx
//③-④プライバシーポリシーページ

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-4">
      <h1 className="text-2xl font-bold">
        ヘッダーの右上にアカウント設定を追加
      </h1>
      <h1 className="text-2xl font-bold">プライバシーポリシー</h1>

      <div className="max-w-md mt-4 text-gray-700">
        <p>
          当サービスは、ユーザーの個人情報を適切に管理し、第三者に提供することはありません。
        </p>
        <p className="mt-2">詳しくは、サービス利用規約をご確認ください。</p>
      </div>

      {/* フッター */}
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
//http://localhost:3000/mypage/privacy
