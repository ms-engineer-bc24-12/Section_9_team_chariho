//src/app/auth/login/page.tsx
//①-②　ログインページ
'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // エラーメッセージをリセット

    try {
      // Firebase認証を行い、IDトークンを取得
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      const token = await user.getIdToken();

      // IDトークンをバックエンドに送信
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token: token }),
      });

      const data = await response.json();
      console.log(data); // レスポンスデータの内容をログに出力

      // レスポンスをチェック
      if (response.ok) {
        router.push('/rental'); // ログイン成功時に `/rental` へ遷移
      } else {
        setError('ログイン失敗');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">ログイン</h1>
      <br />
      {/* エラーメッセージ */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4 w-80">
        <input
          type="email"
          placeholder="メール"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded-md w-full"
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded-md w-full"
          required
        />

        {/* ログインボタン */}
        <Button type="submit">ログイン</Button>
      </form>

      {/* 新規登録ページへのリンク */}
      <p className="mt-4 text-sm">
        アカウントをお持ちでない方は{' '}
        <Link href="/auth/register" className="text-blue-500 underline">
          新規登録
        </Link>
      </p>
    </div>
  );
}

//ページ確認
//http://localhost:3000/auth/login
