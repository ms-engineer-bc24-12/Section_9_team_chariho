//src/app/mypage/page.tsx
//③ マイページ

import React from 'react';

export default function MyPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-2xl font-bold">
          ヘッダーの右上にアカウント設定を追加
        </p>
        <p className="text-2xl font-bold">マイページ</p>

        <div className="mt-6">
          <p className="border p-4 rounded-md w-60 text-center">
            ▼レンタル履歴（トグル?）
          </p>
          <p className="rounded-md w-60 text-sm">
            レンタル履歴を押すと③-①利用履歴ページに遷移?
          </p>
        </div>

        <div className="mt-6">
          <p className="border p-4 rounded-md w-60 text-center">通知</p>
          <p className="text-sm mt-2">〇〇は返却が完了しました。</p>
          <p className="text-sm">〇〇は予約が完了しました。</p>
        </div>

        <div className="mt-6">
          <p className="border p-4 rounded-md w-60 text-center">利用規約</p>
          <p className="rounded-md w-60 text-sm">
            利用規約を押すと③-② 利用規約ページへ遷移
          </p>
        </div>

        <div className="mt-6">
          <p className="border p-4 rounded-md w-60 text-center">問い合わせ</p>
          <p className="rounded-md w-60 text-sm">
            問い合わせを押すと③-③問い合わせページへ遷移
          </p>
        </div>

        <div className="mt-6">
          <p className="border p-4 rounded-md w-60 text-center">
            プライバシーポリシー
          </p>
          <p className="rounded-md w-60 text-sm">
            プライバシーポリシーを押すと③-④プライバシーポリシーページへ遷移
          </p>
        </div>
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
//http://localhost:3000/mypage
