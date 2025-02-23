//src/app/mypage/history/page.tsx
//③-① 利用履歴一覧ページ
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/app/components/Button';
import { listenForNotifications } from '@/lib/firebase';

export default function HistoryPage() {
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    // 通知を受け取る
    listenForNotifications((payload) => {
      // 受け取った通知内容をstateにセット
      const message = payload.notification?.body;
      setNotification(message || '通知がありません');
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-between min-h-[140vh] pt-16">
      <div className="flex flex-col items-center flex-grow max-w-lg">
        <p className="text-2xl font-bold mt-6">⏰履歴一覧</p>
        <br />
        {/* 自転車を貸した場合 */}
        <div className="flex flex-col gap-2 mt-4 md-6">
          <p className="text-2xl font-semibold text-center">売上金：180円</p>
          <br />
          <div className="border p-4 rounded-md w-80">
            {/* 通知を表示 */}
            <p>{notification}</p>
          </div>
        </div>
        <div className="mt-6">
          <Link href="/mypage">
            <Button> マイページへ戻る</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
