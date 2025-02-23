// src/app/components/GoogleMap.tsx
'use client';

import { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

type Location = { lat: number; lng: number };

type Bike = {
  id: number;
  name: string;
  price: number;
  rentalPeriod: string;
  lockType: string;
  location: Location;
};

type MarkerData = {
  id: number;
  position: Location;
};

type GoogleMapProps = {
  center?: Location; // 任意の中心座標
  zoom?: number; // ズームレベル
  bikes?: Bike[]; // 自転車マーカー
  markers?: MarkerData[]; // 汎用マーカー
  onMarkerClick?: (bike: Bike) => void; // クリック時の処理
};

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = { lat: 34.6947584, lng: 135.528448 }; // 東京の緯度経度

const GoogleMapComponent: React.FC<GoogleMapProps> = ({
  center = defaultCenter,
  zoom = 12,
  bikes = [],
  markers = [],
  onMarkerClick,
}) => {
  const [bikeIcon, setBikeIcon] = useState<google.maps.Icon | null>(null);
  const [personIcon, setPersonIcon] = useState<google.maps.Icon | null>(null);

  // Google Map ロード時にアイコンを設定
  const handleMapLoad = (map: google.maps.Map) => {
    if (!map) return;

    setBikeIcon({
      url: 'https://maps.gstatic.com/mapfiles/ms2/micons/cycling.png',
      scaledSize: new google.maps.Size(40, 40),
      anchor: new google.maps.Point(20, 20),
    });

    setPersonIcon({
      url: 'https://maps.gstatic.com/mapfiles/ms2/micons/man.png', // 人型アイコン
      scaledSize: new google.maps.Size(40, 40),
      anchor: new google.maps.Point(20, 20),
    });
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={handleMapLoad}
      >
        {bikes.map((bike) => (
          <Marker
            key={bike.id}
            position={bike.location}
            icon={bikeIcon ?? undefined} // 自転車アイコン
            onClick={() => onMarkerClick?.(bike)}
          />
        ))}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={
              marker.position === center
                ? (personIcon ?? undefined)
                : (bikeIcon ?? undefined)
            } // 現在地のアイコンを人型に
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
