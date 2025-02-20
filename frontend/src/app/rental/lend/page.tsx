//src/app/rental/lend/page.tsx
//②-②　貸すページ(登録ボタン/自転車情報一覧)
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/app/components/Button';

export default function LendPage() {
  const [bikes, setBikes] = useState<
    { id: number; name: string; price: string; photo?: string }[]
  >([]);

  // ローカルストレージから自転車一覧(撮影した画像も含む)を取得
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
    <div className="flex flex-col items-center justify-between min-h-[140vh] pb-24">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-4xl font-bold">🤝My Chari</p>
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
          <div className="grid grid-cols-1 gap-6 mt-4 w-full max-w-md">
            {bikes.map((bike) => (
              <div
                key={bike.id}
                className="flex flex-col items-center border p-6 rounded-lg shadow-md bg-white"
              >
                {/* 画像表示 */}
                {bike.photo && (
                  <Image
                    src={bike.photo}
                    alt="撮影画像"
                    width={300}
                    height={200}
                    quality={50} // 画質を 50% に圧縮
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}

                {/* 自転車情報 */}
                <p className="text-lg font-semibold text-center text-gray-800">
                  {bike.name} <br />
                  <span className="text-orange-500 font-bold">
                    価格：{bike.price}円
                  </span>
                </p>

                {/* 削除ボタン */}
                <button
                  onClick={() => handleDelete(bike.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-4"
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
