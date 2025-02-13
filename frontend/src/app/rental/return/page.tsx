//src/app/rental/return/page.tsx
//②-③　返すページ(画像アップロード)
//画像アップロード・決済

'use client';
import { useState, useEffect } from 'react';
import heic2any from 'heic2any';

export default function ReturnPage() {
  // ユーザーの現在地
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 画像アップロード用の state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [isReturnable, setIsReturnable] = useState<boolean | null>(null); // 返却判定

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

  // 📌 HEIC画像の変換を追加
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];

    let processedFile = file;

    // 📷 HEICなら JPG/PNG に変換
    if (
      file.type === 'image/heic' ||
      file.name.toLowerCase().endsWith('.heic')
    ) {
      try {
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.8, // 画質 80%
        });

        if (Array.isArray(convertedBlob)) {
          processedFile = new File(
            [convertedBlob[0]],
            file.name.replace(/\.heic$/i, '.jpg'),
            { type: 'image/jpeg' },
          );
        } else if (convertedBlob instanceof Blob) {
          processedFile = new File(
            [convertedBlob],
            file.name.replace(/\.heic$/i, '.jpg'),
            { type: 'image/jpeg' },
          );
        }
      } catch (error) {
        console.error('HEIC変換エラー:', error);
        return;
      }
    }

    setSelectedFile(processedFile);
    setPreviewURL(URL.createObjectURL(processedFile));
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold">返却ページ</h2>
      <h2 className="text-2xl font-bold">返却判定</h2>

      {/* 現在地の表示 */}
      {userLocation && (
        <p className="mt-4 text-gray-700">
          📍 現在地: 緯度 {userLocation.lat}, 経度 {userLocation.lng}
        </p>
      )}

      {/* 画像アップロードエリア */}
      <div className="mt-6 flex flex-col items-center">
        <p className="text-lg font-semibold">返却時の画像をアップロード</p>
        <input
          type="file"
          accept=".heic, .jpg, .jpeg, .png"
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

      {/* 返却ボタン（有効/無効） */}
      <button
        className={`mt-6 px-4 py-2 rounded-md ${
          isReturnable
            ? 'bg-green-500 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        disabled={!isReturnable}
      >
        返却する
      </button>
    </div>
  );
}

//ページ確認
// http://localhost:3000/rental/return
