// public/firebase-messaging-sw.js

importScripts(
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js',
);

// Firebase 設定
firebase.initializeApp({
  apiKey: 'API_KEY',
  authDomain: 'your-app.firebaseapp.com',
  projectId: 'your-app',
  storageBucket: 'your-app.appspot.com',
  messagingSenderId: 'SENDER_ID',
  appId: 'APP_ID',
});

// Firebase Messaging の初期化
const messaging = firebase.messaging();

// 🔹 バックグラウンド通知を処理
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

  const notificationTitle = payload.notification?.title || '新しい通知';
  const notificationOptions = {
    body: payload.notification?.body || 'メッセージを確認してください。',
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
