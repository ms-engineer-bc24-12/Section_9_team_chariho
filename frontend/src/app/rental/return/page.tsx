//src/app/rental/return/page.tsx
//②-③　返すページ(画像アップロード)
//画像アップロード・決済

'use client';
import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import heic2any from 'heic2any';

//仮の保管場所 (Googleマップに表示)
//const storageLocation = { lat: 35.9283422, lng: 139.5765821 };現在地
const storageLocation = { lat: 35.9285, lng: 139.57658 }; //保管場所と現在地が不一致
//const storageLocation = { lat: 35.92838, lng: 139.57658 };//保管場所と現在地が閾値内

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

          console.log('現在地:', position); //現在地の緯度経度をコンソールに表示
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
            {
              type: 'image/jpeg',
            },
          );
        } else if (convertedBlob instanceof Blob) {
          processedFile = new File(
            [convertedBlob],
            file.name.replace(/\.heic$/i, '.jpg'),
            {
              type: 'image/jpeg',
            },
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
    <div className="min-h-[120vh] overflow-auto flex flex-col items-center">
      <h2 className="text-2xl font-bold">返却ページ</h2>

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
            className="mt-4 w-40 h-auto rounded-md border"
          />
        )}
      </div>

      {/* 返却ボタン */}
      <button className="mt-6 px-4 py-2 rounded-md bg-blue-500 text-white">
        返却する
      </button>
    </div>
  );
}

//ページ確認
// http://localhost:3000/rental/return
