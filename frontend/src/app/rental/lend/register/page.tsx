//src/app/rental/lend/register/page.tsx
//②-②-①　自転車情報登録ページ　(画像/場所/金額/期間/鍵情報) →　完了アラート表示 (②-②がめんへ自動遷移)

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import Button from '@/app/components/Button';
import { useLocation } from '@/hooks/useLocation';

export default function RegisterBikePage() {
  const { userLocation, error } = useLocation(); // 現在地を取得
  const [bikeName, setBikeName] = useState('');
  const [price, setPrice] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [lockType, setLockType] = useState('ダイヤル式');

  // 保管場所の状態
  const [storageLocation, setStorageLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'OK' | 'NG' | ''>(''); // 取得結果の表示
  const [isRegistered, setIsRegistered] = useState(false);

  // 位置情報を取得する処理
  const handleGetLocation = () => {
    if (userLocation) {
      setStorageLocation(userLocation);
      setLocationStatus('OK'); // 取得成功
    } else {
      setLocationStatus('NG'); // 取得失敗
    }
  };

  // 登録処理
  const handleRegister = () => {
    if (!bikeName || !price || !startDate || !endDate || !storageLocation) {
      alert('すべての項目を入力してください');
      return;
    }

    const newBike = {
      id: Date.now(),
      name: bikeName,
      price,
      rentalPeriod: `${format(startDate, 'yyyy/MM/dd')} 〜 ${format(endDate, 'yyyy/MM/dd')}`,
      lockType,
      location: storageLocation,
    };

    const existingBikes = JSON.parse(localStorage.getItem('bikes') || '[]');
    localStorage.setItem('bikes', JSON.stringify([...existingBikes, newBike]));

    setIsRegistered(true);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-4">
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-lg">
        <p className="text-5xl font-bold mb-4">📑My Chari 登録</p>

        {isRegistered ? (
          <div className="p-6 max-w-md text-center border rounded-md shadow-md bg-white">
            <p className="text-lg font-semibold">登録しました！</p>
            <p className="mt-2 text-gray-600">自転車が正常に登録されました。</p>

            <div className="mt-6">
              <Link href="/rental/lend">
                <Button>My Chari に戻る</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-6 max-w-md w-full border rounded-md shadow-md bg-white">
            {/* 自転車の名前入力 */}
            <label className="block mb-2">
              🚲 自転車の名前
              <input
                type="text"
                value={bikeName}
                onChange={(e) => setBikeName(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="例: クロスバイク"
              />
            </label>

            {/* 料金の入力 */}
            <label className="block mb-2">
              💰 1時間あたりの料金（円）
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="例: 100"
              />
            </label>

            {/* 貸出期間 */}
            <label className="block mb-2">
              📅 貸出可能期間
              <div className="flex gap-2">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="開始日"
                  className="w-full p-2 border rounded-md"
                />
                <span className="self-center">〜</span>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate || new Date()}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="終了日"
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </label>

            {/* 鍵の種類 */}
            <label className="block mb-4">
              🔑 鍵タイプ
              <select
                value={lockType}
                onChange={(e) => setLockType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="ダイヤル式">ダイヤル式</option>
                <option value="鍵式">鍵式</option>
              </select>
            </label>

            {/* 📌 位置情報エラーがある場合、画面に表示 */}
            {error && <p className="text-red-500">{error}</p>}

            {/* 現在地取得 */}
            <label className="block mb-4">
              🚲 保管場所（現在地）
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="border p-2 rounded-md w-40 text-center"
                >
                  位置情報 登録
                </button>
                {locationStatus && (
                  <span
                    className={
                      locationStatus === 'OK'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }
                  >
                    {locationStatus === 'OK'
                      ? 'OK (取得成功)'
                      : 'NG (取得失敗)'}
                  </span>
                )}
              </div>
            </label>

            {/* 登録ボタン */}
            <div className="flex justify-center">
              <Button
                onClick={handleRegister}
                className="border p-4 rounded-md w-60 text-center"
              >
                登録
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

//ページ確認
// http://localhost:3000/rental/lend/register
