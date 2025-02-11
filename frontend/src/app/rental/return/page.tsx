//src/app/rental/return/page.tsx
//②-③　返すページ(画像アップロード)
//画像アップロード・決済

'use client';
import { useState, useEffect } from 'react';

export default function ReturnPage() {
  // ユーザーの現在地（緯度・経度）
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  // エラーメッセージ
  const [error, setError] = useState<string | null>(null);
  // 画像アップロード用の state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  // 位置情報を取得する処理
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

  // ファイル選択時の処理
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file)); // プレビュー用URLを作成
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-2xl font-bold">返却</p>

        {/* Googleマップ（後で地図を表示する） */}
        <div className="mt-6">
          <p className="border p-4 rounded-md w-60 text-center">
            🗺️ Googleマップ
          </p>
        </div>

        <p className="text-lg font-semibold mt-6">
          自転車の現在地と返却場所を表示
        </p>

        {/* 現在地を表示 */}
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

        {/* 画像アップロードエリア */}
        <div className="mt-6 flex flex-col items-center">
          <p className="text-lg font-semibold">返却時の画像をアップロード</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 border p-2 rounded-md"
          />
          {/* 画像プレビュー */}
          {previewURL && (
            <img
              src={previewURL}
              alt="アップロード画像"
              className="mt-4 w-60 h-auto rounded-md border"
            />
          )}
        </div>

        {/* 返却ボタン */}
        <div className="mt-6">
          <p className="border p-4 rounded-md w-60 text-center">返却する</p>
        </div>
      </div>

      {/* フッター */}
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
