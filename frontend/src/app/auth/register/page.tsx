//src/app/auth/register/page.tsx
//①-①　新規登録ページ
'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvc, setCvc] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // エラーをリセット

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('登録が完了しました！'); // アラートを表示
      router.push('/auth/login'); // ログインページへ遷移
    } catch (error) {
      setError('登録に失敗しました。入力内容を確認してください。');
      console.error(error);
    }
  };

  // 電話番号の入力処理
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // 数字以外を削除
    setPhoneNumber(value);
  };

  // カード番号の入力時にハイフンを挿入する関数
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // 数字以外を削除
    if (value.length > 4) {
      value = `${value.slice(0, 4)}-${value.slice(4)}`;
    }
    if (value.length > 9) {
      value = `${value.slice(0, 9)}-${value.slice(9)}`;
    }
    if (value.length > 14) {
      value = `${value.slice(0, 14)}-${value.slice(14)}`;
    }
    setCardNumber(value); // 変換したカード番号を状態に設定
  };

  // CVCの入力処理
  const handleCVCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // 数字以外を削除
    if (value.length > 3) {
      value = value.slice(0, 3); // 3桁を超えないように制限
    }
    setCvc(value); // 変換したCVCを状態に設定
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <br />
      <h1 className="text-2xl font-bold">新規登録</h1>
      <p className="mt-2">必要な情報を入力してください。</p>
      <br />
      {/* エラーメッセージ */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <form
        onSubmit={handleRegister}
        className="flex flex-col min-h-screen gap-4 mt-4 w-80"
      >
        <label className="text-sm font-semibold">ユーザー名</label>
        <input
          type="text"
          placeholder="名前を入力してください"
          className="border p-2 rounded-md "
          required
        />
        <label className="text-sm font-semibold">住所</label>
        <input
          type="text"
          placeholder="住所を入力してください"
          className="border p-2 rounded-md w-full"
          required
        />
        <label className="text-sm font-semibold">電話番号</label>
        <div className="flex gap-2">
          {/* 国番号 */}
          <select className="border p-2 rounded-md w-1/4" required>
            <option value="+81">+81 (日本)</option>
            <option value="+1">+1 (アメリカ)</option>
            <option value="+44">+44 (イギリス)</option>
            <option value="+49">+49 (ドイツ)</option>
            {/* 他の国番号を追加 */}
          </select>

          {/* 電話番号 */}
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="border p-2 rounded-md w-3/4"
            maxLength={15} // 電話番号の最大桁数を設定
            required
            placeholder="電話番号を入力してください"
          />
        </div>
        <label className="text-sm font-semibold">メールアドレス</label>
        <input
          type="email"
          placeholder="メールアドレスを入力してください"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded-md w-full"
          required
        />
        <label className="text-sm font-semibold">パスワード</label>
        <input
          type="password"
          placeholder="パスワードを入力してください"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded-md w-full"
          required
        />

        {/* クレジットカード情報 */}
        <h2 className="text-lg font-semibold mt-4">決済情報</h2>
        <label className="text-sm font-semibold">カード番号</label>
        <input
          type="text"
          placeholder="カード番号を入力してください"
          value={cardNumber}
          onChange={handleCardNumberChange} // ここでカード番号を変更
          className="border p-2 rounded-md w-full"
          maxLength={16} // 最大文字数は「4-4-4-4」形式の16
          required
        />
        <label className="text-sm font-semibold">
          有効期限/セキュリティコード
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="有効期限 (MM/YY)"
            className="border p-2 rounded-md w-1/2"
            required
          />
          <input
            type="text"
            value={cvc}
            onChange={handleCVCChange}
            className="border p-2 rounded-md w-full"
            maxLength={3} // CVCを3桁に制限
            required
            placeholder="CVC"
          />
        </div>
        <label className="text-sm font-semibold">カード名義</label>
        <input
          type="text"
          placeholder="カード名義を入力してください"
          className="border p-2 rounded-md w-full"
          required
        />

        <a
          href="/mypage/terms"
          className="text-blue-500 underline text-sm text-center mt-4"
        >
          利用規約
        </a>

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

//ページ確認
//http://localhost:3000/auth/register
