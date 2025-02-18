//src/app/auth/register/page.tsx
//①-①　新規登録ページ
'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';
import TermsContent from '@/app/components/TermsContent';
import { FirebaseError } from 'firebase/app';

export default function Register() {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [agree, setAgree] = useState(false);

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
      // Firebaseでユーザーを作成
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log('User created:', userCredential); // ユーザーが作成されたか確認

      // FirebaseユーザーのIDを取得
      const user = userCredential.user;
      const token = await user.getIdToken(); // JWT トークン取得

      // FastAPIで追加情報を保存
      const response = await fetch('http://localhost:8000/register', {
        // FastAPIのエンドポイントにPOSTリクエスト
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // JWT トークンを送る
        },
        body: JSON.stringify({
          firebase_uid: user.uid,
          first_name: firstName,
          last_name: lastName,
          email,
          phone_number: phoneNumber,
          address,
        }),
      });

      if (response.ok) {
        alert('登録が完了しました！');
        router.push('/auth/login');
      } else {
        const errorData = await response.json();
        setError('情報の保存に失敗しました。');
        console.error(errorData);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          setError('このメールアドレスはすでに登録されています。');
        } else {
          setError('登録に失敗しました。入力内容を確認してください。');
        }
      } else {
        setError('予期しないエラーが発生しました。');
      }
      console.error(error);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
  };

  const handleCheckBoxChange = () => {
    setAgree(!agree);
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">新規登録</h1>
      <p className="mt-2">必要な情報を入力してください。</p>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 mt-4 w-80 overflow-h-auto"
      >
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
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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

        {/* 利用規約の表示 */}
        <label className="text-sm font-semibold">利用規約</label>
        <TermsContent />

        {/* 同意チェックボックス */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={handleCheckBoxChange}
            className="mr-2"
          />
          <label htmlFor="agree" className="text-sm">
            利用規約に同意する
          </label>
        </div>
        <Button type="submit">登録</Button>
        <br />
        <br />
        <br />
      </form>
    </div>
  );
}
