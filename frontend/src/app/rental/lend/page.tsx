//src/app/rental/lend/page.tsx
//②-②　貸すページ(登録ボタン/自転車情報一覧)

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/app/components/Button';

export default function LendPage() {
  const [bikes, setBikes] = useState<
    { id: number; name: string; price: string }[]
  >([]);

  // ローカルストレージから自転車一覧を取得
  useEffect(() => {
    const storedBikes = JSON.parse(localStorage.getItem('bikes') || '[]');
    setBikes(storedBikes);
  }, []);

  // 削除処理
  const handleDelete = (id: number) => {
    if (window.confirm('この自転車を削除しますか？')) {
      const updatedBikes = bikes.filter((bike) => bike.id !== id);
      setBikes(updatedBikes);
      localStorage.setItem('bikes', JSON.stringify(updatedBikes));
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-4xl font-bold">🤝My Chari</p>
        <br />
        <br />
        <div className="mt-6">
          <Link href="/rental/lend/register">
            <Button className="border p-4 rounded-md w-60 text-center">
              自転車を登録する
            </Button>
          </Link>
        </div>
        <br />
        <p className="text-3xl font-semibold mt-6">🚲My Chari 一覧</p>

        {bikes.length === 0 ? (
          <p className="text-gray-500 mt-4">登録された自転車はありません</p>
        ) : (
          <div className="flex flex-col gap-2 mt-4">
            {bikes.map((bike) => (
              <div
                key={bike.id}
                className="flex items-center justify-between border p-4 rounded-md w-80"
              >
                <span>
                  {bike.name} (価格：{bike.price}円)
                </span>
                <button
                  onClick={() => handleDelete(bike.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  削除
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

//ページ確認
// http://localhost:3000/rental/lend
