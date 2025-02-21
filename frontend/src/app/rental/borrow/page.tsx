//src/app/rental/borrow/page.tsx
//②-①　借りるページ(Googleマップ/予約)
'use client';
import { useState, useEffect } from 'react';
import GoogleMapComponent from '../../components/GoogleMap';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@/app/components/Button';

type Bike = {
  id: number;
  name: string;
  price: number;
  rentalPeriod: string;
  lockType: string;
  location: { lat: number; lng: number };
  photo?: string;
};

export default function BorrowPage() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // ローカルストレージから貸出可能な自転車リストを取得
  useEffect(() => {
    const storedBikes = JSON.parse(localStorage.getItem('bikes') || '[]');
    setBikes(storedBikes);
  }, []);

  // Googleマップのマーカークリック時に自転車を選択
  const handleMarkerClick = (bike: Bike) => {
    setSelectedBike(bike);
    setIsSelected(false);
  };

  // チェックボックスの変更を処理
  const handleCheckboxChange = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div className="flex flex-col items-center justify-between  min-h-[170vh] pt-16 pb-20">
      <div className="flex flex-col items-center flex-grow">
        <p className="text-4xl font-bold mt-6">🔎My Chari 予約</p>
        <br />
        <p className="mt-4">予約したいMy Chariを選ぼう！</p>

        {/* Googleマップを表示 */}
        <div className="mt-6 w-80 h-60 border flex items-center justify-center">
          <GoogleMapComponent bikes={bikes} onMarkerClick={handleMarkerClick} />
        </div>
        <br />

        {/* 自転車選択前のメッセージ */}
        {!selectedBike && <p className="mt-4">自転車を選択してください</p>}

        {/* 自転車選択後の詳細表示 */}
        {selectedBike && (
          <div className="flex flex-col mt-2 items-center">
            <p className="text-21xl text-center">この自転車を予約しますか？</p>
            <div className="p-4 border rounded-lg shadow-md mt-2 w-80 bg-white flex flex-col items-center">
              {/* 📸 画像表示 */}
              {selectedBike.photo && (
                <Image
                  src={selectedBike.photo}
                  alt="選択された自転車"
                  width={300}
                  height={200}
                  quality={50}
                  className="w-full h-auto object-contain rounded-md mb-4"
                />
              )}

              {/* 🚲 自転車情報 */}
              <p className="font-bold">🚲 {selectedBike.name}</p>
              <p className="mt-2">💰 {selectedBike.price}円/時間</p>

              {/* 📅 貸出期間 (修正部分) */}
              <div className="mt-2 w-full text-center">
                <p>📅 貸出期間</p>
                <p className="bg-yellow-100 px-4 py-1 rounded-md shadow-md inline-block">
                  {selectedBike.rentalPeriod}
                </p>
              </div>

              {/* 🔑 鍵タイプ */}
              <p className="mt-2">
                🔑 <span>鍵タイプ:</span> {selectedBike.lockType}
              </p>

              {/* ✅ チェックボックス */}
              <label className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  id={`bike-${selectedBike.id}`}
                  checked={isSelected}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-4">この自転車を選択する</span>
              </label>
            </div>
          </div>
        )}
        <br />
        {selectedBike && isSelected && (
          <div>
            <div className="p-4 max-w-lg w-md border rounded-lg shadow-md bg-white">
              <p className="text-lg font-semibold text-center">日時を指定</p>
              <div className="flex flex-col text-center gap-4 mt-4">
                <div>
                  <label className="block text-center">予約開始日時</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    dateFormat="yyyy/MM/dd HH:mm"
                    className="w-full border p-2 rounded-md mt-1 text-black"
                  />
                </div>

                <div>
                  <label className="block text-center">予約終了日時</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    dateFormat="yyyy/MM/dd HH:mm"
                    className="w-full border p-2 rounded-md mt-1 text-black"
                  />
                </div>
              </div>
            </div>
            {/* 決済へ進むボタン（日時未入力時は無効化） */}
            <div className="mt-6 flex justify-center">
              <Button
                className={`px-4 py-2 rounded-md ${
                  !startDate || !endDate ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                決済へ進む
              </Button>
            </div>
          </div>
        )}
      </div>
      <br />
    </div>
  );
}
