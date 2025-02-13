//src/app/rental/register/page.tsx
//②-②-①　自転車情報登録ページ　(画像/場所/金額/期間/鍵情報) →　完了アラート表示 (②-②がめんへ自動遷移)
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/app/components/Button';

export default function RegisterBikePage() {
  // 🚲 貸出自転車　保管場所の仮データを state に保持
  const [storageLocation] = useState({ lat: 35.928339, lng: 139.5765827 });
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = () => {
    setIsRegistered(true); // 登録状態を更新
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-4">
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-lg">
        <p className="text-5xl font-bold mb-4">📑My Chari 登録</p>
        <br />
        <br />
        {/* 保管場所の表示 */}
        {isRegistered ? (
          <div className="p-6 max-w-md text-center border rounded-md shadow-md bg-white">
            <p className="text-lg font-semibold">登録しました！</p>
            <p className="mt-2 text-gray-600">自転車が正常に登録されました。</p>

            {/* 登録完了後の戻るボタン */}
            <div className="mt-6">
              <Link href="/rental/lend">
                <Button>My Chari に戻る</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-6 max-w-md w-full border rounded-md shadow-md bg-white">
            <p className="text-md mb-4">
              🚲 保管場所 (仮): 緯度 {storageLocation.lat}, 経度{' '}
              {storageLocation.lng}
            </p>
            <p>💰 1hあたりの料金設定</p>
            <p>📅 貸出可能期間</p>
            <p>🔑 鍵タイプ</p>
            <p>🔘 ダイヤル式</p>
            <p>🔘 鍵式</p>
            <br />
            <div className="flex justify-center">
              <Button
                onClick={handleRegister}
                className="border p-4 rounded-md w-60 text-center"
              >
                登録
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

//ページ確認
// http://localhost:3000/rental/lend/register
