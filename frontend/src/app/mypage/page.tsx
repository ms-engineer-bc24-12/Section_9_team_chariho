//src/app/mypage/page.tsx
//③ マイページ
import React from 'react';
import Link from 'next/link';

export default function MyPage() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-3xl font-bold">マイページ</p>

        <div className="mt-6">
          <div className="border p-4 rounded-md w-60 text-center">
            <p>通知一覧</p>
            <p>〇〇は返却が完了しました。</p>
          </div>
        </div>

        <div className="mt-6">
          <Link href="/mypage/history">
            <p className="border p-4 rounded-md w-60 text-center cursor-pointer hover:bg-gray-100">
              レンタル履歴
            </p>
          </Link>
        </div>

        <div className="mt-6">
          <Link href="/mypage/terms">
            <p className="border p-4 rounded-md w-60 text-center cursor-pointer hover:bg-gray-100">
              利用規約
            </p>
          </Link>
        </div>

        <div className="mt-6">
          <Link href="/mypage/contact">
            <p className="border p-4 rounded-md w-60 text-center cursor-pointer hover:bg-gray-100">
              問い合わせ
            </p>
          </Link>
        </div>

        <div className="mt-6">
          <Link href="/mypage/privacy">
            <p className="border p-4 rounded-md w-60 text-center cursor-pointer hover:bg-gray-100">
              プライバシーポリシー
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

//ページ確認
//http://localhost:3000/mypage
