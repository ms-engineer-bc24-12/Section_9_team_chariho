//src/app/rental/return/confirm/pape.tsx
//②-③-①自転車返却確認ページ (時間/金額/決済情報)　→ 完了アラート表示(②借りる/貸す/返す選択ページへ自動遷移？)
'use client';
import { useState } from 'react';
import { sendTokenToBackend } from '@/app/components/NotificationHandler';
import Button from '@/app/components/Button';
import Link from 'next/link';

export default function ReturnConfirmPage() {
  const [isNotificationSent, setIsNotificationSent] = useState(false);

  const handleComplete = async () => {
    // 完了する処理
    await sendTokenToBackend('自転車返却完了通知');
    setIsNotificationSent(true);
  };
  return (
    <div className="flex flex-col items-center justify-between min-h-screen pt-16">
      <div className="flex flex-col items-center flex-grow">
        <h2 className="text-2xl font-bold mt-6">最終確認</h2>
        <br />
        {/* 注意事項を枠で囲む */}
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-100 max-w-md">
          <p className="mb-2 text-center">ご利用ありがとうございました。</p>
          <p className="mb-2 text-center">
            下記内容を再度ご確認後、完了ボタンを押してください。
          </p>
          <br />
          <ul className="list-disc list-inside text-left">
            <li>🔒 鍵が施錠されているか確認してください。</li>
            <li>
              🔑 ロック式自転車の場合は、正しい保管場所に鍵を返却してください。
            </li>
            <li>
              👤 ご利用明細についてはマイページの利用履歴をご確認ください。
            </li>
          </ul>
        </div>
        {/* ボタンは枠外 */}
        <Link href="/mypage/history" className="mt-6">
          <Button onClick={handleComplete}>完了する</Button>
          {isNotificationSent && <p>通知が送信されました！</p>}
        </Link>
      </div>
    </div>
  );
}
