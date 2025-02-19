//src/app/page.tsx
//① ホームページ(新規登録・ログイン選択ページ)
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/app/components/Button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen">
      <h1 className="text-5xl font-bold  text-yellow-600">
        Welcome to Chariho!
      </h1>
      <br />
      <Image
        src="/top-image.png" // 画像のパス（publicフォルダ内にbike-image.pngを配置）
        alt="レンタサイクルのイメージ"
        width={300} // 幅（適宜調整）
        height={200} // 高さ（適宜調整）
        className="mt-4" // 余白を追加
      />
      <br />
      <p className="mt-2 text-2xl">スマホでかんたんレンタル！</p>
      <br />
      <p className="mb-4 text-2xl">好きな自転車をセレクト</p>
      <br />
      {/* 新規登録ボタン */}
      <Link href="/auth/register">
        <Button>新規登録</Button>
      </Link>
      <br />
      {/* ログインボタン */}
      <Link href="/auth/login">
        <Button>ログイン</Button>
      </Link>
    </div>
  );
}
