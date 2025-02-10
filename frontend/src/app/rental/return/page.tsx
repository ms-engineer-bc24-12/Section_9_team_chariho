//src/app/rental/return/page.tsx
//②-③　返すページ(画像アップロード)
//画像アップロード・決済

'use client';
import { useState, useEffect } from 'react';

export default function ReturnPage() {
  // 📍 ユーザーの現在地（緯度・経度）
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  // ⚠️ エラーメッセージ
  const [error, setError] = useState<string | null>(null);

  // 🌍 位置情報を取得する処理
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError('位置情報の取得に失敗しました');
          console.error('位置情報エラー:', error);
        },
      );
    } else {
      setError('Geolocation API がサポートされていません');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-2xl font-bold">
          ヘッダーの右上にアカウント設定を追加
        </p>
        <p className="text-2xl font-bold">返却</p>

        {/* 🗺️ Googleマップ（後で地図を表示する） */}
        <div className="mt-6">
          <p className="border p-4 rounded-md w-60 text-center">
            🗺️ Googleマップ
          </p>
        </div>

        <p className="text-lg font-semibold mt-6">
          自転車の現在地と返却場所を表示
        </p>

        {/* 📍 現在地を表示（ここに追加） */}
        <div className="mt-6">
          {userLocation ? (
            <p className="border p-4 rounded-md w-60 text-center">
              📍 緯度: {userLocation.lat}, 経度: {userLocation.lng}
            </p>
          ) : error ? (
            <p className="border p-4 rounded-md w-60 text-center text-red-500">
              ⚠️ {error}
            </p>
          ) : (
            <p className="border p-4 rounded-md w-60 text-center">
              📡 位置情報を取得中...
            </p>
          )}
        </div>

        {/* 🚲 位置が一致したら返却ボタンが出てくる */}
        <div className="mt-6">
          <p className="border p-4 rounded-md w-60 text-center">
            位置が一致したら返却ボタンが出てくる
          </p>
        </div>

        {/* 🔄 現在地更新ボタン */}
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          🔄 現在地を更新
        </button>

        {/* 返却するボタン */}
        <div className="mt-6">
          <p className="border p-4 rounded-md w-60 text-center">返却する</p>
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-around bg-gray-100 p-4">
          <p>🏠 ホーム</p>
          <p>👤 マイページ</p>
        </div>
      </div>
    </div>
  );
}

//ページ確認
// http://localhost:3000/rental/return
