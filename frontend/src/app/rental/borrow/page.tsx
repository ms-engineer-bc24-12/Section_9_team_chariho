//src/app/rental/borrow/page.tsx
//②-①　借りるページ(Googleマップ/予約)
'use client';

import { useState } from 'react';
import GoogleMapComponent from '../../components/GoogleMap';
import Link from 'next/link';

export default function BorrowPage() {
  const [selectedBike, setSelectedBike] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isSelected, setIsSelected] = useState(false); // チェックボックスの状態を管理

  // マーカークリック時に自転車の情報をセット
  const handleMarkerClick = (bike: { id: number; name: string }) => {
    setSelectedBike(bike);
    setIsSelected(false); // 自転車がクリックされるたびにチェックボックスをリセット
  };

  // チェックボックスの変更を処理
  const handleCheckboxChange = () => {
    setIsSelected(!isSelected); // チェックボックスの状態を反転
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-2xl font-bold">借りる</p>

        <div className="mt-6 w-80 h-60 border flex items-center justify-center">
          <GoogleMapComponent onMarkerClick={handleMarkerClick} />
        </div>

        {/* 🛠 自転車選択前の表示 */}
        {!selectedBike && <p className="mt-4">自転車を選択してください</p>}

        {/* 🛠 自転車選択後に一覧を表示 */}
        {selectedBike && (
          <div className="flex flex-col mt-2 items-center">
            <p className="text-lg font-semibold text-center">自転車一覧</p>
            <div className="p-2 border rounded-md mt-2">
              <p>選択された自転車: {selectedBike.name}</p>
              <p>ID: {selectedBike.id}</p>
              <input
                type="checkbox"
                id={`bike-${selectedBike.id}`}
                checked={isSelected} // チェックボックスの状態を反映
                onChange={handleCheckboxChange} // チェックボックスをクリックした時に状態を更新
              />
              <label htmlFor={`bike-${selectedBike.id}`}>選択</label>
            </div>
          </div>
        )}

        {/* 予約ページに遷移するリンク */}
        {selectedBike && isSelected && (
          <Link
            href={{
              pathname: '/rental/borrow/reserve',
              query: {
                bikeId: selectedBike.id.toString(),
                bikeName: selectedBike.name,
              },
            }}
          >
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md">
              予約する
            </button>
          </Link>
        )}
      </div>

      <div className="w-full">
        <div className="flex justify-around bg-gray-100 p-4">
          <p>🏠 ホーム</p>
          <p>👤 マイページ</p>
        </div>
      </div>
    </div>
  );
}

//ページ確認
//http://localhost:3000/rental/borrow
