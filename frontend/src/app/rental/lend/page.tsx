//src/app/rental/lend/page.tsx
//②-②　貸すページ(登録ボタン/自転車情報一覧)
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/app/components/Button';

export default function LendPage() {
  const [bikes, setBikes] = useState<
    {
      id: number;
      bikename: string;
      image_url?: string;
      rental_price_per_hour: number;
    }[]
  >([]);

  // 自転車一覧を取得
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch('http://localhost:8000/bicycles/', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error(`HTTPエラー: ${response.status}`);
        }
        const data = await response.json();

        if (data.length === 0) {
          console.log('登録自転車は0件です');
        } else {
          console.log(`登録自転車一覧取得成功: ${data.length}件`, data);
        }

        setBikes(data);
      } catch (error) {
        console.error('自転車の取得に失敗しました:', error);
        alert(
          '自転車の読み込みに失敗しました。時間をおいて再度お試しください。',
        );
      }
    };
    fetchBikes();
  }, []);

  //削除処理
  const handleDelete = async (id: number) => {
    if (!confirm(`自転車ID ${id} を削除しますか？`)) return;
    try {
      const response = await fetch(`http://localhost:8000/bicycles/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`削除失敗: ${response.status}`);
      }
      console.log(`自転車ID ${id} 削除成功`);
      setBikes((prevBikes) => prevBikes.filter((bike) => bike.id !== id));
    } catch (error) {
      console.error('削除に失敗しました:', error);
      alert('削除に失敗しました。時間をおいて再度お試しください。');
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
                {bike.image_url && (
                  <Image
                    src={bike.image_url}
                    alt="自転車登録画像"
                    width={300}
                    height={200}
                    quality={50} // 画質を 50% に圧縮
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}

                {/* 自転車情報 */}
                <p>
                  {bike.bikename} <br />
                  <span>{bike.rental_price_per_hour}円/時間</span>
                </p>
                {/* 削除ボタン */}
                <button
                  onClick={() => handleDelete(bike.id)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
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
