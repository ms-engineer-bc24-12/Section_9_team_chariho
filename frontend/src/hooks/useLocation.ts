//src/hooks/useLocation.ts
//現在地取得

import { useState } from 'react';

export function useLocation() {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  //　位置情報を取得する関数（手動更新用）
  const getLocation = () => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation API がサポートされていません');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError(null);
        console.log(
          '現在地:',
          position.coords.latitude,
          position.coords.longitude,
        );
      },
      (err) => {
        let errorMessage = '位置情報の取得に失敗しました';
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = '位置情報の取得が許可されていません';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = '位置情報を取得できませんでした';
            break;
          case err.TIMEOUT:
            errorMessage = '位置情報の取得に時間がかかりすぎました';
            break;
          default:
            errorMessage = `位置情報の取得に失敗しました（エラーコード: ${err.code}）`;
        }
        setError(errorMessage);
        console.error(
          `位置情報エラー (コード: ${err.code}) - ${errorMessage}`,
          err,
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  return { userLocation, error, getLocation };
}
