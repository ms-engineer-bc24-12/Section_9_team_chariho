//src/app/rental/return/page.tsx
//②-③　返すページ(画像アップロード)
//画像アップロード・決済

'use client';

import { useState, useEffect } from 'react';
import { useLocation } from '@/hooks/useLocation';
import Map from '@/app/components/Map';
import dynamic from 'next/dynamic';
import Button from '@/app/components/Button';
//import ImageUploader from '@/app/components/ImageUploader';

const ImageUploader = dynamic(() => import('@/app/components/ImageUploader'), {
  ssr: false,
});

// 仮の保管場所 (Googleマップに表示)
//const storageLocation = { lat: 35.9285, lng: 139.57658 }; //返却不可
const storageLocation = { lat: 35.928339, lng: 139.5765827 }; //返却可能

// 返却可能な誤差範囲（±10m ≒ 0.00009度）
const LAT_LNG_THRESHOLD = 0.00009;

export default function ReturnPage() {
  const { userLocation, error } = useLocation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isReturnable, setIsReturnable] = useState<boolean | null>(null); // 返却判定

  // 位置情報が返却範囲内にあるか判定する関数
  const isPointInRectangle = (point: { lat: number; lng: number }) => {
    return (
      Math.abs(point.lat - storageLocation.lat) <= LAT_LNG_THRESHOLD &&
      Math.abs(point.lng - storageLocation.lng) <= LAT_LNG_THRESHOLD
    );
  };

  // 返却可能か判定
  useEffect(() => {
    if (userLocation) {
      const isWithinRange = isPointInRectangle(userLocation);
      console.log(isWithinRange ? '✅ 返却可能' : '❌ 返却不可');
      setIsReturnable(isWithinRange);
    }
  }, [userLocation]);

  return (
    <div className="min-h-[140vh] overflow-auto flex flex-col items-center">
      <h2 className="text-2xl font-bold">返却ページ</h2>

      {/* エラーがあれば表示 */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 返却判定メッセージ */}
      {isReturnable !== null && (
        <p
          className={`mt-2 text-lg font-semibold ${isReturnable ? 'text-green-600' : 'text-red-600'}`}
        >
          {isReturnable ? '✅ 返却できます' : '❌ 返却場所が違います'}
        </p>
      )}

      {/* 位置情報が取得できている場合に表示 */}
      {userLocation ? (
        <div>
          <p>
            <strong>現在地📍:</strong> 緯度 {userLocation.lat}, 経度{' '}
            {userLocation.lng}
          </p>
          <p>
            <strong>保管場所🚲:</strong> 緯度 {storageLocation.lat}, 経度{' '}
            {storageLocation.lng}
          </p>
        </div>
      ) : (
        <p>現在地を取得中...</p>
      )}

      {/* Googleマップエリア */}
      <div className="mt-4 w-full flex justify-center">
        <div className="w-4/5 h-[300px] rounded-lg border overflow-hidden">
          <Map
            center={storageLocation}
            markers={[
              { id: 1, position: storageLocation, label: '🚲' }, // 保管場所
              userLocation
                ? { id: 2, position: userLocation, label: '📍' } // ユーザー現在地
                : null,
            ].filter((marker) => marker !== null)}
          />
        </div>
      </div>

      {/* 画像アップロードコンポーネント */}
      <ImageUploader onFileSelect={setSelectedFile} />

      {/* 返却ボタン(返却可能なときだけ表示） */}
      {isReturnable && selectedFile && (
        <div className="mt-6">
          <Button>返却する</Button>
        </div>
      )}
    </div>
  );
}

//ページ確認
// http://localhost:3000/rental/return
