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
import CameraUploader from '@/app/components/CameraUploader';

export default function RegisterBikePage() {
  const { userLocation, error, getLocation } = useLocation();
  const [bikeName, setBikeName] = useState('');
  const [price, setPrice] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [lockType, setLockType] = useState('ダイヤル式');
  const [storageLocation, setStorageLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'OK' | 'NG' | ''>('');
  const [isRegistered, setIsRegistered] = useState(false);

  // 画像アップロード関連の状態管理
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // 撮影した画像のファイル
  const [isUploaded, setIsUploaded] = useState<boolean>(false); // 画像がアップロードされたかどうか

  // 初めて位置情報を取得する
  const handleGetLocation = () => {
    if (userLocation) {
      setStorageLocation(userLocation);
      setLocationStatus('OK'); // 取得成功
    } else {
      setLocationStatus('NG'); // 取得失敗
    }
  };

  // 位置情報を再取得する
  const handleRetryLocation = () => {
    getLocation(); // 位置情報の更新
    if (userLocation) {
      setStorageLocation(userLocation);
      setLocationStatus('OK'); // 取得成功
    } else {
      setLocationStatus('NG'); // 取得失敗
    }
  };

  // 貸し出し自転車を登録する処理
  const handleRegister = () => {
    if (
      !bikeName ||
      !price ||
      !startDate ||
      !endDate ||
      !storageLocation ||
      !selectedFile
    ) {
      alert('すべての項目を入力してください（写真も必須です）');
      return;
    }

    const newBike = {
      id: Date.now(),
      name: bikeName,
      price,
      rentalPeriod: `${format(startDate, 'yyyy/MM/dd')} 〜 ${format(endDate, 'yyyy/MM/dd')}`,
      lockType,
      location: storageLocation,
      photo: URL.createObjectURL(selectedFile), //TODO:ローカルストレージ保存しない場合はコメントアウト
    };

    //TODO:ローカルストレージへの保存をしない場合はコメントアウト（Firebase Storageに移行予定）
    const existingBikes = JSON.parse(localStorage.getItem('bikes') || '[]');
    localStorage.setItem('bikes', JSON.stringify([...existingBikes, newBike]));

    setIsRegistered(true);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[160vh] pt-16">
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-lg">
        <p className="text-4xl font-bold mb-2">📑My Chari 登録</p>
        <br />

        {/* 位置情報エラーがある場合、画面に表示 */}
        {error && <p className="text-red-500">{error}</p>}

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
                className="w-full p-2 border rounded-md text-black"
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
                className="w-full p-2 border rounded-md text-black"
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
                  className="w-full p-2 border rounded-md text-black"
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
                  className="w-full p-2 border rounded-md text-black"
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

            {/* 位置情報取得 */}
            <label className="block mb-4">
              🚲 保管場所（現在地）位置情報
              <div className="flex items-center gap-2">
                <Button onClick={handleGetLocation}>登録</Button>
                <Button onClick={handleRetryLocation}>再取得</Button>
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

            {/* 画像アップロード */}
            <div className="mt-6">
              <CameraUploader
                onPhotoSelect={(file) => {
                  setSelectedFile(file);
                  setIsUploaded(true);
                }}
                description="保管場所で貸出自転車を撮影"
              />
            </div>

            {/* 登録ボタン（画像がアップロードされていないと表示しない） */}
            {selectedFile && isUploaded && (
              <div className="flex justify-center mt-4">
                <Button onClick={handleRegister}>登録</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

//ページ確認
// http://localhost:3000/rental/lend/register
