// src/app/rental/borrow/page.tsx
// ②-①　借りるページ(Googleマップ/予約)
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

  useEffect(() => {
    const storedBikes = JSON.parse(localStorage.getItem('bikes') || '[]');
    setBikes(storedBikes);
  }, []);

  const handleMarkerClick = (bike: Bike) => {
    setSelectedBike(bike);
    setIsSelected(false);
  };

  const handleCheckboxChange = () => {
    setIsSelected(!isSelected);
  };

  const handleCheckout = async () => {
    if (!selectedBike) {
      alert('自転車が選択されていません。');
      return;
    }
    if (!startDate || !endDate) {
      alert('予約開始日時と終了日時を指定してください。');
      return;
    }

    // 現在時刻より過去の日付が指定された場合はエラー
    const now = new Date();
    if (startDate < now || endDate < now) {
      alert('過去の日時を指定することはできません');
      return;
    }

    // 終了日時が開始日時より後かどうかチェック
    const diffMs = endDate.getTime() - startDate.getTime();
    if (diffMs <= 0) {
      alert('予約終了日時は開始日時より後にしてください');
      return;
    }

    // 予約時間を計算（小数点以下は切り上げ）
    const hours = Math.ceil(diffMs / (1000 * 60 * 60));
    // 例えば、1時間あたり100円として合計金額を計算
    const unitPrice = 100;
    const totalAmount = unitPrice * hours;

    try {
      const response = await fetch(
        'http://localhost:8000/create-checkout-session/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: 4,
            // bicycle_id は送信しない
            hours: hours,
            amount: totalAmount,
            reservation_start: startDate.toISOString(),
            reservation_end: endDate.toISOString(),
          }),
        },
      );

      const data = await response.json();
      console.log('✅ 決済レスポンス:', data);

      if (!response.ok) {
        alert(`決済セッションの作成に失敗しました。\nエラー: ${data.detail}`);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('決済ページのURLが取得できませんでした。');
      }
    } catch {
      alert(
        'ネットワークエラーが発生しました。サーバーが動作しているか確認してください。',
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[170vh] pt-16 pb-20">
      <div className="flex flex-col items-center flex-grow">
        <p className="text-4xl font-bold mt-6">🔎My Chari 予約</p>
        <p className="mt-4">予約したいMy Chariを選ぼう！</p>

        <div className="mt-6 w-80 h-60 border flex items-center justify-center">
          <GoogleMapComponent bikes={bikes} onMarkerClick={handleMarkerClick} />
        </div>

        {!selectedBike && <p className="mt-4">自転車を選択してください</p>}

        {selectedBike && (
          <div className="flex flex-col mt-2 items-center">
            <p className="text-21xl text-center">この自転車を予約しますか？</p>
            <div className="p-4 border rounded-lg shadow-md mt-2 w-80 bg-white flex flex-col items-center">
              {selectedBike.photo && (
                <Image
                  src={selectedBike.photo}
                  alt="選択された自転車"
                  width={300}
                  height={200}
                  quality={50}
                />
              )}
              <p className="font-bold">🚲 {selectedBike.name}</p>
              <p className="mt-2">💰 {selectedBike.price}円/時間</p>
              <p className="mt-2">🔑 鍵タイプ: {selectedBike.lockType}</p>
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
                    onChange={setStartDate}
                    showTimeSelect
                    dateFormat="MM/dd/yyyy HH:mm"
                    minDate={new Date()}
                    className="w-full border p-2 rounded-md mt-1 text-black"
                  />
                </div>
                <div>
                  <label className="block text-center">予約終了日時</label>
                  <DatePicker
                    selected={endDate}
                    onChange={setEndDate}
                    showTimeSelect
                    dateFormat="MM/dd/yyyy HH:mm"
                    minDate={startDate || new Date()}
                    className="w-full border p-2 rounded-md mt-1 text-black"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                className={
                  !startDate || !endDate ? 'opacity-50 pointer-events-none' : ''
                }
                onClick={handleCheckout}
              >
                決済へ進む
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
