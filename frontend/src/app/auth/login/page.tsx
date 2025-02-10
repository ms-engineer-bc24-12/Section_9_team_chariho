//src/app/auth/login/page.tsx
//①-②　ログインページ
'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // エラーメッセージをリセット

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/rental'); // ログイン成功時に `/rental` へ遷移
    } catch (error) {
      setError('正しい内容を入力してください'); // エラーメッセージを設定
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
        <Button
          type="submit"
          className="bg-blue-500 text-white hover:bg-blue-700"
        >
          ログイン
        </Button>
      </form>

      {/* 新規登録ページへのリンク */}
      <p className="mt-4 text-sm">
        アカウントをお持ちでない方は{' '}
        <a href="/auth/register" className="text-blue-500 underline">
          新規登録
        </a>
      </p>
    </div>
  );
}

//ページ確認
//http://localhost:3000/auth/login
