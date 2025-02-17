//src/hooks/useLocation.ts
//現在地取得
import { useState, useEffect } from 'react';

export function useLocation() {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      // 位置情報の使用許可を確認
      const isConfirmed =
        window.confirm('位置情報を使用してもよろしいですか？');

      if (isConfirmed) {
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
        setError('位置情報の取得がキャンセルされました');
      }
    } else {
      setError('Geolocation API がサポートされていません');
    }
  }, []);

  return { userLocation, error };
}
