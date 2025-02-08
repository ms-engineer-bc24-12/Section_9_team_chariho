//src/app/page.tsx
//① ホームページ(新規登録・ログイン選択ページ)

import Link from 'next/link';
import Button from '@/app/components/Button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Chariho</h1>
      <p className="mt-2">スマホでかんたんレンタル！</p>
      <p className="mb-4">好きな自転車をセレクト</p>

      {/* 新規登録ボタン */}
      <Link href="/auth/register">
        <Button className="bg-blue-500 text-white hover:bg-blue-700">
          新規登録
        </Button>
      </Link>

      {/* ログインボタン */}
      <Link href="/auth/login">
        <Button className="bg-gray-300 text-black mt-2 hover:bg-gray-400">
          ログイン
        </Button>
      </Link>
    </div>
  );
}
