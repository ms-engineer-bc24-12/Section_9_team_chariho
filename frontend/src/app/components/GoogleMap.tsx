// components/GoogleMap.tsx
'use client';

import { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

type Bike = {
  id: number;
  name: string;
  price: number;
  rentalPeriod: string;
  lockType: string;
  location: { lat: number; lng: number };
};

type GoogleMapProps = {
  bikes: Bike[]; // 🚀 bikes を props で受け取る
  onMarkerClick: (bike: Bike) => void;
};

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 35.6895, // 東京の緯度
  lng: 139.6917, // 東京の経度
};

const GoogleMapComponent: React.FC<GoogleMapProps> = ({
  bikes,
  onMarkerClick,
}) => {
  const [bikeIcon, setBikeIcon] = useState<google.maps.Icon | null>(null);

  // Google Map のロード完了後にアイコンをセット
  const handleMapLoad = (map: google.maps.Map) => {
    if (!map) return;
    setBikeIcon({
      url: 'https://maps.gstatic.com/mapfiles/ms2/micons/cycling.png',
      scaledSize: new google.maps.Size(40, 40),
      anchor: new google.maps.Point(20, 20),
    });
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={handleMapLoad}
      >
        {bikes.map((bike) => (
          <Marker
            key={bike.id}
            position={bike.location}
            icon={bikeIcon ?? undefined}
            onClick={() => onMarkerClick(bike)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
