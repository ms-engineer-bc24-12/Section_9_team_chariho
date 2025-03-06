import { useEffect } from 'react';
import { getFCMToken } from '@/lib/firebase';

export const sendTokenToBackend = async (token: string) => {
  await fetch('http://localhost:8000/send-notification/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token,
      title: '予約完了',
      body: '自転車の予約が完了しました🚲',
    }),
  });
};

const NotificationHandler = () => {
  const handleFCMToken = async () => {
    const token = await getFCMToken();
    if (token) {
      await sendTokenToBackend(token);
    }
  };

  useEffect(() => {
    handleFCMToken();
  }, []);

  return <div>通知を送信しています...</div>;
};

export default NotificationHandler;
