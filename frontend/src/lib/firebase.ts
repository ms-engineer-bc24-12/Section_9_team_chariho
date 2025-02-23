import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  getMessaging,
  getToken,
  onMessage,
  MessagePayload,
} from 'firebase/messaging';

// Firebaseの設定
const firebaseConfig = {
  apiKey: 'AIzaSyDPhLALDOEFlS-JhsJbqs8lvp-bkSwaWwc',
  authDomain: 'chariho.firebaseapp.com',
  projectId: 'chariho',
  storageBucket: 'chariho.firebasestorage.app',
  messagingSenderId: '121623712517',
  appId: '1:121623712517:web:3d2d83c61b3f9296791d6c',
};

const app = initializeApp(firebaseConfig);

// Firebase Authenticationの初期化
export const auth = getAuth(app);

// Firebase Messagingの初期化
const messaging = getMessaging(app);

// メールアドレスとパスワードでサインインする関数
export async function signInWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    // サインイン後にIDトークンを取得
    const token = await user.getIdToken();
    return token; // トークンを返す
  } catch (error) {
    console.error(
      'メールアドレスまたはパスワードが間違っています。再度確認してください。',
      error,
    );
    throw error; // エラーを呼び出し元に投げる
  }
}

// 新規ユーザー登録のための関数
export async function signUpWithEmail(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    // サインイン後にIDトークンを取得
    const token = await user.getIdToken();
    return token; // トークンを返す
  } catch (error) {
    console.error(
      'このメールアドレスは既に使用されています。別のメールアドレスを試してください。',
      error,
    );
    throw error; // エラーを呼び出し元に投げる
  }
}

// FCMトークンを取得する関数
export async function getFCMToken() {
  try {
    // プッシュ通知の許可をリクエスト
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // VAPIDキーを環境変数から取得
      const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

      if (!vapidKey) {
        console.error('VAPIDキーが設定されていません。');
        return null;
      }

      // FCMトークンを取得
      const token = await getToken(messaging, { vapidKey });
      if (token) {
        console.log('FCM Token:', token);
        return token;
      } else {
        console.error('FCMトークンの取得に失敗しました。');
        return null;
      }
    } else {
      console.error('通知の許可が得られませんでした。');
      return null;
    }
  } catch (error) {
    console.error('FCMトークンの取得中にエラーが発生しました。', error);
    throw error;
  }
}

// 通知受信のための設定
export const listenForNotifications = (
  callback: (payload: MessagePayload) => void,
) => {
  onMessage(messaging, (payload) => {
    callback(payload);
  });
};
