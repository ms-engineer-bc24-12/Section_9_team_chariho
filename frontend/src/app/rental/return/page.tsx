//src/app/rental/return/page.tsx
//②-③　返すページ(画像アップロード)
//画像アップロード・決済
'use client';

import { useState, useEffect } from 'react';
import { useLocation } from '@/hooks/useLocation';
import GoogleMapComponent from '@/app/components/GoogleMap';
import Button from '@/app/components/Button';
import CameraUploader from '@/app/components/CameraUploader';

// 仮の保管場所
const storageLocation = { lat: 35.928339, lng: 139.5765827 }; //返却可能

// 返却可能な誤差範囲（±10m ≒ 0.00009度）
const LAT_LNG_THRESHOLD = 0.00009;

export default function ReturnPage() {
  const { userLocation, error, getLocation } = useLocation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isReturnable, setIsReturnable] = useState<boolean | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  const isPointInRectangle = (point: { lat: number; lng: number }) => {
    return (
      Math.abs(point.lat - storageLocation.lat) <= LAT_LNG_THRESHOLD &&
      Math.abs(point.lng - storageLocation.lng) <= LAT_LNG_THRESHOLD
    );
  };

  useEffect(() => {
    if (userLocation) {
      const isWithinRange = isPointInRectangle(userLocation);
      setIsReturnable(isWithinRange);
    }
  }, [userLocation]);

  const handleLocationUpdate = () => {
    setUpdateMessage('位置情報を更新しました！');
    getLocation();
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[140vh] pt-16">
      <div className="flex flex-col items-center flex-grow">
        <h2 className="text-4xl font-bold mt-6">🔔My Chari 返却</h2>
        <br />

        {error && <p className="text-red-500">{error}</p>}

        <div className="mt-4 flex flex-col items-center">
          <p className="text-sm text-gray-600 text-center">
            正しい位置に移動し、「現在地を更新」ボタンを押してください。
          </p>
          <br />
          <Button onClick={handleLocationUpdate}>現在地を更新</Button>
          {updateMessage && (
            <p className="mt-2 text-sm text-green-600">{updateMessage}</p>
          )}
        </div>

        {/* 返却判定メッセージ */}
        {isReturnable !== null && (
          <p
            className={`mt-4 text-lg font-semibold ${isReturnable ? 'text-green-600' : 'text-red-600'}`}
          >
            {isReturnable ? '✅ 返却できます' : '❌ 返却場所が違います'}
          </p>
        )}

        {/* Googleマップエリア */}
        <div className="relative mt-6 w-full flex justify-center">
          <div className="w-4/5 h-[300px] rounded-lg border overflow-hidden z-0">
            <GoogleMapComponent
              center={storageLocation}
              zoom={15}
              markers={[
                { id: 1, position: storageLocation },
                ...(userLocation ? [{ id: 2, position: userLocation }] : []),
              ]}
            />
          </div>
        </div>

        {/* 画像アップロードコンポーネント */}
        <div className="mt-6">
          <CameraUploader
            onPhotoSelect={(file) => {
              setSelectedFile(file);
              setIsUploaded(true);
            }}
          />
        </div>

        {/* 返却ボタン */}
        {isReturnable && selectedFile && isUploaded && (
          <div className="mt-6">
            <Button>返却する</Button>
          </div>
        )}
      </div>
    </div>
  );
}

//ページ確認
// http://localhost:3000/rental/return
