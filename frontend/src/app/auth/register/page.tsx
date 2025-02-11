//src/app/auth/register/page.tsx
//①-①　新規登録ページ
'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';
import Link from 'next/link';

export default function Register() {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 姓・名のバリデーション（アルファベットまたは日本語のみ）
    const nameRegex = /^[a-zA-Zぁ-んァ-ヶ一-龥々ー]+$/;
    if (!nameRegex.test(lastName) || !nameRegex.test(firstName)) {
      setError('姓と名はアルファベットまたは日本語のみ使用できます。');
      return;
    }

    // パスワードの確認
    if (password !== confirmPassword) {
      setError('パスワードが一致しません。');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('登録が完了しました！');
      router.push('/auth/login');
    } catch (error) {
      setError('登録に失敗しました。入力内容を確認してください。');
      console.error(error);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">新規登録</h1>
      <p className="mt-2">必要な情報を入力してください。</p>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <form onSubmit={handleRegister} className="flex flex-col gap-4 mt-4 w-80">
        {/* 姓と名（横並び） */}
        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="text-sm font-semibold">名前</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="姓を入力して下さい"
              className="border p-2 rounded-md w-full"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="text-sm font-semibold">　</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="名を入力して下さい"
              className="border p-2 rounded-md w-full"
              required
            />
          </div>
        </div>

        <label className="text-sm font-semibold">住所</label>
        <input
          type="text"
          placeholder="住所を入力してください"
          className="border p-2 rounded-md w-full"
          required
        />

        <label className="text-sm font-semibold">電話番号</label>
        <div className="flex gap-2">
          <select className="border p-2 rounded-md w-1/4" required>
            <option value="+81">+81 (日本)</option>
            <option value="+1">+1 (アメリカ)</option>
            <option value="+44">+44 (イギリス)</option>
            <option value="+49">+49 (ドイツ)</option>
          </select>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="border p-2 rounded-md w-3/4"
            maxLength={15}
            required
            placeholder="電話番号を入力してください"
          />
        </div>

        <label className="text-sm font-semibold">メールアドレス</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレスを入力してください"
          className="border p-2 rounded-md w-full"
          required
        />

        <label className="text-sm font-semibold">パスワード</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワードを入力してください"
          className="border p-2 rounded-md w-full"
          required
        />

        <label className="text-sm font-semibold">パスワード確認</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="もう一度パスワードを入力してください"
          className="border p-2 rounded-md w-full"
          required
        />

        <Link
          href="/mypage/terms"
          className="text-blue-500 underline text-sm text-center mt-4"
        >
          利用規約
        </Link>

        <Button
          type="submit"
          className="bg-blue-500 text-white hover:bg-blue-700"
        >
          登録
        </Button>
      </form>
    </div>
  );
}
