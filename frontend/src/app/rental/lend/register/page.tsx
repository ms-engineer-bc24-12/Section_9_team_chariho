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
import CameraToBase64 from '@/app/components/CameraToBase64';
//import CameraUploader from '@/app/components/CameraUploader'; //firebaseストレージの実装が完了した場合はこちらを採用

export default function RegisterBikePage() {
  const { userLocation, error, getLocation } = useLocation();
  const [bikeName, setBikeName] = useState('');
  const [price, setPrice] = useState('');
  const [priceError, setPriceError] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dateError, setDateError] = useState('');
  const [lockType, setLockType] = useState('ダイヤル式');
  const [storageLocation, setStorageLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'OK' | 'NG' | ''>('');
  const [isRegistered, setIsRegistered] = useState(false);

  // 画像アップロード関連の状態管理
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  //const [selectedFile, setSelectedFile] = useState<File | null>(null); // 撮影した画像のファイル(TODO:firebase適用)
  //const [isUploaded, setIsUploaded] = useState<boolean>(false); // 画像がアップロードされたかどうか(TODO:firebase適用)

  // 料金の入力イベント
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value; // 入力された値（文字列）
    setPrice(inputValue); // 入力値をstateにセット

    const priceNumber = Number(inputValue); // 数値に変換

    if (priceNumber < 100 || isNaN(priceNumber)) {
      setPriceError('1時間あたりの料金は100円以上にしてください。');
    } else {
      setPriceError('');
    }
  };

  const handleStartDateChange = (date: Date | null) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); //開始日を選択する、時刻をリセット

    if (date && date < today) {
      setDateError('開始日は今日以降の日付を選んでください。');
      return;
    }
    setDateError(''); // エラーがなければリセット
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    if (!startDate) {
      setDateError('先に開始日を選択してください。');
      return;
    }

    setEndDate(date);
  };

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
  const handleRegister = async () => {
    if (
      !bikeName ||
      !price ||
      !startDate ||
      !endDate ||
      !storageLocation ||
      !capturedImage
      //  !selectedFile //TODO:firebase適用
    ) {
      alert('すべての項目を入力してください（写真も必須です）');
      return;
    }

    const requestData = {
      owner_id: 3, //仮のID（後で動的に変更）
      bikename: bikeName,
      image_url: capturedImage, //Base64エンコードの画像
      latitude: storageLocation.lat,
      longitude: storageLocation.lng,
      rental_price_per_hour: parseFloat(price),
      lock_type: lockType === 'ダイヤル式' ? 'dial' : 'key', //ダイヤル式か鍵式か
      rental_period: {
        start: format(startDate, 'yyyy-MM-dd'),
        end: format(endDate, 'yyyy-MM-dd'),
      },
    };

    try {
      const response = await fetch('http://localhost:8000/bicycles/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '不明なエラーが発生しました');
      }

      const data = await response.json();
      console.log('登録成功:', data);

      setIsRegistered(true);
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error: unknown) => {
    console.error('エラー:', error);

    if (error instanceof TypeError) {
      alert('ネットワークエラーが発生しました。接続を確認してください。');
    } else if (error instanceof SyntaxError) {
      alert('データの処理中にエラーが発生しました。');
    } else if (error instanceof Error) {
      alert(error.message || '登録に失敗しました');
    } else {
      alert('不明なエラーが発生しました');
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-[160vh] pt-16">
      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-lg">
        <p className="text-4xl font-bold mb-2">📑My Chari 登録</p>
        <br />

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
            {/* エラーメッセージ表示 */}
            {error && <p className="text-red-500">【位置情報エラー】{error}</p>}

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
                onChange={handlePriceChange}
                className="w-full p-2 border rounded-md text-black"
                placeholder="例: 100"
              />
              {/* 100円未満の場合にエラーメッセージを表示 */}
              {priceError && (
                <p className="text-red-500 text-sm mt-1">{priceError}</p>
              )}
            </label>

            {/* 貸出期間 */}
            <label className="block mb-2">
              📅 貸出可能期間
              <div className="flex gap-2">
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="開始日"
                  className="w-full p-2 border rounded-md text-black"
                />
                <span className="self-center">〜</span>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate || new Date()}
                  dateFormat="yyyy/MM/dd"
                  placeholderText="終了日"
                  className="w-full p-2 border rounded-md text-black"
                />
              </div>
              {/* 日付エラーがある場合に表示 */}
              {dateError && (
                <p className="text-red-500 text-sm mt-1">{dateError}</p>
              )}
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
            {/* 位置情報の取得 */}
            <label className="block mb-4">
              🚲 保管場所（現在地）位置情報
              <div className="flex flex-col gap-2">
                {' '}
                {/* flex-col で縦並びに */}
                {/* コメント部分 */}
                <p>
                  ※正確な位置を登録するため、保管場所でボタンを押してください。
                </p>
                {/* ボタン部分 */}
                <div className="flex justify-center gap-2">
                  <Button onClick={handleGetLocation}>登録</Button>
                  <Button onClick={handleRetryLocation}>再取得</Button>
                </div>
                {/* ステータスメッセージ */}
                {locationStatus && (
                  <p
                    className={`text-center ${
                      locationStatus === 'OK'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {locationStatus === 'OK'
                      ? 'OK (取得成功)'
                      : 'NG (取得失敗)'}
                  </p>
                )}
              </div>
            </label>
            
            {/* 画像撮影（Base64変換） */}
            <CameraToBase64 onCapture={(base64) => setCapturedImage(base64)} />

            {/* 登録ボタン（画像がアップロードされていないと表示しない） */}
            {capturedImage && (
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
