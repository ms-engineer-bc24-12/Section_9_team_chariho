// src/app/mypage/contact/page.tsx
// ③-③ 問い合わせフォームページ

'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // フォームの値を変更
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('送信データ:', formData);

    // ここでAPIエンドポイントにリクエストを送信
    // const response = await fetch("/api/contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });

    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-20">
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-2xl font-bold mb-6">問い合わせフォーム</p>

        {submitted ? (
          <div className="p-6 max-w-md text-center border rounded-md shadow-md bg-white">
            <p className="text-lg font-semibold">送信完了しました！</p>
            <p className="mt-2 text-gray-600">
              返信までしばらくお待ちください。
            </p>

            {/* 送信完了のメッセージの直下にマイページへのリンクボタン */}
            <div className="mt-6">
              <Link
                href="/mypage"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 text-center"
              >
                マイページへ戻る
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-6 max-w-md w-full border rounded-md shadow-md bg-white"
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">名前</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                メールアドレス
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                お問い合わせ内容
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full mt-1 p-2 border rounded-md"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              送信する
            </button>
          </form>
        )}
      </div>
      <div className="mt-6">
        <Link
          href="/mypage"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 text-center"
        >
          マイページへ戻る
        </Link>
      </div>
    </div>
  );
}

//ページ確認
//http://localhost:3000/mypage/contact
