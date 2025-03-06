//src/app/rental/borrow/reserve/page.tsx
//②-①-①予約確定ページ
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouterを追加
import Button from '@/app/components/Button';
import { sendTokenToBackend } from '@/app/components/NotificationHandler';

export default function ReserveConfirmPage() {
  const [isNotificationSent, setIsNotificationSent] = useState(false);
  const router = useRouter(); // useRouter フックを使用

  const handleHomeRedirect = async () => {
    // Homeに戻る処理
    await sendTokenToBackend('Homeに戻る通知');
    setIsNotificationSent(true);
    // 通知送信後にHomeへ遷移
    router.push('/rental');
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="text-2xl font-bold">登録が完了しました！</p>
        <br />
        <Button onClick={handleHomeRedirect}>Homeへ戻る</Button>
        {isNotificationSent && <p>通知が送信されました！</p>}
      </div>
    </div>
  );
}
