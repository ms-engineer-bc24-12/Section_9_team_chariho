//src/app/rental/borrow/reserve/page.tsx
//②-①-①予約内容入力ページ(予約日時選択)
'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@/app/components/Button';

export default function ReserveConfirmPage() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-20 pt-16">
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl font-bold mt-6">🗓️ 予約詳細</p>
        <br />
        <form className="p-6 max-w-md text-center border rounded-md shadow-md bg-white">
          <p className="text-lg font-semibold mt-4">日時を指定</p>

          <div className="flex flex-col gap-4 mt-6">
            <div>
              <label className="block text-left font-semibold">
                📅 予約開始日時
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                dateFormat="yyyy/MM/dd HH:mm"
                className="w-full border p-2 rounded-md mt-1"
              />
            </div>

            <div>
              <label className="block text-left font-semibold">
                📅 予約終了予定
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                dateFormat="yyyy/MM/dd HH:mm"
                className="w-full border p-2 rounded-md mt-1"
              />
            </div>
          </div>
        </form>
        <div className="mt-16"></div>
        <Button>決済へ進む</Button>
      </div>
    </div>
  );
}
