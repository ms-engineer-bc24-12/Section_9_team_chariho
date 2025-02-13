// components/GoogleMap.tsx
'use client';

import { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 35.6895, // 東京の緯度
  lng: 139.6917, // 東京の経度
};

// 仮の自転車データ（テスト用）
const bikeData = [
  { id: 1, name: 'クロスバイク', location: { lat: 35.6895, lng: 139.6917 } },
  { id: 2, name: 'ロードバイク', location: { lat: 35.69, lng: 139.692 } },
];

const GoogleMapComponent = ({
  onMarkerClick,
}: {
  onMarkerClick: (bike: { id: number; name: string }) => void;
}) => {
  const [bikeIcon, setBikeIcon] = useState<google.maps.Icon | null>(null);

  // Google Map のロード完了後にアイコンをセット
  const handleMapLoad = (map: google.maps.Map) => {
    if (!map) return;
    setBikeIcon({
      url: 'https://maps.gstatic.com/mapfiles/ms2/micons/cycling.png', // 公式自転車アイコン
      scaledSize: new google.maps.Size(40, 40), // アイコンのサイズ
      anchor: new google.maps.Point(20, 20), // アイコンの位置調整
    });
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={handleMapLoad} // マップがロードされたら実行
      >
        {bikeData.map((bike) => (
          <Marker
            key={bike.id}
            position={bike.location}
            icon={bikeIcon ?? undefined} // アイコンが設定されるまで undefined
            onClick={() => onMarkerClick(bike)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
