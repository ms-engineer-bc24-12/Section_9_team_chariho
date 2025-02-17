//src/app/components/Map.tsx
//中心座標 (center) や マーカー (markers) を props で渡せるようにするる

'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

interface MapProps {
  center: { lat: number; lng: number }; // 地図の中心
  markers: {
    id: number;
    position: { lat: number; lng: number };
    label?: string;
  }[]; // マーカーリスト
}

export default function Map({ center, markers }: MapProps) {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            label={marker.label}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
