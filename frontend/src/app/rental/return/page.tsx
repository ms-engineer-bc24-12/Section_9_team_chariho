//src/app/rental/return/page.tsx
//②-③　返すページ(画像アップロード)
//画像アップロード・決済

'use client';

import { useState } from 'react';
import { useLocation } from '@/hooks/useLocation';
import ImageUploader from '@/app/components/ImageUploader';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// 仮の保管場所 (Googleマップに表示)
const storageLocation = { lat: 35.9285, lng: 139.57658 }; // 保管場所と現在地が不一致

export default function ReturnPage() {
  // 画像アップロード用の state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isReturnable, setIsReturnable] = useState<boolean | null>(null); // 返却判定
  const { userLocation, error } = useLocation();

  return (
    <div className="min-h-[140vh] overflow-auto flex flex-col items-center">
      <h2 className="text-2xl font-bold">返却ページ</h2>

      {/* エラーがあれば表示 */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 位置情報が取得できている場合に表示 */}
      {userLocation ? (
        <div>
          <p>
            <strong>現在地:</strong> 緯度 {userLocation.lat}, 経度{' '}
            {userLocation.lng}
          </p>
          <p>
            <strong>保管場所:</strong> 緯度 {storageLocation.lat}, 経度{' '}
            {storageLocation.lng}
          </p>
        </div>
      ) : (
        <p>現在地を取得中...</p>
      )}

      {/* 📌 Googleマップエリア */}
      <div className="mt-4 w-full flex justify-center">
        <div className="w-4/5 h-[300px] rounded-lg border overflow-hidden">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
          >
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={storageLocation}
              zoom={15}
            >
              {/* 貸出自転車　保管場所 */}
              <Marker position={storageLocation} label="🚲" />

              {/* ユーザーの現在地（現在地が取得できた場合に表示） */}
              {userLocation && <Marker position={userLocation} label="📍" />}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      {/* 📌 画像アップロードコンポーネント */}
      <ImageUploader onFileSelect={setSelectedFile} />

      {/* 返却ボタン */}
      <button className="mt-6 px-4 py-2 rounded-md bg-blue-500 text-white">
        返却する
      </button>
    </div>
  );
}

//ページ確認
// http://localhost:3000/rental/return
