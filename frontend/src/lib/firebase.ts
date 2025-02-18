import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

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

export const auth = getAuth(app);

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
