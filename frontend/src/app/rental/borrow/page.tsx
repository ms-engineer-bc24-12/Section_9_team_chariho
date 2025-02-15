//src/app/rental/borrow/page.tsx
//②-①　借りるページ(Googleマップ/予約)
'use client';
import { useState, useEffect } from 'react';
import GoogleMapComponent from '../../components/GoogleMap';
import Link from 'next/link';
import Button from '@/app/components/Button';

type Bike = {
  id: number;
  name: string;
  price: number;
  rentalPeriod: string;
  lockType: string;
  location: { lat: number; lng: number };
};

export default function BorrowPage() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [isSelected, setIsSelected] = useState(false);

  // 🚲 ローカルストレージから貸出可能な自転車リストを取得
  useEffect(() => {
    const storedBikes = JSON.parse(localStorage.getItem('bikes') || '[]');
    setBikes(storedBikes);
  }, []);

  // 🏷 Googleマップのマーカークリック時に自転車を選択
  const handleMarkerClick = (bike: Bike) => {
    setSelectedBike(bike);
    setIsSelected(false); // チェックボックスをリセット
  };

  // ✅ チェックボックスの変更を処理
  const handleCheckboxChange = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-5xl font-bold">🔎My Chari 予約</p>

        {/* 📍 Googleマップを表示 */}
        <div className="mt-6 w-80 h-60 border flex items-center justify-center">
          <GoogleMapComponent bikes={bikes} onMarkerClick={handleMarkerClick} />
        </div>

        <p className="mt-4">予約したいMy Chariを選ぼう！</p>

        {/* 🚲 自転車選択前のメッセージ */}
        {!selectedBike && <p className="mt-4">自転車を選択してください</p>}

        {/* 🚲 自転車選択後の詳細表示 */}
        {selectedBike && (
          <div className="flex flex-col mt-2 items-center">
            <p className="text-lg font-semibold text-center">自転車情報</p>
            <div className="p-4 border rounded-md mt-2 w-80">
              <p>🚲 名前: {selectedBike.name}</p>
              <p>💰 料金: {selectedBike.price}円/時間</p>
              <p>📅 期間: {selectedBike.rentalPeriod}</p>
              <p>🔑 鍵タイプ: {selectedBike.lockType}</p>
              <input
                type="checkbox"
                id={`bike-${selectedBike.id}`}
                checked={isSelected}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={`bike-${selectedBike.id}`} className="ml-2">
                選択
              </label>
            </div>
          </div>
        )}

        {/* 予約ページへ遷移 */}
        {selectedBike && isSelected && (
          <Link
            href={{
              pathname: '/rental/borrow/reserve',
              query: {
                bikeId: selectedBike.id.toString(),
                bikeName: selectedBike.name,
                price: selectedBike.price.toString(),
                rentalPeriod: selectedBike.rentalPeriod,
                lockType: selectedBike.lockType,
              },
            }}
          >
            <Button>予約する</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

//ページ確認
//http://localhost:3000/rental/borrow
