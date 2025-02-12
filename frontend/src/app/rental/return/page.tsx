//src/app/rental/return/page.tsx
//②-③　返すページ(画像アップロード)
//画像アップロード・決済

'use client';
import { useState, useEffect } from 'react';
//import EXIF from 'exif-js';

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
  const [gpsData, setGpsData] = useState<{ lat: number; lng: number } | null>(
    null,
  );
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

  // ファイル選択時の処理
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));

      // Exif情報の読み込み
      // const reader = new FileReader();
      // reader.onload = function (e) {
      //   if (e.target && e.target.result instanceof ArrayBuffer) {
      //     const exifData = EXIF.readFromBinaryFile(e.target.result);
      //     console.log('Exif情報:', exifData);

      //     if (exifData.GPSLatitude && exifData.GPSLongitude) {
      //       const lat = convertDMSToDD(
      //         exifData.GPSLatitude,
      //         exifData.GPSLatitudeRef,
      //       );
      //       const lng = convertDMSToDD(
      //         exifData.GPSLongitude,
      //         exifData.GPSLongitudeRef,
      //       );
      //       setGpsData({ lat, lng });

      // 位置比較を行う
      //           if (userLocation) {
      //             const withinReturnArea = isWithinReturnArea(userLocation, {
      //               lat,
      //               lng,
      //             });
      //             setIsReturnable(withinReturnArea);
      //           }
      //         } else {
      //           setGpsData(null);
      //           setIsReturnable(null);
      //         }
      //       }
      //     };
      //     reader.readAsArrayBuffer(file);
    }
  };

  // DMS（度・分・秒）を10進数（DD）に変換する関数
  const convertDMSToDD = (dms: number[], ref: string) => {
    const degrees = dms[0];
    const minutes = dms[1] / 60;
    const seconds = dms[2] / 3600;
    let dd = degrees + minutes + seconds;
    if (ref === 'S' || ref === 'W') {
      dd = -dd;
    }
    return dd;
  };

  // 位置が一致しているか判定する関数（ハーバーサインの公式を使用）
  const isWithinReturnArea = (
    gps1: { lat: number; lng: number },
    gps2: { lat: number; lng: number },
    threshold: number = 50, // しきい値（メートル）
  ) => {
    const R = 6371000; // 地球の半径（m）

    const lat1 = gps1.lat * (Math.PI / 180);
    const lat2 = gps2.lat * (Math.PI / 180);
    const deltaLat = (gps2.lat - gps1.lat) * (Math.PI / 180);
    const deltaLng = (gps2.lng - gps1.lng) * (Math.PI / 180);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // 距離（m）

    return distance <= threshold; // しきい値以内なら true
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold">返却ページ</h2>
      <h2 className="text-2xl font-bold">返却判定</h2>

      {/* 画像のGPS情報と現在地の表示 */}
      {userLocation && (
        <p className="mt-4 text-gray-700">
          📍 現在地: 緯度 {userLocation.lat}, 経度 {userLocation.lng}
        </p>
      )}
      {gpsData ? (
        <p className="mt-2 text-green-600">
          📍 画像のGPS情報: 緯度 {gpsData.lat}, 経度 {gpsData.lng}
        </p>
      ) : (
        <p className="mt-2 text-red-500">⚠️ 画像にGPS情報がありません</p>
      )}

      {/* エラーメッセージ（返却判定） */}
      {isReturnable !== null && (
        <p
          className={`mt-4 ${isReturnable ? 'text-green-600' : 'text-red-500'}`}
        >
          {isReturnable
            ? '✅ 返却可能な範囲内です！'
            : '❌ 返却場所が異なります！'}
        </p>
      )}

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
