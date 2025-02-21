//src/app/rental/borrow/reserve/page.tsx
//②-①-①予約内容入力ページ(予約日時選択)
'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@/app/components/Button';

export default function ReserveConfirmPage() {
  const searchParams = useSearchParams();
  const bikeName = searchParams.get('bikeName');
  const price = searchParams.get('price');
  const rentalPeriod = searchParams.get('rentalPeriod');
  const lockType = searchParams.get('lockType');
  const photo = searchParams.get('photo');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className="flex flex-col items-center justify-between  min-h-screen pt-16 pb-20">
      <div className="flex flex-col items-center flex-grow">
        <p className="text-4xl font-bold mt-6">予約詳細</p>
        <br />
        <div className="p-6 max-w-lg w-full border rounded-md shadow-md bg-white">
          <div className="mt-4 space-y-3 text-center">
            {/* 自転車の画像 */}
            {photo && (
              <Image
                src={photo || '/default-bike.jpg'} // 画像がない場合のデフォルト画像
                alt={bikeName || '自転車'}
                width={500} // 表示サイズを指定（パフォーマンス向上）
                height={300}
                className="w-full max-h-48 object-cover rounded-md"
              />
            )}
            <p>🚲 {bikeName}</p>
            <p>💰 料金: {price}円</p>
            <p>⏳ レンタル期間: {rentalPeriod}</p>
            <p>🔐 ロックタイプ: {lockType}</p>
          </div>
        </div>
        <br />
        {/* 日時指定フォーム */}
        <p className="text-lg font-semibold text-center">日時を指定</p>
        <div className="p-6 max-w-lg w-full border rounded-md shadow-md bg-white">
          <div className="flex flex-col text-center gap-4 mt-4">
            <div>
              <label className="block text-center">予約開始日時</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                dateFormat="yyyy/MM/dd HH:mm"
                className="w-full border p-2 rounded-md mt-1"
              />
            </div>

            <div>
              <label className="block text-center">予約終了予定</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                dateFormat="yyyy/MM/dd HH:mm"
                className="w-full border p-2 rounded-md mt-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 決済へ進むボタン */}
      <div className="mt-6 flex justify-center">
        <Button>決済へ進む</Button>
      </div>
    </div>
  );
}
